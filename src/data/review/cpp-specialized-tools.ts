/** 复习题库 · C++ 特殊工具与技术（cpp-specialized-tools）。C++ Primer §19 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppSpecializedToolsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "cst-1",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "什么是 placement new？它和普通 new 有什么区别？",
    answer:
      "placement new 是 `new` 的一种特殊形式，允许在**已分配的内存地址上构造对象**——`new (ptr) Type(args)`。与普通 new 的核心区别：普通 new 先分配内存再构造对象（两步合一），placement new **不分配内存**——只调用构造函数在指定地址上构造对象。适用场景：① 自定义内存池——预分配大块内存，用 placement new 逐个构造对象；② 避免反复 `new/delete`——内存只申请一次、对象反复构造/析构。placement new 构造的对象**必须显式调用析构函数**——`ptr->~Type()`——因为 `delete ptr` 会释放内存（这块内存不该由 delete 释放）。",
    tags: ["placement new", "operator new", "内存池", "构造"],
  },
  {
    id: "cst-2",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "RTTI 是什么？它由哪三个核心组件构成？",
    answer:
      "RTTI（Run-Time Type Identification，运行时类型识别）是 C++ 的机制——允许在程序运行时获取对象的实际类型信息。在编译期类型不清楚（如通过基类指针/引用操作派生类对象）时使用。三个核心组件：① `typeid(e)` 运算符——返回表达式的 `type_info` 对象，描述其类型；② `dynamic_cast<T>(e)`——安全的向下转型——尝试把基类指针/引用转为派生类类型，失败时指针返回 `nullptr`、引用抛 `std::bad_cast`；③ `type_info` 类——存类型标识信息，提供 `name()`、`before()`（排序）、`==` / `!=`（比较）。RTTI 只在类至少含一个虚函数时生效——因为需要 vtable 中的类型信息。",
    tags: ["RTTI", "typeid", "dynamic_cast", "type_info"],
  },
  {
    id: "cst-3",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "`enum class` 和传统 `enum` 有什么区别？各自的优缺点？",
    answer:
      "C++11 引入的 `enum class`（限定作用域枚举）与 C 风格 `enum`（不限作用域）的四个核心区别：① **作用域**——`enum class Color { Red, Green }` 的成员必须写成 `Color::Red`；传统 `enum` 的成员直接暴露在包围作用域——`Red` 不需前缀，容易命名冲突。② **隐式转换**——`enum class` 的枚举值**不能隐式转换**为整数（需要 `static_cast<int>(Color::Red)`）——更类型安全；传统 `enum` 的枚举值可以隐式转为 int——容易写出错误的整数运算。③ **底层类型**——`enum class` 默认底层类型是 `int` 且可通过 `: type` 显式指定（如 `enum class Permission : uint8_t`）；传统 `enum` 的底层类型由编译器决定（通常是能容纳所有枚举值的整型）——不可移植。④ **前置声明**——`enum class` 支持前置声明（只要指明了底层类型）；传统 `enum` 不支持前置声明。C++ 新代码一律用 `enum class`——更安全、更清晰。",
    tags: ["enum class", "enum", "作用域", "类型安全", "隐式转换"],
  },
  {
    id: "cst-4",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "`union` 是什么？它和 `struct`/`class` 有什么区别？C++11 中 `union` 有什么改进？",
    answer:
      "`union`（联合）是一种特殊类——所有数据成员共享同一块内存（起始地址相同）。任何时候 union 中只有一个成员是有值的——写入一个成员会覆盖其他成员。`sizeof(union)` = 最大成员的大小（可能加上对齐填充）。和 `struct`/`class` 的区别：struct 各成员有独立存储空间（sizeof = 各成员之和 + 填充），union 所有成员重叠存储。C++11 的改进：① union 可以有**非平凡特殊成员函数的非静态数据成员**（如 `string` 作为成员）——但需要你手动管理构造/析构；② union 不自动调用成员的构造/析构函数——你需要显式用 placement new 构造、显式调用析构。经典用途：存储多种类型的值但同一时刻只用一个——常用于解释内存的不同视图（如把一个 `float` 强行按 `int` 的二进制解释）。",
    tags: ["union", "联合", "内存共享", "C++11"],
  },
  {
    id: "cst-5",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "什么是成员指针？`指向数据成员的指针` 和 `指向成员函数的指针` 的声明语法？",
    answer:
      "成员指针（pointer to member）是指向类的某个成员的指针——但不是指向特定对象的那个成员，而是指明「这个类中的某个成员」的偏移量。只有指定了具体对象后，才能通过它访问那个对象中的该成员。声明语法——用 `ClassName::*` 表明这是成员指针：① 数据成员指针——`int ClassName::*p = &ClassName::member;`，通过 `obj.*p` 或 `ptr->*p` 访问；② 成员函数指针——`void (ClassName::*pf)(int) const = &ClassName::func;`，通过 `(obj.*pf)(arg)` 调用。成员函数指针的语法非常啰嗦——C++17 的 `std::invoke` 简化了调用：`std::invoke(pf, obj, arg)`。实用场景——回调表：用 map 存函数名到成员函数指针的映射。",
    tags: ["成员指针", "pointer to member", ".*", "->*"],
  },
  {
    id: "cst-6",
    chapter: "cpp-specialized-tools",
    level: 1,
    question: "什么是嵌套类？它在 C++ 中怎么声明和访问？",
    answer:
      "嵌套类（nested class）是定义在另一个类内部的类。外层的叫封闭类（enclosing class），内层的叫嵌套类。声明——像普通成员一样在封闭类内部定义：`class Outer { class Inner { ... }; }`。本质——嵌套类是独立的类，不持有封闭类对象的任何特殊访问权限；嵌在外面只是名字隐藏——成员名被限制在封闭类的作用域内，避免全局命名冲突。访问方式——`Outer::Inner obj;`（前提 Inner 是 public）。反过来——嵌套类**不会**自动获得封闭类私有成员的访问权（与 Java 的内部类不同！）。封闭类可以通过嵌套类定义其辅助类型、迭代器等。C++11 起嵌套类的成员函数可以为 inline。",
    tags: ["嵌套类", "nested class", "封闭类", "enclosing class"],
  },

  // ── L2 理解 ──
  {
    id: "cst-7",
    chapter: "cpp-specialized-tools",
    level: 2,
    question: "placement new 创建的对象的生命周期如何管理？为什么不能用 `delete` 释放？",
    answer:
      "placement new 只调用构造函数并不分配内存。生命周期管理分三步：① 内存预分配——用 `operator new`（或 char 数组、已存在的内存块）分配原始内存（不构造对象）；② placement new 构造——在已分配内存的地址上调构造函数 `new (addr) Type(args)`——对象生命周期从此开始；③ 手动析构——当对象不再需要时，**必须显式调用析构函数** `obj->~Type()`，但**绝不调用 `delete`**。不能 `delete` 的原因：`delete` 做两件事——先调析构函数、再释放内存（`operator delete`）。而 placement new 使用的内存不是 `operator new` 单独为该对象分配的（可能是内存池中的一块、栈上的数组、或某个已存在的 buffer）——`operator delete` 会把它当成独立分配的内存还回去 → 破坏整体布局或直接 crash。正确做法：析构函数只结束对象生命周期——内存的管理由内存池/分配器负责。",
    tags: ["placement new", "析构", "生命周期", "operator new"],
  },
  {
    id: "cst-8",
    chapter: "cpp-specialized-tools",
    level: 2,
    question: "`typeid` 和 `dynamic_cast` 分别在什么场景下使用？它们有什么不同？",
    answer:
      "typeid(e) 获取表达式精确类型信息（返回 type_info&），判断基类指针指向什么派生类。dynamic_cast<T*>(bp) 尝试直接转换并给结果，可安全调用派生类方法。核心区别：typeid=查询身份，dynamic_cast=查询+转换一步到位。dynamic_cast 在复杂继承体系中比 typeid 慢。",
    tags: ["typeid", "dynamic_cast", "RTTI", "类型转换"],
  },
  {
    id: "cst-9",
    chapter: "cpp-specialized-tools",
    level: 2,
    question: "`enum class` 底层类型的默认值和指定规则？为什么允许 `enum class Perm : uint8_t` 这样的前置声明？",
    answer:
      "`enum class` 默认底层类型是 `int`——编译器在看不到枚举值列表时，默认把底层类型当作 `int`。C++11 允许 `enum class` 显式指定底层类型——`enum class Permission : uint8_t { Read = 1, Write = 2, Exec = 4 }`——你知道枚举值一定不超过 255，用 uint8_t 节省内存。前置声明的规则：`enum class Name : type;`（声明时不带成员列表）——必须明确写底层类型，这样编译器知道这个枚举占多大空间（`sizeof(Name)` = `sizeof(type)`）——可以分配内存、放入数组、作为函数参数——而不需看到所有枚举值。传统 `enum` 不能前置声明——因为底层类型由编译器根据枚举值的范围自动决定（可能根据值的大小选 `int`/`short`/`char`），不看到成员列表就无法确定大小。",
    tags: ["enum class", "底层类型", "前置声明", "uint8_t"],
  },
  {
    id: "cst-10",
    chapter: "cpp-specialized-tools",
    level: 2,
    question: "什么时候应该用 `union` 而不是 `std::variant`？union 的 C++11 改进具体解决了什么问题？",
    answer:
      "C++17 引入 `std::variant`（类型安全联合）之后——新代码应优先考虑 `variant`（它追踪当前活跃成员、自动管理生命周期、提供 `std::visit` 模式匹配）。但仍有场景用裸 `union`：① **性能极敏感的底层代码**——variant 有额外的 tag（当前活跃成员索引）和异常安全保证，比裸 union 多几个字节和运行时开销；② **C ABI 兼容性**——variant 是 C++ 类型，不能跨语言边界传递；③ **解释性视图**——用 union 把一个值按另一种类型解释（如把 `float` 的二进制位按 `uint32_t` 解读——虽然技术上仍是 UB（联合读取非活跃成员），但在特定编译器和平台上有约定俗成的行为）；④ **已存在的 C 代码库**——C 代码中 union 是标准做法。C++11 改进——允许 union 包含带有非平凡构造/析构函数的成员（如 `std::string`）——这解决了老标准中 union 只能用 trivial 类型的重大限制。但你要自己管理生命周期——用 placement new 构造、显式调析构、用 tag 追踪当前活跃成员。",
    tags: ["union", "variant", "类型安全", "C++11", "ABI"],
  },

  // ── L3 应用 ──
  {
    id: "cst-11",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "补全代码——实现一个简单的固定大小内存池 `FixedPool<T,N>`：用 `operator new` 预分配 `N * sizeof(T)` 的原始内存，用 placement new 在 `allocate()` 中构造对象并返回 `T*`，在 `deallocate(T*)` 中调用析构函数但不释放内存。",
    answer:
      "```cpp\n#include <new>\n#include <cstddef>\n\ntemplate<typename T, std::size_t N>\nclass FixedPool {\npublic:\n    FixedPool() : raw_(::operator new(N * sizeof(T))), next_(0) {}\n    ~FixedPool() {\n        // 注意：实际产品需追踪已分配对象，逐一析构\n        ::operator delete(raw_);\n    }\n\n    T* allocate() {\n        if (next_ >= N) return nullptr;  // 池已满\n        void* addr = static_cast<char*>(raw_) + next_ * sizeof(T);\n        ++next_;\n        return new (addr) T();           // placement new——只构造，不分配\n    }\n\n    void deallocate(T* p) {\n        p->~T();  // 显式调用析构——不释放内存（内存仍属 raw_ 池）\n    }\n\n    FixedPool(const FixedPool&) = delete;\n    FixedPool& operator=(const FixedPool&) = delete;\n\nprivate:\n    void* raw_;\n    std::size_t next_;\n};\n\n// 使用:\nFixedPool<std::string, 100> pool;\nauto* s = pool.allocate();  // placement new 构造一个 string（初始为空）\n*s = \"hello\";\npool.deallocate(s);         // 析构 string——释放它管理的堆内存，raw_ 仍完好\n```\n关键要点：① `operator new(N*sizeof(T))` 只分配原始字节（无构造），返回 `void*`；② `new (addr) T()` 在已有地址上构造对象——不分配新内存；③ `p->~T()` 只析构不释放——这块地址仍属内存池（后续可重新构造新对象）；④ 不要把 `delete` 和 `pTilde` 搞混。",
    tags: ["内存池", "placement new", "operator new", "析构"],
  },
  {
    id: "cst-12",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "写一个 `print_type` 函数——接受一个基类（至少有一个虚函数）的引用，用 RTTI 识别它的实际类型并打印类型名。分别用 `typeid` 和 `dynamic_cast` 两种方法实现。",
    answer:
      "```cpp\n#include <iostream>\n#include <typeinfo>\n\nclass Base {\npublic:\n    virtual ~Base() = default;\n    virtual std::string name() const { return \"Base\"; }\n};\n\nclass DerivedA : public Base {\npublic:\n    std::string name() const override { return \"DerivedA\"; }\n};\nclass DerivedB : public Base {\npublic:\n    std::string name() const override { return \"DerivedB\"; }\n    void extra() {}  // 只有 DerivedB 有此方法\n};\n\n// 方法一：typeid——只查类型，不转换\nvoid print_type_v1(const Base &obj) {\n    if (typeid(obj) == typeid(DerivedA))\n        std::cout << \"DerivedA\";\n    else if (typeid(obj) == typeid(DerivedB))\n        std::cout << \"DerivedB\";\n    else\n        std::cout << \"Base\";\n    std::cout << '\\n';\n}\n\n// 方法二：dynamic_cast——查+转一步到位\nvoid print_type_v2(const Base &obj) {\n    if (dynamic_cast<const DerivedA*>(&obj))\n        std::cout << \"DerivedA\";\n    else if (dynamic_cast<const DerivedB*>(&obj))\n        std::cout << \"DerivedB\";\n    else\n        std::cout << \"Base\";\n    std::cout << '\\n';\n}\n```\n两种方式都要求类有虚函数。`typeid` 更直白（比较类型对象），`dynamic_cast` 在查类型同时还能直接用转换后的指针调用派生类特有的方法——`auto *db = dynamic_cast<const DerivedB*>(&obj); if (db) db->extra();`。",
    tags: ["typeid", "dynamic_cast", "RTTI", "虚函数"],
  },
  {
    id: "cst-13",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "用 `enum class` 定义一个 `HttpStatus` 枚举（OK=200, NotFound=404, ServerError=500），写一个函数 `to_message(status)` 返回对应的消息文本。再用 `dynamic_cast` 和 RTTI 实现一个 `is_server_error(status)` 函数。",
    answer:
      "```cpp\n#include <string>\n#include <cstdint>\n\nenum class HttpStatus : uint16_t {\n    OK = 200,\n    BadRequest = 400,\n    NotFound = 404,\n    ServerError = 500,\n    ServiceUnavailable = 503,\n};\n\nstd::string to_message(HttpStatus s) {\n    switch (s) {\n        case HttpStatus::OK:                return \"OK\";\n        case HttpStatus::BadRequest:        return \"Bad Request\";\n        case HttpStatus::NotFound:          return \"Not Found\";\n        case HttpStatus::ServerError:       return \"Internal Server Error\";\n        case HttpStatus::ServiceUnavailable:return \"Service Unavailable\";\n        default:                            return \"Unknown\";\n    }\n}\n\n// enum class 没有 RTTI——动态类型信息不适用于枚举\n// static_cast 即可获取底层整数值\nbool is_server_error(HttpStatus s) {\n    auto code = static_cast<uint16_t>(s);\n    return code >= 500 && code < 600;\n    // 或直接用成员值范围比较\n}\n```\n注意——enum class 是编译期类型，不存在 RTTI。`dynamic_cast` 只能用于有多态（虚函数）的类类型。把枚举值转整数只需 `static_cast`。`uint16_t` 做底层类型减少了枚举存储开销。",
    tags: ["enum class", "switch", "static_cast", "底层类型"],
  },
  {
    id: "cst-14",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "写一个 `TaggedUnion`——用 `union` + `enum class` 标签实现：存储三种类型——`int`（标签 = Int）、`double`（标签 = Double）、`std::string`（标签 = String）。提供构造函数、拷贝/析构、`get<T>()` 访问器。说明你如何处理 `string` 成员的生命周期。",
    answer:
      "```cpp\n#include <string>\n#include <new>  // placement new\n\nclass TaggedUnion {\npublic:\n    enum class Type { Int, Double, String };\n\n    TaggedUnion(int v)   : tag_(Type::Int)    { new (&data_.i) int(v); }\n    TaggedUnion(double v): tag_(Type::Double)  { new (&data_.d) double(v); }\n    TaggedUnion(const std::string &v): tag_(Type::String) {\n        new (&data_.s) std::string(v);  // placement new 构造 string\n    }\n\n    ~TaggedUnion() { destroy(); }\n\n    TaggedUnion(const TaggedUnion &other) : tag_(other.tag_) {\n        switch (tag_) {\n            case Type::Int:    new (&data_.i) int(other.data_.i); break;\n            case Type::Double: new (&data_.d) double(other.data_.d); break;\n            case Type::String: new (&data_.s) std::string(other.data_.s); break;\n        }\n    }\n\n    template<typename T> T& get();   // 从标签推断 T 与当前活跃成员是否匹配\n    template<typename T> const T& get() const;\n\n    Type tag() const { return tag_; }\n\nprivate:\n    union Data {\n        int i;\n        double d;\n        std::string s;\n        Data() {}   // union 的构造函数——不初始化任何成员\n        ~Data() {}  // union 的析构函数——不析构任何成员\n    } data_;\n\n    Type tag_;\n\n    void destroy() {\n        switch (tag_) {\n            case Type::Int: break;                          // trivial——无需析构\n            case Type::Double: break;                       // trivial——无需析构\n            case Type::String: data_.s.std::string::~string(); break;  // 显式析构 string\n        }\n    }\n};\n```\n关键设计：① union 中 string 是**非平凡类型**——C++11 允许此语法但你必须关心它的生命周期；② 每次赋值前 `destroy()` 先析构旧成员（如旧值是 string，它的堆内存需释放）；③ placement new 在新成员的位置构造——保证不破坏其他 union 成员（但 union 中只有活跃成员有效）；④ tag_ 追踪当前活跃成员——析构时知道该调谁的析构函数。如果你不想手动管理——直接用 `std::variant`。",
    tags: ["union", "tagged union", "placement new", "variant"],
  },
  {
    id: "cst-15",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "定义一个 `SelectMenu` 类——用成员函数指针实现回调。它有一个 `add_option(name, callback)` 方法和 `select(name)` 方法——根据选项名调用对应的成员函数。用 `map<string, void(SelectMenu::*)()>` 存储选项到成员函数指针的映射。",
    answer:
      "```cpp\n#include <map>\n#include <string>\n#include <iostream>\n\nclass SelectMenu {\npublic:\n    using MenuAction = void (SelectMenu::*)();\n\n    void add_option(const std::string &name, MenuAction action) {\n        options_[name] = action;\n    }\n\n    void select(const std::string &name) {\n        auto it = options_.find(name);\n        if (it != options_.end()) {\n            (this->*(it->second))();  // 通过成员指针调用当前对象的成员函数\n        } else {\n            std::cout << \"Option not found: \" << name << '\\n';\n        }\n    }\n\n    void action_save()   { std::cout << \"Saving...\\n\"; }\n    void action_load()   { std::cout << \"Loading...\\n\"; }\n    void action_delete() { std::cout << \"Deleting...\\n\"; }\n\nprivate:\n    std::map<std::string, MenuAction> options_;\n};\n\n// 使用:\nSelectMenu menu;\nmenu.add_option(\"save\",   &SelectMenu::action_save);\nmenu.add_option(\"load\",   &SelectMenu::action_load);\nmenu.add_option(\"delete\", &SelectMenu::action_delete);\n\nmenu.select(\"save\");   // 输出 Saving...\nmenu.select(\"exit\");   // 输出 Option not found: exit\n```\n`this->*ptr` 语法很啰嗦——C++17 `std::invoke(ptr, this)` 可替代：`std::invoke(it->second, this);`。成员函数指针不是普通函数指针——它记录了成员在类内的偏移量，需要一个对象实例（`this`）才能在运行时计算调用地址。",
    tags: ["成员函数指针", "map", "回调", "std::invoke"],
  },
  {
    id: "cst-16",
    chapter: "cpp-specialized-tools",
    level: 3,
    question:
      "实现一个 `TreeNode<T>` 类模板——用**嵌套类** `Node<T>` 表示树的内部节点。`TreeNode<T>` 是公开接口，隐藏 `Node<T>` 的实现细节。提供 `insert`、`find`、`traverse` 三个方法。",
    answer:
      "```cpp\n#include <memory>\n#include <vector>\n#include <functional>\n\ntemplate<typename T>\nclass TreeNode {\npublic:\n    void insert(const T &value) {\n        root_ = insert_impl(std::move(root_), value);\n    }\n\n    bool find(const T &value) const {\n        return find_impl(root_.get(), value);\n    }\n\n    void traverse(const std::function<void(const T&)> &fn) const {\n        traverse_impl(root_.get(), fn);\n    }\n\nprivate:\n    struct Node {  // 嵌套类——外部不可见\n        T data;\n        std::unique_ptr<Node> left;\n        std::unique_ptr<Node> right;\n        Node(const T &v) : data(v) {}\n    };\n\n    std::unique_ptr<Node> root_;\n\n    std::unique_ptr<Node> insert_impl(std::unique_ptr<Node> node, const T &v) {\n        if (!node) return std::make_unique<Node>(v);\n        if (v < node->data) node->left  = insert_impl(std::move(node->left), v);\n        else                node->right = insert_impl(std::move(node->right), v);\n        return node;\n    }\n\n    static bool find_impl(const Node* node, const T &v) {\n        if (!node) return false;\n        if (v == node->data) return true;\n        return v < node->data ? find_impl(node->left.get(), v)\n                              : find_impl(node->right.get(), v);\n    }\n\n    static void traverse_impl(const Node* node, const std::function<void(const T&)> &fn) {\n        if (!node) return;\n        traverse_impl(node->left.get(), fn);\n        fn(node->data);\n        traverse_impl(node->right.get(), fn);\n    }\n};\n\n// 外部只能写 TreeNode<int> tree;——完全不知道 Node 的存在\nTreeNode<int> tree;\ntree.insert(5);\ntree.insert(3);\ntree.traverse([](const int &v) { std::cout << v << ' '; });  // 3 5\n```\n设计要点：① `Node` 在 `private` 部分——封装就是通过嵌套类实现；② `TreeNode` 是开放给用户的门面——用户只关心插入、查找、遍历，不关心树的内部节点表示；③ 嵌套类不隐式获得封闭类私有成员的访问权——这也是 C++ 不同于 Java 的地方；④ `Node` 的细节（left/right 指针结构）可以修改而不影响用户代码。",
    tags: ["嵌套类", "树", "封装", "unique_ptr", "traverse"],
  },

  // ── L4 综合 ──
  {
    id: "cst-17",
    chapter: "cpp-specialized-tools",
    level: 4,
    question:
      "设计一个 `ArenaAllocator` 类——用 placement new 和 RTTI 实现：预分配一大块内存，`create<T>(args...)` 在 arena 中构造对象（placement new + 完美转发），`reset()` 销毁 arena 中所有对象（对每个对象调析构——需要追踪类型来调正确的析构函数）。回答：为什么需要用 RTTI 来追踪类型？如何设计析构顺序？",
    answer:
      "```cpp\n#include <new>\n#include <typeinfo>\n#include <vector>\n#include <tuple>\n\nclass ArenaAllocator {\npublic:\n    explicit ArenaAllocator(std::size_t size)\n        : buffer_(::operator new(size)), capacity_(size), offset_(0) {}\n\n    ~ArenaAllocator() { reset(); ::operator delete(buffer_); }\n\n    template<typename T, typename... Args>\n    T* create(Args&&... args) {\n        std::size_t align = alignof(T);\n        std::size_t padded_offset = (offset_ + align - 1) & ~(align - 1);\n        if (padded_offset + sizeof(T) > capacity_) return nullptr;\n        void* addr = static_cast<char*>(buffer_) + padded_offset;\n        T* obj = new (addr) T(std::forward<Args>(args)...);\n        // 记录对象地址和析构器\n        records_.emplace_back(addr, [](void* p) {\n            static_cast<T*>(p)->~T();\n        });\n        offset_ = padded_offset + sizeof(T);\n        return obj;\n    }\n\n    void reset() {\n        // 逆序析构（后创建的先析构——依赖关系更安全）\n        for (auto it = records_.rbegin(); it != records_.rend(); ++it) {\n            it->second(it->first);\n        }\n        records_.clear();\n        offset_ = 0;\n    }\n\n    ArenaAllocator(const ArenaAllocator&) = delete;\n    ArenaAllocator& operator=(const ArenaAllocator&) = delete;\n\nprivate:\n    void* buffer_;\n    std::size_t capacity_;\n    std::size_t offset_;\n    // (对象地址, 类型擦除的析构函数)\n    std::vector<std::pair<void*, std::function<void(void*)>>> records_;\n};\n\n// 使用:\nArenaAllocator arena(4096);\nauto* s = arena.create<std::string>(\"hello\");\nauto* v = arena.create<std::vector<int>>();\narena.reset();  // 逆序析构 v 再析构 s\n```\n为什么需要追踪类型——placement new 构造的对象必须显式调析构函数。`operator delete` 不知道对象类型（看到的是原始 `void*` 字节），无法调用正确的析构函数（如 `string` 的析构需要释放其堆内存，`int` 的析构什么都不做）。本方案不用 RTTI（`typeid`）而用 **类型擦除**（lambda 捕获了模板类型 T）——`create<T>` 时就记录了析构函数 = `static_cast<T*>(p)->~T()`——比 RTTI 更轻量且不要求虚函数。析构顺序必须是**逆序**——后创建的可能依赖先创建的对象，先毁掉依赖方再毁被依赖的。",
    tags: ["placement new", "类型擦除", "Arena", "析构顺序", "RTTI"],
  },
  {
    id: "cst-18",
    chapter: "cpp-specialized-tools",
    level: 4,
    question:
      "综合实战——写一个 `Variant` 类（类似简化版 `std::variant`）：用 `union` + `enum class` + placement new 实现。支持 `int`、`double`、`std::string` 三种类型。要求：正确管理生命周期（拷贝/移动/赋值/析构）、提供 `get<T>()` 和 `visit(visitor)`。",
    answer:
      "```cpp\n#include <string>\n#include <stdexcept>\n\nclass Variant {\npublic:\n    enum class Type { None, Int, Double, String };\n\n    Variant(): tag_(Type::None) {}\n    explicit Variant(int v): tag_(Type::Int)       { new (&data_.i) int(v); }\n    explicit Variant(double v): tag_(Type::Double)  { new (&data_.d) double(v); }\n    explicit Variant(const std::string &v): tag_(Type::String) {\n        new (&data_.s) std::string(v);\n    }\n\n    ~Variant() { destroy(); }\n\n    Variant(const Variant &other): tag_(other.tag_) {\n        copy_from(other);\n    }\n\n    Variant& operator=(const Variant &other) {\n        if (this != &other) {\n            destroy();\n            tag_ = other.tag_;\n            copy_from(other);\n        }\n        return *this;\n    }\n\n    template<typename T> T& get() {\n        check_type<T>();\n        if constexpr (std::is_same_v<T, int>) return data_.i;\n        else if constexpr (std::is_same_v<T, double>) return data_.d;\n        else if constexpr (std::is_same_v<T, std::string>) return data_.s;\n    }\n\n    template<typename Visitor>\n    auto visit(Visitor &&visitor) {\n        switch (tag_) {\n            case Type::Int:    return visitor(data_.i);\n            case Type::Double: return visitor(data_.d);\n            case Type::String: return visitor(data_.s);\n            default: throw std::runtime_error(\"empty variant\");\n        }\n    }\n\n    Type tag() const { return tag_; }\n\nprivate:\n    union Data {\n        int i;\n        double d;\n        std::string s;\n        Data() {}\n        ~Data() {}\n    } data_;\n\n    Type tag_;\n\n    void destroy() {\n        switch (tag_) {\n            case Type::None: break;\n            case Type::Int: break;\n            case Type::Double: break;\n            case Type::String: data_.s.std::string::~string(); break;\n        }\n        tag_ = Type::None;\n    }\n\n    void copy_from(const Variant &other) {\n        switch (other.tag_) {\n            case Type::None: break;\n            case Type::Int:    new (&data_.i) int(other.data_.i); break;\n            case Type::Double: new (&data_.d) double(other.data_.d); break;\n            case Type::String: new (&data_.s) std::string(other.data_.s); break;\n        }\n    }\n\n    template<typename T> void check_type() const {\n        if constexpr (std::is_same_v<T, int>)\n            { if (tag_ != Type::Int) throw std::bad_variant_access{}; }\n        else if constexpr (std::is_same_v<T, double>)\n            { if (tag_ != Type::Double) throw std::bad_variant_access{}; }\n        else if constexpr (std::is_same_v<T, std::string>)\n            { if (tag_ != Type::String) throw std::bad_variant_access{}; }\n    }\n};\n```\n设计要点：① union + tag 是裸版 variant 的经典实现——C++17 引入 `std::variant` 之前的标准做法；② `destroy()` 只析构非 trivial 成员（`string`）；③ `copy_from` 用 placement new 拷贝构造正确的成员类型；④ `visit` 模仿 `std::visit`——传入泛型 lambda 或函数对象去处理每种类型的值；⑤ `check_type` 保证类型安全——访问错误的类型抛异常而非未定义行为。",
    tags: ["union", "variant", "placement new", "visit", "tagged union"],
  },
  {
    id: "cst-19",
    chapter: "cpp-specialized-tools",
    level: 4,
    question:
      "判断对错并解释：「`enum class` 的底层类型默认是 `int`，因此所有 `enum class` 的前置声明都不需要指定底层类型」。",
    answer:
      "**对**——这是 C++ 标准（C++11 起）的规定。`enum class`（和 C++11 的限定作用域枚举）的默认底层类型强制为 `int`——这和传统 `enum` 不同（传统 enum 底层类型由编译器根据枚举值大小自动选择）。因此前置声明 `enum class Color;` 等价于 `enum class Color : int;`——编译器在没看到枚举值列表时也知道 `sizeof(Color) == sizeof(int)`。这条规则适用于 `enum class` 和 `enum struct`（同义）。但**习惯上**如果底层类型不是 `int`（如 `enum class Perm : uint8_t`），前置声明必须显式指定——`enum class Perm : uint8_t;`。所以严格来说题目表述需要在「不显式指定底层类型的 enum class」这个前提下才对——但按规范，`enum class` 不加 `: type` 默认就是 `int`，前置声明不必要写 `: int`。",
    tags: ["enum class", "前置声明", "底层类型", "int"],
  },
  {
    id: "cst-20",
    chapter: "cpp-specialized-tools",
    level: 4,
    question:
      "综合——设计一个 `Dispatcher` 类：用 RTTI（`dynamic_cast`）+ 成员函数指针 + 嵌套类实现事件分发。`Dispatcher` 内部有一个 `struct HandlerBase`（嵌套基类），派生出一个模板类 `Handler<T>` 用于存储不同类型事件的回调。`dispatch(event)`：对每个已注册的 handler，用 `dynamic_cast` 检其实际类型，匹配则调用对应回调。",
    answer:
      "```cpp\n#include <vector>\n#include <memory>\n#include <functional>\n#include <iostream>\n\nclass Dispatcher {\npublic:\n    template<typename EventType>\n    void register_handler(std::function<void(const EventType&)> fn) {\n        handlers_.push_back(\n            std::make_unique<Handler<EventType>>(std::move(fn)));\n    }\n\n    template<typename EventType>\n    void dispatch(const EventType &event) {\n        for (auto &h : handlers_) {\n            auto *typed = dynamic_cast<Handler<EventType>*>(h.get());\n            if (typed) typed->callback(event);\n        }\n    }\n\nprivate:\n    struct HandlerBase {\n        virtual ~HandlerBase() = default;  // 虚析构——RTTI 必要\n    };\n\n    template<typename EventType>\n    struct Handler : HandlerBase {  // 嵌套类模板——外层是封闭类\n        std::function<void(const EventType&)> callback;\n        explicit Handler(std::function<void(const EventType&)> fn)\n            : callback(std::move(fn)) {}\n    };\n\n    std::vector<std::unique_ptr<HandlerBase>> handlers_;\n};\n\n// 使用:\nstruct MouseEvent { int x, y; };\nstruct KeyEvent   { char key; };\n\nDispatcher d;\nd.register_handler<MouseEvent>([](const MouseEvent &e) {\n    std::cout << \"Mouse at \" << e.x << ',' << e.y << '\\n';\n});\nd.register_handler<KeyEvent>([](const KeyEvent &e) {\n    std::cout << \"Key: \" << e.key << '\\n';\n});\n\nd.dispatch(MouseEvent{10, 20});  // Mouse at 10,20\nd.dispatch(KeyEvent{'A'});       // Key: A\n```\n三合一设计：① **RTTI**——`dynamic_cast` 在运行时从 `HandlerBase*` 安全降级到 `Handler<EventType>*`−−匹配成功才调用；② **嵌套类**——`HandlerBase` / `Handler<T>` 都定义在 `Dispatcher` 内部，外部不可见；③ **成员函数虚拟多态**——`HandlerBase` 的虚析构让 RTTI 和 `dynamic_cast` 能正常运作。如果没有虚函数，`dynamic_cast` 不能作用于类——编译报错。",
    tags: ["dynamic_cast", "RTTI", "嵌套类", "事件分发", "Handler"],
  },
];
