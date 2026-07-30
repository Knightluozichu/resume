"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "rlc-04",
  title: "第4章：深度强化学习",
  question:
    "把 Q 表换成网络后，怎样只训练被选动作，又不破坏其他动作当前估计和终止状态边界？",
  sourceBoundary:
    "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
  concepts: [
    "第4章 深度强化学习",
    "4.1 融合强化学习与深度学习",
    "4.1.1 把神经网络用于 Q 学习",
    "4.1.2 Q 学习与神经网络的融合",
    "4.2 深度强化学习的实现",
    "4.2.1 分支迷宫深度强化学习程序 q21dl.c",
    "4.2.2 寻找目标的深度学习程序 q22dl.c",
  ],
  stages: [
    {
      label: "编码状态",
      contract: "状态编号稳定映射为固定长度输入，训练与评价共用同一编码。",
      evidence: "保存原状态、输入向量和动作输出次序。",
    },
    {
      label: "构造 TD 目标",
      contract: "终止时未来值为零，非终止时只在合法动作输出中取最大值。",
      evidence: "记录当前输出、下一状态输出、动作掩码和标量 TD 目标。",
    },
    {
      label: "训练所选动作",
      contract: "先复制全部当前输出，只替换所选动作位置，再反向传播。",
      evidence: "比较目标向量与原输出，确认只有一个元素改变。",
    },
    {
      label: "冻结评价",
      contract: "关闭随机探索、梯度和权重写入，从固定初态重放。",
      evidence: "保存评价前后参数哈希和完整动作轨迹。",
    },
  ],
  normalTrace: [
    "把状态二编码为固定输入向量。",
    "网络输出三个动作的当前 Q 估计。",
    "复制输出并只替换实际动作的 TD 目标。",
    "训练一次后冻结参数，从固定初态评价。",
  ],
  failureTrace: [
    "训练与评价使用不同状态编码。",
    "把非法动作输出加入下一状态最大值。",
    "用同一个 TD 标量覆盖全部动作目标。",
    "评价仍随机探索并更新参数。",
  ],
  invariant:
    "单次转移的目标向量只有所选动作位置允许变化，评价前后参数必须逐字节一致。",
  formula:
    "target[:] = Q_θ(s,:); target[action] = r + (done ? 0 : γ max Q_θ(next,:))",
  artifact:
    "状态编码、当前与下一状态输出、合法动作掩码、目标向量差异、梯度更新和评价前后参数哈希。",
  fault: "用一个 TD 目标覆盖全部动作输出",
} satisfies RlcExperimentModel;

export function Rlc04DeepReinforcementLearningPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function Rlc04DeepReinforcementLearningReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function Rlc04DeepReinforcementLearningFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
