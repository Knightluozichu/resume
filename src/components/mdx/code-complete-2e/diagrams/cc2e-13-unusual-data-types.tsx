import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-13-unusual-data-types",
  title: "第13章：不常见的数据类型",
  nodes: ["数据结构", "所有权", "指针访问", "共享边界", "生命周期验证"],
  concepts: [
    "第13章 不常见的数据类型",
    "13.1 结构",
    "13.2 指针",
    "用来理解指针的例子",
    "使用指针的一般技巧",
    "C++指针",
    "C指针",
    "13.3 全局数据",
    "与全局数据有关的常见问题",
    "使用全局数据的理由",
    "只有万不得已时才使用全局数据",
    "用访问子程序来取代全局数据",
    "如何降低使用全局数据的风险",
    "其他资源",
    "关键点",
  ],
  mechanism:
    "结构、指针和全局数据必须声明所有权、别名、可变性和生命周期；访问接口守住释放、空值与共享边界",
  success: "第13章：不常见的数据类型 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第13章：不常见的数据类型 在“释放后仍保留别名，或让全局可变状态成为隐藏输入”处拒绝",
  model: {
    primaryLabel: "结构",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 2,
    secondaryLabel: "指针模型",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 9,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 20,
    limit: 58,
    metricLabel: "语言差异压力",
  },
} as const;

export function Cc2e13UnusualDataTypesMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
