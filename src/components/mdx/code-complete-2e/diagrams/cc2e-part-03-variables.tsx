import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-part-03-variables",
  title: "第3部分：变量",
  nodes: ["业务数据", "类型", "命名", "局部生命周期", "共享边界"],
  concepts: ["第3部分 变量"],
  mechanism:
    "变量部分把业务量映射为类型和名称，缩短作用域与存活期，并对指针、共享和全局状态设置所有权边界",
  success: "第3部分：变量 的机制链、结果和复位轨迹与预测一致",
  failure: "第3部分：变量 在“同一变量跨阶段复用且由多个位置修改”处拒绝",
  model: {
    primaryLabel: "变量使用",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 2,
    secondaryLabel: "命名",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 9,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "基本类型压力",
  },
} as const;

export function Cc2ePart03VariablesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
