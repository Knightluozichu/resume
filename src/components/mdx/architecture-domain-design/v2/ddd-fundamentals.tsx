"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-06",
  title: "DDD 基础",
  focus:
    "通过领域专家与开发者持续协作，把知识消化为通用语言和可执行模型，并让代码表达同一套业务含义",
  invariant:
    "对话、文档、模型和代码中的关键术语保持同义；新知识出现时四者一起演化",
  fault: "先设计通用技术框架，再把业务名词贴到贫血数据对象和 CRUD 服务上",
  evidence:
    "领域对话记录、术语变更、模型草图、规则示例、代码命名与领域专家验收",
  concepts: ["领域", "模型", "通用语言", "知识消化", "模型驱动设计"],
  zones: [
    {
      label: "领域知识",
      detail: "专家经验、规则、例外与业务目标",
    },
    {
      label: "共同模型",
      detail: "选择性表达并形成通用语言",
    },
    {
      label: "可执行设计",
      detail: "代码和测试直接体现模型",
    },
  ],
  trace: [
    "收集关键案例",
    "暴露语言冲突",
    "提炼模型",
    "写入代码与测试",
    "由专家复核结果",
  ],
  scenarios: [
    {
      label: "退款资格",
      input: "客服说“已完成订单”仍可能在特殊窗口内退款",
      expected: "修正状态语言与规则模型，而不是在控制器里追加孤立 if",
    },
    {
      label: "同名客户",
      input: "销售与风控对“客户”的识别范围和生命周期不同",
      expected: "先确认模型边界，不强迫两个含义合并成一个万能 Customer",
    },
  ],
} satisfies ArchitectureCourseModel;

export function DddFundamentalsBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function DddFundamentalsTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function DddFundamentalsViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
