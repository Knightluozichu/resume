import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "复现固定输入",
  "保存原始异常",
  "定位首偏离点",
  "检查调用与异步链",
  "在责任边界恢复",
  "记录回归测试",
] as const;

export function Jpg21ErrorHandlingDebuggingMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 21 章 错误处理与调试"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg21ErrorHandlingDebuggingExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 21 章 错误处理与调试"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg21ErrorHandlingDebuggingEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 21 章 错误处理与调试"
      nodes={nodes}
      mode="evidence"
    />
  );
}
