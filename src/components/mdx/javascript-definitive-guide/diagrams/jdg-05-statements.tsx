import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "进入语句块",
  "选择条件分支",
  "执行循环迭代",
  "处理跳转或 yield",
  "捕获并清理异常",
  "提交声明与结果"
] as const;

export function Jdg05StatementsMapLab() {
  return <Jdg7MechanismLab title="第 5 章 语句 · 机制地图" label="Statements" nodes={nodes} mode="map" />;
}

export function Jdg05StatementsExperimentLab() {
  return <Jdg7MechanismLab title="第 5 章 语句 · 运行时实验" label="Statements" nodes={nodes} mode="experiment" />;
}

export function Jdg05StatementsEvidenceLab() {
  return <Jdg7MechanismLab title="第 5 章 语句 · 恢复证据" label="Statements" nodes={nodes} mode="evidence" />;
}
