import { ReviewQuestion } from "./types";

export const twsAstQuestions: ReviewQuestion[] = [
  {
    id: "tws-ast-1",
    chapter: "tws-ast",
    level: 1,
    question: `抽象语法树（AST）的作用是什么？Stone 中 AST 的两个基本类是什么？`,
    answer:
      `AST 的作用是将以线性序列组织的 Token 转化为反映语法结构的树形数据结构，是前端（词法/语法分析）与后端（求值执行）之间的数据桥梁。Stone 中 AST 的两个基本类：ASTList（列表容器，持有多个子节点）和 ASTLeaf（叶子节点，持有一个 Token）。所有 AST 节点都继承自抽象基类 ASTNode，ASTNode 提供统一的接口（如 location、toString、accept）。`,
    tags: ["AST", "ASTList", "ASTLeaf", "ASTNode"],
  },
  {
    id: "tws-ast-2",
    chapter: "tws-ast",
    level: 2,
    question: `Stone 的 AST 节点分为哪两大类？各包含哪些具体节点类型？`,
    answer:
      `两大类：①表达式节点（Expression）—— 有返回值，包括 NumberLiteral（整数字面量）、StringLiteral（字符串字面量）、Name（变量引用）、BinaryExpr（二元运算）、PrimaryExpr（括号表达式）、NegativeExpr（负号运算）②语句节点（Statement）—— 无返回值（返回 null），包括 IfStmnt（条件分支）、WhileStmnt（循环）、BlockStmnt（语句块）、NullStmnt（空语句）。表达式节点和语句节点都继承自 ASTList。`,
    tags: ["表达式节点", "语句节点", "NumberLiteral", "BinaryExpr", "IfStmnt"],
  },
  {
    id: "tws-ast-3",
    chapter: "tws-ast",
    level: 3,
    question: `访问者模式（Visitor Pattern）在 AST 中如何实现双重分派？为什么需要双重分派？`,
    answer:
      `双重分派实现：①ASTNode 子类实现 accept(Visitor v) 方法，方法体内调用 v.visit(this)——这是第一次分派（根据 this 的运行时类型选择正确的 accept）②Visitor 接口为每种 AST 节点类型定义重载的 visit 方法，v.visit(this) 时编译器根据 this 的静态类型选择重载——但由于在 accept 中 this 的动态类型已确定，所以能调用正确的 visit 重载——这是第二次分派。需要双重分派是因为 Java 是单分派语言（只根据接收者类型分派，不根据参数类型分派），单次调用 v.visit(node) 无法根据 node 的实际类型选择重载。`,
    tags: ["访问者模式", "双重分派", "accept", "Visitor"],
  },
  {
    id: "tws-ast-4",
    chapter: "tws-ast",
    level: 2,
    question: `表达式 \`(3 + 4) * 5\` 的 AST 结构是什么样的？`,
    answer:
      `AST 结构：根节点 BinaryExpr(运算符 \`*\`)，左子树 BinaryExpr(运算符 \`+\`)，右子树 NumberLiteral(5)。左子树 BinaryExpr(+) 的左子树是 NumberLiteral(3)，右子树是 NumberLiteral(4)。树形结构反映了运算优先级：括号内的 \`3 + 4\` 被组织为 \`*\` 的左子树，先于 \`*\` 被求值。BinaryExpr 节点持有三个子节点：左操作数、运算符 Token、右操作数。`,
    tags: ["AST结构", "BinaryExpr", "表达式", "优先级"],
  },
];
