"use client";

import { useState } from "react";

type CaseId = "analysis" | "risk" | "meeting";
type Choice = "within-scope" | "clarify" | "stop";
type Case = {
  id: CaseId;
  title: string;
  specialist: string;
  need: string;
  limit: string;
  recipient: string;
  prompt: string;
  soundChoices: Choice[];
  feedback: Record<Choice, string>;
};

const cases: Case[] = [
  {
    id: "analysis",
    title: "分析交付",
    specialist: "数据分析师",
    need: "核验客户流失原因",
    limit: "已授权的汇总数据；不得查看个人明细",
    recipient: "产品负责人",
    prompt: "负责人要求今天提交结论，但汇总数据不足以区分两个原因。",
    soundChoices: ["clarify", "stop"],
    feedback: {
      "within-scope":
        "还不能直接交付结论：现有证据无法区分原因。先说明不确定性并请求补充获准的数据或缩小问题。",
      clarify:
        "合适。把证据缺口说清，向有权限者确认可用数据或调整问题；在边界明确前不越权查看明细。",
      stop: "停止越权访问是对的，但可以继续推进：报告已知事实、缺口及需要的授权决定。",
    },
  },
  {
    id: "risk",
    title: "风险处置",
    specialist: "安全工程师",
    need: "按预案处置已触发的风险",
    limit: "值班预案已授权工程师在阈值触发时执行回滚，并要求立即通知负责人",
    recipient: "值班负责人",
    prompt: "监测已达到书面预案中的回滚阈值；该工程师属于获授权的值班执行者。",
    soundChoices: ["within-scope", "clarify"],
    feedback: {
      "within-scope":
        "合适。既定阈值已触发且预案授予此值班角色回滚权限；执行预案并立即通知负责人、记录证据与结果。",
      clarify:
        "如果预案的适用条件或授权身份仍有疑问，先核对并升级确认；不要把未核实的权限当作已授权。若条件明确，反复等待可能延误处置。",
      stop: "只停止未经授权的操作；本情境已满足预案条件，单纯停止会遗漏获授权的风险控制，应立即核实并按预案处置。",
    },
  },
  {
    id: "meeting",
    title: "会议承诺",
    specialist: "实施顾问",
    need: "确认迁移计划",
    limit: "顾问可估算工作量；客户负责人确认业务停机窗口",
    recipient: "客户项目负责人",
    prompt: "会上有人要求顾问承诺周末停机，真正受影响的业务负责人尚未参加。",
    soundChoices: ["clarify", "stop"],
    feedback: {
      "within-scope":
        "顾问可给出技术估算，但不能替缺席的业务负责人承诺停机窗口。把估算标为条件性输入。",
      clarify:
        "这是必要的一步：明确谁能批准窗口、需要哪些影响信息，并约定由谁带回确认。不要把问题停在口头澄清。",
      stop: "合适。暂不作无权承诺，记录待确认事项、责任人和截止时间，再把决定交给受影响且有权限的人。",
    },
  },
];

const choices: { id: Choice; label: string }[] = [
  { id: "within-scope", label: "在现有授权内直接交付" },
  { id: "clarify", label: "澄清证据或授权边界" },
  { id: "stop", label: "停止承诺并升级确认" },
];

export function modelContributionContract(caseId: CaseId, choice: Choice) {
  const current = cases.find((item) => item.id === caseId);
  if (!current || !choices.some((item) => item.id === choice)) {
    throw new RangeError("请选择有效情境和行动。");
  }
  const sound = current.soundChoices.includes(choice);
  return {
    sound,
    phase: sound
      ? choice === "stop"
        ? "held"
        : choice === "clarify"
          ? "clarify"
          : "authorized"
      : "review",
    feedback: current.feedback[choice],
  } as const;
}

const nodeClass =
  "min-w-0 rounded-control border border-border bg-surface p-3 text-center";
const optionClass =
  "flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-border px-3 py-2 text-left text-sm hover:border-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";
const selectedOptionClass = "border-accent bg-surface";
const actionButtonClass =
  "min-h-11 rounded-control border border-border px-3 py-2 text-sm hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Independent practice scenario; it is not a case or model from the book. */
export function EexChapter03ContributionContractLab() {
  const [caseId, setCaseId] = useState<CaseId>("analysis");
  const [choice, setChoice] = useState<Choice | null>(null);
  const current = cases.find((item) => item.id === caseId)!;
  const result = choice ? modelContributionContract(caseId, choice) : null;
  const phase = result?.phase ?? "waiting";
  const decisionLabel = {
    waiting: "待选择",
    clarify: "等待澄清",
    authorized: "可按授权执行",
    held: "承诺暂缓",
    review: "需要复核",
  }[phase];
  const executionLabel = {
    waiting: "尚未交接",
    clarify: "等边界确认，不执行未批准事项",
    authorized: "按预案执行并回报",
    held: "暂停执行，待授权决定",
    review: "暂停扩展行动，返回复核",
  }[phase];

  function selectCase(id: CaseId) {
    setCaseId(id);
    setChoice(null);
  }

  return (
    <section
      aria-labelledby="eex03-lab-title"
      className="not-prose my-6 min-w-0 space-y-4 rounded-card border border-border p-4 text-primary"
    >
      <h3 id="eex03-lab-title" className="text-lg font-semibold">
        贡献如何经过授权到达执行者？
      </h3>
      <p className="text-sm text-secondary">
        以下均为本站自拟情境。先看谁掌握专业知识、谁有决定权、谁接收并执行结果；专业建议不自动等于授权。
      </p>
      <fieldset className="min-w-0 space-y-2">
        <legend className="mb-2 text-sm font-medium">选择情境</legend>
        <div className="flex flex-wrap gap-2">
          {cases.map((item) => (
            <label
              key={item.id}
              className={`${optionClass} ${caseId === item.id ? selectedOptionClass : ""}`}
            >
              <input
                type="radio"
                name="eex03-case"
                value={item.id}
                checked={caseId === item.id}
                onChange={() => selectCase(item.id)}
              />
              {item.title}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="text-sm">
        <strong>情境：</strong>
        {current.prompt}
      </p>
      <p className="text-sm">
        <strong>所需贡献：</strong>
        {current.need}
      </p>
      <div className="grid min-w-0 items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <div className={nodeClass}>
          <strong>专业者</strong>
          <p className="mb-0 mt-1 text-sm">{current.specialist}</p>
          <p className="mb-0 mt-2 text-xs text-secondary">提供证据与建议</p>
        </div>
        <div
          aria-hidden="true"
          className="text-center text-xl text-secondary md:px-1"
        >
          →
        </div>
        <div
          className={`${nodeClass} ${phase === "authorized" || phase === "clarify" ? "border-accent" : phase === "held" || phase === "review" ? "border-danger" : ""}`}
          role="group"
          aria-label={`授权决策者；当前状态：${decisionLabel}`}
        >
          <strong>授权决策者</strong>
          <p className="mb-0 mt-1 text-sm">确认权限、风险和取舍</p>
          <p className="mb-0 mt-2 text-xs text-secondary">
            状态：{decisionLabel}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="text-center text-xl text-secondary md:px-1"
        >
          →
        </div>
        <div
          className={`${nodeClass} ${phase === "authorized" ? "border-accent" : phase === "held" || phase === "review" ? "border-danger" : ""}`}
          role="group"
          aria-label={`接收者或执行者；当前状态：${executionLabel}`}
        >
          <strong>接收者／执行者</strong>
          <p className="mb-0 mt-1 text-sm">{current.recipient}</p>
          <p className="mb-0 mt-2 text-xs text-secondary">{executionLabel}</p>
        </div>
      </div>
      <p className="rounded-control border border-border p-3 text-sm">
        <strong>本情境边界：</strong>
        {current.limit}
      </p>
      <fieldset className="min-w-0 space-y-2">
        <legend className="mb-2 text-sm font-medium">你会采取哪一步？</legend>
        <div className="grid min-w-0 gap-2 sm:grid-cols-3">
          {choices.map((item) => (
            <label
              key={item.id}
              className={`${optionClass} ${choice === item.id ? selectedOptionClass : ""}`}
            >
              <input
                type="radio"
                name="eex03-choice"
                value={item.id}
                checked={choice === item.id}
                onChange={() => setChoice(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={actionButtonClass}
          onClick={() => {
            setCaseId("analysis");
            setChoice(null);
          }}
        >
          重置情境
        </button>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="m-0 min-w-0 flex-1 text-sm"
        >
          {result?.feedback ??
            "请选择行动。图示会显示该行动是否尊重专业判断、正式权限和接收责任。"}
        </p>
      </div>
      <p className="mb-0 text-xs text-secondary">
        决策图是练习用的责任链，不表示现实组织只有三种角色，也不替代正式授权、紧急预案或法律要求。
      </p>
    </section>
  );
}
