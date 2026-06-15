/** 复习题库 · C 运算符、表达式和语句（cpr-operators-expressions）。C Primer Plus §5 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprOperatorsExpressionsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cope-1",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "C 语言中 `5 / 2` 的结果是多少？为什么不是 2.5？",
    answer:
      "结果是 2。因为两个操作数都是 int，C 执行的是整数除法——结果往零截断，小数部分被直接丢弃（不四舍五入）。如果至少有一个操作数是浮点数（如 `5.0 / 2`），C 才会做浮点除法得到 2.5。",
    tags: ["整数除法", "截断", "算术运算符"],
  },
  {
    id: "cope-2",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "`10 % 3` 和 `10 % -3` 的结果分别是多少？余数符号由谁决定？",
    answer:
      "`10 % 3` = 1，`10 % -3` = 1。C99 起规定，`%` 求余的结果符号与**被除数（左边）**同号。所以 `-10 % 3` = -1，`10 % -3` = 1。记住「余数跟着被除数走」就不容易搞混。",
    tags: ["求余", "%", "模运算", "符号"],
  },
  {
    id: "cope-3",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "`++i`（前缀递增）和 `i++`（后缀递增）的区别是什么？最终 i 的值是否相同？",
    answer:
      "前缀（++i）：变量先自增，表达式返回**新值**。后缀（i++）：表达式先返回**旧值**，变量再自增。两者对 i 的最终修改效果完全相同——i 都加 1。差别仅在于表达式的返回值：如果被赋值给另一个变量（如 `b = ++a` vs `b = a++`），b 会得到不同的值。",
    tags: ["++i", "i++", "前缀", "后缀", "自增"],
  },
  {
    id: "cope-4",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "关系表达式的结果是什么类型？`5 > 3` 的值是多少？",
    answer:
      "关系表达式的结果是整数（int）。关系成立返回 1，不成立返回 0。所以 `5 > 3` 的值是 1（真），`5 < 3` 的值是 0（假）。C 语言没有专门的布尔类型——1 就是「真」、0 就是「假」，任何非零值在条件判断中都是真。",
    tags: ["关系运算符", "布尔", "真", "假"],
  },
  {
    id: "cope-5",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "C 语言表达式里的类型转换分哪两个阶段？各自做什么？",
    answer:
      "第一阶段：**整型提升**——char 和 short 自动提升为 int（范围不够则升为 unsigned int）。第二阶段：**寻常算术转换**——提升后如仍有不同类型，按层次链 char→short→int→unsigned int→long→float→double→long double 把「低级」转为「高级」，目标是避免数据丢失。赋值时则反向截断（窄化，可能丢数据）。",
    tags: ["类型转换", "整型提升", "寻常算术转换"],
  },
  {
    id: "cope-6",
    chapter: "cpr-operators-expressions",
    level: 1,
    question: "强制类型转换（cast）的写法是什么？`(double)5 / 2` 和 `(double)(5 / 2)` 有什么区别？",
    answer:
      "写法：`(目标类型)表达式`。cast 的优先级很高——`(double)5 / 2` 先把 5 转成 double 5.0，再做浮点除法得 2.5。但 `(double)(5 / 2)` 先做整数除法 5÷2=2，再把 2 转成 double 得 2.0——小数点已经丢了，转类型也回不来。记住：**cast 只作用于紧跟在它后面的表达式**，要用括号包住你想转换的整个表达式。",
    tags: ["cast", "强制类型转换", "优先级"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cope-7",
    chapter: "cpr-operators-expressions",
    level: 2,
    question: "为什么 `i = i++ + ++i;` 在不同编译器上结果不同？C 标准对这条语句说了什么？",
    answer:
      "因为 C 标准**不规定同一表达式内各子表达式的求值顺序**——编译器可以先算 `i++` 再算 `++i`，也可以反过来；对同一个变量在同一条语句里多次自增自减是**未定义行为（undefined behavior）**。标准明确声明这种行为的结果是「未定义的」——编译器可以按任意方式处理，包括输出任意值或程序崩溃。正确做法：一条语句里同一变量最多自增/自减一次。",
    tags: ["未定义行为", "求值顺序", "i++", "++i"],
  },
  {
    id: "cope-8",
    chapter: "cpr-operators-expressions",
    level: 2,
    question: "为什么 `float f = 1 / 2;` 中 f 的值是 0.0 而不是 0.5？C 的类型转换在什么时候发生？",
    answer:
      "因为 C 先做运算再考虑转换：`1 / 2` 的两个操作数都是 int，C 先执行整数除法得到 0（此时小数已丢），然后再把结果 0 转为 float 赋给 f。类型转换发生在「运算完成之后、赋值之时」——叫做「为时已晚」。要让除法产生小数结果，必须在除法发生前让至少一个操作数成为浮点型：`1.0 / 2` 或 `(float)1 / 2`。",
    tags: ["整数除法", "类型转换时机", "赋值窄化"],
  },
  {
    id: "cope-9",
    chapter: "cpr-operators-expressions",
    level: 2,
    question: "while 循环的四步执行流程是什么？循环体在什么情况下一次都不执行？",
    answer:
      "四步流程：① 条件判断（i < N 成立？）→ ② 条件为真则执行循环体 → ③ 更新条件变量（i++）→ ④ 回到第①步重新判断。循环体一次都不执行的情况：第一次条件判断就不成立。比如 `int i = 10; while (i < 5) { ... }`——i 初始就是 10，`10 < 5` 为假，循环体完全跳过。while 是先判后做——所以也叫「入口条件循环」。",
    tags: ["while循环", "入口条件", "流程"],
  },
  {
    id: "cope-10",
    chapter: "cpr-operators-expressions",
    level: 2,
    question: "`int n = 3.99;` 中 n 的值是 4 还是 3？为什么？如果要用四舍五入，怎么写？",
    answer:
      "n 的值是 3。double 赋值给 int 时，小数部分被**直接丢弃**（往零截断），不是四舍五入。3.99 截去 0.99 后剩下 3。如果要四舍五入，需要自己实现：`n = (int)(3.99 + 0.5);`——给正数加 0.5 再截断就实现了四舍五入（但负数要减 0.5）。注意这只是近似方案，处理边界值需额外的逻辑。",
    tags: ["赋值截断", "四舍五入", "窄化"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cope-11",
    chapter: "cpr-operators-expressions",
    level: 3,
    question:
      "读下面的程序，写出输出结果。\n```c\nint a = 5, b = 2, c = 3;\nprintf(\"(a+b)*c = %d\\n\", (a + b) * c);\nprintf(\"a+b*c = %d\\n\", a + b * c);\nprintf(\"a/b*c = %d\\n\", a / b * c);\n```",
    answer:
      "① `(a+b)*c` = `(5+2)*3` = `7*3` = **21**（括号改变了优先顺序）。\n② `a+b*c` = `5+(2*3)` = `5+6` = **11**（乘法优先级高于加法，没括号时先乘后加）。\n③ `a/b*c` = `(5/2)*3` = `2*3` = **6**（除法和乘法优先级相同，从左到右结合；5/2 整数除法得 2，再乘以 3 得 6）。关键教训：括号显式控制求值顺序——有疑问就加括号。",
    tags: ["优先级", "结合律", "括号", "表达式求值"],
  },
  {
    id: "cope-12",
    chapter: "cpr-operators-expressions",
    level: 3,
    question:
      "下面代码的 while 循环有什么问题？如何修正？\n```c\nint i = 1, sum = 0;\nwhile (i <= 10); {\n    sum += i;\n    i++;\n}\nprintf(\"sum = %d\\n\", sum);\n```",
    answer:
      "`while (i <= 10);` 后面多了一个分号 `;`！C 把这个分号解读为「空的循环体」——while 不断检查 `i <= 10` 是否为真，但什么也不做、i 永远不变、条件永远成立，程序死循环。下面带花括号的代码块根本不属于 while——它是 while 结束后的一段永不可达的普通代码。修正方法：去掉分号——`while (i <= 10) { ... }`。花括号前不放分号是铁律。",
    tags: ["while", "分号陷阱", "死循环", "排错"],
  },
  {
    id: "cope-13",
    chapter: "cpr-operators-expressions",
    level: 3,
    question:
      "`printf(\"%d\\n\", 5 > 3 && 2 < 1 || 4 == 4);` 输出什么？一步步拆解运算过程。",
    answer:
      "输出 1。拆解：① `5 > 3` = 1（真）② `2 < 1` = 0（假）③ `1 && 0` = 0（逻辑与：一边假就全假）④ `4 == 4` = 1（真）⑤ `0 || 1` = 1（逻辑或：任一边真就真）。注意优先级：`&&` 高于 `||`——所以先做 `&&`（`1 && 0` = 0），再做 `||`（`0 || 1` = 1）。写成 `5 > 3 && 2 < 1 || 4 == 4` 等价于 `(5 > 3 && 2 < 1) || (4 == 4)`。",
    tags: ["逻辑运算符", "&&", "||", "优先级", "短路求值"],
  },
  {
    id: "cope-14",
    chapter: "cpr-operators-expressions",
    level: 3,
    question:
      "`int a = 5; int b = (a++, ++a, a + 2);` 执行后 a 和 b 的值分别是多少？解释为什么。",
    answer:
      "a = 7，b = 9。逗号表达式从左到右依次求值：① `a++`：a 先用旧值 5 再加 1 变成 6，但旧值 5 被丢弃；② `++a`：a 再自增变成 7；③ `a + 2`：计算 `7 + 2 = 9`——这是逗号表达式的结果，赋给 b。规则：逗号运算符优先级最低，从左到右执行，整个表达式的结果是最右边那个表达式的值。",
    tags: ["逗号运算符", "求值顺序", "自增"],
  },
  {
    id: "cope-15",
    chapter: "cpr-operators-expressions",
    level: 3,
    question:
      "`int a = 5, b = 3; if (a = b) printf(\"equal\\n\");` 这行代码会打印 「equal」 吗？为什么？如果是打算判断 a 和 b 是否相等，正确的是什么？",
    answer:
      "会打印 「equal」——但这不是因为 a 和 b 相等。`a = b` 是赋值而不是比较：它把 b 的值 3 赋给 a，赋值表达式的结果是 3（被赋的值）。3 是非零值，在 C 里就是「真」——所以 if 条件永远成立，永远打印 「equal」。正确的相等判断用双等号：`if (a == b)`。这是 C 初学者最经典的 bug 之一——`=` 和 `==` 是一个字符之差。",
    tags: ["==", "=", "赋值当比较", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cope-16",
    chapter: "cpr-operators-expressions",
    level: 4,
    question:
      "设计一个程序：用 while 循环打印 1 到 50 之间所有同时能被 3 和 5 整除的数字（即 15 的倍数）。每次用 `i++` 更新循环变量。循环变量从 15 开始，每次加 15，用复合赋值 `+=` 实现。写完整程序并在输出格式中每行显示该数字及其除以 15 的结果。",
    answer:
      "```c\n#include <stdio.h>\nint main(void) {\n    int n = 15;\n\n    while (n <= 50) {\n        printf(\"15 × %d = %d\\n\", n / 15, n);\n        n += 15;  // 跳到下一个 15 的倍数\n    }\n\n    return 0;\n}\n```\n\n输出：\n15 × 1 = 15\n15 × 2 = 30\n15 × 3 = 45\n\n关键思路：直接把循环变量设成「你要检查的值」（15 的倍数），每次 `+= 15` 跳过 14 个数——比从 1 逐次检查到 50 再判断 `if (n % 15 == 0)` 简洁得多。这叫「用步长代替筛选」。",
    tags: ["while", "复合赋值", "步长", "综合实现"],
  },
  {
    id: "cope-17",
    chapter: "cpr-operators-expressions",
    level: 4,
    question:
      "解释以下程序的所有隐藏问题（共 3 处），并写出正确的版本。\n```c\nint i = 10, n = 0;\nwhile (i < 100)\n    n += i++;\n    ++i;\nprintf(\"n = %d\\n\", n);\n```",
    answer:
      "三处问题：\n① while 循环体缺少花括号——没有 `{}` 时只有紧跟 while 的第一条语句是循环体。这里只 `n += i++;` 是循环体，`++i;` 不属于循环——每次循环只加一个 `i++`（后缀，1次自增），`++i`（前缀）等循环结束后才执行一次。\n② i 从 10 开始，循环条件 `i < 100` 成立，`n += i++` 用 `i++` 的后缀特性：先用旧值加 n、再自增。所以 i 每次循环只加 1——循环会跑 90 轮（i 从 10 到 99）。但因为没有花括号，你意图内的「两次自增」只实现了一次。\n③ 循环结束后 `++i` 才执行一次，i 最终是 100。\n\n修正版（加花括号，两个自增合并为一次 i+=2）：\n```c\nint i = 10, n = 0;\nwhile (i < 100) {\n    n += i;\n    i += 2;  // 明确表意：每次加 2\n}\nprintf(\"n = %d\\n\", n);\n```\n\n根本教训：循环体永远写花括号——即使只有一行也要写。",
    tags: ["花括号", "循环体范围", "while", "综合排错"],
  },
  {
    id: "cope-18",
    chapter: "cpr-operators-expressions",
    level: 4,
    question:
      "写出以下程序的完整输出。这段代码展示了类型转换和截断的所有陷阱：\n```c\n#include <stdio.h>\nint main(void) {\n    int a = 5, b = 3;\n    double d = 2.5;\n\n    printf(\"① a/b = %d\\n\", a / b);\n    printf(\"② a/d = %.2f\\n\", a / d);\n    printf(\"③ (int)d + a = %d\\n\", (int)d + a);\n    printf(\"④ (int)(d + 0.5) = %d\\n\", (int)(d + 0.5));\n    printf(\"⑤ a / b * d = %.2f\\n\", a / b * d);\n    printf(\"⑥ d * a / b = %.2f\\n\", d * a / b);\n\n    return 0;\n}\n```",
    answer:
      "① `a/b = 1`——整数除法 5÷3=1（截断）。\n② `a/d = 2.00`——a 转为 double 与 d(2.5) 运算，5.0/2.5=2.0。\n③ `(int)d + a = 7`——d 被 cast 截断为 2，2+5=7。\n④ `(int)(d + 0.5) = 3`——d+0.5=3.0，cast 截断得 3（这里是四舍五入的效果，因为小数部分为 0）。\n⑤ `a / b * d = 2.50`——先整数除法 5÷3=1（截断），再 1×2.5=2.5。整数除法先发生，小数已被丢弃！\n⑥ `d * a / b = 4.17`——先 d×a=2.5×5=12.5（浮点），再 12.5÷3=4.166...≈4.17。类型提升了就没丢精度。\n\n核心教训：⑤和⑥表明「运算发生的顺序 + 操作数类型」共同决定了最后结果——同样的三个数，先除后乘 vs 先乘后除、整数操作数存在 vs 全部浮点，结果迥异。",
    tags: ["类型转换", "截断", "表达式求值顺序", "综合"],
  },
];

export default cprOperatorsExpressionsQuestions;
