"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["确认连载身份", "核对文章索引", "映射九个章节", "标记缺失第9章", "建立实验题库", "全链验收"] as const;

export function U3apOfficialLearningMapArchitectureLab() {
  return <LeadProgramEvidenceLab title="《Unity3D 高级编程之进阶主程》权威学习地图" label="连载导览" nodes={nodes} mode="architecture" />;
}

export function U3apOfficialLearningMapRuntimeLab() {
  return <LeadProgramEvidenceLab title="连载导览 运行实验" label="连载导览" nodes={nodes} mode="runtime" />;
}

export function U3apOfficialLearningMapReleaseLab() {
  return <LeadProgramEvidenceLab title="连载导览 回归证据" label="连载导览" nodes={nodes} mode="release" />;
}
