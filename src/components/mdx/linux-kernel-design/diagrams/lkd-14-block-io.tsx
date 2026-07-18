import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第14章 块I/O层",
  label: "文件系统 · 块I/O",
  color: "#b45309",
  soft: "#ffedd5",
  chain: [
    "拆分块设备请求",
    "构造bio向量",
    "进入请求队列",
    "合并与排序",
    "派发到驱动",
    "完成并唤醒",
  ],
  concepts: [
    "第14章 块I/O层",
    "14.1 剖析一个块设备",
    "14.2 缓冲区和缓冲区头",
    "14.3 bio结构体",
    "14.3.1 I/O向量",
    "14.3.2 新老方法对比",
    "14.4 请求队列",
    "14.5 I/O调度程序",
    "14.5.1 I/O调度程序的工作",
    "14.5.2 Linus电梯",
    "14.5.3 最终期限I/O调度程序",
    "14.5.4 预测I/O调度程序",
    "14.5.5 完全公正的排队I/O调度程序",
    "14.5.6 空操作的I/O调度程序",
    "14.5.7 I/O调度程序的选择",
    "14.6 小结",
  ],
} as const;

export function Lkd14BlockIoMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd14BlockIoExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd14BlockIoEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
