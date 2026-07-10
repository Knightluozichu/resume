import type { ReviewQuestion } from "./types";

/** 迭代器与生成器 复习题 */
export const pyaIteratorsGeneratorsQuestions: ReviewQuestion[] = [
  {
    id: "pya-iterators-generators-1",
    chapter: "pya-iterators-generators",
    level: 1,
    question: `迭代器协议要求对象实现哪两个方法？`,
    answer: `__iter__() 返回迭代器自身，__next__() 返回下一个值或抛出 StopIteration。`,
    tags: ["迭代器协议"],
  },
  {
    id: "pya-iterators-generators-2",
    chapter: "pya-iterators-generators",
    level: 2,
    question: `生成器函数和普通函数有什么本质区别？`,
    answer: `普通函数用 return 返回结果后结束；生成器函数用 yield 暂停并返回值，函数状态被保留，下次 next() 从暂停处恢复。`,
    tags: ["生成器", "yield"],
  },
  {
    id: "pya-iterators-generators-3",
    chapter: "pya-iterators-generators",
    level: 3,
    question: `如何用生成器实现一个惰性管道？`,
    answer: `每个步骤写成一个生成器函数，用 yield 逐个产出。然后嵌套调用，数据逐行流过管道，不一次性加载。`,
    tags: ["生成器管道", "惰性求值"],
  },
  {
    id: "pya-iterators-generators-4",
    chapter: "pya-iterators-generators",
    level: 4,
    question: `协程（asyncio）与生成器有什么历史渊源？`,
    answer: `asyncio 的协程最初基于生成器实现（PEP 342/380/492），事件循环的 __await__ 协议本质上是迭代器协议。理解生成器的暂停-恢复机制就能理解协程。`,
    tags: ["综合", "协程", "生成器"],
  },
];
