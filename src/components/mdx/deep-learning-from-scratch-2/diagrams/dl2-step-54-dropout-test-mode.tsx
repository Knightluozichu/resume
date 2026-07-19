import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-54-dropout-test-mode",
  title: "步骤54 Dropout和测试模式",
  family: "device",
  nodes: ["固定版本", "选择设备", "迁移状态", "执行模式", "重放核对"],
  concepts: [
    "步骤54 Dropout和测试模式",
    "54.1 什么是Dropout",
    "54.2 Inverted Dropout",
    "54.3 增加测试模式",
    "54.4 Dropout的实现",
  ],
  mechanism:
    "inverted dropout 在训练时用掩码并除以保留率，测试模式直接返回输入以保持期望一致",
  success: "步骤54 Dropout和测试模式 的前向、反向与重放证据一致",
  failure:
    "步骤54 Dropout和测试模式 在“测试时仍随机丢弃或训练时不缩放都会造成输出分布漂移”处拒绝",
} as const;

export function Dl2Step54DropoutTestModeLab() {
  return <DezeroStepLab {...profile} />;
}
