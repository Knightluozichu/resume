import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "查询目标节点",
  "创建正确节点类型",
  "在片段中组装",
  "一次提交到文档",
  "观察变化批次",
  "断开观察与移除",
] as const;

export function Jpg14DomMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 14 章 DOM"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg14DomExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 14 章 DOM"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg14DomEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 14 章 DOM"
      nodes={nodes}
      mode="evidence"
    />
  );
}
