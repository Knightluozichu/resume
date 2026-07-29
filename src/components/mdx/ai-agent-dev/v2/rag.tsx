"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "RAG 检索增强生成",
  focus:
    "构建解析、切块、索引、检索、重排、生成和引用闭环，并分开评估检索与回答",
  invariant:
    "回答中的可验证事实必须由当前授权语料支持，引用能定位到稳定文档版本和片段",
  fault: "检索命中高相似但过期片段，生成器混入参数记忆并伪造了不存在的引用",
  evidence:
    "文档版本、chunk_id、切块参数、查询、召回集、重排分数、引用、答案与事实断言",
  stages: ["解析切块", "建立索引", "召回重排", "带证据生成", "引用验收"],
  signals: ["文档版本", "召回", "重排", "引用"],
} satisfies AgentApplicationModel;

export function RagModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function RagTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function RagEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
