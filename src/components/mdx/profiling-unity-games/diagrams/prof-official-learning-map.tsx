"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "目标与设备",
  "帧预算",
  "目标机采样",
  "瓶颈分类",
  "工具下钻",
  "回归签发",
] as const;

export function ProfOfficialLearningMapMapLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》权威学习地图 · 系统地图"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function ProfOfficialLearningMapExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》权威学习地图 · 故障实验"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function ProfOfficialLearningMapEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="《Unity 游戏性能分析终极指南》权威学习地图 · 证据验收"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
