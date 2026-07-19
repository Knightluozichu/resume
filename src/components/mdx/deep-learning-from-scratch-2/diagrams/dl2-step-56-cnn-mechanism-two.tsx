import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-56-cnn-mechanism-two",
  title: "步骤56 CNN的机制（2）",
  family: "convolution",
  nodes: ["输入NCHW", "核与步幅", "窗口展开", "输出特征", "反向散射"],
  concepts: [
    "步骤56 CNN的机制（2）",
    "56.1 三阶张量",
    "56.2 结合方块进行思考",
    "56.3 小批量处理",
    "56.4 池化层",
  ],
  mechanism:
    "CNN 张量按 NCHW 组织，卷积核连接输入/输出通道，池化在局部窗口归约且通常无参数",
  success: "步骤56 CNN的机制（2） 的前向、反向与重放证据一致",
  failure:
    "步骤56 CNN的机制（2） 在“混用 NHWC/NCHW 或漏掉 batch/channel 轴会让卷积结果静默错位”处拒绝",
} as const;

export function Dl2Step56CnnMechanismTwoLab() {
  return <DezeroStepLab {...profile} />;
}
