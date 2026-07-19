import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-preface",
  title: "前言",
  nodes: ["版次变化", "构建范围", "读者对象", "使用方式", "复核边界"],
  concepts: ["前言"],
  mechanism:
    "前言界定第二版的对象、软件构建范围和使用方式，版本元数据与教学内容必须分层记录",
  success: "前言 的机制链、结果和复位轨迹与预测一致",
  failure:
    "前言 在“把版本介绍误当作正文授权，或把现代实践倒灌为原书原话”处拒绝",
  model: {
    primaryLabel: "第2版",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.2,
    secondaryLabel: "构建知识",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 7,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 18,
    limit: 48,
    metricLabel: "语言无关压力",
  },
} as const;

export function Cc2ePrefaceMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
