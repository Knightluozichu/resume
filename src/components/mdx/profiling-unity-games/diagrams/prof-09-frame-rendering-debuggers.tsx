"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "Profiler 定类",
  "捕获目标帧",
  "逐事件回放",
  "资源状态",
  "发现冗余",
  "GPU 工具复验",
] as const;

export function Prof09FrameRenderingDebuggersMapLab() {
  return (
    <ProfilingEvidenceLab
      title="Frame Debugger 与 Rendering Debugger · 系统地图"
      label="Frame and Rendering Debuggers"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof09FrameRenderingDebuggersExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Frame Debugger 与 Rendering Debugger · 故障实验"
      label="Frame and Rendering Debuggers"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof09FrameRenderingDebuggersEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Frame Debugger 与 Rendering Debugger · 证据验收"
      label="Frame and Rendering Debuggers"
      nodes={nodes}
      mode="evidence"
    />
  );
}
