import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "启动异步操作",
  "登记延续逻辑",
  "兑现或拒绝 Promise",
  "在微任务中恢复 await",
  "组合并发或异步迭代",
  "传播结果并清理资源"
] as const;

export function Jdg13AsynchronousJavascriptMapLab() {
  return <Jdg7MechanismLab title="第 13 章 异步 JavaScript · 机制地图" label="Asynchronous JavaScript" nodes={nodes} mode="map" />;
}

export function Jdg13AsynchronousJavascriptExperimentLab() {
  return <Jdg7MechanismLab title="第 13 章 异步 JavaScript · 运行时实验" label="Asynchronous JavaScript" nodes={nodes} mode="experiment" />;
}

export function Jdg13AsynchronousJavascriptEvidenceLab() {
  return <Jdg7MechanismLab title="第 13 章 异步 JavaScript · 恢复证据" label="Asynchronous JavaScript" nodes={nodes} mode="evidence" />;
}
