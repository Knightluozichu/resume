import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-14-reused-variable",
  title: "步骤14 重复使用同一个变量",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤14 重复使用同一个变量",
    "14.1 问题的原因",
    "14.2 解决方案",
    "14.3 重置导数",
  ],
  mechanism:
    "同一 Variable 经多条路径复用时必须累加梯度，cleargrad 则在新一轮反传前清空历史贡献",
  success: "步骤14 重复使用同一个变量 的前向、反向与重放证据一致",
  failure:
    "步骤14 重复使用同一个变量 在“覆盖而非累加会漏掉分支贡献，不清空又会把两次训练的梯度混在一起”处拒绝",
} as const;

export function Dl2Step14ReusedVariableLab() {
  return <DezeroStepLab {...profile} />;
}
