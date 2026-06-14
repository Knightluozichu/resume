/** 复习题库 · Android 系统架构（android-architecture）。《Android进阶解密》第1章。 */

import type { ReviewQuestion } from "./types";

export const androidArchitectureQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "aa-1",
    chapter: "android-architecture",
    level: 1,
    question: "Android 系统分哪五层？按从下到上的顺序说出名称。",
    answer:
      "Linux 内核层 → HAL（硬件抽象层）→ 系统运行库层（ART + C/C++ 原生库）→ 应用框架层 → 应用层。",
    tags: ["五层架构", "分层"],
  },
  {
    id: "aa-2",
    chapter: "android-architecture",
    level: 1,
    question: "Linux 内核层在 Android 里干什么？举三个它管理的资源。",
    answer:
      "内核是地基：管理 CPU 调度、内存分配、文件系统、网络协议栈和硬件驱动。三个管理的资源：进程（谁跑谁等）、内存（分配和回收）、硬件驱动（摄像头、触摸屏等）。",
    tags: ["Linux内核", "硬件管理"],
  },
  {
    id: "aa-3",
    chapter: "android-architecture",
    level: 1,
    question: "HAL 的全称是什么？它解决什么核心问题？",
    answer:
      "Hardware Abstraction Layer，硬件抽象层。它解决的核心问题：Android 要跑在成千上万种不同硬件上，每家厂商的摄像头、传感器都不一样。HAL 定义标准接口，各厂商各自实现，上层框架只跟接口打交道，不关心底层是谁家的硬件。",
    tags: ["HAL", "硬件抽象"],
  },
  {
    id: "aa-4",
    chapter: "android-architecture",
    level: 1,
    question: "ART 是什么？它跟 Dalvik 是什么关系？",
    answer:
      "ART（Android Runtime）是 Android 上运行 Java/Kotlin 代码的虚拟机。它把 dex 字节码翻译成 CPU 能执行的机器码。ART 从 Android 5.0 起全面取代老的 Dalvik，采用 AOT 预编译 + JIT 即时编译混合模式。",
    tags: ["ART", "虚拟机"],
  },
  {
    id: "aa-5",
    chapter: "android-architecture",
    level: 1,
    question: "应用框架层里的 AMS 和 WMS 各管什么？",
    answer:
      "AMS（Activity Manager Service）管所有 App 的 Activity——启动、跳转、生命周期调度、回收。WMS（Window Manager Service）管屏幕上所有窗口的层级和位置——谁在最上面、谁被遮住、窗口大小。",
    tags: ["AMS", "WMS", "框架层"],
  },
  {
    id: "aa-6",
    chapter: "android-architecture",
    level: 1,
    question: "Skia 是什么？它在哪一层？",
    answer:
      "Skia 是 Android 的 2D 图形渲染引擎，在系统运行库层。屏幕上显示的每一个按钮、文字、动画，底层都是 Skia 画的。它是 C++ 写的，Chrome 浏览器也用同一套引擎。",
    tags: ["Skia", "图形渲染"],
  },
  // ── L2 理解：关联 / 对比 ──
  {
    id: "aa-7",
    chapter: "android-architecture",
    level: 2,
    question: "一个 App 从点击图标到显示界面，中间经过了哪几层？从最上层开始说。",
    answer:
      "① 应用层：Launcher 收到点击事件 → ② 框架层：Launcher 通过 Binder 向 AMS 请求启动 Activity → ③ 框架层：AMS 检查权限后通知 Zygote fork 新进程 → ④ 运行库层：ART 在进程里加载 App 的 dex 代码 → ⑤ HAL/内核：SurfaceFlinger 把界面帧送到屏幕硬件显示。全程跨越多层。",
    tags: ["启动流程", "全链路"],
  },
  {
    id: "aa-8",
    chapter: "android-architecture",
    level: 2,
    question: "Binder 跟 Linux 原生的 pipe 或 socket 比，多了什么关键能力？",
    answer:
      "Binder 除了传数据，还能做身份校验——系统能知道「谁在叫我」，从而做权限检查。普通的 Linux pipe 和 socket 没有这个内置身份机制。Binder 是 Android 安全沙箱体系的实施基础。",
    tags: ["Binder", "IPC", "安全"],
  },
  // ── L3 应用：场景判断 ──
  {
    id: "aa-9",
    chapter: "android-architecture",
    level: 3,
    question: "面试官问：「Android 框架层有哪些核心系统服务？它们跑在哪个进程里？」你怎么答？",
    answer:
      "核心系统服务包括 AMS（Activity 管理）、WMS（窗口管理）、PMS（包管理）、NotificationManagerService（通知管理）、PowerManagerService（电源管理）等。它们都跑在 system_server 进程中。App 进程通过 Binder 向 system_server 发请求，system_server 处理后返回结果——这就是 Binder IPC 的典型应用。",
    tags: ["面试", "system_server"],
  },
  {
    id: "aa-10",
    chapter: "android-architecture",
    level: 3,
    question: "如果让你在 AOSP 源码里找「AMS 怎么启动一个 Activity」的代码，你会去哪个目录、哪个文件找？",
    answer:
      "关键文件在 `frameworks/base/services/core/java/com/android/server/am/ActivityManagerService.java`（系统服务端）。App 端调用的入口在 `frameworks/base/core/java/android/app/Activity.java` 的 `startActivity()` 方法——它会通过 Binder 把请求发给 AMS。",
    tags: ["AOSP", "源码路径"],
  },
];
