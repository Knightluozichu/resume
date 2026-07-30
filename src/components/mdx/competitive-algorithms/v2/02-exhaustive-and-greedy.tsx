"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-02",
  title: "第2章 · 细腻的“暴力”美学——穷举算法与贪心算法",
  question:
    "怎样区分可证明完整的穷举、具有交换论证的贪心与只在样例上成功的捷径？",
  concepts: [
    "穷举算法",
    "素数判断",
    "关灯游戏",
    "从穷举算法到贪心算法",
    "买卖股票的最佳时机",
    "物流站的选址（一）",
    "贪心算法",
    "物流站的选址（二）",
    "回合制游戏",
    "快递包装",
    "暴力的算法与精妙的结论",
  ],
  constraints: [
    {
      label: "固定穷举算法",
      premise: "写出穷举算法的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖素数判断前提的候选策略。",
      evidence:
        "保存第2章 · 细腻的“暴力”美学——穷举算法与贪心算法的最小、边界与对抗输入。",
    },
    {
      label: "验证关灯游戏",
      premise: "保持题面不变，逐步执行关灯游戏。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“看到局部收益最大就直接采用贪心，没有交换论证或最小反例搜索”触发时的最小反例。",
    },
    {
      label: "验收暴力的算法与精妙的结论",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision: "只有正确性与成本同时满足才接受暴力的算法与精妙的结论方案。",
      evidence:
        "交付第2章 · 细腻的“暴力”美学——穷举算法与贪心算法的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化穷举算法的输入与输出",
    "选择素数判断并声明不变量",
    "执行关灯游戏并记录成本",
    "用暴力的算法与精妙的结论核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第2章 · 细腻的“暴力”美学——穷举算法与贪心算法的相同题面与输入",
    "仅注入错误策略：看到局部收益最大就直接采用贪心，没有交换论证或最小反例搜索",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant:
    "穷举覆盖所有候选且无重复遗漏，贪心选择具有可说明的安全性或明确反例边界。",
  fault: "看到局部收益最大就直接采用贪心，没有交换论证或最小反例搜索",
  artifact:
    "第2章 · 细腻的“暴力”美学——穷举算法与贪心算法的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai02ExhaustiveAndGreedyConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai02ExhaustiveAndGreedyExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai02ExhaustiveAndGreedyCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
