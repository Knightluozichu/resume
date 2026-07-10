import type { ReviewQuestion } from "./types";

export const kiaKotlinBasicsQuestions: ReviewQuestion[] = [
  {
    id: "kia-kb-1",
    chapter: "kia-kotlin-basics",
    level: 1,
    question: `Kotlin中val和var的区别是什么？为什么推荐val？`,
    answer:
      `val和var的区别：val（value）是只读引用，赋值后不可重新赋值，相当于Java的final变量；var（variable）是可变引用，可重新赋值。推荐val的原因：①不可变引用更安全——val赋值后引用不变，减少意外修改的风险。②线程安全——不可变对象天生线程安全，val引用的对象如果在创建后不修改状态，则无需同步。③可读性——val告诉读者「这个变量不会变」，降低理解代码的心智负担。④编译器优化——编译器可对val做更激进的优化（如内联常量）。注意：val只是引用不可变，引用的对象本身可能是可变的（如val list = mutableListOf(1,2)可add但不可重新赋值list）。最佳实践：默认用val，只有确实需要变更时才用var，并注释变更理由。`,
    tags: ["val", "var", "不可变", "变量声明"],
  },
  {
    id: "kia-kb-2",
    chapter: "kia-kotlin-basics",
    level: 2,
    question: `Kotlin的when表达式相比Java的switch语句有什么优势？`,
    answer:
      `Kotlin的when表达式相比Java switch语句的优势：①表达式而非语句——when有返回值，可直接赋值：\`val desc = when (x) { 1 -> \"one\"; else -> \"unknown\" }\`，Java switch是语句无返回值。②更灵活的分支——when分支可以是任意表达式：值匹配（1 -> ...）、范围匹配（in 1..10 -> ...）、类型匹配（is String -> ...）、条件匹配（x > 0 -> ...），Java switch只能匹配常量。③智能转换——when分支中is String匹配后，x自动转为String类型可直接访问length。④编译器穷尽检查——when作为表达式时必须覆盖所有情况（用else或枚举/sealed class全分支），编译器强制完整性。⑤无fall-through——Kotlin when分支不需要break，匹配后自动终止；Java switch默认fall-through需手动break。⑥多值匹配——\`1, 2, 3 -> ...\`一行匹配多个值。`,
    tags: ["when表达式", "switch", "控制流", "智能转换"],
  },
  {
    id: "kia-kb-3",
    chapter: "kia-kotlin-basics",
    level: 2,
    question: `Kotlin的字符串模板和三引号字符串如何使用？`,
    answer:
      `Kotlin字符串模板：用$变量名或\${表达式}在字符串中嵌入值。例如\`val name = \"Kotlin\"; println(\"Hello, $name!\")\`输出「Hello, Kotlin!」；\`println(\"Length is \${name.length}\")\`输出「Length is 6」。相比Java的字符串拼接（\"Hello, \" + name + \"!\"）更简洁可读。三引号字符串（raw string）：用\"\"\"三个引号包裹，可包含换行和特殊字符无需转义。例如\`val text = \"\"\"第一行\\n第二行\"\"\"\`，用trimIndent()去除公共缩进、trimMargin()按|前缀去缩进。三引号字符串中仍可使用模板$var和\${expr}。注意：三引号中要表示$本身需用\${'$'}。用途：SQL语句、JSON模板、多行文档等场景。`,
    tags: ["字符串模板", "三引号字符串", "trimIndent", "文本处理"],
  },
  {
    id: "kia-kb-4",
    chapter: "kia-kotlin-basics",
    level: 3,
    question: `Kotlin的基本类型与Java有什么区别？什么是类型推断？`,
    answer:
      `Kotlin基本类型与Java的区别：①统一类型系统——Kotlin中Int、Long、Double等是类（有方法和属性），Java区分基本类型int和包装类型Integer。Kotlin在可能时编译为JVM基本类型以避免装箱开销，仅在需要时（如泛型List<Int>）才装箱。②Any vs Object——Kotlin的Any是所有非空类型的根（相当于Java Object），Any?是所有可空类型的根。Unit相当于Java的void但是一个单例类型（可作为类型参数）。Nothing是永远不会有值的类型（如无限循环或总是抛异常的函数返回Nothing）。③类型推断——Kotlin全面类型推断，\`val x = 42\`自动推断为Int，\`val s = \"hi\"\`推断为String，\`val list = listOf(1, 2, 3)\`推断为List<Int>。Java只在10+后才有var局部变量推断，且不支持字段推断。类型推断让代码更简洁而不失类型安全。`,
    tags: ["基本类型", "类型推断", "Any", "Unit", "装箱"],
  },
];
