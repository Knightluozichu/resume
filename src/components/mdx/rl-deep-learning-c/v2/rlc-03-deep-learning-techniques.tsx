"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "rlc-03",
  title: "第3章：深度学习技术",
  question:
    "没有自动微分和张量框架时，怎样证明 C 数组中的每个前向值与反向梯度都对应正确的节点？",
  sourceBoundary:
    "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
  concepts: [
    "第3章 深度学习技术",
    "3.1 实现深度学习的技术",
    "3.1.1 神经元的作用与分层神经网络",
    "3.1.2 分层神经网络的学习",
    "3.1.3 分层网络学习程序一：单神经元程序 nn1.c",
    "3.1.4 分层网络学习程序二：反向传播程序 nn2.c",
    "3.1.5 分层网络学习程序三：多输出程序 nn3.c",
    "3.2 使用卷积神经网络学习",
    "3.2.1 卷积神经网络算法",
    "3.2.2 卷积神经网络的实现",
  ],
  stages: [
    {
      label: "前向传播",
      contract: "逐层计算加权和与激活，索引顺序和层尺寸固定。",
      evidence: "保存一个样本的每层 z、激活值和输出。",
    },
    {
      label: "反向传播",
      contract: "先完成所有局部误差，再统一更新参数，避免新权重泄漏到旧梯度。",
      evidence: "保存输出误差、隐藏误差和更新前后一个权重。",
    },
    {
      label: "卷积计算",
      contract: "固定输入布局、核方向、步幅、填充与输出尺寸。",
      evidence: "手算一个窗口并与循环输出逐元素比较。",
    },
  ],
  normalTrace: [
    "固定两输入、一个隐藏层和目标输出。",
    "保存各层加权和与激活。",
    "用更新前权重传播隐藏层误差。",
    "统一更新参数并执行有限差分检查。",
  ],
  failureTrace: [
    "输入与权重数组的主次序不一致。",
    "偏置在输入循环内被重复添加。",
    "先更新输出权重再计算隐藏误差。",
    "只看总损失下降，不检查单个梯度。",
  ],
  invariant:
    "同一输入和参数快照必须产生相同激活与梯度；解析梯度应在容差内匹配有限差分。",
  formula: "z_j = Σ_i w_ji x_i + b_j; δ_hidden = f'(z) Σ_k w_kj δ_k",
  artifact:
    "层尺寸表、前向激活、输出和隐藏局部误差、更新前参数、有限差分结果与卷积窗口手算。",
  fault: "用已经更新的输出层权重传播隐藏层误差",
} satisfies RlcExperimentModel;

export function Rlc03DeepLearningTechniquesPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function Rlc03DeepLearningTechniquesReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function Rlc03DeepLearningTechniquesFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
