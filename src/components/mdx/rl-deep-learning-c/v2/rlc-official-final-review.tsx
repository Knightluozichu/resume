"use client";

import { RlcExperimentLab, type RlcExperimentModel } from "./rl-experiment-lab";

const model = {
  unitId: "review",
  title: "《强化学习与深度学习：C语言模拟》总复习",
  question:
    "怎样用一份证据包证明四章不是分别背过，而是能在同一任务上从环境追到参数更新和评价结果？",
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
      label: "基线",
      contract: "从零初始化环境、Q 表、网络和随机数状态。",
      evidence: "保存四章共同输入和一次完整训练评价轨迹。",
    },
    {
      label: "故障",
      contract: "一次只启用一个错误：越界、终止自举、梯度快照或评价写入。",
      evidence: "定位首个不同的数组元素、目标值或参数字节。",
    },
    {
      label: "恢复",
      contract: "修正缺陷后从相同初值和随机序列重放。",
      evidence: "比较基线与恢复轨迹，确认差异消失而非被后续训练掩盖。",
    },
    {
      label: "复位",
      contract: "清除所有交互状态并回到同一初始快照。",
      evidence: "初值哈希、首个转移和首个网络输出与基线一致。",
    },
  ],
  normalTrace: [
    "读取固定迷宫并验证合法动作表。",
    "手算并执行一个非终止和一个终止 Q 更新。",
    "对一个网络权重完成解析梯度与有限差分对照。",
    "构造单动作目标向量并冻结评价。",
  ],
  failureTrace: [
    "状态编号越界但最终仍偶然到达目标。",
    "终止自举让 TD 目标从第一步就偏离。",
    "更新后权重进入同一步隐藏层梯度。",
    "评价继续学习使两次运行不可比较。",
  ],
  invariant:
    "重置后首个状态、首个 TD 目标、首个网络输出和评价参数哈希必须与基线完全一致。",
  formula:
    "replay = initial state + random sequence + transition + target + update + frozen evaluation",
  artifact:
    "36 节点清单、编译告警、数组断言、两次手算更新、梯度检查、目标向量差异、参数哈希和四条轨迹。",
  fault: "只恢复界面选择，不恢复 Q 表和网络参数",
} satisfies RlcExperimentModel;

export function RlcOfficialFinalReviewPipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function RlcOfficialFinalReviewReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function RlcOfficialFinalReviewFaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
