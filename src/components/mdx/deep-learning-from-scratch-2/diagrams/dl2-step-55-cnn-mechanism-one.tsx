import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-55-cnn-mechanism-one",
  title: "步骤55 CNN的机制（1）",
  family: "convolution",
  nodes: ["输入NCHW", "核与步幅", "窗口展开", "输出特征", "反向散射"],
  concepts: [
    "步骤55 CNN的机制（1）",
    "55.1 CNN的网络结构",
    "55.2 卷积运算",
    "55.3 填充",
    "55.4 步幅",
    "55.5 输出大小的计算方法",
  ],
  mechanism:
    "卷积输出尺寸由输入、核、padding 与 stride 共同决定，局部共享权重构成空间特征图",
  success: "步骤55 CNN的机制（1） 的前向、反向与重放证据一致",
  failure:
    "步骤55 CNN的机制（1） 在“忽略 floor、padding 两侧或 stride 会让实现尺寸与设计不一致”处拒绝",
} as const;

export function Dl2Step55CnnMechanismOneLab() {
  return <DezeroStepLab {...profile} />;
}
