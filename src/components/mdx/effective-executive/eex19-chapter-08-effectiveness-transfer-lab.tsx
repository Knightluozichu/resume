"use client";

import { useState } from "react";

type FirstChoice = "heroics" | "ship-all" | "bounded-pilot";
type FeedbackChoice = "defend" | "redefine" | "blame";

const firstChoices: Record<FirstChoice, { title: string; detail: string }> = {
  heroics: {
    title: "负责人亲自补齐全部字段，团队继续原计划",
    detail:
      "最快看到表面进度，但专业知识与客户确认仍成单点；额外工时会掩盖接口问题，无法证明客户需求已被正确理解。",
  },
  "ship-all": {
    title: "要求团队周五前关闭全部十七项",
    detail:
      "活动目标清楚，却没有说明客户如何验收或安全审查能否完成。没有时间取舍和责任边界，团队可能更忙但仍交不出可用结果。",
  },
  "bounded-pilot": {
    title:
      "先看时间与等待记录，确认客户样例；由相关长处分担字段和权限工作，缩小到安全可验收的试点",
    detail:
      "把稀缺时间投向客户确认和风险审查，暂停低影响工作，并写明责任人、验收证据、回退条件与复盘时间。若前置条件不满足，就不把内部演示说成客户成果。",
  },
};

const feedbackChoices: Record<
  FeedbackChoice,
  { title: string; detail: string }
> = {
  defend: {
    title: "只报告试点已上线，维持原流程",
    detail:
      "这会漏掉手工补字段和额外加班的信号；表面按期不等于目标定义正确，也无法使组织减少下一次返工。",
  },
  redefine: {
    title: "把字段样例确认前移，并记录手工处理成本，再验证下一家客户",
    detail:
      "这是可检验的流程修订：保留成功采用的证据，同时把人工补齐作为未解决缺口，下一轮再看字段歧义和返工是否减少。",
  },
  blame: {
    title: "认定工程师处理慢，下次要求更快完成",
    detail:
      "反馈显示的是字段歧义和隐藏工时，不足以证明个人速度是根因。归责式结论既没检验假设，也可能让坏消息更晚出现。",
  },
};

const buttonClass =
  "flex min-h-11 w-full items-start gap-3 rounded-control border border-border bg-surface p-3 text-left text-sm text-primary hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const selectedClass = "border-primary bg-primary/5 ring-1 ring-primary";

export function Eex19Chapter08EffectivenessTransferLab() {
  const [first, setFirst] = useState<FirstChoice | null>(null);
  const [feedback, setFeedback] = useState<FeedbackChoice | null>(null);
  const firstResult = first ? firstChoices[first] : null;
  const feedbackResult = feedback ? feedbackChoices[feedback] : null;

  function reset() {
    setFirst(null);
    setFeedback(null);
  }

  return (
    <section
      aria-labelledby="eex19-chapter-08-transfer-title"
      aria-label="有效性迁移实验"
      className="not-prose my-6 min-w-0 space-y-5 rounded-card border border-border bg-surface p-4 text-primary sm:p-6"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          情境推演 · 两轮反馈
        </p>
        <h3
          id="eex19-chapter-08-transfer-title"
          className="mt-1 text-lg font-semibold"
        >
          你会怎样带领这次试点？
        </h3>
        <p className="mt-2 text-sm leading-6 text-secondary">
          选择周三的行动，读完周五反馈后，再决定如何修正下一轮。选项可用 Tab
          聚焦、方向键切换、空格或 Enter 确认。
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-2 font-semibold">第一轮：选一个承诺方案</legend>
        {(
          Object.entries(firstChoices) as [
            FirstChoice,
            (typeof firstChoices)[FirstChoice],
          ][]
        ).map(([id, choice]) => (
          <label key={id} className={buttonClass}>
            <input
              className="mt-1 size-4 shrink-0 accent-primary"
              type="radio"
              name="eex19-ch08-first-choice"
              value={id}
              checked={first === id}
              onChange={() => {
                setFirst(id);
                setFeedback(null);
              }}
            />
            <span>
              <span className="block font-medium">{choice.title}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {firstResult && (
        <div
          className="rounded-control border border-border bg-background p-3 text-sm leading-6"
          aria-live="polite"
        >
          <p className="font-semibold">行动后果</p>
          <p className="mt-1">{firstResult.detail}</p>
        </div>
      )}

      {first && (
        <div className="space-y-3 border-t border-border pt-4">
          <div className="rounded-control bg-background p-3 text-sm leading-6">
            <p className="font-semibold">周五观察到的反馈</p>
            <p className="mt-1">
              一家客户用自有样例完成了试点，但工程师周四夜间手工补齐字段。权限审查通过；客户指出同类字段歧义下次还会出现。团队没有记录手工处理成本。
            </p>
          </div>
          <fieldset className="space-y-2">
            <legend className="mb-2 font-semibold">
              第二轮：反馈最应该改变什么？
            </legend>
            {(
              Object.entries(feedbackChoices) as [
                FeedbackChoice,
                (typeof feedbackChoices)[FeedbackChoice],
              ][]
            ).map(([id, choice]) => (
              <label
                key={id}
                className={`${buttonClass} ${feedback === id ? selectedClass : ""}`}
              >
                <input
                  className="mt-1 size-4 shrink-0 accent-primary"
                  type="radio"
                  name="eex19-ch08-feedback-choice"
                  value={id}
                  checked={feedback === id}
                  onChange={() => setFeedback(id)}
                />
                <span className="font-medium">{choice.title}</span>
              </label>
            ))}
          </fieldset>
          {feedbackResult && (
            <div
              className="rounded-control border border-border bg-background p-3 text-sm leading-6"
              aria-live="polite"
            >
              <p className="font-semibold">复盘判断</p>
              <p className="mt-1">{feedbackResult.detail}</p>
              <p className="mt-2">
                关键陷阱：把一次试点成功当成方法已被证明，或把系统性字段歧义简化为个人速度问题。
              </p>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={reset}
        className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        重置推演
      </button>
    </section>
  );
}
