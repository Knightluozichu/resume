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
  accent,
  detail,
  label,
  x,
  y,
  width = 158,
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

export function GpuGems3Ch06WindPipelineDiagram() {
  return (
    <Figure>
      <Frame label="程序风动画管线：二维 wind field、树枝层级和参数进入 stochastic rules，在 vertex shader 中合成角度，经 skinning 与 instancing 输出大量树">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把复杂风力换成可控的视觉规则
        </text>
        <Box
          accent={C.accent}
          detail="direction + velocity"
          label="wind field"
          x={24}
          y={104}
          width={148}
        />
        <Box
          accent={C.warning}
          detail="trunk → branches"
          label="tree hierarchy"
          x={202}
          y={104}
          width={158}
        />
        <Box
          accent={C.success}
          detail="noise + periodic rules"
          label="motion synthesis"
          x={390}
          y={104}
          width={158}
        />
        <Box
          accent={C.accent}
          detail="angles → transforms"
          label="vertex shader"
          x={578}
          y={104}
          width={158}
        />
        <Arrow x1={172} y1={150} x2={202} y2={150} color={C.border} />
        <Arrow x1={360} y1={150} x2={390} y2={150} color={C.border} />
        <Arrow x1={548} y1={150} x2={578} y2={150} color={C.border} />
        <rect
          x="72"
          y="260"
          width="616"
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
          每个 vertex 都能独立读取场、层级和参数
        </text>
        <text
          x="380"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          不需要等待上一帧，也不必让 CPU 逐枝求解物理方程
        </text>
        <text
          x="380"
          y="348"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          适合 instancing：同一套规则可以作用于大批树实例
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch06WindFieldDiagram() {
  return (
    <Figure>
      <Frame label="二维 wind field：地形上的向量网格提供方向和速度，稀疏 wind primitive 叠加局部涡流或爆炸等效果，vertex shader 可以用纹理或实例数据读取">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          wind field 是一张随时间变化的二维力场
        </text>
        <rect
          x="36"
          y="76"
          width="404"
          height="286"
          rx="16"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="238"
          y="108"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          terrain vector field
        </text>
        {Array.from({ length: 20 }, (_, index) => {
          const col = index % 5;
          const row = Math.floor(index / 5);
          const x = 88 + col * 72;
          const y = 148 + row * 48;
          const bend = (row % 2 === 0 ? 10 : -8) + col * 2;
          return (
            <g key={`vector-${index}`}>
              <line
                x1={x}
                y1={y}
                x2={x + 26}
                y2={y + bend}
                stroke={row % 3 === 0 ? C.warning : C.accent}
                strokeWidth="3"
              />
              <polygon
                points={`${x + 26},${y + bend} ${x + 15},${y + bend - 3} ${x + 19},${y + bend - 12}`}
                fill={row % 3 === 0 ? C.warning : C.accent}
              />
            </g>
          );
        })}
        <circle
          cx="186"
          cy="218"
          r="34"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text x="186" y="214" textAnchor="middle" fontSize="12" fill={C.text}>
          local
        </text>
        <text
          x="186"
          y="234"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          primitive
        </text>
        <Arrow x1={464} y1={218} x2={506} y2={218} />
        <rect
          x="526"
          y="76"
          width="198"
          height="286"
          rx="16"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="625"
          y="108"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.text}
        >
          vertex shader input
        </text>
        <rect
          x="554"
          y="138"
          width="142"
          height="54"
          rx="10"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
        />
        <text x="625" y="171" textAnchor="middle" fontSize="13" fill={C.text}>
          2D wind texture
        </text>
        <rect
          x="554"
          y="212"
          width="142"
          height="54"
          rx="10"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
        />
        <text x="625" y="245" textAnchor="middle" fontSize="13" fill={C.text}>
          instance vector
        </text>
        <text
          x="625"
          y="310"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          v = G(x, t)
        </text>
        <text
          x="625"
          y="332"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          direction + velocity
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch06HierarchyDiagram() {
  return (
    <Figure>
      <Frame label="浅层树枝层级：trunk 是根，branch segment 连接到 parent；远处保留 trunk motion，近处再加入 branch motion 形成 simulation LOD">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先让 trunk 有节奏，再让 branches 加细节
        </text>
        <g transform="translate(62 88)">
          <rect
            width="278"
            height="274"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="139"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            shallow hierarchy
          </text>
          <path
            d="M138 236 C136 188 140 150 138 104"
            stroke={C.warning}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M138 154 C100 134 72 112 50 84 M138 132 C178 112 208 92 234 60 M138 104 C112 84 98 64 90 42"
            fill="none"
            stroke={C.success}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M50 84 L32 64 M50 84 L46 58 M234 60 L250 42 M234 60 L240 34 M90 42 L76 24 M90 42 L96 20"
            stroke={C.accent}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="138"
            y="262"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            trunk → branch → leaf area
          </text>
        </g>
        <Arrow x1={380} y1={218} x2={418} y2={218} />
        <g transform="translate(432 88)">
          <rect
            width="292"
            height="274"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="146"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            simulation LOD
          </text>
          <rect
            x="34"
            y="70"
            width="224"
            height="58"
            rx="10"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text
            x="146"
            y="94"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            far
          </text>
          <text
            x="146"
            y="114"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            trunk motion only
          </text>
          <rect
            x="34"
            y="154"
            width="224"
            height="78"
            rx="10"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text
            x="146"
            y="180"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            near
          </text>
          <text
            x="146"
            y="202"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            trunk + branch rules
          </text>
          <text
            x="146"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            small phase variation
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch06MotionCasesDiagram() {
  return (
    <Figure>
      <Frame label="branch motion cases：迎风分支被压向 trunk、背风分支受 turbulence 产生大幅摆动、垂直风向分支发生弯曲与绕轴扭转，最终按权重组合周期函数">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          风向关系决定规则的权重，而不是决定一条物理轨迹
        </text>
        {[
          ["迎风", "suppression", C.warning, "幅度小"],
          ["背风", "turbulence", C.success, "摆动大"],
          ["侧风", "bend + twist", C.accent, "绕父枝轴"],
        ].map(([label, rule, color, detail], index) => {
          const x = 36 + index * 244;
          const lean = index === 0 ? -18 : index === 1 ? 20 : 0;
          return (
            <g key={String(label)}>
              <rect
                x={x}
                y="84"
                width="208"
                height="270"
                rx="16"
                fill={C.surface}
                stroke={String(color)}
              />
              <text
                x={x + 104}
                y="118"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                {String(label)}
              </text>
              <line
                x1={x + 104}
                y1="148"
                x2={x + 104 + lean}
                y2="268"
                stroke={String(color)}
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M${x + 104 + lean} 208 C${x + 68 + lean} 188 ${x + 48 + lean} 172 ${x + 30} 158`}
                fill="none"
                stroke={String(color)}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <line
                x1={x + 40}
                y1="148"
                x2={x + 168}
                y2="148"
                stroke={C.border}
                strokeWidth="3"
                strokeDasharray="7 6"
              />
              <polygon
                points={`${x + 168},148 ${x + 156},141 ${x + 156},155`}
                fill={C.border}
              />
              <text
                x={x + 104}
                y="296"
                textAnchor="middle"
                fontSize="13"
                fill={C.text}
              >
                {String(rule)}
              </text>
              <text
                x={x + 104}
                y="318"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {String(detail)}
              </text>
            </g>
          );
        })}
        <text
          x="380"
          y="398"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.success}
        >
          motion = weighted sum of periodic cases + phase variation
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch06QuaternionDiagram() {
  return (
    <Figure>
      <Frame label="GPU 中的树枝变换：vertex 读取影响该点的 branch indices 与 weights，按 hierarchy 顺序合成 quaternion，再转为矩阵变换 position 和 normal">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          每个顶点沿自己的 branch list 走一遍层级
        </text>
        <Box
          accent={C.accent}
          detail="indices + weights"
          label="vertex attributes"
          x={30}
          y={106}
          width={162}
        />
        <Arrow x1={192} y1={152} x2={232} y2={152} />
        <g transform="translate(244 86)">
          <rect
            width="210"
            height="246"
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
            branch traversal
          </text>
          <rect
            x="34"
            y="64"
            width="142"
            height="40"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text x="105" y="89" textAnchor="middle" fontSize="13" fill={C.text}>
            local branch
          </text>
          <Arrow x1={105} y1={108} x2={105} y2={132} color={C.border} />
          <rect
            x="34"
            y="138"
            width="142"
            height="40"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text x="105" y="163" textAnchor="middle" fontSize="13" fill={C.text}>
            parent branch
          </text>
          <Arrow x1={105} y1={182} x2={105} y2={206} color={C.border} />
          <rect
            x="34"
            y="212"
            width="142"
            height="40"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text x="105" y="237" textAnchor="middle" fontSize="13" fill={C.text}>
            trunk root
          </text>
        </g>
        <Arrow x1={476} y1={210} x2={514} y2={210} />
        <g transform="translate(526 86)">
          <rect
            width="198"
            height="246"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="99"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            transform output
          </text>
          <circle
            cx="99"
            cy="102"
            r="32"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="3"
          />
          <text x="99" y="98" textAnchor="middle" fontSize="13" fill={C.text}>
            q
          </text>
          <text
            x="99"
            y="118"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            quaternion
          </text>
          <Arrow x1={99} y1={140} x2={99} y2={164} color={C.border} />
          <rect
            x="34"
            y="174"
            width="130"
            height="42"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text x="99" y="200" textAnchor="middle" fontSize="13" fill={C.text}>
            matrix
          </text>
          <text
            x="99"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            position + normal
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch06StreamOutDiagram() {
  return (
    <Figure>
      <Frame label="DirectX 9 与 DirectX 10 的差异：DirectX 9 每个 geometry vertex 重复计算 branch transform，DirectX 10 先按 branch 运行 simulation 并 stream-out 临时结果，再让 skinning shader 读取">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          DX10 把“每个顶点重复算”改成“每个 branch 先算一次”
        </text>
        <g transform="translate(30 82)">
          <rect
            width="316"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="158"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            DirectX 9
          </text>
          {Array.from({ length: 4 }, (_, index) => {
            const y = 78 + index * 44;
            return (
              <g key={`dx9-${index}`}>
                <rect
                  x="44"
                  y={y}
                  width="72"
                  height="30"
                  rx="6"
                  fill={C.warning}
                  fillOpacity="0.14"
                  stroke={C.warning}
                />
                <text
                  x="80"
                  y={y + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.text}
                >
                  branch
                </text>
                <Arrow
                  x1={124}
                  y1={y + 15}
                  x2={158}
                  y2={y + 15}
                  color={C.border}
                />
                <rect
                  x="166"
                  y={y}
                  width="102"
                  height="30"
                  rx="6"
                  fill={C.danger}
                  fillOpacity="0.12"
                  stroke={C.danger}
                />
                <text
                  x="217"
                  y={y + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.text}
                >
                  per vertex
                </text>
              </g>
            );
          })}
          <text
            x="158"
            y="258"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            shared branch work repeats
          </text>
        </g>
        <Arrow x1={368} y1={218} x2={400} y2={218} />
        <g transform="translate(414 82)">
          <rect
            width="316"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="158"
            y="36"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            DirectX 10
          </text>
          <rect
            x="44"
            y="76"
            width="98"
            height="46"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text x="93" y="104" textAnchor="middle" fontSize="12" fill={C.text}>
            branch simulation
          </text>
          <Arrow x1={148} y1={99} x2={180} y2={99} color={C.border} />
          <rect
            x="188"
            y="76"
            width="84"
            height="46"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text x="230" y="104" textAnchor="middle" fontSize="12" fill={C.text}>
            stream-out
          </text>
          <Arrow x1={230} y1={134} x2={230} y2={164} color={C.border} />
          <rect
            x="76"
            y="172"
            width="196"
            height="46"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text x="174" y="200" textAnchor="middle" fontSize="12" fill={C.text}>
            skinning shader + instances
          </text>
          <text
            x="158"
            y="258"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            temporary transform shared by geometry
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

const WIND_STEPS: readonly TeachingStep[] = [
  { label: "field", caption: "采样 wind field 的方向与速度" },
  { label: "rules", caption: "按树枝朝向组合周期运动规则" },
  { label: "compose", caption: "沿 branch hierarchy 合成旋转" },
  { label: "render", caption: "skin、instancing 与 stream-out 输出" },
];

const WIND_LABELS: Readonly<Record<string, string>> = {
  compose: "沿 branch hierarchy 合成旋转",
  field: "采样 wind field 的方向与速度",
  render: "skin、instancing 与 stream-out 输出",
  rules: "按树枝朝向组合周期运动规则",
};

export function GpuGems3Ch06RenderingTimelineDiagram() {
  const fieldRef = useRef<SVGGElement>(null);
  const rulesRef = useRef<SVGGElement>(null);
  const composeRef = useRef<SVGGElement>(null);
  const renderRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: WIND_STEPS,
    build: (tl) => {
      tl.add(fieldRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("field", 0);
      tl.add(rulesRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("rules", T);
      tl.add(
        composeRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("compose", T * 2);
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
      <Frame label="可控教学动画：程序风从 wind field 开始，经过方向相关规则和 branch hierarchy 的旋转合成，最后由 skinning、instancing 和 stream-out 输出">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一棵树的风动从场到顶点
        </text>
        <TeachingStage
          stageRef={fieldRef}
          number="1"
          label="field"
          detail="direction + power"
          accent={C.accent}
          x={28}
        />
        <TeachingStage
          stageRef={rulesRef}
          number="2"
          label="rules"
          detail="drag / lift / noise"
          accent={C.warning}
          x={206}
        />
        <TeachingStage
          stageRef={composeRef}
          number="3"
          label="compose"
          detail="quaternion chain"
          accent={C.success}
          x={384}
        />
        <TeachingStage
          stageRef={renderRef}
          number="4"
          label="render"
          detail="skin + instance"
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
          现象学规则不是物理求解的半成品
        </text>
        <text
          x="380"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          它直接把“看起来像风”的线索映射成可并行的 vertex work
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          播放、暂停、单步或拖动进度，比较 simulation 与 rendering 的边界
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={WIND_LABELS}
        caption="GPU 负责合成运动，CPU 只提供场、层级和树实例所需的参数。"
      />
    </Figure>
  );
}

type SimulationLod = "branch" | "full" | "trunk";

const SLOD_LABELS: Record<SimulationLod, string> = {
  branch: "trunk + branch",
  full: "full detail",
  trunk: "trunk only",
};

export function GpuGems3Ch06ProceduralWindLab() {
  const [windPower, setWindPower] = useState(62);
  const [gustFrequency, setGustFrequency] = useState(4);
  const [turbulence, setTurbulence] = useState(48);
  const [stiffness, setStiffness] = useState(42);
  const [simulationLod, setSimulationLod] = useState<SimulationLod>("branch");

  const metrics = useMemo(() => {
    const lodFactor =
      simulationLod === "full" ? 1.35 : simulationLod === "trunk" ? 0.48 : 0.86;
    const swayAmplitude = Math.round(
      windPower * (1 - stiffness / 150) * (0.7 + turbulence / 180),
    );
    const phaseSpread = Math.round(20 + turbulence * 0.72);
    const shaderWork = Math.round(
      256 * lodFactor * (1 + gustFrequency / 18) * (1 + turbulence / 240),
    );
    const instanceNote =
      phaseSpread > 50
        ? "低相关 phase，群体更不同步"
        : "phase 接近，可能出现同步摆动";
    return {
      instanceNote,
      phaseSpread,
      shaderWork,
      swayAmplitude,
    };
  }, [gustFrequency, simulationLod, stiffness, turbulence, windPower]);

  function reset() {
    setWindPower(62);
    setGustFrequency(4);
    setTurbulence(48);
    setStiffness(42);
    setSimulationLod("branch");
  }

  const bend = Math.round(metrics.swayAmplitude * 0.42);
  const branchLift = Math.round((turbulence - 50) * 0.18);
  const trunkPath = `M310 286 C${310 - bend / 3} 242 ${310 + bend / 4} 206 ${310 + bend} 154 C${310 + bend + branchLift} 120 ${310 + bend} 88 ${310 + bend / 2} 54`;
  const leftBranch = `M310 218 C${278 - bend / 3} 196 ${256 - bend / 2} 168 ${228 - bend} 148`;
  const rightBranch = `M${310 + bend / 4} 188 C${350 + bend / 2} 166 ${384 + bend} 150 ${416 + bend} 122`;

  return (
    <Figure>
      <section
        className="not-prose overflow-hidden rounded-card border border-border bg-elevated"
        aria-label="GPU Gems 3 Chapter 6 程序风动画实验：调整风力、gust 频率、turbulence、stiffness 和 simulation LOD"
        data-visual-kind="gpu-gems3-ch06-procedural-wind"
      >
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-primary">
            Procedural Wind 实验
          </p>
          <p className="mt-1 text-sm text-secondary">
            先猜一猜：提高 turbulence
            会让每棵树更大幅摆动，还是主要让树群不再同步？把 stiffness
            调高后，哪一项应该下降？
          </p>
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
            <svg
              viewBox="0 0 620 320"
              role="img"
              aria-label="Procedural Wind 实验预览：树干和树枝按 wind power、turbulence 与 stiffness 变形，叶片显示 phase variation"
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
                wind {windPower} · turbulence {turbulence} ·{" "}
                {SLOD_LABELS[simulationLod]}
              </text>
              <path
                d={trunkPath}
                fill="none"
                stroke={C.warning}
                strokeWidth="16"
                strokeLinecap="round"
              />
              <path
                d={leftBranch}
                fill="none"
                stroke={C.success}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d={rightBranch}
                fill="none"
                stroke={C.success}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d={`M${228 - bend} 148 C${204 - bend} 132 ${190 - bend} 126 ${178 - bend} 112`}
                fill="none"
                stroke={C.accent}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d={`M${416 + bend} 122 C${438 + bend} 108 ${452 + bend} 98 ${466 + bend} 84`}
                fill="none"
                stroke={C.accent}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {Array.from({ length: 12 }, (_, index) => {
                const left = index % 2 === 0;
                const x = left
                  ? 174 + (index % 6) * 8 - bend / 2
                  : 448 + (index % 6) * 8 + bend / 2;
                const y = 100 + Math.floor(index / 2) * 28 + (index % 3) * 4;
                return (
                  <ellipse
                    key={`leaf-${index}`}
                    cx={x}
                    cy={y}
                    rx="25"
                    ry="10"
                    fill={index % 3 === 0 ? C.warning : C.success}
                    fillOpacity="0.3"
                    stroke={index % 3 === 0 ? C.warning : C.success}
                    strokeWidth="2"
                  />
                );
              })}
              <path d="M72 258 H162" stroke={C.accent} strokeWidth="4" />
              <polygon points="162,258 150,251 150,265" fill={C.accent} />
              <text
                x="116"
                y="246"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                wind direction
              </text>
              <rect
                x="42"
                y="278"
                width="174"
                height="30"
                rx="7"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="129"
                y="298"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                sway amplitude {metrics.swayAmplitude}
              </text>
              <rect
                x="404"
                y="278"
                width="174"
                height="30"
                rx="7"
                fill={C.surface}
                stroke={C.border}
              />
              <text
                x="491"
                y="298"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                phase spread {metrics.phaseSpread}%
              </text>
            </svg>
          </div>
          <div className="space-y-4">
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch06-wind-power"
            >
              wind power · {windPower}
              <input
                id="gpu-gems3-ch06-wind-power"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={windPower}
                onChange={(event) => setWindPower(Number(event.target.value))}
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch06-gust-frequency"
            >
              gust frequency · {gustFrequency}
              <input
                id="gpu-gems3-ch06-gust-frequency"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="1"
                max="8"
                value={gustFrequency}
                onChange={(event) =>
                  setGustFrequency(Number(event.target.value))
                }
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch06-turbulence"
            >
              turbulence · {turbulence}
              <input
                id="gpu-gems3-ch06-turbulence"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={turbulence}
                onChange={(event) => setTurbulence(Number(event.target.value))}
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch06-stiffness"
            >
              tree stiffness · {stiffness}
              <input
                id="gpu-gems3-ch06-stiffness"
                className="mdx-range mt-2 block h-2 w-full accent-accent"
                type="range"
                min="0"
                max="100"
                value={stiffness}
                onChange={(event) => setStiffness(Number(event.target.value))}
              />
            </label>
            <label
              className="block text-sm text-secondary"
              htmlFor="gpu-gems3-ch06-slod"
            >
              simulation LOD
              <select
                id="gpu-gems3-ch06-slod"
                className="mt-2 block h-11 w-full rounded-control border border-border bg-[var(--bg)] px-3 text-sm text-primary"
                value={simulationLod}
                onChange={(event) =>
                  setSimulationLod(event.target.value as SimulationLod)
                }
              >
                {(Object.keys(SLOD_LABELS) as SimulationLod[]).map((key) => (
                  <option key={key} value={key}>
                    {SLOD_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
            <div
              className="rounded-card border border-border bg-surface p-4"
              aria-live="polite"
            >
              <Metric
                label="sway amplitude"
                value={`${metrics.swayAmplitude}`}
                tone={C.warning}
              />
              <Metric
                label="phase spread"
                value={`${metrics.phaseSpread}%`}
                tone={C.success}
              />
              <Metric
                label="shader work / instance"
                value={`${metrics.shaderWork}`}
                tone={C.accent}
              />
              <Metric
                label="crowd signal"
                value={metrics.instanceNote}
                tone={metrics.phaseSpread > 50 ? C.success : C.danger}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
          <p className="text-xs leading-5 text-secondary">
            把幅度、频率、相位分散和 simulation LOD
            分开观察；视觉上更乱不等于每根枝条都需要更深的物理模拟。
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
