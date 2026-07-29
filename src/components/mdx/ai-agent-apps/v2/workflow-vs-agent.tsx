"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "工作流 vs 智能体：何时用哪个",
  focus: "按路径可预知性、反馈需求和风险预算选择单次调用、工作流或智能体",
  invariant: "新增自主性必须在冻结评测集上证明收益大于延迟、成本和风险增量",
  fault: "因为任务有多个步骤就直接选择自治 Agent，忽略步骤其实完全可预写",
  evidence: "任务分类、简单基线、成功率、调用数、尾延迟、成本、故障率与接管率",
  stages: ["任务分类", "简单基线", "工作流候选", "Agent 候选", "指标决策"],
  signals: ["可预知性", "基线", "收益", "风险"],
} satisfies AgentApplicationModel;

export function WorkflowVsAgentModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function WorkflowVsAgentTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function WorkflowVsAgentEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
