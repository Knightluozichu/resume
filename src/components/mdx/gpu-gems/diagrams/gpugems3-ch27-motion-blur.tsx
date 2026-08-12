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

function VelocityArrow({
  color = C.warning,
  length = 58,
  x,
  y,
}: {
  color?: string;
  length?: number;
  x: number;
  y: number;
}) {
  return <Arrow color={color} x1={x} x2={x + length} y1={y} y2={y - 20} />;
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

function SceneObject({
  fill = C.accent,
  opacity = 0.8,
  x,
  y,
}: {
  fill?: string;
  opacity?: number;
  x: number;
  y: number;
}) {
  return (
    <g opacity={opacity}>
      <rect x={x - 34} y={y - 20} width="68" height="40" rx="8" fill={fill} />
      <circle cx={x - 20} cy={y + 23} r="8" fill={C.text} />
      <circle cx={x + 20} cy={y + 23} r="8" fill={C.text} />
      <path d={`M ${x - 22} ${y - 20} l 13 -18 h 18 l 13 18`} fill="none" stroke={C.text} strokeWidth="3" />
    </g>
  );
}

function DepthGrid({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const columns = 5;
  const rows = 3;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" fill={C.surface} stroke={C.border} strokeWidth="2" />
      {Array.from({ length: columns - 1 }, (_, index) => {
        const px = x + (width / columns) * (index + 1);
        return <line key={`col-${px}`} x1={px} x2={px} y1={y} y2={y + height} stroke={C.border} strokeWidth="1" />;
      })}
      {Array.from({ length: rows - 1 }, (_, index) => {
        const py = y + (height / rows) * (index + 1);
        return <line key={`row-${py}`} x1={x} x2={x + width} y1={py} y2={py} stroke={C.border} strokeWidth="1" />;
      })}
      <rect x={x + 42} y={y + 22} width="64" height="42" rx="7" fill={C.accent} fillOpacity="0.3" />
      <rect x={x + 144} y={y + 40} width="42" height="28" rx="7" fill={C.warning} fillOpacity="0.45" />
      <text x={x + width / 2} y={y + height + 24} textAnchor="middle" fontSize="13" fill={C.secondary}>
        one depth value per pixel
      </text>
    </g>
  );
}

export function GpuGems3Ch27DepthReconstructionDiagram() {
  return (
    <Figure>
      <Frame
        height={456}
        label="从深度纹理重建世界坐标：把屏幕像素和深度组成 H，经当前视图投影逆矩阵得到世界位置，再用上一帧矩阵求前一位置"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          depth turns a post-process pixel into a 3D position
        </text>
        <g transform="translate(28 82)">
          <rect width="192" height="278" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="96" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            1 · depth texture
          </text>
          <DepthGrid x={24} y={68} width={144} height={126} />
          <text x="96" y="238" textAnchor="middle" fontSize="13" fill={C.accent}>
            texCoord + zOverW
          </text>
        </g>
        <Arrow x1={236} x2={274} y1={220} y2={220} color={C.accent} />
        <g transform="translate(280 82)">
          <rect width="188" height="278" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="94" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            2 · current frame
          </text>
          <rect x="28" y="68" width="132" height="78" rx="10" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
          <text x="94" y="101" textAnchor="middle" fontSize="14" fill={C.warning}>
            H = (x, y, z, 1)
          </text>
          <text x="94" y="126" textAnchor="middle" fontSize="12" fill={C.secondary}>
            inverse view-projection
          </text>
          <Arrow x1={94} x2={94} y1={158} y2={192} color={C.warning} />
          <circle cx="94" cy="226" r="28" fill={C.accent} fillOpacity="0.24" stroke={C.accent} strokeWidth="3" />
          <text x="94" y="231" textAnchor="middle" fontSize="14" fill={C.accent}>
            world W
          </text>
        </g>
        <Arrow x1={484} x2={522} y1={220} y2={220} color={C.warning} />
        <g transform="translate(528 82)">
          <rect width="204" height="278" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="102" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            3 · previous frame
          </text>
          <rect x="32" y="68" width="140" height="78" rx="10" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
          <text x="102" y="101" textAnchor="middle" fontSize="14" fill={C.success}>
            W × Mₚᵣₑᵥ
          </text>
          <text x="102" y="126" textAnchor="middle" fontSize="12" fill={C.secondary}>
            divide by w
          </text>
          <Arrow x1={102} x2={102} y1={158} y2={192} color={C.success} />
          <circle cx="72" cy="226" r="21" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="3" />
          <circle cx="132" cy="208" r="21" fill={C.success} fillOpacity="0.22" stroke={C.success} strokeWidth="3" />
          <VelocityArrow x={72} y={226} length={46} color={C.warning} />
          <text x="102" y="264" textAnchor="middle" fontSize="13" fill={C.warning}>
            current − previous = velocity
          </text>
        </g>
        <rect x="28" y="390" width="704" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the depth buffer supplies geometry without a second scene render
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch27VelocityFieldDiagram() {
  const arrows = [
    { x: 116, y: 182, length: 30 },
    { x: 198, y: 154, length: 48 },
    { x: 282, y: 206, length: 62 },
    { x: 378, y: 170, length: 78 },
    { x: 486, y: 218, length: 54 },
    { x: 594, y: 160, length: 34 },
  ];
  return (
    <Figure>
      <Frame
        height={390}
        label="屏幕速度场：每个像素的速度向量不同，后处理阶段可以据此沿各自方向采样"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          a velocity field, not one global blur direction
        </text>
        <rect x="34" y="76" width="692" height="234" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
        <path d="M 70 248 C 180 106 278 272 392 138 S 586 104 690 242" fill="none" stroke={C.accent} strokeWidth="4" opacity="0.8" />
        <SceneObject x={380} y={180} fill={C.warning} />
        {arrows.map((item) => (
          <VelocityArrow key={`${item.x}-${item.y}`} x={item.x} y={item.y} length={item.length} />
        ))}
        <circle cx="380" cy="180" r="6" fill={C.success} />
        <text x="380" y="344" textAnchor="middle" fontSize="13" fill={C.secondary}>
          camera motion changes the background field; object motion can add a second field
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch27GatherDiagram() {
  const samples = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <Figure>
      <Frame
        height={414}
        label="沿当前像素的速度方向采样颜色：多个样本落在一条线段上，累加后除以样本数得到运动模糊颜色"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          gather samples along the velocity vector
        </text>
        <rect x="34" y="78" width="692" height="222" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
        <line x1="126" x2="624" y1="192" y2="116" stroke={C.warning} strokeWidth="4" strokeDasharray="10 8" />
        {samples.map((offset, index) => {
          const x = 376 + offset * 68;
          const y = 154 - offset * 10;
          return (
            <g key={`sample-${offset}`}>
              <circle cx={x} cy={y} r={index === 3 ? 18 : 13} fill={index === 3 ? C.success : C.accent} fillOpacity={index === 3 ? 0.9 : 0.55} />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill={C.bg}>
                {index + 1}
              </text>
            </g>
          );
        })}
        <Arrow x1={524} x2={604} y1={130} y2={118} color={C.warning} />
        <text x="380" y="238" textAnchor="middle" fontSize="13" fill={C.secondary}>
          current texel → current texel + velocity → ...
        </text>
        <rect x="176" y="330" width="408" height="38" rx="9" fill={C.accent} fillOpacity="0.12" stroke={C.accent} />
        <text x="380" y="355" textAnchor="middle" fontSize="14" fill={C.accent}>
          final color = sum(sample colors) / numSamples
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch27DynamicMaskDiagram() {
  return (
    <Figure>
      <Frame
        height={432}
        label="动态物体与遮罩：背景使用深度重建的相机速度，动态物体需要独立速度纹理，遮罩可以让选定物体保持清晰"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          merge camera velocity, object velocity, and a blur mask
        </text>
        <g transform="translate(30 82)">
          <rect width="208" height="264" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="104" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            camera field
          </text>
          <rect x="34" y="68" width="140" height="100" rx="10" fill={C.bg} stroke={C.border} />
          <SceneObject x={104} y={120} fill={C.accent} opacity={0.35} />
          <VelocityArrow x={76} y={112} length={58} color={C.accent} />
          <text x="104" y="204" textAnchor="middle" fontSize="13" fill={C.accent}>
            depth → background velocity
          </text>
          <text x="104" y="234" textAnchor="middle" fontSize="12" fill={C.secondary}>
            static geometry works here
          </text>
        </g>
        <Arrow x1={254} x2={292} y1={214} y2={214} color={C.warning} />
        <g transform="translate(298 82)">
          <rect width="208" height="264" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="104" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            dynamic field
          </text>
          <rect x="34" y="68" width="140" height="100" rx="10" fill={C.bg} stroke={C.border} />
          <SceneObject x={104} y={120} fill={C.warning} />
          <VelocityArrow x={76} y={112} length={86} color={C.warning} />
          <text x="104" y="204" textAnchor="middle" fontSize="13" fill={C.warning}>
            current/previous object transforms
          </text>
          <text x="104" y="234" textAnchor="middle" fontSize="12" fill={C.secondary}>
            separate velocity texture
          </text>
        </g>
        <Arrow x1={522} x2={560} y1={214} y2={214} color={C.success} />
        <g transform="translate(566 82)">
          <rect width="164" height="264" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="82" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            mask + composite
          </text>
          <rect x="32" y="68" width="100" height="100" rx="10" fill={C.bg} stroke={C.border} />
          <path d="M 44 148 C 54 94 110 94 120 148" fill="none" stroke={C.accent} strokeWidth="12" opacity="0.35" />
          <SceneObject x={82} y={119} fill={C.success} />
          <circle cx="82" cy="119" r="34" fill="none" stroke={C.success} strokeWidth="3" strokeDasharray="6 5" />
          <text x="82" y="204" textAnchor="middle" fontSize="13" fill={C.success}>
            protected pixels stay crisp
          </text>
          <text x="82" y="234" textAnchor="middle" fontSize="12" fill={C.secondary}>
            blur only where mask allows
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "reconstruct", caption: "从深度和当前逆矩阵恢复每个像素的世界位置" },
  { label: "velocity", caption: "用上一帧视图投影变换世界位置，得到屏幕速度" },
  { label: "gather", caption: "沿速度方向多次采样颜色并求平均，生成模糊结果" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  gather: "沿速度方向多次采样颜色并求平均，生成模糊结果",
  reconstruct: "从深度和当前逆矩阵恢复每个像素的世界位置",
  velocity: "用上一帧视图投影变换世界位置，得到屏幕速度",
};

export function GpuGems3Ch27PipelineDiagram() {
  const reconstructRef = useRef<SVGGElement>(null);
  const velocityRef = useRef<SVGGElement>(null);
  const gatherRef = useRef<SVGGElement>(null);
  const refs = [reconstructRef, velocityRef, gatherRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.3, 1], duration: T * 0.45 },
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
        label="运动模糊后处理三步管线：深度重建、速度计算、沿速度方向采样"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          motion blur as a depth-driven post-process
        </text>
        <g ref={reconstructRef} style={{ opacity: 0.3 }}>
          <rect x="30" y="88" width="210" height="242" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="135" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            1 · reconstruct
          </text>
          <DepthGrid x={62} y={146} width={146} height={96} />
          <text x="135" y="286" textAnchor="middle" fontSize="13" fill={C.accent}>
            depth → world position
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={210} y2={210} color={C.accent} />
        <g ref={velocityRef} style={{ opacity: 0.3 }}>
          <rect x="314" y="88" width="210" height="242" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="419" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            2 · velocity
          </text>
          <circle cx="396" cy="198" r="20" fill={C.accent} fillOpacity="0.45" />
          <circle cx="456" cy="174" r="20" fill={C.success} fillOpacity="0.45" />
          <VelocityArrow x={396} y={198} length={56} color={C.warning} />
          <text x="419" y="286" textAnchor="middle" fontSize="13" fill={C.warning}>
            current − previous
          </text>
        </g>
        <Arrow x1={542} x2={578} y1={210} y2={210} color={C.warning} />
        <g ref={gatherRef} style={{ opacity: 0.3 }}>
          <rect x="598" y="88" width="132" height="242" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="664" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            3 · gather
          </text>
          <line x1="620" x2="704" y1="218" y2="164" stroke={C.warning} strokeWidth="4" strokeDasharray="7 5" />
          <circle cx="628" cy="213" r="9" fill={C.accent} />
          <circle cx="664" cy="190" r="9" fill={C.success} />
          <circle cx="698" cy="168" r="9" fill={C.accent} />
          <text x="664" y="286" textAnchor="middle" fontSize="13" fill={C.success}>
            average samples
          </text>
        </g>
        <rect x="30" y="360" width="700" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="382" textAnchor="middle" fontSize="13" fill={C.secondary}>
          one full-screen pass can reuse an existing depth buffer
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察深度如何变成速度，再变成沿轨迹的颜色平均。"
      />
    </Figure>
  );
}

type MotionMode = "fast" | "slow" | "still";
type ObjectMode = "dynamic" | "static";
type MaskMode = "all" | "protect";
type DepthSource = "alpha" | "texture";

const DEFAULTS = {
  depth: "texture" as DepthSource,
  mask: "protect" as MaskMode,
  motion: "fast" as MotionMode,
  objects: "dynamic" as ObjectMode,
  samples: 8,
};

export function GpuGems3Ch27MotionBlurLab() {
  const [depth, setDepth] = useState<DepthSource>(DEFAULTS.depth);
  const [mask, setMask] = useState<MaskMode>(DEFAULTS.mask);
  const [motion, setMotion] = useState<MotionMode>(DEFAULTS.motion);
  const [objects, setObjects] = useState<ObjectMode>(DEFAULTS.objects);
  const [samples, setSamples] = useState(DEFAULTS.samples);

  const result = useMemo(() => {
    const cameraVelocity = motion === "still" ? 0 : motion === "slow" ? 14 : 34;
    const objectVelocity = objects === "dynamic" ? (motion === "fast" ? 16 : 8) : 0;
    const backgroundBlur = Math.round(cameraVelocity * (samples / 8));
    const objectBlur = mask === "protect" ? 0 : Math.round((cameraVelocity + objectVelocity) * (samples / 8));
    const depthQuality = depth === "texture" ? "stable" : "fallback";
    return {
      backgroundBlur,
      cameraVelocity,
      depthQuality,
      objectBlur,
      objectVelocity,
    };
  }, [depth, mask, motion, objects, samples]);

  const reset = () => {
    setDepth(DEFAULTS.depth);
    setMask(DEFAULTS.mask);
    setMotion(DEFAULTS.motion);
    setObjects(DEFAULTS.objects);
    setSamples(DEFAULTS.samples);
  };

  const blurOpacity = result.backgroundBlur === 0 ? 0.08 : 0.32;
  const objectOpacity = result.objectBlur === 0 ? 0.95 : 0.34;
  const streaks = Array.from({ length: Math.min(5, Math.max(1, Math.ceil(result.backgroundBlur / 9))) }, (_, index) => index);

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 27
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Motion Blur Post-Process Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整相机运动、样本数、动态物体与遮罩，观察速度向量如何改变背景和对象的清晰度。
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
              viewBox="0 0 730 382"
              role="img"
              aria-label={`运动模糊实验：相机速度 ${result.cameraVelocity}，样本 ${samples}，背景模糊 ${result.backgroundBlur}，对象模糊 ${result.objectBlur}，深度来源 ${depthQualityLabel(depth)}`}
              className="mx-auto block h-auto w-full"
            >
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
                depth → velocity → color gather
              </text>
              <rect x="34" y="56" width="662" height="234" rx="12" fill={C.surface} stroke={C.border} />
              <path d="M 58 246 C 170 96 264 270 370 130 S 580 100 674 244" fill="none" stroke={C.accent} strokeWidth="5" opacity={blurOpacity} />
              {streaks.map((index) => (
                <line
                  key={`streak-${index}`}
                  x1={86 + index * 34}
                  x2={58 + index * 34}
                  y1="170"
                  y2="151"
                  stroke={C.accent}
                  strokeWidth="4"
                  opacity={blurOpacity}
                />
              ))}
              <g opacity={objectOpacity}>
                <SceneObject x={438} y={170} fill={C.warning} />
                {result.objectBlur > 0 && <VelocityArrow x={402} y={168} length={82} color={C.warning} />}
              </g>
              {mask === "protect" && (
                <circle cx="438" cy="170" r="48" fill="none" stroke={C.success} strokeWidth="3" strokeDasharray="7 5" />
              )}
              <circle cx="438" cy="170" r="6" fill={C.success} />
              <text x="438" y="254" textAnchor="middle" fontSize="12" fill={mask === "protect" ? C.success : C.warning}>
                {mask === "protect" ? "mask: object stays crisp" : "mask: blur all pixels"}
              </text>
              <text x="365" y="324" textAnchor="middle" fontSize="13" fill={C.secondary}>
                camera velocity {result.cameraVelocity} · {samples} samples · background blur {result.backgroundBlur}px
              </text>
              <text x="365" y="350" textAnchor="middle" fontSize="13" fill={depth === "texture" ? C.success : C.warning}>
                {depthQualityLabel(depth)} · object velocity {result.objectVelocity} · object blur {result.objectBlur}px
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="相机速度" tone={C.accent} value={`${result.cameraVelocity}`} />
            <Metric label="背景模糊长度" tone={C.success} value={`${result.backgroundBlur}px`} />
            <Metric label="对象模糊长度" tone={C.warning} value={`${result.objectBlur}px`} />
            <Metric label="深度路径" tone={depth === "texture" ? C.success : C.warning} value={result.depthQuality} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch27-motion">
            camera motion
            <select
              id="ch27-motion"
              value={motion}
              onChange={(event) => setMotion(event.target.value as MotionMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="still">stationary camera</option>
              <option value="slow">slow pan</option>
              <option value="fast">fast pan</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch27-samples">
            gather samples: {samples}
            <input
              id="ch27-samples"
              type="range"
              min="4"
              max="16"
              step="4"
              value={samples}
              onChange={(event) => setSamples(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch27-objects">
            scene objects
            <select
              id="ch27-objects"
              value={objects}
              onChange={(event) => setObjects(event.target.value as ObjectMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="static">static geometry</option>
              <option value="dynamic">dynamic object</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch27-mask">
            blur mask
            <select
              id="ch27-mask"
              value={mask}
              onChange={(event) => setMask(event.target.value as MaskMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="protect">protect selected object</option>
              <option value="all">blur every pixel</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch27-depth">
            depth source
            <select
              id="ch27-depth"
              value={depth}
              onChange={(event) => setDepth(event.target.value as DepthSource)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="texture">sample depth texture</option>
              <option value="alpha">fallback color alpha</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

function depthQualityLabel(depth: DepthSource) {
  return depth === "texture" ? "depth texture: stable reconstruction" : "color alpha fallback: platform-dependent";
}
