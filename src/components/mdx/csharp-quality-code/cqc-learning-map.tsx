"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么导学必须先固定版本、目录和验收证据",
    mechanism:
      "本书是《编写高质量代码：改善C 程序的157个建议》第一版，作者陆敏技，机械工业出版社，ISBN 9787111356493；本学习体系以作者发布的12章157条目录为唯一outline anchor。旧学习页曾把内容重排成10个泛化主题，导致原书建议不可追溯；本版恢复每条原题，再明确哪些2011结论要在现代.NET中收窄或改写。",
    failure:
      "若把「为什么导学必须先固定版本、目录和验收证据」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么导学必须先固定版本、目录和验收证据」的收益与反例。",
  },
  {
    label: "官方12章总览",
    mechanism:
      "本节把「官方12章总览」放回《导学：官方12章与157条建议学习地图》的输入、状态变化与输出路径中理解。",
    failure:
      "若把「官方12章总览」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「官方12章总览」的收益与反例。",
  },
  {
    label: "条跨章节主线",
    mechanism:
      "Ch1定义default/equality/hash，Ch2把它用于Dictionary/HashSet key，Ch3通过generic/variance传播type relation，Ch7-8决定public type是否保持invariant。任何mutable key、default se…",
    failure:
      "若把「条跨章节主线」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「条跨章节主线」的收益与反例。",
  },
];

export function CqcLearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="导学：官方12章与157条建议学习地图：机制与证据"
      prompt="切换《导学：官方12章与157条建议学习地图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《导学：官方12章与157条建议学习地图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CqcLearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="导学：官方12章与157条建议学习地图：机制路径"
      stages={STAGES}
    />
  );
}

export function CqcLearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="导学：官方12章与157条建议学习地图：失效与核验"
      stages={STAGES}
    />
  );
}
