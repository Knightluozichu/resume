import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 变量与列表复习题 */
export const pccVariablesListsQuestions: ReviewQuestion[] = [
  {
    id: "pcc-variables-lists-1",
    chapter: "pcc-variables-lists",
    level: 1,
    question: `Python 变量是"盒子"还是"标签"？这意味着什么？`,
    answer:
      `Python 变量是"标签"而非"盒子"。\n\n在 C 语言中，变量是盒子——int a = 5 表示在内存中开一个 int 大小的盒子放入 5。在 Python 中，变量是标签——a = 5 表示创建一个整数对象 5，然后把标签 a 贴上去。b = a 不是复制盒子，而是再贴一个标签 b 到同一对象。\n\n这意味着：多个变量可以指向同一对象。对可变对象（如列表），通过一个变量修改内容会影响所有指向该对象的变量。例如 a = [1,2,3]; b = a; b.append(4) 后 a 也变成 [1,2,3,4]。`,
    tags: ["引用语义", "变量", "可变对象"],
  },
  {
    id: "pcc-variables-lists-2",
    chapter: "pcc-variables-lists",
    level: 2,
    question: `以下代码输出什么？解释原因。\n\`\`\`python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\n\`\`\``,
    answer:
      `输出 \`[1, 2, 3, 4]\`。\n\n原因：\`b = a\` 让 b 指向 a 指向的同一个列表对象（引用语义），不是创建副本。\`b.append(4)\` 修改了这个共享的列表对象。因为 a 和 b 指向同一个列表，所以 a 看到的内容也变了。\n\n要避免这个行为，应该用 \`b = a.copy()\` 或 \`b = a[:]\` 创建独立副本（浅拷贝）。如果列表内嵌套了其他列表，需要用 \`copy.deepcopy()\` 做深拷贝。`,
    tags: ["引用语义", "列表", "浅拷贝"],
  },
  {
    id: "pcc-variables-lists-3",
    chapter: "pcc-variables-lists",
    level: 3,
    question: `以下函数有什么 bug？如何修复？\n\`\`\`python\ndef add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\`\`\``,
    answer:
      `Bug：可变默认参数。\`[]\` 在函数定义时只创建一次，之后所有调用不传 lst 时共享同一个列表。\n\n第一次调用 \`add_item(1)\` 返回 \`[1]\`，第二次调用 \`add_item(2)\` 返回 \`[1, 2]\`——前一次调用的结果残留到了后一次。\n\n修复方法：用 None 做默认值，在函数内部创建新列表：\n\`\`\`python\ndef add_item(item, lst=None):\n    if lst is None:\n        lst = []\n    lst.append(item)\n    return lst\n\`\`\`\n这样每次调用不传 lst 时都创建全新的列表。`,
    tags: ["可变默认参数", "函数", "陷阱"],
  },
  {
    id: "pcc-variables-lists-4",
    chapter: "pcc-variables-lists",
    level: 4,
    question: `浅拷贝和深拷贝有什么区别？什么时候需要用深拷贝？`,
    answer:
      `**浅拷贝**（\`copy()\`、\`[:]\`、\`list()\`）：创建新容器，但元素仍共享引用。例如 \`a = [[1,2],[3,4]]; b = a.copy()\`，b 是新列表，但 b[0] 和 a[0] 指向同一个内层列表。修改 \`b[0].append(5)\` 会影响 a[0]。\n\n**深拷贝**（\`copy.deepcopy()\`）：递归复制所有嵌套对象，完全独立。修改拷贝后的任何层级都不影响原对象。\n\n需要用深拷贝的场景：处理嵌套的可变数据结构时。例如二维列表 \`[[1,2],[3,4]]\`、嵌套字典 \`{"a": [1,2]}\`。如果只做浅拷贝，修改内层列表/字典会影响原对象。单层列表 \`a = [1,2,3]\` 只需浅拷贝，因为整数是不可变对象。`,
    tags: ["浅拷贝", "深拷贝", "嵌套结构"],
  },
];
