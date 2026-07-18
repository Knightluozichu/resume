import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第2章 资源管理",
  label: "基础 · 内核与资源",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "建立可重复负载",
    "隔离进程视图",
    "分配CPU集合",
    "限制内存用量",
    "调节块I/O",
    "解释压力与OOM",
  ],
  concepts: [
    "第2章 资源管理",
    "HACK #7 Cgroup、Namespace、Linux容器",
    "HACK #8 调度策略",
    "HACK #9 RT Group Scheduling与RT Throttling",
    "HACK #10 Fair Group Scheduling",
    "HACK #11 cpuset",
    "HACK #12 使用Memory Cgroup限制内存使用量",
    "HACK #13 使用Block I/O控制器设置I/O优先级",
    "HACK #14 虚拟存储子系统的调整",
    "HACK #15 ramzswap",
    "HACK #16 OOM Killer的运行与结构",
  ],
} as const;

export function Lke02ResourceManagementMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke02ResourceManagementExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke02ResourceManagementEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
