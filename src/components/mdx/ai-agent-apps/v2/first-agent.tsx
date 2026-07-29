"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "你的第一个最小 Agent",
  focus: "用一个只读工具、一个显式状态机和一个确定性验收器组装最小可运行智能体",
  invariant: "最小实现也必须分离模型决策、工具执行、权限检查和成功判定",
  fault: "把模型返回的工具名直接映射到任意函数，并允许未经校验的参数触发副作用",
  evidence: "工具白名单、输入校验、执行日志、结果消息、退出状态与验收断言",
  stages: ["注册工具", "模型选择", "校验参数", "受控执行", "验收退出"],
  signals: ["白名单", "参数校验", "执行日志", "退出状态"],
} satisfies AgentApplicationModel;

export function FirstAgentModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function FirstAgentTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function FirstAgentEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
