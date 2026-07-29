"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么成员签名会决定未来还能否修改实现",
    mechanism:
      "public member不只是当前实现的入口，它向caller暴露可构造状态、mutation capability、dispatch规则和type assumptions。public field让storage成为contract，List property让collection owners…",
    failure:
      "若把「为什么成员签名会决定未来还能否修改实现」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么成员签名会决定未来还能否修改实现」的收益与反例。",
  },
  {
    label: "Construction、State与Dispatch（建…",
    mechanism:
      "abstract type不能直接实例化，public constructor给出一个实际上不可调用的surface；通常使用protected constructor，只允许derived construction chain建立base invariant。若外部要选择具体实现，提供factor…",
    failure:
      "若把「Construction、State与Dispatch（建…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Construction、State与Dispatch（建…」的收益与反例。",
  },
  {
    label: "Abstraction Surface与Signature…",
    mechanism:
      "public return/property type只暴露caller需要的capability，例如返回 IReadOnlyList 而不是List、返回Stream而不是FileStream，可保留implementation替换自由。但不要盲目返回过宽 IEnumerable 而隐藏rand…",
    failure:
      "若把「Abstraction Surface与Signature…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Abstraction Surface与Signature…」的收益与反例。",
  },
];

export function MemberDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章：成员设计（建议90-101）：机制与证据"
      prompt="切换《第7章：成员设计（建议90-101）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章：成员设计（建议90-101）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MemberDesignMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第7章：成员设计（建议90-101）：机制路径"
      stages={STAGES}
    />
  );
}

export function MemberDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第7章：成员设计（建议90-101）：失效与核验"
      stages={STAGES}
    />
  );
}
