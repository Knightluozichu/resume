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

function StageBox({
  accent,
  detail,
  label,
  x,
  y,
  width = 156,
}: {
  accent: string;
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
        rx="14"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 37}
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

export function GpuGems3Ch05GamerPipelineDiagram() {
  return (
    <Figure>
      <Frame label="GAMeR 管线：CPU 只上传 coarse mesh 和 depth tag，GPU 从 ARP pool 选择模式，用 barycentric interpolation 细分并应用 displacement function">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          低模输入，GPU 现场长出高模
        </text>
        <StageBox
          accent={C.accent}
          detail="positions + attributes"
          label="coarse mesh"
          x={24}
          y={104}
          width={144}
        />
        <StageBox
          accent={C.warning}
          detail="distance / curvature"
          label="depth tags"
          x={198}
          y={104}
          width={144}
        />
        <StageBox
          accent={C.success}
          detail="indexed barycentric nodes"
          label="ARP pool"
          x={372}
          y={104}
          width={144}
        />
        <StageBox
          accent={C.accent}
          detail="tessellate + displace"
          label="one vertex pass"
          x={546}
          y={104}
          width={190}
        />
        <Arrow x1={168} y1={150} x2={198} y2={150} color={C.border} />
        <Arrow x1={342} y1={150} x2={372} y2={150} color={C.border} />
        <Arrow x1={516} y1={150} x2={546} y2={150} color={C.border} />
        <rect
          x="74"
          y="260"
          width="612"
          height="94"
          rx="16"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="292"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          CPU 不生成 target mesh，也不往 graphics bus 发送它
        </text>
        <text
          x="380"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          顶点程序先把节点放回 coarse triangle，再沿 displacement function 移动
        </text>
        <text
          x="380"
          y="348"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          省下 CPU、总线和 GPU 存储；新的瓶颈变成 vertex-processing horsepower
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch05PatternPoolDiagram() {
  return (
    <Figure>
      <Frame label="ARP pool：用三个边深度索引三维模式矩阵，对角线是 uniform refinement，非对角位置是 adaptive refinement">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          ARP pool 是“同一个三角形的所有细分答案”
        </text>
        <g transform="translate(38 82)">
          <rect
            width="310"
            height="274"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="155"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3D pattern matrix
          </text>
          <text
            x="155"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            edge depths i · j · k
          </text>
          <path
            d="M48 224 L226 224 L226 74"
            fill="none"
            stroke={C.border}
            strokeWidth="3"
          />
          <text x="238" y="228" fontSize="12" fill={C.secondary}>
            j
          </text>
          <text x="218" y="68" fontSize="12" fill={C.secondary}>
            i
          </text>
          <text x="36" y="246" fontSize="12" fill={C.secondary}>
            k
          </text>
          {Array.from({ length: 9 }, (_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const uniform = row === col;
            return (
              <rect
                key={`pool-${index}`}
                x={68 + col * 48}
                y={92 + row * 42}
                width="34"
                height="28"
                rx="5"
                fill={uniform ? C.success : C.accent}
                fillOpacity={uniform ? 0.34 : 0.16}
                stroke={uniform ? C.success : C.accent}
              />
            );
          })}
          <text
            x="155"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每个 configuration 只存一次
          </text>
        </g>
        <Arrow x1={376} y1={218} x2={414} y2={218} />
        <g transform="translate(424 82)">
          <rect
            width="298"
            height="274"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="149"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            选中的模式
          </text>
          <path
            d="M58 220 L150 78 L254 220 Z"
            fill={C.warning}
            fillOpacity="0.08"
            stroke={C.warning}
            strokeWidth="3"
          />
          <path
            d="M58 220 H254 M104 149 L202 149 M81 184 L230 184 M104 149 L150 78 L202 149 M81 184 L104 149 M230 184 L202 149"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle cx="104" cy="149" r="6" fill={C.success} />
          <circle cx="202" cy="149" r="6" fill={C.success} />
          <circle cx="150" cy="78" r="6" fill={C.success} />
          <text
            x="149"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            例如 {`{ i=2, j=3, k=4 }`} 的 adaptive patch
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch05BarycentricDiagram() {
  return (
    <Figure>
      <Frame label="barycentric interpolation：ARP 节点的三个权重把 coarse triangle 的位置、法线和其他属性插值到细分节点，再由 displacement function 移动顶点">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          同一组 barycentric 坐标可以复用到任何三角形
        </text>
        <g transform="translate(36 82)">
          <rect
            width="310"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="155"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            coarse triangle
          </text>
          <path
            d="M54 240 L154 78 L264 240 Z"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="54" cy="240" r="8" fill={C.warning} />
          <circle cx="154" cy="78" r="8" fill={C.warning} />
          <circle cx="264" cy="240" r="8" fill={C.warning} />
          <text x="42" y="264" fontSize="12" fill={C.secondary}>
            p0
          </text>
          <text
            x="154"
            y="66"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            p1
          </text>
          <text x="270" y="264" fontSize="12" fill={C.secondary}>
            p2
          </text>
          <circle cx="157" cy="186" r="8" fill={C.success} />
          <text x="184" y="190" fontSize="12" fill={C.secondary}>
            w0 + w1 + w2 = 1
          </text>
          <text
            x="155"
            y="314"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ARP stores coordinates, not world positions
          </text>
        </g>
        <Arrow x1={374} y1={220} x2={412} y2={220} />
        <g transform="translate(424 82)">
          <rect
            width="298"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="149"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            vertex program
          </text>
          <path
            d="M58 240 L154 78 L266 240 Z"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="3"
          />
          {Array.from({ length: 10 }, (_, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            return (
              <circle
                key={`node-${index}`}
                cx={92 + col * 32 + row * 8}
                cy={204 - row * 42 + (col % 2) * 5}
                r="5"
                fill={C.accent}
              />
            );
          })}
          <path
            d="M154 78 C188 106 208 150 222 194"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <polygon points="222,194 210,188 216,180" fill={C.warning} />
          <text
            x="149"
            y="286"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            tessellate → sample displacement → shade
          </text>
          <text
            x="149"
            y="314"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            位置、法线和其他属性可分别插值
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch05CrackFreeDiagram() {
  return (
    <Figure>
      <Frame label="相邻三角形的 crack-free adaptive refinement：共享边用相邻顶点 depth tag 的均值确定同一个 edge depth，避免一侧细分而另一侧出现缝隙">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          裂缝来自共享边的答案不一致
        </text>
        <g transform="translate(30 84)">
          <rect
            width="300"
            height="270"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="150"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            错误：两侧各算各的
          </text>
          <path
            d="M56 234 L150 82 L244 234 Z M150 82 L244 234 L286 142 Z"
            fill={C.danger}
            fillOpacity="0.07"
            stroke={C.danger}
            strokeWidth="3"
          />
          <path
            d="M56 234 H244 M150 82 L190 158"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <circle cx="190" cy="158" r="8" fill={C.danger} />
          <text
            x="150"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            共享边节点错位 → crack
          </text>
        </g>
        <Arrow x1={350} y1={218} x2={388} y2={218} />
        <g transform="translate(398 84)">
          <rect
            width="332"
            height="270"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="166"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            正确：先统一 edge depth
          </text>
          <path
            d="M56 234 L150 82 L244 234 Z M150 82 L244 234 L286 142 Z"
            fill={C.success}
            fillOpacity="0.07"
            stroke={C.success}
            strokeWidth="3"
          />
          <path
            d="M150 82 L197 158 L244 234"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="197" cy="158" r="8" fill={C.success} />
          <text
            x="166"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            tag(v0, v1) 的均值 → 同一组边节点
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch05BottleneckDiagram() {
  return (
    <Figure>
      <Frame label="GAMeR 的瓶颈图：输入 coarse mesh 很大且细分浅时更容易受 CPU attribute upload 限制；输入很粗且细分深时瓶颈转为 GPU vertex processing">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          coarse-to-refined 比率决定谁在等谁
        </text>
        <line
          x1="92"
          y1="328"
          x2="674"
          y2="328"
          stroke={C.border}
          strokeWidth="3"
        />
        <line
          x1="92"
          y1="78"
          x2="92"
          y2="328"
          stroke={C.border}
          strokeWidth="3"
        />
        <text
          x="380"
          y="362"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          refined triangles / coarse triangles →
        </text>
        <text
          x="34"
          y="205"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
          transform="rotate(-90 34 205)"
        >
          relative work
        </text>
        <path
          d="M116 118 C202 160 280 228 374 290"
          fill="none"
          stroke={C.warning}
          strokeWidth="5"
        />
        <path
          d="M116 298 C218 284 314 222 402 136"
          fill="none"
          stroke={C.accent}
          strokeWidth="5"
        />
        <circle cx="164" cy="144" r="8" fill={C.warning} />
        <circle cx="578" cy="176" r="8" fill={C.accent} />
        <text x="188" y="132" fontSize="13" fontWeight="700" fill={C.warning}>
          CPU upload / bind
        </text>
        <text x="188" y="154" fontSize="12" fill={C.secondary}>
          coarse mesh 大，depth 小
        </text>
        <text
          x="520"
          y="164"
          textAnchor="end"
          fontSize="13"
          fontWeight="700"
          fill={C.accent}
        >
          GPU vertex work
        </text>
        <text x="520" y="186" textAnchor="end" fontSize="12" fill={C.secondary}>
          coarse mesh 小，depth 大
        </text>
        <rect
          x="266"
          y="214"
          width="206"
          height="54"
          rx="12"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
        />
        <text
          x="369"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          sweet spot
        </text>
        <text
          x="369"
          y="258"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          少上传，深细分在 GPU
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch05ApplicationDiagram() {
  return (
    <Figure>
      <Frame label="GAMeR 的应用范围：同一套自适应细分内核可以接 Bézier smoothing、procedural displacement、animated deformation、height map terrain 等不同 displacement function">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          变化的是 displacement function，不变的是细分内核
        </text>
        <rect
          x="264"
          y="166"
          width="232"
          height="108"
          rx="16"
          fill={C.accent}
          fillOpacity="0.14"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text
          x="380"
          y="204"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          barycentric kernel
        </text>
        <text
          x="380"
          y="234"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          same ARP + same vertex pass
        </text>
        <text
          x="380"
          y="256"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          position / normal / attributes
        </text>
        {[
          ["Bézier smoothing", 58, 86, C.warning],
          ["procedural detail", 548, 86, C.success],
          ["animated deformation", 58, 310, C.success],
          ["height-map terrain", 548, 310, C.warning],
        ].map(([label, x, y, color]) => (
          <g key={String(label)}>
            <rect
              x={Number(x)}
              y={Number(y)}
              width="154"
              height="56"
              rx="10"
              fill={String(color)}
              fillOpacity="0.12"
              stroke={String(color)}
            />
            <text
              x={Number(x) + 77}
              y={Number(y) + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              {String(label)}
            </text>
            <text
              x={Number(x) + 77}
              y={Number(y) + 44}
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              new displacement
            </text>
          </g>
        ))}
        <Arrow x1={212} y1={114} x2={286} y2={166} color={C.border} />
        <Arrow x1={548} y1={114} x2={474} y2={166} color={C.border} />
        <Arrow x1={212} y1={338} x2={286} y2={274} color={C.border} />
        <Arrow x1={548} y1={338} x2={474} y2={274} color={C.border} />
      </Frame>
    </Figure>
  );
}

const GAMER_STEPS: readonly TeachingStep[] = [
  { label: "tag", caption: "为 coarse mesh 的顶点计算 depth tag" },
  { label: "pattern", caption: "按三个 edge depth 选择 ARP" },
  { label: "interpolate", caption: "用 barycentric 坐标放置细分节点" },
  { label: "displace", caption: "采样 displacement function 并输出" },
];

const GAMER_LABELS: Readonly<Record<string, string>> = {
  displace: "采样 displacement function 并输出",
  interpolate: "用 barycentric 坐标放置细分节点",
  pattern: "按三个 edge depth 选择 ARP",
  tag: "为 coarse mesh 的顶点计算 depth tag",
};

export function GpuGems3Ch05RenderingTimelineDiagram() {
  const tagRef = useRef<SVGGElement>(null);
  const patternRef = useRef<SVGGElement>(null);
  const interpolateRef = useRef<SVGGElement>(null);
  const displaceRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: GAMER_STEPS,
    build: (tl) => {
      tl.add(tagRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("tag", 0);
      tl.add(patternRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("pattern", T);
      tl.add(
        interpolateRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("interpolate", T * 2);
      tl.add(
        displaceRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("displace", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可控教学动画：GAMeR 从 depth tagging 开始，选择 ARP，再用 barycentric interpolation 完成细分，最后采样 displacement function">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一次 vertex pass 里的四个决定
        </text>
        <TeachingStage
          stageRef={tagRef}
          number="1"
          label="tag"
          detail="per-vertex LOD"
          accent={C.warning}
          x={28}
        />
        <TeachingStage
          stageRef={patternRef}
          number="2"
          label="pattern"
          detail="ARP index"
          accent={C.accent}
          x={206}
        />
        <TeachingStage
          stageRef={interpolateRef}
          number="3"
          label="interpolate"
          detail="barycentric"
          accent={C.success}
          x={384}
        />
        <TeachingStage
          stageRef={displaceRef}
          number="4"
          label="displace"
          detail="sample + shade"
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
          先确定“需要多细”，再确定“如何长出来”
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          单步观察：depth tag 只选模式，barycentric 坐标才放置节点
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放、暂停、单步或拖动进度，比较细分与位移的两个阶段
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={GAMER_LABELS}
        caption="GAMeR 把 topology 选择和 displacement 采样放进同一个 vertex program。"
      />
    </Figure>
  );
}

type TagMode = "curvature" | "distance" | "importance";

const TAG_MODE_LABELS: Record<TagMode, string> = {
  curvature: "curvature",
  distance: "distance",
  importance: "importance",
};

export function GpuGems3Ch05AdaptiveRefinementLab() {
  const [depth, setDepth] = useState(4);
  const [coarseTriangles, setCoarseTriangles] = useState(800);
  const [tagMode, setTagMode] = useState<TagMode>("distance");
  const [displacement, setDisplacement] = useState(62);
  const [animated, setAnimated] = useState(true);

  const metrics = useMemo(() => {
    const refinedPerTriangle = 4 ** depth;
    const refinedTriangles = coarseTriangles * refinedPerTriangle;
    const uploadRecords = Math.round(
      coarseTriangles *
        (tagMode === "curvature" ? 1.25 : tagMode === "importance" ? 0.82 : 1),
    );
    const vertexWork = Math.round(refinedTriangles * (1 + displacement / 180));
    const ratio = refinedTriangles / Math.max(1, coarseTriangles);
    const bottleneck =
      ratio < 8 ? "coarse upload / ARP binds" : "GPU vertex processing";
    const modeNote = animated
      ? "per-frame tags can follow motion"
      : "static tags can be reused";
    return {
      bottleneck,
      modeNote,
      ratio,
      refinedTriangles,
      uploadRecords,
      vertexWork,
    };
  }, [animated, coarseTriangles, depth, displacement, tagMode]);

  function reset() {
    setDepth(4);
    setCoarseTriangles(800);
    setTagMode("distance");
    setDisplacement(62);
    setAnimated(true);
  }

  const previewDepth = Math.min(5, depth);
  const gridSize = 2 ** previewDepth;

  return (
    <Figure>
      <section
        className="not-prose overflow-hidden rounded-card border border-border bg-elevated"
        aria-label="GPU Gems 3 Chapter 5 GAMeR 自适应细分实验：调整细分深度、coarse triangle 数、depth tag 方式、displacement 和动画状态"
        data-visual-kind="gpu-gems3-ch05-adaptive-refinement"
      >
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-primary">
            GAMeR 自适应细分实验
          </p>
          <p className="mt-1 text-sm text-secondary">
            先预测：把 depth 调高时，CPU 上传记录还是 GPU vertex work
            会更快上涨？把 coarse mesh 变大后，答案会不会反过来？
          </p>
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
            <svg
              viewBox="0 0 620 320"
              role="img"
              aria-label="GAMeR 实验预览：一个 coarse triangle 被按 depth 细分，中心区域沿 displacement function 起伏"
              className="block h-auto w-full"
            >
              <rect width="620" height="320" rx="14" fill={C.bg} />
              <text
                x="310"
                y="25"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={C.text}
              >
                depth {depth} · {tagMode} tags ·{" "}
                {animated ? "animated" : "static"}
              </text>
              <path
                d="M90 268 L310 58 L530 268 Z"
                fill={C.accent}
                fillOpacity="0.06"
                stroke={C.border}
                strokeWidth="3"
              />
              {Array.from({ length: gridSize + 1 }, (_, index) => {
                const fraction = index / gridSize;
                const leftX = 90 + (310 - 90) * fraction;
                const y = 268 - (268 - 58) * fraction;
                const leftStart = 90 + (310 - 90) * fraction;
                const rightStart = 530 - (530 - 310) * fraction;
                return (
                  <g key={`grid-${index}`}>
                    <line
                      x1={leftStart}
                      y1={y}
                      x2={rightStart}
                      y2={y}
                      stroke={C.accent}
                      strokeOpacity="0.5"
                    />
                    <line
                      x1={leftX}
                      y1={268}
                      x2={310 + (leftX - 90) * 0.5}
                      y2={58 + (268 - 58) * (1 - fraction)}
                      stroke={C.success}
                      strokeOpacity="0.45"
                    />
                  </g>
                );
              })}
              {Array.from(
                { length: Math.min(24, gridSize * 2) },
                (_, index) => {
                  const x = 150 + (index % 8) * 42;
                  const y = 226 - Math.floor(index / 8) * 44 - (index % 3) * 7;
                  return (
                    <circle
                      key={`node-${index}`}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={index % 3 === 0 ? C.warning : C.success}
                    />
                  );
                },
              )}
              <path
                d="M166 222 C226 202 254 176 314 186 C364 194 408 148 462 132"
                fill="none"
                stroke={C.warning}
                strokeWidth="4"
                strokeDasharray={animated ? undefined : "7 6"}
              />
              <rect
                x="42"
                y="278"
                width="180"
                height="30"
                rx="7"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="132"
                y="298"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                refined preview {gridSize}×{gridSize}
              </text>
              <rect
                x="398"
                y="278"
                width="180"
                height="30"
                rx="7"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="488"
                y="298"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                ratio {metrics.ratio.toFixed(0)}×
              </text>
            </svg>
          </div>
          <div className="space-y-4">
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch05-depth"
            >
              refinement depth · {depth}
              <input
                id="gpu-gems3-ch05-depth"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="1"
                max="8"
                value={depth}
                onChange={(event) => setDepth(Number(event.target.value))}
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch05-coarse"
            >
              coarse triangles · {coarseTriangles}
              <input
                id="gpu-gems3-ch05-coarse"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="100"
                max="5000"
                step="100"
                value={coarseTriangles}
                onChange={(event) =>
                  setCoarseTriangles(Number(event.target.value))
                }
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch05-tag-mode"
            >
              depth tag source
              <select
                id="gpu-gems3-ch05-tag-mode"
                className="mt-2 block h-11 w-full rounded-control border border-border bg-[var(--bg)] px-3 text-sm text-primary"
                value={tagMode}
                onChange={(event) => setTagMode(event.target.value as TagMode)}
              >
                {(Object.keys(TAG_MODE_LABELS) as TagMode[]).map((key) => (
                  <option key={key} value={key}>
                    {TAG_MODE_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch05-displacement"
            >
              displacement complexity · {displacement}
              <input
                id="gpu-gems3-ch05-displacement"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={displacement}
                onChange={(event) =>
                  setDisplacement(Number(event.target.value))
                }
              />
            </label>
            <label
              className="flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch05-animated"
            >
              <input
                id="gpu-gems3-ch05-animated"
                type="checkbox"
                checked={animated}
                onChange={(event) => setAnimated(event.target.checked)}
                className="size-4 accent-accent"
              />
              每帧更新 depth tags
            </label>
            <div
              className="rounded-card border border-border bg-surface p-4"
              aria-live="polite"
            >
              <Metric
                label="refined triangles"
                value={`${metrics.refinedTriangles.toLocaleString()}`}
                tone={C.accent}
              />
              <Metric
                label="CPU tag records"
                value={`${metrics.uploadRecords.toLocaleString()}`}
                tone={C.warning}
              />
              <Metric
                label="GPU vertex work"
                value={`${metrics.vertexWork.toLocaleString()}`}
                tone={C.success}
              />
              <Metric
                label="likely bottleneck"
                value={metrics.bottleneck}
                tone={
                  metrics.bottleneck.startsWith("GPU") ? C.success : C.warning
                }
              />
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-secondary">
                {metrics.modeNote}；depth 只改变细分配置，不会把 target mesh
                存回 CPU。
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
          <p className="text-xs leading-5 text-secondary">
            对比“输入大小”和“细分深度”两个方向：同样的输出规模，coarse mesh
            越小，越能把工作留给 GPU。
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>
      </section>
    </Figure>
  );
}
