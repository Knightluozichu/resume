"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "tcg-wa-01",
  title: "ChatGPT与Wolfram|Alpha",
  question:
    "ChatGPT与Wolfram|Alpha组合时，哪一步负责语言，哪一步负责计算和溯源？",
  concepts: [
    "Wolfram|Alpha as the Way to Bring Computational Knowledge Superpowers to ChatGPT / 以Wolfram|Alpha为ChatGPT带来计算知识超能力",
    "ChatGPT and Wolfram|Alpha / ChatGPT与Wolfram|Alpha",
  ],
  invariant:
    "ChatGPT与Wolfram|Alpha的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "只要接入计算工具就宣称整条回答自动真实、完整且无歧义",
  artifact: "任务路由、工具输入、计算输出、语言整合与溯源记录",
  stages: [
    {
      name: "ChatGPT与Wolfram|Alpha · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放概率语言、计算知识、工具路由与责任边界",
      operation:
        "冻结概率语言、计算知识、工具路由与责任边界所需的文本、数据、模型或工具版本",
      output: "ChatGPT与Wolfram|Alpha的来源快照、输入合同与版本边界",
      check:
        "ChatGPT与Wolfram|Alpha没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "ChatGPT与Wolfram|Alpha · 机制与计算",
      input: "ChatGPT与Wolfram|Alpha的冻结输入与预注册预测",
      operation: "区分语言生成器与可执行计算知识系统的职责",
      output: "ChatGPT与Wolfram|Alpha的参考轨迹、状态变化与中间证据",
      check:
        "ChatGPT与Wolfram|Alpha的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "ChatGPT与Wolfram|Alpha · 单故障反例",
      input: "ChatGPT与Wolfram|Alpha的参考轨迹与保持不变的控制条件",
      operation: "只注入“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”",
      output: "ChatGPT与Wolfram|Alpha的首个状态分岔、传播路径与失败输出",
      check: "ChatGPT与Wolfram|Alpha没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "ChatGPT与Wolfram|Alpha · 恢复与边界",
      input: "ChatGPT与Wolfram|Alpha的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "ChatGPT与Wolfram|Alpha的恢复差分、接受结论与边界声明",
      check:
        "ChatGPT与Wolfram|Alpha满足“ChatGPT与Wolfram|Alpha的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "ChatGPT与Wolfram|Alpha · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放概率语言、计算知识、工具路由与责任边界的输入、版本、随机性与评估顺序",
      prediction:
        "ChatGPT与Wolfram|Alpha应持续满足“ChatGPT与Wolfram|Alpha的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary:
        "ChatGPT与Wolfram|Alpha只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "ChatGPT与Wolfram|Alpha · 单故障",
      setup:
        "保持其余条件不变，只注入“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”",
      prediction:
        "ChatGPT与Wolfram|Alpha应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "ChatGPT与Wolfram|Alpha的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "ChatGPT与Wolfram|Alpha · 恢复",
      setup: "撤销故障并从同一快照重放概率语言、计算知识、工具路由与责任边界",
      prediction: "ChatGPT与Wolfram|Alpha的状态、输出与独立评估应恢复参考路径",
      boundary:
        "ChatGPT与Wolfram|Alpha若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "ChatGPT与Wolfram|Alpha参考步骤1：冻结概率语言、计算知识、工具路由与责任边界所需的文本、数据、模型或工具版本；保存ChatGPT与Wolfram|Alpha的来源快照、输入合同与版本边界，并断言ChatGPT与Wolfram|Alpha没有把历史示意、产品名称或演示结果冒充当前规格。",
    "ChatGPT与Wolfram|Alpha参考步骤2：区分语言生成器与可执行计算知识系统的职责；保存ChatGPT与Wolfram|Alpha的参考轨迹、状态变化与中间证据，并断言ChatGPT与Wolfram|Alpha的每一步都能由同一输入、规则、参数和顺序复算。",
    "ChatGPT与Wolfram|Alpha参考步骤3：只注入“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”；保存ChatGPT与Wolfram|Alpha的首个状态分岔、传播路径与失败输出，并断言ChatGPT与Wolfram|Alpha没有同时更换语料、模型、解码、工具和评估集。",
    "ChatGPT与Wolfram|Alpha参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存ChatGPT与Wolfram|Alpha的恢复差分、接受结论与边界声明，并断言ChatGPT与Wolfram|Alpha满足“ChatGPT与Wolfram|Alpha的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "ChatGPT与Wolfram|Alpha故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放概率语言、计算知识、工具路由与责任边界不变，检查“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”如何改变ChatGPT与Wolfram|Alpha的来源快照、输入合同与版本边界。",
    "ChatGPT与Wolfram|Alpha故障步骤2：保持ChatGPT与Wolfram|Alpha的冻结输入与预注册预测不变，检查“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”如何改变ChatGPT与Wolfram|Alpha的参考轨迹、状态变化与中间证据。",
    "ChatGPT与Wolfram|Alpha故障步骤3：保持ChatGPT与Wolfram|Alpha的参考轨迹与保持不变的控制条件不变，检查“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”如何改变ChatGPT与Wolfram|Alpha的首个状态分岔、传播路径与失败输出。",
    "ChatGPT与Wolfram|Alpha故障步骤4：保持ChatGPT与Wolfram|Alpha的故障快照、恢复操作与独立评估不变，检查“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”如何改变ChatGPT与Wolfram|Alpha的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "ChatGPT与Wolfram|Alpha区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "ChatGPT与Wolfram|Alpha的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "ChatGPT与Wolfram|Alpha只注入“只要接入计算工具就宣称整条回答自动真实、完整且无歧义”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "ChatGPT与Wolfram|Alpha交付任务路由、工具输入、计算输出、语言整合与溯源记录，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgWa01ChatgptWolframAlphaContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgWa01ChatgptWolframAlphaComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgWa01ChatgptWolframAlphaEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
