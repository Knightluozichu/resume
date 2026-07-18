import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第8章 概要分析与追踪",
  label: "诊断 · 调试与追踪",
  color: "#0e7490",
  soft: "#cffafe",
  chain: [
    "提出性能假设",
    "选择计数或采样",
    "限定函数与事件",
    "采集统一时间线",
    "关联用户与内核栈",
    "关闭探针并复测",
  ],
  concepts: [
    "第8章 概要分析与追踪",
    "HACK #64 使用perf tools的概要分析（1）",
    "HACK #65 使用perf tools的概要分析（2）",
    "HACK #66 进行内核或进程的各种概要分析",
    "HACK #67 追踪内核的函数调用",
    "HACK #68 ftrace的插件追踪器",
    "HACK #69 记录内核的运行事件",
    "HACK #70 使用trace-cmd的内核追踪",
    "HACK #71 将动态追踪事件添加到内核中",
    "HACK #72 使用SystemTap进行内核追踪",
    "HACK #73 使用SystemTap编写对话型程序",
    "HACK #74 SystemTap脚本的重复利用",
    "HACK #75 运用SystemTap",
  ],
} as const;

export function Lke08ProfilingTracingMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke08ProfilingTracingExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke08ProfilingTracingEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
