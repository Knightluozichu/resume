import type { ReviewQuestion } from "./types";

/** 解释器模式章复习题 */
export const dpInterpreterQuestions: ReviewQuestion[] = [
  {
    id: "dp-interpreter-01",
    chapter: "dp-interpreter",
    level: 1,
    question: "解释器模式的意图是什么？",
    answer: "解释器模式给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释该语言中的句子。\n\n核心意图：把「一种语言的句子」用「对象结构」表示出来（通常是一棵表达式树），每个表达式节点知道如何解释（求值）自己。客户端把句子解析成表达式树后，调用根节点的 `interpret(context)` 即可得到结果。这样「语言的语义」被分散到各类表达式节点中，新增一种语法规则只需加一种表达式类。典型用于规则引擎、查询语言、正则、配置化表达式等「需要解释执行小语言」的场景。",
    tags: ["意图", "基础概念", "文法"],
  },
  {
    id: "dp-interpreter-02",
    chapter: "dp-interpreter",
    level: 2,
    question: "终结符表达式和非终结符表达式有什么区别？",
    answer: "终结符表达式（Terminal Expression）：\n- 对应文法中的终结符（不能再展开的最小单位），如变量 `x`、常量 `true`。\n- `interpret()` 直接从上下文里取值或返回自身常量值，不依赖其他表达式。\n- 是表达式树的叶子节点。\n\n非终结符表达式（Non-Terminal Expression）：\n- 对应文法中的非终结符（由其他表达式组合而成），如 `AND`、`OR`、`NOT`。\n- 内部持有其他表达式（子表达式）的引用，`interpret()` 先递归调用子表达式的 `interpret()`，再对结果做组合运算（与、或、非）。\n- 是表达式树的分支节点。\n\n区别：终结符「不递归、直接取值」，非终结符「递归、组合子表达式」。一棵表达式树由若干非终结符（分支）层层组合，最终叶子都是终结符（变量/常量）。解释执行时从根节点开始递归 `interpret()`，遇到非终结符就下钻子节点，遇到终结符就取值返回，逐层回溯得到整棵树的结果。",
    tags: ["终结符", "非终结符", "表达式树"],
  },
  {
    id: "dp-interpreter-03",
    chapter: "dp-interpreter",
    level: 3,
    question: "布尔表达式场景：AND / OR / NOT + 变量，用解释器模式设计。",
    answer: "1. 定义表达式接口 `BooleanExp`，声明 `interpret(ctx: Context): boolean`。`Context` 是变量名到布尔值的映射（如 `{x: true, y: false}`）。\n2. 终结符表达式：\n- `VariableExp`：持有变量名 `name`，`interpret(ctx)` 返回 `ctx.get(name)`。\n- `ConstantExp`：持有常量 `value`，`interpret(ctx)` 直接返回 `value`。\n3. 非终结符表达式：\n- `AndExp`：持有 `left`、`right` 两个子表达式，`interpret(ctx)` 返回 `left.interpret(ctx) && right.interpret(ctx)`。\n- `OrExp`：返回 `left.interpret(ctx) || right.interpret(ctx)`。\n- `NotExp`：持有 `exp`，返回 `!exp.interpret(ctx)`。\n4. 构建表达式树：`x AND (NOT y)` → `new AndExp(new VariableExp(\"x\"), new NotExp(new VariableExp(\"y\")))`。\n5. 解释：`exp.interpret({x: true, y: false})` → AndExp 调左右，左取 x=true，右 NotExp 调 y=false 取反得 true，最终 true && true = true。\n\n效果：每种语法规则（AND/OR/NOT/变量/常量）对应一个表达式类，组合成树后递归求值。新增运算（如 XOR）只需加一个 `XorExp` 类，不改现有类。这是解释器把语言语义对象化的典型体现。",
    tags: ["应用", "布尔表达式", "递归求值"],
  },
  {
    id: "dp-interpreter-04",
    chapter: "dp-interpreter",
    level: 4,
    question: "解释器模式为什么在现代开发中很少使用？有什么替代方案？",
    answer: "很少使用的原因：\n\n1. 性能差：解释器是「边遍历对象树边求值」，每次解释都要递归遍历、动态分发，比编译成机器码或字节码慢几个数量级。对性能敏感的场景不可接受。\n2. 文法复杂时类爆炸：每条文法规则一个类，文法稍复杂表达式类就几十上百个，维护成本高。规则间的组合、优先级、结合性用对象树表达很笨重。\n3. 实现成本高：要自己写词法分析、语法分析、构建表达式树、求值，工作量等于实现一个小语言。除非真有「可配置规则」需求，否则不如直接写代码。\n4. 调试困难：解释执行的对象树调用链深、状态分散在 Context，出错难定位。\n\n替代方案：\n- 编译器/解析器生成工具：ANTLR、Yacc/Bison、PEG.js 等自动生成解析器，支持把文法直接编译成高效代码，远比手写解释器省力且快。\n- 嵌入式脚本引擎：用 Lua、JavaScript（V8）、Groovy 等成熟脚本引擎做规则解释，性能和生态都优于手写解释器。\n- 规则引擎：Drools、Easy Rules 等专用规则引擎，支持 RETE 算法、增量求值，适合复杂业务规则。\n- 直接用语言本身的表达式：很多「小语言」需求其实可以用宿主语言的 lambda、策略模式、配置驱动（JSON 规则 + 解释器函数）解决，不必造一套文法。\n- AST + 访问者：把表达式解析成 AST 后用访问者遍历（而非每节点自带 `interpret`），职责更清晰，也便于做优化和代码生成。\n\n总结：解释器模式的教学价值（理解文法如何对象化）大于实用价值。现代开发中，真正需要「解释一种语言」时，几乎都会用成熟工具链而非手写 GoF 解释器。",
    tags: ["缺点", "替代方案", "工程实践"],
  },
];
