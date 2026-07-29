"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么总复习要从失败反推最早证据",
    mechanism:
      "单章练习一次只改变一个概念；综合项目的症状会跨层传播。文件重复记录可能是 ios::app ，也可能是 EOF 循环多执行一次；派生行为消失可能是 nonvirtual，也可能是按 Base value 切片；崩溃可能来自本次逻辑，也可能运行了旧 executable。总复习先寻找最早失效契约，而不是重读所有摘要。",
    failure:
      "若只复述「为什么总复习要从失败反推最早证据」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么总复习要从失败反推最早证据」的状态变化。",
  },
  {
    label: "第一层：证明运行的是当前源码和完整模块",
    mechanism:
      "Chapter 1–4 负责源代码、工具链、类型值和复合数据；Chapter 9 负责翻译单元、声明/定义与链接。综合验收从删除旧产物、完整警告编译和记录链接输入开始。若构建失败却还能启动旧 app，任何运行结果都失去来源证明。",
    failure:
      "若只复述「第一层：证明运行的是当前源码和完整模块」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「第一层：证明运行的是当前源码和完整模块」的状态变化。",
  },
  {
    label: "第二层：输入、控制和函数必须覆盖完整域",
    mechanism:
      "Chapter 5–8 提供 loop/branch/function/reference/overload/template 契约；Chapter 17 的 stream state 决定输入是否成功。先把记录输入划分为完整合法、边界、字段缺失、类型错误和 EOF，再让 extraction 成功驱动循环。",
    failure:
      "若只复述「第二层：输入、控制和函数必须覆盖完整域」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「第二层：输入、控制和函数必须覆盖完整域」的状态变化。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C++ Primer Plus 6e：18 章总复习：机制与证据"
      prompt="切换《C++ Primer Plus 6e：18 章总复习》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C++ Primer Plus 6e：18 章总复习》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C++ Primer Plus 6e：18 章总复习：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C++ Primer Plus 6e：18 章总复习：失效与核验"
      stages={STAGES}
    />
  );
}
