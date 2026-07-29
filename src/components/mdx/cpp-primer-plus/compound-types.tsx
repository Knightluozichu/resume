"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么复合类型首先描述数据形状",
    mechanism:
      "Chapter 3 选择单个值的表示，Chapter 4 把值组合成序列、记录、互斥状态和间接关系。数组表示固定数量同类型元素，struct 表示同时存在的异类字段，union 让候选表示共享存储，enum 命名有限状态，pointer 表示某个对象的地址。它们不是语法替代品，选择错误会把长度、活动成员或所有权藏到注释中。",
    failure:
      "若只复述「为什么复合类型首先描述数据形状」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么复合类型首先描述数据形状」的状态变化。",
  },
  {
    label: "数组是固定长度的连续同类元素",
    mechanism:
      "数组类型包含元素类型和长度。 int scores[4] 有四个 int，合法下标是 0、1、2、3，即半开区间 [0,4) 。初始化列表按顺序提供首值，未提供的剩余元素执行值初始化。",
    failure:
      "若只复述「数组是固定长度的连续同类元素」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「数组是固定长度的连续同类元素」的状态变化。",
  },
  {
    label: "C 字符串与 string 类有不同长度契约",
    mechanism:
      "C 字符串用 char 数组保存字符，并以 \\0 终止；容量必须包含终止符。",
    failure:
      "若只复述「C 字符串与 string 类有不同长度契约」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「C 字符串与 string 类有不同长度契约」的状态变化。",
  },
];

export function CompoundTypesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 4：Compound Types：机制与证据"
      prompt="切换《Chapter 4：Compound Types》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 4：Compound Types》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CompoundTypesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 4：Compound Types：机制路径"
      stages={STAGES}
    />
  );
}

export function CompoundTypesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 4：Compound Types：失效与核验"
      stages={STAGES}
    />
  );
}
