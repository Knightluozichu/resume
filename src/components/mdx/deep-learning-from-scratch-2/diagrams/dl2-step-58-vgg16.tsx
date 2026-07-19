import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-58-vgg16",
  title: "步骤58 具有代表性的CNN（VGG16）",
  family: "convolution",
  nodes: ["输入NCHW", "核与步幅", "窗口展开", "输出特征", "反向散射"],
  concepts: [
    "步骤58 具有代表性的CNN（VGG16）",
    "58.1 VGG16的实现",
    "58.2 已训练的权重数据",
    "58.3 使用已训练的VGG16",
  ],
  mechanism:
    "VGG16 按固定卷积块和全连接头组织，预训练权重加载后必须执行同版图像预处理与类别映射",
  success: "步骤58 具有代表性的CNN（VGG16） 的前向、反向与重放证据一致",
  failure:
    "步骤58 具有代表性的CNN（VGG16） 在“RGB/BGR、均值、尺寸或类别表不匹配会让权重正确但预测无意义”处拒绝",
} as const;

export function Dl2Step58Vgg16Lab() {
  return <DezeroStepLab {...profile} />;
}
