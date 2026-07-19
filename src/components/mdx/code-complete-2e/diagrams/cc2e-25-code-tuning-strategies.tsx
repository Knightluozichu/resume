import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-25-code-tuning-strategies",
  title: "第25章：代码调整策略",
  nodes: ["性能目标", "基线测量", "热点定位", "候选调整", "复测取舍"],
  concepts: [
    "第25章 代码调整策略",
    "25.1 性能概述",
    "质量特性和性能",
    "性能和代码调整",
    "25.2 代码调整简介",
    "Pareto法则",
    "一些无稽之谈",
    "何时调整代码",
    "编译器优化",
    "25.3 蜜糖和哥斯拉",
    "常见的低效率之源",
    "常见操作的相对效率",
    "25.4 性能测量",
    "性能测量应当精确",
    "25.5 反复调整",
    "25.6 代码调整方法总结",
    "推荐读物",
    "算法和数据类型",
    "关键点",
  ],
  mechanism:
    "代码调整先定义性能目标和负载，测量真实热点，比较算法、架构和局部优化方案，再以统计复测裁决收益与代价",
  success: "第25章：代码调整策略 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第25章：代码调整策略 在“优化未经测量的代码，或只报最好一次运行”处拒绝",
  model: {
    primaryLabel: "质量权衡",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 2.2,
    secondaryLabel: "调整时机",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 11,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 21,
    limit: 58,
    metricLabel: "低效来源压力",
  },
} as const;

export function Cc2e25CodeTuningStrategiesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
