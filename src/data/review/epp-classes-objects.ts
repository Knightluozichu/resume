import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · 类与对象复习题 */
export const eppClassesObjectsQuestions: ReviewQuestion[] = [
  {
    id: "epp-classes-objects-1",
    chapter: "epp-classes-objects",
    level: 1,
    question: "C++ 类的访问控制有哪几级？public 和 private 各放什么？this 指针是什么？",
    answer:
      "访问控制三级：`public`、`private`、`protected`。\n\n- public：公开成员，外部代码可直接访问。通常放成员函数（接口），构成对象对外暴露的操作。\n- private：私有成员，只有类自己的成员函数（和友元）能访问。通常放数据成员，藏起来防止外部直接篡改，实现封装。\n- protected：受保护成员，类自己和派生类可访问，外部不可。用于继承体系里让子类复用基类的实现细节。\n\nthis 指针：指向「调用该成员函数的那个对象自身」的隐式指针。在成员函数内部，`this->成员` 访问当前对象的成员。编译器把 `obj.f()` 改写成 `f(&obj)`，this 就是 &obj。this 的用途：区分同名参数与成员（`this->x = x;`）、返回当前对象支持链式调用（`return *this;`）、把自身地址传给外部（`register(this);`）。const 成员函数里 this 是 `const T*`，不能修改对象。",
    tags: ["访问控制", "public", "private", "this"],
  },
  {
    id: "epp-classes-objects-2",
    chapter: "epp-classes-objects",
    level: 2,
    question: "构造函数的作用是什么？初始化列表（member initializer list）比在函数体里赋值有什么优势？",
    answer:
      "构造函数作用：对象诞生时初始化成员，把对象从「未初始化内存」变成「可用状态」。构造函数与类同名、无返回类型、在对象创建时自动调用。可重载（默认构造、带参构造、拷贝构造等）。\n\n初始化列表优势：\n1. 直接初始化而非先默认构造再赋值：`Stock(int n) : shares(n) {}` 用 n 直接构造 shares；而 `Stock(int n) { shares = n; }` 是先默认构造 shares（若 shares 是类类型会调默认构造），再调用 operator= 赋值。对类类型成员，初始化列表少一次默认构造+赋值，效率更高。\n2. 必须用初始化列表的场合：const 成员、引用成员、没有默认构造的类类型成员，这三者不能在函数体里赋值（const/引用必须初始化，无默认构造的成员不能先默认构造），只能靠初始化列表。\n3. 基类子对象：派生类构造函数必须用初始化列表调用基类构造函数，不能在函数体里「构造」基类部分。\n\n推荐：养成「能用初始化列表就用」的习惯，既高效又避免遗漏必须初始化的成员。初始化列表的顺序应与成员声明顺序一致（编译器按声明顺序初始化，与列表书写顺序无关，不一致会有警告）。",
    tags: ["构造函数", "初始化列表", "初始化"],
  },
  {
    id: "epp-classes-objects-3",
    chapter: "epp-classes-objects",
    level: 3,
    question: "你在类里写 `void setX(int x) { x = x; }` 想给成员 x 赋值，但对象状态没变，为什么？怎么修？",
    answer:
      "原因：参数名 x 遮蔽了成员 x，函数体内的 `x = x` 是「参数 x 赋值给参数 x 自己」，没碰成员。\n\nC++ 的名称查找规则：局部作用域（函数体及参数）里的名字会遮蔽类作用域的同名成员。编译器在函数体里看到 x，先找局部（参数 x），找到了就用它，不会再去类作用域找成员 x。所以 `x = x` 是参数自赋值，成员 x 保持未初始化或原值。\n\n修法（三选一）：\n1. 用 this 显式指明成员：`void setX(int x) { this->x = x; }`。this->x 明确是成员，左侧成员、右侧参数，赋值正确。这是最清晰的写法。\n2. 改参数名避免遮蔽：`void setX(int newVal) { x = newVal; }`。参数名与成员名不同，无遮蔽，`x = newVal` 左成员右参数。\n3. 初始化列表（仅构造函数适用）：`Foo(int x) : x(x) {}`。初始化列表里括号外的 x 是成员、括号内是参数，特殊语法允许同名单义。但普通 setter 不是构造函数不能用此法。\n\n推荐：setter 用 this-> 或改参数名，构造函数用初始化列表。开 `-Wshadow` 警告让编译器在参数遮蔽成员时报错，提前发现这类 bug。",
    tags: ["名称遮蔽", "this", "排查"],
  },
  {
    id: "epp-classes-objects-4",
    chapter: "epp-classes-objects",
    level: 4,
    question: "综合分析：C++ 用 public/private 实现封装，又提供 friend 友元「开后门」访问私有成员。这种「封装 + 后门」并存的设计是否矛盾？何时该用友元？",
    answer:
      "表面矛盾，实则务实：\n\n封装的价值：private 把数据藏起来，外部只能通过 public 接口操作，保证不变量（如「shares 永远非负」）不被绕过破坏。这是面向对象可靠性的基石。\n\nfriend 的必要性：有些场景下，两个类或函数天然需要紧密协作，强制走 public 接口会牺牲效率或语义清晰度。如：\n1. 运算符重载：`operator<<` 必须是 ostream 的成员或全局函数，但它要访问你的类的私有数据来输出，这时声明它为友元最自然。\n2. 紧密协作的两个类：如容器与迭代器、矩阵与其转置函数，让一方做另一方友元，避免为协作暴露一堆 public getter。\n3. 工厂函数需要访问私有构造函数：把工厂声明为友元，构造函数保持 private 控制创建。\n\n何时该用友元：\n- 运算符重载（特别是流插入/提取）。\n- 两个类逻辑上是一体的紧耦合协作，且这种耦合是稳定的设计决策而非临时方便。\n- 需要访问私有构造的工厂/单例。\n\n何时别用：\n- 只是为了少写一个 public getter——应优先加接口而非开友元。\n- 友元关系跨模块扩散——友元破坏封装，滥用会让不变量无法维护。\n- 测试代码想访问私有——用友元测试而非生产代码友元。\n\n本质：封装是默认安全策略，友元是「受控的例外」。友元不是破坏封装的工具，而是封装体系承认「有时协作比隔离更重要」的逃生口。用友元要克制，每处友元都应是深思熟虑的设计决策，并在注释里说明为何需要。",
    tags: ["综合", "封装", "友元", "访问控制"],
  },
];
