import type { ReviewQuestion } from "./types";

export const ummOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "umm-optimization-1",
    chapter: "umm-optimization",
    level: 2,
    question: `对象池在 MMO 中主要用在哪些地方？为什么不能用 Instantiate/Destroy？`,
    answer:
      `对象池主要用于频繁创建销毁的对象：子弹/弹道、受击特效、伤害数字、怪物刷新、UI 列表项。Instantiate/Destroy 的问题：① 触发 GC（C# 层回收）和内存碎片；② Instantiate 是同步操作，大量实例化会卡帧；③ 频繁分配内存引发 GC Spike（帧率骤降）。对象池预分配一批对象，用完放回池中复用，避免运行时分配和 GC，保证帧率稳定。`,
    tags: ["对象池", "GC", "性能优化"],
  },
  {
    id: "umm-optimization-2",
    chapter: "umm-optimization",
    level: 3,
    question: `Unity SRP Batcher 如何减少 Draw Call？它的限制是什么？`,
    answer:
      `SRP Batcher 把使用相同 Shader 的材质分组，在 GPU 端批量提交，减少 CPU 端的 SetPassCall（材质切换）开销。不像 Dynamic Batching 那样合并网格，而是让 GPU 在不切换 Shader 程序的情况下连续绘制多个对象。限制：① 必须使用 SRP（URP/HDRP），不支持内置管线；② 材质必须使用同一个 Shader（不同 Shader 不能合批）；③ 材质属性必须走 CBUFFER（ConstantBuffer），不能用 Shader.SetGlobal。`,
    tags: ["Draw Call", "SRP Batcher", "渲染优化"],
  },
  {
    id: "umm-optimization-3",
    chapter: "umm-optimization",
    level: 2,
    question: `网络带宽优化中「位置量化」是什么？为什么 MMO 要用它？`,
    answer:
      `位置量化是把 float 坐标（4 字节 x 3 = 12 字节）压缩为定点数或短整型。比如世界大小 4096x4096，精度 0.1 米，则坐标可用 16 位整数（0-65535）表示，3 个轴只需 6 字节，节省 50%。大量角色位置同步时，每条消息省 6 字节，万人同服每秒百万条消息，总带宽节省显著。代价是精度损失（0.1 米级别），但对视觉表现几乎无影响。`,
    tags: ["带宽优化", "位置量化", "压缩"],
  },
  {
    id: "umm-optimization-4",
    chapter: "umm-optimization",
    level: 1,
    question: `如何用 Unity Profiler 定位 MMO 客户端的性能瓶颈？应该关注哪些指标？`,
    answer:
      `用 Profiler 的 CPU Usage 模块定位帧耗时：关注主线程的 GC.Alloc（内存分配）、Camera.Render（渲染）、Physics.Simulate（物理）、Scripts（逻辑代码）各占比。如果 GC.Alloc 高，查对象池和字符串拼接；如果 Render 高，查 Draw Call 数量和 Overdraw；如果 Scripts 高，用 Deep Profile 定位具体函数。移动端额外关注 Memory 模块的纹理内存和 AssetBundle 引用。原则：先量化再优化，不要凭猜测。`,
    tags: ["Profiler", "性能分析", "优化"],
  },
];
