import type { ReviewQuestion } from "./types";

export const ydkOfficialQuestions = [
  {
    id: "ydk-official-learning-map-1",
    chapter: "ydk-official-learning-map",
    level: 1,
    question: "《你不知道的 JavaScript》权威学习地图的核心主张是什么？",
    answer:
      "中文版三卷实际聚合一版英文六册。站内按中文版卷序保留 40 个正式单元，并用作用域、对象、类型、异步、入门与语言演进六条证据链连接 211 个公开目录条目。",
    tags: ["《你不知道的 JavaScript》权威学习地图", "核心机制"],
  },
  {
    id: "ydk-official-learning-map-2",
    chapter: "ydk-official-learning-map",
    level: 2,
    question: "《你不知道的 JavaScript》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "You Don't Know JS, first-edition series map、上卷：Scope & Closures、上卷：this & Object Prototypes、中卷：Types & Grammar、中卷：Async & Performance、下卷：Up & Going、下卷：ES6 & Beyond",
    tags: ["《你不知道的 JavaScript》权威学习地图", "目录覆盖"],
  },
  {
    id: "ydk-official-learning-map-3",
    chapter: "ydk-official-learning-map",
    level: 2,
    question: "《你不知道的 JavaScript》权威学习地图的六阶段证据链是什么？",
    answer:
      "锁定中文版三卷身份 → 映射一版英文六册 → 逐项登记正式目录 → 为每章建立运行轨迹 → 披露历史提案状态 → 用题库与故障样本签发",
    tags: ["《你不知道的 JavaScript》权威学习地图", "机制链"],
  },
  {
    id: "ydk-official-learning-map-4",
    chapter: "ydk-official-learning-map",
    level: 3,
    question: "《你不知道的 JavaScript》权威学习地图为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["《你不知道的 JavaScript》权威学习地图", "故障注入"],
  },
  {
    id: "ydk-official-learning-map-5",
    chapter: "ydk-official-learning-map",
    level: 3,
    question: "《你不知道的 JavaScript》权威学习地图签发时保持什么不变量？",
    answer:
      "中文版三卷实际聚合一版英文六册。站内按中文版卷序保留 40 个正式单元，并用作用域、对象、类型、异步、入门与语言演进六条证据链连接 211 个公开目录条目。",
    tags: ["《你不知道的 JavaScript》权威学习地图", "工程验收"],
  },
  {
    id: "ydk-official-learning-map-6",
    chapter: "ydk-official-learning-map",
    level: 3,
    question: "《你不知道的 JavaScript》权威学习地图怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["《你不知道的 JavaScript》权威学习地图", "可复现实验"],
  },
  {
    id: "ydk-scope-01-what-is-scope-1",
    chapter: "ydk-scope-01-what-is-scope",
    level: 1,
    question: "第 1 章 作用域是什么的核心主张是什么？",
    answer:
      "JavaScript 在执行前先经历编译；声明与赋值会被拆成编译器和引擎的两段工作，LHS 与 RHS 查询沿作用域链寻找标识符，并以不同错误结束。",
    tags: ["第 1 章 作用域是什么", "核心机制"],
  },
  {
    id: "ydk-scope-01-what-is-scope-2",
    chapter: "ydk-scope-01-what-is-scope",
    level: 2,
    question: "第 1 章 作用域是什么覆盖哪些权威目录条目？",
    answer:
      "Chapter 1: What is Scope?、Compiler Theory、Understanding Scope、Nested Scope、Errors",
    tags: ["第 1 章 作用域是什么", "目录覆盖"],
  },
  {
    id: "ydk-scope-01-what-is-scope-3",
    chapter: "ydk-scope-01-what-is-scope",
    level: 2,
    question: "第 1 章 作用域是什么的六阶段证据链是什么？",
    answer:
      "分词并形成语法结构 → 编译器登记声明 → 引擎执行赋值或取值 → 当前作用域响应查询 → 未命中时向外层查找 → 按查询类型产生结果或错误",
    tags: ["第 1 章 作用域是什么", "机制链"],
  },
  {
    id: "ydk-scope-01-what-is-scope-4",
    chapter: "ydk-scope-01-what-is-scope",
    level: 3,
    question: "第 1 章 作用域是什么为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 作用域是什么", "故障注入"],
  },
  {
    id: "ydk-scope-01-what-is-scope-5",
    chapter: "ydk-scope-01-what-is-scope",
    level: 3,
    question: "第 1 章 作用域是什么签发时保持什么不变量？",
    answer:
      "JavaScript 在执行前先经历编译；声明与赋值会被拆成编译器和引擎的两段工作，LHS 与 RHS 查询沿作用域链寻找标识符，并以不同错误结束。",
    tags: ["第 1 章 作用域是什么", "工程验收"],
  },
  {
    id: "ydk-scope-01-what-is-scope-6",
    chapter: "ydk-scope-01-what-is-scope",
    level: 3,
    question: "第 1 章 作用域是什么怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 作用域是什么", "可复现实验"],
  },
  {
    id: "ydk-scope-02-lexical-scope-1",
    chapter: "ydk-scope-02-lexical-scope",
    level: 1,
    question: "第 2 章 词法作用域的核心主张是什么？",
    answer:
      "词法作用域由函数书写位置决定而非调用位置决定；eval 与 with 虽能在运行时伪装或扩展查找环境，却会破坏静态分析与优化。",
    tags: ["第 2 章 词法作用域", "核心机制"],
  },
  {
    id: "ydk-scope-02-lexical-scope-2",
    chapter: "ydk-scope-02-lexical-scope",
    level: 2,
    question: "第 2 章 词法作用域覆盖哪些权威目录条目？",
    answer: "Chapter 2: Lexical Scope、Lex-time、Cheating Lexical",
    tags: ["第 2 章 词法作用域", "目录覆盖"],
  },
  {
    id: "ydk-scope-02-lexical-scope-3",
    chapter: "ydk-scope-02-lexical-scope",
    level: 2,
    question: "第 2 章 词法作用域的六阶段证据链是什么？",
    answer:
      "按源码位置创建作用域 → 为每层登记标识符 → 从内向外解析引用 → 在首个命中处停止 → 识别运行时作弊入口 → 禁用作弊并恢复可分析性",
    tags: ["第 2 章 词法作用域", "机制链"],
  },
  {
    id: "ydk-scope-02-lexical-scope-4",
    chapter: "ydk-scope-02-lexical-scope",
    level: 3,
    question: "第 2 章 词法作用域为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 词法作用域", "故障注入"],
  },
  {
    id: "ydk-scope-02-lexical-scope-5",
    chapter: "ydk-scope-02-lexical-scope",
    level: 3,
    question: "第 2 章 词法作用域签发时保持什么不变量？",
    answer:
      "词法作用域由函数书写位置决定而非调用位置决定；eval 与 with 虽能在运行时伪装或扩展查找环境，却会破坏静态分析与优化。",
    tags: ["第 2 章 词法作用域", "工程验收"],
  },
  {
    id: "ydk-scope-02-lexical-scope-6",
    chapter: "ydk-scope-02-lexical-scope",
    level: 3,
    question: "第 2 章 词法作用域怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 词法作用域", "可复现实验"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-1",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 1,
    question: "第 3 章 函数作用域和块作用域的核心主张是什么？",
    answer:
      "函数作用域用于隐藏实现、避免名称冲突并形成最小公开面；IIFE 把声明包入表达式，let、const 与 catch 则让块本身成为生命周期边界。",
    tags: ["第 3 章 函数作用域和块作用域", "核心机制"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-2",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 2,
    question: "第 3 章 函数作用域和块作用域覆盖哪些权威目录条目？",
    answer:
      "Chapter 3: Function vs. Block Scope、Scope From Functions、Hiding In Plain Scope、Functions As Scopes、Blocks As Scopes",
    tags: ["第 3 章 函数作用域和块作用域", "目录覆盖"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-3",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 2,
    question: "第 3 章 函数作用域和块作用域的六阶段证据链是什么？",
    answer:
      "识别应隐藏的实现 → 用函数建立私有边界 → 把函数声明转为表达式 → 用块缩短临时值生命周期 → 检查遮蔽与冲突 → 只暴露必要能力",
    tags: ["第 3 章 函数作用域和块作用域", "机制链"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-4",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 3,
    question: "第 3 章 函数作用域和块作用域为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 函数作用域和块作用域", "故障注入"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-5",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 3,
    question: "第 3 章 函数作用域和块作用域签发时保持什么不变量？",
    answer:
      "函数作用域用于隐藏实现、避免名称冲突并形成最小公开面；IIFE 把声明包入表达式，let、const 与 catch 则让块本身成为生命周期边界。",
    tags: ["第 3 章 函数作用域和块作用域", "工程验收"],
  },
  {
    id: "ydk-scope-03-function-vs-block-scope-6",
    chapter: "ydk-scope-03-function-vs-block-scope",
    level: 3,
    question: "第 3 章 函数作用域和块作用域怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 函数作用域和块作用域", "可复现实验"],
  },
  {
    id: "ydk-scope-04-hoisting-1",
    chapter: "ydk-scope-04-hoisting",
    level: 1,
    question: "第 4 章 提升的核心主张是什么？",
    answer:
      "所谓提升是声明在编译阶段先被登记的观察结果，而不是源码真的移动；函数声明整体可用，var 只先建立绑定，重复声明时函数声明优先。",
    tags: ["第 4 章 提升", "核心机制"],
  },
  {
    id: "ydk-scope-04-hoisting-2",
    chapter: "ydk-scope-04-hoisting",
    level: 2,
    question: "第 4 章 提升覆盖哪些权威目录条目？",
    answer:
      "Chapter 4: Hoisting、Chicken Or The Egg?、The Compiler Strikes Again、Functions First",
    tags: ["第 4 章 提升", "目录覆盖"],
  },
  {
    id: "ydk-scope-04-hoisting-3",
    chapter: "ydk-scope-04-hoisting",
    level: 2,
    question: "第 4 章 提升的六阶段证据链是什么？",
    answer:
      "扫描当前作用域声明 → 登记函数声明 → 登记变量绑定 → 忽略重复 var 登记 → 进入执行阶段完成赋值 → 按实际执行点读取值",
    tags: ["第 4 章 提升", "机制链"],
  },
  {
    id: "ydk-scope-04-hoisting-4",
    chapter: "ydk-scope-04-hoisting",
    level: 3,
    question: "第 4 章 提升为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 提升", "故障注入"],
  },
  {
    id: "ydk-scope-04-hoisting-5",
    chapter: "ydk-scope-04-hoisting",
    level: 3,
    question: "第 4 章 提升签发时保持什么不变量？",
    answer:
      "所谓提升是声明在编译阶段先被登记的观察结果，而不是源码真的移动；函数声明整体可用，var 只先建立绑定，重复声明时函数声明优先。",
    tags: ["第 4 章 提升", "工程验收"],
  },
  {
    id: "ydk-scope-04-hoisting-6",
    chapter: "ydk-scope-04-hoisting",
    level: 3,
    question: "第 4 章 提升怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 4 章 提升", "可复现实验"],
  },
  {
    id: "ydk-scope-05-scope-closures-1",
    chapter: "ydk-scope-05-scope-closures",
    level: 1,
    question: "第 5 章 作用域闭包的核心主张是什么？",
    answer:
      "闭包是函数在定义它的词法作用域之外执行时仍能访问该作用域的能力；循环回调暴露共享绑定问题，模块模式则把闭包转化为持久私有状态与显式 API。",
    tags: ["第 5 章 作用域闭包", "核心机制"],
  },
  {
    id: "ydk-scope-05-scope-closures-2",
    chapter: "ydk-scope-05-scope-closures",
    level: 2,
    question: "第 5 章 作用域闭包覆盖哪些权威目录条目？",
    answer:
      "Chapter 5: Scope Closures、Enlightenment、Nitty Gritty、Now I Can See、Loops + Closure、Modules",
    tags: ["第 5 章 作用域闭包", "目录覆盖"],
  },
  {
    id: "ydk-scope-05-scope-closures-3",
    chapter: "ydk-scope-05-scope-closures",
    level: 2,
    question: "第 5 章 作用域闭包的六阶段证据链是什么？",
    answer:
      "在外层作用域创建绑定 → 定义引用该绑定的函数 → 把函数传出原作用域 → 外层调用栈结束 → 函数再次执行并解析自由变量 → 通过公开方法约束状态访问",
    tags: ["第 5 章 作用域闭包", "机制链"],
  },
  {
    id: "ydk-scope-05-scope-closures-4",
    chapter: "ydk-scope-05-scope-closures",
    level: 3,
    question: "第 5 章 作用域闭包为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 作用域闭包", "故障注入"],
  },
  {
    id: "ydk-scope-05-scope-closures-5",
    chapter: "ydk-scope-05-scope-closures",
    level: 3,
    question: "第 5 章 作用域闭包签发时保持什么不变量？",
    answer:
      "闭包是函数在定义它的词法作用域之外执行时仍能访问该作用域的能力；循环回调暴露共享绑定问题，模块模式则把闭包转化为持久私有状态与显式 API。",
    tags: ["第 5 章 作用域闭包", "工程验收"],
  },
  {
    id: "ydk-scope-05-scope-closures-6",
    chapter: "ydk-scope-05-scope-closures",
    level: 3,
    question: "第 5 章 作用域闭包怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 5 章 作用域闭包", "可复现实验"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-1",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 1,
    question: "附录 A 动态作用域的核心主张是什么？",
    answer:
      "动态作用域按运行时调用栈而非源码嵌套关系寻找变量；JavaScript 本身采用词法作用域，但把两者对照能解释 this 为何也不是词法变量查找。",
    tags: ["附录 A 动态作用域", "核心机制"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-2",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 2,
    question: "附录 A 动态作用域覆盖哪些权威目录条目？",
    answer: "Appendix A: Dynamic Scope",
    tags: ["附录 A 动态作用域", "目录覆盖"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-3",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 2,
    question: "附录 A 动态作用域的六阶段证据链是什么？",
    answer:
      "函数开始执行 → 当前环境未命中名称 → 检查调用者环境 → 沿调用栈继续向上 → 在最近动态绑定处停止 → 与 JavaScript 词法结果对照",
    tags: ["附录 A 动态作用域", "机制链"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-4",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 3,
    question: "附录 A 动态作用域为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 A 动态作用域", "故障注入"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-5",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 3,
    question: "附录 A 动态作用域签发时保持什么不变量？",
    answer:
      "动态作用域按运行时调用栈而非源码嵌套关系寻找变量；JavaScript 本身采用词法作用域，但把两者对照能解释 this 为何也不是词法变量查找。",
    tags: ["附录 A 动态作用域", "工程验收"],
  },
  {
    id: "ydk-scope-appendix-a-dynamic-scope-6",
    chapter: "ydk-scope-appendix-a-dynamic-scope",
    level: 3,
    question: "附录 A 动态作用域怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 A 动态作用域", "可复现实验"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-1",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 1,
    question: "附录 B 块作用域的替代方案的核心主张是什么？",
    answer:
      "在原书的 ES6 迁移语境中，显式代码变换可把 let 风格的块生命周期降级为函数作用域；现代工程应交给经过验证的转译器，并保留语义差异测试。",
    tags: ["附录 B 块作用域的替代方案", "核心机制"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-2",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 2,
    question: "附录 B 块作用域的替代方案覆盖哪些权威目录条目？",
    answer: "Appendix B: Polyfilling Block Scope",
    tags: ["附录 B 块作用域的替代方案", "目录覆盖"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-3",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 2,
    question: "附录 B 块作用域的替代方案的六阶段证据链是什么？",
    answer:
      "识别块级声明 → 分析捕获与重赋值 → 生成函数包装 → 重写引用位置 → 执行旧环境版本 → 用行为测试核对等价性",
    tags: ["附录 B 块作用域的替代方案", "机制链"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-4",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 3,
    question: "附录 B 块作用域的替代方案为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 B 块作用域的替代方案", "故障注入"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-5",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 3,
    question: "附录 B 块作用域的替代方案签发时保持什么不变量？",
    answer:
      "在原书的 ES6 迁移语境中，显式代码变换可把 let 风格的块生命周期降级为函数作用域；现代工程应交给经过验证的转译器，并保留语义差异测试。",
    tags: ["附录 B 块作用域的替代方案", "工程验收"],
  },
  {
    id: "ydk-scope-appendix-b-block-scope-polyfill-6",
    chapter: "ydk-scope-appendix-b-block-scope-polyfill",
    level: 3,
    question: "附录 B 块作用域的替代方案怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 B 块作用域的替代方案", "可复现实验"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-1",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 1,
    question: "附录 C this 词法的核心主张是什么？",
    answer:
      "箭头函数不建立自己的 this，而是像普通词法变量一样捕获外层 this；它适合保留上下文，却不适合作为需要动态接收者的方法或构造器。",
    tags: ["附录 C this 词法", "核心机制"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-2",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 2,
    question: "附录 C this 词法覆盖哪些权威目录条目？",
    answer: "Appendix C: Lexical-this",
    tags: ["附录 C this 词法", "目录覆盖"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-3",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 2,
    question: "附录 C this 词法的六阶段证据链是什么？",
    answer:
      "进入普通函数调用 → 根据调用点确定外层 this → 创建箭头函数 → 箭头捕获外层绑定 → 异步回调稍后执行 → 仍读取同一 this",
    tags: ["附录 C this 词法", "机制链"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-4",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 3,
    question: "附录 C this 词法为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 C this 词法", "故障注入"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-5",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 3,
    question: "附录 C this 词法签发时保持什么不变量？",
    answer:
      "箭头函数不建立自己的 this，而是像普通词法变量一样捕获外层 this；它适合保留上下文，却不适合作为需要动态接收者的方法或构造器。",
    tags: ["附录 C this 词法", "工程验收"],
  },
  {
    id: "ydk-scope-appendix-c-lexical-this-6",
    chapter: "ydk-scope-appendix-c-lexical-this",
    level: 3,
    question: "附录 C this 词法怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 C this 词法", "可复现实验"],
  },
  {
    id: "ydk-this-01-this-or-that-1",
    chapter: "ydk-this-01-this-or-that",
    level: 1,
    question: "第 1 章 关于 this的核心主张是什么？",
    answer:
      "this 不是函数自身也不是词法作用域；它是函数执行时依据调用点建立的上下文绑定，使同一函数可以复用于不同对象。",
    tags: ["第 1 章 关于 this", "核心机制"],
  },
  {
    id: "ydk-this-01-this-or-that-2",
    chapter: "ydk-this-01-this-or-that",
    level: 2,
    question: "第 1 章 关于 this覆盖哪些权威目录条目？",
    answer: "Chapter 1: this Or That?、Why this?、Confusions、What's this?",
    tags: ["第 1 章 关于 this", "目录覆盖"],
  },
  {
    id: "ydk-this-01-this-or-that-3",
    chapter: "ydk-this-01-this-or-that",
    level: 2,
    question: "第 1 章 关于 this的六阶段证据链是什么？",
    answer:
      "定义可复用函数 → 找到实际调用表达式 → 识别调用形式 → 按规则建立 this → 函数体读取接收者状态 → 返回后撤销本次绑定",
    tags: ["第 1 章 关于 this", "机制链"],
  },
  {
    id: "ydk-this-01-this-or-that-4",
    chapter: "ydk-this-01-this-or-that",
    level: 3,
    question: "第 1 章 关于 this为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 关于 this", "故障注入"],
  },
  {
    id: "ydk-this-01-this-or-that-5",
    chapter: "ydk-this-01-this-or-that",
    level: 3,
    question: "第 1 章 关于 this签发时保持什么不变量？",
    answer:
      "this 不是函数自身也不是词法作用域；它是函数执行时依据调用点建立的上下文绑定，使同一函数可以复用于不同对象。",
    tags: ["第 1 章 关于 this", "工程验收"],
  },
  {
    id: "ydk-this-01-this-or-that-6",
    chapter: "ydk-this-01-this-or-that",
    level: 3,
    question: "第 1 章 关于 this怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 关于 this", "可复现实验"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-1",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 1,
    question: "第 2 章 this 全面解析的核心主张是什么？",
    answer:
      "this 绑定按 new、显式、隐式、默认的优先级判定，并受绑定丢失、间接引用、装箱和箭头函数等例外影响；判断必须从调用点开始。",
    tags: ["第 2 章 this 全面解析", "核心机制"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-2",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 2,
    question: "第 2 章 this 全面解析覆盖哪些权威目录条目？",
    answer:
      "Chapter 2: this All Makes Sense Now!、Call-site、Nothing But Rules、Everything In Order、Binding Exceptions、Lexical this",
    tags: ["第 2 章 this 全面解析", "目录覆盖"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-3",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 2,
    question: "第 2 章 this 全面解析的六阶段证据链是什么？",
    answer:
      "定位调用点 → 先检查 new 调用 → 再检查 call、apply 或 bind → 再检查对象成员调用 → 否则应用默认绑定 → 最后核对箭头与软绑定例外",
    tags: ["第 2 章 this 全面解析", "机制链"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-4",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 3,
    question: "第 2 章 this 全面解析为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 this 全面解析", "故障注入"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-5",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 3,
    question: "第 2 章 this 全面解析签发时保持什么不变量？",
    answer:
      "this 绑定按 new、显式、隐式、默认的优先级判定，并受绑定丢失、间接引用、装箱和箭头函数等例外影响；判断必须从调用点开始。",
    tags: ["第 2 章 this 全面解析", "工程验收"],
  },
  {
    id: "ydk-this-02-this-all-makes-sense-6",
    chapter: "ydk-this-02-this-all-makes-sense",
    level: 3,
    question: "第 2 章 this 全面解析怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 this 全面解析", "可复现实验"],
  },
  {
    id: "ydk-this-03-objects-1",
    chapter: "ydk-this-03-objects",
    level: 1,
    question: "第 3 章 对象的核心主张是什么？",
    answer:
      "对象是属性描述符管理的键值集合；点语法与中括号语法只是访问形式，复制、可写性、可配置性、可枚举性与迭代顺序才决定真实行为。",
    tags: ["第 3 章 对象", "核心机制"],
  },
  {
    id: "ydk-this-03-objects-2",
    chapter: "ydk-this-03-objects",
    level: 2,
    question: "第 3 章 对象覆盖哪些权威目录条目？",
    answer: "Chapter 3: Objects、Syntax、Type、Contents、Iteration",
    tags: ["第 3 章 对象", "目录覆盖"],
  },
  {
    id: "ydk-this-03-objects-3",
    chapter: "ydk-this-03-objects",
    level: 2,
    question: "第 3 章 对象的六阶段证据链是什么？",
    answer:
      "创建对象容器 → 规范化属性键 → 查找自有属性 → 读取数据或调用 getter → 按描述符约束写入 → 只迭代允许暴露的键",
    tags: ["第 3 章 对象", "机制链"],
  },
  {
    id: "ydk-this-03-objects-4",
    chapter: "ydk-this-03-objects",
    level: 3,
    question: "第 3 章 对象为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 对象", "故障注入"],
  },
  {
    id: "ydk-this-03-objects-5",
    chapter: "ydk-this-03-objects",
    level: 3,
    question: "第 3 章 对象签发时保持什么不变量？",
    answer:
      "对象是属性描述符管理的键值集合；点语法与中括号语法只是访问形式，复制、可写性、可配置性、可枚举性与迭代顺序才决定真实行为。",
    tags: ["第 3 章 对象", "工程验收"],
  },
  {
    id: "ydk-this-03-objects-6",
    chapter: "ydk-this-03-objects",
    level: 3,
    question: "第 3 章 对象怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 对象", "可复现实验"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-1",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 1,
    question: "第 4 章 混合对象“类”的核心主张是什么？",
    answer:
      "传统类模型依靠复制与实例化，而 JavaScript 对象默认通过原型链接委托行为；模拟类继承和 mixin 会复制属性并引入脆弱的伪多态。",
    tags: ["第 4 章 混合对象“类”", "核心机制"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-2",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 2,
    question: "第 4 章 混合对象“类”覆盖哪些权威目录条目？",
    answer:
      'Chapter 4: Mixing (Up) "Class" Objects、Class Theory、Class Mechanics、Class Inheritance、Mixins',
    tags: ["第 4 章 混合对象“类”", "目录覆盖"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-3",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 2,
    question: "第 4 章 混合对象“类”的六阶段证据链是什么？",
    answer:
      "定义共享行为模板 → 创建实例状态 → 模拟父子关系 → 复制或链接方法 → 解析覆盖与 super 访问 → 评估耦合和重复状态",
    tags: ["第 4 章 混合对象“类”", "机制链"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-4",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 3,
    question: "第 4 章 混合对象“类”为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 混合对象“类”", "故障注入"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-5",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 3,
    question: "第 4 章 混合对象“类”签发时保持什么不变量？",
    answer:
      "传统类模型依靠复制与实例化，而 JavaScript 对象默认通过原型链接委托行为；模拟类继承和 mixin 会复制属性并引入脆弱的伪多态。",
    tags: ["第 4 章 混合对象“类”", "工程验收"],
  },
  {
    id: "ydk-this-04-mixing-class-objects-6",
    chapter: "ydk-this-04-mixing-class-objects",
    level: 3,
    question: "第 4 章 混合对象“类”怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 4 章 混合对象“类”", "可复现实验"],
  },
  {
    id: "ydk-this-05-prototypes-1",
    chapter: "ydk-this-05-prototypes",
    level: 1,
    question: "第 5 章 原型的核心主张是什么？",
    answer:
      "对象的内部原型链接在属性未命中时把查询委托给另一个对象；constructor 与 prototype 的类外观只是函数和对象链接的组合，不代表行为被复制。",
    tags: ["第 5 章 原型", "核心机制"],
  },
  {
    id: "ydk-this-05-prototypes-2",
    chapter: "ydk-this-05-prototypes",
    level: 2,
    question: "第 5 章 原型覆盖哪些权威目录条目？",
    answer:
      'Chapter 5: Prototypes、[[Prototype]]、"Class"、"(Prototypal) Inheritance"、Object Links',
    tags: ["第 5 章 原型", "目录覆盖"],
  },
  {
    id: "ydk-this-05-prototypes-3",
    chapter: "ydk-this-05-prototypes",
    level: 2,
    question: "第 5 章 原型的六阶段证据链是什么？",
    answer:
      "从接收对象查找属性 → 未命中时读取原型链接 → 沿链逐级委托 → 遇到首个命中返回 → 写入时判断遮蔽规则 → 抵达 null 时结束",
    tags: ["第 5 章 原型", "机制链"],
  },
  {
    id: "ydk-this-05-prototypes-4",
    chapter: "ydk-this-05-prototypes",
    level: 3,
    question: "第 5 章 原型为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 原型", "故障注入"],
  },
  {
    id: "ydk-this-05-prototypes-5",
    chapter: "ydk-this-05-prototypes",
    level: 3,
    question: "第 5 章 原型签发时保持什么不变量？",
    answer:
      "对象的内部原型链接在属性未命中时把查询委托给另一个对象；constructor 与 prototype 的类外观只是函数和对象链接的组合，不代表行为被复制。",
    tags: ["第 5 章 原型", "工程验收"],
  },
  {
    id: "ydk-this-05-prototypes-6",
    chapter: "ydk-this-05-prototypes",
    level: 3,
    question: "第 5 章 原型怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 5 章 原型", "可复现实验"],
  },
  {
    id: "ydk-this-06-behavior-delegation-1",
    chapter: "ydk-this-06-behavior-delegation",
    level: 1,
    question: "第 6 章 行为委托的核心主张是什么？",
    answer:
      "面向委托的设计让对象保持各自状态，并把缺失行为委托给能力对象；它用清晰的对象关系替代构造器、伪类继承和脆弱的父方法调用。",
    tags: ["第 6 章 行为委托", "核心机制"],
  },
  {
    id: "ydk-this-06-behavior-delegation-2",
    chapter: "ydk-this-06-behavior-delegation",
    level: 2,
    question: "第 6 章 行为委托覆盖哪些权威目录条目？",
    answer:
      "Chapter 6: Behavior Delegation、Towards Delegation-Oriented Design、Classes vs. Objects、Simpler Design、Nicer Syntax、Introspection",
    tags: ["第 6 章 行为委托", "目录覆盖"],
  },
  {
    id: "ydk-this-06-behavior-delegation-3",
    chapter: "ydk-this-06-behavior-delegation",
    level: 2,
    question: "第 6 章 行为委托的六阶段证据链是什么？",
    answer:
      "把状态放入任务对象 → 把共享行为放入能力对象 → 建立显式原型链接 → 由接收对象发起调用 → 沿链接寻找缺失行为 → 以内省确认关系而非类名",
    tags: ["第 6 章 行为委托", "机制链"],
  },
  {
    id: "ydk-this-06-behavior-delegation-4",
    chapter: "ydk-this-06-behavior-delegation",
    level: 3,
    question: "第 6 章 行为委托为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 6 章 行为委托", "故障注入"],
  },
  {
    id: "ydk-this-06-behavior-delegation-5",
    chapter: "ydk-this-06-behavior-delegation",
    level: 3,
    question: "第 6 章 行为委托签发时保持什么不变量？",
    answer:
      "面向委托的设计让对象保持各自状态，并把缺失行为委托给能力对象；它用清晰的对象关系替代构造器、伪类继承和脆弱的父方法调用。",
    tags: ["第 6 章 行为委托", "工程验收"],
  },
  {
    id: "ydk-this-06-behavior-delegation-6",
    chapter: "ydk-this-06-behavior-delegation",
    level: 3,
    question: "第 6 章 行为委托怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 6 章 行为委托", "可复现实验"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-1",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 1,
    question: "附录 A ES6 中的 class的核心主张是什么？",
    answer:
      "ES6 class 提供更整洁的构造器与继承语法，但底层仍以原型链接、this 和属性描述符运行；方法不可枚举、super 词法绑定等差异必须单独验证。",
    tags: ["附录 A ES6 中的 class", "核心机制"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-2",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 2,
    question: "附录 A ES6 中的 class覆盖哪些权威目录条目？",
    answer: "Appendix A: ES6 class",
    tags: ["附录 A ES6 中的 class", "目录覆盖"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-3",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 2,
    question: "附录 A ES6 中的 class的六阶段证据链是什么？",
    answer:
      "声明类与原型方法 → 用 new 创建实例 → constructor 初始化状态 → extends 建立两层原型关系 → super 解析父级方法 → 检查语法糖之外的运行时链接",
    tags: ["附录 A ES6 中的 class", "机制链"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-4",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 3,
    question: "附录 A ES6 中的 class为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 A ES6 中的 class", "故障注入"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-5",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 3,
    question: "附录 A ES6 中的 class签发时保持什么不变量？",
    answer:
      "ES6 class 提供更整洁的构造器与继承语法，但底层仍以原型链接、this 和属性描述符运行；方法不可枚举、super 词法绑定等差异必须单独验证。",
    tags: ["附录 A ES6 中的 class", "工程验收"],
  },
  {
    id: "ydk-this-appendix-a-es6-class-6",
    chapter: "ydk-this-appendix-a-es6-class",
    level: 3,
    question: "附录 A ES6 中的 class怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 A ES6 中的 class", "可复现实验"],
  },
  {
    id: "ydk-types-01-types-1",
    chapter: "ydk-types-01-types",
    level: 1,
    question: "第 1 章 类型的核心主张是什么？",
    answer:
      "JavaScript 的类型属于值而非变量；typeof 能区分多数内建类型，却对 null 和函数保留历史特例，并且未声明标识符与值为 undefined 是两种状态。",
    tags: ["第 1 章 类型", "核心机制"],
  },
  {
    id: "ydk-types-01-types-2",
    chapter: "ydk-types-01-types",
    level: 2,
    question: "第 1 章 类型覆盖哪些权威目录条目？",
    answer:
      "Chapter 1: Types、A Type By Any Other Name...、Built-in Types、Values as Types",
    tags: ["第 1 章 类型", "目录覆盖"],
  },
  {
    id: "ydk-types-01-types-3",
    chapter: "ydk-types-01-types",
    level: 2,
    question: "第 1 章 类型的六阶段证据链是什么？",
    answer:
      "表达式产生一个值 → 值携带运行时类型 → typeof 执行分类 → 识别 null 历史特例 → 区分未声明与未赋值 → 按用途选择可靠检测",
    tags: ["第 1 章 类型", "机制链"],
  },
  {
    id: "ydk-types-01-types-4",
    chapter: "ydk-types-01-types",
    level: 3,
    question: "第 1 章 类型为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 类型", "故障注入"],
  },
  {
    id: "ydk-types-01-types-5",
    chapter: "ydk-types-01-types",
    level: 3,
    question: "第 1 章 类型签发时保持什么不变量？",
    answer:
      "JavaScript 的类型属于值而非变量；typeof 能区分多数内建类型，却对 null 和函数保留历史特例，并且未声明标识符与值为 undefined 是两种状态。",
    tags: ["第 1 章 类型", "工程验收"],
  },
  {
    id: "ydk-types-01-types-6",
    chapter: "ydk-types-01-types",
    level: 3,
    question: "第 1 章 类型怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 类型", "可复现实验"],
  },
  {
    id: "ydk-types-02-values-1",
    chapter: "ydk-types-02-values",
    level: 1,
    question: "第 2 章 值的核心主张是什么？",
    answer:
      "数组、字符串和数字各有边界语义；稀疏槽位、Unicode、浮点误差、NaN、正负零与值复制或引用共享，都会让表面相似的操作产生不同轨迹。",
    tags: ["第 2 章 值", "核心机制"],
  },
  {
    id: "ydk-types-02-values-2",
    chapter: "ydk-types-02-values",
    level: 2,
    question: "第 2 章 值覆盖哪些权威目录条目？",
    answer:
      "Chapter 2: Values、Arrays、Strings、Numbers、Special Values、Value vs Reference",
    tags: ["第 2 章 值", "目录覆盖"],
  },
  {
    id: "ydk-types-02-values-3",
    chapter: "ydk-types-02-values",
    level: 2,
    question: "第 2 章 值的六阶段证据链是什么？",
    answer:
      "确定值的实际类型 → 区分容器与原始值 → 检查数字特殊值 → 判断复制的是值还是引用 → 执行变更并观察别名 → 用专用 API 验证边界",
    tags: ["第 2 章 值", "机制链"],
  },
  {
    id: "ydk-types-02-values-4",
    chapter: "ydk-types-02-values",
    level: 3,
    question: "第 2 章 值为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 值", "故障注入"],
  },
  {
    id: "ydk-types-02-values-5",
    chapter: "ydk-types-02-values",
    level: 3,
    question: "第 2 章 值签发时保持什么不变量？",
    answer:
      "数组、字符串和数字各有边界语义；稀疏槽位、Unicode、浮点误差、NaN、正负零与值复制或引用共享，都会让表面相似的操作产生不同轨迹。",
    tags: ["第 2 章 值", "工程验收"],
  },
  {
    id: "ydk-types-02-values-6",
    chapter: "ydk-types-02-values",
    level: 3,
    question: "第 2 章 值怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 值", "可复现实验"],
  },
  {
    id: "ydk-types-03-natives-1",
    chapter: "ydk-types-03-natives",
    level: 1,
    question: "第 3 章 原生函数的核心主张是什么？",
    answer:
      "String、Number、Boolean 等原生函数既可转换值也可作为构造器创建包装对象；属性访问会临时装箱，valueOf 与显式转换负责拆箱，二者不应混为同一类型。",
    tags: ["第 3 章 原生函数", "核心机制"],
  },
  {
    id: "ydk-types-03-natives-2",
    chapter: "ydk-types-03-natives",
    level: 2,
    question: "第 3 章 原生函数覆盖哪些权威目录条目？",
    answer:
      "Chapter 3: Natives、Internal [[Class]]、Boxing Wrappers、Unboxing、Natives as Constructors",
    tags: ["第 3 章 原生函数", "目录覆盖"],
  },
  {
    id: "ydk-types-03-natives-3",
    chapter: "ydk-types-03-natives",
    level: 2,
    question: "第 3 章 原生函数的六阶段证据链是什么？",
    answer:
      "取得原始值 → 属性访问触发临时装箱 → 在原型上解析方法 → 以原始值作为接收者执行 → 需要时通过 valueOf 拆箱 → 避免长期保存包装对象",
    tags: ["第 3 章 原生函数", "机制链"],
  },
  {
    id: "ydk-types-03-natives-4",
    chapter: "ydk-types-03-natives",
    level: 3,
    question: "第 3 章 原生函数为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 原生函数", "故障注入"],
  },
  {
    id: "ydk-types-03-natives-5",
    chapter: "ydk-types-03-natives",
    level: 3,
    question: "第 3 章 原生函数签发时保持什么不变量？",
    answer:
      "String、Number、Boolean 等原生函数既可转换值也可作为构造器创建包装对象；属性访问会临时装箱，valueOf 与显式转换负责拆箱，二者不应混为同一类型。",
    tags: ["第 3 章 原生函数", "工程验收"],
  },
  {
    id: "ydk-types-03-natives-6",
    chapter: "ydk-types-03-natives",
    level: 3,
    question: "第 3 章 原生函数怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 原生函数", "可复现实验"],
  },
  {
    id: "ydk-types-04-coercion-1",
    chapter: "ydk-types-04-coercion",
    level: 1,
    question: "第 4 章 强制类型转换的核心主张是什么？",
    answer:
      "强制类型转换由 ToPrimitive、ToString、ToNumber、ToBoolean 等抽象操作组成；显式与隐式转换共享这些规则，宽松相等比较类型转换后的值而非简单忽略类型。",
    tags: ["第 4 章 强制类型转换", "核心机制"],
  },
  {
    id: "ydk-types-04-coercion-2",
    chapter: "ydk-types-04-coercion",
    level: 2,
    question: "第 4 章 强制类型转换覆盖哪些权威目录条目？",
    answer:
      "Chapter 4: Coercion、Converting Values、Abstract Value Operations、Explicit Coercion、Implicit Coercion、Loose Equals vs Strict Equals、Abstract Relational Comparison",
    tags: ["第 4 章 强制类型转换", "目录覆盖"],
  },
  {
    id: "ydk-types-04-coercion-3",
    chapter: "ydk-types-04-coercion",
    level: 2,
    question: "第 4 章 强制类型转换的六阶段证据链是什么？",
    answer:
      "读取运算符与操作数类型 → 必要时把对象转为原始值 → 按抽象操作转换目标类型 → 执行数值、字符串或布尔运算 → 对宽松相等递归应用规则 → 保留转换前后证据",
    tags: ["第 4 章 强制类型转换", "机制链"],
  },
  {
    id: "ydk-types-04-coercion-4",
    chapter: "ydk-types-04-coercion",
    level: 3,
    question: "第 4 章 强制类型转换为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 强制类型转换", "故障注入"],
  },
  {
    id: "ydk-types-04-coercion-5",
    chapter: "ydk-types-04-coercion",
    level: 3,
    question: "第 4 章 强制类型转换签发时保持什么不变量？",
    answer:
      "强制类型转换由 ToPrimitive、ToString、ToNumber、ToBoolean 等抽象操作组成；显式与隐式转换共享这些规则，宽松相等比较类型转换后的值而非简单忽略类型。",
    tags: ["第 4 章 强制类型转换", "工程验收"],
  },
  {
    id: "ydk-types-04-coercion-6",
    chapter: "ydk-types-04-coercion",
    level: 3,
    question: "第 4 章 强制类型转换怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 4 章 强制类型转换", "可复现实验"],
  },
  {
    id: "ydk-types-05-grammar-1",
    chapter: "ydk-types-05-grammar",
    level: 1,
    question: "第 5 章 语法的核心主张是什么？",
    answer:
      "表达式产生值、语句组织控制流；运算符优先级与结合性决定分组，ASI 只在特定换行位置补分号，finally 还能覆盖先前的 return 或 throw。",
    tags: ["第 5 章 语法", "核心机制"],
  },
  {
    id: "ydk-types-05-grammar-2",
    chapter: "ydk-types-05-grammar",
    level: 2,
    question: "第 5 章 语法覆盖哪些权威目录条目？",
    answer:
      "Chapter 5: Grammar、Statements & Expressions、Operator Precedence、Automatic Semicolons、Errors、Function Arguments、try..finally、switch",
    tags: ["第 5 章 语法", "目录覆盖"],
  },
  {
    id: "ydk-types-05-grammar-3",
    chapter: "ydk-types-05-grammar",
    level: 2,
    question: "第 5 章 语法的六阶段证据链是什么？",
    answer:
      "把源码解析为语法结构 → 按优先级建立表达式树 → 在受限产生式处理换行 → 执行语句并产生完成记录 → 进入 finally 修改完成记录 → 由外层控制流消费结果",
    tags: ["第 5 章 语法", "机制链"],
  },
  {
    id: "ydk-types-05-grammar-4",
    chapter: "ydk-types-05-grammar",
    level: 3,
    question: "第 5 章 语法为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 语法", "故障注入"],
  },
  {
    id: "ydk-types-05-grammar-5",
    chapter: "ydk-types-05-grammar",
    level: 3,
    question: "第 5 章 语法签发时保持什么不变量？",
    answer:
      "表达式产生值、语句组织控制流；运算符优先级与结合性决定分组，ASI 只在特定换行位置补分号，finally 还能覆盖先前的 return 或 throw。",
    tags: ["第 5 章 语法", "工程验收"],
  },
  {
    id: "ydk-types-05-grammar-6",
    chapter: "ydk-types-05-grammar",
    level: 3,
    question: "第 5 章 语法怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 5 章 语法", "可复现实验"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-1",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 1,
    question: "附录 A 混合环境 JavaScript的核心主张是什么？",
    answer:
      "宿主环境、polyfill、跨 realm 对象与原生原型修改会改变类型判断的假设；可靠代码必须区分 ECMAScript 语义、宿主扩展和第三方补丁。",
    tags: ["附录 A 混合环境 JavaScript", "核心机制"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-2",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 2,
    question: "附录 A 混合环境 JavaScript覆盖哪些权威目录条目？",
    answer: "Appendix A: Mixed Environment JavaScript",
    tags: ["附录 A 混合环境 JavaScript", "目录覆盖"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-3",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 2,
    question: "附录 A 混合环境 JavaScript的六阶段证据链是什么？",
    answer:
      "锁定 ECMAScript 基线 → 识别宿主提供的对象 → 检查 polyfill 注入 → 避免跨 realm 的 instanceof 假设 → 用行为做特性检测 → 隔离原生原型修改",
    tags: ["附录 A 混合环境 JavaScript", "机制链"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-4",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 3,
    question: "附录 A 混合环境 JavaScript为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 A 混合环境 JavaScript", "故障注入"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-5",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 3,
    question: "附录 A 混合环境 JavaScript签发时保持什么不变量？",
    answer:
      "宿主环境、polyfill、跨 realm 对象与原生原型修改会改变类型判断的假设；可靠代码必须区分 ECMAScript 语义、宿主扩展和第三方补丁。",
    tags: ["附录 A 混合环境 JavaScript", "工程验收"],
  },
  {
    id: "ydk-types-appendix-a-mixed-environment-6",
    chapter: "ydk-types-appendix-a-mixed-environment",
    level: 3,
    question: "附录 A 混合环境 JavaScript怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 A 混合环境 JavaScript", "可复现实验"],
  },
  {
    id: "ydk-async-01-now-and-later-1",
    chapter: "ydk-async-01-now-and-later",
    level: 1,
    question: "第 1 章 异步：现在与将来的核心主张是什么？",
    answer:
      "异步程序由多个时间片组成；JavaScript 单次任务运行至完成，宿主事件循环安排后续任务，Promise job 在任务边界以微任务队列运行，并发不等于并行线程。",
    tags: ["第 1 章 异步：现在与将来", "核心机制"],
  },
  {
    id: "ydk-async-01-now-and-later-2",
    chapter: "ydk-async-01-now-and-later",
    level: 2,
    question: "第 1 章 异步：现在与将来覆盖哪些权威目录条目？",
    answer:
      "Chapter 1: Asynchrony: Now & Later、A Program In Chunks、Event Loop、Parallel Threading、Concurrency、Jobs、Statement Ordering",
    tags: ["第 1 章 异步：现在与将来", "目录覆盖"],
  },
  {
    id: "ydk-async-01-now-and-later-3",
    chapter: "ydk-async-01-now-and-later",
    level: 2,
    question: "第 1 章 异步：现在与将来的六阶段证据链是什么？",
    answer:
      "执行当前同步任务 → 注册稍后完成的操作 → 当前调用栈清空 → 清空微任务队列 → 宿主选择下一任务 → 按可观察顺序记录输出",
    tags: ["第 1 章 异步：现在与将来", "机制链"],
  },
  {
    id: "ydk-async-01-now-and-later-4",
    chapter: "ydk-async-01-now-and-later",
    level: 3,
    question: "第 1 章 异步：现在与将来为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 异步：现在与将来", "故障注入"],
  },
  {
    id: "ydk-async-01-now-and-later-5",
    chapter: "ydk-async-01-now-and-later",
    level: 3,
    question: "第 1 章 异步：现在与将来签发时保持什么不变量？",
    answer:
      "异步程序由多个时间片组成；JavaScript 单次任务运行至完成，宿主事件循环安排后续任务，Promise job 在任务边界以微任务队列运行，并发不等于并行线程。",
    tags: ["第 1 章 异步：现在与将来", "工程验收"],
  },
  {
    id: "ydk-async-01-now-and-later-6",
    chapter: "ydk-async-01-now-and-later",
    level: 3,
    question: "第 1 章 异步：现在与将来怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 异步：现在与将来", "可复现实验"],
  },
  {
    id: "ydk-async-02-callbacks-1",
    chapter: "ydk-async-02-callbacks",
    level: 1,
    question: "第 2 章 回调的核心主张是什么？",
    answer:
      "回调把程序的后续部分交给另一个组件调用，既打断人类顺序推理，也产生调用次数、时机、参数与错误通道的控制反转和信任问题。",
    tags: ["第 2 章 回调", "核心机制"],
  },
  {
    id: "ydk-async-02-callbacks-2",
    chapter: "ydk-async-02-callbacks",
    level: 2,
    question: "第 2 章 回调覆盖哪些权威目录条目？",
    answer:
      "Chapter 2: Callbacks、Continuations、Sequential Brain、Trust Issues、Trying To Save Callbacks",
    tags: ["第 2 章 回调", "目录覆盖"],
  },
  {
    id: "ydk-async-02-callbacks-3",
    chapter: "ydk-async-02-callbacks",
    level: 2,
    question: "第 2 章 回调的六阶段证据链是什么？",
    answer:
      "拆出当前步骤的延续 → 把回调交给外部组件 → 外部组件控制调用时机 → 回调恢复局部流程 → 校验次数参数和错误 → 把不可控边界包装成契约",
    tags: ["第 2 章 回调", "机制链"],
  },
  {
    id: "ydk-async-02-callbacks-4",
    chapter: "ydk-async-02-callbacks",
    level: 3,
    question: "第 2 章 回调为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 回调", "故障注入"],
  },
  {
    id: "ydk-async-02-callbacks-5",
    chapter: "ydk-async-02-callbacks",
    level: 3,
    question: "第 2 章 回调签发时保持什么不变量？",
    answer:
      "回调把程序的后续部分交给另一个组件调用，既打断人类顺序推理，也产生调用次数、时机、参数与错误通道的控制反转和信任问题。",
    tags: ["第 2 章 回调", "工程验收"],
  },
  {
    id: "ydk-async-02-callbacks-6",
    chapter: "ydk-async-02-callbacks",
    level: 3,
    question: "第 2 章 回调怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 回调", "可复现实验"],
  },
  {
    id: "ydk-async-03-promises-1",
    chapter: "ydk-async-03-promises",
    level: 1,
    question: "第 3 章 Promise的核心主张是什么？",
    answer:
      "Promise 是未来值的只结算一次契约；then 链把返回值、异常与嵌套 Promise 统一吸收到后续状态，但 thenable 同化、错误吞没、取消和进度仍需额外设计。",
    tags: ["第 3 章 Promise", "核心机制"],
  },
  {
    id: "ydk-async-03-promises-2",
    chapter: "ydk-async-03-promises",
    level: 2,
    question: "第 3 章 Promise覆盖哪些权威目录条目？",
    answer:
      "Chapter 3: Promises、What is a Promise?、Thenable Duck-Typing、Promise Trust、Chain Flow、Error Handling、Promise Patterns、Promise API Recap、Promise Limitations",
    tags: ["第 3 章 Promise", "目录覆盖"],
  },
  {
    id: "ydk-async-03-promises-3",
    chapter: "ydk-async-03-promises",
    level: 2,
    question: "第 3 章 Promise的六阶段证据链是什么？",
    answer:
      "创建待定 Promise → 启动产生未来值的操作 → 以兑现或拒绝只结算一次 → 把处理器排入微任务 → 吸收处理器返回值或异常 → 沿链传播最终结果",
    tags: ["第 3 章 Promise", "机制链"],
  },
  {
    id: "ydk-async-03-promises-4",
    chapter: "ydk-async-03-promises",
    level: 3,
    question: "第 3 章 Promise为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 Promise", "故障注入"],
  },
  {
    id: "ydk-async-03-promises-5",
    chapter: "ydk-async-03-promises",
    level: 3,
    question: "第 3 章 Promise签发时保持什么不变量？",
    answer:
      "Promise 是未来值的只结算一次契约；then 链把返回值、异常与嵌套 Promise 统一吸收到后续状态，但 thenable 同化、错误吞没、取消和进度仍需额外设计。",
    tags: ["第 3 章 Promise", "工程验收"],
  },
  {
    id: "ydk-async-03-promises-6",
    chapter: "ydk-async-03-promises",
    level: 3,
    question: "第 3 章 Promise怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 Promise", "可复现实验"],
  },
  {
    id: "ydk-async-04-generators-1",
    chapter: "ydk-async-04-generators",
    level: 1,
    question: "第 4 章 生成器的核心主张是什么？",
    answer:
      "生成器把函数执行分割为可暂停的迭代步骤，next 在调用者与生成器之间双向传值；执行器可把 yield 的 Promise 恢复为顺序代码，并用 yield* 委托子迭代器。",
    tags: ["第 4 章 生成器", "核心机制"],
  },
  {
    id: "ydk-async-04-generators-2",
    chapter: "ydk-async-04-generators",
    level: 2,
    question: "第 4 章 生成器覆盖哪些权威目录条目？",
    answer:
      "Chapter 4: Generators、Breaking Run-to-completion、Generator'ing Values、Iterating Generators Asynchronously、Generators + Promises、Generator Delegation、Generator Concurrency、Thunks、Pre-ES6 Generators",
    tags: ["第 4 章 生成器", "目录覆盖"],
  },
  {
    id: "ydk-async-04-generators-3",
    chapter: "ydk-async-04-generators",
    level: 2,
    question: "第 4 章 生成器的六阶段证据链是什么？",
    answer:
      "调用生成器取得迭代器 → next 恢复到下一个 yield → yield 暂停并向外给值 → 调用者等待异步结果 → next 或 throw 把结果送回 → done 为真时完成",
    tags: ["第 4 章 生成器", "机制链"],
  },
  {
    id: "ydk-async-04-generators-4",
    chapter: "ydk-async-04-generators",
    level: 3,
    question: "第 4 章 生成器为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 生成器", "故障注入"],
  },
  {
    id: "ydk-async-04-generators-5",
    chapter: "ydk-async-04-generators",
    level: 3,
    question: "第 4 章 生成器签发时保持什么不变量？",
    answer:
      "生成器把函数执行分割为可暂停的迭代步骤，next 在调用者与生成器之间双向传值；执行器可把 yield 的 Promise 恢复为顺序代码，并用 yield* 委托子迭代器。",
    tags: ["第 4 章 生成器", "工程验收"],
  },
  {
    id: "ydk-async-04-generators-6",
    chapter: "ydk-async-04-generators",
    level: 3,
    question: "第 4 章 生成器怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 4 章 生成器", "可复现实验"],
  },
  {
    id: "ydk-async-05-program-performance-1",
    chapter: "ydk-async-05-program-performance",
    level: 1,
    question: "第 5 章 程序性能的核心主张是什么？",
    answer:
      "性能提升首先来自把 CPU 密集工作移出主线程；Web Worker 通过消息与隔离内存并行处理，而原书中的 SIMD.js 与 asm.js 代表 2015 年探索，今天应结合 WebAssembly 与现代引擎重新评估。",
    tags: ["第 5 章 程序性能", "核心机制"],
  },
  {
    id: "ydk-async-05-program-performance-2",
    chapter: "ydk-async-05-program-performance",
    level: 2,
    question: "第 5 章 程序性能覆盖哪些权威目录条目？",
    answer: "Chapter 5: Program Performance、Web Workers、SIMD、asm.js",
    tags: ["第 5 章 程序性能", "目录覆盖"],
  },
  {
    id: "ydk-async-05-program-performance-3",
    chapter: "ydk-async-05-program-performance",
    level: 2,
    question: "第 5 章 程序性能的六阶段证据链是什么？",
    answer:
      "定位阻塞主线程的热点 → 划分可独立计算的数据 → 序列化消息给 Worker → Worker 并行执行 → 返回结果并合并 → 以现代基线复测历史优化",
    tags: ["第 5 章 程序性能", "机制链"],
  },
  {
    id: "ydk-async-05-program-performance-4",
    chapter: "ydk-async-05-program-performance",
    level: 3,
    question: "第 5 章 程序性能为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 程序性能", "故障注入"],
  },
  {
    id: "ydk-async-05-program-performance-5",
    chapter: "ydk-async-05-program-performance",
    level: 3,
    question: "第 5 章 程序性能签发时保持什么不变量？",
    answer:
      "性能提升首先来自把 CPU 密集工作移出主线程；Web Worker 通过消息与隔离内存并行处理，而原书中的 SIMD.js 与 asm.js 代表 2015 年探索，今天应结合 WebAssembly 与现代引擎重新评估。",
    tags: ["第 5 章 程序性能", "工程验收"],
  },
  {
    id: "ydk-async-05-program-performance-6",
    chapter: "ydk-async-05-program-performance",
    level: 3,
    question: "第 5 章 程序性能怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 5 章 程序性能", "可复现实验"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-1",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 1,
    question: "第 6 章 性能测试与调优的核心主张是什么？",
    answer:
      "可信基准必须预热、重复、统计分布并贴近真实上下文；微优化只有在热点占比和端到端收益都成立时才有意义，尾调用优化也不能假设所有引擎支持。",
    tags: ["第 6 章 性能测试与调优", "核心机制"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-2",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 2,
    question: "第 6 章 性能测试与调优覆盖哪些权威目录条目？",
    answer:
      "Chapter 6: Benchmarking & Tuning、Benchmarking、Context Is King、jsPerf.com、Writing Good Tests、Microperformance、Tail Call Optimization (TCO)",
    tags: ["第 6 章 性能测试与调优", "目录覆盖"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-3",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 2,
    question: "第 6 章 性能测试与调优的六阶段证据链是什么？",
    answer:
      "提出可证伪性能问题 → 固定环境与输入 → 预热 JIT 和缓存 → 交替运行多个样本 → 比较分布而非单次值 → 回到真实负载验证收益",
    tags: ["第 6 章 性能测试与调优", "机制链"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-4",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 3,
    question: "第 6 章 性能测试与调优为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 6 章 性能测试与调优", "故障注入"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-5",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 3,
    question: "第 6 章 性能测试与调优签发时保持什么不变量？",
    answer:
      "可信基准必须预热、重复、统计分布并贴近真实上下文；微优化只有在热点占比和端到端收益都成立时才有意义，尾调用优化也不能假设所有引擎支持。",
    tags: ["第 6 章 性能测试与调优", "工程验收"],
  },
  {
    id: "ydk-async-06-benchmarking-tuning-6",
    chapter: "ydk-async-06-benchmarking-tuning",
    level: 3,
    question: "第 6 章 性能测试与调优怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 6 章 性能测试与调优", "可复现实验"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-1",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 1,
    question: "附录 A asynquence 库的核心主张是什么？",
    answer:
      "asynquence 是作者为顺序、并行、门闩、错误与生成器流程设计的历史库；学习重点是组合算子的契约，而非在现代项目中无条件替代原生 Promise。",
    tags: ["附录 A asynquence 库", "核心机制"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-2",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 2,
    question: "附录 A asynquence 库覆盖哪些权威目录条目？",
    answer: "Appendix A: asynquence Library",
    tags: ["附录 A asynquence 库", "目录覆盖"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-3",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 2,
    question: "附录 A asynquence 库的六阶段证据链是什么？",
    answer:
      "创建异步序列 → 追加顺序步骤 → 用 gate 并行分支 → 聚合分支结果 → 统一进入错误通道 → 与原生 Promise 组合对照",
    tags: ["附录 A asynquence 库", "机制链"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-4",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 3,
    question: "附录 A asynquence 库为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 A asynquence 库", "故障注入"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-5",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 3,
    question: "附录 A asynquence 库签发时保持什么不变量？",
    answer:
      "asynquence 是作者为顺序、并行、门闩、错误与生成器流程设计的历史库；学习重点是组合算子的契约，而非在现代项目中无条件替代原生 Promise。",
    tags: ["附录 A asynquence 库", "工程验收"],
  },
  {
    id: "ydk-async-appendix-a-asynquence-6",
    chapter: "ydk-async-appendix-a-asynquence",
    level: 3,
    question: "附录 A asynquence 库怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 A asynquence 库", "可复现实验"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-1",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 1,
    question: "附录 B 高级异步模式的核心主张是什么？",
    answer:
      "高级异步组合关注可取消、超时、竞争、并发上限、响应式序列和协程通信；每种模式都必须定义所有权、停止条件与迟到结果的处理。",
    tags: ["附录 B 高级异步模式", "核心机制"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-2",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 2,
    question: "附录 B 高级异步模式覆盖哪些权威目录条目？",
    answer: "Appendix B: Advanced Async Patterns",
    tags: ["附录 B 高级异步模式", "目录覆盖"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-3",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 2,
    question: "附录 B 高级异步模式的六阶段证据链是什么？",
    answer:
      "为操作建立所有权 → 启动多个异步分支 → 传播取消或超时信号 → 只接受满足策略的结果 → 丢弃或补偿迟到结果 → 清理计时器监听器和资源",
    tags: ["附录 B 高级异步模式", "机制链"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-4",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 3,
    question: "附录 B 高级异步模式为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["附录 B 高级异步模式", "故障注入"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-5",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 3,
    question: "附录 B 高级异步模式签发时保持什么不变量？",
    answer:
      "高级异步组合关注可取消、超时、竞争、并发上限、响应式序列和协程通信；每种模式都必须定义所有权、停止条件与迟到结果的处理。",
    tags: ["附录 B 高级异步模式", "工程验收"],
  },
  {
    id: "ydk-async-appendix-b-advanced-patterns-6",
    chapter: "ydk-async-appendix-b-advanced-patterns",
    level: 3,
    question: "附录 B 高级异步模式怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["附录 B 高级异步模式", "可复现实验"],
  },
  {
    id: "ydk-up-01-into-programming-1",
    chapter: "ydk-up-01-into-programming",
    level: 1,
    question: "第 1 章 深入编程的核心主张是什么？",
    answer:
      "编程把输入、值、运算符、变量、分支、循环和函数组合成可重复执行的过程；真正入门要通过预测、运行、观察和修改建立语义模型，而不是只记语法。",
    tags: ["第 1 章 深入编程", "核心机制"],
  },
  {
    id: "ydk-up-01-into-programming-2",
    chapter: "ydk-up-01-into-programming",
    level: 2,
    question: "第 1 章 深入编程覆盖哪些权威目录条目？",
    answer:
      "Chapter 1: Into Programming、Code、Try It Yourself、Operators、Values & Types、Code Comments、Variables、Blocks、Conditionals、Loops、Functions、Practice",
    tags: ["第 1 章 深入编程", "目录覆盖"],
  },
  {
    id: "ydk-up-01-into-programming-3",
    chapter: "ydk-up-01-into-programming",
    level: 2,
    question: "第 1 章 深入编程的六阶段证据链是什么？",
    answer:
      "明确输入与目标 → 把数据表示为值 → 用表达式计算中间结果 → 用分支处理不同情况 → 用循环处理重复工作 → 用函数封装并测试契约",
    tags: ["第 1 章 深入编程", "机制链"],
  },
  {
    id: "ydk-up-01-into-programming-4",
    chapter: "ydk-up-01-into-programming",
    level: 3,
    question: "第 1 章 深入编程为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 深入编程", "故障注入"],
  },
  {
    id: "ydk-up-01-into-programming-5",
    chapter: "ydk-up-01-into-programming",
    level: 3,
    question: "第 1 章 深入编程签发时保持什么不变量？",
    answer:
      "编程把输入、值、运算符、变量、分支、循环和函数组合成可重复执行的过程；真正入门要通过预测、运行、观察和修改建立语义模型，而不是只记语法。",
    tags: ["第 1 章 深入编程", "工程验收"],
  },
  {
    id: "ydk-up-01-into-programming-6",
    chapter: "ydk-up-01-into-programming",
    level: 3,
    question: "第 1 章 深入编程怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 深入编程", "可复现实验"],
  },
  {
    id: "ydk-up-02-into-javascript-1",
    chapter: "ydk-up-02-into-javascript",
    level: 1,
    question: "第 2 章 深入 JavaScript的核心主张是什么？",
    answer:
      "JavaScript 把函数作为值，以动态类型、词法作用域、this 调用上下文和原型委托组织程序；严格模式、转译与宿主 API 则界定语言版本和运行环境。",
    tags: ["第 2 章 深入 JavaScript", "核心机制"],
  },
  {
    id: "ydk-up-02-into-javascript-2",
    chapter: "ydk-up-02-into-javascript",
    level: 2,
    question: "第 2 章 深入 JavaScript覆盖哪些权威目录条目？",
    answer:
      "Chapter 2: Into JavaScript、Values & Types、Variables、Conditionals、Strict Mode、Functions As Values、this Keyword、Prototypes、Old & New、Non-JavaScript",
    tags: ["第 2 章 深入 JavaScript", "目录覆盖"],
  },
  {
    id: "ydk-up-02-into-javascript-3",
    chapter: "ydk-up-02-into-javascript",
    level: 2,
    question: "第 2 章 深入 JavaScript的六阶段证据链是什么？",
    answer:
      "创建值与变量绑定 → 把函数作为值传递 → 依据调用点建立 this → 沿原型链复用行为 → 用严格模式收紧错误 → 区分语言能力与宿主能力",
    tags: ["第 2 章 深入 JavaScript", "机制链"],
  },
  {
    id: "ydk-up-02-into-javascript-4",
    chapter: "ydk-up-02-into-javascript",
    level: 3,
    question: "第 2 章 深入 JavaScript为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 深入 JavaScript", "故障注入"],
  },
  {
    id: "ydk-up-02-into-javascript-5",
    chapter: "ydk-up-02-into-javascript",
    level: 3,
    question: "第 2 章 深入 JavaScript签发时保持什么不变量？",
    answer:
      "JavaScript 把函数作为值，以动态类型、词法作用域、this 调用上下文和原型委托组织程序；严格模式、转译与宿主 API 则界定语言版本和运行环境。",
    tags: ["第 2 章 深入 JavaScript", "工程验收"],
  },
  {
    id: "ydk-up-02-into-javascript-6",
    chapter: "ydk-up-02-into-javascript",
    level: 3,
    question: "第 2 章 深入 JavaScript怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 深入 JavaScript", "可复现实验"],
  },
  {
    id: "ydk-up-03-into-ydkjs-1",
    chapter: "ydk-up-03-into-ydkjs",
    level: 1,
    question: "第 3 章 深入 YDKJS的核心主张是什么？",
    answer:
      "系列六册不是互不相关的技巧集，而是从作用域、对象、类型、异步到语言演进的机制图谱；每一册都用可预测执行轨迹替代经验性黑名单。",
    tags: ["第 3 章 深入 YDKJS", "核心机制"],
  },
  {
    id: "ydk-up-03-into-ydkjs-2",
    chapter: "ydk-up-03-into-ydkjs",
    level: 2,
    question: "第 3 章 深入 YDKJS覆盖哪些权威目录条目？",
    answer:
      "Chapter 3: Into YDKJS、Scope & Closures、this & Object Prototypes、Types & Grammar、Async & Performance、ES6 & Beyond",
    tags: ["第 3 章 深入 YDKJS", "目录覆盖"],
  },
  {
    id: "ydk-up-03-into-ydkjs-3",
    chapter: "ydk-up-03-into-ydkjs",
    level: 2,
    question: "第 3 章 深入 YDKJS的六阶段证据链是什么？",
    answer:
      "先解释标识符查找 → 再解释调用上下文 → 再解释值与转换 → 再解释时间与并发 → 再解释新语法和新 API → 用同一段程序贯通六册",
    tags: ["第 3 章 深入 YDKJS", "机制链"],
  },
  {
    id: "ydk-up-03-into-ydkjs-4",
    chapter: "ydk-up-03-into-ydkjs",
    level: 3,
    question: "第 3 章 深入 YDKJS为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 深入 YDKJS", "故障注入"],
  },
  {
    id: "ydk-up-03-into-ydkjs-5",
    chapter: "ydk-up-03-into-ydkjs",
    level: 3,
    question: "第 3 章 深入 YDKJS签发时保持什么不变量？",
    answer:
      "系列六册不是互不相关的技巧集，而是从作用域、对象、类型、异步到语言演进的机制图谱；每一册都用可预测执行轨迹替代经验性黑名单。",
    tags: ["第 3 章 深入 YDKJS", "工程验收"],
  },
  {
    id: "ydk-up-03-into-ydkjs-6",
    chapter: "ydk-up-03-into-ydkjs",
    level: 3,
    question: "第 3 章 深入 YDKJS怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 深入 YDKJS", "可复现实验"],
  },
  {
    id: "ydk-es6-01-now-future-1",
    chapter: "ydk-es6-01-now-future",
    level: 1,
    question: "第 1 章 ES？现在与未来的核心主张是什么？",
    answer:
      "ECMAScript 通过年度规范持续演进；开发者应区分提案阶段、规范版本、引擎实现与转译输出，用能力测试和目标环境决定可用语法。",
    tags: ["第 1 章 ES？现在与未来", "核心机制"],
  },
  {
    id: "ydk-es6-01-now-future-2",
    chapter: "ydk-es6-01-now-future",
    level: 2,
    question: "第 1 章 ES？现在与未来覆盖哪些权威目录条目？",
    answer: "Chapter 1: ES? Now & Future、Versioning、Transpiling",
    tags: ["第 1 章 ES？现在与未来", "目录覆盖"],
  },
  {
    id: "ydk-es6-01-now-future-3",
    chapter: "ydk-es6-01-now-future",
    level: 2,
    question: "第 1 章 ES？现在与未来的六阶段证据链是什么？",
    answer:
      "锁定代码依赖的语言能力 → 确认其规范阶段 → 检查目标引擎支持 → 转译语法差异 → 补齐缺失运行时 API → 在真实目标环境验收",
    tags: ["第 1 章 ES？现在与未来", "机制链"],
  },
  {
    id: "ydk-es6-01-now-future-4",
    chapter: "ydk-es6-01-now-future",
    level: 3,
    question: "第 1 章 ES？现在与未来为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 1 章 ES？现在与未来", "故障注入"],
  },
  {
    id: "ydk-es6-01-now-future-5",
    chapter: "ydk-es6-01-now-future",
    level: 3,
    question: "第 1 章 ES？现在与未来签发时保持什么不变量？",
    answer:
      "ECMAScript 通过年度规范持续演进；开发者应区分提案阶段、规范版本、引擎实现与转译输出，用能力测试和目标环境决定可用语法。",
    tags: ["第 1 章 ES？现在与未来", "工程验收"],
  },
  {
    id: "ydk-es6-01-now-future-6",
    chapter: "ydk-es6-01-now-future",
    level: 3,
    question: "第 1 章 ES？现在与未来怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 1 章 ES？现在与未来", "可复现实验"],
  },
  {
    id: "ydk-es6-02-syntax-1",
    chapter: "ydk-es6-02-syntax",
    level: 1,
    question: "第 2 章 语法的核心主张是什么？",
    answer:
      "ES6 语法围绕更精确的作用域、结构化数据交换、可迭代协议、函数上下文和 Unicode 正确性展开；每种简写都对应明确的求值顺序与边界。",
    tags: ["第 2 章 语法", "核心机制"],
  },
  {
    id: "ydk-es6-02-syntax-2",
    chapter: "ydk-es6-02-syntax",
    level: 2,
    question: "第 2 章 语法覆盖哪些权威目录条目？",
    answer:
      "Chapter 2: Syntax、Block-Scoped Declarations、Spread / Rest、Default Parameter Values、Destructuring、Object Literal Extensions、Template Literals、Arrow Functions、for..of Loops、Regular Expression Extensions、Number Literal Extensions、Unicode、Symbols",
    tags: ["第 2 章 语法", "目录覆盖"],
  },
  {
    id: "ydk-es6-02-syntax-3",
    chapter: "ydk-es6-02-syntax",
    level: 2,
    question: "第 2 章 语法的六阶段证据链是什么？",
    answer:
      "用 let 与 const 建立块边界 → 用解构声明数据形状 → 用默认值处理 undefined → 用展开和剩余搬运序列 → 用迭代协议遍历 → 用 Symbol 建立非字符串键",
    tags: ["第 2 章 语法", "机制链"],
  },
  {
    id: "ydk-es6-02-syntax-4",
    chapter: "ydk-es6-02-syntax",
    level: 3,
    question: "第 2 章 语法为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 2 章 语法", "故障注入"],
  },
  {
    id: "ydk-es6-02-syntax-5",
    chapter: "ydk-es6-02-syntax",
    level: 3,
    question: "第 2 章 语法签发时保持什么不变量？",
    answer:
      "ES6 语法围绕更精确的作用域、结构化数据交换、可迭代协议、函数上下文和 Unicode 正确性展开；每种简写都对应明确的求值顺序与边界。",
    tags: ["第 2 章 语法", "工程验收"],
  },
  {
    id: "ydk-es6-02-syntax-6",
    chapter: "ydk-es6-02-syntax",
    level: 3,
    question: "第 2 章 语法怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 2 章 语法", "可复现实验"],
  },
  {
    id: "ydk-es6-03-organization-1",
    chapter: "ydk-es6-03-organization",
    level: 1,
    question: "第 3 章 代码组织的核心主张是什么？",
    answer:
      "迭代器定义消费序列的协议，生成器简化生产序列，模块以静态绑定组织依赖，class 则提供原型机制的声明式表面；四者解决不同层次的组织问题。",
    tags: ["第 3 章 代码组织", "核心机制"],
  },
  {
    id: "ydk-es6-03-organization-2",
    chapter: "ydk-es6-03-organization",
    level: 2,
    question: "第 3 章 代码组织覆盖哪些权威目录条目？",
    answer: "Chapter 3: Organization、Iterators、Generators、Modules、Classes",
    tags: ["第 3 章 代码组织", "目录覆盖"],
  },
  {
    id: "ydk-es6-03-organization-3",
    chapter: "ydk-es6-03-organization",
    level: 2,
    question: "第 3 章 代码组织的六阶段证据链是什么？",
    answer:
      "为数据实现迭代入口 → 按需产生下一项 → 用模块导出稳定绑定 → 由导入方建立静态依赖 → 用类语法组织实例方法 → 检查底层协议和原型链接",
    tags: ["第 3 章 代码组织", "机制链"],
  },
  {
    id: "ydk-es6-03-organization-4",
    chapter: "ydk-es6-03-organization",
    level: 3,
    question: "第 3 章 代码组织为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 3 章 代码组织", "故障注入"],
  },
  {
    id: "ydk-es6-03-organization-5",
    chapter: "ydk-es6-03-organization",
    level: 3,
    question: "第 3 章 代码组织签发时保持什么不变量？",
    answer:
      "迭代器定义消费序列的协议，生成器简化生产序列，模块以静态绑定组织依赖，class 则提供原型机制的声明式表面；四者解决不同层次的组织问题。",
    tags: ["第 3 章 代码组织", "工程验收"],
  },
  {
    id: "ydk-es6-03-organization-6",
    chapter: "ydk-es6-03-organization",
    level: 3,
    question: "第 3 章 代码组织怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 3 章 代码组织", "可复现实验"],
  },
  {
    id: "ydk-es6-04-async-flow-control-1",
    chapter: "ydk-es6-04-async-flow-control",
    level: 1,
    question: "第 4 章 异步流程控制的核心主张是什么？",
    answer:
      "ES6 用 Promise 标准化未来值契约，用生成器暂停与恢复顺序代码；二者结合的执行器正是后来 async 与 await 语义的重要前身。",
    tags: ["第 4 章 异步流程控制", "核心机制"],
  },
  {
    id: "ydk-es6-04-async-flow-control-2",
    chapter: "ydk-es6-04-async-flow-control",
    level: 2,
    question: "第 4 章 异步流程控制覆盖哪些权威目录条目？",
    answer: "Chapter 4: Async Flow Control、Promises、Generators + Promises",
    tags: ["第 4 章 异步流程控制", "目录覆盖"],
  },
  {
    id: "ydk-es6-04-async-flow-control-3",
    chapter: "ydk-es6-04-async-flow-control",
    level: 2,
    question: "第 4 章 异步流程控制的六阶段证据链是什么？",
    answer:
      "生成器 yield 一个 Promise → 执行器等待其结算 → 兑现值通过 next 回灌 → 拒绝原因通过 throw 回灌 → 生成器继续到下一暂停点 → done 后兑现总结果",
    tags: ["第 4 章 异步流程控制", "机制链"],
  },
  {
    id: "ydk-es6-04-async-flow-control-4",
    chapter: "ydk-es6-04-async-flow-control",
    level: 3,
    question: "第 4 章 异步流程控制为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 4 章 异步流程控制", "故障注入"],
  },
  {
    id: "ydk-es6-04-async-flow-control-5",
    chapter: "ydk-es6-04-async-flow-control",
    level: 3,
    question: "第 4 章 异步流程控制签发时保持什么不变量？",
    answer:
      "ES6 用 Promise 标准化未来值契约，用生成器暂停与恢复顺序代码；二者结合的执行器正是后来 async 与 await 语义的重要前身。",
    tags: ["第 4 章 异步流程控制", "工程验收"],
  },
  {
    id: "ydk-es6-04-async-flow-control-6",
    chapter: "ydk-es6-04-async-flow-control",
    level: 3,
    question: "第 4 章 异步流程控制怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 4 章 异步流程控制", "可复现实验"],
  },
  {
    id: "ydk-es6-05-collections-1",
    chapter: "ydk-es6-05-collections",
    level: 1,
    question: "第 5 章 集合的核心主张是什么？",
    answer:
      "TypedArray 提供固定二进制视图，Map 与 Set 提供任意键和值唯一性，WeakMap 与 WeakSet 则以弱引用键避免延长对象生命周期，但不可枚举。",
    tags: ["第 5 章 集合", "核心机制"],
  },
  {
    id: "ydk-es6-05-collections-2",
    chapter: "ydk-es6-05-collections",
    level: 2,
    question: "第 5 章 集合覆盖哪些权威目录条目？",
    answer:
      "Chapter 5: Collections、TypedArrays、Maps、WeakMaps、Sets、WeakSets",
    tags: ["第 5 章 集合", "目录覆盖"],
  },
  {
    id: "ydk-es6-05-collections-3",
    chapter: "ydk-es6-05-collections",
    level: 2,
    question: "第 5 章 集合的六阶段证据链是什么？",
    answer:
      "根据数据语义选择集合 → 定义键相等规则 → 执行添加读取和删除 → 按插入顺序迭代强集合 → 让弱集合键随对象回收 → 验证序列化与生命周期边界",
    tags: ["第 5 章 集合", "机制链"],
  },
  {
    id: "ydk-es6-05-collections-4",
    chapter: "ydk-es6-05-collections",
    level: 3,
    question: "第 5 章 集合为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 5 章 集合", "故障注入"],
  },
  {
    id: "ydk-es6-05-collections-5",
    chapter: "ydk-es6-05-collections",
    level: 3,
    question: "第 5 章 集合签发时保持什么不变量？",
    answer:
      "TypedArray 提供固定二进制视图，Map 与 Set 提供任意键和值唯一性，WeakMap 与 WeakSet 则以弱引用键避免延长对象生命周期，但不可枚举。",
    tags: ["第 5 章 集合", "工程验收"],
  },
  {
    id: "ydk-es6-05-collections-6",
    chapter: "ydk-es6-05-collections",
    level: 3,
    question: "第 5 章 集合怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 5 章 集合", "可复现实验"],
  },
  {
    id: "ydk-es6-06-api-additions-1",
    chapter: "ydk-es6-06-api-additions",
    level: 1,
    question: "第 6 章 新增 API的核心主张是什么？",
    answer:
      "ES6 为 Array、Object、Math、Number 和 String 增加更明确的查找、复制、数值判断与 Unicode 操作；选择 API 时应以语义精确和边界行为为标准。",
    tags: ["第 6 章 新增 API", "核心机制"],
  },
  {
    id: "ydk-es6-06-api-additions-2",
    chapter: "ydk-es6-06-api-additions",
    level: 2,
    question: "第 6 章 新增 API覆盖哪些权威目录条目？",
    answer: "Chapter 6: API Additions、Array、Object、Math、Number、String",
    tags: ["第 6 章 新增 API", "目录覆盖"],
  },
  {
    id: "ydk-es6-06-api-additions-3",
    chapter: "ydk-es6-06-api-additions",
    level: 2,
    question: "第 6 章 新增 API的六阶段证据链是什么？",
    answer:
      "识别旧写法的语义缺口 → 选择对应新增 API → 检查可迭代或类数组输入 → 验证浅复制和属性顺序 → 验证 NaN 与整数边界 → 用 Unicode 样本回归",
    tags: ["第 6 章 新增 API", "机制链"],
  },
  {
    id: "ydk-es6-06-api-additions-4",
    chapter: "ydk-es6-06-api-additions",
    level: 3,
    question: "第 6 章 新增 API为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 6 章 新增 API", "故障注入"],
  },
  {
    id: "ydk-es6-06-api-additions-5",
    chapter: "ydk-es6-06-api-additions",
    level: 3,
    question: "第 6 章 新增 API签发时保持什么不变量？",
    answer:
      "ES6 为 Array、Object、Math、Number 和 String 增加更明确的查找、复制、数值判断与 Unicode 操作；选择 API 时应以语义精确和边界行为为标准。",
    tags: ["第 6 章 新增 API", "工程验收"],
  },
  {
    id: "ydk-es6-06-api-additions-6",
    chapter: "ydk-es6-06-api-additions",
    level: 3,
    question: "第 6 章 新增 API怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 6 章 新增 API", "可复现实验"],
  },
  {
    id: "ydk-es6-07-meta-programming-1",
    chapter: "ydk-es6-07-meta-programming",
    level: 1,
    question: "第 7 章 元编程的核心主张是什么？",
    answer:
      "元编程让程序观察或改写语言级操作：函数名与元属性提供上下文，知名 Symbol 定制协议，Proxy 拦截内部方法，Reflect 提供与这些内部操作对齐的函数接口。",
    tags: ["第 7 章 元编程", "核心机制"],
  },
  {
    id: "ydk-es6-07-meta-programming-2",
    chapter: "ydk-es6-07-meta-programming",
    level: 2,
    question: "第 7 章 元编程覆盖哪些权威目录条目？",
    answer:
      "Chapter 7: Meta Programming、Function Names、Meta Properties、Well Known Symbols、Proxies、Reflect API、Feature Testing、Tail Call Optimization (TCO)",
    tags: ["第 7 章 元编程", "目录覆盖"],
  },
  {
    id: "ydk-es6-07-meta-programming-3",
    chapter: "ydk-es6-07-meta-programming",
    level: 2,
    question: "第 7 章 元编程的六阶段证据链是什么？",
    answer:
      "选择要观察的语言操作 → 创建目标对象与处理器 → Proxy 拦截对应内部方法 → 用 Reflect 保留默认语义 → 维护代理不变量 → 用特性检测和撤销路径验收",
    tags: ["第 7 章 元编程", "机制链"],
  },
  {
    id: "ydk-es6-07-meta-programming-4",
    chapter: "ydk-es6-07-meta-programming",
    level: 3,
    question: "第 7 章 元编程为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 7 章 元编程", "故障注入"],
  },
  {
    id: "ydk-es6-07-meta-programming-5",
    chapter: "ydk-es6-07-meta-programming",
    level: 3,
    question: "第 7 章 元编程签发时保持什么不变量？",
    answer:
      "元编程让程序观察或改写语言级操作：函数名与元属性提供上下文，知名 Symbol 定制协议，Proxy 拦截内部方法，Reflect 提供与这些内部操作对齐的函数接口。",
    tags: ["第 7 章 元编程", "工程验收"],
  },
  {
    id: "ydk-es6-07-meta-programming-6",
    chapter: "ydk-es6-07-meta-programming",
    level: 3,
    question: "第 7 章 元编程怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 7 章 元编程", "可复现实验"],
  },
  {
    id: "ydk-es6-08-beyond-es6-1",
    chapter: "ydk-es6-08-beyond-es6",
    level: 1,
    question: "第 8 章 ES6 之后的核心主张是什么？",
    answer:
      "原书记录了 2015 年的未来候选：async 函数、指数运算、对象展开和 includes 后来进入规范，Object.observe 与 SIMD.js 则被撤回；学习提案必须追踪最终状态。",
    tags: ["第 8 章 ES6 之后", "核心机制"],
  },
  {
    id: "ydk-es6-08-beyond-es6-2",
    chapter: "ydk-es6-08-beyond-es6",
    level: 2,
    question: "第 8 章 ES6 之后覆盖哪些权威目录条目？",
    answer:
      "Chapter 8: Beyond ES6、async functions、Object.observe(..)、Exponentiation Operator、Object Properties and ...、Array#includes(..)、SIMD",
    tags: ["第 8 章 ES6 之后", "目录覆盖"],
  },
  {
    id: "ydk-es6-08-beyond-es6-3",
    chapter: "ydk-es6-08-beyond-es6",
    level: 2,
    question: "第 8 章 ES6 之后的六阶段证据链是什么？",
    answer:
      "读取原书提案快照 → 查询当前规范状态 → 区分已标准化与已撤回能力 → 用最终语法重写示例 → 为撤回提案选择现代替代 → 在目标引擎验证行为",
    tags: ["第 8 章 ES6 之后", "机制链"],
  },
  {
    id: "ydk-es6-08-beyond-es6-4",
    chapter: "ydk-es6-08-beyond-es6",
    level: 3,
    question: "第 8 章 ES6 之后为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["第 8 章 ES6 之后", "故障注入"],
  },
  {
    id: "ydk-es6-08-beyond-es6-5",
    chapter: "ydk-es6-08-beyond-es6",
    level: 3,
    question: "第 8 章 ES6 之后签发时保持什么不变量？",
    answer:
      "原书记录了 2015 年的未来候选：async 函数、指数运算、对象展开和 includes 后来进入规范，Object.observe 与 SIMD.js 则被撤回；学习提案必须追踪最终状态。",
    tags: ["第 8 章 ES6 之后", "工程验收"],
  },
  {
    id: "ydk-es6-08-beyond-es6-6",
    chapter: "ydk-es6-08-beyond-es6",
    level: 3,
    question: "第 8 章 ES6 之后怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["第 8 章 ES6 之后", "可复现实验"],
  },
  {
    id: "ydk-official-final-review-1",
    chapter: "ydk-official-final-review",
    level: 1,
    question: "《你不知道的 JavaScript》全书总复习的核心主张是什么？",
    answer:
      "总复习不以背诵术语结束，而要求对同一程序同时解释标识符查找、this 绑定、原型委托、类型转换、任务顺序与版本边界，并能复现实验的首个偏离点。",
    tags: ["《你不知道的 JavaScript》全书总复习", "核心机制"],
  },
  {
    id: "ydk-official-final-review-2",
    chapter: "ydk-official-final-review",
    level: 2,
    question: "《你不知道的 JavaScript》全书总复习覆盖哪些权威目录条目？",
    answer:
      "You Don't Know JS, first-edition final review、Scope & Closures evidence、this & Object Prototypes evidence、Types & Grammar evidence、Async & Performance evidence、Up & Going evidence、ES6 & Beyond evidence",
    tags: ["《你不知道的 JavaScript》全书总复习", "目录覆盖"],
  },
  {
    id: "ydk-official-final-review-3",
    chapter: "ydk-official-final-review",
    level: 2,
    question: "《你不知道的 JavaScript》全书总复习的六阶段证据链是什么？",
    answer:
      "冻结源码与运行环境 → 预测同步求值结果 → 标注作用域与 this → 展开类型与原型步骤 → 记录任务和微任务顺序 → 核对规范版本并签发",
    tags: ["《你不知道的 JavaScript》全书总复习", "机制链"],
  },
  {
    id: "ydk-official-final-review-4",
    chapter: "ydk-official-final-review",
    level: 3,
    question: "《你不知道的 JavaScript》全书总复习为什么不能只看最终输出？",
    answer:
      "最终输出会隐藏作用域命中、this 接收者、类型转换、任务顺序和版本差异，必须保存首个偏离点与恢复轨迹。",
    tags: ["《你不知道的 JavaScript》全书总复习", "故障注入"],
  },
  {
    id: "ydk-official-final-review-5",
    chapter: "ydk-official-final-review",
    level: 3,
    question: "《你不知道的 JavaScript》全书总复习签发时保持什么不变量？",
    answer:
      "总复习不以背诵术语结束，而要求对同一程序同时解释标识符查找、this 绑定、原型委托、类型转换、任务顺序与版本边界，并能复现实验的首个偏离点。",
    tags: ["《你不知道的 JavaScript》全书总复习", "工程验收"],
  },
  {
    id: "ydk-official-final-review-6",
    chapter: "ydk-official-final-review",
    level: 3,
    question: "《你不知道的 JavaScript》全书总复习怎样完成可复现实验？",
    answer:
      "固定源码、运行时、输入与初始状态，依次执行正常、边界、失败和恢复样本，记录绑定、值、调用点、队列、首偏离点与清理动作。",
    tags: ["《你不知道的 JavaScript》全书总复习", "可复现实验"],
  },
] satisfies ReviewQuestion[];
