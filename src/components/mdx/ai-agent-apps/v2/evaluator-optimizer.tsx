"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "评估-优化：什么时候该先出稿，再迭代打磨",
  focus: "在评价标准清晰且反馈能带来可测改进时运行生成—评价—修订循环",
  invariant:
    "评价器必须依据冻结 rubric 给出可执行反馈，并由预算和达标条件终止循环",
  fault: "评价器每轮改变标准，优化器只追逐措辞而质量指标没有提升",
  evidence: "rubric 版本、初稿、逐项评分、反馈、修订差异、轮次成本与停止原因",
  stages: ["生成初稿", "按 rubric 评分", "定位差距", "定向修订", "达标或停止"],
  signals: ["rubric", "评分", "修订差异", "停止原因"],
} satisfies AgentApplicationModel;

export function EvaluatorOptimizerModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function EvaluatorOptimizerTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function EvaluatorOptimizerEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
