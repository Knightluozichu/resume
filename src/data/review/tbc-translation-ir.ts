import { ReviewQuestion } from "../types";

export const tbcTranslationIrQuestions: ReviewQuestion[] = [
  {
    id: "tbc-translation-ir-1",
    chapter: "tbc-translation-ir",
    level: 1,
    question: "Tree IR 有哪些表达式节点和语句节点？",
    answer:
      "表达式节点（求值为值）：CONST(i) 常量、NAME(label) 跳转标签名、TEMP(t) 临时变量/寄存器、BINOP(op, e1, e2) 二元运算、MEM(e) 内存读/写目标、CALL(f, args) 函数调用、ESEQ(stmt, e) 先执行语句再求值。语句节点（无返回值）：MOVE(dst, src) 赋值、EXP(e) 丢弃表达式值、JUMP(exp, labels) 跳转、CJUMP(op, e1, e2, t, f) 条件跳转、SEQ(s1, s2) 语句序列、LABEL(name) 标记跳转目标。表达式树和语句树共同构成 Tree IR。",
    tags: ["Tree IR", "表达式节点", "语句节点", "中间表示"],
  },
  {
    id: "tbc-translation-ir-2",
    chapter: "tbc-translation-ir",
    level: 2,
    question: "Ex / Nx / Cx 三种翻译形式分别是什么？它们之间如何转换？",
    answer:
      "Ex（表达式）：求值为一个值，直接是一棵 Tree 表达式树，如 BINOP(PLUS, a, b)。Nx（语句）：无返回值，仅副作用，如 MOVE(MEM(x), v)。Cx（条件）：根据真假跳转到不同标签，用一个接收真/假标签的函数表示，适合布尔表达式。转换：unEx 把任意形式转成求值表达式——Cx 转 Ex 时生成 CJUMP 把结果存入临时变量；unNx 转成无值语句——Ex 转 Nx 包一层 EXP 丢弃值；unCx 转成条件形式——Ex 转 Cx 时与零比较生成 CJUMP。三种形式让 if/while/短路逻辑能高效翻译。",
    tags: ["Ex", "Nx", "Cx", "翻译形式", "条件跳转"],
  },
  {
    id: "tbc-translation-ir-3",
    chapter: "tbc-translation-ir",
    level: 3,
    question: "ESEQ 节点的作用是什么？为什么翻译阶段会产生它，又为什么需要后续规范化来消除？",
    answer:
      "ESEQ(stmt, e) 表示「先执行 stmt，再把 e 作为值」，允许在表达式内部嵌入副作用。翻译阶段会产生它，是因为有些表达式（如带副作用的函数调用、短路逻辑）在递归翻译时自然地把语句和表达式混合在一起，用 ESEQ 表达最直接。但 ESEQ 让表达式树不再「纯净」——表达式内部夹杂语句，导致求值顺序复杂、子树可能互相影响，不利于后续指令选择（树覆盖）和寄存器分配。所以规范化阶段要消除 ESEQ：把内部 stmt 提升到上层 SEQ，把表达式树重写成不含 ESEQ 的规范形式，让指令选择能干净地做树覆盖。",
    tags: ["ESEQ", "规范化", "求值顺序", "树覆盖"],
  },
  {
    id: "tbc-translation-ir-4",
    chapter: "tbc-translation-ir",
    level: 3,
    question: "控制流结构（if / while / 短路 & |）如何用 Tree IR 翻译？",
    answer:
      "if-then-else：生成真/假标签和结束标签，用 Cx 形式翻译条件——条件为真跳到 then，假跳到 else，两分支结束后都跳到结束标签。while：生成测试标签、体标签、结束标签，测试条件为假则跳结束，为真则执行体再跳回测试。短路求值：&（AND）左操作数为假则短路跳假，否则求右操作数；|（OR）左操作数为真则短路跳真，否则求右操作数。这些都用 Cx 形式（接收真/假标签）串联，避免把布尔值实际存入临时变量，直到真正需要值时才用 unEx 转换。这是 Cx 形式的核心价值。",
    tags: ["控制流", "if while", "短路求值", "Cx", "标签跳转"],
  },
];
