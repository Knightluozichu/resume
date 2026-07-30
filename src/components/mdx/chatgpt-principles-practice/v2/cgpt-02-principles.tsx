"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "cgpt-02",
  title: "第2章 ChatGPT原理解构",
  question:
    "ChatGPT原理解构怎样避免把公开研究、同类产品推断和未知产品细节混为一谈？",
  concepts: [
    "第2章 ChatGPT原理解构",
    "2.1 背景知识",
    "2.1.1 自然语言处理的发展历程",
    "2.1.2 大型语言模型的发展历程",
    "2.2 ChatGPT同类产品",
    "2.2.1 BlenderBot 3.0",
    "2.2.2 LaMDA",
    "2.2.3 Sparrow",
    "2.3 ChatGPT的工作原理",
    "2.3.1 预训练与提示学习阶段",
    "2.3.2 结果评价与奖励建模阶段",
    "2.3.3 强化学习与自我进化阶段",
    "2.4 算法细节",
    "2.4.1 标注数据",
    "2.4.2 建模思路",
    "2.4.3 存在的问题",
    "2.5 关于ChatGPT的思考",
    "2.6 本章小结",
  ],
  invariant:
    "第2章 ChatGPT原理解构的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯",
  fault: "把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全",
  artifact: "训练阶段图、数据谱系、奖励模型探针与未知实现清单",
  stages: [
    {
      name: "第2章 ChatGPT原理解构 · 来源与输入",
      input:
        "在锁定的一手研究与2023原书目录边界内重放NLP谱系、同类产品、训练阶段、标注与奖励建模",
      operation:
        "冻结NLP谱系、同类产品、训练阶段、标注与奖励建模所需的数据、模型、算法、环境、版本和评估集",
      output: "第2章 ChatGPT原理解构的来源快照、输入合同与未知项清单",
      check:
        "第2章 ChatGPT原理解构没有把目录、二手总结或2023产品描述冒充当前实现事实",
    },
    {
      name: "第2章 ChatGPT原理解构 · 目标与状态",
      input: "第2章 ChatGPT原理解构的冻结输入、目标函数与预注册预测",
      operation: "重建预训练、提示/监督、偏好比较、奖励建模和策略优化证据链",
      output: "第2章 ChatGPT原理解构的参考状态、训练/推理轨迹与中间证据",
      check:
        "第2章 ChatGPT原理解构的每一步可由同一数据、参数、随机种子和顺序复算",
    },
    {
      name: "第2章 ChatGPT原理解构 · 单故障",
      input: "第2章 ChatGPT原理解构的参考轨迹与保持不变的模型、数据和评估",
      operation:
        "只注入“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”",
      output: "第2章 ChatGPT原理解构的首个分岔、传播路径和失败输出",
      check:
        "第2章 ChatGPT原理解构没有同时更换数据、模型、算法、环境和评价标准",
    },
    {
      name: "第2章 ChatGPT原理解构 · 恢复与评估",
      input: "第2章 ChatGPT原理解构的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: "第2章 ChatGPT原理解构的恢复差分、接受/拒绝理由与交付证据",
      check:
        "第2章 ChatGPT原理解构满足“第2章 ChatGPT原理解构的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "第2章 ChatGPT原理解构 · 参考",
      setup:
        "固定在锁定的一手研究与2023原书目录边界内重放NLP谱系、同类产品、训练阶段、标注与奖励建模的输入、版本、随机性与执行顺序",
      prediction:
        "第2章 ChatGPT原理解构应持续满足“第2章 ChatGPT原理解构的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
      boundary:
        "第2章 ChatGPT原理解构只回答本页正式坐标与已运行模型、数据和环境",
    },
    {
      name: "第2章 ChatGPT原理解构 · 单故障",
      setup:
        "保持其余条件不变，只注入“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”",
      prediction:
        "第2章 ChatGPT原理解构应出现可定位的首个状态分岔，而不是只有末端指标变化",
      boundary:
        "第2章 ChatGPT原理解构的故障结果不能外推到未测试模型、任务或产品版本",
    },
    {
      name: "第2章 ChatGPT原理解构 · 恢复",
      setup:
        "撤销故障并从同一检查点重放NLP谱系、同类产品、训练阶段、标注与奖励建模",
      prediction: "第2章 ChatGPT原理解构的状态、输出与独立评估应恢复参考路径",
      boundary: "第2章 ChatGPT原理解构若不能恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "第2章 ChatGPT原理解构参考步骤1：冻结NLP谱系、同类产品、训练阶段、标注与奖励建模所需的数据、模型、算法、环境、版本和评估集；保存第2章 ChatGPT原理解构的来源快照、输入合同与未知项清单并断言第2章 ChatGPT原理解构没有把目录、二手总结或2023产品描述冒充当前实现事实。",
    "第2章 ChatGPT原理解构参考步骤2：重建预训练、提示/监督、偏好比较、奖励建模和策略优化证据链；保存第2章 ChatGPT原理解构的参考状态、训练/推理轨迹与中间证据并断言第2章 ChatGPT原理解构的每一步可由同一数据、参数、随机种子和顺序复算。",
    "第2章 ChatGPT原理解构参考步骤3：只注入“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”；保存第2章 ChatGPT原理解构的首个分岔、传播路径和失败输出并断言第2章 ChatGPT原理解构没有同时更换数据、模型、算法、环境和评价标准。",
    "第2章 ChatGPT原理解构参考步骤4：撤销单一故障，从同一检查点重放并检查分布外边界；保存第2章 ChatGPT原理解构的恢复差分、接受/拒绝理由与交付证据并断言第2章 ChatGPT原理解构满足“第2章 ChatGPT原理解构的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "第2章 ChatGPT原理解构故障步骤1：保持在锁定的一手研究与2023原书目录边界内重放NLP谱系、同类产品、训练阶段、标注与奖励建模不变，只检查“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”如何改变第2章 ChatGPT原理解构的来源快照、输入合同与未知项清单。",
    "第2章 ChatGPT原理解构故障步骤2：保持第2章 ChatGPT原理解构的冻结输入、目标函数与预注册预测不变，只检查“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”如何改变第2章 ChatGPT原理解构的参考状态、训练/推理轨迹与中间证据。",
    "第2章 ChatGPT原理解构故障步骤3：保持第2章 ChatGPT原理解构的参考轨迹与保持不变的模型、数据和评估不变，只检查“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”如何改变第2章 ChatGPT原理解构的首个分岔、传播路径和失败输出。",
    "第2章 ChatGPT原理解构故障步骤4：保持第2章 ChatGPT原理解构的故障快照、恢复操作与独立评估不变，只检查“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”如何改变第2章 ChatGPT原理解构的恢复差分、接受/拒绝理由与交付证据。",
  ],
  gates: [
    {
      label: "书目与研究来源门",
      detail:
        "第2章 ChatGPT原理解构区分馆藏/数字目录、原始论文、2023产品快照、项目实验和当前未知。",
    },
    {
      label: "数据与状态门",
      detail:
        "第2章 ChatGPT原理解构的数据切分、tokenizer、模型/算法版本、随机性、训练/推理状态和检查点可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "第2章 ChatGPT原理解构只注入“把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全”，记录首个分岔并从同一检查点恢复。",
    },
    {
      label: "独立评估与边界门",
      detail:
        "第2章 ChatGPT原理解构交付训练阶段图、数据谱系、奖励模型探针与未知实现清单，并报告代理指标、真实目标、失败与未测试范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function Cgpt02PrinciplesContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function Cgpt02PrinciplesComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function Cgpt02PrinciplesEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
