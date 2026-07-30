"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = {
  unitId: "cai-05",
  title: "第5章 · 状态间的奇妙转移——动态规划",
  question: "怎样由最优子结构、状态定义、转移依赖和计算顺序构造动态规划？",
  concepts: [
    "初探动态规划",
    "拼图游戏——从搜索到动态规划",
    "物流仓库——状态的转移",
    "状态的巧妙定义",
    "股票投资计划——不同的状态和转移",
    "流浪猫的家——状态压缩与状态剪枝",
    "转移方式的神奇优化",
    "运输计划——在转移中剪枝",
    "会议安排——在决策中剪枝",
    "经典的动态规划算法",
    "路径规划——用动态规划创造算法",
    "矩阵乘积——用动态规划优化算法",
    "动态规划在文本处理中的应用",
  ],
  constraints: [
    {
      label: "固定初探动态规划",
      premise: "写出初探动态规划的输入域、输出合同、规模和数值范围。",
      decision: "只比较能够完整覆盖拼图游戏——从搜索到动态规划前提的候选策略。",
      evidence:
        "保存第5章 · 状态间的奇妙转移——动态规划的最小、边界与对抗输入。",
    },
    {
      label: "验证物流仓库——状态的转移",
      premise: "保持题面不变，逐步执行物流仓库——状态的转移。",
      decision: "在第一处状态变化处核对不变量与终止度量。",
      evidence:
        "记录“状态省略了影响未来决策的信息，使两个不同子问题被错误合并”触发时的最小反例。",
    },
    {
      label: "验收动态规划在文本处理中的应用",
      premise: "覆盖正常、边界、错误和最大规模，恢复相同初值复跑。",
      decision:
        "只有正确性与成本同时满足才接受动态规划在文本处理中的应用方案。",
      evidence:
        "交付第5章 · 状态间的奇妙转移——动态规划的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
    },
  ],
  normalTrace: [
    "形式化初探动态规划的输入与输出",
    "选择拼图游戏——从搜索到动态规划并声明不变量",
    "执行物流仓库——状态的转移并记录成本",
    "用动态规划在文本处理中的应用核对正确性、终止和资源",
  ],
  failureTrace: [
    "复用第5章 · 状态间的奇妙转移——动态规划的相同题面与输入",
    "仅注入错误策略：状态省略了影响未来决策的信息，使两个不同子问题被错误合并",
    "保存第一处错误决策与最小反例",
    "拒绝用偶然样例通过替代完整证明",
  ],
  invariant: "每个状态具有唯一语义，转移只读取已建立子问题并覆盖所有合法决策。",
  fault: "状态省略了影响未来决策的信息，使两个不同子问题被错误合并",
  artifact:
    "第5章 · 状态间的奇妙转移——动态规划的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。",
} satisfies CompetitionEvidenceModel;

export function Cai05DynamicProgrammingConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function Cai05DynamicProgrammingExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function Cai05DynamicProgrammingCounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
