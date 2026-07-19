import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-16-complex-graph-implementation",
  title: "步骤16 复杂的计算图（实现篇）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤16 复杂的计算图（实现篇）",
    "16.1 增加“辈分”变量",
    "16.2 按照“辈分”顺序取出元素",
    "16.3 Variable类的backward",
    "16.4 代码验证",
  ],
  mechanism:
    "函数列表按 generation 排序并去重，始终弹出最高辈分节点再把其输入 creator 加入候选",
  success: "步骤16 复杂的计算图（实现篇） 的前向、反向与重放证据一致",
  failure:
    "步骤16 复杂的计算图（实现篇） 在“同一 Function 被重复加入会重复累加，未排序会违反反向依赖”处拒绝",
} as const;

export function Dl2Step16ComplexGraphImplementationLab() {
  return <DezeroStepLab {...profile} />;
}
