import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "建立无探针基线",
  "接入探针",
  "定义事务边界",
  "关联错误与Span",
  "测量观测开销",
  "验证采样代表性",
] as const;
const concepts = [
  "第6章 APM",
  "6.1 使用NewRelic",
  "6.2 Elastic APM",
  "6.2.1 什么是Elastic APM",
  "6.2.2 启动ELK",
  "6.2.3 启动APM Server",
  "6.2.4 使用Elastic APM",
  "6.2.5 错误日志",
] as const;

export function Ndbg06ApmMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 6 章 APM · 证据地图"
      label="Node Debugging / Map"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg06ApmExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 6 章 APM · 故障实验"
      label="Node Debugging / Experiment"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg06ApmEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 6 章 APM · 恢复证据"
      label="Node Debugging / Evidence"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
