"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["声明消息语义", "选择传输", "编码协议帧", "注入网络故障", "重建权威状态", "统计延迟一致性"] as const;

export function U3ap06NetworkLayerArchitectureLab() {
  return <LeadProgramEvidenceLab title="第6章 网络层" label="第6章" nodes={nodes} mode="architecture" />;
}

export function U3ap06NetworkLayerRuntimeLab() {
  return <LeadProgramEvidenceLab title="第6章 运行实验" label="第6章" nodes={nodes} mode="runtime" />;
}

export function U3ap06NetworkLayerReleaseLab() {
  return <LeadProgramEvidenceLab title="第6章 回归证据" label="第6章" nodes={nodes} mode="release" />;
}
