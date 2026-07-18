import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "产生原始输入",
  "构造事件对象",
  "沿捕获路径传播",
  "执行目标与冒泡监听",
  "决定默认行为",
  "移除监听并回收",
] as const;

export function Jpg17EventsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 17 章 事件"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg17EventsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 17 章 事件"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg17EventsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 17 章 事件"
      nodes={nodes}
      mode="evidence"
    />
  );
}
