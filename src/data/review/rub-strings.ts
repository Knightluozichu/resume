import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 字符串复习题 */
export const rubStringsQuestions: ReviewQuestion[] = [
  {
    id: "rub-strings-1",
    chapter: "rub-strings",
    level: 1,
    question: "以下代码输出什么？解释单引号和双引号的区别。\n```ruby\nname = \"Ruby\"\nputs \"Hello, #{name}!\"\nputs 'Hello, #{name}!'\n```",
    answer:
      "输出：\n```\nHello, Ruby!\nHello, #{name}!\n```\n\n区别：\n- **双引号**：支持字符串插值 `#{expr}` 和转义符（\\n, \\t 等）\n- **单引号**：原样输出，不解析插值和转义（除了 \\' 和 \\\\）\n\n选择原则：需要插值或转义用双引号，纯文本用单引号（略快，无需解析）。",
    tags: ["单引号", "双引号", "插值"],
  },
  {
    id: "rub-strings-2",
    chapter: "rub-strings",
    level: 2,
    question: "以下代码输出什么？解释 `<<` 和 `+` 的区别。\n```ruby\na = \"hello\"\nb = a\na << \" world\"\nc = a + \"!\"\nputs a\nputs b\nputs c\n```",
    answer:
      "输出：\n```\nhello world\nhello world\nhello world!\n```\n\n- `a << \" world\"`：`<<` 是**原地追加**，直接修改 a 指向的对象。因为 b = a 指向同一对象，b 也变了。\n- `c = a + \"!\"`：`+` 是**创建新字符串**，c 指向新对象，a 不受影响。\n\n核心区别：`<<` 修改原对象（in-place），`+` 返回新对象。带 `!` 的方法（如 `upcase!`、`gsub!`）同理——修改原对象。",
    tags: ["<<", "+", "可变性", "原地修改"],
  },
  {
    id: "rub-strings-3",
    chapter: "rub-strings",
    level: 3,
    question: "String 和 Symbol 有什么区别？什么时候该用哪个？",
    answer:
      "**String**：可变，每次创建新对象，占内存多。适合文本数据。\n**Symbol**：不可变，同名始终同一对象，GC 友好。适合键名和标识符。\n\n```ruby\n\"hello\".object_id  # 每次不同\n:hello.object_id   # 始终相同\n```\n\n用 Symbol 的场景：\n- 哈希键：`{ name: \"Alice\" }` 而非 `{ \"name\" => \"Alice\" }`\n- 方法名：`send(:upcase)`\n- 枚举/状态：`status = :active`\n\n用 String 的场景：\n- 用户输入文本\n- 需要 upcase/gsub/split 等操作\n- 文件/网络数据\n\n核心：Symbol 是\"名字\"（固定标识），String 是\"文本\"（可变内容）。",
    tags: ["String", "Symbol", "哈希键"],
  },
  {
    id: "rub-strings-4",
    chapter: "rub-strings",
    level: 4,
    question: "为什么在循环中应该用 `<<` 而不是 `+` 拼接字符串？用代码说明性能差异。",
    answer:
      "`+` 每次创建新字符串对象，在循环中产生大量临时对象，GC 压力大。`<<` 原地追加，无额外对象创建。\n\n```ruby\n# 差：每次 + 创建新对象\nresult = \"\"\n10000.times { |i| result = result + i.to_s }  # O(n²) 时间\n\n# 好：<< 原地追加\nresult = \"\"\n10000.times { |i| result << i.to_s }  # O(n) 时间\n\n# 最佳：Array#join\nresult = 10000.times.map(&:to_s).join(\"\")  # 最高效\n```\n\n性能对比（拼接 10000 个字符串）：\n- `+` 方式：约 500ms（大量临时对象 + GC）\n- `<<` 方式：约 5ms（原地修改）\n- `join` 方式：约 2ms（预分配 + 批量拼接）\n\n核心：`+` 语义是\"创建新值\"，`<<` 语义是\"修改原值\"。在累加场景用 `<<` 或 `join`。",
    tags: ["性能", "<<", "+"],
  },
];
