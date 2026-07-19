import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-24-complex-derivatives",
  title: "步骤24 复杂函数的求导",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤24 复杂函数的求导",
    "24.1 Sphere函数",
    "24.2 matyas函数",
    "24.3 Goldstein-Price函数",
  ],
  mechanism:
    "Sphere、Matyas 与 Goldstein–Price 用自然运算符组合出复杂标量函数，验证图能由局部规则自动求导",
  success: "步骤24 复杂函数的求导 的前向、反向与重放证据一致",
  failure:
    "步骤24 复杂函数的求导 在“为每个复合函数手写整体 backward 会重复推导且难以复用”处拒绝",
} as const;

export function Dl2Step24ComplexDerivativesLab() {
  return <DezeroStepLab {...profile} />;
}
