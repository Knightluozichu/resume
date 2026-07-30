"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-04",
  title: "第4章 · AI的思维模式——搜索",
  question: "怎样从状态、动作、终止条件和剪枝安全性证明搜索既完整又可控？",
  concepts: [
    "深度优先搜索",
    "零钱搭配",
    "油漆桶与连通性",
    "记忆化",
    "在游戏中制胜的AI",
    "永远的平局——井字棋",
    "一起来解谜——数独",
    "速战速决——拼图",
    "迭代加深",
    "搜索的深度",
    "加深加深再加深——扫雷",
    "现代人工智能技术选讲",
  ],
  constraints: [
    {
      label: "固定深度优先搜索",
      premise: "写出深度优先搜索的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖零钱搭配前提的候选策略。",
      evidence: "保存第4章 · AI的思维模式——搜索的最小、边界与对抗输入。",
    },
    {
      label: "验证油漆桶与连通性",
      premise: "保持题面不变，逐步执行油漆桶与连通性。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“把 visited 设得过粗，合并了未来选择不同的状态并错误剪掉答案”触发时的最小反例。",
    },
    {
      label: "验收现代人工智能技术选讲",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision: "只有正确性与成本同时满足才接受现代人工智能技术选讲方案。",
      evidence:
        "交付第4章 · AI的思维模式——搜索的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化深度优先搜索的输入与输出",
    "选择零钱搭配并声明不变量",
    "执行油漆桶与连通性并记录成本",
    "用现代人工智能技术选讲核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第4章 · AI的思维模式——搜索的相同题面与输入",
    "仅注入错误策略：把 visited 设得过粗，合并了未来选择不同的状态并错误剪掉答案",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant:
    "搜索状态唯一可解释，访问策略不会丢失可行解，深度和资源上限有显式退出。",
  fault: "把 visited 设得过粗，合并了未来选择不同的状态并错误剪掉答案",
  artifact:
    "第4章 · AI的思维模式——搜索的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai04SearchAndAiConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai04SearchAndAiExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai04SearchAndAiCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
