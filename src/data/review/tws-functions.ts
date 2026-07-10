import { ReviewQuestion } from "./types";

export const twsFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "tws-functions-1",
    chapter: "tws-functions",
    level: 1,
    question: `Stone 中如何定义和调用函数？Function 对象包含哪些信息？`,
    answer:
      `定义函数用 def 语句：\`def add(x, y) { x + y }\`。调用函数用 \`add(3, 4)\` 语法。Function 对象包含三个核心信息：①parameters（参数列表，List<String>）②body（函数体，BlockStmnt 类型 AST）③env（定义时的环境引用）。函数定义时创建 Function 对象并绑定到函数名变量，调用时利用这些信息创建新环境并执行函数体。`,
    tags: ["def", "函数定义", "函数调用", "Function对象"],
  },
  {
    id: "tws-functions-2",
    chapter: "tws-functions",
    level: 2,
    question: `函数调用的完整过程是什么？新环境的 outer 指向哪里？`,
    answer:
      `函数调用过程：①创建新的 Environment 对象 ②将新环境的 outer 指向函数定义时捕获的 env（不是调用者的环境，而是定义环境）③将实参值绑定到形参名，写入新环境 ④在新环境中递归求值函数体 BlockStmnt ⑤返回函数体最后一条语句的求值结果。关键：outer 指向定义环境而非调用环境，这保证了函数内部能访问定义时可见的变量，但不能访问调用者局部变量——这是词法作用域的核心。`,
    tags: ["函数调用", "环境创建", "参数绑定", "词法作用域"],
  },
  {
    id: "tws-functions-3",
    chapter: "tws-functions",
    level: 3,
    question: `什么是闭包？以 counter 示例说明闭包如何让内层函数修改外层变量。`,
    answer:
      `闭包 = 函数体 + 定义时的环境引用。Function 对象持有定义时的 env，即使定义环境的外层调用已返回，环境仍被函数对象引用而存活。以 \`def counter(n) { def inc() { n = n + 1; n }; inc }\` 为例：调用 counter(0) 创建环境 E1(n=0)，inc 的 Function 对象捕获 E1 作为 env。之后调用 c() 时创建新环境 E2(outer=E1)，执行 \`n = n + 1\`——get(n) 沿 E2→E1 找到 n=0，put(n) 写入 E1 使 n=1。第二次调用 c() 时 n 已是 1，返回 2。闭包让 inc「记住」了 E1 中的 n。`,
    tags: ["闭包", "环境捕获", "counter", "词法作用域"],
  },
  {
    id: "tws-functions-4",
    chapter: "tws-functions",
    level: 2,
    question: `为什么说闭包捕获的是环境引用而非值的拷贝？这有什么实际意义？`,
    answer:
      `Function 对象的 env 字段存储的是 Environment 对象的引用（Java 引用语义），而非变量值的快照拷贝。这意味着闭包内对变量的修改（put 操作）会直接写入被引用的环境，影响同一环境中所有共享该变量的闭包。实际意义：①多个闭包可以共享同一外层变量，实现状态共享（如 counter 示例中 inc 每次调用都修改同一个 n）②闭包能感知外层变量的后续修改（如果外层在定义闭包后修改变量，闭包调用时看到的是新值）。如果是值拷贝，则闭包只能看到定义时的快照，无法实现状态共享和修改。`,
    tags: ["闭包", "引用vs拷贝", "状态共享", "环境引用"],
  },
];
