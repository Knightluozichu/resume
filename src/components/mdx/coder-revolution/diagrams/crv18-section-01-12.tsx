import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-12",
  title: "1.12 编程世界的那把锁",
  family: "os",
  nodes: ["请求进入", "获取许可", "修改共享态", "发布可见性", "释放许可"],
  concepts: [
    "1.12 编程世界的那把锁",
    "共享变量惹的祸",
    "争抢吧，线程",
    "改进",
    "信号量",
  ],
  mechanism:
    "互斥锁保护临界区，信号量以许可数约束同时进入者；正确性取决于共享状态的原子边界与先行发生关系",
  success: "1.12 编程世界的那把锁 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.12 编程世界的那把锁 在“在异常路径漏掉解锁或 release，使后续线程永久等待”处拒绝",
} as const;

export function Crv18Section0112Lab() {
  return <CoderMechanismLab {...profile} />;
}
