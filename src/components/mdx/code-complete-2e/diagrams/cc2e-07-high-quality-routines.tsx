import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-07-high-quality-routines",
  title: "第7章：高质量的子程序",
  nodes: ["调用意图", "职责边界", "参数契约", "实现路径", "调用证据"],
  concepts: [
    "第7章 高质量的子程序",
    "7.1 创建子程序的正当理由",
    "似乎过于简单而没必要写成子程序的操作",
    "总结：创建子程序的理由",
    "7.2 在子程序层上设计",
    "7.3 好的子程序名字",
    "7.4 子程序可以写多长",
    "7.5 如何使用子程序参数",
    "7.6 使用函数时要特别考虑的问题",
    "什么时候使用函数，什么时候使用过程",
    "设置函数的返回值",
    "7.7 宏子程序和内联子程序",
    "宏子程序在使用上的限制",
    "内联子程序",
    "关键点",
  ],
  mechanism:
    "高质量子程序承担一个可命名职责，参数表达输入输出合同，控制路径和错误语义足够局部，调用者无需阅读实现即可正确使用",
  success: "第7章：高质量的子程序 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第7章：高质量的子程序 在“布尔开关、隐式全局状态和混合层次让一个函数承担多个原因变化”处拒绝",
  model: {
    primaryLabel: "创建理由",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.9,
    secondaryLabel: "层次设计",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 10,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 19,
    limit: 60,
    metricLabel: "命名压力",
  },
} as const;

export function Cc2e07HighQualityRoutinesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
