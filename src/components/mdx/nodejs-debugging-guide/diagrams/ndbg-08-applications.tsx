import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "复现业务症状",
  "运行Clinic",
  "采集AliNode",
  "交叉验证证据",
  "实施最小修复",
  "回归与容量验收",
] as const;
const concepts = [
  "第8章 应用",
  "8.1 使用node-clinic",
  "8.2 alinode",
  "8.2.1 什么是alinode",
  "8.2.2 创建alinode应用",
  "8.2.3 安装alinode",
  "8.2.4 使用alinode诊断内存泄漏",
  "8.2.5 使用alinode诊断CPU性能瓶颈",
] as const;

export function Ndbg08ApplicationsMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 8 章 应用 · 证据地图"
      label="Node Debugging / Map"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg08ApplicationsExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 8 章 应用 · 故障实验"
      label="Node Debugging / Experiment"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg08ApplicationsEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 8 章 应用 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
