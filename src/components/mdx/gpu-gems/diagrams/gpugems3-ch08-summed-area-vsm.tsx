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
  width = 150,
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
        height="82"
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
        y={y + 60}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

function DepthBars({ color = C.accent }: { color?: string }) {
  const heights = [36, 42, 54, 66, 82, 96, 72, 58, 48];
  return (
    <g>
      {heights.map((height, index) => (
        <rect
          key={index}
          x={34 + index * 19}
          y={178 - height}
          width="12"
          height={height}
          rx="3"
          fill={color}
          fillOpacity={0.18 + index * 0.04}
          stroke={color}
        />
      ))}
    </g>
  );
}

export function GpuGems3Ch08ShadowFilterComparisonDiagram() {
  return (
    <Figure>
      <Frame label="shadow filtering 三路对比：PCF 逐样本比较、VSM 过滤 moments、SAVSM 用 summed-area table 查询任意矩形">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先决定“过滤什么”：比较结果、深度分布，还是区域和
        </text>
        <g transform="translate(24 76)">
          <rect
            width="224"
            height="292"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="112"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            PCF
          </text>
          <text
            x="112"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每个 texel 先比较，再平均
          </text>
          <g transform="translate(35 82)">
            {Array.from({ length: 12 }, (_, index) => (
              <g key={index}>
                <rect
                  x={(index % 4) * 38}
                  y={Math.floor(index / 4) * 30}
                  width="27"
                  height="20"
                  rx="3"
                  fill={index % 3 === 0 ? C.danger : C.success}
                  fillOpacity="0.18"
                  stroke={index % 3 === 0 ? C.danger : C.success}
                />
                <text
                  x={(index % 4) * 38 + 13.5}
                  y={Math.floor(index / 4) * 30 + 15}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.text}
                >
                  {index % 3 === 0 ? "0" : "1"}
                </text>
              </g>
            ))}
          </g>
          <text
            x="112"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            soft edge = more samples
          </text>
          <text
            x="112"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            准确，但 filter width 变贵
          </text>
          <text
            x="112"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            mipmap 不能跳过比较
          </text>
        </g>
        <g transform="translate(268 76)">
          <rect
            width="224"
            height="292"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="112"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            VSM
          </text>
          <text
            x="112"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            过滤 depth 与 depth²
          </text>
          <DepthBars color={C.accent} />
          <line x1="34" y1="184" x2="198" y2="184" stroke={C.border} />
          <text
            x="112"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            linear filtering / mipmap
          </text>
          <text
            x="112"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            一次 lookup 得 moments
          </text>
          <text
            x="112"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            需处理 light bleeding
          </text>
        </g>
        <g transform="translate(512 76)">
          <rect
            width="224"
            height="292"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="112"
            y="34"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            SAVSM
          </text>
          <text
            x="112"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            SAT 查询任意矩形区域
          </text>
          <rect
            x="36"
            y="84"
            width="152"
            height="98"
            rx="6"
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x="72"
            y="108"
            width="74"
            height="48"
            rx="4"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="2"
          />
          <circle cx="72" cy="108" r="5" fill={C.success} />
          <circle cx="146" cy="108" r="5" fill={C.success} />
          <circle cx="72" cy="156" r="5" fill={C.success} />
          <circle cx="146" cy="156" r="5" fill={C.success} />
          <text
            x="112"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            四角加减
          </text>
          <text
            x="112"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            filter width 不变查询成本
          </text>
          <text
            x="112"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            生成 SAT 有 setup 成本
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08VsmMomentsDiagram() {
  return (
    <Figure>
      <Frame label="variance shadow map 的 moments：每个 texel 保存 linear depth 与 depth squared，区域过滤后恢复均值和方差">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          VSM 把“不好过滤的比较”改成“可以过滤的分布”
        </text>
        <g transform="translate(32 86)">
          <rect
            width="214"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="107"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            shadow texel
          </text>
          <DepthBars color={C.warning} />
          <line x1="34" y1="184" x2="180" y2="184" stroke={C.border} />
          <text
            x="107"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            linear depth z
          </text>
          <text
            x="107"
            y="240"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            z² 同时写入
          </text>
        </g>
        <Arrow x1={270} y1={212} x2={318} y2={212} />
        <g transform="translate(318 86)">
          <rect
            width="190"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="95"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            linear filter
          </text>
          <rect
            x="30"
            y="74"
            width="130"
            height="74"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <text
            x="95"
            y="106"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            M₁ = E[z]
          </text>
          <text
            x="95"
            y="132"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            M₂ = E[z²]
          </text>
          <text
            x="95"
            y="190"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            mipmap / blur / SAT
          </text>
          <text
            x="95"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            都能对 moments 做
          </text>
        </g>
        <Arrow x1={532} y1={212} x2={580} y2={212} />
        <g transform="translate(580 86)">
          <rect
            width="148"
            height="250"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="74"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            分布摘要
          </text>
          <text
            x="74"
            y="88"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.success}
          >
            μ = M₁
          </text>
          <text
            x="74"
            y="122"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.success}
          >
            σ² = M₂ − μ²
          </text>
          <text
            x="74"
            y="178"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            给 Chebyshev
          </text>
          <text
            x="74"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            一个可计算的上界
          </text>
        </g>
        <text
          x="380"
          y="380"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          线性过滤保留的是区域统计量，不是某一个真实遮挡深度；这是 VSM
          的近似边界
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08ChebyshevDiagram() {
  return (
    <Figure>
      <Frame label="Chebyshev 上界示意：比较 receiver depth t 与 moment mean μ，使用 variance σ² 计算 p max 作为遮挡概率上界">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从两个 moment 得到一个可用的遮挡上界
        </text>
        <g transform="translate(40 86)">
          <rect
            width="280"
            height="246"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="140"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            depth distribution
          </text>
          <line
            x1="36"
            y1="174"
            x2="244"
            y2="174"
            stroke={C.border}
            strokeWidth="2"
          />
          <path
            d="M 44 174 C 72 174 78 92 126 92 C 174 92 182 174 232 174"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <line
            x1="126"
            y1="84"
            x2="126"
            y2="190"
            stroke={C.warning}
            strokeDasharray="7 5"
            strokeWidth="2"
          />
          <line
            x1="190"
            y1="74"
            x2="190"
            y2="190"
            stroke={C.danger}
            strokeWidth="3"
          />
          <text
            x="126"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            μ
          </text>
          <text
            x="190"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            t
          </text>
        </g>
        <Arrow x1={354} y1={208} x2={406} y2={208} />
        <g transform="translate(406 86)">
          <rect
            width="316"
            height="246"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="158"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            one-tailed Chebyshev
          </text>
          <text
            x="158"
            y="86"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={C.text}
          >
            pₘₐₓ = σ² / (σ² + (t − μ)²)
          </text>
          <text
            x="158"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            t ≤ μ → fully lit branch
          </text>
          <text
            x="158"
            y="160"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            t &gt; μ → use variance to bound occlusion
          </text>
          <rect
            x="42"
            y="184"
            width="232"
            height="28"
            rx="7"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text
            x="158"
            y="203"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.success}
          >
            small variance + far receiver → darker
          </text>
        </g>
        <text
          x="380"
          y="380"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          pₘₐₓ 是上界，不是任意多遮挡物分布的精确可见率；这正是 light bleeding
          的来源
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08SatRectangleDiagram() {
  return (
    <Figure>
      <Frame label="summed-area table 矩形查询：用右下、左下、右上、左上四个前缀和做 A 减 B 减 C 加 D">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          SAT 的核心：任意矩形都只查四个角
        </text>
        <g transform="translate(46 82)">
          <rect
            width="328"
            height="270"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="164"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            prefix sum grid
          </text>
          <g transform="translate(58 65)" stroke={C.border}>
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 5 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 43}
                  y={row * 35}
                  width="43"
                  height="35"
                  fill={
                    row >= 1 && row <= 3 && col >= 1 && col <= 3
                      ? C.success
                      : C.bg
                  }
                  fillOpacity={
                    row >= 1 && row <= 3 && col >= 1 && col <= 3 ? 0.14 : 1
                  }
                />
              )),
            )}
          </g>
          {[
            { x: 101, y: 100, label: "D" },
            { x: 230, y: 100, label: "B" },
            { x: 101, y: 205, label: "C" },
            { x: 230, y: 205, label: "A" },
          ].map((corner) => (
            <g key={corner.label}>
              <circle cx={corner.x} cy={corner.y} r="13" fill={C.success} />
              <text
                x={corner.x}
                y={corner.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={C.bg}
              >
                {corner.label}
              </text>
            </g>
          ))}
          <text
            x="164"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            高亮区域的 moments sum
          </text>
        </g>
        <g transform="translate(430 102)">
          <rect
            width="286"
            height="200"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="143"
            y="38"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            inclusion–exclusion
          </text>
          <text
            x="143"
            y="86"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill={C.text}
          >
            sum = A − B − C + D
          </text>
          <text
            x="143"
            y="130"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            平均值 = sum / rectangle area
          </text>
          <text
            x="143"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            四角采样 + 双线性插值
          </text>
        </g>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          SAT 给每像素动态选择 filter width；它不承诺任意形状区域都只需四次查询
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08SatBuildDiagram() {
  return (
    <Figure>
      <Frame label="GPU 构建 summed-area table 的两种路径：line-by-line 逐行累积需要 width 加 height 次 pass，recursive doubling 用并行倍增减少依赖">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          生成 SAT：串行依赖换成 GPU 可并行的前缀和
        </text>
        <g transform="translate(32 82)">
          <rect
            width="326"
            height="266"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="163"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            line-by-line
          </text>
          <text
            x="163"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每条线把当前值加到前一个 sum
          </text>
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <rect
                x="48"
                y={86 + row * 34}
                width="210"
                height="22"
                rx="5"
                fill={row === 2 ? C.warning : C.bg}
                fillOpacity={row === 2 ? 0.2 : 1}
                stroke={C.warning}
              />
              <Arrow
                x1={74 + row * 34}
                y1={97 + row * 34}
                x2={112 + row * 34}
                y2={97 + row * 34}
                color={C.warning}
              />
            </g>
          ))}
          <text
            x="163"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            约 width + height 次 pass
          </text>
        </g>
        <g transform="translate(402 82)">
          <rect
            width="326"
            height="266"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="163"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            recursive doubling
          </text>
          <text
            x="163"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            距离 1、2、4… 的值并行合并
          </text>
          {[1, 2, 4].map((distance, row) => (
            <g key={distance}>
              <rect
                x="48"
                y={86 + row * 48}
                width="210"
                height="26"
                rx="5"
                fill={row === 2 ? C.success : C.bg}
                fillOpacity={row === 2 ? 0.2 : 1}
                stroke={C.success}
              />
              <text
                x="153"
                y={104 + row * 48}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                stride {distance} → partial prefix
              </text>
            </g>
          ))}
          <text
            x="163"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            更少依赖，复杂度由实现决定
          </text>
        </g>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          SAVSM 的运行时优势来自查询；SAT 的生成仍是 setup
          成本，不能从性能账本中删掉
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08LightBleedingDiagram() {
  return (
    <Figure>
      <Frame label="VSM light bleeding 与 reduction：遮挡物和接收面在同一 filter region 的深度分布导致 p max 过亮，用阈值把低强度尾部映射为零">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          light bleeding：上界把“不该亮”的区域也放亮了
        </text>
        <g transform="translate(28 84)">
          <rect
            width="318"
            height="258"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="159"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            raw pₘₐₓ
          </text>
          <rect
            x="48"
            y="70"
            width="220"
            height="48"
            rx="7"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
          />
          <text x="158" y="100" textAnchor="middle" fontSize="12" fill={C.text}>
            first receiver · soft penumbra
          </text>
          <rect
            x="48"
            y="145"
            width="220"
            height="48"
            rx="7"
            fill={C.danger}
            fillOpacity="0.16"
            stroke={C.danger}
          />
          <text x="158" y="175" textAnchor="middle" fontSize="12" fill={C.text}>
            second receiver · should be dark
          </text>
          <path
            d="M 94 220 C 116 205 140 234 164 215 S 218 230 240 214"
            fill="none"
            stroke={C.danger}
            strokeWidth="4"
          />
          <text
            x="159"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            tail leaks light
          </text>
        </g>
        <Arrow x1={380} y1={210} x2={432} y2={210} />
        <g transform="translate(432 84)">
          <rect
            width="300"
            height="258"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="150"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            linstep reduction
          </text>
          <line
            x1="50"
            y1="178"
            x2="250"
            y2="178"
            stroke={C.border}
            strokeWidth="2"
          />
          <line
            x1="50"
            y1="178"
            x2="50"
            y2="76"
            stroke={C.border}
            strokeWidth="2"
          />
          <path
            d="M 50 178 L 116 178 L 238 82"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <line
            x1="116"
            y1="178"
            x2="116"
            y2="108"
            stroke={C.warning}
            strokeDasharray="6 5"
            strokeWidth="2"
          />
          <text
            x="116"
            y="202"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            Amount
          </text>
          <text
            x="150"
            y="236"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            保留细节的前提下砍掉低强度尾部
          </text>
        </g>
        <text
          x="380"
          y="388"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          Amount 太高会让 penumbra
          变暗、细节丢失；它是艺术与误差之间的旋钮，不是免费真值
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch08ShadowPipelineDiagram() {
  return (
    <Figure>
      <Frame label="SAVSM 实时管线：从光源视角写入 linear depth moments，生成过滤资源，按像素查询矩形并用 Chebyshev 与 light bleeding reduction 得到阴影贡献">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          SAVSM 的一条可审计管线
        </text>
        <Box
          accent={C.accent}
          detail="linear depth"
          label="light pass"
          x={24}
          y={112}
        />
        <Arrow x1={180} y1={153} x2={224} y2={153} />
        <Box
          accent={C.warning}
          detail="z, z² → moments"
          label="VSM"
          x={226}
          y={112}
        />
        <Arrow x1={382} y1={153} x2={426} y2={153} />
        <Box
          accent={C.success}
          detail="mipmap / SAT"
          label="filter resource"
          x={428}
          y={112}
        />
        <Arrow x1={584} y1={153} x2={628} y2={153} />
        <Box
          accent={C.accent}
          detail="四角 / one lookup"
          label="rect query"
          x={630}
          y={112}
          width={112}
        />
        <Arrow x1={686} y1={198} x2={686} y2={256} color={C.danger} />
        <Box
          accent={C.danger}
          detail="pₘₐₓ → light"
          label="shadow contribution"
          x={526}
          y={256}
          width={216}
        />
        <Arrow x1={514} y1={297} x2={470} y2={297} color={C.danger} />
        <Box
          accent={C.warning}
          detail="clamp tail"
          label="bleeding reduction"
          x={248}
          y={256}
          width={216}
        />
        <text
          x="380"
          y="380"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          渲染时只做区域统计的恢复；质量边界由 moments、variance clamp 和
          reduction 一起决定
        </text>
      </Frame>
    </Figure>
  );
}

type ShadowMethod = "pcf" | "vsm" | "savsm";

export function GpuGems3Ch08ShadowLab() {
  const [method, setMethod] = useState<ShadowMethod>("savsm");
  const [filterWidth, setFilterWidth] = useState(18);
  const [variance, setVariance] = useState(28);
  const [bleedAmount, setBleedAmount] = useState(24);
  const [resolution, setResolution] = useState(512);

  const result = useMemo(() => {
    const softness =
      method === "pcf"
        ? Math.round(filterWidth * 0.7)
        : method === "vsm"
          ? Math.round(filterWidth * 1.05)
          : Math.round(filterWidth * 1.22);
    const aliasBand = Math.max(
      3,
      Math.round(32 - resolution / 48 - filterWidth * 0.42),
    );
    const bleed = Math.max(
      0,
      Math.round(
        variance * 0.62 - bleedAmount * 0.48 + (method === "pcf" ? -8 : 0),
      ),
    );
    const reads =
      method === "pcf"
        ? Math.round(filterWidth * filterWidth * 0.8)
        : method === "vsm"
          ? 2
          : 4;
    const setup =
      method === "savsm"
        ? Math.round(resolution / 64 + 8)
        : method === "vsm"
          ? 3
          : 1;
    return { aliasBand, bleed, reads, setup, softness };
  }, [bleedAmount, filterWidth, method, resolution, variance]);

  const shadowBands = Array.from({ length: 10 }, (_, index) => {
    const band = index - 4.5;
    const width = Math.max(3, result.softness / 4);
    const x = Number((206 + band * width).toFixed(2));
    const opacity = Math.max(
      0.08,
      Math.min(0.72, 0.72 - Math.abs(band) * 0.12),
    );
    return { opacity, x };
  });

  function reset() {
    setMethod("savsm");
    setFilterWidth(18);
    setVariance(28);
    setBleedAmount(24);
    setResolution(512);
  }

  const dirty =
    method !== "savsm" ||
    filterWidth !== 18 ||
    variance !== 28 ||
    bleedAmount !== 24 ||
    resolution !== 512;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 8 SAVSM 实验：比较 PCF、VSM 与 SAVSM，调整滤波宽度、variance、light bleeding reduction 与 shadow resolution"
      data-visual-kind="gpu-gems3-ch08-summed-area-vsm"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Shadow filtering Lab
        </p>
        <p className="mt-1 text-sm text-secondary">
          比较三种方法的阴影边缘、采样次数、setup 成本和 light
          bleeding；数值是教学趋势，不替代真实 GPU profile。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="PCF、VSM、SAVSM 阴影过滤效果与工作量趋势预览"
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
              {method.toUpperCase()} · filter width {filterWidth} · resolution{" "}
              {resolution}
            </text>
            <rect
              x="34"
              y="58"
              width="310"
              height="154"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <rect
              x="52"
              y="84"
              width="274"
              height="92"
              rx="10"
              fill={C.warning}
              fillOpacity="0.08"
            />
            <rect x="52" y="84" width="128" height="92" rx="10" fill={C.bg} />
            {shadowBands.map((band, index) => (
              <rect
                key={index}
                x={band.x}
                y="84"
                width={Math.max(3, result.softness / 2)}
                height="92"
                fill={index < 5 ? C.bg : C.warning}
                fillOpacity={band.opacity}
              />
            ))}
            <rect
              x="180"
              y="84"
              width="7"
              height="92"
              fill={C.danger}
              fillOpacity="0.7"
            />
            <rect
              x="187"
              y="84"
              width="18"
              height="92"
              fill={C.warning}
              fillOpacity="0.42"
            />
            <rect
              x="205"
              y="84"
              width="121"
              height="92"
              rx="10"
              fill={C.warning}
              fillOpacity="0.08"
            />
            <text
              x="190"
              y="238"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              caster edge → penumbra → lit receiver
            </text>
            <text
              x="190"
              y="264"
              textAnchor="middle"
              fontSize="12"
              fill={C.warning}
            >
              edge band ≈ {result.aliasBand}
            </text>
            <rect
              x="362"
              y="58"
              width="126"
              height="218"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="425"
              y="86"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              读数
            </text>
            <text x="378" y="120" fontSize="12" fill={C.secondary}>
              texture reads
            </text>
            <text
              x="474"
              y="120"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              {result.reads}
            </text>
            <text x="378" y="154" fontSize="12" fill={C.secondary}>
              SAT setup
            </text>
            <text
              x="474"
              y="154"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.setup}
            </text>
            <text x="378" y="188" fontSize="12" fill={C.secondary}>
              bleed tail
            </text>
            <text
              x="474"
              y="188"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={result.bleed > 20 ? C.danger : C.success}
            >
              {result.bleed}%
            </text>
            <text x="378" y="222" fontSize="12" fill={C.secondary}>
              softness
            </text>
            <text
              x="474"
              y="222"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.warning}
            >
              {result.softness}
            </text>
            <text
              x="260"
              y="324"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              variance {variance} · bleeding reduction {bleedAmount}
            </text>
            <text
              x="260"
              y="346"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              降低 bleedAmount 会保留更多细节，但可能留下更亮的尾部
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            filtering method
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={method}
              onChange={(event) =>
                setMethod(event.target.value as ShadowMethod)
              }
            >
              <option value="pcf">PCF · per-sample compare</option>
              <option value="vsm">VSM · filtered moments</option>
              <option value="savsm">SAVSM · rectangle query</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            filter width：{filterWidth}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="32"
              value={filterWidth}
              onChange={(event) => setFilterWidth(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            variance：{variance}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="4"
              max="64"
              value={variance}
              onChange={(event) => setVariance(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            bleeding reduction：{bleedAmount}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="80"
              value={bleedAmount}
              onChange={(event) => setBleedAmount(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            shadow resolution：{resolution}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="256"
              max="1024"
              step="256"
              value={resolution}
              onChange={(event) => setResolution(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {method === "pcf"
              ? "PCF 的成本随 filter width 快速增长，因为每个样本都要做深度比较。"
              : method === "vsm"
                ? "VSM 过滤 moments 很便宜，但要用 variance clamp 和 reduction 管理近似误差。"
                : "SAVSM 的矩形查询成本稳定，代价转移到 SAT 生成与数值精度管理。"}
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
