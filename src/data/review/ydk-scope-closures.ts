import type { ReviewQuestion } from "./types";

export const ydkScopeClosuresQuestions: ReviewQuestion[] = [
  {
    id: "ydk-scope-closures-1",
    chapter: "ydk-scope-closures",
    level: 2,
    question: `词法作用域和动态作用域的区别是什么？JavaScript 是哪种？`,
    answer:
      `词法作用域的作用域边界在编写代码时由函数/块的位置确定，编译阶段就固定，与运行时调用位置无关——查找变量从定义处由内向外逐层找。动态作用域的作用域边界在运行时由调用栈决定，函数在哪里被调用就找哪里的变量。JavaScript 是词法作用域（绝大多数语言都是）。区别体现在：词法作用域下，baz = foo() 后在任意位置调用 baz()，bar 内的 a 总是指向 foo 定义处的全局 a，而非调用 baz 的位置附近的 a。this 的绑定机制有点像动态作用域（由调用点决定），但作用域本身是词法的，两者别混淆。`,
    tags: ["词法作用域", "动态作用域"],
  },
  {
    id: "ydk-scope-closures-2",
    chapter: "ydk-scope-closures",
    level: 3,
    question: `为什么 \`for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0)\` 打印三个 3？如何修复？`,
    answer:
      `var 声明的 i 是函数级作用域，整个循环共用一个 i。setTimeout 的回调是闭包，捕获的是同一个 i 的引用。循环结束时 i 已经是 3，三个回调在宏任务队列里依次执行时读到的都是 3。修复两种：①把 var 改成 let——let 是块级作用域，每轮循环创建一个独立的 i 绑定，每个闭包捕获各自的 i，打印 0 1 2；②用 IIFE 在每轮捕获当时的 i 值：setTimeout((function(j){ return () => console.log(j); })(i), 0)，把 i 作为参数传进 IIFE，j 是独立副本。本质都是为每轮循环创建独立的作用域/绑定，让闭包捕获到不同的值。`,
    tags: ["闭包", "循环", "let", "IIFE"],
  },
  {
    id: "ydk-scope-closures-3",
    chapter: "ydk-scope-closures",
    level: 3,
    question: `闭包的本质是什么？模块模式如何利用闭包封装私有成员？`,
    answer:
      `闭包本质是「函数与其词法作用域的组合」——函数记住自己定义处的变量环境，即使在该作用域之外被调用（甚至定义处的外层函数已返回），仍能继续访问其中的变量。不是「函数返回函数」的形式。模块模式：用 IIFE 包裹私有状态，返回公开 API 的对象，私有成员（如 count）通过闭包封装、外部无法直接访问，只能通过返回的公开方法（inc/get）间接操作。闭包让私有变量只对公开方法可见，外部 obj.count 拿到 undefined，实现了访问控制。这是 ES6 模块出现前实现封装的标准手法。`,
    tags: ["闭包", "模块模式", "封装"],
  },
  {
    id: "ydk-scope-closures-4",
    chapter: "ydk-scope-closures",
    level: 4,
    question: `eval 和 with 如何「欺骗词法作用域」？为什么严格模式禁用 with？`,
    answer:
      `eval 在运行期执行字符串，可声明新变量改写当前作用域；with 用对象创建临时作用域，把对象属性注入为变量。两者都让引擎无法在编译期确定变量来源——本来词法作用域在编译阶段就固定边界，eval/with 却在运行期动态改写，破坏引擎的静态优化（如变量名解析的内联缓存失效），性能差且易出错。严格模式禁用 with 是因为它的变量注入语义模糊（对象属性和作用域变量混在一起），极易产生意外赋值。eval 在严格模式下也有独立作用域限制。结论：别用它们欺骗词法作用域，需要动态代码用 Function 构造器（至少有独立作用域）。`,
    tags: ["eval", "with", "欺骗词法", "严格模式"],
  },
];
