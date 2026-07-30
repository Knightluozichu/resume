"use client";

import { DlsEvidenceLab, type DlsEvidenceModel } from "./dls-evidence-lab";

const model = {
  unitId: "dls-07",
  title: "第7章 卷积神经网络",
  question:
    "怎样从卷积几何推导输出shape，并证明im2col实现与直接卷积在前向和反向上等价？",
  concepts: [
    "第7章 卷积神经网络",
    "7.1 整体结构",
    "7.2 卷积层",
    "7.2.1 全连接层存在的问题",
    "7.2.2 卷积运算",
    "7.2.3 填充",
    "7.2.4 步幅",
    "7.2.5 3维数据的卷积运算",
    "7.2.6 结合方块思考",
    "7.2.7 批处理",
    "7.3 池化层",
    "7.3.1 池化层的特征",
    "7.4 卷积层和池化层的实现",
    "7.4.1 4维数组",
    "7.4.2 基于im2col的展开",
    "7.4.3 卷积层的实现",
    "7.4.4 池化层的实现",
    "7.5 CNN的实现",
    "7.6 CNN的可视化",
    "7.6.1 第1层权重的可视化",
    "7.6.2 基于分层结构的信息提取",
    "7.7 具有代表性的CNN",
    "7.7.1 LeNet",
    "7.7.2 AlexNet",
    "7.8 小结",
  ],
  stages: [
    {
      name: "标注四维形状",
      input:
        "第7章 卷积神经网络：锁定解释器、依赖、输入与数据角色，保持其余实现合同不变",
      operation:
        "冻结版本、dtype、shape、轴、种子和允许读取的信息，并持续满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”",
      output: "标注四维形状产生可追溯输入状态",
      check:
        "可追溯输入状态、shape与数值断言；出现“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”时停止",
    },
    {
      name: "展开局部窗口",
      input:
        "第7章 卷积神经网络：执行本页的前向代码或数组变换，保持其余实现合同不变",
      operation:
        "保存输入输出shape、参数、缓存和数值范围，并持续满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”",
      output: "展开局部窗口产生可重放前向状态",
      check:
        "可重放前向状态、shape与数值断言；出现“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”时停止",
    },
    {
      name: "执行卷积",
      input:
        "第7章 卷积神经网络：计算局部导数、数值梯度或状态更新，保持其余实现合同不变",
      operation:
        "保存上游梯度、归约轴、差分步长和相对误差，并持续满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”",
      output: "执行卷积产生可复核梯度状态",
      check:
        "可复核梯度状态、shape与数值断言；出现“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”时停止",
    },
    {
      name: "池化与反向",
      input:
        "第7章 卷积神经网络：按固定batch顺序更新参数或组合网络，保持其余实现合同不变",
      operation:
        "保存优化器状态、损失、训练/推理模式和曲线，并持续满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”",
      output: "池化与反向产生可比较训练状态",
      check:
        "可比较训练状态、shape与数值断言；出现“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”时停止",
    },
    {
      name: "对照直接实现",
      input:
        "第7章 卷积神经网络：执行形状、梯度、复现和独立评估检查，保持其余实现合同不变",
      operation:
        "隔离测试角色并登记版本、失败反例和时间边界，并持续满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”",
      output: "对照直接实现产生独立实现证据包",
      check:
        "独立实现证据包、shape与数值断言；出现“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "对小型多通道图像手算卷积，再实现im2col CNN并可视化第一层滤波器。 固定环境、数据、shape、初值、顺序、容差和种子。",
      prediction:
        "沿“标注四维形状 → 展开局部窗口 → 执行卷积 → 池化与反向 → 对照直接实现”得到可复核实现结果。",
      boundary:
        "全过程必须满足“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对小型多通道图像手算卷积，再实现im2col CNN并可视化第一层滤波器。 其余条件不变，只注入“输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位”。",
      prediction:
        "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第7章 卷积神经网络”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子",
    "执行标注四维形状、展开局部窗口，保存输入输出、参数、缓存与数值范围",
    "推进执行卷积、池化与反向，记录梯度、更新、损失与训练状态",
    "在对照直接实现交付NCHW与核shape、输出公式、窗口索引、im2col矩阵、卷积/池化输出、反向col2im、直接实现差值和滤波器图。",
  ],
  faultTrace: [
    "“第7章 卷积神经网络”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子",
    "只改变一个条件：输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位",
    "沿“标注四维形状 → 展开局部窗口 → 执行卷积 → 池化与反向 → 对照直接实现”寻找最早的代码、shape、梯度或评估分叉",
    "撤销故障重放；只有“NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定”恢复才接受修正",
  ],
  invariant: "NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定",
  fault: "输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位",
  artifact:
    "NCHW与核shape、输出公式、窗口索引、im2col矩阵、卷积/池化输出、反向col2im、直接实现差值和滤波器图。",
  gates: [
    {
      label: "环境、输入与数据角色",
      detail:
        "“第7章 卷积神经网络”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "前向代码与形状",
      detail:
        "“第7章 卷积神经网络”的层、参数、轴、缓存、激活、损失和输出shape已冻结。",
    },
    {
      label: "梯度与训练复现",
      detail:
        "“第7章 卷积神经网络”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。",
    },
    {
      label: "独立评估与边界",
      detail:
        "“第7章 卷积神经网络”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。",
    },
  ],
} as const satisfies DlsEvidenceModel;

export function Dls07CnnTensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function Dls07CnnGradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function Dls07CnnTrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
}
