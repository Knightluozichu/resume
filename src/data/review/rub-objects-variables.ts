import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 对象与变量复习题 */
export const rubObjectsVariablesQuestions: ReviewQuestion[] = [
  {
    id: "rub-objects-variables-1",
    chapter: "rub-objects-variables",
    level: 1,
    question: `以下代码输出什么？解释 Ruby 的真值规则。\n\`\`\`ruby\nif 0\n  puts \"真\"\nelse\n  puts \"假\"\nend\n\`\`\``,
    answer:
      `输出：\`真\`\n\nRuby 中**只有 \`nil\` 和 \`false\` 为假**，其他一切（包括 \`0\`、\`\"\"\`、\`[]\`）都是真值。\n\n这与 C/Python/JavaScript 不同：\n- C：0 为假\n- Python：0、\"\"、[]、{} 都为假\n- JavaScript：0、\"\"、null、undefined 为假\n- Ruby：只有 nil 和 false 为假\n\n这是初学者最常踩的坑——写 \`if 0\` 在 Ruby 中永远为真。`,
    tags: ["真值规则", "nil", "false"],
  },
  {
    id: "rub-objects-variables-2",
    chapter: "rub-objects-variables",
    level: 2,
    question: `以下代码输出什么？解释原因。\n\`\`\`ruby\na = \"hello\"\nb = a\nb << \"!\"\nputs a\n\`\`\``,
    answer:
      `输出：\`hello!\`\n\n原因：\n1. \`a = \"hello\"\` 创建字符串对象，a 是引用（标签）\n2. \`b = a\` 让 b 指向同一个字符串对象（不是复制）\n3. \`b << \"!\"\` 原地追加，修改了 b 和 a 共同指向的对象\n4. 所以 \`a\` 也变成了 \`\"hello!\"\`\n\n核心概念：Ruby 变量是引用，赋值传递引用。\`<<\` 是原地修改方法（带 \`!\` 的方法同理）。要独立修改用 \`b = a.dup\` 创建副本。`,
    tags: ["引用语义", "<<", "dup"],
  },
  {
    id: "rub-objects-variables-3",
    chapter: "rub-objects-variables",
    level: 3,
    question: `类变量 \`@@count\` 和类实例变量 \`@count\`（在类方法中）有什么区别？`,
    answer:
      `**类变量 \`@@count\`**：被类和所有子类共享——修改父类影响子类，反之亦然。容易导致意外耦合。\n\n**类实例变量 \`@count\`**（在类上下文中的 @）：只属于当前类，不与子类共享。更安全。\n\n\`\`\`ruby\nclass Parent\n  @@shared = 0\n  @isolated = 0\n  def self.inc_shared; @@shared += 1; end\n  def self.inc_isolated; @isolated += 1; end\nend\n\nclass Child < Parent\n  def self.read_shared; @@shared; end  # 能看到 Parent 的 @@shared\n  # @isolated 在 Child 中是 nil（各自独立）\nend\n\nParent.inc_shared  # @@shared = 1\nChild.read_shared  # => 1（共享！）\n\`\`\`\n\nRuby 社区倾向用类实例变量替代类变量，避免继承带来的意外共享。`,
    tags: ["类变量", "类实例变量", "作用域"],
  },
  {
    id: "rub-objects-variables-4",
    chapter: "rub-objects-variables",
    level: 4,
    question: `解释 Ruby 的对象继承链：\`5.class.class.superclass\` 返回什么？画出完整的继承层次。`,
    answer:
      `\`5.class.class.superclass\` 返回 \`Object\`。\n\n完整继承链：\n\`\`\`\n5               # Integer 的实例\n  .class        # => Integer\nInteger         # Class 的实例\n  .class        # => Class\nClass           # 继承自 Module\n  .superclass   # => Module\nModule          # 继承自 Object\n  .superclass   # => Object\nObject          # 继承自 BasicObject\n  .superclass   # => BasicObject\nBasicObject     # 最底层根\n  .superclass   # => nil\n\`\`\`\n\n关键理解：\n1. \`5\` 是 \`Integer\` 的实例（对象→类）\n2. \`Integer\` 是 \`Class\` 的实例（类也是对象！）\n3. \`Class\` 继承自 \`Module\`（类是特殊的模块）\n4. \`Module\` 继承自 \`Object\`（模块也是对象）\n5. \`Object\` 继承自 \`BasicObject\`（万物之根）\n\n这种自洽的设计让 Ruby 的元编程成为可能——类本身也是对象，可以接收方法调用、被赋值给变量。`,
    tags: ["继承链", "Class", "Object", "对象模型"],
  },
];
