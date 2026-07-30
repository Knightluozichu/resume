"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-04",
  title: "第4章 驱动程序：从头到尾",
  question:
    "DriverEntry、设备对象、访问控制、Create/Close、IOCTL与Unload怎样闭合一个驱动生命周期？",
  concepts: [
    "第4章 驱动程序：从头到尾",
    "4.1 简介",
    "4.2 驱动程序初始化",
    "4.2.1 将信息传递给驱动程序",
    "4.2.2 客户程序/驱动程序之间的通信协议",
    "4.2.3 创建设备对象",
    "4.3 客户代码",
    "4.4 Create和Close分发例程",
    "4.5 DeviceIoControl分发例程",
    "4.6 安装与测试",
    "4.7 总结",
  ],
  invariant: "停止新请求后所有句柄、IRP、引用、设备与命名对象按反向顺序归零",
  fault:
    "IOCTL长度或权限未验证、请求在途时卸载、符号链接和设备对象清理次序错误",
  artifact: "生命周期状态机、SDDL/设备访问、IOCTL协议夹具、并发关闭与卸载轨迹",
  probe: "lifecycle",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第4章 驱动程序：从头到尾涉及的初始化、通信协议、设备对象、客户代码、分发、安装和测试",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第4章 驱动程序：从头到尾的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“停止新请求后所有句柄、IRP、引用、设备与命名对象按反向顺序归零”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第4章 驱动程序：从头到尾的单故障边界",
      control:
        "只注入“IOCTL长度或权限未验证、请求在途时卸载、符号链接和设备对象清理次序错误”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第4章 驱动程序：从头到尾的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“停止新请求后所有句柄、IRP、引用、设备与命名对象按反向顺序归零”且对象与引用计数回到基线",
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

export function Wkp04DriverStartToFinishVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp04DriverStartToFinishExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp04DriverStartToFinishSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
