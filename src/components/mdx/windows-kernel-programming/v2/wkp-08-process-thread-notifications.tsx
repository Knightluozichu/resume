"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-08",
  title: "第8章 进程和线程通知",
  question:
    "进程、线程与映像通知怎样以短回调、显式队列、丢弃统计和注销顺序送达用户态？",
  concepts: [
    "第8章 进程和线程通知",
    "8.1 进程通知",
    "8.2 实现进程通知",
    "8.2.1 DriverEntry例程",
    "8.2.2 处理进程退出通知",
    "8.2.3 处理进程创建通知",
    "8.3 将数据提供给用户模式",
    "8.4 线程通知",
    "8.5 映像加载通知",
    "8.7 总结",
  ],
  invariant: "注册代次内事件不重不乱，丢弃可计数，停止新事件后队列与引用归零",
  fault: "回调内阻塞、事件队列无界、PID复用误关联或Unload时回调仍可达",
  artifact: "回调注册表、事件模式、队列/丢弃轨迹、用户态协议与注销证明",
  probe: "process-callback",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第8章 进程和线程通知涉及的进程通知、创建/退出、用户态数据、线程通知与映像加载通知",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第8章 进程和线程通知的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“注册代次内事件不重不乱，丢弃可计数，停止新事件后队列与引用归零”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第8章 进程和线程通知的单故障边界",
      control:
        "只注入“回调内阻塞、事件队列无界、PID复用误关联或Unload时回调仍可达”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第8章 进程和线程通知的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“注册代次内事件不重不乱，丢弃可计数，停止新事件后队列与引用归零”且对象与引用计数回到基线",
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

export function Wkp08ProcessThreadNotificationsVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp08ProcessThreadNotificationsExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp08ProcessThreadNotificationsSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
