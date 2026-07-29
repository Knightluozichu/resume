"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: '为什么 C++ 中要给每个数据贴一张"标签"？',
    mechanism:
      "想象你面前有一排不同大小的盒子：火柴盒、鞋盒、收纳箱、搬家纸箱。你要放的是一颗纽扣——扔进搬家纸箱也行，但太浪费；要放的是一床被子——硬塞火柴盒肯定不行。",
    failure:
      '若把「为什么 C++ 中要给每个数据贴一张"标签"？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。',
    evidence:
      '保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么 C++ 中要给每个数据贴一张"标签"？」的契约。',
  },
  {
    label: "类型——给内存里的每个格子划定规矩",
    mechanism:
      "在 C++ 中， 类型（type） 是程序最基本的「规矩」。任何一个变量在被使用之前，它的类型必须是确定的——编译器要在 编译阶段 就搞清楚：这个变量得分配几字节的内存、它的值能有多大范围、能对它做加减乘除还是不能。",
    failure:
      "若把「类型——给内存里的每个格子划定规矩」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「类型——给内存里的每个格子划定规矩」的契约。",
  },
  {
    label: "Chapter 2 的完整类型契约",
    mechanism:
      "前面的内置类型、变量与作用域只覆盖 Chapter 2 的一部分。官方目录还要求掌握 Compound Types 、 const Qualifier 、 Dealing with Types 和 Defining Our Own Data Structures 。它们共同回答：一个名字是否拥有对象、能否修改对象、类型从哪里来，以及怎样定义领域类型。",
    failure:
      "若把「Chapter 2 的完整类型契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「Chapter 2 的完整类型契约」的契约。",
  },
];

export function VariablesAndTypesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="变量和基本类型：机制与证据"
      prompt="切换《变量和基本类型》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《变量和基本类型》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function VariablesAndTypesMechanismMap() {
  return (
    <ChapterMechanismMap title="变量和基本类型：机制路径" stages={STAGES} />
  );
}

export function VariablesAndTypesFailureDiagram() {
  return (
    <ChapterFailureMatrix title="变量和基本类型：失效与核验" stages={STAGES} />
  );
}
