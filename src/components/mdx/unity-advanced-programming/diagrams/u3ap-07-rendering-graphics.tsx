"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["锁定画面场景", "捕获管线阶段", "定位限制端", "修改一种策略", "复测变体画质", "签发设备预算"] as const;

export function U3ap07RenderingGraphicsArchitectureLab() {
  return <LeadProgramEvidenceLab title="第7章 渲染管线与图形学" label="第7章" nodes={nodes} mode="architecture" />;
}

export function U3ap07RenderingGraphicsRuntimeLab() {
  return <LeadProgramEvidenceLab title="第7章 运行实验" label="第7章" nodes={nodes} mode="runtime" />;
}

export function U3ap07RenderingGraphicsReleaseLab() {
  return <LeadProgramEvidenceLab title="第7章 回归证据" label="第7章" nodes={nodes} mode="release" />;
}
