import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 函数复习题 */
export const ecpFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "ecp-functions-1",
    chapter: "ecp-functions",
    level: 1,
    question: `C++ 函数的基本结构是什么？写一个函数 \`add\`，接收两个 \`int\` 参数，返回它们的和。`,
    answer:
      `函数基本结构：\n\`\`\`\n返回类型 函数名(参数列表) {\n    函数体\n    return 返回值;\n}\n\`\`\`\n\n\`add\` 函数：\n\`\`\`cpp\nint add(int a, int b) {\n    return a + b;\n}\n\`\`\`\n\n调用：\n\`\`\`cpp\nint result = add(3, 5);  // result = 8\n\`\`\`\n\n说明：\n- \`int\` 是返回类型，表示返回整数。\n- \`add\` 是函数名。\n- \`int a, int b\` 是参数列表，接收两个整数。\n- \`return a + b;\` 计算并返回结果。\n- 如果函数不返回值，用 \`void\`，不需要 \`return\` 语句。`,
    tags: ["函数定义", "参数", "返回值"],
  },
  {
    id: "ecp-functions-2",
    chapter: "ecp-functions",
    level: 2,
    question: `值传递和引用传递有什么区别？为什么有时要用引用传递？`,
    answer:
      `值传递（pass by value）：\n- 把实参的值复制一份给形参，函数内修改形参不影响实参。\n- 适合小对象（\`int\`、\`double\`），安全但复制有成本。\n\`\`\`cpp\nvoid addTen(int x) { x += 10; }  // 改的是副本\nint n = 5;\naddTen(n);  // n 仍是 5\n\`\`\`\n\n引用传递（pass by reference）：\n- 形参是实参的别名，函数内修改形参直接改实参。\n- 用 \`&\` 声明引用参数。\n\`\`\`cpp\nvoid addTen(int &x) { x += 10; }  // 直接改实参\nint n = 5;\naddTen(n);  // n 变成 15\n\`\`\`\n\n用引用传递的原因：\n1. 需要在函数内修改实参（如交换两个变量）。\n2. 避免大对象（如 \`string\`、\`vector\`）的复制开销。\n3. 不想修改但又想避免复制时，用 \`const\` 引用：\`void print(const string &s)\`。`,
    tags: ["值传递", "引用传递", "参数传递"],
  },
  {
    id: "ecp-functions-3",
    chapter: "ecp-functions",
    level: 3,
    question: `写一个函数 \`swap\` 交换两个 \`int\` 变量的值，并写一个重载版本交换两个 \`double\`。说明函数重载的规则。`,
    answer:
      `\`\`\`cpp\n// 交换 int\nvoid swap(int &a, int &b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}\n\n// 交换 double（重载）\nvoid swap(double &a, double &b) {\n    double tmp = a;\n    a = b;\n    b = tmp;\n}\n\`\`\`\n\n调用：\n\`\`\`cpp\nint x = 1, y = 2;\nswap(x, y);  // 调用 int 版，x=2, y=1\n\ndouble p = 1.5, q = 2.5;\nswap(p, q);  // 调用 double 版，p=2.5, q=1.5\n\`\`\`\n\n函数重载规则：\n1. 同名函数参数列表必须不同（参数个数、类型或顺序不同）。\n2. 返回类型不同不能构成重载（编译器按参数列表决定调用哪个）。\n3. 编译器根据实参类型自动选择最匹配的版本——这叫「重载解析」。\n4. 重载让同一操作对不同类型有统一接口，避免写 \`swapInt\`、\`swapDouble\` 等一堆名字。`,
    tags: ["重载", "swap", "引用", "应用"],
  },
  {
    id: "ecp-functions-4",
    chapter: "ecp-functions",
    level: 4,
    question: `综合分析：函数设计中有哪些常见原则？内联函数、默认参数、函数重载分别在什么场景下使用？`,
    answer:
      `函数设计原则：\n1. 单一职责：一个函数只做一件事，便于测试和复用。\n2. 命名清晰：函数名应说明「做什么」而非「怎么做」。\n3. 参数不宜过多：超过 4-5 个考虑用结构体封装。\n4. 避免副作用：纯函数（输入决定输出，不改外部状态）更易维护。\n5. 小函数优先：短函数易读易调试，长函数考虑拆分。\n\n内联函数（\`inline\`）：\n- 适合短小、频繁调用的函数。编译器把函数体直接展开到调用处，省去函数调用开销。\n- 不适合递归或大函数（展开后代码膨胀）。\n- 示例：\`inline int square(int x) { return x * x; }\`\n\n默认参数：\n- 当某参数大多数情况取同一个值时，给默认值简化调用。\n- 示例：\`void log(string msg, int level = 0)\`，调用可省略 \`level\`。\n- 规则：默认参数必须从右往左连续设置，有默认值的参数右边不能有无默认值的参数。\n\n函数重载：\n- 同一操作对不同类型提供统一接口。\n- 适合参数类型不同但语义相同的场景，如 \`print(int)\` / \`print(double)\` / \`print(string)\`。\n- 不适合行为差异大的情况，那应该用不同名字。\n\n综合：内联解决「频繁调用的小函数性能」，默认参数解决「常用参数简化」，重载解决「多类型统一接口」，配合好的设计原则能写出既高效又易维护的代码。`,
    tags: ["函数设计", "inline", "默认参数", "重载", "综合"],
  },
];
