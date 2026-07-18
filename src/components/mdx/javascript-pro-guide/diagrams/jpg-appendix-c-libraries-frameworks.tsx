import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "定义产品约束",
  "识别控制所有者",
  "验证核心能力",
  "评估生态与维护",
  "构建代表性样例",
  "记录退出策略",
] as const;

export function JpgAppendixCLibrariesFrameworksMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="附录 C JavaScript库和框架"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgAppendixCLibrariesFrameworksExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 C JavaScript库和框架"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgAppendixCLibrariesFrameworksEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="附录 C JavaScript库和框架"
      nodes={nodes}
      mode="evidence"
    />
  );
}
