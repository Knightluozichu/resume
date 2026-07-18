import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第10章 内核同步方法",
  label: "并发 · 同步与时间",
  color: "#a16207",
  soft: "#fef3c7",
  chain: [
    "确认执行上下文",
    "判断能否睡眠",
    "评估读写比例",
    "选择同步原语",
    "规定内存顺序",
    "验证释放与唤醒",
  ],
  concepts: [
    "第10章 内核同步方法",
    "10.1 原子操作",
    "10.1.1 原子整数操作",
    "10.1.2 64位原子操作",
    "10.1.3 原子位操作",
    "10.2 自旋锁",
    "10.2.1 自旋锁方法",
    "10.2.2 其他针对自旋锁的操作",
    "10.2.3 自旋锁和下半部",
    "10.3 读-写自旋锁",
    "10.4 信号量",
    "10.4.1 计数信号量和二值信号量",
    "10.4.2 创建和初始化信号量",
    "10.4.3 使用信号量",
    "10.5 读-写信号量",
    "10.6 互斥体",
    "10.6.1 信号量和互斥体",
    "10.6.2 自旋锁和互斥体",
    "10.7 完成变量",
    "10.8 BLK：大内核锁",
    "10.9 顺序锁",
    "10.10 禁止抢占",
    "10.11 顺序和屏障",
    "10.12 小结",
  ],
} as const;

export function Lkd10SyncMethodsMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd10SyncMethodsExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd10SyncMethodsEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
