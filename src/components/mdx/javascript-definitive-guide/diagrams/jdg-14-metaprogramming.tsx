import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "读取属性与对象特性",
  "选择 Symbol 协议",
  "截获语言级操作",
  "用 Reflect 转发默认语义",
  "施加校验或记录",
  "核对 Proxy 不变量"
] as const;

export function Jdg14MetaprogrammingMapLab() {
  return <Jdg7MechanismLab title="第 14 章 元编程 · 机制地图" label="Metaprogramming" nodes={nodes} mode="map" />;
}

export function Jdg14MetaprogrammingExperimentLab() {
  return <Jdg7MechanismLab title="第 14 章 元编程 · 运行时实验" label="Metaprogramming" nodes={nodes} mode="experiment" />;
}

export function Jdg14MetaprogrammingEvidenceLab() {
  return <Jdg7MechanismLab title="第 14 章 元编程 · 恢复证据" label="Metaprogramming" nodes={nodes} mode="evidence" />;
}
