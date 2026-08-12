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

export function GpuGems2Ch39RadiosityEnergyDiagram() {
  return (
    <Figure>
      <Frame label="radiosity 能量图：光源面作为 shooter 释放 residual energy，能见的 receiver 根据 form factor 和 reflectance 获得能量并更新 accumulated 与 residual 两个值">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          每个面片同时记住“已收到”和“还没发出”的能量
        </text>
        <rect
          x="48"
          y="90"
          width="206"
          height="252"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="151"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          shooter element
        </text>
        <circle
          cx="151"
          cy="190"
          r="34"
          fill={C.warning}
          fillOpacity="0.2"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text x="151" y="187" textAnchor="middle" fontSize="12" fill={C.text}>
          residual
        </text>
        <text x="151" y="207" textAnchor="middle" fontSize="12" fill={C.text}>
          unshot
        </text>
        <text
          x="151"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          本轮全部释放后 residual = 0
        </text>
        <Arrow x1={220} y1={190} x2={338} y2={142} color={C.warning} />
        <Arrow x1={220} y1={205} x2={338} y2={242} color={C.warning} />
        <text
          x="280"
          y="180"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          visible transfer
        </text>
        <rect
          x="382"
          y="90"
          width="330"
          height="252"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="547"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          receiver elements
        </text>
        {[
          { x: 462, y: 178, label: "A" },
          { x: 610, y: 178, label: "B" },
        ].map((receiver) => (
          <g key={receiver.label}>
            <rect
              x={receiver.x - 40}
              y={receiver.y - 27}
              width="80"
              height="54"
              rx="9"
              fill={C.success}
              fillOpacity="0.16"
              stroke={C.success}
              strokeWidth="2"
            />
            <text
              x={receiver.x}
              y={receiver.y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              {receiver.label}
            </text>
            <text
              x={receiver.x}
              y={receiver.y + 55}
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              + accumulated
            </text>
            <text
              x={receiver.x}
              y={receiver.y + 76}
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              + residual
            </text>
          </g>
        ))}
        <text
          x="547"
          y="318"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          transfer × form factor × reflectance
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch39ProgressiveLoopDiagram() {
  const steps = [
    ["1", "选 residual power 最大的 shooter", C.warning],
    ["2", "把能量传给所有可见 receiver", C.accent],
    ["3", "receiver 更新 accumulated / residual", C.success],
    ["4", "下一轮继续，直到 residual 足够小", C.secondary],
  ] as const;
  return (
    <Figure>
      <Frame label="progressive refinement 循环：每一轮选择 residual power 最大的面片作为 shooter，计算它到所有 receiver 的传输，更新接收能量并把 shooter residual 清零，直到收敛">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          progressive refinement：每次只处理最值得发射的残余能量
        </text>
        {steps.map(([number, label, color], index) => {
          const x = 72 + (index % 2) * 340;
          const y = 102 + Math.floor(index / 2) * 122;
          return (
            <g key={number}>
              <circle
                cx={x}
                cy={y + 30}
                r="23"
                fill={color}
                fillOpacity="0.18"
                stroke={color}
                strokeWidth="3"
              />
              <text
                x={x}
                y={y + 36}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                {number}
              </text>
              <rect
                x={x + 42}
                y={y}
                width="246"
                height="60"
                rx="10"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x={x + 165}
                y={y + 35}
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {label}
              </text>
              {index === 0 && (
                <text
                  x={x + 165}
                  y={y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.warning}
                >
                  power = energy × area
                </text>
              )}
            </g>
          );
        })}
        <Arrow x1={356} y1={132} x2={396} y2={132} color={C.accent} />
        <Arrow x1={526} y1={184} x2={526} y2={224} color={C.success} />
        <Arrow x1={396} y1={294} x2={356} y2={294} color={C.secondary} dashed />
        <text
          x="380"
          y="390"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          选最大 residual power 能让解更快收敛；不必预存完整 N² form-factor 矩阵
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch39GatherScatterDiagram() {
  return (
    <Figure>
      <Frame label="GPU radiosity 的 scatter 与 gather 对比：从 shooter 视角把能量 splat 到许多 receiver texture 是任意地址写入；反转计算后每个 receiver 自己读取 shooter 数据并写自己的 texel">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“我写给所有人”反转成“每个人来读我”
        </text>
        <rect
          x="46"
          y="78"
          width="310"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="201"
          y="110"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          scatter：shader 难以落地
        </text>
        <circle
          cx="114"
          cy="205"
          r="24"
          fill={C.warning}
          fillOpacity="0.2"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text x="114" y="210" textAnchor="middle" fontSize="12" fill={C.text}>
          shooter
        </text>
        {[0, 1, 2, 3].map((index) => {
          const x = 244 + (index % 2) * 56;
          const y = 168 + Math.floor(index / 2) * 75;
          return (
            <g key={`scatter-${index}`}>
              <rect
                x={x}
                y={y}
                width="38"
                height="38"
                rx="6"
                fill={C.border}
                fillOpacity="0.35"
              />
              <line
                x1="138"
                y1="205"
                x2={x + 19}
                y2={y + 19}
                stroke={C.danger}
                strokeWidth="2"
                strokeDasharray="7 6"
              />
            </g>
          );
        })}
        <text x="201" y="326" textAnchor="middle" fontSize="12" fill={C.danger}>
          多个纹理 / 任意地址写入
        </text>
        <Arrow x1={374} y1={220} x2={426} y2={220} color={C.success} />
        <text
          x="400"
          y="196"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          invert
        </text>
        <rect
          x="404"
          y="78"
          width="310"
          height="284"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="559"
          y="110"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          gather：GPU 友好
        </text>
        <rect
          x="444"
          y="163"
          width="54"
          height="54"
          rx="8"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
        />
        <text x="471" y="196" textAnchor="middle" fontSize="12" fill={C.text}>
          shooter
        </text>
        {[0, 1, 2, 3].map((index) => {
          const x = 584 + (index % 2) * 56;
          const y = 150 + Math.floor(index / 2) * 82;
          return (
            <g key={`gather-${index}`}>
              <rect
                x={x}
                y={y}
                width="38"
                height="38"
                rx="6"
                fill={C.success}
                fillOpacity="0.2"
                stroke={C.success}
              />
              <Arrow
                x1={x - 8}
                y1={y + 19}
                x2={x - 42}
                y2={190}
                color={C.success}
              />
            </g>
          );
        })}
        <text
          x="559"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          receiver 写自己的 texel
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch39VisibilityReconstructionDiagram() {
  return (
    <Figure>
      <Frame label="一次 radiosity shot 的两遍 GPU 实现：visibility pass 从 shooter 视角写 polygon ID 的 item buffer，reconstruction pass 让每个 receiver texel 读取 ID 并计算 form factor 与能量">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一次 shot = visibility pass + reconstruction pass
        </text>
        <rect
          x="48"
          y="92"
          width="202"
          height="238"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="149"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          visibility pass
        </text>
        <path
          d="M84 274 L127 166 L218 166 L218 274 Z"
          fill={C.accent}
          fillOpacity="0.14"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx="110" cy="144" r="14" fill={C.warning} />
        <text x="110" y="148" textAnchor="middle" fontSize="11" fill={C.text}>
          S
        </text>
        <text
          x="149"
          y="306"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          shooter POV → item buffer
        </text>
        <Arrow x1={270} y1={210} x2={324} y2={210} color={C.success} />
        <rect
          x="334"
          y="128"
          width="94"
          height="164"
          rx="12"
          fill={C.warning}
          fillOpacity="0.14"
          stroke={C.warning}
        />
        <text
          x="381"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          item
        </text>
        <text
          x="381"
          y="190"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          buffer
        </text>
        <text
          x="381"
          y="234"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          polygon ID
        </text>
        <Arrow x1={448} y1={210} x2={502} y2={210} color={C.success} />
        <rect
          x="512"
          y="92"
          width="202"
          height="238"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="613"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          reconstruction
        </text>
        <path
          d="M548 164 H680 M548 210 H680 M548 256 H680"
          stroke={C.border}
          strokeWidth="2"
        />
        <circle cx="579" cy="164" r="7" fill={C.success} />
        <circle cx="632" cy="210" r="7" fill={C.success} />
        <circle cx="669" cy="256" r="7" fill={C.success} />
        <text
          x="613"
          y="306"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          receiver texel 自己 gather
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch39TextureQuadtreeDiagram() {
  return (
    <Figure>
      <Frame label="自适应 radiosity texture quadtree：每个场景多边形是根，叶节点保存 16x16 radiosity texture；在光照 gradient 超过阈值的区域继续四分，平滑区域保持粗粒度">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          用 radiosity gradient 把 texel 花在需要的地方
        </text>
        <text x="84" y="88" fontSize="14" fontWeight="700" fill={C.secondary}>
          scene polygon → quadtree root
        </text>
        <rect
          x="84"
          y="118"
          width="242"
          height="206"
          rx="12"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d="M205 118 V324 M84 221 H326"
          stroke={C.border}
          strokeWidth="2"
        />
        <path
          d="M84 118 L205 221 L326 118"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <path
          d="M205 221 L326 324"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text
          x="205"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          gradient 高处继续 split
        </text>
        <Arrow x1={368} y1={220} x2={428} y2={220} color={C.success} />
        <text
          x="398"
          y="196"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          threshold
        </text>
        <rect
          x="446"
          y="98"
          width="260"
          height="230"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="576"
          y="130"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          leaf texture
        </text>
        {Array.from({ length: 16 }, (_, index) => {
          const active = [1, 2, 5, 6, 9, 10, 13, 14].includes(index);
          return (
            <rect
              key={`leaf-${index}`}
              x={480 + (index % 4) * 42}
              y={154 + Math.floor(index / 4) * 34}
              width="28"
              height="22"
              rx="4"
              fill={active ? C.success : C.border}
              fillOpacity={active ? 0.65 : 0.3}
              stroke={active ? C.success : C.border}
            />
          );
        })}
        <text
          x="576"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          叶节点：16 × 16 texels
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch39RealtimeSplitDiagram() {
  return (
    <Figure>
      <Frame label="实时取舍图：把低频间接光放到低分辨率 radiosity texture，直接光仍用逐像素光照和阴影技术，高低频结果最后相加">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          real-time 取舍：低频间接光与高频直达光分开算
        </text>
        <rect
          x="54"
          y="100"
          width="196"
          height="202"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="152"
          y="134"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          low-res indirect
        </text>
        <rect
          x="92"
          y="160"
          width="120"
          height="78"
          rx="8"
          fill={C.success}
          fillOpacity="0.16"
          stroke={C.success}
        />
        <path
          d="M103 225 L124 180 L203 180 L203 225 Z"
          fill={C.success}
          fillOpacity="0.28"
        />
        <text
          x="152"
          y="272"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          radiosity texture
        </text>
        <Arrow x1={274} y1={202} x2={330} y2={202} color={C.accent} />
        <rect
          x="342"
          y="100"
          width="196"
          height="202"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="440"
          y="134"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          high-res direct
        </text>
        <path
          d="M380 225 L406 166 L500 166 L500 225 Z"
          fill={C.warning}
          fillOpacity="0.16"
          stroke={C.warning}
          strokeWidth="3"
        />
        <circle cx="413" cy="150" r="13" fill={C.warning} />
        <Arrow x1={423} y1={159} x2={450} y2={197} color={C.warning} />
        <text
          x="440"
          y="272"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          per-pixel / shadow
        </text>
        <Arrow x1={562} y1={202} x2={622} y2={202} color={C.success} />
        <rect
          x="634"
          y="122"
          width="82"
          height="162"
          rx="12"
          fill={C.accent}
          fillOpacity="0.14"
          stroke={C.accent}
        />
        <text
          x="675"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          final
        </text>
        <text
          x="675"
          y="192"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          image
        </text>
        <text
          x="675"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          direct + indirect
        </text>
      </Frame>
    </Figure>
  );
}

const TIMELINE_STEPS: TeachingStep[] = [
  { label: "choose", caption: "选择 shooter" },
  { label: "visibility", caption: "建立可见性" },
  { label: "gather", caption: "receiver gather" },
  { label: "refine", caption: "继续细化" },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch39RadiosityTimelineDiagram() {
  const chooseRef = useRef<SVGGElement>(null);
  const visibilityRef = useRef<SVGGElement>(null);
  const gatherRef = useRef<SVGGElement>(null);
  const refineRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(chooseRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("choose", 0);
      tl.add(
        visibilityRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T,
      );
      tl.label("visibility", T);
      tl.add(
        gatherRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("gather", T * 2);
      tl.add(
        refineRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("refine", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可播放的 progressive refinement radiosity 动画：选择残余能量最大的 shooter，执行 visibility pass，所有 receiver gather 能量，更新后继续下一轮直到收敛">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          progressive radiosity 的四个关键帧
        </text>
        <g ref={chooseRef}>
          <rect
            x="52"
            y="142"
            width="142"
            height="104"
            rx="12"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
          />
          <text
            x="123"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            choose shooter
          </text>
          <text
            x="123"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            max residual power
          </text>
        </g>
        <g ref={visibilityRef}>
          <rect
            x="230"
            y="142"
            width="142"
            height="104"
            rx="12"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
          />
          <text
            x="301"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            visibility
          </text>
          <text
            x="301"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            item buffer
          </text>
        </g>
        <g ref={gatherRef}>
          <rect
            x="408"
            y="142"
            width="142"
            height="104"
            rx="12"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
          />
          <text
            x="479"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            receiver gather
          </text>
          <text
            x="479"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            form factor
          </text>
        </g>
        <g ref={refineRef}>
          <rect
            x="586"
            y="142"
            width="122"
            height="104"
            rx="12"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
          />
          <text
            x="647"
            y="176"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            refine
          </text>
          <text
            x="647"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            next round
          </text>
        </g>
        <Arrow x1={194} y1={194} x2={230} y2={194} color={C.warning} />
        <Arrow x1={372} y1={194} x2={408} y2={194} color={C.accent} />
        <Arrow x1={550} y1={194} x2={586} y2={194} color={C.success} />
        <path
          d="M647 246 C647 300 123 300 123 246"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="380"
          y="340"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每一轮 shooter residual 清零，receiver residual
          增加；总残余低于阈值就结束
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="把原本的大型能量系统拆成可观察的选择、可见性、收集和细化阶段。"
      />
    </Figure>
  );
}

type RadiosityMode = "gather" | "shoot";

export function GpuGems2Ch39RadiosityLab() {
  const [mode, setMode] = useState<RadiosityMode>("gather");
  const [residual, setResidual] = useState(62);
  const [reflectance, setReflectance] = useState(58);
  const [gradient, setGradient] = useState(44);
  const [maxDepth, setMaxDepth] = useState(3);

  const result = useMemo(() => {
    const formFactor = mode === "gather" ? 0.72 : 0.48;
    const transferred = Math.round(residual * formFactor * (reflectance / 100));
    const remaining = Math.max(0, residual - transferred);
    const visibilityPasses = mode === "gather" ? 2 : 1;
    const leafElements = 4 ** maxDepth;
    const splitNodes = Math.max(
      1,
      Math.round((gradient / 100) * leafElements * 0.12),
    );
    const recommendation =
      mode === "gather"
        ? "receiver gather：每个 texel 写自己的位置，适合 GPU 数据并行。"
        : "shooter scatter：概念直观，但任意地址写入会成为 GPU 瓶颈。";
    return {
      formFactor,
      leafElements,
      recommendation,
      remaining,
      splitNodes,
      transferred,
      visibilityPasses,
    };
  }, [gradient, maxDepth, mode, reflectance, residual]);

  const reset = () => {
    setMode("gather");
    setResidual(62);
    setReflectance(58);
    setGradient(44);
    setMaxDepth(3);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="progressive radiosity 实验模式"
          >
            {(
              [
                ["gather", "receiver gather"],
                ["shoot", "shooter scatter"],
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
            aria-label={`progressive radiosity 实验：当前模式 ${mode}，residual ${residual}，reflectance ${reflectance}%，gradient ${gradient}%，最大细分深度 ${maxDepth}`}
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
              {mode === "gather"
                ? "receiver 主动读取 shooter 数据"
                : "shooter 试图写入所有 receiver"}
            </text>
            <circle
              cx="112"
              cy="192"
              r="34"
              fill={C.warning}
              fillOpacity="0.2"
              stroke={C.warning}
              strokeWidth="3"
            />
            <text
              x="112"
              y="188"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              shooter
            </text>
            <text
              x="112"
              y="208"
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              R={residual}
            </text>
            {Array.from({ length: 4 }, (_, index) => {
              const x = 274 + (index % 2) * 80;
              const y = 130 + Math.floor(index / 2) * 110;
              const color = mode === "gather" ? C.success : C.danger;
              return (
                <g key={`receiver-${index}`}>
                  <rect
                    x={x}
                    y={y}
                    width="58"
                    height="48"
                    rx="8"
                    fill={color}
                    fillOpacity="0.18"
                    stroke={color}
                  />
                  <text
                    x={x + 29}
                    y={y + 29}
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.text}
                  >
                    R{index + 1}
                  </text>
                  <Arrow
                    x1={mode === "gather" ? x - 8 : 146}
                    y1={y + 24}
                    x2={mode === "gather" ? 146 : x}
                    y2={y + 24}
                    color={color}
                    dashed={mode === "shoot"}
                  />
                </g>
              );
            })}
            <Arrow x1={436} y1={192} x2={500} y2={192} color={C.accent} />
            <rect
              x="520"
              y="88"
              width="188"
              height="222"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="614"
              y="120"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              texture quadtree
            </text>
            {Array.from({ length: 16 }, (_, index) => {
              const active =
                index % 4 === 1 || (gradient > 60 && index % 4 === 2);
              return (
                <rect
                  key={`lab-texel-${index}`}
                  x={554 + (index % 4) * 30}
                  y={148 + Math.floor(index / 4) * 28}
                  width="20"
                  height="19"
                  rx="3"
                  fill={active ? C.success : C.border}
                  fillOpacity={active ? 0.68 : 0.28}
                  stroke={active ? C.success : C.border}
                />
              );
            })}
            <text
              x="614"
              y="286"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              gradient → split nodes
            </text>
          </svg>
        </div>
        <div className="rounded-card border border-border bg-surface p-4">
          <label className="block text-sm text-secondary">
            shooter residual: {residual}
            <input
              aria-label="shooter residual"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="10"
              max="100"
              step="1"
              value={residual}
              onChange={(event) => setResidual(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            receiver reflectance: {reflectance}%
            <input
              aria-label="receiver reflectance"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="10"
              max="90"
              step="1"
              value={reflectance}
              onChange={(event) => setReflectance(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            radiosity gradient: {gradient}%
            <input
              aria-label="radiosity gradient"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="1"
              value={gradient}
              onChange={(event) => setGradient(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            max quadtree depth: {maxDepth}
            <input
              aria-label="max quadtree depth"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="5"
              step="1"
              value={maxDepth}
              onChange={(event) => setMaxDepth(Number(event.target.value))}
            />
          </label>
          <div className="mt-5">
            <Metric
              label="transferred energy"
              value={`${result.transferred}`}
              tone={C.success}
            />
            <Metric
              label="remaining residual"
              value={`${result.remaining}`}
              tone={C.warning}
            />
            <Metric
              label="form-factor estimate"
              value={result.formFactor.toFixed(2)}
            />
            <Metric
              label="visibility passes / shot"
              value={`${result.visibilityPasses}`}
              tone={C.accent}
            />
            <Metric label="leaf texels" value={`${result.leafElements}`} />
            <Metric
              label="split candidates"
              value={`${result.splitNodes}`}
              tone={C.success}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-secondary">
            {result.recommendation}
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
