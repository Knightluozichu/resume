"use client";

import { useMemo, useState } from "react";

type Scene = "coordinates" | "light" | "hardware";

const SCENES: readonly { id: Scene; label: string; detail: string }[] = [
  {
    id: "coordinates",
    label: "坐标变换",
    detail: "拖动角度与尺度，观察同一个点如何从局部空间进入世界空间。",
  },
  {
    id: "light",
    label: "光照投影",
    detail: "让法线转向光源，观察点积如何把方向关系变成可用能量。",
  },
  {
    id: "hardware",
    label: "硬件调度",
    detail: "改变批次规模，比较并行任务与内存等待在一帧中的占比。",
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

function SceneButton({
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

function Slider({
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

function CoordinatesScene({ angle, scale }: { angle: number; scale: number }) {
  const radians = (angle * Math.PI) / 180;
  const point = { x: 126, y: 92 };
  const origin = { x: 112, y: 280 };
  const transformed = {
    x:
      origin.x +
      scale * (point.x * Math.cos(radians) - point.y * Math.sin(radians)),
    y:
      origin.y -
      scale * (point.x * Math.sin(radians) + point.y * Math.cos(radians)),
  };
  const axis = {
    x: origin.x + 125 * Math.cos(radians),
    y: origin.y - 125 * Math.sin(radians),
  };

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        坐标空间：先变换，再交给图形管线
      </text>
      <line
        x1="112"
        y1="280"
        x2="390"
        y2="280"
        stroke={COLORS.border}
        strokeWidth="2"
        markerEnd="url(#cgpp-ch04-axis)"
      />
      <line
        x1="112"
        y1="280"
        x2="112"
        y2="66"
        stroke={COLORS.border}
        strokeWidth="2"
        markerEnd="url(#cgpp-ch04-axis)"
      />
      <line
        x1={origin.x}
        y1={origin.y}
        x2={axis.x}
        y2={axis.y}
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <line
        x1={origin.x}
        y1={origin.y}
        x2={transformed.x}
        y2={transformed.y}
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <circle cx={origin.x} cy={origin.y} r="7" fill={COLORS.primary} />
      <circle
        cx={transformed.x}
        cy={transformed.y}
        r="10"
        fill={COLORS.success}
      />
      <circle
        cx={origin.x + point.x}
        cy={origin.y - point.y}
        r="8"
        fill={COLORS.accent}
      />
      <line
        x1={origin.x + point.x}
        y1={origin.y - point.y}
        x2={transformed.x}
        y2={transformed.y}
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <text x="122" y="302" fontSize="13" fill={COLORS.secondary}>
        世界原点
      </text>
      <text x="246" y="70" fontSize="13" fill={COLORS.accent}>
        局部方向
      </text>
      <text
        x={transformed.x + 14}
        y={transformed.y - 10}
        fontSize="13"
        fill={COLORS.success}
      >
        变换后点
      </text>
      <text x="424" y="106" fontSize="14" fill={COLORS.primary}>
        x′ = s R(θ) x + t
      </text>
      <text x="424" y="140" fontSize="13" fill={COLORS.secondary}>
        旋转改变方向，尺度改变距离，平移改变原点。
      </text>
      <text x="424" y="180" fontSize="13" fill={COLORS.secondary}>
        橙色虚线：同一点在两个空间中的对应。
      </text>
      <rect
        x="424"
        y="208"
        width="286"
        height="60"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="442" y="234" fontSize="13" fill={COLORS.primary}>
        当前角度：{angle}°
      </text>
      <text x="442" y="256" fontSize="13" fill={COLORS.secondary}>
        当前尺度：{scale.toFixed(1)} 倍
      </text>
    </g>
  );
}

function LightScene({ angle }: { angle: number }) {
  const normalAngle = (angle * Math.PI) / 180;
  const lightAngle = -35 * (Math.PI / 180);
  const dot = Math.max(0, Math.cos(normalAngle - lightAngle));
  const surface = { x: 266, y: 228 };
  const normalEnd = {
    x: surface.x + 118 * Math.cos(normalAngle),
    y: surface.y - 118 * Math.sin(normalAngle),
  };
  const lightEnd = {
    x: surface.x + 138 * Math.cos(lightAngle),
    y: surface.y - 138 * Math.sin(lightAngle),
  };

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        光照投影：点积把方向变成能量比例
      </text>
      <path
        d="M164 248 L376 248 L338 300 L202 300 Z"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <circle
        cx="120"
        cy="104"
        r="28"
        fill={COLORS.warning}
        opacity="0.5"
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text x="88" y="110" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        光源
      </text>
      <line
        x1="142"
        y1="122"
        x2={surface.x}
        y2={surface.y}
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <line
        x1={surface.x}
        y1={surface.y}
        x2={normalEnd.x}
        y2={normalEnd.y}
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <line
        x1={surface.x}
        y1={surface.y}
        x2={lightEnd.x}
        y2={lightEnd.y}
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <circle cx={surface.x} cy={surface.y} r="8" fill={COLORS.success} />
      <text x="246" y="326" fontSize="13" fill={COLORS.primary}>
        表面与法线
      </text>
      <text x="438" y="100" fontSize="14" fill={COLORS.primary}>
        E = Lᵢ ρ max(0, n · l)
      </text>
      <text x="438" y="134" fontSize="13" fill={COLORS.secondary}>
        方向越接近，点积越大；背光时能量不小于零。
      </text>
      <rect
        x="438"
        y="166"
        width="266"
        height="104"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="456" y="194" fontSize="13" fill={COLORS.primary}>
        方向夹角：{angle}°
      </text>
      <text x="456" y="220" fontSize="13" fill={COLORS.secondary}>
        点积：{dot.toFixed(2)}
      </text>
      <text x="456" y="276" fontSize="13" fill={COLORS.secondary}>
        辐射度量 × 反射率：表面输入
      </text>
      <rect
        x="456"
        y="238"
        width="218"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="456"
        y="238"
        width={218 * dot}
        height="12"
        rx="6"
        fill={COLORS.success}
      />
    </g>
  );
}

function HardwareScene({ scale }: { scale: number }) {
  const batch = Math.round(scale * 4);
  const cells = Array.from({ length: 12 }, (_, index) => {
    const active = index < Math.min(12, batch);
    const waiting = active && index % 4 === 3;
    return { active, waiting };
  });
  const activeCount = cells.filter((cell) => cell.active).length;
  const waitingCount = cells.filter((cell) => cell.waiting).length;

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        现代图形硬件：并行性不能抹掉内存延迟
      </text>
      <rect
        x="32"
        y="78"
        width="300"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="54" y="112" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        执行单元
      </text>
      {cells.map((cell, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 136 + Math.floor(index / 4) * 42;
        return (
          <rect
            key={`cell-${index}`}
            x={x}
            y={y}
            width="46"
            height="26"
            rx="6"
            fill={
              cell.waiting
                ? "var(--warning)"
                : cell.active
                  ? "var(--accent)"
                  : "var(--bg)"
            }
            opacity={cell.active ? 0.82 : 1}
            stroke={cell.active ? COLORS.accent : COLORS.border}
          />
        );
      })}
      <line
        x1="350"
        y1="182"
        x2="432"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch04-arrow)"
      />
      <rect
        x="452"
        y="78"
        width="272"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="476"
        y="112"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        访存与依赖
      </text>
      <text x="476" y="150" fontSize="14" fill={COLORS.success}>
        并行任务：{activeCount}
      </text>
      <text x="476" y="180" fontSize="14" fill={COLORS.warning}>
        等待任务：{waitingCount}
      </text>
      <text x="476" y="218" fontSize="13" fill={COLORS.secondary}>
        批次规模：{batch}
      </text>
      <text x="476" y="252" fontSize="13" fill={COLORS.secondary}>
        黄色格表示被内存延迟挡住。
      </text>
      <text x="32" y="326" fontSize="13" fill={COLORS.secondary}>
        先让相互独立的工作填满执行单元，再用局部性减少等待。
      </text>
    </g>
  );
}

export function CgppCh04MathLab() {
  const [scene, setScene] = useState<Scene>("coordinates");
  const [angle, setAngle] = useState(35);
  const [scale, setScale] = useState(1.1);
  const current = useMemo(
    () => SCENES.find((item) => item.id === scene) ?? SCENES[0],
    [scene],
  );

  function reset() {
    setScene("coordinates");
    setAngle(35);
    setScale(1.1);
  }

  return (
    <section
      aria-label="三维图形数学专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch04-math-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · 数学到吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一个公式留下可观察的证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把角度或尺度调大时，哪个量会改变，哪个量应该保持不变？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置三维图形数学实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择数学观察视角">
          {SCENES.map((item) => (
            <SceneButton
              key={item.id}
              active={scene === item.id}
              onClick={() => setScene(item.id)}
            >
              {item.label}
            </SceneButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <Slider
            label="方向角度"
            min={-90}
            max={90}
            step={5}
            value={angle}
            onChange={setAngle}
          />
          <Slider
            label="尺度 / 批次"
            min={0.5}
            max={3}
            step={0.1}
            value={scale}
            onChange={setScale}
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
                id="cgpp-ch04-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
              <marker
                id="cgpp-ch04-axis"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.border} />
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
            {scene === "coordinates" ? (
              <CoordinatesScene angle={angle} scale={scale} />
            ) : scene === "light" ? (
              <LightScene angle={angle} />
            ) : (
              <HardwareScene scale={scale} />
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
