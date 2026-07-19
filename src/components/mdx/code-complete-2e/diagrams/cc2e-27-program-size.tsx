import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-27-program-size",
  title: "第27章：程序规模对“构建”的影响",
  nodes: ["规模口径", "沟通网络", "缺陷分布", "活动比例", "方法调整"],
  concepts: [
    "第27章 程序规模对“构建”的影响",
    "27.1 交流和规模",
    "27.2 项目规模的范围",
    "27.3 项目规模对错误的影响",
    "27.4 项目规模对生产率的影响",
    "27.5 项目规模对开发活动的影响",
    "活动比例和项目规模",
    "程序、产品、系统和系统产品",
    "方法论和规模",
    "额外资源",
    "关键点",
  ],
  mechanism:
    "程序规模改变沟通网络、缺陷分布、生产率和活动比例，方法必须随团队和系统边界调整，不能线性外推小项目经验",
  success: "第27章：程序规模对“构建”的影响 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第27章：程序规模对“构建”的影响 在“把人数或代码量翻倍直接当作工期减半，忽略协调和集成成本”处拒绝",
  model: {
    primaryLabel: "交流规模",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 2.4,
    secondaryLabel: "错误",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 10,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "生产率压力",
  },
} as const;

export function Cc2e27ProgramSizeMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
