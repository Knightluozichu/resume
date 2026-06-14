/** 复习题库 · C++ 字符串、向量和数组（cpp-strings-vectors-arrays）。C++ Primer §3 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppStringsVectorsArraysQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "csva-1",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "`std::string` 和 C 风格的 `char[]` 有什么区别？至少说出三点。",
    answer:
      "① `std::string` 大小可动态变化，`char[]` 大小固定；② `string` 有 `.size()` 方法知道自己的长度，`char[]` 需要 `strlen()` 遍历找 `\\0`；③ `string` 支持 `+` 拼接和 `==` `!=` `<` 等比较运算符；④ `string` 的数据存储在堆上，`char[]` 在栈上。",
    tags: ["string", "char[]", "对比"],
  },
  {
    id: "csva-2",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "`std::vector` 是什么？它和 C 风格数组最本质的区别是什么？",
    answer:
      "`std::vector` 是 C++ 标准库提供的**动态数组容器**。最本质的区别是 vector 的大小可以在运行时动态变化（通过 `push_back` 添加元素、自动扩容），而 C 数组的大小在声明时就固定了且不可改变。",
    tags: ["vector", "动态数组"],
  },
  {
    id: "csva-3",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "迭代器的 `begin()` 和 `end()` 分别指向哪里？",
    answer:
      "`begin()` 返回指向容器**第一个元素**的迭代器。`end()` 返回指向容器**最后一个元素之后的位置**（尾后迭代器，也叫 off-the-end iterator）——它不指向任何元素，是一个哨兵标记。遍历时只要迭代器不等于 `end()` 就说明还有元素。",
    tags: ["迭代器", "begin", "end"],
  },
  {
    id: "csva-4",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "`string::size_type` 和 `vector<int>::size_type` 是什么类型？为什么需要它而不是直接用 `int`？",
    answer:
      "`size_type` 是容器内部定义的**无符号整数类型**，专门用来表示容器的大小和下标。用 `int` 表示 size 有两个问题：① int 是有符号的，而容器大小不可能为负，用 unsigned 语义更准确；② 在不同平台上 size 所需位数可能不同，`size_type` 保证总够用。混用 `size_type` 和 `int` 可能导致 signed/unsigned 比较的隐式转换问题。",
    tags: ["size_type", "无符号"],
  },
  {
    id: "csva-5",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "什么是「范围 for 循环」（range-based for loop）？写出它的基本语法格式。",
    answer:
      "范围 for 循环是 C++11 引入的语法，用来遍历一个容器或序列里**每一个元素**，不用手动写下标或迭代器。基本格式：`for (declaration : container) { body }`——比如 `for (auto c : str)` 会把 str 里的字符逐一赋给 c。也可以用引用 `for (auto &c : str)` 来直接修改原元素。",
    tags: ["范围for", "range-based for"],
  },
  {
    id: "csva-6",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "C 风格数组在传递给函数时会变成什么？为什么会丢失大小信息？",
    answer:
      "C 风格数组作为函数参数时，会**退化成指针**（pointer decay）——`void f(int arr[10])` 里的 arr 实际是一个 `int*`，`sizeof(arr)` 返回的是指针大小（8 字节）而不是数组大小。这也是 vector 比数组更安全的原因之一——vector 作为参数传递不会退化，`.size()` 依然可用。",
    tags: ["数组", "指针退化", "decay"],
  },
  {
    id: "csva-7",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "`v.push_back(x)` 和 `v[i] = x` 的区别是什么？什么时候只能用 `push_back`？",
    answer:
      "`v.push_back(x)` 是在 vector 末尾**添加**一个新元素（size 会增加 1）。`v[i] = x` 是**修改**下标 i 处已有的元素（前提是 i < size，且不会改变 size）。当 vector 为空或 i >= size 时，必须用 `push_back`——越界下标操作是未定义行为。",
    tags: ["push_back", "下标", "vector"],
  },
  {
    id: "csva-8",
    chapter: "cpp-strings-vectors-arrays",
    level: 1,
    question: "说出三种初始化 vector 的方式，并各给一个代码示例。",
    answer:
      "① 空 vector：`vector<int> v1;`——size=0。② 指定大小+默认值：`vector<int> v2(5, 0);`——5 个 0。③ 列表初始化（C++11）：`vector<int> v3{1, 2, 3};`——3 个元素。④ 从另一个 vector 拷贝：`vector<int> v4(v3);`。⑤ 从数组拷贝：`vector<int> v5(arr, arr + n);`。",
    tags: ["vector", "初始化"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "csva-9",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "vector 在 `push_back` 触发扩容的时候，具体发生了什么？为什么 capacity 通常翻倍而不是加固定大小？",
    answer:
      "扩容时 vector 做三步：① 分配一块更大的新内存（通常是旧容量 ×2）；② 把旧元素逐个拷贝到新内存；③ 释放旧内存。容量翻倍（指数增长）而非每次加 1 的原因：如果把 N 个元素逐个 push_back，翻倍扩容的总拷贝次数是 O(N)（均摊每次 O(1)），而每次只加 1 个位置的话总拷贝次数是 O(N²)。翻倍策略让扩容的昂贵操作被均摊到廉价。",
    tags: ["vector", "扩容", "均摊复杂度"],
  },
  {
    id: "csva-10",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "为什么 `std::string` 用 `+` 运算符拼接多个字符串时，推荐用 `+=` 累积而不是写一长串 `+` 链？",
    answer:
      "每用一次 `+`，C++ 都会创建一个**临时 string 对象**来存中间结果。连续多个 `+` 会产生多个临时对象（每个都要分配内存 + 拷贝数据），效率较低。`+=` 直接在原有 string 上追加，避免了不必要的临时对象分配。但如果用 `+` 把所有操作连在一条表达式里（如 `s1 + s2 + s3`），编译器可能会做优化。",
    tags: ["string", "+=", "效率"],
  },
  {
    id: "csva-11",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "`vector` 的 `size()` 和 `capacity()` 分别表示什么？为什么不总相等？",
    answer:
      "`size()` 是 vector 里**实际装了多少个元素**。`capacity()` 是**已经分配的内存能装下几个元素**（不重新分配的前提下）。`capacity ≥ size`。不总相等的原因是：如果每次 push_back 都严格让 capacity=size，那每次加元素都要重新分配内存——效率极低。多分配一些预留空间（capacity > size），后续 push_back 就省了扩容开销。",
    tags: ["size", "capacity", "vector"],
  },
  {
    id: "csva-12",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "在范围 for 循环里修改变量时，用 `auto c` 和 `auto &c` 有什么区别？什么时候必须用引用？",
    answer:
      "`auto c` 是**按值拷贝**——每次迭代把容器元素拷一份给 c，在 c 上的修改不会影响原容器里的元素。`auto &c` 是**引用**——c 就是原元素的别名，修改 c 就是修改原容器。如果你需要修改原容器里的元素，或者元素是大型对象（省拷贝开销），就必须用引用。只读遍历大对象时推荐 `const auto &c`。",
    tags: ["范围for", "引用", "拷贝"],
  },
  {
    id: "csva-13",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "为什么在遍历 vector 的同时做 `push_back` 是危险的？具体会发生什么？",
    answer:
      "push_back 可能触发**扩容**——扩容意味着① 分配新内存 ② 拷贝旧元素 ③ **释放旧内存**。如果遍历用的迭代器还指向旧内存，释放后迭代器就变成了「悬空指针」（dangling），继续使用会导致未定义行为（可能读到垃圾数据或崩溃）。另外即使不扩容，在遍历中插入元素也会打乱遍历逻辑。所以标准建议：不要在遍历容器的同时修改容器结构。",
    tags: ["迭代器", "push_back", "悬空指针"],
  },
  {
    id: "csva-14",
    chapter: "cpp-strings-vectors-arrays",
    level: 2,
    question: "`std::string` 和 `std::vector` 底层都是用堆上动态数组实现的。它们本质相似，为什么 C++ 要分成两个独立的类？",
    answer:
      "虽然底层数据结构相似（堆上连续数组），但语义完全不同：string 专门为**文本**设计——提供了字符串拼接（+）、查找子串（find）、提取子串（substr）、C 风格字符串转换（c_str）等字符串专属操作。vector 是**通用**容器——存任意类型、不预设「它存的东西是文本」。分开能让各自的接口更精准、类型检查更严格（比如你不能把 int 赋值给 string）。",
    tags: ["string", "vector", "语义"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "csva-15",
    chapter: "cpp-strings-vectors-arrays",
    level: 3,
    question:
      "下面这段代码有四处问题。找出它们并解释每处会出什么错。\n```cpp\nvector<int> v;\nv[0] = 10;\nfor (int i = 0; i <= v.size(); i++)\n    cout << v[i] << endl;\n```",
    answer:
      "① `v[0] = 10;`——vector 是空的（size=0），下标 0 的元素不存在，这是**未定义行为**。应该用 `v.push_back(10);`。② `i <= v.size()`——循环条件包含了 `v.size()` 这个下标，但最后一个有效下标是 `v.size() - 1`，访问 `v[v.size()]` 越界。应改为 `i < v.size()`。③ 如果 v 是空的，`v.size()` 是 0 而 `size()` 返回 `size_type` (unsigned)，`i <= 0u` 把 i=0 和 0u 比较没问题，但习惯上不该用 `<=`。④ `cout` 前缺少 `std::` 或 `using` 声明。",
    tags: ["vector", "越界", "push_back", "排错"],
  },
  {
    id: "csva-16",
    chapter: "cpp-strings-vectors-arrays",
    level: 3,
    question:
      "读下面代码，说出每次 cout 的输出结果。\n```cpp\nvector<int> v{1, 2, 3};\ncout << v.size() << endl;      // ①\nv.push_back(4);\ncout << v.size() << endl;      // ②\ncout << v[3] << endl;           // ③\ncout << v.capacity() << endl;   // ④（≥ v.size()）\n```",
    answer:
      "① 3——初始列表初始化了 3 个元素。② 4——push_back 后 size 加 1。③ 4——v[3] 是第 4 个元素（下标 3），值为 4。④ capacity 的值取决于实现——至少 ≥ 4，可能是 4 或 6（列表初始化后 capacity 至少 3，push 第 4 个时可能触发扩容翻倍）。",
    tags: ["vector", "size", "capacity", "下标"],
  },
  {
    id: "csva-17",
    chapter: "cpp-strings-vectors-arrays",
    level: 3,
    question:
      "下面代码想用范围 for 把 vector 里每个元素翻倍，但实际跑完值没变。哪里错了？怎么修正？\n```cpp\nvector<int> v{1, 2, 3};\nfor (auto x : v)\n    x *= 2;  // 想改成 2, 4, 6\n```",
    answer:
      "`auto x` 是**按值拷贝**——x 是 v 里元素的副本，`x *= 2` 只修改了副本，v 里的原元素纹丝不动。修正：改为 `auto &x : v` 或 `for (int &x : v)`——加个 `&` 让 x 成为原元素的引用，修改 x 就直接修改了 v 里的值。如果只读遍历，写成 `const auto &x : v` 既避免了拷贝又不会意外修改。",
    tags: ["范围for", "引用", "拷贝vs引用"],
  },
  {
    id: "csva-18",
    chapter: "cpp-strings-vectors-arrays",
    level: 3,
    question:
      "编译报错：`error: no match for 'operator<<' in 'cout << vec'`。你对一个 `vector<int>` 对象直接 `cout << vec;` 了。为什么不能直接输出？该怎么办？",
    answer:
      "C++ 标准库没有为 `vector<T>` 定义 `<<` 运算符。`cout` 不知道怎么「打印一个 vector」。你需要自己写一个循环来逐个输出元素：`for (auto &x : vec) cout << x << ' ';` 或者用迭代器：`for (auto it = vec.begin(); it != vec.end(); ++it) cout << *it << ' ';`。",
    tags: ["输出", "vector", "操作符重载"],
  },
  {
    id: "csva-19",
    chapter: "cpp-strings-vectors-arrays",
    level: 3,
    question:
      "用 `getline(cin, s)` 和 `cin >> s` 读取一行文字，读到的内容有什么不同？什么时候该用哪个？",
    answer:
      "`cin >> s` 遇到**空格/制表/换行**就停止，只能读完一个单词（word）。`getline(cin, s)` 读一整行直到换行符（`\\n`），空格不会被打断，适合读含空格的一整句话。注意：`cin >>` 会在输入流里留下换行符，紧接 `getline` 会导致后者读到一个空行——需要用 `cin.ignore()` 消耗掉残留的换行符。",
    tags: ["getline", "cin", "输入"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "csva-20",
    chapter: "cpp-strings-vectors-arrays",
    level: 4,
    question:
      "写一个函数 `fibonacci(n)`，返回一个 `vector<int>`，里面是前 n 个斐波那契数（第一个是 0，第二个是 1，后面每个是前两个之和）。说明你的实现思路，并解释为什么用 vector 而不是数组。",
    answer:
      "```cpp\nvector<int> fibonacci(int n) {\n    vector<int> fib;\n    if (n >= 1) fib.push_back(0);\n    if (n >= 2) fib.push_back(1);\n    for (int i = 2; i < n; ++i) {\n        fib.push_back(fib[i-1] + fib[i-2]);\n    }\n    return fib;\n}\n```\n用 vector 而不是数组的原因是 n 在运行前才确定——C 数组的大小必须是编译时常量。vector 可以在运行时动态 push_back，且返回 vector 时自动深拷贝，调用者拿到的是独立副本，不用操心谁负责释放。",
    tags: ["vector", "斐波那契", "综合"],
  },
  {
    id: "csva-21",
    chapter: "cpp-strings-vectors-arrays",
    level: 4,
    question:
      "你在一个大循环里反复对 `vector<string>` 做 `push_back`，发现程序越来越慢。用 `reserve()` 能怎么优化？写出优化前后的关键代码并解释原理。",
    answer:
      "优化前：`vector<string> v; for (...) { v.push_back(s); }`——每次 push_back 可能触发扩容，把已有元素全部拷贝一遍。优化后：在循环前加上 `v.reserve(n);`（n 是预计的元素数量），提前一次性分配好足够的内存，之后的 push_back 就不会再扩容了——`for (...) { v.push_back(s); }`。原理：`reserve(n)` 让 `capacity >= n`，后续 push_back 只要 `size < capacity` 就不需要重新分配+拷贝，消除了最耗时的扩容操作。",
    tags: ["reserve", "扩容", "性能优化", "综合"],
  },
];

export default cppStringsVectorsArraysQuestions;
