import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-08-recursion-to-loop",
  title: "步骤8 从递归到循环",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤8 从递归到循环",
    "8.1 现在的Variable类",
    "8.2 使用循环实现",
    "8.3 代码验证",
  ],
  mechanism:
    "显式函数栈替代递归调用，使反向遍历顺序可观察、可扩展并避免 Python 递归深度限制",
  success: "步骤8 从递归到循环 的前向、反向与重放证据一致",
  failure:
    "步骤8 从递归到循环 在“循环中忘记把输入 creator 压栈会静默截断图，重复压栈则会重复计算”处拒绝",
} as const;

export function Dl2Step08RecursionToLoopLab() {
  return <DezeroStepLab {...profile} />;
}
