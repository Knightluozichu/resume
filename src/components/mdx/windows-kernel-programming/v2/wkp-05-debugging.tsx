"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-05",
  title: "第5章 调试",
  question: "WinDbg、符号、宿主—目标、转储与可重复症状怎样定位首个内核分岔？",
  concepts: [
    "第5章 调试",
    "5.1 Debugging Tools for Windows",
    "5.2 WinDbg简介",
    "5.3 内核调试",
    "5.3.1 本地内核调试",
    "5.3.2 本地内核调试教程",
    "5.4 完整内核调试",
    "5.4.1 配置目标机",
    "5.4.2 配置宿主机",
    "5.5 内核驱动程序调试教程",
    "5.6 总结",
  ],
  invariant: "每份转储和轨迹都绑定目标build、驱动摘要、符号、输入与唯一故障",
  fault: "符号错配、只做本地观察、Verifier致崩溃却无调试宿主或恢复方案",
  artifact: "宿主/目标清单、符号验证、转储、调用栈、首错假设与恢复报告",
  probe: "debug",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第5章 调试涉及的调试工具、WinDbg、本地/完整内核调试、宿主、目标与驱动调试",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第5章 调试的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“每份转储和轨迹都绑定目标build、驱动摘要、符号、输入与唯一故障”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第5章 调试的单故障边界",
      control:
        "只注入“符号错配、只做本地观察、Verifier致崩溃却无调试宿主或恢复方案”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第5章 调试的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“每份转储和轨迹都绑定目标build、驱动摘要、符号、输入与唯一故障”且对象与引用计数回到基线",
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

export function Wkp05DebuggingVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp05DebuggingExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp05DebuggingSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
