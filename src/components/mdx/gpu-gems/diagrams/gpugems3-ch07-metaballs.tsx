"use client";

import { useMemo, useState, type ReactNode } from "react";

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
  width = 154,
  x,
  y,
}: {
  accent: string;
  detail: string;
  label: string;
  width?: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="84"
        rx="14"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 34}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + width / 2}
        y={y + 61}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

function PointCloud({
  color = C.accent,
  dense = false,
  offsetX = 0,
  offsetY = 0,
}: {
  color?: string;
  dense?: boolean;
  offsetX?: number;
  offsetY?: number;
}) {
  const points = [
    [0, -42],
    [26, -30],
    [42, -4],
    [31, 24],
    [8, 42],
    [-24, 35],
    [-43, 8],
    [-30, -22],
    [0, -16],
    [17, 3],
    [-14, 10],
  ];
  const shown = dense ? [...points, [-7, -52], [48, 18], [-49, -10]] : points;
  return (
    <g transform={`translate(${offsetX} ${offsetY})`}>
      {shown.map(([x, y], index) => (
        <circle
          key={`${x}-${y}-${index}`}
          cx={x}
          cy={y}
          r={dense ? 4 : 4.5}
          fill={color}
          fillOpacity={0.75}
        />
      ))}
    </g>
  );
}

export function GpuGems3Ch07MethodComparisonDiagram() {
  return (
    <Figure>
      <Frame label="元球隐式表面的三种可视化路线比较：marching cubes 扫描体积、ray tracing 逐像素求交、point-based surface particles 跟踪表面积">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          三条路线：重建体积、重算像素，还是跟踪表面？
        </text>
        <g transform="translate(24 68)">
          <rect
            width="220"
            height="300"
            rx="16"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="110"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            marching cubes
          </text>
          <g stroke={C.warning} strokeOpacity="0.55" fill="none">
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={52 + i * 29}
                y1="70"
                x2={52 + i * 29}
                y2="184"
              />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="52"
                y1={70 + i * 29}
                x2="168"
                y2={70 + i * 29}
              />
            ))}
          </g>
          <path
            d="M 62 144 Q 96 70 154 128 Q 172 164 136 184 Q 78 194 62 144"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="110"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            扫描所有 cells
          </text>
          <text
            x="110"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            成本随 volume 增长
          </text>
          <text
            x="110"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.warning}
          >
            稳定网格，忽略时间连贯
          </text>
        </g>
        <g transform="translate(270 68)">
          <rect
            width="220"
            height="300"
            rx="16"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="110"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            ray tracing
          </text>
          <ellipse
            cx="110"
            cy="143"
            rx="60"
            ry="54"
            fill={C.danger}
            fillOpacity="0.12"
            stroke={C.danger}
            strokeWidth="3"
          />
          {[74, 94, 114, 134, 154].map((y) => (
            <Arrow key={y} x1={26} y1={y} x2={82} y2={y + 5} color={C.danger} />
          ))}
          <text
            x="110"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每个 pixel 发射 ray
          </text>
          <text
            x="110"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每帧从头找表面
          </text>
          <text
            x="110"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.danger}
          >
            画质直观，时间复用少
          </text>
        </g>
        <g transform="translate(516 68)">
          <rect
            width="220"
            height="300"
            rx="16"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="110"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            point-based
          </text>
          <ellipse
            cx="110"
            cy="143"
            rx="64"
            ry="54"
            fill={C.success}
            fillOpacity="0.09"
            stroke={C.success}
            strokeWidth="3"
          />
          <PointCloud color={C.success} offsetX={110} offsetY={143} />
          <text
            x="110"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            particles 贴住表面
          </text>
          <text
            x="110"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            更新量随 surface area
          </text>
          <text
            x="110"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.success}
          >
            可复用上一时刻位置
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07ImplicitSurfaceDiagram() {
  return (
    <Figure>
      <Frame label="元球隐式表面示意：fluid atoms 通过 smoothing kernels 叠加 density field，F 等值线形成表面，surface particles 贴在等值线上">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从 fluid atoms 到可以渲染的表面粒子
        </text>
        <g transform="translate(32 84)">
          <rect
            width="204"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="102"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            1 · atoms + kernels
          </text>
          <circle
            cx="78"
            cy="124"
            r="62"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
          />
          <circle
            cx="132"
            cy="164"
            r="58"
            fill={C.warning}
            fillOpacity="0.1"
            stroke={C.warning}
          />
          <circle cx="78" cy="124" r="8" fill={C.accent} />
          <circle cx="132" cy="164" r="8" fill={C.warning} />
          <text
            x="102"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            位置 aⱼ + radius hⱼ
          </text>
        </g>
        <Arrow x1={252} y1={208} x2={306} y2={208} />
        <g transform="translate(306 84)">
          <rect
            width="204"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="102"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            2 · density field F(x)
          </text>
          <path
            d="M 34 151 Q 76 78 148 112 Q 187 146 157 190 Q 88 221 34 151"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="3"
          />
          <path
            d="M 58 152 Q 86 104 135 125 Q 161 150 137 177 Q 91 194 58 152"
            fill="none"
            stroke={C.warning}
            strokeDasharray="6 5"
            strokeWidth="2"
          />
          <text
            x="102"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            F(x) = iso-value 时成面
          </text>
        </g>
        <Arrow x1={526} y1={208} x2={580} y2={208} />
        <g transform="translate(580 84)">
          <rect
            width="148"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="74"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            3 · surface particles
          </text>
          <ellipse
            cx="74"
            cy="147"
            rx="49"
            ry="58"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="3"
          />
          <PointCloud color={C.success} offsetX={74} offsetY={147} />
          <text
            x="74"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            贴面、移动、绘制
          </text>
        </g>
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          重点：元球的动态由 CPU 提供；GPU 负责把隐式场变成可更新的视觉采样
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07ConstraintDiagram() {
  return (
    <Figure>
      <Frame label="surface particle 速度约束：density F 与 gradient 约束粒子留在等值面，environment velocity 与 repulsion velocity 合成 desired velocity">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          速度不是“随便走”：先跟面，再沿面走
        </text>
        <g transform="translate(36 88)">
          <rect
            width="196"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="98"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            density + gradient
          </text>
          <path
            d="M 30 146 Q 72 72 153 112 Q 177 148 148 183 Q 82 210 30 146"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="96" cy="104" r="7" fill={C.text} />
          <Arrow x1={96} y1={104} x2={125} y2={76} color={C.warning} />
          <text
            x="98"
            y="205"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ∇F 指向密度变化
          </text>
        </g>
        <Arrow x1={250} y1={202} x2={302} y2={202} />
        <g transform="translate(302 88)">
          <rect
            width="196"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="98"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            desired velocity Dᵢ
          </text>
          <Box
            accent={C.success}
            detail="fluid atoms 的变化"
            label="environment"
            width={156}
            x={20}
            y={55}
          />
          <Box
            accent={C.danger}
            detail="邻居太近就推开"
            label="repulsion"
            width={156}
            x={20}
            y={143}
          />
        </g>
        <Arrow x1={516} y1={202} x2={568} y2={202} />
        <g transform="translate(568 88)">
          <rect
            width="160"
            height="228"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="80"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            constrained vᵢ
          </text>
          <path
            d="M 28 151 Q 68 78 133 119 Q 146 151 119 181 Q 67 199 28 151"
            fill="none"
            stroke={C.success}
            strokeWidth="3"
          />
          <circle cx="82" cy="143" r="7" fill={C.text} />
          <Arrow x1={82} y1={143} x2={125} y2={159} color={C.success} />
          <text
            x="80"
            y="205"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            切掉离面分量
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          约束项让粒子追随表面变化；排斥项只负责覆盖率，不负责定义表面本身
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07SpatialHashDiagram() {
  return (
    <Figure>
      <Frame label="空间哈希数据路径：CPU 根据 fluid atom 的影响半径构建 inverted hash，GPU 根据 surface particle 位置查询 bucket，读取邻居位置与速度">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          邻居搜索：CPU 建索引，GPU 只查附近 bucket
        </text>
        <g transform="translate(28 92)">
          <rect
            width="196"
            height="224"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="98"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            CPU · build
          </text>
          <circle
            cx="70"
            cy="95"
            r="17"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <circle
            cx="127"
            cy="151"
            r="17"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <circle
            cx="80"
            cy="190"
            r="17"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <text
            x="98"
            y="67"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            atom position + velocity
          </text>
          <text
            x="98"
            y="209"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            送入 texture pools
          </text>
        </g>
        <Arrow x1={244} y1={204} x2={286} y2={204} />
        <g transform="translate(286 92)">
          <rect
            width="190"
            height="224"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="95"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            inverted hash
          </text>
          <g
            transform="translate(24 58)"
            stroke={C.warning}
            strokeOpacity="0.7"
          >
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 43}
                  y={row * 43}
                  width="43"
                  height="43"
                  fill={row === 1 && col === 1 ? C.warning : "none"}
                  fillOpacity="0.16"
                />
              )),
            )}
          </g>
          <text
            x="95"
            y="205"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            atom 按 influence area 多次入桶
          </text>
        </g>
        <Arrow x1={496} y1={204} x2={538} y2={204} />
        <g transform="translate(538 92)">
          <rect
            width="194"
            height="224"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="97"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            GPU · query
          </text>
          <circle cx="70" cy="108" r="8" fill={C.success} />
          <circle cx="124" cy="100" r="6" fill={C.success} />
          <circle cx="140" cy="148" r="6" fill={C.success} />
          <circle cx="88" cy="161" r="6" fill={C.success} />
          <circle
            cx="103"
            cy="130"
            r="28"
            fill="none"
            stroke={C.success}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x="97"
            y="205"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            一次 bucket 得到局部邻居
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          倒置哈希减少 GPU 查询次数，但会增加 CPU
          构建时的重复入桶；瓶颈在哪边，选择就反过来
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07RepulsionPassDiagram() {
  return (
    <Figure>
      <Frame label="GPU 两遍排斥算法：第一遍把 surface particle 的世界坐标写入浮点 render target，第二遍绘制影响范围 quad 并累加邻域 repulsion force">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          用 render target 临时充当邻居表
        </text>
        <g transform="translate(28 80)">
          <rect
            width="334"
            height="284"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="167"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            Pass 1 · 写位置图
          </text>
          <text
            x="167"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每个 particle 投到一个 pixel，保存 world-space coordinate
          </text>
          <rect
            x="62"
            y="82"
            width="210"
            height="126"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <circle
                cx={94 + (i % 3) * 64}
                cy={116 + Math.floor(i / 3) * 54}
                r="8"
                fill={C.accent}
              />
              <text
                x={94 + (i % 3) * 64}
                y={146 + Math.floor(i / 3) * 54}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                p{i + 1}
              </text>
            </g>
          ))}
          <text
            x="167"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.accent}
          >
            Image 1 = particle positions
          </text>
        </g>
        <Arrow x1={382} y1={222} x2={424} y2={222} />
        <g transform="translate(426 80)">
          <rect
            width="306"
            height="284"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="153"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            Pass 2 · 算排斥力
          </text>
          <text
            x="153"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每个 particle 绘制覆盖影响范围的 quad
          </text>
          <rect
            x="76"
            y="86"
            width="154"
            height="116"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <circle
            cx="153"
            cy="144"
            r="39"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <circle cx="153" cy="144" r="7" fill={C.text} />
          <circle cx="126" cy="123" r="6" fill={C.warning} />
          <circle cx="188" cy="130" r="6" fill={C.warning} />
          <Arrow x1={126} y1={123} x2={145} y2={138} color={C.danger} />
          <Arrow x1={188} y1={130} x2={163} y2={140} color={C.danger} />
          <text
            x="153"
            y="241"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.success}
          >
            Image 2 = accumulated repulsion
          </text>
        </g>
        <text
          x="380"
          y="398"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          通过两遍绘制绕开 GPU 上动态构建 variable-length hash 的代价；代价是
          viewport 分辨率会造成位置冲突
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07DispersionDiagram() {
  return (
    <Figure>
      <Frame label="全局粒子 dispersion：从高密度区域选择 base particle，与低密度 comparison particle 比较，满足阈值后把粒子移动到影响边界">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          排斥让粒子慢慢均匀，dispersion 负责跨空洞搬运
        </text>
        <g transform="translate(40 86)">
          <rect
            width="260"
            height="238"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="130"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            高密度 base
          </text>
          <ellipse
            cx="115"
            cy="140"
            rx="66"
            ry="50"
            fill={C.danger}
            fillOpacity="0.08"
            stroke={C.danger}
          />
          <PointCloud color={C.danger} dense offsetX={115} offsetY={140} />
          <text
            x="130"
            y="207"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            密度差超过 threshold T
          </text>
        </g>
        <Arrow x1={328} y1={205} x2={420} y2={205} color={C.warning} />
        <text
          x="374"
          y="184"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          compare + move
        </text>
        <g transform="translate(460 86)">
          <rect
            width="260"
            height="238"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="130"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            低密度 comparison
          </text>
          <ellipse
            cx="130"
            cy="140"
            rx="76"
            ry="56"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
          />
          <PointCloud color={C.success} offsetX={130} offsetY={140} />
          <circle cx="184" cy="164" r="8" fill={C.warning} />
          <text
            x="130"
            y="207"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            搬到 influence border
          </text>
        </g>
        <text
          x="380"
          y="376"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只做局部 repulsion 可能填不满 disconnected regions；dispersion
          以低频随机比较补上全局缺口
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch07RenderingDiagram() {
  return (
    <Figure>
      <Frame label="surface particle 渲染路径：oriented quad 先做 depth pass，再用 alpha accumulation、frontmost test 和 normal perturbation 合成平滑透明流体表面">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          粒子不是最终画面：深度、alpha 与法线一起补成表面
        </text>
        <Box
          accent={C.accent}
          detail="每点扩成 oriented quad"
          label="surface particles"
          x={26}
          y={100}
          width={150}
        />
        <Arrow x1={190} y1={142} x2={238} y2={142} />
        <Box
          accent={C.warning}
          detail="每像素保留 minimum depth"
          label="depth pass"
          x={240}
          y={100}
          width={150}
        />
        <Arrow x1={404} y1={142} x2={452} y2={142} />
        <Box
          accent={C.success}
          detail="中心距决定 alpha"
          label="alpha pass"
          x={454}
          y={100}
          width={150}
        />
        <Arrow x1={618} y1={142} x2={674} y2={142} />
        <Box
          accent={C.danger}
          detail="curvature 改 normal"
          label="final blend"
          x={594}
          y={242}
          width={150}
        />
        <Arrow x1={678} y1={188} x2={678} y2={240} color={C.danger} />
        <g transform="translate(28 242)">
          <rect
            width="550"
            height="110"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <ellipse
            cx="82"
            cy="57"
            rx="44"
            ry="30"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="74" cy="54" r="5" fill={C.accent} />
          <circle cx="97" cy="66" r="5" fill={C.accent} />
          <text x="190" y="40" fontSize="13" fontWeight="700" fill={C.text}>
            frontmost test
          </text>
          <text x="190" y="66" fontSize="12" fill={C.secondary}>
            只保留前层粒子，再允许同一表面的多个 quad 混合
          </text>
          <text x="190" y="91" fontSize="12" fill={C.secondary}>
            gradient + curvature → tangent 上的小幅 normal perturbation
          </text>
        </g>
        <text
          x="380"
          y="398"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          可视化的核心边界：粒子负责采样表面，渲染阶段负责把采样点组织成连续的视觉表面
        </text>
      </Frame>
    </Figure>
  );
}

type DistributionMode = "repulsion" | "repulsion-dispersion" | "raw";

export function GpuGems3Ch07MetaballLab() {
  const [atoms, setAtoms] = useState(5);
  const [surfaceParticles, setSurfaceParticles] = useState(32);
  const [repulsionRadius, setRepulsionRadius] = useState(54);
  const [cellSize, setCellSize] = useState(38);
  const [distribution, setDistribution] = useState<DistributionMode>(
    "repulsion-dispersion",
  );

  const result = useMemo(() => {
    const atomInfluence = atoms * 4.4;
    const coverage = Math.min(
      98,
      Math.round(
        48 +
          surfaceParticles * 1.35 +
          (distribution === "repulsion-dispersion"
            ? 14
            : distribution === "repulsion"
              ? 5
              : -8),
      ),
    );
    const overlap = Math.max(
      4,
      Math.round(
        34 +
          repulsionRadius * 0.22 -
          surfaceParticles * 0.46 +
          (distribution === "raw" ? 14 : 0),
      ),
    );
    const neighborWork = Math.round(
      surfaceParticles * (repulsionRadius / cellSize) * 1.6,
    );
    const gapRisk = Math.max(
      2,
      Math.round(
        36 -
          surfaceParticles * 0.55 -
          (distribution === "repulsion-dispersion"
            ? 12
            : distribution === "repulsion"
              ? 5
              : 0),
      ),
    );
    return { atomInfluence, coverage, gapRisk, neighborWork, overlap };
  }, [atoms, cellSize, distribution, repulsionRadius, surfaceParticles]);

  const particleCount = Math.max(
    14,
    Math.min(48, Math.round(surfaceParticles * 1.25)),
  );
  const previewPoints = Array.from({ length: particleCount }, (_, index) => {
    const angle = (index / particleCount) * Math.PI * 2;
    const radius = 68 + 13 * Math.sin(index * 2.7);
    return {
      x: Number((190 + Math.cos(angle) * radius).toFixed(2)),
      y: Number((164 + Math.sin(angle) * radius * 0.72).toFixed(2)),
      opacity: distribution === "raw" ? 0.52 : 0.82,
    };
  });

  function reset() {
    setAtoms(5);
    setSurfaceParticles(32);
    setRepulsionRadius(54);
    setCellSize(38);
    setDistribution("repulsion-dispersion");
  }

  const dirty =
    atoms !== 5 ||
    surfaceParticles !== 32 ||
    repulsionRadius !== 54 ||
    cellSize !== 38 ||
    distribution !== "repulsion-dispersion";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 7 元球点可视化实验：调整 fluid atoms、surface particles、排斥半径、哈希 cell size 和分布算法"
      data-visual-kind="gpu-gems3-ch07-metaballs"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Metaball surface particle 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          观察 surface
          coverage、邻居查询工作量和空洞风险如何随粒子分布策略改变；数值是教学趋势示意，不替代真实
          GPU profile。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="元球隐式表面与 surface particles 的实时趋势预览"
            className="block h-auto w-full"
          >
            <text
              x="260"
              y="26"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              {atoms} fluid atoms · {surfaceParticles} surface particles ·{" "}
              {distribution === "raw"
                ? "raw drift"
                : distribution === "repulsion"
                  ? "local repulsion"
                  : "repulsion + dispersion"}
            </text>
            <ellipse
              cx="190"
              cy="164"
              rx="108"
              ry="84"
              fill={C.accent}
              fillOpacity="0.08"
              stroke={C.accent}
              strokeWidth="3"
            />
            <ellipse
              cx="190"
              cy="164"
              rx="75"
              ry="58"
              fill={C.warning}
              fillOpacity="0.06"
              stroke={C.warning}
              strokeDasharray="7 5"
              strokeWidth="2"
            />
            {[
              { x: 142, y: 142 },
              { x: 218, y: 154 },
              { x: 174, y: 204 },
              { x: 244, y: 196 },
              { x: 126, y: 188 },
            ]
              .slice(0, atoms)
              .map((atom, index) => (
                <g key={`${atom.x}-${atom.y}`}>
                  <circle
                    cx={atom.x}
                    cy={atom.y}
                    r={18 + index * 2}
                    fill={index % 2 ? C.warning : C.accent}
                    fillOpacity="0.12"
                    stroke={index % 2 ? C.warning : C.accent}
                  />
                  <circle
                    cx={atom.x}
                    cy={atom.y}
                    r="4"
                    fill={index % 2 ? C.warning : C.accent}
                  />
                </g>
              ))}
            {previewPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="3.2"
                fill={
                  distribution === "raw" && index % 4 === 0
                    ? C.danger
                    : C.success
                }
                fillOpacity={point.opacity}
              />
            ))}
            <rect
              x="324"
              y="68"
              width="166"
              height="188"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="407"
              y="96"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              读数
            </text>
            <text x="344" y="128" fontSize="12" fill={C.secondary}>
              coverage
            </text>
            <text
              x="470"
              y="128"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.coverage}%
            </text>
            <text x="344" y="160" fontSize="12" fill={C.secondary}>
              overlap
            </text>
            <text
              x="470"
              y="160"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.warning}
            >
              {result.overlap}%
            </text>
            <text x="344" y="192" fontSize="12" fill={C.secondary}>
              neighbor work
            </text>
            <text
              x="470"
              y="192"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              {result.neighborWork} rel
            </text>
            <text x="344" y="224" fontSize="12" fill={C.secondary}>
              gap risk
            </text>
            <text
              x="470"
              y="224"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.danger}
            >
              {result.gapRisk}%
            </text>
            <text
              x="260"
              y="316"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              atom influence ≈ {result.atomInfluence.toFixed(1)} · cell size{" "}
              {cellSize}
            </text>
            <text
              x="260"
              y="340"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              调小 cell size 会减少冗余邻居，但增加 CPU 入桶与索引压力
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            fluid atoms：{atoms}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="8"
              value={atoms}
              onChange={(event) => setAtoms(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            surface particles：{surfaceParticles}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="12"
              max="52"
              value={surfaceParticles}
              onChange={(event) =>
                setSurfaceParticles(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            repulsion radius：{repulsionRadius}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="24"
              max="86"
              value={repulsionRadius}
              onChange={(event) =>
                setRepulsionRadius(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            hash cell size：{cellSize}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="20"
              max="64"
              value={cellSize}
              onChange={(event) => setCellSize(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            distribution mode
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={distribution}
              onChange={(event) =>
                setDistribution(event.target.value as DistributionMode)
              }
            >
              <option value="raw">raw drift</option>
              <option value="repulsion">local repulsion</option>
              <option value="repulsion-dispersion">
                repulsion + dispersion
              </option>
            </select>
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {distribution === "raw"
              ? "没有排斥与搬运，粒子会聚团并留下空洞。"
              : distribution === "repulsion"
                ? "局部排斥能摊平邻域，但 disconnected surface 的空洞填得慢。"
                : "两阶段策略同时处理局部重叠与全局空洞，但需要额外的分布 pass。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
            disabled={!dirty}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
