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
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={color}
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function FlowBox({
  color,
  detail,
  label,
  x,
  y,
  width = 142,
}: {
  color: string;
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
        height="86"
        rx="12"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
      />
      <text x={x + width / 2} y={y + 34} textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
        {label}
      </text>
      <text x={x + width / 2} y={y + 59} textAnchor="middle" fontSize="12" fill={C.secondary}>
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

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "输入先由 vertex / pixel stage 做规则、逐像素的准备" },
  { label: "geometry", caption: "geometry shader 读取一个上下文，按数据决定输出多少元素" },
  { label: "feedback", caption: "输出顶点或 stream-out 数据，紧凑地把结果留在 GPU 路径" },
  { label: "boundary", caption: "CPU 只取少量统计或坐标，不再搬回整张中间图像" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  boundary: "CPU 只取少量统计或坐标，不再搬回整张中间图像",
  feedback: "输出顶点或 stream-out 数据，紧凑地把结果留在 GPU 路径",
  geometry: "geometry shader 读取一个上下文，按数据决定输出多少元素",
  input: "输入先由 vertex / pixel stage 做规则、逐像素的准备",
};

export function GpuGems3Ch41PipelineDiagram() {
  const inputRef = useRef<SVGGElement>(null);
  const geometryRef = useRef<SVGGElement>(null);
  const feedbackRef = useRef<SVGGElement>(null);
  const boundaryRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      tl.add(inputRef.current!, { opacity: [1, 1], duration: T * 0.5 }, 0);
      tl.label("input", 0);
      tl.add(geometryRef.current!, { opacity: [0, 1], duration: T * 0.5 }, T);
      tl.label("geometry", T);
      tl.add(feedbackRef.current!, { opacity: [0, 1], duration: T * 0.5 }, T * 2);
      tl.label("feedback", T * 2);
      tl.add(boundaryRef.current!, { opacity: [0, 1], duration: T * 0.5 }, T * 3);
      tl.label("boundary", T * 3);
    },
  });
  return (
    <Figure>
      <Frame
        height={400}
        label="Geometry shader 反馈路径：规则输入经过 pixel stage 准备，再由 geometry shader 按数据依赖发出可变数量结果，结果留在 GPU 或以少量数据反馈给 CPU"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          geometry shader turns analysis into compact feedback
        </text>
        <g ref={inputRef} style={{ opacity: 1 }}>
          <FlowBox color={C.secondary} detail="规则、逐像素" label="VS / PS" x={28} y={98} width={136} />
        </g>
        <Arrow color={C.accent} x1={164} x2={218} y1={141} y2={141} />
        <g ref={geometryRef} style={{ opacity: 0 }}>
          <FlowBox color={C.accent} detail="数据依赖循环" label="GS" x={218} y={98} width={136} />
          <text x="286" y="215" textAnchor="middle" fontSize="13" fill={C.accent}>
            adaptive count
          </text>
          <path d="M286 228 C226 252 226 292 286 312 C346 292 346 252 286 228" fill="none" stroke={C.accent} strokeWidth="2" strokeDasharray="6 5" />
        </g>
        <Arrow color={C.success} x1={354} x2={408} y1={141} y2={141} />
        <g ref={feedbackRef} style={{ opacity: 0 }}>
          <FlowBox color={C.success} detail="vertex / scalar" label="feedback" x={408} y={98} width={150} />
          {Array.from({ length: 5 }, (_, index) => (
            <circle key={`feedback-dot-${index}`} cx={438 + index * 28} cy={244 + (index % 2) * 22} r="7" fill={C.success} />
          ))}
          <text x="483" y="304" textAnchor="middle" fontSize="13" fill={C.success}>
            only emitted values
          </text>
        </g>
        <Arrow color={C.warning} dashed x1={558} x2={620} y1={141} y2={141} />
        <g ref={boundaryRef} style={{ opacity: 0 }}>
          <FlowBox color={C.warning} detail="few scalars" label="CPU" x={620} y={98} width={112} />
          <text x="676" y="244" textAnchor="middle" fontSize="13" fill={C.warning}>
            low bus traffic
          </text>
        </g>
        <rect x="28" y="342" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="362" textAnchor="middle" fontSize="13" fill={C.secondary}>
          prepare regular work in PS · reserve GS for adaptive, compact output
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="GS 不是更快的通用循环；它的价值是让单个 GPU thread 产生数据依赖的可变长度结果。" />
    </Figure>
  );
}

const EMIT_STEPS: readonly TeachingStep[] = [
  { label: "one", caption: "只发送一个输入顶点，GS 获得一个可读的上下文" },
  { label: "scan", caption: "GS 扫描纹理或统计输入，决定要保留哪些结果" },
  { label: "emit", caption: "每次 emit 一个 packet，输出数量随数据自适应" },
  { label: "compact", caption: "输出是紧凑结果，而不是整张固定大小的中间缓冲" },
];

const EMIT_LABELS: Readonly<Record<string, string>> = {
  compact: "输出是紧凑结果，而不是整张固定大小的中间缓冲",
  emit: "每次 emit 一个 packet，输出数量随数据自适应",
  one: "只发送一个输入顶点，GS 获得一个可读的上下文",
  scan: "GS 扫描纹理或统计输入，决定要保留哪些结果",
};

export function GpuGems3Ch41DynamicOutputDiagram() {
  const oneRef = useRef<SVGGElement>(null);
  const scanRef = useRef<SVGGElement>(null);
  const emitRef = useRef<SVGGElement>(null);
  const compactRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: EMIT_STEPS,
    build: (tl) => {
      tl.add(oneRef.current!, { opacity: [1, 1], duration: T * 0.45 }, 0);
      tl.label("one", 0);
      tl.add(scanRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T);
      tl.label("scan", T);
      tl.add(emitRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 2);
      tl.label("emit", T * 2);
      tl.add(compactRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 3);
      tl.label("compact", T * 3);
    },
  });
  return (
    <Figure>
      <Frame
        height={414}
        label="可变长度输出图：一个输入上下文经过扫描和数据依赖判断后，geometry shader 发出零个、一个或多个结果，输出保持紧凑"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one context, adaptive output count
        </text>
        <g ref={oneRef} style={{ opacity: 1 }}>
          <rect x="40" y="98" width="116" height="100" rx="12" fill={C.secondary} fillOpacity="0.1" stroke={C.secondary} strokeWidth="2" />
          <circle cx="98" cy="146" r="20" fill={C.secondary} fillOpacity="0.25" stroke={C.secondary} strokeWidth="2" />
          <text x="98" y="238" textAnchor="middle" fontSize="13" fill={C.secondary}>one input vertex</text>
        </g>
        <Arrow x1={156} x2={232} y1={148} y2={148} />
        <g ref={scanRef} style={{ opacity: 0 }}>
          <rect x="232" y="98" width="160" height="100" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="2" />
          <text x="312" y="137" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>scan input</text>
          <text x="312" y="165" textAnchor="middle" fontSize="12" fill={C.secondary}>texture · math · branch</text>
          <text x="312" y="238" textAnchor="middle" fontSize="13" fill={C.accent}>data-dependent decision</text>
        </g>
        <Arrow x1={392} x2={470} y1={148} y2={148} />
        <g ref={emitRef} style={{ opacity: 0 }}>
          <rect x="470" y="98" width="118" height="100" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="2" />
          <text x="529" y="137" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>emit</text>
          <text x="529" y="165" textAnchor="middle" fontSize="12" fill={C.secondary}>0 … many</text>
          {Array.from({ length: 4 }, (_, index) => (
            <circle key={`emit-dot-${index}`} cx={490 + index * 26} cy={220 + (index % 2) * 18} r="6" fill={C.success} />
          ))}
        </g>
        <g ref={compactRef} style={{ opacity: 0 }}>
          <rect x="40" y="290" width="548" height="54" rx="10" fill={C.success} fillOpacity="0.08" stroke={C.success} strokeWidth="1.5" />
          <text x="314" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>compact result stream</text>
          <text x="314" y="335" textAnchor="middle" fontSize="12" fill={C.secondary}>size is decided by the data, not by a preallocated pixel grid</text>
        </g>
        <rect x="612" y="98" width="120" height="246" rx="12" fill={C.surface} stroke={C.border} />
        <text x="672" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>why PS struggles</text>
        <text x="672" y="174" textAnchor="middle" fontSize="12" fill={C.danger}>fixed output grid</text>
        <text x="672" y="204" textAnchor="middle" fontSize="12" fill={C.secondary}>no neighbor context</text>
        <text x="672" y="234" textAnchor="middle" fontSize="12" fill={C.secondary}>same result per pixel</text>
        <text x="672" y="286" textAnchor="middle" fontSize="12" fill={C.warning}>adaptive count</text>
        <text x="672" y="316" textAnchor="middle" fontSize="12" fill={C.success}>belongs in GS</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={EMIT_LABELS} caption="可变输出的关键是：GS thread 既能读取输入，又能根据内容决定 emit 次数。" />
    </Figure>
  );
}

export function GpuGems3Ch41HistogramDiagram() {
  const partitionRef = useRef<SVGGElement>(null);
  const localRef = useRef<SVGGElement>(null);
  const blendRef = useRef<SVGGElement>(null);
  const outputRef = useRef<SVGGElement>(null);
  const steps: readonly TeachingStep[] = [
    { label: "partition", caption: "把输入图像切成多个区域，每个 GS thread 负责一块" },
    { label: "local", caption: "每个 thread 在自己的局部状态中累计 histogram bins" },
    { label: "blend", caption: "多个局部 histogram 写向同一位置，由 additive blending 合并" },
    { label: "output", caption: "最终只读回固定大小的 histogram，而不是整张图像" },
  ];
  const labels: Readonly<Record<string, string>> = {
    blend: "多个局部 histogram 写向同一位置，由 additive blending 合并",
    local: "每个 thread 在自己的局部状态中累计 histogram bins",
    output: "最终只读回固定大小的 histogram，而不是整张图像",
    partition: "把输入图像切成多个区域，每个 GS thread 负责一块",
  };
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(partitionRef.current!, { opacity: [1, 1], duration: T * 0.45 }, 0);
      tl.label("partition", 0);
      tl.add(localRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T);
      tl.label("local", T);
      tl.add(blendRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 2);
      tl.label("blend", T * 2);
      tl.add(outputRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 3);
      tl.label("output", T * 3);
    },
  });
  return (
    <Figure>
      <Frame
        height={420}
        label="Geometry shader 构建 histogram：输入图像分区后各线程局部累计，再用 additive blending 合并为固定大小的 histogram，减少 CPU 回读"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>histogram: local state, shared reduction</text>
        <g ref={partitionRef} style={{ opacity: 1 }}>
          <rect x="26" y="88" width="168" height="190" rx="12" fill={C.secondary} fillOpacity="0.08" stroke={C.secondary} strokeWidth="2" />
          <text x="110" y="117" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>input image</text>
          {Array.from({ length: 16 }, (_, index) => (
            <rect key={`tile-${index}`} x={48 + (index % 4) * 32} y={136 + Math.floor(index / 4) * 32} width="24" height="24" rx="3" fill={index % 3 === 0 ? C.warning : C.secondary} fillOpacity={index % 3 === 0 ? "0.72" : "0.2"} />
          ))}
          <text x="110" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>partition into tiles</text>
        </g>
        <Arrow x1={194} x2={258} y1={180} y2={180} />
        <g ref={localRef} style={{ opacity: 0 }}>
          <rect x="258" y="88" width="174" height="190" rx="12" fill={C.accent} fillOpacity="0.08" stroke={C.accent} strokeWidth="2" />
          <text x="345" y="117" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>GS threads</text>
          {[0, 1, 2].map((thread) => (
            <g key={`thread-${thread}`}>
              <rect x="282" y={136 + thread * 42} width="126" height="30" rx="7" fill={C.accent} fillOpacity="0.14" stroke={C.accent} />
              <text x="345" y={156 + thread * 42} textAnchor="middle" fontSize="12" fill={C.accent}>local bins {thread + 1}</text>
            </g>
          ))}
          <text x="345" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>one state per partition</text>
        </g>
        <Arrow x1={432} x2={496} y1={180} y2={180} color={C.success} />
        <g ref={blendRef} style={{ opacity: 0 }}>
          <rect x="496" y="88" width="112" height="190" rx="12" fill={C.success} fillOpacity="0.08" stroke={C.success} strokeWidth="2" />
          <text x="552" y="117" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>blend</text>
          {[0, 1, 2].map((line) => <line key={`blend-line-${line}`} x1="516" x2="588" y1={150 + line * 34} y2={150 + line * 34} stroke={C.success} strokeWidth="5" strokeLinecap="round" />)}
          <text x="552" y="258" textAnchor="middle" fontSize="12" fill={C.success}>GL_ONE + GL_ONE</text>
        </g>
        <g ref={outputRef} style={{ opacity: 0 }}>
          <rect x="636" y="88" width="96" height="190" rx="12" fill={C.warning} fillOpacity="0.08" stroke={C.warning} strokeWidth="2" />
          <text x="684" y="117" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>CPU</text>
          <text x="684" y="164" textAnchor="middle" fontSize="13" fill={C.warning}>256 bins</text>
          <text x="684" y="194" textAnchor="middle" fontSize="12" fill={C.secondary}>one readback</text>
          <text x="684" y="236" textAnchor="middle" fontSize="12" fill={C.success}>small result</text>
        </g>
        <rect x="26" y="328" width="706" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="348" textAnchor="middle" fontSize="13" fill={C.secondary}>fixed-size output can still span many pixels, so GS emits the bins as a compact packet</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={labels} caption="Histogram 的输出大小是固定的，但它跨越许多像素；GS 可以一次构建并把 bins 作为紧凑反馈交给下游。" />
    </Figure>
  );
}

const HOUGH_STEPS: readonly TeachingStep[] = [
  { label: "image", caption: "pixel shader 在 GPU 上生成梯度或 Hough map" },
  { label: "map", caption: "Hough map 中的局部峰值代表候选直线" },
  { label: "maxima", caption: "geometry shader 扫描邻域并只保留局部极值" },
  { label: "lines", caption: "GS 输出少量直线参数，CPU 只接收紧凑结果" },
];

export function GpuGems3Ch41HoughDiagram() {
  const imageRef = useRef<SVGGElement>(null);
  const mapRef = useRef<SVGGElement>(null);
  const maximaRef = useRef<SVGGElement>(null);
  const linesRef = useRef<SVGGElement>(null);
  const labels: Readonly<Record<string, string>> = {
    image: "pixel shader 在 GPU 上生成梯度或 Hough map",
    lines: "GS 输出少量直线参数，CPU 只接收紧凑结果",
    map: "Hough map 中的局部峰值代表候选直线",
    maxima: "geometry shader 扫描邻域并只保留局部极值",
  };
  const timeline = useTeachingTimeline({
    steps: HOUGH_STEPS,
    build: (tl) => {
      tl.add(imageRef.current!, { opacity: [1, 1], duration: T * 0.45 }, 0);
      tl.label("image", 0);
      tl.add(mapRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T);
      tl.label("map", T);
      tl.add(maximaRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 2);
      tl.label("maxima", T * 2);
      tl.add(linesRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 3);
      tl.label("lines", T * 3);
    },
  });
  return (
    <Figure>
      <Frame
        height={420}
        label="Hough transform 反馈流水线：pixel shader 生成 Hough map，geometry shader 搜索局部极值并输出少量直线参数，避免把中间图像回读 CPU"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>Hough map: image space to compact line parameters</text>
        <g ref={imageRef} style={{ opacity: 1 }}>
          <rect x="26" y="92" width="150" height="150" rx="12" fill={C.secondary} fillOpacity="0.08" stroke={C.secondary} strokeWidth="2" />
          <line x1="48" x2="154" y1="214" y2="122" stroke={C.warning} strokeWidth="5" />
          <line x1="48" x2="154" y1="136" y2="204" stroke={C.accent} strokeWidth="5" />
          <text x="101" y="273" textAnchor="middle" fontSize="13" fill={C.secondary}>source image</text>
        </g>
        <Arrow x1={176} x2={236} y1={167} y2={167} />
        <g ref={mapRef} style={{ opacity: 0 }}>
          <rect x="236" y="92" width="168" height="150" rx="12" fill={C.accent} fillOpacity="0.08" stroke={C.accent} strokeWidth="2" />
          {Array.from({ length: 25 }, (_, index) => {
            const peak = index === 7 || index === 18;
            return <circle key={`hough-cell-${index}`} cx={260 + (index % 5) * 30} cy={120 + Math.floor(index / 5) * 25} r={peak ? 8 : 4} fill={peak ? C.warning : C.accent} fillOpacity={peak ? "0.95" : "0.35"} />;
          })}
          <text x="320" y="273" textAnchor="middle" fontSize="13" fill={C.accent}>Hough map</text>
        </g>
        <Arrow x1={404} x2={464} y1={167} y2={167} color={C.success} />
        <g ref={maximaRef} style={{ opacity: 0 }}>
          <rect x="464" y="92" width="116" height="150" rx="12" fill={C.success} fillOpacity="0.08" stroke={C.success} strokeWidth="2" />
          <text x="522" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>GS</text>
          <rect x="486" y="148" width="72" height="48" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeDasharray="5 4" />
          <text x="522" y="177" textAnchor="middle" fontSize="12" fill={C.success}>7 × 7</text>
          <text x="522" y="273" textAnchor="middle" fontSize="13" fill={C.success}>local maxima</text>
        </g>
        <Arrow x1={580} x2={626} y1={167} y2={167} color={C.warning} />
        <g ref={linesRef} style={{ opacity: 0 }}>
          <rect x="626" y="92" width="106" height="150" rx="12" fill={C.warning} fillOpacity="0.08" stroke={C.warning} strokeWidth="2" />
          <text x="679" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>CPU</text>
          <text x="679" y="168" textAnchor="middle" fontSize="13" fill={C.warning}>n lines</text>
          <text x="679" y="198" textAnchor="middle" fontSize="12" fill={C.secondary}>few scalars</text>
          <text x="679" y="273" textAnchor="middle" fontSize="13" fill={C.success}>compact feedback</text>
        </g>
        <rect x="26" y="328" width="706" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="348" textAnchor="middle" fontSize="13" fill={C.secondary}>the intermediate 1024 × 1024 map stays on the GPU; only peaks cross the boundary</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={labels} caption="Hough 例子展示 GS 最有价值的边界：在 GPU 内完成局部极值搜索，只反馈少量参数。" />
    </Figure>
  );
}

export function GpuGems3Ch41CornerDiagram() {
  const filterRef = useRef<SVGGElement>(null);
  const splitRef = useRef<SVGGElement>(null);
  const emitRef = useRef<SVGGElement>(null);
  const localityRef = useRef<SVGGElement>(null);
  const steps: readonly TeachingStep[] = [
    { label: "filter", caption: "pixel shader 并行计算梯度、特征值等规则中间量" },
    { label: "split", caption: "把输入图像分成子区域，让多个 GS thread 并行处理" },
    { label: "emit", caption: "每个 thread 只输出它找到的角点位置" },
    { label: "locality", caption: "中间图与最终候选都留在 GPU 附近，减少总线往返" },
  ];
  const labels: Readonly<Record<string, string>> = {
    emit: "每个 thread 只输出它找到的角点位置",
    filter: "pixel shader 并行计算梯度、特征值等规则中间量",
    locality: "中间图与最终候选都留在 GPU 附近，减少总线往返",
    split: "把输入图像分成子区域，让多个 GS thread 并行处理",
  };
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(filterRef.current!, { opacity: [1, 1], duration: T * 0.45 }, 0);
      tl.label("filter", 0);
      tl.add(splitRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T);
      tl.label("split", T);
      tl.add(emitRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 2);
      tl.label("emit", T * 2);
      tl.add(localityRef.current!, { opacity: [0, 1], duration: T * 0.45 }, T * 3);
      tl.label("locality", T * 3);
    },
  });
  return (
    <Figure>
      <Frame
        height={404}
        label="Corner detection 图解：pixel shader 计算规则滤波结果，多个 geometry shader thread 分区搜索角点，按数据依赖输出可变数量的位置，减少 CPU 回读"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>corner detection: regular work first, adaptive feedback last</text>
        <g ref={filterRef} style={{ opacity: 1 }}>
          <FlowBox color={C.secondary} detail="gradients / eigenvalues" label="PS filters" x={30} y={96} width={156} />
        </g>
        <Arrow x1={186} x2={244} y1={139} y2={139} />
        <g ref={splitRef} style={{ opacity: 0 }}>
          <rect x="244" y="96" width="166" height="86" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="2" />
          <text x="327" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>partition</text>
          <text x="327" y="157" textAnchor="middle" fontSize="12" fill={C.secondary}>subrectangles → GS threads</text>
        </g>
        <Arrow x1={410} x2={468} y1={139} y2={139} color={C.success} />
        <g ref={emitRef} style={{ opacity: 0 }}>
          <FlowBox color={C.success} detail="variable point list" label="GS emit" x={468} y={96} width={142} />
          {[0, 1, 2, 3].map((index) => <circle key={`corner-${index}`} cx={490 + index * 28} cy={236 + (index % 2) * 20} r="7" fill={C.success} />)}
          <text x="539" y="290" textAnchor="middle" fontSize="13" fill={C.success}>corner positions</text>
        </g>
        <Arrow x1={610} x2={672} y1={139} y2={139} color={C.warning} />
        <g ref={localityRef} style={{ opacity: 0 }}>
          <rect x="650" y="96" width="82" height="86" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="2" />
          <text x="691" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.text}>few</text>
          <text x="691" y="157" textAnchor="middle" fontSize="12" fill={C.warning}>bytes back</text>
          <text x="380" y="351" textAnchor="middle" fontSize="13" fill={C.secondary}>GPU keeps the image, CPU receives the compact candidate list</text>
        </g>
        <rect x="30" y="326" width="702" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="346" textAnchor="middle" fontSize="13" fill={C.secondary}>PS handles dense convolution; GS handles sparse, data-dependent positions</text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={labels} caption="角点检测并不是把所有图像工作塞进 GS，而是把规则滤波和稀疏反馈分给合适的阶段。" />
    </Figure>
  );
}

export function GpuGems3Ch41LimitsDiagram() {
  return (
    <Figure>
      <Frame
        height={416}
        label="Geometry shader 工程限制：单线程最多写出 1,024 scalars，必须分区并行；tile 访问更利于纹理缓存，单线程扫描过大区域会降低 GPU 利用率"
      >
        <text x="380" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>dynamic output is powerful, but not unbounded</text>
        <rect x="28" y="76" width="218" height="270" rx="14" fill={C.danger} fillOpacity="0.08" stroke={C.danger} strokeWidth="2" />
        <text x="137" y="111" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>one GS thread</text>
        <text x="137" y="148" textAnchor="middle" fontSize="13" fill={C.danger}>large input region</text>
        <rect x="76" y="176" width="122" height="64" rx="10" fill={C.danger} fillOpacity="0.14" stroke={C.danger} />
        <text x="137" y="203" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.danger}>1,024</text>
        <text x="137" y="226" textAnchor="middle" fontSize="12" fill={C.secondary}>scalars max</text>
        <text x="137" y="282" textAnchor="middle" fontSize="12" fill={C.secondary}>too much serial work</text>
        <text x="137" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>low occupancy</text>
        <rect x="270" y="76" width="218" height="270" rx="14" fill={C.success} fillOpacity="0.08" stroke={C.success} strokeWidth="2" />
        <text x="379" y="111" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>many GS threads</text>
        {Array.from({ length: 9 }, (_, index) => <rect key={`thread-tile-${index}`} x={300 + (index % 3) * 52} y={140 + Math.floor(index / 3) * 52} width="38" height="38" rx="7" fill={C.success} fillOpacity="0.18" stroke={C.success} />)}
        <text x="379" y="308" textAnchor="middle" fontSize="12" fill={C.success}>partitioned input</text>
        <text x="379" y="332" textAnchor="middle" fontSize="12" fill={C.secondary}>each thread stays under the cap</text>
        <rect x="512" y="76" width="220" height="270" rx="14" fill={C.accent} fillOpacity="0.08" stroke={C.accent} strokeWidth="2" />
        <text x="622" y="111" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>cache-friendly scan</text>
        <rect x="548" y="145" width="148" height="118" rx="10" fill={C.surface} stroke={C.border} />
        {Array.from({ length: 16 }, (_, index) => <rect key={`cache-${index}`} x={560 + (index % 4) * 32} y={158 + Math.floor(index / 4) * 25} width="23" height="17" rx="3" fill={index % 5 === 0 ? C.warning : C.accent} fillOpacity={index % 5 === 0 ? "0.8" : "0.26"} />)}
        <text x="622" y="292" textAnchor="middle" fontSize="12" fill={C.accent}>tile, fetch, emit</text>
        <text x="622" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>test tile size per GPU</text>
      </Frame>
    </Figure>
  );
}

type FeedbackMethod = "gs" | "readback";
type PartitionMode = "one" | "four" | "sixteen";
type OutputSink = "framebuffer" | "streamout";
type Workload = "histogram" | "hough" | "corners";

const WORKLOADS: Record<Workload, { label: string; baseOutput: number; description: string }> = {
  corners: { label: "corner list", baseOutput: 48, description: "sparse 2D positions" },
  histogram: { label: "histogram", baseOutput: 256, description: "fixed bins" },
  hough: { label: "Hough peaks", baseOutput: 12, description: "local maxima" },
};

export function GpuGems3Ch41FeedbackLab() {
  const [workload, setWorkload] = useState<Workload>("hough");
  const [method, setMethod] = useState<FeedbackMethod>("gs");
  const [partitions, setPartitions] = useState<PartitionMode>("four");
  const [outputCap, setOutputCap] = useState<256 | 1024>(1024);
  const [sink, setSink] = useState<OutputSink>("framebuffer");
  const [fault, setFault] = useState(false);

  const result = useMemo(() => {
    const partitionCount = partitions === "one" ? 1 : partitions === "four" ? 4 : 16;
    const spec = WORKLOADS[workload];
    const adaptiveOutput = workload === "histogram" ? 256 : spec.baseOutput;
    const emitted = Math.round(adaptiveOutput * (workload === "corners" ? 1.2 : workload === "histogram" ? 1 : 0.75));
    const perThread = Math.ceil(emitted / partitionCount);
    const capRisk = perThread > outputCap ? "超出每线程上限" : "在上限内";
    const transferScalars = method === "gs" ? Math.max(4, Math.ceil(emitted / 8)) : 1024 * 1024;
    const baseCost = workload === "histogram" ? 1.2 : workload === "hough" ? 1 : 0.85;
    const partitionGain = partitionCount === 1 ? 0.72 : partitionCount === 4 ? 1 : 1.18;
    const feedbackGain = method === "gs" ? 1 : 0.56;
    const sinkGain = sink === "streamout" ? 1.08 : 1;
    const faultPenalty = fault ? 0.62 : 1;
    const throughput = Math.max(0.18, baseCost * partitionGain * feedbackGain * sinkGain * faultPenalty);
    let warning = "GPU 内完成稀疏反馈";
    if (fault) warning = "故障注入：单线程吞吐或回读路径成为瓶颈";
    else if (method === "readback") warning = "整张中间图像回读，CPU / 总线承压";
    else if (partitionCount === 1) warning = "单线程串行扫描，GPU 利用率偏低";
    else if (perThread > outputCap) warning = "必须增加分区，否则触及 GS 输出上限";
    return {
      capRisk,
      emitted,
      partitionCount,
      perThread,
      throughput,
      transferScalars,
      warning,
      workload: spec,
    };
  }, [fault, method, outputCap, partitions, sink, workload]);

  const reset = () => {
    setWorkload("hough");
    setMethod("gs");
    setPartitions("four");
    setOutputCap(1024);
    setSink("framebuffer");
    setFault(false);
  };

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems 3 Chapter 41 Geometry Shader Feedback Lab">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 41</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">Geometry Shader Feedback Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-2 text-sm text-secondary">比较 GS 紧凑反馈与整图回读：只改变一个控制项，观察输出上限、分区并行和总线传输如何联动。</p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3 sm:p-4">
          <Frame
            height={440}
            label={`Geometry Shader Feedback Lab 当前实验：${result.workload.label}，${method === "gs" ? "GS compact feedback" : "pixel buffer plus CPU readback"}，${partitions} partitions，${result.emitted} outputs，${result.perThread} scalars per thread，${result.warning}`}
          >
            <text x="380" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>adaptive output → compact boundary</text>
            <rect x="28" y="62" width="704" height="90" rx="12" fill={C.surface} stroke={C.border} />
            <text x="52" y="91" fontSize="13" fontWeight="700" fill={C.text}>{result.workload.label}</text>
            <text x="52" y="118" fontSize="12" fill={C.secondary}>{result.workload.description}</text>
            <text x="350" y="91" fontSize="13" fill={C.secondary}>emitted</text>
            <text x="350" y="120" fontSize="18" fontWeight="700" fill={C.success}>{result.emitted}</text>
            <text x="470" y="91" fontSize="13" fill={C.secondary}>per thread</text>
            <text x="470" y="120" fontSize="18" fontWeight="700" fill={result.perThread > outputCap ? C.danger : C.accent}>{result.perThread}</text>
            <text x="610" y="91" fontSize="13" fill={C.secondary}>cap</text>
            <text x="610" y="120" fontSize="18" fontWeight="700" fill={C.warning}>{outputCap}</text>
            <rect x="28" y="180" width="704" height="128" rx="12" fill={C.surface} stroke={C.border} />
            <text x="52" y="210" fontSize="13" fontWeight="700" fill={C.text}>GPU work distribution</text>
            {Array.from({ length: result.partitionCount }, (_, index) => {
              const cols = result.partitionCount === 16 ? 8 : result.partitionCount === 4 ? 4 : 1;
              const w = result.partitionCount === 1 ? 560 : result.partitionCount === 4 ? 126 : 62;
              const gap = result.partitionCount === 1 ? 0 : result.partitionCount === 4 ? 10 : 8;
              const x = 52 + (index % cols) * (w + gap);
              const y = result.partitionCount === 16 ? 232 + Math.floor(index / cols) * 30 : 236;
              return <rect key={`lab-partition-${index}`} x={x} y={y} width={w} height={20} rx="5" fill={method === "gs" ? C.success : C.danger} fillOpacity={method === "gs" ? "0.6" : "0.35"} />;
            })}
            <text x="52" y="296" fontSize="12" fill={C.secondary}>{result.partitionCount === 1 ? "one serial scan" : `${result.partitionCount} independent GS regions`}</text>
            <rect x="28" y="334" width="704" height="74" rx="12" fill={fault ? C.danger : C.accent} fillOpacity="0.1" stroke={fault ? C.danger : C.accent} strokeWidth="2" />
            <text x="52" y="364" fontSize="14" fontWeight="700" fill={fault ? C.danger : C.accent}>{result.warning}</text>
            <text x="52" y="390" fontSize="12" fill={C.secondary}>transfer model: {result.transferScalars.toLocaleString()} scalars · modeled throughput {result.throughput.toFixed(2)}</text>
          </Frame>
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-secondary">workload
            <select className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary" value={workload} onChange={(event) => setWorkload(event.target.value as Workload)}>
              <option value="hough">Hough peaks</option>
              <option value="corners">corner list</option>
              <option value="histogram">histogram</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">feedback path
            <select className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary" value={method} onChange={(event) => setMethod(event.target.value as FeedbackMethod)}>
              <option value="gs">GS compact feedback</option>
              <option value="readback">PS buffer + CPU readback</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">partitions
            <select className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary" value={partitions} onChange={(event) => setPartitions(event.target.value as PartitionMode)}>
              <option value="one">1 region</option>
              <option value="four">4 regions</option>
              <option value="sixteen">16 regions</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">per-thread scalar cap
            <select className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary" value={outputCap} onChange={(event) => setOutputCap(Number(event.target.value) as 256 | 1024)}>
              <option value="256">256 scalars</option>
              <option value="1024">1,024 scalars</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">output sink
            <select className="mt-1 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary" value={sink} onChange={(event) => setSink(event.target.value as OutputSink)}>
              <option value="framebuffer">framebuffer positions</option>
              <option value="streamout">linear stream-out</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-secondary">
            <input type="checkbox" checked={fault} onChange={(event) => setFault(event.target.checked)} />
            注入故障：单线程 / 回读瓶颈
          </label>
          <button type="button" className="w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary" onClick={reset}>重置实验</button>
        </div>
      </div>
      <div className="grid gap-3 border-t border-border px-5 py-4 sm:grid-cols-3">
        <Metric label="反馈数据量" value={`${result.transferScalars.toLocaleString()} scalars`} tone={method === "gs" ? C.success : C.danger} />
        <Metric label="输出上限" value={result.capRisk} tone={result.perThread > outputCap ? C.danger : C.success} />
        <Metric label="sink" value={sink === "framebuffer" ? "2D position" : "linear buffer"} tone={C.accent} />
      </div>
    </section>
  );
}
