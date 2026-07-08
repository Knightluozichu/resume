import type { ReviewQuestion } from "./types";

export const jpgScopeClosureQuestions: ReviewQuestion[] = [
  {
    id: "jpg-scope-closure-1",
    chapter: "jpg-scope-closure",
    level: 2,
    question: "词法作用域和动态作用域的区别是什么？JS 是哪种？",
    answer:
      "词法作用域由函数定义时所在的代码位置决定，变量查找沿定义位置的嵌套结构进行，与函数在哪里被调用无关。动态作用域由函数调用时的调用栈决定，变量查找沿调用链进行。JS 采用词法作用域——函数定义时就确定它能访问哪些变量，无论之后被传到哪里调用都不变。例如 outer 内定义的 inner，即使被赋给全局变量后调用，仍访问 outer 内的变量（闭包的基础）。JS 中 this 的绑定机制有点像动态作用域（由调用方式决定），但作用域本身是词法的。",
    tags: ["词法作用域", "动态作用域", "作用域链"],
  },
  {
    id: "jpg-scope-closure-2",
    chapter: "jpg-scope-closure",
    level: 2,
    question: "什么是闭包？它为什么能访问定义时的变量？",
    answer:
      "闭包是函数与其定义时所处的词法环境的组合。每当函数被创建，JS 引擎就让它携带一个对定义环境的引用（[[Environment]] 内部属性）。即使函数在其词法作用域之外被执行，它仍能沿这个环境引用访问定义时捕获的变量——这些变量不会被垃圾回收，只要闭包存在就持续存活。这是 JS 实现数据封装（模块模式）、状态保持（计数器）、回调记忆（事件处理函数捕获 DOM 引用）的核心机制。但闭包会阻止变量回收，滥用易致内存泄漏，长生命周期闭包需显式置 null 释放。",
    tags: ["闭包", "词法环境", "内存管理"],
  },
  {
    id: "jpg-scope-closure-3",
    chapter: "jpg-scope-closure",
    level: 3,
    question: "解释 for 循环中 var 与 let 在 setTimeout 闭包陷阱的差异及修复。",
    answer:
      "for (var i=0; i<3; i++) setTimeout(()=>console.log(i),0) 输出 3 3 3。原因：var 是函数作用域，整个循环共享一个 i；setTimeout 回调异步，等主循环结束（i 已变 3）才执行，三个回调读到同一 i=3。let 是块级作用域，每次迭代产生新的 i 副本，回调各自捕获独立值，输出 0 1 2。修复方式：① 用 let 替代 var（首选）；② 用 IIFE 包裹把当前 i 作为参数传入形成独立作用域；③ 用 forEach 替代 for（回调参数天然每次独立）。本质都是让每次迭代的回调捕获独立的 i，而非共享。",
    tags: ["闭包陷阱", "var", "let", "IIFE", "循环"],
  },
  {
    id: "jpg-scope-closure-4",
    chapter: "jpg-scope-closure",
    level: 4,
    question: "闭包会导致内存泄漏吗？如何安全使用闭包？",
    answer:
      "会。闭包捕获的变量不会被垃圾回收，只要闭包存在就持续存活。这在短生命周期闭包（如一次性事件处理）中无害，但在长生命周期场景会泄漏：① 全局缓存闭包持有大对象引用不释放；② 单例闭包累积数据无限增长；③ 已移除的 DOM 元素仍被闭包引用导致无法回收；④ 定时器回调闭包持有外部变量。安全使用原则：短生命闭包随用随弃无害；长生命闭包用完后显式置 null 释放引用；事件监听器在元素移除时 removeEventListener；定时器在不用时 clearInterval；避免在闭包中持有不需要的大对象。判断标志：闭包是否比捕获的变量活得更久。",
    tags: ["闭包", "内存泄漏", "垃圾回收", "性能"],
  },
];
