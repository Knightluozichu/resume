import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "追溯语言与标准",
  "拆分语言和宿主能力",
  "辨认动态与函数特性",
  "映射浏览器与服务器场景",
  "搭建双运行环境",
  "核对同源程序的差异",
] as const;

export function Jfs01JavascriptIntroductionMapLab() {
  return (
    <JfsBookLab
      title="第 1 章 JavaScript 简介 · 机制地图"
      label="JavaScript 全栈开发 · 起点"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs01JavascriptIntroductionExperimentLab() {
  return (
    <JfsBookLab
      title="第 1 章 JavaScript 简介 · 边界实验"
      label="JavaScript 全栈开发 · 起点"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs01JavascriptIntroductionEvidenceLab() {
  return (
    <JfsBookLab
      title="第 1 章 JavaScript 简介 · 恢复证据"
      label="JavaScript 全栈开发 · 起点"
      nodes={nodes}
      mode="evidence"
    />
  );
}
