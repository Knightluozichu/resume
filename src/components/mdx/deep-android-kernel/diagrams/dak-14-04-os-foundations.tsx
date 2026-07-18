import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第4章 操作系统基础",
  "4.1 计算机体系结构（Computer Architecture）",
  "4.1.1 冯·诺依曼结构",
  "4.1.2 哈佛结构",
  "4.2 什么是操作系统",
  "4.3 进程间通信的经典实现",
  "4.3.1 共享内存（Shared Memory）",
  "4.3.2 管道（Pipe）",
  "4.3.3 Unix Domain Socket",
  "4.3.4 RPC（Remote Procedure Calls）",
  "4.4 同步机制的经典实现",
  "4.4.1 信号量（Semaphore）",
  "4.4.2 Mutex",
  "4.4.3 管程（Monitor）",
  "4.4.4 同步范例",
  "4.5 Android中的同步机制",
  "4.5.1 进程间同步——Mutex",
  "4.5.2 条件判断——Condition",
  "4.5.3 栅栏、障碍——Barrier",
  "4.5.4 加解锁的自动化操作——Autolock",
  "4.6 操作系统内存管理基础",
  "4.6.1 虚拟内存（Virtual Memory）",
  "4.6.2 内存保护（Memory Protection）",
  "4.6.3 内存分配与回收",
  "4.6.4 进程间通信——mmap",
  "4.7 Android中的Low Memory Killer",
  "4.8 Android匿名共享内存（Anonymous Shared Memory）",
  "4.8.1 Ashmem设备",
  "4.8.2 Ashmem应用实例",
  "4.9 JNI",
  "4.9.1 Java函数的本地实现",
  "4.9.2 本地代码访问JVM",
  "4.10 学习Android系统的两条线索"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第4章 操作系统基础" focus="以体系结构、IPC、同步、虚拟内存、LMK、Ashmem和JNI建立Android内核机制地基" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第4章 操作系统基础" focus="用Java对象心智模型解释所有Native与内核行为，忽略地址空间、映射、锁和引用生命周期" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第4章 操作系统基础" focus="地址空间图、IPC字节、锁与条件时序、页映射、LMK触发、Ashmem回收和JNI引用表" nodes={nodes}/>;}
