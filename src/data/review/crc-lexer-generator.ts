import { ReviewQuestion } from "./types";

export const crcLexerGeneratorQuestions: ReviewQuestion[] = [
  {
    id: "crc-lexer-generator-1",
    chapter: "crc-lexer-generator",
    level: 1,
    question: `词法分析生成器的核心流程是什么？正则表达式如何变成可执行的词法分析器？`,
    answer:
      `核心流程：正则表达式 → NFA（Thompson 构造）→ DFA（子集构造）→ 最小化 DFA → 词法分析器代码。正则表达式描述 Token 的词法模式，通过 Thompson 构造法转为非确定有限自动机（NFA），再用子集构造法转为确定有限自动机（DFA），最后通过 Hopcroft 算法最小化 DFA 状态数。最终的 DFA 可直接编码为状态转移表，驱动词法分析器逐字符消费输入并输出 Token。工具如 Lex/Flex 自动完成这一流程。`,
    tags: ["词法分析", "正则表达式", "NFA", "DFA", "Thompson构造"],
  },
  {
    id: "crc-lexer-generator-2",
    chapter: "crc-lexer-generator",
    level: 2,
    question: `NFA 和 DFA 的区别是什么？子集构造法如何将 NFA 转为 DFA？`,
    answer:
      `NFA（非确定有限自动机）允许同一状态对同一输入有多条转移边，且可有 ε（空转移）边，需要维护状态集合并做回溯或并行模拟。DFA（确定有限自动机）每个状态对每个输入最多一条转移边，无 ε 边，单步即可确定下一状态，运行效率更高。子集构造法：将 NFA 中能通过 ε 闭包到达的状态集合视为 DFA 的一个状态，对每个输入符号计算该集合的转移后再做 ε 闭包，得到新的状态集合作为 DFA 的下一状态。最终每个 DFA 状态对应一个 NFA 状态子集。`,
    tags: ["NFA", "DFA", "子集构造", "ε闭包", "确定性"],
  },
  {
    id: "crc-lexer-generator-3",
    chapter: "crc-lexer-generator",
    level: 3,
    question: `词法分析器的最长匹配（Maximal Munch）和优先级规则是什么？为什么需要它们？`,
    answer:
      `最长匹配规则：词法分析器总是消费尽可能多的字符来形成一个 Token。例如输入 == 时，应匹配为一个 == Token 而非两个 = Token。优先级规则：当一个输入能匹配多条规则时（如 if 既能匹配关键字规则 if|else|while 也能匹配标识符规则 [a-zA-Z]+），按规则定义顺序选择靠前的。需要这两条规则是因为正则表达式本身没有优先级和贪婪语义——多个模式可能同时匹配同一段输入，必须有确定的消歧策略保证词法分析结果的唯一性和正确性。`,
    tags: ["最长匹配", "优先级", "Token", "消歧", "Maximal Munch"],
  },
  {
    id: "crc-lexer-generator-4",
    chapter: "crc-lexer-generator",
    level: 2,
    question: `常见的 Token 类型有哪些？各自用什么样的正则模式匹配？`,
    answer:
      `常见 Token 类型：①KEYWORD（关键字）——用枚举模式匹配，如 if|else|while|return ②IDENT（标识符）——[a-zA-Z_][a-zA-Z0-9_]*，字母/下划线开头后跟字母数字下划线 ③NUMBER（数字字面量）——[0-9]+ 匹配整数，扩展可匹配浮点数 [0-9]+.[0-9]+ ④OP（运算符）——+|-|*|/|=|==，需注意多字符运算符优先于单字符 ⑤STRING（字符串）——\"[^\"]*\" 匹配引号内内容 ⑥COMMENT（注释）——通常被丢弃不输出 Token。每类 Token 携带类型标签和原始文本值。`,
    tags: ["Token类型", "正则模式", "KEYWORD", "IDENT", "NUMBER"],
  },
];
