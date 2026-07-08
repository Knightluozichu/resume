import type { ReviewQuestion } from "./types";

/** 性能优化实践 复习题 */
export const usgOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "usg-optimization-1",
    chapter: "usg-optimization",
    level: 1,
    question: "Unity 性能优化的三个维度是什么？各有什么常见手段？",
    answer: "CPU 脚本优化：缓存 GetComponent 引用、对象池复用、避免每帧 Find、字符串拼接用 StringBuilder、LINQ 转手动循环。GPU 渲染优化：批处理（静态/动态）、GPU Instancing、LOD 分级、遮挡剔除、纹理压缩/图集。内存优化：Resources.UnloadUnusedAssets、AssetBundle/Addressables 按需加载、对象池减少实例化、结构体代替小类、避免事件未取消订阅的内存泄漏。核心原则：先用 Profiler 测量再针对瓶颈优化。",
    tags: ["CPU", "GPU", "内存", "优化维度"],
  },
  {
    id: "usg-optimization-2",
    chapter: "usg-optimization",
    level: 2,
    question: "对象池解决什么问题？为什么 Update 中拼接字符串会导致卡顿？",
    answer: "对象池解决频繁 Instantiate/Destroy 的性能问题——Instantiate 分配内存、初始化组件，Destroy 释放资源并可能触发 GC，频繁操作造成卡顿。对象池预创建并复用对象避免这些开销。字符串拼接卡顿原因：`\"Score: \" + score` 每次执行创建新 string 对象（string 不可变），产生堆分配，累积触发 GC 卡顿。正确做法：用复用的 StringBuilder 的 `Append()` 拼接，`Clear()` 后重用，零堆分配。用 Profiler 的 GC Alloc 列定位每帧分配。",
    tags: ["对象池", "GC", "字符串拼接", "StringBuilder"],
  },
  {
    id: "usg-optimization-3",
    chapter: "usg-optimization",
    level: 3,
    question: "如何用 Profiler 系统定位一个掉帧游戏的瓶颈？",
    answer: "1)打开 Profiler，录制掉帧片段的几秒钟。2)查看 CPU Usage 面板——找到最耗时的函数（按 GC Alloc 和 ms 排序），定位是脚本逻辑、物理还是渲染。3)查看 Memory 面板——看 GC Alloc 列是否有每帧分配，定位堆分配源头。4)查看 Rendering 面板——看 Draw Call 数、三角形数、SetPass 数，判断是否渲染瓶颈。5)用 Frame Debugger 逐步检查 Draw Call 是否可合并（批处理/Instancing）。6)针对性优化最大瓶颈，改完再录一次 Profiler 验证效果。原则：先测后优、80% 问题来自 20% 代码。",
    tags: ["Profiler", "性能分析", "瓶颈定位"],
  },
  {
    id: "usg-optimization-4",
    chapter: "usg-optimization",
    level: 4,
    question: "一个射击游戏每秒发射 20 发子弹、击中后产生爆炸特效，目前帧率不稳。请给出系统优化方案。",
    answer: "1)子弹用对象池——预创建 50 发，Get/Return 复用，避免每秒 20 次 Instantiate/Destroy。2)爆炸特效同样对象池化——粒子系统复用而非新建。3)Awake 缓存子弹的 Rigidbody/Collider 引用，避免每帧 GetComponent。4)子弹 Update 中避免字符串拼接和 LINQ，用 StringBuilder 或直接赋值。5)子弹和特效用 GPU Instancing 或批处理减少 Draw Call（相同材质）。6)远处子弹用 LOD 降低精度。7)碰撞检测用 Layer 隔离，只检测子弹与敌人层。8)用 Profiler 验证：录制后看 CPU Usage 是否还有 Instantiate 峰值、GC Alloc 是否归零、Draw Call 是否下降。迭代直到帧率稳定 60fps。",
    tags: ["对象池", "GPU Instancing", "Profiler", "综合优化"],
  },
];
