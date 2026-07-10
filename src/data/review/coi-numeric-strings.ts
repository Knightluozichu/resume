import type { ReviewQuestion } from "./types";

export const coiNumericStringsQuestions: ReviewQuestion[] = [
  {
    id: "coi-numstr-1",
    chapter: "coi-numeric-strings",
    level: 1,
    question: `在『表示数值的字符串』问题中，如果使用确定有限状态自动机（DFA）求解，通常定义哪些状态？`,
    answer:
      `通常定义以下 10 个状态来完整表达该词法分析过程：\n1. \`Start\`（状态 0）：起始空格或初始状态。\n2. \`Sign\`（状态 1）：数字前的正负号（\`+\` 或 \`-\`）。\n3. \`Integer\`（状态 2）：小数点前的整数部分。\n4. \`DotWithoutInt\`（状态 3）：左侧无整数的小数点（如 \`.2\` 中的小数点）。\n5. \`DotWithInt\`（状态 4）：左侧有整数的小数点（如 \`1.\` 中的小数点）。\n6. \`Decimal\`（状态 5）：小数点后的分数（小数）部分。\n7. \`Exponent\`（状态 6）：指数标志字符（\`e\` 或 \`E\`）。\n8. \`ExpSign\`（状态 7）：指数部分的正负号。\n9. \`ExpInteger\`（状态 8）：指数部分的整数。\n10. \`EndSpace\`（状态 9）：数值末尾的空格。`,
    tags: ["状态机", "DFA", "状态定义"],
  },
  {
    id: "coi-numstr-2",
    chapter: "coi-numeric-strings",
    level: 1,
    question: `在数值字符串 DFA 中，输入字符可分为哪几类？它们如何驱动状态机的状态转移？`,
    answer:
      `输入字符可归纳为以下 5 类：\n- **空格 (\`' '\`)**：驱动 \`Start -> Start\`，或任意有效结束状态 \`-> EndSpace\`，以及 \`EndSpace -> EndSpace\`。\n- **符号 (\`'+'\`, \`'-'\`)**：驱动 \`Start -> Sign\`，或 \`Exponent -> ExpSign\`。\n- **数字 (\`'0'-'9'\`)**：驱动各数值状态，如 \`Sign/Start -> Integer\`，\`DotWithoutInt/DotWithInt -> Decimal\`，\`ExpSign/Exponent -> ExpInteger\` 等。\n- **小数点 (\`'.'\`)**：驱动 \`Start/Sign -> DotWithoutInt\`，或 \`Integer -> DotWithInt\`。\n- **指数符号 (\`'e'\`, \`'E'\`)**：从有效实数状态（\`Integer\`、\`DotWithInt\`、\`Decimal\`）转移至 \`Exponent\`。`,
    tags: ["字符分类", "状态转移"],
  },
  {
    id: "coi-numstr-3",
    chapter: "coi-numeric-strings",
    level: 2,
    question: `如何用 DFA 区分十进制数（Decimal）和指数形式（Exponent）？二者的转移路径有何异同？`,
    answer:
      `十进制数和指数形式的区分在 DFA 中通过转移状态的拓扑顺序体现：\n- **十进制数**：其核心路径包含整数部分或小数部分（如 \`Integer -> DotWithInt -> Decimal\` 或 \`DotWithoutInt -> Decimal\`）。一旦进入这些状态中的任意一个，字符串即为合法的十进制数。\n- **指数形式**：必须先经过一个合法的十进制数状态，然后再接收 \`e\` 或 \`E\` 进入 \`Exponent\` 状态。这意味着指数必须建立在有效的基数之上（如 \`1.2e\`）。之后，还必须紧跟指数整数（经过 \`ExpSign\` 后到达 \`ExpInteger\`）以形成完整合法的指数表达。DFA 确保了只有到达 \`ExpInteger\`（或其后的 \`EndSpace\`）才算匹配成功。`,
    tags: ["状态转移", "科学计数法", "词法分析"],
  },
  {
    id: "coi-numstr-4",
    chapter: "coi-numeric-strings",
    level: 2,
    question: `在验证数值字符串时，为什么单独的 \`'1e'\` 或 \`'1e+1.2'\` 是非法的？DFA 是如何识别这类错误的？`,
    answer:
      `它们是非法的，因为：\n1. \`'1e'\` 缺少指数部分的整数。DFA 从 \`Integer\` 读入 \`e\` 后到达 \`Exponent\`（非有效结束状态），此时字符串结束，DFA 不处于接收状态，判定为非法。\n2. \`'1e+1.2'\` 包含小数形式的指数（指数必须是整数）。DFA 在 \`ExpSign\` 后接收数字到达 \`ExpInteger\`，随后遇到小数点 \`.\`，但 \`ExpInteger\` 状态在遇到 \`.\` 时没有定义的合法转移，因此状态机将直接进入 \`Rejected\` 状态（转移表查不到对应项），从而判定为非法。`,
    tags: ["错误处理", "状态校验", "科学计数法"],
  },
  {
    id: "coi-numstr-5",
    chapter: "coi-numeric-strings",
    level: 3,
    question: `在数值字符串中，为什么 \`'1.'\` 和 \`'.1'\` 是合法的，而单独的 \`'.'\` 是非法的？DFA 如何精细控制这两种情况？`,
    answer:
      `在规范中，数值必须至少包含一位数字，因此：\n- **\`'1.'\`（左侧有数字）**：DFA 路径为 \`Start\` $\\to$ \`Integer(1)\` $\\to$ \`DotWithInt\`。由于 \`DotWithInt\` 被设为有效结束状态，因此它是合法的。\n- **\`'.1'\`（右侧有数字）**：DFA 路径为 \`Start\` $\\to$ \`DotWithoutInt\` $\\to$ \`Decimal(1)\`。\`Decimal\` 为有效结束状态，因此合法。\n- **\`'.'\`（无数字）**：DFA 路径为 \`Start\` $\\to$ \`DotWithoutInt\`。由于 \`DotWithoutInt\` 不是有效结束状态，且没有后续数字驱动其转移至 \`Decimal\`，因此直接判定为非法。\n这种通过区分 \`DotWithoutInt\` 和 \`DotWithInt\` 两个独立状态的设计，实现了对小数点前后数字存在性的精细控制。`,
    tags: ["小数点", "词法分支", "边界校验"],
  },
  {
    id: "coi-numstr-6",
    chapter: "coi-numeric-strings",
    level: 2,
    question: `数值字符串中可能存在首尾空格（如 \`'  +1.2  '\`），DFA 是如何处理这些空格，并防止空格出现在数值中间的？`,
    answer:
      `DFA 通过两个不同的空格状态进行隔离处理：\n1. **前导空格**：由 \`Start\` 状态自环（\`Start -- space --> Start\`）来吞掉所有开头的空格，一旦进入非空格状态（如符号、数字、小数点），就永远无法再回到 \`Start\` 状态。\n2. **尾随空格**：只有在到达任意一个有效的数值结束状态（如 \`Integer\`、\`DotWithInt\`、\`Decimal\`、\`ExpInteger\`）时，才可以接收空格转移到 \`EndSpace\` 状态。\`EndSpace\` 状态自环接收空格。如果在 \`EndSpace\` 状态下接收到任何非空格字符，由于没有定义转移，DFA 会立即进入拒绝状态。\n通过这种非对称的空格状态设计，DFA 保证了空格只能位于字符串的最前端或最末端，数值中间的空格会导致状态机失效。`,
    tags: ["空格处理", "状态机设计"],
  },
  {
    id: "coi-numstr-7",
    chapter: "coi-numeric-strings",
    level: 3,
    question: `在没有使用完整 DFA 的简化扫描法中，我们需要手动处理哪些恶劣的边界条件（Corner Cases）？`,
    answer:
      `如果不使用 DFA，使用常规条件分支扫描，必须小心翼翼地处理以下 corner cases，极易漏判：\n- **空串或纯空格**：如 \`''\` 或 \`'   '\`，需要提前拦截，确保至少有一位数字。\n- **无数字的符号/小数点**：如 \`'+'\`、\`'-'\`、\`'.'\`，必须防止被误判为数值。\n- **指数符号的多重错误**：如 \`'e'\`、\`'1e'\`（无指数）、\`'1e+'\`（有指数符号无数字）、\`'e9'\`（无基数）、\`'1e6e7'\`（多个指数符号）。\n- **符号位置错误**：如 \`'1+2'\`，正负号只能出现在开头或紧跟在 \`e/E\` 后面。\nDFA 的优势在于将这些零散的条件分支统一合并到了状态转移矩阵中，无需在代码里写大量嵌套的 \`if-else\` 判断。`,
    tags: ["边界条件", "算法对比", "鲁棒性"],
  },
  {
    id: "coi-numstr-8",
    chapter: "coi-numeric-strings",
    level: 3,
    question: `请分析基于 DFA 校验数值字符串的算法在时间和空间上的复杂度，并说明原因。`,
    answer:
      `设输入字符串的长度为 $N$：\n- **时间复杂度为 $O(N)$**：因为我们只需要对字符串进行单次线性扫描。对于每个字符，我们只需在 $O(1)$ 的时间内通过查表（或 \`switch-case\`）确定下一个状态。因此，总时间与字符串长度成正比，为 $O(N)$。\n- **空间复杂度为 $O(1)$**：因为状态机的状态数量是固定的（10 个状态），状态转移表的大小也是常数。在运行过程中，只需要存储当前的 \`state\` 变量和遍历的索引，不需要任何与输入规模相关的辅助空间，因此空间复杂度为 $O(1)$。`,
    tags: ["复杂度分析", "时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-numstr-9",
    chapter: "coi-numeric-strings",
    level: 3,
    question: `除了 DFA 方法之外，另一种常见的『分治扫描法』是如何实现的？它的优缺点是什么？`,
    answer:
      `**分治扫描法**的思路是利用指数符号 \`e/E\` 将字符串分割为**基数部分**和**指数部分**：\n1. 基数部分：可以是整数或小数（允许正负号，但必须有数字，且小数点前后至少一侧有数字）。\n2. 指数部分：必须是纯整数（允许正负号，不能有小数点，必须有数字）。\n\n**优缺点分析**：\n- **优点**：逻辑直观，符合人类阅读数学公式的直觉。在支持内置正则或字符串分割函数的语言中，代码可能较短。\n- **缺点**：边界处理极多，代码容易写得细碎繁琐。例如，分割时要考虑 \`e\` 出现多次、首尾空格的去除、以及基数部分为 \`.\` 或 \`.e\` 等异常情况。相比之下，DFA 虽然状态设计需要深思熟虑，但一旦写好转移表，代码极为稳健且极易维护与扩展。`,
    tags: ["分治算法", "双指针", "算法对比"],
  },
  {
    id: "coi-numstr-10",
    chapter: "coi-numeric-strings",
    level: 4,
    question: `请给出在 TypeScript 中，使用 DFA 转移表（Map 或二维数组）实现数值字符串校验的完整规范代码。`,
    answer:
      `\`\`\`typescript\nfunction isNumber(s: string): boolean {\n  // 定义状态字符分类\n  type CharType = 'space' | 'sign' | 'digit' | 'dot' | 'exponent' | 'other';\n\n  function getCharType(ch: string): CharType {\n    if (ch === ' ') return 'space';\n    if (ch === '+' || ch === '-') return 'sign';\n    if (ch >= '0' && ch <= '9') return 'digit';\n    if (ch === '.') return 'dot';\n    if (ch === 'e' || ch === 'E') return 'exponent';\n    return 'other';\n  }\n\n  // 定义 DFA 转移表\n  // 状态：0: Start, 1: Sign, 2: Integer, 3: DotWithoutInt, 4: DotWithInt,\n  //       5: Decimal, 6: Exponent, 7: ExpSign, 8: ExpInteger, 9: EndSpace\n  const transferTable: Record<number, Partial<Record<CharType, number>>> = {\n    0: { space: 0, sign: 1, digit: 2, dot: 3 },\n    1: { digit: 2, dot: 3 },\n    2: { digit: 2, dot: 4, exponent: 6, space: 9 },\n    3: { digit: 5 },\n    4: { digit: 5, exponent: 6, space: 9 },\n    5: { digit: 5, exponent: 6, space: 9 },\n    6: { sign: 7, digit: 8 },\n    7: { digit: 8 },\n    8: { digit: 8, space: 9 },\n    9: { space: 9 }\n  };\n\n  // 合法的接收状态（有效结束状态）\n  const validEndStates = new Set([2, 4, 5, 8, 9]);\n\n  let state = 0;\n  for (let i = 0; i < s.length; i++) {\n    const type = getCharType(s[i]);\n    const nextState = transferTable[state]?.[type];\n    if (nextState === undefined) {\n      return false; // 无法转移，说明是非法输入\n    }\n    state = nextState;\n  }\n\n  return validEndStates.has(state);\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "DFA", "状态机"],
  },
];
