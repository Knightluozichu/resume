"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-01",
  title: "第1章 初识GPT-4和ChatGPT",
  question:
    "怎样从下一个标记预测理解模型能力，同时避免把流畅回答、产品案例或模型代际当成真实性证明？",
  concepts: [
    "第1章 初识GPT-4和ChatGPT",
    "1.1 LLM概述",
    "1.1.1 探索语言模型和NLP的基础",
    "1.1.2 理解Transformer架构及其在LLM中的作用",
    "1.1.3 解密GPT模型的标记化和预测步骤",
    "1.2 GPT模型简史：从GPT-1到GPT-4",
    "1.2.1 GPT-1",
    "1.2.2 GPT-2",
    "1.2.3 GPT-3",
    "1.2.4 从GPT-3到InstructGPT",
    "1.2.5 GPT-3.5、Codex和ChatGPT",
    "1.2.6 GPT-4",
    "1.3 LLM用例和示例产品",
    "1.3.1 Be My Eyes",
    "1.3.2 摩根士丹利",
    "1.3.3 可汗学院",
    "1.3.4 多邻国",
    "1.3.5 Yabble",
    "1.3.6 Waymark",
    "1.3.7 Inworld AI",
    "1.4 警惕AI幻觉：限制与考虑",
    "1.5 使用插件和微调优化GPT模型",
    "1.6 小结",
  ],
  boundaryCards: [
    {
      name: "文本与标记",
      input:
        "“第1章 初识GPT-4和ChatGPT”的文本与标记读取已分类任务、数据和用户身份。",
      trust:
        "文本与标记只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按复原模型机制与演进处理文本与标记，不得把未验证内容提升为系统指令。",
      evidence:
        "文本与标记输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "Transformer计算",
      input:
        "“第1章 初识GPT-4和ChatGPT”的Transformer计算读取上游已记录的结构化状态。",
      trust:
        "Transformer计算只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按把案例转成任务合同处理Transformer计算，不得把未验证内容提升为系统指令。",
      evidence:
        "Transformer计算输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "候选输出",
      input: "“第1章 初识GPT-4和ChatGPT”的候选输出读取上游已记录的结构化状态。",
      trust:
        "候选输出只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按为幻觉和优化设门处理候选输出，不得把未验证内容提升为系统指令。",
      evidence:
        "候选输出输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "事实核对",
      input: "“第1章 初识GPT-4和ChatGPT”的事实核对读取上游已记录的结构化状态。",
      trust:
        "事实核对只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按复原模型机制与演进处理事实核对，不得把未验证内容提升为系统指令。",
      evidence:
        "事实核对输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "产品决策",
      input: "“第1章 初识GPT-4和ChatGPT”的产品决策读取上游已记录的结构化状态。",
      trust:
        "产品决策只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按把案例转成任务合同处理产品决策，不得把未验证内容提升为系统指令。",
      evidence:
        "产品决策输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“第1章 初识GPT-4和ChatGPT”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行复原模型机制与演进，保存请求输入、信任来源与预期结果",
    "推进把案例转成任务合同，记录模型建议、应用决定和工具调用",
    "完成为幻觉和优化设门，交付机制图、模型时代线、案例任务卡、评测样本、来源记录、幻觉反例、人工复核点和拒答策略。",
  ],
  failureTrace: [
    "复用“第1章 初识GPT-4和ChatGPT”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：模型生成了流畅但无来源的事实，应用仍把它当作已验证结论展示",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“能力陈述连接版本化任务与评测，事实陈述连接外部证据，模型输出保留不确定性和人工复核”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "能力陈述连接版本化任务与评测，事实陈述连接外部证据，模型输出保留不确定性和人工复核",
  fault: "模型生成了流畅但无来源的事实，应用仍把它当作已验证结论展示",
  artifact:
    "机制图、模型时代线、案例任务卡、评测样本、来源记录、幻觉反例、人工复核点和拒答策略。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“第1章 初识GPT-4和ChatGPT”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“第1章 初识GPT-4和ChatGPT”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“第1章 初识GPT-4和ChatGPT”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“第1章 初识GPT-4和ChatGPT”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function Lae01Gpt4ChatgptEssentialsRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function Lae01Gpt4ChatgptEssentialsExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function Lae01Gpt4ChatgptEssentialsAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
