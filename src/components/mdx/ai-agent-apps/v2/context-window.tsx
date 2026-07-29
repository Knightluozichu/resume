"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "上下文窗口：预算、压缩与裁剪",
  focus: "把上下文视为有限注意预算，用按需检索、压缩和结构化笔记保留高信号信息",
  invariant: "压缩或裁剪后必须保留任务目标、关键决定、未解决问题和可追溯引用",
  fault: "按最旧消息直接截断，连同尚未解决的约束和工具错误一起删除",
  evidence: "token 预算、消息分类、保留清单、压缩前后事实断言、引用与任务结果",
  stages: ["信息盘点", "按需检索", "重要性排序", "压缩裁剪", "回归验证"],
  signals: ["预算", "保留项", "引用", "事实召回"],
} satisfies AgentApplicationModel;

export function ContextWindowModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ContextWindowTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ContextWindowEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
