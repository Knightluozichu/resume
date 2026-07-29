"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么数据类型是一个可验证的表示选择",
    mechanism:
      "选择类型不是给变量贴标签，而是在声明可表示的值集合、运算规则、精度和错误边界。本章把整数类型、浮点数、const 限定符、算术运算符和类型转换放进同一条数据证据链。人数需要离散且非负，不代表盲目使用 unsigned；金额需要小数，也不代表 binary floating point 能精确表示十进制分币。先写领域范围和允许误差，再选择类型并用实现证据确认。",
    failure:
      "若只复述「为什么数据类型是一个可验证的表示选择」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么数据类型是一个可验证的表示选择」的状态变化。",
  },
  {
    label: "整数类型提供离散精确值但范围有限",
    mechanism:
      "short 、 int 、 long 、 long long 至少按该顺序不减小宽度，但标准不保证固定字节数。signed 类型表达正负整数；unsigned 算术按模回绕，但混入 signed 表达式可能把负数转换成巨大无符号值。",
    failure:
      "若只复述「整数类型提供离散精确值但范围有限」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「整数类型提供离散精确值但范围有限」的状态变化。",
  },
  {
    label: "字面量的写法会影响源类型",
    mechanism:
      "整数可用十进制、八进制和十六进制形式，后缀可请求 unsigned、long 等类型；浮点字面量默认是 double， f 后缀表示 float。字符字面量如 'A' 与字符串字面量 \"A\" 的类型和存储形状不同。",
    failure:
      "若只复述「字面量的写法会影响源类型」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「字面量的写法会影响源类型」的状态变化。",
  },
];

export function DealingWithDataDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 3：Dealing with Data：机制与证据"
      prompt="切换《Chapter 3：Dealing with Data》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 3：Dealing with Data》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DealingWithDataMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 3：Dealing with Data：机制路径"
      stages={STAGES}
    />
  );
}

export function DealingWithDataFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 3：Dealing with Data：失效与核验"
      stages={STAGES}
    />
  );
}
