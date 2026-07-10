import type { ReviewQuestion } from "./types";

export const kdgAdvancedTypesQuestions: ReviewQuestion[] = [
  {
    id: "kdg-at-1",
    chapter: "kdg-advanced-types",
    level: 2,
    question: `Kotlin的协变\`out\`和逆变\`in\`分别是什么含义？PECS原则如何理解？`,
    answer:
      `协变（out）和逆变（in）是泛型型变的两种形式：①协变out——标记类型参数为\`out T\`表示T只能出现在返回位置（生产者）。此时\`Producer<Dog>\`是\`Producer<Animal>\`的子类型（Dog是Animal子类型时），可以安全赋值。因为只读不写，不会发生类型不安全的写入。②逆变in——标记类型参数为\`in T\`表示T只能出现在参数位置（消费者）。此时\`Consumer<Animal>\`是\`Consumer<Dog>\`的子类型（注意方向反转），可以安全赋值。因为只写不读，传入的任何Dog都能被当作Animal处理。PECS原则（Producer Extends, Consumer Super）= Kotlin的\`out\`/\`in\`：如果泛型类型只生产T（返回T），用out协变；如果只消费T（接收T参数），用in逆变。Kotlin标准库中\`List<out T>\`是协变只读集合，\`MutableList<T>\`是不变可变集合（既读又写），\`Comparator<in T>\`是逆变的比较器。不变形（不用out/in）意味着既不能安全地\`List<Dog>\`赋给\`List<Animal>\`也不能反向。`,
    tags: ["协变", "逆变", "out", "in", "PECS", "型变"],
  },
  {
    id: "kdg-at-2",
    chapter: "kdg-advanced-types",
    level: 2,
    question: `什么是星投影\`*\`？它与Java的通配符\`?\`有什么关系？`,
    answer:
      `星投影\`*\`表示类型参数未知但使用安全。\`Box<*>\`表示「一个Box，但不知道T是什么类型」。使用规则：①对于协变\`out T\`——\`Box<*>\`的T投影为\`Any?\`，可以读取（返回Any?）但不能写入。②对于逆变\`in T\`——\`Box<*>\`的T投影为\`Nothing\`，可以写入（接受Nothing即不可写）但不能读取。③对于不变T——\`Box<*>\`的读取返回Any?，写入被禁止。应用场景：①当不关心具体类型参数时——\`fun printSize(box: Box<*>) = println(box.value)\`。②多类型参数的部分投影——\`Map<String, *>\`表示key是String，value未知。与Java通配符\`?\`的关系：Kotlin的\`*\`等价于Java的\`?\`（无界通配符）。Kotlin的\`out T\`等价于Java的\`? extends T\`，\`in T\`等价于Java的\`? super T\`。Kotlin在声明端用out/in（declaration-site variance），Java在使用端用\`? extends\`/\`? super\`（use-site variance），Kotlin的星投影是使用端的补充手段。`,
    tags: ["星投影", "通配符", "泛型", "Java互操作"],
  },
  {
    id: "kdg-at-3",
    chapter: "kdg-advanced-types",
    level: 3,
    question: `\`reified\`具体化类型参数解决了什么问题？为什么必须配合\`inline\`？`,
    answer:
      `\`reified\`解决了泛型类型擦除（Type Erasure）的问题。JVM上的泛型在运行时被擦除——\`List<Int>\`和\`List<String>\`在运行时都是\`List\`，无法用\`T::class\`获取T的类型，也无法用\`x is T\`做运行时类型检查。\`reified\`让类型参数T在调用处被实际类型替换，从而保留运行时类型信息。必须配合\`inline\`的原因：inline函数的体在调用处展开，编译器在展开时知道T的具体类型（如调用\`filterType<Int>()\`时T=Int），因此可以将T替换为Int。非inline函数编译为独立的方法，T在方法签名中被擦除，无法保留。reified的应用场景：①运行时类型检查——\`inline fun <reified T> isType(x: Any) = x is T\`。②类型安全的JSON解析——\`inline fun <reified T> Gson.fromJson(json: String): T = fromJson(json, T::class.java)\`。③类型过滤——\`filterIsInstance<T>()\`。④启动Activity（Android）——\`inline fun <reified T : Activity> Context.startActivity()\`。限制：reified函数只能是inline的，增大字节码体积；reified类型参数不能用作普通类的类型参数。`,
    tags: ["reified", "类型擦除", "inline", "泛型", "运行时类型"],
  },
  {
    id: "kdg-at-4",
    chapter: "kdg-advanced-types",
    level: 3,
    question: `设计一个类型安全的泛型Repository API，说明你的型变选择。`,
    answer:
      `设计一个类型安全的Repository泛型API：①数据源接口DataSource用协变out——\`interface DataSource<out T> { fun get(id: String): T?; fun getAll(): List<T> }\`，只读生产者，\`DataSource<User>\`可以安全赋给\`DataSource<Any>\`。②数据接收器DataSink用逆变in——\`interface DataSink<in T> { fun save(item: T); fun saveAll(items: List<T>) }\`，只写消费者，\`DataSink<Any>\`可以安全赋给\`DataSink<User>\`。③Repository用不变T——\`class Repository<T>(source: DataSource<T>, sink: DataSink<T>)\`，既读又写，如果协变外部可能写入错误类型，如果逆变读取返回类型不安全。型变选择理由：①DataSource只产出T（get返回T），用out协变——DataSource<User>可以安全地当作DataSource<Any>使用，因为读出来的User一定能当Any用。②DataSink只消费T（save接收T），用in逆变——DataSink<Any>可以安全地当作DataSink<User>使用，因为传入的User一定能被Any的sink接受。③Repository既读又写，不变——保证类型安全。这套设计让类型系统保证读写安全，编译器阻止不安全的赋值。`,
    tags: ["泛型", "Repository", "型变设计", "类型安全", "PECS"],
  },
];
