"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["分类数据", "声明 schema", "导出生成", "验证引用", "加载运行时", "切换语言复验"] as const;

export function U3ap03DataTablesArchitectureLab() {
  return <LeadProgramEvidenceLab title="第3章 数据表" label="第3章" nodes={nodes} mode="architecture" />;
}

export function U3ap03DataTablesRuntimeLab() {
  return <LeadProgramEvidenceLab title="第3章 运行实验" label="第3章" nodes={nodes} mode="runtime" />;
}

export function U3ap03DataTablesReleaseLab() {
  return <LeadProgramEvidenceLab title="第3章 回归证据" label="第3章" nodes={nodes} mode="release" />;
}
