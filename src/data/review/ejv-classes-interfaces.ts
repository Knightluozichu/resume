import type { ReviewQuestion } from "./types";

export const ejvClassesInterfacesQuestions: ReviewQuestion[] = [
  {
    id: "ejv-ci-1",
    chapter: "ejv-classes-interfaces",
    level: 2,
    question: `为什么「组合优于继承」？继承在什么情况下是安全的？`,
    answer:
      `组合优于继承的核心原因：继承破坏封装性。子类依赖父类的实现细节（方法调用顺序、内部状态变化），当父类升级时，子类可能意外崩溃——这不是子类作者的错，但却是子类要承担的后果。经典案例：HashSet 继承添加计数器，重写 add 和 addAll。但 addAll 内部调用了 add，导致计数翻倍——子类依赖了父类 addAll 调用 add 这个实现细节。继承安全的情况：①子类和父类在同一包内，由同一作者控制——作者知道实现细节，升级时能同步修改；②类明确设计为可继承（如 abstract 类），并文档化了自用模式（self-use pattern）；③接口继承（implements）而不是实现继承（extends）——接口没有实现细节可依赖。跨包继承具体类几乎总是危险的，应该用组合（持有父类实例，转发方法调用）替代。`,
    tags: ["继承", "组合", "封装"],
  },
  {
    id: "ejv-ci-2",
    chapter: "ejv-classes-interfaces",
    level: 2,
    question: `接口相比抽象类有哪些优势？什么是骨架实现（skeletal implementation）？`,
    answer:
      `接口的优势：①可多实现——一个类可以实现多个接口，但只能继承一个抽象类；②灵活——允许在不影响已有类层次结构的情况下添加类型；③ mixin（混入）能力——接口可以给类型附加可选行为，如 Comparable、AutoCloseable。抽象类的限制：单继承——一旦继承了抽象类就无法再继承其他类，强制了类层次结构。骨架实现（skeletal implementation）：结合接口和抽象类的优点——接口定义类型，一个抽象类实现接口的大部分方法，留下少数抽象方法给子类实现。如 Java 集合框架：\`List\` 接口 + \`AbstractList\` 骨架实现 + \`ArrayList\` 具体子类。骨架实现的命名约定是 \`AbstractInterface\`。Java 8 的 default 方法进一步增强了接口的能力，接口可以直接提供默认实现，但 default 方法不能有状态字段，所以骨架实现仍有价值。`,
    tags: ["接口", "抽象类", "骨架实现"],
  },
  {
    id: "ejv-ci-3",
    chapter: "ejv-classes-interfaces",
    level: 3,
    question: `如何设计一个不可变类？不可变类有哪些优势和代价？`,
    answer:
      `设计不可变类的规则：①不提供任何修改对象状态的方法（无 setter）；②保证类不会被扩展——用 final 修饰类，或用私有构造器 + 静态工厂；③所有字段都是 final 的；④所有字段都是 private 的（防止直接访问可变内部状态）；⑤确保对任何可变组件的独占访问——如果字段引用了可变对象，确保客户端无法获取该引用（构造器和 accessor 做防御性拷贝）。不可变类的优势：①天生线程安全——不需要同步；②可自由共享——单例、常量池；③天然适合做 Map 的 key 和 Set 的元素；④原子性——对象状态创建后永不改变，要么完全创建成功要么完全失败。代价：每个不同的值都需要一个独立的对象——如 BigInteger 的每一步运算都创建新对象，在大量运算时有性能开销。解决方案：提供可变配套类（如 StringBuilder 配套 String）。`,
    tags: ["不可变", "final", "线程安全"],
  },
  {
    id: "ejv-ci-4",
    chapter: "ejv-classes-interfaces",
    level: 4,
    question: `「最小可访问性」原则具体指什么？为什么顶层类和成员都应尽量降低可访问性？`,
    answer:
      `「最小可访问性」原则：每个类和成员的可访问性应尽可能低——在能完成任务的前提下，选择最严格的访问级别（private > package-private > protected > public）。具体规则：①顶层类——优先 package-private，只有在需要作为 API 一部分时才设为 public；②成员字段——优先 private，只在需要子类或同包访问时才提升；③public static final 数组字段——是安全漏洞！数组内容可被修改，应该返回数组的拷贝或不可变视图（\`Collections.unmodifiableList\`）；④public 类的字段——不要有 public 字段（实例字段总是应该 private），常量（public static final）除外。原因：降低可访问性 = 降低耦合 = 提高封装性。一旦某个成员是 public 的，它就成为了 API 的一部分，修改它会破坏客户端代码。package-private 和 private 的成员可以自由修改重构，不影响外部。这是「信息隐藏」的核心——暴露的越少，自由度越大。`,
    tags: ["封装", "可访问性", "API设计"],
  },
];
