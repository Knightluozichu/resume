"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“数组不是指针”开始",
    mechanism:
      "int a[5] 定义一个包含五个 int 子对象的数组对象， int p 定义一个保存地址值的指针对象。二者大小、可赋值性与类型结构都不同。常见说法“数组名就是指针”只描述了多数表达式中的一次隐式转换，不能拿来替代完整规则。",
    failure:
      "若把「从“数组不是指针”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“数组不是指针”开始」的实际契约。",
  },
  {
    label: "数组到指针转换",
    mechanism:
      "在 K&R 对应的 ANSI C 中， sizeof a 和 &a 不触发该转换。前者得到整个数组大小；后者类型是 int ( )[5] ，即指向含五个 int 的数组。",
    failure:
      "若把「数组到指针转换」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「数组到指针转换」的实际契约。",
  },
  {
    label: "半开范围约束指针算术",
    mechanism:
      "C 的指针加减不是对任意整数地址做数学。若指针指向数组元素，可形成同一数组内的其他元素地址或 尾后一位指针 ；越过这两端，即使暂不解引用，也不能作为普通数组指针算法依赖。",
    failure:
      "若把「半开范围约束指针算术」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「半开范围约束指针算术」的实际契约。",
  },
];

export function PointersArraysDecisionLab() {
  return (
    <ChapterDecisionLab
      title="指针与数组：机制与证据"
      prompt="切换《指针与数组》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《指针与数组》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PointersArraysMechanismMap() {
  return <ChapterMechanismMap title="指针与数组：机制路径" stages={STAGES} />;
}

export function PointersArraysFailureDiagram() {
  return (
    <ChapterFailureMatrix title="指针与数组：失效与核验" stages={STAGES} />
  );
}
