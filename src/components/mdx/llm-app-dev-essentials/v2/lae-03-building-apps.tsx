"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-03",
  title: "第3章 使用GPT-4和ChatGPT构建应用程序",
  question:
    "怎样让新闻稿、视频摘要、游戏专家和语音控制共享安全应用骨架，却保留各自数据与授权边界？",
  concepts: [
    "第3章 使用GPT-4和ChatGPT构建应用程序",
    "3.1 应用程序开发概述",
    "3.1.1 管理API密钥",
    "3.1.2 数据安全和数据隐私",
    "3.2 软件架构设计原则",
    "3.3 LLM驱动型应用程序的漏洞",
    "3.3.1 分析输入和输出",
    "3.3.2 无法避免提示词注入",
    "3.4 示例项目",
    "3.4.1 项目1：构建新闻稿生成器",
    "3.4.2 项目2：YouTube视频摘要",
    "3.4.3 项目3：打造《塞尔达传说：旷野之息》专家",
    "3.4.4 项目4：语音控制",
    "3.5 小结",
  ],
  boundaryCards: [
    {
      name: "外部内容",
      input:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的外部内容读取已分类任务、数据和用户身份。",
      trust:
        "外部内容只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按划分数据和信任边界处理外部内容，不得把未验证内容提升为系统指令。",
      evidence:
        "外部内容输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "提示组装",
      input:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的提示组装读取上游已记录的结构化状态。",
      trust:
        "提示组装只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按编排模型与最小权限工具处理提示组装，不得把未验证内容提升为系统指令。",
      evidence:
        "提示组装输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "模型建议",
      input:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的模型建议读取上游已记录的结构化状态。",
      trust:
        "模型建议只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按验证输出并处理故障处理模型建议，不得把未验证内容提升为系统指令。",
      evidence:
        "模型建议输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "授权工具",
      input:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的授权工具读取上游已记录的结构化状态。",
      trust:
        "授权工具只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按划分数据和信任边界处理授权工具，不得把未验证内容提升为系统指令。",
      evidence:
        "授权工具输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "用户确认",
      input:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的用户确认读取上游已记录的结构化状态。",
      trust:
        "用户确认只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按编排模型与最小权限工具处理用户确认，不得把未验证内容提升为系统指令。",
      evidence:
        "用户确认输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“第3章 使用GPT-4和ChatGPT构建应用程序”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行划分数据和信任边界，保存请求输入、信任来源与预期结果",
    "推进编排模型与最小权限工具，记录模型建议、应用决定和工具调用",
    "完成验证输出并处理故障，交付威胁模型、密钥边界、数据流、提示模板、工具白名单、注入样本、验证器、人工确认和审计日志。",
  ],
  failureTrace: [
    "复用“第3章 使用GPT-4和ChatGPT构建应用程序”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：视频字幕中的指令越过数据边界，诱导模型泄露上下文或触发未授权工具",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“不可信内容不能改变系统策略，模型不能直接执行高影响动作，输出在交付前经过任务特定验证”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "不可信内容不能改变系统策略，模型不能直接执行高影响动作，输出在交付前经过任务特定验证",
  fault: "视频字幕中的指令越过数据边界，诱导模型泄露上下文或触发未授权工具",
  artifact:
    "威胁模型、密钥边界、数据流、提示模板、工具白名单、注入样本、验证器、人工确认和审计日志。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“第3章 使用GPT-4和ChatGPT构建应用程序”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function Lae03BuildingAppsRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function Lae03BuildingAppsExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function Lae03BuildingAppsAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
