"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
const circuitSteps: readonly TeachingStep[] = [
  { label: "输入" },
  { label: "带权求和" },
  { label: "隐层激活" },
  { label: "输出组合" },
];
const sweepSteps: readonly TeachingStep[] = [
  { label: "采样1" },
  { label: "采样2" },
  { label: "采样3" },
  { label: "采样4" },
  { label: "采样5" },
];
const xorSteps: readonly TeachingStep[] = [
  { label: "输入00" },
  { label: "输入10" },
  { label: "输入01" },
  { label: "输入11" },
];
function buildClock(steps: readonly TeachingStep[]): BuildTimeline {
  return (tl) => {
    const clock = { value: 0 };
    steps.forEach((s, i) => {
      tl.label(s.label, i * 1000);
      tl.add(clock, { value: i + 1, duration: 1000, ease: "linear" }, i * 1000);
    });
  };
}
const circuitClock = buildClock(circuitSteps),
  sweepClock = buildClock(sweepSteps),
  xorClock = buildClock(xorSteps);
const relu = (x: number) => Math.max(0, x);
const fmt = (x: number) => Number(x.toFixed(2)).toString();
const buttonClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
function Parameter({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: number;
  values: readonly number[];
  onChange: (x: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      <select
        className="min-h-11 w-full min-w-0 rounded border border-border bg-background px-2 text-primary focus-visible:outline-2 focus-visible:outline-accent"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {values.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}
function Lab({
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary"
    >
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Readout({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 break-words text-sm leading-6" aria-live="polite">
      {children}
    </div>
  );
}

export function TcgMain05NeuralNetsContextContractLab() {
  const [input, setInput] = useState(1),
    [weight, setWeight] = useState(2),
    [bias, setBias] = useState(0),
    [fault, setFault] = useState(false);
  const timeline = useTeachingTimeline({
    steps: circuitSteps,
    build: circuitClock,
  });
  const z1 = weight * input + (fault ? 1 : -1) + bias,
    z2 = input + 1;
  const h1 = relu(z1),
    h2 = relu(z2),
    output = h1 - 0.5 * h2;
  const reset = () => {
    timeline.seek(0);
    setInput(1);
    setWeight(2);
    setBias(0);
    setFault(false);
  };
  const nodes = [
    { x: 46, y: 104, v: input, name: "x₁" },
    { x: 46, y: 246, v: 1, name: "x₂" },
    { x: 160, y: 104, v: h1, name: "h₁" },
    { x: 160, y: 246, v: h2, name: "h₂" },
    { x: 276, y: 175, v: output, name: "y" },
  ];
  const edges = [
    { a: 0, b: 2, w: weight, x: 102, y: 92 },
    { a: 1, b: 2, w: fault ? 1 : -1, x: 89, y: 180 },
    { a: 0, b: 3, w: 1, x: 127, y: 190 },
    { a: 1, b: 3, w: 1, x: 102, y: 272 },
    { a: 2, b: 4, w: 1, x: 235, y: 119 },
    { a: 3, b: 4, w: -0.5, x: 238, y: 245 },
  ];
  return (
    <Lab
      kind="weighted-activation-circuit"
      title="实验一：带权连接与逐层激活网络"
    >
      <div className="grid grid-cols-3 gap-2">
        <Parameter
          label="输入 x₁"
          value={input}
          values={[0, 1, 2]}
          onChange={setInput}
        />
        <Parameter
          label="权重 w"
          value={weight}
          values={[-1, 1, 2]}
          onChange={setWeight}
        />
        <Parameter
          label="偏置 b₁"
          value={bias}
          values={[-1, 0, 1]}
          onChange={setBias}
        />
      </div>
      <svg
        viewBox="0 0 320 360"
        className="mx-auto block w-full max-w-[480px]"
        role="img"
        aria-label="二输入、二隐节点、一输出的前向网络；实线正权，虚线负权；节点大小随激活绝对值变化"
        fontSize="15"
        fill={C.text}
      >
        <text x="46" y="28" textAnchor="middle">
          输入层
        </text>
        <text x="160" y="28" textAnchor="middle">
          隐藏层
        </text>
        <text x="275" y="28" textAnchor="middle">
          输出层
        </text>
        {edges.map((e, i) => (
          <g key={i}>
            <line
              x1={nodes[e.a].x}
              y1={nodes[e.a].y}
              x2={nodes[e.b].x}
              y2={nodes[e.b].y}
              stroke={
                fault && i === 1 ? C.danger : e.w < 0 ? C.muted : C.accent
              }
              strokeWidth={1 + Math.abs(e.w) * 2}
              strokeDasharray={e.w < 0 ? "5 4" : undefined}
            />
            <text
              x={e.x}
              y={e.y}
              textAnchor="middle"
              paintOrder="stroke"
              stroke={C.bg}
              strokeWidth="5"
              strokeLinejoin="round"
            >
              {fmt(e.w)}
            </text>
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={n.name}>
            <circle
              cx={n.x}
              cy={n.y}
              r={20 + Math.min(8, Math.abs(n.v) * 2)}
              fill={C.bg}
              stroke={
                timeline.currentStep === (i < 2 ? 0 : i < 4 ? 2 : 3)
                  ? C.accent
                  : C.border
              }
              strokeWidth="3"
            />
            <text x={n.x} y={n.y + 5} textAnchor="middle">
              {fmt(n.v)}
            </text>
            <text x={n.x} y={n.y - 36} textAnchor="middle">
              {n.name}
            </text>
          </g>
        ))}
        <text x="160" y="313" textAnchor="middle">
          z₁={fmt(z1)} → ReLU → {fmt(h1)}
        </text>
        <text x="160" y="339" textAnchor="middle">
          z₂={fmt(z2)} → ReLU → {fmt(h2)}
        </text>
      </svg>
      <Readout>
        <span data-result={output}>
          y = {fmt(h1)} − 0.5 × {fmt(h2)} = {fmt(output)}
        </span>
        。实线为正权，虚线为负权；线宽表示权重绝对值，圆半径表示数值绝对值。当前：
        {circuitSteps[timeline.currentStep].label}。
      </Readout>
      <button
        className={buttonClass}
        data-fault="flip-inhibitory-edge"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：把 −1 边翻为 +1（{fault ? "已开" : "已关"}）
      </button>
      <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11">
        <TimelineControls
          timeline={timeline}
          reset={{ label: "完整重置", onClick: reset }}
        />
      </div>
      <output
        className="sr-only"
        data-state={JSON.stringify({
          input,
          weight,
          bias,
          fault,
          cursor: timeline.currentStep,
          playing: timeline.isPlaying,
        })}
      >
        手写前向网络
      </output>
    </Lab>
  );
}

export function TcgMain05NeuralNetsComputeTraceLab() {
  const [hinge, setHinge] = useState(0),
    [gain, setGain] = useState(1),
    [fault, setFault] = useState(false);
  const timeline = useTeachingTimeline({
    steps: sweepSteps,
    build: sweepClock,
  });
  const px = (x: number) => 42 + ((x + 1) / 3) * 246,
    py = (y: number) => 286 - ((y + 2) / 6) * 234;
  const first = (x: number) => gain * relu(x - hinge),
    combined = (x: number) =>
      first(x) - (fault ? 0 : 2 * gain * relu(x - hinge - 1));
  const path = (fn: (x: number) => number) =>
    Array.from({ length: 121 }, (_, i) => {
      const x = -1 + i / 40;
      return `${i ? "L" : "M"}${px(x)},${py(fn(x))}`;
    }).join(" ");
  const cursor = [-1, -0.25, 0.5, 1.25, 2][timeline.currentStep];
  const reset = () => {
    timeline.seek(0);
    setHinge(0);
    setGain(1);
    setFault(false);
  };
  return (
    <Lab kind="relu-hinge-composition" title="实验二：ReLU 折线铰链与组合">
      <div className="grid grid-cols-2 gap-2">
        <Parameter
          label="首铰链 t"
          value={hinge}
          values={[-0.5, 0, 0.5]}
          onChange={setHinge}
        />
        <Parameter
          label="组合系数 a"
          value={gain}
          values={[0.5, 1, 1.5]}
          onChange={setGain}
        />
      </div>
      <svg
        viewBox="0 0 320 360"
        className="mx-auto block w-full max-w-[480px]"
        role="img"
        aria-label="横轴输入x，纵轴函数值；虚线为第一铰链，实线为两铰链组合；移动t平移拐点，a改变斜率"
        fontSize="15"
        fill={C.text}
      >
        {[-2, 0, 2, 4].map((y) => (
          <g key={y}>
            <line x1="42" y1={py(y)} x2="288" y2={py(y)} stroke={C.border} />
            <text x="32" y={py(y) + 5} textAnchor="end">
              {y}
            </text>
          </g>
        ))}
        <line x1="42" y1="52" x2="42" y2="286" stroke={C.muted} />
        <line x1="42" y1={py(0)} x2="298" y2={py(0)} stroke={C.muted} />
        {[-1, 0, 1, 2].map((x) => (
          <text key={x} x={px(x)} y="310" textAnchor="middle">
            {x}
          </text>
        ))}
        {[hinge, hinge + 1].map((x) => (
          <line
            key={x}
            x1={px(x)}
            y1="52"
            x2={px(x)}
            y2="286"
            stroke={C.border}
            strokeDasharray="3 4"
          />
        ))}
        <path
          d={path(first)}
          fill="none"
          stroke={C.muted}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d={path(combined)}
          fill="none"
          stroke={fault ? C.danger : C.accent}
          strokeWidth="3"
        />
        <line
          x1={px(cursor)}
          y1="52"
          x2={px(cursor)}
          y2="286"
          stroke={C.muted}
          strokeDasharray="2 5"
        />
        <circle
          cx={px(cursor)}
          cy={py(combined(cursor))}
          r="6"
          fill={fault ? C.danger : C.accent}
        />
        <text x="45" y="27">
          函数值
        </text>
        <text x="291" y="337" textAnchor="end">
          输入 x
        </text>
        <text x="45" y="337">
          拐点 t 与 t+1
        </text>
      </svg>
      <Readout>
        虚线：aR(x−t)；实线：a[R(x−t)−2R(x−t−1)]。
        <span data-result={combined(cursor)}>
          光标 x={fmt(cursor)}，实线值={fmt(combined(cursor))}
        </span>
        。
        {fault ? "漏掉第二项后，右侧不再向下折返。" : "右侧斜率从 +a 变成 −a。"}
      </Readout>
      <button
        className={buttonClass}
        data-fault="omit-second-hinge"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：漏掉第二铰链（{fault ? "已开" : "已关"}）
      </button>
      <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11">
        <TimelineControls
          timeline={timeline}
          reset={{ label: "完整重置", onClick: reset }}
        />
      </div>
      <output
        className="sr-only"
        data-state={JSON.stringify({
          hinge,
          gain,
          fault,
          cursor: timeline.currentStep,
          playing: timeline.isPlaying,
        })}
      >
        铰链函数采样
      </output>
    </Lab>
  );
}

export function TcgMain05NeuralNetsEvidenceGateLab() {
  const [hinge, setHinge] = useState(1),
    [threshold, setThreshold] = useState(0.5),
    [fault, setFault] = useState(false);
  const timeline = useTeachingTimeline({ steps: xorSteps, build: xorClock });
  const score = (s: number) =>
    fault ? 2 * hinge - s : relu(s) - 2 * relu(s - hinge);
  const px = (x: number) => 52 + x * 220,
    py = (y: number) => 278 - y * 220;
  const samples = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const selected = samples[timeline.currentStep];
  const boundary = (s: number) => {
    if (s < 0 || s > 2) return null;
    const lo = Math.max(0, s - 1),
      hi = Math.min(1, s);
    return { x1: px(lo), y1: py(s - lo), x2: px(hi), y2: py(s - hi) };
  };
  const boundaries = fault
    ? [2 * hinge - threshold]
    : threshold <= hinge
      ? [threshold, 2 * hinge - threshold]
      : [];
  const hiddenBoundary = boundary(hinge);
  const reset = () => {
    timeline.seek(0);
    setHinge(1);
    setThreshold(0.5);
    setFault(false);
  };
  return (
    <Lab
      kind="xor-hidden-region-map"
      title="实验三：XOR 输入平面划分与隐层作用"
    >
      <div className="grid grid-cols-2 gap-2">
        <Parameter
          label="隐层铰链 k"
          value={hinge}
          values={[0.5, 1, 1.5]}
          onChange={setHinge}
        />
        <Parameter
          label="输出阈值 θ"
          value={threshold}
          values={[0.25, 0.5, 0.75]}
          onChange={setThreshold}
        />
      </div>
      <svg
        viewBox="0 0 320 360"
        className="mx-auto block w-full max-w-[480px]"
        role="img"
        aria-label="XOR输入正方形，强调色区域预测1，底色预测0；实线为分类边界，虚线为隐层铰链；四角标出目标值"
        fontSize="15"
        fill={C.text}
      >
        <text x="52" y="27">
          输入 x₂
        </text>
        {Array.from({ length: 400 }, (_, i) => {
          const x = (i % 20) / 20,
            y = Math.floor(i / 20) / 20;
          return (
            <rect
              key={i}
              x={px(x)}
              y={py(y + 0.05)}
              width="11.1"
              height="11.1"
              fill={
                score(x + y + 0.05) >= threshold
                  ? fault
                    ? C.danger
                    : C.accent
                  : C.bg
              }
              fillOpacity={score(x + y + 0.05) >= threshold ? 0.23 : 1}
            />
          );
        })}
        <rect
          x="52"
          y="58"
          width="220"
          height="220"
          fill="none"
          stroke={C.muted}
        />
        {hiddenBoundary && (
          <line
            {...hiddenBoundary}
            stroke={C.muted}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        )}
        {boundaries.map((s, i) => {
          const b = boundary(s);
          return (
            b && (
              <line
                key={i}
                {...b}
                stroke={fault ? C.danger : C.accent}
                strokeWidth="3"
              />
            )
          );
        })}
        {samples.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={px(x)}
              cy={py(y)}
              r={timeline.currentStep === i ? 10 : 6}
              fill={C.bg}
              stroke={
                Number(score(x + y) >= threshold) === (x !== y ? 1 : 0)
                  ? C.success
                  : C.danger
              }
              strokeWidth="3"
            />
            <text x={px(x)} y={y ? 45 : 309} textAnchor="middle">
              {x}
              {y}→{x !== y ? 1 : 0}
            </text>
          </g>
        ))}
        <text x="272" y="338" textAnchor="end">
          输入 x₁
        </text>
        <text x="32" y="283">
          0
        </text>
        <text x="32" y="64">
          1
        </text>
      </svg>
      <Readout>
        底色=预测0，强调色=预测1；角点文字为目标，圆环绿色=预测正确、红色=错误。虚线：s=k；实线：score=θ。
        <span data-result={score(selected[0] + selected[1])}>
          当前 ({selected.join(",")})，score=
          {fmt(score(selected[0] + selected[1]))}，预测=
          {Number(score(selected[0] + selected[1]) >= threshold)}
        </span>
        。四角正确{" "}
        {
          samples.filter(
            ([x, y]) => Number(score(x + y) >= threshold) === (x !== y ? 1 : 0),
          ).length
        }
        /4。
      </Readout>
      <button
        className={buttonClass}
        data-fault="remove-hidden-relu"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：隐层改成恒等函数（{fault ? "已开" : "已关"}）
      </button>
      <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11">
        <TimelineControls
          timeline={timeline}
          reset={{ label: "完整重置", onClick: reset }}
        />
      </div>
      <output
        className="sr-only"
        data-state={JSON.stringify({
          hinge,
          threshold,
          fault,
          cursor: timeline.currentStep,
          playing: timeline.isPlaying,
        })}
      >
        XOR区域分类
      </output>
    </Lab>
  );
}
