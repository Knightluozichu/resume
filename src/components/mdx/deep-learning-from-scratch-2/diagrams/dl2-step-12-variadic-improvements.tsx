import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-12-variadic-improvements",
  title: "步骤12 可变长参数（改进篇）",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤12 可变长参数（改进篇）",
    "12.1 第1项改进：使函数更容易使用",
    "12.2 第2项改进：使函数更容易实现",
    "12.3 add函数的实现",
  ],
  mechanism:
    "输入自动转 Variable、输出自动元组化，让实现者可写自然 forward 签名而调用者仍拿到简洁结果",
  success: "步骤12 可变长参数（改进篇） 的前向、反向与重放证据一致",
  failure:
    "步骤12 可变长参数（改进篇） 在“单输出时错误保留一元 tuple 会破坏后续运算符表达式”处拒绝",
} as const;

export function Dl2Step12VariadicImprovementsLab() {
  return <DezeroStepLab {...profile} />;
}
