import type { ReviewQuestion } from "./types";

/** CLR via C# · 类型基础复习题 */
export const cvcTypeFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "cvc-type-fundamentals-1",
    chapter: "cvc-type-fundamentals",
    level: 1,
    question: `CLR 中所有类型的最终基类是什么？它定义了哪些核心方法？`,
    answer:
      `所有类型的最终基类是 \`System.Object\`。它定义了四个核心方法：\n\n1. \`Equals(object)\` — 判断两个对象是否相等，默认比较引用地址，值类型重写为比较值\n2. \`GetHashCode()\` — 返回对象的哈希码，用于哈希表（Dictionary 等）\n3. \`ToString()\` — 返回对象的字符串表示，默认返回类型全名\n4. \`GetType()\` — 返回对象的运行时类型（Type 对象），是非虚方法\n\n前三个是虚方法，子类可以重写。GetType 是非虚的——不能被重写，保证永远返回对象的实际创建类型。这是 CLR 类型安全的基石。\n\n值类型（int、struct）通过 \`System.ValueType\` 间接继承自 Object——ValueType 重写了 Equals 和 GetHashCode 为按值比较。`,
    tags: ["System.Object", "继承", "虚方法", "GetType"],
  },
  {
    id: "cvc-type-fundamentals-2",
    chapter: "cvc-type-fundamentals",
    level: 2,
    question: `类型对象（Type Object）在内存中存储了什么？它与方法分派有什么关系？`,
    answer:
      `类型对象存储了该类型的所有运行时信息：\n\n1. **方法表（Method Table）**：记录每个方法的入口地址指针。包括该类型定义的方法和继承的方法。\n2. **字段布局**：字段在实例内存中的偏移量，CLR 据此访问字段。\n3. **基类指针**：指向父类型的类型对象，形成继承链。\n4. **接口映射**：接口方法到实际实现的映射表。\n\n与方法分派的关系：\n\n- **非虚方法调用**：CLR 在编译期就知道方法地址（通过类型对象的方法表），直接调用，无需运行时查找。\n- **虚方法调用**：CLR 通过实例的类型指针找到类型对象，在方法表中查找虚方法的地址。如果子类重写了该方法，方法表中指向子类实现——这就是多态。\n\n所有同类型的实例共享同一个类型对象。实例内存中只需存一个类型指针（Type Handle）指向它。\`obj.GetType()\` 就是读取这个指针。`,
    tags: ["类型对象", "方法表", "虚方法分派", "多态"],
  },
  {
    id: "cvc-type-fundamentals-3",
    chapter: "cvc-type-fundamentals",
    level: 3,
    question: `\`typeof(T)\` 和 \`obj.GetType()\` 有什么区别？给出一个两者返回不同结果的例子。`,
    answer:
      `区别：\n- \`typeof(T)\` 在**编译期**确定，返回泛型参数 T 或具体类型 T 的类型对象。它返回的是声明类型。\n- \`obj.GetType()\` 在**运行时**执行，通过读取对象的类型指针（Type Handle）获取实际类型。它返回的是对象的实际创建类型。\n\n两者返回不同结果的例子：\n\n\`\`\`csharp\nAnimal a = new Dog();\nType t1 = typeof(Animal);  // 编译期 → Animal\nType t2 = a.GetType();     // 运行时 → Dog\n// t1 != t2\n\`\`\`\n\n\`a\` 的声明类型是 Animal，但实际创建的对象是 Dog。\`typeof(Animal)\` 返回 Animal 的类型对象，\`a.GetType()\` 返回 Dog 的类型对象。\n\n关键原理：\`GetType()\` 是非虚方法，直接读取对象内存头部的类型指针。对象在 \`new Dog()\` 时类型指针被设为 Dog 的类型对象，声明类型不影响这个指针。这就是为什么 GetType 永远返回实际类型——它无法被欺骗。`,
    tags: ["typeof", "GetType", "编译期", "运行时"],
  },
  {
    id: "cvc-type-fundamentals-4",
    chapter: "cvc-type-fundamentals",
    level: 4,
    question: `从 CLR 运行时角度，解释 \`Animal a = new Dog(); a.Speak();\` 的完整调用过程，包括方法分派机制。`,
    answer:
      `完整调用过程：\n\n1. **对象创建**：\`new Dog()\` 在 GC 堆上分配内存。内存头部写入 Dog 的类型指针（指向 Dog 的类型对象）。然后调用 Dog 的构造函数初始化字段。\n\n2. **赋值**：\`Animal a = ...\` 将 Dog 实例的引用赋给 Animal 类型的变量 a。编译器在编译期检查 Dog 是否兼容 Animal（Dog 继承 Animal），通过检查。a 的静态类型是 Animal，但它指向的对象实际类型是 Dog。\n\n3. **方法调用 \`a.Speak()\`**：\n   a. CLR 读取 a 指向的对象内存，获取类型指针 → Dog 的类型对象\n   b. 在 Dog 的方法表中查找 \`Speak\` 方法的入口地址\n   c. 因为 Dog 重写了 Animal 的 \`Speak()\`（override），方法表中 \`Speak\` 指向 Dog.Speak 的地址\n   d. CLR 将 \`this\` 指针（Dog 实例地址）作为隐含参数传入\n   e. 跳转到 Dog.Speak 的机器码执行\n\n4. **多态的本质**：如果 Animal 也定义了 \`Speak()\` 但 Dog 没有重写，方法表中 \`Speak\` 指向 Animal.Speak。\`override\` 关键字使 Dog 在方法表中替换了 \`Speak\` 的指向。\`new\`（遮蔽）则不替换——方法表中保留父类版本。\n\n关键：虚方法分派是通过「实例类型指针 → 类型对象 → 方法表查找」三步完成的。这就是为什么 \`a.Speak()\` 调用的是 Dog.Speak 而非 Animal.Speak——方法表中的地址指向 Dog 的实现。`,
    tags: ["方法分派", "虚方法", "方法表", "多态", "类型指针"],
  },
];
