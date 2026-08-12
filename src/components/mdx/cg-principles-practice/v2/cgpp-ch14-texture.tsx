"use client";

import { useMemo, useState } from "react";

type View = "mapping" | "mipmap" | "sampling";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "mapping",
    label: "纹理映射",
    detail: "移动 UV 坐标，观察纹理如何附着到几何表面并遵守边界模式。",
  },
  {
    id: "mipmap",
    label: "MipMap 层级",
    detail: "改变细节层级，比较远近表面应该读取哪一张预过滤图像。",
  },
  {
    id: "sampling",
    label: "采样与缓存",
    detail: "改变过滤强度和访问等待，比较采样质量与纹理缓存吞吐。",
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

function MappingView({ offset }: { offset: number }) {
  const u = 0.5 + (offset - 0.5) * 0.6;
  const v = 0.5 - (offset - 0.5) * 0.4;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        纹理映射：UV 坐标把图像贴到几何表面
      </text>
      <rect
        x="34"
        y="76"
        width="330"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        UV 纹理空间
      </text>
      {Array.from({ length: 16 }, (_, index) => {
        const x = index % 4;
        const y = Math.floor(index / 4);
        return (
          <rect
            key={`uv-cell-${index}`}
            x={58 + x * 58}
            y={126 + y * 32}
            width="48"
            height="24"
            rx="4"
            fill={(x + y) % 2 === 0 ? "var(--accent)" : "var(--success)"}
            opacity="0.42"
            stroke={COLORS.border}
          />
        );
      })}
      <circle
        cx={58 + u * 230}
        cy={126 + v * 128}
        r="8"
        fill={COLORS.warning}
        stroke={COLORS.warning}
      />
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        u={u.toFixed(2)}，v={v.toFixed(2)} · repeat 边界
      </text>
      <line
        x1="382"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch14-arrow)"
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
        图形交接
      </text>
      <text x="476" y="150" fontSize="14" fill={COLORS.success}>
        Graphics Pipeline（图形管线）
      </text>
      <text x="476" y="182" fontSize="13" fill={COLORS.secondary}>
        顶点属性插值出 UV。
      </text>
      <text x="476" y="214" fontSize="13" fill={COLORS.secondary}>
        Light（光）读取纹理材质。
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        Radiometry（辐射度量）与 Reflectance（反射率）
      </text>
      <text x="476" y="274" fontSize="13" fill={COLORS.secondary}>
        影响采样后的能量解释。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        纹理坐标描述“取哪一点”，不直接决定表面最终亮度。
      </text>
    </g>
  );
}

function MipmapView({ lod }: { lod: number }) {
  const level = Math.min(3, Math.max(0, Math.round(lod)));
  const sizes = [110, 78, 52, 30];
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        MipMap 层级：距离决定读取哪张预过滤图
      </text>
      <rect
        x="34"
        y="76"
        width="338"
        height="220"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="108" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        预过滤金字塔
      </text>
      {sizes.map((size, index) => {
        const x = 68 + index * 66;
        const y = 164 - size / 2;
        const active = index === level;
        return (
          <g key={`mipmap-level-${index}`}>
            <rect
              x={x}
              y={y}
              width={size}
              height={size}
              rx="6"
              fill={active ? "var(--accent)" : "var(--bg)"}
              opacity={active ? 0.78 : 0.46}
              stroke={active ? COLORS.warning : COLORS.border}
              strokeWidth={active ? 3 : 1}
            />
            <text x={x + 6} y="274" fontSize="13" fill={COLORS.secondary}>
              L{index}
            </text>
          </g>
        );
      })}
      <line
        x1="390"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch14-arrow)"
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
        层级判定
      </text>
      <circle cx="492" cy="148" r="9" fill={COLORS.success} />
      <text x="516" y="154" fontSize="14" fill={COLORS.success}>
        选择 L{level} · 尺寸 {sizes[level]}px
      </text>
      <text x="476" y="194" fontSize="13" fill={COLORS.secondary}>
        远处表面使用更小层级。
      </text>
      <text x="476" y="224" fontSize="13" fill={COLORS.secondary}>
        预过滤减少缩小时的闪烁。
      </text>
      <text x="476" y="254" fontSize="13" fill={COLORS.secondary}>
        各层仍保留同一材质语义。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        LOD 选择减少不必要的高频访问，但不会改变物体几何。
      </text>
    </g>
  );
}

function SamplingView({
  anisotropy,
  latency,
}: {
  anisotropy: number;
  latency: number;
}) {
  const active = Math.min(12, Math.max(4, Math.round(anisotropy * 6)));
  const waiting = Math.min(active, Math.max(1, Math.round(latency * 8)));
  const completed = active - waiting;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        采样与缓存：各向异性质量要付出访问代价
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
        纹理请求
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const enabled = index < active;
        const blocked = enabled && index >= completed;
        const x = 58 + (index % 4) * 62;
        const y = 136 + Math.floor(index / 4) * 43;
        return (
          <rect
            key={`texture-request-${index}`}
            x={x}
            y={y}
            width="44"
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
      <text x="58" y="278" fontSize="13" fill={COLORS.secondary}>
        各向异性级别：{anisotropy.toFixed(2)}
      </text>
      <line
        x1="364"
        y1="184"
        x2="430"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch14-arrow)"
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
        缓存证据
      </text>
      <text x="476" y="146" fontSize="14" fill={COLORS.success}>
        已完成请求：{completed}
      </text>
      <text x="476" y="178" fontSize="14" fill={COLORS.warning}>
        等待访问：{waiting}
      </text>
      <text x="476" y="214" fontSize="13" fill={COLORS.secondary}>
        Modern Graphics Hardware（现代图形硬件）
      </text>
      <text x="476" y="244" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）推进纹理请求。
      </text>
      <text x="476" y="274" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）暴露尾部。
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        先检查访问局部性，再决定是否提高过滤质量。
      </text>
    </g>
  );
}

export function CgppCh14TextureLab() {
  const [view, setView] = useState<View>("mapping");
  const [offset, setOffset] = useState(0.5);
  const [lod, setLod] = useState(1);
  const [anisotropy, setAnisotropy] = useState(1.4);
  const [latency, setLatency] = useState(0.35);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("mapping");
    setOffset(0.5);
    setLod(1);
    setAnisotropy(1.4);
    setLatency(0.35);
  }

  return (
    <section
      aria-label="纹理管线专属映射与采样实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch14-texture-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 TextureViz · UV、MipMap 与缓存
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个纹理请求说明它从哪里来、读哪一层、为何变慢
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变 UV、LOD 或访问等待时，哪一类纹理证据会先变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置纹理管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择纹理管线观察视角">
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
            label="UV 偏移"
            min={0.1}
            max={0.9}
            step={0.05}
            value={offset}
            onChange={setOffset}
          />
          <RangeControl
            label="LOD 层级"
            min={0}
            max={3}
            step={1}
            value={lod}
            onChange={setLod}
          />
          <RangeControl
            label="各向异性"
            min={1}
            max={2}
            step={0.05}
            value={anisotropy}
            onChange={setAnisotropy}
          />
          <RangeControl
            label="访问等待"
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
                id="cgpp-ch14-arrow"
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
            {view === "mapping" ? (
              <MappingView offset={offset} />
            ) : view === "mipmap" ? (
              <MipmapView lod={lod} />
            ) : (
              <SamplingView anisotropy={anisotropy} latency={latency} />
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
