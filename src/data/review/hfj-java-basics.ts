import type { ReviewQuestion } from "./types";

export const hfjJavaBasicsQuestions: ReviewQuestion[] = [
  {
    id: "hfj-jb-1",
    chapter: "hfj-java-basics",
    level: 1,
    question: "Java 中基本数据类型有哪些？它们和引用类型有什么区别？",
    answer:
      "Java 有8种基本数据类型：①整数——byte(8位)、short(16位)、int(32位)、long(64位)；②浮点——float(32位)、double(64位)；③字符——char(16位Unicode)；④布尔——boolean(true/false)。基本类型与引用类型的区别：基本类型的变量直接存储值，存在栈上；引用类型的变量存储对象的地址（引用），对象本身在堆上。基本类型有默认值（int=0, boolean=false），引用类型默认值为 null。基本类型赋值是值拷贝，引用类型赋值是引用拷贝（指向同一对象）。",
    tags: ["基本类型", "引用类型", "栈与堆"],
  },
  {
    id: "hfj-jb-2",
    chapter: "hfj-java-basics",
    level: 2,
    question: "`int x = 5;` 和 `String s = new String(\"hi\");` 在内存中分别如何存储？",
    answer:
      "`int x = 5;`——x 是基本类型变量，值 5 直接存储在栈上。变量 x 就代表值 5 本身，没有引用，没有堆对象。\n`String s = new String(\"hi\");`——分两步：①在堆上创建一个 String 对象，内容为 \"hi\"；②在栈上创建引用变量 s，存储堆对象的地址。s 不直接存 \"hi\"，而是存指向堆对象的引用。如果执行 `String s2 = s;`，则 s2 和 s 指向同一个堆对象，修改对象内容两个引用都看得见。而 `int y = x;` 则是纯粹的值拷贝，y 和 x 互不影响。",
    tags: ["内存模型", "栈与堆", "引用"],
  },
  {
    id: "hfj-jb-3",
    chapter: "hfj-java-basics",
    level: 3,
    question: "Java 中 `==` 和 `.equals()` 有什么区别？为什么 String 比较要用 `.equals()`？",
    answer:
      "`==` 比较的是引用地址（对于引用类型）或值（对于基本类型）。`.equals()` 是 Object 类定义的方法，默认行为也是比较引用地址，但很多类（如 String、Integer）重写了它来比较内容。\nString 比较要用 `.equals()`：因为 `==` 比较的是两个引用是否指向同一个对象。`new String(\"a\") == new String(\"a\")` 为 false，因为创建了两个不同对象；但 `new String(\"a\").equals(new String(\"a\"))` 为 true，因为 String 重写了 equals 比较字符内容。字符串常量池是一种优化（`\"a\" == \"a\"` 可能为 true），但依赖它是不安全的，始终用 `.equals()` 比较内容。",
    tags: ["==", "equals", "String"],
  },
  {
    id: "hfj-jb-4",
    chapter: "hfj-java-basics",
    level: 3,
    question: "Java 的 main 方法为什么是 `public static void main(String[] args)`？每个关键字的作用？",
    answer:
      "`public`——JVM 需要从外部调用 main 方法，必须是公开的，否则 JVM 无法访问。\n`static`——JVM 启动时还没有创建任何对象实例，static 方法属于类而非对象，可以直接通过类名调用，不需要 new。\n`void`——main 方法不返回值给 JVM，程序退出码由 System.exit() 或 JVM 异常决定。\n`main`——方法名，JVM 约定查找的入口名称，必须精确匹配。\n`String[] args`——命令行参数数组，JVM 把启动时传入的参数打包传给程序。如 `java MyApp arg1 arg2`，则 args[0]=\"arg1\", args[1]=\"arg2\"。如果签名不匹配，JVM 会报 NoSuchMethodError。",
    tags: ["main方法", "static", "入口点"],
  },
];
