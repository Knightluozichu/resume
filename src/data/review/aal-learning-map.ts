import type { ReviewQuestion } from "./types";

export const aalLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "aal-lm-1",
    chapter: "aal-learning-map",
    level: 1,
    question: "《Android进阶之光》全书的学习路径分为哪几个阶段？各阶段的核心主题是什么？",
    answer: "全书分九个阶段递进展开：①全书学习地图（知识体系总览）②Android系统架构（五层架构、系统启动流程）③Dalvik与ART虚拟机（DEX格式、AOT/JIT编译、GC机制）④Binder IPC原理（Binder驱动、ServiceManager、一次拷贝、Proxy-Stub）⑤AMS与PMS（Activity栈管理、进程管理、包解析、权限管理）⑥WMS与窗口管理（Window类型、WindowState、Surface、绘制流程）⑦PackageManager（APK解析、PMS交互、组件扫描、签名校验）⑧类加载器与插件化（ClassLoader层级、双亲委派、DexClassLoader、热修复）⑨高级性能优化（启动、内存、渲染、ANR卡顿、电量、稳定性）。递进逻辑：先理解系统架构分层，再深入虚拟机与Binder通信机制，然后掌握核心服务AMS/PMS/WMS，接着包管理与类加载器，最后性能优化与全书复习。",
    tags: ["学习路径", "知识体系", "全书概览"]
  },
  {
    id: "aal-lm-2",
    chapter: "aal-learning-map",
    level: 1,
    question: "Android系统五层架构从上到下分别是什么？各层的职责是什么？",
    answer: "从上到下五层：①System Apps（系统应用层）——Launcher、Settings、Phone等预装应用，开发者通过Intent调用；②Java API Framework（应用框架层）——Activity Manager、Window Manager、Package Manager、View System等API，是开发者直接使用的接口；③Native C/C++ Libraries & Android Runtime——OpenGL ES、SQLite、WebKit等原生库，以及Core Libraries和ART虚拟机；④HAL（硬件抽象层）——Camera、Audio、Display等硬件抽象接口，屏蔽厂商差异；⑤Linux Kernel——Binder驱动、显示驱动、WiFi驱动、电源管理、进程调度、内存管理。从上到下依次调用，下层为上层提供服务，Binder IPC是跨进程通信的核心桥梁。",
    tags: ["系统架构", "五层架构", "分层职责"]
  },
  {
    id: "aal-lm-3",
    chapter: "aal-learning-map",
    level: 2,
    question: "全书各章节之间存在哪些交叉关联？举例说明。",
    answer: "交叉关联：①架构×Binder——五层架构中Framework层通过Binder驱动与Native/内核通信，理解架构才能理解Binder在系统中的定位；②Binder×AMS/PMS——AMS和PMS运行在system_server，App进程通过Binder与它们交互，Binder是组件调度的通信基础；③虚拟机×插件化——DexClassLoader加载插件dex依赖ART虚拟机的类加载机制，理解虚拟机才能理解插件化；④PMS×ClassLoader——PMS解析APK后通过PathClassLoader加载应用dex，包管理是类加载的前提；⑤AMS×WMS——Activity启动时AMS通过WMS添加窗口，两者协作完成Activity的显示；⑥AMS×性能——理解AMS的进程优先级和OOM Adj才能做内存优化，理解ANR机制（主线程5s无响应）才能做稳定性优化。一条主线：系统架构→通信机制（Binder）→核心服务（AMS/PMS/WMS）→底层技术（ClassLoader）→性能优化。",
    tags: ["交叉关联", "知识图谱", "架构"]
  },
  {
    id: "aal-lm-4",
    chapter: "aal-learning-map",
    level: 2,
    question: "Android进阶学习的核心心智模型是什么？如何建立系统性认知？",
    answer: "核心心智模型：Android是一个分层+跨进程的系统。①分层思维——Android从Linux内核到系统应用共五层，每层有明确职责，上层调用下层，理解分层才能定位问题层级；②跨进程思维——Android四大组件运行在不同进程，AMS/PMS/WMS在system_server，App在自己的进程，所有跨进程通信都依赖Binder IPC；③消息驱动思维——主线程基于Looper/MessageQueue消息循环，所有UI操作、生命周期回调都在消息循环中执行；④组件化思维——Activity/Service/BroadcastReceiver/ContentProvider四大组件由AMS统一调度，组件间通过Intent通信。系统性认知建立路径：先从五层架构理解全局，再深入Binder理解进程间通信，然后研究AMS/PMS/WMS三大核心服务，接着ClassLoader和插件化理解底层加载机制，最后性能优化将前述知识综合应用。",
    tags: ["心智模型", "系统认知", "架构思维"]
  }
];
