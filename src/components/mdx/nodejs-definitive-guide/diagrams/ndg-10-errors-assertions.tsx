import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "划定错误边界",
  "分类错误",
  "附加上下文",
  "传播或恢复",
  "断言不变量",
  "决定进程命运",
] as const;
const concepts = [
  "第10章 Node.js中的错误处理与断言处理",
  "10.1 使用domain模块处理错误",
  "10.2 Node.js中的断言处理",
  "10.3 小结",
] as const;

export function Ndg10ErrorsAssertionsMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 10 章 Node.js 中的错误处理与断言处理 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg10ErrorsAssertionsExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 10 章 Node.js 中的错误处理与断言处理 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg10ErrorsAssertionsEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 10 章 Node.js 中的错误处理与断言处理 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
