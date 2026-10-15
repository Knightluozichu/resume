"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const controls =
  "min-h-11 min-w-11 rounded border border-border bg-bg px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent";
const STEPS = [0, 1, 2, 3, 4].map((i) => ({ label: `阶段${i}` }));
function useTrace() {
  return useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const clock = { value: 0 };
      STEPS.forEach((s, i) => tl.label(s.label, i * 1100));
      tl.add(clock, { value: 4, duration: 4400, ease: "linear" }, 0);
    },
  });
}

export function Llm02LanguageModelingTokenizationContextContractLab() {
  const [prob, setProb] = useState(0.8);
  const [sequence, setSequence] = useState("AAA");
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const n = Math.min(tl.currentStep, 3);
  const probs = [0.5, prob, sequence === "AAA" ? prob : 1 - prob];
  const nll = -probs.slice(0, n).reduce((sum, p) => sum + Math.log(p), 0);
  const denominator = n + (fault ? 2 : 0);
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setProb(0.8);
    setSequence("AAA");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="probability"
      data-visual-kind="conditional-probability-tree"
      data-state={JSON.stringify({
        prob,
        sequence,
        fault,
        step: tl.currentStep,
        playing: tl.isPlaying,
      })}
      aria-label="链式概率树实验"
    >
      <h3 className="mb-3 text-lg font-semibold">概率树：分子和分母分开记</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1">
          重复上一个符号的概率 q = {prob.toFixed(1)}
          <input
            aria-label="重复概率"
            type="range"
            min="0.2"
            max="0.9"
            step="0.1"
            value={prob}
            onChange={(e) => {
              tl.pause();
              setProb(Number(e.target.value));
            }}
          />
        </label>
        <label className="grid gap-1">
          观测序列
          <select
            className={controls}
            aria-label="观测序列"
            value={sequence}
            onChange={(e) => {
              tl.pause();
              setSequence(e.target.value);
            }}
          >
            <option>AAA</option>
            <option>AAB</option>
          </select>
        </label>
      </div>
      <svg
        className="mx-auto mt-4 w-full max-w-[420px]"
        viewBox="0 0 300 365"
        role="img"
        aria-label="完整三层二叉概率树，线宽表示条件概率，强调路径逐步累积负对数概率"
        fontSize="16"
      >
        <text x="150" y="22" fill={C.text} textAnchor="middle">
          BOS：只作上下文
        </text>
        {[1, 2, 3].flatMap((depth) =>
          Array.from({ length: 2 ** depth }, (_, j) => {
            const count = 2 ** depth;
            const x = 18 + ((j + 0.5) * 264) / count;
            const px =
              depth === 1
                ? 150
                : 18 + ((Math.floor(j / 2) + 0.5) * 264) / (count / 2);
            const y = 40 + depth * 73;
            const prefix = j
              .toString(2)
              .padStart(depth, "0")
              .replaceAll("0", "A")
              .replaceAll("1", "B");
            const active = sequence.startsWith(prefix) && depth <= n;
            const previousA = depth === 1 || Math.floor(j / 2) % 2 === 0;
            const edgeP =
              depth === 1 ? 0.5 : (j % 2 === 0) === previousA ? prob : 1 - prob;
            return (
              <g key={`${depth}-${j}`}>
                <line
                  x1={px}
                  y1={y - 64}
                  x2={x}
                  y2={y - 12}
                  stroke={active ? C.accent : C.border}
                  strokeWidth={active ? 2 + edgeP * 5 : 1 + edgeP * 3}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  fill={active ? C.accent : C.bg}
                  stroke={C.border}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill={active ? C.bg : C.text}
                >
                  {j % 2 === 0 ? "A" : "B"}
                </text>
              </g>
            );
          }),
        )}
        <text x="12" y="330" fill={C.muted}>
          路径 p：{probs.map((p) => p.toFixed(2)).join(" × ")}
        </text>
        <text x="12" y="356" fill={fault ? C.danger : C.text}>
          分母 = {n} 有效预测{fault ? " + BOS + pad（错）" : "；不含 BOS / pad"}
        </text>
      </svg>
      <p className="mt-2 break-words" aria-live="polite">
        NLL = {nll.toFixed(4)}；N = {denominator}；PPL ={" "}
        {denominator ? Math.exp(nll / denominator).toFixed(4) : "—（尚无预测）"}
      </p>
      <button
        className={`${controls} mt-3 w-full`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：把 BOS / pad 计入分母（{fault ? "开" : "关"}）
      </button>
      <TimelineControls
        timeline={tl}
        caption={
          tl.currentStep === 4
            ? "结算：只对三个真实目标评分；这不是跨 tokenizer 的排名。"
            : "每一步沿观测路径加入一项 −ln p；第4阶段汇总。"
        }
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

type Word = { word: string; frequency: number; symbols: string[] };
function bpeHistory(low: number, unweighted: boolean) {
  let words: Word[] = [
    ["low", low],
    ["lower", 2],
    ["newest", 6],
    ["widest", 3],
  ].map(([word, frequency]) => ({
    word: String(word),
    frequency: Number(frequency),
    symbols: [...String(word), "#"],
  }));
  const history = [];
  for (let round = 0; round <= 4; round++) {
    const counts = new Map<string, number>();
    for (const w of words)
      for (let i = 0; i < w.symbols.length - 1; i++) {
        const key = `${w.symbols[i]} ${w.symbols[i + 1]}`;
        counts.set(
          key,
          (counts.get(key) ?? 0) + (unweighted ? 1 : w.frequency),
        );
      }
    const pairs = [...counts].sort(
      (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0),
    );
    const pair = pairs[0][0].split(" ");
    history.push({ words, pairs, best: pairs[0][0] });
    words = words.map((w) => {
      const symbols: string[] = [];
      for (let i = 0; i < w.symbols.length; i++) {
        if (w.symbols[i] === pair[0] && w.symbols[i + 1] === pair[1]) {
          symbols.push(pair.join(""));
          i++;
        } else symbols.push(w.symbols[i]);
      }
      return { ...w, symbols };
    });
  }
  return history;
}

export function Llm02LanguageModelingTokenizationComputeTraceLab() {
  const [weight, setWeight] = useState(5);
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const history = bpeHistory(weight, fault);
  const state = history[tl.currentStep];
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setWeight(5);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="bpe"
      data-visual-kind="weighted-bpe-merge-trace"
      data-state={JSON.stringify({
        weight,
        fault,
        step: tl.currentStep,
        playing: tl.isPlaying,
      })}
      aria-label="加权BPE实验"
    >
      <h3 className="mb-3 text-lg font-semibold">BPE：频数柱决定下一次合并</h3>
      <label className="grid gap-1">
        low 的词频 = {weight}
        <input
          aria-label="low词频"
          type="range"
          min="1"
          max="10"
          value={weight}
          onChange={(e) => {
            tl.pause();
            setWeight(Number(e.target.value));
          }}
        />
      </label>
      <svg
        className="mx-auto mt-3 w-full max-w-[420px]"
        viewBox="0 0 300 425"
        role="img"
        aria-label="实际词频加权的前四对频数柱与四个词的当前切分；井号标记词尾，不跨词合并"
        fontSize="16"
      >
        <text x="10" y="22" fill={fault ? C.danger : C.text}>
          {fault ? "错误：每种词只计一次" : "词内 pair 计数 × 词频"}
        </text>
        {state.pairs.slice(0, 4).map(([pair, count], i) => (
          <g key={pair}>
            <text x="10" y={53 + i * 37} fill={C.text}>
              {pair}
            </text>
            <rect
              x="103"
              y={36 + i * 37}
              width={(count / state.pairs[0][1]) * 142}
              height="24"
              fill={i === 0 ? (fault ? C.danger : C.accent) : C.border}
            />
            <text x="255" y={54 + i * 37} fill={C.text}>
              {count}
            </text>
          </g>
        ))}
        <text x="10" y="208" fill={C.text}>
          已合并 {tl.currentStep} 次；下一对 {state.best}
        </text>
        {state.words.map((w, row) => (
          <g key={w.word}>
            <text x="10" y={239 + row * 40} fill={C.muted}>
              {w.frequency}×
            </text>
            {w.symbols.map((s, i) => {
              const before = w.symbols.slice(0, i).join("").length;
              return (
                <g key={i}>
                  <rect
                    x={43 + before * 34}
                    y={220 + row * 40}
                    width={s.length * 34 - 3}
                    height="28"
                    rx="3"
                    fill={C.bg}
                    stroke={s.length > 1 ? C.accent : C.border}
                  />
                  <text
                    x={43 + (before + s.length / 2) * 34 - 1}
                    y={240 + row * 40}
                    textAnchor="middle"
                    fill={C.text}
                  >
                    {s}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="10" y="413" fill={C.muted}>
          # = 词尾；格宽保留原符号跨度
        </text>
      </svg>
      <p className="break-words" aria-live="polite">
        合并记录：
        {history
          .slice(0, tl.currentStep)
          .map((s) => s.best.replace(" ", "+"))
          .join(" → ") || "尚未合并"}
        。每轮重新计数；平局按 pair 字典序。
      </p>
      <button
        className={`${controls} mt-3 w-full`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：忽略词频（{fault ? "开" : "关"}）
      </button>
      <TimelineControls
        timeline={tl}
        caption="阶段0为初始字符；阶段1–4各完成一次词内、左到右非重叠合并。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

const SAMPLES = ["猫a", "éa", "e\u0301"];
export function Llm02LanguageModelingTokenizationEvidenceGateLab() {
  const [sample, setSample] = useState("猫a");
  const [mode, setMode] = useState("codepoint");
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const bytes = [...new TextEncoder().encode(sample)];
  const chars = [...sample];
  let offset = 0;
  const spans = chars.map((c) => {
    const start = offset;
    offset += new TextEncoder().encode(c).length;
    return { label: c === "\u0301" ? "◌́" : c, start, end: offset };
  });
  const tokens =
    mode === "byte"
      ? bytes.map((_, i) => ({ start: i, end: i + 1 }))
      : mode === "whole"
        ? [{ start: 0, end: bytes.length }]
        : spans;
  const rebuilt = bytes.filter((_, i) => !fault || i !== 1);
  let decoded = "";
  try {
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(
      new Uint8Array(rebuilt),
    );
  } catch {
    decoded = "UTF-8 解码失败";
  }
  const ok = !fault && decoded === sample;
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setSample("猫a");
    setMode("codepoint");
    setFault(false);
  };
  const x = (i: number) => 18 + i * 64;
  return (
    <section
      className={shell}
      data-lab="lattice"
      data-visual-kind="utf8-codepoint-token-lattice"
      data-state={JSON.stringify({
        sample,
        mode,
        fault,
        step: tl.currentStep,
        playing: tl.isPlaying,
      })}
      aria-label="字节码点词元对齐实验"
    >
      <h3 className="mb-3 text-lg font-semibold">一条字节轴，三种边界</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1">
          原始文本
          <select
            className={controls}
            aria-label="原始文本"
            value={sample}
            onChange={(e) => {
              tl.pause();
              setSample(e.target.value);
            }}
          >
            {SAMPLES.map((s) => (
              <option key={s} value={s}>
                {s === "e\u0301" ? "e + 组合重音（不规范化）" : s}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          toy 切分
          <select
            className={controls}
            aria-label="toy切分"
            value={mode}
            onChange={(e) => {
              tl.pause();
              setMode(e.target.value);
            }}
          >
            <option value="codepoint">Unicode 码点</option>
            <option value="byte">每个 byte</option>
            <option value="whole">整串一个 token</option>
          </select>
        </label>
      </div>
      <svg
        className="mx-auto mt-4 w-full max-w-[420px]"
        viewBox="0 0 300 370"
        role="img"
        aria-label="UTF8十六进制字节轴连接Unicode码点跨度与toy词元跨度，故障丢弃第二字节，完整重组检查字节保真"
        fontSize="16"
      >
        <text x="18" y="22" fill={C.text}>
          UTF-8：{bytes.length} bytes
        </text>
        {bytes.map((b, i) => (
          <g key={i}>
            <rect
              x={x(i)}
              y="36"
              width="60"
              height="36"
              fill={C.bg}
              stroke={C.border}
            />
            <text x={x(i) + 30} y="60" textAnchor="middle" fill={C.text}>
              {b.toString(16).toUpperCase().padStart(2, "0")}
            </text>
          </g>
        ))}
        <text x="18" y="110" fill={C.text}>
          Unicode：{chars.length} 个码点
        </text>
        {spans.map((s, i) => (
          <g key={i} opacity={tl.currentStep >= 1 ? 1 : 0.35}>
            <path
              d={`M${x(s.start) + 2},76 L${x(s.start) + 3},88 M${x(s.start) + 4},119 L${x(s.start) + 5},130 M${x(s.end) - 6},76 L${x(s.end) - 7},88 M${x(s.end) - 8},119 L${x(s.end) - 9},130`}
              fill="none"
              stroke={C.border}
            />
            <rect
              x={x(s.start)}
              y="134"
              width={(s.end - s.start) * 64 - 4}
              height="34"
              fill={C.bg}
              stroke={C.accent}
            />
            <text
              x={(x(s.start) + x(s.end) - 4) / 2}
              y="157"
              textAnchor="middle"
              fill={C.text}
            >
              {s.label}
            </text>
          </g>
        ))}
        <text x="18" y="207" fill={C.text}>
          toy：{tokens.length} 个 tokens
        </text>
        {tokens.map((t, i) => (
          <g key={i} opacity={tl.currentStep >= 2 ? 1 : 0.35}>
            <path
              d={`M${x(t.start) + 3},175 V185 M${x(t.start) + 3},215 V226`}
              fill="none"
              stroke={C.border}
            />
            <rect
              x={x(t.start)}
              y="229"
              width={(t.end - t.start) * 64 - 4}
              height="34"
              fill={C.bg}
              stroke={C.accent}
            />
            <text
              x={(x(t.start) + x(t.end) - 4) / 2}
              y="252"
              textAnchor="middle"
              fill={C.text}
            >
              t{i}
            </text>
          </g>
        ))}
        <text x="18" y="301" fill={C.text}>
          重组 bytes（{rebuilt.length}）
        </text>
        {bytes.map((b, i) => (
          <g key={i} opacity={tl.currentStep >= 3 ? 1 : 0.35}>
            <rect
              x={x(i)}
              y="315"
              width="60"
              height="32"
              fill={C.bg}
              stroke={fault && i === 1 ? C.danger : C.border}
            />
            <text
              x={x(i) + 30}
              y="337"
              textAnchor="middle"
              fill={fault && i === 1 ? C.danger : C.text}
            >
              {fault && i === 1 ? "丢失" : b.toString(16).toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      <p className="break-words" aria-live="polite">
        回环检查：
        {tl.currentStep === 4
          ? ok
            ? `PASS：${decoded}`
            : `FAIL：${decoded}`
          : "推进到阶段4验收"}
        。byte token 可拆开多字节字符；要检查的是所有 token 拼回的原始 bytes。
      </p>
      <button
        className={`${controls} mt-3 w-full`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：丢弃第2个 byte（{fault ? "开" : "关"}）
      </button>
      <TimelineControls
        timeline={tl}
        caption="依次展开：字节 → 码点 → token → 重组 → 保真检查。e+重音有2码点，不代表2个用户感知字符。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
