import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-19-general-control-issues",
  title: "第19章：一般控制问题",
  nodes: ["业务判断", "布尔规范", "结构化块", "嵌套压平", "复杂度测量"],
  concepts: [
    "第19章 一般控制问题",
    "19.1 布尔表达式",
    "用true和false做布尔判断",
    "简化复杂的表达式",
    "编写肯定形式的布尔表达式",
    "用括号使布尔表达式更清晰",
    "理解布尔表达式是如何求值的",
    "按照数轴的顺序编写数值表达式",
    "与0比较的指导原则",
    "布尔表达式的常见问题",
    "19.2 复合语句（块）",
    "19.3 空语句",
    "19.4 驯服危险的深层嵌套",
    "对减少嵌套层次的技术的总结",
    "19.5 编程基础：结构化编程",
    "结构化编程的三个组成部分",
    "19.6 控制结构与复杂度",
    "复杂度的重要性",
    "降低复杂度的一般原则",
    "其它类型的复杂度",
    "关键点",
  ],
  mechanism:
    "一般控制问题把布尔表达式、块结构、嵌套深度和路径数作为认知负担处理，以早拒绝、命名条件和分解降低复杂度",
  success: "第19章：一般控制问题 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第19章：一般控制问题 在“为了减少行数压缩条件，路径数量和副作用次序反而更难验证”处拒绝",
  model: {
    primaryLabel: "布尔表达式",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 2.1,
    secondaryLabel: "块",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 9,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "空语句压力",
  },
} as const;

export function Cc2e19GeneralControlIssuesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
