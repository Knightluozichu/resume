"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-05",
  title: "第5章 使用LangChain框架和插件增强LLM的功能",
  question:
    "怎样把框架和旧插件拆回可审计合同，确保工具参数正确仍不意味着动作已获授权？",
  concepts: [
    "第5章 使用LangChain框架和插件增强LLM的功能",
    "5.1 LangChain框架",
    "5.1.1 动态提示词",
    "5.1.2 智能体及工具",
    "5.1.3 记忆",
    "5.1.4 嵌入",
    "5.2 GPT-4插件",
    "5.2.1 概述",
    "5.2.2 API",
    "5.2.3 插件清单",
    "5.2.4 OpenAPI规范",
    "5.2.5 描述",
    "5.3 小结",
    "5.4 总结",
  ],
  boundaryCards: [
    {
      name: "动态提示",
      input:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的动态提示读取已分类任务、数据和用户身份。",
      trust:
        "动态提示只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按拆解框架状态与提示处理动态提示，不得把未验证内容提升为系统指令。",
      evidence:
        "动态提示输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "模型选择",
      input:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的模型选择读取上游已记录的结构化状态。",
      trust:
        "模型选择只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按验证工具合同和授权处理模型选择，不得把未验证内容提升为系统指令。",
      evidence:
        "模型选择输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "工具参数",
      input:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的工具参数读取上游已记录的结构化状态。",
      trust:
        "工具参数只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按记录执行结果与记忆处理工具参数，不得把未验证内容提升为系统指令。",
      evidence:
        "工具参数输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "策略执行",
      input:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的策略执行读取上游已记录的结构化状态。",
      trust:
        "策略执行只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按拆解框架状态与提示处理策略执行，不得把未验证内容提升为系统指令。",
      evidence:
        "策略执行输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "结果与记忆",
      input:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的结果与记忆读取上游已记录的结构化状态。",
      trust:
        "结果与记忆只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按验证工具合同和授权处理结果与记忆，不得把未验证内容提升为系统指令。",
      evidence:
        "结果与记忆输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“第5章 使用LangChain框架和插件增强LLM的功能”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行拆解框架状态与提示，保存请求输入、信任来源与预期结果",
    "推进验证工具合同和授权，记录模型建议、应用决定和工具调用",
    "完成记录执行结果与记忆，交付提示版本、记忆作用域、工具模式、允许工具集、授权决策、幂等键、执行日志、结果回传和迁移对照。",
  ],
  failureTrace: [
    "复用“第5章 使用LangChain框架和插件增强LLM的功能”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：模型生成结构正确的工具参数后，应用跳过身份、权限和幂等检查直接执行",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“框架不扩大权限，记忆有作用域与生命周期，工具调用经过模式校验、策略授权、执行和结果回传”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "框架不扩大权限，记忆有作用域与生命周期，工具调用经过模式校验、策略授权、执行和结果回传",
  fault: "模型生成结构正确的工具参数后，应用跳过身份、权限和幂等检查直接执行",
  artifact:
    "提示版本、记忆作用域、工具模式、允许工具集、授权决策、幂等键、执行日志、结果回传和迁移对照。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“第5章 使用LangChain框架和插件增强LLM的功能”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“第5章 使用LangChain框架和插件增强LLM的功能”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“第5章 使用LangChain框架和插件增强LLM的功能”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“第5章 使用LangChain框架和插件增强LLM的功能”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function Lae05LangchainPluginsRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function Lae05LangchainPluginsExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function Lae05LangchainPluginsAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
