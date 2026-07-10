import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 总复习题 */
export const rubFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rub-final-review-1",
    chapter: "rub-final-review",
    level: 1,
    question: `Ruby 全书四大板块是什么？它们之间的因果链是什么？`,
    answer:
      `四大板块：\n1. **对象模型**（第1-2章）：一切皆对象，变量是引用，四种作用域\n2. **核心语法**（第3-4章）：字符串/插值、条件分支、块迭代\n3. **类与模块**（第5-7章）：类定义、单继承、Mixin、块/Proc/Lambda\n4. **元编程与实战**（第8-10章）：Open Class、define_method、method_missing、Gems\n\n因果链：对象模型是地基（一切皆对象）→ 核心语法是操作工具 → 类与模块是抽象机制 → 元编程是高级扩展。\n\n每层建立在前一层之上：不理解对象模型就不知道方法查找链从哪开始，不理解模块就无法理解 prepend，不理解元编程就无法理解 Rails 的 has_many。`,
    tags: ["四大板块", "因果链", "知识结构"],
  },
  {
    id: "rub-final-review-2",
    chapter: "rub-final-review",
    level: 2,
    question: `Ruby 的核心设计哲学是什么？\"一切皆对象\"如何体现在继承链中？`,
    answer:
      `核心设计哲学：让程序员快乐。体现为一切皆对象、块是灵魂、最小惊讶原则、表达力优先。\n\n\"一切皆对象\"在继承链中的体现：\n\`\`\`\n5               # Integer 的实例\n  .class        # => Integer\nInteger         # Class 的实例（类也是对象！）\n  .class        # => Class\nClass           # 继承自 Module\n  .superclass   # => Module\nModule          # 继承自 Object\n  .superclass   # => Object\nObject          # 继承自 BasicObject\n  .superclass   # => BasicObject\n\`\`\`\n\n关键：\`Integer\` 是 \`Class\` 的实例——类本身也是对象，可以接收方法调用、被赋值给变量。这种自洽的设计让元编程成为可能——\`Dog.new\` 中 \`new\` 是 \`Class\` 的实例方法，\`Dog\` 是 \`Class\` 的实例对象。`,
    tags: ["设计哲学", "一切皆对象", "继承链"],
  },
  {
    id: "rub-final-review-3",
    chapter: "rub-final-review",
    level: 3,
    question: `描述 \`Dog.new(\"Rex\").speak\` 的完整执行过程，涉及哪些 Ruby 机制？`,
    answer:
      `完整执行过程：\n\n1. **常量查找**：Ruby 查找 \`Dog\` 常量，找到 Dog 类对象（Class 的实例）\n\n2. **方法查找（new）**：Dog 没有 new 方法 → 沿查找链 Dog → Animal → Object → Class#new\n\n3. **对象创建**：Class#new 分配内存 → 设置类指针指向 Dog → 调用 Dog#initialize(\"Rex\")\n\n4. **构造函数**：Dog#initialize 调用 super(\"Rex\") → Animal#initialize 设置 @name=\"Rex\" → 返回 Dog#initialize 设置 @breed\n\n5. **方法查找（speak）**：dog.speak → 查找 Dog.ancestors：[Dog, Walkable, Loggable, Animal, Object, Kernel, BasicObject] → 在 Dog 中找到 speak（重写了 Animal 的）\n\n6. **方法执行**：绑定 self=dog → 执行 \"#{@name} says Woof!\" → 字符串插值 → \"Rex says Woof!\"\n\n涉及机制：对象模型（Class#new、实例变量）、核心语法（插值）、类与模块（继承、super、查找链）、元编程（如果 speak 不存在则 method_missing 接管）。\n\n一行代码贯穿全书四大板块。`,
    tags: ["方法调用", "方法查找链", "综合"],
  },
  {
    id: "rub-final-review-4",
    chapter: "rub-final-review",
    level: 4,
    question: `为什么说\"Rails 的优雅来自 Ruby 的元编程\"？举例说明 has_many 的实现原理。`,
    answer:
      `Rails 的 \`has_many\`、\`validates\`、\`find_by_name\` 等\"魔法\"本质是 Ruby 元编程——动态生成方法、拦截未知方法。\n\n\`has_many :posts\` 的实现原理：\n\`\`\`ruby\ndef has_many(association_name)\n  # define_method 动态生成实例方法\n  define_method(association_name) do\n    associated_class = association_name.to_s.classify.constantize\n    associated_class.where(\"user_id\" => self.id)\n  end\n\n  define_method(\"build_#{association_name.to_s.singularize}\") do |attrs|\n    # ...\n  end\nend\n\`\`\`\n\n涉及的元编程技术：\n1. **include + extend**：included 钩子让 has_many 成为类方法\n2. **define_method**：动态生成 posts、build_post 方法\n3. **constantize**：字符串转常量（\"Post\" → Post 类）\n4. **method_missing**：find_by_email 拦截未知方法名\n\n\`User.has_many :posts\` 一行代码生成多个方法——这就是 Rails 的\"魔法\"。不理解 Ruby 元编程，Rails 就是黑箱；理解了，Rails 就是优雅的 DSL。\n\nRails 的优雅 = Ruby 元编程的极致应用。`,
    tags: ["Rails", "元编程", "has_many", "综合应用"],
  },
];
