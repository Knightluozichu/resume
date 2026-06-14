/** 复习题库 · C++ 用于大型程序的工具（cpp-large-programs）。C++ Primer §18 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppLargeProgramsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 语法约定） ──
  {
    id: "clp-1",
    chapter: "cpp-large-programs",
    level: 1,
    question: "C++ 标准异常类继承树的根是什么？它的主要方法是什么？",
    answer:
      "根是 `std::exception`（定义在 `<exception>` 头）。主要方法是虚函数 `const char* what() const noexcept`——返回一条描述异常的 C 风格字符串。`exception` 类本身没有接受 `std::string` 的构造函数——所以自定义异常应继承自 `logic_error` 或 `runtime_error`，而不是直接继承裸 `exception`。",
    tags: ["exception", "标准异常", "继承树"],
  },
  {
    id: "clp-2",
    chapter: "cpp-large-programs",
    level: 1,
    question: "`logic_error` 和 `runtime_error` 的区别是什么？各有哪些常见子类？",
    answer:
      "`logic_error` 代表**程序启动前就能发现的错误**——参数非法、索引越界等。子类：`invalid_argument`（无效实参）、`out_of_range`（越界访问）、`length_error`（长度超限）、`domain_error`（定义域错误）。`runtime_error` 代表**只有运行时才会发生的错误**——计算结果超出范围等。子类：`range_error`、`overflow_error`（上溢）、`underflow_error`（下溢）。",
    tags: ["logic_error", "runtime_error", "子类"],
  },
  {
    id: "clp-3",
    chapter: "cpp-large-programs",
    level: 1,
    question: "什么是异常安全的三个级别？每个级别的关键词是什么？",
    answer:
      "① **基本保证**（basic guarantee）：异常发生后——没有资源泄漏、所有对象仍可析构（有效但不保证内容没变）。② **强保证**（strong / commit-or-rollback）：抛异常后程序状态与调用前完全一样——如函数从未被调用。③ **不抛异常保证**（nothrow guarantee）：函数承诺永不抛异常——标记 `noexcept`，若仍抛出则直接 `std::terminate()`。",
    tags: ["异常安全", "三级保证"],
  },
  {
    id: "clp-4",
    chapter: "cpp-large-programs",
    level: 1,
    question: "`noexcept` 关键字是什么？标记为 `noexcept` 的函数内部抛了异常会怎样？",
    answer:
      "`noexcept` 声明函数永不抛出异常——是一个契约/承诺。如果 `noexcept` 函数内部抛出了异常——**不会被 catch 处理**，而是直接调用 `std::terminate()` 终止整个程序。编译器基于 `noexcept` 做两件事：① 跳过栈展开机械（激进优化）；② `std::vector` 等容器用它决定走 `move` 快路径还是 `copy` 慢路径。析构函数**隐式 noexcept**——在析构中抛异常 = terminate()。",
    tags: ["noexcept", "terminate"],
  },
  {
    id: "clp-5",
    chapter: "cpp-large-programs",
    level: 1,
    question: "`throw;`（后面不带表达式）和 `throw e;` 的区别是什么？什么时候用哪个？",
    answer:
      "`throw;`——**重新抛出当前正在处理的同一异常对象**，不拷贝、不切片、保留原始动态类型。在 `catch` 块中用来把异常继续往上抛——保留派生类的额外信息。`throw e;`——抛出一个**静态类型为 `e` 的新异常对象**。如果 `e` 是基类引用而实际异常是派生类——就被切片（slicing），派生类特有的数据丢失。**永远用 `throw;` 重新抛出**——除非你明确想换一个异常类型抛出去。",
    tags: ["throw", "重新抛出", "异常切片"],
  },
  {
    id: "clp-6",
    chapter: "cpp-large-programs",
    level: 1,
    question: "什么是 RAII？它是怎么实现异常安全的基本保证的？",
    answer:
      "RAII（Resource Acquisition Is Initialization）——资源获取即初始化。把资源分配（`new`/`fopen`/`lock`）放进构造函数，把资源释放（`delete`/`fclose`/`unlock`）放进析构函数。因为栈对象的析构函数**保证执行**（无论正常 return 还是异常 unwind），RAII 确保任何路径下资源都被清理——不泄漏。这就是「基本保证」的地基——没有 RAII 连不泄漏都做不到。",
    tags: ["RAII", "基本保证", "异常安全"],
  },
  {
    id: "clp-7",
    chapter: "cpp-large-programs",
    level: 1,
    question: "C++17 起怎么写嵌套命名空间？之前是怎么写的？",
    answer:
      "C++17 起可以一行写完：`namespace outer::middle::inner { /* ... */ }`。之前必须三层嵌套花括号：`namespace outer { namespace middle { namespace inner { /* ... */ } } }`。两者完全等价——C++17 写法只是语法糖，节省嵌套深度。",
    tags: ["嵌套命名空间", "C++17", "namespace"],
  },
  {
    id: "clp-8",
    chapter: "cpp-large-programs",
    level: 1,
    question: "`using 声明` 和 `using namespace 指令` 有什么本质区别？",
    answer:
      "`using NS::name;`（using 声明）——只导入**一个**名字到当前作用域，精确、安全——如果与已有名字冲突编译期报错。`using namespace NS;`（using 指令）——将命名空间内**所有**名字提升到最近外层作用域，范围大但可能引入隐式名字冲突。铁律：头文件全局作用域**永远不写 using namespace**——只允许在 .cpp 的局部作用域使用。",
    tags: ["using声明", "using指令", "命名空间"],
  },
  {
    id: "clp-9",
    chapter: "cpp-large-programs",
    level: 1,
    question: "什么是匿名命名空间？它和 `static` 全局变量/函数有什么关系？",
    answer:
      "匿名命名空间——`namespace { int x; }` 的语法。其中的名字具有**内部链接性**（internal linkage），只在当前 .cpp 文件里可见。不同 .cpp 文件的匿名命名空间是独立的——即使同名成员也不冲突。这是 C++ 用来替代老式 `static`（如 `static int counter = 0;`）的现代化方式——推荐在新代码中用匿名命名空间而非 `static`。",
    tags: ["匿名命名空间", "static", "内部链接"],
  },
  {
    id: "clp-10",
    chapter: "cpp-large-programs",
    level: 1,
    question: "什么是多重继承中的菱形继承问题？它为什么会产生歧义？",
    answer:
      "菱形继承——一个类同时继承两个基类，而这两个基类又都继承自同一个共同祖先。最终派生类对象中**包含共同祖先的多份拷贝**——每个继承路径各存一份。访问共同祖先的成员时产生**名字歧义**——编译器不知道你想通过哪条路径访问哪个拷贝。例如 `Panda : Bear, Endangered` 且两者都继承 `ZooAnimal`——`panda.name` 编译报错，必须写 `panda.Bear::name` 才能消除歧义。",
    tags: ["菱形继承", "MI", "歧义"],
  },
  {
    id: "clp-11",
    chapter: "cpp-large-programs",
    level: 1,
    question: "虚继承的语法是什么？怎么声明虚基类？",
    answer:
      "在继承列表中用 `virtual` 关键字修饰：`class Bear : virtual public ZooAnimal {};`。`virtual` 和访问说明符（`public`/`protected`/`private`）的位置可以互换。虚基类在最终派生类对象中**只存一份子对象**——所有虚继承路径共享同一份。实现方式：每个类内部多加一个隐藏指针（类似虚函数表的 vptr）间接定位虚基类。",
    tags: ["虚继承", "virtual", "虚基类"],
  },
  {
    id: "clp-12",
    chapter: "cpp-large-programs",
    level: 1,
    question: "虚继承中，谁负责构造虚基类？为什么中间类的构造函数调用被忽略？",
    answer:
      "**最底层派生类**负责直接构造虚基类——不是中间类。因为虚基类在所有路径中共享唯一一份子对象——只能有一个构造函数调用。如果让中间类各自构造虚基类，到底用哪一份？所以编译器规定：在构造最底层派生类对象时，**所有中间派生类的虚基类构造函数调用全部被忽略**。最底层的初始化列表是唯一生效的那一个。",
    tags: ["虚继承构造", "虚基类", "最底层派生类"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "clp-13",
    chapter: "cpp-large-programs",
    level: 2,
    question: "为什么说 `noexcept` 不仅是注释——而是契约？举一个具体例子说明编译器如何利用它做优化。",
    answer:
      "`std::vector::push_back` 在扩容时有两种路径：如果元素类型的**移动构造函数标记为 noexcept**——走移动快路径（把旧元素的资源直接搬过来，快、零异常风险）；如果移动构造没有 noexcept——走复制慢路径（拷贝一份以防移动抛异常后半路崩溃）。如果移动构造实际上不抛但你没写 noexcept——vector 不敢走快路径，性能就退了。`noexcept` 让编译器敢走最优路径——不是空口白话。",
    tags: ["noexcept", "vector", "移动优化"],
  },
  {
    id: "clp-14",
    chapter: "cpp-large-programs",
    level: 2,
    question: "copy-and-swap 惯用法为什么能实现强保证异常安全？用「先拷贝临时、成功再 swap」三步骤解释。",
    answer:
      "三步：① **先在临时对象上拷贝**——`MyVec temp(rhs)`。这一步可能抛异常（内存不足等）——但 `this` 的数据还**原封未动**。② **swap 替换**——`swap(*this, temp)` 标记为 `noexcept`（永不抛）。这一步把 `this` 的数据和临时对象的数据交换——成功，`this` 现在持有新数据，`temp` 持有旧数据。③ **临时对象析构**——`temp` 离开作用域释放旧数据。如果第①步抛异常——`temp` 根本就没构造完，`this` 数据原样保留 = 强保证（状态回到调用前）。",
    tags: ["copy-and-swap", "强保证", "RAII"],
  },
  {
    id: "clp-15",
    chapter: "cpp-large-programs",
    level: 2,
    question: "头文件里写 `using namespace std;` 为什么是糟糕的做法？给出至少两个具体后果。",
    answer:
      "① **名字污染扩散**：所有 `#include` 这个头文件的 `.cpp` 都被强制导入了整个 `std` 命名空间——即使只想用 `std::vector`，`std::sort`/`std::string` 等也全部变为可见。任何一个 `.cpp` 里定义的同名名字都可能和 std 冲突。② **牵一发而动全身**：如果未来 `std` 库新增了某个名字——你的工程里恰好也有同名名字——以前能编译的代码突然报歧义错误。更糟的是——你甚至无法`撤回`——因为改了头文件就得把全局所有被影响到的 `.cpp` 都排查一遍。",
    tags: ["using namespace", "头文件", "名字污染"],
  },
  {
    id: "clp-16",
    chapter: "cpp-large-programs",
    level: 2,
    question: "虚继承比普通继承多了什么代价？具体说至少两个方面的开销。",
    answer:
      "① **对象多一条额外指针**——每个包含虚基类的类内部都有一个隐藏指针（类似 vptr）用来间接定位虚基类子对象——对象变大（每个类 +8 字节 on 64-bit）。② **访问虚基类成员需要通过指针间接寻址**——`panda.name` 实际上先读 vptr → 找到虚基类偏移 → 再读 `name`。比普通继承的直接偏移多一次间接跳转，每次访问都稍慢。因此只在**菱形继承**里用虚继承——一般单继承绝不加 `virtual`。",
    tags: ["虚继承", "性能代价", "vptr"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 写代码） ──
  {
    id: "clp-17",
    chapter: "cpp-large-programs",
    level: 3,
    question: "下面这段 catch 块的顺序有问题——指出问题并修正顺序。\n\n```cpp\ncatch (const std::exception &e) { /* ... */ }\ncatch (const std::runtime_error &e) { /* ... */ }\ncatch (const std::invalid_argument &e) { /* ... */ }\n```",
    answer:
      "顺序问题：`exception` 是所有异常的基类——第一个 `catch` 会捕获**所有**异常（包括 `runtime_error` 和 `invalid_argument`）。后面的两个 catch 永远匹配不到——因为它们捕获的类型早就被第一个 `catch(exception)` 兜走了。修正后的顺序：`invalid_argument`（最具体）→ `runtime_error` → `exception`（最通用）——从叶子到根、从具体到通用。",
    tags: ["catch顺序", "异常匹配"],
  },
  {
    id: "clp-18",
    chapter: "cpp-large-programs",
    level: 3,
    question: "写出一个自定义异常类 `ConfigError`——继承自 `std::runtime_error`，构造函数接收配置键名和期望值，`what()` 返回格式 `ConfigError: key=VALUE`。",
    answer:
      "```cpp\nclass ConfigError : public std::runtime_error {\npublic:\n    ConfigError(const std::string &key, const std::string &expected)\n        : std::runtime_error(\n              \"ConfigError: key=\" + key\n              + \", expected=\" + expected) {}\n};\n```\n\n关键点：① 继承 `runtime_error` 而不是裸 `exception`——可以用 `std::string` 构造消息 ② 消息在初始化列表里拼好传给基类——`what()` 直接返回这条消息 ③ 不需要重写 `what()`——基类的版本已经够用。",
    tags: ["自定义异常", "runtime_error", "ConfigError"],
  },
  {
    id: "clp-19",
    chapter: "cpp-large-programs",
    level: 3,
    question: "用 C++17 嵌套命名空间语法写出三层命名空间 `company::product::core`，包含一个 `static constexpr int VERSION = 2;` 和一个返回 `const std::string&` 的 `name()` 函数。",
    answer:
      "```cpp\nnamespace company::product::core {\n    inline constexpr int VERSION = 2;\n\n    const std::string &name() {\n        static const std::string n = \"core\";\n        return n;\n    }\n}\n\n// 调用端\nstd::cout << company::product::core::VERSION;  // 2\nstd::cout << company::product::core::name();    // \"core\"\n```\n\nC++17 一行 `::` 嵌套语法避免了深层花括号。`inline constexpr` 让 `VERSION` 在不同翻译单元中共享同一地址（C++17 起 static constexpr 成员变量可内联）。",
    tags: ["嵌套命名空间", "C++17", "inline constexpr"],
  },
  {
    id: "clp-20",
    chapter: "cpp-large-programs",
    level: 3,
    question: "类层次：`A`（虚基类，有 `int x`）← `B : virtual public A` ← `C : virtual public A` ← `D : public B, public C`。写出 `D` 的构造函数初始化列表，按正确的构造顺序排列初始化器。",
    answer:
      "构造顺序：①虚基类 A → ②直接基类 B（声明顺序中先出现）→ ③直接基类 C → ④D 自己的成员。D 的构造函数初始化列表应该写：\n\n```cpp\nD::D(int val)\n    : A(val)       // ← D 直接构造虚基类 A（中间类的 A() 调用全被跳过）\n    , B(val)       // B 中的 A(val) 调用被忽略\n    , C(val)       // C 中的 A(val) 调用也被忽略\n{}\n```\n\n关键规则：最底层派生类 D 负责虚基类 A 的构造。B 和 C 的初始化器中虽写了 A(val)——但构造 D 对象时这两行全被跳过。初始化列表中的**书写顺序应匹配实际构造顺序**（虚基类 → 直接基类（按声明顺序）→ 自身）。",
    tags: ["虚继承构造", "构造顺序", "菱形继承"],
  },

  // ── L4 综合（多概念串联 / 常见坑 / 边界） ──
  {
    id: "clp-21",
    chapter: "cpp-large-programs",
    level: 4,
    question: "在构造函数中使用函数 try 块：`MyClass(int n) try : ptr_(new int[n]) {} catch (const std::bad_alloc &e) { log(e); }`——这段代码有什么致命问题？怎么修？",
    answer:
      "致命问题：构造函数 try 块的 catch **必须重新抛出异常或抛一个新异常**——因为构造失败的对象是不完整的，不允许 try 块正常结束。当前代码 catch 只 `log` 后让控制流自然离开——等于抑制了 `bad_alloc`，让调用方以为构造成功了——使用一个未初始化的对象是 UB。修正：在 catch 块的末尾加上 `throw;`（重新抛出原始异常）。构造失败 → 调用方收到异常 → 知道这个对象没构造成功。",
    tags: ["构造函数", "函数try块", "重新抛出"],
  },
  {
    id: "clp-22",
    chapter: "cpp-large-programs",
    level: 4,
    question: "在头文件里写了 `using std::string;`——评估这对于包含这个头文件的 .cpp 文件有什么影响？和 `using namespace std;` 相比谁更安全？",
    answer:
      "`using std::string;` 只把 `string` **一个名字**导入到包含这个头文件的作用域——其他 `std::` 里的名字仍然需要 `std::` 前缀。如果有人定义了自己的 `string` 类名——编译期直接报重复定义错（冲突立即暴露）。和 `using namespace std;` 相比——后者无声无息拖几百个名字进来、可能和 10 个不同名字静默冲突且难以定位。using 声明虽然不该在头文件用——但至少冲突是**显式的、编译期就能发现的**——比整包导入的隐式污染强太多了。",
    tags: ["using声明", "using指令", "头文件安全"],
  },
  {
    id: "clp-23",
    chapter: "cpp-large-programs",
    level: 4,
    question: "虚继承链中，Bear 和 Endangered 都虚继承 ZooAnimal。如果你用 Bear 单独构造对象（不是 Panda），Bear 的构造函数里写的 ZooAnimal 初始化调用会生效吗？为什么？",
    answer:
      "**会生效。** Bear 单独构造对象时——Bear 就是最底层派生类。虚基类的构造规则是：**当前构造的「最底层派生类」负责虚基类的初始化**。当 `Bear obj;` 时——Bear 是最底层类 → Bear 初始化列表中的 `ZooAnimal(...)` 调用生效。只有 Bear 作为 Panda 的基类被构造时——Bear 的初始化列表中 `ZooAnimal(...)` 才被绕过、由 Panda 直接接管虚基类构造。同一个 Bear 类——在继承链中某一层时可能是中间类（此时虚基类初始化被忽略），单独用时又变成最底层类（此时虚基类初始化生效）。",
    tags: ["虚继承构造", "最底层派生类", "上下文依赖"],
  },
  {
    id: "clp-24",
    chapter: "cpp-large-programs",
    level: 4,
    question: "把本章三大工具串起来：假设你写一个大型程序——多个团队维护不同的模块，每个模块有自己的错误类型。从**命名空间设计**、**异常类层次**和**继承复用**三个角度画出架构骨架。",
    answer:
      "架构骨架：\n\n① **命名空间分层**：`namespace myapp::moduleA { }` / `namespace myapp::moduleB { }`——各模块代码隔离，同名类型不冲突。公用的异常基类放在 `myapp::common`。\n\n② **异常类层次**——单根体系：`myapp::common::AppError : std::runtime_error` → 各模块特化：`moduleA::ParseError : AppError`、`moduleB::NetworkError : AppError`。catch 点按粒度匹配——先捕获 `ParseError` 再 `AppError` 最后 `std::exception`。\n\n③ **继承复用（虚继承）**：某些模块的实体需要多维度建模——如 `LoggedEntity`（时间戳+日志级别）作为虚基类，`DataPacket`（数据载荷）作为另一虚基类，`ModuleEntry` 通过虚继承组合两者——避免相同维度重复存储。\n\n三个工具协作：命名空间管「名字不打架」→异常体系管「错误不扩散」→虚继承管「基类不重复」。",
    tags: ["综合", "架构", "命名空间", "异常", "虚继承"],
  },
];
