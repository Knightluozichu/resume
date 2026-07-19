import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-59-rnn",
  title: "步骤59 使用RNN处理时间序列数据",
  family: "sequence",
  nodes: ["时间批次", "输入投影", "状态递推", "截断反传", "序列预测"],
  concepts: [
    "步骤59 使用RNN处理时间序列数据",
    "59.1 RNN层的实现",
    "59.2 RNN模型的实现",
    "59.3 切断连接的方法",
    "59.4 正弦波的预测",
  ],
  mechanism:
    "RNN Layer 保存上一时刻 h，时间展开形成跨步计算图；截断反传时 unchain_backward 切断旧历史",
  success: "步骤59 使用RNN处理时间序列数据 的前向、反向与重放证据一致",
  failure:
    "步骤59 使用RNN处理时间序列数据 在“epoch 或独立序列之间不 reset_state 会把无关样本串成同一时间线”处拒绝",
} as const;

export function Dl2Step59RnnLab() {
  return <DezeroStepLab {...profile} />;
}
