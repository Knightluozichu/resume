import { ReviewQuestion } from "./types";

export const twsTypesErrorsQuestions: ReviewQuestion[] = [
  {
    id: "tws-types-errors-1",
    chapter: "tws-types-errors",
    level: 1,
    question: `动态类型语言和静态类型语言的区别是什么？Stone 属于哪种？`,
    answer:
      `静态类型语言（如 Java）：变量在声明时必须指定类型，类型检查在编译期完成，类型不匹配会在编译时报错。动态类型语言（如 Stone、Python）：变量无类型声明，只有值有类型，同一个变量可以先绑定整数再绑定字符串，类型检查在运行时进行。Stone 属于动态类型语言——变量 \`x = 10\` 后可以 \`x = \"hello\"\`，类型检查在求值时进行，运行时类型不匹配会抛出异常。`,
    tags: ["动态类型", "静态类型", "类型检查", "运行时"],
  },
  {
    id: "tws-types-errors-2",
    chapter: "tws-types-errors",
    level: 2,
    question: `Stone 运行时有哪些值类型？BinaryExpr 求值时如何做类型检查？`,
    answer:
      `Stone 运行时值类型：Integer（整数）、String（字符串）、Function（函数对象）、StoneObject（类实例）。BinaryExpr 求值时类型检查流程：先递归求值左右子树得到操作数值，然后检查操作数类型是否与运算符兼容。例如 \`+\` 运算符要求两个操作数同为 Integer 或同为 String（字符串拼接）；\`*\` 运算符要求两个操作数都是 Integer。如果类型不匹配，抛出 StoneExc 异常，携带行号和错误描述。`,
    tags: ["值类型", "类型检查", "BinaryExpr", "StoneExc"],
  },
  {
    id: "tws-types-errors-3",
    chapter: "tws-types-errors",
    level: 2,
    question: `Stone 的异常类层次结构是什么？各异常类型的触发场景是什么？`,
    answer:
      `异常层次：StoneExc（基类）→ ParseExc（语法错误）/ TypeExc（类型错误）/ 其他运行时异常。ParseExc 在语法分析阶段触发——Token 序列不符合语法规则时抛出，如缺少右括号、关键字拼写错误。TypeExc 在求值阶段触发——运算符操作数类型不匹配时抛出，如对 String 执行 \`*\`。其他运行时异常包括：变量未定义（get 找不到）、方法不存在、数组越界等。所有异常都携带行号信息，便于定位错误。`,
    tags: ["异常层次", "StoneExc", "ParseExc", "TypeExc", "错误处理"],
  },
  {
    id: "tws-types-errors-4",
    chapter: "tws-types-errors",
    level: 3,
    question: `动态类型语言的优缺点分别是什么？Stone 为什么选择动态类型？`,
    answer:
      `优点：①代码简洁，无需声明类型 ②灵活，同一变量可绑定不同类型值 ③原型开发快，修改类型不需改声明。缺点：①类型错误延迟到运行时才暴露，可能遗漏 ②运行时类型检查有性能开销 ③缺乏编译期类型安全保障，重构困难。Stone 选择动态类型是因为：教学目标是理解解释器原理而非工程级语言设计；动态类型实现简单（只需运行时 instanceof 检查），不需要实现类型推断或类型检查器；让学习者更快上手编写程序，聚焦于核心概念。`,
    tags: ["动态类型优缺点", "设计决策", "类型安全"],
  },
];
