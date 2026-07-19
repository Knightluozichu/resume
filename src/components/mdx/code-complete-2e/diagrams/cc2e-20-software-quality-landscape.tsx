import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-20-software-quality-landscape",
  title: "第20章：软件质量概述",
  nodes: ["质量目标", "技术组合", "缺陷发现", "修正反馈", "质量复盘"],
  concepts: [
    "第20章 软件质量概述",
    "20.1 软件质量的特性",
    "20.2 改善软件质量的技术",
    "开发过程",
    "设置目标",
    "20.3 不同质量保障技术的相对效能",
    "缺陷检测率",
    "找出缺陷的成本",
    "修正缺陷的成本",
    "20.4 什么时候进行质量保证工作",
    "20.5 软件质量的普遍原理",
    "推荐读物",
    "相关标准",
    "关键点",
  ],
  mechanism:
    "质量目标必须区分正确性、可靠性、可维护性、性能和安全等属性，再为各属性选择预防、检测和修复技术",
  success: "第20章：软件质量概述 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第20章：软件质量概述 在“用单一覆盖率或缺陷数代表全部质量属性”处拒绝",
  model: {
    primaryLabel: "质量特性",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 1.8,
    secondaryLabel: "过程目标",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 10,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "技术效能压力",
  },
} as const;

export function Cc2e20SoftwareQualityLandscapeMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
