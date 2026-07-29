"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一个“什么都能做”的 Manager 开始",
    mechanism:
      "The Multiplicity of Software Design 指同一组件常同时面对多种合理选择：对象可以用 new 、 malloc 或 prototype 创建；生命周期可以普通销毁、允许 dead reference 后重生，或按 longevity 排序；同步可以无锁、对象级锁或类级…",
    failure:
      "若只复制「从一个“什么都能做”的 Manager 开始」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「从一个“什么都能做”的 Manager 开始」的组合规则与扩展边界。",
  },
  {
    label: "Multiple Inheritance to the R…",
    mechanism:
      "一种自然修补是为每个选择建派生类，再通过 multiple inheritance to the rescue 组合它们。但若继承树同时承担“对象是什么”和“行为如何变化”，每个交叉组合仍可能需要一个命名派生类，constructor forwarding、diamond、virtual base 与 ownership 使结构迅速复杂。",
    failure:
      "若只复制「Multiple Inheritance to the R…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Multiple Inheritance to the R…」的组合规则与扩展边界。",
  },
  {
    label: "Policies and Policy Classes",
    mechanism:
      "Policies and Policy Classes 把一个变化轴封装为小类。Policy 不代表业务实体，而代表一种设计决定；Host 通过私有继承、公开继承或成员持有它。策略协议通常由用法隐式表达，现代 C++ 可以再用 concept 或 static assert 给出可读诊断。",
    failure:
      "若只复制「Policies and Policy Classes」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Policies and Policy Classes」的组合规则与扩展边界。",
  },
];

export function PolicyBasedClassDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章：基于 Policy 的类设计：机制与证据"
      prompt="切换《第1章：基于 Policy 的类设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章：基于 Policy 的类设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PolicyBasedClassDesignMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第1章：基于 Policy 的类设计：机制路径"
      stages={STAGES}
    />
  );
}

export function PolicyBasedClassDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第1章：基于 Policy 的类设计：失效与核验"
      stages={STAGES}
    />
  );
}
