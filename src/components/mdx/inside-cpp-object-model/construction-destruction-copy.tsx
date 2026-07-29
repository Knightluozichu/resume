"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“接口声明决定对象能否安全活完一生”开始",
    mechanism:
      "constructor/destructor 不是独立函数；它们维护 object 从“不存在”到“各 subobject 有效”再回到“不存在”的状态机。先预测一个带 pure virtual destructor 的 abstract base 是否可以不给 destructor body：de…",
    failure:
      "若只从源码表面理解「从“接口声明决定对象能否安全活完一生”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“接口声明决定对象能否安全活完一生”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "重新审视 Class Declaration",
    mechanism:
      "polymorphic base 若允许通过 base pointer 销毁 dynamic derived object，destructor 必须 virtual。它也可以 pure virtual 以表达 interface 不应直接实例化，但仍要定义，因为 destruction chain 总会进入 base subobject teardown。",
    failure:
      "若只从源码表面理解「重新审视 Class Declaration」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「重新审视 Class Declaration」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 Object Construction without…",
    mechanism:
      "对于没有 inheritance 的 abstract data type，construction 仍分为 member initialization 与 body。initializer list 直接选择 member constructors；body 运行时 members 已经有效。若 …",
    failure:
      "若只从源码表面理解「1 Object Construction without…」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 Object Construction without…」，并区分标准语义与当前 ABI 实现。",
  },
];

export function ConstructionDestructionCopyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第5章：构造、析构与复制语义：机制与证据"
      prompt="切换《第5章：构造、析构与复制语义》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第5章：构造、析构与复制语义》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ConstructionDestructionCopyMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第5章：构造、析构与复制语义：机制路径"
      stages={STAGES}
    />
  );
}

export function ConstructionDestructionCopyFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第5章：构造、析构与复制语义：失效与核验"
      stages={STAGES}
    />
  );
}
