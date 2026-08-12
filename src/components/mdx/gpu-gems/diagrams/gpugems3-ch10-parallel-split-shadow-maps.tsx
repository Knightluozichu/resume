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

function SplitBand({
  color,
  index,
  x,
  width,
}: {
  color: string;
  index: number;
  x: number;
  width: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y="112"
        width={width}
        height="120"
        fill={color}
        fillOpacity="0.14"
        stroke={color}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y="144"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={color}
      >
        V{index}
      </text>
      <text
        x={x + width / 2}
        y="174"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        shadow map {index}
      </text>
      <text
        x={x + width / 2}
        y="204"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        local density
      </text>
    </g>
  );
}

function MiniMap({
  color,
  label,
  x,
  y,
}: {
  color: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="112" height="74" rx="10" fill={C.surface} stroke={color} />
      <path
        d="M 18 58 L 32 28 L 78 20 L 94 58 Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
      />
      <path
        d="M 25 52 L 38 38 M 44 52 L 56 32 M 63 52 L 75 27 M 82 52 L 91 40"
        stroke={color}
        strokeWidth="2"
      />
      <text x="56" y="91" textAnchor="middle" fontSize="12" fill={C.secondary}>
        {label}
      </text>
    </g>
  );
}

export function GpuGems3Ch10PssmOverviewDiagram() {
  return (
    <Figure>
      <Frame label="Parallel-Split Shadow Maps 总览：视锥被平行于视平面的裁剪面切成多个深度层，每层拥有独立 shadow map">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把一张失配的 shadow map，拆成多张对焦的地图
        </text>
        <text
          x="380"
          y="58"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          近处像素需要更密采样，远处可以用更宽的视空间覆盖
        </text>
        <g transform="translate(82 90)">
          <path
            d="M 54 228 L 86 58 L 304 58 L 336 228 Z"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <SplitBand color={C.accent} index={0} x={58} width={72} />
          <SplitBand color={C.success} index={1} x={130} width={82} />
          <SplitBand color={C.warning} index={2} x={212} width={76} />
          <SplitBand color={C.danger} index={3} x={288} width={44} />
          <line
            x1="54"
            y1="242"
            x2="336"
            y2="242"
            stroke={C.border}
            strokeWidth="2"
          />
          <text
            x="54"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            near
          </text>
          <text
            x="336"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            far
          </text>
          <text
            x="195"
            y="294"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            view-space z
          </text>
        </g>
        <Arrow x1={444} y1={160} x2={500} y2={160} />
        <g transform="translate(516 92)">
          <text
            x="92"
            y="16"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            PSSM(4, res)
          </text>
          <MiniMap color={C.accent} label="T₀" x={0} y={30} />
          <MiniMap color={C.success} label="T₁" x={112} y={30} />
          <MiniMap color={C.warning} label="T₂" x={0} y={142} />
          <MiniMap color={C.danger} label="T₃" x={112} y={142} />
        </g>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每个 split 计算自己的 light view-projection，再只为该深度层采样对应的
          shadow map
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch10AliasingDiagram() {
  return (
    <Figure>
      <Frame label="shadow map aliasing 对比：单张 shadow map 在近处分辨率不够，PSSM 让近处 split 使用更密的纹理采样">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          误差来自两把尺：视空间的像素与光空间的 texel 没对齐
        </text>
        <g transform="translate(34 82)">
          <rect
            width="314"
            height="268"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="157"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            single shadow map
          </text>
          <path
            d="M 54 210 L 86 82 L 254 82 L 286 210 Z"
            fill={C.bg}
            stroke={C.border}
          />
          <g stroke={C.danger} strokeWidth="2" opacity="0.72">
            <path d="M 70 192 L 236 96 M 98 210 L 264 114 M 126 210 L 282 120" />
          </g>
          <text
            x="157"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            near: one texel covers too much screen
          </text>
          <text
            x="157"
            y="262"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            perspective aliasing rises as z gets small
          </text>
        </g>
        <Arrow x1={368} y1={216} x2={412} y2={216} />
        <g transform="translate(430 82)">
          <rect
            width="296"
            height="268"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="148"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            parallel splits
          </text>
          <rect
            x="40"
            y="72"
            width="216"
            height="52"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
          />
          <rect
            x="40"
            y="124"
            width="216"
            height="52"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
          />
          <rect
            x="40"
            y="176"
            width="216"
            height="34"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
          />
          <text
            x="148"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            near split · dense
          </text>
          <text
            x="148"
            y="156"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            middle split · balanced
          </text>
          <text
            x="148"
            y="198"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            far split · wider
          </text>
          <text
            x="148"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            更好匹配 view-space / texture-space frequency
          </text>
          <text
            x="148"
            y="262"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            减少 aliasing，不需要映射奇点
          </text>
        </g>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          PSSM 主要缓解 perspective aliasing；投影 aliasing
          仍与表面法线和光线方向有关
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch10SplitSchemeDiagram() {
  return (
    <Figure>
      <Frame label="practical split scheme 对比：uniform 只按距离等分，logarithmic 近处过密，practical 用权重混合两者">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          uniform 与 logarithmic 都偏科，practical 取中间解
        </text>
        <g transform="translate(44 78)">
          <rect
            width="672"
            height="254"
            rx="16"
            fill={C.surface}
            stroke={C.border}
          />
          <line
            x1="60"
            y1="198"
            x2="614"
            y2="198"
            stroke={C.border}
            strokeWidth="2"
          />
          <text
            x="60"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            near n
          </text>
          <text
            x="614"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            far f
          </text>
          <text
            x="18"
            y="116"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
            transform="rotate(-90 18 116)"
          >
            split position
          </text>
          <path
            d="M 60 186 L 198 146 L 337 105 L 475 64 L 614 28"
            fill="none"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 60 178 L 198 128 L 337 88 L 475 55 L 614 28"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <path
            d="M 60 178 L 198 148 L 337 114 L 475 72 L 614 28"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <circle cx="480" cy="73" r="5" fill={C.success} />
          <text x="88" y="48" fontSize="12" fill={C.accent}>
            uniform
          </text>
          <text x="196" y="48" fontSize="12" fill={C.warning}>
            logarithmic
          </text>
          <text x="324" y="48" fontSize="12" fill={C.success}>
            practical λ
          </text>
          <text x="480" y="94" fontSize="12" fill={C.success}>
            Cᵢ = λCᵢˡᵒᵍ + (1−λ)Cᵢᵘⁿⁱ
          </text>
          <text
            x="337"
            y="242"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            λ≈0.5 常作为兼顾近处与远处的起点
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          先收紧 near/far 平面，再按应用场景调 λ；不要把一套 split
          位置当成所有相机的常数
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch10CropMatrixDiagram() {
  return (
    <Figure>
      <Frame label="每个 split 的 light projection：scene-independent 只包住 split frustum，scene-dependent 还用可能的 shadow casters 收紧范围并用 crop matrix 放大">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          light frustum 也要对焦：包得松，texel 就被空白浪费
        </text>
        <g transform="translate(30 82)">
          <rect
            width="286"
            height="258"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="143"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            scene-independent
          </text>
          <path
            d="M 52 198 L 100 70 L 222 70 L 270 198 Z"
            fill={C.warning}
            fillOpacity="0.1"
            stroke={C.warning}
            strokeWidth="2"
          />
          <path
            d="M 104 182 L 126 134 L 176 134 L 198 182 Z"
            fill={C.accent}
            fillOpacity="0.3"
            stroke={C.accent}
          />
          <text
            x="143"
            y="226"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            simple · robust
          </text>
          <text
            x="143"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            空白多，分辨率利用率低
          </text>
        </g>
        <Arrow x1={334} y1={210} x2={382} y2={210} />
        <g transform="translate(396 82)">
          <rect
            width="334"
            height="258"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="167"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            scene-dependent + crop
          </text>
          <path
            d="M 44 198 L 88 70 L 248 70 L 292 198 Z"
            fill={C.border}
            fillOpacity="0.14"
            stroke={C.border}
            strokeDasharray="7 6"
          />
          <path
            d="M 118 180 L 132 130 L 206 130 L 222 180 Z"
            fill={C.success}
            fillOpacity="0.3"
            stroke={C.success}
            strokeWidth="2"
          />
          <Arrow x1={96} y1={110} x2={128} y2={136} color={C.success} />
          <text
            x="167"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            casters + receivers 收紧 Wᵢ
          </text>
          <text
            x="167"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            crop matrix 放大有效区域
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          越紧的投影越依赖 casters/receivers 的边界与 sampler border color 处理
        </text>
      </Frame>
    </Figure>
  );
}

function PipelineColumn({
  accent,
  detail,
  label,
  lines,
  x,
}: {
  accent: string;
  detail: string;
  label: string;
  lines: string[];
  x: number;
}) {
  return (
    <g transform={`translate(${x} 86)`}>
      <rect width="218" height="252" rx="16" fill={C.surface} stroke={accent} />
      <text
        x="109"
        y="32"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        {label}
      </text>
      <text x="109" y="56" textAnchor="middle" fontSize="12" fill={C.secondary}>
        {detail}
      </text>
      {lines.map((line, index) => (
        <g key={line}>
          <rect
            x="24"
            y={82 + index * 42}
            width="170"
            height="28"
            rx="6"
            fill={accent}
            fillOpacity="0.12"
          />
          <text
            x="109"
            y={101 + index * 42}
            textAnchor="middle"
            fontSize="12"
            fill={C.text}
          >
            {line}
          </text>
        </g>
      ))}
    </g>
  );
}

export function GpuGems3Ch10PipelineComparisonDiagram() {
  return (
    <Figure>
      <Frame label="PSSM 三种硬件实现比较：multipass 逐 split 渲染，DX9 shader 单 pass 选择 shadow map，DX10 用 texture array 与 geometry shader cloning 或 instancing">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          多张地图的代价，取决于 GPU 把“复制”放在哪里
        </text>
        <PipelineColumn
          accent={C.danger}
          detail="无硬件加速"
          label="multipass"
          lines={[
            "render T₀ → shade",
            "render T₁ → shade",
            "render T₂ → shade",
            "passes ∝ splits",
          ]}
          x={26}
        />
        <PipelineColumn
          accent={C.warning}
          detail="DX9 programmable"
          label="single-pass shade"
          lines={[
            "maps stored separately",
            "view z → choose i",
            "sample Tᵢ + depth test",
            "samplers limit splits",
          ]}
          x={271}
        />
        <PipelineColumn
          accent={C.success}
          detail="DX10 programmable"
          label="array + clone"
          lines={[
            "texture2DArray",
            "GS clone or instance",
            "render-target array",
            "shadow maps once",
          ]}
          x={516}
        />
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          三种方案共享 split 与 crop 计算；差异在 shadow-map 生成和场景合成的
          pass 如何被搬走
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch10CasterRangeDiagram() {
  return (
    <Figure>
      <Frame label="DX10 shadow caster split range：每个 caster 记录 firstSplit 和 lastSplit，只向连续覆盖的 render-target layers 输出">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          caster 不必复制到所有层：只记住它覆盖的连续范围
        </text>
        <g transform="translate(46 94)">
          <text x="0" y="20" fontSize="15" fontWeight="700" fill={C.text}>
            split layers
          </text>
          {[0, 1, 2, 3, 4].map((index) => (
            <g key={index}>
              <rect
                x={index * 116}
                y="52"
                width="92"
                height="58"
                rx="8"
                fill={
                  index === 0 || index === 1
                    ? C.accent
                    : index === 2 || index === 3
                      ? C.success
                      : C.warning
                }
                fillOpacity="0.16"
                stroke={
                  index === 0 || index === 1
                    ? C.accent
                    : index === 2 || index === 3
                      ? C.success
                      : C.warning
                }
              />
              <text
                x={index * 116 + 46}
                y="86"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                T{index}
              </text>
            </g>
          ))}
          <text x="0" y="150" fontSize="15" fontWeight="700" fill={C.text}>
            casters
          </text>
          <line
            x1="12"
            y1="180"
            x2="312"
            y2="180"
            stroke={C.accent}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="324" y="186" fontSize="12" fill={C.secondary}>
            A: first=0, last=2
          </text>
          <line
            x1="128"
            y1="218"
            x2="548"
            y2="218"
            stroke={C.success}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="560" y="224" fontSize="12" fill={C.secondary}>
            B: first=1, last=4
          </text>
          <line
            x1="360"
            y1="256"
            x2="548"
            y2="256"
            stroke={C.warning}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="560" y="262" fontSize="12" fill={C.secondary}>
            C: first=3, last=4
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          连续包围体只会覆盖连续 split；firstSplit / lastSplit 足够驱动 geometry
          shader 的 layer 输出
        </text>
      </Frame>
    </Figure>
  );
}

type AccelerationMode = "multipass" | "dx9" | "dx10";
type ProjectionMode = "independent" | "dependent";

export function GpuGems3Ch10PssmLab() {
  const [splitCount, setSplitCount] = useState(3);
  const [splitWeight, setSplitWeight] = useState(50);
  const [projection, setProjection] = useState<ProjectionMode>("independent");
  const [acceleration, setAcceleration] = useState<AccelerationMode>("dx10");

  const result = useMemo(() => {
    const nearDensity = Math.round(72 + splitWeight * 0.24 + splitCount * 5);
    const farDensity = Math.max(
      22,
      Math.round(82 - splitWeight * 0.28 + splitCount * 2),
    );
    const projectionGain = projection === "dependent" ? 14 : 0;
    const passes =
      acceleration === "multipass"
        ? splitCount * 2
        : acceleration === "dx9"
          ? splitCount + 1
          : 2;
    const mapReads =
      acceleration === "multipass" ? 1 : acceleration === "dx9" ? 1 : 1;
    const coverage = Math.min(99, 76 + projectionGain + splitCount * 4);
    return { coverage, farDensity, mapReads, nearDensity, passes };
  }, [acceleration, projection, splitCount, splitWeight]);

  function reset() {
    setSplitCount(3);
    setSplitWeight(50);
    setProjection("independent");
    setAcceleration("dx10");
  }

  const dirty =
    splitCount !== 3 ||
    splitWeight !== 50 ||
    projection !== "independent" ||
    acceleration !== "dx10";
  const colors = [C.accent, C.success, C.warning, C.danger];
  const bandWidth = 258 / splitCount;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 10 PSSM 实验：调整 split 数量、practical split 权重、projection 模式与硬件路径"
      data-visual-kind="gpu-gems3-ch10-parallel-split-shadow-maps"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">PSSM Design Lab</p>
        <p className="mt-1 text-sm text-secondary">
          把 split 分配、light frustum
          对焦和硬件路径分开调整，观察近远采样密度与 rendering passes 的取舍。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="PSSM split bands、shadow maps 与性能读数预览"
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
              PSSM({splitCount}) · {acceleration.toUpperCase()} · {projection}
            </text>
            <rect
              x="28"
              y="58"
              width="300"
              height="154"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            {Array.from({ length: splitCount }, (_, index) => (
              <g key={index}>
                <rect
                  x={42 + index * bandWidth}
                  y="82"
                  width={bandWidth - 3}
                  height="104"
                  fill={colors[index]}
                  fillOpacity="0.18"
                  stroke={colors[index]}
                />
                <text
                  x={42 + index * bandWidth + (bandWidth - 3) / 2}
                  y="120"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={colors[index]}
                >
                  V{index}
                </text>
                <text
                  x={42 + index * bandWidth + (bandWidth - 3) / 2}
                  y="148"
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.secondary}
                >
                  T{index}
                </text>
              </g>
            ))}
            <text
              x="178"
              y="236"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              near ← view-space z → far
            </text>
            <rect
              x="354"
              y="58"
              width="134"
              height="218"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="421"
              y="86"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              读数
            </text>
            <text x="368" y="120" fontSize="12" fill={C.secondary}>
              near density
            </text>
            <text
              x="474"
              y="120"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              {result.nearDensity}
            </text>
            <text x="368" y="154" fontSize="12" fill={C.secondary}>
              far density
            </text>
            <text
              x="474"
              y="154"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.warning}
            >
              {result.farDensity}
            </text>
            <text x="368" y="188" fontSize="12" fill={C.secondary}>
              passes
            </text>
            <text
              x="474"
              y="188"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={result.passes > 5 ? C.danger : C.success}
            >
              {result.passes}
            </text>
            <text x="368" y="222" fontSize="12" fill={C.secondary}>
              coverage
            </text>
            <text
              x="474"
              y="222"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.coverage}%
            </text>
            <text
              x="260"
              y="318"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              map reads / fragment {result.mapReads} · split weight λ{" "}
              {splitWeight}%
            </text>
            <text
              x="260"
              y="342"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              趋势示意：真实帧率仍取决于 casters、分辨率与 GPU 功能
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            split count：{splitCount}
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={splitCount}
              onChange={(event) => setSplitCount(Number(event.target.value))}
            >
              <option value="2">2 splits</option>
              <option value="3">3 splits</option>
              <option value="4">4 splits</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            practical split weight：{splitWeight}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              value={splitWeight}
              onChange={(event) => setSplitWeight(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            light projection
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={projection}
              onChange={(event) =>
                setProjection(event.target.value as ProjectionMode)
              }
            >
              <option value="independent">scene-independent</option>
              <option value="dependent">scene-dependent + crop</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            hardware path
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={acceleration}
              onChange={(event) =>
                setAcceleration(event.target.value as AccelerationMode)
              }
            >
              <option value="multipass">multipass</option>
              <option value="dx9">DX9 single-pass shade</option>
              <option value="dx10">DX10 array + clone</option>
            </select>
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {acceleration === "multipass"
              ? "multipass 让路径最直观，但 passes 会随 split 数量增长。"
              : projection === "dependent"
                ? "scene-dependent projection 提高有效区域利用率，但边界与 border handling 更重要。"
                : "shader 选择 split 后可减少合成 pass；继续检查 sampler 或 texture-array 资源限制。"}
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
