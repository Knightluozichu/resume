"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-06",
  title: "第6章 · 大事化小、小事化了——分治",
  question: "怎样证明分解后的子问题、合并步骤、递归终止与复杂度递推都成立？",
  concepts: [
    "分治基本介绍",
    "分治和动态规划的区别",
    "数乘型分治",
    "疯狂的细胞分裂",
    "简单的乘法",
    "矩阵乘法的分治",
    "神秘数字",
    "Strassen快速矩阵乘法",
    "线性结构问题的分治",
    "自助餐厅（一）",
    "自助餐厅（二）",
    "树形结构问题的分治",
    "沟通成本",
    "换根策略",
    "再看路径规划——地图上的分治",
  ],
  constraints: [
    {
      label: "固定分治基本介绍",
      premise: "写出分治基本介绍的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖分治和动态规划的区别前提的候选策略。",
      evidence: "保存第6章 · 大事化小、小事化了——分治的最小、边界与对抗输入。",
    },
    {
      label: "验证数乘型分治",
      premise: "保持题面不变，逐步执行数乘型分治。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“只计算递归子问题却遗漏跨分区贡献，使局部正确无法合成整体正确”触发时的最小反例。",
    },
    {
      label: "验收再看路径规划——地图上的分治",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision:
        "只有正确性与成本同时满足才接受再看路径规划——地图上的分治方案。",
      evidence:
        "交付第6章 · 大事化小、小事化了——分治的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化分治基本介绍的输入与输出",
    "选择分治和动态规划的区别并声明不变量",
    "执行数乘型分治并记录成本",
    "用再看路径规划——地图上的分治核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第6章 · 大事化小、小事化了——分治的相同题面与输入",
    "仅注入错误策略：只计算递归子问题却遗漏跨分区贡献，使局部正确无法合成整体正确",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant: "子问题覆盖原问题且边界不重不漏，合并恢复完整合同，基例保证终止。",
  fault: "只计算递归子问题却遗漏跨分区贡献，使局部正确无法合成整体正确",
  artifact:
    "第6章 · 大事化小、小事化了——分治的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai06DivideAndConquerConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai06DivideAndConquerExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai06DivideAndConquerCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
