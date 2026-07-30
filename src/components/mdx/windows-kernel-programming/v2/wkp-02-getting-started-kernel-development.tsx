"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-02",
  title: "第2章 开始内核开发",
  question:
    "Windows build、SDK、WDK、Visual Studio、架构、驱动模型、签名与部署怎样组成可恢复构建链？",
  concepts: [
    "第2章 开始内核开发",
    "2.1 安装工具",
    "2.2 创建一个驱动程序项目",
    "2.3 DriverEntry和Unload例程",
    "2.4 部署驱动程序",
    "2.5 简单的跟踪",
    "2.7 总结",
  ],
  invariant: "可重建驱动包只进入隔离测试目标且卸载、重启和快照恢复均可用",
  fault: "版本或架构错配、在日常主机直接部署、只保存一次成功加载截图",
  artifact: "环境清单、SYS/INF/CAT摘要、签名验证、部署日志与恢复快照",
  probe: "setup",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第2章 开始内核开发涉及的工具、驱动项目、DriverEntry、Unload、部署和跟踪",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第2章 开始内核开发的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“可重建驱动包只进入隔离测试目标且卸载、重启和快照恢复均可用”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第2章 开始内核开发的单故障边界",
      control:
        "只注入“版本或架构错配、在日常主机直接部署、只保存一次成功加载截图”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第2章 开始内核开发的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“可重建驱动包只进入隔离测试目标且卸载、重启和快照恢复均可用”且对象与引用计数回到基线",
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

export function Wkp02GettingStartedKernelDevelopmentVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp02GettingStartedKernelDevelopmentExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp02GettingStartedKernelDevelopmentSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
