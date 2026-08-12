"use client";

import { useMemo, useState, type ReactNode } from "react";

type RepresentationKind = "polyline" | "mesh" | "voxel";

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

function Arrow({ from, to, color }: { from: Point; to: Point; color: string }) {
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
      />
      <polygon
        points={`${to.x},${to.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

function curvePoint(t: number): Point {
  return {
    x: 62 + t * 286,
    y: 222 - 94 * Math.sin(t * Math.PI),
  };
}

export function Cgp14ApproximationConceptDiagram() {
  const samples = Array.from({ length: 6 }, (_, index) =>
    curvePoint(index / 5),
  );
  const polyline = samples.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="标准近似概念图：用有限采样点和折线替代连续曲线，并显式管理误差">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            standard approximations：把连续对象变成可计算的有限证据
          </text>
          <rect
            x="36"
            y="64"
            width="336"
            height="228"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path
            d={`M ${Array.from({ length: 25 }, (_, index) => {
              const point = curvePoint(index / 24);
              return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
            }).join(" ")}`}
            fill="none"
            stroke={COLORS.secondary}
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          <polyline
            points={polyline}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="4"
          />
          {samples.map((point, index) => (
            <circle
              key={`sample-${index}`}
              cx={point.x}
              cy={point.y}
              r="7"
              fill={COLORS.warning}
            />
          ))}
          <text x="54" y="112" fontSize="13" fill={COLORS.secondary}>
            连续目标
          </text>
          <text x="54" y="274" fontSize="13" fill={COLORS.accent}>
            有限表示：折线 + 采样点
          </text>
          <rect
            x="404"
            y="64"
            width="280"
            height="228"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="428"
            y="104"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            近似的三项契约
          </text>
          <circle cx="436" cy="140" r="7" fill={COLORS.accent} />
          <text x="454" y="145" fontSize="13" fill={COLORS.text}>
            表示：用什么数据结构存
          </text>
          <circle cx="436" cy="180" r="7" fill={COLORS.warning} />
          <text x="454" y="185" fontSize="13" fill={COLORS.text}>
            误差：哪里允许偏离
          </text>
          <circle cx="436" cy="220" r="7" fill={COLORS.success} />
          <text x="454" y="225" fontSize="13" fill={COLORS.text}>
            代价：内存与计算预算
          </text>
          <text
            x="544"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            近似不是猜测，而是带预算的取舍
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先说明目标、表示、误差和预算，近似结果才可复现、可比较。
      </figcaption>
    </figure>
  );
}

export function Cgp14RepresentationPipelineDiagram() {
  const boxes = [
    [34, "连续目标", "曲线 / 场", COLORS.secondary],
    [208, "采样策略", "点 / 体素", COLORS.warning],
    [382, "representations", "网格 / 折线", COLORS.accent],
    [556, "渲染结果", "像素 / 误差", COLORS.success],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="表示方法管线：连续目标经过采样和数据表示后进入渲染，并返回误差证据">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            representations：同一个目标可以有不同的可计算外形
          </text>
          {boxes.map(([x, title, detail, color], index) => (
            <g key={title}>
              <rect
                x={x}
                y="100"
                width="130"
                height="114"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <circle cx={x + 26} cy="132" r="8" fill={color} />
              <text
                x={x + 44}
                y="137"
                fontSize="14"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title}
              </text>
              <text x={x + 18} y="176" fontSize="13" fill={COLORS.secondary}>
                {detail}
              </text>
              <text x={x + 18} y="198" fontSize="12" fill={color}>
                {index === 0 ? "定义" : index === 3 ? "验证" : "转换"}
              </text>
              {index < boxes.length - 1 ? (
                <Arrow
                  from={{ x: x + 138, y: 157 }}
                  to={{ x: x + 164, y: 157 }}
                  color={COLORS.accent}
                />
              ) : null}
            </g>
          ))}
          <rect
            x="86"
            y="252"
            width="548"
            height="54"
            rx="12"
            fill="var(--bg)"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="285"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.text}
          >
            质量问题要沿管线追溯：是采样不足、表示不合适，还是预算不够？
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        表示方法不是文件格式清单，而是从目标到渲染结果的一条责任链。
      </figcaption>
    </figure>
  );
}

export function Cgp14ErrorBudgetDiagram() {
  const rows = [
    ["3 段", 3, COLORS.warning, "误差大，代价低"],
    ["8 段", 8, COLORS.accent, "折中"],
    ["16 段", 16, COLORS.success, "误差小，代价高"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="误差预算图：增加近似段数会降低几何误差，但会增加表示和计算代价">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            误差预算：精度、内存和时间一起决定够不够好
          </text>
          <line
            x1="48"
            y1="274"
            x2="352"
            y2="274"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="48"
            y1="274"
            x2="48"
            y2="78"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text x="50" y="64" fontSize="12" fill={COLORS.secondary}>
            目标曲线偏差
          </text>
          <text x="292" y="300" fontSize="12" fill={COLORS.secondary}>
            表示规模 →
          </text>
          <path
            d="M 62 222 C 110 100 224 100 338 222"
            fill="none"
            stroke={COLORS.secondary}
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          {rows.map(([label, count, color], rowIndex) => {
            const y = 224 - rowIndex * 62;
            const points = Array.from({ length: count + 1 }, (_, index) => {
              const point = curvePoint(index / count);
              return `${point.x},${point.y + (rowIndex - 1) * 4}`;
            }).join(" ");
            return (
              <g key={label}>
                <polyline
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                />
                <text x="68" y={y} fontSize="13" fontWeight="700" fill={color}>
                  {label}
                </text>
              </g>
            );
          })}
          <rect
            x="404"
            y="76"
            width="280"
            height="210"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="428"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            选择依据
          </text>
          <text x="428" y="150" fontSize="13" fill={COLORS.warning}>
            低预算：少量样本也要可用
          </text>
          <text x="428" y="184" fontSize="13" fill={COLORS.accent}>
            中预算：误差与速度平衡
          </text>
          <text x="428" y="218" fontSize="13" fill={COLORS.success}>
            高预算：细节换取成本
          </text>
          <text
            x="544"
            y="260"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            误差必须和用途一起定义
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “更精确”只有在误差指标和资源预算同时明确时才有意义。
      </figcaption>
    </figure>
  );
}

function sampledCurve(count: number): Point[] {
  return Array.from({ length: count + 1 }, (_, index) =>
    curvePoint(index / count),
  );
}

function renderPolyline(points: Point[], color: string) {
  return (
    <>
      <polyline
        points={points.map((point) => `${point.x},${point.y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      {points.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r="5"
          fill={COLORS.warning}
        />
      ))}
    </>
  );
}

function renderMesh(points: Point[], color: string) {
  return (
    <>
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const base = 278;
        return (
          <g key={`mesh-${index}`}>
            <polygon
              points={`${point.x},${point.y} ${next.x},${next.y} ${next.x},${base} ${point.x},${base}`}
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={point.x}
              y1={point.y}
              x2={next.x}
              y2={next.y}
              stroke={color}
              strokeWidth="3"
            />
          </g>
        );
      })}
    </>
  );
}

function renderVoxels(points: Point[], color: string) {
  return (
    <>
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const width = Math.max(10, (next.x - point.x) * 0.72);
        const x = point.x + (next.x - point.x - width) / 2;
        const y = point.y - 10;
        return (
          <g key={`voxel-${index}`}>
            <rect
              x={x}
              y={y}
              width={width}
              height="20"
              fill={color}
              fillOpacity="0.22"
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={x + width / 2}
              y1={y}
              x2={x + width / 2}
              y2={278}
              stroke={color}
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          </g>
        );
      })}
    </>
  );
}

export function Cgp14StandardApproximationsLab() {
  const [representation, setRepresentation] =
    useState<RepresentationKind>("polyline");
  const [segments, setSegments] = useState(8);
  const [budget, setBudget] = useState(6);

  const points = useMemo(() => sampledCurve(segments), [segments]);
  const representationLabel = {
    polyline: "折线表示",
    mesh: "带面片网格",
    voxel: "体素采样",
  }[representation];
  const estimatedError = Math.max(0.4, 24 / segments);
  const fitsBudget = estimatedError <= budget;

  function reset() {
    setRepresentation("polyline");
    setSegments(8);
    setBudget(6);
  }

  return (
    <section
      aria-label="标准近似与表示方法专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-14-standard-approximations"
      data-unit-id="cgp-14"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ApproximationViz · representation budget
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让近似的误差与代价同时可见
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：增加分段数一定更好吗？切换表示方法后，误差、内存和渲染代价会怎样变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置标准近似实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择表示方法">
          {(
            [
              ["polyline", "折线"],
              ["mesh", "网格"],
              ["voxel", "体素"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={representation === value}
              onClick={() => setRepresentation(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                representation === value
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
              <span>采样段数</span>
              <span className="font-mono text-primary">{segments}</span>
            </span>
            <input
              type="range"
              min="3"
              max="16"
              step="1"
              value={segments}
              onChange={(event) => setSegments(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>允许误差</span>
              <span className="font-mono text-primary">
                {budget.toFixed(1)}
              </span>
            </span>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <SvgFrame label="可调标准近似实验：切换折线、网格和体素表示，观察采样段数与误差预算的关系">
            <text
              x="28"
              y="32"
              fontSize="16"
              fontWeight="700"
              fill={COLORS.text}
            >
              live approximation：把选择变成屏幕证据
            </text>
            <rect
              x="44"
              y="66"
              width="360"
              height="236"
              rx="14"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <path
              d={`M ${Array.from({ length: 25 }, (_, index) => {
                const point = curvePoint(index / 24);
                return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
              }).join(" ")}`}
              fill="none"
              stroke={COLORS.secondary}
              strokeWidth="3"
              strokeDasharray="7 5"
            />
            {representation === "polyline"
              ? renderPolyline(points, COLORS.accent)
              : null}
            {representation === "mesh"
              ? renderMesh(points, COLORS.accent)
              : null}
            {representation === "voxel"
              ? renderVoxels(points, COLORS.accent)
              : null}
            <text x="64" y="286" fontSize="13" fill={COLORS.secondary}>
              虚线：连续目标
            </text>
            <text x="230" y="286" fontSize="13" fill={COLORS.accent}>
              实物：{representationLabel}
            </text>
            <rect
              x="432"
              y="70"
              width="254"
              height="228"
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
              表示：{representationLabel}
            </text>
            <text x="456" y="176" fontSize="13" fill={COLORS.secondary}>
              采样：{segments} 段
            </text>
            <text x="456" y="208" fontSize="13" fill={COLORS.warning}>
              估计误差：{estimatedError.toFixed(1)}
            </text>
            <text
              x="456"
              y="240"
              fontSize="13"
              fill={fitsBudget ? COLORS.success : COLORS.warning}
            >
              {fitsBudget ? "预算状态：满足" : "预算状态：超出"}
            </text>
            <text
              x="360"
              y="338"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              一次只改变一个条件，才能知道误差来自哪里
            </text>
          </SvgFrame>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前表示：{representationLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {fitsBudget
              ? "当前采样规模落在允许误差预算内；继续比较表示代价和渲染用途。"
              : "当前误差超过预算；增加采样或换用更适合的表示方法，再重新验证。"}
          </p>
        </div>
      </div>
    </section>
  );
}
