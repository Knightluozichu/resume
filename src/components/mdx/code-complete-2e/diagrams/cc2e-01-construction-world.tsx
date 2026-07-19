import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-01-construction-world",
  title: "第1章：欢迎进入软件构建的世界",
  nodes: ["问题定义", "架构边界", "详细设计", "可运行代码", "构建证据"],
  concepts: [
    "第1章 欢迎进入软件构建的世界",
    "1.1 什么是软件构建",
    "1.2 软件构建为何如此重要",
    "1.3 如何阅读本书",
    "关键点",
  ],
  mechanism:
    "软件构建把详细设计、编码、开发者测试、调试和集成连成可管理活动，并明确与需求、架构、系统测试和运维的交接",
  success: "第1章：欢迎进入软件构建的世界 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第1章：欢迎进入软件构建的世界 在“把所有开发活动都叫编码，导致输入、产物和完成标准失焦”处拒绝",
  model: {
    primaryLabel: "构建范围",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 1.2,
    secondaryLabel: "活动占比",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 7,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 18,
    limit: 48,
    metricLabel: "质量杠杆压力",
  },
} as const;

export function Cc2e01ConstructionWorldMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
