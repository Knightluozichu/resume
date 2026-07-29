"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从示例上升为可重复的工作协议",
    mechanism:
      "上一章展示了 Soundex 的连续小步。本章回答更一般的问题：什么算单元测试，红绿重构为何必须按顺序，三条规则如何限制步幅，卡在红灯时怎样前进，以及团队为何常在“测试太慢”“需求太急”时放弃纪律。",
    failure:
      "若把「从示例上升为可重复的工作协议」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「从示例上升为可重复的工作协议」是否提供快速反馈。",
  },
  {
    label: "TDD 是设计反馈，不是测试数量竞赛",
    mechanism:
      "TDD 的直接产物是测试，但主要价值是更早暴露接口难用、责任混合和依赖不可控。先站在调用者角度写示例，会迫使代码在实现之前回答：输入怎样表达，结果怎样观察，失败怎样报告，协作者怎样替换。",
    failure:
      "若把「TDD 是设计反馈，不是测试数量竞赛」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「TDD 是设计反馈，不是测试数量竞赛」是否提供快速反馈。",
  },
  {
    label: "条规则把步幅压缩到可诊断范围",
    mechanism:
      "第一条阻止无需求证据的生产代码；第二条阻止一次写出大量测试；第三条阻止为了想象中的未来提前一般化。它们不是法律，也不禁止思考，而是让每次变化足够小，以便失败时能立即指出原因。",
    failure:
      "若把「条规则把步幅压缩到可诊断范围」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「条规则把步幅压缩到可诊断范围」是否提供快速反馈。",
  },
];

export function TddFoundationsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 3：Test-Driven Development Foundations：机制与证据"
      prompt="切换《Chapter 3：Test-Driven Development Foundations》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 3：Test-Driven Development Foundations》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TddFoundationsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 3：Test-Driven Development Foundations：机制路径"
      stages={STAGES}
    />
  );
}

export function TddFoundationsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 3：Test-Driven Development Foundations：失效与核验"
      stages={STAGES}
    />
  );
}
