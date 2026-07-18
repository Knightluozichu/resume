import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第7章 调试",
  label: "诊断 · 调试与追踪",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "配置恢复与转储",
    "验证符号匹配",
    "触发受控故障",
    "保存完整现场",
    "定位栈与资源",
    "修复后同输入重放",
  ],
  concepts: [
    "第7章 调试",
    "HACK #52 SysRq键",
    "HACK #53 使用diskdump提取内核崩溃转储",
    "HACK #54 使用Kdump提取内核崩溃转储",
    "HACK #55 崩溃测试",
    "HACK #56 IPMI看门狗计时器",
    "HACK #57 NMI看门狗计时器",
    "HACK #58 soft lockup",
    "HACK #59 crash命令",
    "HACK #60 核心转储过滤器",
    "HACK #61 生成用户模式进程的进程核心转储",
    "HACK #62 使用lockdep查找系统的死锁",
    "HACK #63 检测内核的内存泄漏",
  ],
} as const;

export function Lke07DebuggingMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke07DebuggingExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke07DebuggingEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
