"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.1",
  title: "6.1 · Event-Driven Simulation",
  focus: "用未来事件优先队列、碰撞预测和失效检测推进硬盘粒子系统",
  formula: "每次有效碰撞更新 O(1) 粒子并安排 O(N) 新预测；队列操作为 O(log Q)",
  invariant:
    "模拟时钟单调前进；只有参与粒子的碰撞计数仍与预测时一致的事件才有效",
  fault: "粒子发生一次碰撞后仍执行队列中基于旧速度预测的后续事件",
  evidence:
    "粒子位置/速度、模拟时钟、事件时间、碰撞计数、有效标记、能量动量与重放轨迹",
  concepts: [
    "event-driven simulation",
    "事件驱动模拟",
    "hard-disc model",
    "硬盘粒子模型",
    "collision prediction",
    "碰撞预测",
    "collision resolution",
    "碰撞响应",
    "priority queue of future events",
    "未来事件优先队列",
    "invalidated events",
    "失效事件",
  ],
  trace: [
    "预测未来碰撞",
    "插入最早事件",
    "移动全部粒子",
    "验证并响应碰撞",
    "作废旧事件并重预测",
  ],
  scenarios: [
    {
      label: "失效事件",
      input: "粒子 A 先与 B 碰撞，队列里仍有旧预测 A-C",
      expected: "A 的碰撞计数变化使旧 A-C 事件失效",
    },
    {
      label: "墙面碰撞",
      input: "粒子到达竖直墙且水平速度为正",
      expected: "只反转水平速度，时间、位置和动能保持可核对",
    },
  ],
} satisfies Algs4SectionModel;

export function EventDrivenSimulationModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function EventDrivenSimulationTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function EventDrivenSimulationCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
