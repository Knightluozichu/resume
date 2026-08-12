"use client";

import { useMemo, useState, type ReactNode } from "react";

type SampleCount = 2 | 4 | 8;
type ResolveMode = "linear" | "gamma";

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
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function GpuGems2Ch21RasterPipelineDiagram() {
  return (
    <Figure>
      <Frame label="高质量抗锯齿光栅化流程：几何边缘进入 coverage 估计，再生成 sample mask，最后以正确颜色空间 resolve">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          High-Quality Antialiased Rasterization：边缘覆盖率的完整链路
        </text>
        <rect
          x="28"
          y="92"
          width="150"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="103"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          几何边缘
        </text>
        <text
          x="103"
          y="165"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          triangle edge
        </text>
        <text
          x="103"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          subpixel coordinates
        </text>
        <text
          x="103"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          winding / depth
        </text>
        <Arrow x1={194} y1={186} x2={230} y2={186} />
        <rect
          x="242"
          y="92"
          width="174"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="329"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          coverage 估计
        </text>
        <text
          x="329"
          y="165"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          analytic edge distance
        </text>
        <text
          x="329"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          sample positions
        </text>
        <text
          x="329"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          0 ≤ coverage ≤ 1
        </text>
        <Arrow x1={432} y1={186} x2={468} y2={186} color={COLORS.success} />
        <rect
          x="480"
          y="92"
          width="212"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="586"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          mask → resolve
        </text>
        <text
          x="586"
          y="165"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          per-sample color/depth
        </text>
        <text
          x="586"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          premultiplied coverage
        </text>
        <text
          x="586"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          linear-light average
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          抗锯齿不是把边缘“涂糊”：要保存覆盖证据，再在正确的空间合成
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch21CoverageDiagram() {
  const cells = Array.from({ length: 9 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="像素 coverage 图：一条三角形边缘穿过像素格，部分覆盖像素得到介于零和一之间的 coverage">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          coverage：从二值命中到连续边缘
        </text>
        <g transform="translate(74 75)">
          {cells.map((index) => {
            const row = Math.floor(index / 3);
            const column = index % 3;
            const coverage = [0.08, 0.38, 0.88, 0.02, 0.28, 0.7, 0, 0.08, 0.42][
              index
            ];
            return (
              <g key={`coverage-cell-${index}`}>
                <rect
                  x={column * 82}
                  y={row * 66}
                  width="68"
                  height="52"
                  rx="7"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <rect
                  x={column * 82 + 2}
                  y={row * 66 + 2}
                  width={round(64 * coverage)}
                  height="48"
                  rx="5"
                  fill={COLORS.accent}
                  fillOpacity="0.35"
                />
                <text
                  x={column * 82 + 34}
                  y={row * 66 + 31}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={COLORS.text}
                >
                  {coverage.toFixed(2)}
                </text>
              </g>
            );
          })}
          <path d="M-14 172 L236 -12" stroke={COLORS.warning} strokeWidth="5" />
          <text x="246" y="4" fontSize="13" fill={COLORS.warning}>
            triangle edge
          </text>
        </g>
        <rect
          x="352"
          y="86"
          width="316"
          height="174"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="510"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          一个像素的工程判定
        </text>
        <text x="376" y="157" fontSize="13" fill={COLORS.secondary}>
          binary: edge hit → 0 或 1
        </text>
        <text x="376" y="190" fontSize="13" fill={COLORS.accent}>
          coverage: 几何面积 / 像素面积
        </text>
        <text x="376" y="223" fontSize="13" fill={COLORS.secondary}>
          analytic: 由边方程与像素边界估算
        </text>
        <text
          x="510"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          先记录覆盖率，后决定颜色与 alpha
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          coverage 的连续性来自子像素几何，而不是事后对二值边缘做 blur
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch21MsaaDiagram() {
  const samplePoints = [
    [0.25, 0.25],
    [0.75, 0.25],
    [0.25, 0.75],
    [0.75, 0.75],
  ];
  return (
    <Figure>
      <Frame label="MSAA sample mask 图：每个像素拥有多个 sample position，三角形边缘只覆盖其中一部分样本">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          multisample antialiasing：coverage 变成 sample mask
        </text>
        <g transform="translate(54 77)">
          {[0, 1, 2, 3].map((cell) => {
            const x = (cell % 2) * 124;
            const y = Math.floor(cell / 2) * 112;
            return (
              <g key={`msaa-pixel-${cell}`}>
                <rect
                  x={x}
                  y={y}
                  width="96"
                  height="84"
                  rx="10"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                {samplePoints.map(([sx, sy], sample) => {
                  const covered = (cell + sample) % 4 !== 0;
                  return (
                    <circle
                      key={`sample-${cell}-${sample}`}
                      cx={round(x + sx * 96)}
                      cy={round(y + sy * 84)}
                      r="8"
                      fill={covered ? COLORS.accent : COLORS.bg}
                      stroke={covered ? COLORS.accent : COLORS.danger}
                      strokeWidth="3"
                    />
                  );
                })}
                <text
                  x={x + 48}
                  y={y + 109}
                  textAnchor="middle"
                  fontSize="13"
                  fill={COLORS.secondary}
                >
                  pixel {cell + 1}
                </text>
              </g>
            );
          })}
          <path d="M-18 205 L252 -10" stroke={COLORS.warning} strokeWidth="5" />
        </g>
        <rect
          x="352"
          y="82"
          width="314"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="509"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          per-sample 记录
        </text>
        <text x="376" y="154" fontSize="13" fill={COLORS.secondary}>
          sample count: 4×
        </text>
        <text x="376" y="187" fontSize="13" fill={COLORS.accent}>
          sample mask: 1110 / 0111 …
        </text>
        <text x="376" y="220" fontSize="13" fill={COLORS.secondary}>
          shader color 可共享，但 coverage 不能丢
        </text>
        <text
          x="509"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          MSAA 不是简单的全分辨率颜色 supersampling
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          改变 sample pattern 会改变薄几何的稳定性，也会改变带宽与 resolve 成本
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch21ResolveDiagram() {
  return (
    <Figure>
      <Frame label="resolve 图：多个样本颜色与 coverage 经过预乘和线性光空间加权，得到最终像素">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          resolve：最后一步也会决定边缘质量
        </text>
        <rect
          x="34"
          y="96"
          width="168"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="118"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          sample buffer
        </text>
        {[
          ["C₀", "1.0", COLORS.accent],
          ["C₁", "0.8", COLORS.accent],
          ["C₂", "0.0", COLORS.secondary],
          ["C₃", "0.0", COLORS.secondary],
        ].map(([name, value, color], index) => (
          <text
            key={name}
            x={62 + (index % 2) * 72}
            y={171 + Math.floor(index / 2) * 32}
            fontSize="13"
            fill={color}
          >
            {name}={value}
          </text>
        ))}
        <text
          x="118"
          y="239"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          mask → coverage weights
        </text>
        <Arrow x1={218} y1={180} x2={254} y2={180} />
        <rect
          x="266"
          y="96"
          width="190"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="361"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          linear-light resolve
        </text>
        <text
          x="361"
          y="169"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          Σ (coverage × premultiplied C)
        </text>
        <text
          x="361"
          y="203"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          ÷ Σ coverage
        </text>
        <text
          x="361"
          y="239"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          edge energy preserved
        </text>
        <Arrow x1={472} y1={180} x2={508} y2={180} color={COLORS.success} />
        <rect
          x="520"
          y="96"
          width="166"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="603"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          output pixel
        </text>
        <rect
          x="551"
          y="153"
          width="104"
          height="41"
          rx="8"
          fill={COLORS.accent}
          fillOpacity="0.35"
        />
        <text
          x="603"
          y="180"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          smooth edge
        </text>
        <text
          x="603"
          y="224"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          no gamma average
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          先预乘再加权，并在 linear-light 空间 resolve；最后才编码到显示空间
        </text>
      </Frame>
    </Figure>
  );
}

type RasterSceneProps = {
  edgePhase: number;
  resolveMode: ResolveMode;
  sampleCount: SampleCount;
};

function RasterScene({
  edgePhase,
  resolveMode,
  sampleCount,
}: RasterSceneProps) {
  const samplePositions = useMemo(() => {
    const columns = sampleCount === 2 ? 2 : sampleCount === 4 ? 2 : 4;
    const rows = Math.ceil(sampleCount / columns);
    return Array.from({ length: sampleCount }, (_, index) => ({
      x: round(((index % columns) + 0.5) / columns),
      y: round((Math.floor(index / columns) + 0.5) / rows),
    }));
  }, [sampleCount]);
  const edge = 0.2 + (edgePhase / 100) * 0.62;
  const covered = samplePositions.filter(
    (point) => point.x + point.y > edge,
  ).length;
  const coverage = round(covered / sampleCount);
  const linearValue = round(0.15 + coverage * 0.85);
  const displayedValue =
    resolveMode === "gamma" ? round(linearValue ** (1 / 2.2)) : linearValue;
  const sampleLabel =
    sampleCount === 2 ? "2×" : sampleCount === 4 ? "4×" : "8×";
  const grid = Array.from({ length: 16 }, (_, index) => index);

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="抗锯齿光栅化交互实验：调整 sample count、edge phase 与 resolve 空间，观察 coverage 和最终像素"
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
        coverage lab：{sampleLabel} sample / {resolveMode} resolve
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
      <g transform="translate(54 78)">
        {grid.map((index) => {
          const row = Math.floor(index / 4);
          const column = index % 4;
          return (
            <rect
              key={`lab-cell-${index}`}
              x={column * 74}
              y={row * 54}
              width="62"
              height="44"
              rx="6"
              fill={COLORS.bg}
              stroke={COLORS.border}
            />
          );
        })}
        <path
          d={`M-14 ${round(188 - edgePhase * 0.7)} L286 ${round(36 + edgePhase * 0.7)}`}
          stroke={COLORS.warning}
          strokeWidth="5"
        />
        <g transform="translate(0 0)">
          {samplePositions.map((point, index) => {
            const pixelX = 1;
            const pixelY = 1;
            const coveredPoint = point.x + point.y > edge;
            return (
              <circle
                key={`lab-sample-${index}`}
                cx={round(pixelX * 74 + point.x * 62)}
                cy={round(pixelY * 54 + point.y * 44)}
                r="7"
                fill={coveredPoint ? COLORS.accent : COLORS.bg}
                stroke={coveredPoint ? COLORS.accent : COLORS.danger}
                strokeWidth="3"
              />
            );
          })}
        </g>
      </g>
      <text
        x="209"
        y="300"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        黄色边线 = triangle edge · 蓝点 = covered sample
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
        运行时记录
      </text>
      <text x="444" y="126" fontSize="13" fill={COLORS.secondary}>
        samples
      </text>
      <text
        x="668"
        y="126"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {sampleLabel}
      </text>
      <text x="444" y="159" fontSize="13" fill={COLORS.secondary}>
        covered
      </text>
      <text
        x="668"
        y="159"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {covered}/{sampleCount}
      </text>
      <text x="444" y="192" fontSize="13" fill={COLORS.secondary}>
        coverage
      </text>
      <text
        x="668"
        y="192"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {coverage.toFixed(2)}
      </text>
      <text x="444" y="225" fontSize="13" fill={COLORS.secondary}>
        output value
      </text>
      <text
        x="668"
        y="225"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {displayedValue.toFixed(3)}
      </text>
      <text
        x="556"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={resolveMode === "gamma" ? COLORS.danger : COLORS.success}
      >
        {resolveMode === "gamma"
          ? "警告：gamma 空间直接平均"
          : "正确：linear-light resolve"}
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        提高 sample count 能细化 coverage，但会增加带宽；resolve
        空间仍决定边缘亮度
      </text>
    </svg>
  );
}

export function GpuGems2Ch21AntialiasedRasterizationLab() {
  const [sampleCount, setSampleCount] = useState<SampleCount>(4);
  const [edgePhase, setEdgePhase] = useState(48);
  const [resolveMode, setResolveMode] = useState<ResolveMode>("linear");

  function reset() {
    setSampleCount(4);
    setEdgePhase(48);
    setResolveMode("linear");
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 21 高质量抗锯齿光栅化实验"
      data-visual-kind="gpu-gems2-ch21-antialiased-rasterization"
      data-unit-id="gpg-v2-21"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Antialiased rasterization 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          调整 sample count、边缘相位和 resolve 空间，观察
          coverage、带宽与边缘亮度如何互相牵制。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <RasterScene
            edgePhase={edgePhase}
            resolveMode={resolveMode}
            sampleCount={sampleCount}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {([2, 4, 8] as SampleCount[]).map((nextCount) => (
              <button
                key={nextCount}
                type="button"
                aria-pressed={sampleCount === nextCount}
                onClick={() => setSampleCount(nextCount)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextCount}× sample
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            edge phase：{edgePhase}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="1"
              value={edgePhase}
              onChange={(event) => setEdgePhase(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            aria-pressed={resolveMode === "gamma"}
            onClick={() =>
              setResolveMode((mode) => (mode === "linear" ? "gamma" : "linear"))
            }
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            resolve：{resolveMode === "linear" ? "linear-light" : "gamma space"}
          </button>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {resolveMode === "gamma"
              ? "切换到 gamma space 会让亮度平均偏差；发布实现应明确编码、预乘和 resolve 的顺序。"
              : "linear-light resolve 保留覆盖率语义；继续改变 sample count，比较质量收益是否值得带宽。"}
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
