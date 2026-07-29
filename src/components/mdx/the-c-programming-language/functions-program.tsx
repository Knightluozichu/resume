"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从调用点能证明什么开始",
    mechanism:
      "函数不是“跳到另一段代码”的语法糖，而是一份跨调用边界的契约：调用点必须知道参数数量与类型、返回类型、哪些对象可能被间接修改、失败怎样表达。K&R 第二版最重要的 ANSI C 更新之一就是函数原型，它让编译器能在调用发生前检查定义与使用是否兼容。",
    failure:
      "若把「从调用点能证明什么开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从调用点能证明什么开始」的实际契约。",
  },
  {
    label: "原型、定义与返回类型",
    mechanism:
      "K&R 第一版时代的旧式定义与隐式 int 是历史语法；第二版讲 ANSI 原型，现代 C99 以后还删除了隐式函数声明。本站示例统一使用原型形式，不用“编译器猜返回类型”掩盖接口错误。",
    failure:
      "若把「原型、定义与返回类型」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「原型、定义与返回类型」的实际契约。",
  },
  {
    label: "C 只有值传递",
    mechanism:
      "改变形参指针本身只改变副本： pointer = NULL 不会把调用者的指针置空。若接口要更新调用者保存的指针，需传“指向该指针对象的指针”，并明确新所有权与失败时旧值是否保留。",
    failure:
      "若把「C 只有值传递」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「C 只有值传递」的实际契约。",
  },
];

export function FunctionsProgramDecisionLab() {
  return (
    <ChapterDecisionLab
      title="函数与程序结构：机制与证据"
      prompt="切换《函数与程序结构》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《函数与程序结构》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FunctionsProgramMechanismMap() {
  return (
    <ChapterMechanismMap title="函数与程序结构：机制路径" stages={STAGES} />
  );
}

export function FunctionsProgramFailureDiagram() {
  return (
    <ChapterFailureMatrix title="函数与程序结构：失效与核验" stages={STAGES} />
  );
}
