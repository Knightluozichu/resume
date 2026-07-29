"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么要按官方 11 章重建路线",
    mechanism:
      "第一版明确分成 Part I Techniques （第1-4章）与 Part II Components （第5-11章）。前者不是零散模板技巧，而是逐层建立设计语言：Policy 描述变化轴，compile-time techniques 提供检测/映射，Typelist 提供类型 schema…",
    failure:
      "若只复制「为什么要按官方 11 章重建路线」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么要按官方 11 章重建路线」的组合规则与扩展边界。",
  },
  {
    label: "第一阶段：第1章先学变化轴",
    mechanism:
      "第1章从 do-it-all interface 与 inheritance matrix 失败出发，要求把独立变化原因拆成 Policies，由 Host 编排。它同时强调 enriched policy、destructor、incomplete instantiation、structure …",
    failure:
      "若只复制「第一阶段：第1章先学变化轴」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「第一阶段：第1章先学变化轴」的组合规则与扩展边界。",
  },
  {
    label: "第二阶段：第2-3章建立元编程语言",
    mechanism:
      "第2章给出 static assert 前身、partial specialization、local class、Int2Type、Type2Type、Select、convertibility detection、TypeInfo 与 Type Traits。第3章再把类型组成 sequence…",
    failure:
      "若只复制「第二阶段：第2-3章建立元编程语言」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「第二阶段：第2-3章建立元编程语言」的组合规则与扩展边界。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Modern C++ Design：官方十一章学习路线：机制与证据"
      prompt="切换《Modern C++ Design：官方十一章学习路线》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Modern C++ Design：官方十一章学习路线》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Modern C++ Design：官方十一章学习路线：机制路径"
      stages={STAGES}
    />
  );
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Modern C++ Design：官方十一章学习路线：失效与核验"
      stages={STAGES}
    />
  );
}
