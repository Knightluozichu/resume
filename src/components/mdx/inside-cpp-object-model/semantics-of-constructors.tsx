"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“编译器暗中做了什么”开始",
    mechanism:
      "constructor 的隐藏动作不是任意魔法，而是语言语义要求的程序变换。先预测下面空 constructor 是否真的“什么也不做”：若 class 含有需要默认构造的 member/base，或 implementation 必须建立 virtual representation，即使 user 看不到语句，生成代码仍有职责。",
    failure:
      "若只从源码表面理解「从“编译器暗中做了什么”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“编译器暗中做了什么”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 Default Constructor Constru…",
    mechanism: "Member Class Object with Default Constructor",
    failure:
      "若只从源码表面理解「1 Default Constructor Constru…」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 Default Constructor Constru…」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "2 Copy Constructor Constructi…",
    mechanism:
      "没有 user-declared copy constructor 时，隐式 copy 的语义是按顺序复制 direct bases 和 nonstatic members。对 scalar member 是值复制；对 class member 则调用该 member 的 copy construc…",
    failure:
      "若只从源码表面理解「2 Copy Constructor Constructi…」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「2 Copy Constructor Constructi…」，并区分标准语义与当前 ABI 实现。",
  },
];

export function SemanticsOfConstructorsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章：构造函数语义：机制与证据"
      prompt="切换《第2章：构造函数语义》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章：构造函数语义》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SemanticsOfConstructorsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第2章：构造函数语义：机制路径"
      stages={STAGES}
    />
  );
}

export function SemanticsOfConstructorsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第2章：构造函数语义：失效与核验"
      stages={STAGES}
    />
  );
}
