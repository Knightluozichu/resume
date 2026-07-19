import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-21-collaborative-construction",
  title: "第21章：协同构造",
  nodes: ["个人产物", "同伴准备", "协同检查", "缺陷记录", "团队学习"],
  concepts: [
    "第21章 协同构造",
    "21.1 协同开发实践概要",
    "协同构造是其他质量保证技术的补充",
    "协同构造有利于传授公司文化以及编程专业知识",
    "集体所有权适用于所有形式的协同构造",
    "在构造前后都应保持协作",
    "21.2 结对编程",
    "成功运用结对编程的关键",
    "结对编程的好处",
    "21.3 正式检查",
    "你期望检查能够带来什么结果",
    "检查中的人员角色",
    "检查的一般步骤",
    "检查中的自尊心",
    "检查和代码大全",
    "检查总结",
    "21.4 其他类型的协同开发实践",
    "走查",
    "代码阅读",
    "大型演示",
    "协同构造技术的比较",
    "参考资料",
    "结对编程",
    "检查",
    "相关标准",
    "关键点",
  ],
  mechanism:
    "结对、走查和正式检查以不同成本提供实时反馈或独立缺陷发现；产物、角色、准备、记录和心理安全共同决定效果",
  success: "第21章：协同构造 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第21章：协同构造 在“评审讨论个人风格和作者能力，而不检查可验证的代码风险”处拒绝",
  model: {
    primaryLabel: "实践组合",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.7,
    secondaryLabel: "结对",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 11,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 19,
    limit: 57,
    metricLabel: "正式检查压力",
  },
} as const;

export function Cc2e21CollaborativeConstructionMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
