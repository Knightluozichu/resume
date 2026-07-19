import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-26-graphviz-two",
  title: "步骤26 计算图的可视化（2）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤26 计算图的可视化（2）",
    "26.1 可视化代码的使用示例",
    "26.2 从计算图转换为DOT语言",
    "26.3 从DOT语言转换为图像",
    "26.4 代码验证",
  ],
  mechanism:
    "从输出递归收集 Variable 与 Function 生成 DOT，再调用 Graphviz 产出图像并保持节点去重",
  success: "步骤26 计算图的可视化（2） 的前向、反向与重放证据一致",
  failure:
    "步骤26 计算图的可视化（2） 在“未记录 visited 会在共享子图中重复输出甚至循环遍历”处拒绝",
} as const;

export function Dl2Step26GraphvizTwoLab() {
  return <DezeroStepLab {...profile} />;
}
