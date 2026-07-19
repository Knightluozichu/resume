import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-01-foundations",
  title: "第1部分：打好基础",
  nodes: ["构建范围", "思维模型", "问题需求", "架构准备", "实践基线"],
  concepts: ["第1部分 打好基础"],
  mechanism:
    "基础部分先界定构建活动，再用隐喻辅助思考、冻结需求与架构先决条件，最后记录语言和约定决定",
  success: "第1部分：打好基础 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第1部分：打好基础 在“未准备需求和架构便开始编码，再用返工掩盖前置缺口”处拒绝",
  model: {
    primaryLabel: "构建定义",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.7,
    secondaryLabel: "隐喻",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 9,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 18,
    limit: 58,
    metricLabel: "先决条件压力",
  },
} as const;

export function Cc2ePart01FoundationsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
