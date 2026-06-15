/** 复习题库 · 内存管理（ugo-memory-management）。Unity Game Optimization Ch8 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "ugo-mem-1",
    chapter: "ugo-memory-management",
    level: 1,
    question: "Mono 与 IL2CPP 在编译方式和 GC 机制上的核心区别是什么？",
    answer:
      "Mono 运行时 JIT 编译 IL→机器码，GC 默认 Boehm 保守式 Stop-The-World，暂停不可预测。IL2CPP 构建时 IL→C++→平台原生 AOT 编译，GC 可选增量模式分步执行；iOS 强制 IL2CPP。",
    tags: ["Mono", "IL2CPP", "GC"],
  },
  {
    id: "ugo-mem-2",
    chapter: "ugo-memory-management",
    level: 1,
    question: "GC 三阶段（Mark·Sweep·Compact）分别做什么？",
    answer:
      "Mark 标记所有从根引用可达的存活对象；Sweep 遍历堆回收无标记（不可达）对象的内存；Compact 移动存活对象到连续空间、消除碎片。",
    tags: ["GC", "Mark", "Sweep", "Compact"],
  },
  {
    id: "ugo-mem-3",
    chapter: "ugo-memory-management",
    level: 1,
    question: "为什么 iOS 只能用 IL2CPP 而不能用 Mono？",
    answer:
      "iOS App Store 禁止 JIT（代码段不可写），Mono 的 JIT 编译直接在 iOS 上不可执行。IL2CPP 将所有代码 AOT 编译为原生机器码，符合平台限制，且性能更优。",
    tags: ["iOS", "IL2CPP", "JIT"],
  },
  {
    id: "ugo-mem-4",
    chapter: "ugo-memory-management",
    level: 2,
    question: "Update 里每帧 new List<T>() 有什么问题？如何用 Profiler 定位？",
    answer:
      "每次 new List 都是托管堆分配，更新产生的 GC.Alloc 累积触发频繁 GC.Collect → 帧时间抖动。Profiler CPU Usage → Hierarchy 搜 GC.Alloc 按帧排序，分配最多的函数即热点。换字段复用 .Clear() 或 NonAlloc API。",
    tags: ["GC.Alloc", "Profiler", "List"],
  },
  {
    id: "ugo-mem-5",
    chapter: "ugo-memory-management",
    level: 2,
    question: "对象池的三个核心操作是什么？预热解决什么问题？",
    answer:
      "Get() 从池取出激活对象、Return() 退回池禁用对象、预热一次性创建 N 个实例填充池。预热消除运行时 Instantiate 的堆分配和初始化开销——此后 Get/Return 均为 O(1) 零分配。",
    tags: ["对象池", "预热"],
  },
  {
    id: "ugo-mem-6",
    chapter: "ugo-memory-management",
    level: 2,
    question: "哪些对象应该进池？哪些不应该？举例说明。",
    answer:
      "应进池：每帧大量创建/销毁的——子弹/弹幕、粒子、敌人/NPC、UI 列表项。不应进：场景唯一主角、UI 主面板、长 BGM——生命周期与关卡等长，池化无益反增管理复杂度。",
    tags: ["对象池", "适用场景"],
  },
  {
    id: "ugo-mem-7",
    chapter: "ugo-memory-management",
    level: 2,
    question: "Texture Read/Write Enabled 与 Mesh Read/Write Enabled 对内存有何影响？",
    answer:
      "两项均在内存保留 CPU 可写副本：Texture 内存约翻倍（2 份像素数据），Mesh 内存也约翻倍（CPU + GPU 两份顶点）。纯渲染纹理/静态网格应关闭——仅运行时需要 SetPixels/改顶点时才开。",
    tags: ["Read/Write", "Texture", "Mesh"],
  },
  {
    id: "ugo-mem-8",
    chapter: "ugo-memory-management",
    level: 2,
    question: "Generate Mip Maps 什么时候该开、什么时候该关？为什么？",
    answer:
      "3D 场景漫反射/天空盒等应开启——远处物体采样低级 mipmap，减少闪烁和显存带宽。UI、Sprite Atlas、屏幕空间固定大小的图应关闭——无需多级，额外约 33% 内存浪费。",
    tags: ["mipmap", "Texture"],
  },
  {
    id: "ugo-mem-9",
    chapter: "ugo-memory-management",
    level: 3,
    question: "切关后纹理内存翻倍，可能的原因与排查步骤？",
    answer:
      "① Read/Write Enabled 保留了 CPU 副本 ② AssetBundle 未 Unload 或 Addressables 未 Release ③ 静态引用或事件未注销拽着旧场景对象。排查：Memory Profiler 快照对比 → 搜 Texture2D 条目查引用链 → 检查导入设置和卸载逻辑 → 逐一排除。",
    tags: ["内存泄漏", "排查", "Texture"],
  },
  {
    id: "ugo-mem-10",
    chapter: "ugo-memory-management",
    level: 3,
    question: "Memory Profiler 快照对比发现 Objects not destroyed 持续增长，但代码都调了 Destroy——常见元凶是什么？",
    answer:
      "① static 事件 += 未在 OnDestroy 中 -=，发布者拽着订阅者 ② Singleton 实例引用了已销毁场景对象 ③ DontDestroyOnLoad 每切关重复添加。修法：OnDestroy/OnDisable 做 -= 清理；单例访问时判空重置引用；DontDestroyOnLoad 配合去重。",
    tags: ["内存泄漏", "静态引用", "事件"],
  },
  {
    id: "ugo-mem-11",
    chapter: "ugo-memory-management",
    level: 3,
    question: "Unity 2021+ 内置的 UnityEngine.Pool.ObjectPool<T> 与手写队列池有何优劣？",
    answer:
      "内置池集成 Get/Release 与自动扩容缩容、线程安全选项、泛型约束少。优点：无需手写、API 一致、与 Unity 分析工具联动好。缺点：灵活性不如手写（如自定义 Reset 逻辑需额外封装）。推荐默认优先使用内置池。",
    tags: ["ObjectPool", "Unity 2021"],
  },
  {
    id: "ugo-mem-12",
    chapter: "ugo-memory-management",
    level: 2,
    question: "RaycastNonAlloc 相比 RaycastAll 在内存上有什么本质区别？",
    answer:
      "RaycastAll 每次返回 new RaycastHit[]（托管堆分配），每帧调用产生 GC.Alloc。RaycastNonAlloc 写入预分配的传入数组，零托管分配——配合成员字段缓存数组可完全消除 GC 压力。",
    tags: ["NonAlloc", "Physics", "GC"],
  },
];
