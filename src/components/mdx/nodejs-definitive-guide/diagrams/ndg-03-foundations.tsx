import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "定位入口",
  "记录上下文",
  "注册事件",
  "排队异步任务",
  "观察循环",
  "调试退出",
] as const;
const concepts = [
  "第3章 Node.js基础知识",
  "3.1 Node.js中的控制台",
  "3.2 Node.js中的全局作用域及全局函数",
  "3.3 __filename变量与__dirname变量",
  "3.4 事件处理机制及事件环机制",
  "3.5 在Node.js中使用调试器",
  "3.6 小结",
] as const;

export function Ndg03FoundationsMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 3 章 Node.js 基础知识 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg03FoundationsExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 3 章 Node.js 基础知识 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg03FoundationsEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 3 章 Node.js 基础知识 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
