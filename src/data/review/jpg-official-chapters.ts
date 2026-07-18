import type { ReviewQuestion } from "./types";

export const jpgOfficialQuestions: ReviewQuestion[] = [
  {
    id: "jpg-official-learning-map-1",
    chapter: "jpg-official-learning-map",
    level: 1,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图的核心主张是什么？",
    answer:
      "沿语言与对象、异步与浏览器、DOM与事件、Web API与数据、模块工作者和工程实践，贯通28章与4个附录。",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "核心机制"],
  },
  {
    id: "jpg-official-learning-map-2",
    chapter: "jpg-official-learning-map",
    level: 2,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第 1 章 什么是JavaScript、第 2 章 HTML中的JavaScript、第 3 章 语言基础、第 4 章 变量、作用域与内存、第 5 章 基本引用类型、第 6 章 集合引用类型、第 7 章 迭代器与生成器、第 8 章 对象、类与面向对象编程、第 9 章 代理与反射、第 10 章 函数、第 11 章 期约与异步函数、第 12 章 BOM、第 13 章 客户端检测、第 14 章 DOM、第 15 章 DOM扩展、第 16 章 DOM2和DOM3、第 17 章 事件、第 18 章 动画与Canvas图形、第 19 章 表单脚本、第 20 章 JavaScript API、第 21 章 错误处理与调试、第 22 章 处理XML、第 23 章 JSON、第 24 章 网络请求与远程资源、第 25 章 客户端存储、第 26 章 模块、第 27 章 工作者线程、第 28 章 最佳实践、附录 A ES2018和ES2019、附录 B 严格模式、附录 C JavaScript库和框架、附录 D JavaScript工具",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "目录覆盖"],
  },
  {
    id: "jpg-official-learning-map-3",
    chapter: "jpg-official-learning-map",
    level: 2,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图的六阶段证据链是什么？",
    answer:
      "锁定第4版目录 → 掌握语言对象 → 建立异步浏览器模型 → 操纵DOM与事件 → 贯通网络存储 → 模块化部署签发",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "机制链"],
  },
  {
    id: "jpg-official-learning-map-4",
    chapter: "jpg-official-learning-map",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图应主动注入哪两类失败？",
    answer:
      "沿用旧10页专题结构，把闭包、原型链和事件循环当成原书正式章名。；只列28个章名，丢失4个附录与757个二三级公开目录条目。",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "故障注入"],
  },
  {
    id: "jpg-official-learning-map-5",
    chapter: "jpg-official-learning-map",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图签发时保持什么不变量？",
    answer:
      "28章和4个附录各有独立页面；757个公开目录条目全部可追踪；现代补充不冒充原书分节。",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "工程验收"],
  },
  {
    id: "jpg-official-learning-map-6",
    chapter: "jpg-official-learning-map",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》权威学习地图怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["《JavaScript高级程序设计（第4版）》权威学习地图", "可复现实验"],
  },
  {
    id: "jpg-01-what-is-javascript-1",
    chapter: "jpg-01-what-is-javascript",
    level: 1,
    question: "第 1 章 什么是JavaScript的核心主张是什么？",
    answer:
      "JavaScript在浏览器中由ECMAScript语言、DOM文档接口与BOM浏览器接口共同构成，三者版本与责任不能混为一谈。",
    tags: ["第 1 章 什么是JavaScript", "核心机制"],
  },
  {
    id: "jpg-01-what-is-javascript-2",
    chapter: "jpg-01-what-is-javascript",
    level: 2,
    question: "第 1 章 什么是JavaScript覆盖哪些正式目录主题？",
    answer:
      "1.1 简短的历史回顾、1.2 JavaScript实现、1.2.1 ECMAScript、1.2.2 DOM、1.2.3 BOM、1.3 JavaScript版本、1.4 小结",
    tags: ["第 1 章 什么是JavaScript", "目录覆盖"],
  },
  {
    id: "jpg-01-what-is-javascript-3",
    chapter: "jpg-01-what-is-javascript",
    level: 2,
    question: "第 1 章 什么是JavaScript的六阶段证据链是什么？",
    answer:
      "识别运行环境 → 区分语言与宿主 → 查询标准版本 → 检测实际能力 → 构造降级路径 → 跨浏览器签发",
    tags: ["第 1 章 什么是JavaScript", "机制链"],
  },
  {
    id: "jpg-01-what-is-javascript-4",
    chapter: "jpg-01-what-is-javascript",
    level: 3,
    question: "第 1 章 什么是JavaScript应主动注入哪两类失败？",
    answer:
      "把JavaScript等同于ECMAScript，遇到DOM或BOM差异时继续查语言规范。；只读浏览器版本字符串，不验证目标API和具体语义。",
    tags: ["第 1 章 什么是JavaScript", "故障注入"],
  },
  {
    id: "jpg-01-what-is-javascript-5",
    chapter: "jpg-01-what-is-javascript",
    level: 3,
    question: "第 1 章 什么是JavaScript签发时保持什么不变量？",
    answer:
      "语言、DOM和BOM责任可区分；所需能力以运行证据确认；不支持时有明确降级。",
    tags: ["第 1 章 什么是JavaScript", "工程验收"],
  },
  {
    id: "jpg-01-what-is-javascript-6",
    chapter: "jpg-01-what-is-javascript",
    level: 3,
    question: "第 1 章 什么是JavaScript怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 1 章 什么是JavaScript", "可复现实验"],
  },
  {
    id: "jpg-02-javascript-in-html-1",
    chapter: "jpg-02-javascript-in-html",
    level: 1,
    question: "第 2 章 HTML中的JavaScript的核心主张是什么？",
    answer:
      "脚本在HTML中的装载方式决定下载、解析、执行与DOMContentLoaded的相对顺序，也决定故障是否阻塞页面。",
    tags: ["第 2 章 HTML中的JavaScript", "核心机制"],
  },
  {
    id: "jpg-02-javascript-in-html-2",
    chapter: "jpg-02-javascript-in-html",
    level: 2,
    question: "第 2 章 HTML中的JavaScript覆盖哪些正式目录主题？",
    answer:
      "2.1 <script>元素、2.1.1 标签占位符、2.1.2 推迟执行脚本、2.1.3 异步执行脚本、2.1.4 动态加载脚本、2.1.5 XHTML中的变化、2.1.6 废弃的语法、2.2 行内代码与外部文件、2.3 文档模式、2.4 <noscript>元素、2.5 小结",
    tags: ["第 2 章 HTML中的JavaScript", "目录覆盖"],
  },
  {
    id: "jpg-02-javascript-in-html-3",
    chapter: "jpg-02-javascript-in-html",
    level: 2,
    question: "第 2 章 HTML中的JavaScript的六阶段证据链是什么？",
    answer:
      "解析HTML → 发现脚本资源 → 并行或阻塞下载 → 按策略执行 → 触发文档事件 → 验证失败回退",
    tags: ["第 2 章 HTML中的JavaScript", "机制链"],
  },
  {
    id: "jpg-02-javascript-in-html-4",
    chapter: "jpg-02-javascript-in-html",
    level: 3,
    question: "第 2 章 HTML中的JavaScript应主动注入哪两类失败？",
    answer:
      "把所有脚本都标成async，依赖脚本偶发先于基础库执行。；动态插入后立即使用全局变量，没有等待load或处理error。",
    tags: ["第 2 章 HTML中的JavaScript", "故障注入"],
  },
  {
    id: "jpg-02-javascript-in-html-5",
    chapter: "jpg-02-javascript-in-html",
    level: 3,
    question: "第 2 章 HTML中的JavaScript签发时保持什么不变量？",
    answer:
      "脚本依赖顺序可证明；页面解析不被无意阻塞；加载失败能显式传播且不会重复执行。",
    tags: ["第 2 章 HTML中的JavaScript", "工程验收"],
  },
  {
    id: "jpg-02-javascript-in-html-6",
    chapter: "jpg-02-javascript-in-html",
    level: 3,
    question: "第 2 章 HTML中的JavaScript怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 2 章 HTML中的JavaScript", "可复现实验"],
  },
  {
    id: "jpg-03-language-basics-1",
    chapter: "jpg-03-language-basics",
    level: 1,
    question: "第 3 章 语言基础的核心主张是什么？",
    answer:
      "语言基础要以类型转换、声明作用域和控制流的精确语义为核心，而不是只记关键字与操作符表。",
    tags: ["第 3 章 语言基础", "核心机制"],
  },
  {
    id: "jpg-03-language-basics-2",
    chapter: "jpg-03-language-basics",
    level: 2,
    question: "第 3 章 语言基础覆盖哪些正式目录主题？",
    answer:
      "3.1 语法、3.1.1 区分大小写、3.1.2 标识符、3.1.3 注释、3.1.4 严格模式、3.1.5 语句、3.2 关键字与保留字、3.3 变量、3.3.1 var关键字、3.3.2 let声明、3.3.3 const声明、3.3.4 声明风格及最佳实践、3.4 数据类型、3.4.1 typeof操作符、3.4.2 Undefined类型、3.4.3 Null类型、3.4.4 Boolean类型、3.4.5 Number类型、3.4.6 String类型、3.4.7 Symbol类型、3.4.8 Object类型、3.5 操作符、3.5.1 一元操作符、3.5.2 位操作符、3.5.3 布尔操作符、3.5.4 乘性操作符、3.5.5 指数操作符、3.5.6 加性操作符、3.5.7 关系操作符、3.5.8 相等操作符、3.5.9 条件操作符、3.5.10 赋值操作符、3.5.11 逗号操作符、3.6 语句、3.6.1 if语句、3.6.2 do-while语句、3.6.3 while语句、3.6.4 for语句、3.6.5 for-in语句、3.6.6 for-of语句、3.6.7 标签语句、3.6.8 break和continue语句、3.6.9 with语句、3.6.10 switch语句、3.7 函数、3.8 小结",
    tags: ["第 3 章 语言基础", "目录覆盖"],
  },
  {
    id: "jpg-03-language-basics-3",
    chapter: "jpg-03-language-basics",
    level: 2,
    question: "第 3 章 语言基础的六阶段证据链是什么？",
    answer:
      "声明绑定 → 识别值类型 → 应用转换规则 → 计算操作符 → 推进控制流 → 用边界样本确认",
    tags: ["第 3 章 语言基础", "机制链"],
  },
  {
    id: "jpg-03-language-basics-4",
    chapter: "jpg-03-language-basics",
    level: 3,
    question: "第 3 章 语言基础应主动注入哪两类失败？",
    answer:
      "认为const会让对象不可变，随后把共享对象在多处悄然修改。；依赖宽松相等和隐式数字转换处理外部输入。",
    tags: ["第 3 章 语言基础", "故障注入"],
  },
  {
    id: "jpg-03-language-basics-5",
    chapter: "jpg-03-language-basics",
    level: 3,
    question: "第 3 章 语言基础签发时保持什么不变量？",
    answer:
      "每个绑定的作用域与可变性明确；外部值显式转换；控制流在空值、NaN和边界迭代上可预测。",
    tags: ["第 3 章 语言基础", "工程验收"],
  },
  {
    id: "jpg-03-language-basics-6",
    chapter: "jpg-03-language-basics",
    level: 3,
    question: "第 3 章 语言基础怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 3 章 语言基础", "可复现实验"],
  },
  {
    id: "jpg-04-variables-scope-memory-1",
    chapter: "jpg-04-variables-scope-memory",
    level: 1,
    question: "第 4 章 变量、作用域与内存的核心主张是什么？",
    answer:
      "变量行为由值类别、执行上下文和可达性共同决定；内存管理的目标是缩短无用对象的可达生命周期。",
    tags: ["第 4 章 变量、作用域与内存", "核心机制"],
  },
  {
    id: "jpg-04-variables-scope-memory-2",
    chapter: "jpg-04-variables-scope-memory",
    level: 2,
    question: "第 4 章 变量、作用域与内存覆盖哪些正式目录主题？",
    answer:
      "4.1 原始值与引用值、4.1.1 动态属性、4.1.2 复制值、4.1.3 传递参数、4.1.4 确定类型、4.2 执行上下文与作用域、4.2.1 作用域链增强、4.2.2 变量声明、4.3 垃圾回收、4.3.1 标记清理、4.3.2 引用计数、4.3.3 性能、4.3.4 内存管理、4.4 小结",
    tags: ["第 4 章 变量、作用域与内存", "目录覆盖"],
  },
  {
    id: "jpg-04-variables-scope-memory-3",
    chapter: "jpg-04-variables-scope-memory",
    level: 2,
    question: "第 4 章 变量、作用域与内存的六阶段证据链是什么？",
    answer:
      "创建执行上下文 → 建立词法环境 → 解析标识符 → 共享或复制值 → 更新可达图 → 释放外部引用",
    tags: ["第 4 章 变量、作用域与内存", "机制链"],
  },
  {
    id: "jpg-04-variables-scope-memory-4",
    chapter: "jpg-04-variables-scope-memory",
    level: 3,
    question: "第 4 章 变量、作用域与内存应主动注入哪两类失败？",
    answer:
      "把对象参数称为按引用传递，误以为函数内重新赋值会替换调用方变量。；相信垃圾收集器会处理一切，遗漏监听器和定时器持有的对象图。",
    tags: ["第 4 章 变量、作用域与内存", "故障注入"],
  },
  {
    id: "jpg-04-variables-scope-memory-5",
    chapter: "jpg-04-variables-scope-memory",
    level: 3,
    question: "第 4 章 变量、作用域与内存签发时保持什么不变量？",
    answer:
      "标识符解析遵循词法作用域；共享对象修改可追踪；销毁后不存在来自长期根的意外保留路径。",
    tags: ["第 4 章 变量、作用域与内存", "工程验收"],
  },
  {
    id: "jpg-04-variables-scope-memory-6",
    chapter: "jpg-04-variables-scope-memory",
    level: 3,
    question: "第 4 章 变量、作用域与内存怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 4 章 变量、作用域与内存", "可复现实验"],
  },
  {
    id: "jpg-05-basic-reference-types-1",
    chapter: "jpg-05-basic-reference-types",
    level: 1,
    question: "第 5 章 基本引用类型的核心主张是什么？",
    answer:
      "Date、RegExp、包装对象与全局内置对象都有隐式状态和转换规则，使用时必须固定时区、正则状态与值类别。",
    tags: ["第 5 章 基本引用类型", "核心机制"],
  },
  {
    id: "jpg-05-basic-reference-types-2",
    chapter: "jpg-05-basic-reference-types",
    level: 2,
    question: "第 5 章 基本引用类型覆盖哪些正式目录主题？",
    answer:
      "5.1 Date、5.1.1 继承的方法、5.1.2 日期格式化方法、5.1.3 日期/时间组件方法、5.2 RegExp、5.2.1 RegExp实例属性、5.2.2 RegExp实例方法、5.2.3 RegExp构造函数属性、5.2.4 模式局限、5.3 原始值包装类型、5.3.1 Boolean、5.3.2 Number、5.3.3 String、5.4 单例内置对象、5.4.1 Global、5.4.2 Math、5.5 小结",
    tags: ["第 5 章 基本引用类型", "目录覆盖"],
  },
  {
    id: "jpg-05-basic-reference-types-3",
    chapter: "jpg-05-basic-reference-types",
    level: 2,
    question: "第 5 章 基本引用类型的六阶段证据链是什么？",
    answer:
      "确认输入表示 → 构造内置对象 → 区分值与包装 → 执行格式或匹配 → 检查隐式状态 → 序列化边界结果",
    tags: ["第 5 章 基本引用类型", "机制链"],
  },
  {
    id: "jpg-05-basic-reference-types-4",
    chapter: "jpg-05-basic-reference-types",
    level: 3,
    question: "第 5 章 基本引用类型应主动注入哪两类失败？",
    answer:
      "用本地时间字符串跨系统传输日期，部署到不同时区后偏移。；复用带g标志的正则做验证，lastIndex让奇数次与偶数次结果不同。",
    tags: ["第 5 章 基本引用类型", "故障注入"],
  },
  {
    id: "jpg-05-basic-reference-types-5",
    chapter: "jpg-05-basic-reference-types",
    level: 3,
    question: "第 5 章 基本引用类型签发时保持什么不变量？",
    answer:
      "时间输入含时区；正则状态不跨无关请求泄漏；业务布尔和数字保持原始值而非包装对象。",
    tags: ["第 5 章 基本引用类型", "工程验收"],
  },
  {
    id: "jpg-05-basic-reference-types-6",
    chapter: "jpg-05-basic-reference-types",
    level: 3,
    question: "第 5 章 基本引用类型怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 5 章 基本引用类型", "可复现实验"],
  },
  {
    id: "jpg-06-collection-reference-types-1",
    chapter: "jpg-06-collection-reference-types",
    level: 1,
    question: "第 6 章 集合引用类型的核心主张是什么？",
    answer:
      "集合类型的选择由键语义、顺序、所有权、可迭代性和内存保留共同决定，不能只看API便利。",
    tags: ["第 6 章 集合引用类型", "核心机制"],
  },
  {
    id: "jpg-06-collection-reference-types-2",
    chapter: "jpg-06-collection-reference-types",
    level: 2,
    question: "第 6 章 集合引用类型覆盖哪些正式目录主题？",
    answer:
      "6.1 Object、6.2 Array、6.2.1 创建数组、6.2.2 数组空位、6.2.3 数组索引、6.2.4 检测数组、6.2.5 迭代器方法、6.2.6 复制和填充方法、6.2.7 转换方法、6.2.8 栈方法、6.2.9 队列方法、6.2.10 排序方法、6.2.11 操作方法、6.2.12 搜索和位置方法、6.2.13 迭代方法、6.2.14 归并方法、6.3 定型数组、6.3.1 历史、6.3.2 ArrayBuffer、6.3.3 DataView、6.3.4 定型数组、6.4 Map、6.4.1 基本API、6.4.2 顺序与迭代、6.4.3 选择Object还是Map、6.5 WeakMap、6.5.1 基本API、6.5.2 弱键、6.5.3 不可迭代键、6.5.4 使用弱映射、6.6 Set、6.6.1 基本API、6.6.2 顺序与迭代、6.6.3 定义正式集合操作、6.7 WeakSet、6.7.1 基本API、6.7.2 弱值、6.7.3 不可迭代值、6.7.4 使用弱集合、6.8 迭代与扩展操作、6.9 小结",
    tags: ["第 6 章 集合引用类型", "目录覆盖"],
  },
  {
    id: "jpg-06-collection-reference-types-3",
    chapter: "jpg-06-collection-reference-types",
    level: 2,
    question: "第 6 章 集合引用类型的六阶段证据链是什么？",
    answer:
      "定义键和值语义 → 选择集合类型 → 建立迭代顺序 → 执行更新查询 → 处理视图与弱引用 → 验证复杂度内存",
    tags: ["第 6 章 集合引用类型", "机制链"],
  },
  {
    id: "jpg-06-collection-reference-types-4",
    chapter: "jpg-06-collection-reference-types",
    level: 3,
    question: "第 6 章 集合引用类型应主动注入哪两类失败？",
    answer:
      "用普通对象承载任意用户键，遭遇原型键冲突和字符串化。；把WeakMap当可枚举缓存，随后发现无法统计和清理全部条目。",
    tags: ["第 6 章 集合引用类型", "故障注入"],
  },
  {
    id: "jpg-06-collection-reference-types-5",
    chapter: "jpg-06-collection-reference-types",
    level: 3,
    question: "第 6 章 集合引用类型签发时保持什么不变量？",
    answer:
      "集合类型匹配键与顺序语义；二进制长度单位明确；缓存不会无意延长外部对象生命周期。",
    tags: ["第 6 章 集合引用类型", "工程验收"],
  },
  {
    id: "jpg-06-collection-reference-types-6",
    chapter: "jpg-06-collection-reference-types",
    level: 3,
    question: "第 6 章 集合引用类型怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 6 章 集合引用类型", "可复现实验"],
  },
  {
    id: "jpg-07-iterators-generators-1",
    chapter: "jpg-07-iterators-generators",
    level: 1,
    question: "第 7 章 迭代器与生成器的核心主张是什么？",
    answer:
      "迭代协议把数据来源与消费方式解耦，生成器再把暂停、恢复和双向传值变成可组合状态机。",
    tags: ["第 7 章 迭代器与生成器", "核心机制"],
  },
  {
    id: "jpg-07-iterators-generators-2",
    chapter: "jpg-07-iterators-generators",
    level: 2,
    question: "第 7 章 迭代器与生成器覆盖哪些正式目录主题？",
    answer:
      "7.1 理解迭代、7.2 迭代器模式、7.2.1 可迭代协议、7.2.2 迭代器协议、7.2.3 自定义迭代器、7.2.4 提前终止迭代器、7.3 生成器、7.3.1 生成器基础、7.3.2 通过yield中断执行、7.3.3 生成器作为默认迭代器、7.3.4 提前终止生成器、7.4 小结",
    tags: ["第 7 章 迭代器与生成器", "目录覆盖"],
  },
  {
    id: "jpg-07-iterators-generators-3",
    chapter: "jpg-07-iterators-generators",
    level: 2,
    question: "第 7 章 迭代器与生成器的六阶段证据链是什么？",
    answer:
      "请求默认迭代器 → 创建迭代状态 → 调用next推进 → 产出value/done → 处理提前return → 证明资源清理",
    tags: ["第 7 章 迭代器与生成器", "机制链"],
  },
  {
    id: "jpg-07-iterators-generators-4",
    chapter: "jpg-07-iterators-generators",
    level: 3,
    question: "第 7 章 迭代器与生成器应主动注入哪两类失败？",
    answer:
      "让Symbol.iterator返回同一个已消费迭代器，第二次遍历为空。；只实现next，消费者break后文件句柄或订阅没有清理。",
    tags: ["第 7 章 迭代器与生成器", "故障注入"],
  },
  {
    id: "jpg-07-iterators-generators-5",
    chapter: "jpg-07-iterators-generators",
    level: 3,
    question: "第 7 章 迭代器与生成器签发时保持什么不变量？",
    answer:
      "每次迭代获得独立状态；done语义稳定；自然结束、异常与提前退出都执行资源清理。",
    tags: ["第 7 章 迭代器与生成器", "工程验收"],
  },
  {
    id: "jpg-07-iterators-generators-6",
    chapter: "jpg-07-iterators-generators",
    level: 3,
    question: "第 7 章 迭代器与生成器怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 7 章 迭代器与生成器", "可复现实验"],
  },
  {
    id: "jpg-08-objects-classes-oop-1",
    chapter: "jpg-08-objects-classes-oop",
    level: 1,
    question: "第 8 章 对象、类与面向对象编程的核心主张是什么？",
    answer:
      "JavaScript对象模型以属性描述符和原型委托为基础，class是更清晰的语法边界而不是另一套继承机制。",
    tags: ["第 8 章 对象、类与面向对象编程", "核心机制"],
  },
  {
    id: "jpg-08-objects-classes-oop-2",
    chapter: "jpg-08-objects-classes-oop",
    level: 2,
    question: "第 8 章 对象、类与面向对象编程覆盖哪些正式目录主题？",
    answer:
      "8.1 理解对象、8.1.1 属性的类型、8.1.2 定义多个属性、8.1.3 读取属性的特性、8.1.4 合并对象、8.1.5 对象标识及相等判定、8.1.6 增强的对象语法、8.1.7 对象解构、8.2 创建对象、8.2.1 概述、8.2.2 工厂模式、8.2.3 构造函数模式、8.2.4 原型模式、8.2.5 对象迭代、8.3 继承、8.3.1 原型链、8.3.2 盗用构造函数、8.3.3 组合继承、8.3.4 原型式继承、8.3.5 寄生式继承、8.3.6 寄生式组合继承、8.4 类、8.4.1 类定义、8.4.2 类构造函数、8.4.3 实例、原型和类成员、8.4.4 继承、8.5 小结",
    tags: ["第 8 章 对象、类与面向对象编程", "目录覆盖"],
  },
  {
    id: "jpg-08-objects-classes-oop-3",
    chapter: "jpg-08-objects-classes-oop",
    level: 2,
    question: "第 8 章 对象、类与面向对象编程的六阶段证据链是什么？",
    answer:
      "定义对象不变量 → 配置属性描述符 → 建立原型委托 → 初始化实例状态 → 扩展继承关系 → 检查身份与封装",
    tags: ["第 8 章 对象、类与面向对象编程", "机制链"],
  },
  {
    id: "jpg-08-objects-classes-oop-4",
    chapter: "jpg-08-objects-classes-oop",
    level: 3,
    question: "第 8 章 对象、类与面向对象编程应主动注入哪两类失败？",
    answer:
      "把class当成与原型无关的新对象模型，调试属性查找时失去路径。；在共享原型上放可变数组，所有实例意外共享内容。",
    tags: ["第 8 章 对象、类与面向对象编程", "故障注入"],
  },
  {
    id: "jpg-08-objects-classes-oop-5",
    chapter: "jpg-08-objects-classes-oop",
    level: 3,
    question: "第 8 章 对象、类与面向对象编程签发时保持什么不变量？",
    answer:
      "实例自有状态彼此隔离；共享行为位于明确原型；属性描述符和继承关系不破坏对象不变量。",
    tags: ["第 8 章 对象、类与面向对象编程", "工程验收"],
  },
  {
    id: "jpg-08-objects-classes-oop-6",
    chapter: "jpg-08-objects-classes-oop",
    level: 3,
    question: "第 8 章 对象、类与面向对象编程怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 8 章 对象、类与面向对象编程", "可复现实验"],
  },
  {
    id: "jpg-09-proxies-reflect-1",
    chapter: "jpg-09-proxies-reflect",
    level: 1,
    question: "第 9 章 代理与反射的核心主张是什么？",
    answer:
      "Proxy可以拦截对象内部操作，Reflect提供对应默认语义；捕获器必须保持规范不变式并避免递归。",
    tags: ["第 9 章 代理与反射", "核心机制"],
  },
  {
    id: "jpg-09-proxies-reflect-2",
    chapter: "jpg-09-proxies-reflect",
    level: 2,
    question: "第 9 章 代理与反射覆盖哪些正式目录主题？",
    answer:
      "9.1 代理基础、9.1.1 创建空代理、9.1.2 定义捕获器、9.1.3 捕获器参数和反射API、9.1.4 捕获器不变式、9.1.5 可撤销代理、9.1.6 实用反射API、9.1.7 代理另一个代理、9.1.8 代理的问题与不足、9.2 代理捕获器与反射方法、9.2.1 get()、9.2.2 set()、9.2.3 has()、9.2.4 defineProperty()、9.2.5 getOwnPropertyDescriptor()、9.2.6 deleteProperty()、9.2.7 ownKeys()、9.2.8 getPrototypeOf()、9.2.9 setPrototypeOf()、9.2.10 isExtensible()、9.2.11 preventExtensions()、9.2.12 apply()、9.2.13 construct()、9.3 代理模式、9.3.1 跟踪属性访问、9.3.2 隐藏属性、9.3.3 属性验证、9.3.4 函数与构造函数参数验证、9.3.5 数据绑定与可观察对象、9.4 小结",
    tags: ["第 9 章 代理与反射", "目录覆盖"],
  },
  {
    id: "jpg-09-proxies-reflect-3",
    chapter: "jpg-09-proxies-reflect",
    level: 2,
    question: "第 9 章 代理与反射的六阶段证据链是什么？",
    answer:
      "确定拦截操作 → 创建目标代理 → 委托Reflect默认行为 → 加入验证跟踪 → 检查规范不变式 → 撤销与异常签发",
    tags: ["第 9 章 代理与反射", "机制链"],
  },
  {
    id: "jpg-09-proxies-reflect-4",
    chapter: "jpg-09-proxies-reflect",
    level: 3,
    question: "第 9 章 代理与反射应主动注入哪两类失败？",
    answer:
      "捕获器内读取receiver[prop]，立即再次触发同一捕获器形成递归。；ownKeys隐藏不可配置属性，直到运行时以TypeError失败。",
    tags: ["第 9 章 代理与反射", "故障注入"],
  },
  {
    id: "jpg-09-proxies-reflect-5",
    chapter: "jpg-09-proxies-reflect",
    level: 3,
    question: "第 9 章 代理与反射签发时保持什么不变量？",
    answer:
      "捕获器通过Reflect保留默认语义；所有规范不变式成立；代理身份、撤销和递归路径有测试。",
    tags: ["第 9 章 代理与反射", "工程验收"],
  },
  {
    id: "jpg-09-proxies-reflect-6",
    chapter: "jpg-09-proxies-reflect",
    level: 3,
    question: "第 9 章 代理与反射怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 9 章 代理与反射", "可复现实验"],
  },
  {
    id: "jpg-10-functions-1",
    chapter: "jpg-10-functions",
    level: 1,
    question: "第 10 章 函数的核心主张是什么？",
    answer:
      "函数同时是可调用对象、词法闭包和this调用边界；参数、调用形式与生命周期共同决定行为。",
    tags: ["第 10 章 函数", "核心机制"],
  },
  {
    id: "jpg-10-functions-2",
    chapter: "jpg-10-functions",
    level: 2,
    question: "第 10 章 函数覆盖哪些正式目录主题？",
    answer:
      "10.1 箭头函数、10.2 函数名、10.3 理解参数、箭头函数中的参数、10.4 没有重载、10.5 默认参数值、默认参数作用域与暂时性死区、10.6 参数扩展与收集、10.6.1 扩展参数、10.6.2 收集参数、10.7 函数声明与函数表达式、10.8 函数作为值、10.9 函数内部、10.9.1 arguments、10.9.2 this、10.9.3 caller、10.9.4 new.target、10.10 函数属性与方法、10.11 函数表达式、10.12 递归、10.13 尾调用优化、10.13.1 尾调用优化的条件、10.13.2 尾调用优化的代码、10.14 闭包、10.14.1 this对象、10.14.2 内存泄漏、10.15 立即调用的函数表达式、10.16 私有变量、10.16.1 静态私有变量、10.16.2 模块模式、10.16.3 模块增强模式、10.17 小结",
    tags: ["第 10 章 函数", "目录覆盖"],
  },
  {
    id: "jpg-10-functions-3",
    chapter: "jpg-10-functions",
    level: 2,
    question: "第 10 章 函数的六阶段证据链是什么？",
    answer:
      "声明函数边界 → 解析参数默认值 → 确定this与new.target → 执行函数体 → 保留闭包环境 → 释放或返回结果",
    tags: ["第 10 章 函数", "机制链"],
  },
  {
    id: "jpg-10-functions-4",
    chapter: "jpg-10-functions",
    level: 3,
    question: "第 10 章 函数应主动注入哪两类失败？",
    answer:
      "把对象方法写成箭头函数后期待call改变this。；长期事件回调闭包捕获整个页面模型，组件销毁后仍被保留。",
    tags: ["第 10 章 函数", "故障注入"],
  },
  {
    id: "jpg-10-functions-5",
    chapter: "jpg-10-functions",
    level: 3,
    question: "第 10 章 函数签发时保持什么不变量？",
    answer:
      "函数的参数、this与构造能力由契约定义；闭包只保留必要状态；递归和尾调用不依赖未保证优化。",
    tags: ["第 10 章 函数", "工程验收"],
  },
  {
    id: "jpg-10-functions-6",
    chapter: "jpg-10-functions",
    level: 3,
    question: "第 10 章 函数怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 10 章 函数", "可复现实验"],
  },
  {
    id: "jpg-11-promises-async-functions-1",
    chapter: "jpg-11-promises-async-functions",
    level: 1,
    question: "第 11 章 期约与异步函数的核心主张是什么？",
    answer:
      "Promise表示一次异步结果的状态与反应链，async/await只重写控制流，不自动提供取消、超时或并发限制。",
    tags: ["第 11 章 期约与异步函数", "核心机制"],
  },
  {
    id: "jpg-11-promises-async-functions-2",
    chapter: "jpg-11-promises-async-functions",
    level: 2,
    question: "第 11 章 期约与异步函数覆盖哪些正式目录主题？",
    answer:
      "11.1 异步编程、11.1.1 同步与异步、11.1.2 以往的异步编程模式、11.2 期约、11.2.1 Promises/A+规范、11.2.2 期约基础、11.2.3 期约的实例方法、11.2.4 期约连锁与期约合成、11.2.5 期约扩展、11.3 异步函数、11.3.1 异步函数、11.3.2 停止和恢复执行、11.3.3 异步函数策略、11.4 小结",
    tags: ["第 11 章 期约与异步函数", "目录覆盖"],
  },
  {
    id: "jpg-11-promises-async-functions-3",
    chapter: "jpg-11-promises-async-functions",
    level: 2,
    question: "第 11 章 期约与异步函数的六阶段证据链是什么？",
    answer:
      "启动异步操作 → 创建Promise状态 → 登记成功失败反应 → 以微任务传播 → 聚合并发结果 → 取消超时与清理",
    tags: ["第 11 章 期约与异步函数", "机制链"],
  },
  {
    id: "jpg-11-promises-async-functions-4",
    chapter: "jpg-11-promises-async-functions",
    level: 3,
    question: "第 11 章 期约与异步函数应主动注入哪两类失败？",
    answer:
      "then处理器启动异步工作却忘记return，下游过早完成。；在循环里逐个await独立请求，把可并发任务无意串行化。",
    tags: ["第 11 章 期约与异步函数", "故障注入"],
  },
  {
    id: "jpg-11-promises-async-functions-5",
    chapter: "jpg-11-promises-async-functions",
    level: 3,
    question: "第 11 章 期约与异步函数签发时保持什么不变量？",
    answer:
      "每个异步失败都有观察者；并发策略与部分失败语义明确；取消、超时和清理不依赖Promise自身。",
    tags: ["第 11 章 期约与异步函数", "工程验收"],
  },
  {
    id: "jpg-11-promises-async-functions-6",
    chapter: "jpg-11-promises-async-functions",
    level: 3,
    question: "第 11 章 期约与异步函数怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 11 章 期约与异步函数", "可复现实验"],
  },
  {
    id: "jpg-12-browser-object-model-1",
    chapter: "jpg-12-browser-object-model",
    level: 1,
    question: "第 12 章 BOM的核心主张是什么？",
    answer:
      "BOM围绕窗口、地址、导航、屏幕与历史提供浏览器级状态，读写这些状态会受到安全、用户激活和跨源限制。",
    tags: ["第 12 章 BOM", "核心机制"],
  },
  {
    id: "jpg-12-browser-object-model-2",
    chapter: "jpg-12-browser-object-model",
    level: 2,
    question: "第 12 章 BOM覆盖哪些正式目录主题？",
    answer:
      "12.1 window对象、12.1.1 Global作用域、12.1.2 窗口关系、12.1.3 窗口位置与像素比、12.1.4 窗口大小、12.1.5 视口位置、12.1.6 导航与打开新窗口、12.1.7 定时器、12.1.8 系统对话框、12.2 location对象、12.2.1 查询字符串、12.2.2 操作地址、12.3 navigator对象、12.3.1 检测插件、12.3.2 注册处理程序、12.4 screen对象、12.5 history对象、12.5.1 导航、12.5.2 历史状态管理、12.6 小结",
    tags: ["第 12 章 BOM", "目录覆盖"],
  },
  {
    id: "jpg-12-browser-object-model-3",
    chapter: "jpg-12-browser-object-model",
    level: 2,
    question: "第 12 章 BOM的六阶段证据链是什么？",
    answer:
      "读取窗口关系 → 区分视口与屏幕 → 解析location → 检测navigator能力 → 更新history状态 → 响应导航与清理",
    tags: ["第 12 章 BOM", "机制链"],
  },
  {
    id: "jpg-12-browser-object-model-4",
    chapter: "jpg-12-browser-object-model",
    level: 3,
    question: "第 12 章 BOM应主动注入哪两类失败？",
    answer:
      "用screen宽度决定布局，忽略窗口、缩放和移动端可视视口。；pushState后只更新URL不更新应用状态，前进后退出现分叉。",
    tags: ["第 12 章 BOM", "故障注入"],
  },
  {
    id: "jpg-12-browser-object-model-5",
    chapter: "jpg-12-browser-object-model",
    level: 3,
    question: "第 12 章 BOM签发时保持什么不变量？",
    answer:
      "URL、历史条目和页面状态可相互恢复；跨源边界不越权；能力与权限以实际调用证据确认。",
    tags: ["第 12 章 BOM", "工程验收"],
  },
  {
    id: "jpg-12-browser-object-model-6",
    chapter: "jpg-12-browser-object-model",
    level: 3,
    question: "第 12 章 BOM怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 12 章 BOM", "可复现实验"],
  },
  {
    id: "jpg-13-client-detection-1",
    chapter: "jpg-13-client-detection",
    level: 1,
    question: "第 13 章 客户端检测的核心主张是什么？",
    answer:
      "客户端检测应先检测完成任务所需的能力，再在无法替代时有限使用用户代理与软硬件信息。",
    tags: ["第 13 章 客户端检测", "核心机制"],
  },
  {
    id: "jpg-13-client-detection-2",
    chapter: "jpg-13-client-detection",
    level: 2,
    question: "第 13 章 客户端检测覆盖哪些正式目录主题？",
    answer:
      "13.1 能力检测、13.1.1 安全能力检测、13.1.2 基于能力检测进行浏览器分析、13.2 用户代理检测、13.2.1 用户代理的历史、13.2.2 浏览器分析、13.3 软件与硬件检测、13.3.1 识别浏览器与操作系统、13.3.2 浏览器元数据、13.3.3 硬件、13.4 小结",
    tags: ["第 13 章 客户端检测", "目录覆盖"],
  },
  {
    id: "jpg-13-client-detection-3",
    chapter: "jpg-13-client-detection",
    level: 2,
    question: "第 13 章 客户端检测的六阶段证据链是什么？",
    answer:
      "定义目标任务 → 检测直接能力 → 验证方法语义 → 查询权限上下文 → 选择增强或降级 → 记录真实失败",
    tags: ["第 13 章 客户端检测", "机制链"],
  },
  {
    id: "jpg-13-client-detection-4",
    chapter: "jpg-13-client-detection",
    level: 3,
    question: "第 13 章 客户端检测应主动注入哪两类失败？",
    answer:
      "由支持一个API推断另一个同年代API也支持。；把UA解析结果当安全或授权依据，客户端伪装即可绕过。",
    tags: ["第 13 章 客户端检测", "故障注入"],
  },
  {
    id: "jpg-13-client-detection-5",
    chapter: "jpg-13-client-detection",
    level: 3,
    question: "第 13 章 客户端检测签发时保持什么不变量？",
    answer:
      "核心功能不依赖品牌判断；增强由直接能力和权限决定；检测结果不参与信任与安全裁决。",
    tags: ["第 13 章 客户端检测", "工程验收"],
  },
  {
    id: "jpg-13-client-detection-6",
    chapter: "jpg-13-client-detection",
    level: 3,
    question: "第 13 章 客户端检测怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 13 章 客户端检测", "可复现实验"],
  },
  {
    id: "jpg-14-dom-1",
    chapter: "jpg-14-dom",
    level: 1,
    question: "第 14 章 DOM的核心主张是什么？",
    answer:
      "DOM是有节点类型、所有权文档和变更成本的树；查询、创建、插入、移除与观察必须保持结构和生命周期。",
    tags: ["第 14 章 DOM", "核心机制"],
  },
  {
    id: "jpg-14-dom-2",
    chapter: "jpg-14-dom",
    level: 2,
    question: "第 14 章 DOM覆盖哪些正式目录主题？",
    answer:
      "14.1 节点层级、14.1.1 Node类型、14.1.2 Document类型、14.1.3 Element类型、14.1.4 Text类型、14.1.5 Comment类型、14.1.6 CDATASection类型、14.1.7 DocumentType类型、14.1.8 DocumentFragment类型、14.1.9 Attr类型、14.2 DOM编程、14.2.1 动态脚本、14.2.2 动态样式、14.2.3 操作表格、14.2.4 使用NodeList、14.3 MutationObserver接口、14.3.1 基本用法、14.3.2 MutationObserverInit与观察范围、14.3.3 异步回调与记录队列、14.3.4 性能、内存与垃圾回收、14.4 小结",
    tags: ["第 14 章 DOM", "目录覆盖"],
  },
  {
    id: "jpg-14-dom-3",
    chapter: "jpg-14-dom",
    level: 2,
    question: "第 14 章 DOM的六阶段证据链是什么？",
    answer:
      "查询目标节点 → 创建正确节点类型 → 在片段中组装 → 一次提交到文档 → 观察变化批次 → 断开观察与移除",
    tags: ["第 14 章 DOM", "机制链"],
  },
  {
    id: "jpg-14-dom-4",
    chapter: "jpg-14-dom",
    level: 3,
    question: "第 14 章 DOM应主动注入哪两类失败？",
    answer:
      "把插入已有节点误认为复制，原位置节点意外消失。；观察整个document的所有属性变化，回调自身修改又产生反馈循环。",
    tags: ["第 14 章 DOM", "故障注入"],
  },
  {
    id: "jpg-14-dom-5",
    chapter: "jpg-14-dom",
    level: 3,
    question: "第 14 章 DOM签发时保持什么不变量？",
    answer:
      "DOM结构始终合法；不可信内容不经HTML解析注入；观察范围有界且组件销毁时断开。",
    tags: ["第 14 章 DOM", "工程验收"],
  },
  {
    id: "jpg-14-dom-6",
    chapter: "jpg-14-dom",
    level: 3,
    question: "第 14 章 DOM怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 14 章 DOM", "可复现实验"],
  },
  {
    id: "jpg-15-dom-extensions-1",
    chapter: "jpg-15-dom-extensions",
    level: 1,
    question: "第 15 章 DOM扩展的核心主张是什么？",
    answer:
      "Selectors API、元素遍历与HTML5扩展缩短常见DOM操作，但其返回集合、匹配范围和安全语义仍需明确。",
    tags: ["第 15 章 DOM扩展", "核心机制"],
  },
  {
    id: "jpg-15-dom-extensions-2",
    chapter: "jpg-15-dom-extensions",
    level: 2,
    question: "第 15 章 DOM扩展覆盖哪些正式目录主题？",
    answer:
      "15.1 Selectors API、15.1.1 querySelector()、15.1.2 querySelectorAll()、15.1.3 matches()、15.2 元素遍历、15.3 HTML5、15.3.1 CSS类扩展、15.3.2 焦点管理、15.3.3 HTMLDocument扩展、15.3.4 字符集属性、15.3.5 自定义数据属性、15.3.6 插入标记、15.3.7 scrollIntoView()、15.4 专有扩展、15.4.1 children属性、15.4.2 contains()方法、15.4.3 插入标记、15.4.4 滚动、15.5 小结",
    tags: ["第 15 章 DOM扩展", "目录覆盖"],
  },
  {
    id: "jpg-15-dom-extensions-3",
    chapter: "jpg-15-dom-extensions",
    level: 2,
    question: "第 15 章 DOM扩展的六阶段证据链是什么？",
    answer:
      "约束选择器输入 → 查询静态结果 → 遍历元素节点 → 读写类与数据 → 管理焦点滚动 → 验证兼容边界",
    tags: ["第 15 章 DOM扩展", "机制链"],
  },
  {
    id: "jpg-15-dom-extensions-4",
    chapter: "jpg-15-dom-extensions",
    level: 3,
    question: "第 15 章 DOM扩展应主动注入哪两类失败？",
    answer:
      "把用户输入直接拼到CSS选择器，产生异常或越界匹配。；正向遍历实时HTMLCollection并删除当前项，遗漏相邻元素。",
    tags: ["第 15 章 DOM扩展", "故障注入"],
  },
  {
    id: "jpg-15-dom-extensions-5",
    chapter: "jpg-15-dom-extensions",
    level: 3,
    question: "第 15 章 DOM扩展签发时保持什么不变量？",
    answer:
      "动态选择器被转义且限定容器；集合实时性已知；类、数据、焦点与滚动修改保持可访问状态。",
    tags: ["第 15 章 DOM扩展", "工程验收"],
  },
  {
    id: "jpg-15-dom-extensions-6",
    chapter: "jpg-15-dom-extensions",
    level: 3,
    question: "第 15 章 DOM扩展怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 15 章 DOM扩展", "可复现实验"],
  },
  {
    id: "jpg-16-dom-levels-2-3-1",
    chapter: "jpg-16-dom-levels-2-3",
    level: 1,
    question: "第 16 章 DOM2和DOM3的核心主张是什么？",
    answer:
      "DOM2/DOM3补充样式、遍历与范围等跨文档能力，核心难点是坐标、实时样式和边界点随DOM变化的语义。",
    tags: ["第 16 章 DOM2和DOM3", "核心机制"],
  },
  {
    id: "jpg-16-dom-levels-2-3-2",
    chapter: "jpg-16-dom-levels-2-3",
    level: 2,
    question: "第 16 章 DOM2和DOM3覆盖哪些正式目录主题？",
    answer:
      "16.1 DOM的演进、16.1.1 XML命名空间、16.1.2 其他变化、16.2 样式、16.2.1 存取元素样式、16.2.2 操作样式表、16.2.3 元素尺寸、16.3 遍历、16.3.1 NodeIterator、16.3.2 TreeWalker、16.4 范围、16.4.1 DOM范围、16.4.2 简单选择、16.4.3 复杂选择、16.4.4 操作范围、16.4.5 范围插入、16.4.6 范围折叠、16.4.7 范围比较、16.4.8 复制范围、16.4.9 清理、16.5 小结",
    tags: ["第 16 章 DOM2和DOM3", "目录覆盖"],
  },
  {
    id: "jpg-16-dom-levels-2-3-3",
    chapter: "jpg-16-dom-levels-2-3",
    level: 2,
    question: "第 16 章 DOM2和DOM3的六阶段证据链是什么？",
    answer:
      "确定文档与命名空间 → 读取级联样式 → 选择遍历过滤器 → 设置Range边界 → 提取或修改片段 → 验证变更后边界",
    tags: ["第 16 章 DOM2和DOM3", "机制链"],
  },
  {
    id: "jpg-16-dom-levels-2-3-4",
    chapter: "jpg-16-dom-levels-2-3",
    level: 3,
    question: "第 16 章 DOM2和DOM3应主动注入哪两类失败？",
    answer:
      "从element.style读取最终颜色，外部样式表生效时得到空值。；混淆元素与文本节点的Range偏移单位，截取位置错误。",
    tags: ["第 16 章 DOM2和DOM3", "故障注入"],
  },
  {
    id: "jpg-16-dom-levels-2-3-5",
    chapter: "jpg-16-dom-levels-2-3",
    level: 3,
    question: "第 16 章 DOM2和DOM3签发时保持什么不变量？",
    answer:
      "样式读取不制造读写抖动；遍历过滤语义固定；Range起止点在DOM修改前后仍合法可恢复。",
    tags: ["第 16 章 DOM2和DOM3", "工程验收"],
  },
  {
    id: "jpg-16-dom-levels-2-3-6",
    chapter: "jpg-16-dom-levels-2-3",
    level: 3,
    question: "第 16 章 DOM2和DOM3怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 16 章 DOM2和DOM3", "可复现实验"],
  },
  {
    id: "jpg-17-events-1",
    chapter: "jpg-17-events",
    level: 1,
    question: "第 17 章 事件的核心主张是什么？",
    answer:
      "事件系统沿捕获、目标和冒泡传播，并把输入、默认行为与监听器生命周期连接起来。",
    tags: ["第 17 章 事件", "核心机制"],
  },
  {
    id: "jpg-17-events-2",
    chapter: "jpg-17-events",
    level: 2,
    question: "第 17 章 事件覆盖哪些正式目录主题？",
    answer:
      "17.1 事件流、17.1.1 事件冒泡、17.1.2 事件捕获、17.1.3 DOM事件流、17.2 事件处理程序、17.2.1 HTML事件处理程序、17.2.2 DOM0事件处理程序、17.2.3 DOM2事件处理程序、17.2.4 IE事件处理程序、17.2.5 跨浏览器事件处理程序、17.3 事件对象、17.3.1 DOM事件对象、17.3.2 IE事件对象、17.3.3 跨浏览器事件对象、17.4 事件类型、17.4.1 用户界面事件、17.4.2 焦点事件、17.4.3 鼠标和滚轮事件、17.4.4 键盘与输入事件、17.4.5 合成事件、17.4.6 变化事件、17.4.7 HTML5事件、17.4.8 设备事件、17.4.9 触摸及手势事件、17.4.10 事件参考、17.5 内存与性能、17.5.1 事件委托、17.5.2 删除事件处理程序、17.6 模拟事件、17.6.1 DOM事件模拟、17.6.2 IE事件模拟、17.7 小结",
    tags: ["第 17 章 事件", "目录覆盖"],
  },
  {
    id: "jpg-17-events-3",
    chapter: "jpg-17-events",
    level: 2,
    question: "第 17 章 事件的六阶段证据链是什么？",
    answer:
      "产生原始输入 → 构造事件对象 → 沿捕获路径传播 → 执行目标与冒泡监听 → 决定默认行为 → 移除监听并回收",
    tags: ["第 17 章 事件", "机制链"],
  },
  {
    id: "jpg-17-events-4",
    chapter: "jpg-17-events",
    level: 3,
    question: "第 17 章 事件应主动注入哪两类失败？",
    answer:
      "调用stopPropagation后以为链接不会导航，默认行为仍执行。；每次渲染重新addEventListener，旧闭包和重复副作用持续累积。",
    tags: ["第 17 章 事件", "故障注入"],
  },
  {
    id: "jpg-17-events-5",
    chapter: "jpg-17-events",
    level: 3,
    question: "第 17 章 事件签发时保持什么不变量？",
    answer:
      "事件传播、取消与默认行为分别验证；委托目标不越界；监听器在组件结束后全部可取消。",
    tags: ["第 17 章 事件", "工程验收"],
  },
  {
    id: "jpg-17-events-6",
    chapter: "jpg-17-events",
    level: 3,
    question: "第 17 章 事件怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 17 章 事件", "可复现实验"],
  },
  {
    id: "jpg-18-animation-canvas-1",
    chapter: "jpg-18-animation-canvas",
    level: 1,
    question: "第 18 章 动画与Canvas图形的核心主张是什么？",
    answer:
      "动画要由刷新时钟驱动，Canvas则是有状态即时绘制表面；时间步长、像素密度与状态栈决定视觉正确性。",
    tags: ["第 18 章 动画与Canvas图形", "核心机制"],
  },
  {
    id: "jpg-18-animation-canvas-2",
    chapter: "jpg-18-animation-canvas",
    level: 2,
    question: "第 18 章 动画与Canvas图形覆盖哪些正式目录主题？",
    answer:
      "18.1 使用requestAnimationFrame、18.1.1 早期定时动画、18.1.2 时间间隔的问题、18.1.3 requestAnimationFrame、18.1.4 cancelAnimationFrame、18.1.5 通过requestAnimationFrame节流、18.2 基本的画布功能、18.3 2D绘图上下文、18.3.1 填充和描边、18.3.2 绘制矩形、18.3.3 绘制路径、18.3.4 绘制文本、18.3.5 变换、18.3.6 绘制图像、18.3.7 阴影、18.3.8 渐变、18.3.9 图案、18.3.10 图像数据、18.3.11 合成、18.4 WebGL、18.4.1 WebGL上下文、18.4.2 WebGL基础、18.4.3 WebGL1与WebGL2、18.5 小结",
    tags: ["第 18 章 动画与Canvas图形", "目录覆盖"],
  },
  {
    id: "jpg-18-animation-canvas-3",
    chapter: "jpg-18-animation-canvas",
    level: 2,
    question: "第 18 章 动画与Canvas图形的六阶段证据链是什么？",
    answer:
      "读取帧时间戳 → 计算有界步长 → 更新模拟状态 → 缩放物理画布 → 保存绘制状态 → 提交帧并重调度",
    tags: ["第 18 章 动画与Canvas图形", "机制链"],
  },
  {
    id: "jpg-18-animation-canvas-4",
    chapter: "jpg-18-animation-canvas",
    level: 3,
    question: "第 18 章 动画与Canvas图形应主动注入哪两类失败？",
    answer:
      "每帧移动固定像素，144Hz与60Hz设备速度不同。；只用CSS放大低分辨率Canvas，高DPI显示模糊。",
    tags: ["第 18 章 动画与Canvas图形", "故障注入"],
  },
  {
    id: "jpg-18-animation-canvas-5",
    chapter: "jpg-18-animation-canvas",
    level: 3,
    question: "第 18 章 动画与Canvas图形签发时保持什么不变量？",
    answer:
      "动画速度与刷新率无关；后台恢复不出现巨跳；画布分辨率匹配预算且绘图状态不泄漏到下一对象。",
    tags: ["第 18 章 动画与Canvas图形", "工程验收"],
  },
  {
    id: "jpg-18-animation-canvas-6",
    chapter: "jpg-18-animation-canvas",
    level: 3,
    question: "第 18 章 动画与Canvas图形怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 18 章 动画与Canvas图形", "可复现实验"],
  },
  {
    id: "jpg-19-form-scripting-1",
    chapter: "jpg-19-form-scripting",
    level: 1,
    question: "第 19 章 表单脚本的核心主张是什么？",
    answer:
      "表单脚本围绕控件状态、约束验证、序列化和提交幂等展开，富文本还需额外的内容安全边界。",
    tags: ["第 19 章 表单脚本", "核心机制"],
  },
  {
    id: "jpg-19-form-scripting-2",
    chapter: "jpg-19-form-scripting",
    level: 2,
    question: "第 19 章 表单脚本覆盖哪些正式目录主题？",
    answer:
      "19.1 表单基础、19.1.1 提交表单、19.1.2 重置表单、19.1.3 表单字段、19.2 文本框编程、19.2.1 选择文本、19.2.2 输入过滤、19.2.3 自动切换、19.2.4 HTML5约束验证API、19.3 选择框编程、19.3.1 选项处理、19.3.2 添加选项、19.3.3 移除选项、19.3.4 移动和重排选项、19.4 表单序列化、19.5 富文本编辑、19.5.1 使用contenteditable、19.5.2 与富文本交互、19.5.3 富文件选择、19.5.4 通过表单提交富文本、19.6 小结",
    tags: ["第 19 章 表单脚本", "目录覆盖"],
  },
  {
    id: "jpg-19-form-scripting-3",
    chapter: "jpg-19-form-scripting",
    level: 2,
    question: "第 19 章 表单脚本的六阶段证据链是什么？",
    answer:
      "采集控件状态 → 运行约束验证 → 确定提交意图 → 构造FormData → 发送幂等请求 → 反馈结果与恢复焦点",
    tags: ["第 19 章 表单脚本", "机制链"],
  },
  {
    id: "jpg-19-form-scripting-4",
    chapter: "jpg-19-form-scripting",
    level: 3,
    question: "第 19 章 表单脚本应主动注入哪两类失败？",
    answer:
      "只监听按钮click，键盘回车提交绕过验证和状态管理。；用innerHTML回填未经清洗的富文本，形成持久化脚本注入。",
    tags: ["第 19 章 表单脚本", "故障注入"],
  },
  {
    id: "jpg-19-form-scripting-5",
    chapter: "jpg-19-form-scripting",
    level: 3,
    question: "第 19 章 表单脚本签发时保持什么不变量？",
    answer:
      "所有提交路径进入同一验证与幂等流程；序列化与浏览器规则一致；富文本在可信边界清洗。",
    tags: ["第 19 章 表单脚本", "工程验收"],
  },
  {
    id: "jpg-19-form-scripting-6",
    chapter: "jpg-19-form-scripting",
    level: 3,
    question: "第 19 章 表单脚本怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 19 章 表单脚本", "可复现实验"],
  },
  {
    id: "jpg-20-javascript-apis-1",
    chapter: "jpg-20-javascript-apis",
    level: 1,
    question: "第 20 章 JavaScript API的核心主张是什么？",
    answer:
      "现代Web API横跨并发、消息、文件、媒体、组件和密码学，必须按安全上下文、权限、所有权与背压逐项接入。",
    tags: ["第 20 章 JavaScript API", "核心机制"],
  },
  {
    id: "jpg-20-javascript-apis-2",
    chapter: "jpg-20-javascript-apis",
    level: 2,
    question: "第 20 章 JavaScript API覆盖哪些正式目录主题？",
    answer:
      "20.1 Atomics与SharedArrayBuffer、20.1.1 SharedArrayBuffer、20.1.2 原子操作基础、20.2 跨上下文消息、20.3 Encoding API、20.3.1 文本编码、20.3.2 文本解码、20.4 File API与Blob API、20.4.1 File类型、20.4.2 FileReader类型、20.4.3 FileReaderSync类型、20.4.4 Blob与部分读取、20.4.5 对象URL与Blob、20.4.6 读取拖放文件、20.5 媒体元素、20.5.1 属性、20.5.2 事件、20.5.3 自定义媒体播放器、20.5.4 检测编解码器、20.5.5 音频类型、20.6 原生拖放、20.6.1 拖放事件、20.6.2 自定义放置目标、20.6.3 dataTransfer对象、20.6.4 dropEffect与effectAllowed、20.6.5 可拖动能力、20.6.6 其他成员、20.7 Notifications API、20.7.1 通知权限、20.7.2 显示和隐藏通知、20.7.3 通知生命周期回调、20.8 Page Visibility API、20.9 Streams API、20.9.1 理解流、20.9.2 可读流、20.9.3 可写流、20.9.4 转换流、20.9.5 通过管道连接流、20.10 计时API、20.10.1 High Resolution Time API、20.10.2 Performance Timeline API、20.11 Web组件、20.11.1 HTML模板、20.11.2 影子DOM、20.11.3 自定义元素、20.12 Web Cryptography API、20.12.1 生成随机数、20.12.2 使用SubtleCrypto对象、20.13 小结",
    tags: ["第 20 章 JavaScript API", "目录覆盖"],
  },
  {
    id: "jpg-20-javascript-apis-3",
    chapter: "jpg-20-javascript-apis",
    level: 2,
    question: "第 20 章 JavaScript API的六阶段证据链是什么？",
    answer:
      "确认安全与权限 → 选择复制共享或转移 → 建立资源所有权 → 处理流式背压 → 封装组件边界 → 撤销密钥URL与监听",
    tags: ["第 20 章 JavaScript API", "机制链"],
  },
  {
    id: "jpg-20-javascript-apis-4",
    chapter: "jpg-20-javascript-apis",
    level: 3,
    question: "第 20 章 JavaScript API应主动注入哪两类失败？",
    answer:
      "postMessage使用星号目标源并接受任意来源消息。；创建大量Blob URL或媒体流后从不撤销和停止。",
    tags: ["第 20 章 JavaScript API", "故障注入"],
  },
  {
    id: "jpg-20-javascript-apis-5",
    chapter: "jpg-20-javascript-apis",
    level: 3,
    question: "第 20 章 JavaScript API签发时保持什么不变量？",
    answer:
      "跨上下文消息验证来源与模式；资源生命周期闭环；密码学不自创协议且只在安全上下文运行。",
    tags: ["第 20 章 JavaScript API", "工程验收"],
  },
  {
    id: "jpg-20-javascript-apis-6",
    chapter: "jpg-20-javascript-apis",
    level: 3,
    question: "第 20 章 JavaScript API怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 20 章 JavaScript API", "可复现实验"],
  },
  {
    id: "jpg-21-error-handling-debugging-1",
    chapter: "jpg-21-error-handling-debugging",
    level: 1,
    question: "第 21 章 错误处理与调试的核心主张是什么？",
    answer:
      "错误处理要在能恢复的边界捕获并保留因果，调试则用可复现输入、断点和结构化证据定位首个偏离。",
    tags: ["第 21 章 错误处理与调试", "核心机制"],
  },
  {
    id: "jpg-21-error-handling-debugging-2",
    chapter: "jpg-21-error-handling-debugging",
    level: 2,
    question: "第 21 章 错误处理与调试覆盖哪些正式目录主题？",
    answer:
      "21.1 浏览器错误报告、21.1.1 桌面控制台、21.1.2 移动控制台、21.2 错误处理、21.2.1 try/catch语句、21.2.2 抛出错误、21.2.3 error事件、21.2.4 错误处理策略、21.2.5 识别错误、21.2.6 区分重大与非重大错误、21.2.7 把错误记录到服务器中、21.3 调试技术、21.3.1 把消息记录到控制台、21.3.2 理解控制台运行时、21.3.3 使用JavaScript调试器、21.3.4 在页面中打印消息、21.3.5 补充控制台方法、21.3.6 抛出错误、21.4 旧版IE的常见错误、21.4.1 无效字符、21.4.2 未找到成员、21.4.3 未知运行时错误、21.4.4 语法错误、21.4.5 系统找不到指定资源、21.5 小结",
    tags: ["第 21 章 错误处理与调试", "目录覆盖"],
  },
  {
    id: "jpg-21-error-handling-debugging-3",
    chapter: "jpg-21-error-handling-debugging",
    level: 2,
    question: "第 21 章 错误处理与调试的六阶段证据链是什么？",
    answer:
      "复现固定输入 → 保存原始异常 → 定位首偏离点 → 检查调用与异步链 → 在责任边界恢复 → 记录回归测试",
    tags: ["第 21 章 错误处理与调试", "机制链"],
  },
  {
    id: "jpg-21-error-handling-debugging-4",
    chapter: "jpg-21-error-handling-debugging",
    level: 3,
    question: "第 21 章 错误处理与调试应主动注入哪两类失败？",
    answer:
      "catch所有异常后只console.log，调用方继续提交错误状态。；只盯最终报错行，没有比较状态第一次变坏的位置。",
    tags: ["第 21 章 错误处理与调试", "故障注入"],
  },
  {
    id: "jpg-21-error-handling-debugging-5",
    chapter: "jpg-21-error-handling-debugging",
    level: 3,
    question: "第 21 章 错误处理与调试签发时保持什么不变量？",
    answer:
      "异常不会被静默吞掉；错误保留cause与操作上下文；相同输入能复现并由回归测试覆盖根因。",
    tags: ["第 21 章 错误处理与调试", "工程验收"],
  },
  {
    id: "jpg-21-error-handling-debugging-6",
    chapter: "jpg-21-error-handling-debugging",
    level: 3,
    question: "第 21 章 错误处理与调试怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 21 章 错误处理与调试", "可复现实验"],
  },
  {
    id: "jpg-22-working-with-xml-1",
    chapter: "jpg-22-working-with-xml",
    level: 1,
    question: "第 22 章 处理XML的核心主张是什么？",
    answer:
      "浏览器XML处理由DOMParser、XPath与XSLT等独立能力组成，解析错误、命名空间和不可信实体必须显式处理。",
    tags: ["第 22 章 处理XML", "核心机制"],
  },
  {
    id: "jpg-22-working-with-xml-2",
    chapter: "jpg-22-working-with-xml",
    level: 2,
    question: "第 22 章 处理XML覆盖哪些正式目录主题？",
    answer:
      "22.1 浏览器对XML DOM的支持、22.1.1 DOM Level 2 Core、22.1.2 DOMParser类型、22.1.3 XMLSerializer类型、22.2 浏览器对XPath的支持、22.2.1 DOM Level 3 XPath、22.2.2 单个节点结果、22.2.3 简单类型结果、22.2.4 默认类型结果、22.2.5 命名空间支持、22.3 浏览器对XSLT的支持、22.3.1 XSLTProcessor类型、22.3.2 使用参数、22.3.3 重置处理器、22.4 小结",
    tags: ["第 22 章 处理XML", "目录覆盖"],
  },
  {
    id: "jpg-22-working-with-xml-3",
    chapter: "jpg-22-working-with-xml",
    level: 2,
    question: "第 22 章 处理XML的六阶段证据链是什么？",
    answer:
      "确认输入MIME → 解析XML文档 → 检测parsererror → 绑定命名空间 → 执行XPath或XSLT → 序列化并验证输出",
    tags: ["第 22 章 处理XML", "机制链"],
  },
  {
    id: "jpg-22-working-with-xml-4",
    chapter: "jpg-22-working-with-xml",
    level: 3,
    question: "第 22 章 处理XML应主动注入哪两类失败？",
    answer:
      "以为DOMParser遇到坏XML会throw，随后把parsererror当业务文档处理。；XPath忽略默认命名空间，查询结果始终为空。",
    tags: ["第 22 章 处理XML", "故障注入"],
  },
  {
    id: "jpg-22-working-with-xml-5",
    chapter: "jpg-22-working-with-xml",
    level: 3,
    question: "第 22 章 处理XML签发时保持什么不变量？",
    answer:
      "XML语法错误被明确拒绝；查询按URI处理命名空间；转换结果在进入HTML前经过可信边界。",
    tags: ["第 22 章 处理XML", "工程验收"],
  },
  {
    id: "jpg-22-working-with-xml-6",
    chapter: "jpg-22-working-with-xml",
    level: 3,
    question: "第 22 章 处理XML怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 22 章 处理XML", "可复现实验"],
  },
  {
    id: "jpg-23-json-1",
    chapter: "jpg-23-json",
    level: 1,
    question: "第 23 章 JSON的核心主张是什么？",
    answer:
      "JSON是受限数据格式，解析与序列化的replacer、reviver和toJSON共同决定数据是否丢失、转换或被污染。",
    tags: ["第 23 章 JSON", "核心机制"],
  },
  {
    id: "jpg-23-json-2",
    chapter: "jpg-23-json",
    level: 2,
    question: "第 23 章 JSON覆盖哪些正式目录主题？",
    answer:
      "23.1 语法、23.1.1 简单值、23.1.2 对象、23.1.3 数组、23.2 解析与序列化、23.2.1 JSON对象、23.2.2 序列化选项、23.2.3 解析选项、23.3 小结",
    tags: ["第 23 章 JSON", "目录覆盖"],
  },
  {
    id: "jpg-23-json-3",
    chapter: "jpg-23-json",
    level: 2,
    question: "第 23 章 JSON的六阶段证据链是什么？",
    answer:
      "限定输入大小 → 解析JSON语法 → 以reviver验证转换 → 映射业务模式 → 用replacer序列化 → 比较往返与丢失字段",
    tags: ["第 23 章 JSON", "机制链"],
  },
  {
    id: "jpg-23-json-4",
    chapter: "jpg-23-json",
    level: 3,
    question: "第 23 章 JSON应主动注入哪两类失败？",
    answer:
      "用JSON往返深拷贝，悄然丢失日期类型、undefined和特殊数字。；解析后把外部对象直接合并到配置，危险键污染原型。",
    tags: ["第 23 章 JSON", "故障注入"],
  },
  {
    id: "jpg-23-json-5",
    chapter: "jpg-23-json",
    level: 3,
    question: "第 23 章 JSON签发时保持什么不变量？",
    answer:
      "JSON只承载已定义模式；不可表示值有显式策略；解析值在使用前验证且不会污染对象原型。",
    tags: ["第 23 章 JSON", "工程验收"],
  },
  {
    id: "jpg-23-json-6",
    chapter: "jpg-23-json",
    level: 3,
    question: "第 23 章 JSON怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 23 章 JSON", "可复现实验"],
  },
  {
    id: "jpg-24-network-requests-1",
    chapter: "jpg-24-network-requests",
    level: 1,
    question: "第 24 章 网络请求与远程资源的核心主张是什么？",
    answer:
      "XHR、Fetch、Beacon与WebSocket各自有不同流式、取消、凭据和生命周期语义，网络成功不等于业务成功。",
    tags: ["第 24 章 网络请求与远程资源", "核心机制"],
  },
  {
    id: "jpg-24-network-requests-2",
    chapter: "jpg-24-network-requests",
    level: 2,
    question: "第 24 章 网络请求与远程资源覆盖哪些正式目录主题？",
    answer:
      "24.1 XMLHttpRequest对象、24.1.1 使用XHR、24.1.2 HTTP头部、24.1.3 GET请求、24.1.4 POST请求、24.1.5 XMLHttpRequest Level 2、24.2 进度事件、24.2.1 load事件、24.2.2 progress事件、24.3 跨源资源共享、24.3.1 预检请求、24.3.2 凭据请求、24.4 替代性跨源技术、24.4.1 图片探测、24.4.2 JSONP、24.5 Fetch API、24.5.1 基本用法、24.5.2 常见Fetch请求模式、24.5.3 Headers对象、24.5.4 Request对象、24.5.5 Response对象、24.5.6 Request、Response及Body混入、24.6 Beacon API、24.7 Web Socket、24.7.1 API、24.7.2 发送和接收数据、24.7.3 其他事件、24.8 安全、24.9 小结",
    tags: ["第 24 章 网络请求与远程资源", "目录覆盖"],
  },
  {
    id: "jpg-24-network-requests-3",
    chapter: "jpg-24-network-requests",
    level: 2,
    question: "第 24 章 网络请求与远程资源的六阶段证据链是什么？",
    answer:
      "构造请求与凭据 → 通过同源或CORS检查 → 接收状态头与流 → 判定业务成功 → 处理取消重试 → 关闭连接与释放读取器",
    tags: ["第 24 章 网络请求与远程资源", "机制链"],
  },
  {
    id: "jpg-24-network-requests-4",
    chapter: "jpg-24-network-requests",
    level: 3,
    question: "第 24 章 网络请求与远程资源应主动注入哪两类失败？",
    answer:
      "fetch返回fulfilled就当业务成功，500响应继续解析为正常数据。；WebSocket断线后无限立即重连，形成客户端同步风暴。",
    tags: ["第 24 章 网络请求与远程资源", "故障注入"],
  },
  {
    id: "jpg-24-network-requests-5",
    chapter: "jpg-24-network-requests",
    level: 3,
    question: "第 24 章 网络请求与远程资源签发时保持什么不变量？",
    answer:
      "HTTP状态与业务状态分别检查；跨源权限最小化；取消重试幂等；长连接重连有退避、版本和恢复点。",
    tags: ["第 24 章 网络请求与远程资源", "工程验收"],
  },
  {
    id: "jpg-24-network-requests-6",
    chapter: "jpg-24-network-requests",
    level: 3,
    question: "第 24 章 网络请求与远程资源怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 24 章 网络请求与远程资源", "可复现实验"],
  },
  {
    id: "jpg-25-client-storage-1",
    chapter: "jpg-25-client-storage",
    level: 1,
    question: "第 25 章 客户端存储的核心主张是什么？",
    answer:
      "Cookie、Web Storage与IndexedDB在容量、同步性、作用域和事务上完全不同，客户端存储不能成为可信事实源。",
    tags: ["第 25 章 客户端存储", "核心机制"],
  },
  {
    id: "jpg-25-client-storage-2",
    chapter: "jpg-25-client-storage",
    level: 2,
    question: "第 25 章 客户端存储覆盖哪些正式目录主题？",
    answer:
      "25.1 cookie、25.1.1 限制、25.1.2 cookie的构成、25.1.3 JavaScript中的cookie、25.1.4 子cookie、25.1.5 使用cookie的注意事项、25.2 Web Storage、25.2.1 Storage类型、25.2.2 sessionStorage对象、25.2.3 localStorage对象、25.2.4 存储事件、25.2.5 限制、25.3 IndexedDB、25.3.1 数据库、25.3.2 对象存储、25.3.3 事务、25.3.4 插入对象、25.3.5 通过游标查询、25.3.6 键范围、25.3.7 设置游标方向、25.3.8 索引、25.3.9 并发问题、25.3.10 限制、25.4 小结",
    tags: ["第 25 章 客户端存储", "目录覆盖"],
  },
  {
    id: "jpg-25-client-storage-3",
    chapter: "jpg-25-client-storage",
    level: 2,
    question: "第 25 章 客户端存储的六阶段证据链是什么？",
    answer:
      "分类敏感与权威数据 → 选择存储机制 → 定义键与版本 → 事务写入读取 → 处理配额与跨标签变化 → 清理迁移和注销",
    tags: ["第 25 章 客户端存储", "机制链"],
  },
  {
    id: "jpg-25-client-storage-4",
    chapter: "jpg-25-client-storage",
    level: 3,
    question: "第 25 章 客户端存储应主动注入哪两类失败？",
    answer:
      "把访问令牌放localStorage并认为同源就足够安全。；IndexedDB单个request成功后立即报告保存完成，随后事务整体中止。",
    tags: ["第 25 章 客户端存储", "故障注入"],
  },
  {
    id: "jpg-25-client-storage-5",
    chapter: "jpg-25-client-storage",
    level: 3,
    question: "第 25 章 客户端存储签发时保持什么不变量？",
    answer:
      "客户端数据可丢失且不被信任；敏感会话使用受保护Cookie；IndexedDB以事务完成作为提交证据。",
    tags: ["第 25 章 客户端存储", "工程验收"],
  },
  {
    id: "jpg-25-client-storage-6",
    chapter: "jpg-25-client-storage",
    level: 3,
    question: "第 25 章 客户端存储怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 25 章 客户端存储", "可复现实验"],
  },
  {
    id: "jpg-26-modules-1",
    chapter: "jpg-26-modules",
    level: 1,
    question: "第 26 章 模块的核心主张是什么？",
    answer:
      "模块系统建立文件级作用域、依赖图和单例实例；ES模块的静态链接与实时绑定改变装载、循环依赖和部署方式。",
    tags: ["第 26 章 模块", "核心机制"],
  },
  {
    id: "jpg-26-modules-2",
    chapter: "jpg-26-modules",
    level: 2,
    question: "第 26 章 模块覆盖哪些正式目录主题？",
    answer:
      "26.1 理解模块模式、26.1.1 模块标识符、26.1.2 模块依赖、26.1.3 模块加载、26.1.4 入口、26.1.5 异步依赖、26.1.6 动态依赖、26.1.7 静态分析、26.1.8 循环依赖、26.2 凑合的模块系统、26.3 使用ES6之前的模块加载器、26.3.1 CommonJS、26.3.2 异步模块定义、26.3.3 通用模块定义、26.3.4 模块加载器终将没落、26.4 使用ES6模块、26.4.1 模块标签及定义、26.4.2 模块加载、26.4.3 模块行为、26.4.4 模块导出、26.4.5 模块导入、26.4.6 模块转移导出、26.4.7 工作者模块、26.4.8 向后兼容、26.5 小结",
    tags: ["第 26 章 模块", "目录覆盖"],
  },
  {
    id: "jpg-26-modules-3",
    chapter: "jpg-26-modules",
    level: 2,
    question: "第 26 章 模块的六阶段证据链是什么？",
    answer:
      "声明导出接口 → 解析模块说明符 → 构建依赖图 → 实例化实时绑定 → 按拓扑求值 → 缓存或按需加载",
    tags: ["第 26 章 模块", "机制链"],
  },
  {
    id: "jpg-26-modules-4",
    chapter: "jpg-26-modules",
    level: 3,
    question: "第 26 章 模块应主动注入哪两类失败？",
    answer:
      "把导入值当快照，在导出模块更新后假设本地不会变化。；入口HTML和分块采用不一致缓存策略，发布后出现模块404。",
    tags: ["第 26 章 模块", "故障注入"],
  },
  {
    id: "jpg-26-modules-5",
    chapter: "jpg-26-modules",
    level: 3,
    question: "第 26 章 模块签发时保持什么不变量？",
    answer:
      "依赖图无隐式全局；循环依赖不读取未初始化绑定；动态模块版本与入口一致且失败可恢复。",
    tags: ["第 26 章 模块", "工程验收"],
  },
  {
    id: "jpg-26-modules-6",
    chapter: "jpg-26-modules",
    level: 3,
    question: "第 26 章 模块怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 26 章 模块", "可复现实验"],
  },
  {
    id: "jpg-27-workers-1",
    chapter: "jpg-27-workers",
    level: 1,
    question: "第 27 章 工作者线程的核心主张是什么？",
    answer:
      "工作者线程提供独立JavaScript执行环境，正确性取决于消息、数据所有权、生命周期和服务工作者更新一致性。",
    tags: ["第 27 章 工作者线程", "核心机制"],
  },
  {
    id: "jpg-27-workers-2",
    chapter: "jpg-27-workers",
    level: 2,
    question: "第 27 章 工作者线程覆盖哪些正式目录主题？",
    answer:
      "27.1 工作者线程简介、27.1.1 工作者线程与线程、27.1.2 工作者线程的类型、27.1.3 WorkerGlobalScope、27.2 专用工作者线程、27.2.1 专用工作者线程的基本概念、27.2.2 专用工作者线程与隐式MessagePorts、27.2.3 专用工作者线程的生命周期、27.2.4 配置Worker选项、27.2.5 在JavaScript行内创建工作者线程、27.2.6 在工作者线程中动态执行脚本、27.2.7 委托任务到子工作者线程、27.2.8 处理工作者线程错误、27.2.9 与专用工作者线程通信、27.2.10 工作者线程数据传输、27.2.11 线程池、27.3 共享工作者线程、27.3.1 共享工作者线程简介、27.3.2 理解共享工作者线程的生命周期、27.3.3 连接到共享工作者线程、27.4 服务工作者线程、27.4.1 服务工作者线程基础、27.4.2 服务工作者线程缓存、27.4.3 服务工作者线程客户端、27.4.4 服务工作者线程与一致性、27.4.5 理解服务工作者线程的生命周期、27.4.6 控制反转与服务工作者线程持久化、27.4.7 通过updateViaCache管理服务文件缓存、27.4.8 强制性服务工作者线程操作、27.4.9 服务工作者线程消息、27.4.10 拦截fetch事件、27.4.11 推送通知、27.5 小结",
    tags: ["第 27 章 工作者线程", "目录覆盖"],
  },
  {
    id: "jpg-27-workers-3",
    chapter: "jpg-27-workers",
    level: 2,
    question: "第 27 章 工作者线程的六阶段证据链是什么？",
    answer:
      "创建工作者 → 完成脚本与版本装载 → 建立消息协议 → 复制转移或共享数据 → 处理错误取消 → 终止或激活新版本",
    tags: ["第 27 章 工作者线程", "机制链"],
  },
  {
    id: "jpg-27-workers-4",
    chapter: "jpg-27-workers",
    level: 3,
    question: "第 27 章 工作者线程应主动注入哪两类失败？",
    answer:
      "转移ArrayBuffer后继续在主线程读取，得到已分离缓冲区。；Service Worker立即skipWaiting并删除旧缓存，仍运行旧代码的页面资源断裂。",
    tags: ["第 27 章 工作者线程", "故障注入"],
  },
  {
    id: "jpg-27-workers-5",
    chapter: "jpg-27-workers",
    level: 3,
    question: "第 27 章 工作者线程签发时保持什么不变量？",
    answer:
      "消息协议版本化且请求可关联；数据所有权转移后不再使用；Service Worker升级保持新旧客户端资源一致。",
    tags: ["第 27 章 工作者线程", "工程验收"],
  },
  {
    id: "jpg-27-workers-6",
    chapter: "jpg-27-workers",
    level: 3,
    question: "第 27 章 工作者线程怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 27 章 工作者线程", "可复现实验"],
  },
  {
    id: "jpg-28-best-practices-1",
    chapter: "jpg-28-best-practices",
    level: 1,
    question: "第 28 章 最佳实践的核心主张是什么？",
    answer:
      "最佳实践要把可维护性、运行性能和可回滚部署变成可测量约束，而不是风格清单。",
    tags: ["第 28 章 最佳实践", "核心机制"],
  },
  {
    id: "jpg-28-best-practices-2",
    chapter: "jpg-28-best-practices",
    level: 2,
    question: "第 28 章 最佳实践覆盖哪些正式目录主题？",
    answer:
      "28.1 可维护性、28.1.1 什么是可维护的代码、28.1.2 编码规范、28.1.3 松散耦合、28.1.4 编码惯例、28.2 性能、28.2.1 作用域意识、28.2.2 选择正确的方法、28.2.3 语句最少化、28.2.4 优化DOM交互、28.3 部署、28.3.1 构建流程、28.3.2 验证、28.3.3 压缩、28.4 小结",
    tags: ["第 28 章 最佳实践", "目录覆盖"],
  },
  {
    id: "jpg-28-best-practices-3",
    chapter: "jpg-28-best-practices",
    level: 2,
    question: "第 28 章 最佳实践的六阶段证据链是什么？",
    answer:
      "建立代码契约 → 自动化静态与单元检查 → 测量用户性能 → 生成不可变产物 → 灰度发布观察 → 按证据回滚",
    tags: ["第 28 章 最佳实践", "机制链"],
  },
  {
    id: "jpg-28-best-practices-4",
    chapter: "jpg-28-best-practices",
    level: 3,
    question: "第 28 章 最佳实践应主动注入哪两类失败？",
    answer:
      "为微小基准优化可读性，却没有真实用户指标改善。；只回滚入口HTML，旧入口与新分块或Service Worker版本不兼容。",
    tags: ["第 28 章 最佳实践", "故障注入"],
  },
  {
    id: "jpg-28-best-practices-5",
    chapter: "jpg-28-best-practices",
    level: 3,
    question: "第 28 章 最佳实践签发时保持什么不变量？",
    answer:
      "代码边界可测试；优化由用户指标证明且不越预算；任一发布版本都是完整可恢复资源集合。",
    tags: ["第 28 章 最佳实践", "工程验收"],
  },
  {
    id: "jpg-28-best-practices-6",
    chapter: "jpg-28-best-practices",
    level: 3,
    question: "第 28 章 最佳实践怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 28 章 最佳实践", "可复现实验"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-1",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 1,
    question: "附录 A ES2018和ES2019的核心主张是什么？",
    answer:
      "ES2018与ES2019的对象扩展、异步迭代、正则增强和可选catch绑定需要以目标运行时与转译边界验证。",
    tags: ["附录 A ES2018和ES2019", "核心机制"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-2",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 2,
    question: "附录 A ES2018和ES2019覆盖哪些正式目录主题？",
    answer:
      "A.1 异步迭代、A.1.1 创建并使用异步迭代器、A.1.2 理解异步迭代器队列、A.1.3 处理异步迭代器的reject()、A.1.4 使用next()手动异步迭代、A.1.5 顶级异步循环、A.1.6 实现可观察对象、A.2 对象字面量的剩余操作符和扩展操作符、A.2.1 剩余操作符、A.2.2 扩展操作符、A.3 Promise.prototype.finally()、A.4 正则表达式相关特性、A.4.1 dotAll标志、A.4.2 向后查找断言、A.4.3 命名捕获组、A.4.4 Unicode属性转义、A.5 数组打平方法、A.5.1 Array.prototype.flatten()、A.5.2 Array.prototype.flatMap()、A.6 Object.fromEntries()、A.7 字符串修理方法、A.8 Symbol.prototype.description、A.9 可选的catch绑定、A.10 其他新增内容",
    tags: ["附录 A ES2018和ES2019", "目录覆盖"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-3",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 2,
    question: "附录 A ES2018和ES2019的六阶段证据链是什么？",
    answer:
      "识别规范年份 → 确认运行时支持 → 选择原生或转译 → 编写边界样本 → 验证包体与语义 → 记录降级基线",
    tags: ["附录 A ES2018和ES2019", "机制链"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-4",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 3,
    question: "附录 A ES2018和ES2019应主动注入哪两类失败？",
    answer:
      "只配置Babel语法转换，忘记运行时内置API缺失。；把无法解析的新正则字面量放在能力检测分支里，旧引擎加载即报错。",
    tags: ["附录 A ES2018和ES2019", "故障注入"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-5",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 3,
    question: "附录 A ES2018和ES2019签发时保持什么不变量？",
    answer:
      "每项新特性同时验证解析与运行时；polyfill按目标最小化；异步迭代提前退出能清理来源。",
    tags: ["附录 A ES2018和ES2019", "工程验收"],
  },
  {
    id: "jpg-appendix-a-es2018-es2019-6",
    chapter: "jpg-appendix-a-es2018-es2019",
    level: 3,
    question: "附录 A ES2018和ES2019怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 A ES2018和ES2019", "可复现实验"],
  },
  {
    id: "jpg-appendix-b-strict-mode-1",
    chapter: "jpg-appendix-b-strict-mode",
    level: 1,
    question: "附录 B 严格模式的核心主张是什么？",
    answer:
      "严格模式通过早期错误、更安全赋值和明确this等规则消除歧义，模块与类默认严格。",
    tags: ["附录 B 严格模式", "核心机制"],
  },
  {
    id: "jpg-appendix-b-strict-mode-2",
    chapter: "jpg-appendix-b-strict-mode",
    level: 2,
    question: "附录 B 严格模式覆盖哪些正式目录主题？",
    answer:
      "B.1 选择使用、B.2 变量、B.3 对象、B.4 函数、B.4.1 函数参数、B.4.2 eval()、B.4.3 eval与arguments、B.5 this强制转型、B.6 类与模块、B.7 其他变化",
    tags: ["附录 B 严格模式", "目录覆盖"],
  },
  {
    id: "jpg-appendix-b-strict-mode-3",
    chapter: "jpg-appendix-b-strict-mode",
    level: 2,
    question: "附录 B 严格模式的六阶段证据链是什么？",
    answer:
      "确定脚本模块边界 → 启用严格语义 → 解析早期错误 → 执行安全this规则 → 暴露非法赋值 → 迁移遗留代码",
    tags: ["附录 B 严格模式", "机制链"],
  },
  {
    id: "jpg-appendix-b-strict-mode-4",
    chapter: "jpg-appendix-b-strict-mode",
    level: 3,
    question: "附录 B 严格模式应主动注入哪两类失败？",
    answer:
      "给整个遗留包裹一次性加'use strict'，未测试依赖旧语义的插件。；严格函数独立调用仍假设this是window，读取属性时报错。",
    tags: ["附录 B 严格模式", "故障注入"],
  },
  {
    id: "jpg-appendix-b-strict-mode-5",
    chapter: "jpg-appendix-b-strict-mode",
    level: 3,
    question: "附录 B 严格模式签发时保持什么不变量？",
    answer:
      "新模块保持严格语义；非法状态修改立即失败；遗留迁移按边界验证且不依赖隐式全局this。",
    tags: ["附录 B 严格模式", "工程验收"],
  },
  {
    id: "jpg-appendix-b-strict-mode-6",
    chapter: "jpg-appendix-b-strict-mode",
    level: 3,
    question: "附录 B 严格模式怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 B 严格模式", "可复现实验"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-1",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 1,
    question: "附录 C JavaScript库和框架的核心主张是什么？",
    answer:
      "库与框架选择要依据所有权、更新模型、生态寿命和迁移成本，不能把流行度当架构证据。",
    tags: ["附录 C JavaScript库和框架", "核心机制"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-2",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 2,
    question: "附录 C JavaScript库和框架覆盖哪些正式目录主题？",
    answer:
      "C.1 框架、C.1.1 React、C.1.2 Angular、C.1.3 Vue、C.1.4 Ember、C.1.5 Meteor、C.1.6 Backbone.js、C.2 通用库、C.2.1 jQuery、C.2.2 Google Closure Library、C.2.3 Underscore.js、C.2.4 Lodash、C.2.5 Prototype、C.2.6 Dojo Toolkit、C.2.7 MooTools、C.2.8 qooxdoo、C.3 动画与特效、C.3.1 D3、C.3.2 three.js、C.3.3 moo.fx、C.3.4 Lightbox",
    tags: ["附录 C JavaScript库和框架", "目录覆盖"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-3",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 2,
    question: "附录 C JavaScript库和框架的六阶段证据链是什么？",
    answer:
      "定义产品约束 → 识别控制所有者 → 验证核心能力 → 评估生态与维护 → 构建代表性样例 → 记录退出策略",
    tags: ["附录 C JavaScript库和框架", "机制链"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-4",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 3,
    question: "附录 C JavaScript库和框架应主动注入哪两类失败？",
    answer:
      "按下载量选框架，没有验证产品的SSR、可访问性和性能预算。；业务规则直接依赖组件生命周期，无法单测或迁移。",
    tags: ["附录 C JavaScript库和框架", "故障注入"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-5",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 3,
    question: "附录 C JavaScript库和框架签发时保持什么不变量？",
    answer:
      "选型由代表性场景和预算证明；业务核心不依赖框架私有API；升级与退出路径有成本记录。",
    tags: ["附录 C JavaScript库和框架", "工程验收"],
  },
  {
    id: "jpg-appendix-c-libraries-frameworks-6",
    chapter: "jpg-appendix-c-libraries-frameworks",
    level: 3,
    question: "附录 C JavaScript库和框架怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 C JavaScript库和框架", "可复现实验"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-1",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 1,
    question: "附录 D JavaScript工具的核心主张是什么？",
    answer:
      "JavaScript工具链从编辑、静态检查、测试、转换、打包到监控构成可重现供应链，每一步都需锁版本与保留映射。",
    tags: ["附录 D JavaScript工具", "核心机制"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-2",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 2,
    question: "附录 D JavaScript工具覆盖哪些正式目录主题？",
    answer:
      "D.1 包管理、D.1.1 npm、D.1.2 Bower、D.1.3 JSPM、D.1.4 Yarn、D.2 模块加载器、D.2.1 SystemJS、D.2.2 RequireJS、D.3 模块打包器、D.3.1 Webpack、D.3.2 JSPM、D.3.3 Browserify、D.3.4 Rollup、D.4 编译/转译工具及静态类型系统、D.4.1 Babel、D.4.2 Google Closure Compiler、D.4.3 CoffeeScript、D.4.4 TypeScript、D.4.5 Flow、D.5 高性能脚本工具、D.5.1 WebAssembly、D.5.2 asm.js、D.5.3 Emscripten与LLVM、D.6 编辑器、D.6.1 Sublime Text、D.6.2 Atom、D.6.3 Brackets、D.6.4 Visual Studio Code、D.6.5 WebStorm、D.7 构建工具、自动化系统和任务运行器、D.7.1 Grunt、D.7.2 Gulp、D.7.3 Brunch、D.7.4 npm、D.8 代码检查和格式化、D.8.1 ESLint、D.8.2 Google Closure Compiler、D.8.3 JSLint、D.8.4 JSHint、D.8.5 ClangFormat、D.9 压缩工具、D.9.1 Uglify、D.9.2 Google Closure Compiler、D.9.3 JSMin、D.9.4 Dojo ShrinkSafe、D.10 单元测试、D.10.1 Mocha、D.10.2 Jasmine、D.10.3 qUnit、D.10.4 JsUnit、D.10.5 Dojo Object Harness、D.11 文档生成器、D.11.1 ESDoc、D.11.2 documentation.js、D.11.3 Docco、D.11.4 JsDoc Toolkit、D.11.5 YUI Doc、D.11.6 AjaxDoc",
    tags: ["附录 D JavaScript工具", "目录覆盖"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-3",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 2,
    question: "附录 D JavaScript工具的六阶段证据链是什么？",
    answer:
      "锁定运行时依赖 → 格式与静态检查 → 执行分层测试 → 转译目标语法 → 打包压缩映射 → 签名发布与监控",
    tags: ["附录 D JavaScript工具", "机制链"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-4",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 3,
    question: "附录 D JavaScript工具应主动注入哪两类失败？",
    answer:
      "删除锁文件让CI每次获取最新间接依赖，构建结果漂移。；发布压缩代码却没有受控源映射，生产错误无法定位原始行。",
    tags: ["附录 D JavaScript工具", "故障注入"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-5",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 3,
    question: "附录 D JavaScript工具签发时保持什么不变量？",
    answer:
      "依赖与工具版本锁定；同一提交构建可重现；测试、产物、源映射和运行错误可追溯到同一发布。",
    tags: ["附录 D JavaScript工具", "工程验收"],
  },
  {
    id: "jpg-appendix-d-javascript-tools-6",
    chapter: "jpg-appendix-d-javascript-tools",
    level: 3,
    question: "附录 D JavaScript工具怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 D JavaScript工具", "可复现实验"],
  },
  {
    id: "jpg-official-final-review-1",
    chapter: "jpg-official-final-review",
    level: 1,
    question: "《JavaScript高级程序设计（第4版）》全书总复习的核心主张是什么？",
    answer:
      "以一次页面启动、交互、异步请求、持久化与发布回滚的完整轨迹，复查28章与4个附录。",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "核心机制"],
  },
  {
    id: "jpg-official-final-review-2",
    chapter: "jpg-official-final-review",
    level: 2,
    question:
      "《JavaScript高级程序设计（第4版）》全书总复习覆盖哪些正式目录主题？",
    answer:
      "第 1 章 什么是JavaScript：1.1 简短的历史回顾、第 1 章 什么是JavaScript：1.2 JavaScript实现、第 1 章 什么是JavaScript：1.2.1 ECMAScript、第 1 章 什么是JavaScript：1.2.2 DOM、第 1 章 什么是JavaScript：1.2.3 BOM、第 1 章 什么是JavaScript：1.3 JavaScript版本、第 1 章 什么是JavaScript：1.4 小结、第 2 章 HTML中的JavaScript：2.1 <script>元素、第 2 章 HTML中的JavaScript：2.1.1 标签占位符、第 2 章 HTML中的JavaScript：2.1.2 推迟执行脚本、第 2 章 HTML中的JavaScript：2.1.3 异步执行脚本、第 2 章 HTML中的JavaScript：2.1.4 动态加载脚本、第 2 章 HTML中的JavaScript：2.1.5 XHTML中的变化、第 2 章 HTML中的JavaScript：2.1.6 废弃的语法、第 2 章 HTML中的JavaScript：2.2 行内代码与外部文件、第 2 章 HTML中的JavaScript：2.3 文档模式、第 2 章 HTML中的JavaScript：2.4 <noscript>元素、第 2 章 HTML中的JavaScript：2.5 小结、第 3 章 语言基础：3.1 语法、第 3 章 语言基础：3.1.1 区分大小写、第 3 章 语言基础：3.1.2 标识符、第 3 章 语言基础：3.1.3 注释、第 3 章 语言基础：3.1.4 严格模式、第 3 章 语言基础：3.1.5 语句、第 3 章 语言基础：3.2 关键字与保留字、第 3 章 语言基础：3.3 变量、第 3 章 语言基础：3.3.1 var关键字、第 3 章 语言基础：3.3.2 let声明、第 3 章 语言基础：3.3.3 const声明、第 3 章 语言基础：3.3.4 声明风格及最佳实践、第 3 章 语言基础：3.4 数据类型、第 3 章 语言基础：3.4.1 typeof操作符、第 3 章 语言基础：3.4.2 Undefined类型、第 3 章 语言基础：3.4.3 Null类型、第 3 章 语言基础：3.4.4 Boolean类型、第 3 章 语言基础：3.4.5 Number类型、第 3 章 语言基础：3.4.6 String类型、第 3 章 语言基础：3.4.7 Symbol类型、第 3 章 语言基础：3.4.8 Object类型、第 3 章 语言基础：3.5 操作符、第 3 章 语言基础：3.5.1 一元操作符、第 3 章 语言基础：3.5.2 位操作符、第 3 章 语言基础：3.5.3 布尔操作符、第 3 章 语言基础：3.5.4 乘性操作符、第 3 章 语言基础：3.5.5 指数操作符、第 3 章 语言基础：3.5.6 加性操作符、第 3 章 语言基础：3.5.7 关系操作符、第 3 章 语言基础：3.5.8 相等操作符、第 3 章 语言基础：3.5.9 条件操作符、第 3 章 语言基础：3.5.10 赋值操作符、第 3 章 语言基础：3.5.11 逗号操作符、第 3 章 语言基础：3.6 语句、第 3 章 语言基础：3.6.1 if语句、第 3 章 语言基础：3.6.2 do-while语句、第 3 章 语言基础：3.6.3 while语句、第 3 章 语言基础：3.6.4 for语句、第 3 章 语言基础：3.6.5 for-in语句、第 3 章 语言基础：3.6.6 for-of语句、第 3 章 语言基础：3.6.7 标签语句、第 3 章 语言基础：3.6.8 break和continue语句、第 3 章 语言基础：3.6.9 with语句、第 3 章 语言基础：3.6.10 switch语句、第 3 章 语言基础：3.7 函数、第 3 章 语言基础：3.8 小结、第 4 章 变量、作用域与内存：4.1 原始值与引用值、第 4 章 变量、作用域与内存：4.1.1 动态属性、第 4 章 变量、作用域与内存：4.1.2 复制值、第 4 章 变量、作用域与内存：4.1.3 传递参数、第 4 章 变量、作用域与内存：4.1.4 确定类型、第 4 章 变量、作用域与内存：4.2 执行上下文与作用域、第 4 章 变量、作用域与内存：4.2.1 作用域链增强、第 4 章 变量、作用域与内存：4.2.2 变量声明、第 4 章 变量、作用域与内存：4.3 垃圾回收、第 4 章 变量、作用域与内存：4.3.1 标记清理、第 4 章 变量、作用域与内存：4.3.2 引用计数、第 4 章 变量、作用域与内存：4.3.3 性能、第 4 章 变量、作用域与内存：4.3.4 内存管理、第 4 章 变量、作用域与内存：4.4 小结、第 5 章 基本引用类型：5.1 Date、第 5 章 基本引用类型：5.1.1 继承的方法、第 5 章 基本引用类型：5.1.2 日期格式化方法、第 5 章 基本引用类型：5.1.3 日期/时间组件方法、第 5 章 基本引用类型：5.2 RegExp、第 5 章 基本引用类型：5.2.1 RegExp实例属性、第 5 章 基本引用类型：5.2.2 RegExp实例方法、第 5 章 基本引用类型：5.2.3 RegExp构造函数属性、第 5 章 基本引用类型：5.2.4 模式局限、第 5 章 基本引用类型：5.3 原始值包装类型、第 5 章 基本引用类型：5.3.1 Boolean、第 5 章 基本引用类型：5.3.2 Number、第 5 章 基本引用类型：5.3.3 String、第 5 章 基本引用类型：5.4 单例内置对象、第 5 章 基本引用类型：5.4.1 Global、第 5 章 基本引用类型：5.4.2 Math、第 5 章 基本引用类型：5.5 小结、第 6 章 集合引用类型：6.1 Object、第 6 章 集合引用类型：6.2 Array、第 6 章 集合引用类型：6.2.1 创建数组、第 6 章 集合引用类型：6.2.2 数组空位、第 6 章 集合引用类型：6.2.3 数组索引、第 6 章 集合引用类型：6.2.4 检测数组、第 6 章 集合引用类型：6.2.5 迭代器方法、第 6 章 集合引用类型：6.2.6 复制和填充方法、第 6 章 集合引用类型：6.2.7 转换方法、第 6 章 集合引用类型：6.2.8 栈方法、第 6 章 集合引用类型：6.2.9 队列方法、第 6 章 集合引用类型：6.2.10 排序方法、第 6 章 集合引用类型：6.2.11 操作方法、第 6 章 集合引用类型：6.2.12 搜索和位置方法、第 6 章 集合引用类型：6.2.13 迭代方法、第 6 章 集合引用类型：6.2.14 归并方法、第 6 章 集合引用类型：6.3 定型数组、第 6 章 集合引用类型：6.3.1 历史、第 6 章 集合引用类型：6.3.2 ArrayBuffer、第 6 章 集合引用类型：6.3.3 DataView、第 6 章 集合引用类型：6.3.4 定型数组、第 6 章 集合引用类型：6.4 Map、第 6 章 集合引用类型：6.4.1 基本API、第 6 章 集合引用类型：6.4.2 顺序与迭代、第 6 章 集合引用类型：6.4.3 选择Object还是Map、第 6 章 集合引用类型：6.5 WeakMap、第 6 章 集合引用类型：6.5.1 基本API、第 6 章 集合引用类型：6.5.2 弱键、第 6 章 集合引用类型：6.5.3 不可迭代键、第 6 章 集合引用类型：6.5.4 使用弱映射、第 6 章 集合引用类型：6.6 Set、第 6 章 集合引用类型：6.6.1 基本API、第 6 章 集合引用类型：6.6.2 顺序与迭代、第 6 章 集合引用类型：6.6.3 定义正式集合操作、第 6 章 集合引用类型：6.7 WeakSet、第 6 章 集合引用类型：6.7.1 基本API、第 6 章 集合引用类型：6.7.2 弱值、第 6 章 集合引用类型：6.7.3 不可迭代值、第 6 章 集合引用类型：6.7.4 使用弱集合、第 6 章 集合引用类型：6.8 迭代与扩展操作、第 6 章 集合引用类型：6.9 小结、第 7 章 迭代器与生成器：7.1 理解迭代、第 7 章 迭代器与生成器：7.2 迭代器模式、第 7 章 迭代器与生成器：7.2.1 可迭代协议、第 7 章 迭代器与生成器：7.2.2 迭代器协议、第 7 章 迭代器与生成器：7.2.3 自定义迭代器、第 7 章 迭代器与生成器：7.2.4 提前终止迭代器、第 7 章 迭代器与生成器：7.3 生成器、第 7 章 迭代器与生成器：7.3.1 生成器基础、第 7 章 迭代器与生成器：7.3.2 通过yield中断执行、第 7 章 迭代器与生成器：7.3.3 生成器作为默认迭代器、第 7 章 迭代器与生成器：7.3.4 提前终止生成器、第 7 章 迭代器与生成器：7.4 小结、第 8 章 对象、类与面向对象编程：8.1 理解对象、第 8 章 对象、类与面向对象编程：8.1.1 属性的类型、第 8 章 对象、类与面向对象编程：8.1.2 定义多个属性、第 8 章 对象、类与面向对象编程：8.1.3 读取属性的特性、第 8 章 对象、类与面向对象编程：8.1.4 合并对象、第 8 章 对象、类与面向对象编程：8.1.5 对象标识及相等判定、第 8 章 对象、类与面向对象编程：8.1.6 增强的对象语法、第 8 章 对象、类与面向对象编程：8.1.7 对象解构、第 8 章 对象、类与面向对象编程：8.2 创建对象、第 8 章 对象、类与面向对象编程：8.2.1 概述、第 8 章 对象、类与面向对象编程：8.2.2 工厂模式、第 8 章 对象、类与面向对象编程：8.2.3 构造函数模式、第 8 章 对象、类与面向对象编程：8.2.4 原型模式、第 8 章 对象、类与面向对象编程：8.2.5 对象迭代、第 8 章 对象、类与面向对象编程：8.3 继承、第 8 章 对象、类与面向对象编程：8.3.1 原型链、第 8 章 对象、类与面向对象编程：8.3.2 盗用构造函数、第 8 章 对象、类与面向对象编程：8.3.3 组合继承、第 8 章 对象、类与面向对象编程：8.3.4 原型式继承、第 8 章 对象、类与面向对象编程：8.3.5 寄生式继承、第 8 章 对象、类与面向对象编程：8.3.6 寄生式组合继承、第 8 章 对象、类与面向对象编程：8.4 类、第 8 章 对象、类与面向对象编程：8.4.1 类定义、第 8 章 对象、类与面向对象编程：8.4.2 类构造函数、第 8 章 对象、类与面向对象编程：8.4.3 实例、原型和类成员、第 8 章 对象、类与面向对象编程：8.4.4 继承、第 8 章 对象、类与面向对象编程：8.5 小结、第 9 章 代理与反射：9.1 代理基础、第 9 章 代理与反射：9.1.1 创建空代理、第 9 章 代理与反射：9.1.2 定义捕获器、第 9 章 代理与反射：9.1.3 捕获器参数和反射API、第 9 章 代理与反射：9.1.4 捕获器不变式、第 9 章 代理与反射：9.1.5 可撤销代理、第 9 章 代理与反射：9.1.6 实用反射API、第 9 章 代理与反射：9.1.7 代理另一个代理、第 9 章 代理与反射：9.1.8 代理的问题与不足、第 9 章 代理与反射：9.2 代理捕获器与反射方法、第 9 章 代理与反射：9.2.1 get()、第 9 章 代理与反射：9.2.2 set()、第 9 章 代理与反射：9.2.3 has()、第 9 章 代理与反射：9.2.4 defineProperty()、第 9 章 代理与反射：9.2.5 getOwnPropertyDescriptor()、第 9 章 代理与反射：9.2.6 deleteProperty()、第 9 章 代理与反射：9.2.7 ownKeys()、第 9 章 代理与反射：9.2.8 getPrototypeOf()、第 9 章 代理与反射：9.2.9 setPrototypeOf()、第 9 章 代理与反射：9.2.10 isExtensible()、第 9 章 代理与反射：9.2.11 preventExtensions()、第 9 章 代理与反射：9.2.12 apply()、第 9 章 代理与反射：9.2.13 construct()、第 9 章 代理与反射：9.3 代理模式、第 9 章 代理与反射：9.3.1 跟踪属性访问、第 9 章 代理与反射：9.3.2 隐藏属性、第 9 章 代理与反射：9.3.3 属性验证、第 9 章 代理与反射：9.3.4 函数与构造函数参数验证、第 9 章 代理与反射：9.3.5 数据绑定与可观察对象、第 9 章 代理与反射：9.4 小结、第 10 章 函数：10.1 箭头函数、第 10 章 函数：10.2 函数名、第 10 章 函数：10.3 理解参数、第 10 章 函数：箭头函数中的参数、第 10 章 函数：10.4 没有重载、第 10 章 函数：10.5 默认参数值、第 10 章 函数：默认参数作用域与暂时性死区、第 10 章 函数：10.6 参数扩展与收集、第 10 章 函数：10.6.1 扩展参数、第 10 章 函数：10.6.2 收集参数、第 10 章 函数：10.7 函数声明与函数表达式、第 10 章 函数：10.8 函数作为值、第 10 章 函数：10.9 函数内部、第 10 章 函数：10.9.1 arguments、第 10 章 函数：10.9.2 this、第 10 章 函数：10.9.3 caller、第 10 章 函数：10.9.4 new.target、第 10 章 函数：10.10 函数属性与方法、第 10 章 函数：10.11 函数表达式、第 10 章 函数：10.12 递归、第 10 章 函数：10.13 尾调用优化、第 10 章 函数：10.13.1 尾调用优化的条件、第 10 章 函数：10.13.2 尾调用优化的代码、第 10 章 函数：10.14 闭包、第 10 章 函数：10.14.1 this对象、第 10 章 函数：10.14.2 内存泄漏、第 10 章 函数：10.15 立即调用的函数表达式、第 10 章 函数：10.16 私有变量、第 10 章 函数：10.16.1 静态私有变量、第 10 章 函数：10.16.2 模块模式、第 10 章 函数：10.16.3 模块增强模式、第 10 章 函数：10.17 小结、第 11 章 期约与异步函数：11.1 异步编程、第 11 章 期约与异步函数：11.1.1 同步与异步、第 11 章 期约与异步函数：11.1.2 以往的异步编程模式、第 11 章 期约与异步函数：11.2 期约、第 11 章 期约与异步函数：11.2.1 Promises/A+规范、第 11 章 期约与异步函数：11.2.2 期约基础、第 11 章 期约与异步函数：11.2.3 期约的实例方法、第 11 章 期约与异步函数：11.2.4 期约连锁与期约合成、第 11 章 期约与异步函数：11.2.5 期约扩展、第 11 章 期约与异步函数：11.3 异步函数、第 11 章 期约与异步函数：11.3.1 异步函数、第 11 章 期约与异步函数：11.3.2 停止和恢复执行、第 11 章 期约与异步函数：11.3.3 异步函数策略、第 11 章 期约与异步函数：11.4 小结、第 12 章 BOM：12.1 window对象、第 12 章 BOM：12.1.1 Global作用域、第 12 章 BOM：12.1.2 窗口关系、第 12 章 BOM：12.1.3 窗口位置与像素比、第 12 章 BOM：12.1.4 窗口大小、第 12 章 BOM：12.1.5 视口位置、第 12 章 BOM：12.1.6 导航与打开新窗口、第 12 章 BOM：12.1.7 定时器、第 12 章 BOM：12.1.8 系统对话框、第 12 章 BOM：12.2 location对象、第 12 章 BOM：12.2.1 查询字符串、第 12 章 BOM：12.2.2 操作地址、第 12 章 BOM：12.3 navigator对象、第 12 章 BOM：12.3.1 检测插件、第 12 章 BOM：12.3.2 注册处理程序、第 12 章 BOM：12.4 screen对象、第 12 章 BOM：12.5 history对象、第 12 章 BOM：12.5.1 导航、第 12 章 BOM：12.5.2 历史状态管理、第 12 章 BOM：12.6 小结、第 13 章 客户端检测：13.1 能力检测、第 13 章 客户端检测：13.1.1 安全能力检测、第 13 章 客户端检测：13.1.2 基于能力检测进行浏览器分析、第 13 章 客户端检测：13.2 用户代理检测、第 13 章 客户端检测：13.2.1 用户代理的历史、第 13 章 客户端检测：13.2.2 浏览器分析、第 13 章 客户端检测：13.3 软件与硬件检测、第 13 章 客户端检测：13.3.1 识别浏览器与操作系统、第 13 章 客户端检测：13.3.2 浏览器元数据、第 13 章 客户端检测：13.3.3 硬件、第 13 章 客户端检测：13.4 小结、第 14 章 DOM：14.1 节点层级、第 14 章 DOM：14.1.1 Node类型、第 14 章 DOM：14.1.2 Document类型、第 14 章 DOM：14.1.3 Element类型、第 14 章 DOM：14.1.4 Text类型、第 14 章 DOM：14.1.5 Comment类型、第 14 章 DOM：14.1.6 CDATASection类型、第 14 章 DOM：14.1.7 DocumentType类型、第 14 章 DOM：14.1.8 DocumentFragment类型、第 14 章 DOM：14.1.9 Attr类型、第 14 章 DOM：14.2 DOM编程、第 14 章 DOM：14.2.1 动态脚本、第 14 章 DOM：14.2.2 动态样式、第 14 章 DOM：14.2.3 操作表格、第 14 章 DOM：14.2.4 使用NodeList、第 14 章 DOM：14.3 MutationObserver接口、第 14 章 DOM：14.3.1 基本用法、第 14 章 DOM：14.3.2 MutationObserverInit与观察范围、第 14 章 DOM：14.3.3 异步回调与记录队列、第 14 章 DOM：14.3.4 性能、内存与垃圾回收、第 14 章 DOM：14.4 小结、第 15 章 DOM扩展：15.1 Selectors API、第 15 章 DOM扩展：15.1.1 querySelector()、第 15 章 DOM扩展：15.1.2 querySelectorAll()、第 15 章 DOM扩展：15.1.3 matches()、第 15 章 DOM扩展：15.2 元素遍历、第 15 章 DOM扩展：15.3 HTML5、第 15 章 DOM扩展：15.3.1 CSS类扩展、第 15 章 DOM扩展：15.3.2 焦点管理、第 15 章 DOM扩展：15.3.3 HTMLDocument扩展、第 15 章 DOM扩展：15.3.4 字符集属性、第 15 章 DOM扩展：15.3.5 自定义数据属性、第 15 章 DOM扩展：15.3.6 插入标记、第 15 章 DOM扩展：15.3.7 scrollIntoView()、第 15 章 DOM扩展：15.4 专有扩展、第 15 章 DOM扩展：15.4.1 children属性、第 15 章 DOM扩展：15.4.2 contains()方法、第 15 章 DOM扩展：15.4.3 插入标记、第 15 章 DOM扩展：15.4.4 滚动、第 15 章 DOM扩展：15.5 小结、第 16 章 DOM2和DOM3：16.1 DOM的演进、第 16 章 DOM2和DOM3：16.1.1 XML命名空间、第 16 章 DOM2和DOM3：16.1.2 其他变化、第 16 章 DOM2和DOM3：16.2 样式、第 16 章 DOM2和DOM3：16.2.1 存取元素样式、第 16 章 DOM2和DOM3：16.2.2 操作样式表、第 16 章 DOM2和DOM3：16.2.3 元素尺寸、第 16 章 DOM2和DOM3：16.3 遍历、第 16 章 DOM2和DOM3：16.3.1 NodeIterator、第 16 章 DOM2和DOM3：16.3.2 TreeWalker、第 16 章 DOM2和DOM3：16.4 范围、第 16 章 DOM2和DOM3：16.4.1 DOM范围、第 16 章 DOM2和DOM3：16.4.2 简单选择、第 16 章 DOM2和DOM3：16.4.3 复杂选择、第 16 章 DOM2和DOM3：16.4.4 操作范围、第 16 章 DOM2和DOM3：16.4.5 范围插入、第 16 章 DOM2和DOM3：16.4.6 范围折叠、第 16 章 DOM2和DOM3：16.4.7 范围比较、第 16 章 DOM2和DOM3：16.4.8 复制范围、第 16 章 DOM2和DOM3：16.4.9 清理、第 16 章 DOM2和DOM3：16.5 小结、第 17 章 事件：17.1 事件流、第 17 章 事件：17.1.1 事件冒泡、第 17 章 事件：17.1.2 事件捕获、第 17 章 事件：17.1.3 DOM事件流、第 17 章 事件：17.2 事件处理程序、第 17 章 事件：17.2.1 HTML事件处理程序、第 17 章 事件：17.2.2 DOM0事件处理程序、第 17 章 事件：17.2.3 DOM2事件处理程序、第 17 章 事件：17.2.4 IE事件处理程序、第 17 章 事件：17.2.5 跨浏览器事件处理程序、第 17 章 事件：17.3 事件对象、第 17 章 事件：17.3.1 DOM事件对象、第 17 章 事件：17.3.2 IE事件对象、第 17 章 事件：17.3.3 跨浏览器事件对象、第 17 章 事件：17.4 事件类型、第 17 章 事件：17.4.1 用户界面事件、第 17 章 事件：17.4.2 焦点事件、第 17 章 事件：17.4.3 鼠标和滚轮事件、第 17 章 事件：17.4.4 键盘与输入事件、第 17 章 事件：17.4.5 合成事件、第 17 章 事件：17.4.6 变化事件、第 17 章 事件：17.4.7 HTML5事件、第 17 章 事件：17.4.8 设备事件、第 17 章 事件：17.4.9 触摸及手势事件、第 17 章 事件：17.4.10 事件参考、第 17 章 事件：17.5 内存与性能、第 17 章 事件：17.5.1 事件委托、第 17 章 事件：17.5.2 删除事件处理程序、第 17 章 事件：17.6 模拟事件、第 17 章 事件：17.6.1 DOM事件模拟、第 17 章 事件：17.6.2 IE事件模拟、第 17 章 事件：17.7 小结、第 18 章 动画与Canvas图形：18.1 使用requestAnimationFrame、第 18 章 动画与Canvas图形：18.1.1 早期定时动画、第 18 章 动画与Canvas图形：18.1.2 时间间隔的问题、第 18 章 动画与Canvas图形：18.1.3 requestAnimationFrame、第 18 章 动画与Canvas图形：18.1.4 cancelAnimationFrame、第 18 章 动画与Canvas图形：18.1.5 通过requestAnimationFrame节流、第 18 章 动画与Canvas图形：18.2 基本的画布功能、第 18 章 动画与Canvas图形：18.3 2D绘图上下文、第 18 章 动画与Canvas图形：18.3.1 填充和描边、第 18 章 动画与Canvas图形：18.3.2 绘制矩形、第 18 章 动画与Canvas图形：18.3.3 绘制路径、第 18 章 动画与Canvas图形：18.3.4 绘制文本、第 18 章 动画与Canvas图形：18.3.5 变换、第 18 章 动画与Canvas图形：18.3.6 绘制图像、第 18 章 动画与Canvas图形：18.3.7 阴影、第 18 章 动画与Canvas图形：18.3.8 渐变、第 18 章 动画与Canvas图形：18.3.9 图案、第 18 章 动画与Canvas图形：18.3.10 图像数据、第 18 章 动画与Canvas图形：18.3.11 合成、第 18 章 动画与Canvas图形：18.4 WebGL、第 18 章 动画与Canvas图形：18.4.1 WebGL上下文、第 18 章 动画与Canvas图形：18.4.2 WebGL基础、第 18 章 动画与Canvas图形：18.4.3 WebGL1与WebGL2、第 18 章 动画与Canvas图形：18.5 小结、第 19 章 表单脚本：19.1 表单基础、第 19 章 表单脚本：19.1.1 提交表单、第 19 章 表单脚本：19.1.2 重置表单、第 19 章 表单脚本：19.1.3 表单字段、第 19 章 表单脚本：19.2 文本框编程、第 19 章 表单脚本：19.2.1 选择文本、第 19 章 表单脚本：19.2.2 输入过滤、第 19 章 表单脚本：19.2.3 自动切换、第 19 章 表单脚本：19.2.4 HTML5约束验证API、第 19 章 表单脚本：19.3 选择框编程、第 19 章 表单脚本：19.3.1 选项处理、第 19 章 表单脚本：19.3.2 添加选项、第 19 章 表单脚本：19.3.3 移除选项、第 19 章 表单脚本：19.3.4 移动和重排选项、第 19 章 表单脚本：19.4 表单序列化、第 19 章 表单脚本：19.5 富文本编辑、第 19 章 表单脚本：19.5.1 使用contenteditable、第 19 章 表单脚本：19.5.2 与富文本交互、第 19 章 表单脚本：19.5.3 富文件选择、第 19 章 表单脚本：19.5.4 通过表单提交富文本、第 19 章 表单脚本：19.6 小结、第 20 章 JavaScript API：20.1 Atomics与SharedArrayBuffer、第 20 章 JavaScript API：20.1.1 SharedArrayBuffer、第 20 章 JavaScript API：20.1.2 原子操作基础、第 20 章 JavaScript API：20.2 跨上下文消息、第 20 章 JavaScript API：20.3 Encoding API、第 20 章 JavaScript API：20.3.1 文本编码、第 20 章 JavaScript API：20.3.2 文本解码、第 20 章 JavaScript API：20.4 File API与Blob API、第 20 章 JavaScript API：20.4.1 File类型、第 20 章 JavaScript API：20.4.2 FileReader类型、第 20 章 JavaScript API：20.4.3 FileReaderSync类型、第 20 章 JavaScript API：20.4.4 Blob与部分读取、第 20 章 JavaScript API：20.4.5 对象URL与Blob、第 20 章 JavaScript API：20.4.6 读取拖放文件、第 20 章 JavaScript API：20.5 媒体元素、第 20 章 JavaScript API：20.5.1 属性、第 20 章 JavaScript API：20.5.2 事件、第 20 章 JavaScript API：20.5.3 自定义媒体播放器、第 20 章 JavaScript API：20.5.4 检测编解码器、第 20 章 JavaScript API：20.5.5 音频类型、第 20 章 JavaScript API：20.6 原生拖放、第 20 章 JavaScript API：20.6.1 拖放事件、第 20 章 JavaScript API：20.6.2 自定义放置目标、第 20 章 JavaScript API：20.6.3 dataTransfer对象、第 20 章 JavaScript API：20.6.4 dropEffect与effectAllowed、第 20 章 JavaScript API：20.6.5 可拖动能力、第 20 章 JavaScript API：20.6.6 其他成员、第 20 章 JavaScript API：20.7 Notifications API、第 20 章 JavaScript API：20.7.1 通知权限、第 20 章 JavaScript API：20.7.2 显示和隐藏通知、第 20 章 JavaScript API：20.7.3 通知生命周期回调、第 20 章 JavaScript API：20.8 Page Visibility API、第 20 章 JavaScript API：20.9 Streams API、第 20 章 JavaScript API：20.9.1 理解流、第 20 章 JavaScript API：20.9.2 可读流、第 20 章 JavaScript API：20.9.3 可写流、第 20 章 JavaScript API：20.9.4 转换流、第 20 章 JavaScript API：20.9.5 通过管道连接流、第 20 章 JavaScript API：20.10 计时API、第 20 章 JavaScript API：20.10.1 High Resolution Time API、第 20 章 JavaScript API：20.10.2 Performance Timeline API、第 20 章 JavaScript API：20.11 Web组件、第 20 章 JavaScript API：20.11.1 HTML模板、第 20 章 JavaScript API：20.11.2 影子DOM、第 20 章 JavaScript API：20.11.3 自定义元素、第 20 章 JavaScript API：20.12 Web Cryptography API、第 20 章 JavaScript API：20.12.1 生成随机数、第 20 章 JavaScript API：20.12.2 使用SubtleCrypto对象、第 20 章 JavaScript API：20.13 小结、第 21 章 错误处理与调试：21.1 浏览器错误报告、第 21 章 错误处理与调试：21.1.1 桌面控制台、第 21 章 错误处理与调试：21.1.2 移动控制台、第 21 章 错误处理与调试：21.2 错误处理、第 21 章 错误处理与调试：21.2.1 try/catch语句、第 21 章 错误处理与调试：21.2.2 抛出错误、第 21 章 错误处理与调试：21.2.3 error事件、第 21 章 错误处理与调试：21.2.4 错误处理策略、第 21 章 错误处理与调试：21.2.5 识别错误、第 21 章 错误处理与调试：21.2.6 区分重大与非重大错误、第 21 章 错误处理与调试：21.2.7 把错误记录到服务器中、第 21 章 错误处理与调试：21.3 调试技术、第 21 章 错误处理与调试：21.3.1 把消息记录到控制台、第 21 章 错误处理与调试：21.3.2 理解控制台运行时、第 21 章 错误处理与调试：21.3.3 使用JavaScript调试器、第 21 章 错误处理与调试：21.3.4 在页面中打印消息、第 21 章 错误处理与调试：21.3.5 补充控制台方法、第 21 章 错误处理与调试：21.3.6 抛出错误、第 21 章 错误处理与调试：21.4 旧版IE的常见错误、第 21 章 错误处理与调试：21.4.1 无效字符、第 21 章 错误处理与调试：21.4.2 未找到成员、第 21 章 错误处理与调试：21.4.3 未知运行时错误、第 21 章 错误处理与调试：21.4.4 语法错误、第 21 章 错误处理与调试：21.4.5 系统找不到指定资源、第 21 章 错误处理与调试：21.5 小结、第 22 章 处理XML：22.1 浏览器对XML DOM的支持、第 22 章 处理XML：22.1.1 DOM Level 2 Core、第 22 章 处理XML：22.1.2 DOMParser类型、第 22 章 处理XML：22.1.3 XMLSerializer类型、第 22 章 处理XML：22.2 浏览器对XPath的支持、第 22 章 处理XML：22.2.1 DOM Level 3 XPath、第 22 章 处理XML：22.2.2 单个节点结果、第 22 章 处理XML：22.2.3 简单类型结果、第 22 章 处理XML：22.2.4 默认类型结果、第 22 章 处理XML：22.2.5 命名空间支持、第 22 章 处理XML：22.3 浏览器对XSLT的支持、第 22 章 处理XML：22.3.1 XSLTProcessor类型、第 22 章 处理XML：22.3.2 使用参数、第 22 章 处理XML：22.3.3 重置处理器、第 22 章 处理XML：22.4 小结、第 23 章 JSON：23.1 语法、第 23 章 JSON：23.1.1 简单值、第 23 章 JSON：23.1.2 对象、第 23 章 JSON：23.1.3 数组、第 23 章 JSON：23.2 解析与序列化、第 23 章 JSON：23.2.1 JSON对象、第 23 章 JSON：23.2.2 序列化选项、第 23 章 JSON：23.2.3 解析选项、第 23 章 JSON：23.3 小结、第 24 章 网络请求与远程资源：24.1 XMLHttpRequest对象、第 24 章 网络请求与远程资源：24.1.1 使用XHR、第 24 章 网络请求与远程资源：24.1.2 HTTP头部、第 24 章 网络请求与远程资源：24.1.3 GET请求、第 24 章 网络请求与远程资源：24.1.4 POST请求、第 24 章 网络请求与远程资源：24.1.5 XMLHttpRequest Level 2、第 24 章 网络请求与远程资源：24.2 进度事件、第 24 章 网络请求与远程资源：24.2.1 load事件、第 24 章 网络请求与远程资源：24.2.2 progress事件、第 24 章 网络请求与远程资源：24.3 跨源资源共享、第 24 章 网络请求与远程资源：24.3.1 预检请求、第 24 章 网络请求与远程资源：24.3.2 凭据请求、第 24 章 网络请求与远程资源：24.4 替代性跨源技术、第 24 章 网络请求与远程资源：24.4.1 图片探测、第 24 章 网络请求与远程资源：24.4.2 JSONP、第 24 章 网络请求与远程资源：24.5 Fetch API、第 24 章 网络请求与远程资源：24.5.1 基本用法、第 24 章 网络请求与远程资源：24.5.2 常见Fetch请求模式、第 24 章 网络请求与远程资源：24.5.3 Headers对象、第 24 章 网络请求与远程资源：24.5.4 Request对象、第 24 章 网络请求与远程资源：24.5.5 Response对象、第 24 章 网络请求与远程资源：24.5.6 Request、Response及Body混入、第 24 章 网络请求与远程资源：24.6 Beacon API、第 24 章 网络请求与远程资源：24.7 Web Socket、第 24 章 网络请求与远程资源：24.7.1 API、第 24 章 网络请求与远程资源：24.7.2 发送和接收数据、第 24 章 网络请求与远程资源：24.7.3 其他事件、第 24 章 网络请求与远程资源：24.8 安全、第 24 章 网络请求与远程资源：24.9 小结、第 25 章 客户端存储：25.1 cookie、第 25 章 客户端存储：25.1.1 限制、第 25 章 客户端存储：25.1.2 cookie的构成、第 25 章 客户端存储：25.1.3 JavaScript中的cookie、第 25 章 客户端存储：25.1.4 子cookie、第 25 章 客户端存储：25.1.5 使用cookie的注意事项、第 25 章 客户端存储：25.2 Web Storage、第 25 章 客户端存储：25.2.1 Storage类型、第 25 章 客户端存储：25.2.2 sessionStorage对象、第 25 章 客户端存储：25.2.3 localStorage对象、第 25 章 客户端存储：25.2.4 存储事件、第 25 章 客户端存储：25.2.5 限制、第 25 章 客户端存储：25.3 IndexedDB、第 25 章 客户端存储：25.3.1 数据库、第 25 章 客户端存储：25.3.2 对象存储、第 25 章 客户端存储：25.3.3 事务、第 25 章 客户端存储：25.3.4 插入对象、第 25 章 客户端存储：25.3.5 通过游标查询、第 25 章 客户端存储：25.3.6 键范围、第 25 章 客户端存储：25.3.7 设置游标方向、第 25 章 客户端存储：25.3.8 索引、第 25 章 客户端存储：25.3.9 并发问题、第 25 章 客户端存储：25.3.10 限制、第 25 章 客户端存储：25.4 小结、第 26 章 模块：26.1 理解模块模式、第 26 章 模块：26.1.1 模块标识符、第 26 章 模块：26.1.2 模块依赖、第 26 章 模块：26.1.3 模块加载、第 26 章 模块：26.1.4 入口、第 26 章 模块：26.1.5 异步依赖、第 26 章 模块：26.1.6 动态依赖、第 26 章 模块：26.1.7 静态分析、第 26 章 模块：26.1.8 循环依赖、第 26 章 模块：26.2 凑合的模块系统、第 26 章 模块：26.3 使用ES6之前的模块加载器、第 26 章 模块：26.3.1 CommonJS、第 26 章 模块：26.3.2 异步模块定义、第 26 章 模块：26.3.3 通用模块定义、第 26 章 模块：26.3.4 模块加载器终将没落、第 26 章 模块：26.4 使用ES6模块、第 26 章 模块：26.4.1 模块标签及定义、第 26 章 模块：26.4.2 模块加载、第 26 章 模块：26.4.3 模块行为、第 26 章 模块：26.4.4 模块导出、第 26 章 模块：26.4.5 模块导入、第 26 章 模块：26.4.6 模块转移导出、第 26 章 模块：26.4.7 工作者模块、第 26 章 模块：26.4.8 向后兼容、第 26 章 模块：26.5 小结、第 27 章 工作者线程：27.1 工作者线程简介、第 27 章 工作者线程：27.1.1 工作者线程与线程、第 27 章 工作者线程：27.1.2 工作者线程的类型、第 27 章 工作者线程：27.1.3 WorkerGlobalScope、第 27 章 工作者线程：27.2 专用工作者线程、第 27 章 工作者线程：27.2.1 专用工作者线程的基本概念、第 27 章 工作者线程：27.2.2 专用工作者线程与隐式MessagePorts、第 27 章 工作者线程：27.2.3 专用工作者线程的生命周期、第 27 章 工作者线程：27.2.4 配置Worker选项、第 27 章 工作者线程：27.2.5 在JavaScript行内创建工作者线程、第 27 章 工作者线程：27.2.6 在工作者线程中动态执行脚本、第 27 章 工作者线程：27.2.7 委托任务到子工作者线程、第 27 章 工作者线程：27.2.8 处理工作者线程错误、第 27 章 工作者线程：27.2.9 与专用工作者线程通信、第 27 章 工作者线程：27.2.10 工作者线程数据传输、第 27 章 工作者线程：27.2.11 线程池、第 27 章 工作者线程：27.3 共享工作者线程、第 27 章 工作者线程：27.3.1 共享工作者线程简介、第 27 章 工作者线程：27.3.2 理解共享工作者线程的生命周期、第 27 章 工作者线程：27.3.3 连接到共享工作者线程、第 27 章 工作者线程：27.4 服务工作者线程、第 27 章 工作者线程：27.4.1 服务工作者线程基础、第 27 章 工作者线程：27.4.2 服务工作者线程缓存、第 27 章 工作者线程：27.4.3 服务工作者线程客户端、第 27 章 工作者线程：27.4.4 服务工作者线程与一致性、第 27 章 工作者线程：27.4.5 理解服务工作者线程的生命周期、第 27 章 工作者线程：27.4.6 控制反转与服务工作者线程持久化、第 27 章 工作者线程：27.4.7 通过updateViaCache管理服务文件缓存、第 27 章 工作者线程：27.4.8 强制性服务工作者线程操作、第 27 章 工作者线程：27.4.9 服务工作者线程消息、第 27 章 工作者线程：27.4.10 拦截fetch事件、第 27 章 工作者线程：27.4.11 推送通知、第 27 章 工作者线程：27.5 小结、第 28 章 最佳实践：28.1 可维护性、第 28 章 最佳实践：28.1.1 什么是可维护的代码、第 28 章 最佳实践：28.1.2 编码规范、第 28 章 最佳实践：28.1.3 松散耦合、第 28 章 最佳实践：28.1.4 编码惯例、第 28 章 最佳实践：28.2 性能、第 28 章 最佳实践：28.2.1 作用域意识、第 28 章 最佳实践：28.2.2 选择正确的方法、第 28 章 最佳实践：28.2.3 语句最少化、第 28 章 最佳实践：28.2.4 优化DOM交互、第 28 章 最佳实践：28.3 部署、第 28 章 最佳实践：28.3.1 构建流程、第 28 章 最佳实践：28.3.2 验证、第 28 章 最佳实践：28.3.3 压缩、第 28 章 最佳实践：28.4 小结、附录 A ES2018和ES2019：A.1 异步迭代、附录 A ES2018和ES2019：A.1.1 创建并使用异步迭代器、附录 A ES2018和ES2019：A.1.2 理解异步迭代器队列、附录 A ES2018和ES2019：A.1.3 处理异步迭代器的reject()、附录 A ES2018和ES2019：A.1.4 使用next()手动异步迭代、附录 A ES2018和ES2019：A.1.5 顶级异步循环、附录 A ES2018和ES2019：A.1.6 实现可观察对象、附录 A ES2018和ES2019：A.2 对象字面量的剩余操作符和扩展操作符、附录 A ES2018和ES2019：A.2.1 剩余操作符、附录 A ES2018和ES2019：A.2.2 扩展操作符、附录 A ES2018和ES2019：A.3 Promise.prototype.finally()、附录 A ES2018和ES2019：A.4 正则表达式相关特性、附录 A ES2018和ES2019：A.4.1 dotAll标志、附录 A ES2018和ES2019：A.4.2 向后查找断言、附录 A ES2018和ES2019：A.4.3 命名捕获组、附录 A ES2018和ES2019：A.4.4 Unicode属性转义、附录 A ES2018和ES2019：A.5 数组打平方法、附录 A ES2018和ES2019：A.5.1 Array.prototype.flatten()、附录 A ES2018和ES2019：A.5.2 Array.prototype.flatMap()、附录 A ES2018和ES2019：A.6 Object.fromEntries()、附录 A ES2018和ES2019：A.7 字符串修理方法、附录 A ES2018和ES2019：A.8 Symbol.prototype.description、附录 A ES2018和ES2019：A.9 可选的catch绑定、附录 A ES2018和ES2019：A.10 其他新增内容、附录 B 严格模式：B.1 选择使用、附录 B 严格模式：B.2 变量、附录 B 严格模式：B.3 对象、附录 B 严格模式：B.4 函数、附录 B 严格模式：B.4.1 函数参数、附录 B 严格模式：B.4.2 eval()、附录 B 严格模式：B.4.3 eval与arguments、附录 B 严格模式：B.5 this强制转型、附录 B 严格模式：B.6 类与模块、附录 B 严格模式：B.7 其他变化、附录 C JavaScript库和框架：C.1 框架、附录 C JavaScript库和框架：C.1.1 React、附录 C JavaScript库和框架：C.1.2 Angular、附录 C JavaScript库和框架：C.1.3 Vue、附录 C JavaScript库和框架：C.1.4 Ember、附录 C JavaScript库和框架：C.1.5 Meteor、附录 C JavaScript库和框架：C.1.6 Backbone.js、附录 C JavaScript库和框架：C.2 通用库、附录 C JavaScript库和框架：C.2.1 jQuery、附录 C JavaScript库和框架：C.2.2 Google Closure Library、附录 C JavaScript库和框架：C.2.3 Underscore.js、附录 C JavaScript库和框架：C.2.4 Lodash、附录 C JavaScript库和框架：C.2.5 Prototype、附录 C JavaScript库和框架：C.2.6 Dojo Toolkit、附录 C JavaScript库和框架：C.2.7 MooTools、附录 C JavaScript库和框架：C.2.8 qooxdoo、附录 C JavaScript库和框架：C.3 动画与特效、附录 C JavaScript库和框架：C.3.1 D3、附录 C JavaScript库和框架：C.3.2 three.js、附录 C JavaScript库和框架：C.3.3 moo.fx、附录 C JavaScript库和框架：C.3.4 Lightbox、附录 D JavaScript工具：D.1 包管理、附录 D JavaScript工具：D.1.1 npm、附录 D JavaScript工具：D.1.2 Bower、附录 D JavaScript工具：D.1.3 JSPM、附录 D JavaScript工具：D.1.4 Yarn、附录 D JavaScript工具：D.2 模块加载器、附录 D JavaScript工具：D.2.1 SystemJS、附录 D JavaScript工具：D.2.2 RequireJS、附录 D JavaScript工具：D.3 模块打包器、附录 D JavaScript工具：D.3.1 Webpack、附录 D JavaScript工具：D.3.2 JSPM、附录 D JavaScript工具：D.3.3 Browserify、附录 D JavaScript工具：D.3.4 Rollup、附录 D JavaScript工具：D.4 编译/转译工具及静态类型系统、附录 D JavaScript工具：D.4.1 Babel、附录 D JavaScript工具：D.4.2 Google Closure Compiler、附录 D JavaScript工具：D.4.3 CoffeeScript、附录 D JavaScript工具：D.4.4 TypeScript、附录 D JavaScript工具：D.4.5 Flow、附录 D JavaScript工具：D.5 高性能脚本工具、附录 D JavaScript工具：D.5.1 WebAssembly、附录 D JavaScript工具：D.5.2 asm.js、附录 D JavaScript工具：D.5.3 Emscripten与LLVM、附录 D JavaScript工具：D.6 编辑器、附录 D JavaScript工具：D.6.1 Sublime Text、附录 D JavaScript工具：D.6.2 Atom、附录 D JavaScript工具：D.6.3 Brackets、附录 D JavaScript工具：D.6.4 Visual Studio Code、附录 D JavaScript工具：D.6.5 WebStorm、附录 D JavaScript工具：D.7 构建工具、自动化系统和任务运行器、附录 D JavaScript工具：D.7.1 Grunt、附录 D JavaScript工具：D.7.2 Gulp、附录 D JavaScript工具：D.7.3 Brunch、附录 D JavaScript工具：D.7.4 npm、附录 D JavaScript工具：D.8 代码检查和格式化、附录 D JavaScript工具：D.8.1 ESLint、附录 D JavaScript工具：D.8.2 Google Closure Compiler、附录 D JavaScript工具：D.8.3 JSLint、附录 D JavaScript工具：D.8.4 JSHint、附录 D JavaScript工具：D.8.5 ClangFormat、附录 D JavaScript工具：D.9 压缩工具、附录 D JavaScript工具：D.9.1 Uglify、附录 D JavaScript工具：D.9.2 Google Closure Compiler、附录 D JavaScript工具：D.9.3 JSMin、附录 D JavaScript工具：D.9.4 Dojo ShrinkSafe、附录 D JavaScript工具：D.10 单元测试、附录 D JavaScript工具：D.10.1 Mocha、附录 D JavaScript工具：D.10.2 Jasmine、附录 D JavaScript工具：D.10.3 qUnit、附录 D JavaScript工具：D.10.4 JsUnit、附录 D JavaScript工具：D.10.5 Dojo Object Harness、附录 D JavaScript工具：D.11 文档生成器、附录 D JavaScript工具：D.11.1 ESDoc、附录 D JavaScript工具：D.11.2 documentation.js、附录 D JavaScript工具：D.11.3 Docco、附录 D JavaScript工具：D.11.4 JsDoc Toolkit、附录 D JavaScript工具：D.11.5 YUI Doc、附录 D JavaScript工具：D.11.6 AjaxDoc",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "目录覆盖"],
  },
  {
    id: "jpg-official-final-review-3",
    chapter: "jpg-official-final-review",
    level: 2,
    question:
      "《JavaScript高级程序设计（第4版）》全书总复习的六阶段证据链是什么？",
    answer:
      "装载模块脚本 → 建立对象与事件 → 调度异步任务 → 验证网络数据 → 事务持久化 → 观测发布与回滚",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "机制链"],
  },
  {
    id: "jpg-official-final-review-4",
    chapter: "jpg-official-final-review",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》全书总复习应主动注入哪两类失败？",
    answer:
      "能背诵API却无法解释一次操作跨任务、DOM、网络和存储的先后与所有权。；只测试开发服务器正常路径，没有跨源、配额、取消、旧缓存和回滚样本。",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "故障注入"],
  },
  {
    id: "jpg-official-final-review-5",
    chapter: "jpg-official-final-review",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》全书总复习签发时保持什么不变量？",
    answer:
      "语言语义、浏览器状态、数据版本与发布产物可贯通；失败在责任边界停止；恢复后无陈旧任务和资源泄漏。",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "工程验收"],
  },
  {
    id: "jpg-official-final-review-6",
    chapter: "jpg-official-final-review",
    level: 3,
    question:
      "《JavaScript高级程序设计（第4版）》全书总复习怎样完成可复现实验？",
    answer:
      "固定浏览器版本、输入、初始DOM与时钟，依次运行正常、边界、失败和恢复样本，保存执行顺序、状态所有者、首偏离点与清理动作。",
    tags: ["《JavaScript高级程序设计（第4版）》全书总复习", "可复现实验"],
  },
];
