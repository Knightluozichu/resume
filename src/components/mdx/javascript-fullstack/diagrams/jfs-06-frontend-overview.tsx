import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "请求页面资源",
  "解析 HTML 与 CSS",
  "创建文档和窗口对象",
  "加载并执行脚本",
  "响应输入和网络",
  "更新界面并释放监听",
] as const;

export function Jfs06FrontendOverviewMapLab() {
  return (
    <JfsBookLab
      title="第 6 章 前端编程概述 · 机制地图"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs06FrontendOverviewExperimentLab() {
  return (
    <JfsBookLab
      title="第 6 章 前端编程概述 · 边界实验"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs06FrontendOverviewEvidenceLab() {
  return (
    <JfsBookLab
      title="第 6 章 前端编程概述 · 恢复证据"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
