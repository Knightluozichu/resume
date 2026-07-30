"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = {
  unitId: "wkp-unit-11",
  title: "第11章 其他主题",
  question:
    "签名、Verifier、Native API、过滤器、设备监视与内核库怎样迁移到受支持且最小权限的当前实践？",
  concepts: [
    "第11章 其他主题",
    "11.1 驱动程序签名",
    "11.2 驱动程序验证器",
    "11.3 使用原生API",
    "11.4 过滤驱动程序",
    "11.4.1 过滤驱动程序的实现",
    "11.4.2 附加过滤器",
    "11.4.3 在任意时刻附加过滤器",
    "11.4.4 过滤器的清理",
    "11.4.5 基于硬件的过滤驱动程序的更多内容",
    "11.5 设备监视器",
    "11.5.1 增加过滤设备",
    "11.5.2 移除过滤设备",
    "11.5.3 初始化和卸载",
    "11.5.4 处理请求",
    "11.5.5 测试驱动程序",
    "11.5.6 请求的结果",
    "11.6 驱动程序挂钩",
    "11.7 内核库",
    "11.8 总结",
  ],
  invariant:
    "只有必要内核功能、受支持模型、最小权限、隔离验证、恢复与发布签名全部成立",
  fault:
    "生产机全局Verifier、测试代码生产签名、驱动挂钩或向用户态暴露任意内核访问",
  artifact:
    "必要性决策、驱动包/签名/HVCI验证、Verifier设置与reset、过滤设备生命周期",
  probe: "miscellaneous",
  stages: [
    {
      label: "冻结平台与对象",
      object:
        "第11章 其他主题涉及的签名、Verifier、Native API、过滤驱动、设备监视、挂钩与内核库",
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: "第11章 其他主题的参考调用链",
      control: "只运行预注册基线请求或回调",
      signal:
        "状态、NTSTATUS、调用栈、ETW/WinDbg信号与“只有必要内核功能、受支持模型、最小权限、隔离验证、恢复与发布签名全部成立”",
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: "第11章 其他主题的单故障边界",
      control:
        "只注入“生产机全局Verifier、测试代码生产签名、驱动挂钩或向用户态暴露任意内核访问”",
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: "第11章 其他主题的反向清理链",
      control: "以相同build、驱动包、VM和输入重放",
      signal:
        "重新满足“只有必要内核功能、受支持模型、最小权限、隔离验证、恢复与发布签名全部成立”且对象与引用计数回到基线",
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

export function Wkp11MiscellaneousTopicsVersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function Wkp11MiscellaneousTopicsExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function Wkp11MiscellaneousTopicsSafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
}
