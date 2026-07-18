import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "用选择器定位节点",
  "读写类与数据属性",
  "测量窗口和元素",
  "解析地址与历史",
  "调度计时任务",
  "撤销全局副作用",
] as const;

export function Jfs08DomExtensionsBomMapLab() {
  return (
    <JfsBookLab
      title="第 8 章 DOM 扩展与 BOM · 机制地图"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs08DomExtensionsBomExperimentLab() {
  return (
    <JfsBookLab
      title="第 8 章 DOM 扩展与 BOM · 边界实验"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs08DomExtensionsBomEvidenceLab() {
  return (
    <JfsBookLab
      title="第 8 章 DOM 扩展与 BOM · 恢复证据"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
