import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-34-sin-higher-order",
  title: "步骤34 sin函数的高阶导数",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤34 sin函数的高阶导数",
    "34.1 sin函数的实现",
    "34.2 cos函数的实现",
    "34.3 sin函数的高阶导数",
  ],
  mechanism: "sin 与 cos 的互为导数使重复 backward 可产生周期性的任意阶导序列",
  success: "步骤34 sin函数的高阶导数 的前向、反向与重放证据一致",
  failure:
    "步骤34 sin函数的高阶导数 在“每阶计算前不清 grad 会把前一阶残留混入当前结果”处拒绝",
} as const;

export function Dl2Step34SinHigherOrderLab() {
  return <DezeroStepLab {...profile} />;
}
