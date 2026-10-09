"use client";

import { useState } from "react";

type ScenarioId = "launch" | "support" | "analysis";
type RoleId = "self" | "partner" | "manager";
type RiskId = "authority" | "handoff" | "load";
type SafeguardId = "review" | "clarify" | "stop";

type Scenario = { title: string; task: string; evidence: string };

const scenarios: Record<ScenarioId, Scenario> = {
  launch: {
    title: "新服务上线",
    task: "两周内向试点客户交付可回退的上线方案。",
    evidence:
      "最近两次发布中，伙伴能提前发现依赖并写清回退步骤；你擅长梳理需求，但本周还承担支持轮值。",
  },
  support: {
    title: "客户问题分流",
    task: "一天内让高影响问题到达有权限处理的人，并向客户说明下一次更新时间。",
    evidence: "你熟悉客户语境；伙伴擅长排查日志，但没有客户承诺权限。",
  },
  analysis: {
    title: "季度资源建议",
    task: "下周提交一份可供负责人比较的资源方案和不确定性说明。",
    evidence: "你擅长综合证据；伙伴熟悉成本模型；上司负责最终预算决定。",
  },
};

const roles: Record<RoleId, string> = {
  self: "我负责",
  partner: "伙伴负责",
  manager: "上司负责 / 决策",
};
const risks: Record<RiskId, string> = {
  authority: "行动越过授权边界",
  handoff: "交接信息或验收标准不清",
  load: "工作负荷挤掉其他关键责任",
};
const safeguards: Record<SafeguardId, string> = {
  review: "安排独立复核关键结果",
  clarify: "先书面确认负责人、权限与验收条件",
  stop: "暂停高风险动作并按正式渠道升级",
};

type RoleFitState = {
  scenario: ScenarioId;
  role: RoleId | "";
  risk: RiskId | "";
  safeguard: SafeguardId | "";
  revealed: boolean;
};

const createInitialState = (): RoleFitState => ({
  scenario: "launch",
  role: "",
  risk: "",
  safeguard: "",
  revealed: false,
});

function getRoleFitFeedback(state: RoleFitState): string {
  if (!state.role || !state.risk || !state.safeguard) {
    return "先完成负责人、主要风险和保障措施三项选择，再查看复核提示。";
  }
  const roleNote =
    state.role === "manager"
      ? "上司可以承担需要其权限的决定，但执行责任和沟通时点仍须明确。"
      : `${roles[state.role]}后，应确认相应权限与协作者支持已经到位。`;
  const safeguardNote =
    state.risk === "authority" && state.safeguard !== "stop"
      ? "你识别到授权风险，但所选措施不足以阻止越权：先暂停该动作，取得明确授权或依正式渠道升级。"
      : `保障措施“${safeguards[state.safeguard]}”应落实到负责人和日期。`;
  return `${roleNote} 对情境“${scenarios[state.scenario].title}”复核风险：${risks[state.risk]}。${safeguardNote} 再以接收者确认、工作样本和负荷情况复盘；这不是人员评分或任用结论。`;
}

const controlClass =
  "min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-800 transition hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700";
const selectedClass =
  "border-indigo-700 bg-indigo-50 font-semibold text-indigo-950 ring-1 ring-indigo-700";

export function EexChapter04RoleFitLab() {
  const [state, setState] = useState<RoleFitState>(createInitialState);
  const update = <K extends keyof RoleFitState>(
    key: K,
    value: RoleFitState[K],
  ) => {
    setState((current) => ({ ...current, [key]: value, revealed: false }));
  };
  const scenario = scenarios[state.scenario];
  const completed = [state.role, state.risk, state.safeguard].filter(
    Boolean,
  ).length;
  const feedback = state.revealed
    ? getRoleFitFeedback(state)
    : `已完成 ${completed}/3 项：选择负责人、主要风险和保障措施后查看复核提示。`;

  return (
    <section
      className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6"
      aria-labelledby="role-fit-lab-title"
      aria-label="岗位匹配实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800">
            原创教学模型 · 不给人打分
          </p>
          <h3
            id="role-fit-lab-title"
            className="mt-1 text-xl font-bold text-slate-950"
          >
            岗位匹配与边界实验
          </h3>
        </div>
        <button
          type="button"
          className={controlClass}
          onClick={() => setState(createInitialState())}
        >
          重置练习
        </button>
      </div>

      <fieldset className="mt-5">
        <legend className="font-semibold text-slate-900">
          1. 选择工作情境
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.scenario === id}
              className={`${controlClass} ${state.scenario === id ? selectedClass : ""}`}
              onClick={() =>
                setState((current) => ({
                  ...current,
                  scenario: id,
                  role: "",
                  risk: "",
                  safeguard: "",
                  revealed: false,
                }))
              }
            >
              {scenarios[id].title}
            </button>
          ))}
        </div>
      </fieldset>

      <div
        className="mt-4 rounded-xl border border-slate-200 bg-white p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="font-semibold text-slate-900">任务成果</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">{scenario.task}</p>
        <p className="mt-3 font-semibold text-slate-900">已有工作证据</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          {scenario.evidence}
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          先区分执行责任、批准权限和协作者支持；证据只适用于相近任务，选择不是人员结论。
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className="font-semibold text-slate-900">
          2. 谁负责关键任务？
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(Object.keys(roles) as RoleId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.role === id}
              className={`${controlClass} ${state.role === id ? selectedClass : ""}`}
              onClick={() => update("role", id)}
            >
              {roles[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-semibold text-slate-900">
          3. 最需要防范的风险是什么？
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(Object.keys(risks) as RiskId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.risk === id}
              className={`${controlClass} ${state.risk === id ? selectedClass : ""}`}
              onClick={() => update("risk", id)}
            >
              {risks[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-semibold text-slate-900">
          4. 选择一项保障措施
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(Object.keys(safeguards) as SafeguardId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={state.safeguard === id}
              className={`${controlClass} ${state.safeguard === id ? selectedClass : ""}`}
              onClick={() => update("safeguard", id)}
            >
              {safeguards[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
        <svg
          viewBox="0 0 700 170"
          role="img"
          aria-labelledby="role-flow-title role-flow-desc"
          className="h-auto w-full"
        >
          <title id="role-flow-title">成果、角色、保障的工作关系</title>
          <desc id="role-flow-desc">
            任务成果连接到负责人，再经过风险保障到接收者复核。当前选择会突出负责人、风险和保障环节；完整选择也可由下方文字提示读取。
          </desc>
          <defs>
            <marker
              id="role-fit-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill="#64748b" />
            </marker>
          </defs>
          <path
            d="M155 82 H190 M330 82 H365 M505 82 H540"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
            markerEnd="url(#role-fit-arrow)"
          />
          {[
            { x: 15, label: "成果", detail: "谁使用？", active: true },
            {
              x: 190,
              label: "负责人",
              detail: state.role ? roles[state.role] : "待选择",
              active: Boolean(state.role),
            },
            {
              x: 365,
              label: "风险保障",
              detail: state.safeguard ? safeguards[state.safeguard] : "待选择",
              active: Boolean(state.risk && state.safeguard),
            },
            {
              x: 540,
              label: "复核",
              detail: "结果与负荷",
              active: state.revealed,
            },
          ].map((node) => (
            <g key={node.label}>
              <rect
                x={node.x}
                y="45"
                width="140"
                height="74"
                rx="14"
                fill={node.active ? "#e0e7ff" : "#f8fafc"}
                stroke={node.active ? "#4338ca" : "#94a3b8"}
                strokeWidth={node.active ? 3 : 2}
              />
              <text
                x={node.x + 70}
                y="74"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#0f172a"
              >
                {node.label}
              </text>
              <text
                x={node.x + 70}
                y="98"
                textAnchor="middle"
                fontSize="11"
                fill="#334155"
              >
                {node.detail.length > 12
                  ? `${node.detail.slice(0, 11)}…`
                  : node.detail}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <button
        type="button"
        disabled={completed !== 3}
        className="mt-5 min-h-11 rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900 disabled:cursor-not-allowed disabled:bg-slate-400"
        onClick={() => setState((current) => ({ ...current, revealed: true }))}
      >
        查看复核提示
      </button>
      <p
        className="mt-3 text-sm leading-6 text-slate-700"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback}
      </p>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        练习限制：情境为虚构教学素材；选择只改变讨论重点，不产生人员分数、诊断或自动化任用结论。切换情境会清空后续选择，避免把旧情境的判断误带过来。
      </p>
    </section>
  );
}
