import type { ReviewQuestion } from "./types";

export const uapMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "uap-memory-management-1",
    chapter: "uap-memory-management",
    level: 1,
    question: `Unity 的托管堆和原生堆有什么区别？各自怎么回收？`,
    answer: `托管堆是 C# 运行时管理的堆内存，由 Mono/IL2CPP 的 GC 自动回收——堆越大 GC 暂停越久。原生堆是 Unity 引擎分配的原生内存（纹理、网格、音频等资源），不受 GC 管理，需手动释放（Resources.UnloadUnusedAssets、Destroy）。GC 只管托管堆，不管原生堆；资源泄漏要靠手动卸载。`,
    tags: ["托管堆", "原生堆", "GC"],
  },
  {
    id: "uap-memory-management-2",
    chapter: "uap-memory-management",
    level: 2,
    question: `为什么 GC 会导致帧率暴跌？如何彻底避免？`,
    answer: `Unity 默认用「标记-压缩」GC：暂停主线程 → 遍历引用链标记可达对象 → 压缩堆。堆越大暂停越久，100MB 堆一次 GC 可能暂停 30-50ms 直接掉帧。彻底避免靠零 GC 运行：对象池复用（Get/Release 替代 Instantiate/Destroy）、struct 替代 class（栈分配不进堆）、List 预设 Capacity 并复用（避免扩容垃圾）、避免闭包捕获（lambda 生成隐藏类）。目标每帧 GC Alloc = 0B。`,
    tags: ["GC", "帧率", "零GC"],
  },
  {
    id: "uap-memory-management-3",
    chapter: "uap-memory-management",
    level: 3,
    question: `foreach 遍历 List 在旧版和新版 Mono 下分别会产生 GC 吗？为什么？`,
    answer: `旧版 Mono 的 \`List.GetEnumerator()\` 返回 \`IEnumerator<T>\` 接口（引用类型），装箱产生垃圾。新版 Mono/IL2CPP 下，foreach 直接用 \`List<T>.Enumerator\`（struct 值类型），不装箱、不产生 GC。但注意：如果把 List 当 \`IEnumerable<T>\` 传递（如传给接受 IEnumerable 的方法），仍会装箱。结论：直接 foreach List 无 GC，但避免把 List 当 IEnumerable 传递。`,
    tags: ["foreach", "装箱", "GC Alloc"],
  },
  {
    id: "uap-memory-management-4",
    chapter: "uap-memory-management",
    level: 4,
    question: `项目玩久了内存持续增长，如何系统性排查内存泄漏？`,
    answer: `1）用 Profiler Memory 模块拍两次快照（如进场景前和退出后），对比找到只增不减的对象；2）最常见泄漏是事件未取消订阅——检查 OnDisable/OnDestroy 是否有 \`-= \` 取消所有事件；3）静态集合只加不删——审查所有 static List/Dict 是否有清理逻辑；4）Object.Destroy 未释放引用——检查 Destroy 后是否还有变量持有引用；5）Resources.Load 未 Unload——检查资源是否走 Addressables.Release 或 Resources.UnloadUnusedAssets。修法：事件必须配对订阅/取消订阅，静态集合定期清理，资源用引用计数或 Addressables 管理。`,
    tags: ["内存泄漏", "Profiler", "综合"],
  },
];
