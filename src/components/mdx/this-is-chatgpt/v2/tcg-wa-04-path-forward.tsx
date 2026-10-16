"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const color = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  active: "var(--accent)",
  good: "var(--success)",
  bad: "var(--danger)",
};
const button =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const treeSteps: readonly TeachingStep[] = [
  { label: "两个解释" },
  { label: "澄清约束" },
  { label: "执行结果" },
];
const cellSteps: readonly TeachingStep[] = [
  { label: "旧缓存" },
  { label: "传播失效" },
  { label: "增量重算" },
];
const forkSteps: readonly TeachingStep[] = [
  { label: "冻结旧实验" },
  { label: "反馈分叉" },
  { label: "探针与重放" },
];
function useClock(steps: readonly TeachingStep[]) {
  const clock = useTeachingTimeline({
    steps,
    build: (tl) => {
      const cursor = { value: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 1000);
        tl.add(
          cursor,
          { value: i + 1, duration: 1000, ease: "linear" },
          i * 1000,
        );
      });
    },
  });
  const { pause, reducedMotion } = clock;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return clock;
}
function Select({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  value: number;
  options: readonly (readonly [number, string])[];
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      <select
        data-param={name}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="min-h-11 min-w-11 w-full rounded border border-border bg-background px-2 text-primary"
      >
        {options.map(([v, s]) => (
          <option value={v} key={v}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}
function Fault({
  name,
  active,
  toggle,
  children,
}: {
  name: string;
  active: boolean;
  toggle: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={name}
      aria-pressed={active}
      className={`${button} mt-3 w-full whitespace-normal ${active ? "border-danger text-danger" : "text-secondary"}`}
      onClick={toggle}
    >
      {active ? "故障开：" : "故障关："}
      {children}
    </button>
  );
}
function Shell({
  kind,
  title,
  clock,
  reset,
  children,
}: {
  kind: string;
  title: string;
  clock: TeachingTimeline;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={kind}
      data-visual-kind={kind}
      data-frame={clock.currentStep}
      data-playing={clock.isPlaying}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        有限手写示例，不连接模型或工具服务。下方读数给出当前参数的完整计算；播放逐步检查图中的状态。
      </p>
      {children}
      <div data-controls={kind}>
        <TimelineControls timeline={clock} />
      </div>
      <button
        type="button"
        data-reset={kind}
        className={`${button} mx-auto mt-3 block`}
        onClick={reset}
      >
        完整重置
      </button>
    </section>
  );
}
function resolveInterpretation(
  x: number,
  clarification: number,
  fault: boolean,
) {
  const values = [x * x + 1, (x + 1) * (x + 1)];
  const candidates = clarification === 0 ? [0, 1] : [clarification - 1];
  const selected = fault ? 0 : candidates.length === 1 ? candidates[0] : null;
  return {
    values,
    candidates,
    selected,
    output: selected === null ? null : values[selected],
  };
}

export function TcgWa04PathForwardContextContractLab() {
  const [x, setX] = useState(2);
  const [clarification, setClarification] = useState(0);
  const [fault, setFault] = useState(false);
  const clock = useClock(treeSteps);
  const kind = "clarification-constrained-expression-forest";
  const result = resolveInterpretation(x, clarification, fault);
  const reset = () => {
    setX(2);
    setClarification(0);
    setFault(false);
    clock.pause();
    clock.seek(0);
  };
  return (
    <Shell
      kind={kind}
      title="解释森林：先保留歧义，再执行"
      clock={clock}
      reset={reset}
    >
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Select
          name="expression-input"
          label="输入 x"
          value={x}
          options={[
            [2, "2"],
            [3, "3"],
            [4, "4"],
          ]}
          onChange={setX}
        />
        <Select
          name="clarification"
          label="澄清回答"
          value={clarification}
          options={[
            [0, "尚未澄清"],
            [1, "先平方再加一"],
            [2, "先加一再平方"],
          ]}
          onChange={setClarification}
        />
      </div>
      <Fault
        name="execute-first-interpretation"
        active={fault}
        toggle={() => setFault(!fault)}
      >
        无视澄清，固定执行左树
      </Fault>
      <svg
        viewBox="0 0 320 376"
        role="img"
        aria-label="两个不同运算次序的表达式树与澄清后可执行的分支"
        className="mt-3 block h-auto w-full"
        fontSize={16}
        fill={color.text}
      >
        <text x={160} y={23} textAnchor="middle">
          含糊请求：把 x 加一平方
        </text>
        {[0, 1].map((i) => {
          const cx = i === 0 ? 80 : 240;
          const retained = result.candidates.includes(i);
          const chosen = result.selected === i;
          const pruned = clock.currentStep >= 1 && !retained;
          const stroke =
            chosen && fault && clock.currentStep === 2
              ? color.bad
              : pruned
                ? color.muted
                : chosen && clock.currentStep === 2
                  ? fault
                    ? color.bad
                    : color.good
                  : color.active;
          return (
            <g
              key={i}
              data-interpretation={
                i === 0 ? "square-then-add" : "add-then-square"
              }
              data-retained={retained}
              opacity={pruned ? 0.4 : 1}
            >
              <text x={cx} y={54} textAnchor="middle">
                {i === 0 ? "x² + 1" : "(x + 1)²"}
              </text>
              <path
                d={
                  i === 0
                    ? `M ${cx} 112 L ${cx - 32} 137 M ${cx} 112 L ${cx + 32} 147 M ${cx - 32} 179 L ${cx - 32} 211`
                    : `M ${cx} 112 L ${cx} 137 M ${cx} 179 L ${cx - 32} 211 M ${cx} 179 L ${cx + 32} 211`
                }
                stroke={stroke}
                strokeWidth={chosen || clock.currentStep === 1 ? 4 : 2}
                strokeDasharray={pruned ? "5 4" : undefined}
                fill="none"
              />
              <circle
                cx={cx}
                cy={91}
                r={21}
                fill={color.bg}
                stroke={stroke}
                strokeWidth={chosen || clock.currentStep === 0 ? 4 : 2}
              />
              <text x={cx} y={97} textAnchor="middle">
                {i === 0 ? "+" : "²"}
              </text>
              <circle
                cx={i === 0 ? cx - 32 : cx}
                cy={158}
                r={21}
                fill={color.bg}
                stroke={stroke}
              />
              <text x={i === 0 ? cx - 32 : cx} y={164} textAnchor="middle">
                {i === 0 ? "²" : "+"}
              </text>
              {i === 0 && (
                <text x={cx + 32} y={164} textAnchor="middle">
                  1
                </text>
              )}
              {i === 1 && (
                <text x={cx + 32} y={229} textAnchor="middle">
                  1
                </text>
              )}
              <text x={cx - 32} y={229} textAnchor="middle">
                {`x=${x}`}
              </text>
              <rect
                x={cx - 50}
                y={251}
                width={result.values[i] * 4}
                height={17}
                fill={stroke}
                opacity={clock.currentStep === 2 ? 0.85 : 0.25}
              />
              <text x={cx} y={292} textAnchor="middle">
                计算得 {result.values[i]}
              </text>
              {pruned && (
                <path
                  d={`M ${cx - 55} 70 L ${cx + 55} 235`}
                  stroke={color.muted}
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
        <path
          d="M 160 41 L 80 63 M 160 41 L 240 63"
          stroke={color.border}
          fill="none"
        />
        <text x={160} y={328} textAnchor="middle">
          允许解释：{result.candidates.length} 棵
        </text>
        <text
          x={160}
          y={356}
          textAnchor="middle"
          fill={fault ? color.bad : color.good}
        >
          {result.output === null
            ? "等待澄清，不执行"
            : `实际执行结果：${result.output}`}
        </text>
      </svg>
      <p
        data-readout="interpretation-result"
        data-values={result.values.join(",")}
        data-candidates={result.candidates.length}
        data-selected={result.selected === null ? "none" : result.selected}
        data-output={result.output === null ? "blocked" : result.output}
        className="text-sm"
        aria-live="polite"
      >
        两种值 {result.values.join(" / ")}；保留 {result.candidates.length}{" "}
        种；输出 {result.output === null ? "阻塞" : result.output}
        。两棵树各自算对，也不能替用户选含义。
      </p>
    </Shell>
  );
}

const dependencies: Record<string, readonly string[]> = {
  a: [],
  b: [],
  s: ["a", "b"],
  q: ["s"],
  d: ["a", "b"],
  t: ["q", "d"],
};
const cellOrder = ["s", "q", "d", "t"];
const cellPositions: Record<string, readonly [number, number]> = {
  a: [85, 38],
  b: [235, 38],
  s: [85, 142],
  d: [235, 142],
  q: [85, 247],
  t: [235, 350],
};
function recomputeNotebook(
  input: number,
  value: number,
  budget: number,
  fault: boolean,
) {
  const edited = input === 0 ? "a" : "b";
  const old: Record<string, number> = { a: 2, b: 1, s: 3, q: 9, d: 1, t: 10 };
  const values = { ...old, [edited]: value };
  const dirty = new Set<string>();
  for (const name of cellOrder) {
    if (fault && name === "q") continue;
    if (dependencies[name].some((p) => p === edited || dirty.has(p)))
      dirty.add(name);
  }
  const schedule = cellOrder.filter((n) => dirty.has(n));
  const done = schedule.slice(0, budget);
  for (const name of done) {
    if (name === "s") values.s = values.a + values.b;
    if (name === "q") values.q = values.s * values.s;
    if (name === "d") values.d = values.a - values.b;
    if (name === "t") values.t = values.q + values.d;
  }
  const expected = (values.a + values.b) ** 2 + values.a - values.b;
  const pending = schedule.filter((n) => !done.includes(n));
  return {
    edited,
    old,
    values,
    dirty: [...dirty],
    schedule,
    done,
    pending,
    expected,
    reported: values.t,
    claimedReady: pending.length === 0,
    correct: pending.length === 0 && values.t === expected,
  };
}
export function TcgWa04PathForwardComputeTraceLab() {
  const [input, setInput] = useState(0);
  const [value, setValue] = useState(4);
  const [budget, setBudget] = useState(4);
  const [fault, setFault] = useState(false);
  const clock = useClock(cellSteps);
  const kind = "notebook-dirty-cell-recompute";
  const r = recomputeNotebook(input, value, budget, fault);
  const reset = () => {
    setInput(0);
    setValue(4);
    setBudget(4);
    setFault(false);
    clock.pause();
    clock.seek(0);
  };
  const shown =
    clock.currentStep === 0
      ? r.old
      : clock.currentStep === 1
        ? { ...r.old, [r.edited]: value }
        : r.values;
  return (
    <Shell
      kind={kind}
      title="计算笔记：改一格，哪些缓存失效？"
      clock={clock}
      reset={reset}
    >
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Select
          name="edited-input"
          label="修改哪一个输入"
          value={input}
          options={[
            [0, "a（旧值2）"],
            [1, "b（旧值1）"],
          ]}
          onChange={setInput}
        />
        <Select
          name="replacement-value"
          label="输入新值"
          value={value}
          options={[
            [3, "3"],
            [4, "4"],
          ]}
          onChange={setValue}
        />
        <Select
          name="recompute-budget"
          label="最多重算格数"
          value={budget}
          options={[
            [0, "0"],
            [1, "1"],
            [2, "2"],
            [3, "3"],
            [4, "4"],
          ]}
          onChange={setBudget}
        />
      </div>
      <Fault
        name="omit-square-dependency"
        active={fault}
        toggle={() => setFault(!fault)}
      >
        漏掉 q 对 s 的依赖
      </Fault>
      <svg
        viewBox="0 0 320 480"
        role="img"
        aria-label="六个计算单元的依赖、失效传播和增量重算"
        className="mt-3 block h-auto w-full"
        fontSize={16}
        fill={color.text}
      >
        {Object.entries(dependencies).flatMap(([to, parents]) =>
          parents.map((from) => {
            const [x1, y1] = cellPositions[from];
            const [x2, y2] = cellPositions[to];
            const broken = fault && from === "s" && to === "q";
            return (
              <path
                key={`${from}-${to}`}
                data-dependency={`${from}-${to}`}
                d={`M ${x1} ${y1 + 25} L ${x2} ${y2 - 26}`}
                stroke={broken ? color.bad : color.border}
                strokeWidth={broken ? 4 : 2}
                strokeDasharray={broken ? "6 5" : undefined}
                fill="none"
              />
            );
          }),
        )}
        {Object.keys(cellPositions).map((name) => {
          const [cx, cy] = cellPositions[name];
          const dirty = clock.currentStep > 0 && r.dirty.includes(name);
          const done = clock.currentStep === 2 && r.done.includes(name);
          const pending = dirty && !done;
          const stroke = pending
            ? color.bad
            : done
              ? color.good
              : name === r.edited && clock.currentStep > 0
                ? color.active
                : color.border;
          return (
            <g
              key={name}
              data-cell={name}
              data-dirty={dirty}
              data-recomputed={done}
            >
              <rect
                x={cx - 58}
                y={cy - 26}
                width={116}
                height={64}
                rx={8}
                fill={color.bg}
                stroke={stroke}
                strokeWidth={pending || done ? 3 : 1}
                strokeDasharray={pending ? "5 4" : undefined}
              />
              <text x={cx} y={cy - 4} textAnchor="middle">
                {
                  (
                    {
                      a: "a",
                      b: "b",
                      s: "s=a+b",
                      q: "q=s²",
                      d: "d=a−b",
                      t: "t=q+d",
                    } as Record<string, string>
                  )[name]
                }
              </text>
              <text x={cx} y={cy + 18} textAnchor="middle">
                {shown[name]}
                {pending ? "（旧）" : ""}
              </text>
              <rect
                data-value-bar={name}
                x={cx - 48}
                y={cy + 29}
                width={Math.abs(shown[name]) * 2}
                height={5}
                fill={shown[name] < 0 ? color.bad : stroke}
              />
            </g>
          );
        })}
        {fault && (
          <text x={160} y={467} textAnchor="middle" fill={color.bad}>
            q 漏标，保留旧值 9
          </text>
        )}
        <text x={160} y={414} textAnchor="middle">
          计划顺序：{r.schedule.join(" → ")}
        </text>
        <text x={160} y={438} textAnchor="middle">
          已算 {r.done.length} 格 / 待算 {r.pending.length} 格
        </text>
      </svg>
      <p
        data-readout="notebook-result"
        data-dirty={r.dirty.join(",")}
        data-done={r.done.join(",")}
        data-pending={r.pending.join(",")}
        data-reported={r.reported}
        data-expected={r.expected}
        data-claimed-ready={r.claimedReady}
        data-correct={r.correct}
        className="text-sm"
        aria-live="polite"
      >
        预算执行后 t={r.reported}，全量重算应为 {r.expected}；
        {r.claimedReady ? "本地队列已空" : "仍有未重算格"}。
        {r.correct ? "本例一致。" : "不可把缓存值当作新的完整结果。"}
      </p>
    </Shell>
  );
}
function feedbackFork(k: number, p: number, branch: number, fault: boolean) {
  const delta = 2 * k + 1;
  const base = p * p;
  const patch = base + delta;
  const rule = (p + 1) * (p + 1);
  const selected = branch === 0 ? patch : rule;
  const saved = k * k;
  const fit = (k + 1) * (k + 1);
  const replay = fault ? fit : saved;
  return {
    delta,
    base,
    patch,
    rule,
    selected,
    expected: rule,
    saved,
    replay,
    fit,
    probePass: selected === rule,
    replayPass: replay === saved,
  };
}
const xy = (v: number) => Number(v.toFixed(9));
export function TcgWa04PathForwardEvidenceGateLab() {
  const [k, setK] = useState(2);
  const [p, setP] = useState(3);
  const [branch, setBranch] = useState(1);
  const [fault, setFault] = useState(false);
  const clock = useClock(forkSteps);
  const kind = "feedback-patch-regression-fork";
  const r = feedbackFork(k, p, branch, fault);
  const reset = () => {
    setK(2);
    setP(3);
    setBranch(1);
    setFault(false);
    clock.pause();
    clock.seek(0);
  };
  const plotX = (x: number) => 34 + (x - 1) * 78;
  const plotY = (y: number) => xy(365 - y * 6);
  const curves = [
    { id: "v0", stroke: color.muted, f: (x: number) => x * x },
    { id: "P", stroke: color.active, f: (x: number) => x * x + r.delta },
    { id: "R", stroke: color.good, f: (x: number) => (x + 1) ** 2 },
  ];
  return (
    <Shell
      kind={kind}
      title="执行反馈：拟合一例，还是保留可重放修订？"
      clock={clock}
      reset={reset}
    >
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Select
          name="feedback-input"
          label="反馈输入 k"
          value={k}
          options={[
            [2, "2 → 期望9"],
            [3, "3 → 期望16"],
          ]}
          onChange={setK}
        />
        <Select
          name="probe-input"
          label="独立探针 p"
          value={p}
          options={[
            [3, "3"],
            [4, "4"],
          ]}
          onChange={setP}
        />
        <Select
          name="revision-branch"
          label="选择新修订"
          value={branch}
          options={[
            [0, "P：只补常数"],
            [1, "R：改运算规则"],
          ]}
          onChange={setBranch}
        />
      </div>
      <Fault
        name="overwrite-saved-revision"
        active={fault}
        toggle={() => setFault(!fault)}
      >
        把旧实验的版本绑定覆盖成新修订
      </Fault>
      <svg
        viewBox="0 0 320 464"
        role="img"
        aria-label="执行反馈产生补常数和改规则两个修订；探针与冻结旧实验的重放"
        className="mt-3 block h-auto w-full"
        fontSize={16}
        fill={color.text}
      >
        <path
          d="M 160 49 L 78 101 M 160 49 L 242 101"
          stroke={color.border}
          strokeWidth={2}
          fill="none"
        />
        <circle
          cx={160}
          cy={31}
          r={23}
          fill={color.bg}
          stroke={color.muted}
          strokeWidth={clock.currentStep === 0 ? 4 : 2}
        />
        <text x={160} y={37} textAnchor="middle">
          v0
        </text>
        {[0, 1].map((b) => (
          <g key={b}>
            <circle
              cx={b === 0 ? 78 : 242}
              cy={117}
              r={branch === b ? 26 : 21}
              fill={color.bg}
              stroke={b === 0 ? color.active : color.good}
              strokeWidth={branch === b ? 4 : 1}
            />
            <text x={b === 0 ? 78 : 242} y={123} textAnchor="middle">
              {b === 0 ? "P" : "R"}
            </text>
            <text x={b === 0 ? 78 : 242} y={164} textAnchor="middle">
              {b === 0 ? `x² + ${r.delta}` : "(x+1)²"}
            </text>
          </g>
        ))}
        <path
          d={`M 160 55 L ${fault ? (branch === 0 ? 78 : 242) : 160} 81 L 290 81`}
          stroke={fault ? color.bad : color.muted}
          strokeDasharray="5 4"
          strokeWidth={fault ? 3 : 1}
          fill="none"
        />
        <text x={160} y={193} textAnchor="middle">
          反馈点 k={k}：P 与 R 都得 {r.fit}
        </text>
        <path
          d="M 34 210 L 34 365 L 286 365"
          fill="none"
          stroke={color.border}
        />
        {[0, 10, 20].map((y) => (
          <text key={y} x={28} y={plotY(y) + 5} textAnchor="end">
            {y}
          </text>
        ))}
        {[1, 2, 3, 4].map((x) => (
          <text key={x} x={plotX(x)} y={389} textAnchor="middle">
            {x}
          </text>
        ))}
        {curves.map((curve, i) => (
          <polyline
            key={curve.id}
            data-curve={curve.id}
            points={[1, 2, 3, 4]
              .map((x) => `${plotX(x)},${plotY(curve.f(x))}`)
              .join(" ")}
            fill="none"
            stroke={curve.stroke}
            strokeDasharray={i === 0 ? "5 4" : undefined}
            strokeWidth={i === branch + 1 ? 4 : 2}
            opacity={clock.currentStep === 0 && i > 0 ? 0.25 : 1}
          />
        ))}
        <line
          x1={plotX(p)}
          x2={plotX(p)}
          y1={210}
          y2={365}
          stroke={color.active}
          strokeDasharray="3 4"
        />
        <circle
          cx={plotX(k)}
          cy={plotY(r.fit)}
          r={8}
          fill={color.bg}
          stroke={color.good}
          strokeWidth={2}
        />
        <circle
          cx={plotX(p)}
          cy={plotY(r.selected)}
          r={clock.currentStep === 2 ? 7 : 4}
          fill={branch === 0 ? color.active : color.good}
        />
        <text x={160} y={419} textAnchor="middle">
          探针 {p}：新修订 {r.selected} / 期望 {r.expected}
        </text>
        <text
          x={160}
          y={450}
          textAnchor="middle"
          fill={fault ? color.bad : color.muted}
        >
          冻结旧实验：{r.saved} → 重放 {r.replay}
        </text>
      </svg>
      <p className="text-sm text-secondary">
        图上折线仅连接四个整数样本，不冒充连续函数曲线。虚线 v0；主题色 P；绿色
        R。空心圈是反馈点，实心点是所选修订的探针。
      </p>
      <p
        data-readout="revision-result"
        data-delta={r.delta}
        data-base={r.base}
        data-patch={r.patch}
        data-rule={r.rule}
        data-selected={r.selected}
        data-expected={r.expected}
        data-saved={r.saved}
        data-replay={r.replay}
        data-probe-pass={r.probePass}
        data-replay-pass={r.replayPass}
        className="text-sm"
        aria-live="polite"
      >
        P={r.patch}，R={r.rule}；探针{r.probePass ? "通过" : "未通过"}
        ，旧实验重放{r.replayPass ? "一致" : "被覆盖"}
        。这里的期望规则是预先给定的教学合同，不由一个反馈点推断出来。
      </p>
    </Shell>
  );
}
