"use client";

import { useMemo, useRef, useState } from "react";

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

/* ---------- 复数与 radix-2 FFT oracle（n 为 2 的幂，完全确定） ---------- */

type Cx = { re: number; im: number };

const cx = (re: number, im = 0): Cx => ({ re, im });

function cAdd(a: Cx, b: Cx): Cx {
  return { re: a.re + b.re, im: a.im + b.im };
}
function cSub(a: Cx, b: Cx): Cx {
  return { re: a.re - b.re, im: a.im - b.im };
}
function cMul(a: Cx, b: Cx): Cx {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

/** 递归 radix-2 FFT：invert=false 用 ωₙ=e^{2πi/n}（正变换），true 用共轭根。 */
function fft(a: readonly Cx[], invert: boolean): Cx[] {
  const n = a.length;
  if (n === 1) return [a[0]];
  const even: Cx[] = [];
  const odd: Cx[] = [];
  for (let i = 0; i < n; i += 2) {
    even.push(a[i]);
    odd.push(a[i + 1]);
  }
  const E = fft(even, invert);
  const O = fft(odd, invert);
  const ang = ((invert ? -2 : 2) * Math.PI) / n;
  const step = cx(Math.cos(ang), Math.sin(ang));
  let w = cx(1, 0);
  const out: Cx[] = new Array(n);
  for (let k = 0; k < n / 2; k += 1) {
    const t = cMul(w, O[k]);
    out[k] = cAdd(E[k], t);
    out[k + n / 2] = cSub(E[k], t);
    w = cMul(w, step);
  }
  return out;
}

/** 逆变换：共轭根 FFT 后除以 n。 */
function ifft(a: readonly Cx[]): Cx[] {
  const n = a.length;
  return fft(a, true).map((z) => cx(z.re / n, z.im / n));
}

/** 朴素线性卷积（真值 oracle）。 */
function conv(a: readonly number[], b: readonly number[]): number[] {
  const out: number[] = new Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => {
    b.forEach((y, j) => {
      out[i + j] += x * y;
    });
  });
  return out;
}

/** 把系数列补零 / 截断到 length。 */
function pad(a: readonly number[], length: number): Cx[] {
  const out: Cx[] = [];
  for (let i = 0; i < length; i += 1) out.push(cx(a[i] ?? 0, 0));
  return out;
}

/** 按最近整数吸附（误差 < 1e-6 视为精确整数，展示层取整）。 */
function snap(z: Cx): number {
  const r = z.re;
  const nearest = Math.round(r);
  return Math.abs(r - nearest) < 1e-6 ? nearest : fx(r);
}

/* ---------- 实验数据 ---------- */

const N_NORMAL = 8;
const N_FAULT = 4;

type PolyPreset = {
  id: string;
  label: string;
  note: string;
  a: readonly number[];
  b: readonly number[];
};

const PRESETS: readonly PolyPreset[] = [
  {
    id: "p1",
    label: "A=1+2x+3x²+2x³ · B=1−x+x²",
    note: "乘积 6 项；补零到 n=8 正确，砍到 n=4 时 c₄、c₅ 会卷绕回 c₀、c₁",
    a: [1, 2, 3, 2],
    b: [1, -1, 1],
  },
  {
    id: "p2",
    label: "A=1−x² · B=1+x+x²+x³",
    note: "乘积 6 项；n=4 卷绕后 c₁、c₂ 互相抵消一部分，肉眼易误判为“差不多对”",
    a: [1, 0, -1, 0],
    b: [1, 1, 1, 1],
  },
  {
    id: "p3",
    label: "A=2−x+3x² · B=3+4x−2x²",
    note: "乘积 5 项；n=4 卷绕时 c₀ = 6 + (−6) = 0，真值 6 被完全吞掉",
    a: [2, -1, 3],
    b: [3, 4, -2],
  },
];

const DEFAULT_PRESET = "p1";

const SUB = "₀₁₂₃₄₅₆₇₈₉";
function sub(n: number): string {
  return String(n)
    .split("")
    .map((d) => SUB[Number(d)])
    .join("");
}

function twiddle(w: number, j: number): string {
  return `ω${sub(w)}${j === 0 ? "⁰" : sub(j)}`;
}

/* ---------- 蝶形网络几何（n=8，DIT：输入位反转、输出自然序） ---------- */

const NET_N = 8;
const NET_XS = [80, 240, 400, 560, 720] as const;
const NET_Y0 = 384;
const NET_DY = 19;
const netY = (i: number) => NET_Y0 + NET_DY * i;

/** 位反转排列（n=8）：递归奇偶拆分依次抽取最低位。 */
const BIT_REV = [0, 4, 2, 6, 1, 5, 3, 7];

/** stage s（1..3），蝶形宽度 w=2^s；返回每组 (k, k+半宽, 旋转因子指数 j)。 */
function stagePairs(s: number): Array<{ k: number; half: number; j: number }> {
  const w = 2 ** s;
  const half = w / 2;
  const out: Array<{ k: number; half: number; j: number }> = [];
  for (let k = 0; k < NET_N; k += 1) {
    if ((k & half) === 0) out.push({ k, half, j: k % half });
  }
  return out;
}

/* ---------- 时间线步骤 ---------- */

const FFT_STEPS: readonly TeachingStep[] = [
  {
    label: "represent",
    caption: "两种表示并排：系数条 ↔ 单位圆上的 8 个点值",
  },
  {
    label: "split",
    caption: "按系数下标奇偶拆分，规模减半的两个子问题",
  },
  {
    label: "butterfly",
    caption: "3 层蝶形网络：位反转输入、旋转因子逐层加密",
  },
  {
    label: "multiply",
    caption: "逐点相乘 → 逆变换 → 与朴素卷积逐系数对账",
  },
];

const FFT_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  FFT_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

/* ---------- Lab ---------- */

export function Clrs4Chapter30PolynomialsFftLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [presetId, setPresetId] = useState<string>(DEFAULT_PRESET);
  const [faultShort, setFaultShort] = useState(false);

  const timeline = useTeachingTimeline({
    steps: FFT_STEPS,
    build: (tl) => {
      FFT_STEPS.forEach((step, index) => {
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

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const needLen = preset.a.length + preset.b.length - 1;

  const oracle = useMemo(() => {
    const naive = conv(preset.a, preset.b);
    // 正常管线：补零到 n=8，FFT → 逐点乘 → IFFT。
    const n = N_NORMAL;
    const A = fft(pad(preset.a, n), false);
    const B = fft(pad(preset.b, n), false);
    const rec = ifft(A.map((v, k) => cMul(v, B[k]))).map(snap);
    // 故障管线：只补零到 n=4，高阶系数循环卷绕。
    const m = N_FAULT;
    const Af = fft(pad(preset.a, m), false);
    const Bf = fft(pad(preset.b, m), false);
    const recF = ifft(Af.map((v, k) => cMul(v, Bf[k]))).map(snap);
    const mismatch = recF.filter(
      (v, k) => Math.abs(v - (naive[k] ?? 0)) > 1e-6,
    ).length;
    const maxErr = Math.max(...naive.map((v, k) => Math.abs(rec[k] - v)));
    return { naive, rec, recF, mismatch, maxErr };
  }, [preset]);

  // Stage 0 右栏：A 补零到 8 的 DFT 点值，画在复平面上。
  const spectrum = useMemo(() => {
    const Y = fft(pad(preset.a, N_NORMAL), false);
    const m = Math.max(1, ...Y.map((z) => Math.hypot(z.re, z.im)));
    return { Y, m };
  }, [preset]);

  const applyPreset = (id: string) => {
    setPresetId(id);
    timeline.seek(0);
  };

  const reset = () => {
    setPresetId(DEFAULT_PRESET);
    setFaultShort(false);
    timeline.seek(0);
  };

  const shown = faultShort ? oracle.recF : oracle.rec;
  const naiveHead = oracle.naive.slice(0, shown.length);
  const consistent = !faultShort && oracle.maxErr < 1e-6;
  const wrapped = faultShort && oracle.mismatch > 0;

  const BAR_SCALE = 7;
  const renderBar = (
    v: number,
    x: number,
    baseline: number,
    fill: string,
    key: string,
    faultBar = false,
  ) => {
    const h = fx(Math.abs(v) * BAR_SCALE);
    const y = v >= 0 ? baseline - h : baseline;
    return (
      <g key={key}>
        <rect
          x={fx(x)}
          y={y}
          width={22}
          height={Math.max(h, 1)}
          fill={fill}
          opacity={faultBar ? 0.45 : 0.85}
          stroke={faultBar ? C.danger : "none"}
          strokeWidth={faultBar ? 2 : 0}
          strokeDasharray={faultBar ? "4 3" : undefined}
        />
        <text
          x={fx(x + 11)}
          y={v >= 0 ? y - 5 : y + h + 14}
          textAnchor="middle"
          fontSize="11"
          fill={faultBar ? C.danger : C.primary}
        >
          {fmt(v)}
        </text>
      </g>
    );
  };

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="fft-butterfly-network-representation-change"
      data-readout="fft-convolution-oracle"
      data-status={
        faultShort
          ? wrapped
            ? "cyclic-wrap"
            : "accidentally-ok"
          : "consistent"
      }
      data-transform-length={faultShort ? N_FAULT : N_NORMAL}
      data-required-length={needLen}
      data-max-error={fx(oracle.maxErr)}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 30 · Polynomials and the FFT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              表示切换 × 奇偶拆分 × 蝶形网络：一条 FFT 多项式乘法流水线
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：换成第三组多项式、或注入「补零不足」故障把变换长度从 8
              砍到
              4，恢复出的乘积系数会在哪里偏离真值？先预测，再推进时间线核对蝶形轨迹与对账读数。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-primary">多项式对</span>
          <div
            role="radiogroup"
            aria-label="多项式对"
            className="flex flex-wrap gap-2"
          >
            {PRESETS.map((p) => (
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
                  name="fft-preset"
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

        <nav className="mb-3" aria-label="FFT 可视化步骤">
          <p className="mb-2 text-xs font-semibold text-primary">
            跳到可视化步骤
          </p>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FFT_STEPS.map((step, index) => {
              const active = timeline.currentStep === index;
              return (
                <li key={step.label}>
                  <button
                    type="button"
                    onClick={() => timeline.goToStep(index)}
                    aria-current={active ? "step" : undefined}
                    className={`min-h-11 w-full rounded-control border px-2 py-2 text-left text-xs leading-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      active
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                  >
                    <span className="font-semibold">{index + 1}. </span>
                    {step.caption}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <p
          className="mb-2 text-xs leading-5 text-secondary sm:hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          当前步骤：
          {FFT_STEPS[timeline.currentStep]?.caption ?? FFT_STEPS[0].caption}
          。下方网络可左右滑动；也可用上方步骤按钮直接跳转。
        </p>
        <div
          className="overflow-x-auto rounded-control border border-border/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          role="region"
          aria-label="FFT 交互图；窄屏可横向滚动查看"
          tabIndex={0}
        >
          <svg
            viewBox="0 0 800 720"
            role="img"
            aria-label="CLRS 4e 第 30 章多项式与 FFT 专属实验。第一步并排展示多项式的系数表示（aⱼ、bⱼ 系数条）与点值表示（A 在 8 个 8 次单位根处的取值 yₖ，画在复平面上并按最大模长缩放；圆仅作参考范围，散点不是单位根）；第二步演示按系数下标奇偶把 A 拆成 A⁰ 与 A¹ 两个规模减半的子问题；第三步画出 n=8 的蝶形网络：输入按位反转排列，3 层各 4 只蝴蝶，旋转因子从 ω₂⁰ 逐层加密到 ω₈⁰ 至 ω₈³，并高亮 ω₈⁴=−ω₈⁰ 的合并复用；第四步把两条 FFT 流水线（逐点相乘、逆变换、除以 n）恢复的乘积系数与朴素卷积真值逐条对账。故障注入把补零长度从 8 砍到 4，高阶系数循环卷绕回低阶，红色虚线条标出被污染的系数。支持播放、暂停、单步、拖进度、多项式对切换、故障注入和重置。"
            className="h-auto min-w-[800px] w-full"
          >
            {/* Stage 0：两种表示并排 */}
            <g
              ref={(el) => {
                stageRefs.current[0] = el;
              }}
              opacity={1}
            >
              <text
                x={40}
                y={50}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                系数表示：A 的 aⱼ（上排）与 B 的 bⱼ（下排）
              </text>
              <text
                x={440}
                y={50}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                点值表示：A 在 8 个单位根处的取值 yₖ（复平面）
              </text>

              {/* A 系数条 */}
              {preset.a.map((v, i) => {
                const x = 64 + i * 34;
                const h = fx(Math.abs(v) * 13);
                return (
                  <g key={`a-${i}`}>
                    <rect
                      x={x}
                      y={v >= 0 ? 120 - h : 120}
                      width={26}
                      height={Math.max(h, 1)}
                      fill={v >= 0 ? C.accent : C.warning}
                      opacity={0.85}
                    />
                    <text
                      x={fx(x + 13)}
                      y={v >= 0 ? 120 - h - 5 : 120 + h + 13}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.primary}
                    >
                      {fmt(v)}
                    </text>
                    <text
                      x={fx(x + 13)}
                      y={138}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.secondary}
                    >
                      {`a${sub(i)}`}
                    </text>
                  </g>
                );
              })}
              {/* B 系数条 */}
              {preset.b.map((v, i) => {
                const x = 64 + i * 34;
                const h = fx(Math.abs(v) * 13);
                return (
                  <g key={`b-${i}`}>
                    <rect
                      x={x}
                      y={v >= 0 ? 176 - h : 176}
                      width={26}
                      height={Math.max(h, 1)}
                      fill={v >= 0 ? C.secondary : C.warning}
                      opacity={0.7}
                    />
                    <text
                      x={fx(x + 13)}
                      y={v >= 0 ? 176 - h - 5 : 176 + h + 13}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.primary}
                    >
                      {fmt(v)}
                    </text>
                    <text
                      x={fx(x + 13)}
                      y={194}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.secondary}
                    >
                      {`b${sub(i)}`}
                    </text>
                  </g>
                );
              })}

              {/* 单位圆 + DFT 点值 */}
              <g>
                <circle
                  cx={620}
                  cy={132}
                  r={60}
                  fill={C.elevated}
                  stroke={C.border}
                  strokeWidth="1.5"
                />
                <line
                  x1={545}
                  y1={132}
                  x2={695}
                  y2={132}
                  stroke={C.border}
                  strokeDasharray="3 4"
                />
                <line
                  x1={620}
                  y1={57}
                  x2={620}
                  y2={207}
                  stroke={C.border}
                  strokeDasharray="3 4"
                />
                <text
                  x={620}
                  y={132}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  0
                </text>
                {spectrum.Y.map((z, k) => {
                  const s = (60 / spectrum.m) * 0.92;
                  const px = fx(620 + z.re * s);
                  const py = fx(132 - z.im * s);
                  const lx = fx(620 + z.re * s * 1.3);
                  const ly = fx(132 - z.im * s * 1.3);
                  return (
                    <g key={`yk-${k}`}>
                      <circle cx={px} cy={py} r="4" fill={C.accent} />
                      <text
                        x={lx}
                        y={ly + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.accent}
                      >
                        {`y${sub(k)}`}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={620}
                  y={214}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  散点 yₖ=A(ω₈ᵏ) 按最大模长缩放；圆仅作参考
                </text>
              </g>
            </g>

            {/* Stage 1：奇偶拆分 */}
            <g
              ref={(el) => {
                stageRefs.current[1] = el;
              }}
              opacity={0}
            >
              <text
                x={40}
                y={240}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                奇偶拆分：A(x) = A⁰(x²) + x·A¹(x²)，两个规模减半的子问题（以 A
                为例）
              </text>

              {/* 原系数条 */}
              {preset.a.map((v, i) => {
                const x = 64 + i * 34;
                const h = fx(Math.abs(v) * 13);
                const even = i % 2 === 0;
                return (
                  <g key={`split-a-${i}`}>
                    <rect
                      x={x}
                      y={v >= 0 ? 292 - h : 292}
                      width={26}
                      height={Math.max(h, 1)}
                      fill={even ? C.accent : C.secondary}
                      opacity={0.85}
                    />
                    <text
                      x={fx(x + 13)}
                      y={v >= 0 ? 292 - h - 5 : 292 + h + 13}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.primary}
                    >
                      {`a${sub(i)}=${fmt(v)}`}
                    </text>
                  </g>
                );
              })}

              {/* 映射箭头：偶 → A⁰，奇 → A¹ */}
              {preset.a.map((v, i) => {
                const fromX = 64 + i * 34 + 13;
                const h = Math.abs(v) * 13;
                const fromY = v >= 0 ? 292 - h : 292 + h;
                const slot = Math.floor(i / 2);
                const toX = (i % 2 === 0 ? 480 : 640) + slot * 34 + 13;
                return (
                  <line
                    key={`arrow-${i}`}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={278}
                    stroke={i % 2 === 0 ? C.accent : C.secondary}
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    opacity={0.7}
                    markerEnd="url(#fft-arrow)"
                  />
                );
              })}

              {/* A⁰ / A¹ 目标条 */}
              {preset.a.map((v, i) => {
                const slot = Math.floor(i / 2);
                const x = (i % 2 === 0 ? 480 : 640) + slot * 34;
                const h = fx(Math.abs(v) * 13);
                return (
                  <rect
                    key={`tgt-${i}`}
                    x={x}
                    y={v >= 0 ? 292 - h : 292}
                    width={26}
                    height={Math.max(h, 1)}
                    fill={i % 2 === 0 ? C.accent : C.secondary}
                    opacity={0.55}
                    stroke={i % 2 === 0 ? C.accent : C.secondary}
                    strokeWidth="1.5"
                  />
                );
              })}
              <text
                x={480}
                y={322}
                fontSize="11"
                fill={C.accent}
                fontWeight="600"
              >
                A⁰ =（偶数项 a₀ a₂ …）
              </text>
              <text
                x={640}
                y={322}
                fontSize="11"
                fill={C.secondary}
                fontWeight="600"
              >
                A¹ =（奇数项 a₁ a₃ …）
              </text>
              <text x={40} y={340} fontSize="11" fill={C.secondary}>
                关键：采样点平方后减半（ωₙ² = ωₙ/₂），子问题是同类型的更小
                DFT，可递归
              </text>
            </g>

            {/* Stage 2：蝶形网络 */}
            <g
              ref={(el) => {
                stageRefs.current[2] = el;
              }}
              opacity={0}
            >
              <text
                x={40}
                y={364}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                蝶形网络：3 层 × 4
                只蝴蝶；左侧输入按位反转排列（a₀a₄a₂a₆a₁a₅a₃a₇）
              </text>
              <text
                x={640}
                y={380}
                textAnchor="middle"
                fontSize="11"
                fill={C.accent}
                fontWeight="600"
              >
                ω₈⁴=−ω₈⁰：后半输出=前半∓同一项
              </text>

              {/* 连线（先画线，再画节点压住端点） */}
              {[1, 2, 3].map((s) =>
                stagePairs(s).map(({ k, half, j }) => {
                  const x1 = NET_XS[s - 1];
                  const x2 = NET_XS[s];
                  const w = half * 2;
                  const hot = s === 3 && k === 0;
                  const stroke = hot ? C.accent : C.border;
                  const wgt = hot ? 2.4 : 1.1;
                  const mx = fx((x1 + x2) / 2 + 6);
                  const my = fx((netY(k) + netY(k + half)) / 2);
                  return (
                    <g key={`edge-${s}-${k}`}>
                      <line
                        x1={x1}
                        y1={netY(k)}
                        x2={x2}
                        y2={netY(k)}
                        stroke={stroke}
                        strokeWidth={wgt}
                      />
                      <line
                        x1={x1}
                        y1={netY(k + half)}
                        x2={x2}
                        y2={netY(k)}
                        stroke={hot ? C.accent : C.secondary}
                        strokeWidth={hot ? 2.4 : 1}
                        opacity={hot ? 0.95 : 0.65}
                      />
                      <line
                        x1={x1}
                        y1={netY(k)}
                        x2={x2}
                        y2={netY(k + half)}
                        stroke={hot ? C.accent : C.secondary}
                        strokeWidth={hot ? 2.4 : 1}
                        opacity={hot ? 0.95 : 0.65}
                      />
                      <line
                        x1={x1}
                        y1={netY(k + half)}
                        x2={x2}
                        y2={netY(k + half)}
                        stroke={stroke}
                        strokeWidth={wgt}
                      />
                      <text
                        x={mx}
                        y={my}
                        textAnchor="middle"
                        fontSize="11"
                        fill={hot ? C.accent : C.secondary}
                      >
                        {twiddle(w, j)}
                      </text>
                    </g>
                  );
                }),
              )}

              {/* 输入列（位反转） */}
              {BIT_REV.map((idx, pos) => (
                <g key={`in-${pos}`}>
                  <circle
                    cx={NET_XS[0]}
                    cy={netY(pos)}
                    r="5"
                    fill={C.primary}
                  />
                  <text
                    x={NET_XS[0] - 12}
                    y={fx(netY(pos) + 4)}
                    textAnchor="end"
                    fontSize="11"
                    fill={C.primary}
                  >
                    {`a${sub(idx)}`}
                  </text>
                </g>
              ))}
              {/* 中间列与输出列 */}
              {[1, 2, 3, 4].map((col) =>
                Array.from({ length: NET_N }, (_, i) => (
                  <circle
                    key={`col-${col}-${i}`}
                    cx={NET_XS[col]}
                    cy={netY(i)}
                    r="4.5"
                    fill={col === 4 ? C.accent : C.elevated}
                    stroke={col === 4 ? C.accent : C.primary}
                    strokeWidth="1.5"
                  />
                )),
              )}
              {Array.from({ length: NET_N }, (_, i) => (
                <text
                  key={`out-${i}`}
                  x={NET_XS[4] + 12}
                  y={fx(netY(i) + 4)}
                  fontSize="11"
                  fill={C.accent}
                >
                  {`y${sub(i)}`}
                </text>
              ))}

              {/* 列标注 */}
              <text
                x={NET_XS[0]}
                y={538}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                位反转输入
              </text>
              <text
                x={NET_XS[1]}
                y={538}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                第 1 层 w=2
              </text>
              <text
                x={NET_XS[2]}
                y={538}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                第 2 层 w=4
              </text>
              <text
                x={NET_XS[3]}
                y={538}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                第 3 层 w=8
              </text>
              <text
                x={NET_XS[4]}
                y={538}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                输出（自然序）
              </text>
            </g>

            {/* Stage 3：逐点相乘 + 逆变换 + 对账 */}
            <g
              ref={(el) => {
                stageRefs.current[3] = el;
              }}
              opacity={0}
            >
              <text
                x={40}
                y={566}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                逐点相乘 → 逆变换（除以 n）→ 与朴素卷积逐系数对账
              </text>
              <text
                x={64}
                y={590}
                fontSize="11"
                fill={C.secondary}
                fontWeight="600"
              >
                朴素卷积（直接相乘，真值）
              </text>
              <text
                x={440}
                y={590}
                fontSize="11"
                fill={C.secondary}
                fontWeight="600"
              >
                {faultShort
                  ? `n=${N_FAULT} 流水线恢复（补零不足）`
                  : "FFT 流水线恢复（按最近整数取整）"}
              </text>

              {naiveHead.map((v, i) =>
                renderBar(v, 64 + i * 30, 650, C.primary, `naive-${i}`),
              )}
              {naiveHead.map((v, i) => (
                <text
                  key={`naive-idx-${i}`}
                  x={fx(64 + i * 30 + 11)}
                  y={668}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {`c${sub(i)}`}
                </text>
              ))}
              {shown.map((v, i) =>
                renderBar(
                  v,
                  440 + i * 30,
                  650,
                  faultShort ? C.danger : C.accent,
                  `rec-${i}`,
                  faultShort,
                ),
              )}
              {shown.map((v, i) => (
                <text
                  key={`rec-idx-${i}`}
                  x={fx(440 + i * 30 + 11)}
                  y={668}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faultShort ? C.danger : C.secondary}
                >
                  {`c${sub(i)}`}
                </text>
              ))}
              {faultShort && (
                <text
                  x={440}
                  y={700}
                  fontSize="11"
                  fill={C.danger}
                  fontWeight="600"
                >
                  {wrapped
                    ? `循环卷绕：${oracle.mismatch}/${shown.length} 个系数被污染（红色虚线），真值在左列`
                    : "这次恰好够用：n=4 ≥ 需求——边界上没翻车，换一组试试"}
                </text>
              )}
            </g>

            <defs>
              <marker
                id="fft-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.secondary} />
              </marker>
            </defs>

            <text
              x={760}
              y={30}
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {`步骤：${FFT_STEPS[timeline.currentStep]?.label ?? "represent"}`}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">变换长度</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                faultShort && needLen > N_FAULT ? "text-danger" : "text-primary"
              }`}
            >
              {faultShort
                ? `n = ${N_FAULT}（需求 ${needLen}，补零不足）`
                : `n = ${N_NORMAL} ≥ 需求 ${needLen}`}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">工作量</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              朴素 Θ(p·q) vs FFT Θ(n log n)
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">与真值对账</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                consistent ? "text-success" : "text-danger"
              }`}
            >
              {faultShort
                ? `${oracle.mismatch}/${shown.length} 个系数不符`
                : `max|误差| = ${fmt(oracle.maxErr)}`}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">流水线状态</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                consistent ? "text-success" : "text-danger"
              }`}
              data-status-chip
            >
              {consistent
                ? "✓ 与朴素卷积一致"
                : wrapped
                  ? "✗ 循环卷绕（cyclic wrap）"
                  : "✓ 边界恰好够用"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              faultShort
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={faultShort}
              onChange={(e) => {
                setFaultShort(e.target.checked);
                timeline.seek(0);
              }}
              data-fault="short-zero-padding"
              className="h-4 w-4 accent-[var(--danger)]"
            />
            注入故障：补零长度 8 → 4
          </label>
          <span className="max-w-xl text-xs leading-5 text-secondary">
            现象：恢复出的低阶系数莫名出错甚至恰好抵消 → 原因：变换长度小于 deg
            A + deg B + 1，高阶系数做模 n 循环卷绕，不是丢尾巴 →
            修法：把两条输入都补零到 ≥ p+q+1（radix-2 再取不小于它的 2
            的幂），并始终拿朴素卷积对拍。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={FFT_LABEL_TEXT}
          caption="先预测换组或注入故障后哪个系数先翻车，再推进时间线；第四步看恢复结果与朴素卷积的逐条对账。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 FFT 流水线实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        乘法在点值表示里是逐点相乘；FFT
        用奇偶拆分和「后半输出取负」的复用，把系数表示与点值表示之间的往返从平方级压到
        n log n——但补零长度错了，循环卷绕会安静地污染低阶系数。
      </figcaption>
    </figure>
  );
}
