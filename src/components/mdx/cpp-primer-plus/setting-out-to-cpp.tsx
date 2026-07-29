"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“能运行”还不等于读懂程序",
    mechanism:
      "最小程序只有几行，但每一行处在不同语法层： include 是预处理指令， main 定义函数，花括号包围复合语句，声明创建名字与对象，表达式语句执行操作， return 把状态交还运行环境。把所有行统称为“命令”会让错误边界变得模糊。",
    failure:
      "若只复述「为什么“能运行”还不等于读懂程序」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么“能运行”还不等于读懂程序」的状态变化。",
  },
  {
    label: "C++ 语句以状态变化为阅读单位",
    mechanism:
      "声明语句 int cups 0 ; 创建一个已初始化对象；赋值表达式语句 cups = 4; 修改已有对象；函数调用语句可能通过返回值或副作用改变状态；复合语句 ...",
    failure:
      "若只复述「C++ 语句以状态变化为阅读单位」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「C++ 语句以状态变化为阅读单位」的状态变化。",
  },
  {
    label: "cout 把值转换成输出字符",
    mechanism:
      "std::cout 是标准输出流对象， << 是插入运算符。箭头指向流：把右侧值的字符表示插入 cout 。链式表达式从左向右处理，所以文字、数字和换行可以依次输出。",
    failure:
      "若只复述「cout 把值转换成输出字符」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「cout 把值转换成输出字符」的状态变化。",
  },
];

export function SettingOutToCppDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 2：Setting Out to C++：机制与证据"
      prompt="切换《Chapter 2：Setting Out to C++》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 2：Setting Out to C++》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SettingOutToCppMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 2：Setting Out to C++：机制路径"
      stages={STAGES}
    />
  );
}

export function SettingOutToCppFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 2：Setting Out to C++：失效与核验"
      stages={STAGES}
    />
  );
}
