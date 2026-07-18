import type { ReviewQuestion } from "./types";

export const jfsOfficialQuestions: ReviewQuestion[] = [
  {
    id: "jfs-official-learning-map-1",
    chapter: "jfs-official-learning-map",
    level: 1,
    question: "《JavaScript 全栈开发》权威学习地图的核心主张是什么？",
    answer:
      "凌杰原著以 JavaScript 语言核心为起点，依次进入浏览器 DOM、BOM、事件与 AJAX，再用 Node.js、HTTP、模板和数据库完成服务器端闭环；14 章不依赖流行框架名称来替代底层机制。",
    tags: ["《JavaScript 全栈开发》权威学习地图", "核心机制"],
  },
  {
    id: "jfs-official-learning-map-2",
    chapter: "jfs-official-learning-map",
    level: 2,
    question: "《JavaScript 全栈开发》权威学习地图覆盖哪些公开目录条目？",
    answer:
      "第 1 章 JavaScript 简介、第 2 章 变量、表达式与语句、第 3 章 函数与对象、第 4 章 面向对象编程、第 5 章 异步编程、第 6 章 前端编程概述、第 7 章 DOM 标准与使用、第 8 章 DOM 扩展与 BOM、第 9 章 前端事件处理、第 10 章 AJAX 编程方法、第 11 章 Node.js 概述、第 12 章 构建 Web 服务、第 13 章 响应客户请求、第 14 章 实现数据存取",
    tags: ["《JavaScript 全栈开发》权威学习地图", "目录覆盖"],
  },
  {
    id: "jfs-official-learning-map-3",
    chapter: "jfs-official-learning-map",
    level: 2,
    question: "《JavaScript 全栈开发》权威学习地图的六阶段证据链是什么？",
    answer:
      "核验原书身份 → 建立语言与宿主边界 → 掌握函数对象与异步 → 进入浏览器文档和事件 → 贯通 AJAX 与 HTTP → 完成 Node 数据闭环",
    tags: ["《JavaScript 全栈开发》权威学习地图", "机制链"],
  },
  {
    id: "jfs-official-learning-map-4",
    chapter: "jfs-official-learning-map",
    level: 3,
    question: "《JavaScript 全栈开发》权威学习地图为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["《JavaScript 全栈开发》权威学习地图", "故障注入"],
  },
  {
    id: "jfs-official-learning-map-5",
    chapter: "jfs-official-learning-map",
    level: 3,
    question: "《JavaScript 全栈开发》权威学习地图签发时保持什么不变量？",
    answer:
      "凌杰原著以 JavaScript 语言核心为起点，依次进入浏览器 DOM、BOM、事件与 AJAX，再用 Node.js、HTTP、模板和数据库完成服务器端闭环；14 章不依赖流行框架名称来替代底层机制。",
    tags: ["《JavaScript 全栈开发》权威学习地图", "工程验收"],
  },
  {
    id: "jfs-official-learning-map-6",
    chapter: "jfs-official-learning-map",
    level: 3,
    question: "《JavaScript 全栈开发》权威学习地图怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["《JavaScript 全栈开发》权威学习地图", "可复现实验"],
  },
  {
    id: "jfs-01-javascript-introduction-1",
    chapter: "jfs-01-javascript-introduction",
    level: 1,
    question: "第 1 章 JavaScript 简介的核心主张是什么？",
    answer:
      "JavaScript 由 ECMAScript 语言、宿主对象与运行时服务共同构成；先分清语言能力和浏览器、Node.js 提供的接口，才能解释同一段源码为什么会在不同环境中表现不同。",
    tags: ["第 1 章 JavaScript 简介", "核心机制"],
  },
  {
    id: "jfs-01-javascript-introduction-2",
    chapter: "jfs-01-javascript-introduction",
    level: 2,
    question: "第 1 章 JavaScript 简介覆盖哪些公开目录条目？",
    answer:
      "第 1 章 JavaScript 简介、1.1 JavaScript 的前世今生、1.2 JavaScript 的组成与特性、1.3 JavaScript 的适用领域、1.4 运行环境的搭建、本章小结",
    tags: ["第 1 章 JavaScript 简介", "目录覆盖"],
  },
  {
    id: "jfs-01-javascript-introduction-3",
    chapter: "jfs-01-javascript-introduction",
    level: 2,
    question: "第 1 章 JavaScript 简介的六阶段证据链是什么？",
    answer:
      "追溯语言与标准 → 拆分语言和宿主能力 → 辨认动态与函数特性 → 映射浏览器与服务器场景 → 搭建双运行环境 → 核对同源程序的差异",
    tags: ["第 1 章 JavaScript 简介", "机制链"],
  },
  {
    id: "jfs-01-javascript-introduction-4",
    chapter: "jfs-01-javascript-introduction",
    level: 3,
    question: "第 1 章 JavaScript 简介为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 JavaScript 简介", "故障注入"],
  },
  {
    id: "jfs-01-javascript-introduction-5",
    chapter: "jfs-01-javascript-introduction",
    level: 3,
    question: "第 1 章 JavaScript 简介签发时保持什么不变量？",
    answer:
      "JavaScript 由 ECMAScript 语言、宿主对象与运行时服务共同构成；先分清语言能力和浏览器、Node.js 提供的接口，才能解释同一段源码为什么会在不同环境中表现不同。",
    tags: ["第 1 章 JavaScript 简介", "工程验收"],
  },
  {
    id: "jfs-01-javascript-introduction-6",
    chapter: "jfs-01-javascript-introduction",
    level: 3,
    question: "第 1 章 JavaScript 简介怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 1 章 JavaScript 简介", "可复现实验"],
  },
  {
    id: "jfs-02-variables-expressions-statements-1",
    chapter: "jfs-02-variables-expressions-statements",
    level: 1,
    question: "第 2 章 变量、表达式与语句的核心主张是什么？",
    answer:
      "程序先把值绑定到变量，再由表达式产生新值，最后由语句组织执行顺序；作用域、类型转换、优先级和控制流必须在每一步显式可解释。",
    tags: ["第 2 章 变量、表达式与语句", "核心机制"],
  },
  {
    id: "jfs-02-variables-expressions-statements-2",
    chapter: "jfs-02-variables-expressions-statements",
    level: 2,
    question: "第 2 章 变量、表达式与语句覆盖哪些公开目录条目？",
    answer:
      "第 2 章 变量、表达式与语句、2.1 第一个 JavaScript 程序、2.2 为代码编写注释、2.3 变量与操作符、2.4 表达式与语句、2.5 综合练习、本章小结",
    tags: ["第 2 章 变量、表达式与语句", "目录覆盖"],
  },
  {
    id: "jfs-02-variables-expressions-statements-3",
    chapter: "jfs-02-variables-expressions-statements",
    level: 2,
    question: "第 2 章 变量、表达式与语句的六阶段证据链是什么？",
    answer:
      "创建脚本入口 → 标注意图和约束 → 建立变量绑定 → 计算表达式 → 选择或重复语句 → 用练习验证边界",
    tags: ["第 2 章 变量、表达式与语句", "机制链"],
  },
  {
    id: "jfs-02-variables-expressions-statements-4",
    chapter: "jfs-02-variables-expressions-statements",
    level: 3,
    question: "第 2 章 变量、表达式与语句为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 变量、表达式与语句", "故障注入"],
  },
  {
    id: "jfs-02-variables-expressions-statements-5",
    chapter: "jfs-02-variables-expressions-statements",
    level: 3,
    question: "第 2 章 变量、表达式与语句签发时保持什么不变量？",
    answer:
      "程序先把值绑定到变量，再由表达式产生新值，最后由语句组织执行顺序；作用域、类型转换、优先级和控制流必须在每一步显式可解释。",
    tags: ["第 2 章 变量、表达式与语句", "工程验收"],
  },
  {
    id: "jfs-02-variables-expressions-statements-6",
    chapter: "jfs-02-variables-expressions-statements",
    level: 3,
    question: "第 2 章 变量、表达式与语句怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 2 章 变量、表达式与语句", "可复现实验"],
  },
  {
    id: "jfs-03-functions-objects-1",
    chapter: "jfs-03-functions-objects",
    level: 1,
    question: "第 3 章 函数与对象的核心主张是什么？",
    answer:
      "函数封装行为并携带词法环境，对象封装具名状态；调用约定、闭包、this、属性查找和集合选择共同决定数据与行为如何协作。",
    tags: ["第 3 章 函数与对象", "核心机制"],
  },
  {
    id: "jfs-03-functions-objects-2",
    chapter: "jfs-03-functions-objects",
    level: 2,
    question: "第 3 章 函数与对象覆盖哪些公开目录条目？",
    answer:
      "第 3 章 函数与对象、3.1 封装的意义、3.2 函数的运用、3.3 对象初体验、3.4 数据结构对象、3.5 综合练习、本章小结",
    tags: ["第 3 章 函数与对象", "目录覆盖"],
  },
  {
    id: "jfs-03-functions-objects-3",
    chapter: "jfs-03-functions-objects",
    level: 2,
    question: "第 3 章 函数与对象的六阶段证据链是什么？",
    answer:
      "识别重复职责 → 定义参数与返回契约 → 创建并调用函数 → 组织对象状态 → 选择集合结构 → 验证别名与封装",
    tags: ["第 3 章 函数与对象", "机制链"],
  },
  {
    id: "jfs-03-functions-objects-4",
    chapter: "jfs-03-functions-objects",
    level: 3,
    question: "第 3 章 函数与对象为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 函数与对象", "故障注入"],
  },
  {
    id: "jfs-03-functions-objects-5",
    chapter: "jfs-03-functions-objects",
    level: 3,
    question: "第 3 章 函数与对象签发时保持什么不变量？",
    answer:
      "函数封装行为并携带词法环境，对象封装具名状态；调用约定、闭包、this、属性查找和集合选择共同决定数据与行为如何协作。",
    tags: ["第 3 章 函数与对象", "工程验收"],
  },
  {
    id: "jfs-03-functions-objects-6",
    chapter: "jfs-03-functions-objects",
    level: 3,
    question: "第 3 章 函数与对象怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 3 章 函数与对象", "可复现实验"],
  },
  {
    id: "jfs-04-object-oriented-programming-1",
    chapter: "jfs-04-object-oriented-programming",
    level: 1,
    question: "第 4 章 面向对象编程的核心主张是什么？",
    answer:
      "JavaScript 的面向对象建立在对象与原型委托之上；类语法提供更清晰的构造接口，但属性所有权、原型链和方法接收者仍是运行时真相。",
    tags: ["第 4 章 面向对象编程", "核心机制"],
  },
  {
    id: "jfs-04-object-oriented-programming-2",
    chapter: "jfs-04-object-oriented-programming",
    level: 2,
    question: "第 4 章 面向对象编程覆盖哪些公开目录条目？",
    answer:
      "第 4 章 面向对象编程、4.1 何谓面向对象、4.2 深度探索对象、4.3 原型继承机制、4.4 综合练习、本章小结",
    tags: ["第 4 章 面向对象编程", "目录覆盖"],
  },
  {
    id: "jfs-04-object-oriented-programming-3",
    chapter: "jfs-04-object-oriented-programming",
    level: 2,
    question: "第 4 章 面向对象编程的六阶段证据链是什么？",
    answer:
      "提取对象职责 → 定义构造不变量 → 创建实例状态 → 沿原型共享方法 → 组合或继承行为 → 检查所有权与替换原则",
    tags: ["第 4 章 面向对象编程", "机制链"],
  },
  {
    id: "jfs-04-object-oriented-programming-4",
    chapter: "jfs-04-object-oriented-programming",
    level: 3,
    question: "第 4 章 面向对象编程为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 面向对象编程", "故障注入"],
  },
  {
    id: "jfs-04-object-oriented-programming-5",
    chapter: "jfs-04-object-oriented-programming",
    level: 3,
    question: "第 4 章 面向对象编程签发时保持什么不变量？",
    answer:
      "JavaScript 的面向对象建立在对象与原型委托之上；类语法提供更清晰的构造接口，但属性所有权、原型链和方法接收者仍是运行时真相。",
    tags: ["第 4 章 面向对象编程", "工程验收"],
  },
  {
    id: "jfs-04-object-oriented-programming-6",
    chapter: "jfs-04-object-oriented-programming",
    level: 3,
    question: "第 4 章 面向对象编程怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 4 章 面向对象编程", "可复现实验"],
  },
  {
    id: "jfs-05-asynchronous-programming-1",
    chapter: "jfs-05-asynchronous-programming",
    level: 1,
    question: "第 5 章 异步编程的核心主张是什么？",
    answer:
      "异步编程把现在提交的工作与未来交付的结果分开；回调、Promise 和 async/await 只是表达手段，正确性取决于任务顺序、错误传播、取消和资源收敛。",
    tags: ["第 5 章 异步编程", "核心机制"],
  },
  {
    id: "jfs-05-asynchronous-programming-2",
    chapter: "jfs-05-asynchronous-programming",
    level: 2,
    question: "第 5 章 异步编程覆盖哪些公开目录条目？",
    answer:
      "第 5 章 异步编程、5.1 何谓异步编程、5.2 异步实现方案、5.3 异步流程控制、5.4 综合练习、本章小结",
    tags: ["第 5 章 异步编程", "目录覆盖"],
  },
  {
    id: "jfs-05-asynchronous-programming-3",
    chapter: "jfs-05-asynchronous-programming",
    level: 2,
    question: "第 5 章 异步编程的六阶段证据链是什么？",
    answer:
      "提交异步操作 → 让出当前调用栈 → 宿主完成外部工作 → 排队回调或反应 → 恢复并传播结果 → 取消或清理剩余任务",
    tags: ["第 5 章 异步编程", "机制链"],
  },
  {
    id: "jfs-05-asynchronous-programming-4",
    chapter: "jfs-05-asynchronous-programming",
    level: 3,
    question: "第 5 章 异步编程为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 异步编程", "故障注入"],
  },
  {
    id: "jfs-05-asynchronous-programming-5",
    chapter: "jfs-05-asynchronous-programming",
    level: 3,
    question: "第 5 章 异步编程签发时保持什么不变量？",
    answer:
      "异步编程把现在提交的工作与未来交付的结果分开；回调、Promise 和 async/await 只是表达手段，正确性取决于任务顺序、错误传播、取消和资源收敛。",
    tags: ["第 5 章 异步编程", "工程验收"],
  },
  {
    id: "jfs-05-asynchronous-programming-6",
    chapter: "jfs-05-asynchronous-programming",
    level: 3,
    question: "第 5 章 异步编程怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 5 章 异步编程", "可复现实验"],
  },
  {
    id: "jfs-06-frontend-overview-1",
    chapter: "jfs-06-frontend-overview",
    level: 1,
    question: "第 6 章 前端编程概述的核心主张是什么？",
    answer:
      "浏览器负责取得资源、解析文档、构建可视树并响应用户输入；前端 JavaScript 在安全沙箱中协调 DOM、事件、网络与存储，而不是替代 HTML 和 CSS。",
    tags: ["第 6 章 前端编程概述", "核心机制"],
  },
  {
    id: "jfs-06-frontend-overview-2",
    chapter: "jfs-06-frontend-overview",
    level: 2,
    question: "第 6 章 前端编程概述覆盖哪些公开目录条目？",
    answer:
      "第 6 章 前端编程概述、6.1 浏览器扮演的角色、6.2 明确前端开发任务、6.3 前端编程中的 JavaScript、6.4 前端编程对象、6.5 综合练习、本章小结",
    tags: ["第 6 章 前端编程概述", "目录覆盖"],
  },
  {
    id: "jfs-06-frontend-overview-3",
    chapter: "jfs-06-frontend-overview",
    level: 2,
    question: "第 6 章 前端编程概述的六阶段证据链是什么？",
    answer:
      "请求页面资源 → 解析 HTML 与 CSS → 创建文档和窗口对象 → 加载并执行脚本 → 响应输入和网络 → 更新界面并释放监听",
    tags: ["第 6 章 前端编程概述", "机制链"],
  },
  {
    id: "jfs-06-frontend-overview-4",
    chapter: "jfs-06-frontend-overview",
    level: 3,
    question: "第 6 章 前端编程概述为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 6 章 前端编程概述", "故障注入"],
  },
  {
    id: "jfs-06-frontend-overview-5",
    chapter: "jfs-06-frontend-overview",
    level: 3,
    question: "第 6 章 前端编程概述签发时保持什么不变量？",
    answer:
      "浏览器负责取得资源、解析文档、构建可视树并响应用户输入；前端 JavaScript 在安全沙箱中协调 DOM、事件、网络与存储，而不是替代 HTML 和 CSS。",
    tags: ["第 6 章 前端编程概述", "工程验收"],
  },
  {
    id: "jfs-06-frontend-overview-6",
    chapter: "jfs-06-frontend-overview",
    level: 3,
    question: "第 6 章 前端编程概述怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 6 章 前端编程概述", "可复现实验"],
  },
  {
    id: "jfs-07-dom-standard-1",
    chapter: "jfs-07-dom-standard",
    level: 1,
    question: "第 7 章 DOM 标准与使用的核心主张是什么？",
    answer:
      "DOM 把文档表示为有类型、有父子关系的节点树；查询、遍历、创建、插入、替换和删除都必须维护节点身份、连接状态与文档结构。",
    tags: ["第 7 章 DOM 标准与使用", "核心机制"],
  },
  {
    id: "jfs-07-dom-standard-2",
    chapter: "jfs-07-dom-standard",
    level: 2,
    question: "第 7 章 DOM 标准与使用覆盖哪些公开目录条目？",
    answer:
      "第 7 章 DOM 标准与使用、7.1 DOM 的前世今生、7.2 DOM 的节点、7.3 综合练习、本章小结",
    tags: ["第 7 章 DOM 标准与使用", "目录覆盖"],
  },
  {
    id: "jfs-07-dom-standard-3",
    chapter: "jfs-07-dom-standard",
    level: 2,
    question: "第 7 章 DOM 标准与使用的六阶段证据链是什么？",
    answer:
      "解析文档节点 → 选择稳定根节点 → 遍历父子关系 → 创建离线片段 → 提交最小树变更 → 核对身份和可访问结构",
    tags: ["第 7 章 DOM 标准与使用", "机制链"],
  },
  {
    id: "jfs-07-dom-standard-4",
    chapter: "jfs-07-dom-standard",
    level: 3,
    question: "第 7 章 DOM 标准与使用为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 7 章 DOM 标准与使用", "故障注入"],
  },
  {
    id: "jfs-07-dom-standard-5",
    chapter: "jfs-07-dom-standard",
    level: 3,
    question: "第 7 章 DOM 标准与使用签发时保持什么不变量？",
    answer:
      "DOM 把文档表示为有类型、有父子关系的节点树；查询、遍历、创建、插入、替换和删除都必须维护节点身份、连接状态与文档结构。",
    tags: ["第 7 章 DOM 标准与使用", "工程验收"],
  },
  {
    id: "jfs-07-dom-standard-6",
    chapter: "jfs-07-dom-standard",
    level: 3,
    question: "第 7 章 DOM 标准与使用怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 7 章 DOM 标准与使用", "可复现实验"],
  },
  {
    id: "jfs-08-dom-extensions-bom-1",
    chapter: "jfs-08-dom-extensions-bom",
    level: 1,
    question: "第 8 章 DOM 扩展与 BOM的核心主张是什么？",
    answer:
      "现代选择器、classList、dataset 等 DOM 扩展简化节点操作，BOM 则描述窗口、地址、历史、设备和计时器；两者的边界是文档内容与浏览上下文。",
    tags: ["第 8 章 DOM 扩展与 BOM", "核心机制"],
  },
  {
    id: "jfs-08-dom-extensions-bom-2",
    chapter: "jfs-08-dom-extensions-bom",
    level: 2,
    question: "第 8 章 DOM 扩展与 BOM覆盖哪些公开目录条目？",
    answer:
      "第 8 章 DOM 扩展与 BOM、8.1 常用的 DOM 接口、8.2 浏览器对象模型、8.3 综合练习、本章小结",
    tags: ["第 8 章 DOM 扩展与 BOM", "目录覆盖"],
  },
  {
    id: "jfs-08-dom-extensions-bom-3",
    chapter: "jfs-08-dom-extensions-bom",
    level: 2,
    question: "第 8 章 DOM 扩展与 BOM的六阶段证据链是什么？",
    answer:
      "用选择器定位节点 → 读写类与数据属性 → 测量窗口和元素 → 解析地址与历史 → 调度计时任务 → 撤销全局副作用",
    tags: ["第 8 章 DOM 扩展与 BOM", "机制链"],
  },
  {
    id: "jfs-08-dom-extensions-bom-4",
    chapter: "jfs-08-dom-extensions-bom",
    level: 3,
    question: "第 8 章 DOM 扩展与 BOM为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 8 章 DOM 扩展与 BOM", "故障注入"],
  },
  {
    id: "jfs-08-dom-extensions-bom-5",
    chapter: "jfs-08-dom-extensions-bom",
    level: 3,
    question: "第 8 章 DOM 扩展与 BOM签发时保持什么不变量？",
    answer:
      "现代选择器、classList、dataset 等 DOM 扩展简化节点操作，BOM 则描述窗口、地址、历史、设备和计时器；两者的边界是文档内容与浏览上下文。",
    tags: ["第 8 章 DOM 扩展与 BOM", "工程验收"],
  },
  {
    id: "jfs-08-dom-extensions-bom-6",
    chapter: "jfs-08-dom-extensions-bom",
    level: 3,
    question: "第 8 章 DOM 扩展与 BOM怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 8 章 DOM 扩展与 BOM", "可复现实验"],
  },
  {
    id: "jfs-09-frontend-events-1",
    chapter: "jfs-09-frontend-events",
    level: 1,
    question: "第 9 章 前端事件处理的核心主张是什么？",
    answer:
      "浏览器事件沿捕获、目标和冒泡阶段传播；处理函数必须区分 target 与 currentTarget，明确默认动作、传播控制、委托范围和解除注册责任。",
    tags: ["第 9 章 前端事件处理", "核心机制"],
  },
  {
    id: "jfs-09-frontend-events-2",
    chapter: "jfs-09-frontend-events",
    level: 2,
    question: "第 9 章 前端事件处理覆盖哪些公开目录条目？",
    answer:
      "第 9 章 前端事件处理、9.1 了解前端事件机制、9.2 注册事件处理函数、9.3 综合练习、本章小结",
    tags: ["第 9 章 前端事件处理", "目录覆盖"],
  },
  {
    id: "jfs-09-frontend-events-3",
    chapter: "jfs-09-frontend-events",
    level: 2,
    question: "第 9 章 前端事件处理的六阶段证据链是什么？",
    answer:
      "宿主创建事件 → 沿祖先执行捕获 → 到达目标节点 → 沿祖先执行冒泡 → 决定默认动作 → 解除监听并释放引用",
    tags: ["第 9 章 前端事件处理", "机制链"],
  },
  {
    id: "jfs-09-frontend-events-4",
    chapter: "jfs-09-frontend-events",
    level: 3,
    question: "第 9 章 前端事件处理为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 9 章 前端事件处理", "故障注入"],
  },
  {
    id: "jfs-09-frontend-events-5",
    chapter: "jfs-09-frontend-events",
    level: 3,
    question: "第 9 章 前端事件处理签发时保持什么不变量？",
    answer:
      "浏览器事件沿捕获、目标和冒泡阶段传播；处理函数必须区分 target 与 currentTarget，明确默认动作、传播控制、委托范围和解除注册责任。",
    tags: ["第 9 章 前端事件处理", "工程验收"],
  },
  {
    id: "jfs-09-frontend-events-6",
    chapter: "jfs-09-frontend-events",
    level: 3,
    question: "第 9 章 前端事件处理怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 9 章 前端事件处理", "可复现实验"],
  },
  {
    id: "jfs-10-ajax-programming-1",
    chapter: "jfs-10-ajax-programming",
    level: 1,
    question: "第 10 章 AJAX 编程方法的核心主张是什么？",
    answer:
      "AJAX 在不重新导航整页的前提下发起 HTTP 请求并局部更新界面；可靠封装必须统一地址、方法、头、正文、超时、取消、状态码和解析错误。",
    tags: ["第 10 章 AJAX 编程方法", "核心机制"],
  },
  {
    id: "jfs-10-ajax-programming-2",
    chapter: "jfs-10-ajax-programming",
    level: 2,
    question: "第 10 章 AJAX 编程方法覆盖哪些公开目录条目？",
    answer:
      "第 10 章 AJAX 编程方法、10.1 AJAX 编程基础、10.2 不要重复发明轮子、10.3 综合练习、本章小结",
    tags: ["第 10 章 AJAX 编程方法", "目录覆盖"],
  },
  {
    id: "jfs-10-ajax-programming-3",
    chapter: "jfs-10-ajax-programming",
    level: 2,
    question: "第 10 章 AJAX 编程方法的六阶段证据链是什么？",
    answer:
      "构造请求契约 → 发送异步 HTTP → 等待响应头和正文 → 按状态码分类 → 解析并提交界面 → 取消迟到请求",
    tags: ["第 10 章 AJAX 编程方法", "机制链"],
  },
  {
    id: "jfs-10-ajax-programming-4",
    chapter: "jfs-10-ajax-programming",
    level: 3,
    question: "第 10 章 AJAX 编程方法为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 10 章 AJAX 编程方法", "故障注入"],
  },
  {
    id: "jfs-10-ajax-programming-5",
    chapter: "jfs-10-ajax-programming",
    level: 3,
    question: "第 10 章 AJAX 编程方法签发时保持什么不变量？",
    answer:
      "AJAX 在不重新导航整页的前提下发起 HTTP 请求并局部更新界面；可靠封装必须统一地址、方法、头、正文、超时、取消、状态码和解析错误。",
    tags: ["第 10 章 AJAX 编程方法", "工程验收"],
  },
  {
    id: "jfs-10-ajax-programming-6",
    chapter: "jfs-10-ajax-programming",
    level: 3,
    question: "第 10 章 AJAX 编程方法怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 10 章 AJAX 编程方法", "可复现实验"],
  },
  {
    id: "jfs-11-nodejs-overview-1",
    chapter: "jfs-11-nodejs-overview",
    level: 1,
    question: "第 11 章 Node.js 概述的核心主张是什么？",
    answer:
      "Node.js 把 JavaScript 引擎、libuv 事件循环和操作系统能力组合成服务器运行时；它擅长并发 I/O，但同步重计算仍会阻塞单个事件循环。",
    tags: ["第 11 章 Node.js 概述", "核心机制"],
  },
  {
    id: "jfs-11-nodejs-overview-2",
    chapter: "jfs-11-nodejs-overview",
    level: 2,
    question: "第 11 章 Node.js 概述覆盖哪些公开目录条目？",
    answer:
      "第 11 章 Node.js 概述、11.1 Node.js 的前世今生、11.2 Node.js 的技术特性、11.3 Node.js 的简单入门、11.4 综合练习、本章小结",
    tags: ["第 11 章 Node.js 概述", "目录覆盖"],
  },
  {
    id: "jfs-11-nodejs-overview-3",
    chapter: "jfs-11-nodejs-overview",
    level: 2,
    question: "第 11 章 Node.js 概述的六阶段证据链是什么？",
    answer:
      "启动 Node 进程 → 装载模块 → 提交文件或网络 I/O → 由 libuv 等待完成 → 回到回调或 Promise → 处理退出与未决资源",
    tags: ["第 11 章 Node.js 概述", "机制链"],
  },
  {
    id: "jfs-11-nodejs-overview-4",
    chapter: "jfs-11-nodejs-overview",
    level: 3,
    question: "第 11 章 Node.js 概述为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 11 章 Node.js 概述", "故障注入"],
  },
  {
    id: "jfs-11-nodejs-overview-5",
    chapter: "jfs-11-nodejs-overview",
    level: 3,
    question: "第 11 章 Node.js 概述签发时保持什么不变量？",
    answer:
      "Node.js 把 JavaScript 引擎、libuv 事件循环和操作系统能力组合成服务器运行时；它擅长并发 I/O，但同步重计算仍会阻塞单个事件循环。",
    tags: ["第 11 章 Node.js 概述", "工程验收"],
  },
  {
    id: "jfs-11-nodejs-overview-6",
    chapter: "jfs-11-nodejs-overview",
    level: 3,
    question: "第 11 章 Node.js 概述怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 11 章 Node.js 概述", "可复现实验"],
  },
  {
    id: "jfs-12-build-web-services-1",
    chapter: "jfs-12-build-web-services",
    level: 1,
    question: "第 12 章 构建 Web 服务的核心主张是什么？",
    answer:
      "Web 服务是 HTTP 请求到响应的状态机；Node.js 的 http 模块直接暴露方法、目标、头、正文流、状态码和响应流，使协议边界能够被逐项验证。",
    tags: ["第 12 章 构建 Web 服务", "核心机制"],
  },
  {
    id: "jfs-12-build-web-services-2",
    chapter: "jfs-12-build-web-services",
    level: 2,
    question: "第 12 章 构建 Web 服务覆盖哪些公开目录条目？",
    answer:
      "第 12 章 构建 Web 服务、12.1 了解 HTTP、12.2 创建 Web 服务器、12.3 综合练习、本章小结",
    tags: ["第 12 章 构建 Web 服务", "目录覆盖"],
  },
  {
    id: "jfs-12-build-web-services-3",
    chapter: "jfs-12-build-web-services",
    level: 2,
    question: "第 12 章 构建 Web 服务的六阶段证据链是什么？",
    answer:
      "监听 TCP 端口 → 接收 HTTP 请求头 → 选择方法和路径 → 读取或跳过正文 → 写入状态头与正文 → 结束响应并记录耗时",
    tags: ["第 12 章 构建 Web 服务", "机制链"],
  },
  {
    id: "jfs-12-build-web-services-4",
    chapter: "jfs-12-build-web-services",
    level: 3,
    question: "第 12 章 构建 Web 服务为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 12 章 构建 Web 服务", "故障注入"],
  },
  {
    id: "jfs-12-build-web-services-5",
    chapter: "jfs-12-build-web-services",
    level: 3,
    question: "第 12 章 构建 Web 服务签发时保持什么不变量？",
    answer:
      "Web 服务是 HTTP 请求到响应的状态机；Node.js 的 http 模块直接暴露方法、目标、头、正文流、状态码和响应流，使协议边界能够被逐项验证。",
    tags: ["第 12 章 构建 Web 服务", "工程验收"],
  },
  {
    id: "jfs-12-build-web-services-6",
    chapter: "jfs-12-build-web-services",
    level: 3,
    question: "第 12 章 构建 Web 服务怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 12 章 构建 Web 服务", "可复现实验"],
  },
  {
    id: "jfs-13-handle-client-requests-1",
    chapter: "jfs-13-handle-client-requests",
    level: 1,
    question: "第 13 章 响应客户请求的核心主张是什么？",
    answer:
      "可靠服务器先解析并限制请求，再选择表示形式和模板生成响应；路由、正文读取、内容协商、静态文件和模板输出都必须防止越界输入与重复响应。",
    tags: ["第 13 章 响应客户请求", "核心机制"],
  },
  {
    id: "jfs-13-handle-client-requests-2",
    chapter: "jfs-13-handle-client-requests",
    level: 2,
    question: "第 13 章 响应客户请求覆盖哪些公开目录条目？",
    answer:
      "第 13 章 响应客户请求、13.1 分析客户请求、13.2 返回响应数据、13.3 生成响应数据、13.4 模板引擎简介、13.5 综合练习、本章小结",
    tags: ["第 13 章 响应客户请求", "目录覆盖"],
  },
  {
    id: "jfs-13-handle-client-requests-3",
    chapter: "jfs-13-handle-client-requests",
    level: 2,
    question: "第 13 章 响应客户请求的六阶段证据链是什么？",
    answer:
      "规范化方法和 URL → 限制并读取请求体 → 匹配路由处理器 → 选择静态或动态数据 → 安全渲染表示 → 一次性提交响应",
    tags: ["第 13 章 响应客户请求", "机制链"],
  },
  {
    id: "jfs-13-handle-client-requests-4",
    chapter: "jfs-13-handle-client-requests",
    level: 3,
    question: "第 13 章 响应客户请求为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 13 章 响应客户请求", "故障注入"],
  },
  {
    id: "jfs-13-handle-client-requests-5",
    chapter: "jfs-13-handle-client-requests",
    level: 3,
    question: "第 13 章 响应客户请求签发时保持什么不变量？",
    answer:
      "可靠服务器先解析并限制请求，再选择表示形式和模板生成响应；路由、正文读取、内容协商、静态文件和模板输出都必须防止越界输入与重复响应。",
    tags: ["第 13 章 响应客户请求", "工程验收"],
  },
  {
    id: "jfs-13-handle-client-requests-6",
    chapter: "jfs-13-handle-client-requests",
    level: 3,
    question: "第 13 章 响应客户请求怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 13 章 响应客户请求", "可复现实验"],
  },
  {
    id: "jfs-14-data-persistence-1",
    chapter: "jfs-14-data-persistence",
    level: 1,
    question: "第 14 章 实现数据存取的核心主张是什么？",
    answer:
      "程序状态要跨请求和重启存在，就必须明确内存、文件、会话与数据库的生命周期；数据库访问还需参数化查询、事务边界、连接释放和错误回滚。",
    tags: ["第 14 章 实现数据存取", "核心机制"],
  },
  {
    id: "jfs-14-data-persistence-2",
    chapter: "jfs-14-data-persistence",
    level: 2,
    question: "第 14 章 实现数据存取覆盖哪些公开目录条目？",
    answer:
      "第 14 章 实现数据存取、14.1 保存程序运行状态、14.2 使用数据库存取数据、14.3 综合练习、本章小结",
    tags: ["第 14 章 实现数据存取", "目录覆盖"],
  },
  {
    id: "jfs-14-data-persistence-3",
    chapter: "jfs-14-data-persistence",
    level: 2,
    question: "第 14 章 实现数据存取的六阶段证据链是什么？",
    answer:
      "识别状态所有者 → 选择持久化介质 → 校验并编码数据 → 执行参数化读写 → 提交或回滚事务 → 关闭连接并重读验证",
    tags: ["第 14 章 实现数据存取", "机制链"],
  },
  {
    id: "jfs-14-data-persistence-4",
    chapter: "jfs-14-data-persistence",
    level: 3,
    question: "第 14 章 实现数据存取为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 14 章 实现数据存取", "故障注入"],
  },
  {
    id: "jfs-14-data-persistence-5",
    chapter: "jfs-14-data-persistence",
    level: 3,
    question: "第 14 章 实现数据存取签发时保持什么不变量？",
    answer:
      "程序状态要跨请求和重启存在，就必须明确内存、文件、会话与数据库的生命周期；数据库访问还需参数化查询、事务边界、连接释放和错误回滚。",
    tags: ["第 14 章 实现数据存取", "工程验收"],
  },
  {
    id: "jfs-14-data-persistence-6",
    chapter: "jfs-14-data-persistence",
    level: 3,
    question: "第 14 章 实现数据存取怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["第 14 章 实现数据存取", "可复现实验"],
  },
  {
    id: "jfs-official-final-review-1",
    chapter: "jfs-official-final-review",
    level: 1,
    question: "《JavaScript 全栈开发》全书总复习的核心主张是什么？",
    answer:
      "全书最终验收不是记住若干 API，而是能让同一份业务数据从语言值和对象出发，经浏览器事件与 AJAX 到达 Node.js HTTP 服务和数据库，再安全返回并更新 DOM。",
    tags: ["《JavaScript 全栈开发》全书总复习", "核心机制"],
  },
  {
    id: "jfs-official-final-review-2",
    chapter: "jfs-official-final-review",
    level: 2,
    question: "《JavaScript 全栈开发》全书总复习覆盖哪些公开目录条目？",
    answer:
      "第一部分 JavaScript 核心、第二部分 浏览器端的 JavaScript、第三部分 服务器端的 JavaScript、第 1 章 JavaScript 简介、第 2 章 变量、表达式与语句、第 3 章 函数与对象、第 4 章 面向对象编程、第 5 章 异步编程、第 6 章 前端编程概述、第 7 章 DOM 标准与使用、第 8 章 DOM 扩展与 BOM、第 9 章 前端事件处理、第 10 章 AJAX 编程方法、第 11 章 Node.js 概述、第 12 章 构建 Web 服务、第 13 章 响应客户请求、第 14 章 实现数据存取",
    tags: ["《JavaScript 全栈开发》全书总复习", "目录覆盖"],
  },
  {
    id: "jfs-official-final-review-3",
    chapter: "jfs-official-final-review",
    level: 2,
    question: "《JavaScript 全栈开发》全书总复习的六阶段证据链是什么？",
    answer:
      "冻结业务输入 → 浏览器采集与校验 → 发送 HTTP 请求 → Node 解析并执行业务 → 事务化保存数据 → 返回并更新界面",
    tags: ["《JavaScript 全栈开发》全书总复习", "机制链"],
  },
  {
    id: "jfs-official-final-review-4",
    chapter: "jfs-official-final-review",
    level: 3,
    question: "《JavaScript 全栈开发》全书总复习为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏对象别名、异步顺序、DOM 状态、HTTP 分支和持久化副作用，必须保存首个偏离点与恢复轨迹。",
    tags: ["《JavaScript 全栈开发》全书总复习", "故障注入"],
  },
  {
    id: "jfs-official-final-review-5",
    chapter: "jfs-official-final-review",
    level: 3,
    question: "《JavaScript 全栈开发》全书总复习签发时保持什么不变量？",
    answer:
      "全书最终验收不是记住若干 API，而是能让同一份业务数据从语言值和对象出发，经浏览器事件与 AJAX 到达 Node.js HTTP 服务和数据库，再安全返回并更新 DOM。",
    tags: ["《JavaScript 全栈开发》全书总复习", "工程验收"],
  },
  {
    id: "jfs-official-final-review-6",
    chapter: "jfs-official-final-review",
    level: 3,
    question: "《JavaScript 全栈开发》全书总复习怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、对象、任务、宿主资源、首偏离点与清理动作。",
    tags: ["《JavaScript 全栈开发》全书总复习", "可复现实验"],
  },
];
