"use client";

import { useState, type ReactNode } from "react";

type CurveMode = "bezier" | "bspline" | "subdivision";

type Point = {
  x: number;
  y: number;
};

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const DEFAULT_POINTS: Point[] = [
  { x: 72, y: 236 },
  { x: 182, y: 88 },
  { x: 350, y: 282 },
  { x: 548, y: 116 },
];

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={
          String(x2) +
          "," +
          String(y2) +
          " " +
          String(left.x) +
          "," +
          String(left.y) +
          " " +
          String(right.x) +
          "," +
          String(right.y)
        }
        fill={color}
      />
    </>
  );
}

function pointOnBezier(points: Point[], t: number): Point {
  const u = 1 - t;
  return {
    x:
      u * u * u * points[0].x +
      3 * u * u * t * points[1].x +
      3 * u * t * t * points[2].x +
      t * t * t * points[3].x,
    y:
      u * u * u * points[0].y +
      3 * u * u * t * points[1].y +
      3 * u * t * t * points[2].y +
      t * t * t * points[3].y,
  };
}

function pointOnBSpline(points: Point[], t: number): Point {
  const b0 = Math.pow(1 - t, 3) / 6;
  const b1 = (3 * t * t * t - 6 * t * t + 4) / 6;
  const b2 = (-3 * t * t * t + 3 * t * t + 3 * t + 1) / 6;
  const b3 = (t * t * t) / 6;
  return {
    x:
      b0 * points[0].x + b1 * points[1].x + b2 * points[2].x + b3 * points[3].x,
    y:
      b0 * points[0].y + b1 * points[1].y + b2 * points[2].y + b3 * points[3].y,
  };
}

function chaikin(points: Point[], level: number): Point[] {
  let current = points;
  for (let step = 0; step < level; step += 1) {
    const next: Point[] = [current[0]];
    for (let index = 0; index < current.length - 1; index += 1) {
      const first = current[index];
      const second = current[index + 1];
      next.push(
        {
          x: 0.75 * first.x + 0.25 * second.x,
          y: 0.75 * first.y + 0.25 * second.y,
        },
        {
          x: 0.25 * first.x + 0.75 * second.x,
          y: 0.25 * first.y + 0.75 * second.y,
        },
      );
    }
    next.push(current[current.length - 1]);
    current = next;
  }
  return current;
}

function sampledCurve(
  mode: CurveMode,
  points: Point[],
  level: number,
): Point[] {
  if (mode === "subdivision") {
    return chaikin(points, level);
  }
  return Array.from({ length: 41 }, (_, index) => {
    const t = index / 40;
    return mode === "bezier"
      ? pointOnBezier(points, t)
      : pointOnBSpline(points, t);
  });
}

function pathFromPoints(points: Point[]): string {
  return points
    .map((point, index) => (index === 0 ? "M" : "L") + point.x + " " + point.y)
    .join(" ");
}

function ControlPolygon({
  points,
  color = COLORS.secondary,
}: {
  points: Point[];
  color?: string;
}) {
  return (
    <g>
      <path
        d={pathFromPoints(points)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      {points.map((point, index) => (
        <g key={"control-point-" + index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="8"
            fill={COLORS.surface}
            stroke={color}
            strokeWidth="3"
          />
          <text
            x={point.x}
            y={point.y - 15}
            textAnchor="middle"
            fontSize="12"
            fill={color}
          >
            P{index}
          </text>
        </g>
      ))}
    </g>
  );
}

function Plot({
  mode,
  points,
  level = 2,
  showPolygon = true,
  label,
}: {
  mode: CurveMode;
  points: Point[];
  level?: number;
  showPolygon?: boolean;
  label: string;
}) {
  const curve = sampledCurve(mode, points, level);
  return (
    <svg
      viewBox="0 0 620 320"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="620" height="320" rx="14" fill={COLORS.bg} />
      <line
        x1="42"
        y1="270"
        x2="580"
        y2="270"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="42"
        y1="54"
        x2="42"
        y2="270"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {[100, 200, 300, 400, 500].map((x) => (
        <line
          key={"grid-x-" + x}
          x1={x}
          y1="54"
          x2={x}
          y2="270"
          stroke={COLORS.border}
          strokeOpacity="0.35"
        />
      ))}
      {[100, 150, 200, 250].map((y) => (
        <line
          key={"grid-y-" + y}
          x1="42"
          y1={y}
          x2="580"
          y2={y}
          stroke={COLORS.border}
          strokeOpacity="0.35"
        />
      ))}
      {showPolygon ? <ControlPolygon points={points} /> : null}
      <path
        d={pathFromPoints(curve)}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="310"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "bezier"
          ? "Bezier：曲线经过首尾控制点"
          : mode === "bspline"
            ? "B-spline：局部控制与平滑支撑"
            : "Subdivision：重复切角得到折线极限"}
      </text>
      <text
        x="310"
        y="302"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        虚线是控制多边形，实线是当前曲线
      </text>
    </svg>
  );
}

export function Cgp22SplinePipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="样条曲线流程图：控制点经过基函数加权，生成参数曲线并可进一步细分">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          splines：控制点如何变成一条曲线
        </text>
        <rect
          x="34"
          y="88"
          width="154"
          height="192"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          控制点
        </text>
        <ControlPolygon
          points={[
            { x: 66, y: 220 },
            { x: 104, y: 156 },
            { x: 144, y: 234 },
          ]}
          color={COLORS.warning}
        />
        <text
          x="111"
          y="262"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          少量设计参数
        </text>
        <Arrow x1={204} y1={184} x2={252} y2={184} color={COLORS.accent} />
        <rect
          x="268"
          y="88"
          width="184"
          height="192"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          基函数加权
        </text>
        <path
          d="M300 228 Q332 142 360 228 Q390 142 420 228"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="300"
          y1="228"
          x2="420"
          y2="228"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="262"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          局部影响与连续性
        </text>
        <Arrow x1={468} y1={184} x2={516} y2={184} color={COLORS.accent} />
        <rect
          x="532"
          y="88"
          width="154"
          height="192"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="609"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          参数曲线
        </text>
        <path
          d="M554 228 Q590 128 664 178"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="5"
        />
        <text
          x="609"
          y="262"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          可采样的形状
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          关键问题：每个控制点影响多大，曲线在连接处有多连续？
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp22BasisFunctionDiagram() {
  const curves = [
    {
      name: "N₀",
      path: "M52 268 C86 268 98 90 160 90 C190 90 205 268 238 268",
      color: COLORS.accent,
    },
    {
      name: "N₁",
      path: "M140 268 C174 268 190 90 252 90 C286 90 302 268 334 268",
      color: COLORS.success,
    },
    {
      name: "N₂",
      path: "M228 268 C262 268 278 90 340 90 C374 90 390 268 422 268",
      color: COLORS.warning,
    },
    {
      name: "N₃",
      path: "M316 268 C350 268 366 90 428 90 C462 90 478 268 510 268",
      color: COLORS.secondary,
    },
  ];
  return (
    <Figure>
      <SvgFrame label="B-spline 基函数图：相邻基函数在局部区间支撑并共同贡献曲线位置">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          基函数：局部支撑让控制点影响可追踪
        </text>
        <line
          x1="52"
          y1="268"
          x2="650"
          y2="268"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="52"
          y1="72"
          x2="52"
          y2="268"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {[140, 228, 316, 404, 492, 580].map((x) => (
          <line
            key={"basis-tick-" + x}
            x1={x}
            y1="72"
            x2={x}
            y2="268"
            stroke={COLORS.border}
            strokeOpacity="0.35"
          />
        ))}
        {curves.map((curve) => (
          <g key={curve.name}>
            <path
              d={curve.path}
              fill="none"
              stroke={curve.color}
              strokeWidth="4"
            />
            <text
              x={Number(curve.path.slice(1, 4)) + 24}
              y="82"
              fontSize="13"
              fill={curve.color}
            >
              {curve.name}
            </text>
          </g>
        ))}
        <path
          d="M52 220 C148 146 250 208 342 136 C438 72 520 212 650 128"
          fill="none"
          stroke={COLORS.text}
          strokeWidth="5"
        />
        <text x="560" y="106" fontSize="14" fill={COLORS.text}>
          曲线 = Σ 控制点 × 基函数
        </text>
        <text
          x="360"
          y="316"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          只在当前支撑区间内改变权重，移动一个点不必重写整条曲线
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp22SubdivisionStepsDiagram() {
  const panels = [
    {
      x: 34,
      title: "原始折线",
      points: [
        { x: 52, y: 236 },
        { x: 92, y: 118 },
        { x: 132, y: 224 },
        { x: 172, y: 140 },
      ],
    },
    {
      x: 252,
      title: "插入加权点",
      points: [
        { x: 270, y: 236 },
        { x: 304, y: 147 },
        { x: 338, y: 174 },
        { x: 370, y: 206 },
        { x: 404, y: 157 },
        { x: 442, y: 140 },
      ],
    },
    {
      x: 470,
      title: "重复细分",
      points: [
        { x: 482, y: 220 },
        { x: 514, y: 166 },
        { x: 546, y: 184 },
        { x: 578, y: 196 },
        { x: 610, y: 178 },
        { x: 648, y: 152 },
      ],
    },
  ];
  return (
    <Figure>
      <SvgFrame label="细分曲线步骤图：原始折线经过加权插点和重复细分，逐步逼近平滑极限形状">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          subdivision curves：从折线到平滑极限
        </text>
        {panels.map((panel, index) => (
          <g key={panel.title}>
            <rect
              x={panel.x}
              y="82"
              width="190"
              height="202"
              rx="16"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x={panel.x + 95}
              y="115"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.text}
            >
              {panel.title}
            </text>
            <path
              d={pathFromPoints(panel.points)}
              fill="none"
              stroke={index === 2 ? COLORS.accent : COLORS.secondary}
              strokeWidth={index === 2 ? "5" : "3"}
              strokeLinejoin="round"
            />
            {panel.points.map((point, pointIndex) => (
              <circle
                key={panel.title + "-point-" + pointIndex}
                cx={point.x}
                cy={point.y}
                r={index === 2 ? "4" : "6"}
                fill={index === 1 ? COLORS.warning : COLORS.surface}
                stroke={COLORS.warning}
                strokeWidth="2"
              />
            ))}
            <text
              x={panel.x + 95}
              y="266"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              {index === 0
                ? "保留设计骨架"
                : index === 1
                  ? "规则地增加点"
                  : "形状趋于稳定"}
            </text>
          </g>
        ))}
        <Arrow x1={230} y1={183} x2={246} y2={183} color={COLORS.accent} />
        <Arrow x1={450} y1={183} x2={466} y2={183} color={COLORS.accent} />
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          细分不是随机平滑：规则决定极限曲线与连续性
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp22ContinuityDiagram() {
  return (
    <Figure>
      <SvgFrame label="连续性对比图：C0 只接上位置，C1 还对齐切线，C2 进一步让曲率变化平滑">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          连接处的连续性：位置、切线、曲率
        </text>
        <g>
          <rect
            x="34"
            y="78"
            width="204"
            height="214"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="136"
            y="113"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            C0
          </text>
          <path
            d="M60 226 Q112 112 136 180 Q158 248 212 130"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="5"
          />
          <circle cx="136" cy="180" r="6" fill={COLORS.warning} />
          <text
            x="136"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            位置相接，切线可跳变
          </text>
        </g>
        <g>
          <rect
            x="258"
            y="78"
            width="204"
            height="214"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="113"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            C1
          </text>
          <path
            d="M284 226 Q328 112 360 180 Q392 248 436 130"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="5"
          />
          <line
            x1="330"
            y1="204"
            x2="390"
            y2="156"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <circle cx="360" cy="180" r="6" fill={COLORS.success} />
          <text
            x="360"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            位置相接，切线方向一致
          </text>
        </g>
        <g>
          <rect
            x="482"
            y="78"
            width="204"
            height="214"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="584"
            y="113"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            C2
          </text>
          <path
            d="M508 226 C544 142 556 142 584 180 C612 218 626 218 660 130"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="5"
          />
          <circle cx="584" cy="180" r="6" fill={COLORS.accent} />
          <text
            x="584"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            曲率变化也更平滑
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          连续性越高不等于一定更好：要看编辑控制与视觉平滑的需求
        </text>
      </SvgFrame>
    </Figure>
  );
}

function SubdivisionLabScene({
  mode,
  points,
  level,
  showPolygon,
}: {
  mode: CurveMode;
  points: Point[];
  level: number;
  showPolygon: boolean;
}) {
  return (
    <Plot
      mode={mode}
      points={points}
      level={level}
      showPolygon={showPolygon}
      label="样条与细分曲线实验场景：控制点、控制多边形和当前曲线"
    />
  );
}

export function Cgp22SplinesLab() {
  const [mode, setMode] = useState<CurveMode>("bezier");
  const [selectedPoint, setSelectedPoint] = useState(1);
  const [points, setPoints] = useState<Point[]>(DEFAULT_POINTS);
  const [level, setLevel] = useState(2);
  const [showPolygon, setShowPolygon] = useState(true);

  function reset() {
    setMode("bezier");
    setSelectedPoint(1);
    setPoints(DEFAULT_POINTS);
    setLevel(2);
    setShowPolygon(true);
  }

  function updateSelected(axis: "x" | "y", value: number) {
    setPoints((current) =>
      current.map((point, index) =>
        index === selectedPoint ? { ...point, [axis]: value } : point,
      ),
    );
  }

  const selected = points[selectedPoint];
  const modeLabel =
    mode === "bezier"
      ? "Bezier"
      : mode === "bspline"
        ? "B-spline"
        : "Subdivision";

  return (
    <section
      aria-label="样条与细分曲线专属实验"
      data-visual-kind="cgp-22-splines-and-subdivision-curves"
      data-unit-id="cgp-22"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp22 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            样条与细分曲线专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            先固定控制点，再切换曲线模型与细分层级；观察局部控制、端点行为和连续性如何变化。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置样条与细分曲线实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择曲线模型">
        {(["bezier", "bspline", "subdivision"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={
              "min-h-11 rounded-control border px-3 py-2 text-sm " +
              (mode === option
                ? "border-accent bg-accent/10 font-semibold text-primary"
                : "border-border text-secondary")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-4">
        <label className="flex min-w-32 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>控制点</span>
            <span className="font-mono text-primary">P{selectedPoint}</span>
          </span>
          <select
            value={selectedPoint}
            onChange={(event) => setSelectedPoint(Number(event.target.value))}
            className="min-h-11 rounded-control border border-border bg-surface px-3 text-primary"
          >
            {[0, 1, 2, 3].map((index) => (
              <option key={"point-option-" + index} value={index}>
                P{index}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-32 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>X 位置</span>
            <span className="font-mono text-primary">
              {Math.round(selected.x)}
            </span>
          </span>
          <input
            type="range"
            min="54"
            max="570"
            value={selected.x}
            onChange={(event) =>
              updateSelected("x", Number(event.target.value))
            }
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-32 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>Y 位置</span>
            <span className="font-mono text-primary">
              {Math.round(selected.y)}
            </span>
          </span>
          <input
            type="range"
            min="70"
            max="260"
            value={selected.y}
            onChange={(event) =>
              updateSelected("y", Number(event.target.value))
            }
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-32 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>细分层级</span>
            <span className="font-mono text-primary">{level}</span>
          </span>
          <input
            type="range"
            min="1"
            max="4"
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-secondary md:col-span-4">
          <input
            type="checkbox"
            checked={showPolygon}
            onChange={(event) => setShowPolygon(event.target.checked)}
            className="size-5 accent-accent"
          />
          <span>显示控制多边形：用虚线追踪控制点影响范围</span>
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <SubdivisionLabScene
          mode={mode}
          points={points}
          level={level}
          showPolygon={showPolygon}
        />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前模型：{modeLabel} · P{selectedPoint} · 细分 {level} 级
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测移动 P{selectedPoint}{" "}
          会影响整条曲线还是局部区间，再只改变一个控制量；如果端点或连接处跳变，检查曲线模型和连续性假设。
        </p>
      </div>
    </section>
  );
}
