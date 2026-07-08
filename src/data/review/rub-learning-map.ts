import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 学习地图复习题 */
export const rubLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rub-learning-map-1",
    chapter: "rub-learning-map",
    level: 1,
    question: "Ruby 全书四大板块的顺序是什么？",
    answer:
      "四大板块：Ruby 基础（对象与变量）→ 核心语法（字符串与控制流）→ 类与模块（OOP 与 Mixin）→ 元编程与实战（动态方法与 Gems）。\n\n按这个顺序学习是因为建立了递进能力链：对象模型是地基（一切皆对象），核心语法是操作工具，类与模块是抽象机制，元编程是高级扩展。每层建立在前一层之上。",
    tags: ["四大板块", "学习路径", "递进链"],
  },
  {
    id: "rub-learning-map-2",
    chapter: "rub-learning-map",
    level: 2,
    question: "Ruby 的核心设计哲学是什么？\"让程序员快乐\"体现在哪些方面？",
    answer:
      "Matz 的核心理念是\"让程序员快乐\"，体现为：\n1. **一切皆对象**：没有基本类型和对象类型的割裂，5.class 返回 Integer\n2. **块是灵魂**：`[1,2,3].each { |x| puts x }` 优雅的迭代器\n3. **最小惊讶原则**：API 行为应符合直觉预期\n4. **多种方式做同一件事**：与 Python 的\"只有一种正确方式\"形成对比\n5. **表达力优先**：代码读起来像自然语言\n\n这让 Ruby 代码优雅、表达力强、写起来愉悦。",
    tags: ["设计哲学", "Matz", "最小惊讶"],
  },
  {
    id: "rub-learning-map-3",
    chapter: "rub-learning-map",
    level: 3,
    question: "Ruby 和 Python 在设计哲学上有什么核心差异？",
    answer:
      "核心差异：\n1. **哲学**：Python 追求\"只有一种正确方式\"（The Zen of Python），Ruby 追求\"多种方式做同一件事\"（表达力优先）\n2. **类型系统**：Python 区分基本类型和对象（虽有统一但历史包袱），Ruby 从设计之初一切皆对象\n3. **函数式**：Python lambda 只能一行，Ruby 块可多行且是语言核心\n4. **真值规则**：Python 中 0/''/[] 为假，Ruby 中只有 nil 和 false 为假\n5. **private**：Python 靠约定（_前缀），Ruby 有严格的 private/protected\n6. **多重继承**：Python 支持多重继承，Ruby 单继承 + 模块 Mixin\n\n两者都是动态语言，但哲学方向不同——Python 偏工程纪律，Ruby 偏表达自由。",
    tags: ["Ruby vs Python", "设计哲学", "对比"],
  },
  {
    id: "rub-learning-map-4",
    chapter: "rub-learning-map",
    level: 4,
    question: "为什么说\"先学 Ruby 再学 Rails\"比直接学 Rails 更好？",
    answer:
      "Rails 大量使用 Ruby 的元编程能力——`has_many`、`validates`、`before_action`、`find_by_name` 背后都是 `define_method` 和 `method_missing`。不理解 Ruby 的类、模块和块，Rails 的代码就是黑箱魔法。\n\n先学 Ruby 的好处：\n1. **理解魔法**：知道 has_many 为什么能生成方法，出错时能定位问题\n2. **调试能力**：Rails 出错堆栈经常涉及元编程，不懂 Ruby 无法调试\n3. **定制能力**：能自己写 Gem、扩展 Rails 功能\n4. **设计思维**：理解 Ruby 的 Mixin、块、模块后，能写出更好的 Rails 代码\n5. **迁移能力**：Ruby 知识可迁移到 Sinatra、Hanami 等其他框架\n\n直接学 Rails 就像不看说明书直接操作复杂机器——能凑合用，但出问题时束手无策。",
    tags: ["Rails", "学习路径", "元编程"],
  },
];
