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
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

/** 仅用于最终绘制坐标的有限值守卫：数学读数一律不取整。 */
function draw(n: number): number {
  return Number((Number.isFinite(n) ? n : 0).toFixed(9));
}

/** 大数压缩显示（SVG 标签用），不改变任何参与计算的数值。 */
function fmt(v: number): string {
  if (!Number.isFinite(v)) return "溢出";
  const a = Math.abs(v);
  if (a >= 10000) return v.toExponential(1);
  if (Number.isInteger(v)) return String(v);
  return String(Number(v.toFixed(2)));
}

function pctOf(progress: number): number {
  return Math.round(progress * 100);
}

/* ------------------------------------------------------------------ */
/* Lab 1 · 见证包络：固定 c 的 c·g(n) 对 f(n) 覆盖审计                */
/* ------------------------------------------------------------------ */

type FamilyKey = "quad-mix" | "half-quad" | "linear-mix" | "super-quad";

type FamilySpec = {
  label: string;
  f: (n: number) => number;
  g: (n: number) => number;
  /** 固定的下见证常数，用于 Θ 双边审计。 */
  c1: number;
  note: string;
};

const FAMILIES: Record<FamilyKey, FamilySpec> = {
  "quad-mix": {
    label: "f = 3n²+2n+1 · g = n²",
    f: (n) => 3 * n * n + 2 * n + 1,
    g: (n) => n * n,
    c1: 3,
    note: "最高次同为二次，应得 Θ(n²)",
  },
  "half-quad": {
    label: "f = n²/2+n · g = n²",
    f: (n) => 0.5 * n * n + n,
    g: (n) => n * n,
    c1: 0.5,
    note: "首项折半不改变增长等级",
  },
  "linear-mix": {
    label: "f = n+10 · g = n²",
    f: (n) => n + 10,
    g: (n) => n * n,
    c1: 1,
    note: "只有松上界：O(n²) 真，Θ(n²) 假",
  },
  "super-quad": {
    label: "f = n²+50n · g = n",
    f: (n) => n * n + 50 * n,
    g: (n) => n,
    c1: 1,
    note: "比值 n+50 无界：对任何固定 c 都不是 O(n)",
  },
};

const WITNESS_C = [2, 4, 6, 10] as const;
const N_MIN = 1;
const N_MAX = 64;

function firstViolation(
  f: (n: number) => number,
  g: (n: number) => number,
  scale: number,
): number | null {
  for (let n = N_MIN; n <= N_MAX; n += 1) {
    if (f(n) > scale * g(n) + 1e-9) return n;
  }
  return null;
}

const WITNESS_STEPS: readonly TeachingStep[] = [
  { label: "函数与候选界", caption: "被审曲线 f 与固定见证 c 的包络 c·g 同图" },
  { label: "阈值扫描", caption: "从 n₀ 向右扫，找第一个穿破包络的点" },
  { label: "量词账本", caption: "∃c ∃n₀ ∀n≥n₀ 的顺序就是证明的骨架" },
];

const WITNESS_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  WITNESS_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function Clrs4Chapter03CharacterizingRunningTimesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [family, setFamily] = useState<FamilyKey>("quad-mix");
  const [witnessC, setWitnessC] = useState<number>(6);
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: WITNESS_STEPS,
    build: (tl) => {
      WITNESS_STEPS.forEach((step, index) => {
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

  const spec = FAMILIES[family];
  const firstUpper = firstViolation(spec.f, spec.g, witnessC);
  const firstLower = firstViolation((n) => spec.c1 * spec.g(n), spec.f, 1);
  const holdsUpper = firstUpper === null;
  const holdsLower = firstLower === null;

  // “O 关系可证”是存在性命题：任一候选 c 配上某个 n₀ 覆盖 [n₀, N_MAX] 即算成立。
  const familyO = WITNESS_C.some((c) => {
    for (let n0 = N_MIN; n0 <= 32; n0 += 1) {
      let ok = true;
      for (let n = n0; n <= N_MAX; n += 1) {
        if (spec.f(n) > c * spec.g(n) + 1e-9) {
          ok = false;
          break;
        }
      }
      if (ok) return true;
    }
    return false;
  });

  // 绘图几何
  const PX0 = 64;
  const PX1 = 866;
  const PY0 = 84;
  const PY1 = 384;
  let yMax = 1;
  for (let n = N_MIN; n <= N_MAX; n += 1) {
    yMax = Math.max(yMax, spec.f(n), witnessC * spec.g(n), spec.c1 * spec.g(n));
  }
  const xOf = (n: number) =>
    PX0 + ((n - N_MIN) / (N_MAX - N_MIN)) * (PX1 - PX0);
  const yOf = (v: number) => PY1 - (Math.min(v, yMax) / yMax) * (PY1 - PY0);
  const pathOf = (fn: (n: number) => number) => {
    let d = "";
    for (let n = N_MIN; n <= N_MAX; n += 1) {
      const px = draw(xOf(n));
      const py = draw(yOf(fn(n)));
      d += n === N_MIN ? `M${px},${py}` : ` L${px},${py}`;
    }
    return d;
  };
  const fPath = pathOf(spec.f);
  const gPath = pathOf((n) => witnessC * spec.g(n));
  const lowPath = pathOf((n) => spec.c1 * spec.g(n));

  // 扫描光标：只有推进到第 3 步（阈值扫描/量词账本）才随进度移动
  const stageTime = timeline.progress * 3 * T;
  const scanLocal =
    timeline.currentStep >= 1
      ? Math.min(1, Math.max(0, (stageTime - T) / T))
      : 0;
  const cursorN =
    timeline.currentStep >= 1
      ? N_MIN + Math.floor(scanLocal * (N_MAX - N_MIN))
      : N_MIN;
  const broken = firstUpper !== null && cursorN >= firstUpper;

  function applyFamily(next: FamilyKey) {
    setFamily(next);
    timeline.seek(0);
  }
  function applyWitnessC(next: number) {
    setWitnessC(next);
    timeline.seek(0);
  }
  function toggleFault() {
    setFault((v) => !v);
    timeline.seek(0);
  }
  function reset() {
    setFamily("quad-mix");
    setWitnessC(6);
    setFault(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch03-witness-envelope"
      data-lab="witness-envelope"
      data-frame={timeline.currentStep}
      data-progress={pctOf(timeline.progress)}
      data-playing={timeline.isPlaying}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 3 · Characterizing Running Times
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              实验一 · 见证包络：固定 c 的包络线能否从 n₀ 起全程罩住 f
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：把见证常数 c 从 6 调到 2，哪一族曲线会在哪个 n
              首先穿破包络？切换函数族与
              c，再沿时间线看覆盖审计、阈值扫描和量词账本。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              被审函数族 f 与候选 g
            </span>
            <select
              data-param="f-family"
              aria-label="选择被审函数 f 与候选增长等级 g 的函数族"
              value={family}
              onChange={(e) => applyFamily(e.target.value as FamilyKey)}
              className="min-h-11 w-full max-w-xs rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(Object.keys(FAMILIES) as FamilyKey[]).map((k) => (
                <option key={k} value={k}>
                  {FAMILIES[k].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              见证常数 c
            </span>
            <select
              data-param="witness-c"
              aria-label="选择固定见证常数 c"
              value={witnessC}
              onChange={(e) => applyWitnessC(Number(e.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {WITNESS_C.map((c) => (
                <option key={c} value={c}>
                  c = {c}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            data-fault="per-n-constant"
            data-active={fault}
            aria-pressed={fault}
            onClick={toggleFault}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            量词作弊：逐点另选 c(n)
          </button>
          <button
            type="button"
            data-reset="witness-envelope"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>

        <svg
          viewBox="0 0 900 480"
          role="img"
          aria-label="CLRS 4e 第 3 章渐近记号见证包络实验。覆盖 characterizing running times、渐近记号、O记号、Omega记号、Theta记号、形式定义、量词结构、见证常数、阈值 n0，展示固定 c 的包络 c g(n) 与被审曲线 f(n) 的覆盖审计、阈值扫描和量词顺序，支持播放、暂停、单步、拖进度、函数族切换、见证常数切换、量词作弊故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch03-l1-arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch03-l1-danger-arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="480" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            覆盖审计：0 ≤ f(n) ≤ c·g(n) 是否对一切 n ≥ n₀ 成立？
          </text>
          <text x="30" y="56" fontSize="12" fill={C.secondary}>
            {spec.label} · 固定 c = {witnessC} · 下见证 c₁ = {spec.c1} ·{" "}
            {spec.note}
          </text>

          {/* 坐标网格 */}
          {[0.25, 0.5, 0.75, 1].map((frac) => {
            const gy = draw(PY1 - frac * (PY1 - PY0));
            return (
              <g key={`grid-${frac}`}>
                <line
                  x1={PX0}
                  y1={gy}
                  x2={PX1}
                  y2={gy}
                  stroke={C.border}
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={PX0 - 8}
                  y={draw(gy + 4)}
                  textAnchor="end"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {fmt(yMax * frac)}
                </text>
              </g>
            );
          })}
          <line
            x1={PX0}
            y1={PY1}
            x2={PX1}
            y2={PY1}
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#clrs4-ch03-l1-arr)"
          />
          <text
            x={PX1}
            y={draw(PY1 + 16)}
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            n →
          </text>
          {[1, 16, 32, 48, 64].map((n) => (
            <text
              key={`nx-${n}`}
              x={draw(xOf(n))}
              y={draw(PY1 + 16)}
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              {n}
            </text>
          ))}

          {/* 下见证包络（c₁·g）与上包络（c·g） */}
          <path
            d={lowPath}
            fill="none"
            stroke={C.success}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.8"
          />
          <path
            d={gPath}
            fill="none"
            stroke={holdsUpper ? C.success : C.danger}
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          {/* 被审曲线 f */}
          <path d={fPath} fill="none" stroke={C.accent} strokeWidth="2.5" />

          {/* 量词作弊：逐点 c(n) 的伪包络恰好贴住 f */}
          {fault &&
            Array.from({ length: 16 }, (_, i) => N_MIN + i * 4).map((n) => (
              <circle
                key={`cheat-${n}`}
                cx={draw(xOf(n))}
                cy={draw(yOf(spec.f(n)))}
                r="5"
                fill="none"
                stroke={C.danger}
                strokeWidth="2"
              />
            ))}
          {fault && (
            <text
              x={PX1 - 4}
              y={draw(PY0 + 14)}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={C.danger}
            >
              伪证书：c 随 n 换值，包络处处贴身
            </text>
          )}

          {/* stage 0 标注 */}
          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="410"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text x="52" y="430" fontSize="13" fontWeight="700" fill={C.accent}>
              图例与读法
            </text>
            <text x="52" y="452" fontSize="11" fill={C.secondary}>
              实线 = f(n)；长虚线 = 固定 c 的上包络 c·g(n)；短虚线 = 下包络
              c₁·g(n)。绿 = 覆盖成立，红 = 已被穿破。
            </text>
          </g>

          {/* stage 1 标注：阈值扫描 */}
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <line
              x1={draw(xOf(cursorN))}
              y1={PY0}
              x2={draw(xOf(cursorN))}
              y2={PY1}
              stroke={C.warning}
              strokeWidth="2"
            />
            <text
              x={draw(xOf(cursorN))}
              y={draw(PY0 - 8)}
              textAnchor="middle"
              fontSize="11"
              fill={C.warning}
            >
              扫到 n = {cursorN}
            </text>
            {firstUpper !== null && (
              <g>
                <circle
                  cx={draw(xOf(firstUpper))}
                  cy={draw(yOf(spec.f(firstUpper)))}
                  r="7"
                  fill="none"
                  stroke={C.danger}
                  strokeWidth="2.5"
                />
                <line
                  x1={draw(xOf(firstUpper))}
                  y1={draw(yOf(spec.f(firstUpper)))}
                  x2={draw(xOf(firstUpper))}
                  y2={PY1}
                  stroke={C.danger}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <text
                  x={draw(Math.min(xOf(firstUpper) + 10, PX1 - 120))}
                  y={draw(yOf(spec.f(firstUpper)) - 10)}
                  fontSize="12"
                  fontWeight="700"
                  fill={C.danger}
                >
                  首个穿破 n = {firstUpper}
                </text>
              </g>
            )}
            <rect
              x="30"
              y="410"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="430"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              扫描结论：
              {firstUpper === null
                ? `固定 c = ${witnessC} 从 n₀ = 1 起全程覆盖`
                : `固定 c = ${witnessC} 在 n = ${firstUpper} 处被穿破`}
            </text>
            <text x="52" y="452" fontSize="11" fill={C.secondary}>
              {broken
                ? "穿破点已入镜：这份 (c, n₀=1) 见证无效，但换更大的 c 或 n₀ 仍可能救回 O 命题。"
                : `光标尚未越过穿破点（若存在）。下包络审计：${firstLower === null ? "c₁·g 全程不超过 f" : `下包络在 n = ${firstLower} 处被 f 反超`}。`}
            </text>
          </g>

          {/* stage 2 标注：量词账本 */}
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="30"
              y="410"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="428"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              ∃ c &gt; 0　∃ n₀ ≥ 1　∀ n ≥ n₀：0 ≤ f(n) ≤ c·g(n)
            </text>
            <text
              x="52"
              y="450"
              fontSize="11"
              fill={fault ? C.danger : C.secondary}
            >
              {fault
                ? "作弊模式把 c 换成 c(n)：每个 n 都恰好通过，却没有一个常数能写进 ∃c —— 量词顺序被偷换，命题失去意义。"
                : `本族结论：O(g) ${familyO ? (holdsUpper ? "成立（当前见证即可）" : "成立（需换更大的 c 或 n₀）") : "不成立（任何固定 c 都不够）"} · Ω(g) ${holdsLower ? "成立" : "不成立"} · Θ(g) ${familyO && holdsLower ? "成立" : "不成立"}。有限扫描只能找反例，证明要把全部 n ≥ n₀ 纳入代数推导。`}
            </text>
          </g>
        </svg>

        <div
          data-readout="witness-envelope"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-1 rounded-control border border-border bg-bg px-3 py-2 text-xs text-secondary"
        >
          <span data-witness-c={witnessC}>c = {witnessC}</span>
          <span data-witness-family={family}>族 = {family}</span>
          <span data-scan-first-violation={firstUpper ?? "none"}>
            上包络首个穿破：{firstUpper ?? "无"}
          </span>
          <span data-lower-first-violation={firstLower ?? "none"}>
            下包络首个穿破：{firstLower ?? "无"}
          </span>
          <span data-envelope-holds={familyO && holdsLower}>
            Θ 结论：{familyO && holdsLower ? "成立" : "不成立"}
          </span>
          <span data-fault-active={fault}>量词作弊：{fault ? "开" : "关"}</span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={WITNESS_LABEL_TEXT}
          caption="调 c 或换函数族前先预测穿破点，再用扫描光标核对因果；量词作弊开关演示为什么见证必须先固定。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渐近证明是一份审计记录：被审函数、固定见证、覆盖阈值和量词顺序缺一不可。
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 2 · 两半切分与模环：⌊n/2⌋/⌈n/2⌉ 与 k mod m                     */
/* ------------------------------------------------------------------ */

const SPLIT_SIZES = [5, 8, 9, 13, 16] as const;
const RING_MODULI = [3, 4, 5, 7] as const;
const RING_STARTS = [0, -1, -5] as const;

/** 数学 floor-mod：结果落在 [0, m)。JS 的 % 本身是截断向零语义。 */
function floorMod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

const FLOOR_MOD_STEPS: readonly TeachingStep[] = [
  { label: "两半切分", caption: "n 个元素按 ⌊n/2⌋ 与 ⌈n/2⌉ 分成两段" },
  { label: "取整阶梯", caption: "⌊x⌋ ≤ x ≤ ⌈x⌉：阶梯夹住未取整的值" },
  { label: "模环周游", caption: "指针每步 +1，落槽号 = 起点 mod m" },
];

const FLOOR_MOD_LABEL_TEXT: Readonly<Record<string, string>> =
  Object.fromEntries(
    FLOOR_MOD_STEPS.map((s) => [s.label, s.caption ?? s.label]),
  );

export function Clrs4Chapter03FloorModuloLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [splitN, setSplitN] = useState<number>(9);
  const [ringM, setRingM] = useState<number>(4);
  const [ringStart, setRingStart] = useState<number>(0);
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: FLOOR_MOD_STEPS,
    build: (tl) => {
      FLOOR_MOD_STEPS.forEach((step, index) => {
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

  const left = Math.floor(splitN / 2);
  const right = Math.ceil(splitN / 2);
  const half = splitN / 2;
  const ringPos = floorMod(ringStart, ringM);
  const truncPos = ringStart % ringM;
  const faultBroken = fault && truncPos !== ringPos;

  // 取整阶梯几何：x∈[0,16] 的 ⌊x/2⌋，n 处标记（左半区）
  const SX0 = 90;
  const SX1 = 430;
  const SY1 = 420;
  const SY0 = 250;
  const stepMax = 8;
  const sx = (v: number) => SX0 + (v / 16) * (SX1 - SX0);
  const sy = (v: number) =>
    SY1 - (Math.min(v, stepMax) / stepMax) * (SY1 - SY0);
  let stepPath = "";
  for (let k = 0; k < 8; k += 1) {
    const y = sy(k);
    stepPath += ` M${draw(sx(2 * k))},${draw(y)} L${draw(sx(2 * k + 2))},${draw(y)}`;
    if (k < 7)
      stepPath += ` M${draw(sx(2 * k + 2))},${draw(y)} L${draw(sx(2 * k + 2))},${draw(sy(k + 1))}`;
  }

  // 模环几何（右半区，与左侧阶梯图互不重叠）
  const CX = 690;
  const CY = 356;
  const R = 104;
  const slotXY = (j: number) => {
    const angle = ((-90 + (360 / ringM) * j) * Math.PI) / 180;
    return [CX + R * Math.cos(angle), CY + R * Math.sin(angle)] as const;
  };

  function applySplitN(next: number) {
    setSplitN(next);
    timeline.seek(0);
  }
  function applyRingM(next: number) {
    setRingM(next);
    timeline.seek(0);
  }
  function applyRingStart(next: number) {
    setRingStart(next);
    timeline.seek(0);
  }
  function toggleFault() {
    setFault((v) => !v);
    timeline.seek(0);
  }
  function reset() {
    setSplitN(9);
    setRingM(4);
    setRingStart(0);
    setFault(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch03-floor-mod-ring"
      data-lab="floor-mod-ring"
      data-frame={timeline.currentStep}
      data-progress={pctOf(timeline.progress)}
      data-playing={timeline.isPlaying}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 3 · Standard Notations and Common Functions
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              实验二 · 两半切分与模环：⌊n/2⌋ 的界标和 k mod m 的落槽
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：n = 9 时界标左边几格、右边几格？起点 −5 的指针在 4
              槽环上落在哪一格？切换参数，再沿时间线核对切分、阶梯与环周游。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              切分规模 n
            </span>
            <select
              data-param="split-size"
              aria-label="选择切分规模 n"
              value={splitN}
              onChange={(e) => applySplitN(Number(e.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {SPLIT_SIZES.map((n) => (
                <option key={n} value={n}>
                  n = {n}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              环槽数 m
            </span>
            <select
              data-param="ring-modulus"
              aria-label="选择环的槽位数 m"
              value={ringM}
              onChange={(e) => applyRingM(Number(e.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {RING_MODULI.map((m) => (
                <option key={m} value={m}>
                  m = {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              指针起点
            </span>
            <select
              data-param="ring-start"
              aria-label="选择指针起点（可为负）"
              value={ringStart}
              onChange={(e) => applyRingStart(Number(e.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {RING_STARTS.map((s) => (
                <option key={s} value={s}>
                  start = {s}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            data-fault="truncating-remainder"
            data-active={fault}
            aria-pressed={fault}
            onClick={toggleFault}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            负数按截断向零取余
          </button>
          <button
            type="button"
            data-reset="floor-mod-ring"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>

        <svg
          viewBox="0 0 900 540"
          role="img"
          aria-label="CLRS 4e 第 3 章取整与模运算实验。覆盖 characterizing running times、floor、ceiling、下取整、上取整、modulo、模运算、环形缓冲区，展示 n 个元素的两半切分 ⌊n/2⌋ 与 ⌈n/2⌉、取整阶梯 ⌊x⌋≤x≤⌈x⌉、以及指针在 m 槽环上按 floor-mod 与截断余数两种语义的落槽对照，支持播放、暂停、单步、拖进度、参数切换、负数截断故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="540" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            离散规模归一化：⌊n/2⌋ + ⌈n/2⌉ = n　与　落槽 = ((起点 mod m) + m) mod
            m
          </text>
          <text x="30" y="56" fontSize="12" fill={C.secondary}>
            n = {splitN} → {left} | {right} · 环 m = {ringM} · 起点 {ringStart}{" "}
            → 数学落槽 {ringPos}
          </text>

          {/* stage 0：两半切分 */}
          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            {Array.from({ length: splitN }, (_, i) => {
              const x = 30 + i * 52;
              const inLeft = i < left;
              return (
                <g key={`cell-${i}`}>
                  <rect
                    x={x}
                    y="84"
                    width="46"
                    height="56"
                    rx="8"
                    fill={inLeft ? C.accent : C.success}
                    fillOpacity="0.14"
                    stroke={inLeft ? C.accent : C.success}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x + 23}
                    y="112"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    {i}
                  </text>
                  <text
                    x={x + 23}
                    y="132"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {inLeft ? "左半" : "右半"}
                  </text>
                </g>
              );
            })}
            <line
              x1={30 + left * 52 - 3}
              y1="76"
              x2={30 + left * 52 - 3}
              y2="152"
              stroke={C.warning}
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <text
              x={30 + left * 52 - 8}
              y="70"
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              界标 ⌊{splitN}/2⌋ = {left}
            </text>
            <rect
              x="30"
              y="164"
              width="840"
              height="52"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text x="52" y="186" fontSize="12" fill={C.primary}>
              左段 {left} 格 + 右段 {right} 格 = {left + right} 格 = n：奇数 n
              两段差 1，偶数 n 两段相等。
            </text>
            <text x="52" y="206" fontSize="11" fill={C.secondary}>
              分治算法的递归基例与数组边界都写在这个界标上；直接删掉取整、用 n/2
              当界标，会在奇数 n 上切出半格。
            </text>
          </g>

          {/* stage 1：取整阶梯 */}
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <line
              x1={SX0}
              y1={SY1}
              x2={SX1}
              y2={SY1}
              stroke={C.border}
              strokeWidth="2"
            />
            <line
              x1={SX0}
              y1={SY0 - 10}
              x2={SX0}
              y2={SY1}
              stroke={C.border}
              strokeWidth="2"
            />
            <path
              d={stepPath}
              fill="none"
              stroke={C.accent}
              strokeWidth="2.5"
            />
            <line
              x1={sx(0)}
              y1={sy(0)}
              x2={sx(16)}
              y2={sy(8)}
              stroke={C.secondary}
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <text
              x={sx(16) - 4}
              y={sy(8) - 10}
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              未取整的 x/2
            </text>
            {[0, 4, 8, 12, 16].map((v) => (
              <text
                key={`sx-${v}`}
                x={draw(sx(v))}
                y={draw(SY1 + 18)}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                x = {v}
              </text>
            ))}
            {[0, 2, 4, 6, 8].map((v) => (
              <text
                key={`sy-${v}`}
                x={SX0 - 8}
                y={draw(sy(v) + 4)}
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                {v}
              </text>
            ))}
            {/* n 处的夹逼带 */}
            <line
              x1={draw(sx(splitN))}
              y1={draw(sy(Math.floor(half)))}
              x2={draw(sx(splitN))}
              y2={draw(sy(Math.ceil(half)))}
              stroke={C.warning}
              strokeWidth="4"
              opacity="0.6"
            />
            <circle
              cx={draw(sx(splitN))}
              cy={draw(sy(half))}
              r="6"
              fill="none"
              stroke={C.warning}
              strokeWidth="2.5"
            />
            <text
              x={draw(Math.min(sx(splitN) + 10, SX1 - 130))}
              y={draw(sy(Math.ceil(half)) - 12)}
              fontSize="11"
              fontWeight="700"
              fill={C.warning}
            >
              n = {splitN}：⌊{fmt(half)}⌋ = {left} ≤ {fmt(half)} ≤ {right} = ⌈
              {fmt(half)}⌉
            </text>
            <text
              x="70"
              y="456"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              夹逼恒等式：⌊x⌋ ≤ x ≤ ⌈x⌉
            </text>
            <text x="70" y="476" fontSize="11" fill={C.secondary}>
              取整误差不足
              1：渐近等级通常不变，但递归基例与数组边界不能删掉取整。
            </text>
          </g>

          {/* stage 2：模环周游 */}
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={C.border}
              strokeWidth="2"
            />
            {Array.from({ length: ringM }, (_, j) => {
              const [jx, jy] = slotXY(j);
              const isHit = j === ringPos;
              return (
                <g key={`slot-${j}`}>
                  <circle
                    cx={draw(jx)}
                    cy={draw(jy)}
                    r="24"
                    fill={isHit ? C.accent : C.elevated}
                    fillOpacity={isHit ? 0.2 : 1}
                    stroke={isHit ? C.accent : C.border}
                    strokeWidth={isHit ? 2.5 : 1.5}
                  />
                  <text
                    x={draw(jx)}
                    y={draw(jy + 5)}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={isHit ? C.accent : C.primary}
                  >
                    {j}
                  </text>
                  <text
                    x={draw(jx)}
                    y={draw(jy + 40)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {j === ringPos ? "◀ 落槽" : `槽 ${j}`}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: Math.min(ringM + 1, 8) }, (_, k) => {
              const from = floorMod(ringStart + k, ringM);
              const to = floorMod(ringStart + k + 1, ringM);
              const [fx, fy] = slotXY(from);
              const [tx2, ty2] = slotXY(to);
              return (
                <line
                  key={`step-${k}`}
                  x1={draw(fx + (tx2 - fx) * 0.18)}
                  y1={draw(fy + (ty2 - fy) * 0.18)}
                  x2={draw(fx + (tx2 - fx) * 0.82)}
                  y2={draw(fy + (ty2 - fy) * 0.82)}
                  stroke={C.success}
                  strokeWidth="2"
                  markerEnd="url(#clrs4-ch03-l2-arr)"
                />
              );
            })}
            {/* 截断余数幽灵槽 */}
            {faultBroken && (
              <g>
                <circle
                  cx={CX - R - 86}
                  cy={CY}
                  r="24"
                  fill="none"
                  stroke={C.danger}
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                />
                <text
                  x={CX - R - 86}
                  y={draw(CY + 5)}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={C.danger}
                >
                  {truncPos}
                </text>
                <text
                  x={CX - R - 86}
                  y={draw(CY + 44)}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.danger}
                >
                  环外幽灵槽
                </text>
                <line
                  x1={CX - R - 62}
                  y1={CY}
                  x2={CX - R - 28}
                  y2={CY}
                  stroke={C.danger}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <text
                  x={CX}
                  y="96"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={C.danger}
                >
                  截断语义：{ringStart} % {ringM} = {truncPos} → 下标越界；
                </text>
                <text
                  x={CX}
                  y="116"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={C.danger}
                >
                  数学 floor-mod：((a % m) + m) % m = {ringPos}。
                </text>
              </g>
            )}
            {!faultBroken && (
              <text
                x={CX}
                y={draw(CY + R + 42)}
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {ringStart < 0
                  ? `起点 ${ringStart}：floor-mod 归一到 ${ringPos} 号槽（故障此刻无影响）。`
                  : `起点 ${ringStart}：每步 +1 推进，落槽 = floorMod(步数, ${ringM})。`}
              </text>
            )}
          </g>

          <defs>
            <marker
              id="clrs4-ch03-l2-arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
          </defs>
        </svg>

        <div
          data-readout="floor-mod-ring"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-1 rounded-control border border-border bg-bg px-3 py-2 text-xs text-secondary"
        >
          <span data-split-left={left}>⌊n/2⌋ = {left}</span>
          <span data-split-right={right}>⌈n/2⌉ = {right}</span>
          <span data-split-sum={left + right}>两段和 = {left + right}</span>
          <span data-floor={Math.floor(half)}>⌊x⌋ = {Math.floor(half)}</span>
          <span data-ceil={Math.ceil(half)}>⌈x⌉ = {Math.ceil(half)}</span>
          <span data-ring-position={ringPos}>floor-mod 落槽 = {ringPos}</span>
          <span data-ring-trunc={truncPos}>截断余数 = {truncPos}</span>
          <span data-ring-fault-broken={faultBroken}>
            故障越界：{faultBroken ? "是" : "否"}
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={FLOOR_MOD_LABEL_TEXT}
          caption="改 n、m 或起点前先预测界标与落槽，再沿三阶段核对切分、夹逼带与环上箭头。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取整决定界标，模运算决定落槽；两者都是把连续数学归一到离散机器刻度的闸门。
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 3 · 增长赛跑：log 刻度上的超越点                                */
/* ------------------------------------------------------------------ */

type FieldKey = "classic" | "ladder" | "fib";

type Racer = {
  key: string;
  label: string;
  cls: string;
  fn: (n: number) => number;
};

function logStar(n: number): number {
  let i = 0;
  let v = n;
  while (v > 1) {
    v = Math.log2(v);
    i += 1;
  }
  return i;
}

function fib(n: number): number {
  let a = 0;
  let b = 1;
  for (let k = 0; k < n; k += 1) {
    const next = a + b;
    a = b;
    b = next;
  }
  return a;
}

function factorial(n: number): number {
  let r = 1;
  for (let k = 2; k <= n; k += 1) r *= k;
  return r;
}

const PHI = (1 + Math.sqrt(5)) / 2;

const RACE_FIELDS: Record<
  FieldKey,
  { title: string; racers: readonly Racer[] }
> = {
  classic: {
    title: "经典五强",
    racers: [
      {
        key: "lg",
        label: "lg n",
        cls: "对数 Θ(log n)",
        fn: (n) => Math.log2(n),
      },
      { key: "n", label: "n", cls: "线性 Θ(n)", fn: (n) => n },
      {
        key: "nlg",
        label: "n lg n",
        cls: "线性对数 Θ(n log n)",
        fn: (n) => n * Math.log2(n),
      },
      { key: "n2", label: "n²", cls: "二次 Θ(n²)", fn: (n) => n * n },
      { key: "exp", label: "2ⁿ", cls: "指数 Θ(2ⁿ)", fn: (n) => 2 ** n },
    ],
  },
  ladder: {
    title: "完整阶梯",
    racers: [
      { key: "lgs", label: "lg* n", cls: "迭代对数", fn: logStar },
      { key: "lg", label: "lg n", cls: "对数", fn: (n) => Math.log2(n) },
      { key: "n", label: "n", cls: "线性", fn: (n) => n },
      {
        key: "nlg",
        label: "n lg n",
        cls: "线性对数",
        fn: (n) => n * Math.log2(n),
      },
      { key: "n2", label: "n²", cls: "二次", fn: (n) => n * n },
      { key: "exp", label: "2ⁿ", cls: "指数", fn: (n) => 2 ** n },
      { key: "fac", label: "n!", cls: "阶乘", fn: factorial },
    ],
  },
  fib: {
    title: "Fibonacci 家族",
    racers: [
      { key: "fib", label: "Fₙ", cls: "Fibonacci Θ(φⁿ)", fn: fib },
      {
        key: "phi",
        label: "φⁿ/√5",
        cls: "Binet 主项",
        fn: (n) => PHI ** n / Math.sqrt(5),
      },
      {
        key: "half",
        label: "2^{n/2}",
        cls: "指数下界参照",
        fn: (n) => 2 ** (n / 2),
      },
      { key: "n2", label: "n²", cls: "二次参照", fn: (n) => n * n },
    ],
  },
};

const HORIZONS = [16, 64, 256] as const;

const RACE_STEPS: readonly TeachingStep[] = [
  { label: "起跑线", caption: "所有 racer 从 n = 1 出发（log 刻度）" },
  { label: "超越点", caption: "扫描光标推进，名次交换处插旗" },
  { label: "终点格局", caption: "horizon 处的真实名次榜" },
];

const RACE_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  RACE_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function Clrs4Chapter03GrowthLadderLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [field, setField] = useState<FieldKey>("classic");
  const [horizon, setHorizon] = useState<number>(64);
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: RACE_STEPS,
    build: (tl) => {
      RACE_STEPS.forEach((step, index) => {
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

  const spec = RACE_FIELDS[field];
  const racers = spec.racers;

  // log10 量程与几何
  let yLogMax = 1;
  for (const r of racers) {
    for (let n = 1; n <= horizon; n += 1) {
      const v = r.fn(n);
      if (Number.isFinite(v) && v > 0)
        yLogMax = Math.max(yLogMax, Math.log10(v));
    }
  }
  const RX0 = 64;
  const RX1 = 866;
  const RY0 = 84;
  const RY1 = 384;
  const rx = (n: number) => RX0 + ((n - 1) / (horizon - 1)) * (RX1 - RX0);
  const ry = (v: number) =>
    RY1 - (Math.log10(Math.max(v, 1e-12)) / yLogMax) * (RY1 - RY0);

  const pathOfRacer = (fn: (n: number) => number) => {
    let d = "";
    let pen = false;
    for (let n = 1; n <= horizon; n += 1) {
      const v = fn(n);
      if (!Number.isFinite(v) || v <= 0) {
        pen = false;
        continue;
      }
      const px = draw(rx(n));
      const py = draw(ry(v));
      d += pen ? ` L${px},${py}` : `M${px},${py}`;
      pen = true;
    }
    return d;
  };

  // 名次与关键超越点（签名对：前者曾在小 n 落后，随后反超后者）
  const valueAt = (r: Racer, n: number) => r.fn(n);
  const rankValue = (v: number) => (Number.isFinite(v) ? v : Infinity);
  const leaderAt = (n: number) => {
    let best = racers[0]!;
    let bestV = -Infinity;
    for (const r of racers) {
      const v = rankValue(valueAt(r, n));
      if (v > bestV) {
        bestV = v;
        best = r;
      }
    }
    return best;
  };
  const CROSS_PAIRS: Record<
    FieldKey,
    ReadonlyArray<readonly [string, string]>
  > = {
    classic: [["exp", "n2"]],
    ladder: [
      ["exp", "n2"],
      ["fac", "exp"],
    ],
    fib: [["fib", "half"]],
  };
  const crosses = CROSS_PAIRS[field]
    .map(([aKey, bKey]) => {
      const a = racers.find((r) => r.key === aKey);
      const b = racers.find((r) => r.key === bKey);
      if (!a || !b) return null;
      let wasBehind = false;
      for (let n = 1; n <= horizon; n += 1) {
        const av = valueAt(a, n);
        const bv = valueAt(b, n);
        if (!Number.isFinite(av) || !Number.isFinite(bv)) {
          if (wasBehind) return n;
          return null;
        }
        if (av <= bv) wasBehind = true;
        else if (wasBehind) return n;
      }
      return null;
    })
    .filter((n): n is number => n !== null);
  const finalRanking = [...racers].sort(
    (a, b) => rankValue(valueAt(b, horizon)) - rankValue(valueAt(a, horizon)),
  );
  const overflowCount = racers.filter(
    (r) => !Number.isFinite(valueAt(r, horizon)),
  ).length;

  // 扫描光标（第 2 步起随进度推进）
  const stageTime = timeline.progress * 3 * T;
  const raceLocal =
    timeline.currentStep >= 1
      ? Math.min(1, Math.max(0, (stageTime - T) / T))
      : 0;
  const cursorN =
    timeline.currentStep >= 1 ? 1 + Math.floor(raceLocal * (horizon - 1)) : 1;
  const cursorLeader = leaderAt(cursorN);

  // 小样本宣判：冻结在 n = 4 的领先者
  const smallN = 4;
  const smallLeader = leaderAt(smallN);
  const smallDecreeWrong = smallLeader.key !== leaderAt(horizon).key;

  function applyField(next: FieldKey) {
    setField(next);
    timeline.seek(0);
  }
  function applyHorizon(next: number) {
    setHorizon(next);
    timeline.seek(0);
  }
  function toggleFault() {
    setFault((v) => !v);
    timeline.seek(0);
  }
  function reset() {
    setField("classic");
    setHorizon(64);
    setFault(false);
    timeline.seek(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch03-growth-race-ladder"
      data-lab="growth-race-ladder"
      data-frame={timeline.currentStep}
      data-progress={pctOf(timeline.progress)}
      data-playing={timeline.isPlaying}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 3 · Growth of Functions
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              实验三 · 增长赛跑：log 刻度上的超越点与终点名次
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：n = 3 时谁最快？n = 64
              时谁最快？换参赛阵容与地平线，看小样本名次如何被远处的超越点翻转。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              参赛阵容
            </span>
            <select
              data-param="race-field"
              aria-label="选择赛跑阵容"
              value={field}
              onChange={(e) => applyField(e.target.value as FieldKey)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(Object.keys(RACE_FIELDS) as FieldKey[]).map((k) => (
                <option key={k} value={k}>
                  {RACE_FIELDS[k].title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              地平线 n
            </span>
            <select
              data-param="race-horizon"
              aria-label="选择赛跑地平线 n"
              value={horizon}
              onChange={(e) => applyHorizon(Number(e.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {HORIZONS.map((h) => (
                <option key={h} value={h}>
                  n = {h}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            data-fault="small-sample-decree"
            data-active={fault}
            aria-pressed={fault}
            onClick={toggleFault}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            小样本宣判（冻结 n ≤ 4）
          </button>
          <button
            type="button"
            data-reset="growth-race-ladder"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>

        <svg
          viewBox="0 0 900 480"
          role="img"
          aria-label="CLRS 4e 第 3 章增长等级赛跑实验。覆盖 characterizing running times、增长等级、growth of functions、多项式、指数、对数、阶乘、迭代对数、Fibonacci、Stirling，展示 lg n、n、n lg n、n²、2ⁿ、n!、Fₙ 与 φⁿ/√5 在 log 刻度上的曲线、超越点与终点名次，支持播放、暂停、单步、拖进度、阵容与地平线切换、小样本宣判故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="480" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            增长等级赛跑：纵轴 log₁₀（值），乘法差距变成等距台阶
          </text>
          <text x="30" y="56" fontSize="12" fill={C.secondary}>
            {spec.title} · 地平线 n = {horizon} · 终点领先：
            {leaderAt(horizon).label}
            {overflowCount > 0
              ? ` · ${overflowCount} 条曲线已溢出 double 量程`
              : ""}
          </text>

          {/* log 刻度网格 */}
          {Array.from({ length: Math.ceil(yLogMax) + 1 }, (_, e) => e).map(
            (e) => {
              if (e > yLogMax) return null;
              const gy = draw(ry(10 ** e));
              return (
                <g key={`lg-${e}`}>
                  <line
                    x1={RX0}
                    y1={gy}
                    x2={RX1}
                    y2={gy}
                    stroke={C.border}
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={RX0 - 8}
                    y={draw(gy + 4)}
                    textAnchor="end"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {`10^${e}`}
                  </text>
                </g>
              );
            },
          )}
          <line
            x1={RX0}
            y1={RY1}
            x2={RX1}
            y2={RY1}
            stroke={C.border}
            strokeWidth="2"
          />
          {[1, Math.ceil(horizon / 2), horizon].map((n) => (
            <text
              key={`rn-${n}`}
              x={draw(rx(n))}
              y={draw(RY1 + 16)}
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              n = {n}
            </text>
          ))}

          {/* racer 曲线 */}
          {racers.map((r, i) => (
            <path
              key={`race-${r.key}`}
              d={pathOfRacer(r.fn)}
              fill="none"
              stroke={i % 2 === 0 ? C.accent : C.success}
              strokeWidth={
                r.key === cursorLeader.key && timeline.currentStep >= 1
                  ? 3.5
                  : 2
              }
              opacity={0.9}
            />
          ))}
          {/* 图例 */}
          {racers.map((r, i) => (
            <g key={`legend-${r.key}`}>
              <rect
                x={640 + (i % 2) * 130}
                y={70 + Math.floor(i / 2) * 22}
                width="14"
                height="4"
                rx="2"
                fill={i % 2 === 0 ? C.accent : C.success}
              />
              <text
                x={660 + (i % 2) * 130}
                y={78 + Math.floor(i / 2) * 22}
                fontSize="11"
                fill={C.primary}
              >
                {r.label}
              </text>
            </g>
          ))}
          {/* 溢出箭头 */}
          {racers
            .filter((r) => !Number.isFinite(valueAt(r, horizon)))
            .map((r) => (
              <path
                key={`overflow-${r.key}`}
                d={`M${draw(rx(horizon))},${draw(RY0 + 12)} l10,-12 l10,12 Z`}
                fill={C.danger}
              />
            ))}

          {/* stage 0：起跑线 */}
          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="410"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text x="52" y="430" fontSize="13" fontWeight="700" fill={C.accent}>
              起跑读数（n = 1）
            </text>
            <text x="52" y="452" fontSize="11" fill={C.secondary}>
              多数曲线从 0 或 1
              出发，差距几乎不可见；此时宣布的名次几乎没有信息量。
            </text>
          </g>

          {/* stage 1：超越点 */}
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <line
              x1={draw(rx(cursorN))}
              y1={RY0}
              x2={draw(rx(cursorN))}
              y2={RY1}
              stroke={C.warning}
              strokeWidth="2"
            />
            <text
              x={draw(Math.min(rx(cursorN) + 8, RX1 - 90))}
              y={draw(RY0 + 12)}
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              n = {cursorN} 领先：{cursorLeader.label}
            </text>
            {crosses.map((n) => (
              <g key={`flag-${n}`}>
                <line
                  x1={draw(rx(n))}
                  y1={RY1}
                  x2={draw(rx(n))}
                  y2={draw(RY1 - 14)}
                  stroke={C.danger}
                  strokeWidth="2"
                />
                <path
                  d={`M${draw(rx(n))},${draw(RY1 - 14)} l16,0 l0,10 l-16,0 Z`}
                  fill={C.danger}
                />
                <text
                  x={draw(rx(n))}
                  y={draw(RY1 - 20)}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.danger}
                >
                  超越@{n}
                </text>
              </g>
            ))}
            <rect
              x="30"
              y="410"
              width="840"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="430"
              fontSize="13"
              fontWeight="700"
              fill={C.primary}
            >
              关键超越：
              {crosses.length > 0
                ? crosses.map((n) => `n = ${n}`).join("、")
                : "本阵容在小 n 已定型，无反超"}
            </text>
            <text x="52" y="452" fontSize="11" fill={C.secondary}>
              渐近结论只承诺“越过某个阈值以后”的格局；阈值之前的领先随时可以翻盘。
            </text>
          </g>

          {/* stage 2：终点格局 */}
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="30"
              y="410"
              width="560"
              height="56"
              rx="12"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="432"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              终点名次（n = {horizon}）：
              {finalRanking
                .slice(0, 3)
                .map((r) => r.label)
                .join(" > ")}
              {racers.length > 3 ? " > …" : ""}
            </text>
            <text x="52" y="450" fontSize="11" fill={C.secondary}>
              {overflowCount > 0
                ? "有曲线超出 double 量程：不是停下，而是已经画出屏幕——渐近上它们仍在最前面。"
                : `完整名次：${finalRanking.map((r) => r.label).join(" > ")}。`}
            </text>
            {fault && (
              <g>
                <rect
                  x="610"
                  y="410"
                  width="260"
                  height="56"
                  rx="12"
                  fill={C.danger}
                  fillOpacity="0.1"
                  stroke={C.danger}
                  strokeWidth="1.5"
                />
                <text
                  x="740"
                  y="432"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={C.danger}
                >
                  小样本宣判：{smallLeader.label} 加冕（只看了 n ≤ {smallN}）
                </text>
                <text
                  x="740"
                  y="452"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.danger}
                >
                  {smallDecreeWrong
                    ? `与终点真实领先 ${leaderAt(horizon).label} 矛盾`
                    : "恰好与终点一致——纯属巧合，不构成论证"}
                </text>
              </g>
            )}
          </g>
        </svg>

        <div
          data-readout="growth-race-ladder"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-1 rounded-control border border-border bg-bg px-3 py-2 text-xs text-secondary"
        >
          <span data-race-field={field}>阵容 = {field}</span>
          <span data-race-horizon={horizon}>地平线 = {horizon}</span>
          <span data-race-leader={cursorLeader.key}>
            当前领先 = {cursorLeader.label}
          </span>
          <span data-signature-cross={crosses.join(",") || "none"}>
            超越点 = {crosses.join(", ") || "无"}
          </span>
          <span data-race-top={leaderAt(horizon).key}>
            终点领先 = {leaderAt(horizon).label}
          </span>
          <span data-overflow-count={overflowCount}>
            溢出条数 = {overflowCount}
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={RACE_LABEL_TEXT}
          caption="先按 n = 3 预测领先者，再把光标推到地平线；小样本宣判开关演示名次翻转的陷阱。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        增长等级是一条单行道：log
        刻度下，超越点之后名次不再回头——但超越点之前的排名什么也不能证明。
      </figcaption>
    </figure>
  );
}
