"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么类型图首先是一张Ownership和Dependen…",
    mechanism:
      "继承箭头、namespace和singleton写法很容易画，困难的是证明caller能安全替换subtype、shared instance由谁创建/释放、两个objects谁依赖谁，以及一组values是closed set还是会携带持续演化的behavior。类型设计的质量来自这些约束，而不是使用了多少pattern。",
    failure:
      "若把「为什么类型图首先是一张Ownership和Dependen…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么类型图首先是一张Ownership和Dependen…」的收益与反例。",
  },
  {
    label: "Contract、Reuse与Polymorphic Br…",
    mechanism:
      "interface表达role/capability，让unrelated types实现多个contracts，适合dependency boundary；abstract class适合一条有共同state、protected invariant和设计过virtual hooks的hierarc…",
    failure:
      "若把「Contract、Reuse与Polymorphic Br…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Contract、Reuse与Polymorphic Br…」的收益与反例。",
  },
  {
    label: "Global Lifetime、Initializatio…",
    mechanism:
      "private constructor阻止外部new，配合static holder或 Lazy 可保证一个process/type-context instance。但singleton隐藏global dependency、共享mutable state与test order；现代applica…",
    failure:
      "若把「Global Lifetime、Initializatio…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Global Lifetime、Initializatio…」的收益与反例。",
  },
];

export function TypeDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第8章：类型设计（建议102-112）：机制与证据"
      prompt="切换《第8章：类型设计（建议102-112）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第8章：类型设计（建议102-112）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TypeDesignMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第8章：类型设计（建议102-112）：机制路径"
      stages={STAGES}
    />
  );
}

export function TypeDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第8章：类型设计（建议102-112）：失效与核验"
      stages={STAGES}
    />
  );
}
