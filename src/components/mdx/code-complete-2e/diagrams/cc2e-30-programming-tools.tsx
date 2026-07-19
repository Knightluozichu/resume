import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-30-programming-tools",
  title: "第30章：编程工具",
  nodes: ["设计产物", "源代码工具", "构建执行", "测试分析", "工具链证据"],
  concepts: [
    "第30章 编程工具",
    "30.1 设计工具",
    "30.2 源代码工具",
    "编辑",
    "分析代码质量",
    "重构源代码",
    "Version Control",
    "数据词典",
    "30.3 可执行码工具",
    "产生目标码",
    "除错",
    "测试",
    "代码微调",
    "30.4 工具导向的环境",
    "30.5 打造你自己的编程工具",
    "项目特有的工具",
    "脚本",
    "30.6 工具幻境",
    "额外资源",
    "关键点",
  ],
  mechanism:
    "工具链覆盖设计、编辑、静态分析、构建、测试、调试、版本控制和性能测量，每个工具都要记录输入、版本、盲区与失败策略",
  success: "第30章：编程工具 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第30章：编程工具 在“把工具无输出解释为没有问题，忽略配置、覆盖范围和误报漏报”处拒绝",
  model: {
    primaryLabel: "设计工具",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.9,
    secondaryLabel: "源代码",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 9,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "可执行码压力",
  },
} as const;

export function Cc2e30ProgrammingToolsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
