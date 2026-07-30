"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "tcg-main-10",
  title: "ChatGPT内部",
  question:
    "书中GPT-3参照怎样解释早期ChatGPT内部计算，又不能冒充当前产品规格？",
  concepts: ["Inside ChatGPT / ChatGPT内部"],
  invariant:
    "ChatGPT内部的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现",
  artifact: "张量形状账本、层级轨迹、历史版本标记与未知项清单",
  stages: [
    {
      name: "ChatGPT内部 · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放token/位置表示、注意力、前馈计算与历史边界",
      operation:
        "冻结token/位置表示、注意力、前馈计算与历史边界所需的文本、数据、模型或工具版本",
      output: "ChatGPT内部的来源快照、输入合同与版本边界",
      check: "ChatGPT内部没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "ChatGPT内部 · 机制与计算",
      input: "ChatGPT内部的冻结输入与预注册预测",
      operation: "追踪token、位置、注意力、前馈层与输出分布的历史架构链",
      output: "ChatGPT内部的参考轨迹、状态变化与中间证据",
      check: "ChatGPT内部的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "ChatGPT内部 · 单故障反例",
      input: "ChatGPT内部的参考轨迹与保持不变的控制条件",
      operation:
        "只注入“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”",
      output: "ChatGPT内部的首个状态分岔、传播路径与失败输出",
      check: "ChatGPT内部没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "ChatGPT内部 · 恢复与边界",
      input: "ChatGPT内部的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "ChatGPT内部的恢复差分、接受结论与边界声明",
      check:
        "ChatGPT内部满足“ChatGPT内部的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "ChatGPT内部 · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放token/位置表示、注意力、前馈计算与历史边界的输入、版本、随机性与评估顺序",
      prediction:
        "ChatGPT内部应持续满足“ChatGPT内部的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary: "ChatGPT内部只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "ChatGPT内部 · 单故障",
      setup:
        "保持其余条件不变，只注入“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”",
      prediction:
        "ChatGPT内部应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "ChatGPT内部的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "ChatGPT内部 · 恢复",
      setup:
        "撤销故障并从同一快照重放token/位置表示、注意力、前馈计算与历史边界",
      prediction: "ChatGPT内部的状态、输出与独立评估应恢复参考路径",
      boundary: "ChatGPT内部若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "ChatGPT内部参考步骤1：冻结token/位置表示、注意力、前馈计算与历史边界所需的文本、数据、模型或工具版本；保存ChatGPT内部的来源快照、输入合同与版本边界，并断言ChatGPT内部没有把历史示意、产品名称或演示结果冒充当前规格。",
    "ChatGPT内部参考步骤2：追踪token、位置、注意力、前馈层与输出分布的历史架构链；保存ChatGPT内部的参考轨迹、状态变化与中间证据，并断言ChatGPT内部的每一步都能由同一输入、规则、参数和顺序复算。",
    "ChatGPT内部参考步骤3：只注入“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”；保存ChatGPT内部的首个状态分岔、传播路径与失败输出，并断言ChatGPT内部没有同时更换语料、模型、解码、工具和评估集。",
    "ChatGPT内部参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存ChatGPT内部的恢复差分、接受结论与边界声明，并断言ChatGPT内部满足“ChatGPT内部的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "ChatGPT内部故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放token/位置表示、注意力、前馈计算与历史边界不变，检查“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”如何改变ChatGPT内部的来源快照、输入合同与版本边界。",
    "ChatGPT内部故障步骤2：保持ChatGPT内部的冻结输入与预注册预测不变，检查“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”如何改变ChatGPT内部的参考轨迹、状态变化与中间证据。",
    "ChatGPT内部故障步骤3：保持ChatGPT内部的参考轨迹与保持不变的控制条件不变，检查“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”如何改变ChatGPT内部的首个状态分岔、传播路径与失败输出。",
    "ChatGPT内部故障步骤4：保持ChatGPT内部的故障快照、恢复操作与独立评估不变，检查“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”如何改变ChatGPT内部的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "ChatGPT内部区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "ChatGPT内部的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "ChatGPT内部只注入“把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "ChatGPT内部交付张量形状账本、层级轨迹、历史版本标记与未知项清单，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgMain10InsideChatgptContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgMain10InsideChatgptComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgMain10InsideChatgptEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
