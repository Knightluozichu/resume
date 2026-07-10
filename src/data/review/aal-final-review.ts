import type { ReviewQuestion } from "./types";

export const aalFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "aal-fr-1",
    chapter: "aal-final-review",
    level: 2,
    question: `从系统架构到性能优化，Android进阶知识体系的核心主线是什么？各层之间如何关联？`,
    answer: `核心主线：Android是一个分层+跨进程的系统，所有进阶知识围绕「分层架构」和「Binder跨进程通信」展开。各层关联：①系统架构（五层分层）是全局认知基础——理解Framework层有哪些服务才能深入研究AMS/PMS/WMS；②Binder IPC是跨进程通信核心——AMS/PMS/WMS运行在system_server，App通过Binder与它们通信，理解Binder才能理解组件调度机制；③虚拟机（Dalvik/ART）是运行时基础——理解DEX/AOT/JIT/GC才能理解类加载和性能优化；④核心服务（AMS/PMS/WMS）是系统三大支柱——AMS调度组件和进程，PMS管理包和权限，WMS管理窗口和Surface，三者通过Binder协作；⑤ClassLoader是底层加载机制——理解类加载才能做插件化和热修复；⑥性能优化是综合应用——内存优化需要理解GC和AMS的进程回收，ANR分析需要理解AMS的组件调度，启动优化需要理解Zygote fork和Application初始化。一条主线：架构→通信→服务→加载→性能，逐层递进。`,
    tags: ["知识体系", "核心主线", "分层架构", "Binder"]
  },
  {
    id: "aal-fr-2",
    chapter: "aal-final-review",
    level: 3,
    question: `一个Activity从启动到显示到屏幕上，涉及Android系统的哪些核心机制？请串联完整链路。`,
    answer: `Activity从启动到显示的完整链路涉及六大核心机制：①Binder IPC——App进程通过Binder向AMS发送startActivity请求（跨进程通信），AMS通过Binder回调ApplicationThread通知目标进程；②AMS组件调度——AMS检查Intent、权限、目标进程，若目标进程不存在则通过Socket通知Zygote fork新进程（进程创建）；③Zygote进程孵化——Zygote fork出新进程，复制预加载的资源和ART虚拟机实例（启动优化设计），新进程执行ActivityThread.main()初始化Looper；④PMS包管理——AMS通过PMS查询目标Activity的组件信息（PackageInfo），确认权限和组件注册信息；⑤ClassLoader类加载——目标进程通过PathClassLoader加载Activity类（如果已安装）或DexClassLoader（插件化场景），创建Activity实例；⑥WMS窗口管理——Activity创建后通过WindowManager向WMS添加窗口，WMS分配Surface，ViewRootImpl驱动measure/layout/draw，绘制到Surface，SurfaceFlinger合成多窗口显示到屏幕。六个机制环环相扣：Binder传输指令→AMS调度组件→Zygote创建进程→PMS提供信息→ClassLoader加载类→WMS管理窗口。`,
    tags: ["Activity启动", "全链路", "Binder", "AMS", "Zygote", "PMS", "ClassLoader", "WMS"]
  },
  {
    id: "aal-fr-3",
    chapter: "aal-final-review",
    level: 3,
    question: `如果App出现ANR+内存泄漏+卡顿三个问题，你会如何系统性排查和优化？`,
    answer: `系统性排查三步走：①ANR排查——首先查看/data/anr/traces.txt定位主线程阻塞堆栈，确认是I/O、数据库、网络还是计算阻塞。如果是SharedPreferences.commit()改为apply()，如果是数据库操作移到子线程，如果是JSON解析用流式解析替代全量加载。用StrictMode在开发期自动检测主线程违规操作。②内存泄漏排查——集成LeakCanary自动检测Activity/Fragment泄漏，分析引用链定位泄漏源。常见修复：Handler改为静态内部类+WeakReference，单例用ApplicationContext，onDestroy中注销BroadcastReceiver和cancel动画。用Android Profiler dump Hprof，MAT分析GC Root引用链，找出未释放的大对象。③卡顿排查——用Choreographer.FrameCallback或BlockCanary监控主线程帧耗时，定位超过16ms的帧。用Systrace/Perfetto分析每帧的measure/layout/draw耗时。优化：减少布局层级（ConstraintLayout）、避免onDraw创建对象、减少过度绘制、使用ViewStub懒加载。系统性思维：三个问题可能互相关联——内存泄漏导致GC频繁→GC停顿导致卡顿→卡顿严重导致ANR，需综合优化。`,
    tags: ["ANR", "内存泄漏", "卡顿", "系统排查", "性能优化"]
  },
  {
    id: "aal-fr-4",
    chapter: "aal-final-review",
    level: 4,
    question: `对比Android进阶的两大底层技术——插件化和热修复，它们的原理、适用场景和局限性分别是什么？`,
    answer: `插件化vs热修复对比：①原理——插件化通过DexClassLoader加载插件APK的代码和资源，突破PathClassLoader只能加载已安装APK的限制，实现动态加载未安装的APK运行完整功能；热修复通过DexClassLoader加载补丁dex，操纵dexElements数组将补丁类插入头部优先加载，替换有bug的类。②核心机制——插件化需要解决Activity注册问题（Hook AMS占坑/虚拟化），需要处理插件资源加载（新建Resources）和生命周期管理；热修复只需替换类，不需处理组件注册和资源，复杂度较低。③适用场景——插件化适用于功能模块化的大型App（如淘宝、微信），将功能拆分为独立APK按需下载加载，减小主包体积，实现动态部署；热修复适用于紧急bug修复，无需发版即可修复线上bug，快速响应。④局限性——插件化：兼容性问题（不同Android版本Hook点不同），组件支持不完整（Service/BroadcastReceiver处理复杂），性能开销（反射和资源加载），维护成本高；热修复：只能替换方法实现（不能新增类/修改类结构），ART下类已被加载无法替换（只能重启生效），兼容性挑战（厂商ROM修改）。⑤趋势——随着Android Studio Instant App、Dynamic Feature Module（动态特性模块）等官方方案的推出，插件化需求减少；热修复仍被广泛使用但需适配新系统。`,
    tags: ["插件化", "热修复", "DexClassLoader", "对比分析", "选型"]
  }
];
