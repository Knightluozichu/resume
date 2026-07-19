import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-52-gpu",
  title: "步骤52 支持GPU",
  family: "device",
  nodes: ["固定版本", "选择设备", "迁移状态", "执行模式", "重放核对"],
  concepts: [
    "第5阶段 DeZero高级挑战",
    "步骤52 支持GPU",
    "52.1 CuPy的安装和使用方法",
    "52.2 cuda模块",
    "52.3 向Variable/Layer/DataLoader类添加代码",
    "52.4 函数的相应修改",
    "52.5 在GPU上训练MNIST",
  ],
  mechanism:
    "cuda 模块抽象 NumPy/CuPy，Variable、Layer 与 DataLoader 迁移数组且同一次运算必须处于同一设备",
  success: "步骤52 支持GPU 的前向、反向与重放证据一致",
  failure:
    "步骤52 支持GPU 在“CPU ndarray 与 GPU CuPy 数组混算会报错或触发昂贵隐式传输”处拒绝",
} as const;

export function Dl2Step52GpuLab() {
  return <DezeroStepLab {...profile} />;
}
