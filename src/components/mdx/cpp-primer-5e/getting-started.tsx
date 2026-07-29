"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么写下了代码，电脑就能懂？",
    mechanism:
      '你敲下一段 C++ 代码，点运行，屏幕上就出现了一行 "Hello, World!"。这正是官方首节 Writing a Simple C++ Program （编写简单 C++ 程序）的任务。这中间其实经过了一条 工厂流水线 ——你的代码是「原料」，经过几道工位一道道加工，最后从流水线另一头出来一个能直接运行的「成品」。',
    failure:
      "若把「为什么写下了代码，电脑就能懂？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么写下了代码，电脑就能懂？」的契约。",
  },
  {
    label: "你的第一个程序，逐行拆开看",
    mechanism:
      "在走流水线之前，先把「原料」长什么样搞清楚。下面这个六行代码就是 C++ 里最经典的一小段：",
    failure:
      "若把「你的第一个程序，逐行拆开看」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「你的第一个程序，逐行拆开看」的契约。",
  },
  {
    label: "从控制流走到书店程序",
    mechanism:
      "官方 Chapter 1 不止写一个 Hello World。 Flow of Control 让程序能重复读取未知条数的交易，并按条件决定继续累计还是输出； Introducing Classes 用 Sales item 展示“先使用类的接口，再理解实现”；最后的 The Bookstore Program 把这些能力接成完整数据处理流程。",
    failure:
      "若把「从控制流走到书店程序」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「从控制流走到书店程序」的契约。",
  },
];

export function GettingStartedDecisionLab() {
  return (
    <ChapterDecisionLab
      title="快速入门：机制与证据"
      prompt="切换《快速入门》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《快速入门》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GettingStartedMechanismMap() {
  return <ChapterMechanismMap title="快速入门：机制路径" stages={STAGES} />;
}

export function GettingStartedFailureDiagram() {
  return <ChapterFailureMatrix title="快速入门：失效与核验" stages={STAGES} />;
}
