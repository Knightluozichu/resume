import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确认输入表示",
  "构造内置对象",
  "区分值与包装",
  "执行格式或匹配",
  "检查隐式状态",
  "序列化边界结果",
] as const;

export function Jpg05BasicReferenceTypesMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 5 章 基本引用类型"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg05BasicReferenceTypesExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 基本引用类型"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg05BasicReferenceTypesEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 5 章 基本引用类型"
      nodes={nodes}
      mode="evidence"
    />
  );
}
