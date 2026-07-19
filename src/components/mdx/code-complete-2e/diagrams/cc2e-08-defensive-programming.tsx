import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-08-defensive-programming",
  title: "第8章：防御式编程",
  nodes: ["外部输入", "边界校验", "内部断言", "错误隔离", "安全结果"],
  concepts: [
    "第8章 防御式编程",
    "8.1 保护程序免遭无效输入数据的破坏",
    "8.2 断言",
    "建立自己的断言机制",
    "使用断言的指导建议",
    "8.3 错误处理技术",
    "健壮性与正确性",
    "高层次设计对错误处理方式的影响",
    "8.4 异常",
    "8.5 隔离程序以免遭由错误造成的损害",
    "隔离区与断言的关系",
    "8.6 辅助调试代码",
    "不要自动地把产品版本的限制强加于开发版本之上",
    "尽早引入辅助调试的手段",
    "采用冒进式编程",
    "计划移除调试辅助代码",
    "8.7 确定在产品代码中该保留多少防范式代码",
    "8.8 防御式编程时保持防范",
    "其他资源",
    "关键点",
  ],
  mechanism:
    "防御式编程在信任边界验证外部数据，在内部用断言暴露不可能状态，并为错误、异常和恢复定义一致策略",
  success: "第8章：防御式编程 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第8章：防御式编程 在“吞掉异常或用默认值继续，使坏状态越过边界后才爆炸”处拒绝",
  model: {
    primaryLabel: "无效数据",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 2.2,
    secondaryLabel: "断言",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 10,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 22,
    limit: 56,
    metricLabel: "错误策略压力",
  },
} as const;

export function Cc2e08DefensiveProgrammingMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
