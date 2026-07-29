"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "虚拟地址",
    layer: "把 address value 与 object lifetime、mapping permission 分开。",
    evidence: "同一进程的 maps 与 page-table observation 能解释访问。",
    falsifier: "保留数值地址但结束 lifetime，sanitizer 应拒绝悬空访问。",
  },
  {
    label: "地址转换",
    layer: "virtual page number 经页表映射到 frame，offset 保持不变。",
    evidence: "page fault、permission 与 resident state 可分别观测。",
    falsifier: "mprotect 或触发 demand paging，比较映射存在与驻留。",
  },
  {
    label: "系统边界",
    layer: "用户态按 ISA/ABI 入口请求内核，不把库函数等同 syscall。",
    evidence: "trace 能区分 wrapper、vDSO、trap 与内核返回。",
    falsifier: "比较 getpid 等调用在不同平台是否真的进入内核。",
  },
  {
    label: "并发可见性",
    layer: "volatile、atomic、mutex 分别解决设备访问、原子与同步协议。",
    evidence: "happens-before 与 lock ownership 覆盖所有 shared accesses。",
    falsifier: "移除 acquire/release 或锁，用 TSan/stress 暴露 race。",
  },
] as const;

export function CpuAdvancedProgrammingLab() {
  return (
    <CpuEvidenceLab
      title="地址、系统调用与同步不能混成一层"
      question="“地址有效”“写了 volatile”“加了锁”各自真正证明什么？"
      stages={stages}
    />
  );
}
