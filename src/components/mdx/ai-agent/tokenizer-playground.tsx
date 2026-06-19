"use client";

import { useMemo, useState } from "react";

import { DemoStage } from "../controls";

/**
 * <AaTokenizerPlayground>：「把文字切成 token」的动手交互件（HEL-272）。
 *
 * 读者在输入框打中英混合文本，组件实时把它切成 token、着色分块展示 + 显示 token 计数，
 * 让人直观体会「token ≠ 字数」「中文更费 token」「英文一长词可能拆成好几块」。
 *
 * 切分用启发式（不必真 BPE，目的是直观演示，非精确还原某家分词器）：
 *  - 中文 / 日文等 CJK 字：一字 ≈ 一 token；
 *  - 标点 / 空白边界：独立成 token（前导空格并入后一个英文 token，贴近真实 BPE 习惯）；
 *  - 英文「词」：短词（≤6 字母）算 1 token；长词按 ~4~5 字母一段切成多个子词 token，
 *    模拟 BPE 把长词拆成子词的行为，凸显「一个词 ≠ 一个 token」；
 *  - 数字串：每 ~3 位一段。
 *
 * 为何 client：输入框 + 实时分词 + 示例填入 + 重置都是真交互（受控状态）。纯 React，
 * 无 Canvas / WebGL；reduced-motion 友好（仅颜色/边框过渡，globals 已对 reduced 置 0）。
 * 颜色 / 间距 / 圆角 / 动效全部走 DESIGN token（硬规则 5）。
 */

type Tok = { text: string; kind: "cjk" | "word" | "sub" | "punct" | "num" };

// CJK 统一表意文字（含扩展 A）+ 中日韩标点 + 全角符号区（用 \u 码点转义，避免源码塞字面区间字符）。
const isCJK = (ch: string) => /[　-〿㐀-䶿一-鿿＀-￯]/.test(ch);
const isLetter = (ch: string) => /[A-Za-z]/.test(ch);
const isDigit = (ch: string) => /[0-9]/.test(ch);
const isSpace = (ch: string) => /\s/.test(ch);

/** 把一个英文词切成子词 token：短词整块，长词按 ~4 字母一段拆（模拟 BPE 子词）。 */
function splitWord(word: string, leadSpace: boolean): Tok[] {
  const display = (s: string) => (leadSpace ? ` ${s}` : s);
  if (word.length <= 6) {
    return [{ text: display(word), kind: "word" }];
  }
  // 长词：每 4 个字母切一段（最后一段允许 2~5 个），首段带前导空格。
  const out: Tok[] = [];
  let i = 0;
  let first = true;
  while (i < word.length) {
    let len = 4;
    // 避免末尾留下孤零零 1 个字母：若剩 5 个则切 3+2。
    if (word.length - i === 5) len = 3;
    const piece = word.slice(i, i + len);
    out.push({
      text: first && leadSpace ? ` ${piece}` : piece,
      kind: first ? "word" : "sub",
    });
    i += len;
    first = false;
  }
  return out;
}

/** 启发式分词：把任意中英混合串切成一串 token（仅作直观演示，非精确 BPE）。 */
function tokenize(input: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const n = input.length;
  while (i < n) {
    const ch = input[i];

    // 1) 空白：累积成一段，并入后续英文词的前导空格；纯空白（行尾/多空格）单独成块。
    if (isSpace(ch)) {
      let j = i;
      while (j < n && isSpace(input[j])) j++;
      const next = input[j];
      if (next && isLetter(next)) {
        // 前导空格交给下面的英文词处理（标记，跳过空白本身）。
        i = j;
        // 取后续英文词，带前导空格切分。
        let k = j;
        while (k < n && isLetter(input[k])) k++;
        const word = input.slice(j, k);
        toks.push(...splitWord(word, true));
        i = k;
      } else {
        // 空白后不是英文：把这段空白当一个可见 token（用 ␣ 占位展示）。
        toks.push({ text: input.slice(i, j), kind: "punct" });
        i = j;
      }
      continue;
    }

    // 2) CJK 字：一字一 token。
    if (isCJK(ch)) {
      toks.push({ text: ch, kind: "cjk" });
      i += 1;
      continue;
    }

    // 3) 英文字母：聚成一个词再切子词（无前导空格）。
    if (isLetter(ch)) {
      let k = i;
      while (k < n && isLetter(input[k])) k++;
      const word = input.slice(i, k);
      toks.push(...splitWord(word, false));
      i = k;
      continue;
    }

    // 4) 数字：每 3 位一段。
    if (isDigit(ch)) {
      let k = i;
      while (k < n && isDigit(input[k])) k++;
      const num = input.slice(i, k);
      for (let p = 0; p < num.length; p += 3) {
        toks.push({ text: num.slice(p, p + 3), kind: "num" });
      }
      i = k;
      continue;
    }

    // 5) 其他（标点等）：单字符一 token。
    toks.push({ text: ch, kind: "punct" });
    i += 1;
  }
  return toks;
}

const KIND_COLOR: Record<Tok["kind"], string> = {
  cjk: "var(--success)",
  word: "var(--accent)",
  sub: "var(--danger)",
  punct: "var(--text-secondary)",
  num: "var(--warning)",
};

const EXAMPLES: readonly { label: string; text: string }[] = [
  { label: "中文短句", text: "今天天气真好呀" },
  { label: "英文长词", text: "The weather is unbelievable today" },
  { label: "中英混合", text: "帮我 search 一下明天的 weather 预报" },
];

const DEFAULT_TEXT = "今天天气真好呀";

export function AaTokenizerPlayground() {
  const [text, setText] = useState(DEFAULT_TEXT);

  const toks = useMemo(() => tokenize(text), [text]);
  // 计数：可见 token 数 + 字符数（中文按字、英文按字母，去掉纯空白显示用）。
  const charCount = useMemo(
    () => Array.from(text).filter((c) => !isSpace(c)).length,
    [text],
  );

  const reset = () => setText(DEFAULT_TEXT);
  const isDirty = text !== DEFAULT_TEXT;

  return (
    <DemoStage
      title="动手：在框里打字，实时看它被切成多少个 token"
      onReset={isDirty ? reset : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <label className="text-xs text-secondary" htmlFor="tok-input">
            输入中英文混合文本（试试一长串英文词，看它被拆成几块）：
          </label>
          <textarea
            id="tok-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-control border border-border bg-bg p-3 text-sm text-primary outline-none transition-colors duration-(--duration-hover) ease-standard focus:border-accent"
            placeholder="在这里打字……"
          />
          <div className="flex flex-col gap-2 border-t border-border pt-3">
            <span className="text-xs text-secondary">或一键填入示例：</span>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => setText(ex.text)}
                  className="rounded-control border border-border px-3 py-1.5 text-left text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-xl">
        {/* 计数条 */}
        <div className="mb-4 flex items-center justify-center gap-6 text-sm">
          <span className="text-secondary">
            字符数：<span className="font-bold text-primary">{charCount}</span>
          </span>
          <span className="text-secondary">
            token 数：
            <span className="font-bold text-accent" aria-live="polite">
              {toks.length}
            </span>
          </span>
        </div>

        {/* 着色 token 分块 */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 rounded-control border border-border bg-bg p-4"
          aria-label={`分词结果，共 ${toks.length} 个 token`}
        >
          {toks.length === 0 ? (
            <span className="text-xs text-secondary">（输入一些文字试试）</span>
          ) : (
            toks.map((t, i) => (
              <span
                key={i}
                className="rounded-control border px-2 py-1 font-mono text-sm transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: KIND_COLOR[t.kind],
                  color: "var(--text-primary)",
                  background: "var(--bg-elevated)",
                }}
                title={
                  t.kind === "sub"
                    ? "子词：一个长词被拆出的中间块"
                    : t.kind === "cjk"
                      ? "中文字：常一字一 token"
                      : undefined
                }
              >
                {/* 空白 token 用 ␣ 可见化，避免显示成空块 */}
                {t.text.trim() === "" ? "␣" : t.text}
              </span>
            ))
          )}
        </div>

        {/* 图例 */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-secondary">
          {(
            [
              ["cjk", "中文字"],
              ["word", "英文词"],
              ["sub", "子词（长词拆块）"],
              ["num", "数字段"],
              ["punct", "标点 / 空白"],
            ] as const
          ).map(([kind, name]) => (
            <span key={kind} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: KIND_COLOR[kind] }}
                aria-hidden="true"
              />
              {name}
            </span>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-secondary">
          猜一猜：同样一句话，纯英文长词和纯中文，哪个 token
          数更接近字符数？为什么 token 数往往不等于你数的字数？
        </p>
      </div>
    </DemoStage>
  );
}
