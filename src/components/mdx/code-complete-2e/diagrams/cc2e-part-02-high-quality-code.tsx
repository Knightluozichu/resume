import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-02-high-quality-code",
  title: "第2部分：创建高质量的代码",
  nodes: ["复杂度", "抽象类", "子程序", "防御边界", "伪代码实现"],
  concepts: ["第2部分 创建高质量的代码"],
  mechanism:
    "高质量代码从控制复杂度开始，通过抽象、类与子程序建立契约，在边界防御错误，并用伪代码过程逐步落地",
  success: "第2部分：创建高质量的代码 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第2部分：创建高质量的代码 在“类、函数和异常各自存在，却没有共同不变量”处拒绝",
  model: {
    primaryLabel: "设计",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.8,
    secondaryLabel: "类",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 8,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 16,
    limit: 62,
    metricLabel: "子程序压力",
  },
} as const;

export function Cc2ePart02HighQualityCodeMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
