import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第6章 内核机制",
  label: "第6章 · 调度与同步",
  color: "#be123c",
  soft: "#fff1f2",
  chain: [
    "读取当前IRQL",
    "选择延迟机制",
    "隔离异常路径",
    "分析崩溃转储",
    "选择同步原语",
    "下放工作项",
  ],
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
} as const;

export function Wkp06KernelMechanismsMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp06KernelMechanismsExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp06KernelMechanismsEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
