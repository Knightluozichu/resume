"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["声明数据规模", "读取源码路径", "建立成本模型", "构造边界输入", "采集分配耗时", "签发语言约束"] as const;

export function U3ap01CsharpKeyTechniquesArchitectureLab() {
  return <LeadProgramEvidenceLab title="第1章 C# 要点技术" label="第1章" nodes={nodes} mode="architecture" />;
}

export function U3ap01CsharpKeyTechniquesRuntimeLab() {
  return <LeadProgramEvidenceLab title="第1章 运行实验" label="第1章" nodes={nodes} mode="runtime" />;
}

export function U3ap01CsharpKeyTechniquesReleaseLab() {
  return <LeadProgramEvidenceLab title="第1章 回归证据" label="第1章" nodes={nodes} mode="release" />;
}
