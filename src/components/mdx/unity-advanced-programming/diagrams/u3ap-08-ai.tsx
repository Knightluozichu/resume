"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["固定感知", "运行决策", "选择动作", "处理中断", "记录轨迹", "复验行为目标"] as const;

export function U3ap08AiArchitectureLab() {
  return <LeadProgramEvidenceLab title="第8章 AI" label="第8章" nodes={nodes} mode="architecture" />;
}

export function U3ap08AiRuntimeLab() {
  return <LeadProgramEvidenceLab title="第8章 运行实验" label="第8章" nodes={nodes} mode="runtime" />;
}

export function U3ap08AiReleaseLab() {
  return <LeadProgramEvidenceLab title="第8章 回归证据" label="第8章" nodes={nodes} mode="release" />;
}
