import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 条件与循环复习题 */
export const pccIfLoopsQuestions: ReviewQuestion[] = [
  {
    id: "pcc-if-loops-1",
    chapter: "pcc-if-loops",
    level: 1,
    question: `以下代码输出什么？\n\`\`\`python\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    print(i)\n\`\`\``,
    answer:
      `输出：\n\`\`\`\n1\n2\n4\n\`\`\`\n\n解释：i=1 时打印 1。i=2 时打印 2。i=3 时 continue 跳过打印。i=4 时打印 4。i=5 时 break 跳出循环，不打印 5。\n\ncontinue 跳过当前轮次但不终止循环，break 直接终止整个循环。`,
    tags: ["break", "continue", "for循环"],
  },
  {
    id: "pcc-if-loops-2",
    chapter: "pcc-if-loops",
    level: 2,
    question: `while 循环和 for 循环分别适合什么场景？while 循环有什么常见陷阱？`,
    answer:
      `**while 循环**适合不确定迭代次数的场景：条件为 True 时重复执行。例如游戏循环 \`while running:\`、等待用户输入。\n\n**for 循环**适合已知迭代范围的场景：遍历可迭代对象（列表、range、字符串）的每个元素。例如遍历列表、重复 N 次。\n\nwhile 循环的常见陷阱：**忘记修改条件变量导致死循环**。\`while count > 0: print(count)\` 中 count 永远不变，无限循环。循环体内必须有改变条件变量的操作。调试时可以在循环体内加 print 看变量变化，或用 Ctrl+C 强制中断。`,
    tags: ["while", "for", "死循环"],
  },
  {
    id: "pcc-if-loops-3",
    chapter: "pcc-if-loops",
    level: 3,
    question: `用列表推导式生成 1-20 中所有能被 3 整除的数的平方，并解释其结构。`,
    answer:
      `\`\`\`python\nresult = [x ** 2 for x in range(1, 21) if x % 3 == 0]\n# [9, 36, 81, 144, 225, 324]\n\`\`\`\n\n列表推导式结构是 \`[表达式 for 变量 in 可迭代对象 if 条件]\`：\n- \`range(1, 21)\` 生成 1 到 20 的数字序列\n- \`if x % 3 == 0\` 筛选能被 3 整除的数（3, 6, 9, 12, 15, 18）\n- \`x ** 2\` 对每个筛选后的数求平方\n\n等价的传统写法：\n\`\`\`python\nresult = []\nfor x in range(1, 21):\n    if x % 3 == 0:\n        result.append(x ** 2)\n\`\`\`\n列表推导式更简洁，Pythonic 风格。`,
    tags: ["列表推导式", "range", "条件过滤"],
  },
  {
    id: "pcc-if-loops-4",
    chapter: "pcc-if-loops",
    level: 4,
    question: `为什么在遍历列表时不能直接用 for item in lst: lst.remove(item) 删除元素？正确做法是什么？`,
    answer:
      `在遍历列表时用 \`lst.remove(item)\` 会导致**跳过元素**。因为 remove 改变了列表长度和索引对应关系——删除一个元素后，后面的元素前移，但 for 循环的内部索引继续递增，导致跳过被前移的元素。\n\n例如 \`lst = [1, 2, 3, 4]\`，遍历删除偶数：i=0 看 1（不删），i=1 看 2（删，列表变 [1,3,4]），i=2 看 4（跳过了 3！）。\n\n正确做法：\n1. 遍历列表的副本：\`for item in lst[:]: lst.remove(item)\`\n2. 用列表推导式创建新列表：\`lst = [x for x in lst if condition]\`\n3. 用 filter：\`lst = list(filter(predicate, lst))\`\n\n推荐第 2 种——列表推导式最 Pythonic，且不会修改原列表（创建新列表）。`,
    tags: ["遍历删除", "列表陷阱", "列表推导式"],
  },
];
