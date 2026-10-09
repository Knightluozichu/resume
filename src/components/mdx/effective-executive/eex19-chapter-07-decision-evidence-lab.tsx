"use client";

import { useState } from "react";

type Label = "fact" | "inference" | "assumption";

type Statement = {
  id: string;
  text: string;
  answer: Label;
  explanation: string;
};

const statements: Statement[] = [
  {
    id: "tickets",
    text: "过去两周，支持工单中有 18 条提到相同的登录步骤。",
    answer: "fact",
    explanation:
      "这是带有时间窗、计数和可回查记录的观察。仍需核对工单范围是否完整，但它是可审查的事实陈述。",
  },
  {
    id: "cause",
    text: "重复提问说明登录步骤是用户流失的主要原因。",
    answer: "inference",
    explanation:
      "从重复工单推到流失原因，是解释而非直接观察。还需要流失访谈、行为数据或其他对照证据。",
  },
  {
    id: "rollout",
    text: "如果所有用户都收到新提示，支持工单就会减少，而且不会增加误操作。",
    answer: "assumption",
    explanation:
      "这是对干预效果和副作用的预测。先限定试点范围，预注册成功指标与停止条件，再用数据检验。",
  },
];

const labelText: Record<Label, string> = {
  fact: "可核查事实",
  inference: "推论 / 解释",
  assumption: "待检验假设",
};

export function Eex19Chapter07DecisionEvidenceLab() {
  const [answers, setAnswers] = useState<Partial<Record<string, Label>>>({});
  const [showReview, setShowReview] = useState(false);
  const correctCount = statements.filter(
    (statement) => answers[statement.id] === statement.answer,
  ).length;

  function reset() {
    setAnswers({});
    setShowReview(false);
  }

  return (
    <section
      aria-labelledby="eex19-ch07-lab-title"
      aria-label="决策证据实验"
      className="my-8 rounded-2xl border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          第 7 章 · 证据检验台
        </p>
        <h3 id="eex19-ch07-lab-title" className="mt-1 text-xl font-bold">
          先分清观察、解释与预测
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          场景：团队考虑推出新的登录提示。逐条分类；再用反证问题、负责人和回访日期把判断接到行动上。
        </p>
      </div>

      <div className="space-y-4">
        {statements.map((statement, index) => {
          const selected = answers[statement.id];
          const isCorrect = selected === statement.answer;
          return (
            <fieldset
              key={statement.id}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
            >
              <legend className="px-1 text-sm font-semibold">
                {index + 1}. {statement.text}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(labelText) as Label[]).map((label) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={selected === label}
                    onClick={() => {
                      setAnswers((current) => ({
                        ...current,
                        [statement.id]: label,
                      }));
                      setShowReview(false);
                    }}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      selected === label
                        ? "border-indigo-700 bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-100"
                        : "border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                    }`}
                  >
                    {labelText[label]}
                  </button>
                ))}
              </div>
              <p
                className="mt-2 text-sm text-slate-700 dark:text-slate-300"
                role="status"
                aria-live="polite"
              >
                {selected ? `当前选择：${labelText[selected]}` : "尚未分类"}
              </p>
              {showReview && selected && (
                <p className="mt-3 text-sm leading-6" aria-live="polite">
                  <strong>
                    {isCorrect
                      ? "判断合适。"
                      : `更合适的分类：${labelText[statement.answer]}。`}
                  </strong>{" "}
                  {statement.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 dark:bg-slate-800">
        <h4 className="font-bold">把假设变成可证伪的试验</h4>
        <p className="mt-1">
          反证问题：若提示上线后工单没有下降，或误操作上升，哪项观察会推翻“应该全面推出”的判断？
        </p>
        <p className="mt-2">
          决策记录至少写明：选择与理由、反对意见及回应、执行负责人、检查日期、结果指标，以及触发暂停或回滚的阈值。
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowReview(true)}
          disabled={Object.keys(answers).length !== statements.length}
          className="min-h-11 rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          核对分类
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          重置练习
        </button>
        <span
          aria-live="polite"
          className="text-sm text-slate-700 dark:text-slate-300"
        >
          {showReview
            ? `分类正确 ${correctCount} / ${statements.length}`
            : "完成三项分类后可查看反馈。"}
        </span>
      </div>
    </section>
  );
}
