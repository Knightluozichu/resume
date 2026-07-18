import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "拆分需求",
  "定义协议路由",
  "实现状态存取",
  "连接实时通道",
  "注入故障",
  "端到端验收",
] as const;
const concepts = [
  "第16章 综合案例介绍",
  "16.1 创建简单聊天室应用程序",
  "16.2 创建Web应用程序",
  "16.3 小结",
] as const;

export function Ndg16IntegratedCasesMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 16 章 综合案例介绍 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg16IntegratedCasesExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 16 章 综合案例介绍 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg16IntegratedCasesEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 16 章 综合案例介绍 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
