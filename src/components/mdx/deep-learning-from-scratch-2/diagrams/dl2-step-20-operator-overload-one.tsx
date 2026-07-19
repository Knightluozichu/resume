import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-20-operator-overload-one",
  title: "步骤20 运算符重载（1）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: ["步骤20 运算符重载（1）", "20.1 Mul类的实现", "20.2 运算符重载"],
  mechanism:
    "__mul__ 把 Python 乘法语法路由到 Mul Function，前向乘法的反向局部规则交换另一操作数",
  success: "步骤20 运算符重载（1） 的前向、反向与重放证据一致",
  failure:
    "步骤20 运算符重载（1） 在“直接在 __mul__ 中计算 ndarray 会绕过 Mul 的 creator 与 backward”处拒绝",
} as const;

export function Dl2Step20OperatorOverloadOneLab() {
  return <DezeroStepLab {...profile} />;
}
