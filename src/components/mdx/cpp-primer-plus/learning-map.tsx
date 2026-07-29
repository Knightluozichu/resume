"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么学习地图必须服从官方 18 章",
    mechanism:
      "《C++ Primer Plus》第六版官方目录从 Chapter 1 Getting Started with C++ 推进到 Chapter 18 Visiting with the New C++ Standard。它不是“基础、OOP、STL”三个宽泛标签：数据类型、复合类型、循环、分支、函…",
    failure:
      "若只复述「为什么学习地图必须服从官方 18 章」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么学习地图必须服从官方 18 章」的状态变化。",
  },
  {
    label: "第一阶段：Chapter 1–6 证明程序、值与路径",
    mechanism:
      "Chapter 1 建立编辑、编译、链接、运行的工具链；Chapter 2 解剖 main 、C++ statements、cout/cin、variables and functions；Chapter 3 处理 integer/floating point、const、arithmetic op…",
    failure:
      "若只复述「第一阶段：Chapter 1–6 证明程序、值与路径」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「第一阶段：Chapter 1–6 证明程序、值与路径」的状态变化。",
  },
  {
    label: "第二阶段：Chapter 7–9 从函数进入程序模块",
    mechanism:
      "Chapter 7 以 prototype、按值传递、数组/字符串/结构体参数、递归和函数 pointer 建立函数契约；Chapter 8 加入 inline、reference、default argument、overload 与 function template；Chapter 9 再把声…",
    failure:
      "若只复述「第二阶段：Chapter 7–9 从函数进入程序模块」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「第二阶段：Chapter 7–9 从函数进入程序模块」的状态变化。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C++ Primer Plus 6e：官方 18 章学习地图：机制与证据"
      prompt="切换《C++ Primer Plus 6e：官方 18 章学习地图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C++ Primer Plus 6e：官方 18 章学习地图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C++ Primer Plus 6e：官方 18 章学习地图：机制路径"
      stages={STAGES}
    />
  );
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C++ Primer Plus 6e：官方 18 章学习地图：失效与核验"
      stages={STAGES}
    />
  );
}
