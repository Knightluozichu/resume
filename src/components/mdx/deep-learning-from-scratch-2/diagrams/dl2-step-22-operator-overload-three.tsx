import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-22-operator-overload-three",
  title: "步骤22 运算符重载（3）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤22 运算符重载（3）",
    "22.1 负数",
    "22.2 减法",
    "22.3 除法",
    "22.4 幂运算",
  ],
  mechanism:
    "负号、减法、反向减法、除法和幂都实现为 Function，并为每个输入给出匹配的局部导数",
  success: "步骤22 运算符重载（3） 的前向、反向与重放证据一致",
  failure:
    "步骤22 运算符重载（3） 在“反向减法复用正向顺序会把符号写反，除法会漏掉分母平方”处拒绝",
} as const;

export function Dl2Step22OperatorOverloadThreeLab() {
  return <DezeroStepLab {...profile} />;
}
