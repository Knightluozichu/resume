"use client";

import { DlsEvidenceLab, type DlsEvidenceModel } from "./dls-evidence-lab";

const model = {
  unitId: "dls-app",
  title: "附录A Softmax-with-Loss层的计算图",
  question:
    "怎样从稳定softmax与交叉熵得到批量反向梯度，并验证标签编码和batch归约因子？",
  concepts: [
    "附录A Softmax-with-Loss层的计算图",
    "A.1 正向传播",
    "A.2 反向传播",
    "A.3 小结",
  ],
  stages: [
    {
      name: "稳定化logit",
      input:
        "附录A Softmax-with-Loss层的计算图：锁定解释器、依赖、输入与数据角色，保持其余实现合同不变",
      operation:
        "冻结版本、dtype、shape、轴、种子和允许读取的信息，并持续满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”",
      output: "稳定化logit产生可追溯输入状态",
      check:
        "可追溯输入状态、shape与数值断言；出现“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”时停止",
    },
    {
      name: "归一概率",
      input:
        "附录A Softmax-with-Loss层的计算图：执行本页的前向代码或数组变换，保持其余实现合同不变",
      operation:
        "保存输入输出shape、参数、缓存和数值范围，并持续满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”",
      output: "归一概率产生可重放前向状态",
      check:
        "可重放前向状态、shape与数值断言；出现“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”时停止",
    },
    {
      name: "计算批损失",
      input:
        "附录A Softmax-with-Loss层的计算图：计算局部导数、数值梯度或状态更新，保持其余实现合同不变",
      operation:
        "保存上游梯度、归约轴、差分步长和相对误差，并持续满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”",
      output: "计算批损失产生可复核梯度状态",
      check:
        "可复核梯度状态、shape与数值断言；出现“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”时停止",
    },
    {
      name: "反传标签差",
      input:
        "附录A Softmax-with-Loss层的计算图：按固定batch顺序更新参数或组合网络，保持其余实现合同不变",
      operation:
        "保存优化器状态、损失、训练/推理模式和曲线，并持续满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”",
      output: "反传标签差产生可比较训练状态",
      check:
        "可比较训练状态、shape与数值断言；出现“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”时停止",
    },
    {
      name: "数值梯度确认",
      input:
        "附录A Softmax-with-Loss层的计算图：执行形状、梯度、复现和独立评估检查，保持其余实现合同不变",
      operation:
        "隔离测试角色并登记版本、失败反例和时间边界，并持续满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”",
      output: "数值梯度确认产生独立实现证据包",
      check:
        "独立实现证据包、shape与数值断言；出现“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "对两样本三分类logit手算Softmax-with-Loss正向与反向。 固定环境、数据、shape、初值、顺序、容差和种子。",
      prediction:
        "沿“稳定化logit → 归一概率 → 计算批损失 → 反传标签差 → 数值梯度确认”得到可复核实现结果。",
      boundary:
        "全过程必须满足“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对两样本三分类logit手算Softmax-with-Loss正向与反向。 其余条件不变，只注入“one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变”。",
      prediction:
        "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录A Softmax-with-Loss层的计算图”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子",
    "执行稳定化logit、归一概率，保存输入输出、参数、缓存与数值范围",
    "推进计算批损失、反传标签差，记录梯度、更新、损失与训练状态",
    "在数值梯度确认交付logit与标签、平移量、指数和、概率、逐样本损失、batch均值、反向梯度、概率和与数值梯度误差。",
  ],
  faultTrace: [
    "“附录A Softmax-with-Loss层的计算图”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子",
    "只改变一个条件：one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变",
    "沿“稳定化logit → 归一概率 → 计算批损失 → 反传标签差 → 数值梯度确认”寻找最早的代码、shape、梯度或评估分叉",
    "撤销故障重放；只有“logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定”恢复才接受修正",
  ],
  invariant: "logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定",
  fault: "one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变",
  artifact:
    "logit与标签、平移量、指数和、概率、逐样本损失、batch均值、反向梯度、概率和与数值梯度误差。",
  gates: [
    {
      label: "环境、输入与数据角色",
      detail:
        "“附录A Softmax-with-Loss层的计算图”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "前向代码与形状",
      detail:
        "“附录A Softmax-with-Loss层的计算图”的层、参数、轴、缓存、激活、损失和输出shape已冻结。",
    },
    {
      label: "梯度与训练复现",
      detail:
        "“附录A Softmax-with-Loss层的计算图”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。",
    },
    {
      label: "独立评估与边界",
      detail:
        "“附录A Softmax-with-Loss层的计算图”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。",
    },
  ],
} as const satisfies DlsEvidenceModel;

export function DlsAppendixSoftmaxLossTensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function DlsAppendixSoftmaxLossGradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function DlsAppendixSoftmaxLossTrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
}
