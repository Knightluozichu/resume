import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "监听 TCP 端口",
  "接收 HTTP 请求头",
  "选择方法和路径",
  "读取或跳过正文",
  "写入状态头与正文",
  "结束响应并记录耗时",
] as const;

export function Jfs12BuildWebServicesMapLab() {
  return (
    <JfsBookLab
      title="第 12 章 构建 Web 服务 · 机制地图"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs12BuildWebServicesExperimentLab() {
  return (
    <JfsBookLab
      title="第 12 章 构建 Web 服务 · 边界实验"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs12BuildWebServicesEvidenceLab() {
  return (
    <JfsBookLab
      title="第 12 章 构建 Web 服务 · 恢复证据"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
