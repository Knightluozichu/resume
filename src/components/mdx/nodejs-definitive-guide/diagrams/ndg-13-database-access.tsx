import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "定义数据契约",
  "获取连接",
  "参数化查询",
  "检查结果",
  "提交或回滚",
  "归还连接",
] as const;
const concepts = [
  "第13章 数据库访问",
  "13.1 在MongoDB数据库中存取数据",
  "13.2 在MySQL数据库中存取数据",
  "13.3 小结",
] as const;

export function Ndg13DatabaseAccessMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 13 章 数据库访问 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg13DatabaseAccessExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 13 章 数据库访问 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg13DatabaseAccessEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 13 章 数据库访问 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
