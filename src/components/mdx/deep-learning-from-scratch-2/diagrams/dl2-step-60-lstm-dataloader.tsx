import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-60-lstm-dataloader",
  title: "步骤60 LSTM与数据加载器",
  family: "sequence",
  nodes: ["时间批次", "输入投影", "状态递推", "截断反传", "序列预测"],
  concepts: [
    "步骤60 LSTM与数据加载器",
    "60.1 用于时间序列数据的数据加载器",
    "60.2 LSTM层的实现",
  ],
  mechanism:
    "SeqDataLoader 保持时间偏移批次，LSTM 用 input/forget/output gate 与 cell state 缓解长期依赖",
  success: "步骤60 LSTM与数据加载器 的前向、反向与重放证据一致",
  failure:
    "步骤60 LSTM与数据加载器 在“批次时间索引错位或只重置 h 不重置 c 会破坏序列连续性”处拒绝",
} as const;

export function Dl2Step60LstmDataloaderLab() {
  return <DezeroStepLab {...profile} />;
}
