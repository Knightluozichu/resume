import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "声明绑定",
  "识别值类型",
  "应用转换规则",
  "计算操作符",
  "推进控制流",
  "用边界样本确认",
] as const;

export function Jpg03LanguageBasicsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 3 章 语言基础"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg03LanguageBasicsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 语言基础"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg03LanguageBasicsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 3 章 语言基础"
      nodes={nodes}
      mode="evidence"
    />
  );
}
