import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-official-learning-map",
  title: "《代码大全（第2版）》权威学习地图",
  nodes: ["构建基础", "代码结构", "数据控制", "质量改善", "系统工艺"],
  concepts: [],
  mechanism:
    "学习地图按构建基础、代码结构、数据与控制、质量改善、系统工艺建立依赖图，每个节点只有在解释、视觉、实践与复核四类证据齐全时才解锁",
  success:
    "《代码大全（第2版）》权威学习地图 的机制链、结果和复位轨迹与预测一致",
  failure:
    "《代码大全（第2版）》权威学习地图 在“只按页数或标题打勾，跳过先决条件和四级证据”处拒绝",
  model: {
    primaryLabel: "49个单元",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.2,
    secondaryLabel: "685个节点",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 7,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 18,
    limit: 48,
    metricLabel: "七部分依赖压力",
  },
} as const;

export function Cc2eOfficialLearningMapMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
