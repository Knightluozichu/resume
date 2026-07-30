"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-glossary",
  title: "术语表",
  question:
    "怎样让术语表不仅解释名词，还能帮助学习者判断一段旧代码应复现、迁移还是拒绝？",
  concepts: ["术语表"],
  boundaryCards: [
    {
      name: "术语名称",
      input: "“术语表”的术语名称读取已分类任务、数据和用户身份。",
      trust:
        "术语名称只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按区分历史名称与稳定机制处理术语名称，不得把未验证内容提升为系统指令。",
      evidence:
        "术语名称输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "时代语境",
      input: "“术语表”的时代语境读取上游已记录的结构化状态。",
      trust:
        "时代语境只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按绑定操作证据和反例处理时代语境，不得把未验证内容提升为系统指令。",
      evidence:
        "时代语境输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "操作定义",
      input: "“术语表”的操作定义读取上游已记录的结构化状态。",
      trust:
        "操作定义只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按登记迁移与复核日期处理操作定义，不得把未验证内容提升为系统指令。",
      evidence:
        "操作定义输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "验证样本",
      input: "“术语表”的验证样本读取上游已记录的结构化状态。",
      trust:
        "验证样本只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按区分历史名称与稳定机制处理验证样本，不得把未验证内容提升为系统指令。",
      evidence:
        "验证样本输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "迁移决定",
      input: "“术语表”的迁移决定读取上游已记录的结构化状态。",
      trust:
        "迁移决定只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按绑定操作证据和反例处理迁移决定，不得把未验证内容提升为系统指令。",
      evidence:
        "迁移决定输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“术语表”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行区分历史名称与稳定机制，保存请求输入、信任来源与预期结果",
    "推进绑定操作证据和反例，记录模型建议、应用决定和工具调用",
    "完成登记迁移与复核日期，交付术语卡、时代标签、操作定义、反例、验证方式、迁移目标、来源链接和最近复核日期。",
  ],
  failureTrace: [
    "复用“术语表”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：同一个“插件”“记忆”或“函数”在历史和现代语境中指向不同合同却未标注",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“每个术语给出时代标签、操作定义、最小证据和常见混淆，不用产品名代替机制”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "每个术语给出时代标签、操作定义、最小证据和常见混淆，不用产品名代替机制",
  fault: "同一个“插件”“记忆”或“函数”在历史和现代语境中指向不同合同却未标注",
  artifact:
    "术语卡、时代标签、操作定义、反例、验证方式、迁移目标、来源链接和最近复核日期。",
  gates: [
    {
      label: "输入分类",
      detail: "“术语表”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail: "“术语表”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail: "“术语表”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail: "“术语表”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function LaeGlossaryRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function LaeGlossaryExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function LaeGlossaryAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
