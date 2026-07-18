import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "创建对象与原型",
  "读取或写入属性",
  "沿原型链查找",
  "检查所有权与可枚举性",
  "扩展或序列化对象",
  "验证描述符不变量"
] as const;

export function Jdg06ObjectsMapLab() {
  return <Jdg7MechanismLab title="第 6 章 对象 · 机制地图" label="Objects" nodes={nodes} mode="map" />;
}

export function Jdg06ObjectsExperimentLab() {
  return <Jdg7MechanismLab title="第 6 章 对象 · 运行时实验" label="Objects" nodes={nodes} mode="experiment" />;
}

export function Jdg06ObjectsEvidenceLab() {
  return <Jdg7MechanismLab title="第 6 章 对象 · 恢复证据" label="Objects" nodes={nodes} mode="evidence" />;
}
