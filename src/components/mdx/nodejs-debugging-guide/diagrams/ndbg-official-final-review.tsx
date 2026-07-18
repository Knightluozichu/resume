import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "报警分诊",
  "固定故障样本",
  "分层采集证据",
  "定位首个根因",
  "实施最小修复",
  "恢复签发",
] as const;
const concepts = [
  "第1章 CPU",
  "第2章 内存",
  "第3章 代码",
  "第4章 工具",
  "第5章 日志",
  "第6章 APM",
  "第7章 监控",
  "第8章 应用",
] as const;

export function NdbgOfficialFinalReviewMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》全书总复习 · 证据地图"
      label="Node Debugging / Map"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function NdbgOfficialFinalReviewExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》全书总复习 · 故障实验"
      label="Node Debugging / Experiment"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function NdbgOfficialFinalReviewEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》全书总复习 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
