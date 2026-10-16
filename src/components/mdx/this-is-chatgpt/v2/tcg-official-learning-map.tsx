"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  bg: "var(--bg-elevated)",
};
const inputClass =
  "min-h-11 min-w-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";
// Drawing serialization only: exact integer models never consume rounded geometry.
function coord(n: number) {
  if (!Number.isFinite(n)) throw new Error("Nonfinite map coordinate");
  return Number(n.toFixed(9));
}
const IDS = ["P", "N", "E", "T", "A", "G"] as const;
type NodeId = (typeof IDS)[number];
type Priority = "training-first" | "representation-first";
const EDGES: readonly (readonly [NodeId, NodeId])[] = [
  ["P", "N"],
  ["N", "T"],
  ["N", "A"],
  ["E", "A"],
  ["T", "G"],
  ["A", "G"],
];
const PRIORITIES: Record<Priority, NodeId[]> = {
  "training-first": ["T", "P", "E", "N", "A", "G"],
  "representation-first": ["E", "P", "N", "A", "T", "G"],
};
const NAMES: Record<NodeId, string> = {
  P: "概率",
  N: "网络",
  E: "嵌入",
  T: "训练",
  A: "注意",
  G: "生成",
};
function topology(priority: Priority, fault = false) {
  const edges = EDGES.filter(([a, b]) => !(fault && a === "N" && b === "T"));
  const done: NodeId[] = [];
  const rows: {
    done: NodeId[];
    ready: NodeId[];
    next: NodeId | null;
    missing: NodeId[];
  }[] = [];
  for (let i = 0; i <= IDS.length; i++) {
    const ready = PRIORITIES[priority].filter(
      (n) =>
        !done.includes(n) &&
        edges.every(([a, b]) => b !== n || done.includes(a)),
    );
    const next = ready[0] ?? null;
    const missing = next
      ? EDGES.filter(([a, b]) => b === next && !done.includes(a)).map(
          ([a]) => a,
        )
      : [];
    rows.push({ done: [...done], ready, next, missing });
    if (!next) break;
    done.push(next);
  }
  const violations = EDGES.filter(
    ([a, b]) => done.indexOf(a) > done.indexOf(b),
  ).map(([a, b]) => `${a}→${b}`);
  return {
    edges,
    rows,
    order: done,
    violations,
    valid: violations.length === 0,
  };
}
type TaskId = "R" | "V" | "F" | "B" | "C";
function schedule(workers: number, forward: number, fault = false) {
  const parallel = workers >= 2 || fault;
  const tasks: { id: TaskId; start: number; end: number; duration: number }[] =
    [
      { id: "R", start: 0, end: 2, duration: 2 },
      { id: "V", start: 2, end: 5, duration: 3 },
      {
        id: "F",
        start: parallel ? 2 : 5,
        end: (parallel ? 2 : 5) + forward,
        duration: forward,
      },
    ];
  const join = Math.max(tasks[1].end, tasks[2].end);
  tasks.push(
    { id: "B", start: join, end: join + 2, duration: 2 },
    { id: "C", start: join + 2, end: join + 3, duration: 1 },
  );
  const makespan = join + 3;
  const occupancy = Array.from(
    { length: makespan },
    (_, t) => tasks.filter((a) => a.start <= t && t < a.end).length,
  );
  const events = [
    ...new Set([0, ...tasks.flatMap((t) => [t.start, t.end])]),
  ].sort((a, b) => a - b);
  const overload = occupancy.flatMap((count, t) =>
    count > workers ? [t] : [],
  );
  return {
    tasks,
    events,
    occupancy,
    overload,
    makespan,
    critical: 5 + Math.max(3, forward),
    work: 8 + forward,
    valid: overload.length === 0,
  };
}
const TESTS = ["a", "b", "c", "d"] as const;
type TestId = (typeof TESTS)[number];
type Objective = "fewest" | "cost";
const RESPONSE: Record<TestId, number[]> = {
  a: [0, 1, 1, 0],
  b: [0, 0, 1, 1],
  c: [0, 1, 0, 0],
  d: [0, 0, 1, 0],
};
const COST: Record<TestId, number> = { a: 3, b: 3, c: 1, d: 1 };
function diagnose(objective: Objective, hypotheses: number, fault = false) {
  const pairs = Array.from({ length: hypotheses }, (_, a) =>
    Array.from(
      { length: hypotheses - a - 1 },
      (_, j) => [a, a + j + 1] as const,
    ),
  ).flat();
  const checked = pairs.filter(([a, b]) => !(fault && a === 0 && b === 3));
  const separates = (tests: readonly TestId[], a: number, b: number) =>
    tests.some((t) => RESPONSE[t][a] !== RESPONSE[t][b]);
  const candidates = Array.from({ length: 16 }, (_, mask) => {
    const tests = TESTS.filter((_, i) => (mask & (1 << i)) !== 0);
    const cost = tests.reduce((s, t) => s + COST[t], 0);
    return { tests, cost, mask };
  }).filter((c) => checked.every(([a, b]) => separates(c.tests, a, b)));
  candidates.sort((a, b) =>
    objective === "fewest"
      ? a.tests.length - b.tests.length || a.cost - b.cost || a.mask - b.mask
      : a.cost - b.cost || a.tests.length - b.tests.length || a.mask - b.mask,
  );
  const best = candidates[0];
  const unresolved = pairs.filter(([a, b]) => !separates(best.tests, a, b));
  const signatures = Array.from({ length: hypotheses }, (_, h) =>
    best.tests.map((t) => RESPONSE[t][h]).join(""),
  );
  return {
    ...best,
    pairs,
    checked,
    unresolved,
    signatures,
    valid: unresolved.length === 0,
    candidates: candidates.length,
  };
}
function useMapTrace(labels: string[]) {
  const key = JSON.stringify(labels);
  const steps = useMemo(
    () => (JSON.parse(key) as string[]).map((label) => ({ label })),
    [key],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 900));
      tl.add(
        { tick: 0 },
        { tick: steps.length, duration: steps.length * 900, ease: "linear" },
        0,
      );
    },
    [steps],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const { reducedMotion, isPlaying, pause } = timeline;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  return timeline;
}
function Shell({
  id,
  kind,
  title,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[480px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm text-secondary">
        本站构造的有限路线模型；不是作者规定的课程、学习能力评分或语言模型运行。
      </p>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      {label}
      {children}
    </label>
  );
}
function Fault({
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={id}
      aria-pressed={active}
      onClick={onClick}
      className={inputClass + " my-3 text-left"}
    >
      {active ? "已注入：" : "注入故障："}
      {children}
    </button>
  );
}
function Controls({
  timeline,
  reset,
}: {
  timeline: ReturnType<typeof useMapTrace>;
  reset: () => void;
}) {
  return (
    <div
      data-timeline="map"
      data-frame={timeline.currentStep}
      data-playing={String(timeline.isPlaying)}
      data-reduced-motion={String(timeline.reducedMotion)}
    >
      <TimelineControls timeline={timeline} />
      <button
        type="button"
        data-reset="all"
        onClick={reset}
        className={inputClass + " mt-3"}
      >
        全部重置（参数、故障、进度、播放）
      </button>
    </div>
  );
}
const POS: Record<NodeId, readonly [number, number]> = {
  P: [60, 48],
  E: [220, 48],
  N: [60, 128],
  T: [60, 218],
  A: [220, 218],
  G: [140, 300],
};
function TopologyPlot({
  priority,
  fault,
  reset,
}: {
  priority: Priority;
  fault: boolean;
  reset: () => void;
}) {
  const model = topology(priority, fault);
  const timeline = useMapTrace(
    model.rows.map((r, i) =>
      i === 6 ? "全部消元" : `第${i + 1}次：取${r.next}`,
    ),
  );
  const row = model.rows[timeline.currentStep];
  return (
    <>
      <svg
        viewBox="0 0 280 440"
        role="img"
        aria-label="先修有向图：空心圈为未处理，强调色为零入度前沿；下方为逐次删除顺序"
        fontSize="13"
        fill={C.ink}
      >
        <defs>
          <marker
            id="map-prereq-arrow"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0L6 3L0 6" fill={C.muted} />
          </marker>
        </defs>
        {EDGES.map(([a, b]) => {
          const [x, y] = POS[a],
            [u, v] = POS[b],
            len = Math.hypot(u - x, v - y);
          const removed = fault && a === "N" && b === "T";
          return (
            <line
              key={a + b}
              data-edge={`${a}-${b}`}
              data-enabled={String(!removed)}
              x1={coord(x + ((u - x) * 25) / len)}
              y1={coord(y + ((v - y) * 25) / len)}
              x2={coord(u - ((u - x) * 28) / len)}
              y2={coord(v - ((v - y) * 28) / len)}
              stroke={removed ? C.danger : C.muted}
              strokeWidth="2"
              strokeDasharray={removed ? "5 4" : undefined}
              opacity={row.done.includes(b) ? 0.3 : 1}
              markerEnd="url(#map-prereq-arrow)"
            />
          );
        })}
        {IDS.map((n) => (
          <g key={n} data-node={n} data-ready={String(row.ready.includes(n))}>
            <circle
              cx={POS[n][0]}
              cy={POS[n][1]}
              r="23"
              fill={row.ready.includes(n) ? C.accent : C.bg}
              fillOpacity={row.ready.includes(n) ? 0.2 : 1}
              stroke={
                row.done.includes(n)
                  ? C.line
                  : row.ready.includes(n)
                    ? C.accent
                    : C.muted
              }
              strokeWidth={row.next === n ? 3 : 1.5}
            />
            <text x={POS[n][0]} y={POS[n][1] - 5} textAnchor="middle">
              {n}
            </text>
            <text
              x={POS[n][0]}
              y={POS[n][1] + 13}
              textAnchor="middle"
              fill={C.muted}
            >
              {NAMES[n]}
            </text>
          </g>
        ))}
        <text x="5" y="366">
          消元序（已完成 {row.done.length}/6）
        </text>
        {model.order.map((n, i) => (
          <g key={n}>
            <rect
              x={5 + i * 45}
              y="380"
              width="40"
              height="35"
              rx="4"
              fill={C.bg}
              stroke={i < row.done.length ? C.accent : C.line}
              strokeWidth="2"
            />
            <text
              x={25 + i * 45}
              y="403"
              textAnchor="middle"
              opacity={i < row.done.length ? 1 : 0.35}
            >
              {i < row.done.length ? n : "·"}
            </text>
          </g>
        ))}
      </svg>
      <output
        data-readout="topology"
        data-order={model.order.join(",")}
        data-valid={String(model.valid)}
        data-frontier={row.ready.join(",")}
        data-next={row.next ?? "done"}
        data-missing={row.missing.join(",")}
        className="block break-words text-sm"
        aria-live="polite"
      >
        当前前沿：{row.ready.join("、") || "空"}；下一节点 {row.next ?? "无"}
        。按真实先修图检查，缺项：{row.missing.join("、") ||
          "无"}。最终序列 {model.order.join(" → ")}；
        {model.valid ? "满足全部先修边" : `违例 ${model.violations.join("、")}`}
        。
      </output>
      <Controls timeline={timeline} reset={reset} />
    </>
  );
}
export function TcgOfficialLearningMapContextContractLab() {
  const [priority, setPriority] = useState<Priority>("training-first"),
    [fault, setFault] = useState(false),
    [generation, setGeneration] = useState(0);
  const reset = () => {
    setPriority("training-first");
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Shell
      id="tcg-map-topology"
      kind="prerequisite-frontier-elimination"
      title="实验一：逐次删除零入度前沿"
    >
      <Field label="就绪节点的取出优先级">
        <select
          data-param="priority"
          aria-label="就绪节点的取出优先级"
          className={inputClass}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="training-first">训练优先 T,P,E,N,A,G</option>
          <option value="representation-first">表征优先 E,P,N,A,T,G</option>
        </select>
      </Field>
      <Fault id="drop-N-T" active={fault} onClick={() => setFault((v) => !v)}>
        规划时漏掉 N→T 先修边
      </Fault>
      <TopologyPlot
        key={`${priority}:${fault}:${generation}`}
        priority={priority}
        fault={fault}
        reset={reset}
      />
    </Shell>
  );
}
const TASK_NAMES: Record<TaskId, string> = {
  R: "阅读",
  V: "向量",
  F: "前向",
  B: "反向",
  C: "对照",
};
function SchedulePlot({
  workers,
  forward,
  fault,
  reset,
}: {
  workers: number;
  forward: number;
  fault: boolean;
  reset: () => void;
}) {
  const model = schedule(workers, forward, fault);
  const timeline = useMapTrace(model.events.map((t) => `时刻 t=${t}`));
  const t = model.events[timeline.currentStep],
    scale = 205 / 14,
    x = (n: number) => coord(65 + n * scale);
  const occupancy = t < model.makespan ? model.occupancy[t] : 0;
  return (
    <>
      <svg
        viewBox="0 0 280 410"
        role="img"
        aria-label="五任务甘特图与逐时刻并行占用阶梯；竖线为当前时刻，横线为容量"
        fill={C.ink}
        fontSize="13"
      >
        <text x="5" y="18">
          区间均为左闭右开 [开始,结束)
        </text>
        {model.tasks.map((a, i) => (
          <g key={a.id} data-task={a.id} data-start={a.start} data-end={a.end}>
            <text x="2" y={57 + i * 40}>
              {a.id} {TASK_NAMES[a.id]}
            </text>
            <rect
              x={x(a.start)}
              y={38 + i * 40}
              width={coord(a.duration * scale)}
              height="27"
              rx="3"
              fill={C.accent}
              fillOpacity={a.start <= t && t < a.end ? 0.6 : 0.15}
              stroke={C.accent}
              strokeWidth={a.id !== "V" || forward === 3 ? 2.5 : 1}
            />
            <text
              x={x(a.start + a.duration / 2)}
              y={57 + i * 40}
              textAnchor="middle"
            >
              {a.duration}
            </text>
          </g>
        ))}
        {[0, 2, 5, 9, 12, 14].map((n) => (
          <text key={n} x={x(n)} y="250" textAnchor="middle" fill={C.muted}>
            {n}
          </text>
        ))}
        <text x="5" y="277">
          占用量（人数），虚线=容量{workers}
        </text>
        {[1, 2, 3].map((n) => (
          <text key={n} x="42" y={353 - n * 20} textAnchor="end">
            {n}
          </text>
        ))}
        <path
          data-occupancy="step"
          d={
            `M${x(0)},350 ` +
            model.occupancy
              .map(
                (n, i) =>
                  `L${x(i)},${350 - n * 20} L${x(i + 1)},${350 - n * 20}`,
              )
              .join(" ") +
            ` L${x(model.makespan)},350`
          }
          fill="none"
          stroke={C.accent}
          strokeWidth="2.5"
        />
        {model.overload.map((n) => (
          <rect
            key={n}
            data-overload-at={n}
            x={x(n)}
            y="300"
            width={coord(scale)}
            height="50"
            fill={C.danger}
            fillOpacity="0.12"
          />
        ))}
        <line
          x1="65"
          x2="270"
          y1={350 - workers * 20}
          y2={350 - workers * 20}
          stroke={C.danger}
          strokeDasharray="5 4"
        />
        <line
          x1={x(t)}
          x2={x(t)}
          y1="29"
          y2="356"
          stroke={C.ink}
          strokeDasharray="3 3"
        />
        <text x="5" y="386">
          当前 t={t}，运行任务数={occupancy}
        </text>
      </svg>
      <output
        data-readout="schedule"
        data-makespan={model.makespan}
        data-critical={model.critical}
        data-work={model.work}
        data-time={t}
        data-occupancy={occupancy}
        data-overload={model.overload.join(",")}
        data-valid={String(model.valid)}
        className="block text-sm"
        aria-live="polite"
      >
        总工作量 {model.work}；关键路径下界 {model.critical}；本排程结束于{" "}
        {model.makespan}。
        {model.valid
          ? "容量与先修约束均满足。"
          : `容量违例时刻 ${model.overload.join("、")}（每格一单位时间）。不能把这个结束时刻当作可行最短时间。`}
      </output>
      <Controls timeline={timeline} reset={reset} />
    </>
  );
}
export function TcgOfficialLearningMapComputeTraceLab() {
  const [workers, setWorkers] = useState(1),
    [forward, setForward] = useState(4),
    [fault, setFault] = useState(false),
    [generation, setGeneration] = useState(0);
  const reset = () => {
    setWorkers(1);
    setForward(4);
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Shell
      id="tcg-map-schedule"
      kind="resource-capacity-gantt"
      title="实验二：关键路径不等于单人耗时"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="可同时执行的任务数">
          <select
            data-param="workers"
            aria-label="可同时执行的任务数"
            className={inputClass}
            value={workers}
            onChange={(e) => setWorkers(Number(e.target.value))}
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} 个并行名额
              </option>
            ))}
          </select>
        </Field>
        <Field label="前向任务 F 的耗时">
          <select
            data-param="forward-duration"
            aria-label="前向任务 F 的耗时"
            className={inputClass}
            value={forward}
            onChange={(e) => setForward(Number(e.target.value))}
          >
            {[3, 4, 6].map((n) => (
              <option key={n} value={n}>
                {n} 单位时间
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        id="ignore-capacity"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        只保留依赖，忽略并行名额
      </Fault>
      <SchedulePlot
        key={`${workers}:${forward}:${fault}:${generation}`}
        workers={workers}
        forward={forward}
        fault={fault}
        reset={reset}
      />
    </Shell>
  );
}
const HYP_NAMES = ["H0无错", "H1切词", "H2遮罩", "H3单位"];
const HPOS = [
  [60, 280],
  [220, 280],
  [60, 365],
  [220, 365],
];
function DiagnosticPlot({
  objective,
  hypotheses,
  fault,
  reset,
}: {
  objective: Objective;
  hypotheses: number;
  fault: boolean;
  reset: () => void;
}) {
  const model = diagnose(objective, hypotheses, fault);
  const timeline = useMapTrace([
    "尚未观察",
    ...model.tests.map((t) => `加入实验 ${t}`),
  ]);
  const used = model.tests.slice(0, timeline.currentStep);
  const distinguish = (a: number, b: number) =>
    used.some((t) => RESPONSE[t][a] !== RESPONSE[t][b]);
  const remaining = model.pairs.filter(([a, b]) => !distinguish(a, b));
  return (
    <>
      <svg
        viewBox="0 0 280 420"
        role="img"
        aria-label="实验对假设的二进制响应矩阵与无法区分的假设对；下图每条实线表示仍有歧义"
        fontSize="13"
        fill={C.ink}
      >
        <text x="4" y="18">
          0/1为预设响应，不是正确率
        </text>
        {Array.from({ length: hypotheses }, (_, h) => (
          <text key={h} x={104 + h * 42} y="47" textAnchor="middle">
            H{h}
          </text>
        ))}
        {TESTS.map((test, i) => (
          <g
            key={test}
            data-test={test}
            data-selected={String(model.tests.includes(test))}
          >
            <text x="5" y={77 + i * 35}>
              {test} 费{COST[test]}
            </text>
            {Array.from({ length: hypotheses }, (_, h) => (
              <g key={h}>
                <rect
                  x={87 + h * 42}
                  y={55 + i * 35}
                  width="34"
                  height="30"
                  rx="3"
                  fill={
                    used.includes(test) && RESPONSE[test][h] ? C.accent : C.bg
                  }
                  fillOpacity={
                    used.includes(test) && RESPONSE[test][h] ? 0.3 : 1
                  }
                  stroke={model.tests.includes(test) ? C.accent : C.line}
                  strokeWidth={used.includes(test) ? 2 : 1}
                />
                <text x={104 + h * 42} y={76 + i * 35} textAnchor="middle">
                  {RESPONSE[test][h]}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="5" y="222">
          实线=仍有歧义，虚线=已区分
        </text>
        {model.pairs.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            data-pair={`${a}-${b}`}
            data-separated={String(distinguish(a, b))}
            x1={HPOS[a][0]}
            y1={HPOS[a][1]}
            x2={HPOS[b][0]}
            y2={HPOS[b][1]}
            stroke={distinguish(a, b) ? C.line : C.danger}
            strokeWidth={distinguish(a, b) ? 1 : 3}
            strokeDasharray={distinguish(a, b) ? "4 4" : undefined}
          />
        ))}
        {Array.from({ length: hypotheses }, (_, h) => (
          <g key={h}>
            <circle
              cx={HPOS[h][0]}
              cy={HPOS[h][1]}
              r="24"
              fill={C.bg}
              stroke={C.accent}
              strokeWidth="2"
            />
            <text x={HPOS[h][0]} y={HPOS[h][1] - 5} textAnchor="middle">
              {HYP_NAMES[h]}
            </text>
            <text x={HPOS[h][0]} y={HPOS[h][1] + 13} textAnchor="middle">
              {used.map((t) => RESPONSE[t][h]).join("") || "∅"}
            </text>
          </g>
        ))}
      </svg>
      <output
        data-readout="diagnostic"
        data-tests={model.tests.join(",")}
        data-cost={model.cost}
        data-count={model.tests.length}
        data-signatures={model.signatures.join(",")}
        data-unresolved={model.unresolved.map((p) => p.join("-")).join(",")}
        data-remaining={remaining.map((p) => p.join("-")).join(",")}
        data-valid={String(model.valid)}
        className="block text-sm"
        aria-live="polite"
      >
        选中 {model.tests.join("、")}，共{model.tests.length}个实验，成本
        {model.cost}。当前仍有歧义 {remaining.length} 对；完整执行后
        {model.valid
          ? "所有候选均可区分"
          : `仍无法区分 ${model.unresolved.map(([a, b]) => `H${a}/H${b}`).join("、")}`}
        。候选表只约束这个有限模型，不保证实际模型故障只有这些。
      </output>
      <Controls timeline={timeline} reset={reset} />
    </>
  );
}
export function TcgOfficialLearningMapEvidenceGateLab() {
  const [objective, setObjective] = useState<Objective>("fewest"),
    [hypotheses, setHypotheses] = useState(4),
    [fault, setFault] = useState(false),
    [generation, setGeneration] = useState(0);
  const reset = () => {
    setObjective("fewest");
    setHypotheses(4);
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Shell
      id="tcg-map-diagnosis"
      kind="diagnostic-pair-separation-cover"
      title="实验三：用最小实验集合区分错误来源"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="最小集合的目标">
          <select
            data-param="objective"
            aria-label="最小集合的目标"
            className={inputClass}
            value={objective}
            onChange={(e) => setObjective(e.target.value as Objective)}
          >
            <option value="fewest">实验数最少，成本打破平局</option>
            <option value="cost">总成本最少，数量打破平局</option>
          </select>
        </Field>
        <Field label="纳入诊断的假设">
          <select
            data-param="hypotheses"
            aria-label="纳入诊断的假设"
            className={inputClass}
            value={hypotheses}
            onChange={(e) => setHypotheses(Number(e.target.value))}
          >
            <option value={4}>H0–H3 全部四个</option>
            <option value={3}>H0–H2 仅前三个</option>
          </select>
        </Field>
      </div>
      <Fault
        id="omit-pair-0-3"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        求解时漏检 H0/H3 这一对
      </Fault>
      <DiagnosticPlot
        key={`${objective}:${hypotheses}:${fault}:${generation}`}
        objective={objective}
        hypotheses={hypotheses}
        fault={fault}
        reset={reset}
      />
    </Shell>
  );
}
