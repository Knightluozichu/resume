"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“本机是 4 字节”开始质疑",
    mechanism:
      "类型首先规定一组值与可执行操作，然后才由实现选择表示。C 只保证 sizeof(char) == 1 ；这个“1 字节”有 CHAR BIT 位且 CHAR BIT = 8 。标准不保证 char 恰好 8 位、 int 恰好 32 位、 double 恰好 64 位，也不保证普通 char 与 signed char 具有相同符号性。",
    failure:
      "若把「从“本机是 4 字节”开始质疑」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“本机是 4 字节”开始质疑」的实际契约。",
  },
  {
    label: "常量与声明先决定类型",
    mechanism:
      "整数字面量的类型由进制、值和后缀共同决定。十进制常量与十六/八进制常量的候选类型序列不同； U 、 L 后缀会改变候选集合。字符常量 'A' 在 C 中类型是 int ，字符串字面量则是带结尾空字符的字符数组，不能通过指针去修改。",
    failure:
      "若把「常量与声明先决定类型」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「常量与声明先决定类型」的实际契约。",
  },
  {
    label: "算术、关系与逻辑运算符",
    mechanism:
      "逻辑与 && 、逻辑或 和逻辑非 ! 把零视为假、非零视为真。前两者具有短路规则： p != NULL && p- value 0 会先检查指针，若左侧为假就不求右侧。短路常用于保护后续访问，但也应避免把重要副作用藏在右操作数中，否则读者很难看出某条路径是否执行。",
    failure:
      "若把「算术、关系与逻辑运算符」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「算术、关系与逻辑运算符」的实际契约。",
  },
];

export function TypesOperatorsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="类型、运算符与表达式：机制与证据"
      prompt="切换《类型、运算符与表达式》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《类型、运算符与表达式》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TypesOperatorsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="类型、运算符与表达式：机制路径"
      stages={STAGES}
    />
  );
}

export function TypesOperatorsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="类型、运算符与表达式：失效与核验"
      stages={STAGES}
    />
  );
}
