import type { ReviewQuestion } from "./types";

export const hfjJavaApiQuestions: ReviewQuestion[] = [
  {
    id: "hfj-api-1",
    chapter: "hfj-java-api",
    level: 2,
    question: "ArrayList 和普通数组有什么区别？什么时候用 ArrayList？",
    answer:
      "普通数组：①长度固定，创建时指定大小后不可改变；②可以存基本类型和引用类型；③访问效率高 O(1)；④语法简单但功能少。\nArrayList：①长度可变，自动扩容（容量不足时增长约1.5倍）；②只能存引用类型（基本类型需用包装类如 Integer）；③add/remove/get 等方法丰富；④底层是动态数组，查询 O(1)，中间插入删除 O(n)（需要移动元素）。\n何时用 ArrayList：当元素数量不确定或需要频繁增删时用 ArrayList；当元素数量固定且对性能要求极高时用数组。大部分业务场景 ArrayList 更方便、更安全、更易维护。",
    tags: ["ArrayList", "数组", "集合"],
  },
  {
    id: "hfj-api-2",
    chapter: "hfj-java-api",
    level: 2,
    question: "HashMap 的 put 和 get 的工作原理是什么？键的 hashCode 和 equals 有什么作用？",
    answer:
      "put(key, value) 原理：①调用 key.hashCode() 计算哈希值；②用哈希值定位到内部的桶（bucket）位置；③如果桶为空，直接存入；如果桶非空，用 key.equals() 遍历桶内已有的键比较——找到相等的键则覆盖旧值，找不到则追加新条目。\nget(key) 原理：①同样调用 key.hashCode() 定位桶；②用 key.equals() 在桶内查找匹配的键；③找到则返回对应的 value，找不到返回 null。\nhashCode 和 equals 的作用：hashCode 决定条目存放在哪个桶（快速定位），equals 决定是否是同一个键（精确匹配）。两者必须一致：如果 a.equals(b) 为 true，则 a.hashCode() 必须等于 b.hashCode()。自定义类作为 HashMap 的键时，必须正确重写这两个方法，否则会导致找不到值或重复存储。",
    tags: ["HashMap", "hashCode", "equals"],
  },
  {
    id: "hfj-api-3",
    chapter: "hfj-java-api",
    level: 3,
    question: "Java 集合框架中 List、Set、Map 三者的区别是什么？",
    answer:
      "List（列表）：①有序——按插入顺序排列；②可重复——允许相同元素；③可通过索引访问——get(index)；④代表：ArrayList（动态数组，查询快）、LinkedList（链表，增删快）。\nSet（集合）：①无序——不保证插入顺序（TreeSet 按排序，LinkedHashSet 按插入顺序）；②不可重复——相同元素只存一份，靠 equals 判重；③不能用索引访问；④代表：HashSet（哈希表，O(1)）、TreeSet（红黑树，有序）。\nMap（映射）：①键值对——key-value 映射；②键不可重复——put 相同键会覆盖；③值可重复；④不属于 Collection 接口体系，是独立体系；⑤代表：HashMap（哈希表，O(1)）、TreeMap（红黑树，键有序）。",
    tags: ["List", "Set", "Map", "集合框架"],
  },
  {
    id: "hfj-api-4",
    chapter: "hfj-java-api",
    level: 3,
    question: "为什么 ArrayList 不能存基本类型（如 int）？Integer 和 int 有什么区别？",
    answer:
      "ArrayList（以及其他集合类）的泛型参数必须是引用类型，因为集合内部用 Object[] 存储，基本类型不是 Object 的子类。所以 `ArrayList<int>` 编译报错，必须写 `ArrayList<Integer>`。\nint 和 Integer 的区别：①int 是基本类型，4字节，存在栈上，默认值 0；Integer 是引用类型（包装类），是个对象，存在堆上，默认值 null。②Integer 提供了方法（如 parseInt、toString、compareTo），int 没有方法。③集合只能用 Integer。\n自动装箱/拆箱：Java 5+ 自动转换——`list.add(42)` 自动把 int 42 装箱为 Integer 对象；`int n = list.get(0)` 自动拆箱为 int。但这有性能开销，循环中大量装箱拆箱要注意。Integer 有缓存（-128~127），所以 `Integer.valueOf(127) == Integer.valueOf(127)` 为 true，但超过范围则为 false。",
    tags: ["包装类", "自动装箱", "泛型"],
  },
];
