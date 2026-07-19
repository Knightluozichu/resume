import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-05",
  title: "第5章 我的编程语言简史",
  family: "language",
  nodes: ["定义任务", "比较语义", "检查运行时", "评估工具链", "测量取舍"],
  concepts: ["第5章 我的编程语言简史"],
  mechanism:
    "编程语言用语法、类型、内存模型、运行时和工具链表达不同取舍；比较必须基于同一任务和约束",
  success: "第5章 我的编程语言简史 的输入、机制、输出与复位轨迹一致",
  failure:
    "第5章 我的编程语言简史 在“用一段微基准或个人语法偏好宣布某语言在所有场景更优”处拒绝",
} as const;

export function Crv18Chapter05Lab() {
  return <CoderMechanismLab {...profile} />;
}
