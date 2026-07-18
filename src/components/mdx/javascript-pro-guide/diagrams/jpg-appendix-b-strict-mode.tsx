import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确定脚本模块边界",
  "启用严格语义",
  "解析早期错误",
  "执行安全this规则",
  "暴露非法赋值",
  "迁移遗留代码",
] as const;

export function JpgAppendixBStrictModeMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="附录 B 严格模式"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgAppendixBStrictModeExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 B 严格模式"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgAppendixBStrictModeEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="附录 B 严格模式"
      nodes={nodes}
      mode="evidence"
    />
  );
}
