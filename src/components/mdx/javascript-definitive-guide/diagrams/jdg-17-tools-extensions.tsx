import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "解析项目与依赖",
  "执行 lint 和格式化",
  "运行单元测试",
  "解析包并构建模块图",
  "转译扩展语法与类型",
  "生成可追溯产物"
] as const;

export function Jdg17ToolsExtensionsMapLab() {
  return <Jdg7MechanismLab title="第 17 章 JavaScript 工具与扩展 · 机制地图" label="JavaScript Tools and Extensions" nodes={nodes} mode="map" />;
}

export function Jdg17ToolsExtensionsExperimentLab() {
  return <Jdg7MechanismLab title="第 17 章 JavaScript 工具与扩展 · 运行时实验" label="JavaScript Tools and Extensions" nodes={nodes} mode="experiment" />;
}

export function Jdg17ToolsExtensionsEvidenceLab() {
  return <Jdg7MechanismLab title="第 17 章 JavaScript 工具与扩展 · 恢复证据" label="JavaScript Tools and Extensions" nodes={nodes} mode="evidence" />;
}
