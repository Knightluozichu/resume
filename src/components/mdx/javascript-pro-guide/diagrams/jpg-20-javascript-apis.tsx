import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确认安全与权限",
  "选择复制共享或转移",
  "建立资源所有权",
  "处理流式背压",
  "封装组件边界",
  "撤销密钥URL与监听",
] as const;

export function Jpg20JavascriptApisMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 20 章 JavaScript API"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg20JavascriptApisExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 20 章 JavaScript API"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg20JavascriptApisEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 20 章 JavaScript API"
      nodes={nodes}
      mode="evidence"
    />
  );
}
