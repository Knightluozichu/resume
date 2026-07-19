import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-49-dataset-preprocess",
  title: "步骤49 Dataset类和预处理",
  family: "training",
  nodes: ["取批数据", "模型前向", "计算损失", "反向传播", "参数更新"],
  concepts: [
    "步骤49 Dataset类和预处理",
    "49.1 Dataset类的实现",
    "49.2 大型数据集的情况",
    "49.3 数据的连接",
    "49.4 用于训练的代码",
    "49.5 数据集的预处理",
  ],
  mechanism:
    "Dataset 把原始数据、标签与 transform/target_transform 延迟组合，避免预处理污染源数据",
  success: "步骤49 Dataset类和预处理 的前向、反向与重放证据一致",
  failure:
    "步骤49 Dataset类和预处理 在“原地修改共享原始数组会让不同 epoch 的样本反复预处理”处拒绝",
} as const;

export function Dl2Step49DatasetPreprocessLab() {
  return <DezeroStepLab {...profile} />;
}
