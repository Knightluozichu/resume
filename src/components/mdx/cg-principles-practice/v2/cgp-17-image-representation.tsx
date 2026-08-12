"use client";

import { useMemo, useState, type ReactNode } from "react";

type StorageKind = "rgba" | "grayscale" | "indexed";
type CompositeMode = "over" | "additive";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

const SWATCHES = [
  COLORS.accent,
  COLORS.success,
  COLORS.warning,
  COLORS.secondary,
];

function ImageGrid({
  x,
  y,
  cellSize,
  kind,
  alpha = 1,
  cols = 4,
  rows = 3,
}: {
  x: number;
  y: number;
  cellSize: number;
  kind: StorageKind;
  alpha?: number;
  cols?: number;
  rows?: number;
}) {
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, index) => {
        const color =
          kind === "grayscale"
            ? COLORS.secondary
            : kind === "indexed"
              ? SWATCHES[index % 2]
              : SWATCHES[index % SWATCHES.length];
        const opacity =
          kind === "grayscale"
            ? 0.3 + (index % 4) / 5
            : alpha * (0.62 + (index % 3) * 0.12);
        const cellX = x + (index % cols) * cellSize;
        const cellY = y + Math.floor(index / cols) * cellSize;
        return (
          <rect
            key={`pixel-${index}`}
            x={cellX}
            y={cellY}
            width={cellSize}
            height={cellSize}
            fill={color}
            fillOpacity={opacity}
            stroke={COLORS.border}
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

export function Cgp17ImageRepresentationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="图像表示图：像素网格由颜色通道、位深、行跨度和存储布局共同定义">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            image representation：像素之外还有通道与布局
          </text>
          <rect
            x="38"
            y="68"
            width="318"
            height="224"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <ImageGrid x={66} y={108} cellSize={48} kind="rgba" />
          <text x="66" y="270" fontSize="13" fill={COLORS.accent}>
            pixel grid：每格保存一个位置
          </text>
          <text x="66" y="292" fontSize="12" fill={COLORS.secondary}>
            row stride → 下一行从哪里开始
          </text>
          <rect
            x="394"
            y="68"
            width="288"
            height="224"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="420"
            y="106"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            一个像素的契约
          </text>
          {[
            ["R / G / B", COLORS.accent, "颜色通道"],
            ["A", COLORS.warning, "透明度或覆盖权重"],
            ["8 bit", COLORS.success, "每通道精度"],
            ["layout", COLORS.secondary, "行列与排列方式"],
          ].map(([label, color, detail], index) => (
            <g key={label}>
              <circle cx="430" cy={140 + index * 34} r="7" fill={color} />
              <text
                x="448"
                y={145 + index * 34}
                fontSize="12"
                fill={COLORS.text}
              >
                {label}
              </text>
              <text
                x="530"
                y={145 + index * 34}
                fontSize="12"
                fill={COLORS.secondary}
              >
                {detail}
              </text>
            </g>
          ))}
          <text
            x="538"
            y="270"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            同一张图可用不同格式表达
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图像表示把视觉目标拆成像素位置、颜色通道、精度与内存布局。
      </figcaption>
    </figure>
  );
}

export function Cgp17CompositingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="图像合成图：前景颜色和 alpha 与背景结合，得到输出像素">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            image compositing：两层颜色如何变成一个结果
          </text>
          <rect
            x="38"
            y="94"
            width="150"
            height="148"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="113"
            y="126"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.secondary}
          >
            背景 B
          </text>
          <rect
            x="64"
            y="148"
            width="98"
            height="58"
            rx="8"
            fill={COLORS.accent}
            fillOpacity="0.45"
          />
          <text
            x="113"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            已有画面
          </text>
          <rect
            x="224"
            y="94"
            width="150"
            height="148"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="299"
            y="126"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            前景 F
          </text>
          <rect
            x="250"
            y="148"
            width="98"
            height="58"
            rx="8"
            fill={COLORS.warning}
            fillOpacity="0.65"
          />
          <text
            x="299"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            颜色 + alpha
          </text>
          <Arrow x1={190} y1={168} x2={210} y2={168} color={COLORS.accent} />
          <Arrow x1={376} y1={168} x2={396} y2={168} color={COLORS.warning} />
          <rect
            x="408"
            y="94"
            width="274"
            height="148"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="545"
            y="126"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            输出 O
          </text>
          <rect
            x="438"
            y="148"
            width="98"
            height="58"
            rx="8"
            fill={COLORS.accent}
            fillOpacity="0.3"
          />
          <rect
            x="500"
            y="148"
            width="98"
            height="58"
            rx="8"
            fill={COLORS.warning}
            fillOpacity="0.45"
          />
          <text
            x="640"
            y="174"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            over 规则
          </text>
          <text
            x="545"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            O = alpha × F + (1 − alpha) × B
          </text>
          <text
            x="360"
            y="302"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            合成顺序、alpha 语义和颜色空间必须一起约定
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        合成不是简单相加；前景 alpha 的意义取决于混合规则与颜色空间。
      </figcaption>
    </figure>
  );
}

export function Cgp17ImagePipelineDiagram() {
  const boxes = [
    [34, "采集", "像素 / 通道", COLORS.warning],
    [204, "编码", "format / bits", COLORS.accent],
    [374, "存储", "stride / buffer", COLORS.secondary],
    [544, "合成与显示", "layers → frame", COLORS.success],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="图像管线图：图像从采集到编码、存储、合成和显示，每一步都可能改变证据">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            从 image representation 到 image compositing
          </text>
          {boxes.map(([x, title, detail, color], index) => (
            <g key={title}>
              <rect
                x={x}
                y="100"
                width="140"
                height="118"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <circle cx={x + 28} cy="132" r="8" fill={color} />
              <text
                x={x + 46}
                y="137"
                fontSize="14"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title}
              </text>
              <text x={x + 18} y="178" fontSize="12" fill={COLORS.secondary}>
                {detail}
              </text>
              <text x={x + 18} y="200" fontSize="12" fill={color}>
                {index === 3 ? "输出" : "转换"}
              </text>
              {index < boxes.length - 1 ? (
                <Arrow
                  x1={x + 148}
                  y1={159}
                  x2={x + 164}
                  y2={159}
                  color={COLORS.accent}
                />
              ) : null}
            </g>
          ))}
          <rect
            x="96"
            y="264"
            width="528"
            height="42"
            rx="12"
            fill="var(--bg)"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="290"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            调试时沿管线保留格式、alpha、stride 和合成顺序
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图像问题要沿表示、存储和合成管线定位，而不是只看最终截图。
      </figcaption>
    </figure>
  );
}

function CompositeGrid({
  kind,
  alpha,
  mode,
}: {
  kind: StorageKind;
  alpha: number;
  mode: CompositeMode;
}) {
  const cells = Array.from({ length: 24 }, (_, index) => {
    const background = SWATCHES[index % SWATCHES.length];
    const foreground = SWATCHES[(index + 2) % SWATCHES.length];
    return { background, foreground, index };
  });
  return (
    <g>
      {cells.map(({ background, foreground, index }) => {
        const x = 60 + (index % 6) * 48;
        const y = 104 + Math.floor(index / 6) * 40;
        const fill =
          kind === "grayscale"
            ? COLORS.secondary
            : mode === "additive"
              ? foreground
              : foreground;
        const fillOpacity =
          kind === "indexed"
            ? index % 3 === 0
              ? 0.9
              : 0.55
            : mode === "additive"
              ? Math.min(1, alpha + 0.25)
              : alpha;
        return (
          <g key={`composite-pixel-${index}`}>
            <rect
              x={x}
              y={y}
              width="48"
              height="40"
              fill={background}
              fillOpacity="0.32"
              stroke={COLORS.border}
              strokeWidth="1"
            />
            <rect
              x={x + 7}
              y={y + 6}
              width="34"
              height="28"
              fill={fill}
              fillOpacity={fillOpacity}
            />
          </g>
        );
      })}
    </g>
  );
}

export function Cgp17ImageRepresentationLab() {
  const [kind, setKind] = useState<StorageKind>("rgba");
  const [mode, setMode] = useState<CompositeMode>("over");
  const [alpha, setAlpha] = useState(0.65);
  const [bits, setBits] = useState(8);
  const kindLabel = { rgba: "RGBA", grayscale: "灰度", indexed: "索引色" }[
    kind
  ];
  const modeLabel = mode === "over" ? "over" : "additive";
  const bytesPerPixel = kind === "rgba" ? 4 : 1;
  const estimatedBytes = 24 * bytesPerPixel + (kind === "indexed" ? 16 * 4 : 0);
  const precision = useMemo(() => Math.pow(2, bits), [bits]);

  function reset() {
    setKind("rgba");
    setMode("over");
    setAlpha(0.65);
    setBits(8);
  }

  return (
    <section
      aria-label="图像表示与合成专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-17-image-representation"
      data-unit-id="cgp-17"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ImageRepViz · pixels and layers
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让格式选择与合成结果同时可见
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把 RGBA 换成灰度或索引色后，内存、颜色精度和 image
            compositing 结果会如何变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图像表示实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择图像表示格式">
          {(
            [
              ["rgba", "RGBA"],
              ["grayscale", "灰度"],
              ["indexed", "索引色"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={kind === value}
              onClick={() => setKind(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${kind === value ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择图像合成模式">
          {(
            [
              ["over", "alpha over"],
              ["additive", "additive"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${mode === value ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>foreground alpha</span>
              <span className="font-mono text-primary">{alpha.toFixed(2)}</span>
            </span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={alpha}
              onChange={(event) => setAlpha(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>每通道位深</span>
              <span className="font-mono text-primary">{bits}</span>
            </span>
            <input
              type="range"
              min="4"
              max="12"
              step="1"
              value={bits}
              onChange={(event) => setBits(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <SvgFrame label="可调图像表示与合成实验：切换 RGBA、灰度和索引色，改变 alpha、位深与合成模式">
            <text
              x="28"
              y="32"
              fontSize="16"
              fontWeight="700"
              fill={COLORS.text}
            >
              live image：格式与层叠规则留下屏幕证据
            </text>
            <rect
              x="42"
              y="64"
              width="360"
              height="246"
              rx="14"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <CompositeGrid kind={kind} alpha={alpha} mode={mode} />
            <text x="64" y="294" fontSize="12" fill={COLORS.secondary}>
              背景层 + foreground 层 → composite 输出
            </text>
            <rect
              x="432"
              y="70"
              width="254"
              height="226"
              rx="14"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x="456"
              y="108"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.text}
            >
              当前表示
            </text>
            <text x="456" y="142" fontSize="13" fill={COLORS.accent}>
              格式：{kindLabel}
            </text>
            <text x="456" y="174" fontSize="13" fill={COLORS.warning}>
              合成：{modeLabel}
            </text>
            <text x="456" y="206" fontSize="13" fill={COLORS.secondary}>
              alpha：{alpha.toFixed(2)}
            </text>
            <text x="456" y="238" fontSize="13" fill={COLORS.success}>
              等级：{precision}
            </text>
            <text
              x="559"
              y="270"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              估计样本：{estimatedBytes} bytes
            </text>
            <text
              x="360"
              y="338"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              一次只改变一个条件，才能解释颜色与内存变化
            </text>
          </SvgFrame>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前：{kindLabel} + {modeLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先固定 foreground 和背景，再改变格式或
            alpha；若结果异常，回到通道、位深和合成顺序检查。
          </p>
        </div>
      </div>
    </section>
  );
}
