"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么开始学语言要先学证据链",
    mechanism:
      "初学者常把“编辑器没有红线”“命令没有报错”或“终端出现一行文字”当成同一件事。它们对应不同阶段：编辑器只展示文本和静态提示，编译器检查当前翻译输入，链接器组合定义，操作系统再加载可执行文件。若不能指出当前运行的是哪个产物，后续所有实验都可能建立在旧二进制上。",
    failure:
      "若只复述「为什么开始学语言要先学证据链」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么开始学语言要先学证据链」的状态变化。",
  },
  {
    label: "C++ 起源：保留 C 基础并扩展抽象工具",
    mechanism:
      "Bjarne Stroustrup 创建 C++ 时保留了 C 的表达式、控制流、函数和直接内存能力，并加入类、继承与多态等对象工具。后来模板支持泛型编程。C++ 因而是多范式语言，不要求所有问题都塞进继承层次。",
    failure:
      "若只复述「C++ 起源：保留 C 基础并扩展抽象工具」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「C++ 起源：保留 C 基础并扩展抽象工具」的状态变化。",
  },
  {
    label: "标准规定语言，编译器提供实现",
    mechanism:
      "ANSI/ISO C++ 标准定义源程序语义和标准库契约，GCC、Clang、MSVC 等编译器实现这些规则。",
    failure:
      "若只复述「标准规定语言，编译器提供实现」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「标准规定语言，编译器提供实现」的状态变化。",
  },
];

export function GettingStartedWithCppDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 1：Getting Started with C++：机制与证据"
      prompt="切换《Chapter 1：Getting Started with C++》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 1：Getting Started with C++》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GettingStartedWithCppMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 1：Getting Started with C++：机制路径"
      stages={STAGES}
    />
  );
}

export function GettingStartedWithCppFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 1：Getting Started with C++：失效与核验"
      stages={STAGES}
    />
  );
}
