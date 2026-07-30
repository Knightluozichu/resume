"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "lsl-mathematical-notation",
  title: "数学符号",
  question:
    "数学符号怎样成为可执行检查，而不是脱离张量轴、批次和归约方式的装饰？",
  concepts: ["数学符号"],
  invariant:
    "数学符号的版次、数据、模型/算法状态、计算拓扑、输出、评估和适用边界始终可追溯",
  fault: "在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度",
  artifact: "符号表、shape账本、单位检查、最小手算和数值梯度差分",
  stages: [
    {
      name: "数学符号 · 版次与输入",
      input:
        "在作者公开第一版完整稿与锁定的一手研究边界内重放数学符号、张量对象、概率测度与数值检查",
      operation:
        "冻结数学符号、张量对象、概率测度与数值检查的来源、数据、模型、代码、硬件、版本和评估集",
      output: "数学符号的来源快照、输入合同、版本差分与未知项",
      check: "数学符号没有把第二版、当前API或二手总结冒充第一版事实",
    },
    {
      name: "数学符号 · 状态与目标",
      input: "数学符号的冻结输入、目标函数与预注册预测",
      operation:
        "把标量、向量、矩阵、张量、概率、梯度、损失和复杂度绑定到shape与单位",
      output: "数学符号的参考状态、计算/训练/服务轨迹与中间证据",
      check: "数学符号的每一步可由同一数据、参数、拓扑、随机种子和顺序复算",
    },
    {
      name: "数学符号 · 单故障",
      input: "数学符号的参考轨迹与保持不变的版次、数据、模型和评估",
      operation:
        "只注入“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”",
      output: "数学符号的首个分岔、传播路径和失败输出",
      check: "数学符号没有同时更换数据、模型、并行策略、应用框架和评价标准",
    },
    {
      name: "数学符号 · 恢复与发布",
      input: "数学符号的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: "数学符号的恢复差分、接受/拒绝理由与交付证据",
      check:
        "数学符号满足“数学符号的版次、数据、模型/算法状态、计算拓扑、输出、评估和适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "数学符号 · 参考",
      setup:
        "固定在作者公开第一版完整稿与锁定的一手研究边界内重放数学符号、张量对象、概率测度与数值检查的输入、版本、随机性、拓扑和执行顺序",
      prediction:
        "数学符号应持续满足“数学符号的版次、数据、模型/算法状态、计算拓扑、输出、评估和适用边界始终可追溯”",
      boundary: "数学符号只回答本页正式坐标与已运行数据、模型和环境",
    },
    {
      name: "数学符号 · 单故障",
      setup:
        "保持其余条件不变，只注入“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”",
      prediction: "数学符号应出现可定位的首个状态分岔，而不是只有末端分数变化",
      boundary: "数学符号的故障结果不能外推到第二版、未测试模型或部署",
    },
    {
      name: "数学符号 · 恢复",
      setup: "撤销故障并从同一检查点重放数学符号、张量对象、概率测度与数值检查",
      prediction: "数学符号的状态、输出与独立评估应恢复参考路径",
      boundary: "数学符号若不能恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "数学符号参考步骤1：冻结数学符号、张量对象、概率测度与数值检查的来源、数据、模型、代码、硬件、版本和评估集；保存数学符号的来源快照、输入合同、版本差分与未知项并断言数学符号没有把第二版、当前API或二手总结冒充第一版事实。",
    "数学符号参考步骤2：把标量、向量、矩阵、张量、概率、梯度、损失和复杂度绑定到shape与单位；保存数学符号的参考状态、计算/训练/服务轨迹与中间证据并断言数学符号的每一步可由同一数据、参数、拓扑、随机种子和顺序复算。",
    "数学符号参考步骤3：只注入“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”；保存数学符号的首个分岔、传播路径和失败输出并断言数学符号没有同时更换数据、模型、并行策略、应用框架和评价标准。",
    "数学符号参考步骤4：撤销单一故障，从同一检查点重放并检查分布外边界；保存数学符号的恢复差分、接受/拒绝理由与交付证据并断言数学符号满足“数学符号的版次、数据、模型/算法状态、计算拓扑、输出、评估和适用边界始终可追溯”。",
  ],
  faultTrace: [
    "数学符号故障步骤1：保持在作者公开第一版完整稿与锁定的一手研究边界内重放数学符号、张量对象、概率测度与数值检查不变，只检查“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”如何改变数学符号的来源快照、输入合同、版本差分与未知项。",
    "数学符号故障步骤2：保持数学符号的冻结输入、目标函数与预注册预测不变，只检查“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”如何改变数学符号的参考状态、计算/训练/服务轨迹与中间证据。",
    "数学符号故障步骤3：保持数学符号的参考轨迹与保持不变的版次、数据、模型和评估不变，只检查“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”如何改变数学符号的首个分岔、传播路径和失败输出。",
    "数学符号故障步骤4：保持数学符号的故障快照、恢复操作与独立评估不变，只检查“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”如何改变数学符号的恢复差分、接受/拒绝理由与交付证据。",
  ],
  gates: [
    {
      label: "第一版来源门",
      detail:
        "数学符号区分作者301页公开稿、出版社320页纸书、第二版和当前技术文档。",
    },
    {
      label: "数据与计算门",
      detail:
        "数学符号的数据、tokenizer、模型状态、并行拓扑、随机性和检查点可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "数学符号只注入“在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度”，记录首个分岔并从同一检查点恢复。",
    },
    {
      label: "评估与边界门",
      detail:
        "数学符号交付符号表、shape账本、单位检查、最小手算和数值梯度差分，并报告污染、代理指标、失败和未测试范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function LslMathematicalNotationContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function LslMathematicalNotationComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function LslMathematicalNotationEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
