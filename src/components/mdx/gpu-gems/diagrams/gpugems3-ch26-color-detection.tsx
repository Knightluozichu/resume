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
  height = 420,
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

function Blob({
  cx,
  cy,
  noise = false,
  r = 48,
  tone = C.success,
}: {
  cx: number;
  cy: number;
  noise?: boolean;
  r?: number;
  tone?: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={tone} fillOpacity="0.22" />
      <circle cx={cx - 5} cy={cy - 4} r={r * 0.72} fill={tone} fillOpacity="0.38" />
      <circle cx={cx + 12} cy={cy + 8} r={r * 0.42} fill={tone} fillOpacity="0.72" />
      {noise && (
        <>
          <circle cx={cx - 72} cy={cy - 32} r="8" fill={C.warning} fillOpacity="0.75" />
          <circle cx={cx + 73} cy={cy + 28} r="7" fill={C.danger} fillOpacity="0.7" />
          <circle cx={cx + 58} cy={cy - 48} r="6" fill={C.warning} fillOpacity="0.65" />
          <circle cx={cx - 84} cy={cy + 42} r="5" fill={C.danger} fillOpacity="0.6" />
        </>
      )}
    </g>
  );
}

export function GpuGems3Ch26MaskDiagram() {
  return (
    <Figure>
      <Frame
        height={424}
        label="颜色掩码：逐像素把当前颜色与目标颜色比较，落在阈值内的像素变为白色，其余变为黑色"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          compare color, keep only the target
        </text>
        <g transform="translate(34 82)">
          <rect width="300" height="266" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="150" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            video frame
          </text>
          <rect x="42" y="60" width="216" height="126" rx="10" fill={C.bg} stroke={C.border} />
          <Blob cx={150} cy={124} noise />
          <circle cx="80" cy="95" r="13" fill={C.accent} fillOpacity="0.42" />
          <circle cx="224" cy="176" r="11" fill={C.warning} fillOpacity="0.45" />
          <text x="150" y="222" textAnchor="middle" fontSize="13" fill={C.secondary}>
            normalize RGB, then measure distance
          </text>
          <text x="150" y="248" textAnchor="middle" fontSize="13" fill={C.warning}>
            target color + threshold
          </text>
        </g>
        <Arrow x1={352} x2={402} y1={214} y2={214} color={C.warning} />
        <g transform="translate(418 82)">
          <rect width="308" height="266" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="154" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            binary mask
          </text>
          <rect x="48" y="60" width="212" height="126" rx="10" fill={C.bg} stroke={C.border} />
          <circle cx="154" cy="124" r="52" fill={C.success} fillOpacity="0.78" />
          <circle cx="88" cy="95" r="10" fill={C.bg} />
          <circle cx="224" cy="174" r="9" fill={C.bg} />
          <text x="154" y="222" textAnchor="middle" fontSize="13" fill={C.secondary}>
            white = included, black = rejected
          </text>
          <text x="154" y="248" textAnchor="middle" fontSize="13" fill={C.success}>
            one GPU pass over the frame
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch26RoiDiagram() {
  return (
    <Figure>
      <Frame
        height={418}
        label="Core Image 的 ROI 和 domain of definition：目标输出反向推导只需要哪些源像素，避免处理不会出现在最终结果中的区域"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          evaluate only the pixels that can reach the destination
        </text>
        <g transform="translate(42 84)">
          <rect width="288" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="144" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            source image
          </text>
          <rect x="44" y="62" width="200" height="132" rx="10" fill={C.bg} stroke={C.border} />
          <rect x="92" y="86" width="94" height="82" rx="8" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <text x="139" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.warning}>
            ROI
          </text>
          <text x="139" y="150" textAnchor="middle" fontSize="12" fill={C.secondary}>
            sampler pixels needed
          </text>
          <text x="144" y="226" textAnchor="middle" fontSize="13" fill={C.secondary}>
            outside area stays untouched
          </text>
        </g>
        <Arrow x1={350} x2={402} y1={211} y2={211} color={C.warning} />
        <g transform="translate(418 84)">
          <rect width="308" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="154" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            destination domain
          </text>
          <rect x="54" y="62" width="200" height="132" rx="10" fill={C.bg} stroke={C.border} />
          <rect x="102" y="86" width="104" height="82" rx="8" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="3" />
          <text x="154" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.success}>
            output
          </text>
          <text x="154" y="150" textAnchor="middle" fontSize="12" fill={C.secondary}>
            visible pixels only
          </text>
          <text x="154" y="226" textAnchor="middle" fontSize="13" fill={C.secondary}>
            lazy evaluation keeps CPU free
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch26CentroidReductionDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="质心归约：把掩码像素变成 x 乘 mask、y 乘 mask 和 mask 三个通道，再不断下采样到 1×1，最后相除得到位置和面积"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          reduce a whole mask to one useful pixel
        </text>
        <g transform="translate(30 86)">
          <rect width="184" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="92" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            mask m(x,y)
          </text>
          <rect x="44" y="66" width="96" height="96" rx="8" fill={C.bg} stroke={C.border} />
          <circle cx="92" cy="114" r="30" fill={C.success} fillOpacity="0.8" />
          <text x="92" y="204" textAnchor="middle" fontSize="12" fill={C.secondary}>
            target pixels
          </text>
          <text x="92" y="232" textAnchor="middle" fontSize="12" fill={C.warning}>
            multiply by x,y
          </text>
        </g>
        <Arrow x1={232} x2={270} y1={212} y2={212} color={C.warning} />
        <g transform="translate(276 86)">
          <rect width="184" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="92" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            weighted channels
          </text>
          <rect x="42" y="66" width="100" height="96" rx="8" fill={C.accent} fillOpacity="0.12" stroke={C.accent} strokeWidth="3" />
          <text x="92" y="98" textAnchor="middle" fontSize="13" fill={C.accent}>
            x · m
          </text>
          <text x="92" y="126" textAnchor="middle" fontSize="13" fill={C.accent}>
            y · m
          </text>
          <text x="92" y="154" textAnchor="middle" fontSize="13" fill={C.accent}>
            m
          </text>
          <text x="92" y="204" textAnchor="middle" fontSize="12" fill={C.secondary}>
            one vector per pixel
          </text>
          <text x="92" y="232" textAnchor="middle" fontSize="12" fill={C.accent}>
            downsample repeatedly
          </text>
        </g>
        <Arrow x1={478} x2={516} y1={212} y2={212} color={C.accent} />
        <g transform="translate(522 86)">
          <rect width="204" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="102" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            1 × 1 result
          </text>
          <rect x="54" y="66" width="96" height="96" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="3" />
          <text x="102" y="100" textAnchor="middle" fontSize="13" fill={C.success}>
            sum(xm) / sum(m)
          </text>
          <text x="102" y="128" textAnchor="middle" fontSize="13" fill={C.success}>
            sum(ym) / sum(m)
          </text>
          <text x="102" y="156" textAnchor="middle" fontSize="13" fill={C.warning}>
            area = sum(m)
          </text>
          <text x="102" y="204" textAnchor="middle" fontSize="12" fill={C.secondary}>
            centroid + area
          </text>
          <text x="102" y="232" textAnchor="middle" fontSize="12" fill={C.success}>
            CPU receives three values
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch26CompositeDiagram() {
  return (
    <Figure>
      <Frame
        height={420}
        label="叠加阶段：把 1×1 质心和面积传给 overlay kernel，位置移动到质心，大小按面积平方根缩放，再用预乘 alpha 合成"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          location and area drive the overlay
        </text>
        <g transform="translate(36 84)">
          <rect width="210" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="105" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            video + centroid
          </text>
          <rect x="38" y="64" width="134" height="112" rx="10" fill={C.bg} stroke={C.border} />
          <Blob cx={105} cy={120} r={42} />
          <circle cx="105" cy="120" r="6" fill={C.warning} />
          <text x="105" y="212" textAnchor="middle" fontSize="13" fill={C.secondary}>
            l.xy = center, l.z = area
          </text>
          <text x="105" y="238" textAnchor="middle" fontSize="12" fill={C.warning}>
            sqrt(area) estimates scale
          </text>
        </g>
        <Arrow x1={264} x2={306} y1={211} y2={211} color={C.warning} />
        <g transform="translate(322 84)">
          <rect width="180" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="90" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            translate + scale
          </text>
          <path d="M 44 188 C 68 92 115 92 142 188" fill="none" stroke={C.accent} strokeWidth="4" />
          <path d="M 66 168 C 80 116 105 116 120 168" fill="none" stroke={C.success} strokeWidth="4" />
          <text x="90" y="220" textAnchor="middle" fontSize="12" fill={C.secondary}>
            overlay centered on l.xy
          </text>
          <text x="90" y="244" textAnchor="middle" fontSize="12" fill={C.accent}>
            size follows object area
          </text>
        </g>
        <Arrow x1={520} x2={562} y1={211} y2={211} color={C.accent} />
        <g transform="translate(578 84)">
          <rect width="148" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="74" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            composite
          </text>
          <rect x="30" y="68" width="88" height="104" rx="10" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="3" />
          <path d="M 46 152 C 58 98 90 98 104 152" fill="none" stroke={C.success} strokeWidth="4" />
          <text x="74" y="210" textAnchor="middle" fontSize="12" fill={C.secondary}>
            premultiplied alpha
          </text>
          <text x="74" y="236" textAnchor="middle" fontSize="12" fill={C.success}>
            overlay on video
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "mask", caption: "逐像素比较归一化颜色，生成黑白掩码" },
  { label: "reduce", caption: "构造带权坐标通道，反复下采样到 1×1" },
  { label: "overlay", caption: "按质心定位、按面积平方根缩放，再合成叠加图" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  mask: "逐像素比较归一化颜色，生成黑白掩码",
  reduce: "构造带权坐标通道，反复下采样到 1×1",
  overlay: "按质心定位、按面积平方根缩放，再合成叠加图",
};

export function GpuGems3Ch26PipelineDiagram() {
  const maskRef = useRef<SVGGElement>(null);
  const reduceRef = useRef<SVGGElement>(null);
  const overlayRef = useRef<SVGGElement>(null);
  const refs = [maskRef, reduceRef, overlayRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.32, 1], duration: T * 0.45 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        height={438}
        label="颜色目标检测三步管线：生成掩码、归约得到质心和面积、将图像叠加到目标位置"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          color detection as a multipass GPU pipeline
        </text>
        <g ref={maskRef} style={{ opacity: 0.32 }}>
          <rect x="34" y="88" width="204" height="246" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="136" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            1 · mask
          </text>
          <rect x="82" y="150" width="108" height="72" rx="9" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="3" />
          <circle cx="136" cy="186" r="24" fill={C.success} fillOpacity="0.8" />
          <text x="136" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>
            color → binary image
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={211} y2={211} color={C.warning} />
        <g ref={reduceRef} style={{ opacity: 0.32 }}>
          <rect x="314" y="88" width="204" height="246" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="416" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            2 · reduce
          </text>
          <rect x="362" y="150" width="108" height="72" rx="9" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="3" />
          <text x="416" y="183" textAnchor="middle" fontSize="13" fill={C.accent}>
            x m, y m, m
          </text>
          <text x="416" y="207" textAnchor="middle" fontSize="13" fill={C.accent}>
            → 1 × 1
          </text>
          <text x="416" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>
            centroid + area
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={211} y2={211} color={C.accent} />
        <g ref={overlayRef} style={{ opacity: 0.32 }}>
          <rect x="594" y="88" width="122" height="246" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="655" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            3 · overlay
          </text>
          <path d="M 620 242 C 634 172 676 172 690 242" fill="none" stroke={C.success} strokeWidth="4" />
          <circle cx="655" cy="204" r="6" fill={C.warning} />
          <text x="655" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>
            position + scale
          </text>
        </g>
        <rect x="34" y="360" width="682" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="382" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the GPU returns a tiny statistic, leaving video decode and encode to the CPU
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察整帧视频如何变成一个可以驱动交互叠加的质心与面积。"
      />
    </Figure>
  );
}

type TargetColor = "blue" | "green" | "red";
type NoiseMode = "clean" | "noisy";
type ReduceMode = "single" | "multipass";
type OverlayMode = "duck" | "marker";

const DEFAULTS = {
  noise: "clean" as NoiseMode,
  overlay: "duck" as OverlayMode,
  reduce: "multipass" as ReduceMode,
  target: "green" as TargetColor,
  threshold: 34,
};

const TARGET_TONES: Record<TargetColor, string> = {
  blue: C.accent,
  green: C.success,
  red: C.warning,
};

export function GpuGems3Ch26ColorDetectionLab() {
  const [noise, setNoise] = useState<NoiseMode>(DEFAULTS.noise);
  const [overlay, setOverlay] = useState<OverlayMode>(DEFAULTS.overlay);
  const [reduce, setReduce] = useState<ReduceMode>(DEFAULTS.reduce);
  const [target, setTarget] = useState<TargetColor>(DEFAULTS.target);
  const [threshold, setThreshold] = useState(DEFAULTS.threshold);

  const result = useMemo(() => {
    const noisePenalty = noise === "noisy" ? Math.max(0, 12 - threshold * 0.16) : 0;
    const strictness = Math.max(0.35, Math.min(1, threshold / 48));
    const maskArea = Math.round((51 * strictness + noisePenalty) * 10) / 10;
    const centroidX = Math.round((49 + (target === "blue" ? -5 : target === "red" ? 5 : 0)) * 10) / 10;
    const centroidY = Math.round((47 + (noise === "noisy" ? 3 : 0)) * 10) / 10;
    const overlayScale = Math.round(Math.sqrt(maskArea / 51) * 100) / 100;
    const passes = reduce === "multipass" ? 5 : 1;
    const backgroundRisk = noise === "noisy" && threshold > 40 ? "high" : "controlled";
    return {
      backgroundRisk,
      centroidX,
      centroidY,
      maskArea,
      overlayScale,
      passes,
      tone: TARGET_TONES[target],
    };
  }, [noise, reduce, target, threshold]);

  const reset = () => {
    setNoise(DEFAULTS.noise);
    setOverlay(DEFAULTS.overlay);
    setReduce(DEFAULTS.reduce);
    setTarget(DEFAULTS.target);
    setThreshold(DEFAULTS.threshold);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 26
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Color Detection and Tracking Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整目标色、阈值、噪声与归约方式，观察掩码面积如何驱动质心定位和叠加图大小。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg
              viewBox="0 0 730 360"
              role="img"
              aria-label={`颜色检测实验：目标色 ${target}，阈值 ${threshold}，${noise} 噪声，${reduce} 归约，质心 ${result.centroidX}% ${result.centroidY}%，面积 ${result.maskArea}%`}
              className="mx-auto block h-auto w-full"
            >
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
                video → color mask → centroid → {overlay === "duck" ? "duck" : "marker"} overlay
              </text>
              <rect x="34" y="56" width="662" height="204" rx="12" fill={C.surface} stroke={C.border} />
              <rect x="62" y="82" width="282" height="150" rx="10" fill={C.bg} stroke={C.border} />
              <text x="203" y="106" textAnchor="middle" fontSize="13" fill={C.secondary}>
                input frame
              </text>
              <Blob cx={203} cy={158} noise={noise === "noisy"} tone={result.tone} />
              <circle cx="124" cy="126" r="10" fill={C.accent} fillOpacity="0.35" />
              <circle cx="284" cy="204" r="9" fill={C.warning} fillOpacity="0.4" />
              <rect x="386" y="82" width="282" height="150" rx="10" fill={C.bg} stroke={C.border} />
              <text x="527" y="106" textAnchor="middle" fontSize="13" fill={C.secondary}>
                tracked result
              </text>
              <circle cx={386 + result.centroidX * 2.8} cy={82 + result.centroidY * 1.5} r={18 + result.overlayScale * 18} fill={result.tone} fillOpacity="0.25" stroke={result.tone} strokeWidth="3" />
              <circle cx={386 + result.centroidX * 2.8} cy={82 + result.centroidY * 1.5} r="6" fill={C.warning} />
              {overlay === "duck" ? (
                <path
                  d={`M ${386 + result.centroidX * 2.8 - 22} ${82 + result.centroidY * 1.5 + 12} q 20 -40 44 0 q -20 18 -44 0`}
                  fill={C.warning}
                  fillOpacity="0.78"
                />
              ) : (
                <path
                  d={`M ${386 + result.centroidX * 2.8 - 14} ${82 + result.centroidY * 1.5} h 28 M ${386 + result.centroidX * 2.8} ${82 + result.centroidY * 1.5 - 14} v 28`}
                  stroke={C.warning}
                  strokeWidth="4"
                />
              )}
              <text x="203" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
                target + threshold
              </text>
              <text x="527" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
                center + sqrt(area) scale
              </text>
              <text x="365" y="294" textAnchor="middle" fontSize="13" fill={C.secondary}>
                mask area {result.maskArea}% · centroid {result.centroidX}% / {result.centroidY}% · {result.passes} reduction pass{result.passes > 1 ? "es" : ""}
              </text>
              <text x="365" y="322" textAnchor="middle" fontSize="13" fill={result.backgroundRisk === "high" ? C.danger : C.success}>
                threshold {threshold} · {result.backgroundRisk === "high" ? "noise leakage risk is high" : "color distance is controlled"}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="掩码面积" tone={C.success} value={`${result.maskArea}%`} />
            <Metric label="质心 X / Y" tone={C.accent} value={`${result.centroidX}% / ${result.centroidY}%`} />
            <Metric label="叠加缩放" tone={C.warning} value={`${result.overlayScale}×`} />
            <Metric label="归约 pass" tone={C.secondary} value={`${result.passes}`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch26-target">
            target color
            <select
              id="ch26-target"
              value={target}
              onChange={(event) => setTarget(event.target.value as TargetColor)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="green">green ball</option>
              <option value="blue">blue marker</option>
              <option value="red">red prop</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch26-noise">
            frame noise
            <select
              id="ch26-noise"
              value={noise}
              onChange={(event) => setNoise(event.target.value as NoiseMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="clean">controlled lighting</option>
              <option value="noisy">extra similar colors</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch26-reduce">
            centroid reduction
            <select
              id="ch26-reduce"
              value={reduce}
              onChange={(event) => setReduce(event.target.value as ReduceMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="multipass">multipass downsample</option>
              <option value="single">single pass preview</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch26-overlay">
            overlay
            <select
              id="ch26-overlay"
              value={overlay}
              onChange={(event) => setOverlay(event.target.value as OverlayMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="duck">duck image</option>
              <option value="marker">crosshair marker</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch26-threshold">
            color threshold: {threshold}
            <input
              id="ch26-threshold"
              type="range"
              min="8"
              max="64"
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
