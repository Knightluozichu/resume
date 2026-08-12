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

export function GpuGems2Ch37ParameterizationCompareDiagram() {
  return (
    <Figure>
      <Frame label="2D UV 贴图与八叉树纹理的对比：左侧需要把网格摊平而产生接缝，右侧直接在包围物体的体积中按三维位置采样">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          不摊平网格，也能在表面存纹理
        </text>
        <rect
          x="48"
          y="76"
          width="276"
          height="286"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="186"
          y="106"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          传统 2D 参数化
        </text>
        <path
          d="M92 162 C132 124 204 126 270 168 L248 230 C205 208 165 216 112 252 Z"
          fill={C.accent}
          fillOpacity="0.18"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d="M133 132 L166 207 L112 252"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <path
          d="M205 134 L184 214 L248 230"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text x="78" y="302" fontSize="12" fill={C.warning}>
          摊平后会有 seam / distortion
        </text>
        <text x="78" y="326" fontSize="12" fill={C.secondary}>
          顶点需要额外携带 (u, v)
        </text>
        <Arrow x1={344} y1={218} x2={406} y2={218} color={C.success} />
        <text
          x="375"
          y="196"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          改变存储坐标
        </text>
        <rect
          x="436"
          y="76"
          width="276"
          height="286"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="574"
          y="106"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.secondary}
        >
          octree texture
        </text>
        <path
          d="M500 285 L566 142 L664 186 L617 313 Z"
          fill={C.accent}
          fillOpacity="0.13"
          stroke={C.accent}
          strokeWidth="3"
        />
        {[
          { x: 524, y: 257 },
          { x: 550, y: 220 },
          { x: 578, y: 185 },
          { x: 606, y: 245 },
          { x: 636, y: 211 },
          { x: 602, y: 283 },
        ].map((point, index) => (
          <circle
            key={`sample-${index}`}
            cx={point.x}
            cy={point.y}
            r="7"
            fill={C.success}
          />
        ))}
        <path d="M470 330 H678" stroke={C.border} strokeWidth="2" />
        <text
          x="574"
          y="330"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          只在表面附近的体素叶节点存颜色
        </text>
        <text
          x="574"
          y="352"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          用 mesh 的 (x, y, z) 直接查找
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37OctreeStructureDiagram() {
  return (
    <Figure>
      <Frame label="N3-tree 结构图：根节点是立方体，八叉树把每条边二分成 2x2x2 个孩子；只继续细分穿过表面的节点，空区域保持叶节点">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          octree 是 N³-tree 在 N = 2 时的特例
        </text>
        <text x="82" y="84" fontSize="14" fontWeight="700" fill={C.secondary}>
          root cube
        </text>
        <rect
          x="82"
          y="108"
          width="170"
          height="170"
          rx="10"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d="M82 160 H252 M82 212 H252 M134 108 V278 M198 108 V278"
          stroke={C.border}
          strokeWidth="2"
        />
        <path
          d="M82 278 L132 318 L302 318 L252 278"
          fill={C.warning}
          fillOpacity="0.08"
          stroke={C.warning}
          strokeWidth="2"
        />
        <path
          d="M252 108 L302 148 V318"
          fill="none"
          stroke={C.warning}
          strokeWidth="2"
        />
        <text
          x="167"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          2 × 2 × 2 children
        </text>
        <circle cx="151" cy="185" r="8" fill={C.success} />
        <circle cx="218" cy="238" r="8" fill={C.success} />
        <text
          x="168"
          y="352"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          绿色：表面相交，继续细分
        </text>
        <text
          x="168"
          y="374"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          空区域：直接成为 leaf
        </text>
        <Arrow x1={344} y1={214} x2={410} y2={214} color={C.accent} />
        <text x="377" y="190" textAnchor="middle" fontSize="12" fill={C.accent}>
          每层分辨率 × N
        </text>
        <rect
          x="438"
          y="96"
          width="268"
          height="246"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="572"
          y="128"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          深度与分支因子
        </text>
        {[
          "N = 2：树深，贴合表面",
          "N > 2：树浅，空格更多",
          "分辨率 N^D：深度 D 决定",
        ].map((label, index) => (
          <g key={label}>
            <circle
              cx="474"
              cy={174 + index * 48}
              r="7"
              fill={index === 1 ? C.warning : C.success}
            />
            <text x="494" y={179 + index * 48} fontSize="12" fill={C.secondary}>
              {label}
            </text>
          </g>
        ))}
        <text x="572" y="314" textAnchor="middle" fontSize="12" fill={C.accent}>
          例如 256³ 需要 8 层八叉树
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37LookupPathDiagram() {
  const nodes = [
    { label: "root", x: 90, y: 194, fill: C.accent },
    { label: "grid 1", x: 270, y: 134, fill: C.warning },
    { label: "grid 2", x: 270, y: 254, fill: C.warning },
    { label: "leaf", x: 500, y: 194, fill: C.success },
  ];
  return (
    <Figure>
      <Frame label="GPU 八叉树查找路径：fragment 得到网格表面点的三维坐标，从根 indirection grid 开始读取 RGBA；alpha 表示继续跟随 child index 还是直接返回 leaf color">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          fragment program：用一次次 indirection 走到叶节点
        </text>
        <text x="54" y="88" fontSize="13" fill={C.secondary}>
          mesh fragment
        </text>
        <circle
          cx="90"
          cy="124"
          r="25"
          fill={C.success}
          fillOpacity="0.18"
          stroke={C.success}
          strokeWidth="3"
        />
        <text x="90" y="130" textAnchor="middle" fontSize="12" fill={C.text}>
          M(x,y,z)
        </text>
        <Arrow x1={116} y1={139} x2={174} y2={185} color={C.accent} />
        <rect
          x="174"
          y="150"
          width="150"
          height="86"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="249"
          y="177"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          indirection pool
        </text>
        <text
          x="249"
          y="201"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          RGB = child index
        </text>
        <text
          x="249"
          y="222"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          A = leaf / pointer
        </text>
        {nodes.map((node, index) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={node.y}
              width="118"
              height="54"
              rx="10"
              fill={node.fill}
              fillOpacity="0.16"
              stroke={node.fill}
              strokeWidth="2"
            />
            <text
              x={node.x + 59}
              y={node.y + 33}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              {node.label}
            </text>
            {index === 0 && (
              <text
                x={node.x + 59}
                y={node.y + 72}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                I₀ = (0, 0, 0)
              </text>
            )}
          </g>
        ))}
        <Arrow x1={208} y1={194} x2={270} y2={161} color={C.warning} />
        <Arrow x1={208} y1={215} x2={270} y2={281} color={C.border} dashed />
        <Arrow x1={388} y1={161} x2={500} y2={211} color={C.success} />
        <text
          x="440"
          y="150"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          alpha 表明“停”
        </text>
        <text
          x="380"
          y="342"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不做任意地址写入：每个 fragment 都在自己的位置读取并输出颜色
        </text>
        <text
          x="380"
          y="366"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          硬件不支持动态分支时，用最大深度的固定循环兜底
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37FilteringDiagram() {
  const samples = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 1],
  ] as const;
  return (
    <Figure>
      <Frame label="八叉树纹理过滤图：三维线性插值需要八个邻近样本；若树只保存表面点，缺失邻居会造成背景色渗入，因此建树时要扩大相交盒覆盖过滤所需样本">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          过滤不是“免费”：三维插值需要八个邻居
        </text>
        <text x="72" y="86" fontSize="14" fontWeight="700" fill={C.secondary}>
          当前叶节点
        </text>
        <path
          d="M72 284 L176 154 L286 194 L236 318 Z"
          fill={C.accent}
          fillOpacity="0.13"
          stroke={C.accent}
          strokeWidth="3"
        />
        {samples.map(([cx, cy], index) => {
          const x = 112 + cx * 58 + (cy % 2) * 19;
          const y = 246 - cy * 39 - cx * 15;
          const missing = index === 3 || index === 6;
          return (
            <g key={`sample-${cx}-${cy}`}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill={missing ? C.danger : C.success}
                fillOpacity={missing ? 0.25 : 0.8}
                stroke={missing ? C.danger : C.success}
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                {missing ? "?" : "·"}
              </text>
            </g>
          );
        })}
        <text x="178" y="354" textAnchor="middle" fontSize="12" fill={C.danger}>
          缺邻居 → 背景色 bleed / aliasing
        </text>
        <Arrow x1={336} y1={226} x2={414} y2={226} color={C.warning} />
        <text
          x="375"
          y="202"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          建树时加 halo
        </text>
        <rect
          x="434"
          y="94"
          width="268"
          height="248"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="568"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          8-sample filter
        </text>
        {Array.from({ length: 8 }, (_, index) => {
          const x = 482 + (index % 4) * 50;
          const y = 176 + Math.floor(index / 4) * 50;
          return (
            <circle
              key={`filter-${index}`}
              cx={x}
              cy={y}
              r="14"
              fill={C.success}
              fillOpacity="0.2"
              stroke={C.success}
              strokeWidth="2"
            />
          );
        })}
        <text
          x="568"
          y="282"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          让所有需要的样本都成为叶节点
        </text>
        <text
          x="568"
          y="306"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          牺牲一点存储，换稳定的插值结果
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37MipLodDiagram() {
  const levels = [
    { label: "level 0 · leaves", x: 74, width: 220, color: C.success },
    { label: "level 1 · parents", x: 112, width: 144, color: C.accent },
    { label: "level 2 · root", x: 150, width: 68, color: C.warning },
  ] as const;
  return (
    <Figure>
      <Frame label="八叉树 mipmapping 图：把同一父节点的叶颜色平均成更粗的 LOD；lookup 根据屏幕导数选择停止深度，再从 LOD pool 读取平均颜色">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          LOD pool：沿树向上合并颜色
        </text>
        <text x="86" y="84" fontSize="13" fontWeight="700" fill={C.secondary}>
          indirection tree
        </text>
        {levels.map((level, index) => (
          <g key={level.label}>
            <rect
              x={level.x}
              y={112 + index * 64}
              width={level.width}
              height="38"
              rx="8"
              fill={level.color}
              fillOpacity="0.18"
              stroke={level.color}
              strokeWidth="2"
            />
            <text
              x={level.x + level.width / 2}
              y={136 + index * 64}
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              {level.label}
            </text>
            {index < levels.length - 1 && (
              <Arrow
                x1={184}
                y1={154 + index * 64}
                x2={184}
                y2={174 + index * 64}
                color={C.border}
              />
            )}
          </g>
        ))}
        <Arrow x1={310} y1={224} x2={420} y2={224} color={C.accent} />
        <text x="365" y="199" textAnchor="middle" fontSize="12" fill={C.accent}>
          stop at chosen depth
        </text>
        <rect
          x="434"
          y="100"
          width="266"
          height="232"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="567"
          y="132"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          LOD pool
        </text>
        <rect
          x="474"
          y="160"
          width="186"
          height="46"
          rx="8"
          fill={C.warning}
          fillOpacity="0.16"
          stroke={C.warning}
        />
        <text x="567" y="189" textAnchor="middle" fontSize="12" fill={C.text}>
          parent average color
        </text>
        <text
          x="567"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          近处：读深层，保细节
        </text>
        <text
          x="567"
          y="270"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          远处：读浅层，防 aliasing
        </text>
        <text
          x="567"
          y="304"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          导数决定过滤级别
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37SurfacePaintDiagram() {
  return (
    <Figure>
      <Frame label="表面绘制流程图：三维画笔沿网格表面移动，只更新被画笔覆盖的八叉树叶节点，并把修改后的 RGBA cells 局部上传到 indirection pool">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          3D brush 只改动被触碰的叶节点
        </text>
        <path
          d="M76 300 L126 156 L270 126 L320 282 Z"
          fill={C.accent}
          fillOpacity="0.15"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d="M110 262 L146 180 L236 162 L278 255 Z"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <circle
          cx="202"
          cy="220"
          r="49"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
          strokeWidth="3"
        />
        <circle cx="202" cy="220" r="8" fill={C.warning} />
        <text
          x="202"
          y="298"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          Pcenter / Pradius
        </text>
        <text
          x="198"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          alpha 随距离衰减，颜色做加权混合
        </text>
        <Arrow x1={350} y1={220} x2={428} y2={220} color={C.success} />
        <text
          x="389"
          y="197"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          partial update
        </text>
        <rect
          x="452"
          y="100"
          width="244"
          height="236"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="574"
          y="132"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          RGBA 3D texture cells
        </text>
        {Array.from({ length: 16 }, (_, index) => {
          const x = 488 + (index % 4) * 42;
          const y = 160 + Math.floor(index / 4) * 35;
          const active =
            index === 5 || index === 6 || index === 9 || index === 10;
          return (
            <rect
              key={`cell-${index}`}
              x={x}
              y={y}
              width="28"
              height="23"
              rx="4"
              fill={active ? C.warning : C.border}
              fillOpacity={active ? 0.75 : 0.35}
              stroke={active ? C.warning : C.border}
            />
          );
        })}
        <text
          x="574"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只上传亮起的 cells
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch37SurfaceSimulationDiagram() {
  const neighbors = [
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 1],
  ] as const;
  return (
    <Figure>
      <Frame label="表面液体模拟图：八叉树叶节点保存 density map 的索引，neighbor textures 把当前叶节点映射到空间邻居，再从 density map 读取邻居密度进行下一轮更新">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          八叉树做地址层，density map 做状态层
        </text>
        <path
          d="M68 288 L124 154 L270 136 L322 286 Z"
          fill={C.accent}
          fillOpacity="0.14"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx="196" cy="220" r="9" fill={C.success} />
        {neighbors.map(([dx, dy], index) => (
          <g key={`neighbor-${dx}-${dy}`}>
            <line
              x1="196"
              y1="220"
              x2={196 + dx * 38 - 38}
              y2={220 + dy * 36 - 38}
              stroke={C.success}
              strokeWidth="2"
            />
            <circle
              cx={196 + dx * 38 - 38}
              cy={220 + dy * 36 - 38}
              r="7"
              fill={C.success}
              fillOpacity="0.5"
            />
            <text
              x={196 + dx * 38 - 38}
              y={220 + dy * 36 - 51}
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              N{index + 1}
            </text>
          </g>
        ))}
        <text
          x="195"
          y="345"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          leaf L → index I
        </text>
        <Arrow x1={350} y1={224} x2={420} y2={224} color={C.accent} />
        <text x="385" y="201" textAnchor="middle" fontSize="12" fill={C.accent}>
          neighbor lookup
        </text>
        <rect
          x="444"
          y="94"
          width="254"
          height="250"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="571"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          2D textures
        </text>
        <rect
          x="474"
          y="152"
          width="194"
          height="48"
          rx="8"
          fill={C.warning}
          fillOpacity="0.16"
          stroke={C.warning}
        />
        <text x="571" y="181" textAnchor="middle" fontSize="12" fill={C.text}>
          neighbor texture N(I)
        </text>
        <Arrow x1={571} y1={204} x2={571} y2={234} color={C.success} />
        <rect
          x="474"
          y="240"
          width="194"
          height="48"
          rx="8"
          fill={C.success}
          fillOpacity="0.16"
          stroke={C.success}
        />
        <text x="571" y="269" textAnchor="middle" fontSize="12" fill={C.text}>
          density map [N(I)]
        </text>
        <text
          x="571"
          y="320"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          表面平均约 9 个邻居，不必固定 26 张纹理
        </text>
      </Frame>
    </Figure>
  );
}

const TIMELINE_STEPS: TeachingStep[] = [
  { label: "coords", caption: "三维表面坐标" },
  { label: "indirection", caption: "读取 indirection grid" },
  { label: "leaf", caption: "遇到 leaf / LOD" },
  { label: "shade", caption: "返回颜色" },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch37LookupTimelineDiagram() {
  const coordsRef = useRef<SVGGElement>(null);
  const indirectionRef = useRef<SVGGElement>(null);
  const leafRef = useRef<SVGGElement>(null);
  const shadeRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(coordsRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("coords", 0);
      tl.add(
        indirectionRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T,
      );
      tl.label("indirection", T);
      tl.add(
        leafRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("leaf", T * 2);
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
      <Frame label="可播放的八叉树纹理 lookup 动画：先拿到 fragment 的三维坐标，再逐级读取 indirection grid，遇到 leaf 或选定 LOD 后返回颜色">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          lookup 的四个关键帧
        </text>
        <g ref={coordsRef}>
          <circle
            cx="86"
            cy="190"
            r="28"
            fill={C.success}
            fillOpacity="0.24"
            stroke={C.success}
            strokeWidth="3"
          />
          <text x="86" y="195" textAnchor="middle" fontSize="12" fill={C.text}>
            M(x,y,z)
          </text>
          <text
            x="86"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            fragment
          </text>
        </g>
        <g ref={indirectionRef}>
          <rect
            x="190"
            y="140"
            width="138"
            height="100"
            rx="12"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="259"
            y="172"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            I₀ → I₁
          </text>
          <text
            x="259"
            y="199"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            RGB child index
          </text>
          <text
            x="259"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            alpha branch
          </text>
        </g>
        <g ref={leafRef}>
          <rect
            x="392"
            y="140"
            width="138"
            height="100"
            rx="12"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="461"
            y="172"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            leaf / LOD
          </text>
          <text
            x="461"
            y="199"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            stop lookup
          </text>
          <text
            x="461"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            read stored color
          </text>
        </g>
        <g ref={shadeRef}>
          <rect
            x="594"
            y="140"
            width="112"
            height="100"
            rx="12"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="650"
            y="172"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.text}
          >
            shade
          </text>
          <text
            x="650"
            y="199"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            fragment out
          </text>
          <text
            x="650"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            RGB color
          </text>
        </g>
        <Arrow x1={118} y1={190} x2={190} y2={190} color={C.accent} />
        <Arrow x1={328} y1={190} x2={392} y2={190} color={C.accent} />
        <Arrow x1={530} y1={190} x2={594} y2={190} color={C.success} />
        <text
          x="380"
          y="316"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          固定最大深度保证老硬件可运行；支持动态分支时可在 leaf 提前退出
        </text>
        <text
          x="380"
          y="340"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          用下方控制条播放、暂停、单步或拖动进度
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="每一次 indirection 都是一次 dependent texture lookup；alpha 决定继续走树还是返回叶颜色。"
      />
    </Figure>
  );
}

type LabMode = "lookup" | "paint" | "liquid";

export function GpuGems2Ch37OctreeTextureLab() {
  const [mode, setMode] = useState<LabMode>("lookup");
  const [depth, setDepth] = useState(5);
  const [surfaceCoverage, setSurfaceCoverage] = useState(58);
  const [brushRadius, setBrushRadius] = useState(24);

  const result = useMemo(() => {
    const resolution = 2 ** depth;
    const maxCells = resolution ** 3;
    const occupiedCells = Math.max(
      8,
      Math.round(maxCells * (surfaceCoverage / 100) * 0.018),
    );
    const lookupSteps = depth;
    const filterSamples = mode === "lookup" ? 1 : 8;
    const paintUpdates = Math.max(
      1,
      Math.round(occupiedCells * (brushRadius / 100) * 0.16),
    );
    const neighborReads =
      mode === "liquid" ? Math.min(9, Math.max(4, depth + 3)) : 0;
    const lodLevel = Math.max(
      0,
      Math.min(depth - 1, Math.round((100 - surfaceCoverage) / 25)),
    );
    const summary = {
      lookup: "每个 fragment 沿树走到 leaf，再取回颜色。",
      paint: "3D brush 只更新局部叶节点，避免整张纹理重传。",
      liquid: "叶节点给出 density map 地址，邻居纹理供下一轮模拟读取。",
    }[mode];
    return {
      filterSamples,
      lookupSteps,
      lodLevel,
      maxCells,
      neighborReads,
      occupiedCells,
      paintUpdates,
      summary,
    };
  }, [brushRadius, depth, mode, surfaceCoverage]);

  const reset = () => {
    setMode("lookup");
    setDepth(5);
    setSurfaceCoverage(58);
    setBrushRadius(24);
  };

  const activeCell = Math.min(7, Math.max(0, result.lodLevel));

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="octree texture 实验模式"
          >
            {(
              [
                ["lookup", "lookup"],
                ["paint", "surface paint"],
                ["liquid", "liquid flow"],
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
            aria-label={`octree texture 实验：当前模式 ${mode}，深度 ${depth}，表面覆盖 ${surfaceCoverage}%，LOD level ${result.lodLevel}`}
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
              {mode === "lookup"
                ? "从 M 走到叶颜色"
                : mode === "paint"
                  ? "画笔局部更新叶节点"
                  : "邻居地址驱动表面状态"}
            </text>
            <path
              d="M68 272 L126 112 L280 92 L326 258 Z"
              fill={C.accent}
              fillOpacity="0.14"
              stroke={C.accent}
              strokeWidth="3"
            />
            {Array.from({ length: 9 }, (_, index) => {
              const x =
                104 + (index % 3) * 67 + (Math.floor(index / 3) % 2) * 14;
              const y = 222 - Math.floor(index / 3) * 46;
              const active =
                index === activeCell || (mode === "paint" && index === 4);
              return (
                <circle
                  key={`lab-node-${index}`}
                  cx={x}
                  cy={y}
                  r={active ? 10 : 6}
                  fill={active ? C.warning : C.success}
                  fillOpacity={active ? 0.85 : 0.5}
                />
              );
            })}
            {mode === "paint" && (
              <circle
                cx="202"
                cy="190"
                r={28 + brushRadius / 2}
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.warning}
                strokeWidth="3"
              />
            )}
            <Arrow
              x1={340}
              y1={188}
              x2={414}
              y2={188}
              color={mode === "liquid" ? C.success : C.accent}
            />
            <rect
              x="432"
              y="82"
              width="260"
              height="214"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="562"
              y="114"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              {mode === "liquid" ? "neighbor → density" : "indirection pool"}
            </text>
            {mode === "liquid" ? (
              <>
                <rect
                  x="474"
                  y="140"
                  width="176"
                  height="42"
                  rx="8"
                  fill={C.warning}
                  fillOpacity="0.16"
                  stroke={C.warning}
                />
                <text
                  x="562"
                  y="166"
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.text}
                >
                  N(I) = neighbor index
                </text>
                <Arrow x1={562} y1={186} x2={562} y2={216} color={C.success} />
                <rect
                  x="474"
                  y="224"
                  width="176"
                  height="42"
                  rx="8"
                  fill={C.success}
                  fillOpacity="0.16"
                  stroke={C.success}
                />
                <text
                  x="562"
                  y="250"
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.text}
                >
                  Dmap[N(I)]
                </text>
              </>
            ) : (
              <>
                {Array.from({ length: 12 }, (_, index) => {
                  const active =
                    index === activeCell ||
                    (mode === "paint" && [5, 6, 9].includes(index));
                  return (
                    <rect
                      key={`lab-cell-${index}`}
                      x={474 + (index % 4) * 43}
                      y={142 + Math.floor(index / 4) * 39}
                      width="29"
                      height="24"
                      rx="4"
                      fill={active ? C.warning : C.border}
                      fillOpacity={active ? 0.8 : 0.34}
                      stroke={active ? C.warning : C.border}
                    />
                  );
                })}
                <text
                  x="562"
                  y="276"
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.secondary}
                >
                  {mode === "paint"
                    ? `${result.paintUpdates} 个局部 cells 待更新`
                    : `RGBA alpha → depth ${result.lodLevel}`}
                </text>
              </>
            )}
          </svg>
        </div>
        <div className="rounded-card border border-border bg-surface p-4">
          <label className="block text-sm text-secondary">
            tree depth: {depth}
            <input
              aria-label="tree depth"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="8"
              step="1"
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            surface coverage: {surfaceCoverage}%
            <input
              aria-label="surface coverage"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="20"
              max="80"
              step="1"
              value={surfaceCoverage}
              onChange={(event) =>
                setSurfaceCoverage(Number(event.target.value))
              }
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            brush radius: {brushRadius}%
            <input
              aria-label="brush radius"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="8"
              max="48"
              step="1"
              value={brushRadius}
              onChange={(event) => setBrushRadius(Number(event.target.value))}
            />
          </label>
          <div className="mt-5">
            <Metric label="max grid resolution" value={`${2 ** depth}³`} />
            <Metric
              label="occupied cells (teaching estimate)"
              value={`${result.occupiedCells}`}
              tone={C.success}
            />
            <Metric label="lookup steps" value={`${result.lookupSteps}`} />
            <Metric
              label="filter samples"
              value={`${result.filterSamples}`}
              tone={C.warning}
            />
            <Metric
              label="neighbor reads"
              value={`${result.neighborReads || "—"}`}
              tone={C.accent}
            />
            <Metric
              label="selected LOD"
              value={`${result.lodLevel}`}
              tone={C.success}
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
