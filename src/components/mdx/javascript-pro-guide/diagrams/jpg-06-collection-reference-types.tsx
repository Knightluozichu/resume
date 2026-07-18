import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "定义键和值语义",
  "选择集合类型",
  "建立迭代顺序",
  "执行更新查询",
  "处理视图与弱引用",
  "验证复杂度内存",
] as const;

export function Jpg06CollectionReferenceTypesMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 6 章 集合引用类型"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg06CollectionReferenceTypesExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 6 章 集合引用类型"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg06CollectionReferenceTypesEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 6 章 集合引用类型"
      nodes={nodes}
      mode="evidence"
    />
  );
}
