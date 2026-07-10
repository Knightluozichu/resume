import type { ReviewQuestion } from "./types";

export const ctcTypesOverviewQuestions: ReviewQuestion[] = [
  {
    id: "ctc-types-overview-1",
    chapter: "ctc-types-overview",
    level: 1,
    question: `值类型和引用类型在内存分配和赋值行为上有什么区别？各举两个例子。`,
    answer: `值类型（int、struct）直接存储数据本身，分配在栈上或内联在对象中，赋值时复制全部内容，两个变量是独立副本。引用类型（class、string）存储数据的地址引用，数据分配在堆上，赋值时复制引用而非数据，两个变量指向同一个对象。`,
    tags: ["值类型", "引用类型", "内存模型", "栈与堆"],
  },
  {
    id: "ctc-types-overview-2",
    chapter: "ctc-types-overview",
    level: 2,
    question: `什么是装箱？为什么 List<int> 比 ArrayList 快？装箱发生在哪里？`,
    answer: `装箱是将值类型转换为引用类型（object或接口）的操作——在堆上创建对象并复制值类型数据。ArrayList内部用object[]存储，int存入时必须装箱，每次Add都是一次堆分配，1000次Add就是1000次GC压力。List<int>内部用int[]存储，int直接存在数组中，零装箱。装箱发生在值类型赋给object变量或存入非泛型集合时。`,
    tags: ["装箱", "泛型", "ArrayList", "GC压力"],
  },
  {
    id: "ctc-types-overview-3",
    chapter: "ctc-types-overview",
    level: 3,
    question: `可空引用类型是运行时特性还是编译时特性？string 和 string? 在运行时有什么区别？编译器做了什么？`,
    answer: `可空引用类型是编译时特性。string和string?在运行时是完全相同的类型（System.String），?不产生任何运行时标记。区别只在编译期：编译器通过流分析追踪变量的null状态，对不可空类型赋null发出警告，对可空类型解引用前不检查null发出警告。运行时NullReferenceException仍会抛出——NRT的价值是编译时提前发现潜在bug，不是运行时保护。`,
    tags: ["可空引用类型", "NRT", "编译时", "流分析"],
  },
  {
    id: "ctc-types-overview-4",
    chapter: "ctc-types-overview",
    level: 4,
    question: `struct 不一定比 class 快，请分析在什么场景下 struct 反而更慢，以及选择 struct 的经验法则。`,
    answer: `struct更慢的场景：1）大结构体频繁传参/赋值——全量复制开销可能超过堆分配+引用传递。2）结构体装箱后变成堆对象，比class多一次分配。3）结构体作为字典key时，GetHashCode和Equals的反射调用（ValueType默认实现）比class重写的方法慢。经验法则：struct适合小型（≤16字节）、不可变、密集存储的数据。大对象或需要引用共享的场景用class。C# 10的readonly record struct是struct的最佳实践——自带值相等且不可变。`,
    tags: ["struct", "class", "性能", "内存分配", "record struct"],
  },
];
