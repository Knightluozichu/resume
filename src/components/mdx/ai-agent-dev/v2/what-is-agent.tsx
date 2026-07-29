"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "什么是 AI Agent",
  focus: "用感知、决策、行动、观察和可调自主性定义可运行的 Agent 边界",
  invariant: "每一次行动都来自明确任务合同，并由新的环境观察推动下一步或停止",
  fault: "系统把多轮聊天包装成 Agent，却没有工具执行、环境观察或可验证完成状态",
  evidence:
    "任务输入、控制权、动作请求、环境观察、轮次预算、最终状态与人工接管",
  stages: ["接收目标", "选择控制权", "请求动作", "读取观察", "完成或接管"],
  signals: ["任务合同", "动作", "观察", "停止"],
} satisfies AgentApplicationModel;

export function WhatIsAgentModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function WhatIsAgentTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function WhatIsAgentEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
