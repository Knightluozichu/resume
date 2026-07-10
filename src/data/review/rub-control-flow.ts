import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 控制流复习题 */
export const rubControlFlowQuestions: ReviewQuestion[] = [
  {
    id: "rub-control-flow-1",
    chapter: "rub-control-flow",
    level: 1,
    question: `以下 case-when 输出什么？解释 \`===\` 的作用。\n\`\`\`ruby\ncase 5\nwhen Integer then puts \"整数\"\nwhen 1..10   then puts \"范围内\"\nend\n\`\`\``,
    answer:
      `输出：\`整数\`\n\n\`case-when\` 从上到下匹配，用 \`===\` 运算符。\`Integer === 5\` 检查 5 是否是 Integer 的实例——返回 true，匹配成功。\n\n\`===\` 的行为因左操作数类型而异：\n- \`Class === obj\`：检查 obj 是否是 Class 的实例\n- \`Range === n\`：检查 n 是否在范围内\n- \`Regexp === str\`：检查 str 是否匹配正则\n- \`Proc === arg\`：调用 Proc 并返回布尔值\n\n如果调换顺序，\`when 1..10\` 会先匹配（5 在 1..10 范围内）。`,
    tags: ["case-when", "===", "模式匹配"],
  },
  {
    id: "rub-control-flow-2",
    chapter: "rub-control-flow",
    level: 2,
    question: `为什么 Ruby 社区几乎不用 \`for\` 循环，而总是用 \`each\`？`,
    answer:
      `Ruby 的 \`for x in array\` 语法存在但不推荐使用，原因：\n\n1. **作用域安全**：\`for\` 不创建新作用域——循环变量 \`x\` 会泄漏到外部。\`each\` 用块，块变量在块外不可访问。\n\`\`\`ruby\n# for：变量泄漏\nfor x in [1,2,3]; end\nputs x  # => 3（x 泄漏了！）\n\n# each：块作用域\n[1,2,3].each { |x| }\nputs x  # => NameError（x 不存在）\n\`\`\`\n\n2. **一致性**：each/map/select 等块迭代是 Ruby 的惯用法，统一风格。\n3. **表达力**：链式调用 \`array.map(&:upcase).select { |s| s.length > 3 }\` 比 for 循环更声明式。\n4. **函数式风格**：块迭代鼓励不可变数据流，减少副作用。\n\n规则：永远用 \`each\`，不用 \`for\`。`,
    tags: ["each", "for", "作用域"],
  },
  {
    id: "rub-control-flow-3",
    chapter: "rub-control-flow",
    level: 3,
    question: `用 Ruby 惯用法重写以下 C 风格代码：\n\`\`\`c\nint sum = 0;\nfor (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) sum += i * i;\n}\n\`\`\``,
    answer:
      `Ruby 惯用法重写：\n\n\`\`\`ruby\n# 最 Ruby 风格\nsum = (0...10).select(&:even?).map { |n| n ** 2 }.sum\n\n# 或更简洁（步进2）\nsum = (0...10).step(2).map { |n| n ** 2 }.sum\n\n# 逐步分解\nnumbers = (0...10)                  # Range\nevens = numbers.select(&:even?)     # [0, 2, 4, 6, 8]\nsquares = evens.map { |n| n ** 2 }  # [0, 4, 16, 36, 64]\nsum = squares.sum                   # 120\n\`\`\`\n\n关键变化：\n1. \`for\` 循环 → \`select\`/\`map\`/\`sum\` 链式调用\n2. \`if (i % 2 == 0)\` → \`select(&:even?)\`\n3. \`sum += i * i\` → \`map { |n| n ** 2 }.sum\`\n4. 代码描述\"做什么\"而非\"怎么做\"——声明式风格`,
    tags: ["惯用法", "select", "map", "链式调用"],
  },
  {
    id: "rub-control-flow-4",
    chapter: "rub-control-flow",
    level: 4,
    question: `解释 \`==\` 和 \`===\` 的区别。在 case-when 和普通比较中各自用哪个？`,
    answer:
      `**\`==\`**：值相等判断。\`\"a\" == \"a\"\` → true。用于普通比较（if 条件、== 运算符）。\n\n**\`===\`**：模式匹配。行为因左操作数类型而异：\n- \`Integer === 5\` → 5 是否是 Integer 实例\n- \`(1..10) === 5\` → 5 是否在范围内\n- \`/\\d+/ === \"123\"\` → 字符串是否匹配正则\n- \`Proc === arg\` → 调用并返回布尔值\n\n**case-when 用 \`===\`**：\`when Integer\` 检查 \`Integer === x\`，\`when 1..10\` 检查 \`(1..10) === x\`。\n\n**普通比较用 \`==\`**：\`if x == 5\` 检查值相等。\n\n混淆两者的陷阱：\n\`\`\`ruby\ncase \"hello\"\nwhen String then puts \"匹配\"  # String === \"hello\" → true\n# 不是 \"hello\" == String！\n\`\`\`\n\n核心：\`===\` 是\"匹配\"语义（左操作数定义匹配规则），\`==\` 是\"相等\"语义。`,
    tags: ["===", "==", "case-when"],
  },
];
