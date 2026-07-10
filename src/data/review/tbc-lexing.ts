import { ReviewQuestion } from "./types";

export const tbcLexingQuestions: ReviewQuestion[] = [
  {
    id: "tbc-lexing-1",
    chapter: "tbc-lexing",
    level: 1,
    question: `词法分析的任务是什么？Token 的结构是怎样的？`,
    answer:
      `词法分析是编译器的第一个阶段，读入源程序字符流，按词法规则分割成有意义的词素（lexeme），并为每个词素生成一个 Token。Token 结构为 \`<token-type, lexeme, attribute>\`：token-type 是词法类别（如关键字 LET、标识符 ID、整数 INT），lexeme 是原始字符串，attribute 是附加信息（如标识符在符号表中的指针）。例如 Tiger 源码 \`let x := 1\` 经词法分析输出 LET、ID(x)、ASSIGN、INT(1) 等 Token。`,
    tags: ["词法分析", "Token", "lexeme", "Tiger"],
  },
  {
    id: "tbc-lexing-2",
    chapter: "tbc-lexing",
    level: 2,
    question: `正则表达式如何转换为有限自动机？NFA 和 DFA 的区别是什么？`,
    answer:
      `转换链：正则表达式 → Thompson 构造法 → NFA → 子集构造法 → DFA → Hopcroft 算法 → 最小化 DFA。NFA（非确定有限自动机）允许 ε 转移和同一输入转移到多个状态，结构直观但运行需跟踪多个可能状态。DFA（确定有限自动机）对每个 (状态, 输入) 只有唯一转移，无 ε 转移，运行时只需跟踪一个状态，查表 O(1) 转移。DFA 更适合实现扫描器，但状态数可能指数膨胀，最小化后可达最简。`,
    tags: ["正则表达式", "NFA", "DFA", "Thompson 构造", "子集构造"],
  },
  {
    id: "tbc-lexing-3",
    chapter: "tbc-lexing",
    level: 2,
    question: `词法分析器如何处理歧义？最长匹配和优先级规则如何工作？`,
    answer:
      `两条核心规则：①最长匹配（Maximal Munch）——扫描器贪心地读入尽可能多的字符，直到不再匹配任何模式。例如输入 \`<=\` 应识别为一个 LE 运算符，而非 \`<\` 和 \`=\` 两个 Token。②优先级规则——当多个模式都能匹配同一 lexeme 时，按声明顺序选择第一个。例如关键字 \`if\` 同时匹配标识符模式 \`[a-zA-Z]+\` 和关键字模式 \`if\`，优先级规则保证识别为关键字而非标识符。ML-Lex 中先声明的规则优先级更高。`,
    tags: ["最长匹配", "优先级规则", "歧义处理"],
  },
  {
    id: "tbc-lexing-4",
    chapter: "tbc-lexing",
    level: 3,
    question: `ML-Lex 工具的工作原理是什么？它如何从正则规范生成可执行的词法分析器？`,
    answer:
      `ML-Lex 接受三段式输入：声明段（正则定义）+ 规则段（模式+动作）+ 代码段（辅助函数）。工作原理：①将每条规则的正则表达式用 Thompson 构造法转为 NFA ②将所有 NFA 合并为一个 NFA——新起始状态经 ε 转移连到各规则的起始态 ③用子集构造法转为 DFA ④最小化 DFA ⑤生成代码：一个状态转移表 + 一个驱动循环。驱动循环查表转移状态，到达接受态时记录匹配的规则和 lexeme 长度，继续尝试最长匹配，最终执行对应规则的动作代码。Tiger 还要求支持嵌套注释。`,
    tags: ["ML-Lex", "扫描器生成", "表驱动", "工程实现"],
  },
];
