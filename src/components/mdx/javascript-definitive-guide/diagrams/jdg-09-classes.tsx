import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "声明类或构造函数",
  "创建实例",
  "在原型上查找方法",
  "初始化公有与私有字段",
  "扩展或委托行为",
  "验证身份与不变量"
] as const;

export function Jdg09ClassesMapLab() {
  return <Jdg7MechanismLab title="第 9 章 类 · 机制地图" label="Classes" nodes={nodes} mode="map" />;
}

export function Jdg09ClassesExperimentLab() {
  return <Jdg7MechanismLab title="第 9 章 类 · 运行时实验" label="Classes" nodes={nodes} mode="experiment" />;
}

export function Jdg09ClassesEvidenceLab() {
  return <Jdg7MechanismLab title="第 9 章 类 · 恢复证据" label="Classes" nodes={nodes} mode="evidence" />;
}
