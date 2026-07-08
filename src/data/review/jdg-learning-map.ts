import type { ReviewQuestion } from "./types";

export const jdgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jdg-learning-map-1",
    chapter: "jdg-learning-map",
    level: 2,
    question: "全书四阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "语言核心（词法结构/类型值）→ 函数抽象（函数闭包/类模块）→ 标准库与元编程（数组对象/集合元编程）→ Web 平台（DOM事件/浏览器API）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有词法与类型就没有程序的基本构成；没有函数与类就没有行为封装与代码组织；没有标准库就没有高效的数据加工工具；没有 Web 平台就和浏览器世界无关。先有「能组成程序」，再有「能封装行为」，然后「能加工数据」，接着「能驱动网页」，最后用总复习把链路串通。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "jdg-learning-map-2",
    chapter: "jdg-learning-map",
    level: 2,
    question: "用「从源码字符到页面响应」的完整运行时旅程描述全书主线。",
    answer:
      "源码字符经词法解析：Unicode 文本切分成 token、ASI 决定语句边界、标识符与关键字被识别（第 2 章）；表达式求值：原始类型按值存储、对象按引用传递、类型转换由抽象操作驱动（第 3 章）；行为封装：函数定义形式决定 this 绑定、闭包延续作用域、类与模块组织复用（第 4-5 章）；数据加工：数组方法分纯函数与副作用、解构与展开声明式操作、Map/Set 提供集合、Proxy/Reflect 改写默认行为（第 6-7 章）；驱动网页：事件流三阶段传播、委托减负、Fetch 发请求、Storage 存数据、Worker 卸载计算（第 8-9 章）。一条链路十章知识全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "jdg-learning-map-3",
    chapter: "jdg-learning-map",
    level: 3,
    question: "为什么把 JavaScript 当「写网页的脚本」是不够的？工程能力体现在哪里？",
    answer:
      "只会操作 DOM 和发请求，代码能跑但脆弱。真正的 JS 工程能力是一条完整链路：词法层面理解 ASI 为何出错、类型层面预判浮点精度陷阱、函数层面用闭包封装状态而非污染全局、模块层面用 ESM 静态分析支持 tree-shaking、标准库层面选对数据结构（Map 而非对象当字典）、元编程层面理解响应式框架的 Proxy 机制、Web 层面用事件委托减少监听器、用 Worker 卸载 CPU 密集计算。把每层当独立知识点背，遇到组合场景抓瞎；以运行时旅程为主线串联，才能从「会写脚本」升级到「懂 JavaScript 工程」。",
    tags: ["工程思维", "运行时旅程"],
  },
  {
    id: "jdg-learning-map-4",
    chapter: "jdg-learning-map",
    level: 4,
    question: "全书十章如何对应运行时旅程的各个阶段？举例说明一次用户交互动用了哪些层。",
    answer:
      "十章对应：第 2 章词法（字符→token→语句）、第 3 章类型（求值与转换）、第 4 章函数闭包（this/闭包）、第 5 章类模块（组织复用）、第 6 章数组对象（数据加工）、第 7 章集合元编程（集合/Proxy）、第 8 章 DOM 事件（事件流/委托）、第 9 章浏览器 API（Fetch/Storage/Worker）、第 1/10 章总览串联。举例：用户点击按钮→addEventListener 事件监听（第 8 章 Web）→箭头函数闭包捕获上下文（第 4 章函数）→await fetch 发请求（第 9 章 Web）→返回数据用 Map 缓存（第 7 章标准库）→对象展开/解构处理（第 6 章标准库）→textContent 更新 DOM 触发重排（第 8 章 Web）。一次交互四层全部参与。",
    tags: ["架构", "运行时旅程", "工程思维"],
  },
];
