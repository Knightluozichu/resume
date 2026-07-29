"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从 obj.fn() 里面没有一份 fn 开始",
    mechanism:
      "member function code 通常在 program text 中只有共享实现；object 只保存 data 和必要的 runtime metadata。先预测同一个 Point::move 被一百万个对象调用时 object size 是否随函数数量增长，再看 symbol tabl…",
    failure:
      "若只从源码表面理解「从 obj.fn() 里面没有一份 fn 开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从 obj.fn() 里面没有一份 fn 开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 Varieties of Member Invocat…",
    mechanism:
      "概念上，compiler 为 nonstatic call 加入 this ，并把未限定 member access 改写为通过 this 访问。真实 ABI 决定 this 放在哪个 register/stack slot、是否需要 base adjustment。",
    failure:
      "若只从源码表面理解「1 Varieties of Member Invocat…」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 Varieties of Member Invocat…」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "2 Virtual Member Functions",
    mechanism:
      "Base view 调用 virtual function 时，至少有两个问题：哪个 final overrider 被选中，以及 incoming Base view 如何变成该 body 所需的 object address。single inheritance 中 adjustment 常为零…",
    failure:
      "若只从源码表面理解「2 Virtual Member Functions」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「2 Virtual Member Functions」，并区分标准语义与当前 ABI 实现。",
  },
];

export function SemanticsOfFunctionDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第4章：函数语义：机制与证据"
      prompt="切换《第4章：函数语义》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第4章：函数语义》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SemanticsOfFunctionMechanismMap() {
  return (
    <ChapterMechanismMap title="第4章：函数语义：机制路径" stages={STAGES} />
  );
}

export function SemanticsOfFunctionFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第4章：函数语义：失效与核验" stages={STAGES} />
  );
}
