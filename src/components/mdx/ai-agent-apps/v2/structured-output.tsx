"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "结构化输出与工具调用协议",
  focus: "让模型结果经过语法、schema 和业务三层校验后才进入程序控制流",
  invariant: "只有完全验证的对象可以触发工具、数据库写入或后续自动化",
  fault: "从自由文本中正则截取 JSON 后直接执行，忽略缺字段、额外字段和业务边界",
  evidence:
    "schema 版本、原始响应、解析错误、字段错误、业务错误、修复次数与下游调用数",
  stages: ["生成请求", "语法解析", "schema 校验", "业务校验", "受控消费"],
  signals: ["原始响应", "schema", "业务规则", "下游调用"],
} satisfies AgentApplicationModel;

export function StructuredOutputModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function StructuredOutputTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function StructuredOutputEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
