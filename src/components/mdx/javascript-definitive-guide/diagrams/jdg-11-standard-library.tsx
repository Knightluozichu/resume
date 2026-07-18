import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "选择标准库类型",
  "构造规范化输入",
  "执行查询或变换",
  "处理编码、时区与区域设置",
  "捕获错误与边界",
  "序列化并交付结果"
] as const;

export function Jdg11StandardLibraryMapLab() {
  return <Jdg7MechanismLab title="第 11 章 JavaScript 标准库 · 机制地图" label="The JavaScript Standard Library" nodes={nodes} mode="map" />;
}

export function Jdg11StandardLibraryExperimentLab() {
  return <Jdg7MechanismLab title="第 11 章 JavaScript 标准库 · 运行时实验" label="The JavaScript Standard Library" nodes={nodes} mode="experiment" />;
}

export function Jdg11StandardLibraryEvidenceLab() {
  return <Jdg7MechanismLab title="第 11 章 JavaScript 标准库 · 恢复证据" label="The JavaScript Standard Library" nodes={nodes} mode="evidence" />;
}
