import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "《Linux内核设计与实现（原书第3版）》全书总复习",
  label: "复习 · 跨子系统闭环",
  color: "#0f172a",
  soft: "#e2e8f0",
  chain: [
    "冻结版本输入",
    "定位入口对象",
    "标记执行上下文",
    "核对锁与生存期",
    "捕获首个分叉",
    "修复恢复并重放",
  ],
  concepts: [
    "第1章 Linux内核简介",
    "1.1 UNIX的历史",
    "1.2 追寻Linus足迹：Linux简介",
    "第2章 从内核出发",
    "2.1 获取内核源码",
    "2.1.1 使用Git",
    "第3章 进程管理",
    "3.1 进程",
    "3.2 进程描述符及任务结构",
    "第4章 进程调度",
    "4.1 多任务",
    "4.2 Linux的进程调度",
    "第5章 系统调用",
    "5.1 与内核通信",
    "5.2 API、POSIX和C库",
    "第6章 内核数据结构",
    "6.1 链表",
    "6.1.1 单向链表和双向链表",
    "第7章 中断和中断处理",
    "7.1 中断",
    "7.2 中断处理程序",
    "第8章 下半部和推后执行的工作",
    "8.1 下半部",
    "8.1.1 为什么要用下半部",
    "第9章 内核同步介绍",
    "9.1 临界区和竞争条件",
    "9.1.1 为什么我们需要保护",
    "第10章 内核同步方法",
    "10.1 原子操作",
    "10.1.1 原子整数操作",
    "第11章 定时器和时间管理",
    "11.1 内核中的时间概念",
    "11.2 节拍率：Hz",
    "第12章 内存管理",
    "12.1 页",
    "12.2 区",
    "第13章 虚拟文件系统",
    "13.1 通用文件系统接口",
    "13.2 文件系统抽象层",
    "第14章 块I/O层",
    "14.1 剖析一个块设备",
    "14.2 缓冲区和缓冲区头",
    "第15章 进程地址空间",
    "15.1 地址空间",
    "15.2 内存描述符",
    "第16章 页高速缓存和页回写",
    "16.1 缓存手段",
    "16.1.1 写缓存",
    "第17章 设备与模块",
    "17.1 设备类型",
    "17.2 模块",
    "第18章 调试",
    "18.1 准备开始",
    "18.2 内核中的bug",
    "第19章 可移植性",
    "19.1 可移植操作系统",
    "19.2 Linux移植史",
    "第20章 补丁、开发和社区",
    "20.1 社区",
    "20.2 Linux编码风格",
  ],
} as const;

export function LkdOfficialFinalReviewMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function LkdOfficialFinalReviewExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function LkdOfficialFinalReviewEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
