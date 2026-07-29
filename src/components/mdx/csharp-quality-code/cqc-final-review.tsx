"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么终审必须从“记住157条”升级为“组合后仍正确”",
    mechanism:
      "真实代码不会按章节分开失败。一个import endpoint同时涉及numeric bounds、Try validation、collection/query、exception boundary、narrow API、clean method和tests；一个parallel export又同…",
    failure:
      "若把「为什么终审必须从“记住157条”升级为“组合后仍正确”」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么终审必须从“记住157条”升级为“组合后仍正确”」的收益与反例。",
  },
  {
    label: "官方12章压缩回顾",
    mechanism:
      "本节把「官方12章压缩回顾」放回《总复习：官方12章与157条建议整书验收》的输入、状态变化与输出路径中理解。",
    failure:
      "若把「官方12章压缩回顾」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「官方12章压缩回顾」的收益与反例。",
  },
  {
    label: "场景一：Import API",
    mechanism:
      "外部CSV必须先checked bounds和Try validation（Ch1/9），用collection/index避免重复scan（Ch2），expected row error与database failure分开（Ch5），对外只暴露use-case contract（Ch7），met…",
    failure:
      "若把「场景一：Import API」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「场景一：Import API」的收益与反例。",
  },
];

export function CqcFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="总复习：官方12章与157条建议整书验收：机制与证据"
      prompt="切换《总复习：官方12章与157条建议整书验收》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《总复习：官方12章与157条建议整书验收》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CqcFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="总复习：官方12章与157条建议整书验收：机制路径"
      stages={STAGES}
    />
  );
}

export function CqcFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="总复习：官方12章与157条建议整书验收：失效与核验"
      stages={STAGES}
    />
  );
}
