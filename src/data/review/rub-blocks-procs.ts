import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · 块、Proc 与 Lambda 复习题 */
export const rubBlocksProcsQuestions: ReviewQuestion[] = [
  {
    id: "rub-blocks-procs-1",
    chapter: "rub-blocks-procs",
    level: 1,
    question: "块（Block）、Proc 和 Lambda 三者有什么关系和区别？",
    answer:
      "**关系**：块是基础形式，Proc 是对象化的块，Lambda 是严格的 Proc（Proc 的子类）。\n\n**区别**：\n| 特性 | Block | Proc | Lambda |\n|------|-------|------|--------|\n| 是否对象 | 否 | 是 | 是 |\n| 参数检查 | 无 | 宽松 | 严格 |\n| return 行为 | 退出方法 | 退出方法 | 退出自身 |\n| 创建方式 | 随方法调用 | Proc.new | lambda {} 或 ->(){} |\n\n```ruby\n# Block（不是对象）\n[1,2,3].each { |x| puts x }\n\n# Proc（对象化的块）\np = Proc.new { |x| puts x }\np.call(5)\n\n# Lambda（严格的 Proc）\nl = ->(x) { puts x }\nl.call(5)\n```\n\n选择：日常迭代用块，需要存储用 Proc，需要严格函数语义用 Lambda。",
    tags: ["Block", "Proc", "Lambda", "对比"],
  },
  {
    id: "rub-blocks-procs-2",
    chapter: "rub-blocks-procs",
    level: 2,
    question: "以下代码输出什么？解释 Proc 和 Lambda 在 return 上的差异。\n```ruby\ndef test_proc\n  p = Proc.new { return \"from proc\" }\n  p.call\n  \"from method\"\nend\ndef test_lambda\n  l = lambda { return \"from lambda\" }\n  l.call\n  \"from method\"\nend\nputs test_proc\nputs test_lambda\n```",
    answer:
      "输出：\n```\nfrom proc\nfrom method\n```\n\n- **Proc 的 return**：退出**定义它的方法**。`test_proc` 中 `p.call` 执行 Proc，`return \"from proc\"` 直接退出 `test_proc`。后面的 `\"from method\"` 不执行。\n- **Lambda 的 return**：只退出 Lambda 自身。`l.call` 执行 Lambda，`return` 只退出 Lambda。`test_lambda` 继续执行，返回 `\"from method\"`。\n\n核心：Proc 行为像\"内联代码\"（return 影响外层方法），Lambda 行为像\"独立函数\"（return 只影响自身）。",
    tags: ["return", "Proc", "Lambda"],
  },
  {
    id: "rub-blocks-procs-3",
    chapter: "rub-blocks-procs",
    level: 3,
    question: "解释 `&:method` 语法糖的工作原理。以下代码为什么能工作？\n```ruby\n[\"hi\", \"hello\"].map(&:upcase)  # => [\"HI\", \"HELLO\"]\n```",
    answer:
      "`&:upcase` 的工作原理：\n\n1. `:upcase` 是 Symbol 对象\n2. `&` 运算符对 Symbol 调用 `Symbol#to_proc` 方法\n3. `Symbol#to_proc` 返回一个 Proc：`->(obj) { obj.upcase }`\n4. map 接收这个 Proc 作为块参数\n\n等价于：\n```ruby\n[\"hi\", \"hello\"].map { |s| s.upcase }\n```\n\n`Symbol#to_proc` 的简化实现：\n```ruby\nclass Symbol\n  def to_proc\n    ->(obj, *args) { obj.send(self, *args) }\n  end\nend\n```\n\n限制：`&:method` 只能调用**无参方法**（如 `to_s`、`upcase`、`strip`）。需要参数时不能用——`map(&:+(1))` 不合法。\n\n常用场景：`array.map(&:to_s)`、`array.select(&:even?)`、`array.sort_by(&:length)`",
    tags: ["&:method", "Symbol#to_proc", "语法糖"],
  },
  {
    id: "rub-blocks-procs-4",
    chapter: "rub-blocks-procs",
    level: 4,
    question: "用块实现一个 `with_file` 方法，打开文件、执行块、确保关闭文件（类似 File.open 的块形式）。",
    answer:
      "```ruby\ndef with_file(filename, mode = \"r\")\n  file = File.open(filename, mode)\n  begin\n    yield(file)          # 把文件对象传给块\n  ensure\n    file.close            # 确保关闭\n  end\nend\n\n# 使用\nwith_file(\"data.txt\") do |f|\n  content = f.read\n  puts content\nend  # 文件自动关闭，即使块中抛异常\n```\n\n这是\"块作为资源管理工具\"的经典模式——RAII 的 Ruby 版本：\n1. 方法打开资源（文件/连接/锁）\n2. `yield(resource)` 将资源传给块使用\n3. `ensure` 保证资源释放——无论正常返回还是异常\n4. 块返回值成为方法返回值\n\n标准库的 `File.open`、`DB.connect`、`Mutex#synchronize` 都用这种模式。块让\"获取-使用-释放\"模式变得优雅——不需要 try-finally 样板代码。",
    tags: ["资源管理", "yield", "ensure", "RAII"],
  },
];
