"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "目标预算",
  "基线捕获",
  "瓶颈分类",
  "工具下钻",
  "单变量复验",
  "自动门禁",
] as const;

export function ProfOfficialFinalReviewMapLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》综合验收 · 系统地图"
      label="全书综合验收"
      nodes={nodes}
      mode="map"
    />
  );
}

export function ProfOfficialFinalReviewExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》综合验收 · 故障实验"
      label="全书综合验收"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function ProfOfficialFinalReviewEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》综合验收 · 证据验收"
      label="全书综合验收"
      nodes={nodes}
      mode="evidence"
    />
  );
}
