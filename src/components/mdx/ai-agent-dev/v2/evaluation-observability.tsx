"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

const model = {
  title: "评估与可观测性",
  focus:
    "用 trace、span、环境状态、确定性 grader 与校准后的模型 grader 建立回归和生产监控",
  invariant:
    "每个评分都能回到输入、完整轨迹、环境结果、grader 版本和可复跑样本",
  fault: "只评价最终回答是否顺眼，忽略越权工具调用、绕路、成本和错误恢复",
  evidence:
    "eval case、模型版本、完整 messages、tool events、环境快照、grader、分数、延迟与成本",
  stages: ["定义任务", "采集轨迹", "运行 graders", "聚合指标", "回归告警"],
  signals: ["任务", "轨迹", "grader", "回归"],
} satisfies AgentApplicationModel;

export function EvaluationObservabilityModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function EvaluationObservabilityTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function EvaluationObservabilityEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
