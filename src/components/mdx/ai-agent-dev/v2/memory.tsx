"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "记忆系统 Memory",
  focus:
    "分离工作记忆与长期记忆，设计带来源、租户、保留期和删除语义的写入检索流程",
  invariant:
    "记忆只能在正确主体、权限和生命周期内读写，检索结果进入上下文前再次核验",
  fault: "全局向量库未按租户过滤，把另一用户的偏好和历史写进当前回答",
  evidence:
    "memory_id、租户、来源、写入理由、向量版本、检索分数、过期时间与删除日志",
  stages: ["选择写入", "加元数据", "索引保存", "权限检索", "使用或遗忘"],
  signals: ["租户", "来源", "检索分数", "生命周期"],
} satisfies AgentApplicationModel;

export function MemoryModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function MemoryTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function MemoryEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
