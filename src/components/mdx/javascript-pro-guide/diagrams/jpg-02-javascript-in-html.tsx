import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "解析HTML",
  "发现脚本资源",
  "并行或阻塞下载",
  "按策略执行",
  "触发文档事件",
  "验证失败回退",
] as const;

export function Jpg02JavascriptInHtmlMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 2 章 HTML中的JavaScript"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg02JavascriptInHtmlExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 HTML中的JavaScript"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg02JavascriptInHtmlEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 2 章 HTML中的JavaScript"
      nodes={nodes}
      mode="evidence"
    />
  );
}
