import type { ReviewQuestion } from "./types";

/** Python高级编程总复习 复习题 */
export const pyaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pya-final-review-1",
    chapter: "pya-final-review",
    level: 1,
    question: "全书四大板块的核心知识点各是什么？",
    answer: "基础内省：对象模型/内存管理/字节码。高级语法：迭代器/装饰器/元类。并发编程：asyncio/multiprocessing/Cython。工程实践：pytest/pyproject.toml。",
    tags: ["全书结构"],
  },
  {
    id: "pya-final-review-2",
    chapter: "pya-final-review",
    level: 2,
    question: "GIL 如何影响并发编程板块的设计？",
    answer: "GIL 导致三种并发方案：asyncio（IO等待释放GIL）、multiprocessing（多进程绕过GIL）、Cython（nogil手动释放GIL）。",
    tags: ["GIL", "并发"],
  },
  {
    id: "pya-final-review-3",
    chapter: "pya-final-review",
    level: 3,
    question: "给定性能瓶颈的 Python 项目，如何系统优化？",
    answer: "按决策链：profile定位热点→算法优化→内置函数→NumPy向量化→asyncio/multiprocessing→Cython。每步验证效果。",
    tags: ["性能优化", "决策链"],
  },
  {
    id: "pya-final-review-4",
    chapter: "pya-final-review",
    level: 4,
    question: "请阐述从脚本开发者到高级工程师的能力模型及每板块的跃迁。",
    answer: "四级：会用（脚本）→懂原理（基础内省+高级语法，解决懂不懂）→破瓶颈（并发编程，解决快不快）→工程化（测试打包，解决稳不稳）。每级是下级基础。",
    tags: ["综合", "能力模型"],
  },
];
