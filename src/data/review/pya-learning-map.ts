import type { ReviewQuestion } from "./types";

/** Python高级编程全书学习地图 复习题 */
export const pyaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pya-learning-map-1",
    chapter: "pya-learning-map",
    level: 1,
    question: "全书分为哪四大板块？各板块包含哪些章节？",
    answer:
      "四大板块：\n\n1. Python高级基础（2章）：学习地图、Python内部机制\n2. 高级语法（2章）：迭代器与生成器、装饰器与元类\n3. 并发编程（3章）：asyncio、multiprocessing、Cython\n4. 工程实践（3章）：测试、打包、总复习\n\n记忆线索：基础内省 → 高级语法 → 并发编程 → 工程落地。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "pya-learning-map-2",
    chapter: "pya-learning-map",
    level: 2,
    question: "为什么全书把「对象模型与内省」放在第一章，而不是直接学 asyncio？",
    answer:
      "因为存在严格的依赖链：\n\n1. asyncio 的协程本质上是生成器的进化版，事件循环依赖迭代器协议（`__await__` / `__iter__`）。\n2. 装饰器是「接收函数返回函数」的高阶函数，不理解函数也是对象（一等公民），就看不懂装饰器。\n3. 元类操作的是类型对象，不理解 `type` 既是类也是元类，就无法理解元类。\n\n跳过对象模型学后面，只能停留在「照着抄」，遇到问题完全无法调试。",
    tags: ["学习路径", "依赖关系", "对象模型"],
  },
  {
    id: "pya-learning-map-3",
    chapter: "pya-learning-map",
    level: 3,
    question: "面对一个 CPU 密集型任务（大量数值计算），你应该从全书哪个板块找方案？具体选什么？",
    answer:
      "从「并发编程」板块找方案。CPU 密集型任务的推荐选择：\n\n1. 首选 multiprocessing：多进程绕过 GIL，真正利用多核。用 `Pool.map` 即可并行。\n2. 如果纯数值循环且热点集中，用 Cython：把 Python 循环编译成 C，可提速 50-100 倍，还能手动释放 GIL 实现多线程并行。\n3. 不选 asyncio：协程在 IO 等待时切换，CPU 密集任务没有 IO 等待，协程无意义。\n4. 不选 threading：GIL 限制同一时刻只有一个线程执行字节码，多线程对 CPU 密集任务无加速。",
    tags: ["并发选择", "CPU密集", "multiprocessing", "Cython"],
  },
  {
    id: "pya-learning-map-4",
    chapter: "pya-learning-map",
    level: 4,
    question: "请阐述从「初级 Python 开发者」到「高级 Python 工程师」的进阶路径，以及每个阶段的核心能力跃迁。",
    answer:
      "四阶段进阶：\n\n1. 会用阶段（基础语法）：能用 Python 写脚本完成日常工作。核心能力：语法熟练、标准库使用。局限：不理解底层，遇到性能问题只会换更快的机器。\n\n2. 懂原理阶段（对象模型 + 高级语法）：理解一切皆对象、迭代器协议、描述符、元类。核心能力跃迁：从「调用 API」到「理解 API 背后的机制」，能读框架源码、能写装饰器和上下文管理器。\n\n3. 破瓶颈阶段（并发编程）：理解 GIL 本质，掌握 asyncio/multiprocessing/Cython 三种武器。核心能力跃迁：从「单线程串行」到「并发并行」，能处理高并发 IO 和计算密集场景，能做性能优化。\n\n4. 工程化阶段（测试 + 打包）：掌握 pytest 测试策略、打包分发流程。核心能力跃迁：从「能跑的脚本」到「可维护的工程项目」，代码有测试保障、有版本管理、可团队协作。\n\n每个阶段的核心：阶段 2 解决「懂不懂」，阶段 3 解决「快不快」，阶段 4 解决「稳不稳」。",
    tags: ["综合", "进阶路径", "能力跃迁"],
  },
];
