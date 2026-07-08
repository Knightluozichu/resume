import type { ReviewQuestion } from "./types";

export const jctJavaFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "jct-jf-1",
    chapter: "jct-java-fundamentals",
    level: 1,
    question: "Java 有哪 8 种基本数据类型？它们的默认值分别是什么？",
    answer:
      "8种基本数据类型：整数——byte(1字节,-128~127)、short(2字节)、int(4字节,默认整数类型)、long(8字节,需加L后缀)；浮点——float(4字节,需加F后缀)、double(8字节,默认浮点类型)；字符——char(2字节,Unicode)；布尔——boolean(true/false)。默认值：数值类型为0（int→0, long→0L, double→0.0d等），char为'\\u0000'，boolean为false。注意：局部变量没有默认值，必须显式初始化才能使用，否则编译报错。基本类型直接存值于栈内存，效率高。",
    tags: ["基本类型", "变量"],
  },
  {
    id: "jct-jf-2",
    chapter: "jct-java-fundamentals",
    level: 2,
    question: "Java 中 `==` 和 `equals()` 有什么区别？String 比较时应该用哪个？",
    answer:
      "`==` 比较的是引用地址（对于引用类型）或值（对于基本类型）。`equals()` 是 Object 类的方法，默认实现也是比较地址，但 String、Integer 等类重写了它来比较内容。String 比较必须用 `equals()`：`new String(\"a\") == new String(\"a\")` 为 false（不同对象地址不同），但 `equals()` 为 true（内容相同）。字符串常量池：`String s = \"a\"` 字面量会进常量池，`String s = new String(\"a\")` 创建新对象。`s1 == s2` 只有都指向常量池同一对象时才为 true。安全做法：始终用 `equals()` 比较 String 内容。Integer 有 -128~127 缓存，此范围 `==` 可能为 true，超出则 false，所以 Integer 比较也应用 `equals()`。",
    tags: ["==", "equals", "String"],
  },
  {
    id: "jct-jf-3",
    chapter: "jct-java-fundamentals",
    level: 3,
    question: "Java 异常体系是怎样的？checked 和 unchecked 异常的区别和使用场景？",
    answer:
      "异常体系：Throwable 是根，分为 Error 和 Exception。Error 是 JVM 严重错误（OutOfMemoryError、StackOverflowError），程序无法恢复不应捕获。Exception 分为 checked 和 unchecked。Checked Exception（IOException、SQLException）编译期检查，必须 try-catch 或 throws 声明，适合可恢复的外部错误。Unchecked Exception（RuntimeException 子类：NullPointerException、IndexOutOfBoundsException、ClassCastException）编译器不强制处理，适合编程错误。使用场景：文件不存在、网络超时等外部可恢复错误用 checked；空指针、数组越界等编程逻辑错误用 unchecked。自定义异常继承 Exception（checked）或 RuntimeException（unchecked）。try-with-resources（Java 7+）自动关闭实现 AutoCloseable 的资源，无需 finally 手动 close。",
    tags: ["异常", "checked", "unchecked"],
  },
  {
    id: "jct-jf-4",
    chapter: "jct-java-fundamentals",
    level: 3,
    question: "String、StringBuilder 和 StringBuffer 三者的区别是什么？什么场景用哪个？",
    answer:
      "三者区别：①String 不可变——每次修改（拼接、截取）都创建新对象，线程安全（不可变天然安全），适合不频繁修改的字符串。②StringBuilder 可变——在原对象上修改，不创建新对象，非线程安全，性能最好。③StringBuffer 可变且线程安全——方法用 synchronized 修饰，性能略低于 StringBuilder。性能：StringBuilder > StringBuffer > String（频繁拼接时）。使用场景：字符串不变化或极少变化用 String；单线程频繁拼接（如循环构建字符串）用 StringBuilder；多线程频繁拼接用 StringBuffer。常见误区：在循环中用 `s += \"a\"` 每次创建新 String 对象和 StringBuilder 临时对象，应改为 StringBuilder.append()。Java 编译器会自动优化 `s += \"a\"` 为 StringBuilder，但循环内每次迭代都 new StringBuilder，仍应手动提到循环外。",
    tags: ["String", "StringBuilder", "性能"],
  },
];
