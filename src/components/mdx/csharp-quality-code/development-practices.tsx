"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么开发行为必须把“以后再改”变成可兑现承诺",
    mechanism:
      "YAGNI若没有tests会变成“不敢改”，自动化若只在项目末期补会得到不可测试UI和不可控环境，feature flag若没有owner/expiry则成为永久分支。规范行为不是流程表格，而是让每个change带着证据、rollback和下一次演进option进入仓库。",
    failure:
      "若把「为什么开发行为必须把“以后再改”变成可兑现承诺」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么开发行为必须把“以后再改”变成可兑现承诺」的收益与反例。",
  },
  {
    label: "Evidence-Driven Design与Refact…",
    mechanism:
      "只为当前已知use case实现最简单cohesive design，不为假想十种variants创建plugin framework；当第二个真实variant、量测到的scale或重复change出现时，再提取abstraction。与此同时，public schema/protocol/dat…",
    failure:
      "若把「Evidence-Driven Design与Refact…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Evidence-Driven Design与Refact…」的收益与反例。",
  },
  {
    label: "Test Code也是Production Asset（建…",
    mechanism:
      "behavior change、test和必要fixture在同一commit/PR，reviewer看到requirement如何被证明；test source与production使用同一version、branch和ownership。不要把tests当一次性脚本或另一个长期不同步仓库，除非c…",
    failure:
      "若把「Test Code也是Production Asset（建…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Test Code也是Production Asset（建…」的收益与反例。",
  },
];

export function DevelopmentPracticesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第12章：规范开发行为（建议154-157）：机制与证据"
      prompt="切换《第12章：规范开发行为（建议154-157）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第12章：规范开发行为（建议154-157）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DevelopmentPracticesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第12章：规范开发行为（建议154-157）：机制路径"
      stages={STAGES}
    />
  );
}

export function DevelopmentPracticesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第12章：规范开发行为（建议154-157）：失效与核验"
      stages={STAGES}
    />
  );
}
