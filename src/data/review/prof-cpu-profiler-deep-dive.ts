/** 复习题库 · CPU Profiler 深度使用（prof-cpu-profiler-deep-dive）。Unity 官方 Profiling 指南 Ch2 改编。 */

import type { ReviewQuestion } from "./types";

export const profCpuProfilerDeepDiveQuestions: ReviewQuestion[] = [
  {
    id: "prof-cpu-1",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 1,
    question: "CPU Usage Profiler 的 Timeline 视图和 Hierarchy 视图各用于什么目的？",
    answer:
      "Timeline 视图按时间顺序展示每帧 CPU 任务分布（横轴时间、纵轴色带堆叠），回答「这一帧的时间都去哪了」；Hierarchy 视图按函数调用树展开耗时数据，支持按 Total time 和 Self time 排序，回答「哪个函数最慢」。Timeline 看大类、Hierarchy 看具体函数。",
    tags: ["Timeline", "Hierarchy", "CPU Usage"],
  },
  {
    id: "prof-cpu-2",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 1,
    question: "Self time 和 Total time 的区别是什么？排查 CPU 热点时应该先看哪个？",
    answer:
      "Total time = 函数自身耗时 + 所有子调用耗时（含子函数的总花销）。Self time = 只算函数自身代码的耗时（把子函数扣掉）。排查流程：先看 Total time 找到耗时最大的入口函数，再展开看子函数的 Self time 找到真正的瓶颈——Total 是「谁负责」，Self 是「谁真慢」。",
    tags: ["Self time", "Total time", "Hierarchy"],
  },
  {
    id: "prof-cpu-3",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 1,
    question: "GC Alloc 在 CPU Profiler 的 Timeline 上用什么颜色表示？它代表什么？",
    answer:
      "GC Alloc 在 Timeline 上用红色（或粉色）标记表示。它代表当前帧内发生了托管内存分配（Garbage Collector Allocation），红色条的高度代表分配的字节数——不是说 GC 暂停发生了，而是这帧里有分配、积累多了会触发 GC。GC 的实际暂停时间要去 GC 专用色带里看。",
    tags: ["GC Alloc", "Timeline", "红色标记"],
  },
  {
    id: "prof-cpu-4",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 1,
    question: "CPU Usage 里 Scripts 类别和 Engine 类别分别代表什么？为什么要区分它们？",
    answer:
      "Scripts 是你自己写的 C# 代码（Update、自定义方法、协程等），Engine 是 Unity 引擎 Native 代码（渲染准备、物理模拟、动画求值等）。区分的原因是优化方向完全不同：Scripts 慢改自己代码，Engine 慢改资源配置和场景。混淆两者会导致对着错误的方向优化。",
    tags: ["Scripts", "Engine", "分类"],
  },
  {
    id: "prof-cpu-5",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 2,
    question:
      "你的 Update() 在 Hierarchy 里 Total time 排第一，120ms。它一定是 CPU 杀手吗？写出排查步骤。",
    answer:
      "不一定——Total time 包含所有子调用。排查步骤：①展开 Update() 看子函数列表；②切换到按 Self time 排序，找 Self time 占比最高的子函数——那才是真正花时间的代码。如果 Update() 自身 Self time 只有 5ms，而某个子函数 Self time 有 115ms，问题在子函数不在 Update() 本身。",
    tags: ["Total time", "Self time", "排查"],
  },
  {
    id: "prof-cpu-6",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 2,
    question: "用 ProfilerMarker 而不是 BeginSample/EndSample 的好处是什么？写出 ProfilerMarker 的标准用法。",
    answer:
      "ProfilerMarker 是结构体且 static readonly 缓存——自动配对、零 GC 分配、using 语法异常安全，不用手动 EndSample。标准用法：`static readonly ProfilerMarker s_Marker = new ProfilerMarker(\"MyFunc\");` 然后在方法内 `using var _ = s_Marker.Auto();`——进入代码块时自动 Begin，离开时自动 End。",
    tags: ["ProfilerMarker", "代码标记"],
  },
  {
    id: "prof-cpu-7",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 2,
    question: "列出三种 C# 代码中常见的 GC Alloc 来源，以及各自的修复方式。",
    answer:
      "① foreach 在值类型集合上迭代 → 装箱分配。修复：改用 for 循环。② 热路径里的字符串拼接（如 Debug.Log 每帧拼日志）。修复：#if 宏包裹、生产环境关掉 Debug。③ Lambda/闭包在 Update 里捕获局部变量 → 每帧分配闭包对象。修复：改成 for 循环或把闭包提到成员变量层级。",
    tags: ["GC Alloc", "foreach", "闭包", "字符串拼接"],
  },
  {
    id: "prof-cpu-8",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 2,
    question: "Burst 编译的 Job 在 CPU Profiler 里怎么看到？为什么要看 Worker Thread 上的数据？",
    answer:
      "在 CPU Usage 里往下翻到 Main Thread 下方，展开 Worker Thread 可以看到 Burst Job 的执行名称、时长和等待关系。看 Worker Thread 数据是因为主线程可能实际上在等 Job 完成（Complete 调用）——主线程看起来不忙但帧率还是慢，瓶颈可能在 Worker Thread 上：Job 没跑完导致主线程卡等，或 Job 粒度太细导致调度开销反超计算收益。",
    tags: ["Burst", "Job System", "Worker Thread"],
  },
  {
    id: "prof-cpu-9",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 3,
    question:
      "你用 Profiler 发现 Physics 色条占了 15ms（总帧预算 16.6ms）。写出至少三种可能的原因和对应修复方案。",
    answer:
      "① Collider 数量过多或形状复杂（如大量 MeshCollider）→ 减少碰撞体数量、用简单形状（球/盒/胶囊）替代。② FixedUpdate 里写了重逻辑 → 挪到 Update 或改用 Coroutine 分帧。③ Fixed Timestep 太小（默认 0.02s = 50Hz），物理更新频率太高 → 适当调大 Fixed Timestep（如 0.03–0.05s）。④ 关节（Joint）约束数量过多 → 减少关节或简化约束链。",
    tags: ["Physics", "FixedUpdate", "排查"],
  },
  {
    id: "prof-cpu-10",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 3,
    question:
      "你在 Hierarchy 里看到一个函数的 GC Alloc 列显示 2MB，但 Self time 只有 0.3ms。这说明这个函数「不慢」吗？你接下来该做什么？",
    answer:
      "这个函数「不慢」但「很浪费」——它自身执行很快（0.3ms），但每帧分配 2MB 托管内存。这些分配积累后会导致 GC 频繁触发——GC 暂停可能每十几帧就来一次 3–5ms，导致帧率反复抖动。接下来该做：找到这个函数里具体哪行代码在分配内存（foreach 装箱、Lambda 捕获、string 拼接、new 对象等），逐行修掉这些分配源，让它 GC Alloc 归零或大幅降低。",
    tags: ["GC Alloc", "Self time", "GC 抖动"],
  },
  {
    id: "prof-cpu-11",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 3,
    question: "你用 Burst + Job System 把计算挪到多线程后，主线程 Time 确实降了，但设备发热严重。为什么？怎么修？",
    answer:
      "主线程 Time 降了是因为负载被转移到了 Worker Thread——但 CPU 总计算量不变。多核全开导致总功耗和发热上升，对移动端尤其致命。修复：①用 IJobParallelFor 的 innerloopBatchCount 控制批次粒度，减少调度开销。②根据目标平台核心数动态决定 Job 数量（SystemInfo.processorCount），移动端不要把所有核心占满。③如果 Job 结果不紧急，用 Schedule() 而非带立即 Complete()，让主线程有空闲周期。移动端降频维持稳定帧率比跑满 CPU 更重要。",
    tags: ["Burst", "功耗", "移动端"],
  },
  {
    id: "prof-cpu-12",
    chapter: "prof-cpu-profiler-deep-dive",
    level: 4,
    question:
      "你要为一款移动端游戏建立 CPU 性能分析流程。设计从「打开 Profiler」到「对比验证」的六步标准流程，每一步写出看什么、怎么看。",
    answer:
      "① 打开 Profiler → 切到 CPU Usage，跑 10 秒后暂停，找 CPU ms 最高的一帧。② 看 Main Thread Timeline 色带分布——Scripts/Physics/Rendering/Animation 的比例——确定瓶颈大类（Scripts 一半以上？Physics 最宽？）。③ 切 Hierarchy → Self time 降序排序，排名第一的函数就是热点，展开调用路径确认上级调用方。④ 看 GC Alloc 列——有没有大量分配（几百 KB 及以上）？有则记录分配源头。⑤ 改代码 + 加 ProfilerMarker 标记热点，验证修复后在同一场景+画质下重新录制。⑥ 用 Profile Analyzer 对比修复前后两份 .data 的 CPU ms 均值和 P95，确认改善稳定，必要时多次复测排除偶然波动。",
    tags: ["流程", "六步法", "综合"],
  },
];
