"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({
  ariaLabel,
  caption,
  children,
  height = 420,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
  height?: number;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 760 ${height}`}
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path
        d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
    </>
  );
}

export function GpuGems3Ch16WindSourcesDiagram() {
  return (
    <Frame
      ariaLabel="植被风力管线：方向风和全向风按距离衰减后，在每个植被实例上合成为世界空间风向量，再经过刚度和阻尼"
      caption="风源数量可以很多，但顶点阶段只消费每个实例已经合成好的风向量；额外成本主要落在每实例的 CPU 更新。"
      height={430}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        wind sources → per-instance vector → vertex deformation
      </text>
      <g transform="translate(42 84)">
        <rect
          width="184"
          height="190"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <circle
          cx="48"
          cy="68"
          r="24"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 36 68 L 60 68 M 52 60 L 60 68 L 52 76"
          stroke={warning}
          strokeWidth={3}
        />
        <circle
          cx="134"
          cy="116"
          r="20"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 134 86 L 134 146 M 122 98 L 134 86 L 146 98"
          stroke={warning}
          strokeWidth={2.5}
        />
        <text
          x="92"
          y="174"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          directional + omnidirectional
        </text>
        <text x="92" y="194" textAnchor="middle" fontSize={12} fill={secondary}>
          distance attenuation
        </text>
      </g>
      <Arrow x1={248} y1={178} x2={290} y2={178} color={warning} />
      <g transform="translate(310 84)">
        <rect width="164" height="190" rx="14" fill={surface} stroke={accent} />
        <circle
          cx="82"
          cy="84"
          r="45"
          fill={accent}
          fillOpacity={0.1}
          stroke={accent}
          strokeWidth={2}
        />
        <path d="M 40 112 L 124 58" stroke={accent} strokeWidth={5} />
        <path
          d="M 108 58 L 124 58 L 118 72"
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
        />
        <text
          x="82"
          y="166"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          per-instance wind
        </text>
        <text x="82" y="186" textAnchor="middle" fontSize={12} fill={secondary}>
          direction · strength
        </text>
      </g>
      <Arrow x1={496} y1={178} x2={538} y2={178} color={success} />
      <g transform="translate(558 84)">
        <rect
          width="160"
          height="190"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <path
          d="M 80 34 L 42 156 L 118 156 Z"
          fill={success}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        <path
          d="M 80 72 L 118 58 M 80 108 L 122 96 M 80 140 L 126 132"
          stroke={success}
          strokeWidth={3}
        />
        <text
          x="80"
          y="178"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          bend with stiffness
        </text>
        <text x="80" y="198" textAnchor="middle" fontSize={12} fill={secondary}>
          damp after source stops
        </text>
      </g>
      <rect
        x="42"
        y="324"
        width="676"
        height="52"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="346" textAnchor="middle" fontSize={13} fill={secondary}>
        world-space vector lets one shader handle wind, explosions, helicopters,
        cloth, and hair
      </text>
      <text x="380" y="366" textAnchor="middle" fontSize={12} fill={success}>
        many forces → one bounded vertex cost
      </text>
    </Frame>
  );
}

export function GpuGems3Ch16BendingLayersDiagram() {
  return (
    <Frame
      ariaLabel="植被动画分层：主弯曲控制整株沿风向移动，细节弯曲分别控制叶缘和单叶相位"
      caption="主弯曲负责大尺度姿态，细节弯曲负责叶片的局部生命感；两层共享风力强度但使用不同的几何信号。"
      height={430}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        one wind input, two deformation scales
      </text>
      <g transform="translate(42 82)">
        <rect width="298" height="246" rx="16" fill={surface} stroke={accent} />
        <text
          x="149"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          main bending
        </text>
        <path
          d="M 148 72 L 74 210 L 222 210 Z"
          fill={accent}
          fillOpacity={0.1}
          stroke={accent}
          strokeWidth={2}
        />
        <path d="M 148 74 L 218 50" stroke={warning} strokeWidth={4} />
        <path
          d="M 198 42 L 218 50 L 202 62"
          fill="none"
          stroke={warning}
          strokeWidth={2.5}
        />
        <path
          d="M 148 116 L 194 102 M 148 154 L 184 146 M 148 188 L 174 184"
          stroke={accent}
          strokeWidth={4}
        />
        <text
          x="149"
          y="232"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          height scale · wind.xy · center limit
        </text>
      </g>
      <Arrow x1={360} y1={204} x2={400} y2={204} color={success} />
      <g transform="translate(420 82)">
        <rect
          width="298"
          height="246"
          rx="16"
          fill={surface}
          stroke={success}
        />
        <text
          x="149"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={success}
        >
          detail bending
        </text>
        <path
          d="M 149 72 L 78 210 L 220 210 Z"
          fill={success}
          fillOpacity={0.1}
          stroke={success}
          strokeWidth={2}
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={`leaf-${index}`}>
            <path
              d={`M ${112 + index * 19} ${138 - (index % 2) * 12} Q ${132 + index * 19} ${102 + (index % 3) * 12} ${148 + index * 19} ${138 - (index % 2) * 12}`}
              fill="none"
              stroke={success}
              strokeWidth={3}
            />
            <circle
              cx={132 + index * 19}
              cy={142 - (index % 2) * 12}
              r="5"
              fill={[accent, success, warning][index % 3]}
            />
          </g>
        ))}
        <text
          x="149"
          y="232"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          red=edge · green=phase · blue=stiffness
        </text>
      </g>
      <rect
        x="42"
        y="352"
        width="676"
        height="28"
        rx="10"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="371" textAnchor="middle" fontSize={12} fill={secondary}>
        vertex color RGB is a compact artist-authored control map; alpha can
        carry ambient occlusion
      </text>
    </Frame>
  );
}

export function GpuGems3Ch16TriangleWaveDiagram() {
  return (
    <Frame
      ariaLabel="波形近似：正弦波、三角波和 cubic smooth curve，比较成本与视觉连续性"
      caption="三角波容易用 frac 和 abs 生成，再用 cubic smooth curve 把尖角抹平；它用更低成本近似正弦运动。"
      height={410}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        cheap periodic motion: triangle wave → smooth curve
      </text>
      <g transform="translate(48 80)">
        <rect width="206" height="230" rx="14" fill={surface} stroke={border} />
        <text
          x="103"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          sine reference
        </text>
        <line x1="24" y1="132" x2="182" y2="132" stroke={border} />
        <path
          d="M 24 132 C 48 44 72 220 96 132 S 144 44 182 132"
          fill="none"
          stroke={accent}
          strokeWidth={3}
        />
        <text
          x="103"
          y="202"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          smooth but more work
        </text>
      </g>
      <Arrow x1={274} y1={194} x2={316} y2={194} />
      <g transform="translate(336 80)">
        <rect
          width="206"
          height="230"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="103"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          triangle wave
        </text>
        <line x1="24" y1="132" x2="182" y2="132" stroke={border} />
        <path
          d="M 24 132 L 64 54 L 104 212 L 144 54 L 182 132"
          fill="none"
          stroke={warning}
          strokeWidth={3}
        />
        <text
          x="103"
          y="202"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          frac + abs + vectorized
        </text>
      </g>
      <Arrow x1={562} y1={194} x2={604} y2={194} color={success} />
      <g transform="translate(624 80)">
        <rect width="94" height="230" rx="14" fill={surface} stroke={success} />
        <text
          x="47"
          y="30"
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={primary}
        >
          smooth
        </text>
        <line x1="14" y1="132" x2="80" y2="132" stroke={border} />
        <path
          d="M 14 132 Q 30 60 47 132 T 80 132"
          fill="none"
          stroke={success}
          strokeWidth={3}
        />
        <text x="47" y="202" textAnchor="middle" fontSize={11} fill={secondary}>
          cubic
        </text>
        <text x="47" y="220" textAnchor="middle" fontSize={11} fill={secondary}>
          interpolation
        </text>
      </g>
      <rect
        x="48"
        y="342"
        width="670"
        height="30"
        rx="10"
        fill={surface}
        stroke={border}
      />
      <text x="383" y="362" textAnchor="middle" fontSize={12} fill={success}>
        use different frequencies and per-leaf phase so a field does not move as
        one rigid sheet
      </text>
    </Frame>
  );
}

export function GpuGems3Ch16VegetationShadingDiagram() {
  return (
    <Frame
      ariaLabel="植被着色策略：树干使用 Lambert 和 Phong，叶片双面 alpha test，草使用 alpha blend，并用 subsurface texture 近似透光"
      caption="把每种植被的画面占比和 fill-rate 放进取舍：草的片元太多时，统一改用顶点着色换取效率。"
      height={440}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        geometry type → shading path → quality / efficiency trade-off
      </text>
      <g transform="translate(42 84)">
        <rect width="188" height="242" rx="14" fill={surface} stroke={accent} />
        <path
          d="M 92 54 L 46 212 L 140 212 Z"
          fill={accent}
          fillOpacity={0.1}
          stroke={accent}
          strokeWidth={2}
        />
        <path
          d="M 92 84 L 130 68 M 92 124 L 128 114 M 92 162 L 124 156"
          stroke={accent}
          strokeWidth={4}
        />
        <text
          x="94"
          y="236"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          trunk
        </text>
        <text x="94" y="256" textAnchor="middle" fontSize={12} fill={secondary}>
          Lambert + Phong
        </text>
      </g>
      <Arrow x1={254} y1={204} x2={294} y2={204} />
      <g transform="translate(314 84)">
        <rect
          width="188"
          height="242"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <path
          d="M 42 204 Q 92 70 144 204"
          fill={success}
          fillOpacity={0.1}
          stroke={success}
          strokeWidth={2}
        />
        <path
          d="M 54 174 L 76 124 L 98 174 M 102 174 L 124 108 L 146 174"
          fill="none"
          stroke={success}
          strokeWidth={3}
        />
        <circle cx="72" cy="146" r="5" fill={warning} />
        <circle cx="122" cy="132" r="5" fill={warning} />
        <text
          x="94"
          y="236"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          leaves
        </text>
        <text x="94" y="256" textAnchor="middle" fontSize={12} fill={secondary}>
          double-sided + alpha test
        </text>
      </g>
      <Arrow x1={526} y1={204} x2={566} y2={204} color={warning} />
      <g transform="translate(586 84)">
        <rect
          width="132"
          height="242"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <path
          d="M 66 58 L 36 210 L 96 210 Z"
          fill={warning}
          fillOpacity={0.1}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 66 94 L 94 84 M 66 132 L 92 126 M 66 170 L 88 168"
          stroke={warning}
          strokeWidth={4}
        />
        <text
          x="66"
          y="236"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          grass
        </text>
        <text x="66" y="256" textAnchor="middle" fontSize={12} fill={secondary}>
          alpha blend + vertex
        </text>
      </g>
      <rect
        x="42"
        y="352"
        width="676"
        height="48"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="373" textAnchor="middle" fontSize={13} fill={secondary}>
        subsurface texture × (−N·L) × (E·L) × visibility → cheap leaf back-light
      </text>
      <text x="380" y="391" textAnchor="middle" fontSize={12} fill={success}>
        world-space shading reduces discontinuities for instanced vegetation
      </text>
    </Frame>
  );
}

export function GpuGems3Ch16EdgeSmoothingDiagram() {
  return (
    <Frame
      ariaLabel="alpha test 边缘平滑：z-pass 写入深度纹理，检测深度边缘后用旋转三角形样本做双线性查找"
      caption="alpha test 的硬边不是再加一次 blur：先用深度找到真实轮廓，再用旋转样本重建边缘覆盖。"
      height={410}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        alpha test edge → depth-aware post-process smoothing
      </text>
      <g transform="translate(42 84)">
        <rect width="176" height="190" rx="14" fill={surface} stroke={accent} />
        <text
          x="88"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          1. z-pass
        </text>
        <path
          d="M 28 152 L 28 104 L 76 60 L 146 106 L 146 152 Z"
          fill={accent}
          fillOpacity={0.12}
          stroke={accent}
          strokeWidth={2}
        />
        <line
          x1="28"
          y1="158"
          x2="146"
          y2="158"
          stroke={border}
          strokeWidth={3}
        />
        <text x="88" y="184" textAnchor="middle" fontSize={12} fill={secondary}>
          floating depth texture
        </text>
      </g>
      <Arrow x1={242} y1={178} x2={282} y2={178} />
      <g transform="translate(302 84)">
        <rect
          width="176"
          height="190"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="88"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          2. detect edge
        </text>
        <path
          d="M 32 150 L 32 100 L 84 54 L 144 102 L 144 150"
          fill="none"
          stroke={warning}
          strokeWidth={3}
        />
        <circle
          cx="84"
          cy="104"
          r="26"
          fill="none"
          stroke={warning}
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <text x="88" y="184" textAnchor="middle" fontSize={12} fill={secondary}>
          depth discontinuity
        </text>
      </g>
      <Arrow x1={502} y1={178} x2={542} y2={178} color={success} />
      <g transform="translate(562 84)">
        <rect
          width="156"
          height="190"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="78"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          3. rotated taps
        </text>
        <path
          d="M 28 146 L 28 104 L 72 64 L 128 106 L 128 146"
          fill={success}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <circle
            key={`tap-${index}`}
            cx={48 + index * 17}
            cy={118 + (index % 2) * 8}
            r="5"
            fill={accent}
          />
        ))}
        <text x="78" y="184" textAnchor="middle" fontSize={12} fill={secondary}>
          bilinear coverage
        </text>
      </g>
      <rect
        x="42"
        y="320"
        width="676"
        height="48"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="341" textAnchor="middle" fontSize={13} fill={secondary}>
        只对写入深度的 opaque geometry 做这类 edge smoothing；transparent
        geometry 没有同样的 z 证据
      </text>
      <text x="380" y="359" textAnchor="middle" fontSize={12} fill={success}>
        depth gives the post-process a contour, not just a color edge
      </text>
    </Frame>
  );
}

export function GpuGems3Ch16ShaderAssemblyDiagram() {
  return (
    <Frame
      ariaLabel="统一植被 shader 组装：初始化、自定义逐光、环境光和收尾四个插槽共享法线、眼向量、纹理和透明度数据"
      caption="统一 shader library 把灯光、阴影和环境计算藏在共享数据结构后，作者只维护少数明确的自定义插槽。"
      height={400}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        shared shader library → four small custom hooks
      </text>
      <g transform="translate(44 86)">
        <rect width="222" height="220" rx="14" fill={surface} stroke={accent} />
        <text
          x="111"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          shared pass data
        </text>
        {[
          "world normal",
          "eye / light vectors",
          "diffuse / gloss map",
          "alpha / AO",
        ].map((label, index) => (
          <g key={`data-${index}`}>
            <rect
              x="28"
              y={54 + index * 34}
              width="166"
              height="22"
              rx="6"
              fill={accent}
              fillOpacity={0.12}
              stroke={border}
            />
            <text
              x="111"
              y={69 + index * 34}
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              {label}
            </text>
          </g>
        ))}
      </g>
      <Arrow x1={292} y1={196} x2={334} y2={196} />
      <g transform="translate(354 86)">
        <rect
          width="364"
          height="220"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="182"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          custom hooks
        </text>
        {[
          "initialize custom data",
          "per-light leaf / trunk shading",
          "ambient hemisphere light",
          "final texture + AO composition",
        ].map((label, index) => (
          <g key={`hook-${index}`}>
            <rect
              x="24"
              y={52 + index * 34}
              width="316"
              height="22"
              rx="6"
              fill={success}
              fillOpacity={0.12}
              stroke={success}
            />
            <text
              x="182"
              y={67 + index * 34}
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              {label}
            </text>
          </g>
        ))}
      </g>
      <rect
        x="44"
        y="336"
        width="674"
        height="28"
        rx="10"
        fill={surface}
        stroke={border}
      />
      <text x="381" y="355" textAnchor="middle" fontSize={12} fill={secondary}>
        fewer permutations · clearer responsibilities · one place to apply
        per-vertex or per-pixel trade-offs
      </text>
    </Frame>
  );
}

type WindMode = "directional" | "omnidirectional" | "calm";
type ShadingMode = "mixed" | "per-vertex";
type EdgeMode = "depth-aware" | "hard-alpha";

export function GpuGems3Ch16VegetationWindLab() {
  const [windMode, setWindMode] = useState<WindMode>("directional");
  const [windStrength, setWindStrength] = useState(0.62);
  const [shadingMode, setShadingMode] = useState<ShadingMode>("mixed");
  const [detailFrequency, setDetailFrequency] = useState("vectorized");
  const [edgeMode, setEdgeMode] = useState<EdgeMode>("depth-aware");

  const state = useMemo(() => {
    const sourceFactor =
      windMode === "directional"
        ? 1
        : windMode === "omnidirectional"
          ? 0.86
          : 0.18;
    const mainBend = Math.round(
      Math.min(96, 16 + windStrength * 82 * sourceFactor),
    );
    const detailMotion = Math.round(
      Math.min(
        96,
        20 +
          windStrength *
            66 *
            (detailFrequency === "vectorized"
              ? 1
              : detailFrequency === "slow"
                ? 0.72
                : 1.18),
      ),
    );
    const fillCost = shadingMode === "per-vertex" ? 32 : 58;
    const edgeQuality = edgeMode === "depth-aware" ? 90 : 46;
    const translucency = Math.round(Math.min(94, 38 + detailMotion * 0.42));
    const note =
      windMode === "calm"
        ? "风源停下后保留低幅度运动，避免植被瞬间冻结"
        : edgeMode === "depth-aware"
          ? "深度边缘证据可压低 alpha test 的硬边"
          : "硬 alpha 边缘成本低，但轮廓会更锯齿";
    return {
      mainBend,
      detailMotion,
      fillCost,
      edgeQuality,
      translucency,
      note,
    };
  }, [detailFrequency, edgeMode, shadingMode, windMode, windStrength]);

  function reset() {
    setWindMode("directional");
    setWindStrength(0.62);
    setShadingMode("mixed");
    setDetailFrequency("vectorized");
    setEdgeMode("depth-aware");
  }

  return (
    <section
      aria-label="GPU Gems 3 Chapter 16 vegetation wind and shading 实验：调整风源、风力、着色位置、细节波频和边缘平滑"
      data-visual-kind="gpu-gems3-ch16-vegetation-crysis"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">
            Vegetation Animation &amp; Shading Lab
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            让一片森林同时有风、有层次、可负担
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            调整风源、主弯曲强度、细节波频、着色位置和 alpha
            边缘路径，观察形变、叶片细节、透光、边缘质量与 fill-rate 的取舍。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置植被动画和着色实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 520 410"
            role="img"
            aria-label="植被实验输出：风力驱动的树形、叶片相位和质量指标"
            className="mx-auto block h-auto w-full max-w-[520px] rounded-control border border-border bg-bg"
          >
            <text
              x="260"
              y="28"
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={primary}
            >
              {windMode === "calm"
                ? "damped vegetation"
                : windMode === "directional"
                  ? "directional wind field"
                  : "radial wind area"}
            </text>
            <path
              d="M 260 80 L 142 326 L 378 326 Z"
              fill={success}
              fillOpacity={0.1}
              stroke={success}
              strokeWidth={2}
            />
            <path
              d="M 260 110 L 170 302 M 260 142 L 350 292 M 260 182 L 196 258 M 260 188 L 324 250"
              stroke={accent}
              strokeWidth={4}
            />
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const x = 176 + index * 28;
              const y = 168 + (index % 3) * 22;
              return (
                <g key={`lab-leaf-${index}`}>
                  <path
                    d={`M ${x} ${y} Q ${x + 20} ${y - 28} ${x + 36} ${y}`}
                    fill="none"
                    stroke={success}
                    strokeWidth={3}
                  />
                  <circle
                    cx={x + 18}
                    cy={y - 4}
                    r="4"
                    fill={[accent, warning, success][index % 3]}
                  />
                </g>
              );
            })}
            <path
              d={`M 260 84 L ${windMode === "calm" ? 260 : windMode === "directional" ? 354 : 330} 60`}
              stroke={warning}
              strokeWidth={4}
            />
            <path
              d={`M ${windMode === "calm" ? 260 : windMode === "directional" ? 338 : 314} 58 L ${windMode === "calm" ? 260 : windMode === "directional" ? 354 : 330} 60 L ${windMode === "calm" ? 260 : windMode === "directional" ? 344 : 320} 72`}
              fill="none"
              stroke={warning}
              strokeWidth={2.5}
            />
            <text
              x="260"
              y="358"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              main bend {state.mainBend}% · detail {state.detailMotion}% ·
              back-light {state.translucency}%
            </text>
            <rect x="42" y="374" width="436" height="16" rx="8" fill={border} />
            <rect
              x="42"
              y="374"
              width={Math.round(436 * (state.edgeQuality / 100))}
              height="16"
              rx="8"
              fill={state.edgeQuality > 70 ? success : warning}
            />
          </svg>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Metric
              label="main bending"
              value={`${state.mainBend}%`}
              color={accent}
            />
            <Metric
              label="leaf detail motion"
              value={`${state.detailMotion}%`}
              color={success}
            />
            <Metric
              label="fill-rate cost"
              value={`${state.fillCost} units`}
              color={warning}
            />
            <Metric
              label="edge quality"
              value={`${state.edgeQuality}%`}
              color={state.edgeQuality > 70 ? success : warning}
            />
          </div>
          <p
            className="mt-3 rounded-control border border-border bg-bg p-3 text-xs leading-relaxed text-secondary"
            aria-live="polite"
          >
            {state.note}。这些读数表达稳定的相对趋势，不代表特定 GPU 的
            benchmark。
          </p>
        </div>

        <div className="grid gap-4 p-4">
          <label className="grid gap-2 text-sm text-secondary">
            <span>wind source</span>
            <select
              value={windMode}
              onChange={(event) => setWindMode(event.target.value as WindMode)}
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="directional">directional global wind</option>
              <option value="omnidirectional">
                omnidirectional local area
              </option>
              <option value="calm">source stopped: damped</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>wind strength: {windStrength.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={windStrength}
              onChange={(event) => setWindStrength(Number(event.target.value))}
              className="min-h-11 accent-accent"
              aria-label="wind strength"
            />
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>shading path</span>
            <select
              value={shadingMode}
              onChange={(event) =>
                setShadingMode(event.target.value as ShadingMode)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="mixed">mixed: pixel leaves + vertex grass</option>
              <option value="per-vertex">per-vertex: fill-rate saver</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>detail wave frequency</span>
            <select
              value={detailFrequency}
              onChange={(event) => setDetailFrequency(event.target.value)}
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="slow">slow broad motion</option>
              <option value="vectorized">four vectorized waves</option>
              <option value="fast">fast edge variation</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>alpha edge path</span>
            <select
              value={edgeMode}
              onChange={(event) => setEdgeMode(event.target.value as EdgeMode)}
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="depth-aware">depth-aware rotated taps</option>
              <option value="hard-alpha">hard alpha test</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-control border border-border bg-bg p-3">
      <p className="text-xs text-secondary">{label}</p>
      <p className="mt-1 text-base font-semibold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
