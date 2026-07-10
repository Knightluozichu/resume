import type { ReviewQuestion } from "./types";

export const kdgFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "kdg-fn-1",
    chapter: "kdg-functions",
    level: 1,
    question: `Kotlin高阶函数是什么？函数类型如何声明？`,
    answer:
      `高阶函数是接收函数作为参数或返回函数作为结果的函数。Kotlin用函数类型来描述函数的签名：\`(参数类型列表) -> 返回类型\`。例如\`(Int) -> Int\`表示接收一个Int参数返回Int的函数；\`(String, Int) -> Boolean\`表示接收String和Int返回Boolean的函数；\`() -> Unit\`表示无参无返回值的函数。高阶函数的典型用途：①函数作为参数——\`fun apply(f: (Int) -> Int, x: Int) = f(x)\`，将行为参数化。②函数作为返回值——\`fun multiplier(n: Int): (Int) -> Int = { it * n }\`，函数工厂模式。③集合操作——\`list.map { it * 2 }\`中map的参数\`(T) -> R\`就是函数类型。高阶函数是函数式编程的基础，让代码更灵活、更声明式。`,
    tags: ["高阶函数", "函数类型", "函数式编程"],
  },
  {
    id: "kdg-fn-2",
    chapter: "kdg-functions",
    level: 2,
    question: `Kotlin的Lambda表达式有哪些语法约定？`,
    answer:
      `Kotlin Lambda语法约定：①完整语法——\`{ 参数列表 -> 函数体 }\`，如\`{ x: Int, y: Int -> x + y }\`。②类型推断——当Lambda赋值给有明确类型的变量时，可省略参数类型：\`val f: (Int) -> Int = { x -> x * 2 }\`。③it隐式参数——单参数Lambda的参数可省略，用\`it\`引用：\`{ it * 2 }\`等价于\`{ x -> x * 2 }\`。④末尾Lambda约定——函数的最后一个参数是函数类型时，Lambda可移到括号外：\`list.filter({ it > 0 })\`简化为\`list.filter { it > 0 }\`。⑤无参Lambda——\`{ println(\"hi\") }\`。⑥多参数Lambda——\`{ a, b -> a + b }\`。这些约定让Kotlin的函数式代码非常简洁，尤其是末尾Lambda约定使得DSL式API成为可能（如\`html { body(\"text\") }\`）。`,
    tags: ["Lambda", "it", "末尾Lambda", "语法约定"],
  },
  {
    id: "kdg-fn-3",
    chapter: "kdg-functions",
    level: 2,
    question: `Kotlin集合的\`map\`、\`filter\`、\`reduce\`各自的作用是什么？如何链式组合？`,
    answer:
      `Kotlin集合三大核心操作：①map——变换（映射），对集合每个元素应用函数，生成新集合。\`listOf(1,2,3).map { it * 2 }\`得到\`[2,4,6]\`。类型从\`List<T>\`变为\`List<R>\`。②filter——过滤，保留满足条件的元素。\`listOf(1,2,3,4).filter { it % 2 == 0 }\`得到\`[2,4]\`。类型不变，元素可能减少。③reduce——聚合，将集合合并为单个值。\`listOf(1,2,3).reduce { acc, i -> acc + i }\`得到\`6\`。链式组合：每个操作返回新集合，可直接链式调用。例如\`numbers.filter { it > 1 }.map { it * 10 }.sortedBy { it }.forEach { println(it) }\`。注意：每次中间操作都创建新集合（eager求值），对大数据集可用\`asSequence()\`转为惰性序列。还有fold（带初始值的reduce）、groupBy（分组）、flatMap（扁平化映射）等操作。`,
    tags: ["map", "filter", "reduce", "集合操作", "链式调用"],
  },
  {
    id: "kdg-fn-4",
    chapter: "kdg-functions",
    level: 3,
    question: `\`inline\`内联函数的作用是什么？什么场景下应该使用？`,
    answer:
      `\`inline\`内联函数让编译器将函数体和Lambda参数体直接展开到调用处，消除运行时闭包对象创建开销。原理：普通高阶函数中，Lambda参数被编译为\`Function\`接口的匿名类对象，每次调用都创建对象、有内存分配和GC压力。\`inline\`标记后，编译器在调用处内联展开函数体和Lambda体，无需创建闭包对象。适用场景：①性能敏感的高阶函数——如\`withLock\`、\`forEach\`等被频繁调用的标准库函数。②需要非局部返回（non-local return）——内联函数中的Lambda可以直接return外层函数，普通Lambda不行。③reified类型参数——\`inline fun <reified T>\`需要在调用处知道T的具体类型，只有内联才能实现。不适用场景：①函数体很大——内联会增大字节码体积。②接收非内联Lambda——用\`noinline\`标记不想内联的参数。标准库的\`let\`/\`run\`/\`with\`/\`apply\`/\`also\`和集合操作函数都是inline的。`,
    tags: ["inline", "内联函数", "闭包开销", "reified", "非局部返回"],
  },
];
