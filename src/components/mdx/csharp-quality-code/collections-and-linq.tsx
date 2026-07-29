"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么集合不是容器名，而是一组可观察契约",
    mechanism:
      "原书第2章把16条建议放在一起，因为collection choice与LINQ query并非两个独立话题。集合决定数据的shape、ownership和mutation；查询决定何时、在哪里、以多少次遍历观察这些数据。只说“Dictionary是O(1)”或“LINQ更优雅”都不足以评审生产代码。",
    failure:
      "若把「为什么集合不是容器名，而是一组可观察契约」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么集合不是容器名，而是一组可观察契约」的收益与反例。",
  },
  {
    label: "数量、遍历、初始化与集合选择（建议16-21）",
    mechanism:
      "数组长度在construction时固定，适合fixed-size buffer、interop layout、已完成计算的compact snapshot，以及需要span/index locality的hot path。元素持续增加时手工扩容array会重复copy并分散capacity pol…",
    failure:
      "若把「数量、遍历、初始化与集合选择（建议16-21）」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「数量、遍历、初始化与集合选择（建议16-21）」的收益与反例。",
  },
  {
    label: "Concurrency、Iterator与Ownershi…",
    mechanism:
      "“线程安全集合”不是给业务workflow盖章。普通Dictionary在没有并发写、且发布后只读时可由多个reader使用；存在并发mutation时，需要锁、concurrent collection、immutable snapshot或single-owner message loop。选哪种取决于复合操作是否必须atomic。",
    failure:
      "若把「Concurrency、Iterator与Ownershi…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Concurrency、Iterator与Ownershi…」的收益与反例。",
  },
];

export function CollectionsAndLinqDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章：集合和LINQ（建议16-31）：机制与证据"
      prompt="切换《第2章：集合和LINQ（建议16-31）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章：集合和LINQ（建议16-31）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CollectionsAndLinqMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第2章：集合和LINQ（建议16-31）：机制路径"
      stages={STAGES}
    />
  );
}

export function CollectionsAndLinqFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第2章：集合和LINQ（建议16-31）：失效与核验"
      stages={STAGES}
    />
  );
}
