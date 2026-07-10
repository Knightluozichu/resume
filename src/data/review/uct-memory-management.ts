import type { ReviewQuestion } from "./types";

export const uctMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "uct-memory-management-1",
    chapter: "uct-memory-management",
    level: 1,
    question: `Unity 的托管堆和原生堆有什么区别？`,
    answer: `托管堆由 C# GC 管理，存放引用类型对象（类实例、数组），自动回收。原生堆由 Unity 引擎管理，存放 GameObject、Texture、Mesh，靠 Destroy 和 UnloadUnusedAssets 释放。GC 只管托管堆。`,
    tags: ["托管堆", "原生堆", "GC"],
  },
  {
    id: "uct-memory-management-2",
    chapter: "uct-memory-management",
    level: 2,
    question: `为什么 Instantiate/Destroy 是性能杀手？对象池怎么解决？`,
    answer: `Instantiate 在托管堆+原生堆都分配，Destroy 回收两边内存还可能触发 GC。高频调用帧率暴跌。对象池预创建一批对象循环复用——用 SetActive 切换而非 Instantiate/Destroy，GC 分配降为零，性能稳定。`,
    tags: ["对象池", "Instantiate", "Destroy"],
  },
  {
    id: "uct-memory-management-3",
    chapter: "uct-memory-management",
    level: 3,
    question: `每帧产生 GC Alloc 但找不到来源，常见隐蔽来源有哪些？`,
    answer: `常见隐蔽来源：1）foreach 在旧版 Unity 产生迭代器对象；2）字符串拼接产生新字符串；3）LINQ 查询产生中间集合；4）闭包捕获变量产生委托对象；5）装箱（int 转 object）。解决：用 for 替代 foreach，StringBuilder 替代拼接，避免热路径用 LINQ。`,
    tags: ["GC Alloc", "性能优化"],
  },
  {
    id: "uct-memory-management-4",
    chapter: "uct-memory-management",
    level: 4,
    question: `场景切换后内存不降持续增长，完整排查方案是什么？`,
    answer: `根源是内存泄漏——对象不再使用但被引用导致无法回收。排查方案：1）用 Memory Profiler 拍两个快照对比，找出只增不减的对象；2）检查静态引用和单例是否持有旧场景 GameObject；3）检查事件订阅是否在 OnDestroy 中取消（event -= handler）；4）检查闭包是否捕获 this 形成循环引用；5）检查 Coroutine 是否在对象销毁时停止。核心原则：OnDestroy 中必须清理所有外部引用。`,
    tags: ["内存泄漏", "Memory Profiler", "综合"],
  },
];
