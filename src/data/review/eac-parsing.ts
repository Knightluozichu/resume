import { ReviewQuestion } from "./types";

export const eacParsingQuestions: ReviewQuestion[] = [
  {
    id: "eac-parsing-1",
    chapter: "eac-parsing",
    level: 2,
    question: `LL 分析和 LR 分析的区别是什么？各自的自顶向下/自底向上是如何工作的？`,
    answer:
      `LL 分析（自顶向下）：从起始符号 S 出发，预测使用哪条产生式来展开最左非终结符，逐步推导出输入串。LL(k) 表示向前看 k 个 Token 来决策。典型实现是递归下降和预测分析表，需计算 FIRST 集。弱点是不能处理左递归文法（会无限递归）。LR 分析（自底向上）：从输入串出发，通过移进（Shift，读入 Token 压栈）和归约（Reduce，栈顶匹配某产生式右部时替换为左部）操作，逐步归约到起始符号 S。LR(k) 向前看 k 个 Token 决定移进还是归约。典型实现是移进-归约分析器和 LR 分析表，能力递增：LR(0)→SLR(1)→LALR(1)→LR(1)。LR 能处理左递归，表达力更强，是 yacc/bison 等工具的基础。`,
    tags: ["LL分析", "LR分析", "自顶向下", "自底向上", "递归下降", "移进归约"],
  },
  {
    id: "eac-parsing-2",
    chapter: "eac-parsing",
    level: 3,
    question: `移进-归约分析中的「移进-归约冲突」和「归约-归约冲突」是什么？如何消除？`,
    answer:
      `移进-归约冲突（Shift-Reduce Conflict）：栈顶内容既可移进下一个 Token，也可按某条产生式归约，分析器无法确定该做哪个。归约-归约冲突（Reduce-Reduce Conflict）：栈顶内容同时匹配两条不同产生式的右部，分析器无法确定按哪条归约。消除方法：①增加向前看符号数（LR(0)→SLR(1)→LALR(1)→LR(1)），利用 FOLLOW 集或精确 lookahead 消除歧义 ②改写文法消除歧义（如提取左因子、消除二义性）③设置优先级和结合性声明（如 yacc 的 %prec、%left、%right），让分析器在冲突时按优先级决策 ④LALR(1) 是工程上的实用折中：状态数接近 SLR(1) 但分析能力接近 LR(1)，yacc/bison 默认生成 LALR(1)。`,
    tags: ["移进归约冲突", "归约归约冲突", "LALR", "优先级", "歧义消除"],
  },
  {
    id: "eac-parsing-3",
    chapter: "eac-parsing",
    level: 2,
    question: `LR 分析器的能力层次 LR(0) → SLR(1) → LALR(1) → LR(1) 有什么区别？`,
    answer:
      `LR(0)：不向前看任何符号，仅凭当前状态决定动作。最弱，冲突最多，实际很少直接使用。SLR(1)（Simple LR）：在 LR(0) 基础上，归约时检查当前向前看符号是否在被归约非终结符的 FOLLOW 集中，能消除部分 LR(0) 的冲突。LALR(1)（Look-Ahead LR）：合并 LR(1) 项目集中「核心相同但 lookahead 不同」的状态，状态数与 SLR(1) 相当，但归约决策更精确（用每个状态独立的 lookahead 而非全局 FOLLOW 集）。是 yacc/bison 的默认算法，工程上最常用。LR(1)（规范 LR）：最精确，每个状态有完整的 lookahead 信息，能力最强，但状态数可能爆炸（指数级增长）。四者能力递增、状态数递增：LR(0) < SLR(1) ≤ LALR(1) < LR(1)。`,
    tags: ["LR(0)", "SLR(1)", "LALR(1)", "LR(1)", "FOLLOW集", "lookahead"],
  },
  {
    id: "eac-parsing-4",
    chapter: "eac-parsing",
    level: 1,
    question: `什么是左递归文法？为什么 LL 分析不能处理左递归？如何消除？`,
    answer:
      `左递归文法：产生式形如 \`A → A α\`（直接左递归）或经多步推导形成 \`A ⇒+ A α\`（间接左递归），即非终结符 A 的最左推导又回到 A 自身。LL 分析不能处理左递归的原因：LL 自顶向下展开最左非终结符时，遇到 \`A → A α\` 会再次展开 A，形成无限递归，永远无法匹配输入。消除直接左递归的方法：改写为右递归——将 \`A → A α | β\` 改写为 \`A → β A'\` 和 \`A' → α A' | ε\`，用引入新非终结符 A' 将左递归转为尾递归（等价于循环）。间接左递归需先求出所有非终结符的推导闭包，再统一消除。消除后文法与原文法等价（生成同一语言），但可被 LL 分析器处理。`,
    tags: ["左递归", "LL分析", "文法改写", "右递归", "消除左递归"],
  },
];
