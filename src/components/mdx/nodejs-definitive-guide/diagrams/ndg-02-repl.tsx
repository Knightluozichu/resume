import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "启动会话",
  "声明状态",
  "执行表达式",
  "检查上下文",
  "管理资源",
  "退出清理",
] as const;
const concepts = [
  "第2章 Node.js中的交互式运行环境——REPL",
  "2.1 REPL运行环境概述",
  "2.2 在REPL运行环境中操作变量",
  "2.3 在REPL运行环境中使用下划线字符",
  "2.4 在REPL运行环境中直接运行函数",
  "2.5 在REPL运行环境中定义并启动服务器",
  "2.6 REPL运行环境中的上下文对象",
  "2.7 REPL运行环境中的基础命令",
  "2.8 小结",
] as const;

export function Ndg02ReplMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 2 章 Node.js 中的交互式运行环境 REPL · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg02ReplExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 2 章 Node.js 中的交互式运行环境 REPL · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg02ReplEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 2 章 Node.js 中的交互式运行环境 REPL · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
