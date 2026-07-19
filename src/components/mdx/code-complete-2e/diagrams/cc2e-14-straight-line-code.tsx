import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-14-straight-line-code",
  title: "第14章：组织直线型代码",
  nodes: ["输入准备", "依赖计算", "相关语句", "结果组装", "顺序复核"],
  concepts: [
    "第14章 组织直线型代码",
    "14.1 必须有明确顺序的语句",
    "14.2 顺序无关的语句",
    "使代码易于自上而下的阅读",
    "把相关的语句组织在一起",
    "关键点",
  ],
  mechanism:
    "直线代码先满足真实数据依赖，再把同一概念层的语句聚集；无依赖时选择最能暴露意图和错误的顺序",
  success: "第14章：组织直线型代码 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第14章：组织直线型代码 在“依靠偶然顺序或远距离副作用，移动语句后行为静默改变”处拒绝",
  model: {
    primaryLabel: "强制顺序",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 2.1,
    secondaryLabel: "无关顺序",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 9,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "自上而下压力",
  },
} as const;

export function Cc2e14StraightLineCodeMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
