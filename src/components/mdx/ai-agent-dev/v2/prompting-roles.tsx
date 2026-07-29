"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "提示工程与角色设定",
  focus:
    "分离系统角色、任务指令、用户数据、示例和结构合同，并用评测而非直觉改提示",
  invariant: "可信指令与不可信数据边界清晰，输出要求可被机器校验和回归测试",
  fault: "把用户提交的文档直接拼进系统指令，文档中的伪命令改变了工具权限",
  evidence: "提示版本、分区、输入样本、原始输出、schema 错误、评分与版本差异",
  stages: ["定义角色", "写任务合同", "隔离用户数据", "加入示例", "结构化验收"],
  signals: ["提示版本", "信任边界", "schema", "回归"],
} satisfies AgentApplicationModel;

export function PromptingRolesModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function PromptingRolesTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function PromptingRolesEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
