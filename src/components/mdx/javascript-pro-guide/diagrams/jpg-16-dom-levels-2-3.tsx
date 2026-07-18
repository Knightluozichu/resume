import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确定文档与命名空间",
  "读取级联样式",
  "选择遍历过滤器",
  "设置Range边界",
  "提取或修改片段",
  "验证变更后边界",
] as const;

export function Jpg16DomLevels23MapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 16 章 DOM2和DOM3"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg16DomLevels23ExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 16 章 DOM2和DOM3"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg16DomLevels23EvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 16 章 DOM2和DOM3"
      nodes={nodes}
      mode="evidence"
    />
  );
}
