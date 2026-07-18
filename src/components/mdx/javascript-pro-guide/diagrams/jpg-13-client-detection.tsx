import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "定义目标任务",
  "检测直接能力",
  "验证方法语义",
  "查询权限上下文",
  "选择增强或降级",
  "记录真实失败",
] as const;

export function Jpg13ClientDetectionMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 13 章 客户端检测"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg13ClientDetectionExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 13 章 客户端检测"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg13ClientDetectionEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 13 章 客户端检测"
      nodes={nodes}
      mode="evidence"
    />
  );
}
