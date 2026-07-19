import { PoeaaDecisionLab } from "./poeaa-decision-lab";

const profile = {
  unitId: "poeaa24-official-learning-map",
  title: "《企业应用架构模式》权威学习地图",
  family: "book",
  nodes: ["应用边界", "叙述选择", "模式族", "模式协作", "架构证据"],
  focuses: ["76个正式单元", "119个目录节点", "18章", "51个模式", "10个模式族"],
  concepts: ["76个正式单元", "119个目录节点", "18章", "51个模式", "10个模式族"],
  decision:
    "能定位76个正式单元与119个目录节点，解释叙述部分如何约束51个模式的选择与组合",
  healthy: "《企业应用架构模式》权威学习地图 的约束仍成立",
  failure: "《企业应用架构模式》权威学习地图 在“76个正式单元”处拒绝",
} as const;

// 全书模式语言：三个视图分别验证责任、取舍和失败恢复，不再复用全书统一指标。
export function Poeaa24OfficialLearningMapBoundaryLab() {
  return <PoeaaDecisionLab {...profile} mode="boundary" />;
}

export function Poeaa24OfficialLearningMapMappingLab() {
  return <PoeaaDecisionLab {...profile} mode="tradeoff" />;
}

export function Poeaa24OfficialLearningMapTransactionLab() {
  return <PoeaaDecisionLab {...profile} mode="failure" />;
}
