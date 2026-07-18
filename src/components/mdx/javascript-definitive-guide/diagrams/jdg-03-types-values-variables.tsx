import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "识别值的类型",
  "区分原始值与对象引用",
  "执行数值或文本运算",
  "应用类型转换",
  "绑定 let、const 或 var",
  "检查相等性与可变性"
] as const;

export function Jdg03TypesValuesVariablesMapLab() {
  return <Jdg7MechanismLab title="第 3 章 类型、值和变量 · 机制地图" label="Types, Values, and Variables" nodes={nodes} mode="map" />;
}

export function Jdg03TypesValuesVariablesExperimentLab() {
  return <Jdg7MechanismLab title="第 3 章 类型、值和变量 · 运行时实验" label="Types, Values, and Variables" nodes={nodes} mode="experiment" />;
}

export function Jdg03TypesValuesVariablesEvidenceLab() {
  return <Jdg7MechanismLab title="第 3 章 类型、值和变量 · 恢复证据" label="Types, Values, and Variables" nodes={nodes} mode="evidence" />;
}
