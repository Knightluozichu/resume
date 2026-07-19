import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-25-graphviz-one",
  title: "步骤25 计算图的可视化（1）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "第3阶段 实现高阶导数",
    "步骤25 计算图的可视化（1）",
    "25.1 安装Graphviz",
    "25.2 使用DOT语言描述图形",
    "25.3 指定节点属性",
    "25.4 连接节点",
  ],
  mechanism:
    "DOT 用有向节点和边描述 Variable/Function 计算图，label 与节点属性承担调试语义",
  success: "步骤25 计算图的可视化（1） 的前向、反向与重放证据一致",
  failure:
    "步骤25 计算图的可视化（1） 在“只画数值不画对象类型与方向，会掩盖 creator 断链”处拒绝",
} as const;

export function Dl2Step25GraphvizOneLab() {
  return <DezeroStepLab {...profile} />;
}
