import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-07-automatic-backprop",
  title: "步骤7 反向传播的自动化",
  family: "derivative",
  nodes: ["固定输入", "前向函数", "局部导数", "链式组合", "数值检验"],
  concepts: [
    "步骤7 反向传播的自动化",
    "7.1 为反向传播的自动化创造条件",
    "7.2 尝试反向传播",
    "7.3 增加backward方法",
  ],
  mechanism:
    "Variable.backward 从自身 creator 出发自动取函数、读取输出梯度并写回输入梯度",
  success: "步骤7 反向传播的自动化 的前向、反向与重放证据一致",
  failure:
    "步骤7 反向传播的自动化 在“backward 只处理一个 creator 或忘记继续回溯，会让长组合图只传播一层”处拒绝",
} as const;

export function Dl2Step07AutomaticBackpropLab() {
  return <DezeroStepLab {...profile} />;
}
