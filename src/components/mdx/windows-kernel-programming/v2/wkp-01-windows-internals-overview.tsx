"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-01",
  title: "第1章 Windows内部概览",
  question:
    "进程、线程、句柄、对象与虚拟内存怎样按目标build和进程上下文建立可调试关系？",
  concepts: [
    "第1章 Windows内部概览",
    "1.1 进程",
    "1.2 虚拟内存",
    "1.2.1 页状态",
    "1.2.2 系统内存",
    "1.3 线程",
    "1.4 系统服务",
    "1.5 系统总体架构",
    "1.6 句柄和对象",
    "1.6.1 对象名称",
    "1.6.2 访问已经存在的对象",
  ],
  invariant: "每个地址、ID、句柄和对象引用都绑定进程、build、架构与生命周期",
  fault: "把样章中的固定容量或地址布局当成所有当前Windows的稳定承诺",
  artifact: "对象关系图、句柄/访问掩码、VA页状态与系统调用轨迹",
  probe: "internals",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第1章 Windows内部概览涉及的进程、虚拟内存、页状态、线程、系统服务、架构、句柄和对象",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第1章 Windows内部概览的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“每个地址、ID、句柄和对象引用都绑定进程、build、架构与生命周期”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第1章 Windows内部概览的单故障边界",
      control:
        "只注入“把样章中的固定容量或地址布局当成所有当前Windows的稳定承诺”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第1章 Windows内部概览的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“每个地址、ID、句柄和对象引用都绑定进程、build、架构与生命周期”且对象与引用计数回到基线",
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

export function Wkp01WindowsInternalsOverviewVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp01WindowsInternalsOverviewExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp01WindowsInternalsOverviewSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}

export { Wkp01ProcessInternalsLab } from "./wkp-01-process-internals-lab";
