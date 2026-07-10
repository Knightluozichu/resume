import { ReviewQuestion } from "./types";

export const eacContextSensitiveQuestions: ReviewQuestion[] = [
  {
    id: "eac-context-sensitive-1",
    chapter: "eac-context-sensitive",
    level: 2,
    question: `为什么语法分析（上下文无关文法）不足以完成编译器的全部前端工作？什么是上下文相关分析？`,
    answer:
      `上下文无关文法（CFG）只能描述语法结构（如 \`x = y + z\` 是合法的赋值语句），但无法表达需要上下文才能判断的性质：①变量是否已声明（需查符号表）②类型是否兼容（int + float 是否合法）③函数参数个数和类型是否匹配 ④return 语句的返回值类型是否与函数签名一致 ⑤break/continue 是否在循环内。这些性质不是「结构合法性」而是「语义合法性」，依赖符号表、类型系统和作用域规则，属于上下文相关范畴。上下文相关分析就是在语法分析之后、IR 生成之前，遍历 AST 检查这些语义规则并标注类型信息的过程，是前端的第三个阶段。`,
    tags: ["上下文无关文法", "上下文相关分析", "语义检查", "符号表", "类型系统"],
  },
  {
    id: "eac-context-sensitive-2",
    chapter: "eac-context-sensitive",
    level: 3,
    question: `属性文法中的综合属性和继承属性是什么？语法制导翻译（SDT）如何利用它们？`,
    answer:
      `综合属性（Synthesized Attribute）：由子节点的属性值计算得到，自底向上传递。如表达式节点 E 的 type 属性由其子节点的 type 和运算符决定：\`E.type = result_type(E1.type, E2.type)\`，子表达式先算好 type 传给父节点。继承属性（Inherited Attribute）：由父节点或兄弟节点的属性传入，自顶向下传递。如变量声明 \`int x\` 中，x 的类型由声明语句的类型限定符（int）继承而来；控制流语句中 next 标号由父控制结构传入。语法制导翻译（SDT）：在语法分析遍历 AST 时，为每个节点附加属性求值规则，综合属性在归约时计算，继承属性在推导时计算。求值顺序需满足属性依赖图无环（Adorned AST），使整个属性求值能顺利完成。SDT 把语义检查和 IR 生成的逻辑嵌入语法结构遍历中。`,
    tags: ["属性文法", "综合属性", "继承属性", "语法制导翻译", "属性依赖图"],
  },
  {
    id: "eac-context-sensitive-3",
    chapter: "eac-context-sensitive",
    level: 2,
    question: `符号表的作用是什么？如何支持嵌套作用域？`,
    answer:
      `符号表记录「名字 → 信息」的映射，信息包括类型、种类（变量/函数/类）、作用域层级、存储位置等。它是声明与引用之间的桥梁——声明时插入符号表，引用时查找符号表获取类型等信息用于语义检查。支持嵌套作用域的常见方式：①作用域栈——进入新作用域时压入新表，离开时弹出；查找时从栈顶向下搜索，实现「内层遮蔽外层」的可见性规则 ②符号表树——每个作用域一个符号表，子作用域指向父作用域，查找时沿父链向上搜索 ③哈希表+作用域链——主表用哈希表快速定位，每个名字维护一条作用域链，栈顶是最内层定义。函数调用、块语句、类定义都会创建新的嵌套作用域。符号表还需处理前向引用（如函数声明）和闭包捕获等特殊情况。`,
    tags: ["符号表", "作用域", "嵌套作用域", "可见性", "哈希表"],
  },
  {
    id: "eac-context-sensitive-4",
    chapter: "eac-context-sensitive",
    level: 3,
    question: `类型检查和类型推断有什么区别？类型规则如何表达？`,
    answer:
      `类型检查（Type Checking）：程序员显式声明变量类型，编译器验证操作是否类型合法——如 \`int + float\` 是否允许、函数实参类型是否匹配形参。类型检查是验证过程，类型已给出。类型推断（Type Inference）：程序员不声明类型，编译器根据使用方式自动推导出变量的类型——如 ML/Haskell 中 \`let x = 1 + 2\` 推断 x 为 int。推断是求解过程，类型需算出。Hindley-Milner 算法是经典的全局类型推断算法，基于合一（Unification）。类型规则用类型判断表达：\`Γ ⊢ e1 : τ1, Γ ⊢ e2 : τ2  ⟹  Γ ⊢ e1 + e2 : result(τ1, τ2)\`，即在类型环境 Γ 下，若 e1 类型为 τ1、e2 类型为 τ2，则 e1+e2 的类型由 result 函数决定（如 int+int→int，int+float→float）。类型规则组成类型系统，定义了语言的类型语义。`,
    tags: ["类型检查", "类型推断", "类型规则", "Hindley-Milner", "类型系统", "合一"],
  },
];
