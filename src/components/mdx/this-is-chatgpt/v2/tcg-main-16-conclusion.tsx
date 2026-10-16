"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  bg: "var(--bg)",
  blue: "var(--accent)",
  red: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";
// Only drawing coordinates are canonicalized. Domain probabilities retain full precision.
const geo = (v: number) => (Number.isFinite(v) ? Number(v.toFixed(9)) : 0);
const fmt = (v: number) => v.toFixed(4);
const TAPES = { low: [0.2, 0.8, 0.4], high: [0.8, 0.2, 0.8] };
type Tape = keyof typeof TAPES;
function conditionalA(prefix: string, persistence: number, fault: boolean) {
  return prefix.length === 0 || fault
    ? 0.6
    : prefix.endsWith("A")
      ? persistence
      : 1 - persistence;
}
function generateThread(persistence: number, tape: Tape, fault: boolean) {
  let prefix = "";
  let joint = 1;
  const trace = [{ prefix, probabilityA: 0.6, chosenProbability: 1, joint }];
  for (const u of TAPES[tape]) {
    const probabilityA = conditionalA(prefix, persistence, fault);
    const token = u < probabilityA ? "A" : "B";
    const chosenProbability = token === "A" ? probabilityA : 1 - probabilityA;
    joint *= chosenProbability;
    prefix += token;
    trace.push({ prefix, probabilityA, chosenProbability, joint });
  }
  return trace;
}
function probabilityTree(persistence: number, fault: boolean) {
  const nodes = [{ prefix: "", joint: 1, depth: 0, index: 0 }];
  for (let depth = 1; depth <= 3; depth++) {
    const parents = nodes.filter((n) => n.depth === depth - 1);
    parents.forEach((parent) => {
      const p = conditionalA(parent.prefix, persistence, fault);
      ["A", "B"].forEach((token, index) =>
        nodes.push({
          prefix: parent.prefix + token,
          joint: parent.joint * (index === 0 ? p : 1 - p),
          depth,
          index: parent.index * 2 + index,
        }),
      );
    });
  }
  return nodes;
}
const CORPUS_A = [
  [9, 1],
  [2, 8],
];
const CORPUS_B = [
  [3, 7],
  [8, 2],
];
function corpusShift(mixture: number, fault: boolean) {
  const counts = CORPUS_A.map((row, i) =>
    row.map((n, j) => (1 - mixture) * n + mixture * CORPUS_B[i][j]),
  );
  const pooled = (counts[0][0] + counts[1][0] + 2) / 24;
  const probabilities = counts.map((row) =>
    fault ? pooled : (row[0] + 1) / 12,
  );
  return { counts, probabilities, pooled };
}
const TASKS = Array.from({ length: 16 }, (_, n) =>
  n.toString(2).padStart(4, "0"),
);
function parityRun(bits: string, budget: number) {
  const states = [0];
  for (let i = 0; i < 4; i++)
    states.push(i < budget ? (states[i] + Number(bits[i])) % 2 : states[i]);
  const target = [...bits].reduce((s, b) => (s + Number(b)) % 2, 0);
  return {
    states,
    prediction: states[4],
    target,
    correct: states[4] === target,
  };
}
function evaluateParity(budget: number, fault: boolean) {
  const rows = TASKS.map((bits) => ({
    bits,
    train: bits.endsWith("00"),
    ...parityRun(bits, budget),
  }));
  const train = rows.filter((r) => r.train);
  const heldout = rows.filter((r) => !r.train);
  const reported = fault ? train : heldout;
  return {
    rows,
    trainingCorrect: train.filter((r) => r.correct).length,
    actualCorrect: heldout.filter((r) => r.correct).length,
    actualTotal: heldout.length,
    reportedCorrect: reported.filter((r) => r.correct).length,
    reportedTotal: reported.length,
  };
}
const labels = {
  thread: ["起始", "第一词元", "第二词元", "第三词元"],
  shift: ["语料A", "语料B", "混合计数", "条件分布"],
  parity: ["初始状态", "输入第1位", "输入第2位", "输入第3位", "输入第4位"],
};
const steps = {
  thread: labels.thread.map((label) => ({ label })),
  shift: labels.shift.map((label) => ({ label })),
  parity: labels.parity.map((label) => ({ label })),
};
function useScan(kind: keyof typeof labels) {
  const t = useTeachingTimeline({
    steps: steps[kind],
    build: (tl) => {
      const clock = { value: 0 };
      labels[kind].forEach((label, i) => tl.label(label, i * 800));
      tl.add(
        clock,
        { value: 1, duration: (labels[kind].length - 1) * 800, ease: "linear" },
        0,
      );
    },
  });
  const { reducedMotion, pause } = t;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return t;
}
function rewind(t: TeachingTimeline) {
  t.pause();
  t.seek(0);
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
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-bg p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11"
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Choice({
  name,
  label,
  value,
  options,
  change,
}: {
  name: string;
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  change: (v: string) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        data-control={name}
        aria-label={label}
        value={value}
        onChange={(e) => change(e.target.value)}
        className={`${control} mt-1 block w-full`}
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Fault({
  name,
  active,
  change,
  children,
}: {
  name: string;
  active: boolean;
  change: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={name}
      aria-pressed={active}
      className={`${control} my-3 ${active ? "text-danger" : ""}`}
      onClick={change}
    >
      {children}：{active ? "开" : "关"}
    </button>
  );
}
function Controls({ t, reset }: { t: TeachingTimeline; reset: () => void }) {
  return (
    <div
      className="mt-4 [&_div.flex]:flex-wrap"
      data-control="transport"
      data-timeline
      data-frame={t.currentStep}
      data-playing={t.isPlaying}
      data-reduced-motion={t.reducedMotion}
    >
      <TimelineControls
        timeline={t}
        caption={
          t.reducedMotion
            ? "减少动态：禁自动播放，可手动步进。"
            : "默认暂停，每帧800ms。"
        }
      />
      <button
        className={`${control} mt-3`}
        data-reset="full"
        type="button"
        onClick={reset}
      >
        完整重置
      </button>
    </div>
  );
}

export function TcgMain16ConclusionContextContractLab() {
  const [persistence, setPersistence] = useState(0.75);
  const [tape, setTape] = useState<Tape>("low");
  const [fault, setFault] = useState(false);
  const t = useScan("thread");
  const trace = generateThread(persistence, tape, fault);
  const row = trace[t.currentStep];
  const nodes = probabilityTree(persistence, fault);
  const x = (depth: number, index: number) =>
    geo((280 * (index + 0.5)) / 2 ** depth);
  const y = (depth: number) => 30 + depth * 85;
  const reset = () => {
    rewind(t);
    setPersistence(0.75);
    setTape("low");
    setFault(false);
  };
  return (
    <Shell
      id="conditional-thread"
      kind="conditional-thread-probability-tree"
      title="实验一：同一张条件表，走出不同文本路径"
    >
      <p className="mb-3 text-sm">
        手工A/B符号，不是训练语言模型。起始P(A)=0.6；A后P(A)=q，B后P(A)=1−q。边越粗表示到达该子节点的联合质量越大。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="persistence"
          label="延续参数q"
          value={String(persistence)}
          options={[
            ["0.6", "q = 0.60"],
            ["0.75", "q = 0.75"],
            ["0.9", "q = 0.90"],
          ]}
          change={(v) => {
            t.pause();
            setPersistence(Number(v));
          }}
        />
        <Choice
          name="draw-tape"
          label="固定抽样带u"
          value={tape}
          options={[
            ["low", "0.2 / 0.8 / 0.4"],
            ["high", "0.8 / 0.2 / 0.8"],
          ]}
          change={(v) => {
            t.pause();
            setTape(v as Tape);
          }}
        />
      </div>
      <Fault
        name="frozen-context"
        active={fault}
        change={() => {
          t.pause();
          setFault(!fault);
        }}
      >
        故障：每步仍用起始0.6
      </Fault>
      <svg
        viewBox="0 0 280 435"
        role="img"
        aria-label="三层联合概率树及累计似然折线"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        {nodes
          .filter((n) => n.depth > 0)
          .map((n) => {
            const selected =
              row.prefix.startsWith(n.prefix) && n.depth <= t.currentStep;
            return (
              <line
                key={n.prefix}
                x1={x(n.depth - 1, Math.floor(n.index / 2))}
                y1={y(n.depth - 1)}
                x2={x(n.depth, n.index)}
                y2={y(n.depth)}
                stroke={selected ? C.red : C.blue}
                strokeWidth={geo(1 + 9 * n.joint)}
                opacity={selected ? 1 : 0.3}
              />
            );
          })}
        {nodes.map((n) => (
          <g key={n.prefix}>
            <circle
              cx={x(n.depth, n.index)}
              cy={y(n.depth)}
              r={geo(3 + 6 * Math.sqrt(n.joint))}
              fill={row.prefix === n.prefix ? C.red : C.blue}
            />
            <text
              x={x(n.depth, n.index)}
              y={y(n.depth) + 24}
              textAnchor="middle"
              fill={C.text}
            >
              {n.prefix || "起始"}
            </text>
          </g>
        ))}
        <text x={8} y={341} fill={C.text}>
          累计P：1→{fmt(trace[3].joint)}
        </text>
        <line x1={28} y1={405} x2={254} y2={405} stroke={C.border} />
        <polyline
          points={trace
            .map((r, i) => `${30 + i * 74},${geo(405 - 48 * r.joint)}`)
            .join(" ")}
          stroke={C.blue}
          strokeWidth={2}
          fill="none"
        />
        {trace.map((r, i) => (
          <g key={i}>
            <circle
              cx={30 + i * 74}
              cy={geo(405 - 48 * r.joint)}
              r={i === t.currentStep ? 5 : 3}
              fill={i === t.currentStep ? C.red : C.blue}
            />
            <text x={30 + i * 74} y={429} textAnchor="middle" fill={C.muted}>
              t={i}
            </text>
          </g>
        ))}
      </svg>
      <output
        data-readout="thread-likelihood"
        aria-live="polite"
        className="mt-2 block break-words text-sm"
      >
        当前前缀={row.prefix || "∅"}；本步P(A)={fmt(row.probabilityA)}
        ；选中条件概率={fmt(row.chosenProbability)}；累计P=
        {row.joint.toFixed(6)}。完整路径={trace[3].prefix}；完整P=
        {trace[3].joint.toFixed(6)}。
      </output>
      <p className="mt-2 text-sm text-secondary">
        红色只标当前已走前缀；整棵树是同一规则的所有八种三词元续写。似然是路径概率，不是真实性或理解程度。
      </p>
      <Controls t={t} reset={reset} />
    </Shell>
  );
}

export function TcgMain16ConclusionComputeTraceLab() {
  const [mixture, setMixture] = useState(0);
  const [context, setContext] = useState("draft");
  const [fault, setFault] = useState(false);
  const t = useScan("shift");
  const result = corpusShift(mixture, fault);
  const baseline = corpusShift(0, false);
  const counts =
    t.currentStep === 0
      ? CORPUS_A
      : t.currentStep === 1
        ? CORPUS_B
        : result.counts;
  const contextIndex = context === "draft" ? 0 : 1;
  const px = (p: number) => geo(52 + 190 * p);
  const reset = () => {
    rewind(t);
    setMixture(0);
    setContext("draft");
    setFault(false);
  };
  return (
    <Shell
      id="corpus-counterfactual"
      kind="corpus-context-mixture-dumbbell"
      title="实验二：语料与上下文怎样移动同一句续写的概率"
    >
      <p className="mb-3 text-sm">
        “是/否”只是候选符号。两份各20条手工语料，行是草稿/核验，列是是/否。气泡面积表示计数；蓝环是语料A基线，实点是混合后的条件概率。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="corpus-mixture"
          label="语料B混合比例m"
          value={String(mixture)}
          options={[
            ["0", "m = 0"],
            ["0.25", "m = 0.25"],
            ["0.5", "m = 0.50"],
            ["0.75", "m = 0.75"],
            ["1", "m = 1"],
          ]}
          change={(v) => {
            t.pause();
            setMixture(Number(v));
          }}
        />
        <Choice
          name="context"
          label="待续写的上下文"
          value={context}
          options={[
            ["draft", "草稿"],
            ["verified", "核验"],
          ]}
          change={(v) => {
            t.pause();
            setContext(v);
          }}
        />
      </div>
      <Fault
        name="pooled-context"
        active={fault}
        change={() => {
          t.pause();
          setFault(!fault);
        }}
      >
        故障：忽略上下文合并两行
      </Fault>
      <svg
        viewBox="0 0 280 420"
        role="img"
        aria-label="语料计数气泡矩阵与上下文条件分布位移"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        <text x={8} y={19} fill={C.text}>
          计数：
          {t.currentStep < 2
            ? t.currentStep === 0
              ? "语料A"
              : "语料B"
            : `混合m=${mixture}`}
        </text>
        {["是", "否"].map((s, j) => (
          <text
            key={s}
            x={120 + j * 90}
            y={48}
            textAnchor="middle"
            fill={C.text}
          >
            {s}
          </text>
        ))}
        {counts.map((r, i) => (
          <g key={i}>
            <text
              x={8}
              y={95 + i * 76}
              fill={contextIndex === i ? C.blue : C.text}
            >
              {i === 0 ? "草稿" : "核验"}
            </text>
            {r.map((n, j) => (
              <g key={j}>
                <circle
                  cx={120 + j * 90}
                  cy={90 + i * 76}
                  r={geo(8 * Math.sqrt(n))}
                  fill={j === 0 ? C.blue : C.red}
                  fillOpacity={0.16}
                  stroke={contextIndex === i ? C.blue : C.border}
                  strokeWidth={contextIndex === i ? 2 : 1}
                />
                <text
                  x={120 + j * 90}
                  y={95 + i * 76}
                  textAnchor="middle"
                  fill={C.text}
                >
                  {Number(n.toFixed(2))}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={8} y={220} fill={C.text}>
          P(是 | 上下文)：每候选加1
        </text>
        {[0, 1].map((i) => (
          <g key={i}>
            <text x={8} y={253 + i * 80} fill={C.text}>
              {i === 0 ? "草稿" : "核验"}：{fmt(result.probabilities[i])}
            </text>
            <line
              x1={52}
              y1={275 + i * 80}
              x2={242}
              y2={275 + i * 80}
              stroke={C.border}
            />
            <line
              x1={px(baseline.probabilities[i])}
              y1={275 + i * 80}
              x2={px(result.probabilities[i])}
              y2={275 + i * 80}
              stroke={fault ? C.red : C.blue}
              strokeWidth={contextIndex === i ? 5 : 2}
            />
            <circle
              cx={px(baseline.probabilities[i])}
              cy={275 + i * 80}
              r={7}
              fill={C.bg}
              stroke={C.blue}
              strokeWidth={2}
            />
            <circle
              cx={px(result.probabilities[i])}
              cy={275 + i * 80}
              r={contextIndex === i ? 5 : 3}
              fill={fault ? C.red : C.blue}
            />
            <text x={52} y={300 + i * 80} textAnchor="middle" fill={C.muted}>
              0
            </text>
            <text x={242} y={300 + i * 80} textAnchor="middle" fill={C.muted}>
              1
            </text>
          </g>
        ))}
        <text x={8} y={412} fill={C.muted}>
          圆环=原始A；点=当前；连线=位移
        </text>
      </svg>
      <output
        data-readout="conditional-shift"
        aria-live="polite"
        className="mt-2 block break-words text-sm"
      >
        m={mixture}；上下文={contextIndex === 0 ? "草稿" : "核验"}；P(是)=
        {result.probabilities[contextIndex].toFixed(6)}；两行混合计数=
        {result.counts.map((r) => `[${r.join(",")}]`).join(" / ")}。
        {fault ? "故障抹平上下文差异。" : "上下文不同，条件分母分别计算。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        时间线先检查两份输入，再看混合与条件化；下面保留最终位移作对照。真实神经网络不是逐字统计查表；候选高频也不等于事实正确。
      </p>
      <Controls t={t} reset={reset} />
    </Shell>
  );
}

export function TcgMain16ConclusionEvidenceGateLab() {
  const [budget, setBudget] = useState(2);
  const [bits, setBits] = useState("0001");
  const [fault, setFault] = useState(false);
  const t = useScan("parity");
  const result = evaluateParity(budget, fault);
  const run = parityRun(bits, budget);
  const ordered = [
    ...result.rows.filter((r) => r.train),
    ...result.rows.filter((r) => !r.train),
  ];
  const reset = () => {
    rewind(t);
    setBudget(2);
    setBits("0001");
    setFault(false);
  };
  return (
    <Shell
      id="finite-heldout"
      kind="finite-parity-execution-holdout-grid"
      title="实验三：计算跑完，不等于新任务做对"
    >
      <p className="mb-3 text-sm">
        四位串的目标是全部1的个数模2。此手工程序只读前b位；不是训练模型。第一行4个训练例末两位均00；其余12例是独立留出，不隐藏失败样本。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="read-budget"
          label="读取位数b"
          value={String(budget)}
          options={[
            ["1", "b = 1"],
            ["2", "b = 2"],
            ["3", "b = 3"],
            ["4", "b = 4"],
          ]}
          change={(v) => {
            t.pause();
            setBudget(Number(v));
          }}
        />
        <Choice
          name="heldout-input"
          label="跟踪的留出输入"
          value={bits}
          options={result.rows
            .filter((r) => !r.train)
            .map((r) => [r.bits, r.bits] as const)}
          change={(v) => {
            t.pause();
            setBits(v);
          }}
        />
      </div>
      <Fault
        name="train-as-heldout"
        active={fault}
        change={() => {
          t.pause();
          setFault(!fault);
        }}
      >
        故障：把训练例报作留出
      </Fault>
      <svg
        viewBox="0 0 280 465"
        role="img"
        aria-label="有限奇偶计算状态链与十六个任务逐例结果"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        <text x={8} y={20} fill={C.text}>
          状态s ← (s + bit) mod 2
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              x1={20 + i * 60}
              y1={72}
              x2={80 + i * 60}
              y2={72}
              stroke={i < budget ? C.blue : C.border}
              strokeWidth={i < t.currentStep && i < budget ? 4 : 2}
              strokeDasharray={i >= budget ? "4 4" : undefined}
            />
            <text
              x={50 + i * 60}
              y={48}
              textAnchor="middle"
              fill={i < budget ? C.text : C.muted}
            >
              {bits[i]}
            </text>
          </g>
        ))}
        {run.states.map((s, i) => (
          <g key={i}>
            <circle
              cx={20 + i * 60}
              cy={72}
              r={13}
              fill={C.bg}
              stroke={i === t.currentStep ? C.red : C.blue}
              strokeWidth={i === t.currentStep ? 3 : 1}
            />
            <text x={20 + i * 60} y={77} textAnchor="middle" fill={C.text}>
              {s}
            </text>
            <text x={20 + i * 60} y={106} textAnchor="middle" fill={C.muted}>
              s{i}
            </text>
          </g>
        ))}
        <text x={8} y={137} fill={C.text}>
          预测{run.prediction} / 目标{run.target}；b后虚线=未读
        </text>
        <text x={8} y={173} fill={fault ? C.red : C.text}>
          {fault ? "训练行被错报作测试（红框）" : "首行训练；后三行独立留出"}
        </text>
        <rect
          x={7}
          y={188}
          width={266}
          height={55}
          rx={6}
          fill={C.blue}
          fillOpacity={0.06}
          stroke={fault ? C.red : C.border}
          strokeWidth={fault ? 3 : 1}
        />
        {ordered.map((r, n) => {
          const cx = 41 + (n % 4) * 66;
          const cy = 210 + Math.floor(n / 4) * 62;
          return (
            <g key={r.bits}>
              <circle
                cx={cx}
                cy={cy}
                r={12}
                fill={r.correct ? C.blue : C.red}
                fillOpacity={0.2}
                stroke={bits === r.bits ? C.text : r.correct ? C.blue : C.red}
                strokeWidth={bits === r.bits ? 3 : 1}
              />
              <text x={cx} y={cy + 5} textAnchor="middle" fill={C.text}>
                {r.correct ? "✓" : "×"}
              </text>
              <text x={cx} y={cy + 30} textAnchor="middle" fill={C.text}>
                {r.bits}
              </text>
            </g>
          );
        })}
        <text x={8} y={459} fill={C.muted}>
          蓝✓=相符；红×=不符；细框=当前输入
        </text>
      </svg>
      <output
        data-readout="heldout-counts"
        aria-live="polite"
        className="mt-2 block break-words text-sm"
      >
        当前状态s{t.currentStep}={run.states[t.currentStep]}；{bits}预测=
        {run.prediction}，目标={run.target}。训练={result.trainingCorrect}
        /4；reported留出={result.reportedCorrect}/{result.reportedTotal}
        ；actual独立留出={result.actualCorrect}/{result.actualTotal}。
      </output>
      <p className="mt-2 text-sm text-secondary">
        预算变大改变实际读取边数与逐例结果；污染故障只改评估归属，不改程序输出。16例全枚举是这个任务的观测，不是ChatGPT准确率或能力上限。
      </p>
      <Controls t={t} reset={reset} />
    </Shell>
  );
}
