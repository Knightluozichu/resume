"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "规划与任务分解",
  focus:
    "把大目标拆成带依赖和验收条件的任务图，并在环境反馈否定假设时有限重规划",
  invariant: "计划中的每个任务都有输入、输出、依赖、责任主体和可验证完成条件",
  fault:
    "计划只列自然语言步骤，没有依赖或验收器，某一步失败后仍把后续全部标为完成",
  evidence:
    "目标版本、任务图、依赖、计划变更、工具观察、失败原因、重规划次数与验收结果",
  stages: ["冻结目标", "拆任务图", "检查依赖", "执行观察", "重规划或验收"],
  signals: ["目标", "依赖图", "观察", "重规划"],
} satisfies AgentApplicationModel;

export function PlanningModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function PlanningTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function PlanningEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
