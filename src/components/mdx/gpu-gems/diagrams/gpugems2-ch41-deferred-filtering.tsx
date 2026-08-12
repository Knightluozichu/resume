"use client";

import { useMemo, useRef, useState, type ReactNode, type Ref } from "react";

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

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 760 440"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height="440" rx="16" fill={C.bg} />
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
  const size = 8;
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
        strokeWidth="3"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Box({
  accent = C.accent,
  detail,
  label,
  x,
  y,
  width = 150,
}: {
  accent?: string;
  detail: string;
  label: string;
  x: number;
  y: number;
  width?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="92"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 36}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + width / 2}
        y={y + 64}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
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

export function GpuGems2Ch41StorageLayoutDiagram() {
  const tiles = Array.from({ length: 12 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="困难数据格式的存储布局：三维数据被压成带 key 的二维 tile，key 指向 codebook；渲染采样需要先解码再重建">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          计算友好的布局，不一定是采样友好的布局
        </text>
        <rect
          x="48"
          y="98"
          width="238"
          height="210"
          rx="14"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
        />
        <text
          x="167"
          y="130"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          flat 3D texture
        </text>
        {tiles.map((tile) => (
          <rect
            key={tile}
            x={74 + (tile % 4) * 46}
            y={154 + Math.floor(tile / 4) * 40}
            width="34"
            height="28"
            rx="5"
            fill={tile % 3 === 0 ? C.accent : C.warning}
            fillOpacity={tile % 3 === 0 ? 0.7 : 0.28}
            stroke={C.border}
          />
        ))}
        <text
          x="167"
          y="290"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          packed slices / sparse tiles
        </text>
        <Arrow x1={286} y1={204} x2={356} y2={204} color={C.accent} />
        <rect
          x="356"
          y="98"
          width="146"
          height="210"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="429"
          y="130"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          key texture
        </text>
        <text
          x="429"
          y="166"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          key = 7
        </text>
        <path
          d="M390 204 H468"
          stroke={C.warning}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          x="429"
          y="252"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          lookup codebook
        </text>
        <Arrow x1={502} y1={204} x2={564} y2={204} color={C.success} />
        <rect
          x="564"
          y="98"
          width="148"
          height="210"
          rx="14"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
        />
        <text
          x="638"
          y="130"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          codebook
        </text>
        <rect
          x="592"
          y="158"
          width="92"
          height="32"
          rx="6"
          fill={C.success}
          fillOpacity="0.32"
        />
        <rect
          x="592"
          y="202"
          width="92"
          height="32"
          rx="6"
          fill={C.success}
          fillOpacity="0.52"
        />
        <rect
          x="592"
          y="246"
          width="92"
          height="32"
          rx="6"
          fill={C.success}
          fillOpacity="0.7"
        />
        <text
          x="638"
          y="330"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          reconstruct sample
        </text>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          硬件的线性过滤器看不懂这条间接地址链
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch41DeferredPassDiagram() {
  return (
    <Figure>
      <Frame label="deferred filtering 两遍算法：第一遍在原生分辨率重建局部数据，第二遍读取相邻重建 slice 并使用硬件过滤完成高质量渲染">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先重建一次，再让硬件反复过滤
        </text>
        <Box
          accent={C.warning}
          detail="key + codebook"
          label="Pass A"
          x={48}
          y={118}
          width={154}
        />
        <Box
          accent={C.accent}
          detail="native-resolution slice"
          label="重建 slice"
          x={246}
          y={118}
          width={154}
        />
        <Box
          accent={C.success}
          detail="slice i + slice i+1"
          label="Pass B"
          x={444}
          y={118}
          width={154}
        />
        <Box
          accent={C.accent}
          detail="hardware trilinear"
          label="输出图像"
          x={642}
          y={118}
          width={70}
        />
        <Arrow x1={202} y1={164} x2={246} y2={164} color={C.warning} />
        <Arrow x1={400} y1={164} x2={444} y2={164} color={C.accent} />
        <Arrow x1={598} y1={164} x2={642} y2={164} color={C.success} />
        <path
          d="M520 224 C520 286 128 286 128 224"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="324"
          y="270"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每个 texel 只付一次 reconstruction
        </text>
        <text
          x="380"
          y="340"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          代价从“每个 fragment 解码 8 次”移到“每个 texel 解码 1 次”
        </text>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          两张相邻 slice 足够支撑当前采样窗口，内存随切片增量推进
        </text>
      </Frame>
    </Figure>
  );
}

const DEFERRED_STEPS: TeachingStep[] = [
  { label: "decode", caption: "读取困难格式" },
  { label: "reconstruct", caption: "重建原生 slice" },
  { label: "lerp", caption: "相邻 slice 插值" },
  { label: "shade", caption: "过滤并着色" },
];

const DEFERRED_LABELS: Record<string, string> = Object.fromEntries(
  DEFERRED_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function DeferredStage({
  accent,
  detail,
  label,
  number,
  stageRef,
  x,
}: {
  accent: string;
  detail: string;
  label: string;
  number: string;
  stageRef: Ref<SVGGElement>;
  x: number;
}) {
  return (
    <g ref={stageRef}>
      <circle cx={x + 30} cy="158" r="21" fill={accent} />
      <text
        x={x + 30}
        y="164"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.bg}
      >
        {number}
      </text>
      <rect
        x={x + 58}
        y="114"
        width="112"
        height="88"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <text
        x={x + 114}
        y="150"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + 114}
        y="178"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGems2Ch41DeferredFilteringTimelineDiagram() {
  const decodeRef = useRef<SVGGElement>(null);
  const reconstructRef = useRef<SVGGElement>(null);
  const lerpRef = useRef<SVGGElement>(null);
  const shadeRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: DEFERRED_STEPS,
    build: (tl) => {
      tl.add(decodeRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("decode", 0);
      tl.add(
        reconstructRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T,
      );
      tl.label("reconstruct", T);
      tl.add(
        lerpRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("lerp", T * 2);
      tl.add(
        shadeRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("shade", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可播放的 deferred filtering 教学动画：读取 key 和 codebook，重建原生 slice，读取相邻 slice 做 axisLerp，最后使用硬件过滤并着色">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          deferred filtering 的四个关键时刻
        </text>
        <DeferredStage
          stageRef={decodeRef}
          number="1"
          label="decode"
          detail="key → codebook"
          accent={C.warning}
          x={42}
        />
        <DeferredStage
          stageRef={reconstructRef}
          number="2"
          label="reconstruct"
          detail="native slice"
          accent={C.accent}
          x={220}
        />
        <DeferredStage
          stageRef={lerpRef}
          number="3"
          label="LERP"
          detail="i / i + 1"
          accent={C.success}
          x={398}
        />
        <DeferredStage
          stageRef={shadeRef}
          number="4"
          label="shade"
          detail="filtered sample"
          accent={C.accent}
          x={576}
        />
        <Arrow x1={212} y1={158} x2={220} y2={158} color={C.border} />
        <Arrow x1={390} y1={158} x2={398} y2={158} color={C.border} />
        <Arrow x1={568} y1={158} x2={576} y2={158} color={C.border} />
        <path
          d="M638 224 C638 300 120 300 120 224"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="380"
          y="340"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          只让两个相邻 slice 驻留，sample window 随切片向前滑动
        </text>
        <text
          x="380"
          y="368"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          点击播放、暂停、单步或拖动进度，观察 reconstruction 与 filtering
          的边界
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={DEFERRED_LABELS}
        caption="第一遍负责理解困难格式，第二遍负责把过滤交给固定功能单元。"
      />
    </Figure>
  );
}

export function GpuGems2Ch41CostComparisonDiagram() {
  return (
    <Figure>
      <Frame label="单遍手写三线性过滤与 deferred filtering 的成本对比：单遍每个 fragment 重建 8 个 texel 并做 7 次 LERP，deferred 每个 sample 只需两次读取和一次 LERP">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把重复的重建从 fragment 热点拿走
        </text>
        <rect
          x="48"
          y="92"
          width="300"
          height="244"
          rx="14"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="198"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          单遍手写 filtering
        </text>
        <text x="198" y="164" textAnchor="middle" fontSize="13" fill={C.text}>
          8 个邻居 × 4 条重建指令
        </text>
        <text x="198" y="194" textAnchor="middle" fontSize="13" fill={C.text}>
          + 8 次读取 + 14 次 LERP/ADD
        </text>
        <text
          x="198"
          y="248"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={C.danger}
        >
          54
        </text>
        <text
          x="198"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          instructions / filtered read
        </text>
        <rect
          x="412"
          y="92"
          width="300"
          height="244"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="562"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          deferred filtering
        </text>
        <text x="562" y="164" textAnchor="middle" fontSize="13" fill={C.text}>
          每个 texel 只重建一次
        </text>
        <text x="562" y="194" textAnchor="middle" fontSize="13" fill={C.text}>
          两次读取 + 一次最终 LERP
        </text>
        <text
          x="562"
          y="248"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={C.success}
        >
          3
        </text>
        <text
          x="562"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          instructions / filtered read
        </text>
        <Arrow x1={348} y1={214} x2={412} y2={214} color={C.accent} />
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          额外的一遍 pass 换来更少的重复 texture reads 和算术
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch41AxisSlicingDiagram() {
  const slices = Array.from({ length: 5 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="axis-aligned slicing：沿最接近观察方向的体轴逐层绘制，当前只保留相邻的 data slice i 和 i+1，再在两层之间生成 sample slice">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          让切片方向与观察方向尽量对齐
        </text>
        <path
          d="M90 300 L232 236 L232 104 L90 168 Z"
          fill={C.surface}
          stroke={C.border}
        />
        {slices.map((slice) => (
          <g key={slice}>
            <path
              d={`M${90 + slice * 28} ${300 - slice * 13} L${232 + slice * 28} ${236 - slice * 13} L${232 + slice * 28} ${104 - slice * 13} L${90 + slice * 28} ${168 - slice * 13} Z`}
              fill={slice === 1 || slice === 2 ? C.accent : C.warning}
              fillOpacity={slice === 1 || slice === 2 ? 0.26 : 0.1}
              stroke={C.border}
            />
          </g>
        ))}
        <text
          x="174"
          y="342"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          volume slices
        </text>
        <Arrow x1={358} y1={206} x2={426} y2={206} color={C.accent} />
        <rect
          x="426"
          y="108"
          width="240"
          height="194"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="546"
          y="142"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          current window
        </text>
        <rect
          x="464"
          y="170"
          width="68"
          height="78"
          rx="8"
          fill={C.accent}
          fillOpacity="0.5"
          stroke={C.accent}
        />
        <rect
          x="548"
          y="170"
          width="68"
          height="78"
          rx="8"
          fill={C.success}
          fillOpacity="0.5"
          stroke={C.success}
        />
        <text
          x="498"
          y="212"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          i
        </text>
        <text
          x="582"
          y="212"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          i + 1
        </text>
        <text
          x="546"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          axisLerp 在两层之间取样
        </text>
        <text
          x="380"
          y="366"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          不画任意 slice plane，而是选择主要体轴并逐层推进
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch41MemoryWindowDiagram() {
  return (
    <Figure>
      <Frame label="增量内存窗口：重建 slice i 后再重建 i+1，当前窗口只需要两层；完成中间采样后丢弃旧层并继续向前">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          用两张 slice 推动整段体数据
        </text>
        <rect
          x="56"
          y="118"
          width="170"
          height="110"
          rx="14"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
        />
        <text
          x="141"
          y="158"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          slice i
        </text>
        <text
          x="141"
          y="188"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          reconstructed
        </text>
        <Arrow x1={226} y1={172} x2={292} y2={172} color={C.accent} />
        <rect
          x="292"
          y="118"
          width="170"
          height="110"
          rx="14"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
        />
        <text
          x="377"
          y="158"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          sample slices
        </text>
        <text
          x="377"
          y="188"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          final LERP + shade
        </text>
        <Arrow x1={462} y1={172} x2={528} y2={172} color={C.success} />
        <rect
          x="528"
          y="118"
          width="170"
          height="110"
          rx="14"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
        />
        <text
          x="613"
          y="158"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          slice i + 1
        </text>
        <text
          x="613"
          y="188"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          becomes next i
        </text>
        <path
          d="M613 238 C613 310 141 310 141 238"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          window = 2 slices，空间成本与体数据深度无关
        </text>
      </Frame>
    </Figure>
  );
}

type FilterMode = "deferred" | "single";

export function GpuGems2Ch41DeferredFilteringLab() {
  const [mode, setMode] = useState<FilterMode>("deferred");
  const [reconstructionCost, setReconstructionCost] = useState(4);
  const [samplesPerVoxel, setSamplesPerVoxel] = useState(2);
  const [sliceCount, setSliceCount] = useState(64);
  const [manualFilteringMistake, setManualFilteringMistake] = useState(false);

  const result = useMemo(() => {
    const singlePerSample = 8 * reconstructionCost + 8 + 14;
    const deferredPerSample = 2 + 1;
    const singleFrame = singlePerSample * samplesPerVoxel * sliceCount;
    const deferredFrame =
      reconstructionCost * sliceCount +
      deferredPerSample * samplesPerVoxel * sliceCount;
    const speedup = singleFrame / Math.max(1, deferredFrame);
    const memory = mode === "deferred" ? 2 : sliceCount;
    const note = manualFilteringMistake
      ? "错误模式：对困难格式直接打开线性过滤，地址链并不会自动变成平滑采样。"
      : mode === "deferred"
        ? "推荐路径：每个 texel 重建一次，当前窗口只保留两张 slice。"
        : "对照路径：每个 fragment 都重复解码邻域，再手写 7 次插值。";
    return {
      deferredFrame,
      memory,
      note,
      singleFrame,
      singlePerSample,
      speedup,
    };
  }, [
    manualFilteringMistake,
    mode,
    reconstructionCost,
    samplesPerVoxel,
    sliceCount,
  ]);

  const reset = () => {
    setMode("deferred");
    setReconstructionCost(4);
    setSamplesPerVoxel(2);
    setSliceCount(64);
    setManualFilteringMistake(false);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="deferred filtering 实验模式"
          >
            {(
              [
                ["deferred", "两遍 deferred"],
                ["single", "单遍手写"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${mode === value ? "border-accent bg-accent/15 text-primary" : "border-border text-secondary hover:border-accent"}`}
                onClick={() => setMode(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-card border border-border bg-surface p-4">
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch41-reconstruction-cost"
            >
              reconstruction cost{" "}
              <span className="font-mono text-primary">
                {reconstructionCost} instructions
              </span>
              <input
                id="ch41-reconstruction-cost"
                type="range"
                min="1"
                max="8"
                value={reconstructionCost}
                onChange={(event) =>
                  setReconstructionCost(Number(event.target.value))
                }
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch41-samples-per-voxel"
            >
              samples per voxel{" "}
              <span className="font-mono text-primary">{samplesPerVoxel}</span>
              <input
                id="ch41-samples-per-voxel"
                type="range"
                min="1"
                max="4"
                value={samplesPerVoxel}
                onChange={(event) =>
                  setSamplesPerVoxel(Number(event.target.value))
                }
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch41-slice-count"
            >
              data slices{" "}
              <span className="font-mono text-primary">{sliceCount}</span>
              <input
                id="ch41-slice-count"
                type="range"
                min="16"
                max="128"
                step="16"
                value={sliceCount}
                onChange={(event) => setSliceCount(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
            <label
              className="flex items-center gap-2 text-sm text-secondary"
              htmlFor="ch41-manual-mistake"
            >
              <input
                id="ch41-manual-mistake"
                type="checkbox"
                checked={manualFilteringMistake}
                onChange={(event) =>
                  setManualFilteringMistake(event.target.checked)
                }
                className="accent-accent"
              />
              注入“直接打开线性过滤”误区
            </label>
          </div>
          <button
            type="button"
            className="mt-3 rounded-full border border-border px-3 py-1.5 text-sm text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验
          </button>
        </div>
        <div
          className="rounded-card border border-border bg-surface p-4"
          aria-live="polite"
        >
          <div className="mb-2 text-sm font-semibold text-primary">
            当前路径：{mode === "deferred" ? "两遍 deferred" : "单遍手写"}
          </div>
          <Metric
            label="单遍估算指令"
            value={`${result.singleFrame.toLocaleString()}`}
            tone={C.danger}
          />
          <Metric
            label="两遍估算指令"
            value={`${result.deferredFrame.toLocaleString()}`}
            tone={C.success}
          />
          <Metric
            label="单次过滤读取"
            value={`${mode === "deferred" ? 3 : result.singlePerSample}`}
            tone={C.accent}
          />
          <Metric
            label="驻留 slice 数"
            value={`${result.memory}`}
            tone={C.warning}
          />
          <Metric
            label="估算收益"
            value={`${result.speedup.toFixed(1)}×`}
            tone={C.success}
          />
          <div
            className={`mt-4 rounded-card border p-3 text-sm ${manualFilteringMistake ? "border-danger bg-danger/10 text-primary" : "border-success bg-success/10 text-primary"}`}
          >
            {result.note}
          </div>
          <div
            className="mt-4 grid grid-cols-8 gap-1"
            aria-label="当前过滤窗口预览"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className={`h-8 rounded-sm ${index % 2 === 0 ? "bg-accent/60" : "bg-success/50"}`}
                style={{
                  opacity: 0.25 + ((index * 11 + sliceCount) % 60) / 100,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Figure>
  );
}
