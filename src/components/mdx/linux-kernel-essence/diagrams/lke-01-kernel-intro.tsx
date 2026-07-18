import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第1章 内核入门",
  label: "基础 · 内核与资源",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "确认基线版本",
    "取得源码与配置",
    "编译内核与模块",
    "加载最小模块",
    "审查补丁格式",
    "缩短反馈回路",
  ],
  concepts: [
    "第1章 内核入门",
    "HACK #1 如何获取Linux内核",
    "HACK #2 如何编译Linux内核",
    "HACK #3 如何编写内核模块",
    "HACK #4 如何使用Git",
    "HACK #5 使用checkpatch.pl检查补丁的格式",
    "HACK #6 使用localmodconfig缩短编译时间",
  ],
} as const;

export function Lke01KernelIntroMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke01KernelIntroExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke01KernelIntroEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
