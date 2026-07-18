"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["列出质量属性", "画出现有依赖", "识别变化轴", "定义模块契约", "迁移一条用例", "验证故障边界"] as const;

export function U3ap02ArchitectureArchitectureLab() {
  return <LeadProgramEvidenceLab title="第2章 架构" label="第2章" nodes={nodes} mode="architecture" />;
}

export function U3ap02ArchitectureRuntimeLab() {
  return <LeadProgramEvidenceLab title="第2章 运行实验" label="第2章" nodes={nodes} mode="runtime" />;
}

export function U3ap02ArchitectureReleaseLab() {
  return <LeadProgramEvidenceLab title="第2章 回归证据" label="第2章" nodes={nodes} mode="release" />;
}
