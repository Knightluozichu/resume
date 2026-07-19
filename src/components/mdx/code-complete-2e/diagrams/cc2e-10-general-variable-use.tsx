import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-10-general-variable-use",
  title: "第10章：使用变量的一般事项",
  nodes: ["数据含义", "变量定义", "可靠初始化", "局部使用", "生命周期结束"],
  concepts: [
    "第10章 使用变量的一般事项",
    "10.1 数据认知",
    "数据认知测试",
    "有关数据类型的其他资源",
    "10.2 轻松掌握变量定义",
    "隐式声明",
    "10.3 变量初始化原则",
    "10.4 作用域",
    "使变量引用局部化",
    "尽可能缩短变量的“存活”时间",
    "减小作用域的一般原则",
    "有关缩小变量作用域的说明",
    "10.5 持续性",
    "10.6 绑定时间",
    "10.7 数据类型和控制结构之间的关系",
    "10.8 为变量指定单一用途",
    "关键点",
  ],
  mechanism:
    "变量应在已知含义和类型后定义，在所有读取路径前初始化，保持最小作用域、最短存活期和单一用途",
  success: "第10章：使用变量的一般事项 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第10章：使用变量的一般事项 在“依赖隐式默认值或在分支中漏初始化，错误只在特定路径出现”处拒绝",
  model: {
    primaryLabel: "数据认知",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 2,
    secondaryLabel: "隐式声明",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 9,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "初始化压力",
  },
} as const;

export function Cc2e10GeneralVariableUseMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
