"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-04",
  title: "第4章 GPT-4和ChatGPT的高级技巧",
  question:
    "怎样先用评测证明提示改进，再判断微调是否值得，而不是依据几个顺眼样本调整系统？",
  concepts: [
    "第4章 GPT-4和ChatGPT的高级技巧",
    "4.1 提示工程",
    "4.1.1 设计有效的提示词",
    "4.1.2 逐步思考",
    "4.1.3 实现少样本学习",
    "4.1.4 改善提示效果",
    "4.2 微调",
    "4.2.1 开始微调",
    "4.2.2 使用OpenAI API进行微调",
    "4.2.3 微调的应用",
    "4.2.4 生成和微调电子邮件营销活动的合成数据",
    "4.2.5 微调的成本",
    "4.3 小结",
  ],
  boundaryCards: [
    {
      name: "任务与数据",
      input:
        "“第4章 GPT-4和ChatGPT的高级技巧”的任务与数据读取已分类任务、数据和用户身份。",
      trust:
        "任务与数据只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按建立代表性评测基线处理任务与数据，不得把未验证内容提升为系统指令。",
      evidence:
        "任务与数据输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "提示版本",
      input:
        "“第4章 GPT-4和ChatGPT的高级技巧”的提示版本读取上游已记录的结构化状态。",
      trust:
        "提示版本只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按迭代提示与少样本处理提示版本，不得把未验证内容提升为系统指令。",
      evidence:
        "提示版本输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "模型输出",
      input:
        "“第4章 GPT-4和ChatGPT的高级技巧”的模型输出读取上游已记录的结构化状态。",
      trust:
        "模型输出只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按评估数据和微调决策处理模型输出，不得把未验证内容提升为系统指令。",
      evidence:
        "模型输出输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "自动与人工评分",
      input:
        "“第4章 GPT-4和ChatGPT的高级技巧”的自动与人工评分读取上游已记录的结构化状态。",
      trust:
        "自动与人工评分只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按建立代表性评测基线处理自动与人工评分，不得把未验证内容提升为系统指令。",
      evidence:
        "自动与人工评分输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "优化决策",
      input:
        "“第4章 GPT-4和ChatGPT的高级技巧”的优化决策读取上游已记录的结构化状态。",
      trust:
        "优化决策只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按迭代提示与少样本处理优化决策，不得把未验证内容提升为系统指令。",
      evidence:
        "优化决策输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“第4章 GPT-4和ChatGPT的高级技巧”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行建立代表性评测基线，保存请求输入、信任来源与预期结果",
    "推进迭代提示与少样本，记录模型建议、应用决定和工具调用",
    "完成评估数据和微调决策，交付任务定义、数据切分、提示版本、样本来源、评分器、基线报告、成本延迟、微调资格和停止条件。",
  ],
  failureTrace: [
    "复用“第4章 GPT-4和ChatGPT的高级技巧”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：把测试样本泄漏进少样本提示或训练集，离线分数上升却不能代表新输入表现",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“训练、开发和测试样本分离，提示与数据集有版本，成本、准确率和失败类型用同一评测口径比较”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "训练、开发和测试样本分离，提示与数据集有版本，成本、准确率和失败类型用同一评测口径比较",
  fault: "把测试样本泄漏进少样本提示或训练集，离线分数上升却不能代表新输入表现",
  artifact:
    "任务定义、数据切分、提示版本、样本来源、评分器、基线报告、成本延迟、微调资格和停止条件。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“第4章 GPT-4和ChatGPT的高级技巧”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“第4章 GPT-4和ChatGPT的高级技巧”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“第4章 GPT-4和ChatGPT的高级技巧”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“第4章 GPT-4和ChatGPT的高级技巧”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function Lae04AdvancedTechniquesRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function Lae04AdvancedTechniquesExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function Lae04AdvancedTechniquesAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
