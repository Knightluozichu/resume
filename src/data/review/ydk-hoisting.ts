import type { ReviewQuestion } from "./types";

export const ydkHoistingQuestions: ReviewQuestion[] = [
  {
    id: "ydk-hoisting-1",
    chapter: "ydk-hoisting",
    level: 2,
    question: `\`console.log(a); var a = 2;\` 为什么打印 \`undefined\` 而不是报错？`,
    answer:
      `因为提升只提升声明、不提升赋值。引擎在执行前先编译，把 var a 的声明收集到作用域顶部，但 a = 2 的赋值留在原位。编译后等价于：var a; console.log(a); a = 2;。执行到 console.log(a) 时，a 已声明（值为 undefined），所以打印 undefined 而非 ReferenceError。这就是 var 的「静默 undefined」——变量已存在但还没赋值。let 不会有这个问题，因为 TDZ 会直接抛错，强制先声明后使用。`,
    tags: ["提升", "var", "undefined"],
  },
  {
    id: "ydk-hoisting-2",
    chapter: "ydk-hoisting",
    level: 3,
    question: `函数声明和函数表达式在提升上有什么区别？函数优先规则是什么？`,
    answer:
      `函数声明 function foo() {...} 整体提升——声明和函数体一起提到作用域顶部，所以可在定义之前调用。函数表达式 var foo = function() {...} 只提升 var foo（值为 undefined），赋值的函数体留在原位，所以在赋值前调用会得到 TypeError（undefined 不是函数）。函数优先规则：当函数声明和变量声明同名时，函数声明先提升并整体占据位置，随后的 var 声明因同名已被占用而被忽略（不会覆盖函数），但后续若有赋值（foo = ...）则赋值会覆盖函数。最佳实践：函数声明放作用域顶部，函数表达式用 let 而非 var，先声明再使用，避免依赖提升的隐式行为。`,
    tags: ["函数声明", "函数表达式", "函数优先"],
  },
  {
    id: "ydk-hoisting-3",
    chapter: "ydk-hoisting",
    level: 3,
    question: `let/const 会被提升吗？什么是暂时性死区（TDZ）？`,
    answer:
      `let/const 也会被提升，但和 var 不同——它们在声明语句执行前处于暂时性死区（TDZ）：从作用域顶部到声明语句这段区间内，访问该变量会抛 ReferenceError，而非像 var 那样返回 undefined。这是 ES6 刻意设计：强制「先声明后使用」，把 var 那种静默 undefined 导致的隐蔽 bug 变成立即抛错。typeof 在 TDZ 内也会抛错，所以「用 typeof 检测全局变量是否存在」的技巧对 let/const 失效。证据：let x = 1; { console.log(x); let x = 2; } 会报错——内层 x 提升到块顶遮蔽外层 x，内层处于 TDZ，console.log(x) 访问的是 TDZ 中的内层 x 而非外层。`,
    tags: ["let", "const", "TDZ", "提升"],
  },
  {
    id: "ydk-hoisting-4",
    chapter: "ydk-hoisting",
    level: 4,
    question: `如何理解「JavaScript 先编译后执行」的两阶段模型？提升发生哪个阶段？`,
    answer:
      `JavaScript 引擎处理代码分两阶段：①编译阶段——扫描作用域，把所有 var/function 声明收集登记到作用域顶部（这就是提升），同时处理 let/const 的 TDZ 标记；②执行阶段——从上到下逐行执行，赋值、调用都在此时发生。提升发生在编译阶段，所以执行时变量声明已在作用域顶部就位。理解两阶段模型能解释：为何 var 在声明前访问是 undefined（编译期已声明、执行期未赋值）、为何函数声明可提前调用（编译期整体提升）、为何 let 在声明前访问报错（编译期标记 TDZ）。var a = 2 被拆成「var a（编译期）」和「a = 2（执行期）」两步，这是理解提升的关键。`,
    tags: ["编译", "执行", "两阶段", "提升"],
  },
];
