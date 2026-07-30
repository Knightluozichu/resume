"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-06",
  title: "第6章 内核机制",
  question:
    "IRQL、DPC、APC、异常、崩溃转储、同步原语、自旋锁与工作项怎样按上下文选择？",
  concepts: [
    "第6章 内核机制",
    "6.1 中断请求级别",
    "6.1.1 提升和降低IRQL",
    "6.1.2 线程优先级与IRQL",
    "6.2 延迟过程调用",
    "6.3 异步过程调用",
    "6.4 结构化异常处理",
    "6.4.1 使用__try/__except",
    "6.4.2 使用__try/__finally",
    "6.4.3 使用C++ RAII代替__try/__finally",
    "6.5 系统崩溃",
    "6.5.1 崩溃转储信息",
    "6.5.2 分析转储文件",
    "6.5.3 系统挂起",
    "6.6 线程同步",
    "6.6.1 互锁操作",
    "6.6.2 分发器对象",
    "6.6.3 互斥量",
    "6.6.4 快速互斥量",
    "6.6.5 信号量",
    "6.6.6 事件",
    "6.6.7 执行体资源",
    "6.7 高IRQL同步",
    "6.8 工作项",
    "6.9 总结",
  ],
  invariant: "可等待性、分页性、锁序、IRQL、队列与反向释放在所有执行路径匹配",
  fault:
    "把线程优先级当IRQL、在高IRQL等待或访问分页代码、锁序环和工作项卸载竞态",
  artifact: "IRQL/CPU/线程轨迹、DPC与工作项队列、锁图、转储和同输入恢复",
  probe: "mechanisms",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第6章 内核机制涉及的IRQL、DPC、APC、SEH、系统崩溃、同步、高IRQL与工作项",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第6章 内核机制的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“可等待性、分页性、锁序、IRQL、队列与反向释放在所有执行路径匹配”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第6章 内核机制的单故障边界",
      control:
        "只注入“把线程优先级当IRQL、在高IRQL等待或访问分页代码、锁序环和工作项卸载竞态”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第6章 内核机制的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“可等待性、分页性、锁序、IRQL、队列与反向释放在所有执行路径匹配”且对象与引用计数回到基线",
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

export function Wkp06KernelMechanismsVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp06KernelMechanismsExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp06KernelMechanismsSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
