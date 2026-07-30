"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "tcg-main-13",
  title: "真正让ChatGPT工作的是什么",
  question: "语言模型为什么能生成连贯文本，却仍会在全局事实和深计算上失败？",
  concepts: ["What Really Lets ChatGPT Work? / 真正让ChatGPT工作的是什么？"],
  invariant:
    "真正让ChatGPT工作的是什么的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力",
  artifact: "句法探针、事实反例、长程一致性测试与工具需求表",
  stages: [
    {
      name: "真正让ChatGPT工作的是什么 · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放语言规律、统计结构、事实性与计算边界",
      operation:
        "冻结语言规律、统计结构、事实性与计算边界所需的文本、数据、模型或工具版本",
      output: "真正让ChatGPT工作的是什么的来源快照、输入合同与版本边界",
      check:
        "真正让ChatGPT工作的是什么没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "真正让ChatGPT工作的是什么 · 机制与计算",
      input: "真正让ChatGPT工作的是什么的冻结输入与预注册预测",
      operation: "分开句法规律、语义连贯、世界事实与可执行计算",
      output: "真正让ChatGPT工作的是什么的参考轨迹、状态变化与中间证据",
      check:
        "真正让ChatGPT工作的是什么的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "真正让ChatGPT工作的是什么 · 单故障反例",
      input: "真正让ChatGPT工作的是什么的参考轨迹与保持不变的控制条件",
      operation:
        "只注入“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”",
      output: "真正让ChatGPT工作的是什么的首个状态分岔、传播路径与失败输出",
      check:
        "真正让ChatGPT工作的是什么没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "真正让ChatGPT工作的是什么 · 恢复与边界",
      input: "真正让ChatGPT工作的是什么的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "真正让ChatGPT工作的是什么的恢复差分、接受结论与边界声明",
      check:
        "真正让ChatGPT工作的是什么满足“真正让ChatGPT工作的是什么的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "真正让ChatGPT工作的是什么 · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放语言规律、统计结构、事实性与计算边界的输入、版本、随机性与评估顺序",
      prediction:
        "真正让ChatGPT工作的是什么应持续满足“真正让ChatGPT工作的是什么的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary:
        "真正让ChatGPT工作的是什么只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "真正让ChatGPT工作的是什么 · 单故障",
      setup:
        "保持其余条件不变，只注入“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”",
      prediction:
        "真正让ChatGPT工作的是什么应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "真正让ChatGPT工作的是什么的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "真正让ChatGPT工作的是什么 · 恢复",
      setup: "撤销故障并从同一快照重放语言规律、统计结构、事实性与计算边界",
      prediction:
        "真正让ChatGPT工作的是什么的状态、输出与独立评估应恢复参考路径",
      boundary:
        "真正让ChatGPT工作的是什么若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "真正让ChatGPT工作的是什么参考步骤1：冻结语言规律、统计结构、事实性与计算边界所需的文本、数据、模型或工具版本；保存真正让ChatGPT工作的是什么的来源快照、输入合同与版本边界，并断言真正让ChatGPT工作的是什么没有把历史示意、产品名称或演示结果冒充当前规格。",
    "真正让ChatGPT工作的是什么参考步骤2：分开句法规律、语义连贯、世界事实与可执行计算；保存真正让ChatGPT工作的是什么的参考轨迹、状态变化与中间证据，并断言真正让ChatGPT工作的是什么的每一步都能由同一输入、规则、参数和顺序复算。",
    "真正让ChatGPT工作的是什么参考步骤3：只注入“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”；保存真正让ChatGPT工作的是什么的首个状态分岔、传播路径与失败输出，并断言真正让ChatGPT工作的是什么没有同时更换语料、模型、解码、工具和评估集。",
    "真正让ChatGPT工作的是什么参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存真正让ChatGPT工作的是什么的恢复差分、接受结论与边界声明，并断言真正让ChatGPT工作的是什么满足“真正让ChatGPT工作的是什么的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "真正让ChatGPT工作的是什么故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放语言规律、统计结构、事实性与计算边界不变，检查“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”如何改变真正让ChatGPT工作的是什么的来源快照、输入合同与版本边界。",
    "真正让ChatGPT工作的是什么故障步骤2：保持真正让ChatGPT工作的是什么的冻结输入与预注册预测不变，检查“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”如何改变真正让ChatGPT工作的是什么的参考轨迹、状态变化与中间证据。",
    "真正让ChatGPT工作的是什么故障步骤3：保持真正让ChatGPT工作的是什么的参考轨迹与保持不变的控制条件不变，检查“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”如何改变真正让ChatGPT工作的是什么的首个状态分岔、传播路径与失败输出。",
    "真正让ChatGPT工作的是什么故障步骤4：保持真正让ChatGPT工作的是什么的故障快照、恢复操作与独立评估不变，检查“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”如何改变真正让ChatGPT工作的是什么的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "真正让ChatGPT工作的是什么区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "真正让ChatGPT工作的是什么的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "真正让ChatGPT工作的是什么只注入“看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "真正让ChatGPT工作的是什么交付句法探针、事实反例、长程一致性测试与工具需求表，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgMain13WhatLetsItWorkContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgMain13WhatLetsItWorkComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgMain13WhatLetsItWorkEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
