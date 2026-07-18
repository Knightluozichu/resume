import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第3章 文件I/O",
  label: "文件与I/O",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "打开对象",
    "读取短计数",
    "移动偏移",
    "复制描述符",
    "同步数据",
    "关闭核对",
  ],
  concepts: [
    "第3章 文件I/O",
    "3.1 引言",
    "3.2 文件描述符",
    "3.3 函数open和openat",
    "3.4 函数creat",
    "3.5 函数close",
    "3.6 函数lseek",
    "3.7 函数read",
    "3.8 函数write",
    "3.9 I/O的效率",
    "3.10 文件共享",
    "3.11 原子操作",
    "3.12 函数dup和dup2",
    "3.13 函数sync、fsync和fdatasync",
    "3.14 函数fcntl",
    "3.15 函数ioctl",
    "3.16 /dev/fd",
    "3.17 小结",
  ],
} as const;

export function UapFileIoMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapFileIoExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapFileIoEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
