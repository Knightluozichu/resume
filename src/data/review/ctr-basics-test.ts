import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 基础语法测试复习题 */
export const ctrBasicsTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-basics-test-1",
    chapter: "ctr-basics-test",
    level: 1,
    question: "什么是未定义行为（UB）？请举一个最常见的 C++ UB 例子。",
    answer:
      "未定义行为（Undefined Behavior）是指程序的行为没有被 C++ 标准规定，编译器无需诊断、运行时任何结果都「合法」（崩溃、错误结果、看似正常都可能出现）。一旦程序含 UB，整个程序的行为就不再可信，编译器可基于「程序无 UB」做激进优化。\n\n最常见的例子是有符号整数溢出：`int` 的运算结果超出表示范围是 UB。例如 `INT_MAX + 1` 不是「回绕到最小值」，而是 UB——编译器可能假设它永不溢出来做优化。其他高频 UB：解引用空指针/悬空指针、访问未初始化变量、同一标量上有冲突的读写无 sequenced-before 关系（数据竞争）、对未对齐地址取引用。\n\n记忆要点：UB 不是「报错」，而是「标准放弃描述」，所以最危险——它常常「在你机器上正常，上线崩溃」。",
    tags: ["未定义行为", "UB", "有符号溢出"],
  },
  {
    id: "ctr-basics-test-2",
    chapter: "ctr-basics-test",
    level: 2,
    question: "什么是 const 正确性？为什么「const 成员函数」不能修改对象状态？const 在重载决议中如何参与？",
    answer:
      "const 正确性指在类型系统中一致地用 `const` 标注「不应被修改」的对象、参数、成员函数，让编译器在编译期拦截误修改。核心是：如果一个东西逻辑上不该变，就给它加 const，让错误从运行时提前到编译时。\n\nconst 成员函数不能修改对象状态：在 const 成员函数内，`this` 的类型是 `const T*`，所以所有非 mutable 的成员都变成 const，赋值即编译错误。这保证了「调用 const 成员函数不会改变对象」这一契约。\n\nconst 参与重载：成员函数可以按 const 与非 const 重载，编译器根据调用对象的 const 性选择。常量对象只能调 const 版本；非常量对象优先调非 const 版本（精确匹配优于加 const）。典型用法是 `operator[]` 提供两个版本：非 const 返回引用可写，const 返回 const 引用只读。\n\n陷阱：const 成员函数仍可修改 `mutable` 成员（如缓存、互斥量），这是 const 正确性的「逃生口」，但滥用会破坏契约，应只用于逻辑 const（对象可观察状态不变）而物理可变的情况。",
    tags: ["const 正确性", "const 成员函数", "重载"],
  },
  {
    id: "ctr-basics-test-3",
    chapter: "ctr-basics-test",
    level: 3,
    question: "C++ 的四种新式类型转换 `static_cast` / `const_cast` / `reinterpret_cast` / `dynamic_cast` 各自用途是什么？下列场景该用哪个：把 `const int*` 传给要 `int*` 的旧 C 函数；在已知派生类型时把基类指针转派生类指针；在两个不相关指针类型间转换。",
    answer:
      "四种转换用途：\n- `static_cast<T>(e)`：用于有明确定义的隐式转换的反向或显式形式，如基本类型间转换、`void*` 与具体指针互转、已知安全的向下转型。编译期检查相关类型，但不做多态运行时检查。\n- `const_cast<T>(e)`：只用于增删 const/volatile，不改变底层类型。这是唯一能「去掉 const」的转换，但去掉后改写原本真的是 const 的对象是 UB。\n- `reinterpret_cast<T>(e)`：在位层面重新解释，如不相关的指针类型互转、指针与整数互转。最危险，依赖实现，应只用于与底层/序列化打交道。\n- `dynamic_cast<T>(e)`：用于多态类型（含虚函数）的运行时向下转型或交叉转型，失败返回空指针（指针版本）或抛 `std::bad_cast`（引用版本），依赖 RTTI。\n\n三个场景：\n1. `const int*` 传给要 `int*` 的旧 C 函数：用 `const_cast<int*>(p)` 去掉 const。前提是原对象本身不是 const，否则修改是 UB。\n2. 已知派生类型时基类指针转派生类指针：用 `static_cast<Derived*>(base)`，因为已确认真实类型，无需运行时开销。若不确定类型应改用 `dynamic_cast`。\n3. 两个不相关指针类型间转换：用 `reinterpret_cast`，这是它唯一合法的场景，且要清楚这依赖实现的内存表示。",
    tags: ["类型转换", "static_cast", "const_cast", "reinterpret_cast", "dynamic_cast"],
  },
  {
    id: "ctr-basics-test-4",
    chapter: "ctr-basics-test",
    level: 4,
    question: "下面代码有何隐患？请从 UB、const 正确性、类型转换三个角度分析并给出修正方案：`int* p; if (p) { *p = 1; }` 与 `const char* s = \"abc\"; const_cast<char*>(s)[0] = 'A';`。",
    answer:
      "第一段 `int* p; if (p) { *p = 1; }`：\n- UB 角度：`p` 未初始化，读取一个未初始化的指针的值本身就是 UB（标准规定自动存储期的标量初值不确定，读取不确定值是 UB）。所以 `if (p)` 这一步已经 UB，比较结果不可信——可能恰好非空，也可能恰好为空，编译器甚至可基于「程序无 UB」假设 `p` 已初始化而删掉整个判断。\n- 修正：必须初始化 `int* p = nullptr;`，或让它指向合法对象。`if (p)` 对 nullptr 判断正确，但前提是 p 有确定值。\n\n第二段 `const char* s = \"abc\"; const_cast<char*>(s)[0] = 'A';`：\n- UB 角度：字符串字面量 `\"abc\"` 存放在只读存储区，类型本是 `const char[4]`。`s` 指向它，用 `const_cast` 去掉 const 后写入，修改一个「真正是 const」的对象是 UB——在多数平台上会触发段错误，但 UB 意味着也可能不报错。\n- const 正确性角度：`const_cast` 的合法用途是「原本非 const 但被 API 错误地标了 const」的情况；对真正 const 的对象去 const 是误用。这里 `s` 本来就指向 const 数据，const_cast 是在自欺欺人。\n- 修正：要可改字符串就别用字面量，用可写缓冲：`char buf[] = \"abc\"; buf[0] = 'A';`，`buf` 是副本可自由修改。\n\n综合启示：UB 的可怕在于「标准放弃描述」，const_cast 只能用于「确实不是 const」的对象，类型转换不是「让编译器闭嘴」的工具。",
    tags: ["未定义行为", "const_cast", "字符串字面量", "未初始化", "综合分析"],
  },
];
