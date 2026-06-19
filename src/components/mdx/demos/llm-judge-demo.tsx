"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <LLMJudgeDemo>：LLM-as-judge（用另一个 LLM 当裁判打分）的交互演示
 * （HEL-316，《评估与可观测性》篇5·1，知识点 3：评估方法之 LLM-as-judge）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。上岗后怎么判断它答得好不好？一种办法是请**另一个
 * LLM 当裁判**，按一份评分标准（rubric）给答案逐维度打分。本 Demo 给同一个用户问题的两个
 * 回答（一好一差），切换看裁判怎么按「准确性 / 完整性 / 相关性」三维各打分、给出总分：
 *   - 好答案：三维都高分；
 *   - 坏答案（答得准但答非所问）：准确性还行，但**相关性 / 完整性被狠扣** → 总分低。
 * 这正好戳破「答得准 = 答得好」的误解，呼应「猜一猜」。
 *
 * 分数是 **canned 示意**（标注「非实时调用模型」）——本演示不真去调 LLM，分值是预置的，只为
 * 直观展示「裁判按多维度打分」这件事长什么样。必有重置（回默认：看好答案）。
 *
 * 为何 client：好/坏答案切换是真交互（受控状态 + 重算柱）。颜色 / 间距 / 圆角全走 DESIGN token
 * （硬规则 5）；维度条用 CSS 宽度（无 WebGL）；字号 ≥10px。
 */

type Dim = {
  /** 维度名。 */
  key: string;
  /** 一句话说清这个维度看什么。 */
  hint: string;
};

const DIMS: readonly Dim[] = [
  { key: "准确性", hint: "说的内容对不对、有没有事实错误" },
  { key: "完整性", hint: "该说的都说到了没、有没有漏关键信息" },
  { key: "相关性", hint: "答的是不是用户真正问的那件事" },
];

type AnswerCase = {
  id: "good" | "bad";
  tab: string;
  /** 这个回答的文本。 */
  text: string;
  /** 裁判对三维各打的分（0-10，与 DIMS 同序）。 */
  scores: readonly number[];
  /** 裁判一句话点评。 */
  verdict: string;
};

const QUESTION = "上海明天适合带孩子去户外玩吗？请给条建议。";

const CASES: readonly AnswerCase[] = [
  {
    id: "good",
    tab: "好答案",
    text: "上海明天多云、22℃、降水概率 20%，风力 3 级，体感舒适。适合带孩子户外活动，建议上午去公园，备件薄外套防早晚凉。",
    scores: [9, 9, 10],
    verdict:
      "天气数据准确，给了明确的「适合 / 不适合」结论和可执行建议，且正面回应了「带孩子户外」这件事——三维都高。",
  },
  {
    id: "bad",
    tab: "坏答案（答得准但答非所问）",
    text: "上海是中国直辖市，常住人口约 2480 万，气候属亚热带季风气候，四季分明，年均气温约 17℃。",
    scores: [9, 3, 2],
    verdict:
      "说的内容本身没错（准确性还行），但用户问的是「明天适不适合带孩子户外玩」，它却去科普上海的城市概况——答非所问，相关性极低，也没给任何建议（完整性差）。",
  },
];

const MAX = 10;
const dimColor = (s: number) =>
  s >= 7 ? "var(--success)" : s >= 4 ? "var(--warning)" : "var(--danger)";

export function LLMJudgeDemo() {
  const [activeId, setActiveId] = useState<"good" | "bad">("good");
  const reset = () => setActiveId("good");

  const current = CASES.find((c) => c.id === activeId) ?? CASES[0];
  const total = current.scores.reduce((a, b) => a + b, 0);
  const totalMax = DIMS.length * MAX;
  const totalColor =
    total >= totalMax * 0.7
      ? "var(--success)"
      : total >= totalMax * 0.4
        ? "var(--warning)"
        : "var(--danger)";

  return (
    <DemoStage
      title="LLM-as-judge：请另一个 LLM 当裁判，按评分标准给答案逐维度打分"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            同一个问题、两个回答——切换看裁判怎么打分：
          </span>
          <div className="flex flex-wrap gap-2">
            {CASES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-pressed={activeId === c.id}
                className={`rounded-control border px-3 py-1.5 text-left text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  activeId === c.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[520px] text-sm">
        {/* 用户问题 */}
        <p className="mb-3 rounded-control border border-border bg-bg p-3 text-xs leading-relaxed text-secondary">
          <strong className="text-primary">用户问题</strong>：{QUESTION}
        </p>

        {/* 被评的回答 */}
        <p className="mb-3 rounded-control border border-accent/40 bg-bg p-3 text-xs leading-relaxed text-primary">
          <strong className="text-accent">Agent 回答</strong>：{current.text}
        </p>

        {/* 裁判三维打分 */}
        <div className="rounded-control border border-border bg-bg p-3">
          <p className="mb-2 text-xs font-semibold text-primary">
            🧑‍⚖️ 裁判 LLM 按评分标准逐维度打分：
          </p>
          <div className="flex flex-col gap-2.5">
            {DIMS.map((d, i) => {
              const s = current.scores[i];
              const color = dimColor(s);
              return (
                <div key={d.key}>
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="text-xs font-medium text-primary">
                      {d.key}
                      <span className="ml-1 text-[10px] text-secondary">
                        （{d.hint}）
                      </span>
                    </span>
                    <span
                      className="font-mono text-xs font-bold tabular-nums"
                      style={{ color }}
                    >
                      {s}/{MAX}
                    </span>
                  </div>
                  {/* 维度分条（CSS 宽度，无 WebGL） */}
                  <div className="h-2 w-full overflow-hidden rounded-control bg-border">
                    <div
                      className="h-full rounded-control transition-[width] duration-(--duration-hover) ease-standard"
                      style={{
                        width: `${(s / MAX) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 总分 */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
            <span className="text-xs font-semibold text-primary">总分</span>
            <span
              className="font-mono text-sm font-bold tabular-nums"
              style={{ color: totalColor }}
            >
              {total}/{totalMax}
            </span>
          </div>

          {/* 裁判点评 */}
          <p className="mt-2 text-[11px] leading-relaxed text-secondary">
            <strong className="text-primary">裁判点评</strong>：
            {current.verdict}
          </p>
        </div>

        {/* canned 标注 + 判据 */}
        <p className="mt-3 rounded-control border border-warning/40 bg-bg p-2 text-[10.5px] leading-relaxed text-secondary">
          ⚠️ 分值为预置示意，
          <strong className="text-primary">非实时调用模型</strong>
          。重点看：坏答案「准确性」还行，但「相关性」被狠扣——
          <strong className="text-primary">答得准 ≠ 答得好</strong>
          ，多维度打分才能分辨「答非所问」。
        </p>
      </div>
    </DemoStage>
  );
}
