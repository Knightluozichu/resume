"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "上下文工程与压缩",
  focus:
    "在有限注意预算中选择、排序、压缩和按需加载上下文，并用位置扰动验证稳健性",
  invariant: "上下文重组后必须保留目标、约束、决定、开放问题和来源引用",
  fault: "按消息年龄截断历史，把仍生效的安全约束和未解决错误一起删除",
  evidence:
    "token 预算、内容类别、位置、压缩映射、保留断言、引用与位置扰动结果",
  stages: ["盘点信息", "分配预算", "按需加载", "压缩排序", "扰动评测"],
  signals: ["预算", "位置", "保留事实", "扰动"],
} satisfies AgentApplicationModel;

export function ContextEngineeringModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ContextEngineeringTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ContextEngineeringEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
