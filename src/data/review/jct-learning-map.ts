import type { ReviewQuestion } from "./types";

export const jctLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jct-lm-1",
    chapter: "jct-learning-map",
    level: 2,
    question: `《Java核心技术》全书的知识递进结构是什么？为什么是这个顺序？`,
    answer:
      `全书分为四个递进阶段：①基础语法与面向对象（变量/类/继承/多态）→ ②接口Lambda与集合泛型（函数式接口/集合框架/类型擦除）→ ③I/O流与并发编程（字节流/字符流/NIO/线程/锁/线程池）→ ④高级特性与XML网络（注解/反射/类加载/XML/Socket）→ 全书复习。顺序由依赖关系决定：先掌握基本语法和面向对象思维（这是Java编程的地基），再学习接口抽象和集合框架（有了类才能用接口，有了泛型才能类型安全地操作集合）；IO需要理解流和异常处理基础；并发需要理解对象和线程生命周期；高级特性如反射需要理解类加载机制；网络编程需要IO和并发基础来处理通信。先「会写代码」，再「能抽象」，然后「能读写」，接着「能并发」，最后「能反射和通信」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "jct-lm-2",
    chapter: "jct-learning-map",
    level: 2,
    question: `Java 相比其他语言的核心特点是什么？JVM 在其中扮演什么角色？`,
    answer:
      `Java 的核心特点：①面向对象——一切皆对象（基本类型除外），封装继承多态；②平台无关——「一次编写到处运行」，源码编译为字节码，由各平台 JVM 执行；③自动内存管理——GC 自动回收无用对象，无需手动 free；④强类型——编译期类型检查，泛型进一步增强安全性；⑤多线程——语言级线程支持，synchronized/volatile/并发包。JVM 的角色：JVM 是 Java 字节码的运行时环境，负责加载 .class 文件、解释或 JIT 编译执行字节码、管理内存（堆/栈/方法区）和垃圾回收。不同平台有不同的 JVM 实现，它们把同一份字节码翻译成各自的机器指令。JVM 是「一次编写到处运行」的实现核心，也是 Java 生态（Scala/Kotlin/Groovy 等 JVM 语言）的共同基础。`,
    tags: ["JVM", "字节码", "跨平台"],
  },
  {
    id: "jct-lm-3",
    chapter: "jct-learning-map",
    level: 3,
    question: `用「一个员工管理系统」串联全书主要知识点。`,
    answer:
      `一个员工管理系统串联全书：①基础语法（第1章）——定义变量、控制流、异常处理处理业务逻辑；②面向对象（第2章）——设计 Employee 类封装姓名/薪资，Manager 继承 Employee 重写 getSalary 实现多态；③接口与Lambda（第3章）——Comparable 接口排序，Comparator 用 Lambda 自定义比较，函数式接口进行条件过滤；④集合与泛型（第4章）——ArrayList 管理员工列表，HashMap 按部门分组，泛型保证类型安全；⑤I/O流（第5章）——try-with-resources 读写员工数据文件，Stream API 统计薪资；⑥并发（第6章）——线程池处理批量导入，ConcurrentHashMap 线程安全缓存，synchronized 保护共享数据；⑦高级特性（第7章）——@Entity 注解标记实体类，反射动态读取字段生成报表；⑧XML与网络（第8章）——XML 导出配置，JSON API 对外提供服务，Socket 远程管理。一个系统，全书知识点全部参与。`,
    tags: ["架构", "知识串联"],
  },
  {
    id: "jct-lm-4",
    chapter: "jct-learning-map",
    level: 4,
    question: `从「简单控制台程序」到「反射+网络+并发企业级应用」的演进路径是什么？每步解决了什么问题？`,
    answer:
      `演进路径：①简单控制台——System.out.println 输出，掌握基本语法但无法管理复杂数据；②引入类和对象——把逻辑封装到 Employee 类中，代码有组织但仍只能处理单个对象；③引入集合——ArrayList/HashMap 管理多个员工，处理更复杂的数据结构但缺乏类型安全；④引入泛型——ArrayList<Employee> 编译期类型检查，避免运行时 ClassCastException；⑤引入接口和Lambda——Comparator 排序、Predicate 过滤，代码更灵活声明式；⑥引入IO——读写文件持久化数据，但大文件读写效率低需要缓冲；⑦引入NIO——Channel/Buffer 高效IO，但文件读取是阻塞的；⑧引入并发——线程池批量处理，但多线程共享数据需要同步；⑨引入反射和注解——运行时动态操作类，框架自动装配；⑩引入网络——Socket/HttpClient 远程通信，多客户端需要多线程并发处理。每步解决前一步的局限：语法→组织→数据→类型→抽象→持久化→效率→并发→动态→通信。`,
    tags: ["架构", "演进路径"],
  },
];
