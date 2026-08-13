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
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
      />
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
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

function Grid({
  height,
  width,
  x,
  y,
}: {
  height: number;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g opacity="0.65">
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={`grid-x-${index}`}
          x1={x + (width / 8) * index}
          x2={x + (width / 8) * index}
          y1={y}
          y2={y + height}
          stroke={C.border}
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`grid-y-${index}`}
          x1={x}
          x2={x + width}
          y1={y + (height / 6) * index}
          y2={y + (height / 6) * index}
          stroke={C.border}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function Triangle({
  fill = C.accent,
  x,
  y,
}: {
  fill?: string;
  x: number;
  y: number;
}) {
  return (
    <path
      d={`M ${x - 62} ${y + 34} L ${x - 4} ${y - 54} L ${x + 68} ${y + 26} Z`}
      fill={fill}
      fillOpacity="0.2"
      stroke={fill}
      strokeWidth="3"
    />
  );
}

export function GpuGems3Ch34SdfDefinitionDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="有符号距离场的网格采样：表面是零等值面，外部为正，内部为负，绝对值表示到表面的最近距离"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          an SDF turns a surface into a queryable distance map
        </text>
        <g transform="translate(28 76)">
          <rect width="434" height="294" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <Grid x={28} y={46} width={378} height={208} />
          <path d="M 78 234 C 104 178 130 160 158 134 C 194 100 252 94 290 120 C 328 146 352 190 388 222" fill="none" stroke={C.warning} strokeWidth="5" />
          <path d="M 78 252 C 104 196 130 178 158 152 C 194 118 252 112 290 138 C 328 164 352 208 388 240" fill="none" stroke={C.warning} strokeOpacity="0.3" strokeWidth="3" strokeDasharray="7 6" />
          <text x="232" y="82" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.warning}>zero isosurface</text>
          <text x="104" y="286" textAnchor="middle" fontSize="13" fill={C.success}>inside · d &lt; 0</text>
          <text x="348" y="286" textAnchor="middle" fontSize="13" fill={C.accent}>outside · d &gt; 0</text>
          <circle cx="246" cy="154" r="6" fill={C.warning} />
          <line x1="246" y1="154" x2="246" y2="116" stroke={C.warning} strokeWidth="2" strokeDasharray="5 5" />
          <text x="258" y="112" fontSize="12" fill={C.secondary}>voxel sample</text>
        </g>
        <Arrow x1={486} x2={526} y1={222} y2={222} color={C.warning} />
        <g transform="translate(548 76)">
          <rect width="184" height="294" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="92" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>one stored value</text>
          <text x="92" y="94" textAnchor="middle" fontSize="22" fontWeight="700" fill={C.warning}>d(p)</text>
          <line x1="32" x2="152" y1="126" y2="126" stroke={C.border} strokeWidth="3" />
          <circle cx="50" cy="126" r="8" fill={C.success} />
          <circle cx="92" cy="126" r="8" fill={C.warning} />
          <circle cx="134" cy="126" r="8" fill={C.accent} />
          <text x="92" y="174" textAnchor="middle" fontSize="13" fill={C.secondary}>sign + magnitude</text>
          <text x="92" y="220" textAnchor="middle" fontSize="13" fill={C.success}>collision query</text>
          <text x="92" y="246" textAnchor="middle" fontSize="13" fill={C.accent}>ray / path query</text>
          <text x="92" y="272" textAnchor="middle" fontSize="12" fill={C.secondary}>interpolate between voxels</text>
        </g>
        <rect x="28" y="392" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="411" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the grid is the index; the zero crossing is the geometric surface
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch34TetraScanDiagram() {
  return (
    <Figure>
      <Frame
        height={444}
        label="T4 窄带 shell 的构造和扫描：三角形扩成带状 OBB，再分解为五个四面体，z 平面切片后生成凸多边形"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          make the narrow band simple enough to slice
        </text>
        <g transform="translate(28 82)">
          <rect width="210" height="276" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="105" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · triangle</text>
          <Triangle x={106} y={132} />
          <line x1="106" x2="106" y1="98" y2="220" stroke={C.warning} strokeWidth="2" strokeDasharray="7 6" />
          <text x="105" y="244" textAnchor="middle" fontSize="13" fill={C.warning}>normal n</text>
          <text x="105" y="264" textAnchor="middle" fontSize="12" fill={C.secondary}>longest edge + height</text>
        </g>
        <Arrow x1={254} x2={286} y1={220} y2={220} color={C.accent} />
        <g transform="translate(302 82)">
          <rect width="210" height="276" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="105" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · shell</text>
          <rect x="42" y="70" width="126" height="136" fill={C.warning} fillOpacity="0.08" stroke={C.warning} strokeWidth="3" transform="rotate(-8 105 138)" />
          <path d="M 42 70 L 105 206 L 168 70 M 42 206 L 168 70 M 42 70 L 168 206" fill="none" stroke={C.accent} strokeWidth="2" opacity="0.85" />
          <text x="105" y="238" textAnchor="middle" fontSize="13" fill={C.warning}>OBB → 5 tetrahedra</text>
          <text x="105" y="262" textAnchor="middle" fontSize="12" fill={C.secondary}>cover Voronoi regions</text>
        </g>
        <Arrow x1={528} x2={560} y1={220} y2={220} color={C.warning} />
        <g transform="translate(576 82)">
          <rect width="156" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="78" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · z slice</text>
          <line x1="24" x2="132" y1="110" y2="110" stroke={C.warning} strokeWidth="4" />
          <path d="M 46 110 L 78 74 L 112 110 L 88 142 Z" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="3" />
          <circle cx="46" cy="110" r="5" fill={C.success} />
          <circle cx="78" cy="74" r="5" fill={C.success} />
          <circle cx="112" cy="110" r="5" fill={C.success} />
          <circle cx="88" cy="142" r="5" fill={C.success} />
          <Arrow x1={78} x2={78} y1={176} y2={214} color={C.success} />
          <text x="78" y="238" textAnchor="middle" fontSize="13" fill={C.success}>fragment program</text>
          <text x="78" y="262" textAnchor="middle" fontSize="12" fill={C.secondary}>signed distance</text>
        </g>
        <rect x="28" y="382" width="704" height="32" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="403" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the CPU builds coverage; the GPU evaluates each covered voxel slice
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch34FeatureDistanceDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="三角形距离的 feature case analysis：采样点选择最近的面、边或顶点，并用对应的伪法线决定符号"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          distance is the closest feature, not always the face plane
        </text>
        <g transform="translate(28 76)">
          <rect width="424" height="296" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <Triangle x={224} y={166} />
          <circle cx="162" cy="146" r="7" fill={C.warning} />
          <line x1="162" y1="146" x2="220" y2="112" stroke={C.warning} strokeWidth="3" strokeDasharray="7 6" />
          <text x="126" y="138" textAnchor="middle" fontSize="13" fill={C.warning}>p₀ → edge</text>
          <circle cx="302" cy="228" r="7" fill={C.success} />
          <line x1="302" y1="228" x2="288" y2="188" stroke={C.success} strokeWidth="3" strokeDasharray="7 6" />
          <text x="338" y="240" textAnchor="middle" fontSize="13" fill={C.success}>p₁ → vertex</text>
          <circle cx="244" cy="104" r="7" fill={C.accent} />
          <line x1="244" y1="104" x2="244" y2="144" stroke={C.accent} strokeWidth="3" strokeDasharray="7 6" />
          <text x="244" y="90" textAnchor="middle" fontSize="13" fill={C.accent}>p₂ → face</text>
          <text x="212" y="276" textAnchor="middle" fontSize="13" fill={C.secondary}>case analysis picks one c</text>
        </g>
        <Arrow x1={476} x2={516} y1={222} y2={222} color={C.warning} />
        <g transform="translate(536 76)">
          <rect width="196" height="296" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="98" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>closest feature c</text>
          <text x="98" y="92" textAnchor="middle" fontSize="18" fill={C.warning}>|p − c|</text>
          <line x1="34" x2="162" y1="124" y2="124" stroke={C.border} strokeWidth="3" />
          <text x="98" y="164" textAnchor="middle" fontSize="13" fill={C.accent}>pseudonormal n(c)</text>
          <text x="98" y="204" textAnchor="middle" fontSize="13" fill={C.secondary}>d = n(c) · (p − c)</text>
          <text x="98" y="244" textAnchor="middle" fontSize="13" fill={C.success}>sign and magnitude</text>
          <text x="98" y="270" textAnchor="middle" fontSize="12" fill={C.secondary}>one fragment, one answer</text>
        </g>
        <rect x="28" y="392" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="411" textAnchor="middle" fontSize="13" fill={C.secondary}>
          angle-weighted pseudonormals carry local surface orientation through vertices and edges
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch34LeakSignDiagram() {
  return (
    <Figure>
      <Frame
        height={442}
        label="平面测试可能把窄带内部体素标成正值而产生 leaking；最近 feature 的 angle-weighted pseudonormal 可恢复正确符号"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          the sign must follow the feature, not just its plane
        </text>
        <g transform="translate(28 78)">
          <rect width="322" height="296" rx="14" fill={C.surface} stroke={C.danger} strokeWidth="2" />
          <text x="161" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.danger}>plane test · leak</text>
          <path d="M 56 224 L 138 100 L 274 224 Z" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="3" />
          <line x1="62" x2="278" y1="164" y2="164" stroke={C.warning} strokeWidth="3" />
          <circle cx="118" cy="184" r="9" fill={C.danger} />
          <circle cx="154" cy="184" r="9" fill={C.danger} />
          <circle cx="190" cy="184" r="9" fill={C.danger} />
          <text x="161" y="258" textAnchor="middle" fontSize="13" fill={C.danger}>inside voxels look positive</text>
          <text x="161" y="280" textAnchor="middle" fontSize="12" fill={C.secondary}>neighboring face owns the sign</text>
        </g>
        <Arrow x1={374} x2={410} y1={224} y2={224} color={C.success} />
        <g transform="translate(438 78)">
          <rect width="294" height="296" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="147" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.success}>pseudonormal · repair</text>
          <path d="M 54 224 L 130 100 L 250 224 Z" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="3" />
          <circle cx="150" cy="184" r="9" fill={C.success} />
          <Arrow x1={150} x2={150} y1={184} y2={140} color={C.success} />
          <text x="150" y="126" textAnchor="middle" fontSize="13" fill={C.success}>n(c)</text>
          <text x="147" y="258" textAnchor="middle" fontSize="13" fill={C.success}>sign from closest feature</text>
          <text x="147" y="280" textAnchor="middle" fontSize="12" fill={C.secondary}>folds still need another pass</text>
        </g>
        <rect x="28" y="394" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="413" textAnchor="middle" fontSize="13" fill={C.secondary}>
          single-pass removes plane-test leaks, but it does not make folded topology unambiguous
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch34MemoryDiagram() {
  return (
    <Figure>
      <Frame
        height={432}
        label="T4 GPU 扫描的缓冲区选择：fragment program 将 signed distance 写入 color buffer，将绝对值写入 depth buffer，depth test 保留最小绝对值"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          let depth choose the nearest candidate for us
        </text>
        <g transform="translate(28 82)">
          <rect width="208" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="104" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>fragment candidate</text>
          <path d="M 58 112 L 104 66 L 150 112 L 104 158 Z" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="3" />
          <text x="104" y="202" textAnchor="middle" fontSize="14" fill={C.warning}>d = −0.42</text>
          <text x="104" y="230" textAnchor="middle" fontSize="13" fill={C.secondary}>same voxel, one candidate</text>
        </g>
        <Arrow x1={258} x2={294} y1={180} y2={180} color={C.accent} />
        <g transform="translate(312 82)">
          <rect width="204" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="102" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>two buffers</text>
          <rect x="30" y="62" width="144" height="58" rx="10" fill={C.warning} fillOpacity="0.13" stroke={C.warning} strokeWidth="2" />
          <text x="102" y="88" textAnchor="middle" fontSize="13" fill={C.warning}>color: signed d</text>
          <text x="102" y="108" textAnchor="middle" fontSize="12" fill={C.secondary}>−0.42</text>
          <rect x="30" y="144" width="144" height="58" rx="10" fill={C.accent} fillOpacity="0.13" stroke={C.accent} strokeWidth="2" />
          <text x="102" y="170" textAnchor="middle" fontSize="13" fill={C.accent}>depth: |d|</text>
          <text x="102" y="190" textAnchor="middle" fontSize="12" fill={C.secondary}>0.42</text>
          <text x="102" y="230" textAnchor="middle" fontSize="13" fill={C.secondary}>depth test = min |d|</text>
        </g>
        <Arrow x1={538} x2={574} y1={180} y2={180} color={C.success} />
        <g transform="translate(592 82)">
          <rect width="140" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="70" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>voxel result</text>
          <circle cx="70" cy="108" r="32" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="3" />
          <text x="70" y="114" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.success}>−0.42</text>
          <text x="70" y="178" textAnchor="middle" fontSize="13" fill={C.success}>signed winner</text>
          <text x="70" y="208" textAnchor="middle" fontSize="12" fill={C.secondary}>read back per z slice</text>
          <text x="70" y="234" textAnchor="middle" fontSize="12" fill={C.secondary}>store in SDF grid</text>
        </g>
        <rect x="28" y="368" width="704" height="28" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="387" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the “single pass” is per slice: depth resolves overlaps while the CPU advances the z sweep
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "shell", caption: "CPU 为每个三角形生成覆盖窄带 Voronoi 区域的 tetra shell" },
  { label: "slice", caption: "z 平面前进，找到与当前切片相交的 tetrahedra 并生成截面多边形" },
  { label: "fragment", caption: "fragment program 做 closest-feature case analysis，并用伪法线决定符号" },
  { label: "resolve", caption: "color 写入 signed distance，depth 以绝对值保留每个 voxel 的最近候选" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  fragment: "fragment program 做 closest-feature case analysis，并用伪法线决定符号",
  resolve: "color 写入 signed distance，depth 以绝对值保留每个 voxel 的最近候选",
  shell: "CPU 为每个三角形生成覆盖窄带 Voronoi 区域的 tetra shell",
  slice: "z 平面前进，找到与当前切片相交的 tetrahedra 并生成截面多边形",
};

export function GpuGems3Ch34PipelineDiagram() {
  const shellRef = useRef<SVGGElement>(null);
  const sliceRef = useRef<SVGGElement>(null);
  const fragmentRef = useRef<SVGGElement>(null);
  const resolveRef = useRef<SVGGElement>(null);
  const refs = [shellRef, sliceRef, fragmentRef, resolveRef];
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
      <Frame height={464} label="T4 GPU scan 的四阶段动画：生成 tetra shell、z 平面切片、fragment program 计算、depth 选择并回读">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one z-sweep, four teaching beats
        </text>
        <g ref={shellRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="82" width="164" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · shell</text>
          <Triangle x={106} y={184} />
          <text x="106" y="274" textAnchor="middle" fontSize="13" fill={C.accent}>OBB → tetrahedra</text>
          <text x="106" y="302" textAnchor="middle" fontSize="12" fill={C.secondary}>CPU coverage</text>
        </g>
        <Arrow x1={204} x2={224} y1={210} y2={210} color={C.accent} />
        <g ref={sliceRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="82" width="164" height="258" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="318" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · slice</text>
          <line x1="266" x2="370" y1="180" y2="180" stroke={C.warning} strokeWidth="4" />
          <path d="M 284 180 L 318 142 L 354 180 L 326 218 Z" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <text x="318" y="274" textAnchor="middle" fontSize="13" fill={C.warning}>z-plane sweep</text>
          <text x="318" y="302" textAnchor="middle" fontSize="12" fill={C.secondary}>cross-section polygon</text>
        </g>
        <Arrow x1={416} x2={436} y1={210} y2={210} color={C.warning} />
        <g ref={fragmentRef} style={{ opacity: 0.3 }}>
          <rect x="448" y="82" width="164" height="258" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="530" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · fragment</text>
          <circle cx="530" cy="178" r="30" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="3" />
          <text x="530" y="184" textAnchor="middle" fontSize="14" fill={C.success}>d(p)</text>
          <text x="530" y="274" textAnchor="middle" fontSize="13" fill={C.success}>closest feature</text>
          <text x="530" y="302" textAnchor="middle" fontSize="12" fill={C.secondary}>pseudonormal sign</text>
        </g>
        <Arrow x1={628} x2={648} y1={210} y2={210} color={C.success} />
        <g ref={resolveRef} style={{ opacity: 0.3 }}>
          <rect x="660" y="82" width="76" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="698" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <circle cx="698" cy="180" r="22" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="3" />
          <text x="698" y="186" textAnchor="middle" fontSize="12" fill={C.success}>min</text>
          <text x="698" y="274" textAnchor="middle" fontSize="12" fill={C.accent}>depth</text>
          <text x="698" y="302" textAnchor="middle" fontSize="11" fill={C.secondary}>readback</text>
        </g>
        <rect x="24" y="376" width="712" height="36" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="399" textAnchor="middle" fontSize="13" fill={C.secondary}>
          shell creation is separate for modularity; the scan pass is simple because every volume is a tetrahedron
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察 T4 方法如何把三角形的窄带覆盖变成可查询的 SDF 网格。" />
    </Figure>
  );
}

type MeshQuality = "clean" | "irregular" | "folded";
type Resolution = "128" | "256" | "512";
type Band = "20" | "40" | "60";
type QueryMode = "collision" | "ray";
type ExecutionMode = "gpu" | "cpu";

const DEFAULTS = {
  band: "40" as Band,
  execution: "gpu" as ExecutionMode,
  mesh: "irregular" as MeshQuality,
  query: "collision" as QueryMode,
  resolution: "256" as Resolution,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch34SdfLab() {
  const [mesh, setMesh] = useState<MeshQuality>(DEFAULTS.mesh);
  const [resolution, setResolution] = useState<Resolution>(DEFAULTS.resolution);
  const [band, setBand] = useState<Band>(DEFAULTS.band);
  const [query, setQuery] = useState<QueryMode>(DEFAULTS.query);
  const [execution, setExecution] = useState<ExecutionMode>(DEFAULTS.execution);

  const result = useMemo(() => {
    const gridSide = Number(resolution);
    const voxels = gridSide ** 3;
    const triangles = mesh === "clean" ? 1800 : mesh === "irregular" ? 4200 : 3600;
    const tetrahedra = triangles * 5;
    const bandFactor = Number(band) / 40;
    const coveredVoxels = Math.round(voxels * 0.018 * bandFactor * (mesh === "folded" ? 1.18 : 1));
    const slices = gridSide;
    const baseTime = (tetrahedra * bandFactor * (gridSide / 256)) / (execution === "gpu" ? 1850 : 320);
    const scanMs = Math.max(4, Math.round(baseTime * (mesh === "folded" ? 1.12 : 1)));
    const queryRate = Math.max(1200, Math.round((execution === "gpu" ? 86000 : 19000) / (gridSide / 128) / (query === "ray" ? 1.28 : 1)));
    const signStatus = mesh === "folded" ? "folds need a second pass" : "pseudonormal sign path";
    const errorBudget = gridSide === 512 ? "fine voxel" : gridSide === 256 ? "balanced" : "coarse voxel";
    return { coveredVoxels, errorBudget, queryRate, scanMs, signStatus, slices, tetrahedra, voxels };
  }, [band, execution, mesh, query, resolution]);

  const reset = () => {
    setMesh(DEFAULTS.mesh);
    setResolution(DEFAULTS.resolution);
    setBand(DEFAULTS.band);
    setQuery(DEFAULTS.query);
    setExecution(DEFAULTS.execution);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 34</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">T4 Signed Distance Field Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 mesh 拓扑、网格分辨率、窄带宽度、执行模式和查询目标，观察覆盖量、z-slice 数与距离场构建代价。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 398" role="img" aria-label={`SDF 实验：${resolution}³ 网格，${band} voxel 窄带，${mesh} mesh，${execution}，${query} 查询`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>mesh → tetra shell → z-slice → SDF voxel</text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <path d="M 84 222 L 124 118 L 184 204 L 244 132 L 286 222 Z" fill={C.accent} fillOpacity="0.16" stroke={C.accent} strokeWidth="3" />
              <text x="184" y="252" textAnchor="middle" fontSize="12" fill={C.accent}>surface mesh</text>
              <Arrow x1={306} x2={342} y1={170} y2={170} color={C.warning} />
              <path d="M 366 218 L 410 110 L 476 218 Z M 366 218 L 440 158 L 476 218 M 410 110 L 440 158 L 366 218" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="420" y="252" textAnchor="middle" fontSize="12" fill={C.warning}>{result.tetrahedra.toLocaleString("en-US")} tetrahedra</text>
              <Arrow x1={500} x2={536} y1={170} y2={170} color={C.success} />
              <Grid x={558} y={104} width={108} height={124} />
              <circle cx="612" cy="164" r="7" fill={C.success} />
              <text x="612" y="252" textAnchor="middle" fontSize="12" fill={C.success}>d(p) → query</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>{formatNumber(result.coveredVoxels)} covered voxels · {formatNumber(result.slices)} z-slices · {result.scanMs} ms model</text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={mesh === "folded" ? C.danger : C.success}>{result.signStatus} · {result.errorBudget} · {execution === "gpu" ? "depth-min GPU path" : "CPU reference path"}</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="tetrahedra" tone={C.warning} value={formatNumber(result.tetrahedra)} />
            <Metric label="covered voxels" tone={C.accent} value={formatNumber(result.coveredVoxels)} />
            <Metric label="z-slices" tone={C.success} value={formatNumber(result.slices)} />
            <Metric label="queries / second" tone={C.success} value={formatNumber(result.queryRate)} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch34-mesh">mesh topology<select id="ch34-mesh" value={mesh} onChange={(event) => setMesh(event.target.value as MeshQuality)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="clean">clean manifold</option><option value="irregular">irregular / holes</option><option value="folded">folded overlap</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch34-resolution">grid resolution<select id="ch34-resolution" value={resolution} onChange={(event) => setResolution(event.target.value as Resolution)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="128">128³ · coarse</option><option value="256">256³ · balanced</option><option value="512">512³ · fine</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch34-band">narrow-band width<select id="ch34-band" value={band} onChange={(event) => setBand(event.target.value as Band)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="20">20 voxels</option><option value="40">40 voxels</option><option value="60">60 voxels</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch34-query">query target<select id="ch34-query" value={query} onChange={(event) => setQuery(event.target.value as QueryMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="collision">collision detection</option><option value="ray">ray / path planning</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch34-execution">execution mode<select id="ch34-execution" value={execution} onChange={(event) => setExecution(event.target.value as ExecutionMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="gpu">GPU depth-min path</option><option value="cpu">CPU reference</option></select></label>
        </div>
      </div>
    </div>
  );
}
