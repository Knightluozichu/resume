import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第2章 Linux 操作系统的使用",
  label: "基础 · 终端与命令",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "打开终端会话",
    "解析命令行",
    "解析路径与权限",
    "执行命令",
    "组合管道重定向",
    "检查退出状态",
  ],
  concepts: [
    "第2章 Linux 操作系统的使用",
    "2.1 初识终端",
    "2.1.1 终端介绍",
    "2.1.2 终端软件",
    "2.2 认识 Shell",
    "2.2.1 Shell 概述",
    "2.2.2 Shell 命令格式",
    "2.3 Linux 操作系统命令",
    "2.3.1 用户与系统相关命令",
    "2.3.2 文件相关命令",
    "2.3.3 压缩打包相关指令",
    "2.3.4 系统常用功能命令",
    "2.4 本章小结",
  ],
} as const;

export function Lop02UsingLinuxMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop02UsingLinuxExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop02UsingLinuxEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
