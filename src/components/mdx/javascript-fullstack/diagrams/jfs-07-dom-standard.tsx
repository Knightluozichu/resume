import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "解析文档节点",
  "选择稳定根节点",
  "遍历父子关系",
  "创建离线片段",
  "提交最小树变更",
  "核对身份和可访问结构",
] as const;

export function Jfs07DomStandardMapLab() {
  return (
    <JfsBookLab
      title="第 7 章 DOM 标准与使用 · 机制地图"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs07DomStandardExperimentLab() {
  return (
    <JfsBookLab
      title="第 7 章 DOM 标准与使用 · 边界实验"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs07DomStandardEvidenceLab() {
  return (
    <JfsBookLab
      title="第 7 章 DOM 标准与使用 · 恢复证据"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
