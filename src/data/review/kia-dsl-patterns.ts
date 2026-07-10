import type { ReviewQuestion } from "./types";

export const kiaDslPatternsQuestions: ReviewQuestion[] = [
  {
    id: "kia-dsl-1",
    chapter: "kia-dsl-patterns",
    level: 1,
    question: `Kotlin的带接收者Lambda是什么？它和普通Lambda有什么区别？`,
    answer:
      `带接收者的Lambda（Lambda with receiver）是Kotlin DSL的核心机制。区别：①普通Lambda——参数以it引用，需用it.前缀访问：\`list.forEach { println(it) }\`，it是隐式参数。②带接收者Lambda——接收者成为this，可直接访问其成员无需前缀：\`String.() -> Unit\`类型中String是接收者类型，在Lambda体内this指向String对象，可直接调用\`length\`而非\`it.length\`。示例：\`fun buildString(init: StringBuilder.() -> Unit): String { val sb = StringBuilder(); sb.init(); return sb.toString() }\`，调用\`buildString { append("Hello"); append("World") }\`在块内直接调用append()因为this是StringBuilder。意义：带接收者Lambda让Lambda块看起来像在「配置」一个对象，是类型安全构建器的基础。如HTML DSL中\`html { body { p("text") } }\`，每个嵌套块内的this是当前HTML标签。普通Lambda中接收者是参数（需it.），带接收者Lambda中接收者是this（直接访问），这是语法糖但表达力质的飞跃。`,
    tags: ["带接收者Lambda", "DSL", "this", "it", "类型安全构建器"],
  },
  {
    id: "kia-dsl-2",
    chapter: "kia-dsl-patterns",
    level: 2,
    question: `如何用Kotlin构建一个类型安全的HTML DSL？核心设计是什么？`,
    answer:
      `构建类型安全HTML DSL的核心设计：①定义标签类——\`abstract class Tag(val name: String) { val children = mutableListOf<Tag>(); fun <T : Tag> initTag(tag: T, init: T.() -> Unit): T { tag.init(); children.add(tag); return tag } }\`。②具体标签类——\`class HTML : Tag("html") { fun body(init: Body.() -> Unit) = initTag(Body(), init) }\`，\`class Body : Tag("body") { fun p(text: String) { children.add(TextTag("p", text)) } }\`。③入口函数——\`fun html(init: HTML.() -> Unit): HTML { val html = HTML(); html.init(); return html }\`。④使用——\`html { body { p("Hello") } }\`看起来像HTML语法。⑤类型安全——编译器保证body只能在html块内调用、p只能在body块内调用，不会出现html中嵌套html等非法结构。⑥渲染——Tag类实现render()递归输出HTML字符串。核心：每个标签的子标签方法用带接收者Lambda定义，Lambda的接收者类型限制了块内可调用的方法，实现编译期结构约束。配合@DslMarker防止隐式接收者污染。`,
    tags: ["HTML DSL", "类型安全构建器", "标签类", "带接收者Lambda"],
  },
  {
    id: "kia-dsl-3",
    chapter: "kia-dsl-patterns",
    level: 3,
    question: `Kotlin的@DslMarker解决了什么问题？它是如何工作的？`,
    answer:
      `@DslMarker解决DSL中隐式接收者污染问题。问题：在嵌套的带接收者Lambda中，内层Lambda可以访问所有外层Lambda的this（隐式接收者），导致非预期行为。如\`html { body { body { } } }\`——内层body块内this同时指向内层body和外层html，编译器无法阻止在body内再嵌套body（HTML语义上body不应嵌套body）。@DslMarker解决方案：①定义标记注解——\`@DslMarker annotation class HtmlDslMarker\`。②标记标签类——\`@HtmlDslMarker abstract class Tag\`，所有子类继承标记。③编译器限制——当多个接收者有相同的DslMarker时，编译器只允许访问最近的（最内层）接收者的成员，外层接收者的成员必须显式用this@outerLabel访问。效果：\`html { body { body { } } }\`编译报错，因为外层body和内层body都有HtmlDslMarker标记，内层不能隐式访问外层body的成员。意义：让DSL在保持简洁语法的同时防止误用，是类型安全DSL的关键工具。Gradle Kotlin DSL、Anko、Ktor HTML DSL等都使用了@DslMarker。`,
    tags: ["@DslMarker", "隐式接收者", "作用域控制", "DSL安全"],
  },
  {
    id: "kia-dsl-4",
    chapter: "kia-dsl-patterns",
    level: 2,
    question: `Kotlin的中缀调用（infix）和运算符重载如何增强DSL表达力？`,
    answer:
      `Kotlin的中缀调用和运算符重载增强DSL表达力：①infix中缀调用——用infix关键字标记的单参数函数可省略点号和括号，如\`infix fun Int.times(str: String): String = str.repeat(this)\`，调用\`3 times "abc"\`等价于\`3.times("abc")\`。标准库的\`1 to "one"\`创建Pair、\`"a" in list\`检查包含都是infix。用途：让API读起来像自然语言，如测试框架\`assertThat(result) shouldEqual expected\`。②运算符重载——用operator关键字标记约定方法名，如\`operator fun plus(other: Vector) = Vector(x + other.x, y + other.y)\`，然后\`v1 + v2\`直接用+运算符。可重载的运算符：算术（+ - * / %）、比较（< > ==）、索引（[]）、范围（..）、in、invoke()等。用途：数学向量、矩阵运算、集合操作。与DSL结合：infix让链式调用更自然（\`list map { it * 2 } filter { it > 0 }\`），运算符重载让自定义类型像内置类型一样使用。注意：不过度使用，保持语义清晰——重载+应该是加法语义而非完全无关的操作。`,
    tags: ["infix", "运算符重载", "operator", "DSL表达力"],
  },
];
