import type { ReviewQuestion } from "./types";

export const kiaLambdaMembersQuestions: ReviewQuestion[] = [
  {
    id: "kia-lm-1",
    chapter: "kia-lambda-members",
    level: 1,
    question: `Kotlin的Lambda语法有哪些约定？什么是末尾Lambda约定？`,
    answer:
      `Kotlin的Lambda语法约定：①完整语法——\`{ x: Int, y: Int -> x + y }\`，参数列表在->前，函数体在->后。②类型推断——参数类型可省略\`{ x, y -> x + y }\`，编译器从上下文推断。③it隐式参数——当Lambda只有一个参数时，可省略参数声明，用it引用该参数：\`{ it * 2 }\`等价于\`{ x -> x * 2 }\`。④末尾Lambda约定——当函数最后一个参数是函数类型时，Lambda可放在括号外：\`list.filter() { it > 0 }\`，甚至省略空括号\`list.filter { it > 0 }\`。这让DSL式API成为可能（如\`html { body { p("text") } }\`）。⑤解构声明——Lambda参数可用解构\`map.map { (key, value) -> "$key=$value" }\`。末尾Lambda约定的意义：让嵌套的Lambda调用看起来像自然语言的块结构，是Kotlin DSL设计的基础。标准库中forEach、let、apply、filter等高阶函数都利用了这个约定。`,
    tags: ["Lambda语法", "it", "末尾Lambda", "类型推断", "DSL"],
  },
  {
    id: "kia-lm-2",
    chapter: "kia-lambda-members",
    level: 2,
    question: `Kotlin的inline内联函数解决了什么问题？它的原理是什么？`,
    answer:
      `Kotlin的inline内联函数解决高阶函数的性能开销问题。问题：普通高阶函数的Lambda参数在编译时会创建Function匿名类对象（如Function1<Integer, Integer>），每次调用都创建对象，有GC压力。Lambda无法访问外层的return（非局部返回）。原理：inline关键字让编译器将函数体和Lambda体直接展开（复制）到调用处，消除运行时对象创建和函数调用开销。如\`inline fun measure(block: () -> Unit) { ...; block(); ... }\`调用处会直接内联block的代码。优势：①零运行时开销——无匿名类创建，无GC压力。②支持非局部返回——Lambda中的return直接从外层函数返回（因为代码被内联了）。③支持reified类型参数——\`inline fun <reified T> filterByType()\`可在运行时获取T的Class对象。代价：①代码膨胀——内联的函数体在每处调用都复制一份，增大字节码体积。②不能内联递归函数。最佳实践：高阶函数（特别是集合操作）加inline，普通函数不加。`,
    tags: ["inline", "内联函数", "性能", "非局部返回", "reified"],
  },
  {
    id: "kia-lm-3",
    chapter: "kia-lambda-members",
    level: 2,
    question: `Kotlin标准库的作用域函数（let/run/apply/also/with）有什么区别？如何选择？`,
    answer:
      `五个作用域函数的区别在两个维度：①接收者引用——this（作为接收者）还是it（作为参数）。②返回值——返回对象本身还是Lambda结果。选择矩阵：①apply——this + 返回对象本身。用于对象配置/构建器，如\`StringBuilder().apply { append("a"); append("b") }.toString()\`。②also——it + 返回对象本身。用于副作用链式调用（日志/调试），不改原对象，如\`list.also { println(it) }.filter { ... }\`。③let——it + 返回Lambda结果。用于null安全作用域和变量重命名，如\`str?.let { println(it.length) }\`。④run——this + 返回Lambda结果。用于对象配置后返回结果，如\`val len = "hello".run { length }\`。⑤with——this + 返回Lambda结果（非扩展函数，第一个参数为接收者）。用于对同一对象多次操作分组，如\`with(config) { setA(1); setB(2); build() }\`。记忆口诀：配置用apply/also（返回本身），计算用let/run/with（返回结果）；需重命名用let（it可改名），需this上下文用apply/run/with。`,
    tags: ["作用域函数", "let", "run", "apply", "also", "with", "this", "it"],
  },
  {
    id: "kia-lm-4",
    chapter: "kia-lambda-members",
    level: 3,
    question: `用Kotlin的集合函数式操作（map/filter/reduce/groupBy/flatMap）实现一个实际的数据处理场景。`,
    answer:
      `场景：处理学生成绩列表，按科目分组并计算每科平均分，过滤出平均分及格的科目。代码：\`data class Score(val subject: String, val score: Int)\`。数据处理链：①\`scores.filter { it.score >= 0 }\`——过滤无效分数。②\`.groupBy { it.subject }\`——按科目分组得到Map<String, List<Score>>。③\`.mapValues { (_, list) -> list.map { it.score }.average() }\`——计算每科平均分得到Map<String, Double>。④\`.filterValues { it >= 60 }\`——过滤平均分及格的科目。⑤\`.forEach { (subject, avg) -> println("$subject: $avg") }\`——打印结果。完整：\`scores.filter { it.score >= 0 }.groupBy { it.subject }.mapValues { it.value.map { s -> s.score }.average() }.filterValues { avg -> avg >= 60 }.forEach { (k, v) -> println("$k: $v") }\`。要点：①链式调用天然表达数据处理管道。②每个操作返回新集合（不修改原集合），符合函数式编程不可变原则。③groupBy返回Map，mapValues对Map的值做变换。④解构声明\`(subject, list)\`提取Map.Entry的key和value。⑤可进一步用asSequence()将中间集合替换为Sequence实现惰性求值，减少中间集合创建。`,
    tags: ["集合操作", "map", "filter", "groupBy", "reduce", "链式调用"],
  },
];
