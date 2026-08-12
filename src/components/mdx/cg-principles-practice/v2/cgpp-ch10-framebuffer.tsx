"use client";

import { useMemo, useState } from "react";

type View = "attachments" | "resolve" | "present";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "attachments",
    label: "附件配置",
    detail: "切换颜色、深度和样本数，观察帧缓冲如何组织一次渲染的存储。",
  },
  {
    id: "resolve",
    label: "采样解析",
    detail: "改变多重采样数量，比较样本颜色如何汇聚成一个输出像素。",
  },
  {
    id: "present",
    label: "呈现交换",
    detail: "改变曝光和等待，追踪渲染目标从硬件到屏幕的交接。",
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

function AttachmentsView({ samples }: { samples: number }) {
  const complete = samples === 1 || samples === 4;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        附件配置：一帧画面由多种存储共同完成
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
        Framebuffer
      </text>
      <rect
        x="58"
        y="130"
        width="266"
        height="42"
        rx="8"
        fill="var(--accent)"
        opacity="0.24"
        stroke={COLORS.accent}
      />
      <text x="76" y="157" fontSize="14" fill={COLORS.primary}>
        Color Attachment · RGBA
      </text>
      <rect
        x="58"
        y="184"
        width="266"
        height="42"
        rx="8"
        fill="var(--success)"
        opacity="0.22"
        stroke={COLORS.success}
      />
      <text x="76" y="211" fontSize="14" fill={COLORS.primary}>
        Depth Attachment · Z
      </text>
      <rect
        x="58"
        y="238"
        width="266"
        height="36"
        rx="8"
        fill="var(--warning)"
        opacity="0.22"
        stroke={COLORS.warning}
      />
      <text x="76" y="262" fontSize="14" fill={COLORS.primary}>
        Samples：{samples}x
      </text>
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch10-arrow)"
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
        管线契约
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
        {complete ? "附件格式匹配" : "等待匹配样本格式"}
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        Graphics Pipeline（图形管线）
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        Light（光）写入颜色附件。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        深度附件保留可见性证据。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        帧缓冲不是单张图片，而是一次渲染所需附件的共同布局。
      </text>
    </g>
  );
}

function ResolveView({ samples }: { samples: number }) {
  const sampleValues = Array.from({ length: 4 }, (_, index) => {
    const base = 0.32 + index * 0.12;
    return samples === 1 ? base : Math.min(0.9, base + 0.05 * (index % 2));
  });
  const resolved =
    sampleValues.reduce((sum, value) => sum + value, 0) / sampleValues.length;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        采样解析：多个样本汇聚成一个像素
      </text>
      <rect
        x="34"
        y="76"
        width="342"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        MSAA 样本
      </text>
      {sampleValues.map((value, index) => (
        <g key={`sample-${index}`}>
          <text
            x="58"
            y={145 + index * 32}
            fontSize="13"
            fill={COLORS.secondary}
          >
            S{index + 1}
          </text>
          <rect
            x="94"
            y={130 + index * 32}
            width="210"
            height="20"
            rx="5"
            fill="var(--accent)"
            opacity={Math.max(0.25, value)}
            stroke={COLORS.accent}
          />
          <text
            x="316"
            y={145 + index * 32}
            fontSize="13"
            fill={COLORS.primary}
          >
            {value.toFixed(2)}
          </text>
        </g>
      ))}
      <line
        x1="392"
        y1="184"
        x2="432"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch10-arrow)"
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
        Resolve 输出
      </text>
      <rect
        x="476"
        y="132"
        width="226"
        height="66"
        rx="10"
        fill="var(--success)"
        opacity={Math.max(0.25, resolved)}
      />
      <text x="500" y="171" fontSize="15" fill={COLORS.primary}>
        Cᵣ = {resolved.toFixed(2)}
      </text>
      <text x="476" y="232" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）
      </text>
      <text x="476" y="262" fontSize="13" fill={COLORS.secondary}>
        Reflectance（反射率）进入颜色样本。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        解析改变采样的汇聚方式，不会重新生成被裁掉的片段。
      </text>
    </g>
  );
}

function PresentView({
  exposure,
  latency,
}: {
  exposure: number;
  latency: number;
}) {
  const signal = Math.max(0.1, Math.min(0.96, 1 - Math.exp(-exposure)));
  const ready = latency < 0.55;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        呈现交换：渲染目标必须安全交接到屏幕
      </text>
      <rect
        x="34"
        y="76"
        width="198"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        Render Target
      </text>
      <rect
        x="58"
        y="132"
        width="150"
        height="74"
        rx="10"
        fill="var(--accent)"
        opacity={signal}
      />
      <text x="78" y="174" fontSize="14" fill={COLORS.primary}>
        E = {exposure.toFixed(2)}
      </text>
      <text x="58" y="240" fontSize="13" fill={COLORS.secondary}>
        线性颜色 → 显示颜色
      </text>
      <text x="58" y="270" fontSize="13" fill={COLORS.secondary}>
        曝光后信号：{signal.toFixed(2)}
      </text>
      <line
        x1="250"
        y1="184"
        x2="332"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch10-arrow)"
      />
      <rect
        x="352"
        y="76"
        width="178"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="376"
        y="108"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        Swapchain
      </text>
      <rect
        x="376"
        y="132"
        width="130"
        height="50"
        rx="9"
        fill={ready ? "var(--success)" : "var(--warning)"}
        opacity="0.3"
        stroke={ready ? COLORS.success : COLORS.warning}
      />
      <text
        x="394"
        y="163"
        fontSize="14"
        fill={ready ? COLORS.success : COLORS.warning}
      >
        {ready ? "可呈现" : "等待前一帧"}
      </text>
      <text x="376" y="222" fontSize="13" fill={COLORS.secondary}>
        等待：{latency.toFixed(2)}
      </text>
      <text x="376" y="252" fontSize="13" fill={COLORS.secondary}>
        不要覆盖仍在扫描的图像。
      </text>
      <line
        x1="548"
        y1="184"
        x2="584"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch10-arrow)"
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
        屏幕
      </text>
      <rect
        x="620"
        y="132"
        width="88"
        height="74"
        rx="10"
        fill="var(--success)"
        opacity={ready ? signal : 0.15}
      />
      <text x="620" y="240" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）
      </text>
      <text x="620" y="268" fontSize="13" fill={COLORS.secondary}>
        latency：{latency.toFixed(2)}
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）会让 memory
        latency（内存延迟）显形。
      </text>
    </g>
  );
}

export function CgppCh10FramebufferLab() {
  const [view, setView] = useState<View>("attachments");
  const [samples, setSamples] = useState(4);
  const [exposure, setExposure] = useState(1.2);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("attachments");
    setSamples(4);
    setExposure(1.2);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="帧缓冲专属呈现实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch10-framebuffer-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 FramebufferViz · 附件、解析与呈现
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一帧画面说明它存在哪里、如何汇聚、何时交接
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变样本数、曝光或等待时，哪一段存储和输出证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置帧缓冲实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择帧缓冲观察视角">
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
            label="样本数"
            min={1}
            max={4}
            step={1}
            value={samples}
            onChange={setSamples}
          />
          <RangeControl
            label="曝光能量"
            min={0.2}
            max={2.4}
            step={0.05}
            value={exposure}
            onChange={setExposure}
          />
          <RangeControl
            label="呈现等待"
            min={0.1}
            max={0.9}
            step={0.01}
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
                id="cgpp-ch10-arrow"
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
            {view === "attachments" ? (
              <AttachmentsView samples={samples} />
            ) : view === "resolve" ? (
              <ResolveView samples={samples} />
            ) : (
              <PresentView exposure={exposure} latency={latency} />
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
