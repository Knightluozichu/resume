import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "读取窗口关系",
  "区分视口与屏幕",
  "解析location",
  "检测navigator能力",
  "更新history状态",
  "响应导航与清理",
] as const;

export function Jpg12BrowserObjectModelMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 12 章 BOM"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg12BrowserObjectModelExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 12 章 BOM"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg12BrowserObjectModelEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 12 章 BOM"
      nodes={nodes}
      mode="evidence"
    />
  );
}
