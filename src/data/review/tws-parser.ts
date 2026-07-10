import { ReviewQuestion } from "./types";

export const twsParserQuestions: ReviewQuestion[] = [
  {
    id: "tws-parser-1",
    chapter: "tws-parser",
    level: 1,
    question: `语法分析器（Parser）的作用是什么？它使用什么技术来构建 AST？`,
    answer:
      `语法分析器的作用是将 Token 序列按照语法规则组织成抽象语法树（AST）。Stone 的 Parser 使用 Parser 组合子（Parser Combinator）技术——通过组合小的解析器原语（如 token、or、seq、repeat、option）来构建复杂的语法规则解析器，实现递归下降解析。这种方式比手写递归下降更声明式，代码更简洁，易于扩展。`,
    tags: ["Parser", "组合子", "递归下降", "AST"],
  },
  {
    id: "tws-parser-2",
    chapter: "tws-parser",
    level: 2,
    question: `Parser 组合子的四个基本原语是什么？各自的作用是什么？`,
    answer:
      `四个基本原语：①token(pattern)——匹配指定类型的 Token，成功返回该 Token 节点 ②or(p1, p2, ...)——按序尝试各子 parser，返回第一个成功的结果，实现选择分支 ③seq(p1, p2, ...)——依次匹配全部子 parser，全部成功才返回结果列表，实现序列拼接 ④repeat(p) / option(p)——repeat 匹配零次或多次（循环），option 匹配零次或一次（可选）。通过这四个原语的嵌套组合，可以表达任意复杂的 BNF 文法规则。`,
    tags: ["组合子原语", "or", "seq", "repeat", "option"],
  },
  {
    id: "tws-parser-3",
    chapter: "tws-parser",
    level: 3,
    question: `表达式文法的三层递归结构（expr/term/factor）如何实现运算符优先级？`,
    answer:
      `三层结构：expr → term { (+|-) term }（加减，最低优先级）→ term → factor { (*|/) factor }（乘除，中等优先级）→ factor → NUMBER | (expr) | -factor（最高优先级）。优先级通过嵌套层次实现：层次越深优先级越高。解析 expr 时先解析 term，term 内先解析 factor。这样 \`3 + 4 * 5\` 会被解析为 \`3 + (4 * 5)\`，因为 \`*\` 在更深的 term 层先被解析。括号表达式 \`(expr)\` 回到最外层，实现优先级覆盖。`,
    tags: ["运算符优先级", "expr", "term", "factor", "文法层次"],
  },
  {
    id: "tws-parser-4",
    chapter: "tws-parser",
    level: 2,
    question: `repeat 组合子是如何实现左结合运算的？以 \`1 - 2 - 3\` 为例说明。`,
    answer:
      `repeat 组合子循环匹配 \`(- term)\` 部分，每次循环将当前结果作为左操作数与新的右操作数组合。以 \`1 - 2 - 3\` 为例：第一次匹配 term 得到 1，然后 repeat 循环第一次匹配到 \`- 2\`，生成 BinaryExpr(-, 1, 2)；循环第二次匹配到 \`- 3\`，生成 BinaryExpr(-, BinaryExpr(-, 1, 2), 3)。最终 AST 结构为 (1-2)-3，即左结合。如果用右递归则会得到 1-(2-3) 即右结合，结果不同。`,
    tags: ["左结合", "repeat", "BinaryExpr", "运算符结合性"],
  },
];
