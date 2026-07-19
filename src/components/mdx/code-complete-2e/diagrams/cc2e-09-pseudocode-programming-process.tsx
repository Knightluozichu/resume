import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-09-pseudocode-programming-process",
  title: "第9章：伪代码编程过程",
  nodes: ["职责声明", "伪代码设计", "实现翻译", "代码检查", "收尾复核"],
  concepts: [
    "第9章 伪代码编程过程",
    "9.1 创建类和子程序的步骤概述",
    "创建一个类的步骤",
    "创建子程序的步骤",
    "9.2 伪代码",
    "9.3 通过伪代码编程过程创建子程序",
    "设计子程序",
    "编写子程序",
    "检查代码",
    "收尾工作",
    "根据需要重复上述步骤",
    "9.4 伪代码编程过程之外的其他方案",
    "关键点",
  ],
  mechanism:
    "伪代码编程过程先以问题域语言写职责和分支，再逐层细化为实现，代码、命名与测试同时复核原意",
  success: "第9章：伪代码编程过程 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第9章：伪代码编程过程 在“伪代码直接混入语法细节，尚未理清职责就被语言结构锁定”处拒绝",
  model: {
    primaryLabel: "类步骤",
    primaryUnit: "项",
    primaryInitial: 7,
    primaryMax: 39,
    primaryWeight: 1.9,
    secondaryLabel: "子程序步骤",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 19,
    secondaryWeight: 10,
    basePressure: 6,
    boundaryPenalty: 12,
    faultPenalty: 19,
    limit: 60,
    metricLabel: "伪代码层次压力",
  },
} as const;

export function Cc2e09PseudocodeProgrammingProcessMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
