"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "自主智能体：让模型在环境反馈里自己推进任务",
  focus:
    "让模型在开放问题中依据真实环境反馈自主推进，同时保留沙箱、预算和人工检查点",
  invariant:
    "每轮行动都在最小权限内执行，可观察、可停止，并能把真实结果送回下一轮",
  fault: "Agent 在生产权限下反复尝试不可逆操作，错误随轮次累积且无人能暂停",
  evidence:
    "计划、工具参数、权限、环境结果、检查点、成本、首错位置、恢复与最终状态",
  stages: ["澄清目标", "制定计划", "受控行动", "吸收反馈", "检查点与退出"],
  signals: ["目标", "权限", "环境结果", "检查点"],
} satisfies AgentApplicationModel;

export function AutonomousAgentsModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function AutonomousAgentsTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function AutonomousAgentsEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
