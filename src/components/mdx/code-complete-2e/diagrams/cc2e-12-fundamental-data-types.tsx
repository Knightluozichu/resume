import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-12-fundamental-data-types",
  title: "第12章：基本数据类型",
  nodes: ["业务量", "类型选择", "范围约束", "运算规则", "边界测试"],
  concepts: [
    "第12章 基本数据类型",
    "12.1 使用数的普遍规则",
    "12.2 整数",
    "12.3 浮点数",
    "12.4 字符和字符串",
    "C中的字符串",
    "12.5 布尔变量",
    "12.6 枚举类型",
    "如果你的语言里没有枚举类型",
    "12.7 命名常量",
    "12.8 数组",
    "12.9 创建你自己的类型（类型别名）",
    "为什么创建自己的类型的示例是用Pascal和Ada写的？",
    "创建自定义数据类型的指导原则",
    "关键点",
  ],
  mechanism:
    "基本类型选择必须覆盖业务范围、精度、编码和运算规则，边界样本验证溢出、舍入、枚举和常量语义",
  success: "第12章：基本数据类型 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第12章：基本数据类型 在“用浮点表示精确金额，或在定宽整数乘法后才检查溢出”处拒绝",
  model: {
    primaryLabel: "数值规则",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 2,
    secondaryLabel: "精度",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 9,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "文本编码压力",
  },
} as const;

export function Cc2e12FundamentalDataTypesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
