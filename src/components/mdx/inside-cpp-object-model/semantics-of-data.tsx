"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“成员名”和“成员地址”不是一回事开始",
    mechanism:
      "读 object.value 时，compiler 先根据 static type 做 member lookup 与 access control，再根据 object model 找到对应 storage。先预测 derived class 声明同名 member 后， baseView.val…",
    failure:
      "若只从源码表面理解「从“成员名”和“成员地址”不是一回事开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“成员名”和“成员地址”不是一回事开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 The Binding of a Data Member",
    mechanism:
      "class member declaration 同时参与 type name、member name 和 scope rules。现代 compiler 必须遵循完整语言规则，但原书提醒我们：早期实现采用逐行或多阶段处理时，嵌套 typedef、inline member body 与后出现声明可能暴露错误绑定。",
    failure:
      "若只从源码表面理解「1 The Binding of a Data Member」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 The Binding of a Data Member」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "2 Data Member Layout",
    mechanism:
      "nonstatic member 占每个 object 的 storage；static member 不占 instance bytes。layout 还要满足每个 field alignment，因而可能在 members 之间插入 padding，并把 object size 向整体 alig…",
    failure:
      "若只从源码表面理解「2 Data Member Layout」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「2 Data Member Layout」，并区分标准语义与当前 ABI 实现。",
  },
];

export function SemanticsOfDataDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章：数据语义：机制与证据"
      prompt="切换《第3章：数据语义》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章：数据语义》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SemanticsOfDataMechanismMap() {
  return (
    <ChapterMechanismMap title="第3章：数据语义：机制路径" stages={STAGES} />
  );
}

export function SemanticsOfDataFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第3章：数据语义：失效与核验" stages={STAGES} />
  );
}
