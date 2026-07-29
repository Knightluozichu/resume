"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从第一章的可运行反馈环开始",
    mechanism: "K&R 的第一章 A Tutorial Introduction 不是缩小版参考手册，而是",
    failure:
      "若把「从第一章的可运行反馈环开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从第一章的可运行反馈环开始」的实际契约。",
  },
  {
    label: "变量与算术表达式：先确定计算域",
    mechanism: "define LOWER 0 define UPPER 300 define STEP 20",
    failure:
      "若把「变量与算术表达式：先确定计算域」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「变量与算术表达式：先确定计算域」的实际契约。",
  },
  {
    label: "for 语句：用不变量解释循环",
    mechanism:
      "数组循环常用 0 <= index && index < count 作为范围不变量。修改循环条件或步进时要同时检查空数组、单元素、最大边界和溢出。",
    failure:
      "若把「for 语句：用不变量解释循环」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「for 语句：用不变量解释循环」的实际契约。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="K&R 全书契约式总复习：机制与证据"
      prompt="切换《K&R 全书契约式总复习》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《K&R 全书契约式总复习》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="K&R 全书契约式总复习：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="K&R 全书契约式总复习：失效与核验"
      stages={STAGES}
    />
  );
}
