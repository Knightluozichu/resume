"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "增强型 LLM：工具、检索与记忆",
  focus:
    "把检索、工具与记忆作为可替换能力接到模型外部，并验证每种增强是否真的改善任务",
  invariant: "进入上下文或执行链的增强结果必须有来源、版本、权限和失败语义",
  fault: "检索返回过期资料、记忆混入其他用户状态，模型仍把它们当作可信上下文",
  evidence: "查询、命中文档、工具 schema、记忆键、来源时间、权限判定与最终引用",
  stages: ["请求分类", "按需检索", "工具选择", "记忆读写", "证据回答"],
  signals: ["命中来源", "工具契约", "记忆隔离", "引用一致"],
} satisfies AgentApplicationModel;

export function AugmentedLlmModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function AugmentedLlmTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function AugmentedLlmEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
