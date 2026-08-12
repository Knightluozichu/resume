"use client";

import { useMemo, useState, type ReactNode } from "react";

type FadeMode = "cubic" | "quintic";
type NoiseMode = "procedural" | "volume";

const COLORS = {
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

const PERMUTATION = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
] as const;

const P = [...PERMUTATION, ...PERMUTATION];

function fade(t: number, mode: FadeMode) {
  return mode === "quintic"
    ? t * t * t * (t * (t * 6 - 15) + 10)
    : t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return (h & 1 ? -u : u) + (h & 2 ? -v : v);
}

function improvedNoise(x: number, y: number, z: number, mode: FadeMode) {
  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  const floorZ = Math.floor(z);
  const xi = floorX & 255;
  const yi = floorY & 255;
  const zi = floorZ & 255;
  const fx = x - floorX;
  const fy = y - floorY;
  const fz = z - floorZ;
  const u = fade(fx, mode);
  const v = fade(fy, mode);
  const w = fade(fz, mode);
  const a = P[xi] + yi;
  const aa = P[a] + zi;
  const ab = P[a + 1] + zi;
  const b = P[xi + 1] + yi;
  const ba = P[b] + zi;
  const bb = P[b + 1] + zi;

  return lerp(
    lerp(
      lerp(grad(P[aa], fx, fy, fz), grad(P[ba], fx - 1, fy, fz), u),
      lerp(grad(P[ab], fx, fy - 1, fz), grad(P[bb], fx - 1, fy - 1, fz), u),
      v,
    ),
    lerp(
      lerp(
        grad(P[aa + 1], fx, fy, fz - 1),
        grad(P[ba + 1], fx - 1, fy, fz - 1),
        u,
      ),
      lerp(
        grad(P[ab + 1], fx, fy - 1, fz - 1),
        grad(P[bb + 1], fx - 1, fy - 1, fz - 1),
        u,
      ),
      v,
    ),
    w,
  );
}

function volumeNoise(x: number, y: number, z: number) {
  const scale = 2;
  const sx = x * scale;
  const sy = y * scale;
  const sz = z * scale;
  const ix = Math.floor(sx);
  const iy = Math.floor(sy);
  const iz = Math.floor(sz);
  const fx = sx - ix;
  const fy = sy - iy;
  const fz = sz - iz;
  const sample = (dx: number, dy: number, dz: number) =>
    improvedNoise(
      (ix + dx) / scale,
      (iy + dy) / scale,
      (iz + dz) / scale,
      "quintic",
    );
  return lerp(
    lerp(
      lerp(sample(0, 0, 0), sample(1, 0, 0), fx),
      lerp(sample(0, 1, 0), sample(1, 1, 0), fx),
      fy,
    ),
    lerp(
      lerp(sample(0, 0, 1), sample(1, 0, 1), fx),
      lerp(sample(0, 1, 1), sample(1, 1, 1), fx),
      fy,
    ),
    fz,
  );
}

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
      viewBox="0 0 720 400"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="400" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = COLORS.accent,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1 = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const p2 = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

function Panel({
  height,
  stroke = COLORS.border,
  title,
  width,
  x,
  y,
}: {
  height: number;
  stroke?: string;
  title: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="15"
        fill={COLORS.surface}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 31}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={stroke === COLORS.border ? COLORS.text : stroke}
      >
        {title}
      </text>
    </>
  );
}

function curvePoints(mode: FadeMode) {
  return Array.from({ length: 41 }, (_, index) => {
    const t = index / 40;
    const x = 64 + t * 360;
    const y = 304 - fade(t, mode) * 190;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export function GpuGems2Ch26NoisePropertiesDiagram() {
  return (
    <Figure>
      <Frame label="改进 Perlin 噪声目标图：相同坐标得到可重复伪随机值，输出范围有界、空间变化平滑且平移后频率稳定；程序计算比小型三维纹理拥有更长周期与更高插值质量">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          noise 不是逐像素掷骰：随机感必须受空间结构约束
        </text>
        <Panel
          x={28}
          y={72}
          width={316}
          height={246}
          title="small 3D volume texture"
          stroke={COLORS.warning}
        />
        {Array.from({ length: 30 }, (_, index) => {
          const col = index % 6;
          const row = Math.floor(index / 6);
          return (
            <rect
              key={`volume-${index}`}
              x={62 + col * 42}
              y={126 + row * 32}
              width="36"
              height="26"
              rx="4"
              fill={index % 4 < 2 ? COLORS.warning : COLORS.border}
              fillOpacity={0.18 + (index % 5) * 0.1}
            />
          );
        })}
        <text
          x="186"
          y="299"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          linear filtering · short repeat period
        </text>
        <Arrow x1={360} y1={194} x2={394} y2={194} />
        <Panel
          x={406}
          y={72}
          width={286}
          height={246}
          title="procedural improved noise"
          stroke={COLORS.success}
        />
        <path
          d="M438 252 C468 140 501 248 532 156 C566 66 603 267 658 126"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="5"
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <circle
            key={`property-${index}`}
            cx={462 + index * 46}
            cy={277}
            r="7"
            fill={index % 2 ? COLORS.success : COLORS.accent}
          />
        ))}
        <text
          x="549"
          y="299"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          deterministic · bounded · smooth
        </text>
        <text
          x="360"
          y="366"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          程序路径用更多 arithmetic 换更少 texture memory、精确 CPU parity
          与可扩展 4D 输入
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch26HashPipelineDiagram() {
  return (
    <Figure>
      <Frame label="三维 Perlin hash 流程：整数晶格坐标依次经过 256 项 permutation texture 的 x、y、z 索引，得到可重复 hash，再查询 16 项梯度纹理并与局部位移点积">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          integer lattice → permutation hash → gradient dot product
        </text>
        <Panel x={24} y={86} width={132} height={196} title="cell coordinate" />
        <text
          x="90"
          y="145"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          P = floor(p)
        </text>
        <text
          x="90"
          y="185"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Px mod 256
        </text>
        <text
          x="90"
          y="219"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          then + Py
        </text>
        <text
          x="90"
          y="253"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          then + Pz
        </text>
        <Arrow x1={168} y1={184} x2={200} y2={184} />
        <Panel
          x={212}
          y={86}
          width={174}
          height={196}
          title="perm texture · 256"
          stroke={COLORS.accent}
        />
        {Array.from({ length: 16 }, (_, index) => (
          <rect
            key={`perm-${index}`}
            x={236 + (index % 8) * 16}
            y={139 + Math.floor(index / 8) * 32}
            width="13"
            height="24"
            rx="3"
            fill={COLORS.accent}
            fillOpacity={0.16 + ((index * 3) % 7) * 0.1}
          />
        ))}
        <text
          x="299"
          y="226"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          point sample · wrap
        </text>
        <text
          x="299"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          same table as CPU
        </text>
        <Arrow x1={398} y1={184} x2={430} y2={184} color={COLORS.success} />
        <Panel
          x={442}
          y={86}
          width={126}
          height={196}
          title="hash"
          stroke={COLORS.success}
        />
        <text
          x="505"
          y="160"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill={COLORS.success}
        >
          0…255
        </text>
        <text
          x="505"
          y="207"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          repeatable
        </text>
        <text
          x="505"
          y="240"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          not random state
        </text>
        <Arrow x1={580} y1={184} x2={612} y2={184} />
        <rect
          x="624"
          y="105"
          width="68"
          height="158"
          rx="13"
          fill={COLORS.surface}
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <text
          x="658"
          y="139"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          gradient
        </text>
        <text
          x="658"
          y="174"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          16-entry
        </text>
        <text
          x="658"
          y="207"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          texture
        </text>
        <text
          x="658"
          y="240"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.text}
        >
          g · Δp
        </text>
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          permutation 与 gradient 都必须 point
          sample；线性过滤会把离散索引语义破坏掉
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch26FadeDiagram() {
  return (
    <Figure>
      <Frame label="三次与五次 fade 曲线比较：两者端点一阶导数为零，五次曲线的端点二阶导数也为零，使三维 noise 达到二阶连续并减少法线和 bump 光照中的晶格接缝">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          quintic fade：改善的是晶格边界的导数连续性
        </text>
        <line
          x1="64"
          y1="304"
          x2="424"
          y2="304"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="64"
          y1="92"
          x2="64"
          y2="304"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <polyline
          points={curvePoints("cubic")}
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <polyline
          points={curvePoints("quintic")}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <text x="74" y="329" fontSize="12" fill={COLORS.secondary}>
          t = 0
        </text>
        <text x="390" y="329" fontSize="12" fill={COLORS.secondary}>
          t = 1
        </text>
        <text
          x="94"
          y="119"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          cubic 3t²−2t³
        </text>
        <text
          x="94"
          y="145"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.accent}
        >
          quintic 6t⁵−15t⁴+10t³
        </text>
        <Panel
          x={460}
          y={76}
          width={232}
          height={254}
          title="endpoint contract"
          stroke={COLORS.success}
        />
        <text
          x="576"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.text}
        >
          f(0)=0 · f(1)=1
        </text>
        <text
          x="576"
          y="183"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.text}
        >
          f′(0)=f′(1)=0
        </text>
        <line
          x1="492"
          y1="210"
          x2="660"
          y2="210"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="576"
          y="247"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          quintic only
        </text>
        <text
          x="576"
          y="280"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.text}
        >
          f″(0)=f″(1)=0
        </text>
        <text
          x="360"
          y="371"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          C² 连续让 noise 的二阶变化跨 cell 平滑，尤其影响 derivative-based
          shading
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch26CubeBlendDiagram() {
  const corners = [
    [188, 122],
    [342, 151],
    [188, 274],
    [342, 303],
    [264, 78],
    [418, 107],
    [264, 230],
    [418, 259],
  ] as const;
  return (
    <Figure>
      <Frame label="三维 improved noise 单元求值图：查询点周围八个晶格角分别通过 hash 选择梯度，梯度与角点到查询点的位移做点积，再按 quintic fade 权重沿 x、y、z 三轴混合">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          八个 corner contribution，三层 lerp 得到一个 noise value
        </text>
        <path
          d="M188 122 L342 151 L342 303 L188 274 Z M264 78 L418 107 L418 259 L264 230 Z M188 122 L264 78 M342 151 L418 107 M342 303 L418 259 M188 274 L264 230"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {corners.map(([x, y], index) => (
          <g key={`corner-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="9"
              fill={index % 2 ? COLORS.accent : COLORS.success}
              stroke={COLORS.bg}
              strokeWidth="3"
            />
            <line
              x1={x}
              y1={y}
              x2={x + ((index % 3) - 1) * 18}
              y2={y - 18}
              stroke={COLORS.warning}
              strokeWidth="3"
            />
            <text x={x + 12} y={y - 9} fontSize="11" fill={COLORS.secondary}>
              g{index}
            </text>
          </g>
        ))}
        <circle
          cx="302"
          cy="189"
          r="12"
          fill={COLORS.danger}
          stroke={COLORS.bg}
          strokeWidth="4"
        />
        {corners.map(([x, y], index) => (
          <line
            key={`delta-${index}`}
            x1="302"
            y1="189"
            x2={x}
            y2={y}
            stroke={COLORS.danger}
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        ))}
        <Panel
          x={476}
          y={78}
          width={216}
          height={240}
          title="blend order"
          stroke={COLORS.accent}
        />
        {[
          { label: "8 × dot(g, Δp)", y: 135, color: COLORS.warning },
          { label: "4 × lerp · fade.x", y: 181, color: COLORS.accent },
          { label: "2 × lerp · fade.y", y: 227, color: COLORS.accent },
          { label: "1 × lerp · fade.z", y: 273, color: COLORS.success },
        ].map((step, index) => (
          <g key={step.label}>
            <rect
              x="506"
              y={step.y - 23}
              width="156"
              height="35"
              rx="8"
              fill={COLORS.bg}
              stroke={step.color}
              strokeWidth="2"
            />
            <text
              x="584"
              y={step.y}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={step.color}
            >
              {step.label}
            </text>
            {index < 3 ? (
              <Arrow
                x1={584}
                y1={step.y + 14}
                x2={584}
                y2={step.y + 31}
                color={COLORS.border}
              />
            ) : null}
          </g>
        ))}
        <text
          x="360"
          y="370"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          hash 只选择梯度；连续变化来自局部位移点积与 fade-weighted
          interpolation
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch26OptimizationDiagram() {
  return (
    <Figure>
      <Frame label="GPU improved noise 查表优化图：直接移植使用递归 permutation 与最终 gradient 查询，共 81 条指令和 22 次 texture lookup；预计算 256 乘 256 RGBA hash texture 并展开为 256 项 permuted gradient 后降至 53 条和 9 次读取">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          把重复 hash 组合离线打包，减少 dependent texture reads
        </text>
        <Panel
          x={28}
          y={72}
          width={294}
          height={250}
          title="straight CPU port"
          stroke={COLORS.warning}
        />
        {[
          "6 recursive perm reads",
          "8 final gradient reads",
          "other table accesses",
        ].map((label, index) => (
          <g key={label}>
            <rect
              x="62"
              y={126 + index * 50}
              width="226"
              height="34"
              rx="8"
              fill={COLORS.bg}
              stroke={COLORS.warning}
              strokeWidth="2"
            />
            <text
              x="175"
              y={148 + index * 50}
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.text}
            >
              {label}
            </text>
          </g>
        ))}
        <text
          x="175"
          y="295"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.danger}
        >
          81 instructions · 22 TEX
        </text>
        <Arrow x1={338} y1={197} x2={382} y2={197} color={COLORS.success} />
        <Panel
          x={398}
          y={72}
          width={294}
          height={250}
          title="packed GPU lookup"
          stroke={COLORS.success}
        />
        <rect
          x="432"
          y="126"
          width="226"
          height="54"
          rx="9"
          fill={COLORS.bg}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="545"
          y="148"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.accent}
        >
          256×256 RGBA perm texture
        </text>
        <text
          x="545"
          y="168"
          textAnchor="middle"
          fontSize="11"
          fill={COLORS.secondary}
        >
          four hashes / one lookup
        </text>
        <rect
          x="432"
          y="201"
          width="226"
          height="54"
          rx="9"
          fill={COLORS.bg}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="545"
          y="223"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.success}
        >
          256-entry permuted gradients
        </text>
        <text
          x="545"
          y="243"
          textAnchor="middle"
          fontSize="11"
          fill={COLORS.secondary}
        >
          remove final perm lookup
        </text>
        <text
          x="545"
          y="295"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          53 instructions · 9 TEX
        </text>
        <text
          x="360"
          y="370"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          优化保持同一 permutation 和 gradients，因此减少读取而不改变 reference
          output
        </text>
      </Frame>
    </Figure>
  );
}

function NoiseSlice({
  fadeMode,
  frequency,
  mode,
  optimized,
  slice,
}: {
  fadeMode: FadeMode;
  frequency: number;
  mode: NoiseMode;
  optimized: boolean;
  slice: number;
}) {
  const cells = useMemo(() => {
    const columns = 18;
    const rows = 12;
    return Array.from({ length: columns * rows }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = (column / (columns - 1)) * frequency;
      const y = (row / (rows - 1)) * frequency * 0.7;
      const value =
        mode === "procedural"
          ? improvedNoise(x, y, slice, fadeMode)
          : volumeNoise(x, y, slice);
      return { column, row, value };
    });
  }, [fadeMode, frequency, mode, slice]);
  const resources = optimized
    ? { instructions: 53, reads: 9 }
    : { instructions: 81, reads: 22 };
  const continuity =
    mode === "volume"
      ? "hardware-linear approximation"
      : fadeMode === "quintic"
        ? "C² improved noise"
        : "C¹ cubic boundary";

  return (
    <svg
      viewBox="0 0 720 440"
      role="img"
      aria-label="Improved Perlin Noise 交互切片：切换程序计算或三维纹理近似、三次或五次 fade、频率、z 切片与 GPU lookup 优化，观察平滑性、周期和资源读取变化"
      className="block h-auto w-full"
    >
      <rect width="720" height="440" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        improved noise slice · {continuity}
      </text>
      <rect
        x="24"
        y="52"
        width="454"
        height="318"
        rx="14"
        fill={COLORS.surface}
        stroke={mode === "procedural" ? COLORS.accent : COLORS.warning}
        strokeWidth="2"
      />
      {cells.map((cell, index) => {
        const normalized = Math.min(1, Math.abs(cell.value));
        return (
          <rect
            key={`noise-cell-${index}`}
            x={44 + cell.column * 22.7}
            y={76 + cell.row * 22.7}
            width="23"
            height="23"
            fill={cell.value >= 0 ? COLORS.accent : COLORS.danger}
            fillOpacity={0.12 + normalized * 0.82}
            stroke={
              mode === "volume" && (cell.column % 4 === 0 || cell.row % 4 === 0)
                ? COLORS.warning
                : "none"
            }
            strokeWidth="1"
          />
        );
      })}
      <text
        x="251"
        y="352"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        positive / negative gradient contributions across a deterministic z
        slice
      </text>
      <rect
        x="500"
        y="52"
        width="196"
        height="318"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="598"
        y="84"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        implementation record
      </text>
      {[
        {
          label: "path",
          value: mode,
          color: mode === "procedural" ? COLORS.success : COLORS.warning,
        },
        {
          label: "fade",
          value: fadeMode,
          color: fadeMode === "quintic" ? COLORS.success : COLORS.warning,
        },
        {
          label: "instructions",
          value: `${resources.instructions}`,
          color: optimized ? COLORS.success : COLORS.warning,
        },
        {
          label: "texture reads",
          value: `${resources.reads}`,
          color: optimized ? COLORS.success : COLORS.warning,
        },
        {
          label: "CPU parity",
          value: mode === "procedural" ? "exact" : "no",
          color: mode === "procedural" ? COLORS.success : COLORS.danger,
        },
      ].map((metric, index) => (
        <g key={metric.label}>
          <text
            x="520"
            y={126 + index * 43}
            fontSize="12"
            fill={COLORS.secondary}
          >
            {metric.label}
          </text>
          <text
            x="676"
            y={126 + index * 43}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={metric.color}
          >
            {metric.value}
          </text>
        </g>
      ))}
      <text
        x="598"
        y="346"
        textAnchor="middle"
        fontSize="12"
        fill={mode === "volume" ? COLORS.danger : COLORS.success}
      >
        {mode === "volume"
          ? "failure mode: coarse linear cells"
          : "same table + math as reference"}
      </text>
      <text
        x="360"
        y="414"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.warning}
      >
        固定 permutation 保证可重复；fade 决定边界连续性；packed textures
        只改变成本，不改数值
      </text>
    </svg>
  );
}

export function GpuGems2Ch26ImprovedNoiseLab() {
  const [mode, setMode] = useState<NoiseMode>("procedural");
  const [fadeMode, setFadeMode] = useState<FadeMode>("quintic");
  const [frequency, setFrequency] = useState(3);
  const [slice, setSlice] = useState(0.65);
  const [optimized, setOptimized] = useState(true);

  function reset() {
    setMode("procedural");
    setFadeMode("quintic");
    setFrequency(3);
    setSlice(0.65);
    setOptimized(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 26 improved Perlin noise 实验"
      data-visual-kind="gpu-gems2-ch26-improved-perlin-noise"
      data-unit-id="gpg-v2-26"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Improved Perlin Noise GPU 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          猜一猜：切到 coarse 3D volume 或 cubic fade 后，纹理读取会更便宜，但
          cell 边界与 CPU parity 会发生什么？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <NoiseSlice
            fadeMode={fadeMode}
            frequency={frequency}
            mode={mode}
            optimized={optimized}
            slice={slice}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={mode === "procedural"}
              onClick={() => setMode("procedural")}
              className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            >
              procedural
            </button>
            <button
              type="button"
              aria-pressed={mode === "volume"}
              onClick={() => setMode("volume")}
              className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            >
              3D volume 故障
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={fadeMode === "quintic"}
              onClick={() => setFadeMode("quintic")}
              className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            >
              quintic
            </button>
            <button
              type="button"
              aria-pressed={fadeMode === "cubic"}
              onClick={() => setFadeMode("cubic")}
              className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            >
              cubic
            </button>
          </div>
          <label className="block text-sm text-secondary">
            frequency：{frequency}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="6"
              step="1"
              value={frequency}
              onChange={(event) => setFrequency(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            z slice：{slice.toFixed(2)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={slice}
              onChange={(event) => setSlice(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            aria-pressed={optimized}
            onClick={() => setOptimized((value) => !value)}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            lookup：{optimized ? "packed 9 TEX" : "direct port 22 TEX"}
          </button>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "volume"
              ? "故障模式使用粗体积与线性重建：更少计算，但短周期、cell 结构和 reference mismatch 会暴露出来。"
              : fadeMode === "cubic"
                ? "程序 hash 仍可重复，但 cubic fade 的二阶导数在 cell 边界不连续。"
                : optimized
                  ? "packed permutation 与 permuted gradients 将读取从 22 降到 9，同时保持 CPU reference 数值。"
                  : "直接移植便于核对算法，但 81 instructions / 22 texture reads 成本更高。"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
