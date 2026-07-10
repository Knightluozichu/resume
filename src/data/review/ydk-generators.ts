import type { ReviewQuestion } from "./types";

export const ydkGeneratorsQuestions: ReviewQuestion[] = [
  {
    id: "ydk-generators-1",
    chapter: "ydk-generators",
    level: 2,
    question: `生成器的 \`next(v)\` 中 \`v\` 起什么作用？\`{value, done}\` 各代表什么？`,
    answer:
      `next(v) 的 v 是「注入」回生成器的值，它成为上一个 yield 表达式的返回值，实现双向通信。流程：首次 next() 启动生成器执行到第一个 yield 暂停，返回 {value: yield 产出的值, done: false}；第二次 next(v) 从暂停处恢复，v 作为第一个 yield 的返回值赋给左侧变量，继续执行到第二个 yield 暂停，返回新的 {value, done: false}；遇到 return 或函数结束返回 {value: return 的值或 undefined, done: true}。value 是本次产出/返回的值，done 表示生成器是否已结束。注意首次 next() 传参无意义（没有上一个 yield 接收），要传初始值通常用生成器函数参数。`,
    tags: ["生成器", "next", "yield", "迭代器协议"],
  },
  {
    id: "ydk-generators-2",
    chapter: "ydk-generators",
    level: 3,
    question: `\`for...of\`、展开语法 \`...\`、解构底层如何工作？生成器为何能被它们消费？`,
    answer:
      `它们底层都消费可迭代协议：调用对象的 [Symbol.iterator]() 方法获取迭代器，然后反复调用迭代器的 next() 直到 done 为 true。for...of 每轮把 value 赋给循环变量；展开语法把每个 value 收集进新数组；解构按位置取前几个 value。生成器能被消费是因为它同时满足两个协议：①迭代器协议——生成器对象有 next() 方法，返回 {value, done}；②可迭代协议——生成器对象的 [Symbol.iterator]() 返回自身。所以生成器对象天然是可迭代对象，能被 for...of/展开/解构直接消费。这也意味着生成器是一次性的：遍历完后 done 为 true，不能重复遍历，需重新调用生成器函数创建新迭代器。`,
    tags: ["可迭代协议", "for...of", "Symbol.iterator"],
  },
  {
    id: "ydk-generators-3",
    chapter: "ydk-generators",
    level: 3,
    question: `生成器驱动的异步是什么原理？它和 async/await 是什么关系？`,
    answer:
      `生成器驱动异步：让生成器 yield 一个 Promise，外部运行器等它 resolve 后把结果 next(result) 回灌进生成器，这样就能用「同步顺序」的写法表达异步流程。生成器在 yield 时挂起、保留执行状态，Promise resolve 后运行器把回调（恢复生成器）推入微任务队列，主线程从未被卡住。这是 async/await 的前身——await x 在机制上等价于「yield 一个 Promise + 运行器自动等其 resolve 并回灌结果」。理解这一点就明白 await 为何是「让出主线程」而非「阻塞」：生成器在 yield 时挂起返回控制权，Promise resolve 后恢复执行的回调进微任务队列，等当前宏任务及其微任务清空后才继续。`,
    tags: ["生成器异步", "async/await", "运行器"],
  },
  {
    id: "ydk-generators-4",
    chapter: "ydk-generators",
    level: 4,
    question: `为什么说生成器的「暂停恢复」是语言级能力，普通函数无法替代？`,
    answer:
      `普通函数调用是「调用→执行→返回」一气呵成，栈帧在返回时销毁，无法在中间暂停把控制权交还调用者再恢复。生成器在 yield 时冻结整个执行上下文（局部变量、执行位置），next 时恢复——这种「可中断的执行状态」普通函数做不到。形式上能模拟生成器（用闭包 + 状态机），但代码复杂且丢失「位置记忆」能力。正因为能暂停保留状态，生成器才能实现：①无限序列的惰性求值（用一次算一次，省内存）；②双向通信（next(v) 注入）；③驱动异步（yield Promise 暂停等待恢复）。这些都需要「暂停时保留状态」的语言级能力，是生成器区别于普通函数的本质，也是理解 await 让出主线程和协程式并发的基础。`,
    tags: ["生成器", "暂停恢复", "惰性求值"],
  },
];
