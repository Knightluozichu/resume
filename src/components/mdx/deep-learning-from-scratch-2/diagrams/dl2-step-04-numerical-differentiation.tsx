import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-04-numerical-differentiation",
  title: "步骤4 数值微分",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤4 数值微分",
    "4.1 什么是导数",
    "4.2 数值微分的实现",
    "4.3 复合函数的导数",
    "4.4 数值微分存在的问题",
  ],
  mechanism:
    "中心差分用 x+h 与 x-h 的对称斜率近似导数，是校验解析反向传播的局部真值",
  success: "步骤4 数值微分 的前向、反向与重放证据一致",
  failure:
    "步骤4 数值微分 在“h 太大产生截断误差，h 太小产生浮点消减，单边差分还会放大偏差”处拒绝",
} as const;

export function Dl2Step04NumericalDifferentiationLab() {
  return <DezeroStepLab {...profile} />;
}
