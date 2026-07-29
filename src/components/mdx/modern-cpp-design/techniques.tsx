"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要一章 Techniques",
    mechanism:
      "Policy 设计提出“让类型表达设计决定”，但 2001 年的 C++ 没有 static assert 、variadic templates、 std::type traits 或 concepts。第 2 章 Techniques 因而建立一套微型语言：把整数包装成类型、把类型包装成值、用 …",
    failure:
      "若只复制「为什么需要一章 Techniques」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么需要一章 Techniques」的组合规则与扩展边界。",
  },
  {
    label: "Compile-Time Assertions",
    mechanism:
      "书中的 Compile-Time Assertions 通过“只有 true 特化存在”的模板制造 incomplete type 错误。现代 C++ 应直接用 static assert(condition, message) ，因为诊断稳定、作用域清晰，也不会依赖负数组等非标准技巧。",
    failure:
      "若只复制「Compile-Time Assertions」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Compile-Time Assertions」的组合规则与扩展边界。",
  },
  {
    label: "Partial Template Specializati…",
    mechanism:
      "Partial Template Specialization 为一类“类型形状”提供规则，例如任意 T 、 const T 或 Container 。primary template 是默认规则，partial specialization 比默认更具体，full specialization 则匹配一个确切参数集合。",
    failure:
      "若只复制「Partial Template Specializati…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Partial Template Specializati…」的组合规则与扩展边界。",
  },
];

export function TechniquesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章：模板技术工具箱：机制与证据"
      prompt="切换《第2章：模板技术工具箱》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章：模板技术工具箱》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TechniquesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第2章：模板技术工具箱：机制路径"
      stages={STAGES}
    />
  );
}

export function TechniquesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第2章：模板技术工具箱：失效与核验"
      stages={STAGES}
    />
  );
}
