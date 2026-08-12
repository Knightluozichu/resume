"use client";

import { useMemo, useState, type ReactNode } from "react";

type RenderMode = "ray" | "rasterization";

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

function Arrow({
  from,
  to,
  color,
  dashed = false,
}: {
  from: Point;
  to: Point;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const size = 9;
  const left = {
    x: to.x - size * Math.cos(angle - Math.PI / 6),
    y: to.y - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: to.x - size * Math.cos(angle + Math.PI / 6),
    y: to.y - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 5" : undefined}
      />
      <polygon
        points={`${to.x},${to.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

export function Cgp15RayCastingDiagram() {
  const rays = [
    { from: { x: 84, y: 108 }, to: { x: 290, y: 124 }, hit: false },
    { from: { x: 84, y: 168 }, to: { x: 234, y: 176 }, hit: true },
    { from: { x: 84, y: 228 }, to: { x: 290, y: 236 }, hit: false },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="光线投射图：从像素或相机发出射线，寻找与几何体的最近交点">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            ray casting：一条射线一次询问一个交点
          </text>
          <rect
            x="38"
            y="72"
            width="118"
            height="194"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="97"
            y="106"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            相机 / 像素
          </text>
          <line
            x1="118"
            y1="124"
            x2="118"
            y2="238"
            stroke={COLORS.border}
            strokeWidth="3"
          />
          {[124, 180, 236].map((y, index) => (
            <circle
              key={`pixel-${index}`}
              cx="118"
              cy={y}
              r="7"
              fill={index === 1 ? COLORS.accent : COLORS.secondary}
            />
          ))}
          <circle
            cx="286"
            cy="180"
            r="76"
            fill={COLORS.accent}
            fillOpacity="0.12"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <text
            x="286"
            y="184"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            几何体
          </text>
          {rays.map((ray, index) => (
            <g key={`ray-${index}`}>
              <Arrow
                from={ray.from}
                to={ray.to}
                color={ray.hit ? COLORS.warning : COLORS.secondary}
                dashed={!ray.hit}
              />
              {ray.hit ? (
                <circle
                  cx={ray.to.x}
                  cy={ray.to.y}
                  r="8"
                  fill={COLORS.warning}
                />
              ) : null}
            </g>
          ))}
          <rect
            x="412"
            y="76"
            width="270"
            height="190"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="438"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            交点查询
          </text>
          <text x="438" y="150" fontSize="13" fill={COLORS.secondary}>
            1. 生成 origin / direction
          </text>
          <text x="438" y="182" fontSize="13" fill={COLORS.warning}>
            2. 求最近 hit distance
          </text>
          <text x="438" y="214" fontSize="13" fill={COLORS.success}>
            3. 用法线与材质着色
          </text>
          <text
            x="547"
            y="248"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            没有交点就返回背景
          </text>
          <text
            x="360"
            y="320"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            每个像素独立追问：这条射线首先撞上了什么？
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        光线投射直接以交点为中心，适合表达可见性、反射和阴影等查询。
      </figcaption>
    </figure>
  );
}

function triangleContains(point: Point, triangle: [Point, Point, Point]) {
  const [a, b, c] = triangle;
  const sign = (p1: Point, p2: Point, p3: Point) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = sign(point, a, b);
  const d2 = sign(point, b, c);
  const d3 = sign(point, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

export function Cgp15RasterizationDiagram() {
  const triangle: [Point, Point, Point] = [
    { x: 70, y: 260 },
    { x: 220, y: 82 },
    { x: 370, y: 260 },
  ];
  const cells = Array.from({ length: 8 * 5 }, (_, index) => {
    const col = index % 8;
    const row = Math.floor(index / 8);
    const x = 60 + col * 40;
    const y = 76 + row * 38;
    return {
      x,
      y,
      inside: triangleContains({ x: x + 20, y: y + 19 }, triangle),
    };
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="光栅化图：三角形经过屏幕投影后，用边函数判断哪些像素中心在内部">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            rasterization：覆盖测试把图元变成片段
          </text>
          <rect
            x="38"
            y="64"
            width="350"
            height="230"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          {cells.map((cell, index) => (
            <rect
              key={`cell-${index}`}
              x={cell.x}
              y={cell.y}
              width="40"
              height="38"
              fill={cell.inside ? COLORS.accent : "transparent"}
              fillOpacity={cell.inside ? "0.2" : "1"}
              stroke={COLORS.border}
              strokeWidth="1"
            />
          ))}
          <polygon
            points={triangle.map((point) => `${point.x},${point.y}`).join(" ")}
            fill={COLORS.accent}
            fillOpacity="0.1"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <circle cx="220" cy="82" r="7" fill={COLORS.warning} />
          <circle cx="70" cy="260" r="7" fill={COLORS.warning} />
          <circle cx="370" cy="260" r="7" fill={COLORS.warning} />
          <text x="64" y="316" fontSize="13" fill={COLORS.secondary}>
            网格：屏幕像素中心
          </text>
          <text x="228" y="316" fontSize="13" fill={COLORS.accent}>
            高亮：通过覆盖测试的片段
          </text>
          <rect
            x="422"
            y="72"
            width="260"
            height="216"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="446"
            y="110"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            三角形填充
          </text>
          <text x="446" y="146" fontSize="13" fill={COLORS.secondary}>
            顶点 → 屏幕坐标
          </text>
          <text x="446" y="178" fontSize="13" fill={COLORS.warning}>
            边函数 → inside / outside
          </text>
          <text x="446" y="210" fontSize="13" fill={COLORS.success}>
            插值 → 深度与属性
          </text>
          <text
            x="552"
            y="258"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            片段随后进入深度与着色阶段
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        光栅化先判断图元覆盖了哪些屏幕样本，再为这些样本插值属性。
      </figcaption>
    </figure>
  );
}

export function Cgp15PipelineComparisonDiagram() {
  const rows = [
    ["ray casting", "射线与几何求交", "交点驱动", COLORS.warning],
    ["rasterization", "图元覆盖屏幕样本", "片段驱动", COLORS.accent],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="光线投射与光栅化对照：两条路径都从相机得到像素颜色，但中间查询不同">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            两条可见性路径：查询交点，或生成片段
          </text>
          {rows.map(([name, detail, output, color], index) => {
            const y = 82 + index * 108;
            return (
              <g key={name}>
                <rect
                  x="38"
                  y={y}
                  width="174"
                  height="76"
                  rx="12"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <text
                  x="58"
                  y={y + 31}
                  fontSize="14"
                  fontWeight="700"
                  fill={color}
                >
                  {name}
                </text>
                <text x="58" y={y + 56} fontSize="12" fill={COLORS.secondary}>
                  {detail}
                </text>
                <Arrow
                  from={{ x: 222, y: y + 38 }}
                  to={{ x: 282, y: y + 38 }}
                  color={color}
                />
                <rect
                  x="294"
                  y={y}
                  width="168"
                  height="76"
                  rx="12"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <text
                  x="318"
                  y={y + 31}
                  fontSize="14"
                  fontWeight="700"
                  fill={COLORS.text}
                >
                  中间证据
                </text>
                <text x="318" y={y + 56} fontSize="12" fill={color}>
                  {output}
                </text>
                <Arrow
                  from={{ x: 472, y: y + 38 }}
                  to={{ x: 532, y: y + 38 }}
                  color={color}
                />
                <rect
                  x="544"
                  y={y}
                  width="138"
                  height="76"
                  rx="12"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <text
                  x="568"
                  y={y + 31}
                  fontSize="14"
                  fontWeight="700"
                  fill={COLORS.text}
                >
                  像素颜色
                </text>
                <text x="568" y={y + 56} fontSize="12" fill={COLORS.secondary}>
                  depth + shade
                </text>
              </g>
            );
          })}
          <text
            x="360"
            y="324"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            选择路径时要看查询类型、硬件预算与需要的效果
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两种方法都能得到像素，但对可见性、采样和并行工作的组织方式不同。
      </figcaption>
    </figure>
  );
}

function RayScene({ resolution }: { resolution: number }) {
  const rays = Array.from({ length: resolution }, (_, index) => {
    const startY = 80 + (index / Math.max(1, resolution - 1)) * 190;
    const offset = (index - (resolution - 1) / 2) * 5;
    const hit = Math.abs(offset) < 25;
    return {
      startY,
      targetX: hit ? 304 + offset * 0.7 : 292 + offset * 0.4,
      targetY: 180 + offset * 1.3,
      hit,
    };
  });
  return (
    <>
      <rect
        x="44"
        y="64"
        width="360"
        height="246"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="64" y="96" fontSize="14" fontWeight="700" fill={COLORS.text}>
        ray casting：逐条查询
      </text>
      <line
        x1="110"
        y1="112"
        x2="110"
        y2="270"
        stroke={COLORS.border}
        strokeWidth="3"
      />
      {rays.map((ray, index) => (
        <g key={`live-ray-${index}`}>
          <circle
            cx="110"
            cy={ray.startY}
            r="5"
            fill={ray.hit ? COLORS.accent : COLORS.secondary}
          />
          <line
            x1="110"
            y1={ray.startY}
            x2={ray.targetX}
            y2={ray.targetY}
            stroke={ray.hit ? COLORS.warning : COLORS.secondary}
            strokeWidth={ray.hit ? "3" : "2"}
            strokeDasharray={ray.hit ? undefined : "6 4"}
          />
          {ray.hit ? (
            <circle
              cx={ray.targetX}
              cy={ray.targetY}
              r="6"
              fill={COLORS.warning}
            />
          ) : null}
        </g>
      ))}
      <circle
        cx="310"
        cy="180"
        r="72"
        fill={COLORS.accent}
        fillOpacity="0.12"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text
        x="310"
        y="184"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.accent}
      >
        nearest hit
      </text>
      <text x="64" y="294" fontSize="12" fill={COLORS.secondary}>
        命中 {rays.filter((ray) => ray.hit).length}/{resolution} 条
      </text>
    </>
  );
}

function RasterScene({ resolution }: { resolution: number }) {
  const columns = Math.max(4, Math.min(12, resolution));
  const rows = Math.max(4, Math.min(8, Math.round(resolution * 0.6)));
  const triangle: [Point, Point, Point] = [
    { x: 66, y: 270 },
    { x: 222, y: 90 },
    { x: 378, y: 270 },
  ];
  const cells = Array.from({ length: columns * rows }, (_, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const cellWidth = 312 / columns;
    const cellHeight = 176 / rows;
    const x = 60 + col * cellWidth;
    const y = 94 + row * cellHeight;
    return {
      x,
      y,
      width: cellWidth,
      height: cellHeight,
      inside: triangleContains(
        { x: x + cellWidth / 2, y: y + cellHeight / 2 },
        triangle,
      ),
    };
  });
  return (
    <>
      <rect
        x="44"
        y="64"
        width="360"
        height="246"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="64" y="96" fontSize="14" fontWeight="700" fill={COLORS.text}>
        rasterization：覆盖并插值
      </text>
      {cells.map((cell, index) => (
        <rect
          key={`live-cell-${index}`}
          x={cell.x}
          y={cell.y}
          width={cell.width}
          height={cell.height}
          fill={cell.inside ? COLORS.accent : "transparent"}
          fillOpacity={cell.inside ? "0.2" : "1"}
          stroke={COLORS.border}
          strokeWidth="1"
        />
      ))}
      <polygon
        points={triangle.map((point) => `${point.x},${point.y}`).join(" ")}
        fill={COLORS.accent}
        fillOpacity="0.08"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text x="64" y="294" fontSize="12" fill={COLORS.secondary}>
        片段候选：{cells.filter((cell) => cell.inside).length} 个样本
      </text>
    </>
  );
}

export function Cgp15RayCastingRasterizationLab() {
  const [mode, setMode] = useState<RenderMode>("ray");
  const [resolution, setResolution] = useState(8);
  const [depth, setDepth] = useState(5);

  const modeLabel = mode === "ray" ? "ray casting" : "rasterization";
  const workload =
    mode === "ray"
      ? resolution * depth
      : resolution * Math.max(4, Math.round(resolution * 0.6));

  function reset() {
    setMode("ray");
    setResolution(8);
    setDepth(5);
  }

  return (
    <section
      aria-label="光线投射与光栅化专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-15-ray-casting-rasterization"
      data-unit-id="cgp-15"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RayCastViz · visibility path
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让可见性查询留下中间证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：提高屏幕采样后，ray casting 和 rasterization
            的工作量会以同一种方式增长吗？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置光线投射与光栅化实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择可见性路径">
          {(
            [
              ["ray", "光线投射"],
              ["rasterization", "光栅化"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                mode === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>屏幕采样规模</span>
              <span className="font-mono text-primary">{resolution}</span>
            </span>
            <input
              type="range"
              min="4"
              max="12"
              step="1"
              value={resolution}
              onChange={(event) => setResolution(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>反射 / 查询深度</span>
              <span className="font-mono text-primary">{depth}</span>
            </span>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <SvgFrame label="可调光线投射与光栅化实验：切换可见性路径并观察采样规模和工作量变化">
            <text
              x="28"
              y="32"
              fontSize="16"
              fontWeight="700"
              fill={COLORS.text}
            >
              live visibility：路径改变，中间证据也改变
            </text>
            {mode === "ray" ? (
              <RayScene resolution={resolution} />
            ) : (
              <RasterScene resolution={resolution} />
            )}
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
              当前规格
            </text>
            <text x="456" y="144" fontSize="13" fill={COLORS.accent}>
              路径：{modeLabel}
            </text>
            <text x="456" y="176" fontSize="13" fill={COLORS.secondary}>
              采样：{resolution}
            </text>
            <text x="456" y="208" fontSize="13" fill={COLORS.warning}>
              查询深度：{depth}
            </text>
            <text x="456" y="240" fontSize="13" fill={COLORS.success}>
              估计工作量：{workload}
            </text>
            <text
              x="559"
              y="270"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              先辨认证据，再比较速度
            </text>
            <text
              x="360"
              y="338"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              一次只改变一个条件，才能解释可见性结果
            </text>
          </SvgFrame>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前路径：{modeLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {mode === "ray"
              ? "当前图示逐条追问射线与几何的最近交点；增加查询深度会增加每条射线的工作。"
              : "当前图示先判断图元覆盖的屏幕样本，再为片段插值；采样规模决定覆盖测试数量。"}
          </p>
        </div>
      </div>
    </section>
  );
}
