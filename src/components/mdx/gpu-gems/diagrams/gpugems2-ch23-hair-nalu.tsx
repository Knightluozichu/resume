"use client";

import { useMemo, useState, type ReactNode } from "react";

type HairDensity = "control" | "dense";
type LightingMode = "packed" | "full";
type ShadowSlices = 4 | 8 | 16;

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

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
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
      viewBox="0 0 720 390"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = COLORS.accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function GpuGems2Ch23HairPipelineDiagram() {
  return (
    <Figure>
      <Frame label="Nalu 头发数据流：scalp control hairs 经动力学、Bezier 平滑、tessellation 和插值生成密集头发再渲染">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Hair Animation and Rendering：控制结构到最终发丝
        </text>
        <rect
          x="28"
          y="92"
          width="142"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="99"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          scalp layout
        </text>
        <text
          x="99"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          normals → roots
        </text>
        <text
          x="99"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          control hairs
        </text>
        <text
          x="99"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          authoring handles
        </text>
        <Arrow x1={184} y1={185} x2={218} y2={185} />
        <rect
          x="230"
          y="92"
          width="160"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="310"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          dynamics
        </text>
        <text
          x="310"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Verlet particles
        </text>
        <text
          x="310"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          length constraints
        </text>
        <text
          x="310"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          collisions + fixes
        </text>
        <Arrow x1={404} y1={185} x2={438} y2={185} color={COLORS.success} />
        <rect
          x="450"
          y="92"
          width="242"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="571"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          geometry + shading
        </text>
        <text
          x="571"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Bezier / tessellate
        </text>
        <text
          x="571"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          barycentric density
        </text>
        <text
          x="571"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          reflectance + shadows
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          只让少量 control hairs 承担昂贵动力学，再把密度与外观交给并行生成
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch23InterpolationDiagram() {
  return (
    <Figure>
      <Frame label="头发插值图：三角形顶点的三根平滑 control hairs 通过 barycentric coefficients 生成内部发丝">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          barycentric interpolation：从三根 control hairs 填充发量
        </text>
        <path
          d="M76 275 L216 86 L360 275 Z"
          fill={COLORS.accent}
          fillOpacity="0.1"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {[
          { x: 76, y: 275, label: "A", color: COLORS.warning },
          { x: 216, y: 86, label: "B", color: COLORS.success },
          { x: 360, y: 275, label: "C", color: COLORS.accent },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="9" fill={point.color} />
            <text
              x={point.x + 14}
              y={point.y + 5}
              fontSize="13"
              fill={point.color}
            >
              {point.label} control hair
            </text>
          </g>
        ))}
        <path
          d="M76 275 C130 238 155 200 168 145"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <path
          d="M216 86 C207 142 220 205 234 275"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <path
          d="M360 275 C318 235 285 193 270 142"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <circle
          cx="216"
          cy="205"
          r="8"
          fill={COLORS.danger}
          stroke={COLORS.bg}
          strokeWidth="3"
        />
        <text x="231" y="201" fontSize="13" fill={COLORS.danger}>
          Y = A·bA + B·bB + C·bC
        </text>
        <rect
          x="420"
          y="86"
          width="264"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="552"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          density rule
        </text>
        <text x="444" y="158" fontSize="13" fill={COLORS.secondary}>
          bA + bB + bC = 1
        </text>
        <text x="444" y="191" fontSize="13" fill={COLORS.secondary}>
          sample inside triangle
        </text>
        <text x="444" y="224" fontSize="13" fill={COLORS.warning}>
          same vertex count per hair
        </text>
        <text
          x="552"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          interpolation ≠ dynamics
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          插值扩展空间密度，但不能替代控制发丝的碰撞与长度约束
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch23DynamicsDiagram() {
  return (
    <Figure>
      <Frame label="头发动力学图：粒子链用 Verlet 更新，迭代长度约束并通过分层球体处理碰撞">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          dynamics：粒子、约束与碰撞的稳定循环
        </text>
        <rect
          x="30"
          y="82"
          width="420"
          height="206"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path
          d="M76 124 C144 150 185 184 250 206 S352 244 405 255"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const x = [76, 135, 190, 250, 321, 405][index];
          const y = [124, 150, 183, 206, 238, 255][index];
          return (
            <g key={`particle-${index}`}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill={index === 0 ? COLORS.warning : COLORS.accent}
                stroke={COLORS.bg}
                strokeWidth="3"
              />
              <text
                x={x}
                y={y - 18}
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                p{index}
              </text>
            </g>
          );
        })}
        <path
          d="M116 146 L154 164 M211 192 L232 199 M274 218 L306 231"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeDasharray="6 5"
        />
        <circle
          cx="180"
          cy="237"
          r="26"
          fill={COLORS.danger}
          fillOpacity="0.18"
          stroke={COLORS.danger}
          strokeWidth="3"
        />
        <circle
          cx="333"
          cy="150"
          r="24"
          fill={COLORS.danger}
          fillOpacity="0.18"
          stroke={COLORS.danger}
          strokeWidth="3"
        />
        <text
          x="180"
          y="280"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.danger}
        >
          collision sphere
        </text>
        <Arrow x1={476} y1={184} x2={512} y2={184} />
        <rect
          x="524"
          y="82"
          width="166"
          height="206"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="607"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          frame loop
        </text>
        <text x="546" y="155" fontSize="13" fill={COLORS.secondary}>
          Verlet predict
        </text>
        <text x="546" y="187" fontSize="13" fill={COLORS.secondary}>
          length iterations
        </text>
        <text x="546" y="219" fontSize="13" fill={COLORS.secondary}>
          sphere / pearl test
        </text>
        <text
          x="607"
          y="259"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          render only after converge
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          约束要迭代：拉动一个粒子会让相邻 segment 失效，单次修正并不闭合整条链
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch23ShadingDiagram() {
  return (
    <Figure>
      <Frame label="Marschner 头发反射图：切线方向与光线视线生成查表坐标，R、TT、TRT 三条路径合成高光与透射">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Marschner reflectance：把发丝散射拆成可查表的路径
        </text>
        <rect
          x="28"
          y="88"
          width="188"
          height="180"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="122"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          vector setup
        </text>
        <line
          x1="122"
          y1="228"
          x2="122"
          y2="151"
          stroke={COLORS.accent}
          strokeWidth="5"
        />
        <line
          x1="122"
          y1="228"
          x2="184"
          y2="175"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <line
          x1="122"
          y1="228"
          x2="63"
          y2="175"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <text x="130" y="152" fontSize="13" fill={COLORS.accent}>
          tangent
        </text>
        <text x="170" y="169" fontSize="13" fill={COLORS.warning}>
          light
        </text>
        <text x="48" y="169" fontSize="13" fill={COLORS.success}>
          eye
        </text>
        <Arrow x1={232} y1={178} x2={268} y2={178} />
        <rect
          x="280"
          y="88"
          width="190"
          height="180"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="375"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          two 2D lookup maps
        </text>
        <text x="304" y="161" fontSize="13" fill={COLORS.secondary}>
          sin θi, sin θo → M
        </text>
        <text x="304" y="194" fontSize="13" fill={COLORS.secondary}>
          cos φd, cos θd → N
        </text>
        <text
          x="375"
          y="235"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          packed channels + mipmap
        </text>
        <Arrow x1={486} y1={178} x2={522} y2={178} color={COLORS.success} />
        <rect
          x="534"
          y="88"
          width="158"
          height="180"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="613"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          paths sum
        </text>
        <text
          x="613"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          S = SR + STT + STRT
        </text>
        <text
          x="613"
          y="199"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          highlight + transmission
        </text>
        <text
          x="613"
          y="235"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          hair color / IOR
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          先用切线投影避免 inverse trig，再让 2D texture 承担昂贵角度函数
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch23OpacityShadowMapDiagram() {
  return (
    <Figure>
      <Frame label="opacity shadow map 图：沿 light space 深度累积 hair density，分层采样后插值并指数转换为 transmittance">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          opacity shadow map：从二值遮挡到可积累透射率
        </text>
        <rect
          x="30"
          y="82"
          width="202"
          height="208"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="131"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          light-space slices
        </text>
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={`slice-${index}`}>
            <rect
              x="69"
              y={140 + index * 25}
              width="124"
              height="16"
              rx="5"
              fill={index === 2 ? COLORS.warning : COLORS.accent}
              fillOpacity={round(0.18 + index * 0.1)}
            />
            <text
              x="56"
              y={153 + index * 25}
              textAnchor="end"
              fontSize="12"
              fill={COLORS.secondary}
            >
              z{index}
            </text>
          </g>
        ))}
        <text
          x="131"
          y="281"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          additive density / opacity
        </text>
        <Arrow x1={252} y1={184} x2={288} y2={184} />
        <rect
          x="300"
          y="82"
          width="176"
          height="208"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="388"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          lookup + interpolate
        </text>
        <text x="324" y="158" fontSize="13" fill={COLORS.secondary}>
          nearest z slices
        </text>
        <text x="324" y="191" fontSize="13" fill={COLORS.secondary}>
          linear weights
        </text>
        <text x="324" y="224" fontSize="13" fill={COLORS.warning}>
          density σ
        </text>
        <text
          x="388"
          y="267"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          pack 4 channels / MRT
        </text>
        <Arrow x1={496} y1={184} x2={532} y2={184} color={COLORS.success} />
        <rect
          x="544"
          y="82"
          width="148"
          height="208"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="618"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          transmittance
        </text>
        <text
          x="618"
          y="166"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={COLORS.text}
        >
          T = exp(-kσ)
        </text>
        <rect
          x="574"
          y="191"
          width="88"
          height="35"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.3"
        />
        <text
          x="618"
          y="214"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          light reaches hair
        </text>
        <text
          x="618"
          y="264"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          soft volumetric shadow
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          阴影保存的是沿光线的 opacity thickness，不是一个硬的 depth hit
        </text>
      </Frame>
    </Figure>
  );
}

function HairScene({
  density,
  iterations,
  lighting,
  slices,
}: {
  density: HairDensity;
  iterations: number;
  lighting: LightingMode;
  slices: ShadowSlices;
}) {
  const strandCount = density === "dense" ? 12 : 6;
  const paths = useMemo(() => {
    return Array.from({ length: strandCount }, (_, strand) => {
      const rootX =
        72 +
        (strand % 6) * 45 +
        (density === "dense" ? Math.floor(strand / 6) * 12 : 0);
      const rootY = 256 - (strand % 3) * 5;
      return Array.from({ length: 7 }, (_, point) => {
        const t = point / 6;
        const drift =
          Math.sin(strand * 0.65 + point * 0.48) * (9 + iterations * 0.7) * t;
        const lift =
          point * (24 + iterations * 0.55) + Math.cos(strand * 0.4) * point;
        return `${point === 0 ? "M" : "L"}${round(rootX + drift)} ${round(rootY - lift)}`;
      }).join(" ");
    });
  }, [density, iterations, strandCount]);
  const densityLabel =
    density === "dense" ? "dense interpolation" : "control hairs";
  const textureCount = lighting === "packed" ? 2 : 3;
  const transmittance = round(
    Math.exp(-0.055 * slices * (density === "dense" ? 1.2 : 0.9)),
  );

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="Nalu 头发交互实验：调整头发密度、约束迭代、阴影层数和反射查表打包"
      className="block h-auto w-full"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        Nalu hair lab：{densityLabel} / {slices} shadow slices
      </text>
      <rect
        x="28"
        y="54"
        width="362"
        height="264"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M48 276 C126 249 251 249 370 276"
        fill="none"
        stroke={COLORS.warning}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {paths.map((path, index) => (
        <path
          key={`hair-strand-${index}`}
          d={path}
          fill="none"
          stroke={index % 3 === 0 ? COLORS.accent : COLORS.success}
          strokeWidth={density === "dense" ? "2" : "3"}
          strokeOpacity={round(0.72 + (index % 4) * 0.05)}
        />
      ))}
      <text
        x="209"
        y="303"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        scalp roots → Bezier strands · iterations {iterations}
      </text>
      <rect
        x="420"
        y="54"
        width="272"
        height="264"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="556"
        y="87"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        frame budget
      </text>
      <text x="444" y="126" fontSize="13" fill={COLORS.secondary}>
        render strands
      </text>
      <text
        x="668"
        y="126"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {strandCount}
      </text>
      <text x="444" y="159" fontSize="13" fill={COLORS.secondary}>
        constraint passes
      </text>
      <text
        x="668"
        y="159"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {iterations}
      </text>
      <text x="444" y="192" fontSize="13" fill={COLORS.secondary}>
        lookup textures
      </text>
      <text
        x="668"
        y="192"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {textureCount}
      </text>
      <text x="444" y="225" fontSize="13" fill={COLORS.secondary}>
        light transmittance
      </text>
      <text
        x="668"
        y="225"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {transmittance.toFixed(3)}
      </text>
      <text
        x="556"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={lighting === "packed" ? COLORS.success : COLORS.warning}
      >
        {lighting === "packed"
          ? "packed M/N channels"
          : "full lookup separation"}
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        密度、稳定性、阴影精度和 lookup 数量需要一起做目标 GPU 的预算
      </text>
    </svg>
  );
}

export function GpuGems2Ch23HairRenderingLab() {
  const [density, setDensity] = useState<HairDensity>("control");
  const [iterations, setIterations] = useState(4);
  const [lighting, setLighting] = useState<LightingMode>("packed");
  const [slices, setSlices] = useState<ShadowSlices>(8);

  function reset() {
    setDensity("control");
    setIterations(4);
    setLighting("packed");
    setSlices(8);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 23 Nalu 头发动画与渲染实验"
      data-visual-kind="gpu-gems2-ch23-hair-nalu"
      data-unit-id="gpg-v2-23"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Nalu hair rendering 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          调整 control/dense hair、约束迭代、shadow slices
          和反射查表打包，观察稳定性、密度与 GPU 预算。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <HairScene
            density={density}
            iterations={iterations}
            lighting={lighting}
            slices={slices}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {(["control", "dense"] as HairDensity[]).map((nextDensity) => (
              <button
                key={nextDensity}
                type="button"
                aria-pressed={density === nextDensity}
                onClick={() => setDensity(nextDensity)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextDensity === "control"
                  ? "Control hairs"
                  : "Dense interpolation"}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            constraint iterations：{iterations}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="8"
              step="1"
              value={iterations}
              onChange={(event) => setIterations(Number(event.target.value))}
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            {([4, 8, 16] as ShadowSlices[]).map((nextSlices) => (
              <button
                key={nextSlices}
                type="button"
                aria-pressed={slices === nextSlices}
                onClick={() => setSlices(nextSlices)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextSlices} slices
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={lighting === "full"}
            onClick={() =>
              setLighting((mode) => (mode === "packed" ? "full" : "packed"))
            }
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            reflectance：{lighting === "packed" ? "packed maps" : "full maps"}
          </button>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {density === "dense"
              ? "密集发丝只应在控制结构稳定后生成；否则插值会放大错误的根部、碰撞或长度约束。"
              : slices > 8
                ? "更多 shadow slices 提高深度透射采样，但会增加存储、MRT 和查表带宽。"
                : "保持 control hairs 可调试，再用 packed lookup maps 和 opacity shadow map 控制实时成本。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
