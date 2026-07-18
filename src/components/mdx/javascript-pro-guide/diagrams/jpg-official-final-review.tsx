import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "装载模块脚本",
  "建立对象与事件",
  "调度异步任务",
  "验证网络数据",
  "事务持久化",
  "观测发布与回滚",
] as const;

export function JpgOfficialFinalReviewMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="《JavaScript高级程序设计（第4版）》全书总复习"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgOfficialFinalReviewExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《JavaScript高级程序设计（第4版）》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgOfficialFinalReviewEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="《JavaScript高级程序设计（第4版）》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
