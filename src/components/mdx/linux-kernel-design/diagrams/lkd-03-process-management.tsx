import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第3章 进程管理",
  label: "进程 · 调度与系统调用",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "定位任务描述符",
    "读取进程状态",
    "建立家族关系",
    "复制或共享资源",
    "运行线程",
    "退出并回收",
  ],
  concepts: [
    "第3章 进程管理",
    "3.1 进程",
    "3.2 进程描述符及任务结构",
    "3.2.1 分配进程描述符",
    "3.2.2 进程描述符的存放",
    "3.2.3 进程状态",
    "3.2.4 设置当前进程状态",
    "3.2.5 进程上下文",
    "3.2.6 进程家族树",
    "3.3 进程创建",
    "3.3.1 写时拷贝",
    "3.3.2 fork()",
    "3.3.3 vfork()",
    "3.4 线程在Linux中的实现",
    "3.4.1 创建线程",
    "3.4.2 内核线程",
    "3.5 进程终结",
    "3.5.1 删除进程描述符",
    "3.5.2 孤儿进程造成的进退维谷",
    "3.6 小结",
  ],
} as const;

export function Lkd03ProcessManagementMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd03ProcessManagementExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd03ProcessManagementEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
