"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“字符数组不一定是字符串”开始",
    mechanism:
      "C 没有独立运行时字符串对象；所谓字符串，是一段字符序列后紧跟空字符 \\0 的协议。",
    failure:
      "若把「从“字符数组不一定是字符串”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“字符数组不一定是字符串”开始」的实际契约。",
  },
  {
    label: "字符串字面量与可修改数组",
    mechanism:
      'char text[] = "hello"; 用字面量初始化一个独立数组，元素可修改；数组是自动、静态还是线程存储期取决于声明位置与说明符，不等于“一定在栈上”。',
    failure:
      "若把「字符串字面量与可修改数组」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「字符串字面量与可修改数组」的实际契约。",
  },
  {
    label: "字符指针、字符串函数与长度",
    mechanism:
      "K&R 用字符指针实现一组字符串函数： strlen 的指针写法从起点移动到首个空字符，再用同一数组中的指针差得到长度。返回类型在现代标准库中是 size t ，而指针差类型是 ptrdiff t ；从差值转成 size t 前，算法已经证明终点不早于起点。",
    failure:
      "若把「字符指针、字符串函数与长度」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「字符指针、字符串函数与长度」的实际契约。",
  },
];

export function PointerArithmeticDecisionLab() {
  return (
    <ChapterDecisionLab
      title="指针运算与字符串：机制与证据"
      prompt="切换《指针运算与字符串》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《指针运算与字符串》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PointerArithmeticMechanismMap() {
  return (
    <ChapterMechanismMap title="指针运算与字符串：机制路径" stages={STAGES} />
  );
}

export function PointerArithmeticFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="指针运算与字符串：失效与核验"
      stages={STAGES}
    />
  );
}
