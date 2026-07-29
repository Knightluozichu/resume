"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么算法名称不能替代Threat Model",
    mechanism:
      "“用了hash”“启用了SSL”“程序集已签名”都没有说明保护什么、对手有什么能力、key由谁持有、失败时是否fail closed。security control必须对应property：confidentiality、integrity、authenticity、authorization和a…",
    failure:
      "若把「为什么算法名称不能替代Threat Model」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么算法名称不能替代Threat Model」的收益与反例。",
  },
  {
    label: "Numeric Bound、Hash与File Prote…",
    mechanism:
      "type宽度是security boundary：length、price、offset、permission bit和allocation size若overflow，可能绕过validation或导致undersized buffer。按domain范围选type，在外部输入处检查min/max…",
    failure:
      "若把「Numeric Bound、Hash与File Prote…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Numeric Bound、Hash与File Prote…」的收益与反例。",
  },
  {
    label: "Transport、Secret Lifetime与Cry…",
    mechanism:
      "原题中的SSL应更新为TLS。现代.NET使用HttpClient/SslStream并保持certificate hostname、chain、expiry/revocation policy；Microsoft建议优先让OS选择当前支持的TLS版本，避免硬编码过时protocol。绝不能在pro…",
    failure:
      "若把「Transport、Secret Lifetime与Cry…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Transport、Secret Lifetime与Cry…」的收益与反例。",
  },
];

export function SecurityDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第9章：安全性设计（建议113-121）：机制与证据"
      prompt="切换《第9章：安全性设计（建议113-121）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第9章：安全性设计（建议113-121）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SecurityDesignMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第9章：安全性设计（建议113-121）：机制路径"
      stages={STAGES}
    />
  );
}

export function SecurityDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第9章：安全性设计（建议113-121）：失效与核验"
      stages={STAGES}
    />
  );
}
