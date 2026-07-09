import type { ReviewQuestion } from "./types";

export const dakAndroidArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "dak-arch-1",
    chapter: "dak-android-architecture",
    level: 1,
    question: "Android五层架构分别是什么？各层的职责是什么？",
    answer: "五层从上到下：①System Apps（系统应用层）——Launcher/Settings等预装应用，用户直接交互，通过Intent调用框架层；②Java API Framework（应用框架层）——ActivityManager/WindowManager/PackageManager等API，system_server承载核心服务；③Native C/C++ Libraries & Android Runtime——OpenGL ES/SQLite/SurfaceFlinger等原生库，Core Libraries和ART虚拟机（AOT+JIT）；④HAL（硬件抽象层）——Camera/Audio/Display等硬件抽象接口，屏蔽厂商差异；⑤Linux Kernel——Binder驱动/电源管理/进程调度/内存管理。从上到下依次调用，下层为上层提供稳定接口。",
    tags: ["五层架构", "分层设计", "系统架构"],
  },
  {
    id: "dak-arch-2",
    chapter: "dak-android-architecture",
    level: 2,
    question: "分层解耦的内核设计思想体现在哪三个原则？请详细解释。",
    answer: "三个内核设计原则：①稳定接口——每层向上层提供稳定的API/ABI，上层不依赖下层具体实现，如Framework层API不依赖HAL具体厂商实现；②可替换实现——HAL层允许厂商替换硬件驱动（如不同SoC厂商的Camera HAL），上层代码无需修改即可在不同硬件运行；③安全隔离——用户空间（前四层）与内核空间（Linux Kernel）通过系统调用（syscall）隔离，用户态进程不能直接访问内核内存，保证系统安全。Binder驱动是跨进程通信的核心桥梁，system call是用户/内核边界。",
    tags: ["分层解耦", "稳定接口", "安全隔离", "HAL"],
  },
  {
    id: "dak-arch-3",
    chapter: "dak-android-architecture",
    level: 2,
    question: "system_server进程承载哪些核心服务？它在架构中的地位是什么？",
    answer: "system_server由Zygote fork创建，承载所有Java层系统服务：AMS（组件调度/进程管理）、WMS（窗口管理）、PMS（包管理）、PowerManagerService（电源管理）、DisplayManagerService（显示管理）、InputManagerService（输入事件分发）、NotificationManagerService（通知管理）等。地位：它是App与系统底层交互的中枢桥梁——App通过Binder调用system_server中的服务，system_server再通过Native层和HAL与硬件交互。system_server崩溃会导致整个系统重启，因为它承载了所有核心服务。",
    tags: ["system_server", "核心服务", "AMS", "WMS", "PMS"],
  },
  {
    id: "dak-arch-4",
    chapter: "dak-android-architecture",
    level: 3,
    question: "HAL层的设计目的是什么？它如何解决Linux GPL开源协议问题？",
    answer: "HAL设计目的：①屏蔽厂商差异——不同SoC厂商（高通/联发科/三星）硬件实现不同，HAL为上层提供统一接口规范（如Camera HAL 3.0/Audio HAL），上层代码无需为不同硬件适配；②允许闭源驱动在用户空间实现——Linux内核遵循GPL开源协议，厂商驱动放内核层必须开源（涉商业机密），HAL将驱动分为内核层（开源的简单接口如V4L2/ALSA）和用户空间层（闭源的厂商实现），满足GPL要求同时保护知识产权；③模块化——HAL以.so动态库形式存在，可按需加载。HAL是Android区别于标准Linux的重要设计。",
    tags: ["HAL", "GPL", "硬件抽象层", "开源协议"],
  },
];
