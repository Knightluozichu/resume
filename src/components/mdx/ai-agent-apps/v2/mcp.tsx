"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "MCP：模型上下文协议",
  focus: "按 MCP 的 host、client、server 与三类原语边界集成外部上下文和动作",
  invariant: "协商后的能力、原语控制权和用户确认策略必须在每次调用中保持一致",
  fault:
    "客户端把 server 暴露的模型控制工具当作自动可信操作，绕过用户确认直接写外部系统",
  evidence:
    "协议版本、能力协商、tools/list、调用请求、用户确认、结果与权限日志",
  stages: ["连接初始化", "能力协商", "发现原语", "用户确认", "调用与结果"],
  signals: ["协议版本", "能力", "确认", "调用结果"],
} satisfies AgentApplicationModel;

export function McpModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function McpTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function McpEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
