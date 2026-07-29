"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么异常设计的核心是Caller还能做什么",
    mechanism:
      "异常不是“出现错误”的统一标签，而是control transfer与diagnostic object。调用者若能按正常业务分支纠正输入，就不该用exception做循环跳转；若当前层无法恢复，就应保持cause与stack向上交给真正的boundary；只有某层拥有足够context决定resp…",
    failure:
      "若把「为什么异常设计的核心是Caller还能做什么」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么异常设计的核心是Caller还能做什么」的收益与反例。",
  },
  {
    label: "Failure Channel与Expected Path…",
    mechanism:
      "对无法用正常return value表达、且当前调用无法继续的失败，specific exception比magic error code更能保留type、message、stack和cause，也不会让caller轻易忽略。但现代结论不是“所有失败都throw”：validation、TryPar…",
    failure:
      "若把「Failure Channel与Expected Path…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Failure Channel与Expected Path…」的收益与反例。",
  },
  {
    label: "Propagation、Finally与Loop Reco…",
    mechanism:
      "原题需要拆成两种情况：同一abstraction没有新context时直接 throw; ，它保留original stack；跨abstraction要把low-level exception翻译成stable domain exception时，创建outer exception并把原exception作为InnerException。",
    failure:
      "若把「Propagation、Finally与Loop Reco…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Propagation、Finally与Loop Reco…」的收益与反例。",
  },
];

export function ExceptionsAndCustomExceptionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第5章：异常与自定义异常（建议58-70）：机制与证据"
      prompt="切换《第5章：异常与自定义异常（建议58-70）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第5章：异常与自定义异常（建议58-70）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ExceptionsAndCustomExceptionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第5章：异常与自定义异常（建议58-70）：机制路径"
      stages={STAGES}
    />
  );
}

export function ExceptionsAndCustomExceptionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第5章：异常与自定义异常（建议58-70）：失效与核验"
      stages={STAGES}
    />
  );
}
