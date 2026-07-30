"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-03",
  title: "第3章 · 万变中的不变——随机",
  question:
    "怎样同时记录随机算法的分布、种子、失败概率、期望成本和确定性验证？",
  concepts: [
    "随机的方法",
    "巧算圆周率——蒲丰投针实验",
    "迷宫的十字路口",
    "大数据与小数据",
    "随机的时间复杂度",
    "多米诺骨牌上的等差数列",
    "小算的生活费",
    "随机的准确性",
    "从字符串到数字——哈希算法",
    "哈希算法的隐患",
    "贪心+随机——探索最优解",
  ],
  constraints: [
    {
      label: "固定随机的方法",
      premise: "写出随机的方法的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖巧算圆周率——蒲丰投针实验前提的候选策略。",
      evidence: "保存第3章 · 万变中的不变——随机的最小、边界与对抗输入。",
    },
    {
      label: "验证迷宫的十字路口",
      premise: "保持题面不变，逐步执行迷宫的十字路口。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“只记录最终随机结果，不保存生成器、种子、调用顺序和失败判据”触发时的最小反例。",
    },
    {
      label: "验收贪心+随机——探索最优解",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision: "只有正确性与成本同时满足才接受贪心+随机——探索最优解方案。",
      evidence:
        "交付第3章 · 万变中的不变——随机的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化随机的方法的输入与输出",
    "选择巧算圆周率——蒲丰投针实验并声明不变量",
    "执行迷宫的十字路口并记录成本",
    "用贪心+随机——探索最优解核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第3章 · 万变中的不变——随机的相同题面与输入",
    "仅注入错误策略：只记录最终随机结果，不保存生成器、种子、调用顺序和失败判据",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant:
    "同一生成器状态可重放同一轨迹，随机性只影响已声明的时间或误差边界。",
  fault: "只记录最终随机结果，不保存生成器、种子、调用顺序和失败判据",
  artifact:
    "第3章 · 万变中的不变——随机的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai03RandomnessConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai03RandomnessExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai03RandomnessCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
