import type { ReviewQuestion } from "./types";

export const kiaKotlinIntroQuestions: ReviewQuestion[] = [
  {
    id: "kia-ki-1",
    chapter: "kia-kotlin-intro",
    level: 1,
    question: `Kotlin的四大设计目标是什么？`,
    answer:
      `Kotlin的四大设计目标：①简洁——消除Java样板代码，如data class一行替代equals/hashCode/toString/copy，默认参数替代方法重载，顶层函数替代工具类。②安全——编译期消除NPE，类型系统区分非空String与可空String?，配合?.安全调用和?:Elvis运算符。③互操作——与Java 100%兼容，Kotlin可调用Java库，Java可调用Kotlin代码（加@JvmStatic/@JvmField注解），编译产物是标准.class字节码。④工具友好——IntelliJ IDEA一等支持，代码补全、重构、调试体验与Java一致。核心理念：Kotlin不是替代Java，而是让Java生态更简洁安全——编译为标准JVM字节码，与Java无缝互操作。`,
    tags: ["设计目标", "简洁", "安全", "互操作", "工具友好"],
  },
  {
    id: "kia-ki-2",
    chapter: "kia-kotlin-intro",
    level: 2,
    question: `Kotlin的编译流程是什么？如何实现与Java的互操作？`,
    answer:
      `Kotlin编译流程：.kt源码 -&gt; kotlinc编译器（语法分析、类型检查） -&gt; .class字节码（与Java同格式） -&gt; JVM运行（Kotlin与Java代码混跑）。互操作实现：①Kotlin调用Java——Kotlin可直接import Java类并使用，Java集合在Kotlin中表现为平台类型（可能为空），Android Framework/Guava/Spring等Java库均可直接调用。②Java调用Kotlin——Kotlin顶层函数编译为「文件名Kt」类的静态方法（如join.kt -&gt; JoinKt.joinToString()）；Kotlin属性编译为getter/setter；可用@JvmStatic让companion object方法变为真正的静态方法；@JvmField让属性暴露为public字段；@JvmName解决签名冲突。关键：Kotlin编译产物就是标准Java字节码，JVM不区分来源，这是互操作的基础。`,
    tags: ["编译流程", "互操作", "字节码", "JVM"],
  },
  {
    id: "kia-ki-3",
    chapter: "kia-kotlin-intro",
    level: 3,
    question: `为什么说Kotlin的空安全比Java的运行时null检查更优越？`,
    answer:
      `Kotlin空安全比Java运行时null检查更优越的原因：①编译期vs运行时——Kotlin在类型系统层面区分非空类型String和可空类型String?，编译器在编译期拦截对可空类型的直接成员访问，强制用?.或?:处理null；Java的null检查是运行时的，如果忘记检查就NPE。②消除而非检测——Kotlin将NPE从运行时异常降级为编译期错误，从根源上消除NPE而非事后检测。③工具支持——IntelliJ能基于类型系统进行更精确的null分析，而非Java的启发式推断。④安全的操作符链——\`person?.address?.city?.length\`在任一环节为null时安全返回null，Java需层层if-null检查。⑤智能转换——if (s != null)之后编译器自动将s当作非空String，无需!!.注意事项：Java互操作时存在平台类型（String!），可能为空，需显式处理或加@Nullable注解。`,
    tags: ["空安全", "类型系统", "编译期", "NPE", "平台类型"],
  },
  {
    id: "kia-ki-4",
    chapter: "kia-kotlin-intro",
    level: 2,
    question: `Kotlin相比Java在哪些方面减少了样板代码？`,
    answer:
      `Kotlin减少Java样板代码的方面：①数据类——Java需手写equals/hashCode/toString/copy或用Lombok；Kotlin一行\`data class User(val name: String, val age: Int)\`自动生成。②方法重载——Java需写多个同名不同参方法；Kotlin用默认参数\`fun greet(name: String = \"World\")\`一个函数搞定。③工具类——Java需写\`StringUtils.isEmpty(s)\`静态工具类；Kotlin用顶层函数和扩展函数直接\`"abc".isEmpty()\`。③类型转换——Java需显式instanceof + 强制转换\`if (e instanceof String) { String s = (String) e; }\`；Kotlin智能转换\`if (e is String) { e.length }\`自动转换。④单例——Java需双重检查锁+volatile；Kotlin一行\`object Singleton\`。⑤回调——Java需匿名内部类或lambda；Kotlin末尾Lambda约定让DSL式API更自然。⑥属性访问——Java需getter/setter；Kotlin属性直接\`p.name\`，编译器自动生成getter/setter。`,
    tags: ["样板代码", "data class", "默认参数", "扩展函数", "智能转换"],
  },
];
