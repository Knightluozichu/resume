import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "划定实现边界",
  "声明导出接口",
  "解析依赖图",
  "实例化模块记录",
  "执行并建立活绑定",
  "按需动态加载或重导出"
] as const;

export function Jdg10ModulesMapLab() {
  return <Jdg7MechanismLab title="第 10 章 模块 · 机制地图" label="Modules" nodes={nodes} mode="map" />;
}

export function Jdg10ModulesExperimentLab() {
  return <Jdg7MechanismLab title="第 10 章 模块 · 运行时实验" label="Modules" nodes={nodes} mode="experiment" />;
}

export function Jdg10ModulesEvidenceLab() {
  return <Jdg7MechanismLab title="第 10 章 模块 · 恢复证据" label="Modules" nodes={nodes} mode="evidence" />;
}
