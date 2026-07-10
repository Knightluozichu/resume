import type { ReviewQuestion } from "./types";

export const ec7TypesVariablesQuestions: ReviewQuestion[] = [
  {
    id: "ec7-types-variables-1",
    chapter: "ec7-types-variables",
    level: 1,
    question: `列出 C# 中至少 3 种值类型和 3 种引用类型。`,
    answer:
      `值类型：int、double、bool、char、struct（如 DateTime）、enum。\n引用类型：string、class 实例、数组（int[]）、接口、委托。\n关键区别：值类型在栈上分配、赋值拷贝数据；引用类型在堆上分配、赋值共享引用。string 是特殊的引用类型——不可变（immutable），行为看起来像值类型。`,
    tags: ["值类型", "引用类型", "分类"],
  },
  {
    id: "ec7-types-variables-2",
    chapter: "ec7-types-variables",
    level: 2,
    question: `分析以下代码的输出并解释原因：\n\`\`\`csharp\nint[] a = { 1, 2, 3 };\nint[] b = a;\nb[0] = 99;\nConsole.WriteLine(a[0]);\n\`\`\``,
    answer:
      `输出 99。数组是引用类型，\`int[] b = a\` 让 b 和 a 指向堆上同一个数组对象。通过 b 修改 b[0] = 99 直接改变了共享的数组，所以 a[0] 也是 99。\n要创建独立拷贝，需用 \`b = (int[])a.Clone()\` 或 \`b = a.ToArray()\` 或 \`b = new int[](a)\`。\n对比值类型：\`int x = 10; int y = x; y = 99;\` 中 x 仍为 10，因为 int 是值类型，赋值产生独立拷贝。`,
    tags: ["引用类型", "数组", "赋值语义"],
  },
  {
    id: "ec7-types-variables-3",
    chapter: "ec7-types-variables",
    level: 3,
    question: `什么是装箱（Boxing）？它有什么性能问题？泛型如何解决？写出装箱和拆箱的代码示例。`,
    answer:
      `装箱是把值类型隐式转换为 object（或接口）引用类型，在堆上分配对象并拷贝数据。拆箱是反向操作。\n性能问题：(1) 堆分配开销（需要在堆上创建对象）；(2) 数据拷贝开销；(3) GC 压力（装箱对象变垃圾后需回收）。频繁装箱（如在循环中把 int 存进 ArrayList）会产生大量垃圾对象。\n泛型解决方案：List<int> 内部是 int[]，直接存值，不需要装箱。\n\`\`\`csharp\nint x = 42;\nobject o = x;      // 装箱：堆上创建 int 对象，拷贝 42\nint y = (int)o;    // 拆箱：从堆对象提取值\n// 对比泛型（无装箱）\nvar list = new List<int>();\nlist.Add(42);      // 直接存值，不装箱\n\`\`\``,
    tags: ["装箱", "拆箱", "泛型", "性能"],
  },
  {
    id: "ec7-types-variables-4",
    chapter: "ec7-types-variables",
    level: 4,
    question: `设计一个场景：你需要存储一组坐标点，应该用 struct 还是 class？从内存分配、赋值语义、性能三个角度分析。`,
    answer:
      `坐标点（如 Point { double X, Y }）应该用 struct。分析：\n(1) 内存分配：struct 是值类型，小对象在栈上分配，无 GC 压力。class 在堆上分配，每个点对象都有堆开销 + 引用开销 + GC 跟踪成本。大量坐标点（如游戏中的粒子系统）用 struct 显著减少 GC。\n(2) 赋值语义：struct 赋值拷贝数据，两个点独立——符合坐标的值语义（修改一个点不应影响另一个）。class 赋值共享引用，修改一个影响另一个，容易出 bug。\n(3) 性能：struct 在数组中连续存储（int[] 内部是一块连续内存），缓存友好。class 数组存的是引用（指针），实际对象分散在堆上，缓存不友好。但注意：大 struct（超过 16 字节）频繁传参时拷贝开销大，应加 ref 或改用 class。\n\`\`\`csharp\npublic struct Point { public double X; public double Y; }\nvar p1 = new Point { X = 1, Y = 2 };\nvar p2 = p1;  // 独立拷贝\np2.X = 99;    // p1.X 仍为 1\n\`\`\``,
    tags: ["struct", "class", "性能", "设计决策"],
  },
];
