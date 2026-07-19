import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-23-debugging",
  title: "第23章：调试",
  nodes: ["失败复现", "假设列表", "区分实验", "最小修正", "回归学习"],
  concepts: [
    "第23章 调试",
    "23.1 调试概述",
    "调试在软件质量中所扮演的角色",
    "调试效率的巨大差异",
    "让你有所收获的缺陷",
    "一种效率低下的调试方法",
    "23.2 寻找缺陷",
    "科学的调试方法",
    "寻找缺陷的一些小建议",
    "语法错误",
    "23.3 修正缺陷",
    "23.4 调试中的心理因素",
    "心理取向如何导致调试时的盲目",
    "“心理距离”在调试中的作用",
    "23.5 调试工具——明显的和不那么明显的",
    "源代码比较工具",
    "编译器的警告消息",
    "扩展的语法和逻辑检查",
    "执行性能分析器",
    "测试框架",
    "调试器",
    "其它资源",
    "关键点",
  ],
  mechanism:
    "调试先稳定复现，列出相互竞争的原因假设，用最小区分实验定位首差，只修正根因并保留回归样本",
  success: "第23章：调试 的机制链、结果和复位轨迹与预测一致",
  failure: "第23章：调试 在“边观察边改多个位置，症状消失后无法说明原因”处拒绝",
  model: {
    primaryLabel: "调试角色",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 1.9,
    secondaryLabel: "科学方法",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 10,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 22,
    limit: 55,
    metricLabel: "修正压力",
  },
} as const;

export function Cc2e23DebuggingMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
