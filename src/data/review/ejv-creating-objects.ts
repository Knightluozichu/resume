import type { ReviewQuestion } from "./types";

export const ejvCreatingObjectsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-co-1",
    chapter: "ejv-creating-objects",
    level: 2,
    question: "静态工厂方法相比构造器有哪些优势？",
    answer:
      "静态工厂方法有五大优势：①有名称——可以取一个能描述返回对象特征的名字，比构造器更易读，如 `Boolean.valueOf(true)` 比 `new Boolean(true)` 更清晰；②不必每次创建新对象——可以返回预先构造好的实例（如 Boolean.TRUE/FALSE），实现不可变类的实例控制，节省内存；③可以返回原返回类型的子类型——如 `Collections.emptyList()` 返回 `List` 但实际是 `EmptyList`，API 更简洁；④返回的对象可以随着每次调用而改变——取决于参数值，工厂方法可以返回不同的子类；⑤返回的类在编写该静态工厂方法时可以不存在——这是服务提供者框架（如 JDBC）的基础。缺点：类如果不含 public 构造器则不能被实例化（但有静态工厂可以）；静态工厂方法不容易在文档中被找到（需用约定命名如 from/of/valueOf/getInstance）。",
    tags: ["静态工厂", "创建对象"],
  },
  {
    id: "ejv-co-2",
    chapter: "ejv-creating-objects",
    level: 3,
    question: "Builder 模式解决了什么问题？它相比 telescoping 构造器和 JavaBeans 模式有什么优势？",
    answer:
      "Builder 模式解决了多参数构造器的可读性和安全性问题。telescoping 构造器（重叠构造器）模式下，参数越多越难写、越易错——`new Pizza(12, true, false, true, false, true)` 中每个 boolean 是什么含义无法区分。JavaBeans 模式（set 逐个调用）虽然可读，但构造过程不原子——中间状态可能不一致，且无法保证不可变性。Builder 模式优势：①参数顺序灵活——`.size(12).cheese().pepperoni()` 每个方法名即参数名；②保证不可变——build() 一次性创建对象，之后不可修改；③可设置默认值——Builder 中预先填充默认值，调用方只关心需要改的；④可做参数校验——build() 时一次性校验所有约束。缺点：创建对象前先创建 Builder 有性能开销，不适合性能关键路径；代码量比构造器稍多。",
    tags: ["Builder", "设计模式"],
  },
  {
    id: "ejv-co-3",
    chapter: "ejv-creating-objects",
    level: 3,
    question: "try-with-resources 相比传统的 try-finally 有什么优势？什么情况下必须用它？",
    answer:
      "try-with-resources 是 Java 7 引入的语法糖，自动管理实现了 AutoCloseable 接口的资源。优势：①代码更简洁——不需要手写 finally 块的 close() 调用；②正确处理资源关闭异常——如果 try 块和 close 都抛异常，try-with-resources 会把 close 的异常作为 suppressed exception 附在 try 块的异常上（通过 addSuppressed），而 try-finally 中 close 的异常会覆盖 try 块的异常，丢失真正的错误信息；③可同时关闭多个资源——按声明逆序关闭，且每个资源的异常都不会丢失。必须用它的场景：凡是使用需要关闭的资源（InputStream/OutputStream/Connection/Statement/ResultSet/Reader/Writer 等任何 AutoCloseable），都必须用 try-with-resources。Joshua Bloch 的建议是：try-finally 用于关闭资源已经是过时的做法，应该一律替换为 try-with-resources。",
    tags: ["try-with-resources", "资源管理"],
  },
  {
    id: "ejv-co-4",
    chapter: "ejv-creating-objects",
    level: 4,
    question: "「避免创建不必要的对象」和「清除过期的对象引用」这两条建议的核心区别是什么？分别解决什么问题？",
    answer:
      "两条建议的方向相反但目标一致——都是优化内存使用。「避免创建不必要的对象」是「不要创建太多」：如 `String s = new String(\"hello\")` 每次创建新对象，应该用 `String s = \"hello\"` 复用字符串常量池；`Boolean.valueOf(true)` 复用单例而不是 `new Boolean(true)`；自动装箱 `Long sum = 0L` 在循环中 `sum += i` 会创建大量临时 Long 对象，应该用 `long sum = 0L`。解决的是「无谓的对象创建导致 GC 压力增大」。「清除过期的对象引用」是「不要留太久」：如 Stack 的 pop 方法只移动指针但不把数组引用置 null，导致弹出的对象无法被 GC 回收（内存泄漏）；缓存中过期条目不清理也会泄漏。解决的是「对象已经不再使用但仍被引用导致无法回收」。区别：前者关注「创建阶段」的浪费，后者关注「销毁阶段」的遗漏；前者是性能优化，后者是正确性保障（内存泄漏是 bug）。",
    tags: ["内存管理", "性能"],
  },
];
