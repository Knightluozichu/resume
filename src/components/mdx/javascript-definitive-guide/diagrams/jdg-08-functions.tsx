import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "定义函数与词法环境",
  "选择调用形式",
  "绑定 this 与参数",
  "执行函数体",
  "保留闭包状态",
  "返回值或继续高阶组合"
] as const;

export function Jdg08FunctionsMapLab() {
  return <Jdg7MechanismLab title="第 8 章 函数 · 机制地图" label="Functions" nodes={nodes} mode="map" />;
}

export function Jdg08FunctionsExperimentLab() {
  return <Jdg7MechanismLab title="第 8 章 函数 · 运行时实验" label="Functions" nodes={nodes} mode="experiment" />;
}

export function Jdg08FunctionsEvidenceLab() {
  return <Jdg7MechanismLab title="第 8 章 函数 · 恢复证据" label="Functions" nodes={nodes} mode="evidence" />;
}
