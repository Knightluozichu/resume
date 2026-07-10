import { ReviewQuestion } from "./types";

export const dbcSyntaxAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "dbc-syntax-analysis-1",
    chapter: "dbc-syntax-analysis",
    level: 1,
    question: `上下文无关文法（CFG）的四元组是什么？什么是推导和归约？`,
    answer:
      `CFG 四元组 G = (V, T, P, S)：V 是非终结符集合（语法变量），T 是终结符集合（Token），P 是产生式集合（形如 A → α），S 是开始符号。推导（Derivation）：从开始符号出发，反复用产生式右部替换非终结符，直到全部变为终结符。最左推导每次替换最左非终结符（LL 分析），最右推导每次替换最右非终结符（LR 分析）。归约（Reduction）是推导的逆过程：从输入串出发，用产生式左部替换右部，直到归约到开始符号。`,
    tags: ["CFG", "四元组", "推导", "归约", "产生式"],
  },
  {
    id: "dbc-syntax-analysis-2",
    chapter: "dbc-syntax-analysis",
    level: 2,
    question: `自顶向下分析和自底向上分析的核心区别是什么？LL 和 LR 分别代表什么？`,
    answer:
      `自顶向下分析：从开始符号出发，通过最左推导尝试生成输入串，方向是「树根→叶子」。代表是 LL 分析（Left-to-right scan, Leftmost derivation），需消除左递归、提取公共左因子，用 FIRST/FOLLOW 集构造预测分析表。自底向上分析：从输入串出发，通过最右归约逆过程尝试归约到开始符号，方向是「叶子→树根」。代表是 LR 分析（Left-to-right scan, Rightmost derivation reverse），用移进-归约操作，构建项目集族和 ACTION-GOTO 表。LR 比 LL 表达力更强（能处理更多文法），但实现更复杂。`,
    tags: ["自顶向下", "自底向上", "LL", "LR", "移进归约"],
  },
  {
    id: "dbc-syntax-analysis-3",
    chapter: "dbc-syntax-analysis",
    level: 3,
    question: `LR 分析器家族（LR(0)、SLR(1)、LALR(1)、LR(1)）的区别和递进关系是什么？`,
    answer:
      `LR(0)：不考虑 lookahead，项目集只看 LR(0) 项目（圆点位置），冲突最多，表达力最弱。SLR(1)：在 LR(0) 基础上用 FOLLOW 集消解冲突——只有当 lookahead 在归约项的 FOLLOW 集中才归约，简单但不够精确。LALR(1)：合并同心项目集（LR(1) 项目去掉 lookahead 后相同的集合合并），状态数与 SLR 相同但 lookahead 更精确，是 Yacc 的默认选择，工业主流。LR(1)（规范 LR）：每个项目携带精确 lookahead，表达力最强，但状态数可能爆炸。递进关系：LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)，表达力递增，状态数递增。`,
    tags: ["LR(0)", "SLR(1)", "LALR(1)", "LR(1)", "FOLLOW集", "同心集", "Yacc"],
  },
  {
    id: "dbc-syntax-analysis-4",
    chapter: "dbc-syntax-analysis",
    level: 2,
    question: `什么是移进-归约冲突和归约-归约冲突？如何解决？`,
    answer:
      `移进-归约冲突（Shift-Reduce Conflict）：在某状态下，既可移进下一个 Token 又可归约栈顶句柄，无法确定动作。常见于 if-then-else 悬空 else（既可移进 else 关联内层 if，又可归约结束外层 if）。解决：默认优先移进（Yacc 规则），或改写文法。归约-归约冲突（Reduce-Reduce Conflict）：在某状态下，可用两个不同产生式归约栈顶，无法确定用哪个。通常因文法歧义导致。解决：优先选择先声明的产生式（Yacc 规则），或消除文法歧义。LALR(1) 通过精确 lookahead 减少冲突，是工业实践的主流选择。`,
    tags: ["移进归约冲突", "归约归约冲突", "歧义文法", "Yacc", "LALR"],
  },
];
