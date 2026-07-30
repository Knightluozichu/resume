"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "cgpt-01",
  title: "第1章 了解ChatGPT",
  question: "了解ChatGPT时，怎样区分产品叙述、生成机制、能力演示与可重复评估？",
  concepts: [
    "第1章 了解ChatGPT",
    "1.1 ChatGPT的由来",
    "1.1.1 什么是ChatGPT",
    "1.1.2 ChatGPT的发展历史",
    "1.2 ChatGPT的工作流程",
    "1.3 ChatGPT用例",
    "1.3.1 日常任务",
    "1.3.2 编写代码",
    "1.3.3 文本生成",
    "1.3.4 办公自动化",
    "1.4 本章小结",
  ],
  invariant:
    "第1章 了解ChatGPT的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯",
  fault: "用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用",
  artifact: "历史时间轴、生成轨迹、用例风险矩阵与人工复核记录",
  stages: [
    {
      name: "第1章 了解ChatGPT · 来源与输入",
      input:
        "在锁定的一手研究与2023原书目录边界内重放由来、工作流程、用例与能力边界",
      operation:
        "冻结由来、工作流程、用例与能力边界所需的数据、模型、算法、环境、版本和评估集",
      output: "第1章 了解ChatGPT的来源快照、输入合同与未知项清单",
      check:
        "第1章 了解ChatGPT没有把目录、二手总结或2023产品描述冒充当前实现事实",
    },
    {
      name: "第1章 了解ChatGPT · 目标与状态",
      input: "第1章 了解ChatGPT的冻结输入、目标函数与预注册预测",
      operation: "把产品历史、生成流程和日常/代码/办公用例拆成输入输出合同",
      output: "第1章 了解ChatGPT的参考状态、训练/推理轨迹与中间证据",
      check: "第1章 了解ChatGPT的每一步可由同一数据、参数、随机种子和顺序复算",
    },
    {
      name: "第1章 了解ChatGPT · 单故障",
      input: "第1章 了解ChatGPT的参考轨迹与保持不变的模型、数据和评估",
      operation:
        "只注入“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”",
      output: "第1章 了解ChatGPT的首个分岔、传播路径和失败输出",
      check: "第1章 了解ChatGPT没有同时更换数据、模型、算法、环境和评价标准",
    },
    {
      name: "第1章 了解ChatGPT · 恢复与评估",
      input: "第1章 了解ChatGPT的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: "第1章 了解ChatGPT的恢复差分、接受/拒绝理由与交付证据",
      check:
        "第1章 了解ChatGPT满足“第1章 了解ChatGPT的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "第1章 了解ChatGPT · 参考",
      setup:
        "固定在锁定的一手研究与2023原书目录边界内重放由来、工作流程、用例与能力边界的输入、版本、随机性与执行顺序",
      prediction:
        "第1章 了解ChatGPT应持续满足“第1章 了解ChatGPT的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”",
      boundary: "第1章 了解ChatGPT只回答本页正式坐标与已运行模型、数据和环境",
    },
    {
      name: "第1章 了解ChatGPT · 单故障",
      setup:
        "保持其余条件不变，只注入“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”",
      prediction:
        "第1章 了解ChatGPT应出现可定位的首个状态分岔，而不是只有末端指标变化",
      boundary:
        "第1章 了解ChatGPT的故障结果不能外推到未测试模型、任务或产品版本",
    },
    {
      name: "第1章 了解ChatGPT · 恢复",
      setup: "撤销故障并从同一检查点重放由来、工作流程、用例与能力边界",
      prediction: "第1章 了解ChatGPT的状态、输出与独立评估应恢复参考路径",
      boundary: "第1章 了解ChatGPT若不能恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "第1章 了解ChatGPT参考步骤1：冻结由来、工作流程、用例与能力边界所需的数据、模型、算法、环境、版本和评估集；保存第1章 了解ChatGPT的来源快照、输入合同与未知项清单并断言第1章 了解ChatGPT没有把目录、二手总结或2023产品描述冒充当前实现事实。",
    "第1章 了解ChatGPT参考步骤2：把产品历史、生成流程和日常/代码/办公用例拆成输入输出合同；保存第1章 了解ChatGPT的参考状态、训练/推理轨迹与中间证据并断言第1章 了解ChatGPT的每一步可由同一数据、参数、随机种子和顺序复算。",
    "第1章 了解ChatGPT参考步骤3：只注入“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”；保存第1章 了解ChatGPT的首个分岔、传播路径和失败输出并断言第1章 了解ChatGPT没有同时更换数据、模型、算法、环境和评价标准。",
    "第1章 了解ChatGPT参考步骤4：撤销单一故障，从同一检查点重放并检查分布外边界；保存第1章 了解ChatGPT的恢复差分、接受/拒绝理由与交付证据并断言第1章 了解ChatGPT满足“第1章 了解ChatGPT的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "第1章 了解ChatGPT故障步骤1：保持在锁定的一手研究与2023原书目录边界内重放由来、工作流程、用例与能力边界不变，只检查“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”如何改变第1章 了解ChatGPT的来源快照、输入合同与未知项清单。",
    "第1章 了解ChatGPT故障步骤2：保持第1章 了解ChatGPT的冻结输入、目标函数与预注册预测不变，只检查“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”如何改变第1章 了解ChatGPT的参考状态、训练/推理轨迹与中间证据。",
    "第1章 了解ChatGPT故障步骤3：保持第1章 了解ChatGPT的参考轨迹与保持不变的模型、数据和评估不变，只检查“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”如何改变第1章 了解ChatGPT的首个分岔、传播路径和失败输出。",
    "第1章 了解ChatGPT故障步骤4：保持第1章 了解ChatGPT的故障快照、恢复操作与独立评估不变，只检查“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”如何改变第1章 了解ChatGPT的恢复差分、接受/拒绝理由与交付证据。",
  ],
  gates: [
    {
      label: "书目与研究来源门",
      detail:
        "第1章 了解ChatGPT区分馆藏/数字目录、原始论文、2023产品快照、项目实验和当前未知。",
    },
    {
      label: "数据与状态门",
      detail:
        "第1章 了解ChatGPT的数据切分、tokenizer、模型/算法版本、随机性、训练/推理状态和检查点可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "第1章 了解ChatGPT只注入“用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用”，记录首个分岔并从同一检查点恢复。",
    },
    {
      label: "独立评估与边界门",
      detail:
        "第1章 了解ChatGPT交付历史时间轴、生成轨迹、用例风险矩阵与人工复核记录，并报告代理指标、真实目标、失败与未测试范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function Cgpt01UnderstandingChatgptContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function Cgpt01UnderstandingChatgptComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function Cgpt01UnderstandingChatgptEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
