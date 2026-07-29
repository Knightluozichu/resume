"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要 Object Factories",
    mechanism:
      "The Need for Object Factories 出现在 concrete type 只能运行时决定时：配置写着 renderer 名称，network message 携带 message kind，plugin 注册新 decoder。caller 只依赖 abstract produ…",
    failure:
      "若只复制「为什么需要 Object Factories」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么需要 Object Factories」的组合规则与扩展边界。",
  },
  {
    label: "Object Factories in C++：Class…",
    mechanism:
      "Object Factories in C++: Classes and Objects 要区分 compile-time class 与 runtime object。C++ class 本身不是普通值，无法把“某个 class”直接放进 map ; registry 保存的是能构造该 class…",
    failure:
      "若只复制「Object Factories in C++：Class…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Object Factories in C++：Class…」的组合规则与扩展边界。",
  },
  {
    label: "Implementing an Object Factory",
    mechanism:
      "Implementing an Object Factory 通常参数化四件事：abstract product、identifier type、creator type、unknown-ID policy。registry 是 associative map； Register 插入， Unreg…",
    failure:
      "若只复制「Implementing an Object Factory」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Implementing an Object Factory」的组合规则与扩展边界。",
  },
];

export function ObjectFactoriesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第8章：对象工厂：机制与证据"
      prompt="切换《第8章：对象工厂》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第8章：对象工厂》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ObjectFactoriesMechanismMap() {
  return (
    <ChapterMechanismMap title="第8章：对象工厂：机制路径" stages={STAGES} />
  );
}

export function ObjectFactoriesFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第8章：对象工厂：失效与核验" stages={STAGES} />
  );
}
