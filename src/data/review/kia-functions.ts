import type { ReviewQuestion } from "./types";

export const kiaFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "kia-fn-1",
    chapter: "kia-functions",
    level: 1,
    question: "Kotlin的默认参数和命名参数如何替代Java的方法重载？",
    answer:
      "Kotlin用默认参数和命名参数替代Java方法重载：①默认参数——在函数声明时给参数指定默认值，调用时可省略该参数。如`fun greet(name: String = \"World\", greeting: String = \"Hello\")`，调用greet()用全部默认值，greet(\"Kotlin\")只传name，greet(greeting = \"Hi\")只传greeting。Java需写三个重载方法。②命名参数——调用时用参数名指定，顺序无关。如`greet(greeting = \"Hi\", name = \"Kotlin\")`可读性远好于位置参数。Java不支持命名参数。③默认参数+命名参数的组合让一个函数替代Java的多个重载，大幅减少样板代码。注意：Java调用Kotlin带默认参数的函数时需加@JvmOverloads注解让编译器生成重载方法，否则Java侧看不到默认值。",
    tags: ["默认参数", "命名参数", "方法重载", "@JvmOverloads"],
  },
  {
    id: "kia-fn-2",
    chapter: "kia-functions",
    level: 2,
    question: "Kotlin的扩展函数是什么？它的底层原理是什么？",
    answer:
      "扩展函数是Kotlin给已有类添加方法而不修改源码的能力。语法：`fun String.lastChar(): Char = this[length - 1]`，其中String是接收者类型，this是接收者对象。调用时`\"abc\".lastChar()`看起来像成员方法。底层原理：扩展函数不修改原始类，编译为以接收者对象为第一个参数的静态方法。如`fun String.lastChar()`编译为`LastCharKt.lastChar(\"abc\")`。关键特性：①静态解析——扩展函数在编译期根据接收者的静态类型决定调用哪个扩展，不参与运行时多态。②不能访问私有成员——扩展函数只能访问接收者的公有成员。③成员函数优先——如果类已有同名成员函数，成员函数总是优先于扩展函数。④可空接收者——`fun String?.isNullOrBlank()`可在接收者为null时调用。⑤扩展属性——`val String.lastChar: Char get() = this[lastIndex]`给类添加计算属性。用途：Android KTX、增强第三方库API。",
    tags: ["扩展函数", "接收者类型", "静态解析", "扩展属性"],
  },
  {
    id: "kia-fn-3",
    chapter: "kia-functions",
    level: 3,
    question: "Kotlin的顶层函数和顶层属性如何消除Java的「工具类满地」反模式？",
    answer:
      "Kotlin顶层函数和顶层属性消除Java工具类反模式：①顶层函数——Kotlin允许在类外（文件顶层、包级别）直接定义函数，不需放在类中。如strings.kt中直接写`fun joinToString(...): String`，编译为JoinKt类的静态方法。Java需写StringUtils类+static方法，调用StringUtils.joinToString()。Kotlin直接import后调用joinToString()。②顶层属性——同理可在文件顶层定义属性，如`val UNIX_LINE_SEPARATOR = \"\\n\"`，编译为该Kt类的静态字段。③消除工具类——Java中StringUtil、CollectionUtil、DateUtil等满地的工具类，在Kotlin中可以用顶层函数+扩展函数替代，让API调用更自然（`list.joinToString()`而非`StringUtils.join(list)`）。④文件名映射——顶层函数编译为「文件名Kt」类（如strings.kt -&gt; StringsKt），可用@file:JvmName(\"Strings\")自定义类名。⑤对Java友好——加@JvmName和@JvmOverloads让Java调用更自然。",
    tags: ["顶层函数", "顶层属性", "工具类", "@file:JvmName"],
  },
  {
    id: "kia-fn-4",
    chapter: "kia-functions",
    level: 2,
    question: "Kotlin的表达达式体函数和块体函数有什么区别？什么时候用哪个？",
    answer:
      "Kotlin函数声明的两种形式：①块体函数（block body）——标准写法，函数体用花括号包裹，需显式return。如`fun add(a: Int, b: Int): Int { return a + b }`。适用于函数体有多行语句。②表达式体函数（expression body）——用等号=简写，函数体是一个表达式，返回类型可省略由推断。如`fun double(x: Int) = x * 2`或`fun add(a: Int, b: Int) = a + b`。适用于单行函数。区别：表达式体函数更简洁，无需return和花括号，返回类型可推断。块体函数更灵活，可包含多行语句、局部变量、控制流。选择标准：①单行简单函数用表达式体——如getter、数学运算、委托方法。②多行复杂逻辑用块体——如含条件分支、循环、多步计算。最佳实践：优先表达式体函数保持简洁，当函数体超过一行或需要临时变量时切换为块体。表达式体函数的返回类型也可显式声明以提高可读性。",
    tags: ["表达式体函数", "块体函数", "函数声明", "类型推断"],
  },
];
