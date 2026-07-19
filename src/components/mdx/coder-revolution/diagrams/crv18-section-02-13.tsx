import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-13",
  title: "2.13 加锁还是不加锁，这是一个问题",
  family: "os",
  nodes: ["读取旧值", "计算新值", "执行CAS", "检查失败", "退避重试"],
  concepts: [
    "2.13 加锁还是不加锁，这是一个问题",
    "互斥锁",
    "要不要加锁",
    "CAS的扩展",
  ],
  mechanism:
    "CAS 仅在当前值等于期望值时原子更新，失败方重读并重试；无锁不等于每个线程都有有限等待上界",
  success: "2.13 加锁还是不加锁，这是一个问题 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.13 加锁还是不加锁，这是一个问题 在“值从 A 变为 B 又回到 A，单看数值的 CAS 未察觉版本变化而触发 ABA”处拒绝",
} as const;

export function Crv18Section0213Lab() {
  return <CoderMechanismLab {...profile} />;
}
