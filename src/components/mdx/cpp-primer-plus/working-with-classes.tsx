"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么熟悉的符号也必须服从类契约",
    mechanism:
      "运算符重载（operator overloading）让用户定义类型沿用 a + b 、 out << value 等表达式形式，编译器再把它们映射到函数调用。它改善的是领域表达，不会自动赋予合理语义。若 Vector + Vector 突然修改左值，或比较运算不满足一致关系，熟悉语法反而掩盖缺陷。",
    failure:
      "若只复述「为什么熟悉的符号也必须服从类契约」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么熟悉的符号也必须服从类契约」的状态变化。",
  },
  {
    label: "重载只能选择函数，不能改写语法规则",
    mechanism:
      "重载不能创造新符号，不能改变优先级、结合性和操作数数量，也不能让纯内置类型表达式改走自定义实现。",
    failure:
      "若只复述「重载只能选择函数，不能改写语法规则」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「重载只能选择函数，不能改写语法规则」的状态变化。",
  },
  {
    label: "成员与非成员的选择取决于左操作数",
    mechanism:
      "会修改当前对象的 += 、 [] 、赋值和调用运算通常自然地成为成员；需要两个操作数同等转换机会的二元算术和比较通常适合非成员。某些运算符受语言约束必须是成员，例如赋值、下标、函数调用和成员访问箭头。",
    failure:
      "若只复述「成员与非成员的选择取决于左操作数」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「成员与非成员的选择取决于左操作数」的状态变化。",
  },
];

export function WorkingWithClassesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 11：Working with Classes：机制与证据"
      prompt="切换《Chapter 11：Working with Classes》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 11：Working with Classes》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function WorkingWithClassesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 11：Working with Classes：机制路径"
      stages={STAGES}
    />
  );
}

export function WorkingWithClassesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 11：Working with Classes：失效与核验"
      stages={STAGES}
    />
  );
}
