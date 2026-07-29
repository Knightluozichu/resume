"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么循环需要证明而不只是重复",
    mechanism:
      "循环把一段代码执行多次，也把一个小错误放大多次。正确循环必须说明：第一次测试前状态合法；每轮开始时哪些事实保持；循环体怎样推进；何时退出；退出后结果满足什么。只写“重复 count 次”无法证明数组访问、输入失败和动态边界。",
    failure:
      "若只复述「为什么循环需要证明而不只是重复」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么循环需要证明而不只是重复」的状态变化。",
  },
  {
    label: "关系表达式定义继续执行的集合",
    mechanism:
      "= == != 比较操作数并产生 bool。条件 i < count 表示 i 仍位于半开区间； i <= count 则额外包含尾后位置。先把合法集合写成区间，再选择运算符，比靠记忆“通常用小于号”更可靠。",
    failure:
      "若只复述「关系表达式定义继续执行的集合」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「关系表达式定义继续执行的集合」的状态变化。",
  },
  {
    label: "for 循环把计数生命周期放在头部",
    mechanism:
      "for 循环适合初始化、继续条件和更新都围绕一个局部计数器的场景。下面的不变量是：进入第 i 轮时， total 等于 values[0..i) 的和；更新后 i 增一，未处理元素严格减少。",
    failure:
      "若只复述「for 循环把计数生命周期放在头部」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「for 循环把计数生命周期放在头部」的状态变化。",
  },
];

export function LoopsAndRelationalExpressionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 5：Loops and Relational Expressions：机制与证据"
      prompt="切换《Chapter 5：Loops and Relational Expressions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 5：Loops and Relational Expressions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LoopsAndRelationalExpressionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 5：Loops and Relational Expressions：机制路径"
      stages={STAGES}
    />
  );
}

export function LoopsAndRelationalExpressionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 5：Loops and Relational Expressions：失效与核验"
      stages={STAGES}
    />
  );
}
