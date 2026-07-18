"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["选择 UI 栈", "追踪输入", "更新页面状态", "触发重建", "采集批次帧时", "验证页面生命周期"] as const;

export function U3ap04UiArchitectureLab() {
  return <LeadProgramEvidenceLab title="第4章 UI" label="第4章" nodes={nodes} mode="architecture" />;
}

export function U3ap04UiRuntimeLab() {
  return <LeadProgramEvidenceLab title="第4章 运行实验" label="第4章" nodes={nodes} mode="runtime" />;
}

export function U3ap04UiReleaseLab() {
  return <LeadProgramEvidenceLab title="第4章 回归证据" label="第4章" nodes={nodes} mode="release" />;
}
