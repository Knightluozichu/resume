"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "问题分类",
  "选择工具",
  "稳定计数器",
  "重复采样",
  "统计阈值",
  "失败报告",
] as const;

export function Prof11ToolSelectionAutomationMapLab() {
  return (
    <ProfilingEvidenceLab
      title="工具选择、自动指标与性能测试 · 系统地图"
      label="Tool selection and automation"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof11ToolSelectionAutomationExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="工具选择、自动指标与性能测试 · 故障实验"
      label="Tool selection and automation"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof11ToolSelectionAutomationEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="工具选择、自动指标与性能测试 · 证据验收"
      label="Tool selection and automation"
      nodes={nodes}
      mode="evidence"
    />
  );
}
