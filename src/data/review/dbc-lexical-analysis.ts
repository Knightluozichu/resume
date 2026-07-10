import { ReviewQuestion } from "./types";

export const dbcLexicalAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "dbc-lexical-analysis-1",
    chapter: "dbc-lexical-analysis",
    level: 1,
    question: `词法分析的任务是什么？Token 的结构是怎样的？`,
    answer:
      `词法分析的任务是读入源程序字符流，将其按词法规则分割成有意义的词素（lexeme），并输出 Token 序列。Token 结构为 \`<token-type, lexeme, attribute>\`：token-type 是词法类别（如关键字 IF、标识符 ID、数字 NUM），lexeme 是原始字符串，attribute 是附加信息（如标识符在符号表中的指针）。例如 \`if (x <= 10)\` 经词法分析后输出 \`<IF, if, ->\`, \`<LP, (, ->\`, \`<ID, x, ptr>\`, \`<LE, <=, ->\`, \`<NUM, 10, 10>\`, \`<RP, ), ->\`。`,
    tags: ["词法分析", "Token", "lexeme", "token-type"],
  },
  {
    id: "dbc-lexical-analysis-2",
    chapter: "dbc-lexical-analysis",
    level: 2,
    question: `正则表达式如何转换为有限自动机？NFA 和 DFA 的区别是什么？`,
    answer:
      `转换链：正则表达式 → Thompson 构造法 → NFA → 子集构造法 → DFA → Hopcroft 算法 → 最小化 DFA。NFA（非确定有限自动机）允许 ε 转移和同一输入转移到多个状态，结构直观但运行时需跟踪多个可能状态。DFA（确定有限自动机）对每个 (状态, 输入) 只有唯一转移，无 ε 转移，运行时只需跟踪一个状态，查表 O(1) 转移。DFA 更适合实现扫描器，但状态数可能指数膨胀（最坏 2^n），最小化后可达最简。`,
    tags: ["正则表达式", "NFA", "DFA", "Thompson", "子集构造", "Hopcroft"],
  },
  {
    id: "dbc-lexical-analysis-3",
    chapter: "dbc-lexical-analysis",
    level: 3,
    question: `词法分析器如何处理歧义？最长匹配和优先级规则是如何工作的？`,
    answer:
      `两条核心规则：①最长匹配（Maximal Munch）——扫描器贪心地读入尽可能多的字符，直到不再匹配任何模式。例如输入 \`<=\` 应识别为一个 LE 运算符，而非 \`<\` 和 \`=\` 两个 Token。②优先级规则——当多个模式都能匹配同一 lexeme 时，按声明顺序选择第一个。例如关键字 \`if\` 同时匹配标识符模式 \`[a-zA-Z]+\` 和关键字模式 \`if\`，优先级规则保证识别为关键字而非标识符。Lex 工具中先声明的规则优先级更高。`,
    tags: ["最长匹配", "优先级规则", "歧义处理", "Lex"],
  },
  {
    id: "dbc-lexical-analysis-4",
    chapter: "dbc-lexical-analysis",
    level: 2,
    question: `Lex 工具的工作原理是什么？它如何从正则规范生成可执行的词法分析器？`,
    answer:
      `Lex 接受三段式输入：声明段（正则定义）+ 规则段（模式+动作）+ 代码段（辅助函数）。工作原理：①将每条规则的正则表达式用 Thompson 构造法转为 NFA ②将所有 NFA 合并为一个 NFA（新的开始状态通过 ε 转移连到各规则 NFA 的开始状态）③用子集构造法转为 DFA ④最小化 DFA ⑤生成 C 代码：一个状态转移表 + 一个驱动循环。驱动循环：查表转移状态，到达接受状态时记录匹配的规则和 lexeme 长度，继续尝试最长匹配，最终执行对应规则的 C 动作代码。`,
    tags: ["Lex", "工具链", "NFA合并", "状态转移表", "表驱动"],
  },
];
