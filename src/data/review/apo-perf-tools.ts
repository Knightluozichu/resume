import type { ReviewQuestion } from "./types";

export const apoPerfToolsQuestions: ReviewQuestion[] = [
  {
    id: "apo-pt-1",
    chapter: "apo-perf-tools",
    level: 2,
    question: "CPU Profiler 的 Sample 和 Trace 两种模式有什么区别？分别适用什么场景？",
    answer:
      "Sample（采样模式）：定期抓取线程调用栈（默认每1000微秒），开销小但对短时方法可能漏采，适合性能压测和长时间运行分析。Trace（全量追踪模式）：记录每个方法的进入和退出时间戳（通过插桩），精度高但运行时开销大（可能2-5倍减速），适合开发期精确定位方法调用关系和耗时。选择原则：开发调试用Trace获取精确调用栈和耗时分布；压测和接近生产环境测试用Sample减少工具自身干扰。注意Trace模式因开销大会掩盖真实性能问题，不能用于性能基准测试。火焰图（Flame Chart）是CPU Profiler的可视化方式，横轴是方法调用栈宽度（CPU时间占比），纵轴是调用深度，越宽的方法是优化重点。",
    tags: ["CPU Profiler", "Sample", "Trace", "火焰图"],
  },
  {
    id: "apo-pt-2",
    chapter: "apo-perf-tools",
    level: 3,
    question: "用 Memory Profiler 定位内存泄漏的完整步骤是什么？",
    answer:
      "步骤：①打开Memory Profiler，操作App后观察内存曲线是否持续上升不回落 ②手动点击GC按钮（垃圾桶图标）触发GC，观察内存是否回收 ③如果GC后内存仍不回收，点击Heap Dump捕获堆转储 ④在Heap Dump中按类名排序，查找本应被回收但仍存活的Activity/Fragment ⑤查看该对象的引用链（Reference Tree），找到持有它的GC Root ⑥常见泄漏模式：静态变量持有Activity、非静态内部类隐式持有外部引用、Handler延迟消息、单例持有Context、注册未反注册 ⑦生产环境配合LeakCanary自动检测，它会在Activity onDestroy后用WeakReference观察是否被GC回收，未回收则Dump堆并分析最短引用链。修复方法：切断引用链，如改为静态内部类+WeakReference、onDestroy时移除Handler消息（removeCallbacksAndMessages）、反注册监听器、用ApplicationContext替代Activity Context。",
    tags: ["Memory Profiler", "内存泄漏", "Heap Dump", "LeakCanary"],
  },
  {
    id: "apo-pt-3",
    chapter: "apo-perf-tools",
    level: 3,
    question: "Perfetto 相比 Systrace 有哪些改进？如何用它分析滑动卡顿？",
    answer:
      "Perfetto改进：①支持SQL查询（TraceProcessor），可批量分析 ②Web UI（ui.perfetto.dev）更强大，支持多trace对比 ③可抓取更多系统事件类型（sched/freq/idle/batt等）④支持长时间录制和后台trace收集 ⑤Systrace已废弃，Perfetto是官方继任者。分析滑动卡顿步骤：①用`adb shell perfetto -t 10s sched freq gfx view`抓取trace ②上传到ui.perfetto.dev ③查看gfx轨道，找到帧时间超过16ms的帧 ④查看该帧的view轨道，分解为measure/layout/draw各阶段耗时 ⑤查看sched轨道，确认主线程是否被其他线程抢占或阻塞（如Binder调用、锁等待）⑥定位到具体阶段后针对性优化：measure/layout慢→优化布局层级；draw慢→减少绘制或用硬件层；sched中主线程阻塞→异步化耗时操作。Perfetto的关键trace分类：sched=CPU调度、gfx=渲染管线、view=View系统、am=ActivityManager。",
    tags: ["Perfetto", "Systrace", "滑动卡顿", "trace分析"],
  },
  {
    id: "apo-pt-4",
    chapter: "apo-perf-tools",
    level: 2,
    question: "GPU Profile Rendering 柱状图的各种颜色分别代表什么？如何据此定位渲染瓶颈？",
    answer:
      "颜色含义（从底到顶）：①蓝色——处理输入事件+动画+measure+layout+draw ②紫色——同步并上传绘制命令到GPU ③红色——GPU执行绘制命令 ④橙色——CPU将缓冲区提交给GPU合成 ⑤黄色——其他线程的渲染工作。定位瓶颈：蓝色高→CPU端布局/绘制太慢，优化方向是减少View层级、避免measure/layout重复触发、简化draw逻辑、消除内存抖动（onDraw中创建对象导致GC）；红色高→GPU绘制负载重，优化方向是减少绘制面积（canvas.clipRect裁剪不可见区域）、减少Shader复杂度、减少过度绘制（移除多余背景）；紫色高→GPU资源同步开销，可能需要批量上传纹理；橙色高→缓冲区交换慢，检查Surface数量。绿色横线是16ms基准线，柱子超过即丢帧。",
    tags: ["GPU Profile Rendering", "颜色含义", "渲染瓶颈", "柱状图"],
  },
];
