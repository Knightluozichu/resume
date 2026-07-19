import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-acknowledgments",
  title: "鸣谢",
  nodes: ["原始研究", "作者综合", "技术评审", "翻译审校", "读者复核"],
  concepts: ["鸣谢"],
  mechanism:
    "鸣谢页用于识别研究、评审、翻译和出版贡献的不同责任，不把被感谢等同于对每条技术主张背书",
  success: "鸣谢 的机制链、结果和复位轨迹与预测一致",
  failure: "鸣谢 在“把贡献者名单当作许可声明或事实证明”处拒绝",
  model: {
    primaryLabel: "贡献类型",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 1.3,
    secondaryLabel: "同行评审",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 8,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 16,
    limit: 52,
    metricLabel: "样例验证压力",
  },
} as const;

export function Cc2eAcknowledgmentsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
