"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "提示工程精要",
  focus: "把系统指令、任务输入、示例和输出合同分层组织，并用失败样本驱动迭代",
  invariant:
    "提示中的优先级、数据边界和成功标准必须可读、可测试且不依赖隐藏共享背景",
  fault: "把用户数据拼进系统指令区，导致数据中的命令覆盖任务合同",
  evidence: "提示版本、分区内容、测试样本、原始响应、评分维度与回归差异",
  stages: ["任务合同", "指令分区", "精选示例", "输出约束", "评测迭代"],
  signals: ["版本", "边界", "样本", "回归"],
} satisfies AgentApplicationModel;

export function PromptEngineeringModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function PromptEngineeringTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function PromptEngineeringEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
