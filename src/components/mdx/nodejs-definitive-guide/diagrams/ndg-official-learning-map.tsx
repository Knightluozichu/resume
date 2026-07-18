import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "核验2014版身份",
  "掌握运行时模块",
  "处理二进制文件",
  "建立网络进程",
  "接入Web数据",
  "完成综合案例",
] as const;
const concepts = [
  "第1章 Node.js介绍",
  "第2章 Node.js中的交互式运行环境——REPL",
  "第3章 Node.js基础知识",
  "第4章 模块与npm包管理工具",
  "第5章 使用Buffer类处理二进制数据",
  "第6章 在Node.js中操作文件系统",
  "第7章 实现基于TCP与UDP的数据通信",
  "第8章 创建HTTP与HTTPS服务器及客户端",
  "第9章 进程与子进程",
  "第10章 Node.js中的错误处理与断言处理",
  "第11章 加密与压缩",
  "第12章 Node.js中的其他模块",
  "第13章 数据库访问",
  "第14章 使用Express构建Web应用程序",
  "第15章 使用Socket.IO类库实现WebSocket通信",
  "第16章 综合案例介绍",
] as const;

export function NdgOfficialLearningMapMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="《Node.js 权威指南》权威学习地图 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function NdgOfficialLearningMapExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="《Node.js 权威指南》权威学习地图 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function NdgOfficialLearningMapEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="《Node.js 权威指南》权威学习地图 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
