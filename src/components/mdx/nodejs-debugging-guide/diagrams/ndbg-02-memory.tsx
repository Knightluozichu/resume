import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "稳定基线",
  "触发增长",
  "保存转储",
  "追踪保留链",
  "修复所有权",
  "同负载回放",
] as const;
const concepts = [
  "第2章 内存",
  "2.1 gcore与llnode",
  "2.1.1 Core和Core Dump",
  "2.1.2 gcore",
  "2.1.3 llnode",
  "2.1.4 测试Core Dump",
  "2.1.5 分析Core文件",
  "2.1.6 --abort-on-uncaught-exception",
  "2.1.7 小结",
  "2.2 heapdump",
  "2.2.1 使用heapdump",
  "2.2.2 Chrome DevTools",
  "2.2.3 对比快照",
  "2.3 memwatch-next",
  "2.3.1 使用memwatch-next",
  "2.3.2 使用Heap Diff",
  "2.3.3 结合heapdump使用",
  "2.4 cpu-memory-monitor",
  "2.4.1 使用cpu-memory-monitor",
  "2.4.2 cpu-memory-monitor源码解读",
] as const;

export function Ndbg02MemoryMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 2 章 内存 · 证据地图"
      label="Node Debugging / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg02MemoryExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 2 章 内存 · 故障实验"
      label="Node Debugging / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg02MemoryEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 2 章 内存 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
