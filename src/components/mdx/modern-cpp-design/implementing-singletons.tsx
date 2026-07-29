"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么静态函数集合不等于 Singleton",
    mechanism:
      "Static Data + Static Functions != Singleton 。一组静态函数更接近 namespace：没有对象身份、constructor invariant、可替换 implementation 或明确 destruction protocol。Singleton pa…",
    failure:
      "若只复制「为什么静态函数集合不等于 Singleton」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么静态函数集合不等于 Singleton」的组合规则与扩展边界。",
  },
  {
    label: "The Basic C++ Idioms Supporti…",
    mechanism:
      "The Basic C++ Idioms Supporting Singleton 包括 private/protected constructor、deleted copy、static access function、保存 instance pointer，以及延迟初始化。class 自身阻止外部构造，holder 或 friend 负责创建。",
    failure:
      "若只复制「The Basic C++ Idioms Supporti…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「The Basic C++ Idioms Supporti…」的组合规则与扩展边界。",
  },
  {
    label: "Enforcing the Singleton's Uni…",
    mechanism:
      "Enforcing the Singleton's Uniqueness 不只把 constructor private。还要禁止 copy/assignment，控制 derived construction，避免另一个 module 各自实例化 header-only holder，并定义 sh…",
    failure:
      "若只复制「Enforcing the Singleton's Uni…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Enforcing the Singleton's Uni…」的组合规则与扩展边界。",
  },
];

export function ImplementingSingletonsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章：实现 Singletons：机制与证据"
      prompt="切换《第6章：实现 Singletons》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章：实现 Singletons》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ImplementingSingletonsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第6章：实现 Singletons：机制路径"
      stages={STAGES}
    />
  );
}

export function ImplementingSingletonsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第6章：实现 Singletons：失效与核验"
      stages={STAGES}
    />
  );
}
