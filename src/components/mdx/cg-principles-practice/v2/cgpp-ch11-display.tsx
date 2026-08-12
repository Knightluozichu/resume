"use client";

import { useMemo, useState } from "react";

type View = "scanout" | "transfer" | "sync";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "scanout",
    label: "扫描输出",
    detail: "移动扫描线，观察后缓冲如何逐行交给显示设备。",
  },
  {
    id: "transfer",
    label: "颜色传递",
    detail: "调节伽马参数，比较线性光能与显示编码之间的差异。",
  },
  {
    id: "sync",
    label: "刷新同步",
    detail: "改变刷新率和等待，观察帧延迟与撕裂风险如何变化。",
  },
];

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const display = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

function ScanoutView({ scanLine }: { scanLine: number }) {
  const scannedRows = Math.round(scanLine * 6);
  const complete = scannedRows === 6;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        扫描输出：显示设备逐行读取图像
      </text>
      <rect
        x="34"
        y="76"
        width="312"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Back Buffer
      </text>
      {Array.from({ length: 6 }, (_, row) => {
        const scanned = row < scannedRows;
        return (
          <rect
            key={`scan-row-${row}`}
            x="58"
            y={126 + row * 25}
            width="264"
            height="17"
            rx="4"
            fill={scanned ? "var(--accent)" : "var(--bg)"}
            opacity={scanned ? 0.82 : 1}
            stroke={scanned ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <line
        x1="58"
        y1={126 + scannedRows * 25}
        x2="322"
        y2={126 + scannedRows * 25}
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        已扫描行：{scannedRows} / 6
      </text>
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch11-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        Display Pipeline
      </text>
      <circle
        cx="492"
        cy="148"
        r="9"
        fill={complete ? COLORS.success : COLORS.warning}
      />
      <text
        x="516"
        y="154"
        fontSize="14"
        fill={complete ? COLORS.success : COLORS.warning}
      >
        {complete ? "一帧已完整送出" : "正在扫描后缓冲"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）先写入后缓冲。
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        扫描输出再把行交给显示器。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        未扫描区域仍可能属于上一帧。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        显示管线的时间顺序解释了为什么交换缓冲不能随意覆盖。
      </text>
    </g>
  );
}

function TransferView({ gamma }: { gamma: number }) {
  const input = 0.36;
  const encoded = Math.pow(input, 1 / gamma);
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        颜色传递：线性光能要经过显示编码
      </text>
      <rect
        x="34"
        y="76"
        width="206"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        线性输入
      </text>
      <rect
        x="58"
        y="132"
        width="158"
        height="72"
        rx="10"
        fill="var(--accent)"
        opacity={input}
      />
      <text x="78" y="174" fontSize="14" fill={COLORS.primary}>
        L = {input.toFixed(2)}
      </text>
      <text x="58" y="240" fontSize="13" fill={COLORS.secondary}>
        Light（光）的能量空间
      </text>
      <text x="58" y="270" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）
      </text>
      <line
        x1="260"
        y1="184"
        x2="334"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch11-arrow)"
      />
      <rect
        x="354"
        y="76"
        width="176"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="378"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        编码
      </text>
      <path
        d="M378 212 C414 158 470 158 506 132"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="4"
      />
      <text x="378" y="246" fontSize="13" fill={COLORS.secondary}>
        γ = {gamma.toFixed(2)}
      </text>
      <text x="378" y="274" fontSize="13" fill={COLORS.secondary}>
        Reflectance（反射率）已在材质阶段体现。
      </text>
      <line
        x1="548"
        y1="184"
        x2="584"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch11-arrow)"
      />
      <rect
        x="602"
        y="76"
        width="124"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="620"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        显示值
      </text>
      <rect
        x="620"
        y="132"
        width="88"
        height="72"
        rx="10"
        fill="var(--success)"
        opacity={Math.max(0.25, encoded)}
      />
      <text x="620" y="240" fontSize="13" fill={COLORS.secondary}>
        D = {encoded.toFixed(2)}
      </text>
      <text x="620" y="270" fontSize="13" fill={COLORS.secondary}>
        面板可见信号
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        编码改变数值表示，不应被误认为重新计算光照。
      </text>
    </g>
  );
}

function SyncView({ refresh, latency }: { refresh: number; latency: number }) {
  const frameMs = 1000 / refresh;
  const safe = latency <= frameMs;
  const queued = Math.min(3, Math.max(1, Math.ceil(latency / frameMs)));
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        刷新同步：帧完成还要赶上显示节拍
      </text>
      <rect
        x="34"
        y="76"
        width="314"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Frame Queue
      </text>
      {Array.from({ length: 3 }, (_, index) => {
        const active = index < queued;
        return (
          <rect
            key={`queue-frame-${index}`}
            x={58 + index * 78}
            y="146"
            width="58"
            height="58"
            rx="9"
            fill={active ? "var(--accent)" : "var(--bg)"}
            opacity={active ? 0.82 : 1}
            stroke={active ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <text x="66" y="182" fontSize="13" fill={COLORS.primary}>
        Fₙ
      </text>
      <text x="144" y="182" fontSize="13" fill={COLORS.primary}>
        Fₙ₊₁
      </text>
      <text x="222" y="182" fontSize="13" fill={COLORS.primary}>
        Fₙ₊₂
      </text>
      <text x="58" y="244" fontSize="13" fill={COLORS.secondary}>
        刷新率：{refresh} Hz · 周期：{frameMs.toFixed(1)} ms
      </text>
      <text x="58" y="272" fontSize="13" fill={COLORS.secondary}>
        呈现延迟：{latency.toFixed(1)} ms
      </text>
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch11-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        VSync 判定
      </text>
      <circle
        cx="492"
        cy="148"
        r="9"
        fill={safe ? COLORS.success : COLORS.warning}
      />
      <text
        x="516"
        y="154"
        fontSize="14"
        fill={safe ? COLORS.success : COLORS.warning}
      >
        {safe ? "等待可落在刷新间隔内" : "可能错过刷新节拍"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）缩短渲染时间。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）会推迟交接。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        垂直同步改变呈现时机，不会修复颜色或几何内容本身。
      </text>
    </g>
  );
}

export function CgppCh11DisplayLab() {
  const [view, setView] = useState<View>("scanout");
  const [scanLine, setScanLine] = useState(0.5);
  const [gamma, setGamma] = useState(2.2);
  const [refresh, setRefresh] = useState(60);
  const [latency, setLatency] = useState(8);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("scanout");
    setScanLine(0.5);
    setGamma(2.2);
    setRefresh(60);
    setLatency(8);
  }

  return (
    <section
      aria-label="显示管线专属扫描与同步实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch11-display-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 DisplayViz · 扫描、编码与同步
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一帧图像说明它如何被读取、转换、呈现
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变扫描位置、伽马或刷新等待时，哪一类显示证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置显示管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择显示管线观察视角">
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="扫描进度"
            min={0}
            max={1}
            step={0.05}
            value={scanLine}
            onChange={setScanLine}
          />
          <RangeControl
            label="伽马值"
            min={1.2}
            max={3}
            step={0.05}
            value={gamma}
            onChange={setGamma}
          />
          <RangeControl
            label="刷新率"
            min={30}
            max={144}
            step={30}
            value={refresh}
            onChange={setRefresh}
          />
          <RangeControl
            label="呈现延迟"
            min={2}
            max={20}
            step={0.5}
            value={latency}
            onChange={setLatency}
          />
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 760 350"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch11-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width="760"
              height="350"
              rx="12"
              fill="var(--bg)"
            />
            {view === "scanout" ? (
              <ScanoutView scanLine={scanLine} />
            ) : view === "transfer" ? (
              <TransferView gamma={gamma} />
            ) : (
              <SyncView refresh={refresh} latency={latency} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
