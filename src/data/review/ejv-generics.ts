import type { ReviewQuestion } from "./types";

export const ejvGenericsQuestions: ReviewQuestion[] = [
  {
    id: "ejv-ge-1",
    chapter: "ejv-generics",
    level: 2,
    question: `什么是 PECS 原则？Producer Extends 和 Consumer Super 分别用于什么场景？`,
    answer:
      `PECS = Producer Extends, Consumer Super，是泛型通配符的使用原则。如果一个参数化类型代表一个「生产者」（你从它里面读取数据），用 \`? extends T\`；如果代表一个「消费者」（你向它写入数据），用 \`? super T\`。Producer Extends 场景：\`void process(List<? extends Number> list)\` ——从 list 中读取 Number，但不能向 list 添加元素（因为编译器只知道它是 Number 的某种子类型，不知道具体是哪个，所以 add 会编译错误）。Consumer Super 场景：\`void addNumbers(List<? super Integer> list)\` ——可以向 list 添加 Integer，但从 list 读取时只能得到 Object（因为编译器只知道它是 Integer 的某种父类型）。经典案例：\`Collections.max(List<? extends T> list, Comparator<? super T> comp)\` ——list 是生产者（读取元素比较），Comparator 是消费者（接受元素做比较）。PECS 让 API 既能接受更广泛的类型参数，又保证类型安全。`,
    tags: ["泛型", "PECS", "通配符"],
  },
  {
    id: "ejv-ge-2",
    chapter: "ejv-generics",
    level: 2,
    question: `为什么不应该使用原生态类型（raw type）？Set、Set&lt;Object&gt; 和 Set&lt;?&gt; 有什么区别？`,
    answer:
      `原生态类型（如 \`List\` 而非 \`List<String>\`）丢失了泛型的类型安全保证——编译器允许放入任何类型，错误推迟到运行时抛出 ClassCastException。\`List list = new ArrayList(); list.add(\"hello\"); Integer n = (Integer) list.get(0);\` // 运行时崩溃。三种 Set 的区别：①\`Set\`（原生态类型）——不安全，可以添加任何类型，编译器只发警告；②\`Set<Object>\`（参数化类型）——类型安全，可以添加任何 Object，但 \`Set<String>\` 不能赋给 \`Set<Object>\`（因为 Set<String> 不是 Set<Object> 的子类型）；③\`Set<?>\`（无界通配符）——类型安全，但不能添加任何元素（除了 null），用于只读场景或不确定元素类型时。Joshua Bloch 的建议：新代码中绝不使用原生态类型；Set<Object> 是「允许任何类型」的参数化类型；Set<?> 是「类型未知」的安全通配符；原生态类型只是为向后兼容保留的遗留物。`,
    tags: ["原生态类型", "类型安全"],
  },
  {
    id: "ejv-ge-3",
    chapter: "ejv-generics",
    level: 3,
    question: `什么是类型擦除？它对泛型有哪些限制？如何绕过这些限制？`,
    answer:
      `类型擦除：Java 泛型在编译时进行类型检查，但编译后会擦除类型参数——\`List<String>\` 和 \`List<Integer>\` 在运行时都是 \`List\`，类型参数 \`String\`/\`Integer\` 不存在于字节码中。这是为了兼容 Java 5 之前的代码。类型擦除的限制：①不能实例化类型参数——\`new T()\` 非法；②不能创建泛型数组——\`new T[n]\` 非法；③不能在 instanceof 中使用泛型类型——\`x instanceof List<String>\` 非法，只能 \`x instanceof List<?>\`；④不能有泛型类字面量——\`List<String>.class\` 非法，只有 \`List.class\`；⑤静态字段/方法不能使用类的类型参数；⑥泛型类不能继承 Throwable——不能 \`catch (T e)\`。绕过限制的方法：传入 Class<T> 对象——\`<T> T newInstance(Class<T> clazz) { return clazz.newInstance(); }\`；用 \`Array.newInstance(clazz, n)\` 创建泛型数组；用无界通配符配合 instanceof。`,
    tags: ["类型擦除", "泛型限制"],
  },
  {
    id: "ejv-ge-4",
    chapter: "ejv-generics",
    level: 4,
    question: `如何正确设计一个泛型方法？以 max 方法为例说明 PECS、类型参数约束和编译警告的处理。`,
    answer:
      `设计泛型方法 \`max\`：返回集合中的最大元素。逐步演进：①初版 \`public static <T> T max(List<T> list, Comparator<T> cmp)\` ——能用但不够灵活，List<Integer> 只能传 Comparator<Integer>；②应用 PECS——list 是生产者（读取元素），Comparator 是消费者（接受元素比较），改为 \`public static <T> T max(List<? extends T> list, Comparator<? super T> cmp)\`；③这样 \`max(List<Integer>, Comparator<Number>)\` 也能工作，更灵活。类型参数命名约定：T=Type, E=Element, K=Key, V=Value, R=Return。约束：如果 T 需要 Comparable，用 \`<T extends Comparable<? super T>>\`——这同时用了 PECS（Comparable 是消费者）。编译警告处理：泛型代码可能产生 unchecked 警告（如类型擦除导致的运行时不安全操作），应尽量消除；确实无法消除时用 \`@SuppressWarnings(\"unchecked\")\` 并注释说明为什么是安全的。最佳实践：尽可能消除所有泛型警告，每个 \`@SuppressWarnings\` 都应有充分的理由。`,
    tags: ["泛型方法", "PECS", "设计"],
  },
];
