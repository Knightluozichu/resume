import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-49-plugin",
  title: "18.9 插件",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.9 插件"],
  decision: "能通过配置切换插件、拒绝不兼容实现，并记录加载失败与版本约束",
  healthy: "18.9 插件 的约束仍成立",
  failure: "18.9 插件 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern49PluginBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern49PluginMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern49PluginTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
