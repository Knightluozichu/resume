"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“建议”必须还原成Decision Boundary",
    mechanism:
      "原书第1章的15条建议来自C /.NET 4时代，核心问题仍成立：转换失败是不是正常输入，default value有没有domain meaning，相等对象能否稳定进入hash collection，复制后是否共享nested state，runtime binding是否值得失去compile…",
    failure:
      "若把「为什么“建议”必须还原成Decision Boundary」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么“建议”必须还原成Decision Boundary」的收益与反例。",
  },
  {
    label: "字符串、转换与解析（建议1-4）",
    mechanism:
      "string immutable意味着每次产生不同text的operation返回新string，但compiler可能折叠constants，runtime也有不同Concat/interpolation handlers；不能从source表面断言一次拼接必然boxing。两三段表达式优先清晰的…",
    failure:
      "若把「字符串、转换与解析（建议1-4）」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「字符串、转换与解析（建议1-4）」的收益与反例。",
  },
  {
    label: "Nullable、readonly/const与enum（…",
    mechanism:
      "nullable value type表达“值或缺失”，适合unknown age、optional timeout等真实domain absence。不要用0/-1 sentinel混合数据与控制；但若field业务上必填，就应在construction拒绝null，而不是到处传播nullable。",
    failure:
      "若把「Nullable、readonly/const与enum（…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Nullable、readonly/const与enum（…」的收益与反例。",
  },
];

export function BasicLanguageElementsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章：基本语言要素（建议1-15）：机制与证据"
      prompt="切换《第1章：基本语言要素（建议1-15）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章：基本语言要素（建议1-15）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function BasicLanguageElementsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第1章：基本语言要素（建议1-15）：机制路径"
      stages={STAGES}
    />
  );
}

export function BasicLanguageElementsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第1章：基本语言要素（建议1-15）：失效与核验"
      stages={STAGES}
    />
  );
}
