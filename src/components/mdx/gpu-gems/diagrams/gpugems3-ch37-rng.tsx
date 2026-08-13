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
  height = 430,
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

function Stream({
  color,
  label,
  x,
  y,
}: {
  color: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width="86" height="42" rx="8" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" />
      {[0, 1, 2, 3].map((index) => (
        <rect key={`stream-${x}-${y}-${index}`} x={x + 12 + index * 16} y={y + 12} width="10" height="18" rx="2" fill={color} fillOpacity={1 - index * 0.18} />
      ))}
      <text x={x + 43} y={y + 61} textAnchor="middle" fontSize="12" fill={C.secondary}>{label}</text>
    </g>
  );
}

function PoolGrid({
  count = 12,
  highlight = -1,
  x,
  y,
}: {
  count?: number;
  highlight?: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, index) => {
        const column = index % 4;
        const row = Math.floor(index / 4);
        const active = index === highlight;
        return (
          <g key={`pool-${x}-${y}-${index}`}>
            <rect x={x + column * 36} y={y + row * 36} width="29" height="29" rx="5" fill={active ? C.warning : C.surface} fillOpacity={active ? 0.22 : 1} stroke={active ? C.warning : C.border} strokeWidth="2" />
            <text x={x + column * 36 + 14} y={y + row * 36 + 19} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={active ? C.warning : C.secondary}>{index}</text>
          </g>
        );
      })}
    </g>
  );
}

export function GpuGems3Ch37MonteCarloDiagram() {
  return (
    <Figure>
      <Frame height={438} label="Monte Carlo 管线：每个独立 trial 获得一条独立随机序列，执行数值模拟，最后对结果求平均">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>independent trials turn uncertainty into parallel work</text>
        <g transform="translate(28 84)">
          <rect width="178" height="260" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="89" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>random streams</text>
          <Stream x={44} y={70} color={C.accent} label="trial 0" />
          <Stream x={44} y={140} color={C.success} label="trial 1" />
          <Stream x={44} y={210} color={C.warning} label="trial 2" />
        </g>
        <Arrow x1={230} x2={264} y1={214} y2={214} color={C.accent} />
        <g transform="translate(280 84)">
          <rect width="200" height="260" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="100" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>simulation kernel</text>
          <circle cx="62" cy="106" r="18" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="2" />
          <circle cx="100" cy="106" r="18" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="2" />
          <circle cx="138" cy="106" r="18" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="2" />
          <text x="100" y="168" textAnchor="middle" fontSize="13" fill={C.warning}>propagate parameters</text>
          <text x="100" y="198" textAnchor="middle" fontSize="13" fill={C.secondary}>price path / option payoff</text>
          <text x="100" y="232" textAnchor="middle" fontSize="12" fill={C.secondary}>one state per trial</text>
        </g>
        <Arrow x1={504} x2={538} y1={214} y2={214} color={C.warning} />
        <g transform="translate(554 84)">
          <rect width="178" height="260" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="89" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>combine</text>
          <line x1="36" x2="142" y1="88" y2="88" stroke={C.border} strokeWidth="3" />
          <circle cx="58" cy="88" r="8" fill={C.accent} />
          <circle cx="89" cy="88" r="8" fill={C.warning} />
          <circle cx="120" cy="88" r="8" fill={C.success} />
          <text x="89" y="144" textAnchor="middle" fontSize="18" fill={C.success}>mean</text>
          <text x="89" y="184" textAnchor="middle" fontSize="13" fill={C.secondary}>Law of Large Numbers</text>
          <text x="89" y="218" textAnchor="middle" fontSize="13" fill={C.success}>estimate</text>
          <text x="89" y="244" textAnchor="middle" fontSize="12" fill={C.secondary}>more trials → less noise</text>
        </g>
        <rect x="28" y="370" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="390" textAnchor="middle" fontSize="13" fill={C.secondary}>the hard GPU problem is assigning safe streams, not multiplying one more payoff</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch37StreamAssignmentDiagram() {
  return (
    <Figure>
      <Frame height={448} label="GPU 随机序列分配：每个线程获得不重叠子流，状态与 stride 共同决定起点，不能让线程共享同一 seed 继续推进">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>parallelism starts with non-overlapping sequence ownership</text>
        <g transform="translate(28 84)">
          <rect width="208" height="270" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="104" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>one long stream</text>
          <line x1="30" x2="178" y1="94" y2="94" stroke={C.border} strokeWidth="3" />
          {Array.from({ length: 8 }, (_, index) => (
            <circle key={`long-stream-${index}`} cx={42 + index * 18} cy="94" r="7" fill={index === 3 ? C.warning : C.accent} />
          ))}
          <text x="104" y="146" textAnchor="middle" fontSize="13" fill={C.secondary}>state → next state</text>
          <text x="104" y="190" textAnchor="middle" fontSize="13" fill={C.danger}>shared seed is not</text>
          <text x="104" y="214" textAnchor="middle" fontSize="13" fill={C.danger}>a stream partition</text>
          <text x="104" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>threads would overlap</text>
        </g>
        <Arrow x1={260} x2={296} y1={220} y2={220} color={C.warning} />
        <g transform="translate(314 84)">
          <rect width="188" height="270" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="94" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>partition rule</text>
          <text x="94" y="90" textAnchor="middle" fontSize="18" fill={C.warning}>seed + stride × id</text>
          <line x1="36" x2="152" y1="126" y2="126" stroke={C.border} strokeWidth="2" />
          <text x="94" y="164" textAnchor="middle" fontSize="13" fill={C.secondary}>sequence 0</text>
          <text x="94" y="190" textAnchor="middle" fontSize="13" fill={C.secondary}>sequence 1</text>
          <text x="94" y="216" textAnchor="middle" fontSize="13" fill={C.secondary}>sequence 2</text>
          <text x="94" y="252" textAnchor="middle" fontSize="12" fill={C.warning}>no overlap by construction</text>
        </g>
        <Arrow x1={526} x2={562} y1={220} y2={220} color={C.success} />
        <g transform="translate(580 84)">
          <rect width="152" height="270" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="76" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>GPU threads</text>
          <circle cx="52" cy="94" r="15" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="2" />
          <circle cx="100" cy="94" r="15" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <circle cx="52" cy="144" r="15" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="2" />
          <circle cx="100" cy="144" r="15" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="2" />
          <text x="76" y="196" textAnchor="middle" fontSize="13" fill={C.success}>independent</text>
          <text x="76" y="220" textAnchor="middle" fontSize="13" fill={C.secondary}>state + stream</text>
          <text x="76" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>each trial owns its RNG</text>
        </g>
        <rect x="28" y="380" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="400" textAnchor="middle" fontSize="13" fill={C.secondary}>sequence independence is a correctness requirement before it is a speed optimization</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch37GaussianChoiceDiagram() {
  return (
    <Figure>
      <Frame height={446} label="Gaussian 生成方法选择：Ziggurat 和 polar 有概率分支与循环，Box-Muller 固定变换适合 GPU，Wallace 直接从 Gaussian pool 变换">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>a GPU prefers predictable Gaussian work</text>
        <g transform="translate(28 84)">
          <rect width="212" height="272" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="106" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>branching paths</text>
          <circle cx="106" cy="92" r="28" fill={C.danger} fillOpacity="0.14" stroke={C.danger} strokeWidth="3" />
          <text x="106" y="98" textAnchor="middle" fontSize="13" fill={C.danger}>2%</text>
          <Arrow x1={82} x2={56} y1={116} y2={152} color={C.danger} />
          <Arrow x1={130} x2={156} y1={116} y2={152} color={C.danger} />
          <text x="56" y="184" textAnchor="middle" fontSize="12" fill={C.secondary}>fast</text>
          <text x="156" y="184" textAnchor="middle" fontSize="12" fill={C.danger}>slow route</text>
          <text x="106" y="232" textAnchor="middle" fontSize="13" fill={C.danger}>warp pays for divergence</text>
          <text x="106" y="256" textAnchor="middle" fontSize="12" fill={C.secondary}>Ziggurat / polar</text>
        </g>
        <Arrow x1={264} x2={300} y1={220} y2={220} color={C.warning} />
        <g transform="translate(318 84)">
          <rect width="186" height="272" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="93" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>Box-Muller</text>
          <text x="93" y="92" textAnchor="middle" fontSize="14" fill={C.warning}>u₀, u₁</text>
          <Arrow x1={93} x2={93} y1={112} y2={154} color={C.warning} />
          <text x="93" y="188" textAnchor="middle" fontSize="14" fill={C.success}>n₀, n₁</text>
          <text x="93" y="232" textAnchor="middle" fontSize="13" fill={C.secondary}>fixed transform</text>
          <text x="93" y="256" textAnchor="middle" fontSize="12" fill={C.success}>uniform → Gaussian</text>
        </g>
        <Arrow x1={528} x2={564} y1={220} y2={220} color={C.success} />
        <g transform="translate(582 84)">
          <rect width="150" height="272" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="75" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>Wallace</text>
          <PoolGrid x={38} y={70} count={12} highlight={5} />
          <Arrow x1={75} x2={75} y1={190} y2={226} color={C.success} />
          <text x="75" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>Gaussian pool → pool</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>the choice trades branch regularity against state footprint and mixing cost</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch37WallacePoolDiagram() {
  return (
    <Figure>
      <Frame height={442} label="Wallace Gaussian generator：共享内存中的 Gaussian pool 先随机置换，再用许多 2×2 正交变换生成下一 pool，保持平方和不变">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>mix a Gaussian pool without regenerating every value</text>
        <g transform="translate(28 84)">
          <rect width="206" height="270" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="103" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>pool k</text>
          <PoolGrid x={46} y={70} count={12} highlight={2} />
          <text x="103" y="222" textAnchor="middle" fontSize="13" fill={C.accent}>Gaussian values</text>
          <text x="103" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>shared memory state</text>
        </g>
        <Arrow x1={262} x2={298} y1={220} y2={220} color={C.warning} />
        <g transform="translate(316 84)">
          <rect width="194" height="270" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="97" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>permute + rotate</text>
          <PoolGrid x={52} y={70} count={12} highlight={8} />
          <path d="M 52 198 C 82 174 112 220 144 194" fill="none" stroke={C.warning} strokeWidth="3" strokeDasharray="7 6" />
          <text x="97" y="238" textAnchor="middle" fontSize="13" fill={C.warning}>2×2 orthogonal blocks</text>
          <text x="97" y="260" textAnchor="middle" fontSize="12" fill={C.secondary}>preserve length</text>
        </g>
        <Arrow x1={538} x2={574} y1={220} y2={220} color={C.success} />
        <g transform="translate(592 84)">
          <rect width="140" height="270" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="70" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>next pool</text>
          <PoolGrid x={38} y={70} count={12} highlight={10} />
          <text x="70" y="222" textAnchor="middle" fontSize="13" fill={C.success}>output samples</text>
          <text x="70" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>repeat passes</text>
        </g>
        <rect x="28" y="380" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="400" textAnchor="middle" fontSize="13" fill={C.secondary}>random permutation matters: a simple nonrandom mapping can fail statistical tests</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch37ResourceTradeoffDiagram() {
  return (
    <Figure>
      <Frame height={438} label="GPU 随机数生成器资源取舍：Tausworthe 加 Box-Muller 状态较小，Wallace 直接生成 Gaussian 但占用共享内存，Mersenne Twister 状态较大">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>there is no free Gaussian sample</text>
        <g transform="translate(28 82)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>Taus + Box-Muller</text>
          <text x="108" y="78" textAnchor="middle" fontSize="14" fill={C.accent}>small per-thread state</text>
          <rect x="36" y="106" width="144" height="22" rx="6" fill={C.accent} fillOpacity="0.16" />
          <rect x="36" y="106" width="110" height="22" rx="6" fill={C.accent} />
          <text x="108" y="122" textAnchor="middle" fontSize="12" fill={C.text}>shared memory: low</text>
          <text x="108" y="174" textAnchor="middle" fontSize="13" fill={C.secondary}>fixed transform</text>
          <text x="108" y="202" textAnchor="middle" fontSize="13" fill={C.success}>high occupancy headroom</text>
          <text x="108" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>hybrid: fast + flexible</text>
        </g>
        <g transform="translate(272 82)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>Wallace</text>
          <text x="108" y="78" textAnchor="middle" fontSize="14" fill={C.warning}>direct Gaussian output</text>
          <rect x="36" y="106" width="144" height="22" rx="6" fill={C.warning} fillOpacity="0.16" />
          <rect x="36" y="106" width="126" height="22" rx="6" fill={C.warning} />
          <text x="108" y="122" textAnchor="middle" fontSize="12" fill={C.text}>shared memory: high</text>
          <text x="108" y="174" textAnchor="middle" fontSize="13" fill={C.secondary}>pool + permutation</text>
          <text x="108" y="202" textAnchor="middle" fontSize="13" fill={C.warning}>less room for simulation</text>
          <text x="108" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>fewer transform calls</text>
        </g>
        <g transform="translate(516 82)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>large-state PRNG</text>
          <text x="108" y="78" textAnchor="middle" fontSize="14" fill={C.danger}>quality is not free</text>
          <rect x="36" y="106" width="144" height="22" rx="6" fill={C.danger} fillOpacity="0.16" />
          <rect x="36" y="106" width="138" height="22" rx="6" fill={C.danger} />
          <text x="108" y="122" textAnchor="middle" fontSize="12" fill={C.text}>global memory: high</text>
          <text x="108" y="174" textAnchor="middle" fontSize="13" fill={C.secondary}>state traffic</text>
          <text x="108" y="202" textAnchor="middle" fontSize="13" fill={C.danger}>serial update pressure</text>
          <text x="108" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>test before adopting</text>
        </g>
        <rect x="28" y="380" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="400" textAnchor="middle" fontSize="13" fill={C.secondary}>choose by stream quality, state placement, branch behavior, and the simulation resource budget</text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "assign", caption: "为每个执行单元分配不重叠子流，并把模拟参数复制到所有线程" },
  { label: "generate", caption: "生成 uniform 或直接 Gaussian random values，保持线程路径尽量规则" },
  { label: "simulate", caption: "每个 trial 执行数值 kernel，例如价格路径与 option payoff" },
  { label: "reduce", caption: "收集输出并求平均/方差，检查误差是否随 trial 数下降" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  assign: "为每个执行单元分配不重叠子流，并把模拟参数复制到所有线程",
  generate: "生成 uniform 或直接 Gaussian random values，保持线程路径尽量规则",
  reduce: "收集输出并求平均/方差，检查误差是否随 trial 数下降",
  simulate: "每个 trial 执行数值 kernel，例如价格路径与 option payoff",
};

export function GpuGems3Ch37PipelineDiagram() {
  const assignRef = useRef<SVGGElement>(null);
  const generateRef = useRef<SVGGElement>(null);
  const simulateRef = useRef<SVGGElement>(null);
  const reduceRef = useRef<SVGGElement>(null);
  const refs = [assignRef, generateRef, simulateRef, reduceRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={464} label="CUDA Monte Carlo 四阶段动画：分配随机序列、生成随机数、并行运行模拟、聚合输出">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>from sequence ownership to a Monte Carlo estimate</text>
        <g ref={assignRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · assign</text>
          <Stream x={44} y={154} color={C.accent} label="stream 0" />
          <Stream x={44} y={224} color={C.success} label="stream 1" />
          <text x="106" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>unique starts</text>
        </g>
        <Arrow x1={204} x2={224} y1={214} y2={214} color={C.accent} />
        <g ref={generateRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="318" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · generate</text>
          <PoolGrid x={266} y={154} count={12} highlight={4} />
          <text x="318" y="294" textAnchor="middle" fontSize="13" fill={C.warning}>U or N samples</text>
          <text x="318" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>regular path</text>
        </g>
        <Arrow x1={416} x2={436} y1={214} y2={214} color={C.warning} />
        <g ref={simulateRef} style={{ opacity: 0.3 }}>
          <rect x="448" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="530" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · simulate</text>
          <circle cx="486" cy="184" r="16" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <circle cx="530" cy="184" r="16" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <circle cx="574" cy="184" r="16" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <text x="530" y="252" textAnchor="middle" fontSize="13" fill={C.success}>path → payoff</text>
          <text x="530" y="280" textAnchor="middle" fontSize="12" fill={C.secondary}>one trial / thread</text>
          <text x="530" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>dense numeric work</text>
        </g>
        <Arrow x1={628} x2={648} y1={214} y2={214} color={C.success} />
        <g ref={reduceRef} style={{ opacity: 0.3 }}>
          <rect x="660" y="86" width="76" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="698" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <text x="698" y="174" textAnchor="middle" fontSize="13" fill={C.accent}>mean</text>
          <text x="698" y="202" textAnchor="middle" fontSize="12" fill={C.secondary}>variance</text>
          <Arrow x1={698} x2={698} y1={224} y2={266} color={C.accent} />
          <text x="698" y="306" textAnchor="middle" fontSize="11" fill={C.secondary}>estimate</text>
        </g>
        <rect x="24" y="378" width="712" height="30" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>faster random numbers help only if the simulation and reduction remain statistically sound</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察随机序列如何进入并行 Monte Carlo trial，再汇聚成估计值。" />
    </Figure>
  );
}

type Generator = "taus-box" | "wallace";
type Distribution = "uniform" | "gaussian";
type TrialCount = "10000" | "100000" | "1000000";
type PoolWords = "512" | "2048" | "4096";
type QualityMode = "speed" | "balanced" | "quality";

const DEFAULTS = {
  distribution: "gaussian" as Distribution,
  generator: "taus-box" as Generator,
  poolWords: "2048" as PoolWords,
  quality: "balanced" as QualityMode,
  trials: "100000" as TrialCount,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch37RngLab() {
  const [generator, setGenerator] = useState<Generator>(DEFAULTS.generator);
  const [distribution, setDistribution] = useState<Distribution>(DEFAULTS.distribution);
  const [trials, setTrials] = useState<TrialCount>(DEFAULTS.trials);
  const [poolWords, setPoolWords] = useState<PoolWords>(DEFAULTS.poolWords);
  const [quality, setQuality] = useState<QualityMode>(DEFAULTS.quality);

  const result = useMemo(() => {
    const trialCount = Number(trials);
    const pool = Number(poolWords);
    const isWallace = generator === "wallace";
    const gaussian = distribution === "gaussian";
    const branchPenalty = quality === "quality" ? 0.88 : quality === "speed" ? 1.08 : 1;
    const rawSamples = Math.round((isWallace ? 5274 : 4327) * branchPenalty * (gaussian ? 1 : 1.22));
    const effectiveSamples = Math.round(rawSamples * (trialCount >= 1000000 ? 0.94 : trialCount >= 100000 ? 0.98 : 1));
    const poolPressure = isWallace ? pool / 2048 : 0;
    const sharedMemory = isWallace ? pool : 256;
    const error = Math.max(0.0008, 1 / Math.sqrt(trialCount) * (quality === "quality" ? 0.84 : quality === "speed" ? 1.18 : 1));
    const qualityLabel = quality === "quality" ? "strict statistical checks" : quality === "speed" ? "throughput first" : "balanced";
    const warning = isWallace && pool > 2048 ? "pool pressure: less shared memory remains for the simulation" : isWallace ? "pool transform: direct Gaussian output" : "uniform stream + fixed Gaussian transform";
    return { effectiveSamples, error, poolPressure, qualityLabel, rawSamples, sharedMemory, warning };
  }, [distribution, generator, poolWords, quality, trials]);

  const reset = () => {
    setGenerator(DEFAULTS.generator);
    setDistribution(DEFAULTS.distribution);
    setTrials(DEFAULTS.trials);
    setPoolWords(DEFAULTS.poolWords);
    setQuality(DEFAULTS.quality);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 37</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA Gaussian RNG Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 generator、distribution、trial 数、Wallace pool 大小和质量策略，观察 raw samples、shared-memory pressure 与 Monte Carlo 误差。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 416" role="img" aria-label={`随机数实验：${generator} generator，${distribution} distribution，${trials} trials，${poolWords} pool words，${quality} quality`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>sequence → RNG → simulation → estimate</text>
              <rect x="34" y="56" width="662" height="256" rx="12" fill={C.surface} stroke={C.border} />
              <Stream x={66} y={118} color={C.accent} label="substreams" />
              <Arrow x1={168} x2={214} y1={140} y2={140} color={C.accent} />
              <rect x="232" y="96" width="132" height="80" rx="11" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="298" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>{isWallaceLabel(generator)}</text>
              <text x="298" y="150" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(result.effectiveSamples)} MSamples/s</text>
              <Arrow x1={382} x2={428} y1={140} y2={140} color={C.warning} />
              <rect x="446" y="96" width="116" height="80" rx="11" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="504" y="126" textAnchor="middle" fontSize="13" fill={C.success}>Monte Carlo</text>
              <text x="504" y="150" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(Number(trials))} trials</text>
              <Arrow x1={580} x2={620} y1={140} y2={140} color={C.success} />
              <circle cx="654" cy="140" r="25" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="3" />
              <text x="654" y="146" textAnchor="middle" fontSize="12" fill={C.success}>mean</text>
              <text x="365" y="232" textAnchor="middle" fontSize="13" fill={C.secondary}>{result.warning}</text>
              <text x="365" y="260" textAnchor="middle" fontSize="13" fill={C.warning}>shared memory {formatNumber(result.sharedMemory)} words · {result.qualityLabel}</text>
              <text x="365" y="288" textAnchor="middle" fontSize="13" fill={C.success}>estimated standard error ≈ {result.error.toFixed(4)}</text>
              <text x="365" y="344" textAnchor="middle" fontSize="13" fill={C.secondary}>educational performance model based on historical chapter measurements</text>
              <text x="365" y="372" textAnchor="middle" fontSize="13" fill={C.accent}>statistical quality still requires empirical tests</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="raw samples / second" tone={C.accent} value={formatNumber(result.rawSamples)} />
            <Metric label="effective samples / second" tone={C.success} value={formatNumber(result.effectiveSamples)} />
            <Metric label="shared-memory words" tone={C.warning} value={formatNumber(result.sharedMemory)} />
            <Metric label="estimated standard error" tone={C.success} value={result.error.toFixed(4)} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch37-generator">generator<select id="ch37-generator" value={generator} onChange={(event) => setGenerator(event.target.value as Generator)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="taus-box">hybrid Tausworthe + Box-Muller</option><option value="wallace">Wallace Gaussian</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch37-distribution">distribution<select id="ch37-distribution" value={distribution} onChange={(event) => setDistribution(event.target.value as Distribution)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="uniform">uniform</option><option value="gaussian">Gaussian</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch37-trials">trial count<select id="ch37-trials" value={trials} onChange={(event) => setTrials(event.target.value as TrialCount)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="10000">10,000</option><option value="100000">100,000</option><option value="1000000">1,000,000</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch37-pool">Wallace pool<select id="ch37-pool" value={poolWords} onChange={(event) => setPoolWords(event.target.value as PoolWords)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="512">512 words</option><option value="2048">2,048 words</option><option value="4096">4,096 words</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch37-quality">quality strategy<select id="ch37-quality" value={quality} onChange={(event) => setQuality(event.target.value as QualityMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="speed">throughput first</option><option value="balanced">balanced</option><option value="quality">strict statistical checks</option></select></label>
        </div>
      </div>
    </div>
  );
}

function isWallaceLabel(generator: Generator) {
  return generator === "wallace" ? "Wallace pool" : "Taus + transform";
}
