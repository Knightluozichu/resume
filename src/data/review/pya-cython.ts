import type { ReviewQuestion } from "./types";

/** Cython扩展编程 复习题 */
export const pyaCythonQuestions: ReviewQuestion[] = [
  {
    id: "pya-cython-1",
    chapter: "pya-cython",
    level: 1,
    question: "Cython 的 cdef 和 cpdef 有什么区别？",
    answer: "cdef 函数只能被 Cython 内部以 C 速度调用，Python 无法访问。cpdef 同时生成 C 和 Python 接口，两者都可调用。",
    tags: ["cdef", "cpdef"],
  },
  {
    id: "pya-cython-2",
    chapter: "pya-cython",
    level: 2,
    question: "为什么 Cython 类型注解能大幅提升性能？",
    answer: "类型注解跳过 Python 动态类型机制：用 C 原生类型不创建 Python 对象，无引用计数开销，数组访问用 C 指针运算。可提速 50-100 倍。",
    tags: ["类型注解", "性能"],
  },
  {
    id: "pya-cython-3",
    chapter: "pya-cython",
    level: 3,
    question: "如何用 Cython 的 nogil 实现多线程并行计算？",
    answer: "with nogil 块中执行纯 C 计算，释放 GIL 允许其他线程并行。配合 OpenMP 或 threading 实现多线程。",
    tags: ["nogil", "多线程"],
  },
  {
    id: "pya-cython-4",
    chapter: "pya-cython",
    level: 4,
    question: "请阐述 Python 性能优化的完整工具链及 Cython 的定位。",
    answer: "工具链：算法优化→内置函数→NumPy向量化→multiprocessing→Cython→C扩展。Cython 是性能与开发效率的最佳平衡点，比 multiprocessing 快（无IPC），比 C 扩展易写。",
    tags: ["综合", "性能优化", "Cython"],
  },
];
