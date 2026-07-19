import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-18-memory-mode",
  title: "步骤18 减少内存使用量的模式",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤18 减少内存使用量的模式",
    "18.1 不保留不必要的导数",
    "18.2 回顾Function类",
    "18.3 使用Config类进行切换",
    "18.4 模式的切换",
    "18.5 使用with语句切换",
  ],
  mechanism:
    "retain_grad 控制中间梯度释放，Config.enable_backprop 与上下文管理器成对切换建图模式",
  success: "步骤18 减少内存使用量的模式 的前向、反向与重放证据一致",
  failure:
    "步骤18 减少内存使用量的模式 在“异常退出后未恢复全局模式会让后续训练静默不建图”处拒绝",
} as const;

export function Dl2Step18MemoryModeLab() {
  return <DezeroStepLab {...profile} />;
}
