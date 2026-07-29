"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "智能体循环：感知、思考与行动",
  focus: "实现“决策—工具执行—结果回灌—重新决策”的循环，并正确处理所有停止原因",
  invariant:
    "每个 tool_use 都由运行时执行并以匹配调用标识的 tool_result 回到下一轮",
  fault: "运行时漏回一个工具结果或错配调用标识，下一轮却继续消费不完整历史",
  evidence:
    "消息序列、stop_reason、tool_use_id、参数、tool_result、错误标记与循环计数",
  stages: ["发送请求", "解析停止原因", "执行工具", "回灌结果", "继续或退出"],
  signals: ["停止原因", "调用标识", "结果配对", "循环计数"],
} satisfies AgentApplicationModel;

export function AgenticLoopModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function AgenticLoopTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function AgenticLoopEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
