"use client";

import { DlsEvidenceLab, type DlsEvidenceModel } from "./dls-evidence-lab";

const model = {
  unitId: "dls-05",
  title: "第5章 误差反向传播法",
  question:
    "怎样让每个层的forward缓存和backward局部导数相互对应，并用数值梯度发现实现错误？",
  concepts: [
    "第5章 误差反向传播法",
    "5.1 计算图",
    "5.1.1 用计算图求解",
    "5.1.2 局部计算",
    "5.1.3 为何用计算图解题",
    "5.2 链式法则",
    "5.2.1 计算图的反向传播",
    "5.2.2 什么是链式法则",
    "5.2.3 链式法则和计算图",
    "5.3 反向传播",
    "5.3.1 加法节点的反向传播",
    "5.3.2 乘法节点的反向传播",
    "5.3.3 苹果的例子",
    "5.4 简单层的实现",
    "5.4.1 乘法层的实现",
    "5.4.2 加法层的实现",
    "5.5 激活函数层的实现",
    "5.5.1 ReLU层",
    "5.5.2 Sigmoid层",
    "5.6 Affine/Softmax层的实现",
    "5.6.1 Affine层",
    "5.6.2 批版本的Affine层",
    "5.6.3 Softmax-with-Loss层",
    "5.7 误差反向传播法的实现",
    "5.7.1 神经网络学习的全貌图",
    "5.7.2 对应误差反向传播法的神经网络的实现",
    "5.7.3 误差反向传播法的梯度确认",
    "5.7.4 使用误差反向传播法的学习",
    "5.8 小结",
  ],
  stages: [
    {
      name: "构建计算图",
      input:
        "第5章 误差反向传播法：锁定解释器、依赖、输入与数据角色，保持其余实现合同不变",
      operation:
        "冻结版本、dtype、shape、轴、种子和允许读取的信息，并持续满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”",
      output: "构建计算图产生可追溯输入状态",
      check:
        "可追溯输入状态、shape与数值断言；出现“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”时停止",
    },
    {
      name: "保存前向缓存",
      input:
        "第5章 误差反向传播法：执行本页的前向代码或数组变换，保持其余实现合同不变",
      operation:
        "保存输入输出shape、参数、缓存和数值范围，并持续满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”",
      output: "保存前向缓存产生可重放前向状态",
      check:
        "可重放前向状态、shape与数值断言；出现“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”时停止",
    },
    {
      name: "传播局部梯度",
      input:
        "第5章 误差反向传播法：计算局部导数、数值梯度或状态更新，保持其余实现合同不变",
      operation:
        "保存上游梯度、归约轴、差分步长和相对误差，并持续满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”",
      output: "传播局部梯度产生可复核梯度状态",
      check:
        "可复核梯度状态、shape与数值断言；出现“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”时停止",
    },
    {
      name: "汇总参数梯度",
      input:
        "第5章 误差反向传播法：按固定batch顺序更新参数或组合网络，保持其余实现合同不变",
      operation:
        "保存优化器状态、损失、训练/推理模式和曲线，并持续满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”",
      output: "汇总参数梯度产生可比较训练状态",
      check:
        "可比较训练状态、shape与数值断言；出现“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”时停止",
    },
    {
      name: "数值梯度检查",
      input:
        "第5章 误差反向传播法：执行形状、梯度、复现和独立评估检查，保持其余实现合同不变",
      operation:
        "隔离测试角色并登记版本、失败反例和时间边界，并持续满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”",
      output: "数值梯度检查产生独立实现证据包",
      check:
        "独立实现证据包、shape与数值断言；出现“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "实现Mul/Add/ReLU/Sigmoid/Affine/SoftmaxWithLoss层并对两层网络做梯度检查。 固定环境、数据、shape、初值、顺序、容差和种子。",
      prediction:
        "沿“构建计算图 → 保存前向缓存 → 传播局部梯度 → 汇总参数梯度 → 数值梯度检查”得到可复核实现结果。",
      boundary:
        "全过程必须满足“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”。",
    },
    {
      name: "边界反例",
      observation:
        "实现Mul/Add/ReLU/Sigmoid/Affine/SoftmaxWithLoss层并对两层网络做梯度检查。 其余条件不变，只注入“梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练”。",
      prediction:
        "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第5章 误差反向传播法”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子",
    "执行构建计算图、保存前向缓存，保存输入输出、参数、缓存与数值范围",
    "推进传播局部梯度、汇总参数梯度，记录梯度、更新、损失与训练状态",
    "在数值梯度检查交付节点与边、forward输入输出、缓存、上游/下游梯度shape、参数梯度、差分梯度、相对误差和故障层定位。",
  ],
  faultTrace: [
    "“第5章 误差反向传播法”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子",
    "只改变一个条件：梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练",
    "沿“构建计算图 → 保存前向缓存 → 传播局部梯度 → 汇总参数梯度 → 数值梯度检查”寻找最早的代码、shape、梯度或评估分叉",
    "撤销故障重放；只有“计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定”恢复才接受修正",
  ],
  invariant:
    "计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定",
  fault: "梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练",
  artifact:
    "节点与边、forward输入输出、缓存、上游/下游梯度shape、参数梯度、差分梯度、相对误差和故障层定位。",
  gates: [
    {
      label: "环境、输入与数据角色",
      detail:
        "“第5章 误差反向传播法”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "前向代码与形状",
      detail:
        "“第5章 误差反向传播法”的层、参数、轴、缓存、激活、损失和输出shape已冻结。",
    },
    {
      label: "梯度与训练复现",
      detail:
        "“第5章 误差反向传播法”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。",
    },
    {
      label: "独立评估与边界",
      detail:
        "“第5章 误差反向传播法”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。",
    },
  ],
} as const satisfies DlsEvidenceModel;

export function Dls05BackpropagationTensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function Dls05BackpropagationGradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function Dls05BackpropagationTrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
}
