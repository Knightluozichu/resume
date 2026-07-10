import type { ReviewQuestion } from "./types";

export const kdgDslQuestions: ReviewQuestion[] = [
  {
    id: "kdg-dsl-1",
    chapter: "kdg-dsl",
    level: 2,
    question: `什么是「带接收者的Lambda」？它与普通Lambda有什么区别？`,
    answer:
      `带接收者的Lambda（Lambda with Receiver）是Kotlin特有的Lambda形式——Lambda有一个隐式的接收者对象，在Lambda体内可以通过\`this\`访问接收者，且可省略\`this.\`前缀。类型签名：\`接收者类型.() -> 返回类型\`。与普通Lambda的区别：①普通Lambda——\`val f: (String) -> Unit = { s -> println(s) }\`，参数通过命名参数（s）或it访问。②带接收者Lambda——\`val f: String.() -> Unit = { println(this) }\`，接收者通过this访问，可省略this。③调用方式——普通Lambda\`f(\"hello\")\`，带接收者Lambda\`\"hello\".f()\`或\`f(\"hello\")\`。④等价关系——带接收者的Lambda\`String.() -> Unit\`等价于扩展函数\`fun String.f()\`。DSL核心机制：\`fun html(init: HTML.() -> Unit)\`接收一个HTML.() -> Unit的Lambda，在Lambda内this=HTML实例，可以省略this.直接调用HTML的方法：\`html { body(\"text\") }\`等价于\`html { this.body(\"text\") }\`。这创造了嵌套的声明式语法——内层方法调用看起来像标签嵌套。Kotlin标准库的apply/also/run/with都利用了带接收者的Lambda。Gradle Kotlin DSL、Ktor路由、Compose UI、Anko均用此机制构建DSL。`,
    tags: ["带接收者的Lambda", "DSL", "this", "扩展函数", "apply"],
  },
  {
    id: "kdg-dsl-2",
    chapter: "kdg-dsl",
    level: 3,
    question: `\`@DslMarker\`解决了什么问题？它是如何工作的？`,
    answer:
      `\`@DslMarker\`解决了DSL中「隐式接收者歧义」的问题。问题：当DSL嵌套时，如果外层和内层有同名方法，不带DslMarker时编译器会隐式选择最近的接收者，但可能不是开发者想要的。例如\`html { body { body(\"text\") } }\`中内层的\`body(\"text\")\`可能想调用外层HTML的body方法，但实际调用了内层Body的方法（如果Body也有body方法），产生非预期行为。\`@DslMarker\`的工作原理：①定义一个标注了\`@DslMarker\`的注解类（如\`annotation class HtmlDsl\`）。②给DSL的接收者类标注该注解（\`@HtmlDsl class HTML\`、\`@HtmlDsl class Body\`）。③编译器检测到同一DslMarker注解的多个接收者在作用域中时，只允许访问最内层的接收者成员，访问外层接收者成员会编译错误。④需要访问外层时，用显式的\`this@html.body(...)\`限定。效果：\`html { body { body(\"text\") } }\`中外层HTML的body被屏蔽，编译报错，消除歧义。这是Kotlin DSL类型安全的关键——编译器帮你检查作用域访问，防止意外调用错误层的方法。`,
    tags: ["@DslMarker", "作用域控制", "隐式接收者", "DSL安全", "编译器检查"],
  },
  {
    id: "kdg-dsl-3",
    chapter: "kdg-dsl",
    level: 3,
    question: `设计一个SQL查询DSL，展示Kotlin DSL的设计思路。`,
    answer:
      `设计SQL查询DSL：①定义@DslMarker注解——\`@DslMarker annotation class SqlDsl\`。②定义QueryBuilder类——\`@SqlDsl class QueryBuilder { private val columns = mutableListOf<String>(); private var table = \"\"; private val conditions = mutableListOf<String>(); fun select(vararg cols: String) { columns.addAll(cols) }; fun from(t: String) { table = t }; fun where(condition: String) { conditions.add(condition) }; fun build(): String = \"SELECT \${columns.joinToString(\", \")} FROM $table\" + if (conditions.isNotEmpty()) \" WHERE \${conditions.joinToString(\" AND \")}\" else \"\" }\`。③定义入口函数——\`fun query(init: QueryBuilder.() -> String): String = QueryBuilder().apply { init() }.build()\`。④使用——\`val sql = query { select(\"name\", \"age\"); from(\"users\"); where(\"age > 18\"); where(\"name LIKE 'A%'\") }\`，生成\`SELECT name, age FROM users WHERE age > 18 AND name LIKE 'A%'\`。设计思路：①用@DslMarker防止嵌套歧义。②用带接收者的Lambda让方法调用像SQL关键字（select/from/where无括号或简短括号）。③构建器模式——DSL块内配置参数，最后build()生成结果。④类型安全——编译器检查方法名和参数类型，IDE有自动补全。对比字符串拼接SQL，DSL避免了语法错误和SQL注入，且有代码提示。`,
    tags: ["DSL设计", "SQL DSL", "类型安全构建器", "@DslMarker", "构建器模式"],
  },
  {
    id: "kdg-dsl-4",
    chapter: "kdg-dsl",
    level: 2,
    question: `Kotlin DSL的典型应用场景有哪些？DSL相比于普通API设计的优势是什么？`,
    answer:
      `Kotlin DSL的典型应用场景：①构建配置——Gradle Kotlin DSL（build.gradle.kts），用Kotlin替代Groovy，有类型检查和IDE补全。②UI构建——Jetpack Compose（\`Column { Text(\"hi\"); Button { } }\`），用函数式构建UI树替代XML。③路由配置——Ktor路由（\`routing { get(\"/api\") { ... }; post(\"/users\") { ... } }\`），类型安全的路由声明。④HTML/XML构建——HTML DSL（\`html { head { title(\"Page\") } body { } }\`），类型安全的HTML生成。⑤测试断言——\`\"hello\" should startWith(\"h\")\`，自然语言式断言。⑥数据库查询——Exposed（\`Users.select { Users.age greater 18 }\`），类型安全SQL。⑦Android——Anko布局DSL、协程作用域DSL。DSL相比普通API的优势：①声明式——描述「做什么」而非「怎么做」，代码更接近领域语言。②类型安全——编译器检查结构正确性，避免运行时错误。③IDE支持——有自动补全、类型提示、错误标红。④嵌套自然——带接收者的Lambda让嵌套结构像标签一样自然。⑤可组合——DSL块可以组合、复用、参数化。⑥可读性——非Kotlin开发者也能理解DSL代码的含义。核心：DSL不是新语言，是用Kotlin语法特性构建的「看起来像专用语言」的API。`,
    tags: ["DSL应用场景", "Gradle", "Compose", "Ktor", "声明式API"],
  },
];
