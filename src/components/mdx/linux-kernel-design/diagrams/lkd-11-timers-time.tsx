import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第11章 定时器和时间管理",
  label: "并发 · 同步与时间",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "选择时间基准",
    "换算节拍",
    "处理回绕",
    "注册定时器",
    "执行回调",
    "取消同步并释放",
  ],
  concepts: [
    "第11章 定时器和时间管理",
    "11.1 内核中的时间概念",
    "11.2 节拍率：Hz",
    "11.2.1 理想的Hz值",
    "11.2.2 高Hz的优势",
    "11.2.3 高Hz的劣势",
    "11.3 jiffies",
    "11.3.1 jiffies的内部表示",
    "11.3.2 jiffies的回绕",
    "11.3.3 用户空间和Hz",
    "11.4 硬时钟和定时器",
    "11.4.1 实时时钟",
    "11.4.2 系统定时器",
    "11.5 时钟中断处理程序",
    "11.6 实际时间",
    "11.7 定时器",
    "11.7.1 使用定时器",
    "11.7.2 定时器竞争条件",
    "11.7.3 实现定时器",
    "11.8 延迟执行",
    "11.8.1 忙等待",
    "11.8.2 短延迟",
    "11.8.3 schedule_timeout()",
    "11.9 小结",
  ],
} as const;

export function Lkd11TimersTimeMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd11TimersTimeExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd11TimersTimeEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
