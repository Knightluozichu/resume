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

export function GpuGems3Ch03BlendShapePipelineDiagram() {
  return (
    <Figure>
      <Frame label="blend shapes 的基本模型：neutral mesh 加上多个带权重的顶点 delta，得到最终的表情 mesh；不改变的纹理坐标可以继续复用">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          表情不是一张新网格，而是 neutral 上的加权 delta
        </text>
        <Box
          accent={C.accent}
          detail="position · normal · tangent"
          label="neutral mesh"
          x={38}
          y={112}
          width={160}
        />
        <Box
          accent={C.warning}
          detail="D₁…Dₙ · per-vertex delta"
          label="expression deltas"
          x={230}
          y={112}
          width={160}
        />
        <Box
          accent={C.success}
          detail="w₁…wₙ · active set"
          label="weighted sum"
          x={422}
          y={112}
          width={142}
        />
        <Box
          accent={C.accent}
          detail="final position + shading"
          label="final face"
          x={596}
          y={112}
          width={126}
        />
        <Arrow x1={202} y1={156} x2={230} y2={156} />
        <Arrow x1={394} y1={156} x2={422} y2={156} />
        <Arrow x1={568} y1={156} x2={596} y2={156} />
        <path
          d="M310 210 C310 278 128 278 128 210"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={128} y1={210} x2={128} y2={242} color={C.border} />
        <text
          x="380"
          y="258"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          P_final = P_neutral + Σ(weightᵢ × deltaᵢ)
        </text>
        <text
          x="380"
          y="300"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          位置、法线和切线可以改变；不变的 UV 不必重复存储
        </text>
        <text
          x="380"
          y="344"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          同一套表达式组件可以组合出眨眼、挑眉、微笑等复合表情
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch03AttributeLimitDiagram() {
  return (
    <Figure>
      <Frame label="DirectX 10 顶点属性预算：neutral mesh 加四个 active blend shapes 已接近十六个属性上限，而五十四个表达式若同时绑定会远超预算">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先撞到的是输入槽上限，不是表情数量上限
        </text>
        <rect
          x="46"
          y="84"
          width="300"
          height="274"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="196"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          一个 pass：neutral + 4 shapes
        </text>
        {Array.from({ length: 16 }, (_, index) => (
          <rect
            key={index}
            x={80 + (index % 4) * 54}
            y={144 + Math.floor(index / 4) * 38}
            width="42"
            height="26"
            rx="5"
            fill={index < 5 ? C.success : C.border}
            fillOpacity={index < 5 ? 0.62 : 0.25}
            stroke={index < 5 ? C.success : C.border}
          />
        ))}
        <text
          x="196"
          y="326"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          5 个 slot 组装出最多 4 个 active delta
        </text>
        <Arrow x1={366} y1={220} x2={410} y2={220} color={C.border} />
        <rect
          x="410"
          y="84"
          width="304"
          height="274"
          rx="14"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="562"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          全部 54 shapes 同时绑定
        </text>
        {Array.from({ length: 30 }, (_, index) => (
          <rect
            key={index}
            x={438 + (index % 6) * 40}
            y={142 + Math.floor(index / 6) * 34}
            width="30"
            height="22"
            rx="4"
            fill={C.danger}
            fillOpacity="0.34"
            stroke={C.danger}
          />
        ))}
        <text
          x="562"
          y="326"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          54 组表达式会形成远超上限的属性宽度
        </text>
        <text
          x="380"
          y="394"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          解决思路：分 pass，或把 delta 放进 GPU buffer 后在 shader 内读取
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch03StreamOutMethodDiagram() {
  return (
    <Figure>
      <Frame label="stream-out 方法：每个 pass 最多合并四个 active blend shapes，顶点着色器写入下一轮输入 buffer，两个 buffer 交替 ping-pong，最后再正常绘制">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          多 pass 换输入宽度：每轮只处理一小组 delta
        </text>
        <rect
          x="38"
          y="96"
          width="152"
          height="202"
          rx="14"
          fill={C.accent}
          fillOpacity="0.1"
          stroke={C.accent}
        />
        <text
          x="114"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          pass 1
        </text>
        <text x="114" y="162" textAnchor="middle" fontSize="13" fill={C.text}>
          neutral
        </text>
        <text
          x="114"
          y="192"
          textAnchor="middle"
          fontSize="13"
          fill={C.warning}
        >
          + A + B + C + D
        </text>
        <text
          x="114"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          write result
        </text>
        <Arrow x1={204} y1={196} x2={244} y2={196} />
        <rect
          x="244"
          y="96"
          width="152"
          height="202"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="320"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          pass 2
        </text>
        <text x="320" y="162" textAnchor="middle" fontSize="13" fill={C.text}>
          result 1
        </text>
        <text
          x="320"
          y="192"
          textAnchor="middle"
          fontSize="13"
          fill={C.warning}
        >
          + E + F + G + H
        </text>
        <text
          x="320"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          write result
        </text>
        <Arrow x1={410} y1={196} x2={450} y2={196} />
        <rect
          x="450"
          y="96"
          width="152"
          height="202"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="526"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          pass 3…N
        </text>
        <text x="526" y="162" textAnchor="middle" fontSize="13" fill={C.text}>
          result 2
        </text>
        <text
          x="526"
          y="192"
          textAnchor="middle"
          fontSize="13"
          fill={C.success}
        >
          + next groups
        </text>
        <text
          x="526"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          write result
        </text>
        <Arrow x1={616} y1={196} x2={656} y2={196} />
        <rect
          x="656"
          y="96"
          width="78"
          height="202"
          rx="14"
          fill={C.accent}
          fillOpacity="0.1"
          stroke={C.accent}
        />
        <text
          x="695"
          y="160"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.accent}
        >
          draw
        </text>
        <text
          x="695"
          y="194"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          final
        </text>
        <text
          x="695"
          y="224"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          mesh
        </text>
        <path
          d="M102 320 C102 360 350 360 350 320 M350 320 C350 360 570 360 570 320"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="380"
          y="348"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          buffer A / B 交替：输入和输出不在同一块 buffer
        </text>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          适合：active shapes 较少，或想把最终结果缓存下来
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch03BufferTemplateDiagram() {
  return (
    <Figure>
      <Frame label="buffer-template 方法：neutral mesh 从 input assembler 进入，blend shape buffer 作为 shader resource view，active indices 和 weights 控制顶点着色器内的循环，单次 draw 得到最终顶点">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把迭代留在 vertex shader：一次 draw，按需 Load delta
        </text>
        <Box
          accent={C.accent}
          detail="position · normal · tangent · UV"
          label="neutral mesh"
          x={38}
          y={116}
          width={160}
        />
        <Box
          accent={C.warning}
          detail="immutable SRV buffer"
          label="all deltas"
          x={236}
          y={116}
          width={160}
        />
        <Box
          accent={C.success}
          detail="indices + weights + numBS"
          label="active list"
          x={434}
          y={116}
          width={142}
        />
        <Box
          accent={C.accent}
          detail="SV_VertexID → Load loop"
          label="vertex shader"
          x={614}
          y={116}
          width={108}
        />
        <Arrow x1={202} y1={160} x2={236} y2={160} />
        <Arrow x1={400} y1={160} x2={434} y2={160} />
        <Arrow x1={580} y1={160} x2={614} y2={160} />
        <path
          d="M520 216 C520 286 134 286 134 216"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={134} y1={216} x2={134} y2={248} color={C.border} />
        <text
          x="380"
          y="264"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          for each active shape: offset → Load(delta) → add(weight × delta)
        </text>
        <text
          x="380"
          y="306"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          buffer 可容纳远超输入槽的静态数据；每个顶点只读取当前需要的表达式
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          代价从多次 stream-out 变成 vertex shader 的循环与 buffer 读取
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch03ExpressionGridDiagram() {
  return (
    <Figure>
      <Frame label="复合表情的权重空间：横轴控制主要表情从 A 到 B 的插值，纵轴叠加眨眼等正交表情，多个组件可以同时影响最终面部">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          主要表情与正交表情可以叠加
        </text>
        <rect
          x="72"
          y="84"
          width="300"
          height="280"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <line
          x1="112"
          y1="318"
          x2="332"
          y2="318"
          stroke={C.border}
          strokeWidth="2"
        />
        <line
          x1="112"
          y1="318"
          x2="112"
          y2="126"
          stroke={C.border}
          strokeWidth="2"
        />
        <text x="332" y="342" textAnchor="end" fontSize="13" fill={C.secondary}>
          base B
        </text>
        <text
          x="112"
          y="114"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          blink
        </text>
        <text
          x="112"
          y="342"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          base A
        </text>
        <path
          d="M126 300 C168 278 182 236 218 240 C254 244 264 182 318 150"
          fill="none"
          stroke={C.warning}
          strokeWidth="5"
        />
        <circle cx="218" cy="240" r="8" fill={C.success} />
        <text x="238" y="232" fontSize="12" fill={C.success}>
          A → B + blink
        </text>
        <text
          x="222"
          y="382"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          权重不是只能选一个表情
        </text>
        <Arrow x1={396} y1={220} x2={438} y2={220} />
        <rect
          x="438"
          y="84"
          width="274"
          height="280"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="575"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          active weights
        </text>
        <text x="575" y="160" textAnchor="middle" fontSize="14" fill={C.text}>
          base_B = 0.65
        </text>
        <text x="575" y="194" textAnchor="middle" fontSize="14" fill={C.text}>
          blink = 0.35
        </text>
        <text x="575" y="228" textAnchor="middle" fontSize="14" fill={C.text}>
          smirk = 0.20
        </text>
        <path d="M500 278 H650" stroke={C.success} strokeWidth="8" />
        <circle cx="598" cy="278" r="10" fill={C.warning} />
        <text
          x="575"
          y="318"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          每帧只把非零项放入 active list
        </text>
        <text
          x="575"
          y="342"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          numBS 控制 shader 循环长度
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch03MethodCompareDiagram() {
  return (
    <Figure>
      <Frame label="两种 GPU blend shape 方法对比：stream-out 以多次 pass 累积结果并能缓存最终 mesh，buffer-template 在一次 vertex shader 中循环读取 active delta，减少中间流转">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          多 pass 的可缓存性，换一次 draw 的 shader 循环
        </text>
        <rect
          x="44"
          y="84"
          width="308"
          height="274"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="198"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.warning}
        >
          stream-out
        </text>
        <text
          x="198"
          y="150"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          pass 数随 active shapes 增长
        </text>
        {Array.from({ length: 5 }, (_, index) => (
          <g key={index}>
            <rect
              x={82 + index * 40}
              y={188}
              width="30"
              height="58"
              rx="6"
              fill={index % 2 === 0 ? C.accent : C.success}
              fillOpacity="0.35"
              stroke={index % 2 === 0 ? C.accent : C.success}
            />
            <text
              x={97 + index * 40}
              y="222"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              {index + 1}
            </text>
          </g>
        ))}
        <text x="198" y="282" textAnchor="middle" fontSize="13" fill={C.text}>
          优点：结果可 stream-out 后复用
        </text>
        <text
          x="198"
          y="316"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          代价：中间 buffer 往返与多次提交
        </text>
        <Arrow x1={368} y1={220} x2={406} y2={220} color={C.border} />
        <rect
          x="406"
          y="84"
          width="310"
          height="274"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="561"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.success}
        >
          buffer template
        </text>
        <text
          x="561"
          y="150"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          一次 draw · shader 内循环
        </text>
        <path
          d="M458 214 H662 M458 244 H662 M458 274 H662"
          stroke={C.success}
          strokeWidth="7"
        />
        <path
          d="M602 196 C652 196 652 294 602 294"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text x="561" y="316" textAnchor="middle" fontSize="13" fill={C.text}>
          优点：active shapes 多时更少 API 流转
        </text>
        <text
          x="561"
          y="340"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          代价：shader Load 与循环成本会增长
        </text>
      </Frame>
    </Figure>
  );
}

const BLEND_STEPS: readonly TeachingStep[] = [
  { label: "delta", caption: "准备 neutral 与 per-vertex delta" },
  { label: "budget", caption: "按属性预算选择 active 子集" },
  { label: "accumulate", caption: "stream-out 或 shader loop 累积" },
  { label: "render", caption: "绘制最终 mesh 或缓存结果" },
];

const BLEND_LABELS: Readonly<Record<string, string>> = {
  accumulate: "stream-out 或 shader loop 累积",
  budget: "按属性预算选择 active 子集",
  delta: "准备 neutral 与 per-vertex delta",
  render: "绘制最终 mesh 或缓存结果",
};

export function GpuGems3Ch03RenderingTimelineDiagram() {
  const deltaRef = useRef<SVGGElement>(null);
  const budgetRef = useRef<SVGGElement>(null);
  const accumulateRef = useRef<SVGGElement>(null);
  const renderRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: BLEND_STEPS,
    build: (tl) => {
      tl.add(deltaRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("delta", 0);
      tl.add(budgetRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("budget", T);
      tl.add(
        accumulateRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("accumulate", T * 2);
      tl.add(
        renderRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("render", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可控教学动画：blend shapes 从 delta 数据准备开始，经过属性预算，再选择 stream-out 或 buffer-template 累积，最后绘制或缓存最终网格">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一帧里最重要的四个检查点
        </text>
        <TeachingStage
          stageRef={deltaRef}
          number="1"
          label="delta"
          detail="neutral + vectors"
          accent={C.warning}
          x={28}
        />
        <TeachingStage
          stageRef={budgetRef}
          number="2"
          label="budget"
          detail="16 attributes"
          accent={C.accent}
          x={206}
        />
        <TeachingStage
          stageRef={accumulateRef}
          number="3"
          label="accumulate"
          detail="passes / Load loop"
          accent={C.success}
          x={384}
        />
        <TeachingStage
          stageRef={renderRef}
          number="4"
          label="render"
          detail="draw / cache"
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
          先问“数据在哪里”，再问“要调用几次”
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          单步观察：输入槽限制如何被拆开，或如何被 shader buffer 读取绕过
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放、暂停、单步或拖动进度，比较两条路线的中间状态
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={BLEND_LABELS}
        caption="多 pass 与单 pass 不是绝对优劣，而是缓存、提交和 shader 读取之间的取舍。"
      />
    </Figure>
  );
}

type BlendMode = "streamOut" | "bufferTemplate";

const BLEND_MODE_LABELS: Record<BlendMode, string> = {
  bufferTemplate: "buffer-template",
  streamOut: "stream-out",
};

export function GpuGems3Ch03BlendShapeLab() {
  const [mode, setMode] = useState<BlendMode>("bufferTemplate");
  const [activeShapes, setActiveShapes] = useState(18);
  const [componentsPerShape, setComponentsPerShape] = useState(3);
  const [compressDeltas, setCompressDeltas] = useState(false);
  const [saveResult, setSaveResult] = useState(false);

  const metrics = useMemo(() => {
    const attributeBudget = compressDeltas ? 24 : 16;
    const shapesPerPass = Math.max(
      1,
      Math.floor((attributeBudget - 1) / componentsPerShape),
    );
    const passes =
      mode === "streamOut" ? Math.ceil(activeShapes / shapesPerPass) : 1;
    const drawCalls = mode === "streamOut" ? passes + 1 : 1;
    const deltaReads = mode === "streamOut" ? activeShapes : activeShapes * 3;
    const attributePressure = Math.min(
      100,
      Math.round(
        ((componentsPerShape * Math.min(activeShapes, shapesPerPass)) /
          attributeBudget) *
          100,
      ),
    );
    const note =
      mode === "streamOut"
        ? saveResult
          ? "stream-out 多 pass 后保留最终 vertex buffer，适合定制完成后反复绘制。"
          : "stream-out 让每轮输入保持窄，但 active shapes 越多，buffer 往返和 pass 越多。"
        : saveResult
          ? "buffer-template 仍需一次 shader loop；若要跨帧复用，可额外安排一次 stream-out 缓存。"
          : "单次 draw 把迭代留在 vertex shader，active list 决定 Load 次数，不受输入槽数量直接限制。";
    return {
      attributePressure,
      deltaReads,
      drawCalls,
      note,
      passes,
      shapesPerPass,
    };
  }, [activeShapes, componentsPerShape, compressDeltas, mode, saveResult]);

  function reset() {
    setMode("bufferTemplate");
    setActiveShapes(18);
    setComponentsPerShape(3);
    setCompressDeltas(false);
    setSaveResult(false);
  }

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="选择 blend shape 累积方法"
          >
            {(Object.keys(BLEND_MODE_LABELS) as BlendMode[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${mode === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
              >
                {BLEND_MODE_LABELS[key]}
              </button>
            ))}
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <p className="mb-3 text-sm font-semibold text-primary">
              调整表情预算：先预测 pass 还是 shader Load 上升
            </p>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch03-active-shapes"
            >
              active blend shapes · {activeShapes}
              <input
                id="gpu-gems3-ch03-active-shapes"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="2"
                max="54"
                value={activeShapes}
                onChange={(event) =>
                  setActiveShapes(Number(event.target.value))
                }
              />
            </label>
            <label
              className="mb-4 block text-sm text-secondary"
              htmlFor="gpu-gems3-ch03-components"
            >
              delta channels / shape · {componentsPerShape}
              <input
                id="gpu-gems3-ch03-components"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="1"
                max="4"
                value={componentsPerShape}
                onChange={(event) =>
                  setComponentsPerShape(Number(event.target.value))
                }
              />
            </label>
            <label
              className="mb-3 flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch03-compress"
            >
              <input
                id="gpu-gems3-ch03-compress"
                type="checkbox"
                checked={compressDeltas}
                onChange={(event) => setCompressDeltas(event.target.checked)}
                className="size-4 accent-accent"
              />
              压缩 delta，放宽示意属性预算
            </label>
            <label
              className="flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch03-save"
            >
              <input
                id="gpu-gems3-ch03-save"
                type="checkbox"
                checked={saveResult}
                onChange={(event) => setSaveResult(event.target.checked)}
                className="size-4 accent-accent"
              />
              保留最终结果供后续绘制
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
            label="blend passes"
            value={`${metrics.passes}`}
            tone={C.accent}
          />
          <Metric
            label="API / draw calls"
            value={`${metrics.drawCalls}`}
            tone={C.warning}
          />
          <Metric
            label="shapes per stream pass"
            value={`${metrics.shapesPerPass}`}
            tone={C.success}
          />
          <Metric
            label="delta reads / vertex"
            value={`${metrics.deltaReads}`}
            tone={C.danger}
          />
          <Metric
            label="attribute pressure"
            value={`${metrics.attributePressure}%`}
            tone={C.warning}
          />
          <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-secondary">
            {metrics.note}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-surface px-4 py-3">
        <p className="text-xs text-secondary">
          提高 active shapes 会增加表情自由度；是否变慢取决于 pass、Load
          循环和是否需要跨帧复用。
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
