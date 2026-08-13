"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({
  children,
  height = 438,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height={height} rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeDasharray={dashed ? "7 6" : undefined} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>{value}</span>
    </div>
  );
}

function NumberLane({
  color,
  compact = false,
  label,
  values,
  x,
  y,
}: {
  color: string;
  compact?: boolean;
  label: string;
  values: readonly string[];
  x: number;
  y: number;
}) {
  const labelWidth = compact ? 52 : 112;
  const step = compact ? 38 : 62;
  const cellWidth = compact ? 30 : 48;
  return (
    <g>
      <text x={x} y={y + 21} fontSize="13" fontWeight="700" fill={color}>{label}</text>
      {values.map((value, index) => (
        <g key={`${label}-${index}`}>
          <rect x={x + labelWidth + index * step} y={y} width={cellWidth} height="36" rx="7" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" />
          <text x={x + labelWidth + cellWidth / 2 + index * step} y={y + 24} textAnchor="middle" fontSize="13" fontFamily="monospace" fill={C.text}>{value}</text>
        </g>
      ))}
    </g>
  );
}

function MiniBar({
  color,
  label,
  value,
  x,
  y,
}: {
  color: string;
  label: string;
  value: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <text x={x} y={y + 16} fontSize="13" fill={C.secondary}>{label}</text>
      <rect x={x + 110} y={y} width="126" height="20" rx="6" fill={color} fillOpacity="0.16" />
      <rect x={x + 110} y={y} width={Math.max(6, 126 * value)} height="20" rx="6" fill={color} />
    </g>
  );
}

export function GpuGems3Ch40GaussianCurveDiagram() {
  const points = Array.from({ length: 13 }, (_, index) => {
    const x = -3 + index * 0.5;
    const y = Math.exp(-0.5 * x * x);
    return { x: 102 + index * 46, y: 256 - y * 138 };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  return (
    <Figure>
      <Frame height={442} label="Gaussian blur 示意图：Gaussian kernel 在中心最大，沿左右对称衰减；二维 blur 可拆成水平与垂直两次一维卷积">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>a Gaussian is a symmetric weight field</text>
        <g transform="translate(28 74)">
          <rect width="424" height="286" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <line x1="42" x2="390" y1="238" y2="238" stroke={C.border} strokeWidth="2" />
          <line x1="216" x2="216" y1="52" y2="238" stroke={C.border} strokeDasharray="6 5" strokeWidth="2" />
          <path d={path} fill="none" stroke={C.accent} strokeWidth="4" />
          {points.map((point, index) => (
            <circle key={`gaussian-point-${index}`} cx={point.x} cy={point.y} r={index === 6 ? 7 : 4} fill={index === 6 ? C.warning : C.accent} />
          ))}
          <text x="216" y="266" textAnchor="middle" fontSize="13" fill={C.secondary}>distance from pixel center</text>
          <text x="216" y="54" textAnchor="middle" fontSize="13" fill={C.warning}>largest coefficient</text>
          <text x="216" y="292" textAnchor="middle" fontSize="12" fill={C.secondary}>one coefficient per regularly spaced sample</text>
        </g>
        <g transform="translate(480 74)">
          <rect width="252" height="286" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="126" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>separable in 2D</text>
          <rect x="38" y="68" width="176" height="38" rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
          <text x="126" y="93" textAnchor="middle" fontSize="13" fill={C.accent}>horizontal pass</text>
          <Arrow x1={126} x2={126} y1={120} y2={158} color={C.success} />
          <rect x="38" y="174" width="176" height="38" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="126" y="199" textAnchor="middle" fontSize="13" fill={C.success}>vertical pass</text>
          <text x="126" y="246" textAnchor="middle" fontSize="13" fill={C.secondary}>same 1D weights</text>
          <text x="126" y="272" textAnchor="middle" fontSize="12" fill={C.secondary}>fewer samples than 2D kernel</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>the blur needs many nearby coefficients, so coefficient generation sits inside the hot loop</text>
      </Frame>
    </Figure>
  );
}

const DIFFERENCE_STEPS: readonly TeachingStep[] = [
  { label: "initialize", caption: "用规则采样点初始化 p0、p1、p2、p3 四个前向差分状态" },
  { label: "update", caption: "每次输出 p0，再执行 p.xyz += p.yzw，把高阶差分向前传递" },
  { label: "repeat", caption: "规律采样让每个点只需向量加法，不必重新求完整多项式" },
];

const DIFFERENCE_LABELS: Readonly<Record<string, string>> = {
  initialize: "用规则采样点初始化 p0、p1、p2、p3 四个前向差分状态",
  repeat: "规律采样让每个点只需向量加法，不必重新求完整多项式",
  update: "每次输出 p0，再执行 p.xyz += p.yzw，把高阶差分向前传递",
};

export function GpuGems3Ch40ForwardDifferenceDiagram() {
  const initRef = useRef<SVGGElement>(null);
  const updateRef = useRef<SVGGElement>(null);
  const repeatRef = useRef<SVGGElement>(null);
  const refs = [initRef, updateRef, repeatRef];
  const timeline = useTeachingTimeline({
    steps: DIFFERENCE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.45 }, T * index);
        tl.label(DIFFERENCE_STEPS[index].label, T * index);
      });
    },
  });
  return (
    <Figure>
      <Frame height={466} label="polynomial forward differencing 动画：状态 p0、p1、p2、p3 初始化后，每一轮用 p.xyz += p.yzw 生成下一个规则采样值">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>regular spacing turns a polynomial into a state update</text>
        <rect x="28" y="72" width="704" height="286" rx="14" fill={C.surface} stroke={C.border} />
        <g ref={initRef} style={{ opacity: 0.3 }}>
          <text x="52" y="112" fontSize="14" fontWeight="700" fill={C.accent}>initialize</text>
          <NumberLane x={52} y={126} color={C.accent} label="p" values={["p0", "p1", "p2", "p3"]} />
          <text x="52" y="196" fontSize="13" fill={C.secondary}>repeated differences at t0</text>
        </g>
        <g ref={updateRef} style={{ opacity: 0.3 }}>
          <Arrow x1={224} x2={282} y1={174} y2={174} color={C.warning} />
          <text x="304" y="112" fontSize="14" fontWeight="700" fill={C.warning}>update</text>
          <rect x="282" y="132" width="186" height="58" rx="10" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          <text x="375" y="168" textAnchor="middle" fontSize="17" fontFamily="monospace" fill={C.warning}>p.xyz += p.yzw</text>
          <text x="375" y="220" textAnchor="middle" fontSize="13" fill={C.secondary}>one vector add per sample</text>
        </g>
        <g ref={repeatRef} style={{ opacity: 0.3 }}>
          <Arrow x1={486} x2={540} y1={174} y2={174} color={C.success} />
          <text x="540" y="112" fontSize="14" fontWeight="700" fill={C.success}>repeat</text>
          {[0, 1, 2, 3].map((index) => (
            <g key={`difference-output-${index}`}>
              <rect x={524 + (index % 2) * 74} y={132 + Math.floor(index / 2) * 52} width="58" height="34" rx="7" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
              <text x={553 + (index % 2) * 74} y={155 + Math.floor(index / 2) * 52} textAnchor="middle" fontSize="13" fill={C.success}>value {index}</text>
            </g>
          ))}
          <text x="602" y="244" textAnchor="middle" fontSize="13" fill={C.secondary}>regular samples</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>the state remembers the expensive setup so the inner loop can use simple arithmetic</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={DIFFERENCE_LABELS} caption="逐步观察 forward differencing 如何把多项式求值改成固定状态的向量更新。" />
    </Figure>
  );
}

const QUOTIENT_STEPS: readonly TeachingStep[] = [
  { label: "seed", caption: "只在起点计算 g0、g1 和 g2，其中 g1 是相邻 Gaussian 值的商" },
  { label: "emit", caption: "使用当前 g0 参与 blur，再把 g0 乘以 g1 进入下一个采样点" },
  { label: "advance", caption: "同时把 g1 乘以常量 g2，保持 forward quotient 关系" },
];

const QUOTIENT_LABELS: Readonly<Record<string, string>> = {
  advance: "同时把 g1 乘以常量 g2，保持 forward quotient 关系",
  emit: "使用当前 g0 参与 blur，再把 g0 乘以 g1 进入下一个采样点",
  seed: "只在起点计算 g0、g1 和 g2，其中 g1 是相邻 Gaussian 值的商",
};

export function GpuGems3Ch40ForwardQuotientDiagram() {
  const seedRef = useRef<SVGGElement>(null);
  const emitRef = useRef<SVGGElement>(null);
  const advanceRef = useRef<SVGGElement>(null);
  const refs = [seedRef, emitRef, advanceRef];
  const timeline = useTeachingTimeline({
    steps: QUOTIENT_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.45 }, T * index);
        tl.label(QUOTIENT_STEPS[index].label, T * index);
      });
    },
  });
  return (
    <Figure>
      <Frame height={464} label="forward quotient Gaussian 动画：初始化 g0、g1、g2 后，每个样本执行 g0 乘 g1 和 g1 乘 g2，只需一次向量乘法">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>replace differences with quotients for an exponential</text>
        <rect x="28" y="72" width="704" height="286" rx="14" fill={C.surface} stroke={C.border} />
        <g ref={seedRef} style={{ opacity: 0.3 }}>
          <text x="52" y="112" fontSize="14" fontWeight="700" fill={C.accent}>seed once</text>
          <NumberLane x={52} y={128} color={C.accent} label="state" values={["g0", "g1", "g2"]} compact />
          <text x="52" y="204" fontSize="13" fill={C.secondary}>g1 = next / current</text>
          <text x="52" y="230" fontSize="13" fill={C.secondary}>g2 = g1 × g1</text>
        </g>
        <g ref={emitRef} style={{ opacity: 0.3 }}>
          <Arrow x1={236} x2={294} y1={178} y2={178} color={C.warning} />
          <text x="294" y="112" fontSize="14" fontWeight="700" fill={C.warning}>emit</text>
          <rect x="294" y="132" width="150" height="58" rx="10" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          <text x="369" y="168" textAnchor="middle" fontSize="16" fontFamily="monospace" fill={C.warning}>use g0</text>
          <text x="369" y="220" textAnchor="middle" fontSize="13" fill={C.secondary}>weight the sample</text>
        </g>
        <g ref={advanceRef} style={{ opacity: 0.3 }}>
          <Arrow x1={462} x2={520} y1={178} y2={178} color={C.success} />
          <text x="520" y="112" fontSize="14" fontWeight="700" fill={C.success}>advance</text>
          <rect x="520" y="132" width="174" height="58" rx="10" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="607" y="168" textAnchor="middle" fontSize="15" fontFamily="monospace" fill={C.success}>g.xy *= g.yz</text>
          <text x="607" y="220" textAnchor="middle" fontSize="13" fill={C.secondary}>one vector multiply</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>two initial exponentials can become one exponential plus cheap multiplies per sample</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={QUOTIENT_LABELS} caption="逐步观察 Gaussian 的 forward quotients 如何保持递推关系，并把 inner loop 降成向量乘法。" />
    </Figure>
  );
}

export function GpuGems3Ch40GaussianCostDiagram() {
  return (
    <Figure>
      <Frame height={442} label="Gaussian coefficient 计算成本比较：每次 exponential、texture table lookup 和 incremental quotient update 的热点不同">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>trade one setup cost for cheap inner-loop work</text>
        <g transform="translate(28 82)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>exp per sample</text>
          <MiniBar x={28} y={70} color={C.danger} label="exp" value={1} />
          <MiniBar x={28} y={112} color={C.warning} label="texture" value={0.42} />
          <MiniBar x={28} y={154} color={C.accent} label="multiply" value={0.26} />
          <text x="107" y="216" textAnchor="middle" fontSize="13" fill={C.danger}>exp dominates</text>
          <text x="107" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>radius makes it worse</text>
        </g>
        <g transform="translate(272 82)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>table lookup</text>
          <MiniBar x={28} y={70} color={C.warning} label="texture" value={0.75} />
          <MiniBar x={28} y={112} color={C.accent} label="multiply" value={0.24} />
          <MiniBar x={28} y={154} color={C.secondary} label="memory" value={0.58} />
          <text x="107" y="216" textAnchor="middle" fontSize="13" fill={C.warning}>extra fetch</text>
          <text x="107" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>cache may change tradeoff</text>
        </g>
        <g transform="translate(516 82)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>incremental</text>
          <MiniBar x={30} y={70} color={C.success} label="exp setup" value={0.16} />
          <MiniBar x={30} y={112} color={C.success} label="multiply" value={0.3} />
          <MiniBar x={30} y={154} color={C.success} label="texture" value={0.38} />
          <text x="108" y="216" textAnchor="middle" fontSize="13" fill={C.success}>one vector multiply</text>
          <text x="108" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>more support fits</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>the best path depends on arithmetic cost, table bandwidth, driver unrolling, and blur radius</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch40GaussianErrorDiagram() {
  return (
    <Figure>
      <Frame height={442} label="增量 Gaussian 误差示意：g1 的相对误差近似线性增长，g0 累积 g1 误差而近似二次增长；两次指数初始化能降低初始误差">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>cheap recurrence still needs an error budget</text>
        <g transform="translate(28 82)">
          <rect width="320" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="160" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>error grows with iterations</text>
          <line x1="52" x2="278" y1="218" y2="218" stroke={C.border} strokeWidth="2" />
          <line x1="52" x2="52" y1="74" y2="218" stroke={C.border} strokeWidth="2" />
          <path d="M 58 205 Q 160 168 272 88" fill="none" stroke={C.warning} strokeWidth="4" />
          <path d="M 58 212 Q 160 205 272 126" fill="none" stroke={C.danger} strokeWidth="4" />
          <text x="270" y="82" textAnchor="end" fontSize="13" fill={C.danger}>g0 ≈ quadratic</text>
          <text x="270" y="122" textAnchor="end" fontSize="13" fill={C.warning}>g1 ≈ linear</text>
          <text x="160" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>sample count →</text>
          <text x="64" y="66" fontSize="12" fill={C.secondary}>relative error</text>
        </g>
        <g transform="translate(382 82)">
          <rect width="350" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="175" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>initialization choice</text>
          <rect x="34" y="72" width="130" height="74" rx="10" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          <text x="99" y="102" textAnchor="middle" fontSize="13" fill={C.warning}>one exp</text>
          <text x="99" y="128" textAnchor="middle" fontSize="12" fill={C.secondary}>g2 = g1²</text>
          <rect x="186" y="72" width="130" height="74" rx="10" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="251" y="102" textAnchor="middle" fontSize="13" fill={C.success}>two exp</text>
          <text x="251" y="128" textAnchor="middle" fontSize="12" fill={C.secondary}>fresh g2</text>
          <Arrow x1={99} x2={99} y1={170} y2={214} color={C.warning} />
          <Arrow x1={251} x2={251} y1={170} y2={214} color={C.success} />
          <text x="99" y="244" textAnchor="middle" fontSize="12" fill={C.secondary}>lower setup cost</text>
          <text x="251" y="244" textAnchor="middle" fontSize="12" fill={C.success}>lower initial error</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>choose initialization from support radius and required fringe accuracy, then validate the output</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch40DeploymentDiagram() {
  return (
    <Figure>
      <Frame height={442} label="增量 Gaussian 部署取舍：support radius、shader loop 展开、texture lookup 与 constant buffer 共同决定可执行范围">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>the algorithm meets the driver and the hardware</text>
        <g transform="translate(28 82)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>support radius</text>
          <rect x="36" y="76" width="142" height="24" rx="7" fill={C.accent} fillOpacity="0.16" />
          <rect x="36" y="76" width="84" height="24" rx="7" fill={C.accent} />
          <text x="107" y="94" textAnchor="middle" fontSize="12" fill={C.text}>small → large</text>
          <text x="107" y="148" textAnchor="middle" fontSize="13" fill={C.accent}>more samples</text>
          <text x="107" y="180" textAnchor="middle" fontSize="13" fill={C.secondary}>more loop instructions</text>
          <text x="107" y="220" textAnchor="middle" fontSize="12" fill={C.secondary}>fringe accuracy</text>
          <text x="107" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>vs. instruction budget</text>
        </g>
        <g transform="translate(272 82)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>shader / driver</text>
          <rect x="36" y="76" width="142" height="24" rx="7" fill={C.warning} fillOpacity="0.16" />
          <rect x="36" y="76" width="116" height="24" rx="7" fill={C.warning} />
          <text x="107" y="94" textAnchor="middle" fontSize="12" fill={C.text}>loop unrolling</text>
          <text x="107" y="148" textAnchor="middle" fontSize="13" fill={C.warning}>instruction limit</text>
          <text x="107" y="180" textAnchor="middle" fontSize="13" fill={C.secondary}>texture lookup count</text>
          <text x="107" y="220" textAnchor="middle" fontSize="12" fill={C.secondary}>compile path matters</text>
          <text x="107" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>test actual driver output</text>
        </g>
        <g transform="translate(516 82)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>memory path</text>
          <rect x="36" y="76" width="144" height="24" rx="7" fill={C.success} fillOpacity="0.16" />
          <rect x="36" y="76" width="100" height="24" rx="7" fill={C.success} />
          <text x="108" y="94" textAnchor="middle" fontSize="12" fill={C.text}>table / constant</text>
          <text x="108" y="148" textAnchor="middle" fontSize="13" fill={C.success}>cache changes cost</text>
          <text x="108" y="180" textAnchor="middle" fontSize="13" fill={C.secondary}>new hardware varies</text>
          <text x="108" y="220" textAnchor="middle" fontSize="12" fill={C.secondary}>incremental still portable</text>
          <text x="108" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>benchmark both paths</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>at least 15 percent was reported historically, but radius and hardware can reverse the winner</text>
      </Frame>
    </Figure>
  );
}

type InitMode = "one-exp" | "two-exp";
type Method = "incremental" | "table" | "exp-loop";
type Sigma = "1" | "3" | "8" | "32";
type Support = "3" | "16" | "64" | "128";
type Stress = "normal" | "long-support";

const DEFAULTS = {
  init: "one-exp" as InitMode,
  method: "incremental" as Method,
  sigma: "3" as Sigma,
  stress: "normal" as Stress,
  support: "16" as Support,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch40GaussianLab() {
  const [init, setInit] = useState<InitMode>(DEFAULTS.init);
  const [method, setMethod] = useState<Method>(DEFAULTS.method);
  const [sigma, setSigma] = useState<Sigma>(DEFAULTS.sigma);
  const [stress, setStress] = useState<Stress>(DEFAULTS.stress);
  const [support, setSupport] = useState<Support>(DEFAULTS.support);

  const result = useMemo(() => {
    const sigmaValue = Number(sigma);
    const radius = Number(support);
    const samples = radius * 2 + 1;
    const methodFactor = method === "incremental" ? 1.18 : method === "table" ? 1 : 0.68;
    const radiusFactor = radius >= 64 ? 1.12 : radius >= 16 ? 1.04 : 0.96;
    const initFactor = init === "two-exp" ? 0.95 : 1;
    const stressFactor = stress === "long-support" ? 0.82 : 1;
    const relativeThroughput = methodFactor * radiusFactor * initFactor * stressFactor;
    const expCalls = method === "incremental" ? (init === "two-exp" ? 2 : 1) : method === "table" ? 0 : samples;
    const textureLookups = method === "table" ? samples : samples * 0.72;
    const errorRisk = stress === "long-support" && init === "one-exp" ? "fringe error grows" : init === "two-exp" ? "lower initial error" : "validate support tail";
    const warning = method === "exp-loop"
      ? "exponential in the inner loop"
      : method === "table"
        ? "lookup bandwidth is now visible"
        : stress === "long-support"
          ? "driver unrolling and recurrence error need a check"
          : "one setup exponential, cheap recurrence";
    return { errorRisk, expCalls, relativeThroughput, samples, sigmaValue, textureLookups, warning };
  }, [init, method, sigma, stress, support]);

  const reset = () => {
    setInit(DEFAULTS.init);
    setMethod(DEFAULTS.method);
    setSigma(DEFAULTS.sigma);
    setStress(DEFAULTS.stress);
    setSupport(DEFAULTS.support);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 40</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">Incremental Gaussian Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 Gaussian coefficient 的计算方法、sigma、support radius、初始化精度和长支持压力，观察指数调用、纹理查找、相对吞吐与误差风险。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 416" role="img" aria-label={`Gaussian 实验：${method} method，sigma ${sigma}，support ${support}，${init} initialization，${stress} stress`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>seed → coefficient → blur sample</text>
              <rect x="34" y="56" width="662" height="256" rx="12" fill={C.surface} stroke={C.border} />
              <rect x="62" y="98" width="128" height="80" rx="11" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <text x="126" y="126" textAnchor="middle" fontSize="13" fill={C.accent}>sigma {sigma}</text>
              <text x="126" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{support} radius</text>
              <Arrow x1={212} x2={248} y1={138} y2={138} color={C.accent} />
              <rect x="266" y="98" width="160" height="80" rx="11" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="346" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>{method}</text>
              <text x="346" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(result.expCalls)} exp setup calls</text>
              <Arrow x1={448} x2={484} y1={138} y2={138} color={C.warning} />
              <rect x="502" y="98" width="158" height="80" rx="11" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="581" y="126" textAnchor="middle" fontSize="13" fill={C.success}>blur samples</text>
              <text x="581" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(result.samples)} coefficients</text>
              <text x="365" y="228" textAnchor="middle" fontSize="13" fill={method === "exp-loop" ? C.danger : C.secondary}>{result.warning}</text>
              <text x="365" y="256" textAnchor="middle" fontSize="13" fill={C.warning}>texture lookup model {result.textureLookups.toFixed(1)} · {result.errorRisk}</text>
              <text x="365" y="284" textAnchor="middle" fontSize="13" fill={C.success}>relative throughput {result.relativeThroughput.toFixed(2)} · sigma {result.sigmaValue}</text>
              <text x="365" y="344" textAnchor="middle" fontSize="13" fill={C.secondary}>educational model, not a modern GPU benchmark</text>
              <text x="365" y="372" textAnchor="middle" fontSize="13" fill={C.accent}>validate coefficient tails before shipping a blur kernel</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="relative throughput" tone={C.accent} value={result.relativeThroughput.toFixed(2)} />
            <Metric label="exp setup calls" tone={C.warning} value={formatNumber(result.expCalls)} />
            <Metric label="coefficient samples" tone={C.success} value={formatNumber(result.samples)} />
            <Metric label="texture lookup model" tone={C.secondary} value={result.textureLookups.toFixed(1)} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch40-method">coefficient method<select id="ch40-method" value={method} onChange={(event) => setMethod(event.target.value as Method)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="incremental">incremental quotient</option><option value="table">texture table</option><option value="exp-loop">exp every sample</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch40-sigma">sigma<select id="ch40-sigma" value={sigma} onChange={(event) => setSigma(event.target.value as Sigma)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="1">1.0</option><option value="3">3.0</option><option value="8">8.0</option><option value="32">32.0</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch40-support">support radius<select id="ch40-support" value={support} onChange={(event) => setSupport(event.target.value as Support)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="3">3 samples</option><option value="16">16 samples</option><option value="64">64 samples</option><option value="128">128 samples</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch40-init">initialization<select id="ch40-init" value={init} onChange={(event) => setInit(event.target.value as InitMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="one-exp">one exponential + square</option><option value="two-exp">two exponential seeds</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch40-stress">validation mode<select id="ch40-stress" value={stress} onChange={(event) => setStress(event.target.value as Stress)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="normal">normal support</option><option value="long-support">long support stress</option></select></label>
        </div>
      </div>
    </div>
  );
}
