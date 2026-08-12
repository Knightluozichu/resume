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

function Panel({
  accent,
  detail,
  label,
  x,
  y,
  width = 160,
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
        y={y + 65}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

function Signal({
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

export function GpuGems3Ch04SpeedTreePipelineDiagram() {
  return (
    <Figure>
      <Frame label="SpeedTree 高质量渲染管线：从相机相关的树枝轮廓，到叶片阴影、双面光照，再到 HDR、MSAA 和 alpha-to-coverage 输出">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先修轮廓，再修叶片，最后修采样边缘
        </text>
        <Panel
          accent={C.accent}
          detail="camera-facing geometry"
          label="树枝 / 叶片输入"
          x={26}
          y={106}
          width={154}
        />
        <Panel
          accent={C.warning}
          detail="fins + height trace"
          label="轮廓剪裁"
          x={202}
          y={106}
          width={154}
        />
        <Panel
          accent={C.success}
          detail="leaf self-shadow"
          label="动态阴影"
          x={378}
          y={106}
          width={154}
        />
        <Panel
          accent={C.accent}
          detail="two-sided + HDR"
          label="叶片光照"
          x={554}
          y={106}
          width={180}
        />
        <Arrow x1={180} y1={152} x2={202} y2={152} color={C.border} />
        <Arrow x1={356} y1={152} x2={378} y2={152} color={C.border} />
        <Arrow x1={532} y1={152} x2={554} y2={152} color={C.border} />
        <rect
          x="88"
          y="260"
          width="584"
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
          GeForce 8800 时代的关键取舍
        </text>
        <text
          x="380"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          让不规则细节出现在正确的阶段，而不是把所有工作堆到一张纹理或一个 pass
        </text>
        <text
          x="380"
          y="348"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          近处启用细节，远处逐渐关闭，保持画面质量与 GPU 预算平衡
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch04SilhouetteFinDiagram() {
  return (
    <Figure>
      <Frame label="silhouette clipping 的三步：比较三角形顶点法线与视线的点积符号，geometry shader 在零点挤出 fin，再沿高度图做遮挡追踪">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          轮廓边不是纹理问题：它需要额外的可见几何
        </text>
        <rect
          x="28"
          y="78"
          width="214"
          height="274"
          rx="16"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="135"
          y="112"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          1 · sign test
        </text>
        <path
          d="M64 286 L136 142 L214 286 Z"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx="64" cy="286" r="8" fill={C.success} />
        <circle cx="136" cy="142" r="8" fill={C.warning} />
        <circle cx="214" cy="286" r="8" fill={C.danger} />
        <line
          x1="136"
          y1="142"
          x2="136"
          y2="78"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text
          x="64"
          y="320"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          n·v &lt; 0
        </text>
        <text
          x="136"
          y="130"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          n·v = 0
        </text>
        <text
          x="214"
          y="320"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          n·v &gt; 0
        </text>
        <Arrow x1={250} y1={214} x2={288} y2={214} />
        <rect
          x="290"
          y="78"
          width="214"
          height="274"
          rx="16"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="397"
          y="112"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          2 · geometry shader
        </text>
        <path
          d="M332 284 L394 164 L456 284 Z"
          fill={C.accent}
          fillOpacity="0.1"
          stroke={C.border}
          strokeWidth="3"
        />
        <path
          d="M394 164 L454 204 L488 288 L432 276 Z"
          fill={C.warning}
          fillOpacity="0.22"
          stroke={C.warning}
          strokeWidth="3"
        />
        <path
          d="M394 164 L334 204 L302 288 L358 276 Z"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
          strokeWidth="3"
        />
        <text
          x="397"
          y="322"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          零点两侧生成两片 fin
        </text>
        <Arrow x1={512} y1={214} x2={550} y2={214} />
        <rect
          x="552"
          y="78"
          width="180"
          height="274"
          rx="16"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="642"
          y="112"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          3 · height trace
        </text>
        <path
          d="M578 276 C606 248 604 206 632 184 C660 162 676 138 708 124"
          fill="none"
          stroke={C.success}
          strokeWidth="4"
        />
        <path
          d="M578 308 L622 240 L670 202 L718 164"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <circle cx="622" cy="240" r="6" fill={C.warning} />
        <circle cx="670" cy="202" r="6" fill={C.warning} />
        <circle cx="718" cy="164" r="6" fill={C.warning} />
        <text
          x="642"
          y="322"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          沿视线采样高度图
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch04LeafShadowOffsetDiagram() {
  return (
    <Figure>
      <Frame label="叶片卡片自阴影：直接把平面卡片投到 shadow map 会产生拉长条纹；通过光源方向移动 caster，并在 receiver 中沿视线偏移位置来消除条纹">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          平面叶片要先修投影位置，再查 shadow map
        </text>
        <g transform="translate(28 86)">
          <rect
            width="210"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="105"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            直接投影
          </text>
          <line
            x1="46"
            y1="68"
            x2="164"
            y2="68"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="105"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            light
          </text>
          <rect
            x="72"
            y="100"
            width="76"
            height="112"
            rx="8"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M76 120 H144 M76 148 H144 M76 176 H144"
            stroke={C.danger}
            strokeWidth="8"
            strokeOpacity="0.55"
          />
          <text
            x="105"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            streaks on leaf card
          </text>
        </g>
        <Arrow x1={258} y1={212} x2={290} y2={212} />
        <g transform="translate(300 86)">
          <rect
            width="210"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="105"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            caster offset
          </text>
          <line
            x1="46"
            y1="68"
            x2="164"
            y2="68"
            stroke={C.warning}
            strokeWidth="3"
          />
          <rect
            x="72"
            y="88"
            width="76"
            height="112"
            rx="8"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M110 76 V88"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <polygon points="110,76 103,88 117,88" fill={C.warning} />
          <text
            x="105"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            按约半张卡片高度移动
          </text>
        </g>
        <Arrow x1={530} y1={212} x2={562} y2={212} />
        <g transform="translate(572 86)">
          <rect
            width="160"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="80"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            receiver offset
          </text>
          <rect
            x="42"
            y="94"
            width="76"
            height="112"
            rx="8"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path d="M80 214 V170" stroke={C.success} strokeWidth="3" />
          <polygon points="80,170 73,182 87,182" fill={C.success} />
          <text
            x="80"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            沿 view 方向查错位
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch04LeafLightingDiagram() {
  return (
    <Figure>
      <Frame label="双面叶片光照：正面保持原色和高光，背光时混入偏黄偏红的透射光并降低高光，模拟光穿过叶片">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          背光的叶片不是“变暗”，而是出现透射色
        </text>
        <g transform="translate(46 94)">
          <rect
            width="196"
            height="226"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="98"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            正面光
          </text>
          <path
            d="M50 164 C74 84 124 84 148 164 C124 194 74 194 50 164 Z"
            fill={C.success}
            fillOpacity="0.3"
            stroke={C.success}
            strokeWidth="3"
          />
          <line
            x1="32"
            y1="118"
            x2="78"
            y2="146"
            stroke={C.warning}
            strokeWidth="4"
          />
          <polygon points="78,146 64,142 70,132" fill={C.warning} />
          <text
            x="98"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            diffuse + regular specular
          </text>
        </g>
        <Arrow x1={260} y1={208} x2={294} y2={208} />
        <g transform="translate(306 94)">
          <rect
            width="196"
            height="226"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="98"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            背面光
          </text>
          <path
            d="M50 164 C74 84 124 84 148 164 C124 194 74 194 50 164 Z"
            fill={C.warning}
            fillOpacity="0.3"
            stroke={C.warning}
            strokeWidth="3"
          />
          <line
            x1="164"
            y1="118"
            x2="118"
            y2="146"
            stroke={C.warning}
            strokeWidth="4"
          />
          <polygon points="118,146 126,133 132,143" fill={C.warning} />
          <text
            x="98"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            混入黄红色 transmitted light
          </text>
        </g>
        <Arrow x1={520} y1={208} x2={554} y2={208} />
        <g transform="translate(566 94)">
          <rect
            width="160"
            height="226"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="80"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            shader 取舍
          </text>
          <path
            d="M34 86 H126 M34 120 H110 M34 154 H90"
            stroke={C.success}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <text
            x="80"
            y="196"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            背面降低 specular
          </text>
          <text
            x="80"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            避免远处闪烁
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch04AlphaCoverageDiagram() {
  return (
    <Figure>
      <Frame label="alpha-to-coverage 把像素 alpha 转成 MSAA sample coverage；它改善叶片和轮廓的 1-bit cutout，但 LOD cross-fade 需要错开两条 alpha 曲线">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          alpha 不只是一种透明度：它也可以选择 MSAA 样本
        </text>
        <g transform="translate(28 92)">
          <rect
            width="210"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="105"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            alpha texture
          </text>
          <rect
            x="46"
            y="72"
            width="118"
            height="118"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="2"
          />
          <path
            d="M58 166 C76 104 96 92 116 124 C130 148 138 158 152 86"
            fill="none"
            stroke={C.warning}
            strokeWidth="8"
          />
          <text
            x="105"
            y="212"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            1-bit leaf cutout
          </text>
        </g>
        <Arrow x1={254} y1={206} x2={288} y2={206} />
        <g transform="translate(300 92)">
          <rect
            width="210"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="105"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            MSAA coverage
          </text>
          <g transform="translate(55 72)">
            {Array.from({ length: 16 }, (_, index) => {
              const active = [0, 1, 4, 5, 6, 9, 10, 13, 14].includes(index);
              return (
                <rect
                  key={`sample-${index}`}
                  x={(index % 4) * 26}
                  y={Math.floor(index / 4) * 26}
                  width="20"
                  height="20"
                  rx="4"
                  fill={active ? C.success : C.border}
                  fillOpacity={active ? 0.65 : 0.3}
                  stroke={active ? C.success : C.border}
                />
              );
            })}
          </g>
          <text
            x="105"
            y="212"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            边缘更平滑，不必排序叶片
          </text>
        </g>
        <Arrow x1={526} y1={206} x2={560} y2={206} />
        <g transform="translate(572 92)">
          <rect
            width="160"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="80"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            LOD fade
          </text>
          <path
            d="M30 174 C56 160 76 144 128 98"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <path
            d="M30 104 C62 116 88 134 128 174"
            fill="none"
            stroke={C.warning}
            strokeWidth="4"
          />
          <line
            x1="30"
            y1="174"
            x2="128"
            y2="174"
            stroke={C.border}
            strokeWidth="2"
          />
          <text
            x="80"
            y="212"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            错开两条曲线
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch04FeatureCompareDiagram() {
  return (
    <Figure>
      <Frame label="SpeedTree 技术选型表：轮廓细节、叶片阴影、背光颜色和透明边缘分别对应不同的几何、纹理与采样策略">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          画面症状决定修复阶段
        </text>
        <rect
          x="44"
          y="70"
          width="672"
          height="44"
          rx="8"
          fill={C.accent}
          fillOpacity="0.14"
          stroke={C.accent}
        />
        <text
          x="112"
          y="98"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          症状
        </text>
        <text
          x="286"
          y="98"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          主要技术
        </text>
        <text
          x="486"
          y="98"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          GPU 阶段
        </text>
        <text
          x="646"
          y="98"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          先看什么
        </text>
        {[
          [
            "树枝边缘太直",
            "silhouette clipping",
            "GS + pixel",
            "距离 / fin 宽度",
          ],
          [
            "叶卡出现条纹",
            "leaf shadow offset",
            "PS + shadow map",
            "caster / receiver",
          ],
          [
            "背光叶片发灰",
            "two-sided lighting",
            "pixel shader",
            "透射色 / 高光",
          ],
          [
            "透明边缘闪烁",
            "alpha-to-coverage",
            "MSAA resolve",
            "coverage / LOD fade",
          ],
        ].map(([symptom, method, stage, check], index) => {
          const y = 132 + index * 58;
          return (
            <g key={symptom}>
              <rect
                x="44"
                y={y}
                width="672"
                height="46"
                rx="7"
                fill={index % 2 === 0 ? C.surface : C.bg}
                stroke={C.border}
              />
              <text
                x="112"
                y={y + 29}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {symptom}
              </text>
              <text
                x="286"
                y={y + 29}
                textAnchor="middle"
                fontSize="12"
                fill={C.accent}
              >
                {method}
              </text>
              <text
                x="486"
                y={y + 29}
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {stage}
              </text>
              <text
                x="646"
                y={y + 29}
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {check}
              </text>
            </g>
          );
        })}
        <text
          x="380"
          y="404"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.warning}
        >
          不要用更高分辨率的纹理去掩盖本该由几何或采样解决的问题
        </text>
      </Frame>
    </Figure>
  );
}

const SPEEDTREE_STEPS: readonly TeachingStep[] = [
  { label: "silhouette", caption: "先给树枝补上视角相关的轮廓" },
  { label: "shadow", caption: "再修叶片 caster 与 receiver 的投影位置" },
  { label: "lighting", caption: "背光混入透射色并降低高光" },
  { label: "coverage", caption: "用 MSAA coverage 收住透明边缘" },
];

const SPEEDTREE_LABELS: Readonly<Record<string, string>> = {
  coverage: "用 MSAA coverage 收住透明边缘",
  lighting: "背光混入透射色并降低高光",
  shadow: "再修叶片 caster 与 receiver 的投影位置",
  silhouette: "先给树枝补上视角相关的轮廓",
};

export function GpuGems3Ch04RenderingTimelineDiagram() {
  const silhouetteRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGGElement>(null);
  const lightingRef = useRef<SVGGElement>(null);
  const coverageRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: SPEEDTREE_STEPS,
    build: (tl) => {
      tl.add(
        silhouetteRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        0,
      );
      tl.label("silhouette", 0);
      tl.add(shadowRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("shadow", T);
      tl.add(
        lightingRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("lighting", T * 2);
      tl.add(
        coverageRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("coverage", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可控教学动画：依次观察 SpeedTree 的轮廓、叶片阴影、双面光照和 alpha-to-coverage 四个修复阶段">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一棵树的质量预算沿管线逐步展开
        </text>
        <TeachingStage
          stageRef={silhouetteRef}
          number="1"
          label="silhouette"
          detail="fins + trace"
          accent={C.warning}
          x={28}
        />
        <TeachingStage
          stageRef={shadowRef}
          number="2"
          label="shadow"
          detail="caster + receiver"
          accent={C.success}
          x={206}
        />
        <TeachingStage
          stageRef={lightingRef}
          number="3"
          label="lighting"
          detail="front / back"
          accent={C.accent}
          x={384}
        />
        <TeachingStage
          stageRef={coverageRef}
          number="4"
          label="coverage"
          detail="MSAA samples"
          accent={C.success}
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
          每一步都对应一个可观察的画面症状
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放、暂停、单步或拖动进度，观察细节从几何走到采样覆盖
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          远处关闭 silhouette，近处保留 shadow 与 lighting，是预算而非开关魔法
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={SPEEDTREE_LABELS}
        caption="轮廓、阴影、光照和边缘抗锯齿各自有正确的计算位置。"
      />
    </Figure>
  );
}

export function GpuGems3Ch04SpeedTreeRenderingLab() {
  const [distance, setDistance] = useState(42);
  const [silhouetteWidth, setSilhouetteWidth] = useState(58);
  const [shadowOffset, setShadowOffset] = useState(48);
  const [coverage, setCoverage] = useState(72);
  const [twoSided, setTwoSided] = useState(true);

  const metrics = useMemo(() => {
    const silhouetteActive = distance < 70;
    const finPixels = silhouetteActive
      ? Math.max(0, Math.round(silhouetteWidth * (1 - distance / 100)))
      : 0;
    const shadowStreakRisk = Math.max(0, 100 - shadowOffset);
    const sampleCount = Math.max(1, Math.min(8, Math.round(coverage / 14)));
    const leafTone = twoSided
      ? "backlight adds warm transmission"
      : "front-face diffuse only";
    return {
      finPixels,
      leafTone,
      sampleCount,
      shadowStreakRisk,
      silhouetteMode: silhouetteActive ? "near / fade" : "far / removed",
    };
  }, [coverage, distance, shadowOffset, silhouetteWidth, twoSided]);

  function reset() {
    setDistance(42);
    setSilhouetteWidth(58);
    setShadowOffset(48);
    setCoverage(72);
    setTwoSided(true);
  }

  return (
    <Figure>
      <section
        className="not-prose overflow-hidden rounded-card border border-border bg-elevated"
        aria-label="GPU Gems 3 Chapter 4 SpeedTree 渲染实验：调整距离、轮廓宽度、阴影偏移、MSAA coverage 与双面叶片光照"
        data-visual-kind="gpu-gems3-ch04-speedtree-rendering"
      >
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-primary">
            SpeedTree 渲染实验
          </p>
          <p className="mt-1 text-sm text-secondary">
            先猜一猜：把树推远会先关闭哪种细节？把 coverage 调高能不能修复错误的
            caster 偏移？
          </p>
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
            <svg
              viewBox="0 0 620 320"
              role="img"
              aria-label="SpeedTree 渲染实验预览：树干轮廓、叶片阴影和 MSAA coverage 随控件变化"
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
                distance {distance} · {metrics.silhouetteMode}
              </text>
              <path
                d="M306 284 C298 238 302 192 286 150 C274 116 286 82 310 54 C334 82 346 116 334 150 C318 192 322 238 314 284 Z"
                fill={C.warning}
                fillOpacity="0.18"
                stroke={C.warning}
                strokeWidth="4"
              />
              <path
                d="M300 176 C264 152 230 144 190 150 M324 164 C364 134 402 132 448 144"
                fill="none"
                stroke={C.warning}
                strokeWidth="10"
                strokeLinecap="round"
              />
              {Array.from({ length: 10 }, (_, index) => {
                const left = index % 2 === 0;
                const x = left ? 178 + index * 4 : 430 - index * 4;
                const y = 116 + (index % 5) * 26;
                const warm = twoSided && index % 3 === 0;
                return (
                  <ellipse
                    key={`leaf-${index}`}
                    cx={x}
                    cy={y}
                    rx="34"
                    ry="13"
                    fill={warm ? C.warning : C.success}
                    fillOpacity="0.3"
                    stroke={warm ? C.warning : C.success}
                    strokeWidth="2"
                  />
                );
              })}
              {metrics.finPixels > 0 && (
                <>
                  <path
                    d={`M${265 - metrics.finPixels / 3} 186 L248 128 L286 150`}
                    fill={C.accent}
                    fillOpacity="0.18"
                    stroke={C.accent}
                    strokeWidth="3"
                  />
                  <path
                    d={`M${355 + metrics.finPixels / 3} 180 L372 130 L334 150`}
                    fill={C.accent}
                    fillOpacity="0.18"
                    stroke={C.accent}
                    strokeWidth="3"
                  />
                </>
              )}
              <rect
                x="42"
                y="244"
                width="156"
                height="42"
                rx="8"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="120"
                y="269"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                fin pixels {metrics.finPixels}
              </text>
              <rect
                x="422"
                y="244"
                width="156"
                height="42"
                rx="8"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="500"
                y="269"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                MSAA samples {metrics.sampleCount}
              </text>
            </svg>
          </div>
          <div className="space-y-4">
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch04-distance"
            >
              camera distance · {distance}
              <input
                id="gpu-gems3-ch04-distance"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="10"
                max="100"
                value={distance}
                onChange={(event) => setDistance(Number(event.target.value))}
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch04-silhouette"
            >
              silhouette fin width · {silhouetteWidth}
              <input
                id="gpu-gems3-ch04-silhouette"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="10"
                max="90"
                value={silhouetteWidth}
                onChange={(event) =>
                  setSilhouetteWidth(Number(event.target.value))
                }
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch04-offset"
            >
              leaf shadow offset · {shadowOffset}
              <input
                id="gpu-gems3-ch04-offset"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={shadowOffset}
                onChange={(event) =>
                  setShadowOffset(Number(event.target.value))
                }
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch04-coverage"
            >
              alpha-to-coverage · {coverage}%
              <input
                id="gpu-gems3-ch04-coverage"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={coverage}
                onChange={(event) => setCoverage(Number(event.target.value))}
              />
            </label>
            <label
              className="flex min-h-11 items-center gap-3 text-sm text-secondary"
              htmlFor="gpu-gems3-ch04-two-sided"
            >
              <input
                id="gpu-gems3-ch04-two-sided"
                type="checkbox"
                checked={twoSided}
                onChange={(event) => setTwoSided(event.target.checked)}
                className="size-4 accent-accent"
              />
              启用双面叶片光照
            </label>
            <div
              className="rounded-card border border-border bg-surface p-4"
              aria-live="polite"
            >
              <Signal
                label="silhouette mode"
                value={metrics.silhouetteMode}
                tone={C.warning}
              />
              <Signal
                label="shadow streak risk"
                value={`${metrics.shadowStreakRisk}%`}
                tone={metrics.shadowStreakRisk > 45 ? C.danger : C.success}
              />
              <Signal
                label="coverage samples"
                value={`${metrics.sampleCount}`}
                tone={C.success}
              />
              <Signal
                label="leaf lighting"
                value={metrics.leafTone}
                tone={C.accent}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
          <p className="text-xs leading-5 text-secondary">
            观察距离、几何轮廓、阴影投影和 sample coverage
            是四个不同信号；一个变好不代表其他问题已经消失。
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
