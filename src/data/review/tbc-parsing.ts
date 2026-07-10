import { ReviewQuestion } from "./types";

export const tbcParsingQuestions: ReviewQuestion[] = [
  {
    id: "tbc-parsing-1",
    chapter: "tbc-parsing",
    level: 1,
    question: `上下文无关文法（CFG）的四元组是什么？什么是推导和归约？`,
    answer:
      `CFG 四元组 G = (V, T, P, S)：V 是非终结符集合（语法变量），T 是终结符集合（Token），P 是产生式集合（形如 A → α），S 是开始符号。推导（Derivation）：从开始符号出发，反复用产生式右部替换非终结符，直到全部变为终结符。最左推导每次替换最左非终结符（自顶向下），最右推导每次替换最右非终结符（自底向上）。归约（Reduction）是推导的逆过程：从输入串出发，用产生式左部替换右部，直到归约到开始符号。`,
    tags: ["上下文无关文法", "CFG", "推导", "归约"],
  },
  {
    id: "tbc-parsing-2",
    chapter: "tbc-parsing",
    level: 2,
    question: `递归下降和 LR 分析的核心区别是什么？移进-归约是如何工作的？`,
    answer:
      `递归下降（自顶向下）：从开始符号出发，通过最左推导生成输入串，方向是「树根→叶子」。每个非终结符对应一个递归函数，用预测分析决定产生式，需处理左递归与公共前缀。LR 分析（自底向上）：从输入串出发，通过最右归约的逆过程归约到开始符号，方向是「叶子→树根」。移进-归约工作方式：将输入 Token 移进栈顶，当栈顶匹配某产生式右部（句柄）时归约为左部，重复直到栈中只剩开始符号且输入耗尽（接受）。LR 比 LL 表达力更强，能处理左递归。`,
    tags: ["递归下降", "LR 分析", "移进归约", "自顶向下", "自底向上"],
  },
  {
    id: "tbc-parsing-3",
    chapter: "tbc-parsing",
    level: 3,
    question: `LR 分析器家族（LR(0)、SLR(1)、LALR(1)、LR(1)）的递进关系是什么？ML-Yacc 默认用哪个？`,
    answer:
      `LR(0)：不考虑 lookahead，项目集只看圆点位置，冲突最多，表达力最弱。SLR(1)：在 LR(0) 基础上用 FOLLOW 集消解冲突——只有当 lookahead 在归约项的 FOLLOW 集中才归约。LALR(1)：合并同心项目集（LR(1) 项目去掉 lookahead 后相同的集合合并），状态数与 SLR 相同但 lookahead 更精确。LR(1)（规范 LR）：每个项目携带精确 lookahead，表达力最强但状态数可能爆炸。递进关系：LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)。ML-Yacc 默认用 LALR(1)，在状态数和 lookahead 精度之间取得平衡，是工业主流。`,
    tags: ["LR 家族", "LALR(1)", "ML-Yacc", "lookahead"],
  },
  {
    id: "tbc-parsing-4",
    chapter: "tbc-parsing",
    level: 3,
    question: `什么是移进-归约冲突和归约-归约冲突？虎书如何做语法错误恢复？`,
    answer:
      `移进-归约冲突：在某状态下，既可移进下一个 Token 又可归约栈顶句柄，无法确定动作。常见于 if-then-else 悬空 else，默认优先移进使 else 关联最近 if。归约-归约冲突：可用两个不同产生式归约栈顶，通常因文法歧义导致，优先选择先声明的产生式。错误恢复：虎书使用 error 伪终结符——在文法中预设 error 规则（如 exp → error），分析器遇到错误时丢弃输入直到能移进 error，然后从错误状态继续分析，避免一错百错地报告大量级联错误。`,
    tags: ["移进归约冲突", "归约归约冲突", "错误恢复", "error 伪终结符"],
  },
];
