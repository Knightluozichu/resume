"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "TDD 之外没有单一测试层",
    mechanism:
      "前面章节主要使用快速单元测试推动设计，但产品还需要证明真实适配器、完整工作流和性能质量。本章把这些证据放回同一反馈系统，并提供两项小步启发式：Transformation Priority Premise 与 assertions-first。",
    failure:
      "若把「TDD 之外没有单一测试层」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「TDD 之外没有单一测试层」是否提供快速反馈。",
  },
  {
    label: "单元、集成与验收回答不同问题",
    mechanism:
      "单元测试告诉我们折扣规则是否正确；集成测试告诉我们数据库能否保存读取相同 Money 与时区；验收测试告诉我们用户付款后能否看到已支付收据。三者重叠一些路径，但失败定位、速度和责任不同。",
    failure:
      "若把「单元、集成与验收回答不同问题」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「单元、集成与验收回答不同问题」是否提供快速反馈。",
  },
  {
    label: "从验收例下沉到实现小步",
    mechanism:
      "一个业务验收例可以先红，表示能力尚未交付；开发中再把它分解为多个单元红灯和必要集成契约。外层场景不必在每行代码后运行，但应在关键绿点和 CI 保持可见。",
    failure:
      "若把「从验收例下沉到实现小步」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「从验收例下沉到实现小步」是否提供快速反馈。",
  },
];

export function AdditionalTddConceptsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 10：Additional TDD Concepts and Discussions：机制与证据"
      prompt="切换《Chapter 10：Additional TDD Concepts and Discussions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 10：Additional TDD Concepts and Discussions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AdditionalTddConceptsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 10：Additional TDD Concepts and Discussions：机制路径"
      stages={STAGES}
    />
  );
}

export function AdditionalTddConceptsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 10：Additional TDD Concepts and Discussions：失效与核验"
      stages={STAGES}
    />
  );
}
