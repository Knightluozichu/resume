/** 复习题库 · DOTS 数据导向技术栈（ugo-data-oriented-technology-stack）。Unity Game Optimization Ch9 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoDataOrientedTechnologyStackQuestions: ReviewQuestion[] = [
  {
    id: "ugo-dots-1",
    chapter: "ugo-data-oriented-technology-stack",
    level: 1,
    question: "什么是数据竞争（Data Race）？为什么它是多线程编程的根本难题？",
    answer:
      "数据竞争指两个或多个线程同时读写同一变量且至少一个为写操作，最终结果取决于不可控的线程执行顺序。根本原因在于 `x++` 等看似原子的操作在 CPU 层面是「读取→加1→写回」三步，中间可被其它线程插入。",
    tags: ["数据竞争", "多线程"],
  },
  {
    id: "ugo-dots-2",
    chapter: "ugo-data-oriented-technology-stack",
    level: 1,
    question: "锁解决了什么问题？又引入了什么新问题？Unity 主线程瓶颈与这两者有什么关系？",
    answer:
      "锁通过互斥确保同一时刻只有一个线程进入临界区，消除数据竞争。代价是线程等待—上下文切换—CPU 空转，高频加锁≈单线程。Unity 主线程瓶颈本质上是这场困境的系统级体现——GameObject API 不是线程安全的，所有更新渲染物理动画全挤在主线程做。",
    tags: ["锁", "主线程瓶颈", "GameObject"],
  },
  {
    id: "ugo-dots-3",
    chapter: "ugo-data-oriented-technology-stack",
    level: 1,
    question: "IJob 与 IJobParallelFor 的核心区别是什么？分别适用什么场景？",
    answer:
      "IJob 在线程池中单次执行 Execute()，适合一次性计算任务（如生成随机数据）。IJobParallelFor 接受一个 NativeArray，自动将索引切片分发给多 Worker 并行执行 Execute(int index)，适合数组逐元素独立计算的批量任务（如移动位置、算伤害）。IJobParallelFor 是 Job System 的杀手锏——数据天然不相交=无锁并行。",
    tags: ["IJob", "IJobParallelFor", "Job System"],
  },
  {
    id: "ugo-dots-4",
    chapter: "ugo-data-oriented-technology-stack",
    level: 1,
    question: "ECS 里的 Entity、Component、System 分别是什么？各举一个代码级例子。",
    answer:
      "Entity：只是一个 int ID，不含任何数据或方法，等同于数据库行号。Component：用 IComponentData 标记的非托管结构体，如 `struct Translation : IComponentData { public float3 Value; }`，只含 blittable 字段。System：纯函数逻辑，无状态，如 `partial struct EnemyMoveSystem : ISystem` 中用 `SystemAPI.Query<RefRW<Translation>, RefRO<MoveSpeed>>` 只处理满足条件的 Entity。",
    tags: ["Entity", "Component", "System", "ECS"],
  },
  {
    id: "ugo-dots-5",
    chapter: "ugo-data-oriented-technology-stack",
    level: 1,
    question: "ECS 为什么天然适合多核并行？从数据布局角度解释。",
    answer:
      "因为 ECS 的 Component 是纯数据结构体（无引用/无虚方法/无依赖），所有 Translation 在内存中连续排布——CPU Cache 命中率极高。System 只遍历这些连续数组、不跨 Component 引用；Job System 可以把索引切片安全地分给不同 Worker 并行执行。数据布局本身决定了性能上限——ECS 是 Cache-Friendly 的。",
    tags: ["ECS", "并行", "数据布局"],
  },
  {
    id: "ugo-dots-6",
    chapter: "ugo-data-oriented-technology-stack",
    level: 2,
    question: "Burst Compiler 做了什么？为什么加一个 [BurstCompile] 标签就能让同一段 C# 快 10–100 倍？",
    answer:
      "Burst 不是新语言而是另一个编译器后端——它把 C# IL 先转成 LLVM IR，再用 LLVM 优化管线（自动 SIMD 向量化、循环展开、常量折叠、函数内联）生成高度优化的机器码。Mono/IL2CPP 无法做这类深层次优化。对 float3 加法：Burst 生成单条 addps（一次加4个float），普通 JIT/AOT 则逐字段循环。",
    tags: ["Burst", "LLVM", "SIMD"],
  },
  {
    id: "ugo-dots-7",
    chapter: "ugo-data-oriented-technology-stack",
    level: 2,
    question: "加了 [BurstCompile] 但性能没提升——最可能的两个原因？",
    answer:
      "① struct 内含引用类型（string/class/NativeArray 非正确用法），Burst 静默退化为非 Burst 执行，Profiler 中标「Not Bursted」。② 根本没用 IJob/IJobParallelFor/ISystem——[BurstCompile] 只能标记在这些接口实现上。排查：Burst Inspector（Jobs → Burst → Open Inspector）看是否编译成功；确保所有字段 blittable。",
    tags: ["Burst", "调试", "blittable"],
  },
  {
    id: "ugo-dots-8",
    chapter: "ugo-data-oriented-technology-stack",
    level: 2,
    question: "NativeContainer 是什么？为什么需要 Dispose？忘记 Dispose 会怎样？",
    answer:
      "NativeContainer 是非托管数据容器（NativeArray/List/HashMap），分配在非托管内存上绕过 GC。必须 Dispose 手动释放非托管内存——忘记 Dispose = 本机内存泄漏（GC 不管非托管内存）。Safety System 检测到 Job 未 Complete 时 Dispose 会直接报错（阻止释放正在使用的数据）。",
    tags: ["NativeContainer", "Dispose", "内存泄漏"],
  },
  {
    id: "ugo-dots-9",
    chapter: "ugo-data-oriented-technology-stack",
    level: 2,
    question: "Safety System 怎么保护你避免数据竞争？",
    answer:
      "编译期 + 运行时双重检查：同一 NativeContainer 同一时刻不能有两个 Job 同时写入；如果你在 Job 未 Complete 时就尝试读取结果——立即抛出 InvalidOperationException（而非静默返回脏数据）。NativeArray 标注 [ReadOnly] 允许并行读取、禁止任何写入。",
    tags: ["Safety System", "NativeContainer"],
  },
  {
    id: "ugo-dots-10",
    chapter: "ugo-data-oriented-technology-stack",
    level: 3,
    question: "你想把项目中的 AI 寻路系统加速——第一步应该做什么？拆 Component、写 System、加 Burst 的顺序是否正确？为什么？",
    answer:
      "必须先拆 Component——把寻路数据从 MonoBehaviour 里拆成 blittable 结构体（如 PathPosition、PathNode），因为 Burst 和 Job 都要求纯数据。步骤：①拆数据→②写 ISystem 替代 Update 逻辑→③加 [BurstCompile]。如果先加 Burst 再拆数据——数据里有引用类型就编译失败；先写 System 再拆数据——System 无数据可操作。顺序是刚性的。",
    tags: ["迁移", "ECS", "Burst", "顺序"],
  },
  {
    id: "ugo-dots-11",
    chapter: "ugo-data-oriented-technology-stack",
    level: 3,
    question: "ECS 的 System 执行顺序由什么决定？如果两个 System 有数据依赖，不声明顺序会怎样？",
    answer:
      "ECS System 执行顺序由 [UpdateInGroup]/[UpdateBefore]/[UpdateAfter] 属性控制——不是 MonoBehaviour 的「脚本排在前面就先执行」。如果有数据依赖但未声明顺序 = 数据依赖崩溃（后一步读到旧数据或被跳过的计算结果）。修法：用 [UpdateAfter(typeof(PreviousSystem))] 显式声明；Entity Debugger 查看 System 执行顺序图。",
    tags: ["System", "执行顺序", "依赖"],
  },
  {
    id: "ugo-dots-12",
    chapter: "ugo-data-oriented-technology-stack",
    level: 3,
    question: "从 GameObject 迁到 ECS，能否一步全量替换？推荐策略是什么？",
    answer:
      "不建议一步全量。推荐渐进策略：① Profiler 找最耗 CPU 的热点 System ② 把该 System 的数据拆成 IComponentData ③ 写 ISystem 替换对应 Update 逻辑 ④ 加 [BurstCompile] ⑤ 混合运行验证（GameObject 与 Entity 可共存）。逐系统替换、每章一个 System、新旧并行——不是全盘重写。",
    tags: ["迁移", "GameObject", "ECS", "策略"],
  },
];
