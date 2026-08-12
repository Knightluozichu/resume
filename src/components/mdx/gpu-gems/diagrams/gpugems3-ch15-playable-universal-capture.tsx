"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
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

export function GpuGems3Ch15CapturePipelineDiagram() {
  return (
    <Frame
      ariaLabel="Playable Universal Capture 数据管线：红外摄像机追踪标记，彩色摄像机采集表演，重建骨骼和 UV 动态纹理"
      caption="先用几何恢复运动，再把多视角颜色重新投影到 UV；采集的细节因此可以随表情一起移动。"
      height={430}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        capture once → reconstruct motion → replay many times
      </text>
      <g transform="translate(42 84)">
        <rect
          width="170"
          height="190"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <circle
          cx="48"
          cy="64"
          r="24"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <circle
          cx="120"
          cy="64"
          r="24"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <circle
          cx="84"
          cy="134"
          r="24"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 48 64 L 84 134 L 120 64"
          fill="none"
          stroke={warning}
          strokeWidth={2}
        />
        <circle cx="48" cy="64" r="5" fill={success} />
        <circle cx="84" cy="134" r="5" fill={success} />
        <circle cx="120" cy="64" r="5" fill={success} />
        <text
          x="85"
          y="220"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          8 IR cameras
        </text>
        <text x="85" y="240" textAnchor="middle" fontSize={12} fill={secondary}>
          marker positions
        </text>
      </g>
      <Arrow x1={236} y1={178} x2={278} y2={178} color={warning} />
      <g transform="translate(298 84)">
        <rect width="170" height="190" rx="14" fill={surface} stroke={accent} />
        <rect
          x="24"
          y="34"
          width="52"
          height="54"
          rx="8"
          fill={accent}
          fillOpacity={0.16}
          stroke={accent}
        />
        <rect
          x="94"
          y="34"
          width="52"
          height="54"
          rx="8"
          fill={accent}
          fillOpacity={0.16}
          stroke={accent}
        />
        <circle
          cx="50"
          cy="61"
          r="14"
          fill="none"
          stroke={accent}
          strokeWidth={2}
        />
        <circle
          cx="120"
          cy="61"
          r="14"
          fill="none"
          stroke={accent}
          strokeWidth={2}
        />
        <path
          d="M 50 61 L 58 52 M 120 61 L 128 52"
          stroke={success}
          strokeWidth={2}
        />
        <path
          d="M 36 132 Q 85 174 134 132"
          fill="none"
          stroke={accent}
          strokeWidth={3}
        />
        <text
          x="85"
          y="220"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          3 HD color cameras
        </text>
        <text x="85" y="240" textAnchor="middle" fontSize={12} fill={secondary}>
          RGB performance frames
        </text>
      </g>
      <Arrow x1={492} y1={178} x2={534} y2={178} color={success} />
      <g transform="translate(554 84)">
        <rect
          width="164"
          height="190"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <path
          d="M 36 84 Q 82 38 128 84 Q 82 132 36 84 Z"
          fill={accent}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        <circle cx="58" cy="76" r="4" fill={warning} />
        <circle cx="82" cy="62" r="4" fill={warning} />
        <circle cx="106" cy="76" r="4" fill={warning} />
        <path
          d="M 58 76 L 82 118 L 106 76"
          fill="none"
          stroke={success}
          strokeWidth={3}
        />
        <path
          d="M 42 144 L 122 144"
          stroke={border}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path
          d="M 42 144 L 92 144"
          stroke={accent}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <text
          x="82"
          y="220"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          replayable assets
        </text>
        <text x="82" y="240" textAnchor="middle" fontSize={12} fill={secondary}>
          bones + UV textures
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
        让真实物理负责表情细节；实时系统只需存储、解压和播放结果
      </text>
      <text x="380" y="366" textAnchor="middle" fontSize={12} fill={success}>
        capture complexity → compact runtime representation
      </text>
    </Frame>
  );
}

export function GpuGems3Ch15PcaBasisDiagram() {
  return (
    <Frame
      ariaLabel="PCA 压缩流程：动画纹理帧矩阵、去均值、主成分排序和保留前 C 个分量"
      caption="PCA 把高维动画帧投影到少数变化最大的方向；丢弃尾部小分量换取存储和解码预算。"
      height={430}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        animated texture matrix → centered data → principal components
      </text>
      <g transform="translate(42 82)">
        <rect width="176" height="200" rx="14" fill={surface} stroke={accent} />
        <text
          x="88"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          A · frames
        </text>
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={`matrix-row-${row}`}>
            {Array.from({ length: 5 }).map((__, col) => (
              <rect
                key={`matrix-cell-${row}-${col}`}
                x={25 + col * 27}
                y={50 + row * 21}
                width="18"
                height="13"
                rx="3"
                fill={col === 0 || row === 2 ? warning : accent}
                fillOpacity={0.22 + ((row + col) % 3) * 0.12}
              />
            ))}
          </g>
        ))}
        <text x="88" y="190" textAnchor="middle" fontSize={12} fill={secondary}>
          pixels × RGB × time
        </text>
      </g>
      <Arrow x1={244} y1={180} x2={286} y2={180} />
      <g transform="translate(306 82)">
        <rect
          width="154"
          height="200"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <circle
          cx="77"
          cy="82"
          r="39"
          fill={warning}
          fillOpacity={0.12}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 51 98 L 103 66 M 56 68 L 98 100"
          stroke={warning}
          strokeWidth={2.5}
        />
        <circle cx="78" cy="83" r="6" fill={success} />
        <text
          x="77"
          y="158"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          subtract mean
        </text>
        <text x="77" y="180" textAnchor="middle" fontSize={12} fill={secondary}>
          expose variance
        </text>
        <text x="77" y="198" textAnchor="middle" fontSize={12} fill={secondary}>
          not raw pixels
        </text>
      </g>
      <Arrow x1={486} y1={180} x2={528} y2={180} color={success} />
      <g transform="translate(548 82)">
        <rect
          width="170"
          height="200"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="85"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          U · ranked basis
        </text>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <g key={`basis-${index}`}>
            <rect
              x="24"
              y={52 + index * 22}
              width={118 - index * 12}
              height="12"
              rx="6"
              fill={success}
              fillOpacity={0.82 - index * 0.1}
            />
            <text x="151" y={62 + index * 22} fontSize={11} fill={secondary}>
              {index < 3 ? `keep ${index + 1}` : "drop"}
            </text>
          </g>
        ))}
        <text x="85" y="194" textAnchor="middle" fontSize={12} fill={secondary}>
          Σ ranks importance
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
        C 越小，数据越轻；被丢掉的小分量也会带来可见误差
      </text>
      <text x="380" y="366" textAnchor="middle" fontSize={12} fill={accent}>
        choose C from perceptual quality, not from compression ratio alone
      </text>
    </Frame>
  );
}

export function GpuGems3Ch15DecompressionDiagram() {
  return (
    <Frame
      ariaLabel="GPU 解压流程：组件纹理和当前帧权重进入像素着色器，做点积并重建 RGB 颜色"
      caption="运行时不还原整段动画矩阵：每个可见像素只读取自己的组件纹理，并用当前帧权重做并行点积。"
      height={410}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        visible pixel: components × frame weights → color
      </text>
      <g transform="translate(42 82)">
        <rect width="184" height="170" rx="14" fill={surface} stroke={accent} />
        <text
          x="92"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          component textures
        </text>
        {[0, 1, 2, 3].map((index) => (
          <rect
            key={`component-${index}`}
            x={26 + (index % 2) * 72}
            y={52 + Math.floor(index / 2) * 48}
            width="52"
            height="30"
            rx="6"
            fill={accent}
            fillOpacity={0.16 + index * 0.06}
            stroke={accent}
          />
        ))}
        <text x="92" y="148" textAnchor="middle" fontSize={12} fill={secondary}>
          U columns packed in RGBA
        </text>
      </g>
      <g transform="translate(288 82)">
        <rect
          width="184"
          height="170"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="92"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          current frame weights
        </text>
        {[0, 1, 2, 3].map((index) => (
          <g key={`weight-${index}`}>
            <rect
              x="28"
              y={52 + index * 22}
              width={100 - index * 12}
              height="12"
              rx="6"
              fill={warning}
              fillOpacity={0.8 - index * 0.1}
            />
            <text x="142" y={62 + index * 22} fontSize={11} fill={secondary}>
              R/G/B
            </text>
          </g>
        ))}
        <text x="92" y="148" textAnchor="middle" fontSize={12} fill={secondary}>
          V rows for frame f
        </text>
      </g>
      <Arrow x1={238} y1={166} x2={272} y2={166} />
      <Arrow x1={478} y1={166} x2={512} y2={166} color={success} />
      <g transform="translate(532 82)">
        <rect
          width="186"
          height="170"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="93"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          pixel shader
        </text>
        <circle
          cx="93"
          cy="86"
          r="36"
          fill={success}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        <text
          x="93"
          y="82"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          dot × sum
        </text>
        <text x="93" y="102" textAnchor="middle" fontSize={12} fill={secondary}>
          only visible UV
        </text>
        <text x="93" y="148" textAnchor="middle" fontSize={12} fill={secondary}>
          reconstructed RGB
        </text>
      </g>
      <rect
        x="42"
        y="294"
        width="676"
        height="52"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="316" textAnchor="middle" fontSize={13} fill={secondary}>
        GPU 负责大量相同的小点积；CPU 只更新少量当前帧权重和骨骼参数
      </text>
      <text x="380" y="336" textAnchor="middle" fontSize={12} fill={success}>
        decompression cost follows visible pixels, not the full face library
      </text>
    </Frame>
  );
}

export function GpuGems3Ch15VariablePcaDiagram() {
  return (
    <Frame
      ariaLabel="可变 PCA 区域布局：眼睛保留更多组件，脸部中等，头发和背景保留更少组件"
      caption="人眼对眼睛和嘴唇的误差更敏感；variable PCA 把组件预算按区域分配，而不是每个像素一刀切。"
      height={410}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        perceptual importance → variable component budget
      </text>
      <rect
        x="64"
        y="82"
        width="408"
        height="224"
        rx="18"
        fill={surface}
        stroke={accent}
        strokeWidth={2}
      />
      <path
        d="M 168 190 Q 270 98 372 190 Q 270 284 168 190 Z"
        fill={accent}
        fillOpacity={0.1}
        stroke={accent}
        strokeWidth={2}
      />
      <ellipse
        cx="224"
        cy="176"
        rx="30"
        ry="18"
        fill={success}
        fillOpacity={0.2}
        stroke={success}
        strokeWidth={2}
      />
      <ellipse
        cx="316"
        cy="176"
        rx="30"
        ry="18"
        fill={success}
        fillOpacity={0.2}
        stroke={success}
        strokeWidth={2}
      />
      <path
        d="M 244 238 Q 270 252 296 238"
        fill="none"
        stroke={warning}
        strokeWidth={4}
      />
      <text x="270" y="326" textAnchor="middle" fontSize={12} fill={secondary}>
        UV regions: eyes · face · hair · teeth
      </text>
      <g transform="translate(522 82)">
        <rect width="196" height="224" rx="14" fill={surface} stroke={border} />
        <text
          x="98"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          components per region
        </text>
        <text x="22" y="72" fontSize={12} fill={success}>
          eyes
        </text>
        <rect x="78" y="62" width="92" height="14" rx="7" fill={success} />
        <text x="178" y="73" textAnchor="end" fontSize={11} fill={secondary}>
          88
        </text>
        <text x="22" y="116" fontSize={12} fill={accent}>
          face
        </text>
        <rect x="78" y="106" width="64" height="14" rx="7" fill={accent} />
        <text x="178" y="117" textAnchor="end" fontSize={11} fill={secondary}>
          16
        </text>
        <text x="22" y="160" fontSize={12} fill={warning}>
          hair
        </text>
        <rect x="78" y="150" width="34" height="14" rx="7" fill={warning} />
        <text x="178" y="161" textAnchor="end" fontSize={11} fill={secondary}>
          4
        </text>
        <text x="22" y="204" fontSize={12} fill={danger}>
          error
        </text>
        <text x="178" y="205" textAnchor="end" fontSize={11} fill={secondary}>
          not uniform
        </text>
      </g>
    </Frame>
  );
}

export function GpuGems3Ch15SequenceGraphDiagram() {
  return (
    <Frame
      ariaLabel="面部表演 motion graph：多个表情片段节点通过插值边连接，可按输入动态选择并混合"
      caption="压缩空间保留了线性组合的性质：先混合权重再解压，便能在运行时拼接表情片段。"
      height={390}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        compressed performance library → motion graph → interactive face
      </text>
      <g transform="translate(70 96)">
        <circle
          cx="74"
          cy="100"
          r="54"
          fill={accent}
          fillOpacity={0.12}
          stroke={accent}
          strokeWidth={2}
        />
        <text
          x="74"
          y="96"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          neutral
        </text>
        <text x="74" y="118" textAnchor="middle" fontSize={11} fill={secondary}>
          clip A
        </text>
      </g>
      <g transform="translate(270 70)">
        <circle
          cx="74"
          cy="100"
          r="54"
          fill={success}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        <text
          x="74"
          y="96"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          smile
        </text>
        <text x="74" y="118" textAnchor="middle" fontSize={11} fill={secondary}>
          clip B
        </text>
      </g>
      <g transform="translate(470 96)">
        <circle
          cx="74"
          cy="100"
          r="54"
          fill={warning}
          fillOpacity={0.12}
          stroke={warning}
          strokeWidth={2}
        />
        <text
          x="74"
          y="96"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          blink
        </text>
        <text x="74" y="118" textAnchor="middle" fontSize={11} fill={secondary}>
          clip C
        </text>
      </g>
      <Arrow x1={178} y1={196} x2={270} y2={170} color={accent} />
      <Arrow x1={378} y1={170} x2={470} y2={196} color={success} />
      <path
        d="M 178 226 C 280 302 392 302 470 226"
        fill="none"
        stroke={warning}
        strokeWidth={2.5}
        strokeDasharray="6 5"
      />
      <text x="324" y="322" textAnchor="middle" fontSize={12} fill={secondary}>
        blend weights before decompression
      </text>
      <rect
        x="58"
        y="346"
        width="644"
        height="22"
        rx="8"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="362" textAnchor="middle" fontSize={12} fill={success}>
        AI / controller chooses edge; renderer evaluates the chosen compressed
        state
      </text>
    </Frame>
  );
}

type CaptureSource = "three-cameras" | "single-video" | "hand-animated";
type RegionPolicy = "uniform" | "variable";
type TextureLayout = "512x2048" | "1024x2048";
type SequenceMode = "motion-graph" | "single-clip";

export function GpuGems3Ch15PlayableCaptureLab() {
  const [source, setSource] = useState<CaptureSource>("three-cameras");
  const [componentCount, setComponentCount] = useState(16);
  const [regionPolicy, setRegionPolicy] = useState<RegionPolicy>("variable");
  const [textureLayout, setTextureLayout] = useState<TextureLayout>("512x2048");
  const [sequenceMode, setSequenceMode] =
    useState<SequenceMode>("motion-graph");

  const state = useMemo(() => {
    const captureFidelity =
      source === "three-cameras" ? 92 : source === "single-video" ? 66 : 42;
    const componentFidelity = Math.min(94, 44 + componentCount * 1.8);
    const regionBonus = regionPolicy === "variable" ? 14 : 0;
    const fidelity = Math.min(
      98,
      Math.round(
        captureFidelity * 0.42 + componentFidelity * 0.36 + regionBonus,
      ),
    );
    const memory = Math.round(
      (textureLayout === "512x2048" ? 4.0 : 8.0) + componentCount * 0.045,
    );
    const shaderWork = Math.round(
      componentCount *
        (regionPolicy === "variable" ? 0.82 : 1) *
        (textureLayout === "1024x2048" ? 1.18 : 1),
    );
    const latency = sequenceMode === "motion-graph" ? 18 : 12;
    const note =
      sequenceMode === "motion-graph"
        ? "可在压缩空间混合表情片段，再一次解压"
        : "单片段路径简单，但没有动态拼接能力";
    return { fidelity, memory, shaderWork, latency, note };
  }, [componentCount, regionPolicy, sequenceMode, source, textureLayout]);

  function reset() {
    setSource("three-cameras");
    setComponentCount(16);
    setRegionPolicy("variable");
    setTextureLayout("512x2048");
    setSequenceMode("motion-graph");
  }

  return (
    <section
      aria-label="GPU Gems 3 Chapter 15 Playable Universal Capture 实验：调整采集源、PCA 分量、区域策略、纹理布局和表演拼接模式"
      data-visual-kind="gpu-gems3-ch15-playable-universal-capture"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">
            Playable Universal Capture Lab
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            压缩真人表演，仍然保持可玩
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            把采集质量、保留的 PCA 分量和区域策略放在同一张预算表里，观察
            fidelity、内存、shader 工作量和交互延迟如何互相牵制。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Playable Universal Capture 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 520 390"
            role="img"
            aria-label="Playable Universal Capture 实验输出：当前表演、PCA 分量和区域策略的预算条"
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
              {source === "three-cameras"
                ? "captured performance"
                : source === "single-video"
                  ? "single-view approximation"
                  : "hand-authored performance"}
            </text>
            <path
              d="M 118 156 Q 260 54 402 156 Q 260 286 118 156 Z"
              fill={accent}
              fillOpacity={0.1}
              stroke={accent}
              strokeWidth={2}
            />
            <ellipse
              cx="205"
              cy="148"
              rx="34"
              ry="20"
              fill={success}
              fillOpacity={0.2}
              stroke={success}
              strokeWidth={2}
            />
            <ellipse
              cx="315"
              cy="148"
              rx="34"
              ry="20"
              fill={success}
              fillOpacity={0.2}
              stroke={success}
              strokeWidth={2}
            />
            <path
              d="M 225 216 Q 260 236 295 216"
              fill="none"
              stroke={warning}
              strokeWidth={4}
            />
            <circle cx="205" cy="148" r="6" fill={success} />
            <circle cx="315" cy="148" r="6" fill={success} />
            <text
              x="260"
              y="320"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              当前路径：
              {regionPolicy === "variable"
                ? "eyes keep more components"
                : "uniform component budget"}
            </text>
            <text
              x="260"
              y="342"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              sequence：
              {sequenceMode === "motion-graph"
                ? "blend in compressed space"
                : "play one clip"}
            </text>
            <rect x="48" y="358" width="424" height="16" rx="8" fill={border} />
            <rect
              x="48"
              y="358"
              width={Math.round(424 * (state.fidelity / 100))}
              height="16"
              rx="8"
              fill={success}
            />
          </svg>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Metric
              label="perceptual fidelity"
              value={`${state.fidelity}%`}
              color={success}
            />
            <Metric
              label="texture memory"
              value={`${state.memory.toFixed(1)} MB`}
              color={accent}
            />
            <Metric
              label="shader component work"
              value={`${state.shaderWork} units`}
              color={warning}
            />
            <Metric
              label="interaction latency"
              value={`${state.latency} ms`}
              color={state.latency > 16 ? warning : success}
            />
          </div>
          <p
            className="mt-3 rounded-control border border-border bg-bg p-3 text-xs leading-relaxed text-secondary"
            aria-live="polite"
          >
            {state.note}。这些读数是帮助比较取舍的示意趋势，不是特定硬件的
            benchmark。
          </p>
        </div>

        <div className="grid gap-4 p-4">
          <label className="grid gap-2 text-sm text-secondary">
            <span>capture source</span>
            <select
              value={source}
              onChange={(event) =>
                setSource(event.target.value as CaptureSource)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="three-cameras">3 HD cameras + IR markers</option>
              <option value="single-video">single video approximation</option>
              <option value="hand-animated">hand-authored fallback</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>PCA components: {componentCount}</span>
            <input
              type="range"
              min="8"
              max="64"
              step="8"
              value={componentCount}
              onChange={(event) =>
                setComponentCount(Number(event.target.value))
              }
              className="min-h-11 accent-accent"
              aria-label="PCA components"
            />
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>region policy</span>
            <select
              value={regionPolicy}
              onChange={(event) =>
                setRegionPolicy(event.target.value as RegionPolicy)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="variable">variable PCA: eyes prioritized</option>
              <option value="uniform">uniform PCA: same C everywhere</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>texture layout</span>
            <select
              value={textureLayout}
              onChange={(event) =>
                setTextureLayout(event.target.value as TextureLayout)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="512x2048">512×2048 packed atlas</option>
              <option value="1024x2048">1024×2048 higher detail</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>sequence mode</span>
            <select
              value={sequenceMode}
              onChange={(event) =>
                setSequenceMode(event.target.value as SequenceMode)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="motion-graph">motion graph: blend clips</option>
              <option value="single-clip">single captured clip</option>
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
