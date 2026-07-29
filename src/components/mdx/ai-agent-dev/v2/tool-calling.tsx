"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "工具调用 Tool Calling",
  focus: "实现工具定义、模型选择、参数验证、应用执行、结果回灌和停止原因状态机",
  invariant: "模型只生成调用请求，应用始终负责验证、授权、执行和返回真实结果",
  fault: "执行器用反射运行任意工具名，并把未经业务校验的参数直接交给函数",
  evidence:
    "工具版本、描述、input_schema、tool_use、权限、执行日志、tool_result 与 stop_reason",
  stages: ["声明工具", "模型选择", "验证授权", "执行函数", "回灌与退出"],
  signals: ["schema", "授权", "执行", "结果"],
} satisfies AgentApplicationModel;

export function ToolCallingModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ToolCallingTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ToolCallingEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
