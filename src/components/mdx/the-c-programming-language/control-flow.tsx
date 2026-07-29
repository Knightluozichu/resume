"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“下一条会执行什么”开始",
    mechanism:
      "控制流不是“选一种看起来顺手的语法”，而是对程序计数器下一步去向的约束。阅读每个结构时写下四件事：从哪里进入、条件读取哪些状态、每次迭代如何取得进展、从哪些边退出。没有进展变量或退出契约的循环，即使语法正确也可能永不结束。",
    failure:
      "若把「从“下一条会执行什么”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“下一条会执行什么”开始」的实际契约。",
  },
  {
    label: "语句与程序块决定作用域",
    mechanism:
      "表达式加分号形成表达式语句，花括号把零条或多条声明/语句组成 程序块 。即使分支当前只有一条语句，也建议保留花括号，避免后来追加语句却仍只有第一条受条件控制。",
    failure:
      "若把「语句与程序块决定作用域」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「语句与程序块决定作用域」的实际契约。",
  },
  {
    label: "if、else-if 与悬空 else",
    mechanism:
      "if 接受标量条件：零为空假，非零为真。 else if 不是独立关键字，而是 else 后紧跟另一条 if 语句。链条按顺序测试，第一个真分支执行后跳过其余分支；若需要覆盖所有输入，最后的 else 应处理默认或错误情况。",
    failure:
      "若把「if、else-if 与悬空 else」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「if、else-if 与悬空 else」的实际契约。",
  },
];

export function ControlFlowDecisionLab() {
  return (
    <ChapterDecisionLab
      title="控制流：机制与证据"
      prompt="切换《控制流》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《控制流》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ControlFlowMechanismMap() {
  return <ChapterMechanismMap title="控制流：机制路径" stages={STAGES} />;
}

export function ControlFlowFailureDiagram() {
  return <ChapterFailureMatrix title="控制流：失效与核验" stages={STAGES} />;
}
