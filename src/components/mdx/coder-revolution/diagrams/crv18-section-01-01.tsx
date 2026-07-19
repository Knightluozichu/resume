import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-01",
  title: "1.1 我是一个线程",
  family: "os",
  nodes: ["创建线程", "就绪队列", "获得CPU", "等待资源", "结束回收"],
  concepts: [
    "1.1 我是一个线程",
    "初生牛犊",
    "渐入佳境",
    "虎口脱险",
    "江湖再见",
  ],
  mechanism:
    "同一进程内的线程共享地址空间和进程资源，却各有调用栈与调度上下文；调度器在可运行线程间切换",
  success: "1.1 我是一个线程 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.1 我是一个线程 在“两个线程把读—改—写当成一个原子动作，导致共享计数丢失更新”处拒绝",
} as const;

export function Crv18Section0101Lab() {
  return <CoderMechanismLab {...profile} />;
}
