import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "请求默认迭代器",
  "创建迭代状态",
  "调用next推进",
  "产出value/done",
  "处理提前return",
  "证明资源清理",
] as const;

export function Jpg07IteratorsGeneratorsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 7 章 迭代器与生成器"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg07IteratorsGeneratorsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 7 章 迭代器与生成器"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg07IteratorsGeneratorsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 7 章 迭代器与生成器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
