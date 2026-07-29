"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“变量在哪里”至少包含三个问题",
    mechanism:
      "问一个名字“在哪里”可能是在问：源代码哪个区域能查到它（作用域）；另一个翻译单元能否引用同一实体（链接性）；对象从何时构造到何时销毁（存储期/生命周期）。三者相关但不等价。局部 static 名字只在块内可见，对象却活到程序结束；动态对象可能没有全局名字，却一直活到 owner 释放。",
    failure:
      "若只复述「为什么“变量在哪里”至少包含三个问题」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么“变量在哪里”至少包含三个问题」的状态变化。",
  },
  {
    label: "分离编译让接口与实现独立变化",
    mechanism:
      "分离编译把程序拆为多个源文件，每个源文件经预处理形成翻译单元并独立编译成目标文件，最后链接。头文件共享声明和必要类型定义，不是独立运行单元。",
    failure:
      "若只复述「分离编译让接口与实现独立变化」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「分离编译让接口与实现独立变化」的状态变化。",
  },
  {
    label: "声明与定义控制符号数量",
    mechanism:
      "声明介绍名字和类型，定义创建函数体或对象实体。 extern int count; 通常只是声明，某个源文件需提供唯一 int count 0 ; 定义。把外部对象定义放在头文件会让每个翻译单元都生成一份，触发重复定义。",
    failure:
      "若只复述「声明与定义控制符号数量」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「声明与定义控制符号数量」的状态变化。",
  },
];

export function MemoryModelsAndNamespacesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 9：Memory Models and Namespaces：机制与证据"
      prompt="切换《Chapter 9：Memory Models and Namespaces》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 9：Memory Models and Namespaces》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MemoryModelsAndNamespacesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 9：Memory Models and Namespaces：机制路径"
      stages={STAGES}
    />
  );
}

export function MemoryModelsAndNamespacesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 9：Memory Models and Namespaces：失效与核验"
      stages={STAGES}
    />
  );
}
