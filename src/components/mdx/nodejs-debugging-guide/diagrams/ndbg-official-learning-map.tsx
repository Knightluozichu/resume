import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "核验2018版身份",
  "定义故障症状",
  "固定可重放样本",
  "采集性能证据",
  "关联代码与遥测",
  "恢复并签发",
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

export function NdbgOfficialLearningMapMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》权威学习地图 · 证据地图"
      label="Node Debugging / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function NdbgOfficialLearningMapExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》权威学习地图 · 故障实验"
      label="Node Debugging / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function NdbgOfficialLearningMapEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="《Node.js 调试指南》权威学习地图 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
