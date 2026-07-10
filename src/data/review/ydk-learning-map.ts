import type { ReviewQuestion } from "./types";

export const ydkLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ydk-learning-map-1",
    chapter: "ydk-learning-map",
    level: 2,
    question: `《你不知道的JavaScript》四支柱是什么？为什么是这个顺序？`,
    answer:
      `类型与语法（类型转换/原生函数）→ 作用域与闭包（词法作用域/提升/闭包）→ this 与原型（this 绑定/[[Prototype]] 委托）→ 异步与性能（生成器/Promise 并发）。顺序由依赖关系决定：下层是上层的前提。没有类型与转换就无法判断表达式结果；没有作用域就没有变量可见性、也没有闭包；没有作用域与对象就无从谈 this 的调用点绑定和原型方法查找；没有前三者做基础，异步的调度、闭包延续、this 在回调中的丢失都无从理解。先有「值是什么」，再有「变量在哪」，然后「this 指向谁、方法从哪来」，最后「如何异步调度」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "ydk-learning-map-2",
    chapter: "ydk-learning-map",
    level: 2,
    question: `为什么说 \`await\` 是「让出主线程」而不是「阻塞等待」？`,
    answer:
      `JavaScript 是单线程事件循环模型。遇到 await 时，async 函数立即挂起并返回一个 Promise，控制权交回事件循环——主线程继续执行后续同步代码和微任务。被 await 的 Promise resolve 后，恢复执行的回调进入微任务队列，等当前宏任务及其微任务清空后才被取出继续。整个过程主线程从未被「卡住」，所以是「让出」而非「阻塞」。这也解释了为何密集的同步计算会让页面卡顿（CPU 密集任务不主动让出），而 await 配合拆分能把长任务切片，让渲染和 IO 有机会执行。`,
    tags: ["异步", "事件循环", "await"],
  },
  {
    id: "ydk-learning-map-3",
    chapter: "ydk-learning-map",
    level: 3,
    question: `用「一段代码跑起来后到底发生了什么」串联四支柱。`,
    answer:
      `以 createLoader 为例：①类型与语法——返回值若被 == 比较会触发隐式转换，fetcher 返回的对象经 ToPrimitive/ToString 序列化；②作用域与闭包——cache 声明在 createLoader 作用域内，load 方法作为闭包持有对 cache 的引用，createLoader 返回后 cache 仍存活；③this 与原型——loader.load() 调用点决定 this 隐式绑定到 loader，方法可能在原型链上找到；④异步与性能——await fetcher() 让出主线程，fetcher 的 Promise resolve 后回调进微任务队列恢复执行。一段代码，四支柱同时参与，这正是 YDKJS 要建立的运行时机制视角。`,
    tags: ["架构", "运行时机制"],
  },
  {
    id: "ydk-learning-map-4",
    chapter: "ydk-learning-map",
    level: 4,
    question: `「会写语法」和「懂机制」的本质区别是什么？为什么 YDKJS 强调机制先于语法？`,
    answer:
      `语法是表层约定（let/class/async 怎么写），照文档抄就会；机制是运行时真相（提升是编译期行为、class 是原型语法糖、await 是 yield Promise + 回灌、this 由调用点决定）。会写语法的人写的代码能跑但不可控——遇到 this 丢失、闭包不释放、== 出意外、原型链查找都解释不了；懂机制的人能精确预判代码「为什么这样执行」。YDKJS 强调机制先于语法，因为这些「代码跑起来后」的真相才是中高级面试与工程实战的真正考点。区分两者的标志：能否解释一段代码「为什么这样执行」而非只是「能跑」。`,
    tags: ["架构", "机制", "工程思维"],
  },
];
