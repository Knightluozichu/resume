"use client";

import { DlsEvidenceLab, type DlsEvidenceModel } from "./dls-evidence-lab";

const model = {
  unitId: "dls-03",
  title: "第3章 神经网络",
  question:
    "怎样从输入shape逐层追踪矩阵乘法、激活与softmax，并保证批处理和单样本推理一致？",
  concepts: [
    "第3章 神经网络",
    "3.1 从感知机到神经网络",
    "3.1.1 神经网络的例子",
    "3.1.2 复习感知机",
    "3.1.3 激活函数登场",
    "3.2 激活函数",
    "3.2.1 sigmoid函数",
    "3.2.2 阶跃函数的实现",
    "3.2.3 阶跃函数的图形",
    "3.2.4 sigmoid函数的实现",
    "3.2.5 sigmoid函数和阶跃函数的比较",
    "3.2.6 非线性函数",
    "3.2.7 ReLU函数",
    "3.3 多维数组的运算",
    "3.3.1 多维数组",
    "3.3.2 矩阵乘法",
    "3.3.3 神经网络的内积",
    "3.4 3层神经网络的实现",
    "3.4.1 符号确认",
    "3.4.2 各层间信号传递的实现",
    "3.4.3 代码实现小结",
    "3.5 输出层的设计",
    "3.5.1 恒等函数和softmax函数",
    "3.5.2 实现softmax函数时的注意事项",
    "3.5.3 softmax函数的特征",
    "3.5.4 输出层的神经元数量",
    "3.6 手写数字识别",
    "3.6.1 MNIST数据集",
    "3.6.2 神经网络的推理处理",
    "3.6.3 批处理",
    "3.7 小结",
  ],
  stages: [
    {
      name: "登记输入形状",
      input:
        "第3章 神经网络：锁定解释器、依赖、输入与数据角色，保持其余实现合同不变",
      operation:
        "冻结版本、dtype、shape、轴、种子和允许读取的信息，并持续满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”",
      output: "登记输入形状产生可追溯输入状态",
      check:
        "可追溯输入状态、shape与数值断言；出现“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”时停止",
    },
    {
      name: "仿射变换",
      input:
        "第3章 神经网络：执行本页的前向代码或数组变换，保持其余实现合同不变",
      operation:
        "保存输入输出shape、参数、缓存和数值范围，并持续满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”",
      output: "仿射变换产生可重放前向状态",
      check:
        "可重放前向状态、shape与数值断言；出现“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”时停止",
    },
    {
      name: "非线性激活",
      input:
        "第3章 神经网络：计算局部导数、数值梯度或状态更新，保持其余实现合同不变",
      operation:
        "保存上游梯度、归约轴、差分步长和相对误差，并持续满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”",
      output: "非线性激活产生可复核梯度状态",
      check:
        "可复核梯度状态、shape与数值断言；出现“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”时停止",
    },
    {
      name: "稳定输出层",
      input:
        "第3章 神经网络：按固定batch顺序更新参数或组合网络，保持其余实现合同不变",
      operation:
        "保存优化器状态、损失、训练/推理模式和曲线，并持续满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”",
      output: "稳定输出层产生可比较训练状态",
      check:
        "可比较训练状态、shape与数值断言；出现“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”时停止",
    },
    {
      name: "批量推理",
      input:
        "第3章 神经网络：执行形状、梯度、复现和独立评估检查，保持其余实现合同不变",
      operation:
        "隔离测试角色并登记版本、失败反例和时间边界，并持续满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”",
      output: "批量推理产生独立实现证据包",
      check:
        "独立实现证据包、shape与数值断言；出现“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "用NumPy实现三层前向网络，对MNIST小批次比较逐样本与批处理输出。 固定环境、数据、shape、初值、顺序、容差和种子。",
      prediction:
        "沿“登记输入形状 → 仿射变换 → 非线性激活 → 稳定输出层 → 批量推理”得到可复核实现结果。",
      boundary:
        "全过程必须满足“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”。",
    },
    {
      name: "边界反例",
      observation:
        "用NumPy实现三层前向网络，对MNIST小批次比较逐样本与批处理输出。 其余条件不变，只注入“矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别”。",
      prediction:
        "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第3章 神经网络”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子",
    "执行登记输入形状、仿射变换，保存输入输出、参数、缓存与数值范围",
    "推进非线性激活、稳定输出层，记录梯度、更新、损失与训练状态",
    "在批量推理交付输入/权重/偏置shape、各层预激活与激活、softmax平移量、概率和、批索引、预测与吞吐对照。",
  ],
  faultTrace: [
    "“第3章 神经网络”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子",
    "只改变一个条件：矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别",
    "沿“登记输入形状 → 仿射变换 → 非线性激活 → 稳定输出层 → 批量推理”寻找最早的代码、shape、梯度或评估分叉",
    "撤销故障重放；只有“权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定”恢复才接受修正",
  ],
  invariant:
    "权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定",
  fault: "矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别",
  artifact:
    "输入/权重/偏置shape、各层预激活与激活、softmax平移量、概率和、批索引、预测与吞吐对照。",
  gates: [
    {
      label: "环境、输入与数据角色",
      detail:
        "“第3章 神经网络”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "前向代码与形状",
      detail:
        "“第3章 神经网络”的层、参数、轴、缓存、激活、损失和输出shape已冻结。",
    },
    {
      label: "梯度与训练复现",
      detail:
        "“第3章 神经网络”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。",
    },
    {
      label: "独立评估与边界",
      detail:
        "“第3章 神经网络”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。",
    },
  ],
} as const satisfies DlsEvidenceModel;

export function Dls03NeuralNetworkTensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function Dls03NeuralNetworkGradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function Dls03NeuralNetworkTrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
}
