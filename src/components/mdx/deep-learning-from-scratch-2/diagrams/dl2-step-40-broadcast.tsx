import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-40-broadcast",
  title: "步骤40 进行广播的函数",
  family: "tensor",
  nodes: ["输入shape", "轴变换", "前向shape", "反向还原", "梯度shape"],
  concepts: [
    "步骤40 进行广播的函数",
    "40.1 broadcast_to函数和sum_to函数",
    "40.2 DeZero的broadcast_to函数和sum_to函数",
    "40.3 支持广播",
  ],
  mechanism:
    "broadcast_to 与 sum_to 是互为反向的形状操作，二元运算 backward 要把梯度收缩回各输入原 shape",
  success: "步骤40 进行广播的函数 的前向、反向与重放证据一致",
  failure:
    "步骤40 进行广播的函数 在“把广播后的梯度直接写给小输入会得到错误 shape 与重复贡献”处拒绝",
} as const;

export function Dl2Step40BroadcastLab() {
  return <DezeroStepLab {...profile} />;
}
