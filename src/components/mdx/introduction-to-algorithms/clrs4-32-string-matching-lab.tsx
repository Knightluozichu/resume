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

/* ---------- 共享 oracle：前缀函数、KMP 轨迹、朴素比较计数 ---------- */

/** CLRS 4e 风格的前缀函数：pi[q] = P[0..q] 的最长真前后缀长度。 */
function computePi(p: string): number[] {
  const m = p.length;
  const pi = new Array<number>(m).fill(0);
  let k = 0;
  for (let q = 1; q < m; q += 1) {
    while (k > 0 && p[k] !== p[q]) k = pi[k - 1];
    if (p[k] === p[q]) k += 1;
    pi[q] = k;
  }
  return pi;
}

type KmpEvent = {
  readonly qAfter: number;
  /** 本字符触发了沿 pi 链的回退（不含命中后的状态回退）。 */
  readonly fellBack: boolean;
  /** 以本字符结尾的命中起点；无命中为 null。 */
  readonly matchStart: number | null;
};

type KmpTrace = {
  readonly pi: number[];
  readonly events: KmpEvent[];
  readonly matches: number[];
  readonly comparisons: number;
  readonly fallbacks: number;
};

/**
 * KMP 扫描轨迹。zeroAfterMatch = true 时注入故障：命中后错误地把 q 清零，
 * 而不是回退到 pi[m-1] 保住最长边界——重叠命中会被漏报。
 */
function kmpTrace(
  text: string,
  pattern: string,
  zeroAfterMatch: boolean,
): KmpTrace {
  const n = text.length;
  const m = pattern.length;
  const pi = computePi(pattern);
  const events: KmpEvent[] = [];
  const matches: number[] = [];
  let q = 0;
  let comparisons = 0;
  let fallbacks = 0;
  for (let i = 0; i < n; i += 1) {
    let fellBack = false;
    while (q > 0 && pattern[q] !== text[i]) {
      q = pi[q - 1];
      fallbacks += 1;
      fellBack = true;
      comparisons += 1;
    }
    comparisons += 1;
    let matchStart: number | null = null;
    if (pattern[q] === text[i]) q += 1;
    if (q === m) {
      matchStart = i - m + 1;
      matches.push(matchStart);
      q = zeroAfterMatch ? 0 : pi[m - 1];
    }
    events.push({ qAfter: q, fellBack, matchStart });
  }
  return { pi, events, matches, comparisons, fallbacks };
}

/** 朴素法的字符比较次数与全部命中（n 很小，直接充当 ground truth）。 */
function naiveScan(
  text: string,
  pattern: string,
): {
  comparisons: number;
  shifts: number[];
} {
  const n = text.length;
  const m = pattern.length;
  let comparisons = 0;
  const shifts: number[] = [];
  for (let s = 0; s + m <= n; s += 1) {
    let j = 0;
    while (j < m) {
      comparisons += 1;
      if (text[s + j] !== pattern[j]) break;
      j += 1;
    }
    if (j === m) shifts.push(s);
  }
  return { comparisons, shifts };
}

/* ---------- Lab：q 轨迹 × 边界回退 × 重叠命中 ---------- */

type Preset = {
  readonly id: string;
  readonly label: string;
  readonly text: string;
  readonly pattern: string;
  readonly note: string;
};

const PRESETS: readonly Preset[] = [
  {
    id: "border",
    label: "P = ababab",
    text: "ababcababacabababd",
    pattern: "ababab",
    note: "模式有长边界 abab：失配回退频繁，KMP 省最多",
  },
  {
    id: "periodic",
    label: "P = abcabcab",
    text: "abcabcabdabcabcabcab",
    pattern: "abcabcab",
    note: "周期结构：相邻命中共享边界 abcab",
  },
  {
    id: "overlap",
    label: "P = aaaa",
    text: "aaaaaabaaaaaa",
    pattern: "aaaa",
    note: "命中彼此重叠：清零状态立刻漏报",
  },
] as const;

const PRESET_DEFAULT = "border";

const SM_STEPS: readonly TeachingStep[] = [
  {
    label: "trace",
    caption: "逐字符扫描：折线是已匹配长度 q 的轨迹，对照朴素法的比较次数",
  },
  {
    label: "fallback",
    caption: "失配瞬间：q 沿前缀函数链回退，文本指针 i 一步都不回退",
  },
  {
    label: "overlap",
    caption: "命中之后：q 落到 pi[m-1] 保住边界；清零则漏掉重叠命中",
  },
];

const SM_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  SM_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Clrs4Chapter32StringMatchingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [presetId, setPresetId] = useState<string>(PRESET_DEFAULT);
  const [faultZero, setFaultZero] = useState(false);
  const [rkWindow, setRkWindow] = useState(0);

  const timeline = useTeachingTimeline({
    steps: SM_STEPS,
    build: (tl) => {
      SM_STEPS.forEach((step, index) => {
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
  const text = preset.text;
  const pattern = preset.pattern;
  const n = text.length;
  const m = pattern.length;

  const normal = kmpTrace(text, pattern, false);
  const fault = kmpTrace(text, pattern, true);
  const naive = naiveScan(text, pattern);
  const active = faultZero ? fault : normal;

  const allOccurrences = naive.shifts;
  const missed = faultZero
    ? allOccurrences.filter((s) => !fault.matches.includes(s))
    : [];
  const found = active.matches;

  const saved =
    naive.comparisons > 0
      ? Math.round((1 - active.comparisons / naive.comparisons) * 100)
      : 0;

  // 最深的非命中回退，用于 fallback 步的标注。
  let prevQ = 0;
  let deepest: { i: number; from: number; to: number } | null = null;
  for (const [i, ev] of normal.events.entries()) {
    if (ev.matchStart === null && ev.qAfter < prevQ) {
      if (!deepest || prevQ - ev.qAfter > deepest.from - deepest.to) {
        deepest = { i, from: prevQ, to: ev.qAfter };
      }
    }
    prevQ = ev.qAfter;
  }

  const borderLen = normal.pi[m - 1];

  /* 几何：文本格与 q 轨迹共用同一 x 轴（按字符下标 i）。 */
  const LEFT = 84;
  const cellW = Math.min(32, 664 / n);
  const xOf = (i: number) => LEFT + cellW * (i + 0.5);
  const plotRight = LEFT + cellW * n;
  const QY0 = 236; // q = 0
  const QY1 = 64; // q = m
  const yOf = (q: number) => QY0 - (q * (QY0 - QY1)) / m;

  const trajectory = active.events
    .map((ev, i) => `${fx(xOf(i))},${fx(yOf(ev.qAfter))}`)
    .join(" ");
  const leadX = fx(xOf(0) - cellW * 0.5);
  const ghostTrajectory = faultZero
    ? normal.events
        .map((ev, i) => `${fx(xOf(i))},${fx(yOf(ev.qAfter))}`)
        .join(" ")
    : null;

  function applyPreset(id: string) {
    setPresetId(id);
    timeline.seek(0);
  }

  function resetKmp() {
    setPresetId(PRESET_DEFAULT);
    setFaultZero(false);
    timeline.seek(0);
  }

  function resetRabinKarp() {
    setRkWindow(0);
  }

  const currentStep =
    timeline.currentStep >= SM_STEPS.length
      ? SM_STEPS.length - 1
      : timeline.currentStep;

  const status: { tone: "ok" | "warn" | "bad"; text: string } = faultZero
    ? missed.length > 0
      ? { tone: "bad", text: `漏报 ${missed.length} 个重叠命中` }
      : { tone: "warn", text: "清零了，但此输入没有重叠命中" }
    : { tone: "ok", text: `全部 ${allOccurrences.length} 个命中已找到` };

  const chipClass =
    status.tone === "bad"
      ? "text-danger"
      : status.tone === "warn"
        ? "text-warning"
        : "text-success";

  const rkText = "aabc";
  const rkPattern = "bc";
  const rkBase = 3;
  const rkModulus = 5;
  const rkDigit = (character: string) => character.charCodeAt(0) - 97;
  const rkHash = (value: string) =>
    Array.from(value).reduce(
      (hash, character) => (hash * rkBase + rkDigit(character)) % rkModulus,
      0,
    );
  const rkPatternHash = rkHash(rkPattern);
  const rkHighestPlace = rkBase ** (rkPattern.length - 1) % rkModulus;
  const rkWindows = Array.from(
    { length: rkText.length - rkPattern.length + 1 },
    (_, start) => {
      const window = rkText.slice(start, start + rkPattern.length);
      const hash = rkHash(window);
      return {
        start,
        window,
        hash,
        verified: hash === rkPatternHash && window === rkPattern,
        collision: hash === rkPatternHash && window !== rkPattern,
      };
    },
  );
  const selectedRkWindow = rkWindows[rkWindow];
  const previousRkHash = rkWindows[Math.max(0, rkWindow - 1)]?.hash ?? 0;
  const rolledRkHash =
    rkWindow === 0
      ? rkWindows[0].hash
      : (((rkBase *
          (previousRkHash - rkDigit(rkText[rkWindow - 1]) * rkHighestPlace) +
          rkDigit(rkText[rkWindow + rkPattern.length - 1])) %
          rkModulus) +
          rkModulus) %
        rkModulus;

  return (
    <>
      <figure
        className="mdx-figure not-prose mx-auto my-8"
        data-visual-kind="string-matching-rabin-karp-collision"
        data-readout="rabin-karp-window-oracle"
        data-window={selectedRkWindow.start}
        data-window-hash={selectedRkWindow.hash}
        data-pattern-hash={rkPatternHash}
        data-collision={selectedRkWindow.collision}
        data-verified-match={selectedRkWindow.verified}
      >
        <div className="rounded-card border border-border bg-elevated p-4 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            CLRS 4e · Chapter 32 · Rabin–Karp
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            滚动指纹：相等只是候选，不是答案
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            文本 aabc，模式 bc；字符映射 a=0、b=1、c=2，基数 d=3，模数 q=5。
            选择窗口观察指纹如何滚动，以及哈希相等后为何必须核验字符。
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-control border border-border p-3">
              <p className="text-xs text-secondary">模式指纹</p>
              <p className="mt-1 font-mono text-primary">
                H(bc) = (1×3 + 2) mod 5 = {rkPatternHash}
              </p>
            </div>
            <div className="rounded-control border border-border p-3">
              <p className="text-xs text-secondary">最高位权重</p>
              <p className="mt-1 font-mono text-primary">
                h = d^(m−1) mod q = {rkHighestPlace}
              </p>
            </div>
          </div>
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="选择文本窗口"
          >
            {rkWindows.map((window) => (
              <button
                key={window.start}
                type="button"
                aria-pressed={rkWindow === window.start}
                onClick={() => setRkWindow(window.start)}
                className={`min-h-11 rounded-control border px-3 font-mono text-sm ${
                  rkWindow === window.start
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                T[{window.start}..{window.start + rkPattern.length}) ={" "}
                {window.window}
              </button>
            ))}
          </div>
          <div
            className="mt-4 rounded-control border border-border p-3"
            aria-live="polite"
          >
            <p className="font-mono text-sm text-primary">
              {rkWindow === 0
                ? `首窗 H(aa) = ${selectedRkWindow.hash}`
                : `H(T[${rkWindow}..${rkWindow + 2})) = (3 × (${previousRkHash} − ${rkDigit(rkText[rkWindow - 1])} × ${rkHighestPlace}) + ${rkDigit(rkText[rkWindow + 1])}) mod 5 = ${rolledRkHash}`}
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${selectedRkWindow.verified ? "text-success" : selectedRkWindow.collision ? "text-warning" : "text-secondary"}`}
            >
              {selectedRkWindow.verified
                ? `哈希相等且逐字符相等：确认匹配，报告起点 ${selectedRkWindow.start}。`
                : selectedRkWindow.collision
                  ? `哈希同为 ${rkPatternHash}，但 ${selectedRkWindow.window} ≠ ${rkPattern}：伪命中，核验后拒绝。`
                  : `窗口哈希 ${selectedRkWindow.hash} ≠ 模式哈希 ${rkPatternHash}：无需逐字符核验，可确定不匹配。`}
            </p>
          </div>
          <p className="mt-3 text-xs leading-5 text-secondary">
            这个小模数故意制造碰撞；真正的精确性来自候选核验。随机化参数可降低碰撞概率，不能把哈希相等变成证明。
          </p>
          <button
            type="button"
            onClick={resetRabinKarp}
            aria-label="重置 Rabin–Karp 窗口实验"
            className="mx-auto mt-3 block min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置窗口
          </button>
        </div>
        <figcaption className="mt-2 text-center text-sm text-secondary">
          交互对照三个连续窗口：aa 与 bc 指纹碰撞，ab 被哈希排除，bc
          经核验后命中。
        </figcaption>
      </figure>
      <figure
        className="mdx-figure not-prose mx-auto my-8"
        data-headful-lab="chapter-32-kmp-trace"
        data-visual-kind="string-matching-kmp-trace-vs-naive"
        data-readout="kmp-trace-oracle"
        data-status={status.tone}
        data-preset={preset.id}
        data-comparisons-naive={naive.comparisons}
        data-comparisons-kmp={active.comparisons}
        data-fallbacks={active.fallbacks}
        data-matches-found={found.length}
        data-matches-all={allOccurrences.length}
        data-matches-missed={missed.length}
      >
        <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                CLRS 4e · Chapter 32 · String Matching
              </p>
              <h3 className="mt-1 text-lg font-semibold text-primary">
                q 轨迹实验：失配回退与重叠命中，KMP 到底省了什么
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
                猜一猜：把模式换成 P =
                aaaa（命中彼此重叠），再打开“命中后清零”故障，会漏掉几个命中？
                先预测，再推进时间线：第一步看 q
                的轨迹和比较次数，第二步看失配时 q
                沿前缀函数链回退而文本指针不动，第三步看命中之后边界被保住还是被清零。
              </p>
            </div>
            <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
              ▷ 可交互
            </span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-primary">模式</span>
            <div
              role="radiogroup"
              aria-label="模式预设"
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
                    name="sm-pattern"
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
            viewBox="0 0 800 470"
            role="img"
            aria-label="CLRS 4e 第 32 章字符串匹配专属实验。上方折线是 KMP 扫描时“已匹配长度 q”随文本下标 i 变化的轨迹，下落段表示失配后沿前缀函数链回退；下方是文本字符格与命中标记。支持播放、暂停、单步、拖进度、三种模式预设切换、命中后清零故障注入和重置；并可对照朴素法的字符比较次数。"
            className="h-auto w-full"
          >
            {/* 坐标轴 */}
            <g>
              <line
                x1={LEFT - 20}
                y1={QY1 - 10}
                x2={LEFT - 20}
                y2={QY0}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <line
                x1={LEFT - 20}
                y1={QY0}
                x2={plotRight + 12}
                y2={QY0}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <text
                x={LEFT - 28}
                y={QY0 + 4}
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                0
              </text>
              <text
                x={LEFT - 28}
                y={QY1 + 4}
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                {m}
              </text>
              <text x={LEFT - 20} y={QY1 - 20} fontSize="11" fill={C.secondary}>
                已匹配长度 q
              </text>
              <text
                x={plotRight + 12}
                y={QY0 + 20}
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                文本位置 i →
              </text>
            </g>

            {/* Stage 0：q 轨迹 + 文本格 + 朴素对照基线 */}
            <g
              ref={(el) => {
                stageRefs.current[0] = el;
              }}
              opacity={1}
            >
              {ghostTrajectory && (
                <polyline
                  points={`${leadX},${fx(yOf(0))} ${ghostTrajectory}`}
                  fill="none"
                  stroke={C.secondary}
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  opacity={0.7}
                  data-ghost="correct-trace"
                />
              )}
              <polyline
                points={`${leadX},${fx(yOf(0))} ${trajectory}`}
                fill="none"
                stroke={faultZero ? C.danger : C.accent}
                strokeWidth="2.5"
                data-trace="q-trajectory"
              />
              {active.events.map((ev, i) => (
                <g key={`cell-${i}`}>
                  <rect
                    x={fx(xOf(i) - cellW / 2 + 2)}
                    y={268}
                    width={fx(cellW - 4)}
                    height={34}
                    rx={6}
                    fill={C.bg}
                    stroke={C.border}
                  />
                  <text
                    x={fx(xOf(i))}
                    y={291}
                    textAnchor="middle"
                    fontSize="14"
                    fill={C.primary}
                  >
                    {text[i]}
                  </text>
                  <text
                    x={fx(xOf(i))}
                    y={320}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {i}
                  </text>
                </g>
              ))}
              <text x={LEFT} y={344} fontSize="11" fill={C.secondary}>
                {`文本 T（n=${n}） · 模式 P（m=${m}）`}
              </text>
            </g>

            {/* Stage 1：失配回退 + 前缀函数表 + 边界结构 */}
            <g
              ref={(el) => {
                stageRefs.current[1] = el;
              }}
              opacity={0}
            >
              {active.events.map((ev, i) => {
                if (!ev.fellBack) return null;
                const qBefore = i === 0 ? 0 : active.events[i - 1].qAfter;
                return (
                  <line
                    key={`fb-${i}`}
                    x1={fx(xOf(i))}
                    y1={fx(yOf(qBefore))}
                    x2={fx(xOf(i))}
                    y2={fx(yOf(ev.qAfter))}
                    stroke={C.accent}
                    strokeWidth="3"
                    data-fallback={i}
                  />
                );
              })}
              {deepest && (
                <g data-readout="deepest-fallback">
                  <rect
                    x={LEFT + 8}
                    y={QY1 - 8}
                    width={430}
                    height={30}
                    rx={8}
                    fill={C.accent}
                    opacity={0.12}
                  />
                  <text
                    x={LEFT + 22}
                    y={QY1 + 12}
                    fontSize="12"
                    fill={C.accent}
                    fontWeight="600"
                  >
                    {`最深的回退在 i=${deepest.i}：q ${deepest.from}→${deepest.to}，文本指针没有回退`}
                  </text>
                </g>
              )}
              {/* 前缀函数表 */}
              <text x={LEFT} y={372} fontSize="11" fill={C.secondary}>
                前缀函数 pi（失配时 q 的“逃生梯”）
              </text>
              {normal.pi.map((v, q) => (
                <g key={`pi-${q}`}>
                  <rect
                    x={fx(LEFT + 8 + q * 44)}
                    y={380}
                    width={38}
                    height={28}
                    rx={6}
                    fill={C.bg}
                    stroke={C.border}
                  />
                  <text
                    x={fx(LEFT + 27 + q * 44)}
                    y={392}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {`pi[${q}]`}
                  </text>
                  <text
                    x={fx(LEFT + 27 + q * 44)}
                    y={405}
                    textAnchor="middle"
                    fontSize="13"
                    fill={C.primary}
                    fontWeight="600"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {/* 模式格与最长边界 */}
              <text x={LEFT} y={436} fontSize="11" fill={C.secondary}>
                {`模式 P 的最长边界长度 pi[m-1] = ${borderLen}（前缀 = 后缀）`}
              </text>
              {pattern.split("").map((ch, j) => {
                const inPrefix = j < borderLen;
                const inSuffix = j >= m - borderLen;
                return (
                  <g key={`p-${j}`}>
                    <rect
                      x={fx(LEFT + 8 + j * 44)}
                      y={444}
                      width={38}
                      height={24}
                      rx={6}
                      fill={C.bg}
                      stroke={inPrefix || inSuffix ? C.accent : C.border}
                      strokeWidth={inPrefix || inSuffix ? 2 : 1}
                      strokeDasharray={
                        inSuffix && !inPrefix ? "4 3" : undefined
                      }
                    />
                    <text
                      x={fx(LEFT + 27 + j * 44)}
                      y={461}
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      {ch}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Stage 2：命中与重叠处理（正常 vs 清零故障） */}
            <g
              ref={(el) => {
                stageRefs.current[2] = el;
              }}
              opacity={0}
            >
              {active.events.map((ev, i) => {
                if (ev.matchStart === null) return null;
                const resetQ = faultZero ? 0 : normal.pi[m - 1];
                return (
                  <g key={`hit-${i}`}>
                    <circle
                      cx={fx(xOf(i))}
                      cy={fx(yOf(m))}
                      r="5"
                      fill={C.success}
                    />
                    <line
                      x1={fx(xOf(i))}
                      y1={fx(yOf(m))}
                      x2={fx(xOf(i))}
                      y2={fx(yOf(resetQ))}
                      stroke={faultZero ? C.danger : C.success}
                      strokeWidth="2.5"
                      strokeDasharray={faultZero ? "5 4" : undefined}
                    />
                  </g>
                );
              })}
              {allOccurrences.map((s) => {
                const isFound = found.includes(s);
                const cx = fx(xOf(s));
                return (
                  <g key={`occ-${s}`}>
                    <rect
                      x={fx(xOf(s) - cellW / 2 + 2)}
                      y={264}
                      width={fx(cellW * Math.min(m, n - s) - 4)}
                      height={4}
                      rx={2}
                      fill={isFound ? C.success : C.danger}
                    />
                    {!isFound && (
                      <g stroke={C.danger} strokeWidth="2.5">
                        <line x1={cx - 6} y1={308} x2={cx + 6} y2={320} />
                        <line x1={cx - 6} y1={320} x2={cx + 6} y2={308} />
                      </g>
                    )}
                  </g>
                );
              })}
              <text
                x={plotRight + 12}
                y={QY1 + 12}
                textAnchor="end"
                fontSize="11"
                fill={faultZero ? C.danger : C.success}
                fontWeight="600"
              >
                {faultZero
                  ? `命中后 q=0：漏掉 ${missed.length} 个重叠命中`
                  : `命中后 q=pi[m-1]=${borderLen}：边界被保住`}
              </text>
            </g>

            <text
              x={plotRight + 12}
              y={QY1 - 20}
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {`步骤：${SM_STEPS[currentStep]?.label ?? "trace"}`}
            </text>
          </svg>

          <div
            className="mt-3 overflow-x-auto rounded-control border border-border"
            role="group"
            aria-label={`模式 ${pattern} 的前缀函数`}
          >
            <table className="w-full border-collapse text-center text-xs">
              <caption className="px-3 py-2 text-left leading-5 text-secondary">
                前缀函数 π：每列对应 P 的一个字符；π[j] 是 P[0..j]
                的最长真前后缀长度。失配时沿这些值回退。
              </caption>
              <tbody>
                <tr className="border-t border-border">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-3 py-2 text-left font-medium text-secondary"
                  >
                    下标 j
                  </th>
                  {Array.from(pattern, (_, index) => (
                    <td
                      key={`pi-index-${index}`}
                      className="min-w-8 px-2 py-2 tabular-nums text-primary"
                    >
                      {index}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-3 py-2 text-left font-medium text-secondary"
                  >
                    P[j] / π[j]
                  </th>
                  {Array.from(pattern, (character, index) => (
                    <td
                      key={`pi-value-${index}`}
                      className="min-w-8 px-2 py-2 tabular-nums text-primary"
                    >
                      <span className="block">{character}</span>
                      <span className="block text-secondary">
                        {normal.pi[index]}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="rounded-card border border-border p-3">
              <p className="text-xs text-secondary">字符比较次数</p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {`朴素 ${naive.comparisons} · KMP ${active.comparisons}`}
              </p>
            </div>
            <div className="rounded-card border border-border p-3">
              <p className="text-xs text-secondary">KMP 节省</p>
              <p className="mt-1 text-sm font-semibold text-accent">
                {`${saved}%（回退 ${active.fallbacks} 次）`}
              </p>
            </div>
            <div className="rounded-card border border-border p-3">
              <p className="text-xs text-secondary">命中</p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {`找到 ${found.length} / 共 ${allOccurrences.length} 个`}
              </p>
            </div>
            <div className="rounded-card border border-border p-3">
              <p className="text-xs text-secondary">正确性状态</p>
              <p
                className={`mt-1 text-sm font-semibold ${chipClass}`}
                role="status"
                aria-live="polite"
              >
                {status.text}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
                faultZero
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              <input
                type="checkbox"
                checked={faultZero}
                onChange={(e) => {
                  setFaultZero(e.target.checked);
                  timeline.seek(0);
                }}
                data-fault="zero-state-after-match"
                className="h-4 w-4 accent-[var(--danger)]"
              />
              注入故障：命中后清零（q = 0）
            </label>
            <span className="max-w-xl text-xs leading-5 text-secondary">
              现象：彼此重叠的命中被漏报（红色 ✕）→ 原因：命中后正确动作是
              q=pi[m-1] 保住最长边界，写 0 就把边界信息丢了 →
              修法：命中回退一行，用前缀函数末位值，别硬编码 0。
            </span>
          </div>

          <div className="[&_button]:min-h-11 [&_button]:min-w-11">
            <TimelineControls
              timeline={timeline}
              labelText={SM_LABEL_TEXT}
              caption="先预测清零故障会漏掉几个命中，再推进时间线：第二步看 q 沿 pi 链回退而 i 不动，第三步看命中之后边界是被保住还是被清零。"
              reset={{
                label: "重置实验",
                ariaLabel: "重置字符串匹配轨迹实验",
                onClick: resetKmp,
              }}
            />
          </div>
        </div>
        <figcaption className="mt-2 text-center text-sm text-secondary">
          折线是“已匹配前缀长度”随扫描位置的轨迹：下落段是一次失配回退，它只改
          q、不回读文本；命中后的下落决定重叠命中是保住还是漏掉。本实验聚焦 KMP
          的状态复用与朴素扫描的比较次数，不代表两种算法的全部差异。
        </figcaption>
      </figure>
    </>
  );
}
