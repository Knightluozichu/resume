import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 函数复习题 */
export const pccFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "pcc-functions-1",
    chapter: "pcc-functions",
    level: 1,
    question: `Python 函数支持哪些参数类型？各举一例。`,
    answer:
      `Python 函数支持五种参数类型：\n\n1. **位置参数**：按顺序传递。\`def add(a, b): ...\` → \`add(1, 2)\`\n2. **默认值参数**：可省略，有默认值。\`def greet(name, msg=\"Hi\")\` → \`greet(\"Alice\")\` 用默认 \"Hi\"\n3. **关键字参数**：按名称传递，不依赖顺序。\`greet(msg=\"Hello\", name=\"Alice\")\`\n4. **\`*args\`**：收集多余位置参数为元组。\`def sum_all(*args): ...\` → \`sum_all(1, 2, 3)\` 中 args=(1,2,3)\n5. **\`**kwargs\`**：收集多余关键字参数为字典。\`def info(**kwargs): ...\` → \`info(name=\"Alice\", age=20)\` 中 kwargs={\"name\":\"Alice\", \"age\":20}\n\n参数顺序：位置参数 → 默认值参数 → *args → **kwargs。`,
    tags: ["函数参数", "位置参数", "关键字参数"],
  },
  {
    id: "pcc-functions-2",
    chapter: "pcc-functions",
    level: 2,
    question: `解释 LEGB 作用域查找规则。何时需要使用 global 关键字？`,
    answer:
      `LEGB 是 Python 变量查找顺序：\n- **L (Local)**：函数内部定义的变量\n- **E (Enclosing)**：外层嵌套函数的变量\n- **G (Global)**：模块级别定义的变量\n- **B (Built-in)**：Python 内置名称（如 len、print）\n\nPython 从内到外依次查找。函数内可以读取全局变量（查找到达 G 层），但如果要在函数内**修改**全局变量（赋值），Python 会把该变量当作局部变量——除非用 \`global\` 声明。\n\n例如 \`count = 0; def inc(): global count; count += 1\`。不加 global 会报 UnboundLocalError。但最佳实践是避免全局变量，通过参数传入、返回值传出。`,
    tags: ["LEGB", "作用域", "global"],
  },
  {
    id: "pcc-functions-3",
    chapter: "pcc-functions",
    level: 3,
    question: `为什么以下代码两次调用的输出不同？如何修复？\n\`\`\`python\ndef append_to(item, target=[]):\n    target.append(item)\n    return target\nprint(append_to(1))\nprint(append_to(2))\n\`\`\``,
    answer:
      `输出：\n\`\`\`\n[1]\n[1, 2]\n\`\`\`\n\n原因：默认参数 \`[]\` 在函数定义时只创建一次，之后所有调用不传 target 时共享同一个列表。第一次调用往这个列表加了 1，返回 [1]。第二次调用没传 target，使用的还是同一个列表（现在是 [1]），追加 2 后变成 [1, 2]。\n\n修复方法：用 None 做默认值，在函数内部创建新列表：\n\`\`\`python\ndef append_to(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target\n\`\`\`\n这样每次调用不传 target 时都创建新列表，互不影响。`,
    tags: ["可变默认参数", "函数陷阱", "None"],
  },
  {
    id: "pcc-functions-4",
    chapter: "pcc-functions",
    level: 4,
    question: `Python 函数传递可变对象和不可变对象有什么区别？这对函数设计有什么影响？`,
    answer:
      `**不可变对象**（int、str、tuple）：函数内"修改"会创建新对象，不影响外部。\`def change(x): x = 100\` 调用 \`change(n)\` 后 n 不变。\n\n**可变对象**（list、dict、set）：函数内修改直接影响外部，因为内外引用同一对象。\`def add(lst): lst.append(4)\` 调用 \`add(numbers)\` 后 numbers 变了。\n\n对函数设计的影响：\n1. 如果函数需要修改传入的可变对象，调用者可能不期望这种副作用。应该在文档中明确说明，或返回新对象而非修改原对象。\n2. 如果函数不应该修改传入对象，应该先创建副本：\`def process(data): data = data.copy()\`\n3. 返回多个值时，Python 的元组解包比修改传入参数更清晰：\`return min_val, max_val\` 而非修改传入的 result 列表。`,
    tags: ["可变对象", "不可变对象", "传递语义"],
  },
];
