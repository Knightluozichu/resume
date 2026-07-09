import { ReviewQuestion } from "../types";

export const crcParserGeneratorQuestions: ReviewQuestion[] = [
  {
    id: "crc-parser-generator-1",
    chapter: "crc-parser-generator",
    level: 1,
    question: "LL 分析和 LR 分析的核心区别是什么？各自的特点是什么？",
    answer:
      "LL 分析是自顶向下的分析方法：从文法起始符号开始，根据前看符号预测应使用哪条产生式，向下展开构建 AST。特点是需消除左递归，表达能力有限（LL(1) 只能看一个前看符号），但实现简单（递归下降）。LR 分析是自底向上的分析方法：从输入的终结符开始，逐步移进到栈中，当栈顶匹配某条产生式右部时归约为非终结符，直到归约到起始符号。特点是可以处理左递归，表达能力强（LALR(1) 足够实用），但实现复杂。Yacc/Bison 是经典的 LALR(1) 生成器。",
    tags: ["LL分析", "LR分析", "自顶向下", "自底向上", "递归下降"],
  },
  {
    id: "crc-parser-generator-2",
    chapter: "crc-parser-generator",
    level: 2,
    question: "LR 分析的移进-归约机制是什么？以 `id * id` 为例说明完整过程。",
    answer:
      "移进-归约机制：移进（Shift）将输入终结符压入栈；归约（Reduce）当栈顶符号序列匹配某产生式右部时，弹出这些符号并压入左部非终结符。以文法 E→E+T|T, T→T*F|F, F→id 解析 id*id 为例：①移进 id ②归约 F→id（栈: F）③归约 T→F（栈: T）④移进 *（栈: T*）⑤移进 id（栈: T*id）⑥归约 F→id（栈: T*F）⑦归约 T→T*F（栈: T）⑧归约 E→T（栈: E），接受。整个过程从叶节点向上构建语法树。",
    tags: ["移进", "归约", "LR分析", "栈", "产生式"],
  },
  {
    id: "crc-parser-generator-3",
    chapter: "crc-parser-generator",
    level: 3,
    question: "什么是移进-归约冲突？如何消解？",
    answer:
      "移进-归约冲突：在某状态下，分析器既可以选择移进下一个输入符号，也可以选择按某条产生式归约栈顶，两者都合法，分析器无法确定。常见于含 if-then-else（悬空 else）或运算符优先级未明确的文法。消解方法：①优先级声明——为运算符声明优先级和结合性，当冲突涉及运算符时，高优先级选择移进（如 * 高于 +），同优先级按结合性决定（左结合选归约，右结合选移进）②默认规则——Yacc/Bison 默认在冲突时选择移进（可消除大多数悬空 else 问题）。归约-归约冲突（两条产生式都可归约）则按定义顺序选择靠前的，通常说明文法有歧义需修改。",
    tags: ["移进归约冲突", "优先级", "结合性", "歧义文法", "消解"],
  },
  {
    id: "crc-parser-generator-4",
    chapter: "crc-parser-generator",
    level: 2,
    question: "什么是 LALR(1) 分析？为什么 Yacc/Bison 选择 LALR(1) 而非 SLR(1) 或规范 LR(1)？",
    answer:
      "LALR(1)（Look-Ahead LR）是一种介于 SLR(1) 和规范 LR(1) 之间的分析方法。SLR(1) 用文法全局的 Follow 集做归约判断，过于宽松易产生假冲突。规范 LR(1) 为每个状态维护精确的前看符号集，状态数庞大不实用。LALR(1) 将规范 LR(1) 中同核心（相同状态转移）的状态合并，共享前看符号集，状态数与 SLR(1) 相同但归约判断更精确。Yacc/Bison 选择 LALR(1) 是因为它在状态数（实用性）和分析能力（表达能力）之间取得最佳平衡——状态表紧凑，能处理大多数实用文法，且冲突远少于 SLR(1)。",
    tags: ["LALR", "SLR", "规范LR", "前看符号", "Yacc", "Bison"],
  },
];
