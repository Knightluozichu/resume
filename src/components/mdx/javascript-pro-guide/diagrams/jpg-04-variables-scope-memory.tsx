import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "创建执行上下文",
  "建立词法环境",
  "解析标识符",
  "共享或复制值",
  "更新可达图",
  "释放外部引用",
] as const;

export function Jpg04VariablesScopeMemoryMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 4 章 变量、作用域与内存"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg04VariablesScopeMemoryExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 变量、作用域与内存"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg04VariablesScopeMemoryEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 4 章 变量、作用域与内存"
      nodes={nodes}
      mode="evidence"
    />
  );
}
