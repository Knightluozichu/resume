import type { ReviewQuestion } from "./types";

export const ejvEnumsAnnotationsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-ea-1",
    chapter: "ejv-enums-annotations",
    level: 2,
    question: `为什么用枚举实现单例比传统的双重检查锁或静态工厂方法更好？`,
    answer:
      `枚举单例 \`public enum Singleton { INSTANCE; public void doWork() {...} }\` 是实现单例的最佳方式，优势：①线程安全——JVM 在加载枚举类时保证枚举常量的唯一性初始化，天然线程安全，无需 synchronized 或 volatile；②防序列化攻击——枚举的序列化机制由 JVM 特殊处理，不会通过反序列化创建新实例（普通类的 readObject/readResolve 可能被利用创建新对象）；③防反射攻击——枚举类型在反射 newInstance 时会抛 IllegalArgumentException，无法通过反射创建枚举的新实例。相比之下：双重检查锁需要 volatile + synchronized，代码复杂且容易写错；静态工厂方法需要额外处理序列化（实现 readResolve 返回实例）和反射防御（私有构造器抛异常）。枚举单例唯一的限制是枚举不能继承其他类（但可以实现接口），且在枚举类加载时就初始化（非懒加载）。`,
    tags: ["枚举", "单例", "线程安全"],
  },
  {
    id: "ejv-ea-2",
    chapter: "ejv-enums-annotations",
    level: 3,
    question: `枚举策略模式是什么？它相比 switch-case 有什么优势？`,
    answer:
      `枚举策略模式：在每个枚举常量中直接绑定不同的行为，通过抽象方法或具体实现实现策略模式。如 \`enum Operation { PLUS { public double apply(double a, double b) { return a + b; } }, MINUS { ... }, TIMES { ... }, DIVIDE { ... }; public abstract double apply(double a, double b); }\`。优势：①编译期完整性——添加新的枚举常量时，如果忘记实现 apply 方法，编译器会报错；switch 方式则可能遗漏 case，运行时才崩溃；②行为与数据绑定——每个常量自己携带行为，不需要外部 switch 分派，更符合面向对象；③可读性强——\`Operation.PLUS.apply(a, b)\` 比 \`apply(Operation.PLUS, a, b)\` 更直观。switch 的致命问题：当添加新的枚举值时，所有 switch 语句都需要更新，遗漏任何一个都会在运行时崩溃（虽然可以在 default 分支抛异常，但这是运行时检查而非编译时检查）。Joshua Bloch 的建议：用枚举常量绑定行为优于 switch，只有在常量行为无法预知或行为逻辑非常复杂时才用 switch。`,
    tags: ["枚举策略", "策略模式"],
  },
  {
    id: "ejv-ea-3",
    chapter: "ejv-enums-annotations",
    level: 3,
    question: `EnumSet 和 EnumMap 相比位域（bit field）有什么优势？什么时候应该用它们？`,
    answer:
      `位域（如 \`int flags = STYLE_BOLD | STYLE_ITALIC\`）的问题：①无类型安全——int 可以是任何值，无法在编译期检查是否为合法的样式常量；②不可遍历——要遍历所有设置的位需要手动位操作，容易出错；③不可读——打印 \`flags\` 只看到数字 3，不知道哪些样式被设置；④固定 32/64 位——int 只有 32 位，超过 32 个选项需要 long。EnumSet 的优势：①类型安全——\`EnumSet<Style> styles = EnumSet.of(BOLD, ITALIC)\` 只能放 Style 枚举值；②可遍历——实现了 Iterable，可直接 for-each；③可读——toString 输出 \`[BOLD, ITALIC]\`；④高性能——内部用位向量实现（如果枚举值不超过 64 个，用一个 long），操作都是位运算；⑤无容量限制。EnumMap：以枚举为键的 Map，内部用数组实现，性能优于 HashMap。使用时机：当需要表示枚举值的子集（集合操作）时用 EnumSet；当需要以枚举为键做映射时用 EnumMap。Joshua Bloch 的建议：永远不要用位域，用 EnumSet 替代。`,
    tags: ["EnumSet", "EnumMap", "位域"],
  },
  {
    id: "ejv-ea-4",
    chapter: "ejv-enums-annotations",
    level: 4,
    question: `为什么注解优于命名模式？设计自定义注解时有哪些最佳实践？`,
    answer:
      `命名模式（如 JUnit 3 中测试方法必须以 \`test\` 开头）的问题：①拼写错误无法检测——\`tetFooBar()\` 不会报错，只是静默跳过；②无法限定使用目标——命名模式可以用于任何方法，但测试注解可能只应该用于无参方法；③无法传参——命名模式只能通过名字本身编码信息，无法传递参数。注解的优势：①编译期检查——\`@Test\` 拼写错误会编译失败；②限定使用目标——\`@Target(ElementType.METHOD)\` 限定只能用于方法；③可传递参数——\`@Test(timeout=5000)\` 可以携带元数据；④可重复——Java 8 的 \`@Repeatable\` 允许同一位置多次使用。设计自定义注解的最佳实践：①用 \`@Target\` 限定使用位置；②用 \`@Retention(RUNTIME)\` 使注解在运行时可被反射读取（如果只需要编译期处理用 SOURCE/CLASS）；③优先用标记注解（无参数的注解）而非有参数的，除非确实需要参数；④用 \`@Override\` 标注覆写方法，防止方法名拼写错误导致意外重载而非覆写——这是最重要的注解使用场景之一。`,
    tags: ["注解", "命名模式", "Override"],
  },
];
