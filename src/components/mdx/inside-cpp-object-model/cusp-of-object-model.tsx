"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“哪些决议必须推迟”开始",
    mechanism:
      "前六章多在解释 compiler 怎样把已知 class hierarchy 映射为固定 layout/call/lifetime protocol。第 7 章转向更晚发生的决策：template 直到 actual type 出现才形成 specialization；exception 直到 th…",
    failure:
      "若只从源码表面理解「从“哪些决议必须推迟”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“哪些决议必须推迟”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 Templates",
    mechanism:
      "template 不是未经检查的 textual macro。definition 先被 parse；non-dependent names 通常在 definition context 绑定；dependent expressions 等到 point of instantiation 才结合 a…",
    failure:
      "若只从源码表面理解「1 Templates」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 Templates」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "2 Exception Handling",
    mechanism:
      "try 标记 handler region， throw 终止当前 normal path， catch 按声明顺序尝试 type match。handler 可处理、转换或 throw; rethrow 当前 exception。destructor 在 unwinding 中必须可靠，通常不应再抛出逃逸 exception。",
    failure:
      "若只从源码表面理解「2 Exception Handling」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「2 Exception Handling」，并区分标准语义与当前 ABI 实现。",
  },
];

export function CuspOfObjectModelDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章：对象模型边缘：机制与证据"
      prompt="切换《第7章：对象模型边缘》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章：对象模型边缘》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CuspOfObjectModelMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第7章：对象模型边缘：机制路径"
      stages={STAGES}
    />
  );
}

export function CuspOfObjectModelFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第7章：对象模型边缘：失效与核验"
      stages={STAGES}
    />
  );
}
