import type { ReviewQuestion } from "./types";

export const dujClassLoaderQuestions: ReviewQuestion[] = [
  {
    id: "duj-cl-1",
    chapter: "duj-class-loader",
    level: 1,
    question: "类加载的七阶段生命周期是什么？各阶段做了什么？",
    answer: "七阶段：加载→验证→准备→解析→初始化→使用→卸载（验证+准备+解析=连接）。①加载——通过全限定名获取二进制字节流，转为方法区数据结构，在堆生成Class对象。②验证——确保Class文件符合JVM规范（文件格式/元数据/字节码/符号引用验证）。③准备——为static变量分配内存设默认零值（非代码值），static final常量在此赋真实值。④解析——符号引用替换为直接引用。⑤初始化——执行<clinit>方法（static赋值+static块），JVM保证线程安全。⑥使用。⑦卸载——满足三条件（实例全回收/ClassLoader回收/Class无引用）时GC回收。",
    tags: ["类加载", "七阶段", "生命周期"],
  },
  {
    id: "duj-cl-2",
    chapter: "duj-class-loader",
    level: 2,
    question: "双亲委派模型的工作原理是什么？为什么需要双亲委派？",
    answer: "工作原理：类加载器收到请求时先不自己加载，而是委派给父加载器，每一层都如此，最终传到Bootstrap。只有父加载器无法完成时子加载器才尝试。层次：Bootstrap（加载rt.jar）→Ext/Platform（加载ext目录）→App（加载classpath）→自定义。需要双亲委派的原因：①安全性——保证核心类（如java.lang.String）只被Bootstrap加载，用户无法伪造；②唯一性——同一类在JVM中只有一份，避免重复加载；③层次清晰——各级加载器各司其职。",
    tags: ["双亲委派", "类加载器", "安全性"],
  },
  {
    id: "duj-cl-3",
    chapter: "duj-class-loader",
    level: 3,
    question: "SPI机制如何打破双亲委派？线程上下文类加载器的作用是什么？",
    answer: "SPI问题：接口（如java.sql.Driver）在rt.jar由Bootstrap加载，实现在classpath由App加载。Bootstrap看不到App的类（父加载器看不到子加载器的类），无法用常规方式加载实现。解决方案——线程上下文类加载器（TCCL）：TCCL存在于每个线程中默认值是AppClassLoader。DriverManager（Bootstrap加载的类）在加载JDBC实现时，不用自己的Bootstrap加载器，而是通过TCCL获取当前线程的AppClassLoader来加载classpath中的实现类。这实现了「父加载器委托子加载器加载类」的逆向委派，打破双亲委派。其他打破场景：OSGi（网状委派）、Tomcat（每个WebApp独立ClassLoader先自己加载再委派父）。",
    tags: ["SPI", "TCCL", "打破双亲委派", "JDBC"],
  },
  {
    id: "duj-cl-4",
    chapter: "duj-class-loader",
    level: 2,
    question: "什么情况下会触发类的初始化？什么情况下不会？",
    answer: "触发初始化（主动引用）：①new/getstatic/putstatic/invokestatic四条字节码指令；②反射调用（Class.forName）；③初始化子类时父类未初始化先触发父类；④JVM启动主类（含main）；⑤MethodHandle对应类。不触发初始化（被动引用）：①通过子类引用父类静态字段只初始化父类；②通过数组定义引用类不初始化（但初始化数组类）；③访问static final常量（ConstantValue属性，编译期存入调用方常量池）不初始化。区分意义：理解哪些操作真正触发<clinit>执行，避免意外类初始化开销或初始化顺序错误。",
    tags: ["类初始化", "主动引用", "被动引用"],
  },
];
