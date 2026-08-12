"use client";

import { useMemo, useState, type ReactNode } from "react";

type SignalKind = "smooth" | "edge";
type OperationKind = "convolution" | "fourier";

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

function pathFor(
  values: number[],
  x: number,
  y: number,
  width: number,
  height: number,
) {
  return values
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${x + (index / Math.max(1, values.length - 1)) * width} ${y + height / 2 - (value * height) / 2}`,
    )
    .join(" ");
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

function makeSignal(kind: SignalKind, count = 32) {
  return Array.from({ length: count }, (_, index) => {
    const t = index / (count - 1);
    if (kind === "edge") return t < 0.45 ? -0.35 : 0.55;
    return Math.sin(t * Math.PI * 2.4) * 0.52;
  });
}

function makeBlurred(signal: number[], radius: number) {
  return signal.map((_, index) => {
    let sum = 0;
    let weight = 0;
    for (let offset = -radius; offset <= radius; offset += 1) {
      const sample =
        signal[Math.max(0, Math.min(signal.length - 1, index + offset))];
      const w = radius + 1 - Math.abs(offset);
      sum += sample * w;
      weight += w;
    }
    return sum / weight;
  });
}

export function Cgp18SignalSamplingDiagram() {
  const smooth = makeSignal("smooth");
  const samples = smooth.filter((_, index) => index % 4 === 0);
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="信号采样图：连续信号经过有限采样后变成离散样本，采样间隔决定可保留的细节">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            signal processing：先问样本是否足够
          </text>
          <rect
            x="38"
            y="72"
            width="326"
            height="220"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={pathFor(smooth, 58, 112, 278, 124)}
            fill="none"
            stroke={COLORS.secondary}
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          {samples.map((value, index) => {
            const x = 58 + ((index * 4) / (smooth.length - 1)) * 278;
            const y = 112 + 62 - value * 62;
            return (
              <circle
                key={`sample-${index}`}
                cx={x}
                cy={y}
                r="6"
                fill={COLORS.accent}
              />
            );
          })}
          <text x="58" y="270" fontSize="13" fill={COLORS.secondary}>
            虚线：连续信号
          </text>
          <text x="58" y="290" fontSize="13" fill={COLORS.accent}>
            圆点：离散采样
          </text>
          <rect
            x="402"
            y="76"
            width="280"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="426"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            采样契约
          </text>
          <text x="426" y="150" fontSize="13" fill={COLORS.secondary}>
            采样率：多久测一次
          </text>
          <text x="426" y="182" fontSize="13" fill={COLORS.warning}>
            带宽：能保留多快的变化
          </text>
          <text x="426" y="214" fontSize="13" fill={COLORS.success}>
            重建：如何回到连续外观
          </text>
          <text
            x="542"
            y="258"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            采样不是复制，而是有损观察
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        信号处理从连续目标变成离散数据，采样率与重建规则共同决定可见细节。
      </figcaption>
    </figure>
  );
}

export function Cgp18FourierDiagram() {
  const time = makeSignal("smooth");
  const frequency = time.map((_, index) =>
    index === 3
      ? 0.9
      : index === 7
        ? 0.55
        : index === 12
          ? 0.28
          : 0.08 + (index % 3) * 0.02,
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="傅里叶变换图：时域信号可表示为不同频率分量的组合，频域峰值表示主要变化尺度">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            fourier transform：把变化拆成频率成分
          </text>
          <rect
            x="38"
            y="76"
            width="284"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="60"
            y="110"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            时域
          </text>
          <path
            d={pathFor(time, 60, 130, 238, 104)}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <text x="60" y="266" fontSize="13" fill={COLORS.secondary}>
            随时间变化的波形
          </text>
          <Arrow x1={334} y1={180} x2={386} y2={180} color={COLORS.accent} />
          <rect
            x="398"
            y="76"
            width="284"
            height="212"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="420"
            y="110"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            频域
          </text>
          <path
            d={pathFor(frequency, 420, 130, 238, 104)}
            fill="none"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text x="420" y="266" fontSize="13" fill={COLORS.secondary}>
            峰值：主要频率成分
          </text>
          <text
            x="360"
            y="326"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            时域看“什么时候变”，频域看“以什么尺度变”
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        傅里叶变换不是让信号消失，而是换一套坐标描述它的变化频率。
      </figcaption>
    </figure>
  );
}

export function Cgp18ConvolutionDiagram() {
  const signal = makeSignal("edge", 12);
  const kernel = [-0.25, 0, 0.5, 0, -0.25];
  const response = signal.map((_, index) =>
    kernel.reduce(
      (sum, value, offset) =>
        sum +
        value *
          signal[Math.max(0, Math.min(signal.length - 1, index + offset - 2))],
      0,
    ),
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="卷积图：小型卷积核在信号上滑动，每个位置的加权和形成输出响应">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            convolution：局部加权规则沿信号滑动
          </text>
          <rect
            x="38"
            y="78"
            width="208"
            height="210"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="58"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            输入 x
          </text>
          <path
            d={pathFor(signal, 58, 142, 168, 92)}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <rect
            x="128"
            y="142"
            width="48"
            height="92"
            fill={COLORS.warning}
            fillOpacity="0.18"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text x="58" y="264" fontSize="12" fill={COLORS.secondary}>
            局部窗口
          </text>
          <Arrow x1={260} y1={180} x2={294} y2={180} color={COLORS.warning} />
          <rect
            x="310"
            y="78"
            width="112"
            height="210"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="330"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            核 k
          </text>
          {kernel.map((value, index) => (
            <text
              key={`kernel-${index}`}
              x="334"
              y={150 + index * 26}
              fontSize="13"
              fill={value < 0 ? COLORS.warning : COLORS.success}
            >
              {value.toFixed(2)}
            </text>
          ))}
          <Arrow x1={438} y1={180} x2={472} y2={180} color={COLORS.success} />
          <rect
            x="488"
            y="78"
            width="194"
            height="210"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="510"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            输出 y = x * k
          </text>
          <path
            d={pathFor(response, 510, 142, 148, 92)}
            fill="none"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text x="510" y="264" fontSize="12" fill={COLORS.secondary}>
            核决定强调什么
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不同卷积核可以平滑、增强边缘或检测局部模式，关键是明确边界处理。
      </figcaption>
    </figure>
  );
}

export function Cgp18SignalProcessingLab() {
  const [signalKind, setSignalKind] = useState<SignalKind>("smooth");
  const [operation, setOperation] = useState<OperationKind>("convolution");
  const [kernelRadius, setKernelRadius] = useState(2);
  const [sampleRate, setSampleRate] = useState(8);
  const source = useMemo(() => makeSignal(signalKind), [signalKind]);
  const filtered = useMemo(
    () => makeBlurred(source, kernelRadius),
    [source, kernelRadius],
  );
  const spectrum = useMemo(
    () =>
      source.map((_, index) =>
        index === 3
          ? 0.9
          : index === 8
            ? 0.6
            : index === 13
              ? 0.32
              : 0.1 + (index % 3) * 0.02,
      ),
    [source],
  );
  const operationLabel =
    operation === "convolution" ? "convolution" : "fourier transform";
  const sampleCount = Math.round((32 / sampleRate) * 8);

  function reset() {
    setSignalKind("smooth");
    setOperation("convolution");
    setKernelRadius(2);
    setSampleRate(8);
  }

  return (
    <section
      aria-label="信号处理专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-18-signal-processing"
      data-unit-id="cgp-18"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 SignalViz · time and frequency
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让采样、卷积与频率响应留下证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把平滑信号换成边缘信号，卷积和 fourier transform
            的输出会分别强调什么？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置信号处理实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择输入信号">
          <button
            type="button"
            aria-pressed={signalKind === "smooth"}
            onClick={() => setSignalKind("smooth")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${signalKind === "smooth" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            平滑信号
          </button>
          <button
            type="button"
            aria-pressed={signalKind === "edge"}
            onClick={() => setSignalKind("edge")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${signalKind === "edge" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            边缘信号
          </button>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择信号操作">
          <button
            type="button"
            aria-pressed={operation === "convolution"}
            onClick={() => setOperation("convolution")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${operation === "convolution" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            convolution
          </button>
          <button
            type="button"
            aria-pressed={operation === "fourier"}
            onClick={() => setOperation("fourier")}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm ${operation === "fourier" ? "border-accent bg-accent/10 font-semibold text-primary" : "border-border text-secondary"}`}
          >
            fourier transform
          </button>
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>卷积核半径</span>
              <span className="font-mono text-primary">{kernelRadius}</span>
            </span>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={kernelRadius}
              onChange={(event) => setKernelRadius(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>采样率</span>
              <span className="font-mono text-primary">{sampleRate}</span>
            </span>
            <input
              type="range"
              min="4"
              max="16"
              step="1"
              value={sampleRate}
              onChange={(event) => setSampleRate(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <SvgFrame label="可调信号处理实验：切换平滑或边缘信号，选择卷积或傅里叶变换，并改变卷积核半径和采样率">
            <text
              x="28"
              y="32"
              fontSize="16"
              fontWeight="700"
              fill={COLORS.text}
            >
              live signal：同一输入在不同域留下不同证据
            </text>
            <rect
              x="42"
              y="70"
              width="360"
              height="240"
              rx="14"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x="64"
              y="106"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.text}
            >
              输入 / 输出
            </text>
            <path
              d={pathFor(source, 64, 132, 316, 70)}
              fill="none"
              stroke={COLORS.secondary}
              strokeWidth="3"
              strokeDasharray="7 5"
            />
            {operation === "convolution" ? (
              <path
                d={pathFor(filtered, 64, 132, 316, 70)}
                fill="none"
                stroke={COLORS.accent}
                strokeWidth="3"
              />
            ) : (
              <path
                d={pathFor(spectrum, 64, 132, 316, 70)}
                fill="none"
                stroke={COLORS.success}
                strokeWidth="3"
              />
            )}
            <rect
              x="432"
              y="72"
              width="254"
              height="236"
              rx="14"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x="456"
              y="110"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.text}
            >
              当前处理
            </text>
            <text x="456" y="144" fontSize="13" fill={COLORS.accent}>
              操作：{operationLabel}
            </text>
            <text x="456" y="176" fontSize="13" fill={COLORS.secondary}>
              输入：{signalKind === "smooth" ? "平滑" : "边缘"}
            </text>
            <text x="456" y="208" fontSize="13" fill={COLORS.warning}>
              核半径：{kernelRadius}
            </text>
            <text x="456" y="240" fontSize="13" fill={COLORS.success}>
              有效样本：{sampleCount}
            </text>
            <text
              x="559"
              y="278"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              虚线是输入，实线是处理后响应
            </text>
            <text
              x="360"
              y="338"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              先固定输入，再区分时域操作与频域观察
            </text>
          </SvgFrame>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前操作：{operationLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {operation === "convolution"
              ? "卷积核半径越大，局部响应覆盖范围越宽；观察边缘是否被保留。"
              : "fourier transform 把变化重新表示成频率成分；观察峰值而不是只看波形形状。"}
          </p>
        </div>
      </div>
    </section>
  );
}
