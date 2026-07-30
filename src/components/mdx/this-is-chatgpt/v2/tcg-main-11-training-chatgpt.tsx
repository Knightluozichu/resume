"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "tcg-main-11",
  title: "ChatGPT的训练",
  question: "预训练怎样把语料统计压入参数，而不等于逐字保存或保证事实正确？",
  concepts: ["The Training of ChatGPT / ChatGPT的训练"],
  invariant:
    "ChatGPT的训练的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实",
  artifact: "数据来源分层、目标函数、规模估计边界与记忆探针",
  stages: [
    {
      name: "ChatGPT的训练 · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放预训练、压缩、记忆、规模估计与未知项",
      operation:
        "冻结预训练、压缩、记忆、规模估计与未知项所需的文本、数据、模型或工具版本",
      output: "ChatGPT的训练的来源快照、输入合同与版本边界",
      check: "ChatGPT的训练没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "ChatGPT的训练 · 机制与计算",
      input: "ChatGPT的训练的冻结输入与预注册预测",
      operation: "连接大规模语料、预测目标、参数更新与训练计算量",
      output: "ChatGPT的训练的参考轨迹、状态变化与中间证据",
      check: "ChatGPT的训练的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "ChatGPT的训练 · 单故障反例",
      input: "ChatGPT的训练的参考轨迹与保持不变的控制条件",
      operation:
        "只注入“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”",
      output: "ChatGPT的训练的首个状态分岔、传播路径与失败输出",
      check: "ChatGPT的训练没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "ChatGPT的训练 · 恢复与边界",
      input: "ChatGPT的训练的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "ChatGPT的训练的恢复差分、接受结论与边界声明",
      check:
        "ChatGPT的训练满足“ChatGPT的训练的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "ChatGPT的训练 · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放预训练、压缩、记忆、规模估计与未知项的输入、版本、随机性与评估顺序",
      prediction:
        "ChatGPT的训练应持续满足“ChatGPT的训练的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary: "ChatGPT的训练只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "ChatGPT的训练 · 单故障",
      setup:
        "保持其余条件不变，只注入“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”",
      prediction:
        "ChatGPT的训练应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "ChatGPT的训练的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "ChatGPT的训练 · 恢复",
      setup: "撤销故障并从同一快照重放预训练、压缩、记忆、规模估计与未知项",
      prediction: "ChatGPT的训练的状态、输出与独立评估应恢复参考路径",
      boundary: "ChatGPT的训练若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "ChatGPT的训练参考步骤1：冻结预训练、压缩、记忆、规模估计与未知项所需的文本、数据、模型或工具版本；保存ChatGPT的训练的来源快照、输入合同与版本边界，并断言ChatGPT的训练没有把历史示意、产品名称或演示结果冒充当前规格。",
    "ChatGPT的训练参考步骤2：连接大规模语料、预测目标、参数更新与训练计算量；保存ChatGPT的训练的参考轨迹、状态变化与中间证据，并断言ChatGPT的训练的每一步都能由同一输入、规则、参数和顺序复算。",
    "ChatGPT的训练参考步骤3：只注入“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”；保存ChatGPT的训练的首个状态分岔、传播路径与失败输出，并断言ChatGPT的训练没有同时更换语料、模型、解码、工具和评估集。",
    "ChatGPT的训练参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存ChatGPT的训练的恢复差分、接受结论与边界声明，并断言ChatGPT的训练满足“ChatGPT的训练的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "ChatGPT的训练故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放预训练、压缩、记忆、规模估计与未知项不变，检查“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”如何改变ChatGPT的训练的来源快照、输入合同与版本边界。",
    "ChatGPT的训练故障步骤2：保持ChatGPT的训练的冻结输入与预注册预测不变，检查“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”如何改变ChatGPT的训练的参考轨迹、状态变化与中间证据。",
    "ChatGPT的训练故障步骤3：保持ChatGPT的训练的参考轨迹与保持不变的控制条件不变，检查“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”如何改变ChatGPT的训练的首个状态分岔、传播路径与失败输出。",
    "ChatGPT的训练故障步骤4：保持ChatGPT的训练的故障快照、恢复操作与独立评估不变，检查“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”如何改变ChatGPT的训练的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "ChatGPT的训练区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "ChatGPT的训练的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "ChatGPT的训练只注入“把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "ChatGPT的训练交付数据来源分层、目标函数、规模估计边界与记忆探针，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgMain11TrainingChatgptContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgMain11TrainingChatgptComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgMain11TrainingChatgptEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
