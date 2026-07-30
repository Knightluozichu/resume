"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "map",
  title: "《强化学习与深度学习：C语言模拟》学习地图",
  question:
    "怎样把四章排成一条能运行、能定位首个错误状态、又不越过 2017 年原书边界的学习路径？",
  sourceBoundary:
    "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
  concepts: [
    "第1章 强化学习与深度学习",
    "第2章 强化学习的实现",
    "第3章 深度学习技术",
    "第4章 深度强化学习",
  ],
  stages: [
    {
      label: "环境与状态",
      contract: "固定状态编号、合法动作、转移函数、奖励和终止条件。",
      evidence: "保存同一状态动作的下一状态、奖励、终止标记与随机种子。",
    },
    {
      label: "表格型 Q 学习",
      contract: "旧 Q、TD 目标与新 Q 分开存放，终止状态未来价值为零。",
      evidence: "手算一次更新并逐项对照数组索引、学习率和折扣因子。",
    },
    {
      label: "神经网络学习",
      contract: "声明各层尺寸、激活、偏置与权重更新次序。",
      evidence: "保存前向激活、局部误差、一个权重的数值梯度检查。",
    },
    {
      label: "融合与评价",
      contract: "目标向量只替换被选动作；评价关闭探索和学习。",
      evidence: "对照表格基线、融合训练与冻结评价的三条轨迹。",
    },
  ],
  normalTrace: [
    "固定迷宫、随机种子和所有数组初值。",
    "重放一个终止前转移并手算 TD 目标。",
    "把所选动作目标送入网络，保留其他动作当前预测。",
    "冻结参数执行评价，核对轨迹可重复。",
  ],
  failureTrace: [
    "沿用上一轮隐藏状态或未初始化数组。",
    "终止状态仍读取下一状态价值。",
    "网络目标覆盖所有动作输出。",
    "评价继续探索和更新，结果无法比较。",
  ],
  invariant: "相同初值和随机序列必须得到相同的状态、目标、参数更新与评价轨迹。",
  formula:
    "transition → TD target → Q update → network target → frozen evaluation",
  artifact:
    "四章目录映射、状态转移表、一次 Q 更新、一次前向反向记录、融合目标向量和冻结评价日志。",
  fault: "让评价阶段继续写入参数",
} satisfies RlcExperimentModel;

export function RlcOfficialLearningMapPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function RlcOfficialLearningMapReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function RlcOfficialLearningMapFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
