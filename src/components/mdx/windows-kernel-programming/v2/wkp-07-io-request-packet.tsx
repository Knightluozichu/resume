"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-07",
  title: "第7章 I/O请求包",
  question:
    "IRP、设备栈位置、分发、用户缓冲区、pending、取消与完成怎样保持唯一所有权？",
  concepts: [
    "第7章 I/O请求包",
    "7.1 IRP简介",
    "7.2 设备节点",
    "7.3 IRP和I/O栈位置",
    "7.4 分发例程",
    "7.5 访问用户缓冲区",
    "7.5.1 缓冲I/O",
    "7.5.2 直接I/O",
    "7.5.3 IRP_MJ_DEVICE_CONTROL的用户缓冲区",
    "7.6 汇总：Zero驱动程序",
    "7.6.1 使用预编译头",
    "7.6.2 DriverEntry例程",
    "7.6.3 读分发例程",
    "7.6.4 写分发例程",
    "7.6.5 测试应用",
    "7.7 总结",
  ],
  invariant: "每个IRP只完成一次且状态、Information、缓冲区、引用与取消协议一致",
  fault: "METHOD_NEITHER未探测、长度溢出、双完成、遗失完成或pending/取消竞态",
  artifact: "IRP/栈位置图、IOCTL传输方法表、边界夹具、取消与完成调用链",
  probe: "irp",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第7章 I/O请求包涉及的IRP、设备节点、栈位置、分发、用户缓冲区、Zero驱动和测试程序",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第7章 I/O请求包的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“每个IRP只完成一次且状态、Information、缓冲区、引用与取消协议一致”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第7章 I/O请求包的单故障边界",
      control:
        "只注入“METHOD_NEITHER未探测、长度溢出、双完成、遗失完成或pending/取消竞态”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第7章 I/O请求包的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“每个IRP只完成一次且状态、Information、缓冲区、引用与取消协议一致”且对象与引用计数回到基线",
      rollback: "保存转储与报告后恢复实验快照",
    },
  ],
  gates: [
    {
      label: "目标身份与驱动包",
      detail:
        "记录Windows产品与完整build、架构、SDK、WDK、Visual Studio、SYS/INF/CAT摘要、签名、驱动模型及VBS/HVCI状态。",
    },
    {
      label: "隔离与恢复",
      detail:
        "只用可丢弃VM或专用测试机，准备快照、数据备份、宿主内核调试器、转储、超时、恢复启动和Verifier reset。",
    },
    {
      label: "基线与唯一故障",
      detail:
        "在签名参考驱动上建立稳定基线，每次只改变一个对象、输入或调度条件并保存首个分岔。",
    },
    {
      label: "反向卸载与同输入恢复",
      detail:
        "先停止新请求和回调，再排空IRP、队列、端口、实例、引用与设备；以同输入恢复否则标记失败或未知。",
    },
  ],
} as const satisfies WindowsKernelEvidenceModel;

export function Wkp07IoRequestPacketVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp07IoRequestPacketExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp07IoRequestPacketSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
