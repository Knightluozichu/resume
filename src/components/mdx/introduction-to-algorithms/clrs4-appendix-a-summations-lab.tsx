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

/** 确定性千分位格式（仅用于大整数），避免 toLocaleString 的区域差异。 */
function fmt(n: number): string {
  const neg = n < 0 ? "-" : "";
  const s = Math.abs(Math.trunc(n)).toString();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return neg + out;
}

/** 数值展示：大整数走千分位，小数保留两位，杜绝 SSR/客户端差异。 */
function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Number.isInteger(n) && Math.abs(n) >= 1000) return fmt(n);
  return (Math.round(n * 100) / 100).toString();
}

/* ---------- 求和实验台共享 oracle：逐项、累计、closed-form、积分界 ---------- */

type FamilyKey = "arithmetic" | "quadratic" | "geometric" | "harmonic";

const FAMILY_ORDER: readonly FamilyKey[] = [
  "arithmetic",
  "quadratic",
  "geometric",
  "harmonic",
];

const FAMILY_LABEL: Record<FamilyKey, string> = {
  arithmetic: "等差 f(k)=k",
  quadratic: "平方 f(k)=k²",
  geometric: "等比 f(k)=rᵏ",
  harmonic: "调和 f(k)=1/k",
};

/** 第 k 项 f(k)。k 可以是连续实数（画积分曲线时用）。 */
function term(k: number, family: FamilyKey, r: number): number {
  switch (family) {
    case "arithmetic":
      return k;
    case "quadratic":
      return k * k;
    case "geometric":
      return Math.pow(r, k);
    case "harmonic":
      return 1 / k;
  }
}

/** 逐项累加（故障模式 excludeLast 把上界 n 当开区间，丢掉末项）。 */
function loopTotal(
  n: number,
  family: FamilyKey,
  r: number,
  excludeLast: boolean,
): number {
  const last = excludeLast ? n - 1 : n;
  let sum = 0;
  for (let k = 1; k <= last; k++) sum += term(k, family, r);
  return sum;
}

/** closed-form 精确值；调和和无 closed-form，返回 null（用 Hₙ 数值对账）。 */
function exactTotal(n: number, family: FamilyKey, r: number): number | null {
  switch (family) {
    case "arithmetic":
      return (n * (n + 1)) / 2;
    case "quadratic":
      return (n * (n + 1) * (2 * n + 1)) / 6;
    case "geometric":
      return r === 1 ? n : (Math.pow(r, n + 1) - r) / (r - 1);
    case "harmonic":
      return null;
  }
}

/** 渐近类判定（先看 shape 再给界）。 */
function thetaOf(family: FamilyKey, r: number): string {
  switch (family) {
    case "arithmetic":
      return "Θ(n²)";
    case "quadratic":
      return "Θ(n³)";
    case "geometric":
      if (r > 1) return "Θ(rⁿ)";
      if (r === 1) return "Θ(n)";
      return "Θ(1)";
    case "harmonic":
      return "Θ(log n)";
  }
}

/** ∫₁^b f(x) dx 的 closed-form（夹逼公式本身要求它算得出）。 */
function integralTo(b: number, family: FamilyKey, r: number): number {
  switch (family) {
    case "arithmetic":
      return (b * b - 1) / 2;
    case "quadratic":
      return (b * b * b - 1) / 3;
    case "geometric":
      return r === 1 ? b - 1 : (Math.pow(r, b) - r) / Math.log(r);
    case "harmonic":
      return Math.log(b);
  }
}

/** f 是否递增（决定矩形在曲线的哪一侧、夹逼方向）。 */
function isIncreasing(family: FamilyKey, r: number): boolean {
  if (family === "harmonic") return false;
  if (family === "geometric") return r >= 1;
  return true;
}

/** 积分夹逼：递增时 f(1)+∫₁ⁿ ≤ S ≤ ∫₁ⁿ⁺¹；递减时方向反转。 */
function integralBounds(
  n: number,
  family: FamilyKey,
  r: number,
): { low: number; high: number } {
  const inner = integralTo(n, family, r);
  const outer = integralTo(n + 1, family, r);
  const first = term(1, family, r);
  return isIncreasing(family, r)
    ? { low: first + inner, high: outer }
    : { low: outer, high: first + inner };
}

/* ---------- 教学时间线：逐项清单 → 累加对账 → 积分夹逼 → 判型给界 ---------- */

const SUM_STEPS: readonly TeachingStep[] = [
  {
    label: "terms",
    caption: "逐项直方图：第 k 根柱子高度 = f(k)，先看清清单再谈总数",
  },
  {
    label: "total",
    caption: "逐项累加：阶梯线走到 Sₙ，与 closed-form 精确值对账",
  },
  {
    label: "squeeze",
    caption: "积分夹逼：单位矩形与曲线互相 sandwich，夹出上下界",
  },
  {
    label: "classify",
    caption: "判型给界：Θ 结论要 upper/lower 配对，故障模式演示丢末项",
  },
];

const SUM_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  SUM_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const DEFAULT_N = 10;
const DEFAULT_R = 2;
const MIN_N = 4;
const MAX_N = 24;

const X0 = 70;
const X1 = 860;
const TOP = 110;
const BASE = 400;
const PLOT_H = BASE - TOP;

export function Clrs4AppendixASummationsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [family, setFamily] = useState<FamilyKey>("geometric");
  const [n, setN] = useState(DEFAULT_N);
  const [r, setR] = useState(DEFAULT_R);
  const [excludeLast, setExcludeLast] = useState(false);

  const timeline = useTeachingTimeline({
    steps: SUM_STEPS,
    build: (tl) => {
      SUM_STEPS.forEach((step, index) => {
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

  const terms = Array.from({ length: n }, (_, i) => term(i + 1, family, r));
  const lastTerm = terms[n - 1];
  /** 柱与曲线共用同一归一化分母，保证直方图与积分矩形严格同比例。 */
  const vmax = Math.max(...terms, term(n + 1, family, r), 1e-12);
  const total = loopTotal(n, family, r, excludeLast);
  const exact = exactTotal(n, family, r);
  const exactValue = exact ?? loopTotal(n, family, r, false);
  const exactText =
    exact === null ? `Hₙ ≈ ${fmtNum(exactValue)}` : fmtNum(exact);
  const { low, high } = integralBounds(n, family, r);
  const increasing = isIncreasing(family, r);
  const faultDelta = exactValue - total;
  const lastShare = total > 0 ? (lastTerm / (total + lastTerm)) * 100 : 0;
  const mismatched = excludeLast && Math.abs(faultDelta) > 1e-9;
  const slotW = (X1 - X0) / n;
  const barW = slotW * 0.7;
  const stepIndex =
    timeline.currentStep >= SUM_STEPS.length
      ? SUM_STEPS.length - 1
      : timeline.currentStep;

  const cum: number[] = [];
  terms.reduce((acc, v, i) => {
    const next = acc + (excludeLast && i === n - 1 ? 0 : v);
    cum.push(next);
    return next;
  }, 0);
  const cumMax = Math.max(total, exactValue, 1e-12);

  /** 索引空间 [1, n+1] → x 像素。 */
  const px = (x: number) => X0 + ((x - 1) / n) * (X1 - X0);
  const py = (v: number) => BASE - (v / vmax) * PLOT_H;

  const curvePts: string[] = [];
  // The n unit rectangles cover [1, n + 1], so the curve must include the
  // right endpoint used by the integral lower/upper bounds as well.
  for (let i = 0; i <= 96; i++) {
    const x = 1 + (i / 96) * n;
    curvePts.push(`${fx(px(x))},${fx(py(term(x, family, r)))}`);
  }

  const labelEvery = Math.max(1, Math.ceil(n / 8));

  function applyParams(next: { family?: FamilyKey; n?: number; r?: number }) {
    if (next.family !== undefined) setFamily(next.family);
    if (next.n !== undefined) setN(next.n);
    if (next.r !== undefined) setR(next.r);
    timeline.seek(0);
  }

  function reset() {
    setFamily("geometric");
    setN(DEFAULT_N);
    setR(DEFAULT_R);
    setExcludeLast(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="summation-terms-accumulate-integral-squeeze-classify"
      data-readout="summation-bounding-ledger"
      data-family={family}
      data-n={n}
      data-r={family === "geometric" ? r : null}
      data-sum-loop={total}
      data-sum-exact={exactValue}
      data-bound-low={low}
      data-bound-high={high}
      data-fault={excludeLast ? "treat-upper-bound-as-exclusive" : "none"}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Appendix A · Summations
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              求和夹逼实验台：逐项清单、累加对账、积分 sandwich 与紧界判定
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：把等比的 r 从 2 调到 0.5，末项占总额的比例会怎样变化？
              先把预测写下来，再推进时间线四步核对——清单、对账、夹逼、判型。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              逐项形状 f(k)
            </span>
            <select
              data-param="family"
              aria-label="选择求和项形状"
              value={family}
              onChange={(event) =>
                applyParams({ family: event.target.value as FamilyKey })
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {FAMILY_ORDER.map((key) => (
                <option key={key} value={key}>
                  {FAMILY_LABEL[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              项数 n = {n}
            </span>
            <input
              type="range"
              data-param="term-count"
              aria-label="调整项数 n"
              min={MIN_N}
              max={MAX_N}
              step={1}
              value={n}
              onChange={(event) =>
                applyParams({ n: Number(event.target.value) })
              }
              className="mdx-range mt-3 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              公比 r = {r.toFixed(1)}
              {family !== "geometric" ? "（仅等比生效）" : ""}
            </span>
            <input
              type="range"
              data-param="ratio"
              aria-label="调整等比公比 r"
              min={0.5}
              max={2}
              step={0.1}
              value={r}
              disabled={family !== "geometric"}
              onChange={(event) =>
                applyParams({ r: Number(event.target.value) })
              }
              className="mdx-range mt-3 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent disabled:cursor-not-allowed disabled:opacity-40"
            />
          </label>
        </div>

        <p className="mb-2 text-xs text-secondary sm:hidden">
          图表保持可读尺寸；可在图表区域内横向滚动，键盘用户可先聚焦该区域再使用方向键。
        </p>
        <div
          className="overflow-x-auto rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          role="region"
          aria-label="求和实验台图表，可横向滚动"
          tabIndex={0}
        >
          <svg
            viewBox="0 0 900 640"
            role="img"
            aria-labelledby="summation-lab-title summation-lab-description"
            className="mx-auto block h-auto w-[900px] max-w-none"
          >
            <title id="summation-lab-title">求和夹逼实验台图表</title>
            <desc id="summation-lab-description">
              展示逐项直方图、累加阶梯与闭式对账、单位矩形和积分曲线夹逼，以及求和紧界判定。可通过图表前的控件选择项形状、项数和公比。
            </desc>
            <rect x="0" y="0" width="900" height="640" rx="14" fill={C.bg} />
            <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
              Sₙ = Σₖ₌₁ⁿ f(k)，f(k) = {FAMILY_LABEL[family].split(" ")[1]}，n ={" "}
              {n}
              {family === "geometric" ? `，r = ${r.toFixed(1)}` : ""}
            </text>
            <text x="30" y="58" fontSize="12" fill={C.secondary}>
              terms → total → squeeze → classify · 当前步骤：
              {SUM_STEPS[stepIndex]?.label ?? "terms"}
            </text>

            <g
              ref={(node) => {
                stageRefs.current[0] = node;
              }}
              style={{ opacity: 1 }}
            >
              <text
                x="30"
                y="92"
                fontSize="13"
                fontWeight="700"
                fill={C.accent}
              >
                第 1 步 · 逐项清单：每根柱子是一项，先看形状再谈总和
              </text>
              {terms.map((v, i) => {
                const k = i + 1;
                const x = X0 + i * slotW + (slotW - barW) / 2;
                const h = (v / vmax) * PLOT_H;
                const isLast = k === n;
                return (
                  <g key={`term-${k}`}>
                    <rect
                      x={fx(x)}
                      y={fx(BASE - h)}
                      width={fx(barW)}
                      height={fx(h)}
                      rx="3"
                      fill={isLast ? C.accent : C.elevated}
                      fillOpacity={isLast ? 0.4 : 1}
                      stroke={isLast ? C.accent : C.border}
                      strokeWidth={isLast ? 1.6 : 1}
                    />
                    {k % labelEvery === 0 && (
                      <text
                        x={fx(x + barW / 2)}
                        y={fx(BASE + 18)}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.secondary}
                      >
                        k={k}
                      </text>
                    )}
                  </g>
                );
              })}
              <line
                x1={X0 - 10}
                y1={BASE}
                x2={X1 + 10}
                y2={BASE}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x={X1 + 14}
                y={fx(BASE + 4)}
                fontSize="11"
                fill={C.secondary}
              >
                k
              </text>
              <rect
                x="30"
                y="440"
                width="840"
                height="56"
                rx="12"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="464"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                清单共 {n} 项：首项 f(1) = {fmtNum(terms[0])}，末项 f({n}) ={" "}
                {fmtNum(lastTerm)}
                {increasing
                  ? "（末项最大，阶梯往右爬坡）"
                  : "（首项最大，阶梯往右下坡）"}
              </text>
              <text x="52" y="484" fontSize="11" fill={C.secondary}>
                末项占总额 {lastShare.toFixed(1)}%
                ——比例决定后面的界该用末项主导还是逐项夹逼。
              </text>
            </g>

            <g
              ref={(node) => {
                stageRefs.current[1] = node;
              }}
              style={{ opacity: 0 }}
            >
              <text
                x="30"
                y="92"
                fontSize="13"
                fontWeight="700"
                fill={C.accent}
              >
                第 2 步 · 累加对账：阶梯线逐项爬升，虚线是 closed-form 精确值
              </text>
              {terms.map((v, i) => {
                const h = (v / vmax) * PLOT_H;
                return (
                  <rect
                    key={`ghost-${i + 1}`}
                    x={fx(X0 + i * slotW + (slotW - barW) / 2)}
                    y={fx(BASE - h)}
                    width={fx(barW)}
                    height={fx(h)}
                    rx="3"
                    fill={C.border}
                    fillOpacity="0.35"
                  />
                );
              })}
              <polyline
                points={(() => {
                  const pts: string[] = [`${fx(X0)},${fx(BASE)}`];
                  for (let k = 1; k <= n; k++) {
                    const right = X0 + k * slotW;
                    const y = BASE - (cum[k - 1] / cumMax) * PLOT_H;
                    pts.push(`${fx(right - slotW)},${fx(y)}`);
                    pts.push(`${fx(right)},${fx(y)}`);
                  }
                  return pts.join(" ");
                })()}
                fill="none"
                stroke={C.accent}
                strokeWidth="2.2"
              />
              {exact !== null && (
                <g>
                  <line
                    x1={X0}
                    y1={fx(BASE - (exact / cumMax) * PLOT_H)}
                    x2={X1}
                    y2={fx(BASE - (exact / cumMax) * PLOT_H)}
                    stroke={C.success}
                    strokeWidth="1.6"
                    strokeDasharray="7 5"
                  />
                  <text
                    x={X0 + 8}
                    y={fx(BASE - (exact / cumMax) * PLOT_H - 8)}
                    fontSize="11"
                    fill={C.success}
                  >
                    closed-form 精确值 = {exactText}
                  </text>
                </g>
              )}
              <circle
                cx={X1}
                cy={fx(BASE - (total / cumMax) * PLOT_H)}
                r="5"
                fill={C.accent}
              />
              <text
                x={fx(X1 - 8)}
                y={fx(BASE - (total / cumMax) * PLOT_H + 24)}
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                逐项累加 S = {fmtNum(total)}
              </text>
              <rect
                x="30"
                y="440"
                width="840"
                height="56"
                rx="12"
                fill={mismatched ? C.warning : C.elevated}
                fillOpacity={mismatched ? 0.12 : 1}
                stroke={mismatched ? C.warning : C.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="464"
                fontSize="12"
                fontWeight="700"
                fill={mismatched ? C.warning : C.primary}
              >
                {mismatched
                  ? `对账不平：阶梯线停在 ${fmtNum(total)}，公式给 ${exactText}，差额恰是末项 ${fmtNum(lastTerm)}`
                  : `对账一致：循环累加 ${fmtNum(total)} = closed-form ${exactText}（调和无 closed-form，用 Hₙ 数值对照）`}
              </text>
              <text x="52" y="484" fontSize="11" fill={C.secondary}>
                {mismatched
                  ? "渐近类也许没变，但精确计数、概率归一与后续裂项边界已被破坏。"
                  : "公式与逐项累加互相印证，账本才可作为后续推导的出发点。"}
              </text>
            </g>

            <g
              ref={(node) => {
                stageRefs.current[2] = node;
              }}
              style={{ opacity: 0 }}
            >
              <text
                x="30"
                y="92"
                fontSize="13"
                fontWeight="700"
                fill={C.accent}
              >
                第 3 步 · 积分夹逼：单位宽度矩形与曲线互相 sandwich
              </text>
              {terms.map((v, i) => {
                const k = i + 1;
                const leftH = (v / vmax) * PLOT_H;
                const rightH = (term(k + 1, family, r) / vmax) * PLOT_H;
                return (
                  <g key={`rect-${k}`}>
                    <rect
                      x={fx(X0 + i * slotW)}
                      y={fx(BASE - leftH)}
                      width={fx(slotW)}
                      height={fx(leftH)}
                      fill={C.accent}
                      fillOpacity="0.12"
                      stroke={C.accent}
                      strokeWidth="0.7"
                    />
                    <rect
                      x={fx(X0 + i * slotW)}
                      y={fx(BASE - rightH)}
                      width={fx(slotW)}
                      height={fx(rightH)}
                      fill={C.secondary}
                      fillOpacity="0.10"
                      stroke={C.secondary}
                      strokeWidth="0.5"
                    />
                  </g>
                );
              })}
              <polyline
                points={curvePts.join(" ")}
                fill="none"
                stroke={C.primary}
                strokeWidth="2.2"
              />
              <line
                x1={X0 - 10}
                y1={BASE}
                x2={X1 + 10}
                y2={BASE}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <rect
                x="30"
                y="440"
                width="840"
                height="76"
                rx="12"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="464"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                {increasing
                  ? `f 递增：左矩形在曲线下方、右矩形在上方 → f(1)+∫₁ⁿ ≤ Sₙ ≤ ∫₁ⁿ⁺¹`
                  : `f 递减：左矩形在曲线上方、右矩形在下方 → ∫₁ⁿ⁺¹ ≤ Sₙ ≤ f(1)+∫₁ⁿ`}
              </text>
              <text x="52" y="486" fontSize="12" fill={C.accent}>
                下界 {fmtNum(low)} ≤ Sₙ = {fmtNum(exactValue)} ≤ 上界{" "}
                {fmtNum(high)}
              </text>
              <text x="52" y="506" fontSize="11" fill={C.secondary}>
                上下界只相差一个低阶项（首项或末项），夹出的渐近类才是紧界。
              </text>
            </g>

            <g
              ref={(node) => {
                stageRefs.current[3] = node;
              }}
              style={{ opacity: 0 }}
            >
              <text
                x="30"
                y="92"
                fontSize="13"
                fontWeight="700"
                fill={C.accent}
              >
                第 4 步 · 判型给界：Θ 结论需要上界与下界配对，故障模式演示丢末项
              </text>

              <rect
                x="30"
                y="110"
                width="260"
                height="300"
                rx="12"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="140"
                fontSize="12"
                fontWeight="700"
                fill={C.secondary}
              >
                ① 先看形状
              </text>
              <text
                x="52"
                y="186"
                fontSize="24"
                fontWeight="700"
                fill={C.accent}
              >
                {thetaOf(family, r)}
              </text>
              <text x="52" y="216" fontSize="11" fill={C.secondary}>
                {family === "geometric" && r > 1
                  ? "末项主导：S 与 f(n) 同阶"
                  : family === "geometric" && r < 1
                    ? "首项主导：总和被常数夹住"
                    : family === "harmonic"
                      ? "增长像 log：介于常数与线性之间"
                      : "幂次和比末项高一次幂"}
              </text>
              <text x="52" y="240" fontSize="11" fill={C.secondary}>
                判型顺序：polynomial → geometric
              </text>
              <text x="52" y="258" fontSize="11" fill={C.secondary}>
                → harmonic → telescoping → mixed
              </text>
              <text x="52" y="290" fontSize="11" fill={C.primary}>
                机械套“最大项 × 项数”：
              </text>
              <text x="52" y="308" fontSize="11" fill={C.primary}>
                这里给{" "}
                {family === "geometric" && r > 1 ? `n·rⁿ = O 但松` : "松界"}
              </text>
              <text x="52" y="336" fontSize="11" fill={C.secondary}>
                等比恒等式才能把多余的 n
              </text>
              <text x="52" y="354" fontSize="11" fill={C.secondary}>
                或 log 从界里消掉。
              </text>

              <rect
                x="320"
                y="110"
                width="260"
                height="300"
                rx="12"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x="342"
                y="140"
                fontSize="12"
                fontWeight="700"
                fill={C.secondary}
              >
                ② 再配对上下界
              </text>
              <text x="342" y="170" fontSize="11" fill={C.secondary}>
                下界 {fmtNum(low)}
              </text>
              <text x="342" y="190" fontSize="11" fill={C.secondary}>
                上界 {fmtNum(high)}
              </text>
              <text
                x="342"
                y="222"
                fontSize="12"
                fontWeight="700"
                fill={C.success}
              >
                两侧同阶 ⇒ {thetaOf(family, r)} 是紧界
              </text>
              <text x="342" y="252" fontSize="11" fill={C.secondary}>
                只证 O 不说明 tight；
              </text>
              <text x="342" y="270" fontSize="11" fill={C.secondary}>
                只证 Ω 不说明够小。
              </text>
              <text x="342" y="300" fontSize="11" fill={C.primary}>
                比值 high/low ≈ {(high / Math.max(low, 1e-12)).toFixed(2)} → 1
              </text>
              <text x="342" y="320" fontSize="11" fill={C.secondary}>
                常数因子差意味着夹逼成功。
              </text>

              <rect
                x="610"
                y="110"
                width="260"
                height="300"
                rx="12"
                fill={excludeLast ? C.warning : C.elevated}
                fillOpacity={excludeLast ? 0.12 : 1}
                stroke={excludeLast ? C.warning : C.border}
                strokeWidth="1.5"
              />
              <text
                x="632"
                y="140"
                fontSize="12"
                fontWeight="700"
                fill={excludeLast ? C.warning : C.secondary}
              >
                ③ 故障 witness
              </text>
              <text
                x="632"
                y="170"
                fontSize="11"
                fontWeight="700"
                fill={excludeLast ? C.warning : C.success}
              >
                {excludeLast
                  ? `丢掉的末项 f(${n}) = ${fmtNum(lastTerm)}`
                  : "正确账本运行中"}
              </text>
              <text x="632" y="192" fontSize="11" fill={C.secondary}>
                {excludeLast
                  ? `占正确总额的 ${lastShare.toFixed(1)}%`
                  : "S 与公式对账一致"}
              </text>
              <text x="632" y="222" fontSize="11" fill={C.primary}>
                {excludeLast
                  ? `S 从 ${fmtNum(exactValue)} 变成 ${fmtNum(total)}`
                  : "展开首尾各两项可复核"}
              </text>
              <text x="632" y="240" fontSize="11" fill={C.primary}>
                {excludeLast ? "——精确计数已破坏" : "上下界与换元是否同步"}
              </text>
              <text x="632" y="270" fontSize="11" fill={C.secondary}>
                {excludeLast
                  ? "Θ 类可能不变，但概率归一、"
                  : "渐近结论不能替代 exact"}
              </text>
              <text x="632" y="288" fontSize="11" fill={C.secondary}>
                {excludeLast
                  ? "exact count 与裂项边界全失效。"
                  : "count——两者都要写进证书。"}
              </text>
            </g>

            <g>
              <rect
                x="30"
                y="540"
                width="840"
                height="76"
                rx="12"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="566"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                结论：可靠求和推导 = 逐项清单 + closed-form 对账 + 配对夹逼 +
                形状判型
              </text>
              <text x="52" y="590" fontSize="11" fill={C.secondary}>
                切换形状与 n，观察末项占比、夹逼宽度与紧界如何联动；Reset
                恢复默认账本后重放时间线。
              </text>
              <text
                x="858"
                y="566"
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill={excludeLast ? C.danger : C.success}
              >
                {excludeLast ? "故障模型运行中" : "正确模型运行中"}
              </text>
              <text
                x="858"
                y="590"
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                {excludeLast
                  ? `末项缺失，差额 ${fmtNum(faultDelta)}`
                  : `当前步骤：${SUM_STEPS[stepIndex]?.label ?? "terms"}`}
              </text>
            </g>
          </svg>
        </div>
        <p
          className="mt-3 rounded-control bg-bg px-3 py-2 text-sm leading-6 text-primary"
          aria-live="polite"
        >
          当前账本：{FAMILY_LABEL[family]}，n = {n}，逐项和 = {fmtNum(total)}；
          {exact === null
            ? `数值核对 Hₙ ≈ ${fmtNum(exactValue)}`
            : `闭式核对 = ${fmtNum(exact)}`}
          ；积分夹逼 [{fmtNum(low)}, {fmtNum(high)}]；渐近类{" "}
          {thetaOf(family, r)}。
          {excludeLast
            ? `故障已注入：少计末项 ${fmtNum(faultDelta)}。`
            : "未注入边界故障。"}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-fault="treat-upper-bound-as-exclusive"
            aria-pressed={excludeLast}
            onClick={() => {
              setExcludeLast((prev) => !prev);
              timeline.seek(0);
            }}
            className={`min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              excludeLast
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            注入故障：把上界 n 当开区间（丢末项）
          </button>
          <span className="text-xs leading-5 text-secondary">
            现象：累加值与 closed-form 对账不平 → 原因：Σₖ₌₁ⁿ
            的最后一项被悄悄丢掉，exact count 少 f(n) →
            修法：展开首尾各两项，确认上下界闭开与项数 n 还是 n+1。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={SUM_LABEL_TEXT}
          caption="先预测 r 调小后末项占比与夹逼宽度的变化，再逐步核对清单、对账、夹逼与判型。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置求和夹逼实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        求和推导的四件交付物：逐项形状清单、与 closed-form 对账的累加阶梯、 积分
        sandwich 的配对上下界、以及写清闭开边界的判定证书。
      </figcaption>
    </figure>
  );
}
