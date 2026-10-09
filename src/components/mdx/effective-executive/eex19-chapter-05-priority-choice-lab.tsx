"use client";

import { useState } from "react";

type ScenarioId = "legacy" | "deadline" | "opportunity";
type Choice = "first" | "second";

type Scenario = {
  label: string;
  title: string;
  context: string;
  first: string;
  second: string;
  preferred: Choice;
  rationale: string;
  tradeoff: string;
};

const scenarios: Record<ScenarioId, Scenario> = {
  legacy: {
    label: "旧承诺",
    title: "继续维护还是停发？",
    context:
      "团队每周花半天整理一份旧汇总表。过去三个月没人能指出它改变了什么决定；暂停它可能释放出一个完整工作时段。",
    first: "先暂停一个周期，通知潜在使用者并保留恢复条件",
    second: "照常制作，直到有人正式要求取消",
    preferred: "first",
    rationale:
      "继续与否应由当前的用途证据决定，而不是由习惯或过去搭建成本决定。可逆暂停能检验是否真的有人依赖它。",
    tradeoff:
      "暂停仍可能遗漏未被访谈到的使用者；先核实强制记录要求，并保留数据、恢复办法和反馈渠道。",
  },
  deadline: {
    label: "硬边界",
    title: "愿景工作与合规期限冲突",
    context:
      "一个新流程预计带来长期收益，但本周必须完成的监管提交尚未通过核验。两项任务争用唯一的复核时段。",
    first: "先完成并核验有明确期限的监管提交",
    second: "先启动新流程试点，以免错过改进窗口",
    preferred: "first",
    rationale:
      "硬性义务和不能转嫁的风险先于普通机会排序。优先不是把所有收益放入同一把尺，也不是用远期希望抵消当下责任。",
    tradeoff:
      "新流程可能因此延期；应告知提议者、评估是否能由合适人员并行做低风险准备，并重新约定试点时间。",
  },
  opportunity: {
    label: "未来机会",
    title: "即时展示还是客户原因分析？",
    context:
      "管理层临时提出美化仪表板；客户团队同时请求分析重复提交资料的原因，以便下月决定是否修改流程。没有合规硬期限冲突。",
    first: "先确认仪表板的承诺用途，再决定是否延期",
    second: "先收集客户样本并提交可行动的原因分析",
    preferred: "second",
    rationale:
      "在题设没有硬期限、且客户分析能赶上下月决策的前提下，它与明确的流程变化相连。先确认仪表板用途，避免把请求者级别误当成结果价值。",
    tradeoff:
      "管理层可能确有尚未说明的决策需求；若确认仪表板支撑必须按期作出的重要决定，或客户样本来不及/不可合法使用，应重新排序。",
  },
};

export function EexChapter05PriorityChoiceLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("legacy");
  const [choice, setChoice] = useState<Choice | null>(null);
  const scenario = scenarios[scenarioId];
  const selectedChoice = choice === "first" ? scenario.first : scenario.second;

  function selectScenario(id: ScenarioId) {
    setScenarioId(id);
    setChoice(null);
  }

  function reset() {
    setScenarioId("legacy");
    setChoice(null);
  }

  return (
    <section
      aria-label="优先级取舍实验"
      className="my-8 rounded-2xl border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
        优先级取舍台
      </p>
      <ol
        aria-label="优先级判断流程"
        className="mt-3 grid gap-2 sm:grid-cols-3"
      >
        {[
          ["1", "清理旧承诺", "核实用途与退出风险"],
          ["2", "比较未来贡献", "先守硬边界，再比可验证结果"],
          ["3", "落实先后顺序", "安排时间并说明推迟代价"],
        ].map(([step, title, detail]) => (
          <li
            key={step}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">
              步骤 {step}
            </span>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-700 dark:text-slate-200">
              {detail}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="选择练习情境">
        {(Object.entries(scenarios) as [ScenarioId, Scenario][]).map(
          ([id, item]) => (
            <button
              key={id}
              type="button"
              aria-pressed={scenarioId === id}
              onClick={() => selectScenario(id)}
              className={`min-h-11 rounded-full border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                scenarioId === id
                  ? "border-sky-700 bg-sky-700 text-white dark:border-sky-300 dark:bg-sky-300 dark:text-slate-950"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ),
        )}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {scenario.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
          {scenario.context}
        </p>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-100">
          你会先做哪项？选择后查看理由与代价。
        </legend>
        <div className="grid gap-2">
          {(["first", "second"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={choice === option}
              onClick={() => setChoice(option)}
              className={`min-h-11 rounded-xl border p-3 text-left text-sm leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                choice === option
                  ? "border-sky-600 bg-sky-50 text-slate-950 dark:border-sky-300 dark:bg-slate-800 dark:text-white"
                  : "border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {scenario[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={reset}
        className="mt-4 min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        重置练习
      </button>

      {choice && (
        <div
          className="mt-4 rounded-xl border-l-4 border-sky-600 bg-sky-50 p-4 dark:border-sky-300 dark:bg-slate-800"
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold text-slate-900 dark:text-white">
            {choice === scenario.preferred
              ? "与题设条件相符的选择"
              : "先别急着判错：检查你假设的条件"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {scenario.rationale}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            <strong>另一边的代价：</strong> {scenario.tradeoff}
          </p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            你的选择：{selectedChoice}
          </p>
        </div>
      )}
    </section>
  );
}
