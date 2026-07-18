import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "提取对象职责",
  "定义构造不变量",
  "创建实例状态",
  "沿原型共享方法",
  "组合或继承行为",
  "检查所有权与替换原则",
] as const;

export function Jfs04ObjectOrientedProgrammingMapLab() {
  return (
    <JfsBookLab
      title="第 4 章 面向对象编程 · 机制地图"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs04ObjectOrientedProgrammingExperimentLab() {
  return (
    <JfsBookLab
      title="第 4 章 面向对象编程 · 边界实验"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs04ObjectOrientedProgrammingEvidenceLab() {
  return (
    <JfsBookLab
      title="第 4 章 面向对象编程 · 恢复证据"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="evidence"
    />
  );
}
