"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["生成地图数据", "构建导航", "提交起终点", "运行 A*", "平滑与避障", "编辑器回归"] as const;

export function U3ap10MapPathfindingArchitectureLab() {
  return <LeadProgramEvidenceLab title="第10章 地图与寻路" label="第10章" nodes={nodes} mode="architecture" />;
}

export function U3ap10MapPathfindingRuntimeLab() {
  return <LeadProgramEvidenceLab title="第10章 运行实验" label="第10章" nodes={nodes} mode="runtime" />;
}

export function U3ap10MapPathfindingReleaseLab() {
  return <LeadProgramEvidenceLab title="第10章 回归证据" label="第10章" nodes={nodes} mode="release" />;
}
