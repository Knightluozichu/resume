import type { ReviewQuestion } from "./types";

export const ejvLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ejv-lm-1",
    chapter: "ejv-learning-map",
    level: 2,
    question: `《Effective Java》全书的章节结构和递进逻辑是什么？`,
    answer:
      `全书分为九个章节（含学习地图和复习），覆盖 Java 编程的八大主题：①创建与销毁对象——静态工厂/Builder/try-with-resources；②通用方法——equals/hashCode/toString/compareTo 契约；③类与接口设计——组合优于继承、最小可访问性、接口优于抽象类；④泛型——PECS 通配符、类型安全、避免原生态类型；⑤枚举与注解——枚举单例、EnumSet、注解替代命名模式；⑥Lambda 与 Stream——方法引用、无副作用、Stream 管道；⑦方法设计——参数校验、防御性拷贝、Optional；⑧并发——同步、线程池、并发集合、安全发布。递进逻辑：先解决对象怎么创建和怎么比较，再解决类怎么设计、泛型怎么用，然后是枚举和 Lambda 这些语言特性，最后是方法和并发这种高阶话题。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "ejv-lm-2",
    chapter: "ejv-learning-map",
    level: 2,
    question: `Effective Java 与普通 Java 语法书有什么本质区别？它的核心理念是什么？`,
    answer:
      `本质区别：普通 Java 语法书教你「怎么写能编译运行的 Java 代码」，Effective Java 教你「怎么写出正确、高效、可维护的 Java 代码」。语法书关注语言机制（关键字、语法规则、API 用法），Effective Java 关注最佳实践（什么时候用什么、为什么这样更好、常见的坑在哪里）。核心理念：清晰、正确、可维护优先于聪明、快速、花哨。书中的每条建议都是 Joshua Bloch 多年工程经验的总结，关注的是 API 设计质量、代码健壮性和并发安全性，而非语言本身的语法细节。`,
    tags: ["核心理念", "最佳实践"],
  },
  {
    id: "ejv-lm-3",
    chapter: "ejv-learning-map",
    level: 3,
    question: `用一条主线串联《Effective Java》全书八大主题，说明它们之间的依赖关系。`,
    answer:
      `主线：一个「API 设计与实现」的完整链路。①创建对象——决定 API 的入口点怎么设计（静态工厂 vs 构造器 vs Builder）；②通用方法——决定对象怎么比较和展示（equals/hashCode/toString/compareTo）；③类与接口——决定类型系统怎么组织（继承 vs 组合、接口 vs 抽象类、可访问性）；④泛型——决定类型参数怎么安全使用（PECS、通配符）；⑤枚举与注解——决定固定常量和元数据怎么表达；⑥Lambda 与 Stream——决定集合操作怎么声明式编写；⑦方法设计——决定方法签名和参数怎么安全设计；⑧并发——决定多线程环境下怎么安全运行。依赖关系：前 4 章是「类型系统基础」，5-6 章是「语言特性」，7-8 章是「工程实践」，前面的设计决策直接影响后面的实现质量。`,
    tags: ["架构", "知识串联"],
  },
  {
    id: "ejv-lm-4",
    chapter: "ejv-learning-map",
    level: 4,
    question: `从「能编译运行的 Java 代码」到「专业级 Java API」的演进路径是什么？每步解决了什么问题？`,
    answer:
      `演进路径：①能编译——基础语法正确，但可能存在资源泄漏、空指针、类型不安全；②能正确运行——加入参数校验、防御性拷贝、try-with-resources，避免运行时异常；③能正确比较——重写 equals/hashCode 满足契约，HashMap/HashSet 才能正常工作；④设计合理——用静态工厂替代构造器、Builder 处理多参数、组合替代继承，API 更清晰；⑤类型安全——消除原生态类型，使用泛型和 PECS，编译期发现类型错误；⑥用好语言特性——枚举替代 int 常量、Lambda/Stream 替代冗长的匿名类、注解替代命名模式；⑦并发安全——正确同步、使用并发集合、安全发布，多线程不出错；⑧专业级 API——文档完整、方法签名简洁、线程安全级别明确。每步解决前一步的局限：语法→健壮性→正确性→设计→类型安全→表达力→并发安全→专业性。`,
    tags: ["架构", "演进路径"],
  },
];
