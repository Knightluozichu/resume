"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "链式与路由：把任务拆成更稳的工作流",
  focus:
    "用提示链分解固定阶段，用路由把不同输入送入专用处理器，并为中间节点设置门禁",
  invariant: "链中每步都有输入输出合同，路由中的每类都有兜底和可测混淆边界",
  fault: "路由置信度不足时仍强行进入高风险专用分支，导致错误动作",
  evidence:
    "阶段输入输出、门禁结果、路由标签、置信度、混淆矩阵、兜底与最终指标",
  stages: ["入口校验", "链式分解", "分类路由", "专用处理", "结果门禁"],
  signals: ["中间合同", "路由标签", "置信度", "兜底"],
} satisfies AgentApplicationModel;

export function ChainingAndRoutingModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ChainingAndRoutingTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ChainingAndRoutingEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
