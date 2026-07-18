import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第13章 虚拟文件系统",
  label: "文件系统 · 块I/O",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "进入通用接口",
    "定位超级块",
    "解析inode",
    "命中目录项缓存",
    "创建file对象",
    "调用操作并释放",
  ],
  concepts: [
    "第13章 虚拟文件系统",
    "13.1 通用文件系统接口",
    "13.2 文件系统抽象层",
    "13.3 UNIX文件系统",
    "13.4 VFS对象及其数据结构",
    "13.5 超级块对象",
    "13.6 超级块操作",
    "13.7 索引节点对象",
    "13.8 索引节点操作",
    "13.9 目录项对象",
    "13.9.1 目录项状态",
    "13.9.2 目录项缓存",
    "13.10 目录项操作",
    "13.11 文件对象",
    "13.12 文件操作",
    "13.13 和文件系统相关的数据结构",
    "13.14 和进程相关的数据结构",
    "13.15 小结",
  ],
} as const;

export function Lkd13VfsMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd13VfsExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd13VfsEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
