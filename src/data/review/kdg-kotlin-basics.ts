import type { ReviewQuestion } from "./types";

export const kdgKotlinBasicsQuestions: ReviewQuestion[] = [
  {
    id: "kdg-kb-1",
    chapter: "kdg-kotlin-basics",
    level: 1,
    question: "Kotlin中`val`和`var`有什么区别？为什么推荐优先使用`val`？",
    answer:
      "`val`（value）声明不可变引用——一旦赋值不能再指向其他对象，类似Java的final。`var`（variable）声明可变引用——可以多次重新赋值。推荐优先使用`val`的原因：①安全性——不可变引用不会被意外修改，减少并发bug。②可读性——`val`变量只需看初始化就能确定其值，`var`变量需要追踪所有赋值点。③可维护性——不可变性让代码更容易推理和重构。④函数式风格——`val`鼓励声明式编程，减少副作用。注意：`val`引用不可变不等于对象不可变——`val list = mutableListOf(1,2)`中list不能再赋值为其他List，但list可以add/remove元素。若需要真正的不可变对象，用`listOf`而非`mutableListOf`。",
    tags: ["val", "var", "不可变", "变量声明"],
  },
  {
    id: "kdg-kb-2",
    chapter: "kdg-kotlin-basics",
    level: 2,
    question: "Kotlin的空安全机制包含哪些操作符？各自的使用场景是什么？",
    answer:
      "Kotlin空安全操作符：①可空类型`?`——`String?`表示变量可为null，非空类型`String`不能赋值null，编译期检查。②安全调用`?.`——`b?.length`在b为null时返回null而不抛NPE，返回类型为`Int?`。适合链式调用：`person?.address?.city?.length`。③Elvis运算符`?:`——`b?.length ?: 0`在左侧为null时返回右侧默认值，将`Int?`收窄为`Int`。适合提供默认值。④非空断言`!!`——`b!!.length`在b为null时抛NPE。不推荐使用，仅在确定非空且需快速失败时用。⑤let安全作用域——`b?.let { process(it) }`仅在b非空时执行块，适合对非空值执行多步操作。⑥智能转换——`if (b != null) return b.length`编译器自动将b当作非空String。核心原则：用`?.`+`?:`处理可空值，避免`!!`，利用智能转换消除冗余检查。",
    tags: ["空安全", "安全调用", "Elvis", "可空类型"],
  },
  {
    id: "kdg-kb-3",
    chapter: "kdg-kotlin-basics",
    level: 2,
    question: "Kotlin的`when`表达式与Java的`switch`有什么区别？",
    answer:
      "Kotlin`when`与Java`switch`的区别：①when是表达式——有返回值，可赋值给变量：`val x = when(y) { ... }`；switch是语句，无返回值。②分支匹配更强大——when支持单值（`1 ->`）、多值（`2, 3 ->`）、范围（`in 4..10 ->`）、类型检查（`is String ->`，带智能转换）、条件表达式（`when { x > 0 -> ... }`）；switch只支持常量值匹配。③无需break——when分支自动break，不会贯穿；switch需要显式break否则贯穿。④穷尽性检查——when作为表达式时必须覆盖所有可能（else分支），编译器强制保证；switch无此保证。⑤when可不带参数——用作if-else链的更清晰替代。总之when更安全、更强大、更简洁。",
    tags: ["when", "switch", "控制流", "表达式"],
  },
  {
    id: "kdg-kb-4",
    chapter: "kdg-kotlin-basics",
    level: 1,
    question: "什么是智能转换（Smart Cast）？它如何简化代码？",
    answer:
      "智能转换是Kotlin编译器在类型检查（`is`）通过后，自动将变量当作目标类型使用，无需手动强转（`as`）。工作原理：编译器在`if (obj is String)`的条件块内，将`obj`的类型从`Any`收窄为`String`，后续可直接调用`obj.length`等String成员。适用场景：①if分支——`if (obj is String) println(obj.length)`。②when分支——`when(obj) { is String -> obj.length; is Int -> obj + 1 }`。③逻辑与——`if (obj is String && obj.length > 5)`。限制：智能转换只对val和局部var有效，对可变类属性无效（因为可能在检查和使用之间被其他线程修改）。智能转换消除了Java中`if (obj instanceof String) { String s = (String) obj; s.length(); }`这种冗余的检查+强转模式，代码更简洁安全。",
    tags: ["智能转换", "Smart Cast", "is", "类型检查"],
  },
];
