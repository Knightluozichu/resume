/** 复习题库 · Memory Profiler 内存分析（prof-memory-profiler）。Unity 官方 Profiling 指南 Ch4 改编。 */

import type { ReviewQuestion } from "./types";

export const profMemoryProfilerQuestions: ReviewQuestion[] = [
  {
    id: "prof-mem-1",
    chapter: "prof-memory-profiler",
    level: 1,
    question: "Memory Profiler 的 Take Sample 功能是做什么的？单次 Take Sample 足够排查内存问题吗？",
    answer:
      "Take Sample 抓取当前帧的完整内存快照（所有对象引用关系与内存占用）。单次 Take Sample 只能看到「当前用了多少内存」——一个绝对数值不够判断是不是越用越多。排查内存问题必须至少抓两份快照（操作前后各一份），对比差异才能看到净增长。前后对比才是 Memory Profiler 的灵魂。",
    tags: ["Take Sample", "快照", "对比"],
  },
  {
    id: "prof-mem-2",
    chapter: "prof-memory-profiler",
    level: 1,
    question: "Managed Heap 和 Native Memory 的区别是什么？GC 管哪一个？",
    answer:
      "Managed Heap = C# 运行时（Mono/IL2CPP）分配的托管内存——所有 C# 的 class、array、string、delegate 等对象驻留在此，由 GC 自动管理生命周期。Native Memory = Unity C++ 底层、第三方库和 GPU 驱动分配的非托管内存——纹理像素数据、网格顶点缓冲区、音频解码数据等大块数据在此。GC 只管 Managed Heap，不管 Native Memory——Native 内存必须手动释放。",
    tags: ["Managed Heap", "Native Memory", "GC"],
  },
  {
    id: "prof-mem-3",
    chapter: "prof-memory-profiler",
    level: 1,
    question: "游戏项目里 Memory Profiler 中排名前三的内存分类通常是什么？各举例说明为什么会很大。",
    answer:
      "①**纹理（Textures）**：2048×2048 RGBA 纹理 ≈ 16MB（加 Mipmap ≈ 21MB），场景同时加载 20 张就接近 400MB。②**网格（Meshes）**：高面数模型顶点数据 + LOD 多个等级各占一份独立网格。③**音频（Audio）**：Decompress On Load 加载模式把整段 5 分钟 BGM 解码为 PCM 数据全量加载（可达 30–50MB）。三者相加通常占总内存 70%–90%。",
    tags: ["纹理", "网格", "音频", "内存大户"],
  },
  {
    id: "prof-mem-4",
    chapter: "prof-memory-profiler",
    level: 1,
    question: "为什么说内存问题是移动端的头号杀手？和 CPU/GPU 问题相比有什么不同？",
    answer:
      "CPU 慢可以降帧（还能玩），GPU 慢可以降画质（还能玩）——但内存一旦超了，系统会直接杀掉你的应用（闪退）。移动设备有硬性的物理内存上限（低端机可能只有 2GB 可用），而且系统会根据当前可用内存动态决定是否杀进程——你的游戏开发者控制不了这个阈值。因此内存管理在移动端比 CPU/GPU 优化优先级更高。",
    tags: ["移动端", "内存超限", "闪退"],
  },
  {
    id: "prof-mem-5",
    chapter: "prof-memory-profiler",
    level: 2,
    question: "`m_Texture = null` 和 `Resources.UnloadAsset(m_Texture)` 有什么区别？为什么只写前者可能导致内存不降？",
    answer:
      "`m_Texture = null` 只把 C# 代码里的托管引用设为空——GC 以后会回收那个托管包装对象（可能只有几十字节在 Managed Heap）。但纹理的实际像素数据（16MB 甚至更多）存在 Native 内存里，GC 管不到它。不调用 `Resources.UnloadAsset()` 或其他显式释放，Native 内存里的像素数据就永远留在那。Memory Profiler 表现：Managed 降了，Native 纹丝不动。",
    tags: ["UnloadAsset", "Native Memory", "null"],
  },
  {
    id: "prof-mem-6",
    chapter: "prof-memory-profiler",
    level: 2,
    question: "内存泄漏有哪三种常见模式？每种在 Memory Profiler 里的表现是什么？",
    answer:
      "①**托管泄漏（Managed Leak）**：GC 根引用没断（如静态变量或单例持有对象不放）。表现：重复操作后 Managed Heap 大小持续增长，Detailed 视图里某个类的实例数只增不减。②**Native 资源泄漏**：资源加载后未卸载（如场景切换后纹理/网格没降）。表现：Native 内存只涨不跌，Managed 没变化。③**碎片化**：分配频繁——总量不大但 GC Alloc 频率高，内存空洞多导致无法分配大块连续空间。表现：Managed Heap 总大小不大，但 GC 触发频繁。",
    tags: ["内存泄漏", "三种模式", "诊断"],
  },
  {
    id: "prof-mem-7",
    chapter: "prof-memory-profiler",
    level: 2,
    question: "Addressables.Release() 比手写 Resources.UnloadAsset() 有什么优势？",
    answer:
      "Addressables 内部维护引用计数器：Load 一次计数 +1，Release 一次计数 -1，归零时自动释放底层资源。优势：①多地方引用同一资源时，手写 UnloadAsset 容易提前释放导致其他地方拿到空引用——Addressables 的计数机制天然避免。②不用担心忘记释放——每个 Load 都有对应的 Release 调用对称性。③可以用 Addressables Event Viewer 实时追踪所有资源的引用计数变化，排查泄漏更方便。",
    tags: ["Addressables", "Release", "引用计数"],
  },
  {
    id: "prof-mem-8",
    chapter: "prof-memory-profiler",
    level: 2,
    question: "纹理 Import Settings 里 Max Size 设了 512，但 Memory Profiler 显示内存还是用了 2048 级别。可能的原因有哪些？",
    answer:
      "①源图本来是 2048，但 Quality 设置覆盖了 Max Size——到 Player Settings → 对应平台的 Texture Import Override 里可能强制用了 Full Res。②部分平台的纹理导入设置会用平台默认值覆盖 Inspector 里的值——检查 Build Settings → Player Settings → Resolution and Presentation → Texture Import 相关设置。③Max Size 是「下采样到不大于该值」——如果源图已经是 2048 但 Max Size 是 512，确实应该生效。在 Memory Profiler 里点开该纹理看加载到显存的实际尺寸确认。",
    tags: ["Max Size", "纹理", "导入设置"],
  },
  {
    id: "prof-mem-9",
    chapter: "prof-memory-profiler",
    level: 3,
    question:
      "反复开闭 UI 面板 10 轮后对比快照——Managed Heap 只涨了 3MB，Native 纹理内存涨了 80MB。这是什么泄漏？写出修复步骤。",
    answer:
      "典型 Native 资源泄漏——UI 面板加载了纹理但关闭时没释放。修复步骤：①打开 Memory Profiler → 展开 Textures 分类 → 找到在 After 快照里出现但 Baseline 里没有的纹理名（净增长的纹理）。②在代码中搜索这些纹理的加载调用（Resources.Load / Addressables.LoadAssetAsync）。③找到面板的关闭/销毁代码——确认是否有对应的 Resources.UnloadAsset() 或 Addressables.Release()。④加上释放逻辑后重新跑一次①②③——确认净增长归零。",
    tags: ["Native 泄漏", "UI", "修复"],
  },
  {
    id: "prof-mem-10",
    chapter: "prof-memory-profiler",
    level: 3,
    question:
      "你调了 Resources.UnloadUnusedAssets()，但 Memory Profiler 显示 Native 内存还是没降。可能的原因是什么？怎么修？",
    answer:
      "可能的原因：`UnloadUnusedAssets()` 只清理「没有任何引用」的资源——如果某个全局单例或 DontDestroyOnLoad 的 GameObject 上还挂着对纹理/材质的引用，这些资源就有了「活引用」，不会被清理。修复：①先用 Memory Profiler 的 Detailed 视图找到持有该资源引用的对象；②显式调用 Destroy() 或把引用设为 null 来断引用；③然后再调用 Resources.UnloadUnusedAssets()。或者改用 Addressables Release 的引用计数机制，能直接看到还有什么地方在持有该资源。",
    tags: ["UnloadUnusedAssets", "引用未断", "清理失败"],
  },
  {
    id: "prof-mem-11",
    chapter: "prof-memory-profiler",
    level: 4,
    question:
      "你的移动端游戏 Memory Profiler 显示虚拟内存正常，但过一段时间后系统还是杀了你的进程。Explain why and what you should check.",
    answer:
      "Memory Profiler 显示的是 Unity 进程的**虚拟内存**（VSIZE），而系统杀进程依据的是**物理内存压力**（PSS/RSS）。可能的原因：①内存碎片化严重——虚拟内存总量不大，但碎片导致物理页面占用高。②GPU 驱动分配的内存不属于 Unity Profiler 统计范围——移动端 GPU 驱动的纹理缓存可能额外占几百 MB。③后台驻留的其他进程也在抢内存，系统看整体物理内存压力决定杀谁。④某些平台的音视频解码器、网络库等原生库分配的内存不是 Unity 能追踪到的。检查方法：Android 用 `adb shell dumpsys meminfo <包名>` 看 PSS Total；iOS 用 Xcode Memory Gauge 或 Instruments Allocations 看真机物理内存。这些平台原生的内存指标才是系统考虑的，Unity Profiler 只覆盖 Unity 进程内自己能追踪的部分。",
    tags: ["PSS", "物理内存", "系统杀进程", "综合"],
  },
  {
    id: "prof-mem-12",
    chapter: "prof-memory-profiler",
    level: 4,
    question:
      "设计一套完整的移动端游戏内存管理策略：从资源导入规范、加载卸载机制、到持续监控方案。每部分写出 2–3 条具体措施。",
    answer:
      "**资源导入规范**：①所有纹理默认用 ASTC 4×4 或 ETC2 压缩（移动端不支持 DXT/BC）；Max Size 按实际需求设定——UI 1024、环境 1024、角色 2048 顶天。②音频：长音频（BGM、环境音）设为 Streaming 而非 Decompress On Load；短音效设为 Compressed In Memory。③网格：非必需不开启 Read/Write Enabled（会额外存一份 CPU 端副本）。**加载卸载机制**：①用 Addressables 替代 Resources.Load，利用引用计数机制。②场景切换时显式调用 Addressables.Release 或 UnloadUnusedAssets 清理上一场景资源。③避免 DontDestroyOnLoad 持有大量引用——每个跨场景对象加资源审计注释。**持续监控**：①CI 中每次构建后自动化跑固定场景，Take Sample 三次（加载后/运行中/卸载后），对比内存指标。②设置内存预警阈值——在目标低端机上 Native 内存超过 300MB 时自动加红色告警标记。③每周用 Profile Analyzer 导出一份内存趋势报告（Managed + Native 各分类曲线），发现缓慢增长早介入。",
    tags: ["内存管理策略", "规范", "监控", "综合"],
  },
];
