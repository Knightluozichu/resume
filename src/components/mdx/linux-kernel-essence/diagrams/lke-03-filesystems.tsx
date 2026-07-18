import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第3章 文件系统",
  label: "存储与网络",
  color: "#a16207",
  soft: "#fef3c7",
  chain: [
    "盘点磁盘与特性",
    "建立可回滚镜像",
    "迁移并校验ext4",
    "固定挂载参数",
    "运行fio矩阵",
    "比较FUSE路径",
  ],
  concepts: [
    "第3章 文件系统",
    "HACK #17 如何使用ext4",
    "HACK #18 向ext4转换",
    "HACK #19 ext4的调整",
    "HACK #20 使用fio进行I/O的基准测试",
    "HACK #21 FUSE",
  ],
} as const;

export function Lke03FilesystemsMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke03FilesystemsExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke03FilesystemsEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
