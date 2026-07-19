import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-17-unusual-control-structures",
  title: "第17章：不常见的控制结构",
  nodes: ["控制目标", "候选结构", "路径展开", "退出清理", "复杂度复核"],
  concepts: [
    "第17章 不常见的控制结构",
    "17.1 子程序中的多个返回",
    "17.2 递归",
    "递归的例子",
    "使用递归的技巧",
    "17.3 goto",
    "反对goto的论点",
    "支持goto的观点",
    "关于goto的虚假辩论",
    "错误处理和goto",
    "goto和在else子句中的共享代码",
    "goto使用原则总结",
    "17.4 对不常见控制结构的看法",
    "其他资源",
    "关键点",
  ],
  mechanism:
    "多返回、递归和跳转只有在缩短错误路径或直接表达问题结构时才使用，并显式证明资源清理、终止与可读性收益",
  success: "第17章：不常见的控制结构 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第17章：不常见的控制结构 在“递归未严格缩小问题，或提前返回绕过清理和不变量恢复”处拒绝",
  model: {
    primaryLabel: "多个返回",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 2.1,
    secondaryLabel: "递归",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 9,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "goto争论压力",
  },
} as const;

export function Cc2e17UnusualControlStructuresMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
