import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第7章 中断和中断处理",
  label: "结构 · 中断与延后工作",
  color: "#b91c1c",
  soft: "#fee2e2",
  chain: [
    "识别中断源",
    "注册处理程序",
    "确认共享来源",
    "保存最小状态",
    "唤起下半部",
    "释放并核对计数",
  ],
  concepts: [
    "第7章 中断和中断处理",
    "7.1 中断",
    "7.2 中断处理程序",
    "7.3 上半部与下半部的对比",
    "7.4 注册中断处理程序",
    "7.4.1 中断处理程序标志",
    "7.4.2 一个中断例子",
    "7.4.3 释放中断处理程序",
    "7.5 编写中断处理程序",
    "7.5.1 共享的中断处理程序",
    "7.5.2 中断处理程序实例",
    "7.6 中断上下文",
    "7.7 中断处理机制的实现",
    "7.8 /proc/interrupts",
    "7.9 中断控制",
    "7.9.1 禁止和激活中断",
    "7.9.2 禁止指定中断线",
    "7.9.3 中断系统的状态",
    "7.10 小结",
  ],
} as const;

export function Lkd07InterruptsMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd07InterruptsExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd07InterruptsEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
