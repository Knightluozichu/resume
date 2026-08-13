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

function WaveArc({
  cx,
  cy,
  color,
  radius,
}: {
  cx: number;
  cy: number;
  color: string;
  radius: number;
}) {
  return (
    <path
      d={`M ${cx - radius} ${cy} Q ${cx} ${cy - radius * 0.72} ${cx + radius} ${cy}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="6 5"
      opacity="0.85"
    />
  );
}

function GridTile({
  color = C.accent,
  columns = 8,
  highlight = -1,
  rows = 5,
  x,
  y,
}: {
  color?: string;
  columns?: number;
  highlight?: number;
  rows?: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const active = index === highlight;
        return (
          <rect
            key={`grid-${x}-${y}-${index}`}
            x={x + column * 18}
            y={y + row * 18}
            width="14"
            height="14"
            rx="3"
            fill={active ? C.warning : color}
            fillOpacity={active ? 0.9 : 0.22}
            stroke={active ? C.warning : color}
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

export function GpuGems3Ch38SeismicSurveyDiagram() {
  return (
    <Figure>
      <Frame height={450} label="海上地震勘探示意图：船上的气枪发出波，海底与地下各层反射波由拖曳电缆上的水听器记录">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          a survey turns reflections into a volume of evidence
        </text>
        <rect x="28" y="82" width="704" height="112" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
        <path d="M 58 144 C 150 122 230 122 320 144 C 420 166 542 164 698 140" fill="none" stroke={C.accent} strokeWidth="4" />
        <path d="M 70 158 C 168 142 238 142 330 158 C 428 176 560 178 690 156" fill="none" stroke={C.border} strokeWidth="2" />
        <rect x="190" y="104" width="178" height="28" rx="9" fill={C.accent} fillOpacity="0.16" stroke={C.accent} strokeWidth="2" />
        <text x="279" y="123" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.accent}>survey vessel + air gun</text>
        <path d="M 210 133 L 230 172 L 250 133" fill="none" stroke={C.warning} strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <circle key={`hydrophone-${index}`} cx={396 + index * 38} cy={146 + (index % 2) * 8} r="6" fill={C.success} />
        ))}
        <text x="548" y="112" textAnchor="middle" fontSize="13" fill={C.success}>hydrophone cable</text>
        <WaveArc cx={230} cy={184} color={C.warning} radius={46} />
        <WaveArc cx={230} cy={184} color={C.warning} radius={84} />
        <WaveArc cx={230} cy={184} color={C.warning} radius={124} />
        <g transform="translate(28 224)">
          <rect width="704" height="144" rx="14" fill={C.surface} stroke={C.border} />
          <path d="M 0 46 C 90 22 190 68 282 42 S 476 18 704 56" fill="none" stroke={C.accent} strokeWidth="3" />
          <path d="M 0 92 C 88 68 172 116 280 88 S 486 62 704 104" fill="none" stroke={C.warning} strokeWidth="3" />
          <path d="M 0 128 C 92 108 192 148 294 122 S 510 106 704 138" fill="none" stroke={C.success} strokeWidth="3" />
          <text x="18" y="34" fontSize="13" fill={C.secondary}>water</text>
          <text x="18" y="78" fontSize="13" fill={C.accent}>layer 1</text>
          <text x="18" y="118" fontSize="13" fill={C.warning}>layer 2</text>
          <text x="590" y="128" fontSize="13" fill={C.success}>reflectivity</text>
          <Arrow x1={350} x2={420} y1={74} y2={74} color={C.secondary} dashed />
          <text x="380" y="62" textAnchor="middle" fontSize="12" fill={C.secondary}>reflected signal</text>
        </g>
        <rect x="28" y="392" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>billions of short vectors become a 3D volume only after positioning and signal processing</text>
      </Frame>
    </Figure>
  );
}

const MIGRATION_STEPS: readonly TeachingStep[] = [
  { label: "survey", caption: "从 shot 和 hydrophone 记录中整理带位置的地震向量" },
  { label: "frequency", caption: "沿时间轴做 FFT，把每个 shot 变成频率平面" },
  { label: "depth", caption: "用 SRMIP 在深度方向迭代传播 upgoing 和 downgoing wave" },
  { label: "volume", caption: "把不同频率、深度与位置的贡献累积成可解释的地下体" },
];

const MIGRATION_LABELS: Readonly<Record<string, string>> = {
  depth: "用 SRMIP 在深度方向迭代传播 upgoing 和 downgoing wave",
  frequency: "沿时间轴做 FFT，把每个 shot 变成频率平面",
  survey: "从 shot 和 hydrophone 记录中整理带位置的地震向量",
  volume: "把不同频率、深度与位置的贡献累积成可解释的地下体",
};

export function GpuGems3Ch38MigrationPipelineDiagram() {
  const surveyRef = useRef<SVGGElement>(null);
  const frequencyRef = useRef<SVGGElement>(null);
  const depthRef = useRef<SVGGElement>(null);
  const volumeRef = useRef<SVGGElement>(null);
  const refs = [surveyRef, frequencyRef, depthRef, volumeRef];
  const timeline = useTeachingTimeline({
    steps: MIGRATION_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(MIGRATION_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={466} label="地震成像流水线动画：survey 数据经过 FFT 频率平面、深度方向的 SRMIP 传播和累积，形成地下体">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          from a shot record to an interpretable subsurface volume
        </text>
        <g ref={surveyRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="84" width="164" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · survey</text>
          <WaveArc cx={106} cy={178} color={C.accent} radius={40} />
          <WaveArc cx={106} cy={178} color={C.accent} radius={72} />
          <circle cx="106" cy="178" r="8" fill={C.warning} />
          <text x="106" y="246" textAnchor="middle" fontSize="13" fill={C.secondary}>shot vectors</text>
          <text x="106" y="276" textAnchor="middle" fontSize="12" fill={C.secondary}>position + time</text>
          <text x="106" y="310" textAnchor="middle" fontSize="12" fill={C.accent}>raw evidence</text>
        </g>
        <Arrow x1={204} x2={222} y1={214} y2={214} color={C.accent} />
        <g ref={frequencyRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="84" width="164" height="258" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="318" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · frequency</text>
          <GridTile x={268} y={150} columns={6} rows={5} color={C.warning} highlight={14} />
          <text x="318" y="274" textAnchor="middle" fontSize="13" fill={C.warning}>FFT → planes</text>
          <text x="318" y="304" textAnchor="middle" fontSize="12" fill={C.secondary}>one plane / frequency</text>
        </g>
        <Arrow x1={416} x2={434} y1={214} y2={214} color={C.warning} />
        <g ref={depthRef} style={{ opacity: 0.3 }}>
          <rect x="448" y="84" width="164" height="258" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="530" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · depth</text>
          <GridTile x={484} y={148} columns={5} rows={5} color={C.success} highlight={18} />
          <Arrow x1={530} x2={530} y1={252} y2={292} color={C.success} />
          <text x="530" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>propagate z → z + dz</text>
        </g>
        <Arrow x1={628} x2={646} y1={214} y2={214} color={C.success} />
        <g ref={volumeRef} style={{ opacity: 0.3 }}>
          <rect x="660" y="84" width="76" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="698" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <text x="698" y="170" textAnchor="middle" fontSize="13" fill={C.accent}>volume</text>
          <GridTile x={673} y={204} columns={3} rows={3} color={C.accent} highlight={5} />
          <text x="698" y="312" textAnchor="middle" fontSize="11" fill={C.secondary}>attributes</text>
        </g>
        <rect x="24" y="380" width="712" height="30" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="400" textAnchor="middle" fontSize="13" fill={C.secondary}>the GPU accelerates local grid work while the CPU keeps the outer iterative loop in control</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={MIGRATION_LABELS} caption="逐步观察数据怎样从 shot record 变成频率平面、深度传播与地下体。" />
    </Figure>
  );
}

export function GpuGems3Ch38TileMappingDiagram() {
  return (
    <Figure>
      <Frame height={452} label="CUDA tile 映射：线程块先以 48×8 的形状协同加载带边界支持区的 48×32 tile，再重映射线程计算 40×24 的有效输出">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          load the tile one way, process the tile another way
        </text>
        <g transform="translate(28 84)">
          <rect width="220" height="276" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="110" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>load phase</text>
          <rect x="48" y="62" width="124" height="174" rx="8" fill={C.accent} fillOpacity="0.08" stroke={C.accent} strokeWidth="2" />
          <rect x="64" y="78" width="92" height="142" rx="5" fill={C.accent} fillOpacity="0.22" />
          <GridTile x={69} y={84} columns={5} rows={7} color={C.accent} highlight={13} />
          <text x="110" y="252" textAnchor="middle" fontSize="13" fill={C.accent}>48 × 32 tile + halo</text>
          <text x="110" y="274" textAnchor="middle" fontSize="12" fill={C.secondary}>coalesced global reads</text>
        </g>
        <Arrow x1={270} x2={302} y1={222} y2={222} color={C.warning} />
        <g transform="translate(320 84)">
          <rect width="190" height="276" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="95" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>shared memory</text>
          <rect x="35" y="64" width="120" height="120" rx="9" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          {Array.from({ length: 6 }, (_, index) => (
            <line key={`sync-line-${index}`} x1="44" x2="146" y1={78 + index * 18} y2={78 + index * 18} stroke={C.warning} strokeOpacity="0.6" />
          ))}
          <text x="95" y="224" textAnchor="middle" fontSize="13" fill={C.warning}>synchronize once</text>
          <text x="95" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>reuse neighbors locally</text>
          <text x="95" y="274" textAnchor="middle" fontSize="12" fill={C.secondary}>avoid repeated DRAM reads</text>
        </g>
        <Arrow x1={538} x2={570} y1={222} y2={222} color={C.success} />
        <g transform="translate(588 84)">
          <rect width="144" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="72" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>process</text>
          <GridTile x={34} y={68} columns={4} rows={4} color={C.success} highlight={6} />
          <text x="72" y="196" textAnchor="middle" fontSize="13" fill={C.success}>40 × 24 output</text>
          <text x="72" y="224" textAnchor="middle" fontSize="12" fill={C.secondary}>cross filter radius 4</text>
          <text x="72" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>30 ops / byte</text>
        </g>
        <rect x="28" y="388" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="408" textAnchor="middle" fontSize="13" fill={C.secondary}>a useful tile is a resource compromise: enough reuse, enough threads, and enough room for another block</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch38TransferResidencyDiagram() {
  return (
    <Figure>
      <Frame height={440} label="GPU 常驻数据流：CPU 只发送 frequency plane，GPU 在显存中完成深度传播、插值和累积，最后回读约 1.3 GB 结果">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          move the work to the data, not the data to every kernel
        </text>
        <g transform="translate(28 86)">
          <rect width="162" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="81" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>CPU host</text>
          <rect x="36" y="76" width="90" height="32" rx="8" fill={C.accent} fillOpacity="0.16" stroke={C.accent} strokeWidth="2" />
          <text x="81" y="97" textAnchor="middle" fontSize="13" fill={C.accent}>control loop</text>
          <rect x="36" y="138" width="90" height="32" rx="8" fill={C.surface} stroke={C.border} />
          <text x="81" y="159" textAnchor="middle" fontSize="13" fill={C.secondary}>next plane</text>
          <text x="81" y="214" textAnchor="middle" fontSize="12" fill={C.secondary}>iterate z and frequency</text>
        </g>
        <g transform="translate(244 86)">
          <rect width="152" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="76" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>PCIe</text>
          <Arrow x1={76} x2={76} y1={76} y2={126} color={C.warning} />
          <text x="76" y="160" textAnchor="middle" fontSize="13" fill={C.warning}>plane in</text>
          <Arrow x1={76} x2={76} y1={182} y2={232} color={C.warning} dashed />
          <text x="76" y="68" textAnchor="middle" fontSize="12" fill={C.secondary}>one input at a time</text>
        </g>
        <g transform="translate(450 86)">
          <rect width="282" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="141" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>GPU memory resident</text>
          <rect x="30" y="72" width="92" height="42" rx="8" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
          <text x="76" y="98" textAnchor="middle" fontSize="13" fill={C.success}>uwave</text>
          <rect x="142" y="72" width="92" height="42" rx="8" fill={C.success} fillOpacity="0.16" stroke={C.success} strokeWidth="2" />
          <text x="188" y="98" textAnchor="middle" fontSize="13" fill={C.success}>dwave</text>
          <Arrow x1={76} x2={76} y1={130} y2={174} color={C.success} />
          <Arrow x1={188} x2={188} y1={130} y2={174} color={C.success} />
          <text x="141" y="198" textAnchor="middle" fontSize="13" fill={C.secondary}>convolve · interpolate · sum</text>
          <text x="141" y="226" textAnchor="middle" fontSize="12" fill={C.success}>return result once</text>
        </g>
        <rect x="28" y="372" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="392" textAnchor="middle" fontSize="13" fill={C.secondary}>a few transfers can scale better than copying every intermediate depth result through PCIe</text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch38KernelTradeoffDiagram() {
  return (
    <Figure>
      <Frame height={446} label="CUDA kernel 资源取舍：寄存器压力、共享内存 tile、线程块大小和内存延迟隐藏共同决定有效吞吐">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          throughput is a budget, not a single knob
        </text>
        <g transform="translate(28 84)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>tile reuse</text>
          <rect x="34" y="72" width="146" height="22" rx="7" fill={C.accent} fillOpacity="0.16" />
          <rect x="34" y="72" width="112" height="22" rx="7" fill={C.accent} />
          <text x="107" y="88" textAnchor="middle" fontSize="12" fill={C.text}>shared memory</text>
          <text x="107" y="144" textAnchor="middle" fontSize="13" fill={C.accent}>neighbor reuse</text>
          <text x="107" y="176" textAnchor="middle" fontSize="13" fill={C.secondary}>boundary support</text>
          <text x="107" y="214" textAnchor="middle" fontSize="12" fill={C.secondary}>larger tile → less room</text>
          <text x="107" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>for another block</text>
        </g>
        <g transform="translate(272 84)">
          <rect width="214" height="274" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>thread shape</text>
          <circle cx="72" cy="94" r="17" fill={C.warning} fillOpacity="0.18" stroke={C.warning} strokeWidth="2" />
          <circle cx="107" cy="94" r="17" fill={C.warning} fillOpacity="0.18" stroke={C.warning} strokeWidth="2" />
          <circle cx="142" cy="94" r="17" fill={C.warning} fillOpacity="0.18" stroke={C.warning} strokeWidth="2" />
          <text x="107" y="148" textAnchor="middle" fontSize="13" fill={C.warning}>load: coalesced</text>
          <text x="107" y="180" textAnchor="middle" fontSize="13" fill={C.secondary}>process: reuse</text>
          <text x="107" y="218" textAnchor="middle" fontSize="12" fill={C.secondary}>384 threads in 48 × 8</text>
          <text x="107" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>hide memory latency</text>
        </g>
        <g transform="translate(516 84)">
          <rect width="216" height="274" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="108" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>register pressure</text>
          <rect x="36" y="72" width="144" height="22" rx="7" fill={C.success} fillOpacity="0.16" />
          <rect x="36" y="72" width="92" height="22" rx="7" fill={C.success} />
          <text x="108" y="88" textAnchor="middle" fontSize="12" fill={C.text}>32 registers / thread</text>
          <text x="108" y="144" textAnchor="middle" fontSize="13" fill={C.success}>split complex kernel</text>
          <text x="108" y="176" textAnchor="middle" fontSize="13" fill={C.secondary}>or reduce block size</text>
          <text x="108" y="218" textAnchor="middle" fontSize="12" fill={C.secondary}>avoid spilling state</text>
          <text x="108" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>keep useful occupancy</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>the best configuration balances bytes loaded, operations performed, and active blocks</text>
      </Frame>
    </Figure>
  );
}

const DATAFLOW_STEPS: readonly TeachingStep[] = [
  { label: "position", caption: "CPU 处理测量位置、潮汐和船位，把向量放入统一坐标" },
  { label: "filter", caption: "GPU 用 tile、shared memory 和小卷积算子处理局部网格" },
  { label: "propagate", caption: "GPU 反复推进深度，CPU 只控制外层迭代和下一个 plane" },
  { label: "interpret", caption: "回读结果并提取速度、密度、阻抗或各向异性等属性" },
];

const DATAFLOW_LABELS: Readonly<Record<string, string>> = {
  filter: "GPU 用 tile、shared memory 和小卷积算子处理局部网格",
  interpret: "回读结果并提取速度、密度、阻抗或各向异性等属性",
  position: "CPU 处理测量位置、潮汐和船位，把向量放入统一坐标",
  propagate: "GPU 反复推进深度，CPU 只控制外层迭代和下一个 plane",
};

export function GpuGems3Ch38PipelineDiagram() {
  const positionRef = useRef<SVGGElement>(null);
  const filterRef = useRef<SVGGElement>(null);
  const propagateRef = useRef<SVGGElement>(null);
  const interpretRef = useRef<SVGGElement>(null);
  const refs = [positionRef, filterRef, propagateRef, interpretRef];
  const timeline = useTeachingTimeline({
    steps: DATAFLOW_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(DATAFLOW_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={454} label="工业地震处理管线动画：位置校正、GPU 局部滤波、深度传播和结果解释组成 CPU 控制 GPU 计算的闭环">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one industrial loop, four different kinds of work
        </text>
        <g ref={positionRef} style={{ opacity: 0.3 }}>
          <rect x="28" y="86" width="156" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>position</text>
          <circle cx="80" cy="176" r="12" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="2" />
          <circle cx="126" cy="206" r="12" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="2" />
          <line x1="80" x2="126" y1="176" y2="206" stroke={C.accent} strokeWidth="2" />
          <text x="106" y="260" textAnchor="middle" fontSize="13" fill={C.secondary}>coordinates</text>
          <text x="106" y="290" textAnchor="middle" fontSize="12" fill={C.accent}>CPU control</text>
        </g>
        <Arrow x1={202} x2={222} y1={212} y2={212} color={C.accent} />
        <g ref={filterRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="86" width="156" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="314" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>filter</text>
          <GridTile x={267} y={154} columns={5} rows={5} color={C.warning} highlight={12} />
          <text x="314" y="274" textAnchor="middle" fontSize="13" fill={C.warning}>tile + halo</text>
          <text x="314" y="304" textAnchor="middle" fontSize="12" fill={C.secondary}>GPU local work</text>
        </g>
        <Arrow x1={410} x2={430} y1={212} y2={212} color={C.warning} />
        <g ref={propagateRef} style={{ opacity: 0.3 }}>
          <rect x="444" y="86" width="156" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="522" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>propagate</text>
          <Arrow x1={522} x2={522} y1={154} y2={220} color={C.success} />
          <Arrow x1={522} x2={522} y1={232} y2={298} color={C.success} />
          <text x="522" y="326" textAnchor="middle" fontSize="12" fill={C.secondary}>z → z + dz</text>
        </g>
        <Arrow x1={618} x2={638} y1={212} y2={212} color={C.success} />
        <g ref={interpretRef} style={{ opacity: 0.3 }}>
          <rect x="652" y="86" width="84" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="694" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>interpret</text>
          <text x="694" y="180" textAnchor="middle" fontSize="12" fill={C.accent}>velocity</text>
          <text x="694" y="208" textAnchor="middle" fontSize="12" fill={C.accent}>density</text>
          <text x="694" y="236" textAnchor="middle" fontSize="12" fill={C.accent}>impedance</text>
          <Arrow x1={694} x2={694} y1={264} y2={304} color={C.accent} />
        </g>
        <rect x="28" y="378" width="708" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>repeat with a refined velocity field until the image becomes useful to an interpreter</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={DATAFLOW_LABELS} caption="逐步观察工业应用如何把 CPU 控制、GPU 局部算子和最终解释串成迭代闭环。" />
    </Figure>
  );
}

type DataPath = "resident" | "streaming";
type KernelFocus = "convolution" | "interpolate";
type ReadPath = "texture" | "global";
type TileSize = "32x16" | "48x32" | "64x32";
type BoundaryMode = "halo" | "missing";

const DEFAULTS = {
  boundary: "halo" as BoundaryMode,
  dataPath: "resident" as DataPath,
  kernel: "convolution" as KernelFocus,
  readPath: "texture" as ReadPath,
  tile: "48x32" as TileSize,
};

const TILE_SPECS: Readonly<Record<TileSize, { output: string; shared: number; threads: number }>> = {
  "32x16": { output: "24 × 8", shared: 6.5, threads: 256 },
  "48x32": { output: "40 × 24", shared: 12, threads: 384 },
  "64x32": { output: "56 × 24", shared: 15.8, threads: 512 },
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch38SeismicLab() {
  const [boundary, setBoundary] = useState<BoundaryMode>(DEFAULTS.boundary);
  const [dataPath, setDataPath] = useState<DataPath>(DEFAULTS.dataPath);
  const [kernel, setKernel] = useState<KernelFocus>(DEFAULTS.kernel);
  const [readPath, setReadPath] = useState<ReadPath>(DEFAULTS.readPath);
  const [tile, setTile] = useState<TileSize>(DEFAULTS.tile);

  const result = useMemo(() => {
    const spec = TILE_SPECS[tile];
    const tileFactor = tile === "48x32" ? 1.08 : tile === "32x16" ? 0.94 : 0.91;
    const kernelFactor = kernel === "convolution" ? 1 : 0.82;
    const memoryFactor = dataPath === "resident" ? 1 : 0.62;
    const readFactor = readPath === "texture" ? 1.08 : 0.88;
    const boundaryFactor = boundary === "halo" ? 1 : 0.78;
    const speedup = 8.1 * tileFactor * kernelFactor * memoryFactor * readFactor * boundaryFactor;
    const transferGb = dataPath === "resident" ? 1.3 : 5.6;
    const operationsPerByte = kernel === "convolution" ? 30 : 18;
    const warning = boundary === "missing"
      ? "halo omitted: edge artifacts can leak into the image"
      : dataPath === "streaming"
        ? "PCIe traffic is now in the critical path"
        : spec.shared > 15
          ? "tile pressure: little shared memory remains for another block"
          : "resident dataflow: CPU controls, GPU computes";
    const status = boundary === "missing" ? "incorrect boundary" : dataPath === "resident" ? "balanced path" : "transfer heavy";
    return { operationsPerByte, speedup, spec, status, transferGb, warning };
  }, [boundary, dataPath, kernel, readPath, tile]);

  const reset = () => {
    setBoundary(DEFAULTS.boundary);
    setDataPath(DEFAULTS.dataPath);
    setKernel(DEFAULTS.kernel);
    setReadPath(DEFAULTS.readPath);
    setTile(DEFAULTS.tile);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 38</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">CUDA Seismic Migration Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 tile、数据驻留策略、读取路径、kernel 类型和边界支持区，观察历史加速模型、PCIe 流量与 shared-memory 预算的变化。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 416" role="img" aria-label={`地震成像实验：${tile} tile，${dataPath} data path，${readPath} read path，${kernel} kernel，${boundary} boundary`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>plane → tile → depth → volume</text>
              <rect x="34" y="56" width="662" height="256" rx="12" fill={C.surface} stroke={C.border} />
              <GridTile x={66} y={112} columns={5} rows={5} color={C.accent} highlight={12} />
              <Arrow x1={188} x2={226} y1={156} y2={156} color={C.accent} />
              <rect x="244" y="98" width="136" height="82" rx="11" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="312" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>{tile} tile</text>
              <text x="312" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(result.spec.threads)} threads</text>
              <Arrow x1={398} x2={438} y1={156} y2={156} color={C.warning} />
              <rect x="456" y="98" width="112" height="82" rx="11" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="512" y="126" textAnchor="middle" fontSize="13" fill={C.success}>depth loop</text>
              <text x="512" y="152" textAnchor="middle" fontSize="12" fill={C.secondary}>{result.spec.output} output</text>
              <Arrow x1={586} x2={626} y1={156} y2={156} color={C.success} />
              <GridTile x={642} y={120} columns={2} rows={3} color={C.success} highlight={3} />
              <text x="365" y="232" textAnchor="middle" fontSize="13" fill={boundary === "missing" ? C.danger : C.secondary}>{result.warning}</text>
              <text x="365" y="260" textAnchor="middle" fontSize="13" fill={C.warning}>shared memory {result.spec.shared.toFixed(1)} KB · {readPath} read</text>
              <text x="365" y="288" textAnchor="middle" fontSize="13" fill={C.success}>historical CPU reference speedup ≈ {result.speedup.toFixed(1)}× · {result.operationsPerByte} ops / byte</text>
              <text x="365" y="344" textAnchor="middle" fontSize="13" fill={C.secondary}>transfer estimate {result.transferGb.toFixed(1)} GB · {result.status}</text>
              <text x="365" y="372" textAnchor="middle" fontSize="13" fill={C.accent}>educational model, not a modern GPU benchmark</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="historical speedup model" tone={C.accent} value={`${result.speedup.toFixed(1)}×`} />
            <Metric label="shared-memory tile" tone={C.warning} value={`${result.spec.shared.toFixed(1)} KB`} />
            <Metric label="threads in block" tone={C.success} value={formatNumber(result.spec.threads)} />
            <Metric label="host-device transfer" tone={boundary === "missing" ? C.danger : C.secondary} value={`${result.transferGb.toFixed(1)} GB`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch38-tile">tile size<select id="ch38-tile" value={tile} onChange={(event) => setTile(event.target.value as TileSize)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="32x16">32 × 16</option><option value="48x32">48 × 32</option><option value="64x32">64 × 32</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch38-data-path">data path<select id="ch38-data-path" value={dataPath} onChange={(event) => setDataPath(event.target.value as DataPath)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="resident">GPU-resident</option><option value="streaming">stream every stage</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch38-read-path">read path<select id="ch38-read-path" value={readPath} onChange={(event) => setReadPath(event.target.value as ReadPath)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="texture">texture cache + boundary</option><option value="global">plain global memory</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch38-kernel">kernel focus<select id="ch38-kernel" value={kernel} onChange={(event) => setKernel(event.target.value as KernelFocus)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="convolution">wave convolution</option><option value="interpolate">wave interpolation</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch38-boundary">boundary mode<select id="ch38-boundary" value={boundary} onChange={(event) => setBoundary(event.target.value as BoundaryMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="halo">load support halo</option><option value="missing">omit support halo</option></select></label>
        </div>
      </div>
    </div>
  );
}
