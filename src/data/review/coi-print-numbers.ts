import type { ReviewQuestion } from "./types";

export const coiPrintNumbersQuestions: ReviewQuestion[] = [
  {
    id: "coi-print-num-1",
    chapter: "coi-print-numbers",
    level: 1,
    question:
      "在面试中，『打印从 1 到最大的 n 位数』这道题最核心、最容易被忽略的隐藏考点是什么？",
    answer:
      "这道题最核心的考点是**大数溢出问题（Big Number Overflow）**。如果 $n$ 很大（例如 $n=100$），最大的 $n$ 位数是 $10^{100}-1$，任何标准的有符号/无符号整型（如 C++ 的 `long long` 或 JavaScript 的 `Number`）都会发生溢出。因此，在面试中必须主动向面试官确认 $n$ 的取值范围，若可能为大数，则需要使用**字符串或字符数组**来表示和处理数值。",
    tags: ["大数溢出", "面试陷阱"],
  },
  {
    id: "coi-print-num-2",
    chapter: "coi-print-numbers",
    level: 1,
    question:
      "为什么当 $n$ 很大时，用常规的整型自增循环打印会失效？各种语言的数值类型有什么局限？",
    answer:
      "当 $n=20$ 时，最大的 $n$ 位数为 $10^{20}-1$，这已经超出了 64 位有符号整型 `long long` 的最大值 $9.22 \\times 10^{18}$（`LLONG_MAX`）；而在 JavaScript/TypeScript 中，安全整数上限 `Number.MAX_SAFE_INTEGER` 仅为 $2^{53}-1 \\approx 9 \\times 10^{15}$。一旦数字超出安全精度范围，常规的自增操作 `i++` 将会丢失精度甚至导致死循环，因而失效。",
    tags: ["数值类型", "溢出局限"],
  },
  {
    id: "coi-print-num-3",
    chapter: "coi-print-numbers",
    level: 2,
    question:
      "为了绕过整型溢出，我们如何用字符串或字符数组来模拟大数的自增？请简述其递增逻辑。",
    answer:
      "我们可以用一个长度为 $n$ 的字符数组来表示数字，其中高位在左（索引小），低位在右（索引大）。\n自增逻辑如下：\n1. 每次自增时，将数组最后一位（最低位）加 1。\n2. 如果该位加 1 后达到 10，则产生进位：将当前位置为 `'0'`，并将进位传递给前一位（高一位），继续做加 1 操作。\n3. 重复这一过程，直到某一位加 1 后不需要进位，或者最高位（索引 0）也产生进位，代表已超出 $n$ 位数最大值，自增结束。",
    tags: ["大数模拟", "进位逻辑"],
  },
  {
    id: "coi-print-num-4",
    chapter: "coi-print-numbers",
    level: 2,
    question:
      "相比于模拟大数自增，利用『全排列 + 回溯递归』生成 $n$ 位数的核心思想是什么？",
    answer:
      "核心思想是：**把打印从 1 到最大的 $n$ 位数问题，转化为对 $n$ 个位置进行数字 `'0'`-`'9'` 的全排列问题**。\n具体实现中，我们定义一个长度为 $n$ 的字符数组，从最高位（索引 0）开始，递归地为当前位置尝试填入 `'0'` 到 `'9'`。当填满 $n$ 位（达到递归基底）时，就得到了一个完整的 $n$ 位数表示，然后进行前导零去除 and 打印。通过这种回溯，可以天然地遍历出所有的数值状态。",
    tags: ["全排列", "回溯算法"],
  },
  {
    id: "coi-print-num-5",
    chapter: "coi-print-numbers",
    level: 3,
    question:
      "在全排列回溯生成大数时，如何去除前导零（leading zeros）？如何避免把全零（如 '000'）加入有效结果中？",
    answer:
      "可以通过定位第一个非零字符的方法去除前导零：\n1. 从左至右遍历长度为 $n$ 的字符数组，找到第一个不是 `'0'` 的字符的索引位置 `firstNonZero`。\n2. 如果遍历完整个数组都没有找到非 `'0'` 字符（即所有位均为 `'0'`），说明当前生成的数 is 0。由于题目要求打印从 1 开始的数，因此该状态应直接舍弃，不予输出。\n3. 否则，截取从 `firstNonZero` 开始到数组末尾的子串，即为无前导零的有效数字字符串。",
    tags: ["前导零", "字符串切片"],
  },
  {
    id: "coi-print-num-6",
    chapter: "coi-print-numbers",
    level: 3,
    question:
      "使用全排列回溯算法生成并打印所有 $n$ 位大数，其时间复杂度和空间复杂度分别是多少？请说明理由。",
    answer:
      "- **时间复杂度**：$O(10^n)$。因为数字的每一位都有 `'0'` 到 `'9'` 共 10 种选择，共有 $n$ 位，所以递归树的叶子节点数为 $10^n$。在叶子节点处，拼接字符串和去除前导零需要 $O(n)$ 时间，故总时间复杂度为 $O(n \\cdot 10^n)$，通常在分析指数级别算法时简记为 $O(10^n)$。\n- **空间复杂度**：$O(n)$。主要开销为递归调用栈的深度以及用于暂存当前状态的字符数组。递归树的最大深度为 $n$，字符数组的长度也为 $n$，均与 $n$ 呈线性关系。",
    tags: ["复杂度分析", "性能评估"],
  },
  {
    id: "coi-print-num-7",
    chapter: "coi-print-numbers",
    level: 3,
    question:
      "在递归回溯生成数字的过程中，递归栈的最大深度是多少？它是如何被限制在 $n$ 以内的？",
    answer:
      "递归栈的最大深度是 $n$。\n在全排列算法中，我们通过一个参数 `index` 来标识当前正在确定哪一位数字（从第 0 位到第 $n-1$ 位）。每次递归调用时，`index` 递增 1；当 `index === n` 时，说明 $n$ 位数字已填满，达到递归终止条件（Base Case），函数直接返回并回溯。因此，递归调用的深度永远不会超过 $n$。",
    tags: ["递归栈", "边界条件"],
  },
  {
    id: "coi-print-num-8",
    chapter: "coi-print-numbers",
    level: 4,
    question:
      "请给出在 TypeScript 中使用递归回溯（大数版）生成所有最大为 $n$ 位数并输出字符串数组的完整实现代码。",
    answer:
      '```typescript\nfunction printNumbers(n: number): string[] {\n  const res: string[] = [];\n  const path: string[] = Array(n).fill("0");\n\n  function dfs(index: number): void {\n    if (index === n) {\n      // 达到 n 位，定位首个非零字符以去除前导零\n      let firstNonZero = 0;\n      while (firstNonZero < n && path[firstNonZero] === "0") {\n        firstNonZero++;\n      }\n      // 如果不全是 0，截取子串加入结果集中\n      if (firstNonZero < n) {\n        res.push(path.slice(firstNonZero).join(""));\n      }\n      return;\n    }\n\n    for (let i = 0; i <= 9; i++) {\n      path[index] = String(i);\n      dfs(index + 1);\n    }\n  }\n\n  dfs(0);\n  return res;\n}\n```',
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-print-num-9",
    chapter: "coi-print-numbers",
    level: 4,
    question:
      "在进行数字全排列时，如何直接在递归中「剪枝」或直接按顺序构造无前导零的字符串，而不是生成后再做 slice？",
    answer:
      "可以通过**显式枚举数字长度**来实现直接构造无前导零字符串：\n1. 外层循环控制当前生成的数字长度 `len`，从 1 循环到 $n$。\n2. 针对当前长度 `len`，在递归开始时（即确定第 1 位数字时），限制其只能选择 `'1'`-`'9'`，以防止产生首位为 `'0'` 的情况。\n3. 在确定后续的 `len-1` 位数字时，每一位则可以正常选择 `'0'`-`'9'`。\n4. 这样在递归达到 `index === len` 时，直接将字符数组合并为字符串输出即可，天然避免了前导零和全零的过滤开销。",
    tags: ["剪枝优化", "递归设计"],
  },
  {
    id: "coi-print-num-10",
    chapter: "coi-print-numbers",
    level: 4,
    question:
      "如果 $n$ 非常大（例如 $n = 10^5$ 且只需要计算部分片段），递归回溯会导致系统栈溢出（Stack Overflow），应如何解决？",
    answer:
      "在 $n$ 极大时，递归深度 $10^5$ 会大超大多数执行引擎的系统栈限制，必须采用**去递归（De-recursion）**方案：\n1. **非递归大数累加**：使用一个循环来模拟十进制加法，在堆内存中维护字符数组的状态，仅使用 $O(1)$ 的执行栈。\n2. **显式模拟栈**：手动使用一个数组作为栈，显式保存回溯的状态信息（如 `[index, current_digit]` 等），把系统调用栈转移到堆内存中。\n3. **利用 Generator（生成器）分批产出**：在 JavaScript 中，可以使用 `function*` 配合迭代器按需（Lazy Loading）生成大数，或者引入协程/尾递归优化（若环境支持），以减轻内存与调用栈的即时压力。",
    tags: ["栈溢出", "去递归", "Generator"],
  },
];
