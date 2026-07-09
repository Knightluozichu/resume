import type { ReviewQuestion } from "./types";

export const aalSystemArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "aal-sa-1",
    chapter: "aal-system-architecture",
    level: 1,
    question: "Android系统架构的HAL层（硬件抽象层）的作用是什么？为什么需要它？",
    answer: "HAL（Hardware Abstraction Layer）的作用是为上层提供统一的硬件接口，屏蔽不同厂商的硬件实现差异。需要HAL的原因：①Linux内核是GPL开源协议，厂商的硬件驱动如果放进内核就必须开源，而HAL在用户空间，可以闭源保护厂商知识产权；②不同厂商的Camera、Audio、Display等硬件实现不同，HAL提供统一接口（如camera_module_t），Framework层代码无需关心具体硬件；③HAL以.so动态库形式存在，厂商可以独立替换而不影响系统框架。HAL位于Native Libraries和Linux Kernel之间，是用户空间和内核空间的边界。",
    tags: ["HAL", "硬件抽象层", "系统架构"]
  },
  {
    id: "aal-sa-2",
    chapter: "aal-system-architecture",
    level: 2,
    question: "Android系统启动流程是怎样的？从init进程到Zygote的完整链路是什么？",
    answer: "Android系统启动流程：①按下电源，Bootloader加载引导程序，启动Linux Kernel；②Kernel启动后执行init进程（PID=1），init解析init.rc脚本；③init进程fork出servicemanager（Binder服务管理器，PID=0的Context Manager）、mediaserver等关键服务；④init进程fork出Zygote进程（孵化器），Zygote是所有App进程的父进程；⑤Zygote执行ZygoteInit.main()，预加载系统资源和类（preloadClasses/preloadResources），注册Socket监听；⑥Zygote fork出system_server进程，启动AMS、PMS、WMS等核心系统服务；⑦system_server启动完成后，AMS通过Zygote fork出Launcher进程，显示桌面。关键设计：Zygote预加载资源后通过fork复制自身，子进程继承预加载的资源，避免每个App重复加载，加快启动速度。",
    tags: ["系统启动", "init", "Zygote", "system_server"]
  },
  {
    id: "aal-sa-3",
    chapter: "aal-system-architecture",
    level: 2,
    question: "Zygote进程为什么使用fork而不是new来创建应用进程？fork有什么优势？",
    answer: "Zygote使用fork创建应用进程的优势：①资源复用——Zygote在启动时预加载了大量的系统类（preloadClasses）、资源（preloadResources）和图形缓冲区等，fork是写时复制（Copy-On-Write），子进程与父进程共享物理内存页，只有在写入时才复制，因此子进程不需要重新加载这些资源，大幅加快App启动速度；②一致性——所有App进程共享同一份预加载的类和资源，保证运行环境一致；③性能——fork是系统调用，比new一个进程再加载完整虚拟机快几个数量级；④ART虚拟机实例复制——fork后子进程直接拥有完整的ART虚拟机实例，无需重新初始化。这是Android启动速度优化的核心设计之一。",
    tags: ["Zygote", "fork", "COW", "启动优化"]
  },
  {
    id: "aal-sa-4",
    chapter: "aal-system-architecture",
    level: 3,
    question: "Android系统中system_server进程的作用是什么？它启动了哪些核心服务？",
    answer: "system_server是Android系统最核心的进程之一，由Zygote fork而来，负责启动和管理所有系统核心服务。启动的核心服务包括：①AMS（Activity Manager Service）——调度四大组件生命周期、管理Activity栈、进程优先级和内存回收；②PMS（Package Manager Service）——包解析、安装、卸载、权限管理、组件信息维护；③WMS（Window Manager Service）——窗口管理、Surface分配、窗口层级排序、焦点管理；④InputManagerService——输入事件分发；⑤PowerManagerService——电源管理；⑥DisplayManagerService——显示管理；⑦PackageManagerService——包管理；⑧NotificationManagerService——通知管理。system_server崩溃会导致整个系统重启，因此它运行在高优先级。这些服务运行在同一线程池中，通过Binder与App进程通信。",
    tags: ["system_server", "核心服务", "AMS", "PMS", "WMS"]
  }
];
