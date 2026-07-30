"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "tcg-main-16",
  title: "ChatGPT究竟在做什么，为什么有效",
  question: "怎样用最少拟人化词汇回答ChatGPT在做什么以及为什么有效？",
  concepts: [
    "So ... What Is ChatGPT Doing, and Why Does It Work? / 所以，ChatGPT究竟在做什么，为什么有效？",
  ],
  invariant:
    "ChatGPT究竟在做什么，为什么有效的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "用理解、思考或意识替代可观测的条件分布、训练和生成机制",
  artifact: "因果链图、主张等级、失败案例与不适用边界",
  stages: [
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放条件生成、涌现能力、语言结构与拟人化风险",
      operation:
        "冻结条件生成、涌现能力、语言结构与拟人化风险所需的文本、数据、模型或工具版本",
      output: "ChatGPT究竟在做什么，为什么有效的来源快照、输入合同与版本边界",
      check:
        "ChatGPT究竟在做什么，为什么有效没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 机制与计算",
      input: "ChatGPT究竟在做什么，为什么有效的冻结输入与预注册预测",
      operation: "综合条件续写、神经表示、训练数据与语言结构的解释链",
      output: "ChatGPT究竟在做什么，为什么有效的参考轨迹、状态变化与中间证据",
      check:
        "ChatGPT究竟在做什么，为什么有效的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 单故障反例",
      input: "ChatGPT究竟在做什么，为什么有效的参考轨迹与保持不变的控制条件",
      operation:
        "只注入“用理解、思考或意识替代可观测的条件分布、训练和生成机制”",
      output:
        "ChatGPT究竟在做什么，为什么有效的首个状态分岔、传播路径与失败输出",
      check:
        "ChatGPT究竟在做什么，为什么有效没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 恢复与边界",
      input: "ChatGPT究竟在做什么，为什么有效的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "ChatGPT究竟在做什么，为什么有效的恢复差分、接受结论与边界声明",
      check:
        "ChatGPT究竟在做什么，为什么有效满足“ChatGPT究竟在做什么，为什么有效的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放条件生成、涌现能力、语言结构与拟人化风险的输入、版本、随机性与评估顺序",
      prediction:
        "ChatGPT究竟在做什么，为什么有效应持续满足“ChatGPT究竟在做什么，为什么有效的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary:
        "ChatGPT究竟在做什么，为什么有效只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 单故障",
      setup:
        "保持其余条件不变，只注入“用理解、思考或意识替代可观测的条件分布、训练和生成机制”",
      prediction:
        "ChatGPT究竟在做什么，为什么有效应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "ChatGPT究竟在做什么，为什么有效的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "ChatGPT究竟在做什么，为什么有效 · 恢复",
      setup: "撤销故障并从同一快照重放条件生成、涌现能力、语言结构与拟人化风险",
      prediction:
        "ChatGPT究竟在做什么，为什么有效的状态、输出与独立评估应恢复参考路径",
      boundary:
        "ChatGPT究竟在做什么，为什么有效若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "ChatGPT究竟在做什么，为什么有效参考步骤1：冻结条件生成、涌现能力、语言结构与拟人化风险所需的文本、数据、模型或工具版本；保存ChatGPT究竟在做什么，为什么有效的来源快照、输入合同与版本边界，并断言ChatGPT究竟在做什么，为什么有效没有把历史示意、产品名称或演示结果冒充当前规格。",
    "ChatGPT究竟在做什么，为什么有效参考步骤2：综合条件续写、神经表示、训练数据与语言结构的解释链；保存ChatGPT究竟在做什么，为什么有效的参考轨迹、状态变化与中间证据，并断言ChatGPT究竟在做什么，为什么有效的每一步都能由同一输入、规则、参数和顺序复算。",
    "ChatGPT究竟在做什么，为什么有效参考步骤3：只注入“用理解、思考或意识替代可观测的条件分布、训练和生成机制”；保存ChatGPT究竟在做什么，为什么有效的首个状态分岔、传播路径与失败输出，并断言ChatGPT究竟在做什么，为什么有效没有同时更换语料、模型、解码、工具和评估集。",
    "ChatGPT究竟在做什么，为什么有效参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存ChatGPT究竟在做什么，为什么有效的恢复差分、接受结论与边界声明，并断言ChatGPT究竟在做什么，为什么有效满足“ChatGPT究竟在做什么，为什么有效的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "ChatGPT究竟在做什么，为什么有效故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放条件生成、涌现能力、语言结构与拟人化风险不变，检查“用理解、思考或意识替代可观测的条件分布、训练和生成机制”如何改变ChatGPT究竟在做什么，为什么有效的来源快照、输入合同与版本边界。",
    "ChatGPT究竟在做什么，为什么有效故障步骤2：保持ChatGPT究竟在做什么，为什么有效的冻结输入与预注册预测不变，检查“用理解、思考或意识替代可观测的条件分布、训练和生成机制”如何改变ChatGPT究竟在做什么，为什么有效的参考轨迹、状态变化与中间证据。",
    "ChatGPT究竟在做什么，为什么有效故障步骤3：保持ChatGPT究竟在做什么，为什么有效的参考轨迹与保持不变的控制条件不变，检查“用理解、思考或意识替代可观测的条件分布、训练和生成机制”如何改变ChatGPT究竟在做什么，为什么有效的首个状态分岔、传播路径与失败输出。",
    "ChatGPT究竟在做什么，为什么有效故障步骤4：保持ChatGPT究竟在做什么，为什么有效的故障快照、恢复操作与独立评估不变，检查“用理解、思考或意识替代可观测的条件分布、训练和生成机制”如何改变ChatGPT究竟在做什么，为什么有效的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "ChatGPT究竟在做什么，为什么有效区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "ChatGPT究竟在做什么，为什么有效的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "ChatGPT究竟在做什么，为什么有效只注入“用理解、思考或意识替代可观测的条件分布、训练和生成机制”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "ChatGPT究竟在做什么，为什么有效交付因果链图、主张等级、失败案例与不适用边界，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgMain16ConclusionContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgMain16ConclusionComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgMain16ConclusionEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
