"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

/** 绘制坐标统一出口：finite 守卫 + 9 位定点，数学结果本身不取整。 */
function fx(n: number): number {
  return Number.isFinite(n) ? Number(n.toFixed(9)) : 0;
}

function fmt(n: number): string {
  const v = fx(Math.round(n * 100) / 100);
  return String(v);
}

/* ---------- 两变量 LP 的共享 oracle：约束、顶点、爬坡路径、对偶证书 ---------- */

/** 数据坐标 view：x ∈ [0, 5.5]，y ∈ [0, 4.2]。 */
const VIEW = { x0: 0, x1: 5.5, y0: 0, y1: 4.2 } as const;

/** 绘图区像素映射（plot 区 90..700 × 30..380）。 */
const PX = { left: 90, right: 700, top: 30, bottom: 380 } as const;
const SX = (PX.right - PX.left) / (VIEW.x1 - VIEW.x0);
const SY = (PX.bottom - PX.top) / (VIEW.y1 - VIEW.y0);

function px(x: number): number {
  return PX.left + SX * (x - VIEW.x0);
}
function py(y: number): number {
  return PX.bottom - SY * (y - VIEW.y0);
}

type Vec = { readonly x: number; readonly y: number };

/** 资源约束行：a·x ≤ b（故障时方向翻成 ≥）。 */
const ROWS = [
  { a: [1, 1], b: 4 },
  { a: [1, 2], b: 6 },
] as const;

/** 正常模式可行域顶点（含非负约束）。 */
const VERTS: readonly Vec[] = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 2, y: 2 },
  { x: 0, y: 3 },
];

/** 顶点邻接棱（多边形边）。 */
const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
];

/** 故障模式（≤ 写成 ≥）下可见区域内的可行域顶点。 */
const FAULT_VERTS: readonly Vec[] = [
  { x: 0, y: 4 },
  { x: 2, y: 2 },
  { x: 5.5, y: 0.25 },
  { x: 5.5, y: 4.2 },
  { x: 0, y: 4.2 },
];

type ObjPreset = {
  id: string;
  label: string;
  c: readonly [number, number];
  note: string;
};

const OBJ_PRESETS: readonly ObjPreset[] = [
  {
    id: "profit-x",
    label: "c = (4, 1)",
    c: [4, 1],
    note: "利润集中在 x：最优点压在 (4, 0)",
  },
  {
    id: "balanced",
    label: "c = (2, 2)",
    c: [2, 2],
    note: "均衡利润：最优棱 x+y=4 上两个顶点并列",
  },
  {
    id: "profit-y",
    label: "c = (1, 3)",
    c: [1, 3],
    note: "利润集中在 y：爬坡一路走向 (0, 3)",
  },
  {
    id: "face",
    label: "c = (1, 1)",
    c: [1, 1],
    note: "等值线与棱平行：整条棱都是最优",
  },
];

const OBJ_DEFAULT = "balanced";

function zOf(c: readonly [number, number], v: Vec): number {
  return c[0] * v.x + c[1] * v.y;
}

/** 单纯形爬坡路径：从 (0,0) 沿棱贪心走向目标值更大的相邻顶点。 */
function walkPath(c: readonly [number, number]): {
  path: Vec[];
  altOpt: boolean;
} {
  const path: Vec[] = [VERTS[0]];
  let cur = 0;
  for (let guard = 0; guard < 4; guard++) {
    const zCur = zOf(c, VERTS[cur]);
    let next = -1;
    for (const [i, j] of EDGES) {
      const other = i === cur ? j : j === cur ? i : -1;
      if (other < 0) continue;
      if (zOf(c, VERTS[other]) > zCur + 1e-9 && (next < 0 || other < next)) {
        next = other;
      }
    }
    if (next < 0) break;
    cur = next;
    path.push(VERTS[cur]);
  }
  const zStar = zOf(c, VERTS[cur]);
  const altOpt = EDGES.some(([i, j]) => {
    const other = i === cur ? j : j === cur ? i : -1;
    return other >= 0 && Math.abs(zOf(c, VERTS[other]) - zStar) < 1e-9;
  });
  return { path, altOpt };
}

/**
 * 对偶 min 4y1+6y2 s.t. y1+y2 ≥ c1, y1+2y2 ≥ c2, y ≥ 0。
 * 候选顶点 (c1,0)、(0,c2/2)、两约束交点，逐一验可行取最小。
 */
function dualSolution(c: readonly [number, number]): {
  y: Vec;
  w: number;
  feasible: boolean;
} {
  const [c1, c2] = c;
  const cands: Vec[] = [
    { x: c1, y: 0 },
    { x: 0, y: c2 / 2 },
    { x: 2 * c1 - c2, y: c2 - c1 },
  ];
  let best: Vec | null = null;
  let bestW = Infinity;
  for (const y of cands) {
    if (y.x < -1e-9 || y.y < -1e-9) continue;
    if (y.x + y.y < c1 - 1e-9) continue;
    if (y.x + 2 * y.y < c2 - 1e-9) continue;
    const w = 4 * y.x + 6 * y.y;
    if (w < bestW - 1e-9) {
      bestW = w;
      best = y;
    }
  }
  if (!best) return { y: { x: 0, y: 0 }, w: 0, feasible: false };
  return { y: best, w: bestW, feasible: true };
}

/** 等值线 c1·x + c2·y = k 与 view 矩形的交线段（用于画扫掠虚线）。 */
function levelSegment(
  c: readonly [number, number],
  k: number,
): [Vec, Vec] | null {
  const [c1, c2] = c;
  const pts: Vec[] = [];
  const push = (x: number, y: number) => {
    if (
      x >= VIEW.x0 - 1e-9 &&
      x <= VIEW.x1 + 1e-9 &&
      y >= VIEW.y0 - 1e-9 &&
      y <= VIEW.y1 + 1e-9
    ) {
      const last = pts[pts.length - 1];
      if (!last || Math.abs(last.x - x) > 1e-9 || Math.abs(last.y - y) > 1e-9) {
        pts.push({ x: fx(x), y: fx(y) });
      }
    }
  };
  if (Math.abs(c2) > 1e-12) {
    push(VIEW.x0, k / c2);
    push(VIEW.x1, k / c2);
  }
  if (Math.abs(c1) > 1e-12) {
    push(k / c1, VIEW.y0);
    push(k / c1, VIEW.y1);
  }
  if (pts.length < 2) return null;
  // 方向统一：从左到右，便于做虚线动画的端点延伸。
  return pts[0].x <= pts[1].x ? [pts[0], pts[1]] : [pts[1], pts[0]];
}

/** 从可行点出发沿 data 空间方向 d 走直到出 view，返回线段（无界射线可视化）。 */
function raySegment(from: Vec, d: Vec): [Vec, Vec] {
  let tMax = Infinity;
  if (d.x > 1e-12) tMax = Math.min(tMax, (VIEW.x1 - from.x) / d.x);
  if (d.x < -1e-12) tMax = Math.min(tMax, (VIEW.x0 - from.x) / d.x);
  if (d.y > 1e-12) tMax = Math.min(tMax, (VIEW.y1 - from.y) / d.y);
  if (d.y < -1e-12) tMax = Math.min(tMax, (VIEW.y0 - from.y) / d.y);
  if (!Number.isFinite(tMax) || tMax < 0) tMax = 1;
  const end = { x: fx(from.x + d.x * tMax), y: fx(from.y + d.y * tMax) };
  return [from, end];
}

/* ---------- Lab：可行域几何 × 单纯形爬坡 × 对偶证书 ---------- */

const LP_STEPS: readonly TeachingStep[] = [
  {
    label: "region",
    caption: "四条半平面交出可行域：凸多边形与四个顶点",
  },
  {
    label: "climb",
    caption: "等值线沿梯度方向平移，单纯形沿棱爬升到最优顶点",
  },
  {
    label: "certificate",
    caption: "对偶上界降临到同一数值：gap=0，互补松弛逐项对账",
  },
];

const LP_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  LP_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Clrs4Chapter29LinearProgrammingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [presetId, setPresetId] = useState<string>(OBJ_DEFAULT);
  const [faultFlip, setFaultFlip] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LP_STEPS,
    build: (tl) => {
      LP_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const preset = OBJ_PRESETS.find((p) => p.id === presetId) ?? OBJ_PRESETS[1];
  const c = preset.c;
  const { path, altOpt } = walkPath(c);
  const opt = path[path.length - 1];
  const zStar = zOf(c, opt);
  const dual = dualSolution(c);

  const ghost1 = !faultFlip && zStar > 0 ? levelSegment(c, zStar * 0.35) : null;
  const ghost2 = !faultFlip && zStar > 0 ? levelSegment(c, zStar * 0.7) : null;
  const optLine = !faultFlip ? levelSegment(c, zStar) : null;

  const gradLen = Math.hypot(c[0] * SX, c[1] * SY) || 1;
  const gdx = fx((c[0] * SX * 56) / gradLen);
  const gdy = fx((-c[1] * SY * 56) / gradLen);
  const escape = faultFlip
    ? raySegment({ x: 2, y: 2 }, { x: c[0], y: c[1] })
    : null;

  const tight = [4 - (opt.x + opt.y), 6 - (opt.x + 2 * opt.y)].map((s) =>
    fx(s),
  );
  const dualSlack = [
    dual.y.x + dual.y.y - c[0],
    dual.y.x + 2 * dual.y.y - c[1],
  ].map((s) => fx(s));
  const gap = faultFlip ? null : fx(dual.w - zStar);

  function applyPreset(id: string) {
    setPresetId(id);
    timeline.seek(0);
  }

  function reset() {
    setPresetId(OBJ_DEFAULT);
    setFaultFlip(false);
    timeline.seek(0);
  }

  const currentStep =
    timeline.currentStep >= LP_STEPS.length
      ? LP_STEPS.length - 1
      : timeline.currentStep;

  const regionPts = faultFlip ? FAULT_VERTS : VERTS;
  const regionD = regionPts
    .map((v) => `${fx(px(v.x))},${fx(py(v.y))}`)
    .join(" ");

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="lp-feasible-region-climb-dual-certificate"
      data-readout="lp-geometry-oracle"
      data-status={faultFlip ? "unbounded" : "optimal"}
      data-objective={preset.label}
      data-optimum={faultFlip ? "none" : `(${opt.x},${opt.y})`}
      data-primal-z={faultFlip ? "inf" : fx(zStar)}
      data-dual-w={faultFlip ? "infeasible" : fx(dual.w)}
      data-gap={gap === null ? "na" : gap}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 29 · Linear Programming
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              可行域 × 单纯形爬坡 × 对偶证书：一个两变量 LP 的全流程
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：把目标方向从 c=(2,2) 换成
              c=(1,3)，最优点会往哪个顶点移动？ 如果再把两条资源约束的 ≤
              全部写成 ≥（故障注入），solver
              还应该返回一个数吗？先预测，再推进时间线核对几何轨迹与证书读数。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-primary">目标方向</span>
          <div
            role="radiogroup"
            aria-label="目标函数方向"
            className="flex flex-wrap gap-2"
          >
            {OBJ_PRESETS.map((p) => (
              <label
                key={p.id}
                className={`flex min-h-11 cursor-pointer items-center rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
                  presetId === p.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                <input
                  type="radio"
                  name="lp-objective"
                  value={p.id}
                  checked={presetId === p.id}
                  onChange={() => applyPreset(p.id)}
                  className="sr-only"
                />
                {p.label}
              </label>
            ))}
          </div>
          <span className="text-xs leading-5 text-secondary">
            {preset.note}
          </span>
        </div>

        <svg
          viewBox="0 0 800 460"
          role="img"
          aria-label="CLRS 4e 第 29 章线性规划专属实验。展示两变量线性规划 max c·x，约束 x+y≤4、x+2y≤6、x,y≥0 的可行域凸多边形、等值线沿梯度平移、单纯形沿棱爬坡到最优顶点、对偶证书使 gap 归零；故障注入把 ≤ 写成 ≥ 后区域无界、solver 必须报告无界状态而非数值。支持播放、暂停、单步、拖进度、目标方向切换、故障注入和重置。"
          className="h-auto w-full"
        >
          {/* 坐标轴与刻度 */}
          <g>
            <line
              x1={PX.left}
              y1={PX.top}
              x2={PX.left}
              y2={PX.bottom}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <line
              x1={PX.left}
              y1={PX.bottom}
              x2={PX.right}
              y2={PX.bottom}
              stroke={C.border}
              strokeWidth="1.5"
            />
            {[1, 2, 3, 4, 5].map((x) => (
              <g key={`xt${x}`}>
                <line
                  x1={fx(px(x))}
                  y1={PX.bottom}
                  x2={fx(px(x))}
                  y2={PX.bottom + 5}
                  stroke={C.border}
                />
                <text
                  x={fx(px(x))}
                  y={PX.bottom + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {x}
                </text>
              </g>
            ))}
            {[1, 2, 3, 4].map((y) => (
              <g key={`yt${y}`}>
                <line
                  x1={PX.left - 5}
                  y1={fx(py(y))}
                  x2={PX.left}
                  y2={fx(py(y))}
                  stroke={C.border}
                />
                <text
                  x={PX.left - 12}
                  y={fx(py(y) + 4)}
                  textAnchor="end"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {y}
                </text>
              </g>
            ))}
            <text
              x={fx(px(2.75))}
              y={PX.bottom + 38}
              textAnchor="middle"
              fontSize="12"
              fill={C.primary}
            >
              x
            </text>
            <text
              x={PX.left - 34}
              y={fx(py(2.1))}
              textAnchor="middle"
              fontSize="12"
              fill={C.primary}
            >
              y
            </text>
          </g>

          {/* Stage 0：约束半平面 + 可行域 */}
          <g
            ref={(el) => {
              stageRefs.current[0] = el;
            }}
            opacity={1}
          >
            <polygon
              points={regionD}
              fill={C.accent}
              opacity={0.14}
              stroke={C.accent}
              strokeWidth="2"
            />

            {/* 约束线 x+y=4 */}
            <line
              x1={px(0)}
              y1={py(4)}
              x2={px(4)}
              y2={py(0)}
              stroke={C.primary}
              strokeWidth="1.5"
              strokeDasharray={faultFlip ? "6 4" : undefined}
            />
            <text
              x={fx(px(3.6))}
              y={fx(py(0.62))}
              fontSize="11"
              fill={C.secondary}
            >
              x+y {faultFlip ? "≥" : "≤"} 4
            </text>
            {/* 约束线 x+2y=6 */}
            <line
              x1={px(0)}
              y1={py(3)}
              x2={px(5.5)}
              y2={py(0.25)}
              stroke={C.primary}
              strokeWidth="1.5"
              strokeDasharray={faultFlip ? "6 4" : undefined}
            />
            <text
              x={fx(px(4.4))}
              y={fx(py(1.25))}
              fontSize="11"
              fill={C.secondary}
            >
              x+2y {faultFlip ? "≥" : "≤"} 6
            </text>
            {/* 非负约束 */}
            <text
              x={fx(px(2.9))}
              y={fx(py(0.18))}
              fontSize="11"
              fill={C.secondary}
            >
              y ≥ 0
            </text>
            <text
              x={fx(px(-0.15))}
              y={fx(py(4.0))}
              fontSize="11"
              fill={C.secondary}
              textAnchor="end"
            >
              x ≥ 0
            </text>

            {/* 顶点标注 */}
            {(faultFlip
              ? [
                  { v: FAULT_VERTS[0], label: "(0, 4)" },
                  { v: FAULT_VERTS[1], label: "(2, 2)" },
                ]
              : [
                  { v: VERTS[0], label: "(0, 0)" },
                  { v: VERTS[1], label: "(4, 0)" },
                  { v: VERTS[2], label: "(2, 2)" },
                  { v: VERTS[3], label: "(0, 3)" },
                ]
            ).map(({ v, label }) => (
              <g key={label}>
                <circle
                  cx={fx(px(v.x))}
                  cy={fx(py(v.y))}
                  r="4"
                  fill={C.primary}
                />
                <text
                  x={fx(px(v.x) + 10)}
                  y={fx(py(v.y) - 8)}
                  fontSize="11"
                  fill={C.primary}
                >
                  {label}
                </text>
              </g>
            ))}
            <text
              x={fx(px(0.4))}
              y={fx(py(3.85))}
              fontSize="12"
              fill={C.accent}
              fontWeight="600"
            >
              可行域
            </text>
          </g>

          {/* Stage 1：等值线扫掠 + 单纯形爬坡 */}
          <g
            ref={(el) => {
              stageRefs.current[1] = el;
            }}
            opacity={0}
          >
            {ghost1 && (
              <line
                x1={px(ghost1[0].x)}
                y1={py(ghost1[0].y)}
                x2={px(ghost1[1].x)}
                y2={py(ghost1[1].y)}
                stroke={C.secondary}
                strokeWidth="1"
                strokeDasharray="4 5"
              />
            )}
            {ghost2 && (
              <line
                x1={px(ghost2[0].x)}
                y1={py(ghost2[0].y)}
                x2={px(ghost2[1].x)}
                y2={py(ghost2[1].y)}
                stroke={C.secondary}
                strokeWidth="1"
                strokeDasharray="4 5"
              />
            )}
            {optLine && (
              <line
                x1={px(optLine[0].x)}
                y1={py(optLine[0].y)}
                x2={px(optLine[1].x)}
                y2={py(optLine[1].y)}
                stroke={C.accent}
                strokeWidth="2.5"
              />
            )}

            {faultFlip && escape ? (
              <g data-fault="unbounded-ray">
                <line
                  x1={px(escape[0].x)}
                  y1={py(escape[0].y)}
                  x2={px(escape[1].x)}
                  y2={py(escape[1].y)}
                  stroke={C.danger}
                  strokeWidth="2.5"
                  markerEnd="url(#lp-arrow-danger)"
                />
                <text
                  x={fx(px(escape[1].x) - 8)}
                  y={fx(py(escape[1].y) - 10)}
                  textAnchor="end"
                  fontSize="12"
                  fill={C.danger}
                  fontWeight="600"
                >
                  目标值沿此方向无限增长
                </text>
              </g>
            ) : (
              <g>
                <polyline
                  points={path
                    .map((v) => `${fx(px(v.x))},${fx(py(v.y))}`)
                    .join(" ")}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth="2.5"
                  strokeDasharray="7 5"
                />
                {path.map((v, i) => (
                  <g key={`${v.x}-${v.y}-${i}`}>
                    <circle
                      cx={fx(px(v.x))}
                      cy={fx(py(v.y))}
                      r="6"
                      fill={C.elevated}
                      stroke={C.accent}
                      strokeWidth="2.5"
                    />
                    <text
                      x={fx(px(v.x))}
                      y={fx(py(v.y) - 14)}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.accent}
                    >
                      z={fmt(zOf(c, v))}
                    </text>
                  </g>
                ))}
                <line
                  x1={fx(px(opt.x))}
                  y1={fx(py(opt.y))}
                  x2={fx(px(opt.x) + gdx)}
                  y2={fx(py(opt.y) + gdy)}
                  stroke={C.accent}
                  strokeWidth="2"
                  markerEnd="url(#lp-arrow)"
                />
                <text
                  x={fx(px(opt.x) + gdx)}
                  y={fx(py(opt.y) + gdy - 8)}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.accent}
                >
                  c
                </text>
                {altOpt && (
                  <text
                    x={fx(px(1.15))}
                    y={fx(py(2.75))}
                    fontSize="11"
                    fill={C.warning}
                  >
                    整条棱并列最优（退化）
                  </text>
                )}
              </g>
            )}
          </g>

          {/* Stage 2：对偶证书与 gap 归零 */}
          <g
            ref={(el) => {
              stageRefs.current[2] = el;
            }}
            opacity={0}
          >
            {!faultFlip && (
              <g data-readout="dual-certificate">
                {tight.map((s, i) => {
                  const v = opt;
                  const row = ROWS[i];
                  const n = Math.hypot(row.a[0], row.a[1]);
                  const nx = row.a[0] / n;
                  const ny = row.a[1] / n;
                  return (
                    <g key={`cs-${i}`}>
                      <line
                        x1={fx(px(v.x))}
                        y1={fx(py(v.y))}
                        x2={fx(px(v.x) + nx * 26)}
                        y2={fx(py(v.y) + ny * 26)}
                        stroke={
                          dual.y[i === 0 ? "x" : "y"] > 1e-9
                            ? C.success
                            : C.secondary
                        }
                        strokeWidth="2.5"
                      />
                      <text
                        x={fx(px(v.x) + nx * 40)}
                        y={fx(py(v.y) + ny * 40 + 4)}
                        fontSize="11"
                        fill={
                          dual.y[i === 0 ? "x" : "y"] > 1e-9
                            ? C.success
                            : C.secondary
                        }
                      >
                        {`y${i + 1}=${fmt(dual.y[i === 0 ? "x" : "y"])}${
                          s < 1e-9 ? "（紧）" : `（松弛 ${fmt(s)}）`
                        }`}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={PX.left + 16}
                  y={PX.top + 84}
                  fontSize="12"
                  fill={C.primary}
                >
                  {`对偶可行 y* = (${fmt(dual.y.x)}, ${fmt(dual.y.y)})，w = 4y₁+6y₂ = ${fmt(dual.w)}`}
                </text>
                <text
                  x={PX.left + 16}
                  y={PX.top + 104}
                  fontSize="12"
                  fill={C.success}
                  fontWeight="600"
                >
                  {`强对偶：z* = w*，gap = ${gap === null ? "—" : fmt(gap)}（上界证书闭合）`}
                </text>
              </g>
            )}
            {faultFlip && (
              <g data-fault="dual-infeasible">
                <rect
                  x={PX.left + 16}
                  y={PX.top + 64}
                  width="330"
                  height="56"
                  rx="8"
                  fill={C.danger}
                  opacity={0.12}
                />
                <text
                  x={PX.left + 32}
                  y={PX.top + 90}
                  fontSize="12"
                  fill={C.danger}
                  fontWeight="600"
                >
                  对偶不可行：不存在任何有限上界证书
                </text>
                <text
                  x={PX.left + 32}
                  y={PX.top + 108}
                  fontSize="11"
                  fill={C.secondary}
                >
                  原始问题无界 ⟺ 对偶不可行——这正是 solver 必须返回 status
                  的原因
                </text>
              </g>
            )}
          </g>

          <defs>
            <marker
              id="lp-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="lp-arrow-danger"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <text
            x={PX.right}
            y={PX.top + 14}
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            {`步骤：${LP_STEPS[currentStep]?.label ?? "region"}`}
          </text>
        </svg>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">solver status</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                faultFlip ? "text-danger" : "text-success"
              }`}
              data-status-chip
            >
              {faultFlip ? "UNBOUNDED（无界）" : "OPTIMAL（已证明最优）"}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">原始问题 z* = c·x</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {faultFlip
                ? "+∞（无有限最优值）"
                : `${fmt(zStar)} @ (${opt.x}, ${opt.y})`}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">对偶问题 w* = b·y（上界）</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {faultFlip
                ? "对偶不可行"
                : `${fmt(dual.w)} @ (${fmt(dual.y.x)}, ${fmt(dual.y.y)})`}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">互补松弛对账</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {faultFlip
                ? "无证书可对账"
                : `s=(${fmt(tight[0])},${fmt(tight[1])}); x·余量=(${fmt(opt.x * dualSlack[0])},${fmt(opt.y * dualSlack[1])})`}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              faultFlip
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={faultFlip}
              onChange={(e) => {
                setFaultFlip(e.target.checked);
                timeline.seek(0);
              }}
              data-fault="flip-constraint-direction"
              className="h-4 w-4 accent-[var(--danger)]"
            />
            注入故障：把 ≤ 写成 ≥
          </label>
          <span className="max-w-xl text-xs leading-5 text-secondary">
            现象：可行域翻到直线另一侧且向上无界，solver 若只读数值会得到 +∞ →
            原因：约束方向（≥/≤）写反是建模最常见的符号事故 → 修法：永远先检查
            solver 返回的
            status，无界时去查方向与漏掉的约束，而不是继续用目标函数值。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LP_LABEL_TEXT}
          caption="先预测目标方向换档后最优点移到哪个顶点，再推进时间线；第三步看对偶上界与互补松弛如何把证书闭合。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置线性规划几何实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可行域是半平面的交；等值线沿梯度方向平移，最后碰到的顶点给出最优值；对偶问题的最优值是同一个数——primal
        给方案、dual 给上界，两者相等才是证书。
      </figcaption>
    </figure>
  );
}
