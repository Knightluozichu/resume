import type { ReviewQuestion } from "./types";

/** Effective C++ 构造与析构复习题 */
export const efcConstructorsDestructorsQuestions: ReviewQuestion[] = [
  {
    id: "efc-constructors-destructors-1",
    chapter: "efc-constructors-destructors",
    level: 1,
    question: "对象的构造和析构顺序分别是什么？",
    answer:
      "构造顺序（自上而下）：\n1. 基类构造函数（从最顶层基类到直接基类，按继承声明顺序）\n2. 成员变量构造（按声明顺序，不是初始化列表顺序）\n3. 派生类构造函数体执行\n\n析构顺序（严格反向）：\n1. 派生类析构函数体执行\n2. 成员变量析构（按声明逆序）\n3. 基类析构函数（从直接基类到最顶层基类）\n\n记忆口诀：构造自基向派，析构自派向基。成员始终比对象本体先构造、后析构——成员是对象的一部分，必须在对象体执行前就绪，在对象体结束后才销毁。",
    tags: ["构造顺序", "析构顺序", "基本概念"],
  },
  {
    id: "efc-constructors-destructors-2",
    chapter: "efc-constructors-destructors",
    level: 2,
    question:
      "条款 9 说「绝不在构造和析构过程中调用 virtual 函数」，为什么？会有什么后果？",
    answer:
      "原因：在构造基类时，派生类部分尚未成型；在析构基类时，派生类部分已经销毁。此时调用 virtual 函数不会触发多态，而是退化为基类版本。\n\n具体机制：\n- 构造派生类对象时，先执行基类构造函数。此时对象的运行时类型被视为基类类型（不是派生类），virtual 函数调用会绑定到基类版本。\n- 析构时同理：派生类析构完成后，进入基类析构，此时对象已退化为基类类型。\n\n后果：\n- 如果基类构造函数调用了 virtual 函数 `init()`，期望派生类覆盖它来完成派生部分的初始化——但实际调用的是基类版本的 `init()`，派生类的初始化逻辑被跳过，对象状态不完整。\n- 更危险的是：如果基类版本的 virtual 函数是纯虚函数（`= 0`），构造期间调用会导致未定义行为（通常是 abort）。\n\n修法：把 virtual 函数改为非虚函数，要求派生类在构造函数中传递必要信息给基类（通过参数），而不是依赖基类在构造期间回调派生类。或者用「工厂方法 + 两阶段构造」：先构造再调 `init()`。",
    tags: ["条款9", "virtual函数", "构造析构", "多态失效"],
  },
  {
    id: "efc-constructors-destructors-3",
    chapter: "efc-constructors-destructors",
    level: 3,
    question:
      "条款 10 要求 `operator=` 返回 `reference to *this`，条款 11 要求处理「自我赋值」。请解释这两条如何配合实现安全的赋值运算符？",
    answer:
      "条款 10：返回 `reference to *this`\n- 目的：支持链式赋值 `a = b = c = d`\n- 标准 `operator=` 的签名应为 `T& operator=(const T& rhs)`，返回 `*this`\n- 这是约定：内置类型、标准库类型都遵循此约定，自定义类型也应遵循以保持一致\n\n条款 11：处理自我赋值\n- 自我赋值场景：`w = w`、`a[i] = a[j]`（i==j）、`*p = *q`（p==q）\n- 危险：如果 `operator=` 先删除旧资源再复制新资源，自我赋值时旧资源已被释放，新资源拷贝会读到已释放内存\n- 三种处理方式：\n  1. 身份检查：`if (this == &rhs) return *this;`——简单但非异常安全\n  2. 先拷贝再释放：先复制新资源，确认成功后再释放旧资源——异常安全但代码繁琐\n  3. copy-and-swap：`T& operator=(T tmp) { swap(tmp); return *this; }`——最优雅，利用传值拷贝 + swap 实现自我赋值安全和异常安全\n\n两条条款的配合：\n- 条款 10 保证返回值语义正确（链式赋值可用）\n- 条款 11 保证赋值内容安全（自我赋值不崩溃）\n- copy-and-swap 模式同时满足两者：传值参数自动处理拷贝，swap 后返回 `*this` 满足链式语义\n\n最佳实践：`T& operator=(const T& rhs) { T tmp(rhs); swap(tmp); return *this; }` 或更简洁的传值版本 `T& operator=(T tmp) { swap(tmp); return *this; }`。",
    tags: ["条款10", "条款11", "operator=", "自我赋值", "异常安全"],
  },
  {
    id: "efc-constructors-destructors-4",
    chapter: "efc-constructors-destructors",
    level: 4,
    question:
      "条款 5 说编译器会自动生成某些函数，条款 6 说需要时可以拒绝。请综合说明编译器默认生成的函数有哪些？如何在不同的 C++ 版本中拒绝它们？拒绝后对类设计有什么影响？",
    answer:
      "编译器自动生成的函数（条款 5）：\n如果类没有显式声明，编译器会自动生成以下函数（仅在被需要时）：\n- 默认构造函数（无参）：仅当类没有任何构造函数时才生成\n- 拷贝构造函数：按成员逐个拷贝\n- 拷贝赋值运算符：按成员逐个赋值\n- 析构函数：非虚（除非基类有虚析构）\n- C++11 起还会生成 move 构造和 move 赋值（条件更严格）\n\n拒绝自动生成的方法（条款 6）：\n\nC++11 之前（旧式）：\n- 把不想用的函数声明为 private 且不实现\n- 调用会在编译期（友元/成员）或链接期（外部）报错\n- 缺点：不够直观，链接错误信息难懂\n\nC++11 起（推荐）：\n- 用 `= delete` 标记：`T(const T&) = delete;`\n- 编译器直接拒绝任何调用，错误信息清晰\n- 可以用于任何函数，不限于特殊成员函数\n- 可以加 `public` 访问修饰符（delete 不受访问级别影响，但 public 让错误信息更早出现）\n\n拒绝后对类设计的影响：\n1. 不可拷贝的类：如 `unique_ptr`、`mutex`、`atomic`——这些类型的语义决定了拷贝没有意义或危险\n2. 可拷贝但不可赋值的类：如含有引用成员或 const 成员的类——引用和 const 不可重新绑定/修改，拷贝赋值无法实现\n3. 单例模式：把构造、拷贝、赋值都 delete，强制通过 `instance()` 访问\n4. 多态基类：把析构函数设为虚（允许通过基类指针删除），把拷贝设为 delete（防止对象切片），提供 `clone()` 虚函数替代\n\n深层原则：编译器生成的函数只做「逐成员」操作，当这种操作不符合类的语义（资源所有权、不变式、多态）时，就必须自己定义或拒绝。每声明一个构造函数或拷贝控制成员，都要想清楚其他五个应该怎么处理——这是条款 5-12 的核心。",
    tags: ["综合", "条款5", "条款6", "编译器生成", "delete", "类设计"],
  },
];
