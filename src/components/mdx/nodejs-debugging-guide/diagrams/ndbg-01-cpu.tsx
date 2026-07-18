import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "固定负载",
  "启动采样",
  "生成折叠栈",
  "识别热点",
  "对比分支",
  "复测签发",
] as const;
const concepts = [
  "第1章 CPU",
  "1.1 理解perf与火焰图（FlameGraph）",
  "1.1.1 perf",
  "1.1.2 火焰图",
  "1.1.3 红蓝差分火焰图",
  "1.2 使用v8-profiler分析CPU的使用情况",
  "1.3 Tick Processor及Web UI",
  "1.3.1 Tick Processor",
  "1.3.2 Web UI",
] as const;

export function Ndbg01CpuMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 1 章 CPU · 证据地图"
      label="Node Debugging / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg01CpuExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 1 章 CPU · 故障实验"
      label="Node Debugging / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg01CpuEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 1 章 CPU · 恢复证据"
      label="Node Debugging / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
