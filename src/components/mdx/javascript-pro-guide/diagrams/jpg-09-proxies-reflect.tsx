import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "确定拦截操作",
  "创建目标代理",
  "委托Reflect默认行为",
  "加入验证跟踪",
  "检查规范不变式",
  "撤销与异常签发",
] as const;

export function Jpg09ProxiesReflectMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 9 章 代理与反射"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg09ProxiesReflectExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 9 章 代理与反射"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg09ProxiesReflectEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 9 章 代理与反射"
      nodes={nodes}
      mode="evidence"
    />
  );
}
