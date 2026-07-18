import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "读取帧时间戳",
  "计算有界步长",
  "更新模拟状态",
  "缩放物理画布",
  "保存绘制状态",
  "提交帧并重调度",
] as const;

export function Jpg18AnimationCanvasMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 18 章 动画与Canvas图形"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg18AnimationCanvasExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 18 章 动画与Canvas图形"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg18AnimationCanvasEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 18 章 动画与Canvas图形"
      nodes={nodes}
      mode="evidence"
    />
  );
}
