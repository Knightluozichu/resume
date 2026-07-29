"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“类会不会让对象变大”开始",
    mechanism:
      "原书先拆掉一个常见误解：把 C 的 struct + free functions 改写为 C++ class + member functions ，并不意味着每个 object 都保存一份 function code。先预测两种写法的 sizeof 是否相同，再观察 compiler 输出；真正…",
    failure:
      "若只从源码表面理解「从“类会不会让对象变大”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“类会不会让对象变大”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "种表示方式为何逐步收敛",
    mechanism:
      "simple object model 很规整：所有 member 都通过 slot 间接访问。但一个有很多 member functions 的 object 会因 function slots 变大，每次 data access 也多一次 indirection。它适合解释“class 是 member 集合”，不适合作为高效实现的常见选择。",
    failure:
      "若只从源码表面理解「种表示方式为何逐步收敛」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「种表示方式为何逐步收敛」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "加入继承后，对象里出现什么",
    mechanism:
      "普通 single inheritance 通常把 base subobject 安置在 derived object 的固定位置，再放 derived data。转换 Derived 到 unambiguous non-virtual Base 时，implementation 可使用固定 offset；如果 base 位于起始位置，offset 甚至为零。",
    failure:
      "若只从源码表面理解「加入继承后，对象里出现什么」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「加入继承后，对象里出现什么」，并区分标准语义与当前 ABI 实现。",
  },
];

export function ObjectLessonsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章：对象模型初识：机制与证据"
      prompt="切换《第1章：对象模型初识》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章：对象模型初识》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ObjectLessonsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第1章：对象模型初识：机制路径"
      stages={STAGES}
    />
  );
}

export function ObjectLessonsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第1章：对象模型初识：失效与核验"
      stages={STAGES}
    />
  );
}
