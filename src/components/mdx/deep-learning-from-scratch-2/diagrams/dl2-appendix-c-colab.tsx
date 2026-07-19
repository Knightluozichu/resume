import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-appendix-c-colab",
  title: "附录C 在Google Colaboratory上运行",
  family: "device",
  nodes: ["固定版本", "选择设备", "迁移状态", "执行模式", "重放核对"],
  concepts: ["附录C 在Google Colaboratory上运行"],
  mechanism:
    "Colab 环境先固定仓库版本与依赖，再验证 CPU/GPU 后端、工作目录和可持久化输出",
  success: "附录C 在Google Colaboratory上运行 的前向、反向与重放证据一致",
  failure:
    "附录C 在Google Colaboratory上运行 在“只记录 notebook 输出而不固定版本会让重启运行得到不同结果”处拒绝",
} as const;

export function Dl2AppendixCColabLab() {
  return <DezeroStepLab {...profile} />;
}
