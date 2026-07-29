"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么先锁定这张地图对应哪一本书",
    mechanism:
      "本体系严格对应Enrico Buonanno的 Functional Programming in C : How to write better C code 第一版，Manning于2017年8月出版，ISBN 9781617293955。权威目录是3部分、15章，不是旧站点里按主题抽样出的“十…",
    failure:
      "若把「为什么先锁定这张地图对应哪一本书」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么先锁定这张地图对应哪一本书」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "部分十五章总览",
    mechanism:
      "Part 1 “Core concepts”覆盖第1–5章：从函数式编程的目标出发，经purity、function signatures/types、常用patterns，到function composition。退出条件不是记住术语，而是能把一个有I/O的use case拆成pure deci…",
    failure:
      "若把「部分十五章总览」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「部分十五章总览」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "第一层：Functions and values",
    mechanism:
      "第1–3章建立基础：function作为value、purity/referential transparency、type-driven signatures。先学会列出一个function的显式input/output，再寻找clock、random、database、mutable field…",
    failure:
      "若把「第一层：Functions and values」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「第一层：Functions and values」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function CfpLearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="学习地图：第一版三部分十五章：机制与证据"
      prompt="切换《学习地图：第一版三部分十五章》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《学习地图：第一版三部分十五章》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CfpLearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="学习地图：第一版三部分十五章：机制路径"
      stages={STAGES}
    />
  );
}

export function CfpLearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="学习地图：第一版三部分十五章：失效与核验"
      stages={STAGES}
    />
  );
}
