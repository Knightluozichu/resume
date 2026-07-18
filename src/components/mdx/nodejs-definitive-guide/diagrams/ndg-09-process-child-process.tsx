import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "定义进程角色",
  "冻结参数环境",
  "创建子进程",
  "交换消息",
  "传播失败",
  "等待退出",
] as const;
const concepts = [
  "第9章 进程与子进程",
  "9.1 Node.js中的进程",
  "9.2 创建多进程应用程序",
  "9.3 在多个子进程中运行Node.js应用程序",
  "9.4 小结",
] as const;

export function Ndg09ProcessChildProcessMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 9 章 进程与子进程 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg09ProcessChildProcessExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 9 章 进程与子进程 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg09ProcessChildProcessEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 9 章 进程与子进程 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
