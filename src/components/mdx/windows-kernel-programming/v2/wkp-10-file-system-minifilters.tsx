"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-10",
  title: "第10章 文件系统小过滤驱动",
  question:
    "Minifilter的高度、注册、实例、pre/post、文件名、context、I/O、通信端口与卸载怎样闭环？",
  concepts: [
    "第10章 文件系统小过滤驱动",
    "10.1 简介",
    "10.2 装入与卸载",
    "10.3 初始化",
    "10.3.1 操作回调注册",
    "10.3.2 高度",
    "10.4 安装",
    "10.4.1 INF文件",
    "10.4.2 安装驱动程序",
    "10.5 处理I/O操作",
    "10.5.1 操作前回调",
    "10.5.2 操作后回调",
    "10.6 删除保护驱动程序",
    "10.6.1 处理创建前回调",
    "10.6.2 处理设置信息前回调",
    "10.6.3 重构",
    "10.6.4 将驱动程序通用化",
    "10.6.5 测试修改后的驱动程序",
    "10.7 文件名",
    "10.7.1 文件名的各个部分",
    "10.7.2 RAII FLT_FILE_NAME_INFORMATION包装器",
    "10.8 另一个删除保护驱动程序",
    "10.8.1 处理创建前回调和设置信息前回调",
    "10.8.2 测试驱动程序",
    "10.9 上下文",
    "10.10 初始化I/O请求",
    "10.11 文件备份驱动程序",
    "10.11.1 创建后回调",
    "10.11.2 写前回调",
    "10.11.3 清理后回调",
    "10.11.4 测试驱动程序",
    "10.11.5 恢复备份",
    "10.12 用户模式通信",
    "10.12.1 创建通信端口",
    "10.12.2 用户模式连接",
    "10.12.3 发送和接收消息",
    "10.12.4 增强文件备份驱动程序",
    "10.12.5 用户模式客户程序",
    "10.13 调试",
    "10.15 总结",
  ],
  invariant:
    "过滤次序合法且callback data、名称、context、端口、实例和filter引用全部归零",
  fault:
    "伪造高度、名称或context引用泄漏、pre/post返回错误、通信端口或实例未关闭",
  artifact:
    "高度/加载组身份、操作回调轨迹、名称/context引用、端口消息与Filter Verifier结果",
  probe: "minifilter",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第10章 文件系统小过滤驱动涉及的Minifilter装卸、初始化、高度、I/O、删除保护、文件名、context、备份、通信与调试",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第10章 文件系统小过滤驱动的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“过滤次序合法且callback data、名称、context、端口、实例和filter引用全部归零”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第10章 文件系统小过滤驱动的单故障边界",
      control:
        "只注入“伪造高度、名称或context引用泄漏、pre/post返回错误、通信端口或实例未关闭”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第10章 文件系统小过滤驱动的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“过滤次序合法且callback data、名称、context、端口、实例和filter引用全部归零”且对象与引用计数回到基线",
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

export function Wkp10FileSystemMinifiltersVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp10FileSystemMinifiltersExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp10FileSystemMinifiltersSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
