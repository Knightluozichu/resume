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

function SceneShape({
  blur = 0,
  fill = C.accent,
  opacity = 0.86,
  x,
  y,
}: {
  blur?: number;
  fill?: string;
  opacity?: number;
  x: number;
  y: number;
}) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y - 26} r={24 + blur} fill={fill} fillOpacity="0.84" />
      <path
        d={`M ${x - 38 - blur} ${y + 54 + blur} Q ${x} ${y - 6} ${x + 38 + blur} ${y + 54 + blur} Z`}
        fill={fill}
        fillOpacity="0.66"
      />
      <line x1={x - 17 - blur} x2={x - 17 - blur} y1={y + 8} y2={y + 46 + blur} stroke={C.text} strokeWidth="5" />
      <line x1={x + 17 + blur} x2={x + 17 + blur} y1={y + 8} y2={y + 46 + blur} stroke={C.text} strokeWidth="5" />
    </g>
  );
}

function SoftCircle({
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
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={color} fillOpacity="0.1" />
      <circle cx={cx} cy={cy} r={radius * 0.62} fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 5" />
      <circle cx={cx} cy={cy} r="5" fill={color} />
    </g>
  );
}

export function GpuGems3Ch28CocDiagram() {
  return (
    <Figure>
      <Frame
        height={452}
        label="薄透镜与景深：焦平面上的点形成清晰点，焦平面前后形成不同大小的圆形弥散圈"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          focus is a plane; blur is a circle with a radius
        </text>
        <g transform="translate(34 82)">
          <rect width="198" height="280" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="99" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            foreground
          </text>
          <line x1="56" x2="142" y1="124" y2="124" stroke={C.warning} strokeWidth="3" />
          <line x1="99" x2="99" y1="70" y2="176" stroke={C.border} strokeWidth="2" />
          <SoftCircle cx={99} cy={214} color={C.warning} radius={46} />
          <text x="99" y="260" textAnchor="middle" fontSize="13" fill={C.warning}>
            large CoC
          </text>
        </g>
        <Arrow x1={250} x2={286} y1={222} y2={222} color={C.warning} />
        <g transform="translate(298 82)">
          <rect width="198" height="280" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="99" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            focal plane
          </text>
          <line x1="36" x2="162" y1="124" y2="124" stroke={C.success} strokeWidth="3" />
          <line x1="99" x2="99" y1="70" y2="176" stroke={C.border} strokeWidth="2" />
          <circle cx="99" cy="214" r="7" fill={C.success} />
          <circle cx="99" cy="214" r="18" fill="none" stroke={C.success} strokeWidth="2" strokeDasharray="4 4" />
          <text x="99" y="260" textAnchor="middle" fontSize="13" fill={C.success}>
            tiny CoC = sharp
          </text>
        </g>
        <Arrow x1={514} x2={550} y1={222} y2={222} color={C.accent} />
        <g transform="translate(562 82)">
          <rect width="164" height="280" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="82" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            background
          </text>
          <line x1="30" x2="134" y1="124" y2="124" stroke={C.accent} strokeWidth="3" />
          <line x1="82" x2="82" y1="70" y2="176" stroke={C.border} strokeWidth="2" />
          <SoftCircle cx={82} cy={214} color={C.accent} radius={30} />
          <text x="82" y="260" textAnchor="middle" fontSize="13" fill={C.accent}>
            bounded far CoC
          </text>
        </g>
        <rect x="34" y="390" width="692" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>
          aperture controls how quickly the circle grows away from the focal plane
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch28DownsampleDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="景深算法的前两阶段：把颜色和近景弥散圈下采样到四分之一分辨率，再对近景弥散圈做高斯模糊"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          spend blur work where the foreground CoC needs it
        </text>
        <g transform="translate(28 84)">
          <rect width="188" height="260" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
          <text x="94" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            full frame
          </text>
          <rect x="30" y="70" width="128" height="106" rx="9" fill={C.bg} stroke={C.border} />
          {Array.from({ length: 12 }, (_, index) => {
            const x = 48 + (index % 4) * 28;
            const y = 88 + Math.floor(index / 4) * 28;
            return <circle key={`full-${index}`} cx={x} cy={y} r="7" fill={index % 3 === 0 ? C.warning : C.accent} fillOpacity="0.66" />;
          })}
          <text x="94" y="218" textAnchor="middle" fontSize="13" fill={C.secondary}>
            color + depth
          </text>
          <text x="94" y="244" textAnchor="middle" fontSize="12" fill={C.secondary}>
            expensive resolution
          </text>
        </g>
        <Arrow x1={236} x2={274} y1={214} y2={214} color={C.accent} />
        <g transform="translate(280 84)">
          <rect width="188" height="260" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="94" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            quarter resolution
          </text>
          <rect x="48" y="78" width="92" height="76" rx="9" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
          {Array.from({ length: 4 }, (_, index) => (
            <circle key={`quarter-${index}`} cx={70 + (index % 2) * 48} cy={100 + Math.floor(index / 2) * 34} r="11" fill={index % 2 ? C.warning : C.accent} fillOpacity="0.72" />
          ))}
          <text x="94" y="198" textAnchor="middle" fontSize="13" fill={C.accent}>
            4×4 source region
          </text>
          <text x="94" y="224" textAnchor="middle" fontSize="12" fill={C.secondary}>
            fewer target pixels
          </text>
        </g>
        <Arrow x1={488} x2={526} y1={214} y2={214} color={C.warning} />
        <g transform="translate(532 84)">
          <rect width="198" height="260" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="99" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            blur near CoC
          </text>
          <rect x="32" y="70" width="134" height="106" rx="9" fill={C.bg} stroke={C.border} />
          <circle cx="68" cy="112" r="24" fill={C.warning} fillOpacity="0.18" />
          <circle cx="99" cy="124" r="34" fill={C.warning} fillOpacity="0.16" />
          <circle cx="131" cy="112" r="24" fill={C.warning} fillOpacity="0.18" />
          <text x="99" y="218" textAnchor="middle" fontSize="13" fill={C.warning}>
            Gaussian blur
          </text>
          <text x="99" y="244" textAnchor="middle" fontSize="12" fill={C.secondary}>
            smooth neighboring CoCs
          </text>
        </g>
        <rect x="28" y="374" width="704" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="396" textAnchor="middle" fontSize="13" fill={C.secondary}>
          downsampled work makes a large blur radius affordable
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch28EdgeContinuityDiagram() {
  const panels = [
    { color: C.danger, label: "raw edge", note: "hard step", radius: 14 },
    { color: C.warning, label: "max neighbor", note: "choose larger", radius: 27 },
    { color: C.success, label: "final small blur", note: "soft transition", radius: 22 },
  ];
  return (
    <Figure>
      <Frame
        height={414}
        label="景深边缘连续性修正：先观察两个不同弥散圈的硬边，再取相邻较大半径，最后做一次小模糊"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          make CoC edges continuous before the final composite
        </text>
        {panels.map((panel, index) => {
          const x = 30 + index * 244;
          return (
            <g key={panel.label} transform={`translate(${x} 82)`}>
              <rect width="214" height="242" rx="14" fill={C.surface} stroke={panel.color} strokeWidth="2" />
              <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
                {panel.label}
              </text>
              <rect x="28" y="70" width="158" height="86" rx="9" fill={C.bg} stroke={C.border} />
              <rect x="28" y="70" width="78" height="86" rx="9" fill={C.accent} fillOpacity="0.42" />
              <rect x="106" y="70" width="80" height="86" fill={C.warning} fillOpacity="0.26" />
              <line x1="106" x2="106" y1="70" y2="156" stroke={panel.color} strokeWidth="4" strokeDasharray={index === 0 ? undefined : "7 5"} />
              <SoftCircle cx={index === 0 ? 76 : 106} cy={204} color={panel.color} radius={panel.radius} />
              <text x="107" y="236" textAnchor="middle" fontSize="13" fill={panel.color}>
                {panel.note}
              </text>
            </g>
          );
        })}
        <Arrow x1={252} x2={266} y1={204} y2={204} color={C.warning} />
        <Arrow x1={496} x2={510} y1={204} y2={204} color={C.success} />
        <text x="380" y="362" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the final blur removes ringing without searching every neighbor
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch28CompositeDiagram() {
  return (
    <Figure>
      <Frame
        height={420}
        label="最终景深合成：根据前景和背景弥散圈，在清晰、小模糊和大模糊图像之间做可变宽度插值"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          variable-width blur selects a level for each pixel
        </text>
        <g transform="translate(28 84)">
          <rect width="200" height="258" rx="14" fill={C.surface} stroke={C.border} strokeWidth="2" />
          <text x="100" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            blur levels
          </text>
          <rect x="34" y="70" width="132" height="42" rx="8" fill={C.success} fillOpacity="0.22" stroke={C.success} />
          <rect x="34" y="124" width="132" height="42" rx="8" fill={C.accent} fillOpacity="0.25" stroke={C.accent} />
          <rect x="34" y="178" width="132" height="42" rx="8" fill={C.warning} fillOpacity="0.27" stroke={C.warning} />
          <text x="100" y="96" textAnchor="middle" fontSize="13" fill={C.success}>sharp</text>
          <text x="100" y="150" textAnchor="middle" fontSize="13" fill={C.accent}>medium</text>
          <text x="100" y="204" textAnchor="middle" fontSize="13" fill={C.warning}>large</text>
        </g>
        <Arrow x1={252} x2={290} y1={214} y2={214} color={C.accent} />
        <g transform="translate(296 84)">
          <rect width="206" height="258" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="103" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            CoC weights
          </text>
          <path d="M 42 214 C 66 120 132 120 166 214" fill="none" stroke={C.accent} strokeWidth="4" />
          <circle cx="58" cy="206" r="9" fill={C.success} />
          <circle cx="104" cy="160" r="9" fill={C.accent} />
          <circle cx="148" cy="206" r="9" fill={C.warning} />
          <text x="103" y="86" textAnchor="middle" fontSize="13" fill={C.secondary}>
            near CoC / far CoC
          </text>
          <text x="103" y="244" textAnchor="middle" fontSize="12" fill={C.accent}>
            lerp weights sum to one
          </text>
        </g>
        <Arrow x1={526} x2={564} y1={214} y2={214} color={C.success} />
        <g transform="translate(570 84)">
          <rect width="160" height="258" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="80" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            final frame
          </text>
          <rect x="30" y="70" width="100" height="104" rx="10" fill={C.bg} stroke={C.border} />
          <circle cx="68" cy="112" r="17" fill={C.success} fillOpacity="0.72" />
          <circle cx="108" cy="140" r="30" fill={C.warning} fillOpacity="0.22" />
          <text x="80" y="214" textAnchor="middle" fontSize="13" fill={C.success}>
            crisp focus
          </text>
          <text x="80" y="240" textAnchor="middle" fontSize="12" fill={C.secondary}>
            blur follows CoC
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "coc", caption: "从深度计算近景与远景的弥散圈" },
  { label: "downsample", caption: "把颜色与近景 CoC 下采样到四分之一分辨率" },
  { label: "smooth", caption: "对近景 CoC 做大范围高斯模糊并修正边缘连续性" },
  { label: "composite", caption: "按可变宽度在清晰、中等和大模糊图之间插值" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  coc: "从深度计算近景与远景的弥散圈",
  composite: "按可变宽度在清晰、中等和大模糊图之间插值",
  downsample: "把颜色与近景 CoC 下采样到四分之一分辨率",
  smooth: "对近景 CoC 做大范围高斯模糊并修正边缘连续性",
};

export function GpuGems3Ch28PipelineDiagram() {
  const cocRef = useRef<SVGGElement>(null);
  const downsampleRef = useRef<SVGGElement>(null);
  const smoothRef = useRef<SVGGElement>(null);
  const compositeRef = useRef<SVGGElement>(null);
  const refs = [cocRef, downsampleRef, smoothRef, compositeRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.3, 1], duration: T * 0.42 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        height={458}
        label="实用后处理景深四阶段：计算弥散圈、下采样、平滑近景弥散圈、可变宽度合成"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          practical depth of field in four passes
        </text>
        <g ref={cocRef} style={{ opacity: 0.3 }}>
          <rect x="26" y="88" width="164" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · CoC</text>
          <SoftCircle cx={108} cy={190} color={C.warning} radius={32} />
          <text x="108" y="278" textAnchor="middle" fontSize="13" fill={C.warning}>depth → radius</text>
          <text x="108" y="306" textAnchor="middle" fontSize="12" fill={C.secondary}>near + far</text>
        </g>
        <Arrow x1={206} x2={232} y1={214} y2={214} color={C.warning} />
        <g ref={downsampleRef} style={{ opacity: 0.3 }}>
          <rect x="244" y="88" width="164" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · shrink</text>
          <rect x="280" y="160" width="92" height="72" rx="9" fill={C.accent} fillOpacity="0.16" stroke={C.accent} />
          <circle cx="305" cy="182" r="10" fill={C.accent} />
          <circle cx="345" cy="210" r="16" fill={C.warning} fillOpacity="0.52" />
          <text x="326" y="278" textAnchor="middle" fontSize="13" fill={C.accent}>quarter target</text>
          <text x="326" y="306" textAnchor="middle" fontSize="12" fill={C.secondary}>color + CoC</text>
        </g>
        <Arrow x1={424} x2={450} y1={214} y2={214} color={C.accent} />
        <g ref={smoothRef} style={{ opacity: 0.3 }}>
          <rect x="462" y="88" width="164" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · smooth</text>
          <circle cx="544" cy="194" r="38" fill={C.success} fillOpacity="0.14" />
          <circle cx="516" cy="194" r="22" fill={C.success} fillOpacity="0.12" />
          <circle cx="572" cy="194" r="22" fill={C.success} fillOpacity="0.12" />
          <text x="544" y="278" textAnchor="middle" fontSize="13" fill={C.success}>Gaussian CoC</text>
          <text x="544" y="306" textAnchor="middle" fontSize="12" fill={C.secondary}>soft edges</text>
        </g>
        <Arrow x1={642} x2={668} y1={214} y2={214} color={C.success} />
        <g ref={compositeRef} style={{ opacity: 0.3 }}>
          <rect x="680" y="88" width="54" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="707" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <rect x="696" y="166" width="22" height="60" rx="5" fill={C.warning} fillOpacity="0.4" />
          <text x="707" y="278" textAnchor="middle" fontSize="12" fill={C.warning}>mix</text>
        </g>
        <rect x="26" y="376" width="708" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          optimize the largest blur where the image is already quarter-sized
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察深度如何变成弥散圈，再变成平滑且可控的最终合成。"
      />
    </Figure>
  );
}

type FocusScene = "balanced" | "foreground" | "background";
type BlurStrategy = "stochastic" | "smooth";
type ResolutionMode = "quarter" | "full";
type ApertureMode = "wide" | "small";

const DEFAULTS = {
  aperture: "wide" as ApertureMode,
  focus: 50,
  resolution: "quarter" as ResolutionMode,
  scene: "balanced" as FocusScene,
  strategy: "smooth" as BlurStrategy,
};

function sceneLabel(scene: FocusScene) {
  if (scene === "foreground") return "near object";
  if (scene === "background") return "far object";
  return "balanced scene";
}

export function GpuGems3Ch28DepthOfFieldLab() {
  const [aperture, setAperture] = useState<ApertureMode>(DEFAULTS.aperture);
  const [focus, setFocus] = useState(DEFAULTS.focus);
  const [resolution, setResolution] = useState<ResolutionMode>(DEFAULTS.resolution);
  const [scene, setScene] = useState<FocusScene>(DEFAULTS.scene);
  const [strategy, setStrategy] = useState<BlurStrategy>(DEFAULTS.strategy);

  const result = useMemo(() => {
    const apertureScale = aperture === "wide" ? 1 : 0.55;
    const foregroundDistance = scene === "foreground" ? 29 : scene === "background" ? 46 : 36;
    const backgroundDistance = scene === "background" ? 84 : scene === "foreground" ? 108 : 96;
    const nearCoc = Math.max(0, Math.round(Math.abs(focus - foregroundDistance) * apertureScale * 0.8));
    const farCoc = Math.max(0, Math.round(Math.abs(backgroundDistance - focus) * apertureScale * 0.28));
    const blurRadius = strategy === "smooth" ? Math.max(nearCoc, farCoc) : Math.max(nearCoc - 4, farCoc);
    const passes = resolution === "quarter" ? (strategy === "smooth" ? 5 : 3) : strategy === "smooth" ? 8 : 5;
    const artifactRisk = strategy === "stochastic" && nearCoc > 20 ? "ringing" : nearCoc > 34 ? "haze" : "controlled";
    return {
      artifactRisk,
      backgroundDistance,
      blurRadius,
      farCoc,
      foregroundDistance,
      nearCoc,
      passes,
    };
  }, [aperture, focus, resolution, scene, strategy]);

  const reset = () => {
    setAperture(DEFAULTS.aperture);
    setFocus(DEFAULTS.focus);
    setResolution(DEFAULTS.resolution);
    setScene(DEFAULTS.scene);
    setStrategy(DEFAULTS.strategy);
  };

  const focusX = 88 + focus * 5.2;
  const foregroundBlur = Math.min(22, Math.round(result.nearCoc * 0.42));
  const backgroundBlur = Math.min(15, Math.round(result.farCoc * 0.38));

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 28
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Practical Depth of Field Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整焦点、光圈、场景距离和 CoC 算法，比较前景、焦平面与背景的模糊半径及伪影风险。
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
              viewBox="0 0 730 398"
              role="img"
              aria-label={`景深实验：${sceneLabel(scene)}，焦点 ${focus}，光圈 ${aperture === "wide" ? "wide" : "small"}，前景 CoC ${result.nearCoc}，背景 CoC ${result.farCoc}，${result.artifactRisk}`}
              className="mx-auto block h-auto w-full"
            >
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
                depth → circle of confusion → variable blur
              </text>
              <rect x="34" y="56" width="662" height="252" rx="12" fill={C.surface} stroke={C.border} />
              <line x1={focusX} x2={focusX} y1="70" y2="290" stroke={C.success} strokeWidth="3" strokeDasharray="7 5" />
              <text x={focusX} y="88" textAnchor="middle" fontSize="12" fill={C.success}>
                focal plane
              </text>
              <SceneShape x={184} y={196} blur={foregroundBlur} fill={C.warning} opacity={0.82} />
              <SceneShape x={520} y={196} blur={backgroundBlur} fill={C.accent} opacity={0.82} />
              <circle cx={focusX} cy="170" r="15" fill={C.success} fillOpacity="0.84" />
              <path d="M 350 264 Q 365 214 380 264" fill="none" stroke={C.success} strokeWidth="4" />
              <text x="184" y="282" textAnchor="middle" fontSize="12" fill={C.warning}>
                foreground CoC {result.nearCoc}
              </text>
              <text x="520" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>
                background CoC {result.farCoc}
              </text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>
                focus {focus} · blur radius {result.blurRadius}px · {result.passes} passes
              </text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={result.artifactRisk === "controlled" ? C.success : C.warning}>
                {strategy === "smooth" ? "continuous CoC smoothing" : "stochastic neighborhood samples"} · {result.artifactRisk}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="前景 CoC" tone={C.warning} value={`${result.nearCoc}`} />
            <Metric label="背景 CoC" tone={C.accent} value={`${result.farCoc}`} />
            <Metric label="最大模糊半径" tone={C.success} value={`${result.blurRadius}px`} />
            <Metric label="估算 pass" tone={C.secondary} value={`${result.passes}`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch28-focus">
            focal distance: {focus}
            <input
              id="ch28-focus"
              type="range"
              min="20"
              max="80"
              value={focus}
              onChange={(event) => setFocus(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch28-aperture">
            aperture
            <select
              id="ch28-aperture"
              value={aperture}
              onChange={(event) => setAperture(event.target.value as ApertureMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="small">small aperture</option>
              <option value="wide">wide aperture</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch28-scene">
            scene depth
            <select
              id="ch28-scene"
              value={scene}
              onChange={(event) => setScene(event.target.value as FocusScene)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="balanced">balanced foreground/background</option>
              <option value="foreground">near object dominates</option>
              <option value="background">far object dominates</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch28-strategy">
            CoC strategy
            <select
              id="ch28-strategy"
              value={strategy}
              onChange={(event) => setStrategy(event.target.value as BlurStrategy)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="smooth">smooth blur approach</option>
              <option value="stochastic">stochastic samples</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch28-resolution">
            work resolution
            <select
              id="ch28-resolution"
              value={resolution}
              onChange={(event) => setResolution(event.target.value as ResolutionMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="quarter">quarter-resolution CoC</option>
              <option value="full">full-resolution CoC</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
