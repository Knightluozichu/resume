import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第4章 进程调度",
  label: "进程 · 调度与系统调用",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "分类工作负载",
    "映射优先级权重",
    "进入运行队列",
    "选择下个任务",
    "处理睡眠唤醒",
    "验证抢占与实时",
  ],
  concepts: [
    "第4章 进程调度",
    "4.1 多任务",
    "4.2 Linux的进程调度",
    "4.3 策略",
    "4.3.1 I/O消耗型和处理器消耗型的进程",
    "4.3.2 进程优先级",
    "4.3.3 时间片",
    "4.3.4 调度策略的活动",
    "4.4 Linux调度算法",
    "4.4.1 调度器类",
    "4.4.2 UNIX 系统中的进程调度",
    "4.4.3 公平调度",
    "4.5 Linux调度的实现",
    "4.5.1 时间记账",
    "4.5.2 进程选择",
    "4.5.3 调度器入口",
    "4.5.4 睡眠和唤醒",
    "4.6 抢占和上下文切换",
    "4.6.1 用户抢占",
    "4.6.2 内核抢占",
    "4.7 实时调度策略",
    "4.8 与调度相关的系统调用",
    "4.8.1 与调度策略和优先级相关的系统调用",
    "4.8.2 与处理器绑定有关的系统调用",
    "4.8.3 放弃处理器时间",
    "4.9 小结",
  ],
} as const;

export function Lkd04ProcessSchedulingMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd04ProcessSchedulingExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd04ProcessSchedulingEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
