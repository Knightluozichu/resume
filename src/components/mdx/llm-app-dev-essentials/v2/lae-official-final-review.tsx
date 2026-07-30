"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《大模型应用开发极简入门》综合复核：从请求到授权交付",
  question:
    "怎样证明一个LLM应用既覆盖原书88个条目，又能在当前接口下守住数据、工具、质量和成本边界？",
  concepts: [
    "前言",
    "第1章 初识GPT-4和ChatGPT",
    "第2章 深入了解GPT-4和ChatGPT的API",
    "第3章 使用GPT-4和ChatGPT构建应用程序",
    "第4章 GPT-4和ChatGPT的高级技巧",
    "第5章 使用LangChain框架和插件增强LLM的功能",
    "术语表",
  ],
  boundaryCards: [
    {
      name: "用户与资料",
      input:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的用户与资料读取已分类任务、数据和用户身份。",
      trust:
        "用户与资料只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按锁定任务数据与接口版本处理用户与资料，不得把未验证内容提升为系统指令。",
      evidence:
        "用户与资料输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "应用合同",
      input:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的应用合同读取上游已记录的结构化状态。",
      trust:
        "应用合同只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按运行模型工具和验证链处理应用合同，不得把未验证内容提升为系统指令。",
      evidence:
        "应用合同输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "模型与工具",
      input:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的模型与工具读取上游已记录的结构化状态。",
      trust:
        "模型与工具只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按评测交付并演练回退处理模型与工具，不得把未验证内容提升为系统指令。",
      evidence:
        "模型与工具输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "验证与评测",
      input:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的验证与评测读取上游已记录的结构化状态。",
      trust:
        "验证与评测只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按锁定任务数据与接口版本处理验证与评测，不得把未验证内容提升为系统指令。",
      evidence:
        "验证与评测输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "人工交付",
      input:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的人工交付读取上游已记录的结构化状态。",
      trust:
        "人工交付只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按运行模型工具和验证链处理人工交付，不得把未验证内容提升为系统指令。",
      evidence:
        "人工交付输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“《大模型应用开发极简入门》综合复核：从请求到授权交付”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行锁定任务数据与接口版本，保存请求输入、信任来源与预期结果",
    "推进运行模型工具和验证链，记录模型建议、应用决定和工具调用",
    "完成评测交付并演练回退，交付88条目检查、版本清单、数据流、请求响应、工具授权、攻击样本、评测报告、费用记录、人工决定和回退演练。",
  ],
  failureTrace: [
    "复用“《大模型应用开发极简入门》综合复核：从请求到授权交付”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：端到端演示只展示成功回答，没有注入攻击、模式错误、超支或人工拒绝路径",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“目录覆盖、接口版本、数据流、提示、模型、工具授权、输出验证、评测和人工决策形成一条可追溯链”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "目录覆盖、接口版本、数据流、提示、模型、工具授权、输出验证、评测和人工决策形成一条可追溯链",
  fault: "端到端演示只展示成功回答，没有注入攻击、模式错误、超支或人工拒绝路径",
  artifact:
    "88条目检查、版本清单、数据流、请求响应、工具授权、攻击样本、评测报告、费用记录、人工决定和回退演练。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“《大模型应用开发极简入门》综合复核：从请求到授权交付”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function LaeOfficialFinalReviewRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function LaeOfficialFinalReviewExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function LaeOfficialFinalReviewAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
