import type { ReviewQuestion } from "./types";

export const jpgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jpg-learning-map-1",
    chapter: "jpg-learning-map",
    level: 2,
    question: "全书五阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "语言基础（类型/变量/作用域/闭包）→ 对象与原型（对象/OOP/原型链）→ 异步模型（Promise/事件循环）→ 浏览器与模块（DOM/BOM/ESM）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有类型与作用域就没有变量；没有对象就没有数据组织；没有异步模型就处理不了 I/O；没有 DOM/BOM 就和浏览器无关；没有模块系统代码就无法规模化。先有「能存」，再有「能组织」，然后「能等待」，接着「能交互」，最后「能拆分」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "jpg-learning-map-2",
    chapter: "jpg-learning-map",
    level: 2,
    question: "为什么 JavaScript 是单线程，却能处理高并发的异步 I/O？",
    answer:
      "JavaScript 的执行线程是单线程（只有一个调用栈），但宿主环境（浏览器/Node）是多线程的。遇到 setTimeout、fetch 等异步操作时，JS 引擎把实际工作交给浏览器的 Web API 线程处理，自己继续执行同步代码不阻塞。Web API 完成后把回调推入任务队列；调用栈清空时，事件循环从队列取出回调执行。这种「单线程执行 + 多线程 I/O + 事件循环调度」让 JS 既避免多线程同步复杂度，又能高效处理并发 I/O。代价是 CPU 密集任务会阻塞主线程，需用 Worker 拆分。",
    tags: ["单线程", "事件循环", "异步"],
  },
  {
    id: "jpg-learning-map-3",
    chapter: "jpg-learning-map",
    level: 3,
    question: "用「一次点击到页面更新」的完整运行时旅程描述全书主线。",
    answer:
      "用户点击：①语言基础——事件处理用箭头函数形成闭包，捕获 DOM 引用，变量用 const 声明（第 2-3 章）；②对象与原型——返回的 data 对象继承自原型链，调用的方法来自原型（第 4-5 章）；③异步模型——await 暂停 async 函数（不阻塞主线程），fetch 的网络 I/O 由 Web API 处理，回调进入微任务队列，事件循环调度（第 6-7 章）；④DOM/BOM——addEventListener 监听点击，textContent 更新触发重排重绘（第 8 章）；⑤模块系统——fetchData 通过 ESM import 静态加载，支持 tree-shaking（第 9 章）。4 行代码，五层全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "jpg-learning-map-4",
    chapter: "jpg-learning-map",
    level: 4,
    question: "会写 JavaScript 语法和真正懂 JavaScript 运行时有什么本质区别？",
    answer:
      "语法只是表层——let/const 怎么写、函数怎么定义，照文档抄就会。真正难点在运行时：变量为什么提升、闭包为什么不释放内存、this 指向谁、Promise 为什么比回调先执行、原型链查找代价、事件循环的微任务宏任务顺序。这些是「代码跑起来后」才显现的机制，也是中高级面试与工程实战的真正考点。把语法当终点的人，写的代码能跑但脆弱；把运行时当核心的人，才能写出可控、可维护、高性能的 JavaScript。区分两者的标志：能否解释一段代码「为什么这样执行」而非只是「能跑」。",
    tags: ["架构", "运行时", "工程思维"],
  },
];
