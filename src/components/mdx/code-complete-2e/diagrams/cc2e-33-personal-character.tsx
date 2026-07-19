import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-33-personal-character",
  title: "第33章：个人性格",
  nodes: ["能力边界", "反馈学习", "诚实报告", "合作实践", "习惯固化"],
  concepts: [
    "第33章 个人性格",
    "33.1 个人性格是否和本书话题无关",
    "33.2 聪明和谦虚",
    "33.3 求知欲",
    "33.4 诚实",
    "33.5 交流与合作",
    "33.6 创造力和纪律",
    "33.7 偷懒",
    "33.8 不像你想象中那样起作用的性格",
    "矜持",
    "经验",
    "编程狂人",
    "33.9 习惯",
    "更多资源",
    "关键点",
  ],
  mechanism:
    "专业成长把谦虚、求知、诚实、沟通、创造力和纪律落实为可观察习惯：承认未知、寻求反馈、报告失败并修订做法",
  success: "第33章：个人性格 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第33章：个人性格 在“把自信、经验或长时间工作误当作正确性证据”处拒绝",
  model: {
    primaryLabel: "谦虚",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.4,
    secondaryLabel: "求知",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 8,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 18,
    limit: 58,
    metricLabel: "诚实压力",
  },
} as const;

export function Cc2e33PersonalCharacterMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
