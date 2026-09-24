"use client";

import { useId, useState } from "react";

export type CopyMode = "copy" | "alias";
export type SnapshotMode = "value" | "live";
export type Paragraph = { text: string; style: Readonly<{ font: string }> };
export class ReviewDocument {
  #saved = new WeakMap<object, string | Paragraph>();
  constructor(public readonly paragraph: Paragraph) {}
  clone(mode: CopyMode): ReviewDocument {
    if (mode !== "copy" && mode !== "alias") throw new Error("copy mode");
    return new ReviewDocument(
      mode === "copy" ? { ...this.paragraph } : this.paragraph,
    );
  }
  capture(mode: SnapshotMode): object {
    if (mode !== "value" && mode !== "live") throw new Error("snapshot mode");
    const token = Object.freeze({});
    this.#saved.set(
      token,
      mode === "value" ? this.paragraph.text : this.paragraph,
    );
    return token;
  }
  snapshotText(token: object): string {
    if (!this.#saved.has(token)) throw new Error("foreign snapshot");
    const saved = this.#saved.get(token)!;
    return typeof saved === "string" ? saved : saved.text;
  }
  restore(token: object): void {
    this.paragraph.text = this.snapshotText(token);
  }
}

export function editReview(
  doc: ReviewDocument,
  suffix: string,
  mode: SnapshotMode,
) {
  const before = doc.capture(mode);
  doc.paragraph.text += suffix;
  return { receiver: doc, before, undo: () => doc.restore(before) };
}
export function runReview(
  copy: CopyMode,
  snapshot: SnapshotMode,
  phase: number,
) {
  if (!Number.isInteger(phase) || phase < 0 || phase > 5)
    throw new Error("phase");
  const style = Object.freeze({ font: "serif" });
  const a = new ReviewDocument({ text: "稿", style });
  const b = a.clone(copy);
  // Validate even the initial frame: invalid configuration never silently succeeds.
  if (snapshot !== "value" && snapshot !== "live")
    throw new Error("snapshot mode");
  const commands: ReturnType<typeof editReview>[] = [];
  if (phase >= 1) commands.push(editReview(b, "B", snapshot));
  if (phase >= 2) commands.push(editReview(a, "A", snapshot));
  if (phase >= 3) commands[1].undo();
  if (phase >= 4) commands[0].undo();
  let foreignRejected = false;
  if (phase >= 5) {
    try {
      a.restore(commands[0].before);
    } catch (error) {
      if (!(error instanceof Error) || error.message !== "foreign snapshot")
        throw error;
      foreignRejected = true;
    }
  }
  return { a, b, commands, foreignRejected };
}

const frames = [
  "0 · 从 A 克隆 B，尚未编辑",
  "1 · 命令 CB：保存 B，再追加 B",
  "2 · 命令 CA：保存 A，再追加 A",
  "3 · 撤销 CA（栈顶）",
  "4 · 撤销 CB（栈已空）",
  "5 · 故意把 B 的快照交给 A",
];
const expected = [
  ["稿", "稿"],
  ["稿", "稿B"],
  ["稿A", "稿B"],
  ["稿", "稿B"],
  ["稿", "稿"],
  ["稿", "稿"],
];
const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
};
const control =
  "min-h-11 rounded border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function DesignPatternsReviewContractLab() {
  const id = useId();
  const [copy, setCopy] = useState<CopyMode>("copy");
  const [snapshot, setSnapshot] = useState<SnapshotMode>("value");
  const [phase, setPhase] = useState(0);
  const { a, b, commands, foreignRejected } = runReview(copy, snapshot, phase);
  const shared = a.paragraph === b.paragraph;
  const matches =
    a.paragraph.text === expected[phase][0] &&
    b.paragraph.text === expected[phase][1];
  const paragraphs = shared ? [a.paragraph] : [a.paragraph, b.paragraph];
  const reset = () => {
    setCopy("copy");
    setSnapshot("value");
    setPhase(0);
  };
  return (
    <section
      aria-label="文档克隆与撤销所有权实验"
      className="my-6 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="text-lg font-semibold text-primary">
        同一份稿件，谁能改动谁？
      </h3>
      <p className="mt-2 text-sm text-secondary">
        线是实际对象引用，纸面文字来自实际编辑结果。配置变化回到第 0
        步；安全目标始终不变。
      </p>
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        <label
          htmlFor={`${id}-copy`}
          className="grid gap-1 text-sm text-primary"
        >
          段落克隆边界
          <select
            id={`${id}-copy`}
            className={control}
            value={copy}
            onChange={(e) => {
              setCopy(e.target.value as CopyMode);
              setPhase(0);
            }}
          >
            <option value="copy">正确：复制可变段落</option>
            <option value="alias">故障：共用可变段落</option>
          </select>
        </label>
        <label
          htmlFor={`${id}-snapshot`}
          className="grid gap-1 text-sm text-primary"
        >
          快照保存内容
          <select
            id={`${id}-snapshot`}
            className={control}
            value={snapshot}
            onChange={(e) => {
              setSnapshot(e.target.value as SnapshotMode);
              setPhase(0);
            }}
          >
            <option value="value">正确：保存文本值</option>
            <option value="live">故障：保存活段落引用</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={control}
          disabled={phase === 5}
          onClick={() => setPhase((p) => Math.min(5, p + 1))}
        >
          下一步
        </button>
        <button type="button" className={control} onClick={reset}>
          重置全部
        </button>
      </div>
      <p className="mt-3 text-sm font-semibold text-primary" aria-live="polite">
        {frames[phase]}
      </p>
      <svg
        viewBox="0 0 360 575"
        role="img"
        aria-label={`A 的文字 ${a.paragraph.text}，B 的文字 ${b.paragraph.text}；${shared ? "共用 P1" : "分别指向 P1 和 P2"}，均共享不可变样式 F1。`}
        className="mt-3 block w-full max-w-[420px] mx-auto"
      >
        <title>对象身份、纸面文字与快照的引用边界</title>
        <rect
          x="1"
          y="1"
          width="358"
          height="573"
          rx="8"
          fill={C.bg}
          stroke={C.border}
        />
        {[70, 290].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy="43"
              r="27"
              fill={C.panel}
              stroke={C.accent}
              strokeWidth="2"
            />
            <text x={x} y="48" textAnchor="middle" fontSize="16" fill={C.text}>
              {i === 0 ? "A" : "B"}
            </text>
          </g>
        ))}
        <path
          d={
            shared
              ? "M70 70 L180 140 M290 70 L180 140"
              : "M70 70 L90 140 M290 70 L270 140"
          }
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="180" y="104" textAnchor="middle" fontSize="14" fill={C.muted}>
          paragraph 引用
        </text>
        {paragraphs.map((paragraph, i) => {
          const x = shared ? 120 : 30 + i * 180;
          return (
            <g key={i}>
              <path
                d={`M${x} 140 h94 l26 26 v136 h-120 Z M${x + 94} 140 v26 h26`}
                fill={C.panel}
                stroke={C.accent}
                strokeWidth="2"
              />
              <text
                x={x + 60}
                y="187"
                textAnchor="middle"
                fontSize="16"
                fill={C.muted}
              >{`P${i + 1}`}</text>
              <text
                x={x + 60}
                y="226"
                textAnchor="middle"
                fontSize="23"
                fill={C.text}
              >
                {paragraph.text}
              </text>
              <path
                d={`M${x + 18} 248 h84 M${x + 18} 266 h64`}
                stroke={C.border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 60} 302 L180 349`}
                stroke={C.accent}
                fill="none"
                strokeWidth="2"
              />
            </g>
          );
        })}
        <ellipse
          cx="180"
          cy="375"
          rx="140"
          ry="26"
          fill={C.panel}
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="180" y="380" textAnchor="middle" fontSize="16" fill={C.text}>
          F1 · serif · 冻结的共享样式
        </text>
        <text x="180" y="433" textAnchor="middle" fontSize="14" fill={C.muted}>
          文档内部解读快照（教学探针）
        </text>
        {commands.map((command, i) => {
          const x = 18 + i * 172;
          const undone = phase >= (i === 0 ? 4 : 3);
          return (
            <g key={i}>
              <rect
                x={x}
                y="450"
                width="152"
                height="100"
                rx="5"
                fill={C.panel}
                stroke={C.border}
              />
              <text
                x={x + 76}
                y="475"
                textAnchor="middle"
                fontSize="14"
                fill={C.text}
              >{`${i === 0 ? "CB / owner B" : "CA / owner A"}`}</text>
              <text
                x={x + 76}
                y="503"
                textAnchor="middle"
                fontSize="16"
                fill={C.text}
              >{`保存：${command.receiver.snapshotText(command.before)}`}</text>
              <text
                x={x + 76}
                y="532"
                textAnchor="middle"
                fontSize="14"
                fill={C.muted}
              >{`${snapshot === "live" ? "活引用" : "值"} · ${undone ? "已撤销" : "栈内"}`}</text>
            </g>
          );
        })}
        {commands.length === 0 && (
          <text
            x="180"
            y="501"
            textAnchor="middle"
            fontSize="16"
            fill={C.muted}
          >
            还没有命令或快照
          </text>
        )}
      </svg>
      <div className="mt-3 space-y-1 text-sm text-primary" aria-live="polite">
        <p>{`安全目标 A=${expected[phase][0]} / B=${expected[phase][1]}；实际 A=${a.paragraph.text} / B=${b.paragraph.text}：${matches ? "本步内容一致" : "内容合同失败"}。`}</p>
        <p>{`段落身份：${shared ? "相同（隔离合同失败）" : "不同"}；样式引用：${a.paragraph.style === b.paragraph.style ? "相同" : "不同"}；样式冻结：${Object.isFrozen(a.paragraph.style) ? "是" : "否"}。`}</p>
        <p>
          {phase === 5
            ? `跨文档恢复：${foreignRejected ? "在写入前拒绝" : "未拒绝"}。`
            : "最后一步将验证：即使段落被错误共享，B 的快照也不属于 A。"}
        </p>
      </div>
      <p className="mt-3 text-sm text-secondary">
        这里只保存一个段落的文本，命令按后进先出撤销；不处理协同编辑、重做或外部副作用。快照探针只用于教学，历史管理者只持有令牌和撤销函数。
      </p>
    </section>
  );
}
