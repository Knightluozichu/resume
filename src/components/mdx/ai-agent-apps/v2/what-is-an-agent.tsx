"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "从 LLM 到 Agent：什么是智能体",
  focus: "用控制权、环境反馈和停止条件区分模型调用、工作流与智能体",
  invariant: "每次自主决策都受工具权限、环境事实和显式停止条件约束",
  fault: "模型只凭自己的上一段文字继续推演，却把没有工具证据的结论标成完成",
  evidence: "任务合同、控制权归属、工具调用、环境结果、轮次预算与停止原因",
  stages: ["任务合同", "控制权选择", "工具行动", "环境反馈", "停止验收"],
  signals: ["控制权", "外部事实", "预算", "停止原因"],
} satisfies AgentApplicationModel;

export function WhatIsAnAgentModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function WhatIsAnAgentTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function WhatIsAnAgentEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
