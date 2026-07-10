import { ReviewQuestion } from "./types";

export const twsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "tws-final-review-1",
    chapter: "tws-final-review",
    level: 2,
    question: `请描述 Stone 源码 \`even = 0\` 从源码到执行结果的完整旅程（端到端流程）。`,
    answer:
      `①词法分析（ch1）：Lexer 将 \"even = 0\" 分为 3 个 Token：IDENT(\"even\")、EQ(\"=\")、INT(\"0\")。②语法分析（ch2）：Parser 用赋值规则匹配，生成 BinaryExpr(\"=\") 节点。③AST 构建（ch3）：BinaryExpr(\"=\") 的左子树是 Name(\"even\")，右子树是 NumberLiteral(\"0\")。④求值执行（ch4）：Evaluator 求值 Name(\"even\") 得到变量名 \"even\"，求值 NumberLiteral(\"0\") 得到整数 0，执行 env.put(\"even\", 0) 将绑定写入环境。结果：全局环境中 even 变量绑定值为整数 0。`,
    tags: ["端到端", "词法分析", "语法分析", "AST", "求值", "整合"],
  },
  {
    id: "tws-final-review-2",
    chapter: "tws-final-review",
    level: 3,
    question: `AST 在整个解释器架构中扮演什么角色？为什么说它是前端与后端的桥梁？`,
    answer:
      `AST 是解释器架构的核心数据结构，扮演前端与后端桥梁的角色：①前端（词法分析 + 语法分析）的输出是 AST——Lexer 产生 Token，Parser 按 BNF 规则将 Token 组织成树形结构 ②后端（求值器）的输入是 AST——Evaluator 通过访问者模式遍历 AST 节点执行计算 ③AST 解耦了前端和后端——前端只负责结构化源码，后端只负责执行逻辑，两者通过 AST 接口交互，互不依赖实现细节 ④AST 可被多种后端复用——同一棵 AST 可被求值器执行、类型检查器分析、代码生成器编译。这种解耦是编译器设计的经典架构原则。`,
    tags: ["AST", "前端后端桥梁", "解耦", "架构设计", "整合"],
  },
  {
    id: "tws-final-review-3",
    chapter: "tws-final-review",
    level: 3,
    question: `环境（Environment）在 Stone 的哪些机制中被复用？它如何统一变量、参数、字段、闭包？`,
    answer:
      `环境在多处被复用：①全局环境存储全局变量 ②函数调用创建新环境绑定参数，outer 指向定义环境 ③闭包通过 Function 对象持有定义环境引用 ④块作用域（if/while 体）创建新环境 ⑤StoneObject 的 fields 用 Environment 存储，方法执行环境以 fields 为 outer。统一机制：所有变量查找都走 get（沿 outer 链查找），所有变量赋值都走 put（写入当前环境）。参数绑定是 put 到函数环境，字段访问是方法环境以对象 fields 为 outer 后的 get，闭包是函数对象持有 env 引用。一个 Environment 数据结构统一了作用域、参数传递、对象字段、闭包捕获四个概念。`,
    tags: ["Environment", "变量", "参数", "字段", "闭包", "统一机制", "整合"],
  },
  {
    id: "tws-final-review-4",
    chapter: "tws-final-review",
    level: 2,
    question: `通过构建 Stone 语言，你学到了哪些编译原理的核心概念？它们之间的关系是什么？`,
    answer:
      `核心概念及关系：①词法分析（正则匹配）→ 将文本结构化为 Token ②语法分析（Parser 组合子/递归下降）→ 将 Token 组织成 AST ③抽象语法树（节点层次 + 访问者模式）→ 表达程序结构的数据核心 ④求值器（树遍历 + 环境）→ 在 AST 上执行计算 ⑤函数与闭包（环境捕获）→ 实现代码复用和状态封装 ⑥类型与错误（动态类型 + 异常体系）→ 运行时安全保障 ⑦类与继承（方法查找链）→ 面向对象抽象 ⑧数组与哈希（集合类型）→ 数据组织。关系：词法→语法→AST 是层层递进的前端流水线，AST 是核心枢纽，求值器+环境是后端执行引擎，函数/类/集合是在执行引擎上扩展的语言特性层。`,
    tags: ["核心概念", "知识整合", "编译原理", "关系梳理"],
  },
];
