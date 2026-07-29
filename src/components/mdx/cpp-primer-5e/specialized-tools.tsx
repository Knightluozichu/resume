"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要这些特殊工具",
    mechanism:
      '你已经走完了 C++ 的核心旅程——变量、容器、算法、类、模板、继承。这些构成了你日常编程的 95%。但还有一批"特种工具"——它们不常用，可一旦进入某些特定领域，不用它就写不出正确代码。这些工具是 C++ 的"精密手术刀"——普通场景用不上，关键场景少了不行。',
    failure:
      "若把「为什么需要这些特殊工具」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么需要这些特殊工具」的契约。",
  },
  {
    label: "placement new：在指定地址上构造对象",
    mechanism:
      "普通的 new 做了两件事——先向系统要一块内存（ operator new ），在这块内存上调构造函数初始化对象。两者一步完成——你写 new T() ，对象创建好、内存也分配好了， delete 时析构加释放也是一步到位。但有时你需要把这两步拆开——比如你要重复使用一块已分配的大内存，不希望每次…",
    failure:
      "若把「placement new：在指定地址上构造对象」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「placement new：在指定地址上构造对象」的契约。",
  },
  {
    label: "RTTI：运行时的类型识别与安全导航",
    mechanism:
      '当程序在运行时——一个基类指针 Base bp 可能真的指向 Base 对象、也可能指向 Derived 对象、甚至指向更远的孙子类。编译期只知道 bp 的 静态类型 是 Base ——它"是什么"在编译时并没有确定。但程序运行中——你可能需要知道" bp 到底指向什么"和"能不能把它当作某种派生类来用"。',
    failure:
      "若把「RTTI：运行时的类型识别与安全导航」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「RTTI：运行时的类型识别与安全导航」的契约。",
  },
];

export function SpecializedToolsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="特殊工具与技术：机制与证据"
      prompt="切换《特殊工具与技术》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《特殊工具与技术》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SpecializedToolsMechanismMap() {
  return (
    <ChapterMechanismMap title="特殊工具与技术：机制路径" stages={STAGES} />
  );
}

export function SpecializedToolsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="特殊工具与技术：失效与核验" stages={STAGES} />
  );
}
