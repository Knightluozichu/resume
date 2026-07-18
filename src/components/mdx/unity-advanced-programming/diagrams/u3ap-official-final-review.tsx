"use client";

import { LeadProgramEvidenceLab } from "./official-lead-program-lab";

const nodes = ["载入配置资源", "建立页面角色", "连接协议状态", "运行 AI 寻路", "捕获渲染性能", "执行全链回归"] as const;

export function U3apOfficialFinalReviewArchitectureLab() {
  return <LeadProgramEvidenceLab title="《Unity3D 高级编程之进阶主程》综合验收" label="连载验收" nodes={nodes} mode="architecture" />;
}

export function U3apOfficialFinalReviewRuntimeLab() {
  return <LeadProgramEvidenceLab title="连载验收 运行实验" label="连载验收" nodes={nodes} mode="runtime" />;
}

export function U3apOfficialFinalReviewReleaseLab() {
  return <LeadProgramEvidenceLab title="连载验收 回归证据" label="连载验收" nodes={nodes} mode="release" />;
}
