import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-50-service-stub",
  title: "18.10 服务桩",
  family: "base",
  nodes: ["调用者", "抽象边界", "适配机制", "协作者", "结果"],
  focuses: ["依赖方向", "对象语义", "配置", "测试隔离", "表示转换"],
  concepts: ["18.10 服务桩"],
  decision:
    "能模拟成功、边界和故障响应，验证契约一致，并避免替身与真实服务长期漂移",
  healthy: "18.10 服务桩 的约束仍成立",
  failure: "18.10 服务桩 在“依赖方向”处拒绝",
} as const;

// 基础模式：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern50ServiceStubBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern50ServiceStubMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern50ServiceStubTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
