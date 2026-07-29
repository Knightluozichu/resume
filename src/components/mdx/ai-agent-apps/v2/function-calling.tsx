"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "Function Calling 原理",
  focus: "把工具调用实现为模型选接口、应用执行、结果回灌的显式协议",
  invariant: "模型只提出结构化调用，真正执行和授权始终属于应用运行时",
  fault: "把 tool_use 当成已经执行的事实，未运行工具就据此生成成功答复",
  evidence:
    "工具列表、选择原因、调用块、参数校验、执行日志、结果块与 stop_reason",
  stages: ["暴露工具", "模型选择", "解析调用", "应用执行", "结果回灌"],
  signals: ["工具菜单", "调用块", "执行日志", "结果块"],
} satisfies AgentApplicationModel;

export function FunctionCallingModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function FunctionCallingTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function FunctionCallingEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
