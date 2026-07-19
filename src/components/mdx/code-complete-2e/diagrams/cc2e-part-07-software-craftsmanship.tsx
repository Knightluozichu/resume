import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-07-software-craftsmanship",
  title: "第7部分：软件工艺",
  nodes: ["代码布局", "说明意图", "个人习惯", "工艺判断", "持续学习"],
  concepts: ["第7部分 软件工艺"],
  mechanism:
    "软件工艺把布局、说明、个人习惯、问题域抽象、反复试验和持续学习组合成面向人类读者的长期实践",
  success: "第7部分：软件工艺 的机制链、结果和复位轨迹与预测一致",
  failure: "第7部分：软件工艺 在“把风格规范当作终点，忽略问题域与反馈”处拒绝",
  model: {
    primaryLabel: "风格",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 1.6,
    secondaryLabel: "文档",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 9,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 19,
    limit: 60,
    metricLabel: "品格压力",
  },
} as const;

export function Cc2ePart07SoftwareCraftsmanshipMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
