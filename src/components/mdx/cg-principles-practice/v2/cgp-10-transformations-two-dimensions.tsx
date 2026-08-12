"use client";

import { useMemo, useState, type ReactNode } from "react";

type Order = "rotateThenTranslate" | "translateThenRotate";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

type Point = { x: number; y: number };

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

function Triangle({
  fill,
  points,
  stroke,
}: {
  fill: string;
  points: Point[];
  stroke: string;
}) {
  return (
    <polygon
      points={points.map((point) => `${point.x},${point.y}`).join(" ")}
      fill={fill}
      fillOpacity="0.16"
      stroke={stroke}
      strokeWidth="3"
    />
  );
}

function Axis({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line
        x1={x - 86}
        y1={y}
        x2={x + 86}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="1"
      />
      <line
        x1={x}
        y1={y - 86}
        x2={x}
        y2={y + 86}
        stroke={COLORS.border}
        strokeWidth="1"
      />
      <circle cx={x} cy={y} r="4" fill={COLORS.text} />
    </g>
  );
}

function rotate(point: Point, angle: number): Point {
  const radians = (angle * Math.PI) / 180;
  return {
    x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
    y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
  };
}

function scale(point: Point, factor: number): Point {
  return { x: point.x * factor, y: point.y * factor };
}

function translate(point: Point, dx: number, dy: number): Point {
  return { x: point.x + dx, y: point.y + dy };
}

function transformPoints(
  points: Point[],
  angle: number,
  factor: number,
  dx: number,
  order: Order,
) {
  return points.map((point) => {
    const scaled = scale(point, factor);
    return order === "rotateThenTranslate"
      ? translate(rotate(scaled, angle), dx, 0)
      : rotate(translate(scaled, dx, 0), angle);
  });
}

function VertexLabels({
  points,
  labels,
}: {
  points: Point[];
  labels: string[];
}) {
  return (
    <>
      {points.map((point, index) => (
        <g key={labels[index]}>
          <circle
            cx={point.x}
            cy={point.y}
            r="6"
            fill={index === 0 ? COLORS.warning : COLORS.accent}
          />
          <text
            x={point.x + 10}
            y={point.y - 9}
            fontSize="12"
            fill={COLORS.text}
          >
            {labels[index]}
          </text>
        </g>
      ))}
    </>
  );
}

export function Cgp10TransformChainDiagram() {
  const panels = [
    {
      x: 30,
      title: "原始点集",
      detail: "p",
      points: [
        { x: 78, y: 236 },
        { x: 122, y: 122 },
        { x: 176, y: 236 },
      ],
      color: COLORS.warning,
    },
    {
      x: 246,
      title: "旋转 + 缩放",
      detail: "R · S · p",
      points: [
        { x: 294, y: 238 },
        { x: 350, y: 124 },
        { x: 428, y: 208 },
      ],
      color: COLORS.accent,
    },
    {
      x: 462,
      title: "平移到目标",
      detail: "T · R · S · p",
      points: [
        { x: 510, y: 250 },
        { x: 566, y: 136 },
        { x: 644, y: 220 },
      ],
      color: COLORS.success,
    },
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="二维变换链：一个三角形依次经过缩放、旋转和平移">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            transformations in two dimensions：每一步都留下点集证据
          </text>
          {panels.map((panel, index) => (
            <g key={panel.title}>
              <rect
                x={panel.x}
                y="72"
                width="184"
                height="220"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <Axis x={panel.x + 92} y={190} />
              <Triangle
                fill={panel.color}
                points={panel.points}
                stroke={panel.color}
              />
              <VertexLabels points={panel.points} labels={["p₀", "p₁", "p₂"]} />
              <text
                x={panel.x + 92}
                y="318"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.text}
              >
                {panel.title}
              </text>
              <text
                x={panel.x + 92}
                y="340"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                {panel.detail}
              </text>
              {index < panels.length - 1 && (
                <>
                  <line
                    x1={panel.x + 190}
                    y1="180"
                    x2={panel.x + 208}
                    y2="180"
                    stroke={COLORS.accent}
                    strokeWidth="3"
                  />
                  <polygon
                    points={`${panel.x + 202},${172} ${panel.x + 216},180 ${panel.x + 202},188`}
                    fill={COLORS.accent}
                  />
                </>
              )}
            </g>
          ))}
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变换不是一次不可解释的“移动”，而是一条可记录中间点集的函数链。
      </figcaption>
    </figure>
  );
}

export function Cgp10AffineGridDiagram() {
  const leftLines = Array.from({ length: 4 }, (_, index) => 88 + index * 42);
  const rightLines = Array.from({ length: 4 }, (_, index) => 430 + index * 38);
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="仿射变换网格：平行线经过旋转、缩放和平移后仍保持直线和平行关系">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            affine transformation：形状改变，但直线关系有不变量
          </text>
          <rect
            x="44"
            y="68"
            width="276"
            height="226"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          {leftLines.map((x) => (
            <line
              key={`left-v-${x}`}
              x1={x}
              y1="84"
              x2={x}
              y2="278"
              stroke={COLORS.border}
              strokeWidth="1"
            />
          ))}
          {leftLines.map((y) => (
            <line
              key={`left-h-${y}`}
              x1="62"
              y1={y + 2}
              x2="302"
              y2={y + 2}
              stroke={COLORS.border}
              strokeWidth="1"
            />
          ))}
          <polygon
            points="100,236 166,122 260,236"
            fill={COLORS.warning}
            fillOpacity="0.14"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <text
            x="182"
            y="318"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            变换前：规则网格
          </text>
          <line
            x1="342"
            y1="180"
            x2="382"
            y2="180"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="374,170 394,180 374,190" fill={COLORS.accent} />
          <rect
            x="400"
            y="68"
            width="276"
            height="226"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          {rightLines.map((x, index) => (
            <line
              key={`right-v-${x}`}
              x1={x}
              y1={88 + index * 12}
              x2={x + 20}
              y2={274 - index * 12}
              stroke={COLORS.border}
              strokeWidth="1"
            />
          ))}
          {rightLines.map((y, index) => (
            <line
              key={`right-h-${y}`}
              x1="420"
              y1={y + 12}
              x2="654"
              y2={y - 34}
              stroke={COLORS.border}
              strokeWidth="1"
            />
          ))}
          <polygon
            points="476,236 532,122 626,236"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="538"
            y="318"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            变换后：直线仍是直线
          </text>
          <text
            x="360"
            y="344"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            平行性、共线性和比例关系是仿射变换的检查点
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        仿射变换可以旋转、缩放、剪切和移动，但不会把直线变成曲线。
      </figcaption>
    </figure>
  );
}

export function Cgp10OrderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="二维变换顺序对照：先旋转再平移与先平移再旋转得到不同位置">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            顺序不是排版：R 后 T 与 T 后 R 通常不同
          </text>
          <text
            x="188"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            先旋转，再平移
          </text>
          <Axis x={188} y={218} />
          <Triangle
            fill={COLORS.warning}
            points={[
              { x: 132, y: 248 },
              { x: 168, y: 156 },
              { x: 224, y: 248 },
            ]}
            stroke={COLORS.warning}
          />
          <Triangle
            fill={COLORS.success}
            points={[
              { x: 206, y: 260 },
              { x: 242, y: 168 },
              { x: 298, y: 260 },
            ]}
            stroke={COLORS.success}
          />
          <line
            x1="182"
            y1="206"
            x2="216"
            y2="206"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="208,196 228,206 208,216" fill={COLORS.accent} />
          <text
            x="188"
            y="304"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            平移向量保持在世界方向
          </text>
          <text
            x="532"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            先平移，再旋转
          </text>
          <Axis x={532} y={218} />
          <Triangle
            fill={COLORS.warning}
            points={[
              { x: 476, y: 248 },
              { x: 512, y: 156 },
              { x: 568, y: 248 },
            ]}
            stroke={COLORS.warning}
          />
          <Triangle
            fill={COLORS.accent}
            points={[
              { x: 472, y: 258 },
              { x: 508, y: 166 },
              { x: 564, y: 258 },
            ]
              .map((point) =>
                rotate({ x: point.x - 532, y: point.y - 218 }, 24),
              )
              .map((point) => ({ x: point.x + 532, y: point.y + 218 }))}
            stroke={COLORS.accent}
          />
          <line
            x1="528"
            y1="206"
            x2="518"
            y2="198"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="518,188 508,200 524,202" fill={COLORS.accent} />
          <text
            x="532"
            y="304"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            平移向量也被旋转
          </text>
          <text
            x="360"
            y="344"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            用中间点集验证顺序，而不是只比较最终截图
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一组操作换顺序就换了函数；调试时要把顺序当成输入的一部分。
      </figcaption>
    </figure>
  );
}

function InteractiveTransform({
  angle,
  factor,
  dx,
  order,
}: {
  angle: number;
  factor: number;
  dx: number;
  order: Order;
}) {
  const origin = { x: 174, y: 226 };
  const local = [
    { x: 0, y: -64 },
    { x: -62, y: 46 },
    { x: 62, y: 46 },
  ];
  const original = local.map((point) => ({
    x: origin.x + point.x,
    y: origin.y + point.y,
  }));
  const transformed = transformPoints(local, angle, factor, dx, order).map(
    (point) => ({ x: origin.x + point.x, y: origin.y + point.y }),
  );
  const second = order === "rotateThenTranslate" ? "T(R(S(p)))" : "R(T(S(p)))";
  return (
    <SvgFrame label="可调二维变换实验：改变角度、尺度、平移和操作顺序，观察三角形结果">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live transform：把变换顺序变成可见差异
      </text>
      <rect
        x="48"
        y="62"
        width="368"
        height="246"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Axis x={origin.x} y={origin.y} />
      <Triangle
        fill={COLORS.warning}
        points={original}
        stroke={COLORS.warning}
      />
      <Triangle
        fill={COLORS.accent}
        points={transformed}
        stroke={COLORS.accent}
      />
      <VertexLabels points={original} labels={["原₀", "原₁", "原₂"]} />
      <VertexLabels points={transformed} labels={["新₀", "新₁", "新₂"]} />
      <line
        x1={origin.x}
        y1={origin.y}
        x2={origin.x + dx}
        y2={origin.y}
        stroke={COLORS.success}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <text x="70" y="288" fontSize="13" fill={COLORS.secondary}>
        黄：原始点集 · 紫：变换结果
      </text>
      <rect
        x="444"
        y="72"
        width="250"
        height="218"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="466" y="108" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前链
      </text>
      <text x="466" y="144" fontSize="13" fill={COLORS.accent}>
        {second}
      </text>
      <text x="466" y="178" fontSize="13" fill={COLORS.secondary}>
        角度：{angle}°
      </text>
      <text x="466" y="206" fontSize="13" fill={COLORS.secondary}>
        尺度：{factor.toFixed(2)} 倍
      </text>
      <text x="466" y="234" fontSize="13" fill={COLORS.secondary}>
        平移 x：{dx}
      </text>
      <text x="466" y="272" fontSize="13" fill={COLORS.success}>
        中间值可逐步记录
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        只改一个参数，再核对方向、尺度和位置分别发生了什么
      </text>
    </SvgFrame>
  );
}

export function Cgp10TransformationsTwoDimensionsLab() {
  const [angle, setAngle] = useState(28);
  const [factor, setFactor] = useState(1.1);
  const [dx, setDx] = useState(70);
  const [order, setOrder] = useState<Order>("rotateThenTranslate");
  const currentOrder = useMemo(
    () => (order === "rotateThenTranslate" ? "先旋转再平移" : "先平移再旋转"),
    [order],
  );

  function reset() {
    setAngle(28);
    setFactor(1.1);
    setDx(70);
    setOrder("rotateThenTranslate");
  }

  return (
    <section
      aria-label="二维变换专属数学实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-10-transformations-two-dimensions"
      data-unit-id="cgp-10"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · 2D transforms
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让矩阵顺序留下几何证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把旋转角度调大时，平移向量会不会一起转？把缩放从 1 调到
            2，哪个量只改变距离？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置二维变换实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择二维变换顺序">
          {(
            [
              ["rotateThenTranslate", "先旋转再平移"],
              ["translateThenRotate", "先平移再旋转"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={order === value}
              onClick={() => setOrder(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                order === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>旋转角度</span>
              <span className="font-mono text-primary">{angle}°</span>
            </span>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>缩放比例</span>
              <span className="font-mono text-primary">
                {factor.toFixed(2)}
              </span>
            </span>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.01"
              value={factor}
              onChange={(event) => setFactor(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>平移 x</span>
              <span className="font-mono text-primary">{dx}</span>
            </span>
            <input
              type="range"
              min="-80"
              max="120"
              step="1"
              value={dx}
              onChange={(event) => setDx(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <InteractiveTransform
            angle={angle}
            factor={factor}
            dx={dx}
            order={order}
          />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前顺序：{currentOrder}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先记录原始点集，再记录每一步输出；如果只保存最终位置，就无法判断是顺序、尺度还是平移造成的差异。
          </p>
        </div>
      </div>
    </section>
  );
}
