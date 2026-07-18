import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "规范化路径",
  "选择同步边界",
  "打开资源",
  "读写或管道",
  "提交原子结果",
  "关闭并核验",
] as const;
const concepts = [
  "第6章 在Node.js中操作文件系统",
  "6.1 同步方法与异步方法",
  "6.2 对文件执行读写操作",
  "6.3 创建与读取目录",
  "6.4 查看与修改文件或目录的信息",
  "6.5 可以对文件或目录执行的其他操作",
  "6.6 使用文件流",
  "6.7 对路径进行操作",
  "6.8 小结",
] as const;

export function Ndg06FilesystemMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 6 章 在 Node.js 中操作文件系统 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg06FilesystemExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 6 章 在 Node.js 中操作文件系统 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg06FilesystemEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 6 章 在 Node.js 中操作文件系统 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
