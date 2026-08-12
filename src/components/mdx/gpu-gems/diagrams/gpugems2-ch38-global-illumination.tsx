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

export function GpuGems2Ch38DirectIndirectDiagram() {
  return (
    <Figure>
      <Frame label="直接光与全局光照对比：左侧只有光源直达表面，右侧还显示光线从墙壁反射后照亮可见点的间接光">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          只看直达光，房间会失去反射带来的亮度
        </text>
        <rect
          x="46"
          y="76"
          width="300"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="196"
          y="108"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          direct illumination
        </text>
        <path
          d="M82 294 L142 158 L304 158 L304 294 Z"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle
          cx="112"
          cy="120"
          r="18"
          fill={C.warning}
          fillOpacity="0.28"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text x="112" y="124" textAnchor="middle" fontSize="11" fill={C.text}>
          light
        </text>
        <circle cx="215" cy="244" r="8" fill={C.success} />
        <Arrow x1={124} y1={132} x2={207} y2={237} color={C.warning} />
        <text
          x="210"
          y="332"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          光源 → 表面
        </text>
        <Arrow x1={370} y1={218} x2={430} y2={218} color={C.success} />
        <text
          x="400"
          y="194"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          加入反射
        </text>
        <rect
          x="414"
          y="76"
          width="300"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="564"
          y="108"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          indirect illumination
        </text>
        <path
          d="M450 294 L510 158 L672 158 L672 294 Z"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle
          cx="482"
          cy="120"
          r="18"
          fill={C.warning}
          fillOpacity="0.28"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text x="482" y="124" textAnchor="middle" fontSize="11" fill={C.text}>
          light
        </text>
        <circle cx="584" cy="240" r="8" fill={C.success} />
        <Arrow x1={496} y1={130} x2={552} y2={197} color={C.warning} />
        <Arrow x1={552} y1={197} x2={576} y2={233} color={C.success} />
        <path
          d="M552 197 L640 186"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text
          x="566"
          y="332"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          wall bounce → 可见点
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch38TwoPassDiagram() {
  return (
    <Figure>
      <Frame label="全局光照两遍方法：第一遍用较便宜的 photon mapping 或其他方法生成粗略 irradiance，第二遍使用它做 final gathering 并生成最终图像">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          两遍计算：先准备粗略光照，再高质量收集
        </text>
        <rect
          x="48"
          y="104"
          width="194"
          height="202"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="145"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          pass 1
        </text>
        <circle cx="112" cy="190" r="8" fill={C.warning} />
        <circle cx="155" cy="224" r="8" fill={C.warning} />
        <circle cx="184" cy="174" r="8" fill={C.warning} />
        <path d="M76 270 H214" stroke={C.border} strokeWidth="2" />
        <text
          x="145"
          y="248"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          photon / irradiance 粗估
        </text>
        <text
          x="145"
          y="289"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          便宜，但不直接交付
        </text>
        <Arrow x1={264} y1={205} x2={332} y2={205} color={C.accent} />
        <text x="298" y="180" textAnchor="middle" fontSize="12" fill={C.accent}>
          irradiance data
        </text>
        <rect
          x="344"
          y="104"
          width="194"
          height="202"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="441"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          pass 2
        </text>
        <circle cx="400" cy="190" r="8" fill={C.success} />
        <path
          d="M400 190 L465 157 M400 190 L482 190 M400 190 L465 224"
          stroke={C.success}
          strokeWidth="2"
        />
        <text
          x="441"
          y="258"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          final gathering
        </text>
        <text
          x="441"
          y="289"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          所有可见点一起处理
        </text>
        <Arrow x1={560} y1={205} x2={626} y2={205} color={C.success} />
        <rect
          x="636"
          y="126"
          width="82"
          height="158"
          rx="12"
          fill={C.success}
          fillOpacity="0.14"
          stroke={C.success}
        />
        <text
          x="677"
          y="169"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          final
        </text>
        <text
          x="677"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          image
        </text>
        <text
          x="677"
          y="244"
          textAnchor="middle"
          fontSize="11"
          fill={C.secondary}
        >
          direct + indirect
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch38RayClusteringDiagram() {
  const origins = [
    [110, 212],
    [184, 212],
    [258, 212],
  ] as const;
  return (
    <Figure>
      <Frame label="final gathering 射线聚类对比：逐点半球聚类让每个可见点拥有不同方向，而 parallel clustering 让所有点共享预先选定的 global ray direction，适合一次平行投影">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“每点不同的射线”改成“同向的一批投影”
        </text>
        <rect
          x="44"
          y="74"
          width="316"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="202"
          y="106"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          hemispherical clustering
        </text>
        {origins.map(([x, y], index) => (
          <g key={`hemi-${x}`}>
            <circle cx={x} cy={y} r="8" fill={C.accent} />
            <path
              d={`M${x} ${y} L${x - 35 - index * 8} ${y - 78} M${x} ${y} L${x + 42 + index * 8} ${y - 68} M${x} ${y} L${x + 62 - index * 8} ${y - 14}`}
              stroke={C.warning}
              strokeWidth="2"
            />
          </g>
        ))}
        <text
          x="202"
          y="316"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          每个 origin 选不同方向
        </text>
        <text
          x="202"
          y="338"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不容易合成一次 raster pass
        </text>
        <Arrow x1={380} y1={216} x2={426} y2={216} color={C.success} />
        <rect
          x="400"
          y="74"
          width="316"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="558"
          y="106"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          parallel clustering
        </text>
        {[0, 1, 2].map((index) => {
          const x = 466 + index * 72;
          return (
            <g key={`parallel-${index}`}>
              <circle cx={x} cy="212" r="8" fill={C.accent} />
              <Arrow x1={x} y1={202} x2={x + 46} y2={126} color={C.success} />
            </g>
          );
        })}
        <path
          d="M470 126 H678"
          stroke={C.success}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="558"
          y="300"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          同一 global ray direction
        </text>
        <text
          x="558"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          一次平行投影批量追踪
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch38DepthPeelingDiagram() {
  const layers = [
    { label: "layer 0 · near", y: 126, color: C.success },
    { label: "layer 1", y: 192, color: C.accent },
    { label: "layer 2 · far", y: 258, color: C.warning },
  ] as const;
  return (
    <Figure>
      <Frame label="depth peeling 图：沿当前 global ray direction 取得多个深度层，先记录远处层，再用下一轮更大的深度条件剥掉已经记录的层，最终得到可见点的最近交点">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          depth peeling：把一条射线上的交点逐层揭开
        </text>
        <text x="82" y="86" fontSize="14" fontWeight="700" fill={C.secondary}>
          沿 global direction
        </text>
        <line
          x1="112"
          y1="112"
          x2="112"
          y2="318"
          stroke={C.accent}
          strokeWidth="4"
        />
        <polygon points="112,330 104,316 120,316" fill={C.accent} />
        {layers.map((layer, index) => (
          <g key={layer.label}>
            <rect
              x="76"
              y={layer.y}
              width="72"
              height="34"
              rx="8"
              fill={layer.color}
              fillOpacity="0.2"
              stroke={layer.color}
              strokeWidth="2"
            />
            <text
              x="112"
              y={layer.y + 22}
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              {index}
            </text>
            <text x="164" y={layer.y + 22} fontSize="12" fill={C.secondary}>
              {layer.label}
            </text>
          </g>
        ))}
        <Arrow x1={280} y1={274} x2={352} y2={274} color={C.warning} />
        <text
          x="316"
          y="250"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          reversed depth test
        </text>
        <rect
          x="370"
          y="104"
          width="154"
          height="198"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="447"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          B / C buffers
        </text>
        <text
          x="447"
          y="174"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          B：本轮最远深度
        </text>
        <text
          x="447"
          y="202"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          C：上一轮边界
        </text>
        <Arrow x1={447} y1={226} x2={447} y2={254} color={C.accent} />
        <text x="447" y="278" textAnchor="middle" fontSize="12" fill={C.accent}>
          copy B → C
        </text>
        <Arrow x1={552} y1={204} x2={620} y2={204} color={C.success} />
        <rect
          x="632"
          y="132"
          width="82"
          height="144"
          rx="12"
          fill={C.success}
          fillOpacity="0.14"
          stroke={C.success}
        />
        <text
          x="673"
          y="170"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          D
        </text>
        <text
          x="673"
          y="195"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          sampled
        </text>
        <text
          x="673"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          layer
        </text>
        <text
          x="673"
          y="254"
          textAnchor="middle"
          fontSize="11"
          fill={C.success}
        >
          nearest kept
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch38VisiblePointPipelineDiagram() {
  return (
    <Figure>
      <Frame label="GPU final gathering 管线：可见点缓冲 A 提供位置、法线和颜色；固定 global ray direction 做平行投影与 depth peeling；结果写入 E，再累加到 indirect buffer">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          每个 global ray direction 都走一轮可并行的管线
        </text>
        <rect
          x="46"
          y="132"
          width="132"
          height="116"
          rx="12"
          fill={C.accent}
          fillOpacity="0.16"
          stroke={C.accent}
        />
        <text
          x="112"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          buffer A
        </text>
        <text
          x="112"
          y="193"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          position
        </text>
        <text
          x="112"
          y="217"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          normal + color
        </text>
        <Arrow x1={192} y1={190} x2={256} y2={190} color={C.accent} />
        <rect
          x="266"
          y="106"
          width="158"
          height="168"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="345"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          parallel projection
        </text>
        <text
          x="345"
          y="170"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          read D at projected M
        </text>
        <text
          x="345"
          y="196"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          depth peeling B/C
        </text>
        <text
          x="345"
          y="222"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          write nearest into E
        </text>
        <Arrow x1={438} y1={190} x2={500} y2={190} color={C.success} />
        <rect
          x="512"
          y="132"
          width="98"
          height="116"
          rx="12"
          fill={C.success}
          fillOpacity="0.14"
          stroke={C.success}
        />
        <text
          x="561"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          E
        </text>
        <text
          x="561"
          y="195"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          nearest
        </text>
        <text
          x="561"
          y="217"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          hit
        </text>
        <Arrow x1={626} y1={190} x2={688} y2={190} color={C.warning} />
        <rect
          x="690"
          y="132"
          width="52"
          height="116"
          rx="12"
          fill={C.warning}
          fillOpacity="0.14"
          stroke={C.warning}
        />
        <text
          x="716"
          y="174"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          +
        </text>
        <text
          x="716"
          y="201"
          textAnchor="middle"
          fontSize="11"
          fill={C.secondary}
        >
          indirect
        </text>
        <text
          x="380"
          y="334"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          没有为每个点维护一棵 GPU ray-tracing acceleration structure
        </text>
        <text
          x="380"
          y="358"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          只改变 direction，就能处理下一批同向 rays
        </text>
      </Frame>
    </Figure>
  );
}

const TIMELINE_STEPS: TeachingStep[] = [
  { label: "visible", caption: "准备可见点" },
  { label: "project", caption: "选择全局方向" },
  { label: "peel", caption: "剥离深度层" },
  { label: "accumulate", caption: "累积间接光" },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch38FinalGatherTimelineDiagram() {
  const visibleRef = useRef<SVGGElement>(null);
  const projectRef = useRef<SVGGElement>(null);
  const peelRef = useRef<SVGGElement>(null);
  const accumulateRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(visibleRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("visible", 0);
      tl.add(projectRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("project", T);
      tl.add(
        peelRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("peel", T * 2);
      tl.add(
        accumulateRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("accumulate", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可播放的 final gathering 动画：先写出可见点位置法线和颜色，再按一个 global ray direction 做平行投影，逐层 depth peeling，最后把命中光照累加到间接光缓冲">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          final gather 的四个关键帧
        </text>
        <g ref={visibleRef}>
          <rect
            x="54"
            y="142"
            width="138"
            height="104"
            rx="12"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
          />
          <text
            x="123"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            visible points
          </text>
          <text
            x="123"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            P / N / color
          </text>
        </g>
        <g ref={projectRef}>
          <rect
            x="230"
            y="142"
            width="138"
            height="104"
            rx="12"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
          />
          <text
            x="299"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            projection
          </text>
          <text
            x="299"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            global direction
          </text>
        </g>
        <g ref={peelRef}>
          <rect
            x="406"
            y="142"
            width="138"
            height="104"
            rx="12"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
          />
          <text
            x="475"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            depth peeling
          </text>
          <text
            x="475"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            nearest hit
          </text>
        </g>
        <g ref={accumulateRef}>
          <rect
            x="582"
            y="142"
            width="124"
            height="104"
            rx="12"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
          />
          <text
            x="644"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            accumulate
          </text>
          <text
            x="644"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            indirect light
          </text>
        </g>
        <Arrow x1={192} y1={194} x2={230} y2={194} color={C.accent} />
        <Arrow x1={368} y1={194} x2={406} y2={194} color={C.warning} />
        <Arrow x1={544} y1={194} x2={582} y2={194} color={C.success} />
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每次只处理一个预先采样的方向；换方向后重复同一套 raster passes
        </text>
        <text
          x="380"
          y="338"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          这是离线高质量渲染管线，不承诺交互帧率
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="把最终收集拆成用户可观察的阶段：可见点、同向投影、深度层和累积。"
      />
    </Figure>
  );
}

type GatherMode = "parallel" | "per-point";

export function GpuGems2Ch38QualityLab() {
  const [mode, setMode] = useState<GatherMode>("parallel");
  const [samples, setSamples] = useState(32);
  const [peelLayers, setPeelLayers] = useState(4);
  const [stopPercent, setStopPercent] = useState(2);

  const result = useMemo(() => {
    const visiblePoints = 128;
    const directionBatches =
      mode === "parallel" ? samples : visiblePoints * samples;
    const rasterPasses =
      mode === "parallel" ? samples * peelLayers : visiblePoints * samples;
    const rays = visiblePoints * samples;
    const acceptedFragments = Math.max(
      1,
      Math.round(visiblePoints * (1 - stopPercent / 100)),
    );
    const qualityStep = Math.min(4, Math.max(1, Math.round(samples / 16)));
    const summary =
      mode === "parallel"
        ? "同向射线共享投影与 depth peeling，适合把所有 visible points 一起处理。"
        : "每个点使用独立方向，概念直观但会失去 rasterization 的方向复用。";
    return {
      acceptedFragments,
      directionBatches,
      qualityStep,
      rasterPasses,
      rays,
      summary,
      visiblePoints,
    };
  }, [mode, peelLayers, samples, stopPercent]);

  const reset = () => {
    setMode("parallel");
    setSamples(32);
    setPeelLayers(4);
    setStopPercent(2);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="final gathering 实验模式"
          >
            {(
              [
                ["parallel", "parallel clustering"],
                ["per-point", "per-point directions"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${mode === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
                onClick={() => setMode(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 760 360"
            role="img"
            aria-label={`final gathering 实验：当前模式 ${mode}，samples ${samples}，depth peeling layers ${peelLayers}，停止阈值 ${stopPercent}%`}
            className="mt-5 block h-auto w-full"
          >
            <rect width="760" height="360" rx="16" fill={C.bg} />
            <text
              x="380"
              y="30"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill={C.text}
            >
              {mode === "parallel"
                ? "同向 rays 一起走 raster pipeline"
                : "每点独立方向，批处理机会减少"}
            </text>
            <path
              d="M58 280 L122 118 L288 96 L330 270 Z"
              fill={C.accent}
              fillOpacity="0.14"
              stroke={C.accent}
              strokeWidth="3"
            />
            {Array.from({ length: 7 }, (_, index) => {
              const x =
                100 + (index % 4) * 52 + (Math.floor(index / 4) % 2) * 18;
              const y = 230 - Math.floor(index / 4) * 60;
              return (
                <circle
                  key={`visible-${index}`}
                  cx={x}
                  cy={y}
                  r="7"
                  fill={C.success}
                />
              );
            })}
            {Array.from({ length: 4 }, (_, index) => {
              const x = 106 + index * 55;
              const y = 223;
              return (
                <Arrow
                  key={`ray-${index}`}
                  x1={x}
                  y1={y}
                  x2={x + (mode === "parallel" ? 62 : 36)}
                  y2={y - (mode === "parallel" ? 84 : 46 + index * 12)}
                  color={mode === "parallel" ? C.warning : C.border}
                  dashed={mode !== "parallel"}
                />
              );
            })}
            <Arrow x1={348} y1={196} x2={418} y2={196} color={C.success} />
            <rect
              x="434"
              y="90"
              width="270"
              height="226"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="569"
              y="122"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              progressive image
            </text>
            {Array.from({ length: 4 }, (_, index) => {
              const active = index < result.qualityStep;
              return (
                <rect
                  key={`quality-${index}`}
                  x={478 + index * 48}
                  y="158"
                  width="34"
                  height="62"
                  rx="6"
                  fill={active ? C.success : C.border}
                  fillOpacity={active ? 0.55 : 0.22}
                  stroke={active ? C.success : C.border}
                />
              );
            })}
            <text
              x="569"
              y="258"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              sample count ↑ → noise ↓
            </text>
            <text
              x="569"
              y="282"
              textAnchor="middle"
              fontSize="12"
              fill={C.warning}
            >
              threshold {stopPercent}% → 及早停止
            </text>
          </svg>
        </div>
        <div className="rounded-card border border-border bg-surface p-4">
          <label className="block text-sm text-secondary">
            final-gather samples: {samples}
            <input
              aria-label="final gather samples"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="8"
              max="96"
              step="8"
              value={samples}
              onChange={(event) => setSamples(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            depth peeling layers: {peelLayers}
            <input
              aria-label="depth peeling layers"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="8"
              step="1"
              value={peelLayers}
              onChange={(event) => setPeelLayers(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            stop threshold: {stopPercent}%
            <input
              aria-label="stop threshold"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="10"
              step="1"
              value={stopPercent}
              onChange={(event) => setStopPercent(Number(event.target.value))}
            />
          </label>
          <div className="mt-5">
            <Metric
              label="visible points (teaching set)"
              value={`${result.visiblePoints}`}
            />
            <Metric
              label="ray samples"
              value={`${result.rays}`}
              tone={C.success}
            />
            <Metric
              label="direction batches"
              value={`${result.directionBatches}`}
              tone={C.accent}
            />
            <Metric
              label="raster/depth passes"
              value={`${result.rasterPasses}`}
              tone={C.warning}
            />
            <Metric
              label="accepted fragments"
              value={`${result.acceptedFragments}`}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-secondary">
            {result.summary}
          </p>
          <button
            type="button"
            className="mt-4 min-h-11 rounded-control border border-border px-3 py-2 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验
          </button>
        </div>
      </div>
    </Figure>
  );
}
