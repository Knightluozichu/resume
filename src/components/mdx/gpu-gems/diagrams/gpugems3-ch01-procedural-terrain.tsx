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
        height="90"
        rx="14"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 38}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + width / 2}
        y={y + 66}
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

function TeachingStage({
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
      <circle cx={x + 24} cy="158" r="20" fill={accent} />
      <text
        x={x + 24}
        y="164"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.bg}
      >
        {number}
      </text>
      <rect
        x={x + 50}
        y="112"
        width="126"
        height="92"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <text
        x={x + 113}
        y="150"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + 113}
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

export function GpuGems3Ch01TerrainPipelineDiagram() {
  return (
    <Figure>
      <Frame label="GPU 生成程序化地形的总体管线：密度函数写入三维纹理，Marching Cubes 把体素分类为三角形，GPU 流式输出 block 并在屏幕上渲染">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从“地图高度”升级为“空间里的实体”
        </text>
        <Box
          accent={C.warning}
          detail="world position → density"
          label="density function"
          x={42}
          y={116}
          width={154}
        />
        <Box
          accent={C.accent}
          detail="3D texture · 33³ corners"
          label="voxel volume"
          x={228}
          y={116}
          width={154}
        />
        <Box
          accent={C.success}
          detail="case table → triangles"
          label="Marching Cubes"
          x={414}
          y={116}
          width={154}
        />
        <Box
          accent={C.accent}
          detail="pool · cull · draw"
          label="terrain blocks"
          x={600}
          y={116}
          width={118}
        />
        <Arrow x1={198} y1={161} x2={228} y2={161} />
        <Arrow x1={384} y1={161} x2={414} y2={161} />
        <Arrow x1={570} y1={161} x2={600} y2={161} />
        <path
          d="M660 210 C660 288 72 288 72 210"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={72} y1={210} x2={72} y2={242} color={C.border} />
        <text
          x="380"
          y="260"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          无限世界 = 许多可回收的 cubic blocks
        </text>
        <text
          x="380"
          y="300"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          远处或空的 block 可以驱逐；镜头附近的 block 才需要继续生成
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          正密度是实体，负密度是空气，零等值面就是地形表面
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch01DensityCaseDiagram() {
  const corners = [
    { x: 92, y: 184, value: "+", solid: true },
    { x: 182, y: 184, value: "−", solid: false },
    { x: 92, y: 274, value: "−", solid: false },
    { x: 182, y: 274, value: "+", solid: true },
    { x: 124, y: 142, value: "+", solid: true },
    { x: 214, y: 142, value: "−", solid: false },
    { x: 124, y: 232, value: "−", solid: false },
    { x: 214, y: 232, value: "+", solid: true },
  ];
  return (
    <Figure>
      <Frame label="Marching Cubes 的一个 cell：八个角点的密度正负组成 case index，表面在符号变化的边上插值">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          八个角点的正负，决定一个 cell 的三角形
        </text>
        <rect
          x="52"
          y="82"
          width="286"
          height="280"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="195"
          y="114"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          one voxel cell
        </text>
        <path
          d="M92 184 L182 184 L214 142 L124 142 Z"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
          strokeWidth="2"
        />
        <path
          d="M92 184 L92 274 L182 274 L182 184 M124 142 L124 232 L214 232 L214 142 M92 274 L124 232 M182 274 L214 232"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
        />
        {corners.map((corner, index) => (
          <g key={index}>
            <circle
              cx={corner.x}
              cy={corner.y}
              r="12"
              fill={corner.solid ? C.success : C.danger}
            />
            <text
              x={corner.x}
              y={corner.y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={C.bg}
            >
              {corner.value}
            </text>
          </g>
        ))}
        <text
          x="195"
          y="334"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          + = solid · − = empty
        </text>
        <Arrow x1={350} y1={220} x2={414} y2={220} />
        <rect
          x="414"
          y="82"
          width="298"
          height="280"
          rx="14"
          fill={C.accent}
          fillOpacity="0.1"
          stroke={C.accent}
        />
        <text
          x="563"
          y="116"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          case index
        </text>
        <text
          x="563"
          y="164"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={C.accent}
        >
          1010 0101₂
        </text>
        <text
          x="563"
          y="204"
          textAnchor="middle"
          fontSize="15"
          fill={C.secondary}
        >
          → case 165 → lookup table
        </text>
        <path
          d="M480 292 C512 238 558 326 592 270 C622 220 646 292 674 250"
          fill="none"
          stroke={C.success}
          strokeWidth="5"
        />
        <circle cx="480" cy="292" r="5" fill={C.success} />
        <circle cx="674" cy="250" r="5" fill={C.success} />
        <text
          x="563"
          y="334"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          符号变化的边上插值，得到 0–5 个三角形
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch01BlockPipelineDiagram() {
  return (
    <Figure>
      <Frame label="GPU terrain block 的生命周期：筛选可见 block，写入密度体，生成三角形，stream output 到可回收的 vertex buffer pool">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          block 生命周期：只让值得画的体块占用缓冲区
        </text>
        <Box
          accent={C.warning}
          detail="front-to-back sort"
          label="可见性队列"
          x={42}
          y={110}
          width={150}
        />
        <Box
          accent={C.accent}
          detail="pixel shader → 3D texture"
          label="密度 pass"
          x={220}
          y={110}
          width={150}
        />
        <Box
          accent={C.success}
          detail="query empty blocks"
          label="stream output"
          x={398}
          y={110}
          width={150}
        />
        <Box
          accent={C.accent}
          detail="draw near blocks"
          label="vertex pool"
          x={576}
          y={110}
          width={142}
        />
        <Arrow x1={194} y1={155} x2={220} y2={155} />
        <Arrow x1={372} y1={155} x2={398} y2={155} />
        <Arrow x1={550} y1={155} x2={576} y2={155} />
        <path
          d="M647 208 C647 280 116 280 116 208"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={116} y1={208} x2={116} y2={230} color={C.border} />
        <rect
          x="80"
          y="302"
          width="170"
          height="62"
          rx="12"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="165"
          y="328"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          空 / 远 block
        </text>
        <text
          x="165"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          evict or skip
        </text>
        <Arrow x1={252} y1={333} x2={328} y2={333} color={C.danger} dashed />
        <rect
          x="328"
          y="302"
          width="352"
          height="62"
          rx="12"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="504"
          y="328"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          近处、有表面的 block
        </text>
        <text
          x="504"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          保留 buffer，按深度先后绘制
        </text>
      </Frame>
    </Figure>
  );
}

const GENERATION_STEPS: readonly TeachingStep[] = [
  { label: "density", caption: "写入 33³ 的密度 volume" },
  { label: "classify", caption: "为每个 cell 计算 case" },
  { label: "emit", caption: "输出 marker 或顶点" },
  { label: "reuse", caption: "共享顶点并绘制" },
];

const GENERATION_LABELS: Readonly<Record<string, string>> = {
  classify: "为每个 cell 计算 case",
  density: "写入 33³ 的密度 volume",
  emit: "输出 marker 或顶点",
  reuse: "共享顶点并绘制",
};

export function GpuGems3Ch01GenerationMethodsTimelineDiagram() {
  const densityRef = useRef<SVGGElement>(null);
  const classifyRef = useRef<SVGGElement>(null);
  const emitRef = useRef<SVGGElement>(null);
  const reuseRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: GENERATION_STEPS,
    build: (tl) => {
      tl.add(densityRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("density", 0);
      tl.add(
        classifyRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T,
      );
      tl.label("classify", T);
      tl.add(
        emitRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("emit", T * 2);
      tl.add(
        reuseRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("reuse", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可控教学动画：程序化 terrain 从密度体到 case 分类，再到 marker、顶点和共享 index 的渐进生成流程">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          三种方法共享同一条“密度 → 表面”主线
        </text>
        <TeachingStage
          stageRef={densityRef}
          number="1"
          label="density"
          detail="33³ samples"
          accent={C.warning}
          x={28}
        />
        <TeachingStage
          stageRef={classifyRef}
          number="2"
          label="classify"
          detail="case 0–255"
          accent={C.accent}
          x={206}
        />
        <TeachingStage
          stageRef={emitRef}
          number="3"
          label="emit"
          detail="marker / vertex"
          accent={C.success}
          x={384}
        />
        <TeachingStage
          stageRef={reuseRef}
          number="4"
          label="reuse"
          detail="index pool"
          accent={C.accent}
          x={562}
        />
        <Arrow x1={204} y1={158} x2={206} y2={158} color={C.border} />
        <Arrow x1={382} y1={158} x2={384} y2={158} color={C.border} />
        <Arrow x1={560} y1={158} x2={562} y2={158} color={C.border} />
        <text
          x="380"
          y="278"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          额外的 pass 可以把 geometry shader 的瓶颈搬到更窄的输出上
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          Method 1 直接发完整顶点；Method 2 先发非空 marker；Method 3 再共享
          vertex / index
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放或单步观察：不是 pass 越少越快，而是每个 pass 是否减少了后续工作
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={GENERATION_LABELS}
        caption="每一步都对应一个可检查的中间数据，而不是黑盒“生成完成”。"
      />
    </Figure>
  );
}

export function GpuGems3Ch01MethodCompareDiagram() {
  const methods = [
    {
      accent: C.danger,
      detail: "每个 voxel 直接输出 0–15 个顶点",
      label: "Method 1",
      metric: "约 6.6 blocks/s",
    },
    {
      accent: C.warning,
      detail: "先列出非空 cell，再生成顶点",
      label: "Method 2",
      metric: "约 144 blocks/s",
    },
    {
      accent: C.success,
      detail: "共享 vertex + index，少重复",
      label: "Method 3",
      metric: "约 260 blocks/s",
    },
  ];
  return (
    <Figure>
      <Frame label="GPU Gems 3 Chapter 1 的三种 terrain 生成方法对比：Method 1 直接从 voxel 输出顶点，Method 2 先输出 marker，Method 3 共享顶点和索引">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“输出太宽”拆成更窄的中间列表
        </text>
        {methods.map((method, index) => {
          const x = 42 + index * 238;
          const height = [94, 166, 224][index];
          return (
            <g key={method.label}>
              <rect
                x={x}
                y="84"
                width="200"
                height="260"
                rx="14"
                fill={method.accent}
                fillOpacity="0.1"
                stroke={method.accent}
              />
              <text
                x={x + 100}
                y="120"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={method.accent}
              >
                {method.label}
              </text>
              <rect
                x={x + 44}
                y={330 - height}
                width="112"
                height={height}
                rx="8"
                fill={method.accent}
                fillOpacity="0.4"
              />
              {Array.from(
                { length: index === 0 ? 6 : index === 1 ? 4 : 3 },
                (_, item) => (
                  <line
                    key={item}
                    x1={x + 58}
                    y1={318 - item * 22}
                    x2={x + 142}
                    y2={318 - item * 22}
                    stroke={C.bg}
                    strokeWidth="4"
                    opacity="0.75"
                  />
                ),
              )}
              <text
                x={x + 100}
                y="370"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {method.detail}
              </text>
              <text
                x={x + 100}
                y="400"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={method.accent}
              >
                {method.metric}
              </text>
            </g>
          );
        })}
        <text
          x="380"
          y="60"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          示意：输出列表越窄，后续 geometry work 越可控
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch01NoiseTerrainDiagram() {
  const lowWave = "M54 270 C112 214 154 270 210 218 S308 222 356 170";
  const highWave =
    "M54 302 C84 288 104 320 132 292 S184 318 208 284 S260 318 288 278 S330 302 356 266";
  return (
    <Figure>
      <Frame label="程序化地形的密度函数：低频噪声决定大尺度起伏，warp 把等值面扭曲出洞穴和拱门，高频噪声补充细节">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          低频定形，高频加纹理，warp 打开洞穴
        </text>
        <rect
          x="42"
          y="84"
          width="324"
          height="280"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="204"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          world-space density slice
        </text>
        <line
          x1="62"
          y1="308"
          x2="346"
          y2="308"
          stroke={C.border}
          strokeWidth="2"
        />
        <line
          x1="62"
          y1="140"
          x2="62"
          y2="328"
          stroke={C.border}
          strokeWidth="2"
        />
        <path d={lowWave} fill="none" stroke={C.warning} strokeWidth="5" />
        <path d={highWave} fill="none" stroke={C.accent} strokeWidth="3" />
        <path
          d="M72 170 C118 142 154 178 196 154 S270 180 334 134"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
          strokeDasharray="8 6"
        />
        <text x="90" y="350" fontSize="12" fill={C.warning}>
          low frequency
        </text>
        <text x="208" y="350" fontSize="12" fill={C.accent}>
          octaves
        </text>
        <text x="280" y="350" fontSize="12" fill={C.success}>
          warp
        </text>
        <Arrow x1={384} y1={220} x2={426} y2={220} />
        <rect
          x="426"
          y="84"
          width="292"
          height="280"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="572"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          zero isosurface
        </text>
        <path
          d="M472 264 C486 206 538 244 554 198 C574 138 616 166 624 212 C632 252 676 232 684 270"
          fill="none"
          stroke={C.success}
          strokeWidth="8"
        />
        <path
          d="M508 258 C520 234 540 244 548 222"
          fill="none"
          stroke={C.bg}
          strokeWidth="13"
        />
        <path
          d="M616 214 C626 192 646 190 654 212"
          fill="none"
          stroke={C.bg}
          strokeWidth="13"
        />
        <text x="572" y="312" textAnchor="middle" fontSize="13" fill={C.text}>
          caves / arches / overhangs
        </text>
        <text
          x="572"
          y="340"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不是给高度加噪声，而是改写三维边界
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch01TriplanarLodDiagram() {
  return (
    <Figure>
      <Frame label="程序化 terrain 的材质与 LOD：triplanar texturing 从三个方向投影材质，近处 block 使用更多细节，远处 block 使用更粗网格">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          外观和细节预算也要跟着几何边界走
        </text>
        <rect
          x="42"
          y="84"
          width="310"
          height="280"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="197"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          triplanar texturing
        </text>
        <path
          d="M126 284 L126 190 L196 150 L266 190 L266 284 L196 324 Z"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
          strokeWidth="3"
        />
        <path
          d="M196 150 L196 246 L266 284 M126 190 L196 246 L266 190"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d="M150 206 L178 190 M150 238 L178 222 M216 174 L244 190 M216 206 L244 222 M216 270 L244 286"
          stroke={C.success}
          strokeWidth="5"
        />
        <text
          x="197"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          按法线权重混合 X / Y / Z 三个投影
        </text>
        <Arrow x1={366} y1={220} x2={404} y2={220} />
        <rect
          x="404"
          y="84"
          width="314"
          height="280"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="561"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          level of detail
        </text>
        <rect
          x="446"
          y="152"
          width="82"
          height="82"
          fill={C.success}
          fillOpacity="0.28"
          stroke={C.success}
        />
        <path
          d="M446 193 H528 M487 152 V234"
          stroke={C.success}
          strokeWidth="2"
        />
        <text
          x="487"
          y="258"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          near · fine
        </text>
        <rect
          x="578"
          y="170"
          width="92"
          height="64"
          fill={C.accent}
          fillOpacity="0.25"
          stroke={C.accent}
        />
        <path d="M578 202 H670" stroke={C.accent} strokeWidth="2" />
        <text
          x="624"
          y="258"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          far · coarse
        </text>
        <Arrow x1={532} y1={193} x2={574} y2={193} color={C.border} />
        <text x="561" y="312" textAnchor="middle" fontSize="13" fill={C.text}>
          避免远处 block 付近处的几何成本
        </text>
        <text
          x="561"
          y="340"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          LOD 过渡仍需处理重叠和 z-fighting
        </text>
      </Frame>
    </Figure>
  );
}

type GenerationMethod = "method1" | "method2" | "method3";

const METHOD_LABELS: Record<GenerationMethod, string> = {
  method1: "Method 1 · 直接输出",
  method2: "Method 2 · marker 列表",
  method3: "Method 3 · 共享顶点",
};

export function GpuGems3Ch01ProceduralTerrainLab() {
  const [method, setMethod] = useState<GenerationMethod>("method2");
  const [frequency, setFrequency] = useState(42);
  const [amplitude, setAmplitude] = useState(58);
  const [warp, setWarp] = useState(36);
  const [skipEmpty, setSkipEmpty] = useState(true);

  const metrics = useMemo(() => {
    const methodIndex = { method1: 0, method2: 1, method3: 2 }[method];
    const passCount = methodIndex + 2;
    const activeRatio = Math.round((skipEmpty ? 0.54 : 0.82) * 100);
    const markerCount = Math.round(
      (frequency * 1.4 + amplitude * 0.55 + warp * 0.7) *
        (method === "method3" ? 0.62 : method === "method2" ? 0.86 : 1.18),
    );
    const caveTendency = Math.round(warp * 0.82 + amplitude * 0.12);
    const vertexReuse =
      method === "method3" ? 74 : method === "method2" ? 18 : 0;
    const note = !skipEmpty
      ? "误区：空 block 也进入生成队列，stream-out query 失去筛选价值。"
      : method === "method1"
        ? "输出直接而直观，但 geometry shader 要承受每个 voxel 的最宽上限。"
        : method === "method2"
          ? "先列非空 cell，缩窄后续输出；marker 数量仍随频率和 warp 上升。"
          : "共享顶点和 index 降低重复，适合表面连续且 block 数量较大的场景。";
    return {
      activeRatio,
      caveTendency,
      markerCount,
      note,
      passCount,
      vertexReuse,
    };
  }, [amplitude, frequency, method, skipEmpty, warp]);

  function reset() {
    setMethod("method2");
    setFrequency(42);
    setAmplitude(58);
    setWarp(36);
    setSkipEmpty(true);
  }

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="选择 terrain 生成方法"
          >
            {(Object.keys(METHOD_LABELS) as GenerationMethod[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={method === key}
                onClick={() => setMethod(key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors duration-(--duration-hover) ease-standard ${method === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
              >
                {METHOD_LABELS[key]}
              </button>
            ))}
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <p className="mb-3 text-sm font-semibold text-primary">
              调整密度函数：先预测，再观察
            </p>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch01-frequency"
            >
              noise frequency · {frequency}%
              <input
                id="gpu-gems3-ch01-frequency"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="10"
                max="90"
                value={frequency}
                onChange={(event) => setFrequency(Number(event.target.value))}
              />
            </label>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch01-amplitude"
            >
              noise amplitude · {amplitude}%
              <input
                id="gpu-gems3-ch01-amplitude"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="10"
                max="90"
                value={amplitude}
                onChange={(event) => setAmplitude(Number(event.target.value))}
              />
            </label>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch01-warp"
            >
              warp strength · {warp}%
              <input
                id="gpu-gems3-ch01-warp"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="90"
                value={warp}
                onChange={(event) => setWarp(Number(event.target.value))}
              />
            </label>
            <label
              className="flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch01-skip-empty"
            >
              <input
                id="gpu-gems3-ch01-skip-empty"
                type="checkbox"
                checked={skipEmpty}
                onChange={(event) => setSkipEmpty(event.target.checked)}
                className="size-4 accent-accent"
              />
              跳过空 block（关闭以注入误区）
            </label>
          </div>
        </div>
        <div
          className="rounded-card border border-border bg-surface p-4"
          aria-live="polite"
        >
          <p className="mb-3 text-sm font-semibold text-primary">
            当前可检查信号
          </p>
          <Metric
            label="density / generation passes"
            value={`${metrics.passCount}`}
            tone={C.accent}
          />
          <Metric
            label="marker / vertex records"
            value={`${metrics.markerCount}`}
            tone={C.warning}
          />
          <Metric
            label="active block ratio"
            value={`${metrics.activeRatio}%`}
            tone={C.success}
          />
          <Metric
            label="cave tendency"
            value={`${metrics.caveTendency}%`}
            tone={C.danger}
          />
          <Metric
            label="vertex reuse"
            value={`${metrics.vertexReuse}%`}
            tone={C.success}
          />
          <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-secondary">
            {metrics.note}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-surface px-4 py-3">
        <p className="text-xs text-secondary">
          把 frequency 加倍会增加细节与 case 变化；把 warp
          加大才更可能打开洞穴。
        </p>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
    </Figure>
  );
}
