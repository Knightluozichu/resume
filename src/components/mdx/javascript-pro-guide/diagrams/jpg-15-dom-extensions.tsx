import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "约束选择器输入",
  "查询静态结果",
  "遍历元素节点",
  "读写类与数据",
  "管理焦点滚动",
  "验证兼容边界",
] as const;

export function Jpg15DomExtensionsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 15 章 DOM扩展"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg15DomExtensionsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 15 章 DOM扩展"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg15DomExtensionsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 15 章 DOM扩展"
      nodes={nodes}
      mode="evidence"
    />
  );
}
