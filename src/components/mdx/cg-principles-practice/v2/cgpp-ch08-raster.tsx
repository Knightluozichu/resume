"use client";

import { useMemo, useState } from "react";

type View = "coverage" | "interpolation" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "coverage",
    label: "覆盖测试",
    detail: "移动三角形边界，观察哪些采样点真正变成片段。",
  },
  {
    id: "interpolation",
    label: "属性插值",
    detail: "比较顶点属性在三角形内部的权重，理解颜色和深度如何平滑变化。",
  },
  {
    id: "throughput",
    label: "片段吞吐",
    detail: "增加采样数，比较并行片段和内存等待对光栅阶段的影响。",
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
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{value}</span>
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

function CoverageView({ coverage }: { coverage: number }) {
  const cells = Array.from({ length: 36 }, (_, index) => {
    const x = index % 6;
    const y = Math.floor(index / 6);
    const inside =
      y >= 1 && y <= 4 && x >= Math.round(coverage * 2) && x + y <= 7;
    return { inside, x, y };
  });
  const accepted = cells.filter((cell) => cell.inside).length;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        覆盖测试：几何边界决定片段数量
      </text>
      <rect
        x="38"
        y="76"
        width="338"
        height="226"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="62" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        采样网格
      </text>
      {cells.map((cell) => (
        <rect
          key={`coverage-${cell.x}-${cell.y}`}
          x={62 + cell.x * 45}
          y={126 + cell.y * 27}
          width="36"
          height="20"
          rx="4"
          fill={cell.inside ? "var(--accent)" : "var(--bg)"}
          opacity={cell.inside ? 0.82 : 1}
          stroke={cell.inside ? COLORS.accent : COLORS.border}
        />
      ))}
      <path
        d={`M84 ${250 - coverage * 44} L220 ${112 + coverage * 18} L350 ${246 + coverage * 16} Z`}
        fill="var(--success)"
        opacity="0.2"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <line
        x1="404"
        y1="184"
        x2="482"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch08-arrow)"
      />
      <rect
        x="504"
        y="76"
        width="222"
        height="226"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="528"
        y="110"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        阶段摘要
      </text>
      <text x="528" y="150" fontSize="14" fill={COLORS.success}>
        接受采样：{accepted}
      </text>
      <text x="528" y="184" fontSize="14" fill={COLORS.warning}>
        覆盖阈值：{coverage.toFixed(2)}
      </text>
      <text x="528" y="222" fontSize="13" fill={COLORS.secondary}>
        Light（光）只作用于接受后的片段。
      </text>
      <text x="528" y="250" fontSize="13" fill={COLORS.secondary}>
        边界外没有反射率输入。
      </text>
      <text x="28" y="328" fontSize="13" fill={COLORS.secondary}>
        图形管线：图元 → 覆盖 → 片段；先检查数量，再解释辐射度量和反射率。
      </text>
    </g>
  );
}

function InterpolationView({ coverage }: { coverage: number }) {
  const weight = Math.min(0.85, Math.max(0.15, coverage));
  const middleX = 146 + weight * 240;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        属性插值：片段继承顶点的约束
      </text>
      <path
        d="M92 256 L252 92 L412 256 Z"
        fill="var(--accent)"
        opacity="0.18"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <circle cx="92" cy="256" r="10" fill={COLORS.success} />
      <circle cx="252" cy="92" r="10" fill={COLORS.warning} />
      <circle cx="412" cy="256" r="10" fill={COLORS.accent} />
      <text x="68" y="282" fontSize="13" fill={COLORS.secondary}>
        A: 0.0
      </text>
      <text x="230" y="72" fontSize="13" fill={COLORS.secondary}>
        B: 1.0
      </text>
      <text x="388" y="282" fontSize="13" fill={COLORS.secondary}>
        C: 0.5
      </text>
      <circle cx={middleX} cy="182" r="9" fill={COLORS.success} />
      <line
        x1="92"
        y1="256"
        x2={middleX}
        y2="182"
        stroke={COLORS.success}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <line
        x1="252"
        y1="92"
        x2={middleX}
        y2="182"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <line
        x1="412"
        y1="256"
        x2={middleX}
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <rect
        x="492"
        y="82"
        width="234"
        height="192"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text
        x="516"
        y="116"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        重心权重
      </text>
      <text x="516" y="154" fontSize="14" fill={COLORS.success}>
        A：{(1 - weight).toFixed(2)}
      </text>
      <text x="516" y="184" fontSize="14" fill={COLORS.warning}>
        B：{weight.toFixed(2)}
      </text>
      <text x="516" y="214" fontSize="14" fill={COLORS.accent}>
        C：{(0.5 - weight / 4).toFixed(2)}
      </text>
      <text x="516" y="248" fontSize="13" fill={COLORS.secondary}>
        权重总和约束属性不跳变。
      </text>
      <text x="28" y="328" fontSize="13" fill={COLORS.secondary}>
        颜色、深度和法线都可插值，但每个属性仍要遵守自己的空间和范围。
      </text>
    </g>
  );
}

function ThroughputView({
  samples,
  coverage,
}: {
  samples: number;
  coverage: number;
}) {
  const active = Math.min(12, Math.max(4, samples));
  const waiting = Math.max(1, Math.round((1 - coverage) * 4));
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        光栅吞吐：并行片段仍会被访存拖慢
      </text>
      <rect
        x="34"
        y="76"
        width="294"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="110" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        片段队列
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index < waiting;
        const x = 58 + (index % 4) * 60;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`fragment-${index}`}
            x={x}
            y={y}
            width="42"
            height="26"
            rx="6"
            fill={
              blocked
                ? "var(--warning)"
                : enabled
                  ? "var(--accent)"
                  : "var(--bg)"
            }
            opacity={enabled ? 0.84 : 1}
            stroke={enabled ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <line
        x1="344"
        y1="182"
        x2="430"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch08-arrow)"
      />
      <rect
        x="452"
        y="76"
        width="274"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="110"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        执行证据
      </text>
      <text x="476" y="148" fontSize="14" fill={COLORS.success}>
        并行片段：{active}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待片段：{waiting}
      </text>
      <text x="476" y="216" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）提高吞吐。
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）暴露尾部。
      </text>
      <text x="476" y="272" fontSize="13" fill={COLORS.secondary}>
        先确认片段存在，再谈光照。
      </text>
      <text x="34" y="324" fontSize="13" fill={COLORS.secondary}>
        采样越多不一定越快；局部性和覆盖率决定有效工作量。
      </text>
    </g>
  );
}

export function CgppCh08RasterLab() {
  const [view, setView] = useState<View>("coverage");
  const [coverage, setCoverage] = useState(0.55);
  const [samples, setSamples] = useState(8);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("coverage");
    setCoverage(0.55);
    setSamples(8);
  }

  return (
    <section
      aria-label="光栅化专属片段实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch08-raster-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RasterViz · 覆盖与片段
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个采样点说明它为何成为片段
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把覆盖阈值或采样数调大时，哪一类证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置光栅化实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择光栅化观察视角">
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
            label="覆盖阈值"
            min={0.2}
            max={0.9}
            step={0.05}
            value={coverage}
            onChange={setCoverage}
          />
          <RangeControl
            label="采样数量"
            min={4}
            max={12}
            step={1}
            value={samples}
            onChange={setSamples}
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
                id="cgpp-ch08-arrow"
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
            {view === "coverage" ? (
              <CoverageView coverage={coverage} />
            ) : view === "interpolation" ? (
              <InterpolationView coverage={coverage} />
            ) : (
              <ThroughputView samples={samples} coverage={coverage} />
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
