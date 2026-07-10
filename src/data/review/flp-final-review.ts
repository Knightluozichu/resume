import type { ReviewQuestion } from "./types";

/** 流畅的 Python · 总复习 复习题 */
export const flpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "flp-final-review-1",
    chapter: "flp-final-review",
    level: 1,
    question: `用一句话概括《流畅的 Python》全书四个板块各自让你获得的核心能力。`,
    answer:
      `1. 数据模型：理解 Python 世界由特殊方法驱动，能实现 dunder 让自定义类型融入语言。\n2. 数据结构：掌握序列/字典/集合的底层语义与选型，用推导式和正确容器写出高效代码。\n3. 函数与对象：把函数当一等值传递，用类型提示和协议/ABC 约束设计边界。\n4. 高级特性：用闭包装饰器增强函数、用生成器惰性处理数据流，读懂主流框架源码。\n\n主线一句话：数据模型立心、数据结构筑基、函数对象塑形、高级特性升华。`,
    tags: ["四大板块", "核心能力", "全书主线"],
  },
  {
    id: "flp-final-review-2",
    chapter: "flp-final-review",
    level: 2,
    question: `「特殊方法」这条主线如何贯穿全书四个板块？请各举一例说明。`,
    answer:
      `特殊方法（dunder）是 Python 数据模型的核心，贯穿全书：\n1. 数据模型板块：直接讲 \`__len__\`、\`__getitem__\` 等——\`len(deck)\` 走 \`__len__\`，这是主线的起点。\n2. 数据结构板块：序列的切片、迭代本质是 \`__getitem__\`/\`__iter__\`；字典的 \`d[k]\` 走 \`__getitem__\`、\`in\` 走 \`__contains__\`。容器行为都是特殊方法的实现。\n3. 函数与对象板块：协议（Protocol/ABC）就是一组特殊方法的约定——「可迭代」即实现 \`__iter__\`，「可调用」即实现 \`__call__\`。\n4. 高级特性板块：装饰器依赖 \`__call__\`（wrapper 是可调用对象）；生成器依赖 \`__iter__\`/\`__next__\`（yield 实现迭代器协议）。\n\n所以特殊方法是底层世界观，四个板块都是它在不同领域的展开——这就是「数据模型立心」的含义。`,
    tags: ["特殊方法", "主线贯穿", "协议", "迭代器"],
  },
  {
    id: "flp-final-review-3",
    chapter: "flp-final-review",
    level: 3,
    question: `请综合运用四个板块的知识，解释这段代码为何能工作：\`deck = FrenchDeck(); print(choice(deck)); print(sorted(deck, key=rank_key))\`。涉及哪些机制？`,
    answer:
      `这段代码能工作，是四个板块知识的综合体现：\n\n1. 数据模型：\`FrenchDeck\` 实现了 \`__len__\` 和 \`__getitem__\`。\`choice(deck)\` 内部用 \`__getitem__\` 随机取一个下标；\`sorted(deck)\` 遍历 deck 依赖迭代回退机制（无 \`__iter__\` 时用 \`__getitem__\` 从 0 逐个取直到 IndexError）。\n\n2. 数据结构：deck 内部用 list 存 Card（容器序列存引用）；\`sorted\` 返回新列表（不可变视角，不改原 deck）；\`key=rank_key\` 用函数算排序键。\n\n3. 函数与对象：\`key=rank_key\` 体现函数即值——把 rank_key 函数对象传给 sorted 高阶函数，sorted 对每个元素调用它。rank_key 本身可加类型提示 \`def rank_key(card: Card) -> int\`。\n\n4. 高级特性：若 deck 改用生成器产出牌，\`sorted\` 仍能工作（sorted 接受任意可迭代对象，内部先耗尽成 list 再排）。装饰器也可加在 rank_key 上做缓存。\n\n涉及机制：特殊方法分发、迭代回退、容器存引用、高阶函数 key 参数、可迭代协议。一段代码串联了全书的四个板块，这正是 Python 数据模型「实现协议即融入语言」的威力——你只写了两个特殊方法，就免费获得了 choice、sorted、in、切片等一整套能力。`,
    tags: ["综合运用", "迭代回退", "高阶函数", "数据模型"],
  },
  {
    id: "flp-final-review-4",
    chapter: "flp-final-review",
    level: 4,
    question: `「Pythonic」的内核是什么？请结合全书论证：为什么说它是「顺应数据模型、用协议与语法糖而非造轮子」，并指出其边界（何时不应过度 Pythonic）。`,
    answer:
      `Pythonic 的内核：顺应 Python 数据模型的设计意图，用语言提供的协议和语法糖表达意图，而非用其他语言的思维硬写。结合全书论证：\n\n1. 数据模型层面：Pythonic 是实现特殊方法让类型融入语言（\`__len__\` 让 \`len()\` 工作），而非自己写 \`deck.length()\`。用内置函数 \`len\`、\`for\`、\`+\`，让特殊方法待在幕后。\n2. 数据结构层面：Pythonic 是选对容器（异构用 list、同质大量用 array）、用推导式 \`[x for x in s if c]\` 替代 map+filter 嵌套、理解容器存引用以避 \`[[0]]*n\` 陷阱。\n3. 函数对象层面：Pythonic 是把函数当值传（\`key=len\`）、用渐进式类型提示加固关键模块、用 Protocol 定义松耦合能力契约而非逼用户继承。\n4. 高级特性层面：Pythonic 是用装饰器 \`@timer\` 横切关注点、用生成器惰性处理大数据流，而非手写状态机或预分配大 list。\n\n所以「顺应数据模型、用协议与语法糖」准确概括了 Pythonic——它不是炫技语法，而是顺着语言设计的纹理写代码。\n\n边界（何时不应过度 Pythonic）：\n1. 元编程滥用：过度使用 \`__getattr__\`、动态属性、复杂多重装饰器，会让代码难以静态分析、调试困难——可读性反而下降。\n2. 一行式炫技：把复杂逻辑压成一个晦涩的推导式或 reduce，违背「显式优于隐式」。\n3. 性能敏感路径：某些 Pythonic 写法（如大量小对象的高阶函数调用）在热路径可能比直白循环慢，需实测权衡。\n4. 团队可读性：若团队不熟悉某高级特性，强用反而增加认知负担。\n\n核心判据：Pythonic 服务于「清晰表达意图」，当某种「Pythonic」写法让代码更难懂时，它就背离了内核。本书的价值正在于让你知道「何时用、为何能这样用」，而非把所有特性都用一遍。`,
    tags: ["Pythonic", "数据模型", "边界", "可读性", "综合论证"],
  },
];
