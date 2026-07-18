import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第1章 认识 Linux 操作系统",
  label: "基础 · 认识与安装",
  color: "#166534",
  soft: "#f0fdf4",
  chain: [
    "辨认系统角色",
    "选择发行版本",
    "创建虚拟硬件",
    "安装Ubuntu",
    "安装虚拟机工具",
    "保存基线快照",
  ],
  concepts: [
    "第1章 认识 Linux 操作系统",
    "1.1 操作系统",
    "1.1.1 操作系统概述",
    "1.1.2 嵌入式操作系统",
    "1.2 Linux 操作系统概述",
    "1.2.1 Linux 操作系统的历史",
    "1.2.2 Linux 操作系统的优势",
    "1.2.3 Linux 操作系统的发行版本",
    "1.3 Linux 操作系统安装",
    "1.3.1 安装虚拟机",
    "1.3.2 安装 Ubuntu 系统",
    "1.3.3 安装虚拟机工具",
    "1.4 本章小结",
  ],
} as const;

export function Lop01RecognizingLinuxMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop01RecognizingLinuxExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop01RecognizingLinuxEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
