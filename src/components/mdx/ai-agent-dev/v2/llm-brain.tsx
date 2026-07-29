"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "LLM：Agent 的大脑",
  focus:
    "理解 token、上下文、逐 token 生成和采样边界，避免把语言流畅误当事实检索",
  invariant:
    "模型输出只能作为概率候选，事实、结构和副作用必须由外部证据或确定性校验确认",
  fault: "模型以高置信语气编造不存在的接口，运行时未检索或校验就执行后续步骤",
  evidence:
    "模型版本、消息、token 预算、采样参数、原始响应、来源检索与验证结果",
  stages: ["编码输入", "组装上下文", "生成分布", "采样 token", "外部验证"],
  signals: ["版本", "上下文", "采样", "验证"],
} satisfies AgentApplicationModel;

export function LlmBrainModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function LlmBrainTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function LlmBrainEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
