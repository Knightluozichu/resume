import type { ReviewQuestion } from "./types";

export const lkdLinuxKernelIntroQuestions: ReviewQuestion[] = [
  {
    id: "lkd-intro-1",
    chapter: "lkd-linux-kernel-intro",
    level: 1,
    question: `Linux内核的主要子系统有哪些？各自负责什么？`,
    answer:
      `Linux内核的主要子系统包括：①系统调用接口——用户程序进入内核的唯一合法入口；②进程管理——创建、调度、销毁进程和线程；③内存管理——分配和回收物理内存、管理虚拟地址空间和页表；④虚拟文件系统（VFS）——统一不同文件系统的接口，管理文件、目录、inode；⑤块设备I/O——管理磁盘等块设备的I/O请求和调度；⑥网络协议栈——实现TCP/IP等网络协议；⑦设备驱动——控制各类硬件设备；⑧中断与异常处理——响应硬件中断和CPU异常。这些子系统通过内核数据结构紧密协作。`,
    tags: ["内核基础", "子系统"],
  },
  {
    id: "lkd-intro-2",
    chapter: "lkd-linux-kernel-intro",
    level: 2,
    question: `内核空间与用户空间的分离是如何实现的？为什么需要这种分离？`,
    answer:
      `通过CPU特权级机制实现：用户态运行在Ring 3，内核态运行在Ring 0。用户空间有自己的虚拟地址空间（通过页表隔离），不能执行特权指令（修改页表、关中断、直接I/O），硬件MMU阻止用户态访问内核地址空间。需要特权操作时必须通过系统调用（syscall指令）进入内核态，由内核校验参数后代为执行。分离的目的：①安全性——限制用户程序权限，防止恶意程序破坏系统；②稳定性——用户程序崩溃（如段错误）只影响自己，不影响内核和其他进程；③资源管理——内核统一管理所有硬件资源，保证公平和安全。`,
    tags: ["内核基础", "特权级"],
  },
  {
    id: "lkd-intro-3",
    chapter: "lkd-linux-kernel-intro",
    level: 3,
    question: `Linux内核版本号体系是怎样的？mainline、stable、longterm之间有什么区别？`,
    answer:
      `Linux内核版本号格式为 X.Y.Z：X为主版本号（如6），Y次版本号，Z修订号。mainline（主线）是Linus维护的开发分支，每个版本约2-3个月发布一次，包含所有新特性。stable（稳定版）由stable team维护，基于mainline做bug修复回溯，只修bug不加新特性，版本号追加第四位（如6.6.1）。longterm（LTS长期支持版）是选定stable版本做长期维护（通常2-6年），为企业发行版提供稳定的bug修复和安全补丁。发行版（如Ubuntu、RHEL）通常基于LTS版本，加上自己的补丁和定制配置。`,
    tags: ["内核基础", "版本管理"],
  },
  {
    id: "lkd-intro-4",
    chapter: "lkd-linux-kernel-intro",
    level: 4,
    question: `内核配置与编译流程是怎样的？为什么Linux要采用这种可配置的构建方式？`,
    answer:
      `流程：①make menuconfig（或 defconfig）——从 Kconfig 文件树生成配置界面，选择要编译的子系统、驱动和功能选项，生成 .config 文件；②make——Makefile 根据 .config 和 Kbuild 系统编译选中的源文件，链接成内核镜像 vmlinux/bzImage，同时编译模块为 .ko 文件；③make modules_install + make install——安装模块到 /lib/modules/，安装内核到 /boot/。采用可配置构建的原因：Linux要运行在从嵌入式设备到超级计算机的广泛硬件上，不可能把所有驱动和功能编进同一镜像。Kconfig 系统让用户按需裁剪，减小镜像体积和内存占用，同时通过模块化支持运行时动态加载。这体现了「机制与策略分离」的哲学。`,
    tags: ["内核基础", "构建系统"],
  },
];
