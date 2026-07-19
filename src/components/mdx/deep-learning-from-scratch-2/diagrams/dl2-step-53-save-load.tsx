import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-53-save-load",
  title: "步骤53 模型的保存和加载",
  family: "device",
  nodes: ["固定版本", "选择设备", "迁移状态", "执行模式", "重放核对"],
  concepts: [
    "步骤53 模型的保存和加载",
    "53.1 NumPy的save函数和load函数",
    "53.2 Layer类参数的扁平化",
    "53.3 Layer类的save函数和load函数",
  ],
  mechanism:
    "Layer 递归展平参数为稳定层级键，保存前转 CPU，加载时按键和 shape 写回现有 Parameter",
  success: "步骤53 模型的保存和加载 的前向、反向与重放证据一致",
  failure:
    "步骤53 模型的保存和加载 在“依赖对象遍历偶然顺序会让模型结构微调后权重错配”处拒绝",
} as const;

export function Dl2Step53SaveLoadLab() {
  return <DezeroStepLab {...profile} />;
}
