import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第4章 Linux 软件管理",
  label: "管理 · 软件包",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "识别包元数据",
    "检查依赖关系",
    "构建或获取Deb",
    "更新仓库索引",
    "安装配置软件",
    "验证与回滚",
  ],
  concepts: [
    "第4章 Linux 软件管理",
    "4.1 软件包管理工具概述",
    "4.2 dpkg 软件包管理工具",
    "4.2.1 dpkg 命令介绍",
    "4.2.2 静态软件包的管理",
    "4.2.3 Deb 软件包的制作",
    "4.3 APT 软件包管理工具",
    "4.3.1 APT 运行机制",
    "4.3.2 apt-get 工具集",
    "4.3.3 apt-cache 工具集",
    "4.4 本章小结",
  ],
} as const;

export function Lop04SoftwareManagementMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop04SoftwareManagementExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop04SoftwareManagementEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
