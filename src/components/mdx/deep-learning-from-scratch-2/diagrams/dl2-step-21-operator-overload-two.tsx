import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-21-operator-overload-two",
  title: "步骤21 运算符重载（2）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤21 运算符重载（2）",
    "21.1 与ndarray一起使用",
    "21.2 与float和int一起使用",
    "21.3 问题1：左项为float或int的情况",
    "21.4 问题2：左项为ndarray实例的情况",
  ],
  mechanism:
    "as_variable 与 __rmul__/__radd__ 处理 ndarray、float、int 和左右操作数优先级",
  success: "步骤21 运算符重载（2） 的前向、反向与重放证据一致",
  failure:
    "步骤21 运算符重载（2） 在“NumPy 优先接管左侧运算会返回 ndarray 或 object array 而不是 DeZero Variable”处拒绝",
} as const;

export function Dl2Step21OperatorOverloadTwoLab() {
  return <DezeroStepLab {...profile} />;
}
