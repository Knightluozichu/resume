import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第5章 系统调用",
  label: "进程 · 调度与系统调用",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "区分API与ABI",
    "选择调用号",
    "进入内核入口",
    "复制并验证参数",
    "执行内核实现",
    "返回用户空间",
  ],
  concepts: [
    "第5章 系统调用",
    "5.1 与内核通信",
    "5.2 API、POSIX和C库",
    "5.3 系统调用",
    "5.3.1 系统调用号",
    "5.3.2 系统调用的性能",
    "5.4 系统调用处理程序",
    "5.4.1 指定恰当的系统调用",
    "5.4.2 参数传递",
    "5.5 系统调用的实现",
    "5.5.1 实现系统调用",
    "5.5.2 参数验证",
    "5.6 系统调用上下文",
    "5.6.1 绑定一个系统调用的最后步骤",
    "5.6.2 从用户空间访问系统调用",
    "5.6.3 为什么不通过系统调用的方式实现",
    "5.7 小结",
  ],
} as const;

export function Lkd05SystemCallsMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd05SystemCallsExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd05SystemCallsEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
