"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "安全护栏与成本控制",
  focus:
    "以数据/指令隔离、最小权限、风险分级、沙箱、预算和人工批准构建纵深防御",
  invariant:
    "不可信内容永远不能自行扩大工具、资源或身份权限，高风险副作用必须先预览再批准",
  fault:
    "网页中的 prompt injection 要求导出密钥，Agent 把它当系统命令并调用发送工具",
  evidence:
    "输入来源、信任标签、策略版本、权限、工具参数、风险级别、批准、沙箱日志与副作用",
  stages: ["标记信任", "策略判定", "最小授权", "沙箱预览", "批准或拒绝"],
  signals: ["来源", "策略", "权限", "副作用"],
} satisfies AgentApplicationModel;

export function SafetyGuardrailsModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function SafetyGuardrailsTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function SafetyGuardrailsEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
