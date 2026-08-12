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

export function GpuGems3Ch23ResolutionDiagram() {
  return (
    <Figure>
      <Frame
        label="低分辨率粒子渲染：把粒子从完整 frame buffer 缩到更小的 off-screen target，减少粒子片元与混合次数，再放大合成"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          fewer shaded particle pixels, same scene composition
        </text>
        <g transform="translate(40 82)">
          <rect
            x="0"
            y="0"
            width="292"
            height="268"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="146"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            full-resolution target
          </text>
          <rect
            x="42"
            y="62"
            width="208"
            height="142"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          {Array.from({ length: 42 }).map((_, index) => {
            const col = index % 7;
            const row = Math.floor(index / 7);
            return (
              <circle
                key={`full-particle-${index}`}
                cx={56 + col * 29}
                cy={78 + row * 22}
                r={index % 4 === 0 ? 8 : 5}
                fill={C.danger}
                fillOpacity="0.48"
              />
            );
          })}
          <text
            x="146"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            every particle shades many pixels
          </text>
        </g>
        <Arrow x1={358} x2={406} y1={216} y2={216} color={C.warning} />
        <g transform="translate(430 82)">
          <rect
            x="0"
            y="0"
            width="292"
            height="268"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="146"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            off-screen target
          </text>
          <rect
            x="80"
            y="72"
            width="132"
            height="90"
            rx="8"
            fill={C.bg}
            stroke={C.success}
            strokeWidth="2"
          />
          {Array.from({ length: 18 }).map((_, index) => {
            const col = index % 6;
            const row = Math.floor(index / 6);
            return (
              <circle
                key={`small-particle-${index}`}
                cx={92 + col * 22}
                cy={84 + row * 24}
                r={index % 3 === 0 ? 7 : 4}
                fill={C.success}
                fillOpacity="0.54"
              />
            );
          })}
          <path d="M 80 188 L 212 188" stroke={C.accent} strokeWidth="3" />
          <text
            x="146"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            render, then upsample and composite
          </text>
          <text
            x="146"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            low-frequency fog tolerates this scale
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch23DepthCompositeDiagram() {
  return (
    <Figure>
      <Frame
        label="粒子深度合成四步：先渲染实体场景，再下采样 z buffer，粒子在小深度缓冲中测试，最后放大合成"
        height={438}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          depth-aware off-screen composition
        </text>
        <g transform="translate(32 84)">
          <rect
            x="0"
            y="0"
            width="158"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="79"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            1 · solid scene
          </text>
          <rect
            x="32"
            y="76"
            width="94"
            height="104"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 40 166 L 74 108 L 118 166"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1="40"
            y1="166"
            x2="118"
            y2="166"
            stroke={C.warning}
            strokeWidth="4"
          />
          <text
            x="79"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            write main z
          </text>
        </g>
        <Arrow x1={208} x2={236} y1={220} y2={220} />
        <g transform="translate(248 84)">
          <rect
            x="0"
            y="0"
            width="158"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="79"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            2 · downsample
          </text>
          <rect
            x="38"
            y="76"
            width="82"
            height="62"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <path
            d="M 48 126 L 76 94 L 110 126"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
          />
          <Arrow x1={79} x2={79} y1={154} y2={190} color={C.warning} />
          <text
            x="79"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            small depth target
          </text>
        </g>
        <Arrow x1={424} x2={452} y1={220} y2={220} color={C.success} />
        <g transform="translate(464 84)">
          <rect
            x="0"
            y="0"
            width="158"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="79"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3 · particles
          </text>
          <rect
            x="32"
            y="76"
            width="94"
            height="104"
            rx="8"
            fill={C.bg}
            stroke={C.success}
          />
          <circle
            cx="78"
            cy="126"
            r="37"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
            strokeWidth="3"
          />
          <line
            x1="40"
            y1="166"
            x2="116"
            y2="166"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          <text
            x="79"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            test before blend
          </text>
        </g>
        <Arrow x1={640} x2={668} y1={220} y2={220} color={C.accent} />
        <g transform="translate(672 84)">
          <rect
            x="0"
            y="0"
            width="54"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="27"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            4
          </text>
          <rect
            x="13"
            y="90"
            width="28"
            height="74"
            rx="5"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <text
            x="27"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            up
          </text>
        </g>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          depth must be downsampled at the same scale as the particle target
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch23SoftParticleDiagram() {
  return (
    <Figure>
      <Frame
        label="soft particles：比较粒子深度和场景深度，用深度差控制 alpha，在接近实体表面时渐隐而不是硬切"
        height={420}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          turn a hard depth cut into a soft fade
        </text>
        <rect
          x="44"
          y="82"
          width="672"
          height="252"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <path
          d="M 72 286 C 192 250 216 136 332 120 C 432 106 478 188 688 108"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="8 7"
        />
        <circle cx="332" cy="120" r="11" fill={C.danger} />
        <line
          x1="332"
          y1="120"
          x2="332"
          y2="286"
          stroke={C.danger}
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M 72 286 C 192 250 216 136 332 120"
          fill="none"
          stroke={C.success}
          strokeWidth="5"
        />
        <circle cx="238" cy="154" r="30" fill={C.success} fillOpacity="0.2" />
        <circle cx="280" cy="134" r="27" fill={C.success} fillOpacity="0.12" />
        <circle cx="320" cy="122" r="20" fill={C.success} fillOpacity="0.05" />
        <text
          x="174"
          y="310"
          textAnchor="middle"
          fontSize="13"
          fill={C.success}
        >
          far from scene: alpha stays
        </text>
        <text x="510" y="310" textAnchor="middle" fontSize="13" fill={C.danger}>
          near scene: alpha fades
        </text>
        <text
          x="380"
          y="374"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          zFade = saturate(scale × (particleDepth − sceneDepth))
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch23SobelStencilDiagram() {
  return (
    <Figure>
      <Frame
        label="mixed-resolution 修边：在低分辨率颜色与 alpha 上做 Sobel 边缘检测，再用 stencil 只在边缘区域触发全分辨率粒子"
        height={438}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          repair only the edges that low resolution cannot represent
        </text>
        <g transform="translate(36 84)">
          <rect
            x="0"
            y="0"
            width="190"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="95"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            small target
          </text>
          <rect
            x="38"
            y="72"
            width="114"
            height="108"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 46 164 L 84 92 L 144 164"
            fill={C.warning}
            fillOpacity="0.2"
            stroke={C.warning}
            strokeWidth="4"
          />
          <text
            x="95"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            blocky edge
          </text>
        </g>
        <Arrow x1={250} x2={296} y1={220} y2={220} />
        <g transform="translate(312 84)">
          <rect
            x="0"
            y="0"
            width="190"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="95"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            Sobel
          </text>
          <rect
            x="42"
            y="72"
            width="106"
            height="106"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 48 166 L 86 92 L 142 166"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <path
            d="M 48 166 L 142 166"
            stroke={C.danger}
            strokeWidth="5"
            strokeDasharray="8 6"
          />
          <text
            x="95"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            edge mask
          </text>
        </g>
        <Arrow x1={526} x2={572} y1={220} y2={220} color={C.success} />
        <g transform="translate(588 84)">
          <rect
            x="0"
            y="0"
            width="138"
            height="270"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="69"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            stencil
          </text>
          <rect
            x="22"
            y="72"
            width="94"
            height="106"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 28 166 L 64 92 L 110 166"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="4"
          />
          <path
            d="M 30 166 L 110 166"
            stroke={C.danger}
            strokeWidth="5"
            strokeDasharray="7 5"
          />
          <text
            x="69"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            full-res patch
          </text>
        </g>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          image-processing cost stays low because the mask selects only a
          minority of pixels
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "depth", caption: "用主场景 z buffer 建立同尺寸的低分辨率深度" },
  { label: "particle", caption: "粒子在低分辨率目标中做深度测试与混合" },
  { label: "repair", caption: "放大合成，并用边缘 mask 修复高频区域" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  depth: "用主场景 z buffer 建立同尺寸的低分辨率深度",
  particle: "粒子在低分辨率目标中做深度测试与混合",
  repair: "放大合成，并用边缘 mask 修复高频区域",
};

export function GpuGems3Ch23PipelineDiagram() {
  const depthRef = useRef<SVGGElement>(null);
  const particleRef = useRef<SVGGElement>(null);
  const repairRef = useRef<SVGGElement>(null);
  const refs = [depthRef, particleRef, repairRef];
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
        label="高速离屏粒子三步管线：下采样深度，低分辨率粒子渲染，放大合成并按边缘修复"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          off-screen particles in three controlled stages
        </text>
        <g ref={depthRef} style={{ opacity: 0.32 }}>
          <rect
            x="34"
            y="86"
            width="204"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="136"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            depth
          </text>
          <rect
            x="84"
            y="144"
            width="104"
            height="76"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 94 206 L 132 158 L 174 206"
            fill="none"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="136"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            downsample main z
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={210} y2={210} />
        <g ref={particleRef} style={{ opacity: 0.32 }}>
          <rect
            x="314"
            y="86"
            width="204"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="416"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            particle
          </text>
          <rect
            x="362"
            y="146"
            width="108"
            height="74"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="3"
          />
          {Array.from({ length: 8 }).map((_, index) => (
            <circle
              key={`pipeline-particle-${index}`}
              cx={376 + (index % 4) * 26}
              cy={164 + Math.floor(index / 4) * 30}
              r="7"
              fill={C.warning}
              fillOpacity="0.65"
            />
          ))}
          <text
            x="416"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            test + blend small
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={210} y2={210} />
        <g ref={repairRef} style={{ opacity: 0.32 }}>
          <rect
            x="594"
            y="86"
            width="122"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="655"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            repair
          </text>
          <rect
            x="622"
            y="146"
            width="66"
            height="74"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="3"
          />
          <path
            d="M 628 206 L 650 170 L 684 206"
            fill="none"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="655"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            upsample + mask
          </text>
        </g>
        <rect
          x="34"
          y="360"
          width="682"
          height="34"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          spend full-resolution work only where low-resolution sampling exposes
          an edge
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察深度、粒子和修边如何共享同一个混合分辨率预算。"
      />
    </Figure>
  );
}

type RenderMode = "high" | "low" | "mixed";
type DepthMode = "max" | "average";
type SoftMode = "on" | "off";

const DEFAULTS = {
  depth: "max" as DepthMode,
  edgeThreshold: 42,
  mode: "mixed" as RenderMode,
  scale: 4,
  soft: "on" as SoftMode,
};

export function GpuGems3Ch23OffscreenParticleLab() {
  const [scale, setScale] = useState(DEFAULTS.scale);
  const [mode, setMode] = useState<RenderMode>(DEFAULTS.mode);
  const [depth, setDepth] = useState<DepthMode>(DEFAULTS.depth);
  const [soft, setSoft] = useState<SoftMode>(DEFAULTS.soft);
  const [edgeThreshold, setEdgeThreshold] = useState(DEFAULTS.edgeThreshold);

  const result = useMemo(() => {
    const reduction = mode === "high" ? 1 : 1 / (scale * scale);
    const particlePixels = Math.round(46.9 * reduction * 10) / 10;
    const imagePixels =
      mode === "high"
        ? 0
        : Math.round((mode === "mixed" ? 2.4 + scale * 0.2 : 1.8) * 10) / 10;
    const edgeShare =
      mode === "mixed" ? Math.max(4, Math.round(24 - edgeThreshold * 0.25)) : 0;
    const artifactRisk =
      mode === "high"
        ? 4
        : mode === "low"
          ? Math.min(
              82,
              Math.round(28 + scale * 9 + (depth === "average" ? 8 : 0)),
            )
          : Math.min(46, Math.round(14 + scale * 4 + edgeThreshold * 0.08));
    const softNote =
      soft === "on"
        ? "soft depth fade hides hard intersections"
        : "binary depth test can expose a sharp particle edge";
    const note =
      mode === "high"
        ? "完整分辨率最稳，但粒子填充成本会随屏幕覆盖快速上升。"
        : mode === "low"
          ? "低分辨率最省粒子片元，但高频轮廓会出现块状和闪烁。"
          : "混合分辨率把 Sobel + stencil 修复限制在少数边缘像素。";
    return {
      artifactRisk,
      edgeShare,
      imagePixels,
      note,
      particlePixels,
      softNote,
    };
  }, [depth, edgeThreshold, mode, scale, soft]);

  const reset = () => {
    setScale(DEFAULTS.scale);
    setMode(DEFAULTS.mode);
    setDepth(DEFAULTS.depth);
    setSoft(DEFAULTS.soft);
    setEdgeThreshold(DEFAULTS.edgeThreshold);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 23
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Off-Screen Particle Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整分辨率缩放、渲染模式、深度下采样、soft particles
          和边缘阈值，观察粒子片元与图像处理的真实取舍。
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
              viewBox="0 0 730 326"
              role="img"
              aria-label={`离屏粒子实验：${mode} 模式，${scale}x 缩放，${depth} 深度，soft particles ${soft}，粒子像素 ${result.particlePixels} million`}
              className="mx-auto block h-auto w-full"
            >
              <text
                x="365"
                y="24"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                {mode === "high"
                  ? "full-resolution particle shading"
                  : mode === "low"
                    ? "low-resolution particles"
                    : "mixed-resolution edge repair"}
              </text>
              <rect
                x="54"
                y="60"
                width="622"
                height="184"
                rx="12"
                fill={C.surface}
                stroke={C.border}
              />
              <path
                d="M 76 218 C 170 204 192 104 292 104 C 390 104 428 204 648 86"
                fill="none"
                stroke={C.warning}
                strokeWidth="3"
                strokeDasharray="8 7"
              />
              <path
                d="M 76 218 C 170 204 192 104 292 104"
                fill="none"
                stroke={C.success}
                strokeWidth="5"
              />
              {Array.from({
                length: mode === "high" ? 24 : mode === "low" ? 12 : 16,
              }).map((_, index) => {
                const t =
                  (index + 1) /
                  ((mode === "high" ? 24 : mode === "low" ? 12 : 16) + 1);
                const x = 92 + t * 220;
                const y = 210 - t * 86 + ((index % 3) - 1) * 8;
                return (
                  <circle
                    key={`lab-particle-${index}`}
                    cx={x}
                    cy={y}
                    r={mode === "low" ? 8 : 5}
                    fill={mode === "mixed" && index > 10 ? C.accent : C.warning}
                    fillOpacity="0.65"
                  />
                );
              })}
              {mode === "mixed" && (
                <path
                  d="M 288 104 L 376 104"
                  stroke={C.accent}
                  strokeWidth="8"
                  strokeDasharray="10 6"
                />
              )}
              <text
                x="365"
                y="270"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {result.note}
              </text>
              <text
                x="365"
                y="296"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                particle pixels {result.particlePixels}M · image pixels{" "}
                {result.imagePixels}M · edge share {result.edgeShare}% ·{" "}
                {result.softNote}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="粒子像素"
              tone={C.warning}
              value={`${result.particlePixels}M`}
            />
            <Metric
              label="图像处理像素"
              tone={C.accent}
              value={`${result.imagePixels}M`}
            />
            <Metric
              label="边缘修复占比"
              tone={C.success}
              value={`${result.edgeShare}%`}
            />
            <Metric
              label="块状伪影风险"
              tone={result.artifactRisk > 35 ? C.danger : C.success}
              value={`${result.artifactRisk}%`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch23-scale">
            off-screen scale
            <select
              id="ch23-scale"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="1">1× full-size target</option>
              <option value="2">2× downsample</option>
              <option value="4">4× downsample</option>
              <option value="8">8× downsample</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch23-mode">
            render mode
            <select
              id="ch23-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as RenderMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="high">high resolution</option>
              <option value="low">low resolution</option>
              <option value="mixed">mixed resolution + repair</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch23-depth">
            downsampled depth
            <select
              id="ch23-depth"
              value={depth}
              onChange={(event) => setDepth(event.target.value as DepthMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="max">maximum z value</option>
              <option value="average">average z value</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch23-soft">
            soft particles
            <select
              id="ch23-soft"
              value={soft}
              onChange={(event) => setSoft(event.target.value as SoftMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="on">depth fade on</option>
              <option value="off">binary discard</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch23-edge">
            edge threshold: {edgeThreshold}
            <input
              id="ch23-edge"
              type="range"
              min="8"
              max="80"
              value={edgeThreshold}
              onChange={(event) => setEdgeThreshold(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
