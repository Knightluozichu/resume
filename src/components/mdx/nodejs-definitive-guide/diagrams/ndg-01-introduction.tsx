import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "确认运行时",
  "固定版本",
  "加载模块",
  "注册处理器",
  "启动服务",
  "关闭并复盘",
] as const;
const concepts = [
  "第1章 Node.js介绍",
  "1.1 Node.js概述",
  "1.2 安装Node.js",
  "1.3 Node.js中的模块",
  "1.4 一个简单的示例应用程序",
  "1.5 小结",
] as const;

export function Ndg01IntroductionMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 1 章 Node.js 介绍 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg01IntroductionExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 1 章 Node.js 介绍 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg01IntroductionEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 1 章 Node.js 介绍 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
