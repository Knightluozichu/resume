"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-02",
  title: "第2章 深入了解GPT-4和ChatGPT的API",
  question:
    "怎样把原书的ChatCompletion调用读懂并封装成可迁移请求合同，而不把旧参数或响应结构写成永久接口？",
  concepts: [
    "第2章 深入了解GPT-4和ChatGPT的API",
    "2.1 基本概念",
    "2.2 OpenAI API提供的可用模型",
    "2.3 在OpenAI Playground中使用GPT模型",
    "2.4 开始使用OpenAI Python库",
    "2.4.1 OpenAI访问权限和API密钥",
    "2.4.2 Hello World示例程序",
    "2.5 使用GPT-4和ChatGPT",
    "2.5.1 ChatCompletion端点的输入选项",
    "2.5.2 ChatCompletion端点的输出格式",
    "2.5.3 从文本补全到函数",
    "2.6 使用其他文本补全模型",
    "2.6.1 Completion端点的输入选项",
    "2.6.2 Completion端点的输出格式",
    "2.7 考虑因素",
    "2.7.1 定价和标记限制",
    "2.7.2 安全和隐私",
    "2.8 其他OpenAI API和功能",
    "2.8.1 嵌入",
    "2.8.2 内容审核模型",
    "2.8.3 Whisper和DALL · E",
    "2.9 小结（含速查清单）",
  ],
  boundaryCards: [
    {
      name: "客户端请求",
      input:
        "“第2章 深入了解GPT-4和ChatGPT的API”的客户端请求读取已分类任务、数据和用户身份。",
      trust:
        "客户端请求只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按封装身份与请求输入处理客户端请求，不得把未验证内容提升为系统指令。",
      evidence:
        "客户端请求输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "服务端适配器",
      input:
        "“第2章 深入了解GPT-4和ChatGPT的API”的服务端适配器读取上游已记录的结构化状态。",
      trust:
        "服务端适配器只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按解析响应和工具调用处理服务端适配器，不得把未验证内容提升为系统指令。",
      evidence:
        "服务端适配器输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "OpenAI接口",
      input:
        "“第2章 深入了解GPT-4和ChatGPT的API”的OpenAI接口读取上游已记录的结构化状态。",
      trust:
        "OpenAI接口只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按核对费用数据与辅助API处理OpenAI接口，不得把未验证内容提升为系统指令。",
      evidence:
        "OpenAI接口输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "结构解析",
      input:
        "“第2章 深入了解GPT-4和ChatGPT的API”的结构解析读取上游已记录的结构化状态。",
      trust:
        "结构解析只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按封装身份与请求输入处理结构解析，不得把未验证内容提升为系统指令。",
      evidence:
        "结构解析输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "业务响应",
      input:
        "“第2章 深入了解GPT-4和ChatGPT的API”的业务响应读取上游已记录的结构化状态。",
      trust:
        "业务响应只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按解析响应和工具调用处理业务响应，不得把未验证内容提升为系统指令。",
      evidence:
        "业务响应输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“第2章 深入了解GPT-4和ChatGPT的API”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行封装身份与请求输入，保存请求输入、信任来源与预期结果",
    "推进解析响应和工具调用，记录模型建议、应用决定和工具调用",
    "完成核对费用数据与辅助API，交付环境变量清单、接口适配器、请求模式、响应模式、错误分类、用量记录、数据保留决策和迁移测试。",
  ],
  failureTrace: [
    "复用“第2章 深入了解GPT-4和ChatGPT的API”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：前端暴露密钥并假定旧版choices结构永远存在，错误响应仍进入业务流程",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“密钥只在服务端，接口版本与模型快照可追溯，输入输出经模式校验，费用、数据和错误路径受限”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "密钥只在服务端，接口版本与模型快照可追溯，输入输出经模式校验，费用、数据和错误路径受限",
  fault: "前端暴露密钥并假定旧版choices结构永远存在，错误响应仍进入业务流程",
  artifact:
    "环境变量清单、接口适配器、请求模式、响应模式、错误分类、用量记录、数据保留决策和迁移测试。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“第2章 深入了解GPT-4和ChatGPT的API”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“第2章 深入了解GPT-4和ChatGPT的API”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“第2章 深入了解GPT-4和ChatGPT的API”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“第2章 深入了解GPT-4和ChatGPT的API”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function Lae02ApiDeepDiveRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function Lae02ApiDeepDiveExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function Lae02ApiDeepDiveAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
