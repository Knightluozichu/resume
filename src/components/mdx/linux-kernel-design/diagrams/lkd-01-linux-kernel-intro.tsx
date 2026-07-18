import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第1章 Linux内核简介",
  label: "基础 · 内核与源码",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "回看UNIX传统",
    "划定内核职责",
    "比较内核设计",
    "定位Linux特征",
    "识别版本基线",
    "连接开发社区",
  ],
  concepts: [
    "第1章 Linux内核简介",
    "1.1 UNIX的历史",
    "1.2 追寻Linus足迹：Linux简介",
    "1.3 操作系统和内核简介",
    "1.4 Linux内核和传统UNIX内核的比较",
    "1.5 Linux内核版本",
    "1.6 Linux内核开发者社区",
    "1.7 小结",
  ],
} as const;

export function Lkd01LinuxKernelIntroMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd01LinuxKernelIntroExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd01LinuxKernelIntroEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
