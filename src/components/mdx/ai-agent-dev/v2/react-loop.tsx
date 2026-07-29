"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "ReAct：推理与行动循环",
  focus:
    "把决策、行动与环境观察交错成可追踪循环，并避免暴露或依赖不可验证的私密推理",
  invariant:
    "下一步只依据任务状态、允许的动作和真实 observation 更新，调用与结果严格配对",
  fault: "工具失败后模型忽略 observation，继续沿旧计划重复相同副作用",
  evidence:
    "状态摘要、action、参数、tool_use_id、observation、错误、下一步与停止原因",
  stages: ["状态摘要", "选择行动", "执行工具", "接收观察", "更新或停止"],
  signals: ["状态", "行动", "观察", "停止"],
} satisfies AgentApplicationModel;

export function ReactLoopModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ReactLoopTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ReactLoopEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
