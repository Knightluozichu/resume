import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第3章 Linux 用户管理",
  label: "管理 · 用户与配额",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "读取身份数据库",
    "设计用户与组",
    "创建修改账户",
    "配置目录权限",
    "启用磁盘配额",
    "审计身份与用量",
  ],
  concepts: [
    "第3章 Linux 用户管理",
    "3.1 用户的基本概念",
    "3.1.1 用户的属性",
    "3.1.2 用户与组",
    "3.1.3 与用户相关的配置文件",
    "3.2 用户管理命令",
    "3.2.1 用户管理",
    "3.2.2 用户组管理",
    "3.3 磁盘配额",
    "3.3.1 磁盘配额概述",
    "3.3.2 磁盘配额命令",
    "3.3.3 磁盘配额操作",
    "3.4 本章小结",
  ],
} as const;

export function Lop03UserManagementMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop03UserManagementExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop03UserManagementEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
