import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "声明导出接口",
  "解析模块说明符",
  "构建依赖图",
  "实例化实时绑定",
  "按拓扑求值",
  "缓存或按需加载",
] as const;

export function Jpg26ModulesMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 26 章 模块"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg26ModulesExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 26 章 模块"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg26ModulesEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 26 章 模块"
      nodes={nodes}
      mode="evidence"
    />
  );
}
