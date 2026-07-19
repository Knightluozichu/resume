import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-16-loops",
  title: "第16章：控制循环",
  nodes: ["循环前状态", "进入条件", "单次不变量", "退出条件", "循环后状态"],
  concepts: [
    "第16章 控制循环",
    "16.1 选择循环的种类",
    "什么时候使用while循环",
    "什么时候用带退出的循环",
    "何时使用for循环",
    "何时使用foreach循环",
    "16.2 循环控制",
    "进入循环",
    "处理好循环体",
    "退出循环",
    "检查端点",
    "使用循环变量",
    "循环应该有多长",
    "16.3 轻松创建循环——由内而外",
    "16.4 循环和数组的关系",
    "关键点",
  ],
  mechanism:
    "循环用初始化、继续条件、不变量、进展量和退出后置条件建立证明，并对零次、一次、末端和越界邻域测试",
  success: "第16章：控制循环 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第16章：控制循环 在“索引与集合长度错一位，或循环体不保证向退出条件推进”处拒绝",
  model: {
    primaryLabel: "循环种类",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 2.1,
    secondaryLabel: "控制",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 9,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "端点压力",
  },
} as const;

export function Cc2e16LoopsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
