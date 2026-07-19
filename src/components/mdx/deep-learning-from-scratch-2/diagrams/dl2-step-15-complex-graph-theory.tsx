import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-15-complex-graph-theory",
  title: "步骤15 复杂的计算图（理论篇）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤15 复杂的计算图（理论篇）",
    "15.1 反向传播的正确顺序",
    "15.2 当前的DeZero",
    "15.3 函数的优先级",
  ],
  mechanism:
    "复杂图的反向顺序必须遵守拓扑依赖，generation 表示函数距输入的层级并决定优先级",
  success: "步骤15 复杂的计算图（理论篇） 的前向、反向与重放证据一致",
  failure:
    "步骤15 复杂的计算图（理论篇） 在“按发现顺序处理会在所有下游梯度到齐前过早计算上游节点”处拒绝",
} as const;

export function Dl2Step15ComplexGraphTheoryLab() {
  return <DezeroStepLab {...profile} />;
}
