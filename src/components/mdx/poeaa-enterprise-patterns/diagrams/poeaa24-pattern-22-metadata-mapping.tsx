import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-pattern-22-metadata-mapping",
  title: "13.1 元数据映射",
  family: "mapping",
  nodes: ["领域意图", "查询对象", "映射元数据", "执行", "对象结果"],
  focuses: ["元数据校验", "查询组合", "资源库边界", "参数化", "类型恢复"],
  concepts: ["13.1 元数据映射"],
  decision:
    "能由同一映射引擎处理两类对象，拒绝无效元数据，并证明配置错误在启动或测试期暴露",
  healthy: "13.1 元数据映射 的约束仍成立",
  failure: "13.1 元数据映射 在“元数据校验”处拒绝",
} as const;

// 对象关系映射：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24Pattern22MetadataMappingBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24Pattern22MetadataMappingMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24Pattern22MetadataMappingTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
