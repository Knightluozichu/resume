"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["校验源资产", "加载依赖", "实例化模型", "执行空间变换", "合并或保留", "释放并验收"] as const;

export function U3ap05ModelsAnimationArchitectureLab() {
  return <LeadProgramEvidenceLab title="第5章 资源、3D 模型与动画" label="第5章" nodes={nodes} mode="architecture" />;
}

export function U3ap05ModelsAnimationRuntimeLab() {
  return <LeadProgramEvidenceLab title="第5章 运行实验" label="第5章" nodes={nodes} mode="runtime" />;
}

export function U3ap05ModelsAnimationReleaseLab() {
  return <LeadProgramEvidenceLab title="第5章 回归证据" label="第5章" nodes={nodes} mode="release" />;
}
