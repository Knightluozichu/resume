"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "真实场景解剖：客服智能体与编码智能体为什么适合 agent",
  focus:
    "用客服与编码场景验证 Agent 适配条件：对话加行动、清晰成功标准、反馈循环和人工监督",
  invariant:
    "场景必须同时提供可执行工具、可验证结果和可接管边界，不能只展示流畅对话",
  fault:
    "客服 Agent 在缺少订单事实与退款权限时仍承诺已退款，编码 Agent 在测试失败时仍提交结果",
  evidence:
    "任务类型、工具调用、环境状态、成功断言、用户确认、测试结果、接管与副作用",
  stages: ["识别场景", "取得事实", "执行动作", "验证结果", "人工审查"],
  signals: ["外部事实", "动作", "成功断言", "人工审查"],
} satisfies AgentApplicationModel;

export function AgentsInPracticeModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function AgentsInPracticeTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function AgentsInPracticeEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
