"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-09",
  title: "第9章 对象和注册表通知",
  question: "对象与注册表前后回调怎样限制访问、关联上下文并在卸载前可靠注销？",
  concepts: [
    "第9章 对象和注册表通知",
    "9.1 对象通知",
    "9.1.1 操作前回调",
    "9.1.2 操作后回调",
    "9.2 进程保护驱动程序",
    "9.2.1 对象通知注册",
    "9.2.2 管理受保护的进程",
    "9.2.3 操作前回调",
    "9.2.4 客户应用",
    "9.3 注册表通知",
    "9.3.1 处理操作前通知",
    "9.3.2 处理操作后回调",
    "9.3.3 性能考虑",
    "9.4 实现注册表通知",
    "9.4.1 处理注册表回调",
    "9.4.2 修改后的客户代码",
    "9.6 总结",
  ],
  invariant: "只收窄声明的访问且每个注册句柄、上下文和回调引用都反向释放",
  fault:
    "把保护示例扩展为任意内核能力、忽略访问控制、注册句柄泄漏或前后回调错配",
  artifact: "操作类/访问掩码矩阵、前后关联键、注册表通知轨迹与注销记录",
  probe: "object-registry",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第9章 对象和注册表通知涉及的对象通知、进程保护、注册表前后通知、性能与用户态客户",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第9章 对象和注册表通知的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“只收窄声明的访问且每个注册句柄、上下文和回调引用都反向释放”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第9章 对象和注册表通知的单故障边界",
      control:
        "只注入“把保护示例扩展为任意内核能力、忽略访问控制、注册句柄泄漏或前后回调错配”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第9章 对象和注册表通知的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“只收窄声明的访问且每个注册句柄、上下文和回调引用都反向释放”且对象与引用计数回到基线",
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

export function Wkp09ObjectRegistryNotificationsVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp09ObjectRegistryNotificationsExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp09ObjectRegistryNotificationsSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
