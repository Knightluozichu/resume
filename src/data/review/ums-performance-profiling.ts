import type { ReviewQuestion } from "./types";

export const umsPerformanceProfilingQuestions: ReviewQuestion[] = [
  {
    id: "ums-performance-profiling-1",
    chapter: "ums-performance-profiling",
    level: 1,
    question: `Unity 性能分析的两把手术刀是什么？各自做什么？`,
    answer: `Profiler 做性能时间线分析（CPU/GPU/Memory/Rendering 逐帧拆分，定位瓶颈类型），Frame Debugger 做渲染流程拆解（逐 DrawCall 查看状态、材质、纹理，排查批处理失败）。标准流程：先用 Profiler 找到瓶颈类型（CPU 逻辑/CPU 渲染提交/GPU/内存），再用对应工具深入定位。`,
    tags: ["Profiler", "Frame Debugger", "性能分析"],
  },
  {
    id: "ums-performance-profiling-2",
    chapter: "ums-performance-profiling",
    level: 2,
    question: `GC.Alloc 和 GC.Collect 的区别是什么？各自如何导致卡顿？`,
    answer: `GC.Alloc 是在托管堆上分配内存的操作（如 new 对象、字符串拼接），本身耗时小但产生垃圾。GC.Collect 是垃圾回收器扫描并清理堆内存的操作，会暂停主线程（Stop The World），耗时几十毫秒，直接导致帧率暴跌。频繁 GC.Alloc 积累垃圾→触发 GC.Collect→卡顿。消除 GC 的目标是减少 Alloc，从而降低 Collect 频率。`,
    tags: ["GC.Alloc", "GC.Collect", "卡顿"],
  },
  {
    id: "ums-performance-profiling-3",
    chapter: "ums-performance-profiling",
    level: 3,
    question: `为什么 Debug.Log 在发布版里也影响性能？该怎么处理？`,
    answer: `Debug.Log 在发布版里不会编译为空（只有 [Conditional(\"UNITY_EDITOR\")] 方法才会），它仍执行字符串拼接（产生 GC）和写入日志文件（IO 开销）。处理方法：1）用 [System.Diagnostics.Conditional(\"UNITY_LOG\")] 标记日志方法，发布时不编译；2）用条件编译包裹 #if UNITY_EDITOR；3）用 IL2CPP Stripping 配置移除。生产环境必须关闭或重定向日志。`,
    tags: ["Debug.Log", "发布版", "条件编译"],
  },
  {
    id: "ums-performance-profiling-4",
    chapter: "ums-performance-profiling",
    level: 4,
    question: `Profiler 显示 GC.Alloc 每帧 0B 但游戏仍偶发卡顿，怎么排查？`,
    answer: `GC.Alloc 是分配量不是回收操作。即使某帧没有分配，之前积累的垃圾可能在某帧触发 GC.Collect（回收本身耗时几十毫秒）。排查：1）在 Profiler 里搜索 GC.Collect（注意不是 GC.Alloc），看是否有周期性回收尖峰；2）用 Deep Profile 找隐藏的分配源（foreach 迭代器、闭包捕获、事件订阅、协程 yield）；3）用 Memory Profiler 包做内存快照对比，找出泄漏对象；4）检查是否有每几秒触发一次的定时器或后台线程分配。`,
    tags: ["GC.Collect", "Deep Profile", "偶发卡顿", "排查"],
  },
];
