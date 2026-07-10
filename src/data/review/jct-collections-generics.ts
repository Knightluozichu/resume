import type { ReviewQuestion } from "./types";

export const jctCollectionsGenericsQuestions: ReviewQuestion[] = [
  {
    id: "jct-cg-1",
    chapter: "jct-collections-generics",
    level: 2,
    question: `ArrayList 和 LinkedList 各自的底层实现和适用场景是什么？`,
    answer:
      `ArrayList 底层是动态数组：初始容量 10，容量不足时扩容为 1.5 倍（\`oldCapacity + (oldCapacity >> 1)\`）。get(i) 直接数组索引 O(1)；add 末尾均摊 O(1)；中间 insert/remove 需要移动元素 O(n)。适用场景：随机访问多、尾部增删多、中间增删少。LinkedList 底层是双向链表：每个节点存储数据+前驱指针+后继指针。get(i) 需要从头/尾遍历 O(n)；add/remove 首尾 O(1)；中间 insert/remove 在已知节点位置时 O(1)（但查找节点 O(n)）。适用场景：频繁在头部或尾部增删、不需要随机访问。常见误区：LinkedList「增删快」不总是成立——在指定索引位置增删时，查找节点 O(n) + 修改指针 O(1) = O(n)，不比 ArrayList 快。实际开发中 ArrayList 几乎总是更好的默认选择，因为缓存友好（连续内存），且 90% 的场景是尾部增删。`,
    tags: ["ArrayList", "LinkedList", "集合"],
  },
  {
    id: "jct-cg-2",
    chapter: "jct-collections-generics",
    level: 2,
    question: `HashMap 的底层原理是什么？Java 8 对它做了什么改进？`,
    answer:
      `HashMap 底层是哈希表：数组 + 链表/红黑树。put(key, value) 过程：①计算 hash = key.hashCode() ^ (hashCode >>> 16)（扰动，减少冲突）；②定位桶 index = (n-1) & hash；③桶为空直接放入；④桶非空遍历链表，key equals 则覆盖，否则尾插；⑤链表长度 >= 8 且数组长度 >= 64 时转为红黑树（< 6 时退回链表）；⑥元素超过阈值（capacity * loadFactor 0.75）时扩容为 2 倍并 rehash。Java 8 改进：①链表过长时转红黑树，最坏从 O(n) 降为 O(log n)；②扩容时元素位置要么不变要么 +oldCap，无需重新计算 hash。HashMap 非线程安全：多线程 put 可能丢失数据，Java 7 并发扩容可能形成环形链表导致死循环。线程安全用 ConcurrentHashMap（分段锁/CAS）。HashMap 键可为 null（放在 index 0 桶），一个 null 键最多一个。`,
    tags: ["HashMap", "哈希表", "红黑树"],
  },
  {
    id: "jct-cg-3",
    chapter: "jct-collections-generics",
    level: 3,
    question: `Java 泛型的类型擦除是什么？它带来了哪些限制和解决方案？`,
    answer:
      `类型擦除：Java 泛型是编译期机制，编译后泛型类型信息被擦除——\`List<String>\` 和 \`List<Integer>\` 运行时都是 \`List\`（元素类型为 Object）。类型擦除原因：兼容性——Java 5 引入泛型时必须与 Java 4 的非泛型集合兼容。限制：①运行时无法获取泛型类型——\`list instanceof List<String>\` 编译错误，只能 \`list instanceof List<?>\`；②不能 new 泛型类型——\`new T()\` 不合法；③基本类型不能做泛型参数——\`List<int>\` 不行，必须 \`List<Integer>\`；④静态字段不能使用类的泛型参数；⑤泛型数组创建受限——\`new List<String>[10]\` 不合法。解决方案：①传入 Class<T>——\`<T> T newInstance(Class<T> cls) { return cls.newInstance(); }\`；②用 Type Token/Guice TypeLiteral 保留泛型信息；③用 List<?> 和受检转换。PECS 原则：生产者用 \`? extends T\`（只读），消费者用 \`? super T\`（只写）。`,
    tags: ["泛型", "类型擦除", "PECS"],
  },
  {
    id: "jct-cg-4",
    chapter: "jct-collections-generics",
    level: 3,
    question: `什么是 fail-fast 迭代器？ConcurrentModificationException 是怎么产生的？如何避免？`,
    answer:
      `fail-fast：迭代器在遍历时如果检测到集合被结构性修改（增删元素），立即抛出 ConcurrentModificationException，而不是等到遍历结束后产生不可预期的结果。原理：集合维护一个 modCount 修改计数器，迭代器创建时记录 expectedModCount，每次 next() 检查 \`modCount != expectedModCount\` 则抛异常。注意：在单线程中用 for-each 遍历同时 list.remove() 也会触发——for-each 本质是 Iterator，但 list.remove() 不会更新 expectedModCount。正确做法：①用 Iterator.remove()——它会同步更新 expectedModCount；②Java 8+ 用 removeIf()——\`list.removeIf(x -> x > 3)\` 内部用 Iterator.remove()。fail-safe 迭代器（CopyOnWriteArrayList、ConcurrentHashMap）：遍历的是集合的快照/弱一致性视图，不抛 CME，但可能看不到遍历期间的修改。CopyOnWriteArrayList 每次 add/remove 复制整个数组，适合读多写少场景。`,
    tags: ["fail-fast", "迭代器", "并发修改"],
  },
];
