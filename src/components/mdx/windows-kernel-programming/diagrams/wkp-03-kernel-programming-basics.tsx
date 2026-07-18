import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第3章 内核程序设计基础",
  label: "第3章 · 内核编程契约",
  color: "#6d28d9",
  soft: "#f5f3ff",
  chain: [
    "检查调用约束",
    "选择返回状态",
    "约束C++用法",
    "分配标记内存",
    "组织链表对象",
    "释放驱动资源",
  ],
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
} as const;

export function Wkp03KernelProgrammingBasicsMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp03KernelProgrammingBasicsExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp03KernelProgrammingBasicsEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
