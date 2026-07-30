"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "cgpt-09",
  title: "第9章 类ChatGPT实战",
  question:
    "类ChatGPT私有化实战怎样保证数据、模型、奖励和评估在三阶段间不泄漏？",
  concepts: [
    "第9章 类ChatGPT实战",
    "9.1 任务设计",
    "9.2 数据准备",
    "9.3 基于文档生成问题任务的类ChatGPT实战",
    "9.3.1 SFT阶段",
    "9.3.2 RM阶段",
    "9.3.3 RL阶段",
    "9.4 本章小结",
  ],
  invariant:
    "第9章 类ChatGPT实战的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯",
  fault: "SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF",
  artifact: "任务合同、数据切分、三阶段checkpoint、奖励轨迹与端到端评估",
  stages: [
    {
      name: "第9章 类ChatGPT实战 · 来源与输入",
      input:
        "在锁定的一手研究与2023原书目录边界内重放任务设计、数据准备、SFT、RM、RL与私有化边界",
      operation:
        "冻结任务设计、数据准备、SFT、RM、RL与私有化边界所需的数据、模型、算法、环境、版本和评估集",
      output: "第9章 类ChatGPT实战的来源快照、输入合同与未知项清单",
      check:
        "第9章 类ChatGPT实战没有把目录、二手总结或2023产品描述冒充当前实现事实",
    },
    {
      name: "第9章 类ChatGPT实战 · 目标与状态",
      input: "第9章 类ChatGPT实战的冻结输入、目标函数与预注册预测",
      operation: "用同一文档问句任务贯通SFT、RM和RL三个阶段",
      output: "第9章 类ChatGPT实战的参考状态、训练/推理轨迹与中间证据",
      check:
        "第9章 类ChatGPT实战的每一步可由同一数据、参数、随机种子和顺序复算",
    },
    {
      name: "第9章 类ChatGPT实战 · 单故障",
      input: "第9章 类ChatGPT实战的参考轨迹与保持不变的模型、数据和评估",
      operation:
        "只注入“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”",
      output: "第9章 类ChatGPT实战的首个分岔、传播路径和失败输出",
      check: "第9章 类ChatGPT实战没有同时更换数据、模型、算法、环境和评价标准",
    },
    {
      name: "第9章 类ChatGPT实战 · 恢复与评估",
      input: "第9章 类ChatGPT实战的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: "第9章 类ChatGPT实战的恢复差分、接受/拒绝理由与交付证据",
      check:
        "第9章 类ChatGPT实战满足“第9章 类ChatGPT实战的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "第9章 类ChatGPT实战 · 参考",
      setup:
        "固定在锁定的一手研究与2023原书目录边界内重放任务设计、数据准备、SFT、RM、RL与私有化边界的输入、版本、随机性与执行顺序",
      prediction:
        "第9章 类ChatGPT实战应持续满足“第9章 类ChatGPT实战的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
      boundary: "第9章 类ChatGPT实战只回答本页正式坐标与已运行模型、数据和环境",
    },
    {
      name: "第9章 类ChatGPT实战 · 单故障",
      setup:
        "保持其余条件不变，只注入“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”",
      prediction:
        "第9章 类ChatGPT实战应出现可定位的首个状态分岔，而不是只有末端指标变化",
      boundary:
        "第9章 类ChatGPT实战的故障结果不能外推到未测试模型、任务或产品版本",
    },
    {
      name: "第9章 类ChatGPT实战 · 恢复",
      setup:
        "撤销故障并从同一检查点重放任务设计、数据准备、SFT、RM、RL与私有化边界",
      prediction: "第9章 类ChatGPT实战的状态、输出与独立评估应恢复参考路径",
      boundary: "第9章 类ChatGPT实战若不能恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "第9章 类ChatGPT实战参考步骤1：冻结任务设计、数据准备、SFT、RM、RL与私有化边界所需的数据、模型、算法、环境、版本和评估集；保存第9章 类ChatGPT实战的来源快照、输入合同与未知项清单并断言第9章 类ChatGPT实战没有把目录、二手总结或2023产品描述冒充当前实现事实。",
    "第9章 类ChatGPT实战参考步骤2：用同一文档问句任务贯通SFT、RM和RL三个阶段；保存第9章 类ChatGPT实战的参考状态、训练/推理轨迹与中间证据并断言第9章 类ChatGPT实战的每一步可由同一数据、参数、随机种子和顺序复算。",
    "第9章 类ChatGPT实战参考步骤3：只注入“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”；保存第9章 类ChatGPT实战的首个分岔、传播路径和失败输出并断言第9章 类ChatGPT实战没有同时更换数据、模型、算法、环境和评价标准。",
    "第9章 类ChatGPT实战参考步骤4：撤销单一故障，从同一检查点重放并检查分布外边界；保存第9章 类ChatGPT实战的恢复差分、接受/拒绝理由与交付证据并断言第9章 类ChatGPT实战满足“第9章 类ChatGPT实战的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "第9章 类ChatGPT实战故障步骤1：保持在锁定的一手研究与2023原书目录边界内重放任务设计、数据准备、SFT、RM、RL与私有化边界不变，只检查“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”如何改变第9章 类ChatGPT实战的来源快照、输入合同与未知项清单。",
    "第9章 类ChatGPT实战故障步骤2：保持第9章 类ChatGPT实战的冻结输入、目标函数与预注册预测不变，只检查“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”如何改变第9章 类ChatGPT实战的参考状态、训练/推理轨迹与中间证据。",
    "第9章 类ChatGPT实战故障步骤3：保持第9章 类ChatGPT实战的参考轨迹与保持不变的模型、数据和评估不变，只检查“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”如何改变第9章 类ChatGPT实战的首个分岔、传播路径和失败输出。",
    "第9章 类ChatGPT实战故障步骤4：保持第9章 类ChatGPT实战的故障快照、恢复操作与独立评估不变，只检查“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”如何改变第9章 类ChatGPT实战的恢复差分、接受/拒绝理由与交付证据。",
  ],
  gates: [
    {
      label: "书目与研究来源门",
      detail:
        "第9章 类ChatGPT实战区分馆藏/数字目录、原始论文、2023产品快照、项目实验和当前未知。",
    },
    {
      label: "数据与状态门",
      detail:
        "第9章 类ChatGPT实战的数据切分、tokenizer、模型/算法版本、随机性、训练/推理状态和检查点可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "第9章 类ChatGPT实战只注入“SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF”，记录首个分岔并从同一检查点恢复。",
    },
    {
      label: "独立评估与边界门",
      detail:
        "第9章 类ChatGPT实战交付任务合同、数据切分、三阶段checkpoint、奖励轨迹与端到端评估，并报告代理指标、真实目标、失败与未测试范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function Cgpt09ChatgptPracticeContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function Cgpt09ChatgptPracticeComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function Cgpt09ChatgptPracticeEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
