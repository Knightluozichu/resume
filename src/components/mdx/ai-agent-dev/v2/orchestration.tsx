"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "编排·通信·终止",
  focus: "用消息信封、共享黑板、调度器和全局终止检测组织多 Agent 协作",
  invariant:
    "消息与共享状态都有版本、所有者和因果标识，终止条件覆盖成功、死锁、预算与人工接管",
  fault:
    "两个 Agent 基于同一旧版本覆盖共享黑板，调度器未检测循环等待而无限转发消息",
  evidence:
    "message_id、correlation_id、状态版本、读写者、调度事件、等待图、预算与终止原因",
  stages: ["发布消息", "读取状态", "调度任务", "合并版本", "检测终止"],
  signals: ["消息 ID", "状态版本", "等待图", "终止"],
} satisfies AgentApplicationModel;

export function OrchestrationModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function OrchestrationTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function OrchestrationEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
