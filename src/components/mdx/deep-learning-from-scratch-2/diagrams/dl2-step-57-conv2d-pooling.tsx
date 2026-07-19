import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-57-conv2d-pooling",
  title: "步骤57 conv2d函数和pooling函数",
  family: "convolution",
  nodes: ["输入NCHW", "核与步幅", "窗口展开", "输出特征", "反向散射"],
  concepts: [
    "步骤57 conv2d函数和pooling函数",
    "57.1 使用im2col展开",
    "57.2 conv2d函数的实现",
    "57.3 Conv2d层的实现",
    "57.4 pooling函数的实现",
  ],
  mechanism:
    "im2col 把滑动窗口展开为矩阵，conv2d 转成矩阵乘法；pooling backward 按 argmax 散射梯度",
  success: "步骤57 conv2d函数和pooling函数 的前向、反向与重放证据一致",
  failure:
    "步骤57 conv2d函数和pooling函数 在“col2im 重叠区域不累加或 pooling 未保存 argmax 会得到错误输入梯度”处拒绝",
} as const;

export function Dl2Step57Conv2dPoolingLab() {
  return <DezeroStepLab {...profile} />;
}
