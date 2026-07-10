import type { ReviewQuestion } from "./types";

/** CLR via C# · 学习地图复习题 */
export const cvcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cvc-learning-map-1",
    chapter: "cvc-learning-map",
    level: 1,
    question: `CLR 的全称是什么？它在 .NET 中扮演什么角色？`,
    answer:
      `CLR 全称是 Common Language Runtime（公共语言运行时）。它是 .NET 的运行时引擎，核心职责包括：\n\n1. 将 IL（中间语言）通过 JIT 编译器编译为本地机器码\n2. 管理内存——自动分配和回收对象（GC）\n3. 处理异常——异常的抛出、传播和捕获机制\n4. 调度线程——线程池管理、同步原语\n5. 强制类型安全——确保类型操作不会越界或损坏内存\n6. 安全检查——代码访问安全、验证\n\n可以把 CLR 理解为 C# 代码与操作系统之间的「翻译官和管理者」——你写的代码是指令，CLR 负责安全高效地执行这些指令。`,
    tags: ["CLR", "运行时", "JIT", "GC"],
  },
  {
    id: "cvc-learning-map-2",
    chapter: "cvc-learning-map",
    level: 2,
    question: `本书四大板块的顺序是什么？为什么按这个顺序学习？`,
    answer:
      `四大板块的顺序是：CLR 基础 → 类型设计 → 内存 GC → 高级 CLR。\n\n按这个顺序学习的原因是建立了分层因果链：\n\n1. CLR 基础（执行模型）是地基——解释代码如何从源码变成运行中的对象，IL 编译和程序集加载是一切的前提。\n2. 类型设计建立在地基之上——类型的元数据由 CLR 加载，对象布局由 CLR 决定，方法分派由虚方法表实现。\n3. 内存 GC 依赖类型系统——GC 的分代回收策略依赖于对象引用图的遍历，而引用关系由类型系统定义。\n4. 高级 CLR（异步、反射）是前三个板块的综合应用——async/await 依赖线程池和内存分配，反射操作类型元数据。\n\n跳过任何一层，上层知识就会悬空——不理解类型系统就无法理解 GC，不理解 GC 就无法理解异步的内存开销。`,
    tags: ["学习路径", "四大板块", "因果链"],
  },
  {
    id: "cvc-learning-map-3",
    chapter: "cvc-learning-map",
    level: 3,
    question: `C# 源码到最终被 CPU 执行，经历了哪些阶段？每阶段的产物是什么？`,
    answer:
      `C# 源码到 CPU 执行经历三个阶段：\n\n1. **编译期（C# 编译器 csc）**：\n   - 输入：\`.cs\` 源文件\n   - 产物：\`.dll\` 或 \`.exe\` 程序集，内含 IL（中间语言）+ 元数据\n   - IL 是平台无关的指令集，不针对任何特定 CPU\n\n2. **加载期（CLR 程序集加载器）**：\n   - 运行时按需加载程序集\n   - 读取元数据，构建类型对象（Type 对象），为类型分配内存\n   - 产物：内存中的类型对象、方法表\n\n3. **执行期（JIT 编译器）**：\n   - 方法首次被调用时，JIT 将该方法的 IL 编译为当前平台的机器码\n   - 产物：本地机器码，缓存在内存中供后续调用使用\n   - 第二次调用同一方法时直接使用缓存的机器码，无需重新编译\n\n关键点：JIT 是按需的、一次性的。不是整个程序一次性编译，而是方法级别的懒编译。`,
    tags: ["编译流程", "IL", "JIT", "程序集"],
  },
  {
    id: "cvc-learning-map-4",
    chapter: "cvc-learning-map",
    level: 4,
    question: `为什么说「不学 CLR 也能写 C#，但学了 CLR 才能写好 C#」？请从三个具体场景说明。`,
    answer:
      `不学 CLR 可以写出能跑的代码，但在性能和正确性上会踩坑。三个具体场景：\n\n1. **值类型装箱场景**：\n   不理解 CLR 的值类型/引用类型差异，会在热路径上意外触发装箱。例如 \`List<int>\` 用 \`foreach\` 遍历不会装箱，但如果把 \`int\` 放进 \`ArrayList\`（非泛型），每次存取都装箱——产生大量临时对象，增加 GC 压力。理解 CLR 才知道为什么泛型对性能如此重要。\n\n2. **GC 大对象堆场景**：\n   不理解 CLR 的 GC 分代机制，会在循环中拼接大字符串。\`string\` 是不可变的，\`s += chunk\` 每次都创建新对象。如果结果超过 85000 字节，对象直接分配在大对象堆（LOH），LOH 不压缩、Full GC 才回收——导致内存碎片和停顿。理解 CLR 才知道用 \`StringBuilder\`。\n\n3. **async 死锁场景**：\n   不理解 CLR 的异步状态机和同步上下文，会在 \`async\` 方法中调用 \`.Result\` 或 \`.Wait()\`。在 UI 线程或 ASP.NET 旧版中，这会导致死锁——async 方法试图回到原线程，而原线程被 \`.Wait()\` 阻塞。理解 CLR 才知道为什么 \`async\` 方法应该「一路 async 到底」。\n\n总结：CLR 知识将「能跑」提升到「跑得高效且正确」。`,
    tags: ["装箱", "GC", "async死锁", "性能"],
  },
];
