import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "建立代码契约",
  "自动化静态与单元检查",
  "测量用户性能",
  "生成不可变产物",
  "灰度发布观察",
  "按证据回滚",
] as const;

export function Jpg28BestPracticesMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 28 章 最佳实践"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg28BestPracticesExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 28 章 最佳实践"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg28BestPracticesEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 28 章 最佳实践"
      nodes={nodes}
      mode="evidence"
    />
  );
}
