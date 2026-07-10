import type { ReviewQuestion } from "./types";

export const jctInterfacesLambdaQuestions: ReviewQuestion[] = [
  {
    id: "jct-il-1",
    chapter: "jct-interfaces-lambda",
    level: 2,
    question: `Java 接口中可以有哪些类型的方法？default 方法的意义是什么？`,
    answer:
      `Java 接口（Java 8+）中可有以下方法：①抽象方法——无方法体，子类必须实现；②default 方法——有默认实现，子类可选重写。意义：接口演进——在不破坏已有实现类的前提下为接口添加新方法。例如 Java 8 给 Collection 接口加了 stream() 默认方法，所有已有实现类自动获得此功能。③static 方法——接口内提供的工具方法，通过接口名调用（如 List.of()）。④private 方法（Java 9+）——default/static 方法的内部复用，减少代码重复。冲突解决：一个类实现两个接口有相同 default 方法时，必须重写该方法消除歧义。接口 vs 抽象类：接口用于定义行为规范（多实现），抽象类用于共享代码（单继承）。有了 default 方法，接口也能提供代码复用，但接口仍不能有实例字段和构造器。`,
    tags: ["接口", "default方法", "Java 8"],
  },
  {
    id: "jct-il-2",
    chapter: "jct-interfaces-lambda",
    level: 2,
    question: `什么是函数式接口？Lambda 表达式如何与函数式接口配合？`,
    answer:
      `函数式接口是只有一个抽象方法的接口（可以有多个 default/static 方法）。用 @FunctionalInterface 注解标记（编译器检查）。Lambda 表达式是函数式接口实例的简写：\`(参数) -> {方法体}\`。例如 \`Runnable r = () -> System.out.println(\"hi\")\` 等价于匿名内部类 \`new Runnable() { public void run() { ... } }\`。Lambda 类型推断：编译器根据目标类型（函数式接口）推断参数类型。Lambda 可简写：单参数可省括号 \`x -> ...\`，单语句可省花括号和 return \`x -> x * 2\`。方法引用是 Lambda 的进一步简写：\`String::length\` 等价于 \`s -> s.length()\`。常用函数式接口：Supplier<T>（无参返回T）、Consumer<T>（接收T无返回）、Function<T,R>（接收T返回R）、Predicate<T>（接收T返回boolean）、BiFunction<T,U,R>（接收两个参数返回R）。`,
    tags: ["Lambda", "函数式接口", "方法引用"],
  },
  {
    id: "jct-il-3",
    chapter: "jct-interfaces-lambda",
    level: 3,
    question: `Stream API 的中间操作和终止操作有什么区别？什么是惰性求值？`,
    answer:
      `中间操作（lazy/惰性）：filter、map、flatMap、sorted、distinct、limit、skip 等。它们返回新 Stream，不会立即执行——只有遇到终止操作时才「触发」整个流水线。终止操作（eager/急切）：collect、reduce、count、forEach、findFirst、anyMatch 等。它们触发流水线执行，产生最终结果（集合、值或副作用）。惰性求值的意义：①短路优化——\`stream.filter(x -> x > 0).findFirst()\` 找到第一个正数就停止，不必遍历全部；②融合优化——多个中间操作可合并为一次遍历，如 \`filter + map\` 在一次循环中完成；③无限流——\`Stream.iterate(0, x -> x + 1).filter(x -> x > 100).limit(5)\` 只有终止操作触发时才求值，否则无限流不会导致无限循环。无状态操作（filter/map）不依赖其他元素，有状态操作（sorted/distinct）需要缓存全部元素。`,
    tags: ["Stream", "惰性求值", "中间操作"],
  },
  {
    id: "jct-il-4",
    chapter: "jct-interfaces-lambda",
    level: 4,
    question: `Lambda 表达式捕获外部变量有什么限制？为什么？如何规避？`,
    answer:
      `Lambda 可以捕获外部局部变量，但该变量必须是 effectively final（事实上的 final——不修改，不需要显式声明 final）。原因：Lambda 可能在另一个线程或延迟执行时使用该变量，如果变量可变，会有并发可见性和一致性问题。Lambda 捕获的是变量的值副本（基本类型）或引用副本（引用类型），而非变量本身。实例变量和静态变量无此限制——它们通过 this 引用访问，Lambda 捕获的是 this 引用。规避方案：①用数组或集合包装——\`int[] count = {0}; list.forEach(x -> count[0]++)\`（不推荐，hack）；②用 AtomicInteger——\`AtomicInteger count = new AtomicInteger(0); list.forEach(x -> count.incrementAndGet())\`；③用 reduce/collect 代替可变状态——\`int sum = list.stream().mapToInt(x -> x).sum()\`，函数式风格避免副作用。最佳实践：Lambda 应无副作用，不修改外部状态，只做计算和返回。`,
    tags: ["Lambda", "闭包", "effectively final"],
  },
];
