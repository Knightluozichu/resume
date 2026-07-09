import type { ReviewQuestion } from "./types";

export const kiaTypeSystemQuestions: ReviewQuestion[] = [
  {
    id: "kia-ts-1",
    chapter: "kia-type-system",
    level: 1,
    question: "Kotlin的空安全机制有哪些操作符？它们各自的作用是什么？",
    answer:
      "Kotlin空安全的四个核心操作符：①?.（安全调用）——当接收者非空时调用方法/属性，为null时返回null。如`person?.name`在person为null时返回null，不抛NPE。支持链式：`person?.address?.city?.length`。②?:（Elvis运算符）——左侧为null时返回右侧默认值。如`val name = person?.name ?: \"unknown\"`，当person?.name为null时name为\"unknown\"。③!!（非空断言）——将可空类型转为非空类型，如果为null则抛NPE。如`person!!.name`如果person为null则崩溃。应尽量避免使用，只在确定非空时用。④智能转换——编译器自动追踪null检查，`if (s != null) { s.length }`中s自动转为非空String，无需?.或!!。配合is类型检查也可智能转换：`if (e is String) { e.length }`中e自动转为String。核心：Kotlin用类型系统区分String（非空）和String?（可空），编译期拦截对可空类型的直接访问，强制用上述操作符处理null，从根源消除NPE。",
    tags: ["空安全", "?.", "?:", "!!", "智能转换", "Elvis"],
  },
  {
    id: "kia-ts-2",
    chapter: "kia-type-system",
    level: 2,
    question: "Kotlin泛型的out协变和in逆变是什么？如何理解PECS原则？",
    answer:
      "Kotlin泛型型变：①out协变——`interface Producer<out T> { fun produce(): T }`，T只能出现在返回位置（生产者），Producer<String>是Producer<Any>的子类型。因为只生产T不消费T，用String生产的地方也能用Any接收。②in逆变——`interface Consumer<in T> { fun consume(t: T) }`，T只能出现在参数位置（消费者），Consumer<Any>是Consumer<String>的子类型。因为只消费T，能消费Any的也能消费String。③不变（invariant）——默认情况，MutableList<T>既读又写，MutableList<String>和MutableList<Any>无父子关系。④星投影*——`Array<*>`表示类型参数未知，等价于Array<out Any?>（只读Any?）。PECS原则（Producer Extends, Consumer Super）：生产者用out（extends），消费者用in（super）。与Java对比：Kotlin在声明处指定型变（declaration-site variance，在类定义时写out/in），Java在使用处指定（use-site variance，每次用?extends/?super），Kotlin方式更清晰。",
    tags: ["泛型", "协变", "逆变", "out", "in", "PECS", "型变"],
  },
  {
    id: "kia-ts-3",
    chapter: "kia-type-system",
    level: 2,
    question: "Kotlin的智能转换（smart cast）如何工作？有什么限制？",
    answer:
      "Kotlin智能转换：编译器在类型检查后自动将变量转换为更具体的类型，无需显式强制转换。工作方式：①is检查后——`if (e is String) { println(e.length) }`，在if块内e自动从Any转为String，可直接访问length。②!is检查后——`if (e !is String) return; e.length`，提前返回后e自动转为String。③when分支——`when (e) { is Int -> e + 1; is String -> e.length }`，每个分支内e自动转为对应类型。④null检查后——`if (s != null) { s.length }`，s从String?转为String。⑤as?安全转换——`val str = e as? String`，成功返回String，失败返回null而非ClassCastException。限制：①var可变属性——如果属性可能在检查和使用之间被其他线程修改，编译器不进行智能转换（除非是局部val变量）。②自定义getter——有自定义getter的属性可能返回不同值，不智能转换。③跨函数——智能转换只在同一作用域内有效，函数调用后失效。④需open类——is检查的类如果被继承，需确保类型安全。",
    tags: ["智能转换", "is", "as?", "类型检查", "when"],
  },
  {
    id: "kia-ts-4",
    chapter: "kia-type-system",
    level: 3,
    question: "Kotlin的reified具体化类型参数是什么？它解决了什么问题？有什么限制？",
    answer:
      "Kotlin的reified具体化类型参数解决泛型类型擦除问题。问题：JVM泛型在运行时类型擦除，`List<String>`和`List<Int>`在运行时都是List，无法用`if (list is List<String>)`检查元素类型，也无法获取T::class.java。reified方案：用`inline fun <reified T>`让编译器在调用处将T替换为实际类型，从而在运行时可用`T::class.java`获取类型。示例：`inline fun <reified T> List<*>.filterByType(): List<T> = this.filter { it is T } as List<T>`，调用`list.filterByType<String>()`能在运行时检查is T。用途：①类型安全的JSON解析——`inline fun <reified T> parse(json: String): T = gson.fromJson(json, T::class.java)`。②startActivity——`inline fun <reified T : Activity> Context.startActivity()`不需传Class参数。③依赖注入——`inline fun <reified T> inject(): T`。限制：①必须配合inline——reified依赖内联展开，所以函数必须是inline的。②不能用于普通类——只能在inline函数上，不能在类泛型上用reified。③Java不可调用——reified是Kotlin编译器特性，Java侧看不到，Java调用会报错。",
    tags: ["reified", "类型擦除", "inline", "泛型", "类型参数"],
  },
];
