"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "多智能体协作模式",
  focus:
    "按并行价值、上下文隔离和角色专长选择 supervisor、pipeline 或分散协作拓扑",
  invariant: "只有可独立验证的子任务才交给独立 Agent，最终结果由明确聚合器验收",
  fault:
    "为了展示多 Agent 把强依赖任务并行化，工作者各自基于不同旧状态产出冲突结果",
  evidence:
    "拓扑、任务图、角色提示、上下文切片、工作者结果、冲突、聚合规则、token 与耗时",
  stages: ["评估必要性", "选择拓扑", "隔离上下文", "并行执行", "聚合验收"],
  signals: ["任务独立性", "上下文", "冲突", "聚合"],
} satisfies AgentApplicationModel;

export function MultiAgentPatternsModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function MultiAgentPatternsTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function MultiAgentPatternsEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
