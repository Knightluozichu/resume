import { ReviewQuestion } from "../types";

export const twsLexerQuestions: ReviewQuestion[] = [
  {
    id: "tws-lexer-1",
    chapter: "tws-lexer",
    level: 1,
    question: "词法分析器（Lexer）的作用是什么？输入和输出分别是什么？",
    answer:
      "词法分析器的作用是将源代码字符串分割成 Token 序列。输入是 Stone 源代码文本（逐行读取），输出是 Token 对象列表。每个 Token 包含文本内容和行号信息。Lexer 是解释器的前端第一步，为后续的语法分析器提供结构化的输入。",
    tags: ["Lexer", "Token", "词法分析"],
  },
  {
    id: "tws-lexer-2",
    chapter: "tws-lexer",
    level: 2,
    question: "Stone 的 Token 有哪些类型？各自的正则匹配规则是什么？",
    answer:
      "四种 Token 类型：①标识符（Identifier）—— `[A-Za-z_][A-Za-z0-9_]*`，匹配变量名和关键字 ②整数字面量（Integer）—— `[0-9]+` ③字符串字面量（String）—— `\"(\\\\\"|\\\\\\\\|\\\\n|[^\"])*\"`，支持转义 ④运算符（Operator）—— `==|<=|>=|&&|\\|\\||\\p{Punct}`，包含多字符运算符和单字符标点。此外正则还匹配行注释 `//.*` 和前导空白 `\\s*`，这两种匹配结果不生成 Token。",
    tags: ["Token类型", "正则表达式", "标识符"],
  },
  {
    id: "tws-lexer-3",
    chapter: "tws-lexer",
    level: 3,
    question: "Lexer 是如何处理注释和空白的？为什么每个 Token 要携带行号？",
    answer:
      "Lexer 的正则表达式中包含注释组 `(//.*)` 和空白组 `\\s*`。每次匹配后检查匹配到的组：如果是注释或空白（空字符串），则跳过不生成 Token，继续匹配下一个。行号的作用是错误定位——当后续语法分析或运行时发生错误时，可以通过 Token 携带的行号精确定位到源代码中的出错位置，给用户清晰的错误提示。这是编译器前端的基本设计。",
    tags: ["注释处理", "行号", "错误定位"],
  },
  {
    id: "tws-lexer-4",
    chapter: "tws-lexer",
    level: 2,
    question: "多字符运算符（如 `==`、`<=`、`&&`）在正则中为什么要放在单字符标点之前？",
    answer:
      "正则表达式按从左到右的顺序尝试匹配。如果 `\\p{Punct}`（匹配单个标点符号）放在 `==`、`<=` 等多字符运算符之前，那么遇到 `==` 时会先匹配到第一个 `=`，将其作为单独的 Token 返回，第二个 `=` 再单独匹配，导致 `==` 被拆成两个 `=` Token。把多字符运算符放在前面，正则引擎会优先匹配更长的模式，确保 `==` 被正确识别为一个 Token。这是词法分析中「最长匹配」原则的体现。",
    tags: ["多字符运算符", "正则匹配顺序", "最长匹配"],
  },
];
