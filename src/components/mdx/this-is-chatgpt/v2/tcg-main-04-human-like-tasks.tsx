"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const A = [1, 0, 0, 1, 0, 0, 1, 1, 1];
const B = [1, 1, 1, 0, 0, 1, 0, 0, 1];
const TOP = [1, 2];
const REST = [3, 5, 6, 7];
const clip = (x: number) => Math.min(1, Math.max(0, x));
const transpose = (x: number[]) =>
  x.map((_, i) => x[(i % 3) * 3 + Math.floor(i / 3)]);
const errors = (x: number[], template: number[]) =>
  x.map((v, i) => (v - template[i]) ** 2);
const sum = (x: number[]) => x.reduce((s, v) => s + v, 0);
const fmt = (x: number) => x.toFixed(2);
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const steps = {
  pixels: Array.from({ length: 9 }, (_, i) => ({ label: `像素${i + 1}` })),
  path: Array.from({ length: 7 }, (_, i) => ({ label: `路径${i}/6` })),
  samples: Array.from({ length: 12 }, (_, i) => ({ label: `记录${i + 1}` })),
};
function useScan(kind: keyof typeof steps) {
  const timeline = useTeachingTimeline({
    steps: steps[kind],
    build: (tl) => {
      const clock = { value: 0 };
      steps[kind].forEach((step, i) => {
        tl.label(step.label, i * 700);
        tl.add(clock, { value: i + 1, duration: 700, ease: "linear" }, i * 700);
      });
    },
  });
  // If the OS preference changes during playback, stop the owned timeline too.
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return timeline;
}
function Shell({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-8 rounded-card border border-border bg-bg p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent"
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}：{fmt(value)}
      <input
        aria-label={label}
        className="mdx-range block w-full accent-accent"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function ScanControls({
  timeline,
  reset,
  caption,
}: {
  timeline: TeachingTimeline;
  reset: () => void;
  caption: string;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      caption={caption}
      reset={{ label: "完整重置", onClick: reset }}
    />
  );
}
function PixelGrid({
  x,
  y,
  values,
  active = -1,
  tone = C.primary,
}: {
  x: number;
  y: number;
  values: number[];
  active?: number;
  tone?: string;
}) {
  return (
    <g>
      {values.map((value, i) => (
        <g key={i}>
          <rect
            x={x + (i % 3) * 26}
            y={y + Math.floor(i / 3) * 26}
            width={24}
            height={24}
            fill={tone}
            fillOpacity={0.04 + clip(value) * 0.86}
          />
          <rect
            x={x + (i % 3) * 26}
            y={y + Math.floor(i / 3) * 26}
            width={24}
            height={24}
            fill="none"
            stroke={i === active ? C.accent : C.border}
            strokeWidth={i === active ? 3 : 1}
          />
        </g>
      ))}
    </g>
  );
}

export function TcgMain04HumanLikeTasksContextContractLab() {
  const [alpha, setAlpha] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [edits, setEdits] = useState<(number | null)[]>(Array(9).fill(null));
  const [fault, setFault] = useState(false);
  const timeline = useScan("pixels");
  const raw = A.map(
    (a, i) => edits[i] ?? clip((1 - alpha) * a + alpha * B[i] + brightness),
  );
  const input = fault ? transpose(raw) : raw;
  const ea = errors(input, A),
    eb = errors(input, B);
  const da = sum(ea),
    db = sum(eb),
    k = timeline.currentStep;
  const cumulative = (e: number[]) =>
    e
      .map((_, i) => `${35 + i * 28},${410 - sum(e.slice(0, i + 1)) * 12}`)
      .join(" ");
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setAlpha(0);
    setBrightness(0);
    setEdits(Array(9).fill(null));
    setFault(false);
  };
  return (
    <Shell
      kind="pixel-template-distance-field"
      title="实验1 · 像素误差场与模板距离"
    >
      <p className="text-sm text-secondary">
        自编3×3符号，灰度0→1。原始输入可在下方逐格编辑；图中展示实际送入计算的像素。无训练过程。
      </p>
      <svg
        viewBox="0 0 300 465"
        role="img"
        aria-label="计算输入、A与B模板、两组逐像素平方误差及累积距离曲线"
        className="mx-auto block w-full max-w-[420px]"
        fontSize={16}
        fill={C.primary}
      >
        <text x={5} y={26}>
          计算输入
        </text>
        <text x={111} y={26}>
          模板A
        </text>
        <text x={212} y={26}>
          模板B
        </text>
        <PixelGrid x={6} y={40} values={input} active={k} />
        <PixelGrid x={107} y={40} values={A} />
        <PixelGrid x={208} y={40} values={B} />
        <text x={18} y={158}>
          A误差场
        </text>
        <text x={180} y={158}>
          B误差场
        </text>
        <PixelGrid x={25} y={174} values={ea} active={k} tone={C.accent} />
        <PixelGrid x={183} y={174} values={eb} active={k} tone={C.secondary} />
        <text x={20} y={280}>
          累计距离（实线A / 虚线B）
        </text>
        <path d="M35 292V410H270" fill="none" stroke={C.border} />
        {[0, 3, 6, 9].map((v) => (
          <g key={v}>
            <text x={7} y={415 - v * 12}>
              {v}
            </text>
            <path d={`M35 ${410 - v * 12}H270`} stroke={C.border} />
          </g>
        ))}
        <polyline
          points={cumulative(ea)}
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        <polyline
          points={cumulative(eb)}
          fill="none"
          stroke={C.secondary}
          strokeDasharray="5 4"
          strokeWidth={3}
        />
        <circle
          cx={35 + k * 28}
          cy={410 - sum(ea.slice(0, k + 1)) * 12}
          r={5}
          fill={C.accent}
        />
        <circle
          cx={35 + k * 28}
          cy={410 - sum(eb.slice(0, k + 1)) * 12}
          r={5}
          fill={C.secondary}
        />
        <text x={30} y={437}>
          1
        </text>
        <text x={142} y={437}>
          5
        </text>
        <text x={254} y={437}>
          9
        </text>
        <text x={110} y={460}>
          像素序号
        </text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          输入混合α
          <select
            aria-label="输入混合α"
            className="mt-1 block w-full rounded-control border border-border bg-bg px-3"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          >
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <option key={v} value={v}>
                {v}（{v === 0 ? "A" : v === 1 ? "B" : "混合"}）
              </option>
            ))}
          </select>
        </label>
        <Slider
          label="亮度偏移"
          value={brightness}
          min={-0.2}
          max={0.2}
          step={0.1}
          onChange={setBrightness}
        />
      </div>
      <p className="mt-3 text-sm">
        原始输入编辑（行优先；点格将该像素覆盖为0或1，重置清除全部覆盖）：
      </p>
      <div className="mx-auto my-3 grid w-fit grid-cols-3 gap-2">
        {raw.map((v, i) => (
          <button
            key={i}
            type="button"
            aria-label={`编辑像素${i + 1}`}
            aria-pressed={edits[i] !== null}
            className={button}
            style={{
              background: `color-mix(in srgb, ${C.accent} ${Math.round(v * 32)}%, ${C.bg})`,
            }}
            onClick={() =>
              setEdits((old) =>
                old.map((v0, j) => (j === i ? (v >= 0.5 ? 0 : 1) : v0)),
              )
            }
          >
            {fmt(v)}
          </button>
        ))}
      </div>
      <button
        type="button"
        data-fault="transpose-input"
        aria-pressed={fault}
        className={button}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复行优先输入" : "故障：计算端错转置"}
      </button>
      <p className="mt-3 text-sm" aria-live="polite" data-result="pixel">
        dA={fmt(da)}，dB={fmt(db)}；判定{da <= db ? "A" : "B"}
        {da === db ? "（等距按A）" : ""}。像素{k + 1}贡献：A={fmt(ea[k])} / B=
        {fmt(eb[k])}；前缀A={fmt(sum(ea.slice(0, k + 1)))} / B=
        {fmt(sum(eb.slice(0, k + 1)))}。
      </p>
      {fault && (
        <p className="text-sm text-secondary">
          原始输入未变，计算数组却按列读取：图中输入已转置。修复表示约定，不要把错位结果解释成人类知觉。
        </p>
      )}
      <ScanControls
        timeline={timeline}
        reset={reset}
        caption="逐像素检查误差；播放只移动审查位置，不拟合模板。"
      />
    </Shell>
  );
}

function perturbation(a: number, b: number) {
  return A.map(
    (v, i) => v + (TOP.includes(i) ? a : REST.includes(i) ? b : 0) * (B[i] - v),
  );
}
function regionDistances(a: number, b: number, weight: number) {
  return [
    2 * a * a + 4 * weight * b * b,
    2 * (1 - a) ** 2 + 4 * weight * (1 - b) ** 2,
  ];
}
export function TcgMain04HumanLikeTasksComputeTraceLab() {
  const [a, setA] = useState(0.25),
    [b, setB] = useState(0.75),
    [weight, setWeight] = useState(1);
  const [fault, setFault] = useState(false);
  const timeline = useScan("path");
  const w = fault ? 0 : weight,
    t = timeline.currentStep / 6;
  const [da, db] = regionDistances(a, b, w);
  const [ca, cb] = regionDistances(a * t, b * t, w);
  const point = (x: number, y: number) => [40 + 240 * x, 300 - 240 * y];
  const endpoints =
    w === 0
      ? [
          [0.5, 0],
          [0.5, 1],
        ]
      : [
          [0, (1 + 2 * w) / (4 * w)],
          [1, (2 * w - 1) / (4 * w)],
          [(1 + 2 * w) / 2, 0],
          [(1 - 2 * w) / 2, 1],
        ]
          .filter(([x, y]) => x >= 0 && x <= 1 && y >= 0 && y <= 1)
          .filter(
            ([x, y], i, arr) =>
              arr.findIndex(
                ([xx, yy]) =>
                  Math.abs(x - xx) < 1e-9 && Math.abs(y - yy) < 1e-9,
              ) === i,
          );
  const [px, py] = point(a, b),
    [cx, cy] = point(a * t, b * t);
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setA(0.25);
    setB(0.75);
    setWeight(1);
    setFault(false);
  };
  return (
    <Shell
      kind="perturbation-decision-regions"
      title="实验2 · 扰动如何跨越决策边界"
    >
      <p className="text-sm text-secondary">
        横轴a改顶部2格，纵轴b改其余4格。浅色域判A，深色域判B；圆点沿起点到目标方框行进。只覆盖这一手工二维输入族。
      </p>
      <svg
        viewBox="0 0 300 465"
        role="img"
        aria-label="二维扰动决策域、解析边界、路径与目标小像素图"
        className="mx-auto block w-full max-w-[420px]"
        fontSize={16}
        fill={C.primary}
      >
        <text x={38} y={28}>
          A浅域 / B深域 · 实线为等距
        </text>
        <text x={9} y={56}>
          b
        </text>
        {Array.from({ length: 441 }, (_, i) => {
          const col = i % 21,
            row = Math.floor(i / 21);
          const ds = regionDistances((col + 0.5) / 21, (row + 0.5) / 21, w);
          return (
            <rect
              key={i}
              x={40 + (col * 240) / 21}
              y={300 - ((row + 1) * 240) / 21}
              width={240 / 21 + 0.1}
              height={240 / 21 + 0.1}
              fill={C.accent}
              fillOpacity={ds[0] <= ds[1] ? 0.12 : 0.55}
            />
          );
        })}
        <rect
          x={40}
          y={60}
          width={240}
          height={240}
          fill="none"
          stroke={C.border}
        />
        {endpoints.length >= 2 && (
          <line
            x1={point(...(endpoints[0] as [number, number]))[0]}
            y1={point(...(endpoints[0] as [number, number]))[1]}
            x2={point(...(endpoints[1] as [number, number]))[0]}
            y2={point(...(endpoints[1] as [number, number]))[1]}
            stroke={fault ? C.danger : C.primary}
            strokeWidth={3}
          />
        )}
        <path
          d={`M40 300L${px} ${py}`}
          stroke={C.primary}
          strokeWidth={2}
          strokeDasharray="4 4"
          fill="none"
        />
        <rect
          x={px - 6}
          y={py - 6}
          width={12}
          height={12}
          fill={C.bg}
          stroke={C.primary}
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={5} fill={C.primary} />
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <text x={40 + 240 * v} y={325} textAnchor="middle">
              {v}
            </text>
            <text x={32} y={305 - 240 * v} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        <text x={283} y={341}>
          a
        </text>
        <text x={84} y={357}>
          目标输入（非人类标签）
        </text>
        <PixelGrid x={111} y={373} values={perturbation(a, b)} />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider
          label="顶部扰动a"
          value={a}
          min={0}
          max={1}
          step={0.05}
          onChange={setA}
        />
        <Slider
          label="其余扰动b"
          value={b}
          min={0}
          max={1}
          step={0.05}
          onChange={setB}
        />
      </div>
      <label className="my-3 block text-sm">
        其余4格权重w
        <select
          aria-label="其余4格权重w"
          className="mt-1 block w-full rounded-control border border-border bg-bg px-3"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        >
          {[0.5, 1, 2].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        data-fault="omit-four-pixels"
        aria-pressed={fault}
        className={button}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复4格距离贡献" : "故障：漏算其余4格"}
      </button>
      <p className="mt-3 text-sm" aria-live="polite" data-result="region">
        声明w={weight}，实际w={w}；目标dA={fmt(da)} / dB={fmt(db)}，判
        {da <= db ? "A" : "B"}。路径t={fmt(t)}，当前位置判{ca <= cb ? "A" : "B"}
        。{fault ? "故障边界：a=0.5。" : `等距线：2a+${4 * w}b=${1 + 2 * w}。`}
      </p>
      <ScanControls
        timeline={timeline}
        reset={reset}
        caption="步进沿路径观察首次跨域；二维图没有验证未画出的其他输入。"
      />
    </Shell>
  );
}

type RecordScore = { score: number; positive: boolean };
const evaluation: RecordScore[] = [
  0.9, 0.8, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.2, 0.1, 0.05,
].map((score, i) => ({ score, positive: [0, 1, 3, 5, 8].includes(i) }));
const reference: RecordScore[] = [0.95, 0.85, 0.15, 0.05].map((score, i) => ({
  score,
  positive: i < 2,
}));
function confusion(records: RecordScore[], threshold: number) {
  const counts = { TP: 0, FN: 0, FP: 0, TN: 0 };
  records.forEach(({ score, positive }) => {
    counts[
      positive
        ? score >= threshold
          ? "TP"
          : "FN"
        : score >= threshold
          ? "FP"
          : "TN"
    ]++;
  });
  return counts;
}
export function TcgMain04HumanLikeTasksEvidenceGateLab() {
  const [threshold, setThreshold] = useState(0.5),
    [fnCost, setFnCost] = useState(4),
    [fpCost, setFpCost] = useState(1);
  const [fault, setFault] = useState(false);
  const timeline = useScan("samples");
  const records = fault ? reference : evaluation,
    counts = confusion(records, threshold);
  const k = Math.min(
    records.length - 1,
    Math.floor((timeline.currentStep * records.length) / 12),
  );
  const current = records[k],
    prefix = confusion(records.slice(0, k + 1), threshold);
  const fn = counts.FN * fnCost,
    fp = counts.FP * fpCost;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setThreshold(0.5);
    setFnCost(4);
    setFpCost(1);
    setFault(false);
  };
  return (
    <Shell
      kind="threshold-confusion-cost-flow"
      title="实验3 · 阈值、错分结构与代价流"
    >
      <p className="text-sm text-secondary">
        分数和标签均为手工数据，分数不是概率，也不是实验1输出。当前汇总：
        {fault
          ? "4条容易参考样本（替代评估，错误比较）"
          : "12条固定评估样本（与参考集分开）"}
        。
      </p>
      <svg
        viewBox="0 0 300 540"
        role="img"
        aria-label="真实标签分数带、决策阈值、混淆矩阵与漏报误报代价流"
        className="mx-auto block w-full max-w-[420px]"
        fontSize={16}
        fill={C.primary}
      >
        <text x={15} y={25}>
          圆点=样本 · 竖线=阈值τ
        </text>
        <text x={8} y={64}>
          真+
        </text>
        <text x={8} y={105}>
          真−
        </text>
        {[60, 101].map((y) => (
          <line key={y} x1={58} y1={y} x2={282} y2={y} stroke={C.border} />
        ))}
        <line
          x1={58 + 224 * threshold}
          x2={58 + 224 * threshold}
          y1={38}
          y2={120}
          stroke={C.accent}
          strokeWidth={3}
        />
        {records.map((r, i) => (
          <circle
            key={i}
            cx={58 + r.score * 224}
            cy={r.positive ? 60 : 101}
            r={i === k ? 7 : 4}
            fill={r.score >= threshold ? C.accent : C.secondary}
            stroke={i === k ? C.primary : C.bg}
            strokeWidth={i === k ? 2 : 1}
          />
        ))}
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={58 + 224 * v} y={143} textAnchor="middle">
            {v}
          </text>
        ))}
        <text x={73} y={182}>
          预测+
        </text>
        <text x={184} y={182}>
          预测−
        </text>
        <text x={7} y={224}>
          真+
        </text>
        <text x={7} y={291}>
          真−
        </text>
        {[
          { name: "TP", count: counts.TP, x: 57, y: 196 },
          { name: "FN", count: counts.FN, x: 170, y: 196 },
          { name: "FP", count: counts.FP, x: 57, y: 263 },
          { name: "TN", count: counts.TN, x: 170, y: 263 },
        ].map((cell) => (
          <g key={cell.name}>
            <rect
              x={cell.x}
              y={cell.y}
              width={105}
              height={61}
              rx={5}
              fill={C.elevated}
              stroke={C.border}
            />
            <text x={cell.x + 52} y={cell.y + 37} textAnchor="middle">
              {cell.name} {cell.count}
            </text>
          </g>
        ))}
        <text x={15} y={357}>
          错分数量 × 单次代价 → 总代价
        </text>
        <path
          d="M22 396C95 396 155 415 275 415"
          fill="none"
          stroke={C.accent}
          strokeWidth={Math.sqrt(fn) * 3}
          opacity={fn ? 0.65 : 0}
        />
        <path
          d="M22 480C95 480 155 444 275 444"
          fill="none"
          stroke={C.secondary}
          strokeWidth={Math.sqrt(fp) * 3}
          opacity={fp ? 0.65 : 0}
        />
        <rect x={275} y={395} width={8} height={64} fill={C.border} />
        <text x={235} y={384}>
          合计
        </text>
        <text x={14} y={384}>
          FN {counts.FN} × {fnCost} = {fn}
        </text>
        <text x={14} y={511}>
          FP {counts.FP} × {fpCost} = {fp}
        </text>
        <text x={152} y={535}>
          总代价 {fn + fp}
        </text>
      </svg>
      <p className="text-sm text-secondary">
        流带宽=3√代价（零代价不画），不按面积猜数值；右端汇合的是同一代价单位。
      </p>
      <Slider
        label="判阳阈值τ"
        value={threshold}
        min={0}
        max={1}
        step={0.05}
        onChange={setThreshold}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider
          label="漏报单次代价"
          value={fnCost}
          min={1}
          max={8}
          step={1}
          onChange={setFnCost}
        />
        <Slider
          label="误报单次代价"
          value={fpCost}
          min={1}
          max={8}
          step={1}
          onChange={setFpCost}
        />
      </div>
      <button
        type="button"
        data-fault="reference-for-evaluation"
        aria-pressed={fault}
        className={button}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复独立评估列表" : "故障：参考集冒充评估"}
      </button>
      <p className="mt-3 text-sm" aria-live="polite" data-result="confusion">
        N={records.length}；TP={counts.TP} / FN={counts.FN} / FP={counts.FP} /
        TN={counts.TN}；准确率={fmt((counts.TP + counts.TN) / records.length)}
        ；总代价={fn + fp}。聚焦记录{k + 1}：分数{fmt(current.score)}，真
        {current.positive ? "+" : "−"}→预测
        {current.score >= threshold ? "+" : "−"}；此前缀代价=
        {prefix.FN * fnCost + prefix.FP * fpCost}。
      </p>
      <ScanControls
        timeline={timeline}
        reset={reset}
        caption="12个时间步按比例审查当前列表；矩阵始终汇总全列表，动画不改变样本标签。"
      />
    </Shell>
  );
}
