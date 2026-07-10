import type { ReviewQuestion } from "./types";

export const ejvMethodsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-md-1",
    chapter: "ejv-methods",
    level: 2,
    question: `为什么方法参数应该做有效性校验？fail-fast 原则是什么？`,
    answer:
      `参数校验的原因：①及早失败（fail-fast）——在方法入口处发现非法参数立即抛出异常，而不是在方法深处产生莫名其妙的错误。如传 null 给 \`subSet(from, to)\` 如果不校验，可能在遍历结果时才抛 NPE，离错误根源很远，难以调试；②保护不变量——方法依赖参数满足某些约束才能正确工作，如 \`sqrt(double x)\` 要求 x >= 0；③文档化——@throws 注解记录了方法的约束，调用方知道传非法值会得到什么异常。fail-fast 原则：一旦检测到错误状态就立即报告，不要让错误传播。工具：\`Objects.requireNonNull(obj)\` 检查 null（Java 7+）；\`checkArgument(condition)\` / \`checkNotNull(obj)\`（Guava）；手动 \`if (x < 0) throw new IllegalArgumentException(...)\`。校验时机：公共方法必须校验（调用方不可信）；私有方法可以用 assert（因为调用方是自己，可信）。注意：校验在防御性拷贝之后做（防止 TOCTOU 漏洞）。`,
    tags: ["参数校验", "fail-fast"],
  },
  {
    id: "ejv-md-2",
    chapter: "ejv-methods",
    level: 3,
    question: `什么是防御性拷贝？为什么构造器和返回值都需要做防御性拷贝？`,
    answer:
      `防御性拷贝：在将可变对象传入或传出类边界时创建一份拷贝，防止外部修改破坏类的内部不变量。构造器需要防御性拷贝的原因：如果构造器直接保存传入的可变对象引用，调用方可以在构造后修改该对象，绕过类的封装。如 \`public Period(Date start, Date end) { this.start = start; ... }\` ——调用方随后 \`start.setTime(...)\` 就修改了 Period 内部的 start。正确做法：\`this.start = new Date(start.getTime())\`。拷贝必须在校验之前做（防止 TOCTOU 漏洞——检查时合法但另一个线程在使用前修改了）。返回值需要防御性拷贝的原因：如果返回内部可变对象的引用，调用方可以修改它破坏不变量。如 \`public Date getStart() { return start; }\` ——调用方 \`period.getStart().setTime(...)\` 就修改了 Period。正确做法：\`return new Date(start.getTime())\`。不需要防御性拷贝的情况：不可变对象（String、Integer）、调用方可信（同包私有类）、性能关键路径且调用方可信。`,
    tags: ["防御性拷贝", "不变量"],
  },
  {
    id: "ejv-md-3",
    chapter: "ejv-methods",
    level: 3,
    question: `Optional 的正确和错误用法分别是什么？它解决了什么问题？`,
    answer:
      `Optional 解决的问题：方法返回值可能为空时，用 \`Optional<T>\` 代替直接返回 \`T\` 或 null——调用方被强制意识到返回值可能为空，必须显式处理（isPresent/get 或 orElse/orElseGet 等），减少 NPE。正确用法：①返回值——\`Optional<T> max(List<T> list)\`，当列表为空时返回 \`Optional.empty()\`；②链式处理——\`opt.map(...).filter(...).orElse(default)\`；③明确表达「可能没有返回值」的语义。错误用法：①作为方法参数——\`void foo(Optional<String> name)\` 不如直接 \`void foo(String name)\` 或方法重载；②作为字段——Optional 不是可序列化的，且持有 Optional 字段浪费内存（多一层包装）；③作为 Map 的值——\`Map<String, Optional<T>>\` 不如允许 null 值或用其他方式表示缺失；④直接调用 get()——不检查 isPresent 直接 get 会抛 NoSuchElementException，等于回到了 NPE。Optional 的设计意图是作为返回类型，不是 null 的通用替代品。`,
    tags: ["Optional", "返回值", "NPE"],
  },
  {
    id: "ejv-md-4",
    chapter: "ejv-methods",
    level: 4,
    question: `重载（overload）和覆写（override）的分派机制有什么不同？为什么 Joshua Bloch 建议「慎用重载」？`,
    answer:
      `分派机制区别：①重载——编译期静态分派（static dispatch），根据参数的编译时类型决定调用哪个重载版本；②覆写——运行时动态分派（dynamic dispatch），根据对象的运行时类型决定调用哪个覆写方法。「慎用重载」的原因：重载的静态分派可能导致意想不到的行为。经典案例：\`classify(Collection<?> c)\` 有三个重载（Collection/List/Set），调用 \`classify(new ArrayList<>())\` 时，如果参数声明为 \`Collection c\`，即使运行时是 ArrayList，也会分派到 \`classify(Collection)\` 版本——因为重载看编译时类型。另一个案例：\`Object o = "hello"; System.out.println(o)\` 打印的是 \`Object\` 重载版本（虽然 println(String) 存在）。更危险的是自动装箱导致的重载混淆：\`list.remove(i)\` 和 \`list.remove(Integer.valueOf(i))\` 调用的是不同的 remove 重载。建议：①参数类型完全不同（如 String vs int）时可以安全重载；②参数类型相近（如 int vs long、Object vs String）时避免重载，改用不同方法名；③Java 5 后的 varargs 使重载更复杂，要格外小心。`,
    tags: ["重载", "覆写", "分派"],
  },
];
