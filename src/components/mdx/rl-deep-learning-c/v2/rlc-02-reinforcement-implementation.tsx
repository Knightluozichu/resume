"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "rlc-02",
  title: "第2章：强化学习的实现",
  question:
    "怎样证明一次 Q 更新使用的是旧值、合法动作和正确的终止语义，而不是“看起来收敛”的偶然运行？",
  sourceBoundary:
    "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
  concepts: [
    "第2章 强化学习的实现",
    "2.1 强化学习与 Q 学习",
    "2.1.1 强化学习的思路",
    "2.1.2 Q 学习算法",
    "2.2 Q 学习的实现",
    "2.2.1 q21.c 程序实现",
    "2.2.2 例题二：寻找目标的学习程序",
  ],
  stages: [
    {
      label: "采样转移",
      contract: "环境独立返回状态、动作、奖励、下一状态和终止标记。",
      evidence: "保存固定种子下的动作来源、合法动作集和转移五元组。",
    },
    {
      label: "计算目标",
      contract: "非终止时只在下一状态合法动作中取最大值，终止时未来项为零。",
      evidence: "记录即时奖励、下一状态最大值、折扣和完整 TD 目标。",
    },
    {
      label: "原位更新",
      contract: "先保存旧 Q，再计算误差，最后只写一个状态动作单元。",
      evidence: "输出旧值、目标、误差和新值，验证其他单元未变化。",
    },
  ],
  normalTrace: [
    "从状态二按固定种子选择合法动作一。",
    "环境返回奖励零、下一状态三、未终止。",
    "用下一状态合法动作最大值构造 TD 目标。",
    "只更新 Q[2][1] 并保存前后值。",
  ],
  failureTrace: [
    "argmax 读入墙体对应的非法动作。",
    "终止状态仍读取未初始化的下一状态 Q。",
    "原位更新后的值被同一步再次用于目标。",
    "累计奖励上升掩盖了单元级错误。",
  ],
  invariant:
    "一次转移只允许一个 Q 单元变化，且终止转移的目标不包含任何下一状态价值。",
  formula: "target = r + (done ? 0 : γ max_a Q[next][a]); Q += α(target - Q)",
  artifact:
    "固定种子、合法动作列表、转移五元组、旧 Q、TD 目标、TD 误差、新 Q 和终止分支日志。",
  fault: "终止状态继续自举下一状态价值",
} satisfies RlcExperimentModel;

export function Rlc02ReinforcementImplementationPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function Rlc02ReinforcementImplementationReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function Rlc02ReinforcementImplementationFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
