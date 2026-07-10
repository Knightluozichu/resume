import type { ReviewQuestion } from "./types";

/** Effective C++ 类与设计复习题 */
export const efcClassDesignQuestions: ReviewQuestion[] = [
  {
    id: "efc-class-design-1",
    chapter: "efc-class-design",
    level: 1,
    question: `条款 22 说「将成员变量声明为 private」，为什么不用 public 或 protected？`,
    answer:
      `成员变量设为 private 的三个理由：\n\n1. 语法一致性：如果成员变量是 public，用户代码用 \`obj.x\` 访问；如果改成函数 \`obj.x()\`，所有调用点都要改。private + 访问函数让接口统一为函数调用，后续可以自由改变实现（如加缓存、加验证）而不破坏调用代码。\n\n2. 访问控制：private 允许你控制读权限、写权限、读写权限。可以只提供 getter 不提供 setter（只读），可以加验证逻辑（写时检查合法值），public 成员变量做不到这些。\n\n3. 封装不变式：类的核心价值是维护不变式（如「年龄必须 ≥ 0」）。如果成员变量是 public 或 protected，用户或派生类可以绕过不变式直接赋值，类的约束形同虚设。private 保证所有修改都经过成员函数，不变式得以维护。\n\nprotected 不比 public 更安全：派生类仍然可以直接修改 protected 成员，破坏不变式。从封装角度看，protected 成员变量和 public 成员变量一样糟糕。`,
    tags: ["条款22", "private", "封装", "成员变量"],
  },
  {
    id: "efc-class-design-2",
    chapter: "efc-class-design",
    level: 2,
    question:
      `条款 20 推荐用 pass-by-reference-to-const 替代 pass-by-value，为什么？有什么例外？`,
    answer:
      `推荐 pass-by-reference-to-const 的理由：\n\n1. 避免拷贝开销：按值传递会调用拷贝构造函数，对于大对象（如 \`string\`、\`vector\`）代价高昂。引用传递只是传一个地址，没有拷贝。\n\n2. 避免对象切片：如果函数参数是基类按值传递，传入派生类对象时，派生类部分被「切掉」，只剩基类部分，虚函数不会多态。引用传递保留完整对象。\n\n3. const 保证不被修改：\`const T&\` 既是引用（高效）又是只读（安全），兼顾了按值传递的「不修改实参」语义。\n\n例外情况（用 pass-by-value 更好）：\n1. 内置类型（\`int\`、\`double\`、指针）：拷贝代价和引用一样小，甚至更小（引用需要间接寻址）。\n2. STL 迭代器和函数对象：它们的设计就是按值传递的，拷贝代价极小。\n3. 小型且不可变的自定义类型：如果类型很小（1-2 个内置成员）且不需要多态，按值传递可能更快（避免引用的间接寻址开销）。\n\n一般经验：类型大小 ≤ 一个指针（8 字节）时，按值传递通常更优；大于此用 reference-to-const。但「小」不等于「内置」——\`string\` 内部只有指针但拷贝可能分配内存。`,
    tags: ["条款20", "pass-by-reference", "pass-by-value", "对象切片", "性能"],
  },
  {
    id: "efc-class-design-3",
    chapter: "efc-class-design",
    level: 3,
    question:
      `条款 23 说「宁以 non-member、non-friend 替换 member 函数」。请解释这个看似违反面向对象直觉的建议背后的逻辑。`,
    answer:
      `直觉认为成员函数封装更好，但 Scott Meyers 的论证恰恰相反：\n\n核心逻辑：封装 = 减少能访问类内部（private 成员）的代码量。\n- member 函数能访问所有 private 成员\n- non-member non-friend 函数只能访问 public 接口\n- 因此 non-member non-friend 函数的「封装性」更强——它访问的内部更少\n\n具体示例：一个 \`WebBrowser\` 类有 \`clearCache()\`、\`clearHistory()\`、\`clearCookies()\` 三个成员函数。现在需要 \`clearEverything()\` 同时清三种：\n- 作为 member：\`WebBrowser::clearEverything()\` 能访问所有 private 成员，封装性低\n- 作为 non-member：\`void clearEverything(WebBrowser& wb) { wb.clearCache(); wb.clearHistory(); wb.clearCookies(); }\` 只通过 public 接口操作，封装性高\n\n额外优势：\n1. 可扩展性：non-member 函数可以分布在多个头文件/命名空间中，不同使用者可以只 include 需要的功能。member 函数必须都挤在类定义里。\n2. 编译依赖：non-member 函数修改不需要重新编译所有使用该类的代码（如果放在不同头文件中）。\n3. 适配 STL 算法风格：\`std::sort(begin, end, comp)\` 就是 non-member 设计，\`comp\` 可以是普通函数。\n\n适用条件：只有当函数可以通过类的 public 接口实现时，才适合做成 non-member。如果必须访问 private 成员，就只能做 member。\n\n实践：把一个类的一组便利函数放在与类同名的命名空间中，如 \`namespace WebBrowser { class WebBrowser {...}; void clearEverything(WebBrowser&); }\`，让用户按需 include。`,
    tags: ["条款23", "non-member", "封装", "面向对象", "设计原则"],
  },
  {
    id: "efc-class-design-4",
    chapter: "efc-class-design",
    level: 4,
    question:
      `条款 18 说「让接口容易被正确使用，不易被误用」，条款 19 说「设计 class 犹如设计 type」。请综合论述如何系统性地设计一个高质量的 C++ 类？`,
    answer:
      `系统性地设计一个 C++ 类，需要回答条款 19 提出的一组设计问题，同时用条款 18 的原则约束接口：\n\n一、设计前的类型审查（条款 19）\n1. 新对象的创建与销毁：构造/析构行为如何？需要 virtual 析构吗？RAII 资源如何管理？\n2. 初始化与赋值：拷贝构造、move 构造、拷贝赋值、move 赋值的语义是什么？需要禁止哪些？\n3. 值传递：如果按值传递这个类型的对象，会发生什么？是否应该用 pass-by-ref-to-const？\n4. 合法状态：对象创建后是否处于合法状态？哪些操作在哪些状态下合法？\n5. 继承体系：这个类会被继承吗？它会继承别人吗？虚函数的设计如何？\n6. 类型转换：需要隐式转换吗？如何用 \`explicit\` 防止意外转换？\n7. 运算符：哪些运算符有意义？\`operator==\`、\`operator<\` 的语义是什么？\n8. 不抛异常的函数：哪些函数承诺不抛异常（\`noexcept\`）？\n9. 命名空间：放在哪个命名空间？与哪些类型关联？\n\n二、接口设计的防误用原则（条款 18）\n1. 用类型限制参数：不要用 \`int month\` 让用户传 13，用 \`enum class Month\` 或工厂函数限制合法值\n2. 保持接口行为一致：如果 \`a.add(b)\` 返回新对象，\`a.subtract(b)\` 也应如此，不要一个返回新对象一个修改自身\n3. 消除资源管理责任：返回 \`unique_ptr\` 而非裸指针，让调用者不可能忘记释放\n4. 用 RAII 管理跨 API 边界的资源：不要让用户手动 \`lock()\`/\`unlock()\`，提供 \`LockGuard\` 类\n5. 用类型系统编码前置/后置条件：用 \`[[nodiscard]]\` 防止忽略返回值，用 \`const\` 标注不变的方法\n\n三、封装与实现约束\n1. 成员变量一律 private（条款 22）\n2. 能用 non-member non-friend 就不用 member（条款 23）\n3. 数据隐藏与 Pimpl 惯用法降低编译依赖（条款 31）\n4. const 正确性：能加 const 就加（条款 3）\n\n四、异常安全\n1. 提供「基本保证」「强保证」或「不抛异常保证」中的至少一种（条款 29）\n2. 析构函数绝不抛异常（条款 8）\n3. 用 copy-and-swap 实现「强保证」的赋值\n\n综合来看，设计一个 C++ 类不是「写代码」而是「做决策」——每个决策都涉及类型语义、性能、封装、异常安全、可扩展性的权衡。高质量类的标志是：用户用对了觉得自然，用错了编译器就报错。`,
    tags: ["综合", "条款18", "条款19", "类设计", "接口设计", "封装", "异常安全"],
  },
];
