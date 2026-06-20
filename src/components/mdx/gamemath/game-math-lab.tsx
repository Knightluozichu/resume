"use client";

import { useMemo, useState } from "react";

import { add2, easeInOut, rotate2, scale2, type Vec2 } from "./animotor";

type GameMathMode =
  | "cartesian"
  | "vector"
  | "spaces"
  | "matrix"
  | "transform"
  | "projection"
  | "polar"
  | "rotation"
  | "quaternion"
  | "primitive"
  | "rendering"
  | "physics"
  | "curve"
  | "synthesis";

type GameMathLabProps = {
  mode?: GameMathMode;
  title?: string;
};

const MODE_LABELS: Record<GameMathMode, string> = {
  cartesian: "坐标格",
  vector: "向量箭头",
  spaces: "空间接力",
  matrix: "矩阵掰网格",
  transform: "SRT 顺序",
  projection: "投影压缩",
  polar: "极坐标",
  rotation: "欧拉旋转",
  quaternion: "四元数插值",
  primitive: "几何图元",
  rendering: "渲染数学",
  physics: "受力运动",
  curve: "曲线采样",
  synthesis: "全书地图",
};

export function GameMathLab({
  mode = "vector",
  title = MODE_LABELS[mode],
}: GameMathLabProps) {
  const [t, setT] = useState(0.58);
  const [angle, setAngle] = useState(38);
  const [scale, setScale] = useState(1.18);

  const radians = (angle * Math.PI) / 180;
  const eased = easeInOut(t);
  const source = useMemo<Vec2>(() => ({ x: 2.2, y: 1.15 }), []);
  const rotated = rotate2(source, radians);
  const transformed = add2(scale2(rotated, scale, 0.75 + eased), {
    x: mode === "transform" ? 0.7 : 0,
    y: mode === "transform" ? 0.35 : 0,
  });

  return (
    <section className="not-prose my-6 rounded-card border border-border bg-elevated p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">GameMath Lab</p>
          <h4 className="text-base font-semibold text-primary">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setT(0.58);
            setAngle(38);
            setScale(1.18);
          }}
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
        <svg
          viewBox="-180 -120 360 240"
          role="img"
          aria-label={`${title} 可视化`}
          className="aspect-[3/2] w-full rounded-card border border-border bg-bg"
        >
          <defs>
            <marker
              id="gamemath-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 8 4 0 8Z" className="fill-accent" />
            </marker>
            <marker
              id="gamemath-arrow-warn"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 8 4 0 8Z" className="fill-warning" />
            </marker>
          </defs>

          <Grid />
          {renderMode(mode, source, transformed, eased, radians)}
        </svg>

        <div className="flex flex-col justify-center gap-4">
          <Control
            label="进度"
            value={t}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={setT}
          />
          <Control
            label="角度"
            value={angle}
            min={-90}
            max={90}
            step={1}
            format={(v) => `${Math.round(v)} deg`}
            onChange={setAngle}
          />
          <Control
            label="尺度"
            value={scale}
            min={0.45}
            max={1.8}
            step={0.01}
            format={(v) => `${v.toFixed(2)}x`}
            onChange={setScale}
          />
          <p className="text-xs leading-5 text-secondary">
            拖动三个滑块，观察图里的点、箭头、坐标格或曲线如何同步变化。动画由轻量
            animotor 工具驱动，适合在章节里反复单步试错。
          </p>
        </div>
      </div>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs text-secondary">
      <span className="flex items-center justify-between gap-2">
        {label}
        <span className="font-mono text-primary">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
    </label>
  );
}

function Grid() {
  const ticks = [-120, -80, -40, 0, 40, 80, 120];
  return (
    <g>
      {ticks.map((x) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1="-100"
          x2={x}
          y2="100"
          className="stroke-border"
          strokeWidth="1"
        />
      ))}
      {[-80, -40, 0, 40, 80].map((y) => (
        <line
          key={`h-${y}`}
          x1="-140"
          y1={y}
          x2="140"
          y2={y}
          className="stroke-border"
          strokeWidth="1"
        />
      ))}
      <line x1="-150" y1="0" x2="150" y2="0" className="stroke-secondary" />
      <line x1="0" y1="100" x2="0" y2="-100" className="stroke-secondary" />
    </g>
  );
}

function renderMode(
  mode: GameMathMode,
  source: Vec2,
  transformed: Vec2,
  t: number,
  radians: number,
) {
  const p = toSvg(source);
  const q = toSvg(transformed);

  if (mode === "cartesian") {
    return (
      <g>
        <Point p={p} label={`(${source.x.toFixed(1)}, ${source.y.toFixed(1)})`} />
        <Line from={{ x: 0, y: 0 }} to={p} />
        <text x="-142" y="-84" className="fill-secondary text-[11px]">
          原点、轴向、单位刻度共同定义位置
        </text>
      </g>
    );
  }

  if (mode === "vector") {
    return (
      <g>
        <Line from={{ x: 0, y: 0 }} to={p} />
        <Line from={p} to={q} warn />
        <Point p={p} label="v" />
        <Point p={q} label="v + delta" warn />
        <text x="-142" y="-84" className="fill-secondary text-[11px]">
          向量能表示位置、位移、速度和方向
        </text>
      </g>
    );
  }

  if (mode === "spaces") {
    const stops = [
      { x: -110, y: 55, label: "模型" },
      { x: -35, y: 15, label: "世界" },
      { x: 40, y: -20, label: "观察" },
      { x: 110, y: -58, label: "裁剪" },
    ];
    return (
      <g>
        {stops.map((s, i) => (
          <g key={s.label}>
            <rect
              x={s.x - 24}
              y={s.y - 16}
              width="48"
              height="32"
              rx="6"
              className={i / (stops.length - 1) <= t ? "fill-accent-glow stroke-accent" : "fill-bg stroke-border"}
            />
            <text x={s.x} y={s.y + 4} textAnchor="middle" className="fill-primary text-[11px]">
              {s.label}
            </text>
            {i < stops.length - 1 && (
              <Line
                from={{ x: s.x + 27, y: s.y }}
                to={{ x: stops[i + 1].x - 27, y: stops[i + 1].y }}
              />
            )}
          </g>
        ))}
      </g>
    );
  }

  if (mode === "matrix" || mode === "transform") {
    const i = toSvg(rotate2({ x: 2.1, y: 0 }, radians));
    const j = toSvg(rotate2({ x: 0, y: 1.6 + t }, radians));
    return (
      <g>
        <Line from={{ x: 0, y: 0 }} to={i} />
        <Line from={{ x: 0, y: 0 }} to={j} warn />
        <Line from={{ x: 0, y: 0 }} to={q} />
        <Point p={q} label={mode === "matrix" ? "M*v" : "T*R*S*v"} />
        <text x="-142" y="-84" className="fill-secondary text-[11px]">
          矩阵的列就是基向量被掰到的新位置
        </text>
      </g>
    );
  }

  if (mode === "projection") {
    const depth = 1 + t * 3;
    const near = { x: q.x / depth, y: q.y / depth };
    return (
      <g>
        <polygon points="-120,75 120,75 60,-55 -60,-55" className="fill-accent-glow stroke-accent" />
        <Line from={{ x: 0, y: 90 }} to={q} />
        <Line from={q} to={near} warn />
        <Point p={q} label="空间点" />
        <Point p={near} label="屏幕点" warn />
      </g>
    );
  }

  if (mode === "polar" || mode === "rotation" || mode === "quaternion") {
    const r = 62 + t * 32;
    const a = radians + (mode === "quaternion" ? t * 1.2 : 0);
    const end = { x: Math.cos(a) * r, y: -Math.sin(a) * r };
    return (
      <g>
        <circle cx="0" cy="0" r={r} className="fill-none stroke-border" />
        <path d={`M ${r} 0 A ${r} ${r} 0 0 0 ${end.x} ${end.y}`} className="fill-none stroke-warning" strokeWidth="3" />
        <Line from={{ x: 0, y: 0 }} to={end} />
        <Point p={end} label={mode === "polar" ? "(r,theta)" : mode === "quaternion" ? "slerp" : "yaw/pitch"} />
        <text x="-142" y="-84" className="fill-secondary text-[11px]">
          旋转要同时关心角度、轴向和插值路径
        </text>
      </g>
    );
  }

  if (mode === "primitive" || mode === "rendering") {
    const a = { x: -86, y: 60 };
    const b = { x: 88, y: 56 };
    const c = { x: 12 + t * 44, y: -68 };
    return (
      <g>
        <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`} className="fill-accent-glow stroke-accent" strokeWidth="2" />
        <Line from={c} to={{ x: c.x + 46 * Math.cos(radians), y: c.y - 46 * Math.sin(radians) }} warn />
        <Point p={a} label="A" />
        <Point p={b} label="B" />
        <Point p={c} label={mode === "primitive" ? "C" : "normal/light"} warn />
      </g>
    );
  }

  if (mode === "physics") {
    const ball = { x: -105 + t * 210, y: 62 - 95 * Math.sin(t * Math.PI) };
    return (
      <g>
        <path d="M -130 78 C -70 -55 70 -55 130 78" className="fill-none stroke-border" strokeWidth="2" />
        <Line from={ball} to={{ x: ball.x + 48, y: ball.y + 24 }} />
        <Line from={ball} to={{ x: ball.x, y: ball.y + 54 }} warn />
        <circle cx={ball.x} cy={ball.y} r="10" className="fill-accent stroke-accent" />
        <text x={ball.x + 14} y={ball.y - 10} className="fill-primary text-[11px]">速度/重力</text>
      </g>
    );
  }

  if (mode === "curve") {
    const x = -120 + t * 240;
    const y = 50 * Math.sin(t * Math.PI * 2);
    return (
      <g>
        <path d="M -120 55 C -70 -80 70 -80 120 55" className="fill-none stroke-accent" strokeWidth="3" />
        <path d="M -120 55 L -70 -80 L 70 -80 L 120 55" className="fill-none stroke-border" strokeDasharray="5 5" />
        <Point p={{ x, y }} label="采样点" />
      </g>
    );
  }

  return (
    <g>
      {["坐标", "向量", "矩阵", "变换", "旋转", "几何", "光照", "力学", "曲线"].map((label, i) => {
        const x = -116 + (i % 3) * 116;
        const y = -62 + Math.floor(i / 3) * 62;
        return (
          <g key={label}>
            <rect x={x - 35} y={y - 18} width="70" height="36" rx="8" className={i / 8 <= t ? "fill-accent-glow stroke-accent" : "fill-bg stroke-border"} />
            <text x={x} y={y + 4} textAnchor="middle" className="fill-primary text-[11px]">{label}</text>
          </g>
        );
      })}
    </g>
  );
}

function toSvg(v: Vec2): Vec2 {
  return { x: v.x * 36, y: -v.y * 36 };
}

function Line({
  from,
  to,
  warn = false,
}: {
  from: Vec2;
  to: Vec2;
  warn?: boolean;
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      className={warn ? "stroke-warning" : "stroke-accent"}
      strokeWidth="3"
      markerEnd={warn ? "url(#gamemath-arrow-warn)" : "url(#gamemath-arrow)"}
    />
  );
}

function Point({
  p,
  label,
  warn = false,
}: {
  p: Vec2;
  label: string;
  warn?: boolean;
}) {
  return (
    <g>
      <circle
        cx={p.x}
        cy={p.y}
        r="5"
        className={warn ? "fill-warning" : "fill-accent"}
      />
      <text x={p.x + 8} y={p.y - 8} className="fill-primary text-[11px]">
        {label}
      </text>
    </g>
  );
}

