"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-01",
  title: "第1章 · 欢迎来到算法的世界",
  question: "怎样从题面约束、正确性合同和资源上限选择可提交的算法与 C++ 实现？",
  concepts: [
    "算法是什么",
    "算法竞赛是什么",
    "紧张刺激的算法竞赛",
    "C++——统治算法竞赛的编程语言",
    "算法的复杂度是什么",
    "从三个排序算法说起",
    "低复杂度算法一定更快吗",
    "构建高效的算法",
  ],
  constraints: [
    {
      label: "固定算法是什么",
      premise: "写出算法是什么的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖算法竞赛是什么前提的候选策略。",
      evidence: "保存第1章 · 欢迎来到算法的世界的最小、边界与对抗输入。",
    },
    {
      label: "验证紧张刺激的算法竞赛",
      premise: "保持题面不变，逐步执行紧张刺激的算法竞赛。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“只用样例输出判断正确，却没有验证排列保持、边界输入和复杂度”触发时的最小反例。",
    },
    {
      label: "验收构建高效的算法",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision: "只有正确性与成本同时满足才接受构建高效的算法方案。",
      evidence:
        "交付第1章 · 欢迎来到算法的世界的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化算法是什么的输入与输出",
    "选择算法竞赛是什么并声明不变量",
    "执行紧张刺激的算法竞赛并记录成本",
    "用构建高效的算法核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第1章 · 欢迎来到算法的世界的相同题面与输入",
    "仅注入错误策略：只用样例输出判断正确，却没有验证排列保持、边界输入和复杂度",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant:
    "算法对完整输入域终止并满足输出合同，时间、空间和数值范围不越过题目限制。",
  fault: "只用样例输出判断正确，却没有验证排列保持、边界输入和复杂度",
  artifact:
    "第1章 · 欢迎来到算法的世界的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai01WelcomeToAlgorithmsConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai01WelcomeToAlgorithmsExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai01WelcomeToAlgorithmsCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
