import type { ReviewQuestion } from "./types";

/** Effective C++ 模板与泛型复习题 */
export const efcTemplatesGenericsQuestions: ReviewQuestion[] = [
  {
    id: "efc-templates-generics-1",
    chapter: "efc-templates-generics",
    level: 1,
    question: `模板的「隐式接口」和面向对象的「显式接口」有什么区别？`,
    answer:
      `显式接口（面向对象）：\n- 由函数签名明确声明：返回类型、函数名、参数类型、const 性\n- 在类定义中可以看到完整的接口列表\n- 编译器检查对象是否实现了接口（继承关系或 duck typing）\n- 例如：\`void doWork(Widget& w)\` 要求 \`w\` 是 \`Widget\` 或其派生类\n\n隐式接口（模板）：\n- 由有效表达式定义：模板代码中对类型参数 \`T\` 的所有操作构成了 \`T\` 必须满足的接口\n- 不在某个地方集中声明，而是分散在模板函数体中\n- 编译器在实例化时检查类型是否支持所有表达式\n- 例如：\`template<typename T> void doWork(T& w) { w.supported(); }\` 要求 \`T\` 有 \`supported()\` 方法\n\n关键区别：\n- 显式接口是「声明检查」——看类型是否声明了这些函数\n- 隐式接口是「表达式检查」——看类型能否通过这些表达式的编译\n- 隐式接口更灵活：只要表达式合法即可，不管函数怎么来的（成员函数、运算符、扩展函数）\n- 显式接口更严格：必须通过继承或接口实现来满足`,
    tags: ["隐式接口", "显式接口", "模板", "面向对象", "条款41"],
  },
  {
    id: "efc-templates-generics-2",
    chapter: "efc-templates-generics",
    level: 2,
    question:
      `条款 42 说「了解 typename 的双重含义」。\`typename\` 在模板中有哪两种用法？为什么要区分？`,
    answer:
      `\`typename\` 在模板中有两种用法：\n\n1. 声明模板参数（与 \`class\` 等价）\n   \`\`\`cpp\n   template<typename T> class Widget {};\n   template<class T> class Widget {};  // 完全等价\n   \`\`\`\n   这里 \`typename\` 和 \`class\` 没有区别，只是风格偏好。\n\n2. 声明嵌套从属类型名（关键用法）\n   \`\`\`cpp\n   template<typename T>\n   void f() {\n     typename T::iterator iter;  // typename 告诉编译器 T::iterator 是个类型\n   }\n   \`\`\`\n   这里 \`typename\` 不可省略。\n\n为什么要区分？\n- 模板代码中，\`T::iterator\` 有二义性：它可能是一个类型（嵌套类型），也可能是一个静态成员变量\n- C++ 默认假设 \`T::xxx\` 不是类型（因为解析时 \`T\` 还不确定），除非用 \`typename\` 显式声明\n- 不加 \`typename\` 会编译错误：\`expected ';' before 'iter'\`\n\n规则：任何「依赖模板参数的嵌套类型名」前面必须加 \`typename\`。\n- 例外：基类列表和成员初始化列表中不需要加 \`typename\`（编译器知道那里只能是类型）\n\n示例：\n\`\`\`cpp\ntemplate<typename T>\nclass Derived : public Base<T>::Nested {  // 基类列表，不需要 typename\npublic:\n  Derived() : Base<T>::Nested() {}  // 初始化列表，不需要 typename\n  typename Base<T>::Nested nested;  // 成员声明，需要 typename\n};\n\`\`\``,
    tags: ["条款42", "typename", "嵌套从属类型", "模板"],
  },
  {
    id: "efc-templates-generics-3",
    chapter: "efc-templates-generics",
    level: 3,
    question:
      `条款 44 说「将与参数无关的代码抽离 templates」。模板代码膨胀是什么问题？如何解决？`,
    answer:
      `模板代码膨胀问题：\n- 每种类型实例化都会生成一份完整的代码副本\n- \`vector<int>\`、\`vector<double>\`、\`vector<Widget>\` 各有一份完整的 \`push_back\`、\`size\` 等函数的二进制代码\n- 对于大型模板库（如 STL），这会导致可执行文件体积显著增大\n\n与参数无关的代码：\n- 模板中有些逻辑不依赖类型参数 \`T\`，比如 \`vector\` 的容量管理、内存分配逻辑\n- 这些逻辑在所有实例化中都是一样的，却因为模板机制被复制了多份\n\n解决方案：\n\n1. 抽取到非模板基类\n   \`\`\`cpp\ntemplate<typename T>\nclass Vector : private VectorBase {  // VectorBase 是非模板类\n  // 类型无关的逻辑放在 VectorBase\n  // 类型相关的逻辑放在 Vector<T>\n};\n\`\`\`\n- 只有 \`VectorBase\` 的一份代码，所有 \`Vector<T>\` 共享\n\n2. 用 void* 实现底层（STL 的做法）\n- 底层内存管理用 \`void*\` 操作，只在一个地方实现\n- 模板层只是做类型安全的包装\n- \`vector<int>\` 和 \`vector<double>\` 共享同一份底层代码\n\n3. 提取公共函数\n- 把不依赖 \`T\` 的函数做成非模板函数\n- 模板函数调用这些非模板函数\n\n权衡：\n- 抽离代码减少了二进制体积，但可能降低类型相关的优化（如编译器无法内联跨类调用）\n- 不是所有模板代码膨胀都需要消除——只有当膨胀显著影响可执行文件大小或指令缓存命中率时才值得优化\n- 条款 44 的核心是「识别参数无关代码」，而不是盲目抽离所有公共逻辑`,
    tags: ["条款44", "代码膨胀", "模板优化", "非模板基类"],
  },
  {
    id: "efc-templates-generics-4",
    chapter: "efc-templates-generics",
    level: 4,
    question:
      `条款 43 说「学习处理模板化基类内的名称」，条款 45 说「运用成员函数模板接受所有兼容类型」。请综合论述模板与继承结合时，名称查找和类型兼容面临哪些挑战？`,
    answer:
      `模板与继承结合时面临两个核心挑战：名称查找和类型转换。两者都源于「模板实例化前编译器对类型参数一无所知」。\n\n挑战一：模板化基类内的名称查找（条款 43）\n\n问题：派生类模板中调用基类模板的成员函数，编译器报「找不到名称」\n\`\`\`cpp\ntemplate<typename T>\nclass Base {\npublic:\n  void f() {}\n};\n\ntemplate<typename T>\nclass Derived : public Base<T> {\npublic:\n  void g() { f(); }  // 编译错误：找不到 f\n};\n\`\`\`\n\n原因：编译器在解析 \`Derived<T>::g()\` 时，不知道 \`T\` 是什么，因此不知道 \`Base<T>\` 长什么样（可能被特化成没有 \`f()\` 的版本）。C++ 选择保守策略：不查找模板化基类中的名称。\n\n三种解决方案：\n1. \`this->f()\`——通过 \`this\` 告诉编译器 \`f\` 是依赖类型的成员\n2. \`using Base<T>::f;\`——在派生类中声明基类名称\n3. \`Base<T>::f()\`——显式限定（但会关闭虚函数多态）\n\n推荐方案 1（\`this->\`）：最简洁，且保留虚函数多态行为。\n\n挑战二：类型兼容与成员函数模板（条款 45）\n\n问题：智能指针等模板类的类型兼容\n\`\`\`cpp\nSmartPtr<Derived> pd = SmartPtr<Base>(new Base);  // 需要 SmartPtr<Base> 转换为 SmartPtr<Derived>?\n\`\`\`\n- \`SmartPtr<Base>\` 和 \`SmartPtr<Derived>\` 是两个完全不同的类型，没有继承关系\n- 需要自定义转换逻辑\n\n解决方案：成员函数模板（广义拷贝构造）\n\`\`\`cpp\ntemplate<typename T>\nclass SmartPtr {\npublic:\n  template<typename U>\n  SmartPtr(const SmartPtr<U>& other)  // 接受所有兼容类型的 SmartPtr\n    : ptr(other.get()) {}\n};\n\`\`\`\n\n关键设计：\n1. 用 \`template<typename U>\` 参数化源类型\n2. 在构造函数体内用 \`static_assert\` 或 SFINAE 约束 \`U*\` 能隐式转换为 \`T*\`（防止 \`SmartPtr<int>\` 转 \`SmartPtr<string>\`）\n3. 同理需要广义赋值运算符\n4. \`shared_ptr\` 就是这么设计的：\`shared_ptr<Derived>\` 可以从 \`shared_ptr<Base>\` 构造\n\n综合本质：\n- 条款 43 解决的是「模板化基类的名称在派生类中不可见」——这是模板实例化时机导致的名称查找延迟\n- 条款 45 解决的是「不同模板实例之间没有自动的类型关系」——这是模板类型的严格性导致的兼容性缺失\n- 两者的共同根因：模板在实例化前，编译器对类型参数的信息一无所知，所有名称查找和类型关系都必须延迟到实例化时才能确定\n- C++ 的策略是「宁可报错也不假设」，需要程序员通过 \`this->\`、成员函数模板等机制显式提供信息`,
    tags: ["综合", "条款43", "条款45", "名称查找", "成员函数模板", "类型兼容"],
  },
];
