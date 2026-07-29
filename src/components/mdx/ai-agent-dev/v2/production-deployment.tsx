"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "生产化部署",
  focus:
    "把模型决策与执行基础设施解耦，补齐队列、并发、超时、幂等、降级、灰度和回滚",
  invariant:
    "每个请求都有稳定身份、资源预算和可恢复状态，重试不会重复副作用，版本可安全回退",
  fault: "模型超时后网关无幂等键地重试写操作，造成重复下单并在全量发布中扩大",
  evidence:
    "request_id、idempotency_key、队列事件、超时、重试、模型版本、灰度指标、回滚与补偿日志",
  stages: ["接入排队", "限并发执行", "超时降级", "灰度观测", "回滚补偿"],
  signals: ["请求身份", "重试", "灰度", "补偿"],
} satisfies AgentApplicationModel;

export function ProductionDeploymentModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ProductionDeploymentTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ProductionDeploymentEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
