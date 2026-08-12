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
        height="88"
        rx="14"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 36}
        textAnchor="middle"
        fontSize="15"
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

export function GpuGems3Ch02CrowdPipelineDiagram() {
  return (
    <Figure>
      <Frame label="Animated Crowd Rendering 的总体管线：CPU 按 LOD 分组实例，DrawInstanced 发起绘制，顶点着色器用实例 ID 读取姿态和动画纹理，像素着色器处理颜色">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一次画一组角色，每个角色仍保留自己的动作
        </text>
        <Box
          accent={C.warning}
          detail="AI · time · LOD lists"
          label="CPU 分组"
          x={34}
          y={112}
          width={142}
        />
        <Box
          accent={C.accent}
          detail="mesh piece × instances"
          label="DrawInstanced"
          x={208}
          y={112}
          width={158}
        />
        <Box
          accent={C.success}
          detail="ID → pose → skin"
          label="vertex shader"
          x={398}
          y={112}
          width={146}
        />
        <Box
          accent={C.accent}
          detail="color · optional texture"
          label="pixel shader"
          x={576}
          y={112}
          width={150}
        />
        <Arrow x1={178} y1={156} x2={208} y2={156} />
        <Arrow x1={368} y1={156} x2={398} y2={156} />
        <Arrow x1={546} y1={156} x2={576} y2={156} />
        <path
          d="M650 210 C650 286 110 286 110 210"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={110} y1={210} x2={110} y2={244} color={C.border} />
        <text
          x="380"
          y="258"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          instance 0、1、2… 共享 mesh，却不共享 pose
        </text>
        <text
          x="380"
          y="300"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          CPU 负责“谁该画、用哪个 LOD”；GPU 负责“这个实例现在是什么姿势”
        </text>
        <text
          x="380"
          y="344"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          目标是减少 draw call 和状态切换，同时保留动画与外观差异
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch02InstanceBufferDiagram() {
  return (
    <Figure>
      <Frame label="实例化的数据分工：所有角色共享主 mesh，CPU 把低频的世界变换、颜色和动画偏移放入 constant buffer，SV_InstanceID 为每个实例选中一条记录">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          共享几何，按实例索引低频数据
        </text>
        <rect
          x="42"
          y="88"
          width="278"
          height="250"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="181"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          shared mesh buffer
        </text>
        {Array.from({ length: 5 }, (_, index) => (
          <g key={index}>
            <rect
              x="78"
              y={146 + index * 32}
              width="206"
              height="22"
              rx="5"
              fill={C.accent}
              fillOpacity={index === 0 ? 0.38 : 0.18}
              stroke={C.accent}
            />
            <text
              x="181"
              y={162 + index * 32}
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              vertex {index + 1} · position / bone weights
            </text>
          </g>
        ))}
        <text
          x="181"
          y="318"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每个实例重复读取，但不复制这份几何
        </text>
        <Arrow x1={332} y1={214} x2={398} y2={214} />
        <rect
          x="398"
          y="88"
          width="320"
          height="250"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="558"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          constant buffer · instance data
        </text>
        <text
          x="558"
          y="158"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          SV_InstanceID → g_Instances[id]
        </text>
        <text x="438" y="196" fontSize="13" fill={C.secondary}>
          world1 / world2 / world3
        </text>
        <text x="438" y="222" fontSize="13" fill={C.secondary}>
          color
        </text>
        <text x="438" y="248" fontSize="13" fill={C.secondary}>
          animation offset
        </text>
        <text x="438" y="274" fontSize="13" fill={C.secondary}>
          frame offset
        </text>
        <path
          d="M648 186 L648 286 M648 186 L668 186 M648 286 L668 286"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
        />
        <text
          x="558"
          y="314"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          5 个 float4 / 实例 → 819 个实例 / buffer
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch02AnimationTextureDiagram() {
  return (
    <Figure>
      <Frame label="animation texture 的布局：不同动画和帧的骨骼矩阵线性写入纹理，顶点着色器按 animation offset、frame offset 与 bone offset 用 Load 读取三行矩阵">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“所有动作”铺进纹理，让每个实例自己取姿态
        </text>
        <rect
          x="52"
          y="82"
          width="356"
          height="282"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="230"
          y="114"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          animation texture
        </text>
        <text
          x="230"
          y="140"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          U = texel offset · V = packed row
        </text>
        {Array.from({ length: 7 }, (_, row) => (
          <g key={row}>
            {Array.from({ length: 8 }, (_, column) => {
              const active = (row + column) % 4 === 0;
              return (
                <rect
                  key={`${row}-${column}`}
                  x={94 + column * 34}
                  y={164 + row * 22}
                  width="28"
                  height="16"
                  rx="3"
                  fill={active ? C.success : C.accent}
                  fillOpacity={active ? 0.62 : 0.18}
                  stroke={active ? C.success : C.border}
                />
              );
            })}
          </g>
        ))}
        <text
          x="230"
          y="344"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每个 bone 矩阵占 3 个有效 texel 行
        </text>
        <Arrow x1={426} y1={220} x2={470} y2={220} />
        <rect
          x="470"
          y="82"
          width="244"
          height="282"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="592"
          y="116"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          vertex texture fetch
        </text>
        <text x="592" y="154" textAnchor="middle" fontSize="13" fill={C.text}>
          base = animation + frame
        </text>
        <text x="592" y="184" textAnchor="middle" fontSize="13" fill={C.text}>
          base += 4 × bone
        </text>
        <path
          d="M522 226 H662 M522 254 H662 M522 282 H662"
          stroke={C.success}
          strokeWidth="5"
        />
        <text
          x="592"
          y="318"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          Load 精确 texel → 3 行矩阵 → skinning
        </text>
        <text
          x="592"
          y="342"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不同实例可读不同动画和帧
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch02MeshVariationDiagram() {
  return (
    <Figure>
      <Frame label="mesh variation 的分组方式：角色被拆成头部、武器和护甲等 submesh，每个 submesh 维护自己的实例列表，再与共享骨架动画组合">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          变化来自“共享动作 + 不同零件”，不是复制整个人物
        </text>
        <rect
          x="48"
          y="88"
          width="190"
          height="250"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="143"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          character pieces
        </text>
        <rect
          x="92"
          y="146"
          width="102"
          height="42"
          rx="8"
          fill={C.warning}
          fillOpacity="0.22"
          stroke={C.warning}
        />
        <text x="143" y="172" textAnchor="middle" fontSize="13" fill={C.text}>
          head A / B
        </text>
        <rect
          x="92"
          y="202"
          width="102"
          height="42"
          rx="8"
          fill={C.success}
          fillOpacity="0.22"
          stroke={C.success}
        />
        <text x="143" y="228" textAnchor="middle" fontSize="13" fill={C.text}>
          weapon A / B
        </text>
        <rect
          x="92"
          y="258"
          width="102"
          height="42"
          rx="8"
          fill={C.accent}
          fillOpacity="0.22"
          stroke={C.accent}
        />
        <text x="143" y="284" textAnchor="middle" fontSize="13" fill={C.text}>
          armor A / B
        </text>
        <Arrow x1={258} y1={214} x2={306} y2={214} />
        <rect
          x="306"
          y="88"
          width="190"
          height="250"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="401"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          per-piece lists
        </text>
        <text
          x="401"
          y="166"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          head A: 0, 4, 7…
        </text>
        <text
          x="401"
          y="202"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          weapon B: 1, 3, 8…
        </text>
        <text
          x="401"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          armor A: 0, 2, 5…
        </text>
        <text
          x="401"
          y="292"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每组只画实际拥有该零件的实例
        </text>
        <Arrow x1={516} y1={214} x2={564} y2={214} />
        <rect
          x="564"
          y="88"
          width="148"
          height="250"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="638"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          same skeleton
        </text>
        <path
          d="M638 150 V286 M638 150 L608 180 M638 190 L666 216 M638 230 L610 260"
          fill="none"
          stroke={C.success}
          strokeWidth="4"
        />
        <text
          x="638"
          y="318"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          同一动画可驱动所有零件
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch02LodCullingDiagram() {
  return (
    <Figure>
      <Frame label="crowd 的 LOD 和视锥剔除：CPU 按距离把实例放入近中远列表，并删除摄像机后方实例；远处降低网格、法线贴图和光照成本">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先决定“看不看”，再决定“画多细”
        </text>
        <rect
          x="48"
          y="82"
          width="330"
          height="282"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="213"
          y="114"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          camera + distance bands
        </text>
        <path
          d="M98 306 L212 216 L326 306 Z"
          fill={C.accent}
          fillOpacity="0.08"
          stroke={C.accent}
          strokeWidth="2"
        />
        <path
          d="M130 280 L212 216 L294 280"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
        />
        <path
          d="M164 252 L212 216 L260 252"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
        />
        <circle cx="212" cy="216" r="8" fill={C.text} />
        <text
          x="212"
          y="336"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          near / mid / far：每帧重新分组
        </text>
        <Arrow x1={396} y1={220} x2={438} y2={220} />
        <rect
          x="438"
          y="82"
          width="274"
          height="282"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="575"
          y="114"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          LOD lists
        </text>
        <rect
          x="474"
          y="142"
          width="202"
          height="38"
          rx="8"
          fill={C.success}
          fillOpacity="0.26"
          stroke={C.success}
        />
        <text x="575" y="166" textAnchor="middle" fontSize="13" fill={C.text}>
          near · full mesh + lighting
        </text>
        <rect
          x="474"
          y="196"
          width="202"
          height="38"
          rx="8"
          fill={C.warning}
          fillOpacity="0.24"
          stroke={C.warning}
        />
        <text x="575" y="220" textAnchor="middle" fontSize="13" fill={C.text}>
          mid · fewer polygons
        </text>
        <rect
          x="474"
          y="250"
          width="202"
          height="38"
          rx="8"
          fill={C.accent}
          fillOpacity="0.24"
          stroke={C.accent}
        />
        <text x="575" y="274" textAnchor="middle" fontSize="13" fill={C.text}>
          far · coarse pieces
        </text>
        <text
          x="575"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          behind camera → cull before upload
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch02MethodCompareDiagram() {
  const methods = [
    {
      accent: C.danger,
      calls: "59,726",
      detail: "每个角色单独提交",
      label: "传统单体绘制",
      width: 226,
    },
    {
      accent: C.success,
      calls: "160",
      detail: "按零件 × LOD 批量提交",
      label: "skinned instancing",
      width: 226,
    },
  ];
  return (
    <Figure>
      <Frame label="crowd rendering 两种策略对比：传统方式为每个角色提交独立 draw call，skinned instancing 按 mesh piece 与 LOD 分组批量提交">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          CPU 压力的差异，来自“提交几次”而不只是“画多少人”
        </text>
        {methods.map((method, index) => {
          const x = index === 0 ? 54 : 480;
          return (
            <g key={method.label}>
              <rect
                x={x}
                y="88"
                width={method.width}
                height="248"
                rx="14"
                fill={method.accent}
                fillOpacity="0.1"
                stroke={method.accent}
              />
              <text
                x={x + method.width / 2}
                y="122"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={method.accent}
              >
                {method.label}
              </text>
              <text
                x={x + method.width / 2}
                y="168"
                textAnchor="middle"
                fontSize="30"
                fontWeight="700"
                fill={method.accent}
              >
                {method.calls}
              </text>
              <text
                x={x + method.width / 2}
                y="194"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                draw calls / frame
              </text>
              <path
                d={
                  index === 0
                    ? `M${x + 52} 258 H${x + 174}`
                    : `M${x + 52} 258 H${x + 174}`
                }
                stroke={method.accent}
                strokeWidth="8"
              />
              {Array.from({ length: index === 0 ? 8 : 4 }, (_, item) => (
                <circle
                  key={item}
                  cx={x + 62 + item * (index === 0 ? 15 : 32)}
                  cy="258"
                  r="6"
                  fill={method.accent}
                />
              ))}
              <text
                x={x + method.width / 2}
                y="304"
                textAnchor="middle"
                fontSize="13"
                fill={C.text}
              >
                {method.detail}
              </text>
            </g>
          );
        })}
        <Arrow x1={298} y1={212} x2={456} y2={212} color={C.border} />
        <text
          x="380"
          y="244"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          实例化把 CPU 负担交给 GPU，但不会消除像素和顶点成本
        </text>
      </Frame>
    </Figure>
  );
}

const RENDER_STEPS: readonly TeachingStep[] = [
  { label: "group", caption: "CPU 更新动画时间并按 LOD 分组" },
  { label: "bind", caption: "绑定 submesh 与 instance data" },
  { label: "fetch", caption: "vertex shader 读取实例姿态" },
  { label: "shade", caption: "pixel shader 处理颜色和材质" },
];

const RENDER_LABELS: Readonly<Record<string, string>> = {
  bind: "绑定 submesh 与 instance data",
  fetch: "vertex shader 读取实例姿态",
  group: "CPU 更新动画时间并按 LOD 分组",
  shade: "pixel shader 处理颜色和材质",
};

export function GpuGems3Ch02RenderingTimelineDiagram() {
  const groupRef = useRef<SVGGElement>(null);
  const bindRef = useRef<SVGGElement>(null);
  const fetchRef = useRef<SVGGElement>(null);
  const shadeRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: RENDER_STEPS,
    build: (tl) => {
      tl.add(groupRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("group", 0);
      tl.add(bindRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("bind", T);
      tl.add(
        fetchRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("fetch", T * 2);
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
      <Frame label="可控教学动画：Animated Crowd Rendering 从 CPU 的 LOD 分组开始，经过 submesh 绑定、实例姿态读取，到像素颜色处理">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一帧中的四个可检查时刻
        </text>
        <TeachingStage
          stageRef={groupRef}
          number="1"
          label="group"
          detail="LOD lists"
          accent={C.warning}
          x={28}
        />
        <TeachingStage
          stageRef={bindRef}
          number="2"
          label="bind"
          detail="submesh data"
          accent={C.accent}
          x={206}
        />
        <TeachingStage
          stageRef={fetchRef}
          number="3"
          label="fetch"
          detail="pose + skin"
          accent={C.success}
          x={384}
        />
        <TeachingStage
          stageRef={shadeRef}
          number="4"
          label="shade"
          detail="color / texture"
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
          同一批 draw 中，instance id 让每个角色走不同动画数据
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          单步时分别检查：CPU 列表、constant buffer、animation texture、最终颜色
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放、暂停、单步或拖动进度，观察 CPU/GPU 职责如何交接
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={RENDER_LABELS}
        caption="动画不是把所有角色塞进同一个姿势，而是共享绘制入口、分离实例状态。"
      />
    </Figure>
  );
}

type CrowdMode = "individual" | "instanced";

const CROWD_MODE_LABELS: Record<CrowdMode, string> = {
  individual: "逐角色提交",
  instanced: "skinned instancing",
};

export function GpuGems3Ch02AnimatedCrowdLab() {
  const [mode, setMode] = useState<CrowdMode>("instanced");
  const [characters, setCharacters] = useState(7600);
  const [nearRadius, setNearRadius] = useState(20);
  const [farRadius, setFarRadius] = useState(100);
  const [cullBehindCamera, setCullBehindCamera] = useState(true);

  const metrics = useMemo(() => {
    const visibleRatio = cullBehindCamera ? 0.72 : 1;
    const visibleCharacters = Math.round(characters * visibleRatio);
    const instancedBatch = Math.max(1, Math.ceil(visibleCharacters / 819));
    const drawCalls =
      mode === "individual" ? visibleCharacters : instancedBatch * 3;
    const gpuPoseReads = Math.round(
      visibleCharacters * (0.68 + nearRadius / 300),
    );
    const farShare = Math.min(0.9, Math.max(0.18, farRadius / 180));
    const farCharacters = Math.round(
      visibleCharacters * Math.max(farShare - nearRadius / 260, 0.08),
    );
    const note =
      mode === "individual"
        ? "逐角色提交让每个人都能独立更新，但 CPU draw-call 压力会随人数线性增长。"
        : cullBehindCamera
          ? "实例化已把低频数据放进 constant buffer；背后的角色先被 CPU 剔除，远处角色再降 LOD。"
          : "误区：不做视锥剔除，实例化仍会把镜头后的角色送进 GPU；少 draw call 不等于少工作。";
    return {
      drawCalls,
      farCharacters,
      gpuPoseReads,
      instancedBatch,
      note,
      visibleCharacters,
    };
  }, [characters, cullBehindCamera, farRadius, mode, nearRadius]);

  function reset() {
    setMode("instanced");
    setCharacters(7600);
    setNearRadius(20);
    setFarRadius(100);
    setCullBehindCamera(true);
  }

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="选择 crowd 提交方式"
          >
            {(Object.keys(CROWD_MODE_LABELS) as CrowdMode[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${mode === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
              >
                {CROWD_MODE_LABELS[key]}
              </button>
            ))}
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <p className="mb-3 text-sm font-semibold text-primary">
              调整 crowd 预算：先预测 CPU 还是 GPU 先吃满
            </p>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch02-characters"
            >
              character count · {characters.toLocaleString()}
              <input
                id="gpu-gems3-ch02-characters"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={characters}
                onChange={(event) => setCharacters(Number(event.target.value))}
              />
            </label>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch02-near-radius"
            >
              near LOD radius · {nearRadius}
              <input
                id="gpu-gems3-ch02-near-radius"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="10"
                max="80"
                value={nearRadius}
                onChange={(event) => setNearRadius(Number(event.target.value))}
              />
            </label>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch02-far-radius"
            >
              far LOD radius · {farRadius}
              <input
                id="gpu-gems3-ch02-far-radius"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="60"
                max="160"
                value={farRadius}
                onChange={(event) => setFarRadius(Number(event.target.value))}
              />
            </label>
            <label
              className="flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch02-cull"
            >
              <input
                id="gpu-gems3-ch02-cull"
                type="checkbox"
                checked={cullBehindCamera}
                onChange={(event) => setCullBehindCamera(event.target.checked)}
                className="size-4 accent-accent"
              />
              开启 view-frustum culling（关闭以注入误区）
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
            label="visible characters"
            value={metrics.visibleCharacters.toLocaleString()}
            tone={C.success}
          />
          <Metric
            label="draw calls / frame"
            value={metrics.drawCalls.toLocaleString()}
            tone={C.accent}
          />
          <Metric
            label="constant-buffer batches"
            value={`${metrics.instancedBatch}`}
            tone={C.warning}
          />
          <Metric
            label="far-LOD candidates"
            value={metrics.farCharacters.toLocaleString()}
            tone={C.warning}
          />
          <Metric
            label="estimated pose reads"
            value={metrics.gpuPoseReads.toLocaleString()}
            tone={C.danger}
          />
          <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-secondary">
            {metrics.note}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-surface px-4 py-3">
        <p className="text-xs text-secondary">
          提高 far radius 会保留更多细节；提高 near radius 会让更多角色承担高
          LOD 几何。
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
