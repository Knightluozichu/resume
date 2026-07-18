import type { ReviewQuestion } from "./types";

export const jdgOfficialQuestions: ReviewQuestion[] = [
  {
    "id": "jdg-official-learning-map-1",
    "chapter": "jdg-official-learning-map",
    "level": 1,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图的核心主张是什么？",
    "answer": "第 7 版以 17 章从语言核心推进到浏览器、Node 和工程工具；站内逐章保留出版社详细目录，并用值、控制流、对象、异步和宿主环境五类运行证据贯通全书。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "核心机制"
    ]
  },
  {
    "id": "jdg-official-learning-map-2",
    "chapter": "jdg-official-learning-map",
    "level": 2,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图覆盖哪些出版社目录条目？",
    "answer": "第 1 章 JavaScript 简介、第 2 章 词法结构、第 3 章 类型、值和变量、第 4 章 表达式与操作符、第 5 章 语句、第 6 章 对象、第 7 章 数组、第 8 章 函数、第 9 章 类、第 10 章 模块、第 11 章 JavaScript 标准库、第 12 章 迭代器与生成器、第 13 章 异步 JavaScript、第 14 章 元编程、第 15 章 浏览器中的 JavaScript、第 16 章 Node 服务器端 JavaScript、第 17 章 JavaScript 工具与扩展",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-official-learning-map-3",
    "chapter": "jdg-official-learning-map",
    "level": 2,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图的六阶段证据链是什么？",
    "answer": "锁定中英文第 7 版身份 → 登记 17 章完整目录 → 建立语言核心模型 → 扩展到浏览器和 Node → 接入工具流水线 → 以可运行样本逐章签发",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "机制链"
    ]
  },
  {
    "id": "jdg-official-learning-map-4",
    "chapter": "jdg-official-learning-map",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "故障注入"
    ]
  },
  {
    "id": "jdg-official-learning-map-5",
    "chapter": "jdg-official-learning-map",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图签发时保持什么不变量？",
    "answer": "第 7 版以 17 章从语言核心推进到浏览器、Node 和工程工具；站内逐章保留出版社详细目录，并用值、控制流、对象、异步和宿主环境五类运行证据贯通全书。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "工程验收"
    ]
  },
  {
    "id": "jdg-official-learning-map-6",
    "chapter": "jdg-official-learning-map",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》权威学习地图怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》权威学习地图",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-01-introduction-1",
    "chapter": "jdg-01-introduction",
    "level": 1,
    "question": "第 1 章 JavaScript 简介的核心主张是什么？",
    "answer": "JavaScript 是一门动态、基于原型且函数是一等值的通用语言；本章用控制台、语言导览和字符频率直方图把语法、对象、模块与运行环境连成第一条完整程序链。",
    "tags": [
      "第 1 章 JavaScript 简介",
      "核心机制"
    ]
  },
  {
    "id": "jdg-01-introduction-2",
    "chapter": "jdg-01-introduction",
    "level": 2,
    "question": "第 1 章 JavaScript 简介覆盖哪些出版社目录条目？",
    "answer": "Chapter 1: Introduction to JavaScript、1.1 Exploring JavaScript、1.2 Hello World、1.3 A Tour of JavaScript、1.4 Example: Character Frequency Histograms、1.5 Summary",
    "tags": [
      "第 1 章 JavaScript 简介",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-01-introduction-3",
    "chapter": "jdg-01-introduction",
    "level": 2,
    "question": "第 1 章 JavaScript 简介的六阶段证据链是什么？",
    "answer": "启动 JavaScript 环境 → 求值表达式与语句 → 组合对象、数组和函数 → 引入类与模块 → 构造字符频率直方图 → 核对输入、状态与输出",
    "tags": [
      "第 1 章 JavaScript 简介",
      "机制链"
    ]
  },
  {
    "id": "jdg-01-introduction-4",
    "chapter": "jdg-01-introduction",
    "level": 3,
    "question": "第 1 章 JavaScript 简介为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 1 章 JavaScript 简介",
      "故障注入"
    ]
  },
  {
    "id": "jdg-01-introduction-5",
    "chapter": "jdg-01-introduction",
    "level": 3,
    "question": "第 1 章 JavaScript 简介签发时保持什么不变量？",
    "answer": "JavaScript 是一门动态、基于原型且函数是一等值的通用语言；本章用控制台、语言导览和字符频率直方图把语法、对象、模块与运行环境连成第一条完整程序链。",
    "tags": [
      "第 1 章 JavaScript 简介",
      "工程验收"
    ]
  },
  {
    "id": "jdg-01-introduction-6",
    "chapter": "jdg-01-introduction",
    "level": 3,
    "question": "第 1 章 JavaScript 简介怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 1 章 JavaScript 简介",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-1",
    "chapter": "jdg-02-lexical-structure",
    "level": 1,
    "question": "第 2 章 词法结构的核心主张是什么？",
    "answer": "源码先受字符集、注释、字面量、标识符和分号规则约束，再进入语法与执行；Unicode 规范化和自动分号插入会让视觉相似的文本产生不同程序。",
    "tags": [
      "第 2 章 词法结构",
      "核心机制"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-2",
    "chapter": "jdg-02-lexical-structure",
    "level": 2,
    "question": "第 2 章 词法结构覆盖哪些出版社目录条目？",
    "answer": "Chapter 2: Lexical Structure、2.1 The Text of a JavaScript Program、2.2 Comments、2.3 Literals、2.4 Identifiers and Reserved Words、2.4.1 Reserved Words、2.5 Unicode、2.5.1 Unicode Escape Sequences、2.5.2 Unicode Normalization、2.6 Optional Semicolons、2.7 Summary",
    "tags": [
      "第 2 章 词法结构",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-3",
    "chapter": "jdg-02-lexical-structure",
    "level": 2,
    "question": "第 2 章 词法结构的六阶段证据链是什么？",
    "answer": "读取 Unicode 源文本 → 剔除注释并识别字面量 → 解析标识符与保留字 → 处理转义与规范化 → 判定语句边界 → 输出稳定 token 流",
    "tags": [
      "第 2 章 词法结构",
      "机制链"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-4",
    "chapter": "jdg-02-lexical-structure",
    "level": 3,
    "question": "第 2 章 词法结构为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 2 章 词法结构",
      "故障注入"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-5",
    "chapter": "jdg-02-lexical-structure",
    "level": 3,
    "question": "第 2 章 词法结构签发时保持什么不变量？",
    "answer": "源码先受字符集、注释、字面量、标识符和分号规则约束，再进入语法与执行；Unicode 规范化和自动分号插入会让视觉相似的文本产生不同程序。",
    "tags": [
      "第 2 章 词法结构",
      "工程验收"
    ]
  },
  {
    "id": "jdg-02-lexical-structure-6",
    "chapter": "jdg-02-lexical-structure",
    "level": 3,
    "question": "第 2 章 词法结构怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 2 章 词法结构",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-1",
    "chapter": "jdg-03-types-values-variables",
    "level": 1,
    "question": "第 3 章 类型、值和变量的核心主张是什么？",
    "answer": "JavaScript 的值分为不可变原始值与可变对象引用；数值、文本、布尔、null、undefined、Symbol、BigInt 以及显式和隐式转换共同决定表达式的真实语义。",
    "tags": [
      "第 3 章 类型、值和变量",
      "核心机制"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-2",
    "chapter": "jdg-03-types-values-variables",
    "level": 2,
    "question": "第 3 章 类型、值和变量覆盖哪些出版社目录条目？",
    "answer": "Chapter 3: Types, Values, and Variables、3.1 Overview and Definitions、3.2 Numbers、3.2.1 Integer Literals、3.2.2 Floating-Point Literals、3.2.3 Arithmetic in JavaScript、3.2.4 Binary Floating-Point and Rounding Errors、3.2.5 Arbitrary Precision Integers with BigInt、3.2.6 Dates and Times、3.3 Text、3.3.1 String Literals、3.3.2 Escape Sequences in String Literals、3.3.3 Working with Strings、3.3.4 Template Literals、3.3.5 Pattern Matching、3.4 Boolean Values、3.5 null and undefined、3.6 Symbols、3.7 The Global Object、3.8 Immutable Primitive Values and Mutable Object References、3.9 Type Conversions、3.9.1 Conversions and Equality、3.9.2 Explicit Conversions、3.9.3 Object to Primitive Conversions、3.10 Variable Declaration and Assignment、3.10.1 Declarations with let and const、3.10.2 Variable Declarations with var、3.10.3 Destructuring Assignment、3.11 Summary",
    "tags": [
      "第 3 章 类型、值和变量",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-3",
    "chapter": "jdg-03-types-values-variables",
    "level": 2,
    "question": "第 3 章 类型、值和变量的六阶段证据链是什么？",
    "answer": "识别值的类型 → 区分原始值与对象引用 → 执行数值或文本运算 → 应用类型转换 → 绑定 let、const 或 var → 检查相等性与可变性",
    "tags": [
      "第 3 章 类型、值和变量",
      "机制链"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-4",
    "chapter": "jdg-03-types-values-variables",
    "level": 3,
    "question": "第 3 章 类型、值和变量为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 3 章 类型、值和变量",
      "故障注入"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-5",
    "chapter": "jdg-03-types-values-variables",
    "level": 3,
    "question": "第 3 章 类型、值和变量签发时保持什么不变量？",
    "answer": "JavaScript 的值分为不可变原始值与可变对象引用；数值、文本、布尔、null、undefined、Symbol、BigInt 以及显式和隐式转换共同决定表达式的真实语义。",
    "tags": [
      "第 3 章 类型、值和变量",
      "工程验收"
    ]
  },
  {
    "id": "jdg-03-types-values-variables-6",
    "chapter": "jdg-03-types-values-variables",
    "level": 3,
    "question": "第 3 章 类型、值和变量怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 3 章 类型、值和变量",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-1",
    "chapter": "jdg-04-expressions-operators",
    "level": 1,
    "question": "第 4 章 表达式与操作符的核心主张是什么？",
    "answer": "表达式由操作数、访问、调用和操作符组合成值；优先级、结合性、短路、求值顺序与副作用决定同一组符号究竟执行什么。",
    "tags": [
      "第 4 章 表达式与操作符",
      "核心机制"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-2",
    "chapter": "jdg-04-expressions-operators",
    "level": 2,
    "question": "第 4 章 表达式与操作符覆盖哪些出版社目录条目？",
    "answer": "Chapter 4: Expressions and Operators、4.1 Primary Expressions、4.2 Object and Array Initializers、4.3 Function Definition Expressions、4.4 Property Access Expressions、4.4.1 Conditional Property Access、4.5 Invocation Expressions、4.5.1 Conditional Invocation、4.6 Object Creation Expressions、4.7 Operator Overview、4.7.1 Number of Operands、4.7.2 Operand and Result Type、4.7.3 Operator Side Effects、4.7.4 Operator Precedence、4.7.5 Operator Associativity、4.7.6 Order of Evaluation、4.8 Arithmetic Expressions、4.8.1 The + Operator、4.8.2 Unary Arithmetic Operators、4.8.3 Bitwise Operators、4.9 Relational Expressions、4.9.1 Equality and Inequality Operators、4.9.2 Comparison Operators、4.9.3 The in Operator、4.9.4 The instanceof Operator、4.10 Logical Expressions、4.10.1 Logical AND (&&)、4.10.2 Logical OR (||)、4.10.3 Logical NOT (!)、4.11 Assignment Expressions、4.11.1 Assignment with Operation、4.12 Evaluation Expressions、4.12.1 eval()、4.12.2 Global eval()、4.12.3 Strict eval()、4.13 Miscellaneous Operators、4.13.1 The Conditional Operator (?:)、4.13.2 First-Defined (??)、4.13.3 The typeof Operator、4.13.4 The delete Operator、4.13.5 The await Operator、4.13.6 The void Operator、4.13.7 The comma Operator (,)、4.14 Summary",
    "tags": [
      "第 4 章 表达式与操作符",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-3",
    "chapter": "jdg-04-expressions-operators",
    "level": 2,
    "question": "第 4 章 表达式与操作符的六阶段证据链是什么？",
    "answer": "解析主表达式 → 解析访问、调用与创建 → 按优先级建求值树 → 执行算术、关系与逻辑运算 → 传播短路与副作用 → 产生最终值或异常",
    "tags": [
      "第 4 章 表达式与操作符",
      "机制链"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-4",
    "chapter": "jdg-04-expressions-operators",
    "level": 3,
    "question": "第 4 章 表达式与操作符为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 4 章 表达式与操作符",
      "故障注入"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-5",
    "chapter": "jdg-04-expressions-operators",
    "level": 3,
    "question": "第 4 章 表达式与操作符签发时保持什么不变量？",
    "answer": "表达式由操作数、访问、调用和操作符组合成值；优先级、结合性、短路、求值顺序与副作用决定同一组符号究竟执行什么。",
    "tags": [
      "第 4 章 表达式与操作符",
      "工程验收"
    ]
  },
  {
    "id": "jdg-04-expressions-operators-6",
    "chapter": "jdg-04-expressions-operators",
    "level": 3,
    "question": "第 4 章 表达式与操作符怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 4 章 表达式与操作符",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-05-statements-1",
    "chapter": "jdg-05-statements",
    "level": 1,
    "question": "第 5 章 语句的核心主张是什么？",
    "answer": "语句把表达式组织成条件、循环、跳转、异常和声明；控制流的正确性取决于每条路径的进入条件、退出点和资源清理。",
    "tags": [
      "第 5 章 语句",
      "核心机制"
    ]
  },
  {
    "id": "jdg-05-statements-2",
    "chapter": "jdg-05-statements",
    "level": 2,
    "question": "第 5 章 语句覆盖哪些出版社目录条目？",
    "answer": "Chapter 5: Statements、5.1 Expression Statements、5.2 Compound and Empty Statements、5.3 Conditionals、5.3.1 if、5.3.2 else if、5.3.3 switch、5.4 Loops、5.4.1 while、5.4.2 do/while、5.4.3 for、5.4.4 for/of、5.4.5 for/in、5.5 Jumps、5.5.1 Labeled Statements、5.5.2 break、5.5.3 continue、5.5.4 return、5.5.5 yield、5.5.6 throw、5.5.7 try/catch/finally、5.6 Miscellaneous Statements、5.6.1 with、5.6.2 debugger、5.6.3 “use strict”、5.7 Declarations、5.7.1 const, let, and var、5.7.2 function、5.7.3 class、5.7.4 import and export、5.8 Summary of JavaScript Statements",
    "tags": [
      "第 5 章 语句",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-05-statements-3",
    "chapter": "jdg-05-statements",
    "level": 2,
    "question": "第 5 章 语句的六阶段证据链是什么？",
    "answer": "进入语句块 → 选择条件分支 → 执行循环迭代 → 处理跳转或 yield → 捕获并清理异常 → 提交声明与结果",
    "tags": [
      "第 5 章 语句",
      "机制链"
    ]
  },
  {
    "id": "jdg-05-statements-4",
    "chapter": "jdg-05-statements",
    "level": 3,
    "question": "第 5 章 语句为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 5 章 语句",
      "故障注入"
    ]
  },
  {
    "id": "jdg-05-statements-5",
    "chapter": "jdg-05-statements",
    "level": 3,
    "question": "第 5 章 语句签发时保持什么不变量？",
    "answer": "语句把表达式组织成条件、循环、跳转、异常和声明；控制流的正确性取决于每条路径的进入条件、退出点和资源清理。",
    "tags": [
      "第 5 章 语句",
      "工程验收"
    ]
  },
  {
    "id": "jdg-05-statements-6",
    "chapter": "jdg-05-statements",
    "level": 3,
    "question": "第 5 章 语句怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 5 章 语句",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-06-objects-1",
    "chapter": "jdg-06-objects",
    "level": 1,
    "question": "第 6 章 对象的核心主张是什么？",
    "answer": "对象是属性描述符与原型链接组成的动态记录；创建、查询、继承、枚举、序列化和扩展语法都必须服从属性所有权与原型查找规则。",
    "tags": [
      "第 6 章 对象",
      "核心机制"
    ]
  },
  {
    "id": "jdg-06-objects-2",
    "chapter": "jdg-06-objects",
    "level": 2,
    "question": "第 6 章 对象覆盖哪些出版社目录条目？",
    "answer": "Chapter 6: Objects、6.1 Introduction to Objects、6.2 Creating Objects、6.2.1 Object Literals、6.2.2 Creating Objects with new、6.2.3 Prototypes、6.2.4 Object.create()、6.3 Querying and Setting Properties、6.3.1 Objects As Associative Arrays、6.3.2 Inheritance、6.3.3 Property Access Errors、6.4 Deleting Properties、6.5 Testing Properties、6.6 Enumerating Properties、6.6.1 Property Enumeration Order、6.7 Extending Objects、6.8 Serializing Objects、6.9 Object Methods、6.9.1 The toString() Method、6.9.2 The toLocaleString() Method、6.9.3 The valueOf() Method、6.9.4 The toJSON() Method、6.10 Extended Object Literal Syntax、6.10.1 Shorthand Properties、6.10.2 Computed Property Names、6.10.3 Symbols as Property Names、6.10.4 Spread Operator、6.10.5 Shorthand Methods、6.10.6 Property Getters and Setters、6.11 Summary",
    "tags": [
      "第 6 章 对象",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-06-objects-3",
    "chapter": "jdg-06-objects",
    "level": 2,
    "question": "第 6 章 对象的六阶段证据链是什么？",
    "answer": "创建对象与原型 → 读取或写入属性 → 沿原型链查找 → 检查所有权与可枚举性 → 扩展或序列化对象 → 验证描述符不变量",
    "tags": [
      "第 6 章 对象",
      "机制链"
    ]
  },
  {
    "id": "jdg-06-objects-4",
    "chapter": "jdg-06-objects",
    "level": 3,
    "question": "第 6 章 对象为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 6 章 对象",
      "故障注入"
    ]
  },
  {
    "id": "jdg-06-objects-5",
    "chapter": "jdg-06-objects",
    "level": 3,
    "question": "第 6 章 对象签发时保持什么不变量？",
    "answer": "对象是属性描述符与原型链接组成的动态记录；创建、查询、继承、枚举、序列化和扩展语法都必须服从属性所有权与原型查找规则。",
    "tags": [
      "第 6 章 对象",
      "工程验收"
    ]
  },
  {
    "id": "jdg-06-objects-6",
    "chapter": "jdg-06-objects",
    "level": 3,
    "question": "第 6 章 对象怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 6 章 对象",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-07-arrays-1",
    "chapter": "jdg-07-arrays",
    "level": 1,
    "question": "第 7 章 数组的核心主张是什么？",
    "answer": "数组是带长度语义的有序对象；稀疏性、迭代方式、原地修改与返回新数组的差异，决定数据管道是否稳定。",
    "tags": [
      "第 7 章 数组",
      "核心机制"
    ]
  },
  {
    "id": "jdg-07-arrays-2",
    "chapter": "jdg-07-arrays",
    "level": 2,
    "question": "第 7 章 数组覆盖哪些出版社目录条目？",
    "answer": "Chapter 7: Arrays、7.1 Creating Arrays、7.1.1 Array Literals、7.1.2 The Spread Operator、7.1.3 The Array() Constructor、7.1.4 Array.of()、7.1.5 Array.from()、7.2 Reading and Writing Array Elements、7.3 Sparse Arrays、7.4 Array Length、7.5 Adding and Deleting Array Elements、7.6 Iterating Arrays、7.7 Multidimensional Arrays、7.8 Array Methods、7.8.1 Array Iterator Methods、7.8.2 Flattening arrays with flat() and flatMap()、7.8.3 Adding arrays with concat()、7.8.4 Stacks and Queues with push(), pop(), shift(), and unshift()、7.8.5 Subarrays with slice(), splice(), fill(), and copyWithin()、7.8.6 Array Searching and Sorting Methods、7.8.7 Array to String Conversions、7.8.8 Static Array Functions、7.9 Array-Like Objects、7.10 Strings as Arrays、7.11 Summary",
    "tags": [
      "第 7 章 数组",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-07-arrays-3",
    "chapter": "jdg-07-arrays",
    "level": 2,
    "question": "第 7 章 数组的六阶段证据链是什么？",
    "answer": "创建稠密或稀疏数组 → 按索引读写元素 → 维护 length 与空槽 → 选择迭代策略 → 执行变换、搜索或排序 → 检查原数组是否被修改",
    "tags": [
      "第 7 章 数组",
      "机制链"
    ]
  },
  {
    "id": "jdg-07-arrays-4",
    "chapter": "jdg-07-arrays",
    "level": 3,
    "question": "第 7 章 数组为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 7 章 数组",
      "故障注入"
    ]
  },
  {
    "id": "jdg-07-arrays-5",
    "chapter": "jdg-07-arrays",
    "level": 3,
    "question": "第 7 章 数组签发时保持什么不变量？",
    "answer": "数组是带长度语义的有序对象；稀疏性、迭代方式、原地修改与返回新数组的差异，决定数据管道是否稳定。",
    "tags": [
      "第 7 章 数组",
      "工程验收"
    ]
  },
  {
    "id": "jdg-07-arrays-6",
    "chapter": "jdg-07-arrays",
    "level": 3,
    "question": "第 7 章 数组怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 7 章 数组",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-08-functions-1",
    "chapter": "jdg-08-functions",
    "level": 1,
    "question": "第 8 章 函数的核心主张是什么？",
    "answer": "函数既是可调用代码也是可传递值；定义形式、调用方式、参数绑定、闭包和高阶组合共同决定 this、作用域与复用能力。",
    "tags": [
      "第 8 章 函数",
      "核心机制"
    ]
  },
  {
    "id": "jdg-08-functions-2",
    "chapter": "jdg-08-functions",
    "level": 2,
    "question": "第 8 章 函数覆盖哪些出版社目录条目？",
    "answer": "Chapter 8: Functions、8.1 Defining Functions、8.1.1 Function Declarations、8.1.2 Function Expressions、8.1.3 Arrow Functions、8.1.4 Nested Functions、8.2 Invoking Functions、8.2.1 Function Invocation、8.2.2 Method Invocation、8.2.3 Constructor Invocation、8.2.4 Indirect Invocation、8.2.5 Implicit Function Invocation、8.3 Function Arguments and Parameters、8.3.1 Optional Parameters and Defaults、8.3.2 Rest Parameters and Variable-Length Argument Lists、8.3.3 The Arguments Object、8.3.4 The Spread Operator for Function Calls、8.3.5 Destructuring Function Arguments into Parameters、8.3.6 Argument Types、8.4 Functions as Values、8.4.1 Defining Your Own Function Properties、8.5 Functions as Namespaces、8.6 Closures、8.7 Function Properties, Methods, and Constructor、8.7.1 The length Property、8.7.2 The name Property、8.7.3 The prototype Property、8.7.4 The call() and apply() Methods、8.7.5 The bind() Method、8.7.6 The toString() Method、8.7.7 The Function() Constructor、8.8 Functional Programming、8.8.1 Processing Arrays with Functions、8.8.2 Higher-Order Functions、8.8.3 Partial Application of Functions、8.8.4 Memoization、8.9 Summary",
    "tags": [
      "第 8 章 函数",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-08-functions-3",
    "chapter": "jdg-08-functions",
    "level": 2,
    "question": "第 8 章 函数的六阶段证据链是什么？",
    "answer": "定义函数与词法环境 → 选择调用形式 → 绑定 this 与参数 → 执行函数体 → 保留闭包状态 → 返回值或继续高阶组合",
    "tags": [
      "第 8 章 函数",
      "机制链"
    ]
  },
  {
    "id": "jdg-08-functions-4",
    "chapter": "jdg-08-functions",
    "level": 3,
    "question": "第 8 章 函数为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 8 章 函数",
      "故障注入"
    ]
  },
  {
    "id": "jdg-08-functions-5",
    "chapter": "jdg-08-functions",
    "level": 3,
    "question": "第 8 章 函数签发时保持什么不变量？",
    "answer": "函数既是可调用代码也是可传递值；定义形式、调用方式、参数绑定、闭包和高阶组合共同决定 this、作用域与复用能力。",
    "tags": [
      "第 8 章 函数",
      "工程验收"
    ]
  },
  {
    "id": "jdg-08-functions-6",
    "chapter": "jdg-08-functions",
    "level": 3,
    "question": "第 8 章 函数怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 8 章 函数",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-09-classes-1",
    "chapter": "jdg-09-classes",
    "level": 1,
    "question": "第 9 章 类的核心主张是什么？",
    "answer": "JavaScript 类建立在构造函数和原型委托之上；class、私有字段、extends 与 super 提供语法和约束，但继承层次仍需与组合、委托权衡。",
    "tags": [
      "第 9 章 类",
      "核心机制"
    ]
  },
  {
    "id": "jdg-09-classes-2",
    "chapter": "jdg-09-classes",
    "level": 2,
    "question": "第 9 章 类覆盖哪些出版社目录条目？",
    "answer": "Chapter 9: Classes、9.1 Classes and Prototypes、9.2 Classes and Constructors、9.2.1 Constructors, Class Identity, and instanceof、9.2.2 The constructor Property、9.3 Classes with the class Keyword、9.3.1 Static Methods、9.3.2 Getters, Setters, and other Method Forms、9.3.3 Public, Private, and Static Fields、9.3.4 Example: A Complex Number Class、9.4 Adding Methods to Existing Classes、9.5 Subclasses、9.5.1 Subclasses and Prototypes、9.5.2 Subclasses with extends and super、9.5.3 Delegation Instead of Inheritance、9.5.4 Class Hierarchies and Abstract Classes、9.6 Summary",
    "tags": [
      "第 9 章 类",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-09-classes-3",
    "chapter": "jdg-09-classes",
    "level": 2,
    "question": "第 9 章 类的六阶段证据链是什么？",
    "answer": "声明类或构造函数 → 创建实例 → 在原型上查找方法 → 初始化公有与私有字段 → 扩展或委托行为 → 验证身份与不变量",
    "tags": [
      "第 9 章 类",
      "机制链"
    ]
  },
  {
    "id": "jdg-09-classes-4",
    "chapter": "jdg-09-classes",
    "level": 3,
    "question": "第 9 章 类为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 9 章 类",
      "故障注入"
    ]
  },
  {
    "id": "jdg-09-classes-5",
    "chapter": "jdg-09-classes",
    "level": 3,
    "question": "第 9 章 类签发时保持什么不变量？",
    "answer": "JavaScript 类建立在构造函数和原型委托之上；class、私有字段、extends 与 super 提供语法和约束，但继承层次仍需与组合、委托权衡。",
    "tags": [
      "第 9 章 类",
      "工程验收"
    ]
  },
  {
    "id": "jdg-09-classes-6",
    "chapter": "jdg-09-classes",
    "level": 3,
    "question": "第 9 章 类怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 9 章 类",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-10-modules-1",
    "chapter": "jdg-10-modules",
    "level": 1,
    "question": "第 10 章 模块的核心主张是什么？",
    "answer": "模块把实现边界、依赖关系和公开接口显式化；闭包模块、CommonJS 与 ES 模块的加载时机、绑定语义和浏览器集成并不相同。",
    "tags": [
      "第 10 章 模块",
      "核心机制"
    ]
  },
  {
    "id": "jdg-10-modules-2",
    "chapter": "jdg-10-modules",
    "level": 2,
    "question": "第 10 章 模块覆盖哪些出版社目录条目？",
    "answer": "Chapter 10: Modules、10.1 Modules with Classes, Objects, and Closures、10.1.1 Automating Closure-Based Modularity、10.2 Modules in Node、10.2.1 Node Exports、10.2.2 Node Imports、10.2.3 Node-Style Modules on the Web、10.3 Modules in ES6、10.3.1 ES6 Exports、10.3.2 ES6 Imports、10.3.3 Imports and Exports with Renaming、10.3.4 Re-Exports、10.3.5 JavaScript Modules on the Web、10.3.6 Dynamic Imports with import()、10.3.7 import.meta.url、10.4 Summary",
    "tags": [
      "第 10 章 模块",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-10-modules-3",
    "chapter": "jdg-10-modules",
    "level": 2,
    "question": "第 10 章 模块的六阶段证据链是什么？",
    "answer": "划定实现边界 → 声明导出接口 → 解析依赖图 → 实例化模块记录 → 执行并建立活绑定 → 按需动态加载或重导出",
    "tags": [
      "第 10 章 模块",
      "机制链"
    ]
  },
  {
    "id": "jdg-10-modules-4",
    "chapter": "jdg-10-modules",
    "level": 3,
    "question": "第 10 章 模块为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 10 章 模块",
      "故障注入"
    ]
  },
  {
    "id": "jdg-10-modules-5",
    "chapter": "jdg-10-modules",
    "level": 3,
    "question": "第 10 章 模块签发时保持什么不变量？",
    "answer": "模块把实现边界、依赖关系和公开接口显式化；闭包模块、CommonJS 与 ES 模块的加载时机、绑定语义和浏览器集成并不相同。",
    "tags": [
      "第 10 章 模块",
      "工程验收"
    ]
  },
  {
    "id": "jdg-10-modules-6",
    "chapter": "jdg-10-modules",
    "level": 3,
    "question": "第 10 章 模块怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 10 章 模块",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-11-standard-library-1",
    "chapter": "jdg-11-standard-library",
    "level": 1,
    "question": "第 11 章 JavaScript 标准库的核心主张是什么？",
    "answer": "标准库为集合、二进制数据、正则、日期、错误、JSON、国际化、控制台、URL 和定时器提供可组合能力；选型要同时检查数据模型、编码和环境边界。",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "核心机制"
    ]
  },
  {
    "id": "jdg-11-standard-library-2",
    "chapter": "jdg-11-standard-library",
    "level": 2,
    "question": "第 11 章 JavaScript 标准库覆盖哪些出版社目录条目？",
    "answer": "Chapter 11: The JavaScript Standard Library、11.1 Sets and Maps、11.1.1 The Set Class、11.1.2 The Map Class、11.1.3 WeakMap and WeakSet、11.2 Typed Arrays and Binary Data、11.2.1 Typed Array Types、11.2.2 Creating Typed Arrays、11.2.3 Using Typed Arrays、11.2.4 Typed Array Methods and Properties、11.2.5 DataView and Endianness、11.3 Pattern Matching with Regular Expressions、11.3.1 Defining Regular Expressions、11.3.2 String Methods for Pattern Matching、11.3.3 The RegExp Class、11.4 Dates and Times、11.4.1 Timestamps、11.4.2 Date Arithmetic、11.4.3 Formatting and Parsing Date Strings、11.5 Error Classes、11.6 JSON Serialization and Parsing、11.6.1 JSON Customizations、11.7 The Internationalization API、11.7.1 Formatting Numbers、11.7.2 Formatting Dates and Times、11.7.3 Comparing Strings、11.8 The Console API、11.8.1 Formatted Output with Console、11.9 URL APIs、11.9.1 Legacy URL Functions、11.10 Timers、11.11 Summary",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-11-standard-library-3",
    "chapter": "jdg-11-standard-library",
    "level": 2,
    "question": "第 11 章 JavaScript 标准库的六阶段证据链是什么？",
    "answer": "选择标准库类型 → 构造规范化输入 → 执行查询或变换 → 处理编码、时区与区域设置 → 捕获错误与边界 → 序列化并交付结果",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "机制链"
    ]
  },
  {
    "id": "jdg-11-standard-library-4",
    "chapter": "jdg-11-standard-library",
    "level": 3,
    "question": "第 11 章 JavaScript 标准库为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "故障注入"
    ]
  },
  {
    "id": "jdg-11-standard-library-5",
    "chapter": "jdg-11-standard-library",
    "level": 3,
    "question": "第 11 章 JavaScript 标准库签发时保持什么不变量？",
    "answer": "标准库为集合、二进制数据、正则、日期、错误、JSON、国际化、控制台、URL 和定时器提供可组合能力；选型要同时检查数据模型、编码和环境边界。",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "工程验收"
    ]
  },
  {
    "id": "jdg-11-standard-library-6",
    "chapter": "jdg-11-standard-library",
    "level": 3,
    "question": "第 11 章 JavaScript 标准库怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 11 章 JavaScript 标准库",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-1",
    "chapter": "jdg-12-iterators-generators",
    "level": 1,
    "question": "第 12 章 迭代器与生成器的核心主张是什么？",
    "answer": "可迭代协议把数据源与消费方式解耦，生成器把暂停点编码进函数；next、return、throw 和 yield 双向传值共同定义生命周期。",
    "tags": [
      "第 12 章 迭代器与生成器",
      "核心机制"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-2",
    "chapter": "jdg-12-iterators-generators",
    "level": 2,
    "question": "第 12 章 迭代器与生成器覆盖哪些出版社目录条目？",
    "answer": "Chapter 12: Iterators and Generators、12.1 How Iterators Work、12.2 Implementing Iterable Objects、12.2.1 “Closing” an Iterator: The Return Method、12.3 Generators、12.3.1 Generator Examples、12.3.2 yield* and Recursive Generators、12.4 Advanced Generator Features、12.4.1 The Return Value of a Generator Function、12.4.2 The Value of a yield Expression、12.4.3 The return() and throw() Methods of a Generator、12.4.4 A Final Note About Generators、12.5 Summary",
    "tags": [
      "第 12 章 迭代器与生成器",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-3",
    "chapter": "jdg-12-iterators-generators",
    "level": 2,
    "question": "第 12 章 迭代器与生成器的六阶段证据链是什么？",
    "answer": "取得迭代器 → 请求下一项 → 执行到 yield 暂停 → 向生成器传回值或异常 → 关闭迭代器 → 以 done 和 value 收敛",
    "tags": [
      "第 12 章 迭代器与生成器",
      "机制链"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-4",
    "chapter": "jdg-12-iterators-generators",
    "level": 3,
    "question": "第 12 章 迭代器与生成器为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 12 章 迭代器与生成器",
      "故障注入"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-5",
    "chapter": "jdg-12-iterators-generators",
    "level": 3,
    "question": "第 12 章 迭代器与生成器签发时保持什么不变量？",
    "answer": "可迭代协议把数据源与消费方式解耦，生成器把暂停点编码进函数；next、return、throw 和 yield 双向传值共同定义生命周期。",
    "tags": [
      "第 12 章 迭代器与生成器",
      "工程验收"
    ]
  },
  {
    "id": "jdg-12-iterators-generators-6",
    "chapter": "jdg-12-iterators-generators",
    "level": 3,
    "question": "第 12 章 迭代器与生成器怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 12 章 迭代器与生成器",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-1",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 1,
    "question": "第 13 章 异步 JavaScript的核心主张是什么？",
    "answer": "回调、Promise、async/await 与异步迭代是同一时间模型的不同抽象；正确性取决于结算、异常传播、并发组合与取消后的资源状态。",
    "tags": [
      "第 13 章 异步 JavaScript",
      "核心机制"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-2",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 2,
    "question": "第 13 章 异步 JavaScript覆盖哪些出版社目录条目？",
    "answer": "Chapter 13: Asynchronous JavaScript、13.1 Asynchronous Programming with Callbacks、13.1.1 Timers、13.1.2 Events、13.1.3 Network Events、13.1.4 Callbacks and Events in Node、13.2 Promises、13.2.1 Using Promises、13.2.2 Chaining Promises、13.2.3 Resolving Promises、13.2.4 More on Promises and Errors、13.2.5 Promises in Parallel、13.2.6 Making Promises、13.2.7 Promises in Sequence、13.3 async and await、13.3.1 await Expressions、13.3.2 async Functions、13.3.3 Awaiting Multiple Promises、13.3.4 Implementation Details、13.4 Asynchronous Iteration、13.4.1 The for/await Loop、13.4.2 Asynchronous Iterators、13.4.3 Asynchronous Generators、13.4.4 Implementing Asynchronous Iterators、13.5 Summary",
    "tags": [
      "第 13 章 异步 JavaScript",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-3",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 2,
    "question": "第 13 章 异步 JavaScript的六阶段证据链是什么？",
    "answer": "启动异步操作 → 登记延续逻辑 → 兑现或拒绝 Promise → 在微任务中恢复 await → 组合并发或异步迭代 → 传播结果并清理资源",
    "tags": [
      "第 13 章 异步 JavaScript",
      "机制链"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-4",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 3,
    "question": "第 13 章 异步 JavaScript为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 13 章 异步 JavaScript",
      "故障注入"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-5",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 3,
    "question": "第 13 章 异步 JavaScript签发时保持什么不变量？",
    "answer": "回调、Promise、async/await 与异步迭代是同一时间模型的不同抽象；正确性取决于结算、异常传播、并发组合与取消后的资源状态。",
    "tags": [
      "第 13 章 异步 JavaScript",
      "工程验收"
    ]
  },
  {
    "id": "jdg-13-asynchronous-javascript-6",
    "chapter": "jdg-13-asynchronous-javascript",
    "level": 3,
    "question": "第 13 章 异步 JavaScript怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 13 章 异步 JavaScript",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-1",
    "chapter": "jdg-14-metaprogramming",
    "level": 1,
    "question": "第 14 章 元编程的核心主张是什么？",
    "answer": "元编程通过属性特性、知名 Symbol、模板标签、Reflect 与 Proxy 观察或改写语言操作；任何拦截都必须保持对象模型不变量。",
    "tags": [
      "第 14 章 元编程",
      "核心机制"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-2",
    "chapter": "jdg-14-metaprogramming",
    "level": 2,
    "question": "第 14 章 元编程覆盖哪些出版社目录条目？",
    "answer": "Chapter 14: Metaprogramming、14.1 Property Attributes、14.2 Object Extensibility、14.3 The prototype Attribute、14.4 Well-Known Symbols、14.4.1 Symbol.iterator and Symbol.asyncIterator、14.4.2 Symbol.hasInstance、14.4.3 Symbol.toStringTag、14.4.4 Symbol.species、14.4.5 Symbol.isConcatSpreadable、14.4.6 Pattern-Matching Symbols、14.4.7 Symbol.toPrimitive、14.4.8 Symbol.unscopables、14.5 Template Tags、14.6 The Reflect API、14.7 Proxy Objects、14.7.1 Proxy Invariants、14.8 Summary",
    "tags": [
      "第 14 章 元编程",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-3",
    "chapter": "jdg-14-metaprogramming",
    "level": 2,
    "question": "第 14 章 元编程的六阶段证据链是什么？",
    "answer": "读取属性与对象特性 → 选择 Symbol 协议 → 截获语言级操作 → 用 Reflect 转发默认语义 → 施加校验或记录 → 核对 Proxy 不变量",
    "tags": [
      "第 14 章 元编程",
      "机制链"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-4",
    "chapter": "jdg-14-metaprogramming",
    "level": 3,
    "question": "第 14 章 元编程为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 14 章 元编程",
      "故障注入"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-5",
    "chapter": "jdg-14-metaprogramming",
    "level": 3,
    "question": "第 14 章 元编程签发时保持什么不变量？",
    "answer": "元编程通过属性特性、知名 Symbol、模板标签、Reflect 与 Proxy 观察或改写语言操作；任何拦截都必须保持对象模型不变量。",
    "tags": [
      "第 14 章 元编程",
      "工程验收"
    ]
  },
  {
    "id": "jdg-14-metaprogramming-6",
    "chapter": "jdg-14-metaprogramming",
    "level": 3,
    "question": "第 14 章 元编程怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 14 章 元编程",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-15-web-browsers-1",
    "chapter": "jdg-15-web-browsers",
    "level": 1,
    "question": "第 15 章 浏览器中的 JavaScript的核心主张是什么？",
    "answer": "浏览器把 JavaScript 接到文档、事件、样式、图形、音频、导航、网络、存储和线程；页面正确性必须同时考虑事件传播、安全边界、渲染成本和跨线程消息。",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "核心机制"
    ]
  },
  {
    "id": "jdg-15-web-browsers-2",
    "chapter": "jdg-15-web-browsers",
    "level": 2,
    "question": "第 15 章 浏览器中的 JavaScript覆盖哪些出版社目录条目？",
    "answer": "Chapter 15: JavaScript in Web Browsers、15.1 Web Programming Basics、15.1.1 JavaScript in HTML <script> Tags、15.1.2 The Document Object Model、15.1.3 The Global Object in Web Browsers、15.1.4 Scripts Share a Namespace、15.1.5 Execution of JavaScript Programs、15.1.6 Program Input and Output、15.1.7 Program Errors、15.1.8 The Web Security Model、15.2 Events、15.2.1 Event Categories、15.2.2 Registering Event Handlers、15.2.3 Event Handler Invocation、15.2.4 Event Propagation、15.2.5 Event Cancellation、15.2.6 Dispatching Custom Events、15.3 Scripting Documents、15.3.1 Selecting Document Elements、15.3.2 Document Structure and Traversal、15.3.3 Attributes、15.3.4 Element Content、15.3.5 Creating, Inserting, and Deleting Nodes、15.3.6 Example: Generating a Table of Contents、15.4 Scripting CSS、15.4.1 CSS Classes、15.4.2 Inline Styles、15.4.3 Computed Styles、15.4.4 Scripting Stylesheets、15.4.5 CSS Animations and Events、15.5 Document Geometry and Scrolling、15.5.1 Document Coordinates and Viewport Coordinates、15.5.2 Querying the Geometry of an Element、15.5.3 Determining the Element at a Point、15.5.4 Scrolling、15.5.5 Viewport Size, Content Size, and Scroll Position、15.6 Web Components、15.6.1 Using Web Components、15.6.2 HTML Templates、15.6.3 Custom Elements、15.6.4 Shadow DOM、15.6.5 Example: a <search-box> Web Component、15.7 SVG: Scalable Vector Graphics、15.7.1 SVG in HTML、15.7.2 Scripting SVG、15.7.3 Creating SVG Images with JavaScript、15.8 Graphics in a <canvas>、15.8.1 Paths and Polygons、15.8.2 Canvas Dimensions and Coordinates、15.8.3 Graphics Attributes、15.8.4 Canvas Drawing Operations、15.8.5 Coordinate System Transforms、15.8.6 Clipping、15.8.7 Pixel Manipulation、15.9 Audio APIs、15.9.1 The Audio() Constructor、15.9.2 The WebAudio API、15.10 Location, Navigation, and History、15.10.1 Loading New Documents、15.10.2 Browsing History、15.10.3 History Management with hashchange Events、15.10.4 History Management with pushState()、15.11 Networking、15.11.1 fetch()、15.11.2 Server-Sent Events、15.11.3 WebSockets、15.12 Storage、15.12.1 localStorage and sessionStorage、15.12.2 Cookies、15.12.3 IndexedDB、15.13 Worker Threads and Messaging、15.13.1 Worker Objects、15.13.2 The Global Object in Workers、15.13.3 Importing Code into a Worker、15.13.4 Worker Execution Model、15.13.5 postMessage(), MessagePorts, and MessageChannels、15.13.6 Cross-Origin Messaging with postMessage()、15.14 Example: The Mandelbrot Set、15.15 Summary and Suggestions for Further Reading、15.15.1 HTML and CSS、15.15.2 Performance、15.15.3 Security、15.15.4 WebAssembly、15.15.5 More Document and Window Features、15.15.6 Events、15.15.7 Progressive Web Apps and Service Workers、15.15.8 Mobile Device APIs、15.15.9 Binary APIs、15.15.10 Media APIs",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-15-web-browsers-3",
    "chapter": "jdg-15-web-browsers",
    "level": 2,
    "question": "第 15 章 浏览器中的 JavaScript的六阶段证据链是什么？",
    "answer": "加载脚本并建立全局环境 → 读取输入与分派事件 → 查询和更新 DOM/CSS → 调用图形、音频或网络能力 → 持久化或跨线程传递数据 → 处理错误、安全与性能",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "机制链"
    ]
  },
  {
    "id": "jdg-15-web-browsers-4",
    "chapter": "jdg-15-web-browsers",
    "level": 3,
    "question": "第 15 章 浏览器中的 JavaScript为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "故障注入"
    ]
  },
  {
    "id": "jdg-15-web-browsers-5",
    "chapter": "jdg-15-web-browsers",
    "level": 3,
    "question": "第 15 章 浏览器中的 JavaScript签发时保持什么不变量？",
    "answer": "浏览器把 JavaScript 接到文档、事件、样式、图形、音频、导航、网络、存储和线程；页面正确性必须同时考虑事件传播、安全边界、渲染成本和跨线程消息。",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "工程验收"
    ]
  },
  {
    "id": "jdg-15-web-browsers-6",
    "chapter": "jdg-15-web-browsers",
    "level": 3,
    "question": "第 15 章 浏览器中的 JavaScript怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 15 章 浏览器中的 JavaScript",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-16-node-1",
    "chapter": "jdg-16-node",
    "level": 1,
    "question": "第 16 章 Node 服务器端 JavaScript的核心主张是什么？",
    "answer": "Node 把 JavaScript 接到进程、缓冲区、事件、流、文件、网络、子进程和工作线程；异步 I/O、背压和资源生命周期是服务端正确性的核心。",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "核心机制"
    ]
  },
  {
    "id": "jdg-16-node-2",
    "chapter": "jdg-16-node",
    "level": 2,
    "question": "第 16 章 Node 服务器端 JavaScript覆盖哪些出版社目录条目？",
    "answer": "Chapter 16: Server-Side JavaScript with Node、16.1 Node Programming Basics、16.1.1 Console Output、16.1.2 Command-Line Arguments and Environment Variables、16.1.3 Program Life Cycle、16.1.4 Node Modules、16.1.5 The Node Package Manager、16.2 Node Is Asynchronous by Default、16.3 Buffers、16.4 Events and EventEmitter、16.5 Streams、16.5.1 Pipes、16.5.2 Asynchronous Iteration、16.5.3 Writing to Streams and Handling Backpressure、16.5.4 Reading Streams with Events、16.6 Process, CPU, and Operating System Details、16.7 Working with Files、16.7.1 Paths, File Descriptors, and FileHandles、16.7.2 Reading Files、16.7.3 Writing Files、16.7.4 File Operations、16.7.5 File Metadata、16.7.6 Working with Directories、16.8 HTTP Clients and Servers、16.9 Non-HTTP Network Servers and Clients、16.10 Working with Child Processes、16.10.1 execSync() and execFileSync()、16.10.2 exec() and execFile()、16.10.3 spawn()、16.10.4 fork()、16.11 Worker Threads、16.11.1 Creating Workers and Passing Messages、16.11.2 The Worker Execution Environment、16.11.3 Communication Channels and MessagePorts、16.11.4 Transferring MessagePorts and Typed Arrays、16.11.5 Sharing Typed Arrays Between Threads、16.12 Summary",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-16-node-3",
    "chapter": "jdg-16-node",
    "level": 2,
    "question": "第 16 章 Node 服务器端 JavaScript的六阶段证据链是什么？",
    "answer": "启动 Node 进程与模块 → 接收事件或 I/O → 在 Buffer 与流中传输数据 → 处理背压和文件状态 → 调用网络、子进程或工作线程 → 关闭句柄并报告结果",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "机制链"
    ]
  },
  {
    "id": "jdg-16-node-4",
    "chapter": "jdg-16-node",
    "level": 3,
    "question": "第 16 章 Node 服务器端 JavaScript为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "故障注入"
    ]
  },
  {
    "id": "jdg-16-node-5",
    "chapter": "jdg-16-node",
    "level": 3,
    "question": "第 16 章 Node 服务器端 JavaScript签发时保持什么不变量？",
    "answer": "Node 把 JavaScript 接到进程、缓冲区、事件、流、文件、网络、子进程和工作线程；异步 I/O、背压和资源生命周期是服务端正确性的核心。",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "工程验收"
    ]
  },
  {
    "id": "jdg-16-node-6",
    "chapter": "jdg-16-node",
    "level": 3,
    "question": "第 16 章 Node 服务器端 JavaScript怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 16 章 Node 服务器端 JavaScript",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-1",
    "chapter": "jdg-17-tools-extensions",
    "level": 1,
    "question": "第 17 章 JavaScript 工具与扩展的核心主张是什么？",
    "answer": "工程工具把源代码送入 lint、格式化、测试、包管理、打包、转译、JSX 和类型检查流水线；每一步都要保留可复现输入和失败证据。",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "核心机制"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-2",
    "chapter": "jdg-17-tools-extensions",
    "level": 2,
    "question": "第 17 章 JavaScript 工具与扩展覆盖哪些出版社目录条目？",
    "answer": "Chapter 17: JavaScript Tools and Extensions、17.1 Linting with ESLint、17.2 JavaScript Formatting with Prettier、17.3 Unit Testing with Jest、17.4 Package Management with npm、17.5 Code Bundling、17.6 Transpilation with Babel、17.7 JSX: Markup Expressions in JavaScript、17.8 Type Checking with Flow、17.8.1 Installing and Running Flow、17.8.2 Using Type Annotations、17.8.3 Class Types、17.8.4 Object Types、17.8.5 Type Aliases、17.8.6 Array Types、17.8.7 Other Parameterized Types、17.8.8 Read-Only Types、17.8.9 Function Types、17.8.10 Union Types、17.8.11 Enumerated Types and Discriminated Unions、17.9 Summary",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-3",
    "chapter": "jdg-17-tools-extensions",
    "level": 2,
    "question": "第 17 章 JavaScript 工具与扩展的六阶段证据链是什么？",
    "answer": "解析项目与依赖 → 执行 lint 和格式化 → 运行单元测试 → 解析包并构建模块图 → 转译扩展语法与类型 → 生成可追溯产物",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "机制链"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-4",
    "chapter": "jdg-17-tools-extensions",
    "level": 3,
    "question": "第 17 章 JavaScript 工具与扩展为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "故障注入"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-5",
    "chapter": "jdg-17-tools-extensions",
    "level": 3,
    "question": "第 17 章 JavaScript 工具与扩展签发时保持什么不变量？",
    "answer": "工程工具把源代码送入 lint、格式化、测试、包管理、打包、转译、JSX 和类型检查流水线；每一步都要保留可复现输入和失败证据。",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "工程验收"
    ]
  },
  {
    "id": "jdg-17-tools-extensions-6",
    "chapter": "jdg-17-tools-extensions",
    "level": 3,
    "question": "第 17 章 JavaScript 工具与扩展怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "第 17 章 JavaScript 工具与扩展",
      "可复现实验"
    ]
  },
  {
    "id": "jdg-official-final-review-1",
    "chapter": "jdg-official-final-review",
    "level": 1,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习的核心主张是什么？",
    "answer": "全书验收要求把源码、值、控制流、对象模型、异步调度、浏览器、Node 与工具链连成可重放证据，不以单次正确输出替代过程解释。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "核心机制"
    ]
  },
  {
    "id": "jdg-official-final-review-2",
    "chapter": "jdg-official-final-review",
    "level": 2,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习覆盖哪些出版社目录条目？",
    "answer": "第 1 章 JavaScript 简介、第 2 章 词法结构、第 3 章 类型、值和变量、第 4 章 表达式与操作符、第 5 章 语句、第 6 章 对象、第 7 章 数组、第 8 章 函数、第 9 章 类、第 10 章 模块、第 11 章 JavaScript 标准库、第 12 章 迭代器与生成器、第 13 章 异步 JavaScript、第 14 章 元编程、第 15 章 浏览器中的 JavaScript、第 16 章 Node 服务器端 JavaScript、第 17 章 JavaScript 工具与扩展",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "目录覆盖"
    ]
  },
  {
    "id": "jdg-official-final-review-3",
    "chapter": "jdg-official-final-review",
    "level": 2,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习的六阶段证据链是什么？",
    "answer": "冻结源码与运行环境 → 预测值和控制流 → 追踪对象与异步状态 → 观察宿主 I/O → 注入边界与失败 → 恢复并签发全链路",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "机制链"
    ]
  },
  {
    "id": "jdg-official-final-review-4",
    "chapter": "jdg-official-final-review",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习为什么不能只看最终输出？",
    "answer": "最终输出会隐藏值转换、对象别名、控制流、异步顺序和宿主资源状态，必须保存首个偏离点与恢复轨迹。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "故障注入"
    ]
  },
  {
    "id": "jdg-official-final-review-5",
    "chapter": "jdg-official-final-review",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习签发时保持什么不变量？",
    "answer": "全书验收要求把源码、值、控制流、对象模型、异步调度、浏览器、Node 与工具链连成可重放证据，不以单次正确输出替代过程解释。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "工程验收"
    ]
  },
  {
    "id": "jdg-official-final-review-6",
    "chapter": "jdg-official-final-review",
    "level": 3,
    "question": "《JavaScript 权威指南（第 7 版）》全书总复习怎样完成可复现实验？",
    "answer": "固定源码、运行时、输入和初始状态，依次执行正常、边界、失败和恢复样本，记录值、引用、调用点、任务顺序、首偏离点与清理动作。",
    "tags": [
      "《JavaScript 权威指南（第 7 版）》全书总复习",
      "可复现实验"
    ]
  }
];
