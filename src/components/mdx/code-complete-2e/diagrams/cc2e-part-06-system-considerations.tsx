import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-06-system-considerations",
  title: "第6部分：系统考虑",
  nodes: ["规模边界", "管理基线", "集成策略", "工具链", "系统证据"],
  concepts: ["第6部分 系统考虑"],
  mechanism:
    "系统考虑把规模、管理、配置、集成和工具放进同一交付模型，使每个构件和变更都有身份、顺序、验证与恢复路径",
  success: "第6部分：系统考虑 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第6部分：系统考虑 在“只管理最终二进制，不追踪构件来源和集成顺序”处拒绝",
  model: {
    primaryLabel: "规模",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 2.1,
    secondaryLabel: "配置估算",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 10,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 22,
    limit: 58,
    metricLabel: "人员压力",
  },
} as const;

export function Cc2ePart06SystemConsiderationsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
