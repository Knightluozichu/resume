"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "并行与编排-工作者：什么时候同时做，什么时候先拆再派",
  focus: "区分预先可分的并行任务与由编排者动态拆解的工作者任务",
  invariant:
    "子任务边界、共享状态、合并规则和失败策略必须在执行前或规划后显式落盘",
  fault: "多个工作者同时写同一资源，合并器只保留最后完成者的结果",
  evidence:
    "任务图、依赖边、工作者输入输出、完成顺序、冲突、合并决策、耗时与成本",
  stages: ["依赖分析", "任务拆分", "并发执行", "结果合并", "冲突验收"],
  signals: ["依赖图", "完成顺序", "冲突", "合并结果"],
} satisfies AgentApplicationModel;

export function ParallelizationAndOrchestratorWorkersModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ParallelizationAndOrchestratorWorkersTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ParallelizationAndOrchestratorWorkersEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
