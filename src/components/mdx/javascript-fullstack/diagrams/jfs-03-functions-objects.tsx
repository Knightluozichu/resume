import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "识别重复职责",
  "定义参数与返回契约",
  "创建并调用函数",
  "组织对象状态",
  "选择集合结构",
  "验证别名与封装",
] as const;

export function Jfs03FunctionsObjectsMapLab() {
  return (
    <JfsBookLab
      title="第 3 章 函数与对象 · 机制地图"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs03FunctionsObjectsExperimentLab() {
  return (
    <JfsBookLab
      title="第 3 章 函数与对象 · 边界实验"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs03FunctionsObjectsEvidenceLab() {
  return (
    <JfsBookLab
      title="第 3 章 函数与对象 · 恢复证据"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="evidence"
    />
  );
}
