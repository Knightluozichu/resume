import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第8章 下半部和推后执行的工作",
  label: "结构 · 中断与延后工作",
  color: "#4f46e5",
  soft: "#e0e7ff",
  chain: [
    "切分紧急工作",
    "选择执行上下文",
    "安排软中断",
    "串行化tasklet",
    "下放工作队列",
    "禁用排空并卸载",
  ],
  concepts: [
    "第8章 下半部和推后执行的工作",
    "8.1 下半部",
    "8.1.1 为什么要用下半部",
    "8.1.2 下半部的环境",
    "8.2 软中断",
    "8.2.1 软中断的实现",
    "8.2.2 使用软中断",
    "8.3 tasklet",
    "8.3.1 tasklet的实现",
    "8.3.2 使用tasklet",
    "8.3.3 老的BH机制",
    "8.4 工作队列",
    "8.4.1 工作队列的实现",
    "8.4.2 使用工作队列",
    "8.4.3 老的任务队列机制",
    "8.5 下半部机制的选择",
    "8.6 在下半部之间加锁",
    "8.7 禁止下半部",
    "8.8 小结",
  ],
} as const;

export function Lkd08BottomHalvesMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd08BottomHalvesExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd08BottomHalvesEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
