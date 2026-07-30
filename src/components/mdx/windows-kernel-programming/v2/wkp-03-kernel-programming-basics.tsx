"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-03",
  title: "第3章 内核程序设计基础",
  question:
    "NTSTATUS、IRQL、字符串、池、链表、驱动对象和设备对象怎样形成失败安全的内核合同？",
  concepts: [
    "第3章 内核程序设计基础",
    "3.1 内核程序设计的一般准则",
    "3.1.1 未处理的异常",
    "3.1.2 终止",
    "3.1.3 函数返回值",
    "3.1.4 IRQL",
    "3.1.5 C++用法",
    "3.1.6 测试和调试",
    "3.2 调试构建与发布构建",
    "3.3 内核API",
    "3.4 函数和错误代码",
    "3.5 字符串",
    "3.6 动态内存分配",
    "3.7 链表",
    "3.8 驱动程序对象",
    "3.9 设备对象",
    "3.10 总结",
  ],
  invariant: "每条成功与失败路径都满足IRQL、分页性、所有权、引用和反向清理",
  fault: "高IRQL访问分页内存、忽略返回值、异常越过所有权或错误释放池对象",
  artifact: "DDI/IRQL矩阵、池标签与分配轨迹、对象/链表不变量和失败注入",
  probe: "basics",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第3章 内核程序设计基础涉及的内核准则、异常、返回值、IRQL、C++、API、字符串、内存、链表与设备对象",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第3章 内核程序设计基础的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“每条成功与失败路径都满足IRQL、分页性、所有权、引用和反向清理”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第3章 内核程序设计基础的单故障边界",
      control:
        "只注入“高IRQL访问分页内存、忽略返回值、异常越过所有权或错误释放池对象”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第3章 内核程序设计基础的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“每条成功与失败路径都满足IRQL、分页性、所有权、引用和反向清理”且对象与引用计数回到基线",
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

export function Wkp03KernelProgrammingBasicsVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp03KernelProgrammingBasicsExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp03KernelProgrammingBasicsSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
