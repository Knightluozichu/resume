"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "rlc-01",
  title: "第1章：强化学习与深度学习",
  question:
    "深度学习在强化学习中究竟替代了什么，又有哪些目标和边界完全没有改变？",
  sourceBoundary:
    "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
  concepts: [
    "第1章 强化学习与深度学习",
    "1.1 机器学习与强化学习",
    "1.1.1 人工智能",
    "1.1.2 机器学习",
    "1.1.3 强化学习",
    "1.2 什么是深度学习",
    "1.2.1 神经网络",
    "1.2.2 深度学习的出现",
    "1.3 什么是深度强化学习",
    "1.3.1 强化学习与深度学习",
    "1.3.2 深度强化学习的实现",
    "1.3.3 基础机器学习系统示例：示例程序运行方法",
  ],
  stages: [
    {
      label: "定义任务",
      contract: "声明智能体、环境、状态、动作、奖励和 episode 终止条件。",
      evidence: "给出一个完整转移记录并解释每个字段。",
    },
    {
      label: "计算回报",
      contract: "明确折扣方向和奖励时间下标，不把即时奖励等同长期回报。",
      evidence: "对三步轨迹手算折扣回报并核对边界值。",
    },
    {
      label: "选择表示",
      contract: "小空间用 Q 表，大空间用参数模型近似同一 Q(s,a)。",
      evidence: "比较参数数量、可泛化性和近似误差，不声称网络天然更准确。",
    },
  ],
  normalTrace: [
    "环境返回下一状态、即时奖励和终止标记。",
    "智能体把奖励放入回报或 TD 目标。",
    "Q 表或网络输出表示同一个状态动作价值。",
    "策略依据当前价值选择下一动作。",
  ],
  failureTrace: [
    "把监督学习标签误当作环境奖励。",
    "把单步奖励误当作整个 episode 回报。",
    "用不同任务比较表格和网络。",
    "宣称增加网络层数会自动改变强化学习目标。",
  ],
  invariant:
    "无论使用表格还是网络，环境转移、奖励语义与最大化期望回报的目标保持不变。",
  formula: "G_t = Σ γ^k r_(t+k+1); Q(s,a) ≈ f_θ(s)_a",
  artifact:
    "术语边界图、三步回报手算、同任务的表格与网络接口、状态动作尺寸和冻结评价记录。",
  fault: "把网络预测误写成环境奖励",
} satisfies RlcExperimentModel;

export function Rlc01RlDeepLearningPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function Rlc01RlDeepLearningReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function Rlc01RlDeepLearningFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
