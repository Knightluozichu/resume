import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-09-usable-functions",
  title: "步骤9 让函数更易用",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤9 让函数更易用",
    "9.1 作为Python函数使用",
    "9.2 简化backward方法",
    "9.3 只支持ndarray",
  ],
  mechanism:
    "包装函数、默认输出梯度与 as_array 让 DeZero 运算像普通 Python 函数，同时保持 ndarray 合同",
  success: "步骤9 让函数更易用 的前向、反向与重放证据一致",
  failure:
    "步骤9 让函数更易用 在“接受标量后不转为 ndarray 会在 shape、dtype 或后续函数中产生分叉”处拒绝",
} as const;

export function Dl2Step09UsableFunctionsLab() {
  return <DezeroStepLab {...profile} />;
}
