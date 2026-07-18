import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "启动 JavaScript 环境",
  "求值表达式与语句",
  "组合对象、数组和函数",
  "引入类与模块",
  "构造字符频率直方图",
  "核对输入、状态与输出"
] as const;

export function Jdg01IntroductionMapLab() {
  return <Jdg7MechanismLab title="第 1 章 JavaScript 简介 · 机制地图" label="Introduction to JavaScript" nodes={nodes} mode="map" />;
}

export function Jdg01IntroductionExperimentLab() {
  return <Jdg7MechanismLab title="第 1 章 JavaScript 简介 · 运行时实验" label="Introduction to JavaScript" nodes={nodes} mode="experiment" />;
}

export function Jdg01IntroductionEvidenceLab() {
  return <Jdg7MechanismLab title="第 1 章 JavaScript 简介 · 恢复证据" label="Introduction to JavaScript" nodes={nodes} mode="evidence" />;
}
