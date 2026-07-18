import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "启动 Node 进程",
  "装载模块",
  "提交文件或网络 I/O",
  "由 libuv 等待完成",
  "回到回调或 Promise",
  "处理退出与未决资源",
] as const;

export function Jfs11NodejsOverviewMapLab() {
  return (
    <JfsBookLab
      title="第 11 章 Node.js 概述 · 机制地图"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs11NodejsOverviewExperimentLab() {
  return (
    <JfsBookLab
      title="第 11 章 Node.js 概述 · 边界实验"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs11NodejsOverviewEvidenceLab() {
  return (
    <JfsBookLab
      title="第 11 章 Node.js 概述 · 恢复证据"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
