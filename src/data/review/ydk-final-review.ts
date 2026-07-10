import type { ReviewQuestion } from "./types";

export const ydkFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ydk-final-review-1",
    chapter: "ydk-final-review",
    level: 2,
    question: `《你不知道的JavaScript》四支柱各自回答什么核心问题？`,
    answer:
      `类型与语法回答「值是什么、比较和转换如何发生」——四个抽象操作（ToPrimitive/ToNumber/ToString/ToBoolean）驱动隐式转换，包装类型解释原始值如何调方法。作用域与闭包回答「变量在哪可见、为何不释放」——词法作用域在编写时画好边界，提升是编译期行为，闭包让函数记住并延续定义处的作用域。this 与原型回答「this 指向谁、方法从哪来」——this 由调用点按四规则绑定，原型链是对象间行为委托而非类继承。异步与性能回答「如何不阻塞地调度并发」——生成器是 await 的机制原型，Promise.all 并发取最大耗时，微任务密集需主动让出主线程。`,
    tags: ["四支柱", "总复习", "架构"],
  },
  {
    id: "ydk-final-review-2",
    chapter: "ydk-final-review",
    level: 3,
    question: `用四支柱解释代码中 this 为何丢失、count 为何不释放、log 从哪来。`,
    answer:
      `假设 const s = make(); setTimeout(s.load, 0)，make 返回的对象有 load 方法（闭包访问 count）且原型上有 log。①this 丢失：setTimeout(s.load, 0) 把 load 作为回调传递，调用点变成独立调用，落回默认绑定，this 指向全局或 undefined 而非 s——这是 this 绑定支柱的「隐式丢失」场景，修复用 s.load.bind(s) 或箭头包裹。②count 不释放：load 是闭包，持有对 make 内 count 所在作用域的引用，即使 make 已返回 count 仍存活——这是作用域闭包支柱，闭包让函数记住并延续其词法作用域。③log 从哪来：s 自身没有 log，沿 [[Prototype]] 向上找到原型对象上的 log——这是原型机制支柱，属性查找沿原型链委托，本质是对象间行为委托而非类继承。三支柱同时在一行代码里起作用。`,
    tags: ["this", "闭包", "原型链", "综合"],
  },
  {
    id: "ydk-final-review-3",
    chapter: "ydk-final-review",
    level: 3,
    question: `四支柱的交叉洞察是什么？为什么不能把它们当孤立知识点背？`,
    answer:
      `交叉洞察：闭包延续作用域（函数带走定义处的变量环境）→ this 在调用点绑定（与定义处无关，回调里会丢）→ 原型委托复用（方法挂在原型链上，沿 [[Prototype]] 查找）→ 异步调度（await 让出主线程，Promise 进微任务队列），加上类型转换驱动表达式结果。不能当孤立知识点背，因为真实代码从不分开用——一个 class 里的 async 方法访问 this.cache，同时涉及原型委托（方法在原型上）、this 绑定（调用点决定）、闭包（实例属性在构造函数作用域）、异步调度（await 让出主线程）、可能还有类型转换（返回值参与比较）。把它们当孤立知识点背，遇到组合场景就解释不了。正确学法是以「运行时机制」为枢纽串联，把五问（编译/作用域/this/原型/异步）变成分析任意代码的固定套路。`,
    tags: ["交叉洞察", "综合", "运行时机制"],
  },
  {
    id: "ydk-final-review-4",
    chapter: "ydk-final-review",
    level: 4,
    question: `什么是「机制先于语法」？如何用五问套路建立工程判断力？`,
    answer:
      `「机制先于语法」指理解 JavaScript 应从运行时机制（引擎/编译器/作用域如何处理代码）出发，而非停留于语法表层（怎么写）。语法是约定（let/class/async 怎么写），机制是真相（提升是编译期行为、class 是原型语法糖、await 是 yield Promise + 回灌）。五问套路：面对任意代码，依次问①引擎如何编译它（提升/TDZ）②作用域如何划定可见性③this 在调用点如何绑定④属性沿原型链如何查找⑤异步如何调度——加上类型转换判断表达式结果。把这五问变成分析代码的固定反射，就能预判运行时行为而非「跑一下才知道」，标志是能解释 this 为何丢失、闭包为何不释放、== 为何出意外、await 为何不阻塞、原型链在哪终结。这是从「会写」到「懂」的跨越，也是 YDKJS 全书的核心目标。`,
    tags: ["机制先于语法", "五问套路", "工程判断力"],
  },
];
