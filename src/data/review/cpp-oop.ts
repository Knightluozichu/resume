/** 复习题库 · C++ 面向对象程序设计（cpp-oop）。C++ Primer §15 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppOopQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "coop-1",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "什么是面向对象编程（OOP）中的继承？C++ 如何声明派生类？",
    answer:
      "继承（inheritance）是 OOP 的核心机制——通过已有类（基类）定义新类（派生类），派生类自动获得基类的成员，并可以扩展新成员或覆盖已有行为。C++ 声明：`class Bulk_quote : public Quote { ... };`——冒号后写继承方式（public/protected/private）和基类名。`public` 继承是最常见的形式——表达 IS-A 关系（Bulk_quote 是 Quote 的一种）。基类的 private 成员虽然被继承但派生类不可直接访问。",
    tags: ["继承", "基类", "派生类", "IS-A"],
  },
  {
    id: "coop-2",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "什么是虚函数（virtual function）？它的核心目的是什么？",
    answer:
      "虚函数是在基类中用 `virtual` 关键字声明的成员函数。核心目的：实现动态绑定——通过基类指针或引用调用虚函数时，实际执行的是指针/引用所指对象的真实类型（派生类）的版本，而不是基类的版本。虚函数让「编写操作基类对象的代码，但运行时自动适配到具体派生类型」成为可能。语法：`virtual double net_price(size_t) const;`。构造函数不能是虚函数，但析构函数通常应该是虚函数。",
    tags: ["虚函数", "virtual", "动态绑定"],
  },
  {
    id: "coop-3",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "override 和 final 关键字分别有什么用？什么时候应该使用它们？",
    answer:
      "`override`：显式声明派生类的成员函数覆盖了基类的虚函数。如果函数签名与基类虚函数不匹配——编译期直接报错，不会默默定义了一个新的无关函数。最佳实践：派生类覆盖虚函数时一律加 `override`——用编译器帮你检查签名。`final`：放在类名后（`class Last final : Base`）禁止此类再被继承；放在虚函数声明后（`void f() final;`）禁止派生类再覆盖此函数。用于明确这是这个类体系中的最终版本。",
    tags: ["override", "final", "编译期检查"],
  },
  {
    id: "coop-4",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "什么是动态绑定（dynamic binding）？它与静态绑定有什么区别？",
    answer:
      "动态绑定（运行时多态）：调用哪个函数版本在运行时决定——通过 vptr→vtable→函数地址 三步跳转找到实际应该调用的函数版本。发生在通过基类指针/引用调用虚函数时。静态绑定（编译期）：调用哪个函数版本在编译期就确定了——根据变量/表达式的静态类型直接生成调用地址。非虚函数、通过对象（不是指针/引用）调用的虚函数都走静态绑定。动态绑定让程序在多态场景「自动选择正确版本」——是 OOP 的基石。",
    tags: ["动态绑定", "静态绑定", "虚函数表"],
  },
  {
    id: "coop-5",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "纯虚函数是什么？什么是抽象基类？能创建抽象基类的对象吗？",
    answer:
      "纯虚函数：在虚函数声明末尾加 `= 0`——`virtual double net_price(size_t) const = 0;`。它不需要（通常不提供）函数体——只是作为「接口契约」存在。抽象基类：包含至少一个纯虚函数的类——不能直接创建对象（`Quote q;` 编译错误）。纯虚函数是「派生类必须提供这个功能」的强制要求——不覆盖就无法实例化。可以定义抽象基类的指针或引用——指向派生类对象，通过动态绑定调用派生类的实现。",
    tags: ["纯虚函数", "= 0", "抽象基类", "abstract"],
  },
  {
    id: "coop-6",
    chapter: "cpp-oop" as any,
    level: 1,
    question: "基类的析构函数为什么通常应该定义为 virtual？如果不 virtual 会怎样？",
    answer:
      "如果基类析构不是 virtual：`Quote *p = new Bulk_quote; delete p;`——`delete` 根据 `p` 的静态类型（`Quote*`）调用 `Quote::~Quote()`。只析构了基类部分，派生类新增的资源（`min_qty`、`discount` 等）没有被释放——资源泄漏且未定义行为。定义为 `virtual ~Quote()`：`delete p` 通过 vtable 动态派发到 `~Bulk_quote()`→先析构派生类部分→自动调 `~Quote()` 析构基类部分。铁律：只要类有可能作为基类被继承，析构就应该 virtual。",
    tags: ["虚析构函数", "virtual destructor", "delete基类指针"],
  },

  // ── L2 理解：用法与区别 ──
  {
    id: "coop-7",
    chapter: "cpp-oop" as any,
    level: 2,
    question: "虚函数表（vtable）和虚函数指针（vptr）是什么？它们如何实现动态绑定？",
    answer:
      "每个含虚函数的类在编译后会生成一张虚函数表（vtable）——一个函数指针数组，每个虚函数占一个固定槽位。派生类覆盖虚函数时，对应槽位的函数指针被替换为派生类版本。每个含虚函数的对象在内存头部有一个隐藏的 8 字节虚函数指针（vptr），指向所属类的 vtable。调用虚函数时的三步跳转：`obj.vptr → vtable[slot] → &函数地址 → 调用`。vptr 在构造函数中逐层设置——每层构造完成时指向当前层的 vtable。这就是为什么构造函数中调虚函数走的是自己的版本（不是派生类覆盖版）。",
    tags: ["vtable", "vptr", "虚函数表"],
  },
  {
    id: "coop-8",
    chapter: "cpp-oop" as any,
    level: 2,
    question: "派生类的构造函数执行顺序是什么？析构函数的执行顺序呢？与普通类相比有什么不同？",
    answer:
      "构造顺序：①基类构造函数先执行（初始化继承来的基类部分）→ ②派生类的成员按声明顺序初始化（初始化列表）→ ③派生类构造函数体执行。vptr 在每层构造完成后更新为当前类的 vtable。析构顺序：构造顺序的严格逆序——①派生类析构函数体执行 → ②派生类成员按声明逆序销毁 → ③基类析构函数执行。析构过程中 vptr 也逐层回退。口诀：构造「先地基后楼房」，析构「先拆楼房后拆地基」。与普通类的区别：多了基类部分——这部分总是先构造、后析构。",
    tags: ["构造顺序", "析构顺序", "派生类构造"],
  },
  {
    id: "coop-9",
    chapter: "cpp-oop" as any,
    level: 2,
    question: "什么情况下派生类必须覆盖基类的虚函数？什么情况下可覆盖可不覆盖？",
    answer:
      "必须覆盖：基类虚函数是纯虚函数（`= 0`）——派生类如果不覆盖该函数，编译器报错（除非派生类也声明为抽象类）。可覆盖可不覆盖：基类虚函数提供了默认实现——派生类可选择覆盖（改变行为）或直接使用基类的默认版本（保持行为不变）。不应覆盖：基类虚函数标了 `final`——编译器禁止覆盖，尝试覆盖即编译错误。最佳实践：如果不确定是否需要覆盖——先不覆盖。等到确实需要差异化行为时再覆盖。",
    tags: ["覆盖", "纯虚函数", "final"],
  },
  {
    id: "coop-10",
    chapter: "cpp-oop" as any,
    level: 2,
    question: "什么是静态类型和动态类型？在什么情况下它们不一致？",
    answer:
      "静态类型（编译期）：变量声明时的类型——如 `Quote &r` 的静态类型是 `Quote&`。编译期据此检查访问权限和函数签名。动态类型（运行期）：变量实际指向/引用的对象的真实类型——如 `r` 实际引用了一个 `Bulk_quote` 对象，动态类型就是 `Bulk_quote`。两者不一致的场景：通过基类指针或引用指/引用派生类对象——`Quote *p = new Bulk_quote;`。此时 `p` 的静态类型是 `Quote*`，动态类型是 `Bulk_quote*`。虚函数调用使用动态类型（动态绑定），非虚函数调用使用静态类型（编译期绑死）。",
    tags: ["静态类型", "动态类型", "多态"],
  },

  // ── L3 应用：代码级判断与写法 ──
  {
    id: "coop-11",
    chapter: "cpp-oop" as any,
    level: 3,
    question:
      "下面代码有什么问题？\n```cpp\nclass Base {\npublic:\n    void f() { cout << \"Base::f\" << endl; }\n};\nclass Derived : public Base {\npublic:\n    void f() { cout << \"Derived::f\" << endl; }\n};\nint main() {\n    Base *p = new Derived;\n    p->f();  // 期望输出 Derived::f\n    delete p;\n}\n```",
    answer:
      "问题：`f()` 不是虚函数——`p->f()` 走静态绑定，根据 `p` 的静态类型 `Base*` 调用 `Base::f()`，永远输出 `Base::f`。修法：① 基类的 `f()` 前加 `virtual` ② 派生类的 `f()` 后加 `override`（推荐，编译器帮你检查签名匹配）。修改后 `p->f()` 走动态绑定——根据 `p` 实际指向的 `Derived` 对象调用 `Derived::f()`。另一问题：`Base` 析构不是 virtual——`delete p` 只调 `~Base()`，派生类部分未析构，资源可能泄漏。修法：`virtual ~Base() = default;`。",
    tags: ["virtual", "静态绑定", "虚析构", "override"],
  },
  {
    id: "coop-12",
    chapter: "cpp-oop" as any,
    level: 3,
    question:
      "判断下面代码的输出并解释原因：\n```cpp\nclass A {\npublic:\n    virtual void f() { cout << \"A\"; }\n    A() { f(); }    // 构造函数中调用虚函数\n};\nclass B : public A {\npublic:\n    void f() override { cout << \"B\"; }\n};\nint main() { B b; }\n```",
    answer:
      "输出 `A`。原因：构造函数中调用虚函数走的是静态绑定——因为构造时派生类部分尚未初始化，vptr 仍指向当前层的 vtable。`B` 构造：先执行 `A::A()`→此时 `A` 部分正在构造，vptr 指向 `A` 的 vtable→`f()` 调用 `A::f()`→输出 `A`。构造完成后 vptr 才更新为 `B` 的 vtable。同理析构函数中调用虚函数也走静态绑定。最佳实践：构造函数和析构函数中不要调用虚函数——行为不符合直觉且容易隐藏 bug。",
    tags: ["构造函数", "虚函数", "vptr", "构造中的虚函数"],
  },
  {
    id: "coop-13",
    chapter: "cpp-oop" as any,
    level: 3,
    question:
      "定义抽象基类 `Shape`，包含纯虚函数 `double area() const = 0;`。然后定义 `Circle` 和 `Rectangle` 两个派生类，各实现 `area()`。写出完整代码，并说明抽象基类不能实例化但可以定义指针/引用的意义。",
    answer:
      "```cpp\nclass Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;  // 纯虚——强制实现\n};\n\nclass Circle : public Shape {\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const override { return 3.14159 * radius * radius; }\nprivate:\n    double radius;\n};\n\nclass Rectangle : public Shape {\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double area() const override { return width * height; }\nprivate:\n    double width, height;\n};\n```\n抽象基类的意义：`vector<unique_ptr<Shape>> shapes;` 可以同时存 Circle 和 Rectangle——通过基类指针统一管理不同派生类对象。循环 `for(auto &s: shapes) cout << s->area();` 通过动态绑定自动调用各对象的正确 area() 版本。不能实例化 Shape 但定义指针/引用——正是这带来了多态的核心价值——「用一套代码操作多种类型」。",
    tags: ["抽象基类", "纯虚函数", "多态", "Shape"],
  },
  {
    id: "coop-14",
    chapter: "cpp-oop" as any,
    level: 3,
    question:
      "为 `Quote` 和 `Bulk_quote` 写出完整的拷贝控制成员（拷贝构造/拷贝赋值/移动构造/移动赋值/析构），说明派生类拷贝/移动构造必须显式调用基类对应构造的原因和语法。",
    answer:
      "```cpp\nclass Quote {\npublic:\n    Quote() = default;\n    Quote(const Quote &) = default;             // 拷贝\n    Quote(Quote &&) = default;                  // 移动\n    Quote& operator=(const Quote &) = default;\n    Quote& operator=(Quote &&) = default;\n    virtual ~Quote() = default;                 // 虚析构\n};\n\nclass Bulk_quote : public Quote {\npublic:\n    Bulk_quote() = default;\n    // 拷贝构造——必须显式调用基类拷贝\n    Bulk_quote(const Bulk_quote &rhs)\n        : Quote(rhs), min_qty(rhs.min_qty), discount(rhs.discount) {}\n    // 移动构造——调用基类移动\n    Bulk_quote(Bulk_quote &&rhs) noexcept\n        : Quote(std::move(rhs)), min_qty(rhs.min_qty), discount(rhs.discount) {\n        rhs.min_qty = 0; rhs.discount = 0;\n    }\n    // 拷贝/移动赋值——同样要调用基类版本\n    Bulk_quote& operator=(const Bulk_quote &rhs) {\n        Quote::operator=(rhs);  // 显式调用基类拷贝赋值\n        min_qty = rhs.min_qty;\n        discount = rhs.discount;\n        return *this;\n    }\nprivate:\n    size_t min_qty = 0;\n    double discount = 0.0;\n};\n```\n必须显式调用基类版本的原因：派生类的拷贝/移动只负责派生类新增成员——基类部分的拷贝/移动由基类的对应函数完成。不显式调用 = 基类部分用默认构造（错误）。",
    tags: ["拷贝控制", "派生类拷贝", "基类拷贝", "虚析构"],
  },
  {
    id: "coop-15",
    chapter: "cpp-oop" as any,
    level: 3,
    question:
      "写出 `print_total` 函数的完整实现——它接收一个 `ostream&`、一个 `const Quote&` 和一个数量 `n`，打印出书号、总价。说明为什么参数用 const 引用而不是值，以及内部 `item.net_price(n)` 为什么能自动走到正确的版本。",
    answer:
      "```cpp\ndouble print_total(ostream &os, const Quote &item, size_t n) {\n    double ret = item.net_price(n);\n    os << \"ISBN: \" << item.isbn()\n       << \" # sold: \" << n\n       << \" total due: \" << ret << endl;\n    return ret;\n}\n```\nconst 引用：① 避免拷贝——`Quote` 可能很大或有虚函数表，拷贝代价高/语义复杂 ② `const` 保证函数不修改传入的对象 ③ 引用支持多态——可以绑定到 `Bulk_quote` 而不会发生对象切片（值传递会把派生类对象切成基类部分）。`item.net_price(n)` 自动走正确版本：`net_price` 是虚函数——编译器生成 vptr→vtable→函数地址 的三步跳转代码。如果 `item` 实际引用的是 `Bulk_quote` 对象，运行时调的就是 `Bulk_quote::net_price`。",
    tags: ["print_total", "const引用", "对象切片", "动态绑定"],
  },

  // ── L4 综合：完整类体系设计 ──
  {
    id: "coop-16",
    chapter: "cpp-oop" as any,
    level: 4,
    question:
      "设计一个`Vehicle`类体系：(1) 抽象基类 `Vehicle` 包含纯虚函数 `void drive() const = 0;` 和 `double maxSpeed() const = 0;` (2) `Car` 和 `Bike` 各实现自己的版本 (3) 添加一个非虚函数 `void info() const` 打印\"这是一辆车\" (4) 说明如果通过 `Vehicle*` 调用 `info()` 会调用谁的版本——并解释为什么。",
    answer:
      "```cpp\nclass Vehicle {\npublic:\n    virtual ~Vehicle() = default;\n    virtual void drive() const = 0;\n    virtual double maxSpeed() const = 0;\n    void info() const { cout << \"这是一辆车\\n\"; }  // 非虚\n};\nclass Car : public Vehicle {\npublic:\n    void drive() const override { cout << \"四个轮子跑\\n\"; }\n    double maxSpeed() const override { return 240; }\n};\nclass Bike : public Vehicle {\npublic:\n    void drive() const override { cout << \"两个轮子蹬\\n\"; }\n    double maxSpeed() const override { return 30; }\n};\n```\n调用 `p->info()` 走的是 `Vehicle::info()`——`info()` 不是虚函数，编译期根据静态类型 `Vehicle*` 直接绑定到基类版本。即使 p 实际指向 Car 对象，也不会自动找到 Car 的版本——Car 没有覆盖 info()（也覆盖不了，基类没 virtual）。如果想要派生类覆盖——基类必须加 `virtual`。这是区分虚函数（运行时决定）vs 非虚函数（编译期决定）的经典示例。",
    tags: ["抽象基类", "虚vs非虚", "Vehicle", "类体系设计"],
  },
  {
    id: "coop-17",
    chapter: "cpp-oop" as any,
    level: 4,
    question:
      "给出一个场景判断：设计一个 `Document` 类和一个 `Printable` 抽象接口类。`Document` 不是可打印的，但 `PdfDocument` 和 `WordDocument` 都是 `Document` 的派生类，同时也是可打印的。使用多重继承写出类层次结构，并说明虚基类（virtual base）是否需要。",
    answer:
      "```cpp\nclass Document {\npublic:\n    virtual ~Document() = default;\n    virtual void save(const string &path) const = 0;\n};\n\nclass Printable {\npublic:\n    virtual ~Printable() = default;\n    virtual void print() const = 0;  // 纯接口\n};\n\n// 多重继承——PdfDocument 同时是一种 Document 和一种 Printable\nclass PdfDocument : public Document, public Printable {\npublic:\n    void save(const string &path) const override { /*...*/ }\n    void print() const override { /*...*/ }\n};\n\nclass WordDocument : public Document, public Printable {\npublic:\n    void save(const string &path) const override { /*...*/ }\n    void print() const override { /*...*/ }\n};\n```\n这个场景不需要虚基类——`Document` 和 `Printable` 没有共同的基类。虚基类用于菱形继承——如 `A→B1, B2→D`，D 间接继承了两次 A。这里 `PdfDocument` 直接继承两个独立的基类——没有菱形、没有重复继承同一个类。如果需要——虚继承语法：`class B1 : virtual public A {};`。",
    tags: ["多重继承", "虚基类", "接口", "Printable"],
  },
  {
    id: "coop-18",
    chapter: "cpp-oop" as any,
    level: 4,
    question:
      "下列继承层次有什么设计问题？\n```cpp\nclass Base {\npublic:\n    virtual void f(int) { cout << \"Base::f(int)\\n\"; }\n};\nclass Derived : public Base {\npublic:\n    // 意图：覆盖 f\n    void f(double) { cout << \"Derived::f(double)\\n\"; }\n};\nint main() {\n    Derived d;\n    Base *p = &d;\n    p->f(42);  // 期望 Derived\n    d.f(42);   // 期望 Derived\n    d.f(3.14);\n}\n```输出是什么？如何修复？",
    answer:
      "输出：`Base::f(int)` / `Derived::f(double)` / `Derived::f(double)`。问题：`Derived::f(double)` 参数类型是 `double` 而基类是 `int`——签名不同——这不是覆盖（override），而是隐藏（hide）了基类的 `f(int)`。在 `Derived` 的作用域中，编译器只看 `Derived` 中名为 `f` 的函数——找到了 `f(double)`，不会再往上找 `Base::f(int)`。所以 `d.f(42)` 自动把 `42` 转成 `double` 调用 `f(double)`——不是调用 `f(int)`。修法：① `void f(int) override`——加 `override` 会让编译器立即报错，暴露问题 ② 如果需要同时支持 int 和 double——两个版本都写：先 `using Base::f;` 把基类的 `f` 引入，再写 `void f(double)`。",
    tags: ["签名匹配", "隐藏", "override", "using声明"],
  },
  {
    id: "coop-19",
    chapter: "cpp-oop" as any,
    level: 4,
    question:
      "设计一个完整的 `Animal` 抽象类体系：① `Animal` 包含纯虚函数 `string sound() const = 0;` 和 `string name() const = 0;` ② `Dog` 和 `Cat` 实现各自的声音和名字 ③ 添加非虚函数 `void speak() const` 打印 `name() + \" says \" + sound()` ④ 添加 `class Kennel` 管理 `vector<unique_ptr<Animal>>`，提供 `add()` 和 `allSpeak()` 方法 ⑤ 说明 `speak()` 中为什么 `name()` 和 `sound()` 会动态派发而 `speak()` 自己不会。",
    answer:
      "```cpp\nclass Animal {\npublic:\n    virtual ~Animal() = default;\n    virtual string sound() const = 0;\n    virtual string name() const = 0;\n    void speak() const {\n        cout << name() << \" says \" << sound() << endl;\n    }  // 非虚——所有动物说同样的格式\n};\n\nclass Dog : public Animal {\npublic:\n    string sound() const override { return \"Woof!\"; }\n    string name() const override { return \"Dog\"; }\n};\n\nclass Cat : public Animal {\npublic:\n    string sound() const override { return \"Meow!\"; }\n    string name() const override { return \"Cat\"; }\n};\n\nclass Kennel {\npublic:\n    void add(unique_ptr<Animal> a) { animals.push_back(move(a)); }\n    void allSpeak() const {\n        for (const auto &a : animals) a->speak();\n    }\nprivate:\n    vector<unique_ptr<Animal>> animals;\n};\n```\n`speak()` 本身是非虚——调用 `a->speak()` 时，编译器看到 `Animal*`，直接绑定到 `Animal::speak()`（静态绑定）。但进入 `speak()` 函数体后，`this` 的实际类型是 `Dog*` 或 `Cat*`——`name()` 和 `sound()` 是虚函数，通过 `this->name()` / `this->sound()` 走动态绑定——自动派发到正确版本。这就是 NVI（Non-Virtual Interface）模式——非虚外壳调用虚内核。",
    tags: ["NVI", "unique_ptr", "类体系", "Animal", "多态"],
  },
  {
    id: "coop-20",
    chapter: "cpp-oop" as any,
    level: 4,
    question:
      "比较 public 继承、private 继承和组合（composition）三种代码复用方式。在什么场景下应该选哪一种？举例说明。",
    answer:
      "public 继承：表达 IS-A 关系——派生类是基类的一种。如 `Car : public Vehicle`——Car 是一种 Vehicle。用户在需要基类的任何地方都能用派生类。最常见——优先使用。private 继承：表达 HAS-A 或用「实现继承」——派生类用基类的功能实现自己，但不暴露基类接口。如 `Stack : private vector<int>`——Stack 内部用 vector 管理数据，但不希望用户对 Stack 做 `push_back`。极少使用——99% 的场景用组合代替。组合（composition）：类内部有一个另一个类的对象作为成员——如 `class Stack { vector<int> data; ... };`。表达 HAS-A 的最标准方式——比 private 继承更清晰、耦合更低。决策原则：IS-A → public 继承；HAS-A → 组合（不是 private 继承）；如果基类有 protected 成员/虚函数需要覆盖且组合写不出来→才考虑 private/protected 继承。",
    tags: ["public继承", "private继承", "组合", "IS-A", "HAS-A"],
  },
];
