"use client";

import { useMemo, useState } from "react";

type View = "orbit" | "projection" | "sampling";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "orbit",
    label: "视点与基向量",
    detail: "旋转视点，观察前向、右向和上向如何构成观察空间。",
  },
  {
    id: "projection",
    label: "投影与光线",
    detail: "改变视场角，比较透视投影中的近大远小与光线能量。",
  },
  {
    id: "sampling",
    label: "采样与执行",
    detail: "改变采样范围，观察并行任务与内存等待如何影响相机输出。",
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
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? "border-accent bg-accent/10 text-primary"
          : "border-border bg-background text-secondary hover:border-accent hover:text-primary"
      }`}
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

function OrbitView({ yaw, distance }: { yaw: number; distance: number }) {
  const radians = (yaw * Math.PI) / 180;
  const camera = {
    x: 166 + 116 * Math.sin(radians),
    y: 160 - 42 * Math.cos(radians),
  };
  const target = { x: 448, y: 174 };
  const length = Math.hypot(target.x - camera.x, target.y - camera.y) || 1;
  const right = {
    x: -(target.y - camera.y) / length,
    y: (target.x - camera.x) / length,
  };
  const up = { x: -right.y, y: right.x };

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        视点与基向量：相机不是一张贴图
      </text>
      <rect
        x="52"
        y="226"
        width="468"
        height="62"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <line
        x1="52"
        y1="226"
        x2="520"
        y2="226"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <circle
        cx={camera.x}
        cy={camera.y}
        r="18"
        fill={COLORS.accent}
        opacity="0.8"
      />
      <path
        d={`M${camera.x - 15} ${camera.y + 18} L${camera.x + 15} ${camera.y + 18} L${camera.x} ${camera.y + 42} Z`}
        fill={COLORS.accent}
      />
      <circle cx={target.x} cy={target.y} r="13" fill={COLORS.success} />
      <line
        x1={camera.x}
        y1={camera.y}
        x2={target.x}
        y2={target.y}
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <line
        x1={camera.x}
        y1={camera.y}
        x2={camera.x + 62 * right.x}
        y2={camera.y + 62 * right.y}
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <line
        x1={camera.x}
        y1={camera.y}
        x2={camera.x + 58 * up.x}
        y2={camera.y + 58 * up.y}
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <text
        x={camera.x - 24}
        y={camera.y - 26}
        fontSize="13"
        fill={COLORS.primary}
      >
        相机
      </text>
      <text
        x={target.x - 28}
        y={target.y - 20}
        fontSize="13"
        fill={COLORS.success}
      >
        目标
      </text>
      <text x="84" y="264" fontSize="13" fill={COLORS.secondary}>
        观察平面
      </text>
      <text x="548" y="96" fontSize="14" fill={COLORS.primary}>
        r = normalize(f × up)
      </text>
      <text x="548" y="130" fontSize="14" fill={COLORS.primary}>
        u = r × f
      </text>
      <text x="548" y="166" fontSize="13" fill={COLORS.secondary}>
        f 前向 · r 右向 · u 上向
      </text>
      <rect
        x="548"
        y="198"
        width="172"
        height="74"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="566" y="226" fontSize="13" fill={COLORS.primary}>
        偏航：{yaw}°
      </text>
      <text x="566" y="250" fontSize="13" fill={COLORS.secondary}>
        距离：{distance.toFixed(1)}
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        图形管线：观察空间 → 投影 → 像素；先验证相机，再解释最终颜色。
      </text>
    </g>
  );
}

function ProjectionView({ fov, distance }: { fov: number; distance: number }) {
  const halfHeight = Math.min(
    105,
    Math.max(34, 60 * Math.tan((fov * Math.PI) / 360)),
  );
  const near = {
    x: 302,
    top: 160 - halfHeight * 0.42,
    bottom: 160 + halfHeight * 0.42,
  };
  const far = { x: 570, top: 160 - halfHeight, bottom: 160 + halfHeight };
  const light = { x: 122, y: 88 };
  const surface = { x: 432, y: 160 };

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        投影与光线：视场角决定可见范围
      </text>
      <circle cx="116" cy="160" r="22" fill={COLORS.accent} opacity="0.85" />
      <line
        x1="116"
        y1="160"
        x2={near.x}
        y2={near.top}
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <line
        x1="116"
        y1="160"
        x2={near.x}
        y2={near.bottom}
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <line
        x1={near.x}
        y1={near.top}
        x2={far.x}
        y2={far.top}
        stroke={COLORS.success}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <line
        x1={near.x}
        y1={near.bottom}
        x2={far.x}
        y2={far.bottom}
        stroke={COLORS.success}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <line
        x1={far.x}
        y1={far.top}
        x2={far.x}
        y2={far.bottom}
        stroke={COLORS.border}
        strokeWidth="3"
      />
      <line
        x1={near.x}
        y1={near.top}
        x2={near.x}
        y2={near.bottom}
        stroke={COLORS.border}
        strokeWidth="3"
      />
      <circle cx={surface.x} cy={surface.y} r="9" fill={COLORS.warning} />
      <line
        x1={light.x}
        y1={light.y}
        x2={surface.x}
        y2={surface.y}
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <text x="88" y="196" fontSize="13" fill={COLORS.primary}>
        相机
      </text>
      <text x="274" y="146" fontSize="13" fill={COLORS.secondary}>
        近裁剪面
      </text>
      <text x="516" y="146" fontSize="13" fill={COLORS.secondary}>
        远裁剪面
      </text>
      <text x="92" y="64" fontSize="13" fill={COLORS.warning}>
        光源
      </text>
      <text x="446" y="194" fontSize="13" fill={COLORS.primary}>
        表面
      </text>
      <text x="536" y="84" fontSize="14" fill={COLORS.primary}>
        p′ = P V p
      </text>
      <text x="536" y="118" fontSize="13" fill={COLORS.secondary}>
        距离越远，同样大小的物体投影越小。
      </text>
      <rect
        x="536"
        y="208"
        width="190"
        height="76"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="554" y="236" fontSize="13" fill={COLORS.primary}>
        视场角：{fov}°
      </text>
      <text x="554" y="260" fontSize="13" fill={COLORS.secondary}>
        目标距离：{distance.toFixed(1)}
      </text>
      <text x="28" y="326" fontSize="13" fill={COLORS.secondary}>
        辐射度量描述到达表面的能量，反射率描述表面保留比例；相机只负责把结果投到视野。
      </text>
    </g>
  );
}

function SamplingView({ distance, fov }: { distance: number; fov: number }) {
  const sampleCount = Math.min(
    12,
    Math.max(4, Math.round(fov / 10 + distance / 2)),
  );
  const waitingCount = Math.max(1, Math.round((distance / 8) * 3));
  const samples = Array.from({ length: 12 }, (_, index) => ({
    active: index < sampleCount,
    waiting: index < waitingCount,
  }));

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware：相机采样也会等待
      </text>
      <rect
        x="34"
        y="78"
        width="280"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="112" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        视野采样
      </text>
      {samples.map((sample, index) => {
        const x = 58 + (index % 4) * 58;
        const y = 138 + Math.floor(index / 4) * 42;
        return (
          <rect
            key={`sample-${index}`}
            x={x}
            y={y}
            width="40"
            height="25"
            rx="6"
            fill={
              sample.waiting
                ? "var(--warning)"
                : sample.active
                  ? "var(--accent)"
                  : "var(--bg)"
            }
            opacity={sample.active ? 0.86 : 1}
            stroke={sample.active ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <line
        x1="330"
        y1="184"
        x2="420"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch05-arrow)"
      />
      <rect
        x="442"
        y="78"
        width="284"
        height="212"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="466"
        y="112"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        执行与访存
      </text>
      <text x="466" y="150" fontSize="14" fill={COLORS.success}>
        并行任务：{sampleCount}
      </text>
      <text x="466" y="180" fontSize="14" fill={COLORS.warning}>
        等待任务：{waitingCount}
      </text>
      <text x="466" y="218" fontSize="13" fill={COLORS.secondary}>
        Parallelism（并行性）填满执行单元。
      </text>
      <text x="466" y="246" fontSize="13" fill={COLORS.secondary}>
        memory latency（内存延迟）拉长尾部。
      </text>
      <text x="34" y="326" fontSize="13" fill={COLORS.secondary}>
        先检查采样是否独立，再检查访问是否局部；增加并行度不能跳过依赖。
      </text>
    </g>
  );
}

export function CgppCh05CameraLab() {
  const [view, setView] = useState<View>("orbit");
  const [yaw, setYaw] = useState(0);
  const [distance, setDistance] = useState(5);
  const [fov, setFov] = useState(60);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("orbit");
    setYaw(0);
    setDistance(5);
    setFov(60);
  }

  return (
    <section
      aria-label="相机与观察空间专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch05-camera-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · 相机契约
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把“看见什么”拆成可测量的量
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把相机转动、拉远或扩大视场角时，哪条边界会改变，哪一类等待会增加？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置相机与观察空间实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择相机观察视角">
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
            label="偏航角"
            min={-60}
            max={60}
            step={5}
            value={yaw}
            onChange={setYaw}
          />
          <RangeControl
            label="目标距离"
            min={2}
            max={8}
            step={0.5}
            value={distance}
            onChange={setDistance}
          />
          <RangeControl
            label="视场角"
            min={30}
            max={90}
            step={5}
            value={fov}
            onChange={setFov}
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
                id="cgpp-ch05-arrow"
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
            {view === "orbit" ? (
              <OrbitView yaw={yaw} distance={distance} />
            ) : view === "projection" ? (
              <ProjectionView fov={fov} distance={distance} />
            ) : (
              <SamplingView distance={distance} fov={fov} />
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
