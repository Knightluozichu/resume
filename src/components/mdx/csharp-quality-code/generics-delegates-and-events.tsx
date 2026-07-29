"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么泛型、委托和变体属于同一个类型契约",
    mechanism:
      "泛型把“输入类型与输出类型有什么关系”交给compiler证明；delegate把“以后要调用哪段typed behavior”变成value；event再限制谁能发布这段behavior；variance则回答一个generic/delegate type能否沿继承关系安全转换。它们共同解决的不是…",
    failure:
      "若把「为什么泛型、委托和变体属于同一个类型契约」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么泛型、委托和变体属于同一个类型契约」的收益与反例。",
  },
  {
    label: "Generic Contract与Default（建议32…",
    mechanism:
      "当同一算法适用于多种type且需要保留input/output relationship时，generic优于 object +cast：caller获得compile-time checking，value type通常避免boxing，implementation也无需type switch。优…",
    failure:
      "若把「Generic Contract与Default（建议32…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Generic Contract与Default（建议32…」的收益与反例。",
  },
  {
    label: "Delegate、Closure与Event Owners…",
    mechanism:
      "常见callable shape优先复用 Action 、 Func 、 Predicate 、 Comparison 与 EventHandler ，降低无意义delegate type数量并获得既有variance。需要domain name、 ref/out 参数、特殊calling conv…",
    failure:
      "若把「Delegate、Closure与Event Owners…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Delegate、Closure与Event Owners…」的收益与反例。",
  },
];

export function GenericsDelegatesAndEventsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章：泛型、委托和事件（建议32-45）：机制与证据"
      prompt="切换《第3章：泛型、委托和事件（建议32-45）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章：泛型、委托和事件（建议32-45）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GenericsDelegatesAndEventsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第3章：泛型、委托和事件（建议32-45）：机制路径"
      stages={STAGES}
    />
  );
}

export function GenericsDelegatesAndEventsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第3章：泛型、委托和事件（建议32-45）：失效与核验"
      stages={STAGES}
    />
  );
}
