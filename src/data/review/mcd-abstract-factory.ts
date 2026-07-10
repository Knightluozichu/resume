import type { ReviewQuestion } from "./types";

/** Modern C++ Design 抽象工厂复习题 */
export const mcdAbstractFactoryQuestions: ReviewQuestion[] = [
  {
    id: "mcd-abstract-factory-1",
    chapter: "mcd-abstract-factory",
    level: 1,
    question: `抽象工厂要解决什么问题？与对象工厂的区别是什么？什么叫「产品族」？`,
    answer:
      `问题：当程序需要创建「一族风格统一但跨多个产品类型」的对象时，单独的对象工厂不够。例如 UI 主题：Motif 风格要有 MotifButton + MotifScrollBar + MotifMenu，Windows 风格要有 WindowsButton + WindowsScrollBar + WindowsMenu。若用三个独立对象工厂，调用方要自己保证「三个工厂都选 Motif」——容易出错。抽象工厂把「创建一整族产品」封装成一个接口，保证族内风格一致。\n\n产品族：一组「在同一抽象层级上相关、需统一风格」的产品。族内每个产品是不同基类（Button、ScrollBar、Menu 是三个基类），但同族产品共享风格（Motif 或 Windows）。抽象工厂为每个产品类型提供一个 Make 方法，所有方法返回同一风格的具体产品。\n\n与对象工厂的区别：\n\n| 维度 | 对象工厂 | 抽象工厂 |\n|---|---|---|\n| 粒度 | 单产品类型，多派生 | 多产品类型，多族 |\n| 接口 | CreateObject(id) → Base* | MakeA() / MakeB() / MakeC() 多方法 |\n| 一致性 | 单产品，无族概念 | 族内所有产品风格统一 |\n| 扩展产品类型 | 不涉及 | 改接口（加 Make 方法），所有具体工厂都要改 |\n| 扩展族 | Register 新派生 | 新增一个具体工厂类 |\n\n一句话：对象工厂造「一个类型的多个变体」，抽象工厂造「多个类型的一族变体」。前者是 1:N（一个基类多个派生），后者是 M:N（M 个基类 × N 个族）。`,
    tags: ["抽象工厂", "产品族", "对象工厂", "对比"],
  },
  {
    id: "mcd-abstract-factory-2",
    chapter: "mcd-abstract-factory",
    level: 2,
    question: `Loki AbstractFactory 如何用 typelist 自动生成 Make 接口？ConcreteFactory 如何实现？`,
    answer:
      `Loki AbstractFactory 用 typelist 自动生成接口：\n\n\`\`\`cpp\n// TList 是产品基类的 typelist：Widget, ScrollBar, Menu\nAbstractFactory<TYPELIST_3(Widget, ScrollBar, Menu)> factory;\n\`\`\`\n\n自动生成过程：\n1. AbstractFactory 模板接收一个 typelist 参数，列出所有产品基类（如 Widget, ScrollBar, Menu）。\n2. 通过递归模板继承（GenScatterHierarchy），为 typelist 里每个类型生成一个虚函数 \`virtual Widget* Make() = 0;\`、\`virtual ScrollBar* Make() = 0;\` 等。\n3. 最终 AbstractFactory 类有 N 个纯虚 Make 方法，每个返回对应基类指针——这就是抽象工厂接口，全部由 typelist 自动生成，无需手写。\n\nConcreteFactory 实现：\n\`\`\`cpp\n// TList 是产品基类，ConcreteTList 是对应具体类的 typelist\nConcreteFactory<AbstractFact, Op, TYPELIST_3(MotifButton, MotifScrollBar, MotifMenu)> factory;\n\`\`\`\n1. ConcreteFactory 接收抽象工厂类型 + 操作（new/clone）+ 具体产品 typelist。\n2. 为每个具体产品重写对应的 Make 方法：\`ScrollBar* Make() override { return new MotifScrollBar; }\`。\n3. 具体产品 typelist 与抽象基类 typelist 一一对应（编译时检查长度和顺序）。\n4. 一行模板实例化就生成一个完整的具体工厂，实现所有 Make 方法。\n\n价值：把「手写 N 个 Make 方法 + N 个 override」压缩成「两个 typelist 参数」。新增一族风格只需换具体产品 typelist，抽象接口不变。这是 typelist 在设计模式自动化里的典型应用。`,
    tags: ["AbstractFactory", "ConcreteFactory", "typelist", "GenScatterHierarchy"],
  },
  {
    id: "mcd-abstract-factory-3",
    chapter: "mcd-abstract-factory",
    level: 3,
    question: `抽象工厂用 typelist 自动生成消除了哪些样板代码？代价是什么？什么场景下值得？`,
    answer:
      `消除的样板代码：\n\n1. 手写抽象工厂接口：传统抽象工厂要为每个产品基类手写一个纯虚 Make 方法：\n\`\`\`cpp\nclass GUIFactory {\n  virtual Button* MakeButton() = 0;\n  virtual ScrollBar* MakeScrollBar() = 0;\n  virtual Menu* MakeMenu() = 0;\n};\n\`\`\`\ntypelist 版本自动生成这 N 个方法，省手写。\n\n2. 手写具体工厂实现：每个具体工厂要 override 所有 Make 方法：\n\`\`\`cpp\nclass MotifFactory : public GUIFactory {\n  Button* MakeButton() override { return new MotifButton; }\n  ScrollBar* MakeScrollBar() override { return new MotifScrollBar; }\n  Menu* MakeMenu() override { return new MotifMenu; }\n};\n\`\`\`\nM 个族 × N 个产品 = M×N 个 override。ConcreteFactory 用 typelist 一次生成，省全部手写。\n\n3. 一致性维护：新增产品类型时，传统写法要改抽象接口 + 所有具体工厂（每个加一个 Make 方法），违反开闭原则。typelist 版本只需在两个 typelist 各加一项，所有工厂自动更新。\n\n代价：\n1. 编译时确定：typelist 是编译时结构，产品类型和族都必须编译时已知，无法运行时动态加。\n2. 模板膨胀：每个工厂组合生成独立代码，编译时间和二进制体积增长。\n3. 可读性：typelist 语法晦涩，新人看 ConcreteFactory<...> 模板参数不如看显式 override 直观，调试栈也难读。\n4. 编译错误：模板错误信息冗长，typelist 长度不匹配时报错难定位。\n5. 类型对应脆弱：抽象基类 typelist 和具体类 typelist 顺序必须严格一一对应，错位会编译错或行为错。\n\n值得用的场景：\n- 产品类型多（N 大）、族多（M 大），手写 M×N override 量巨大 → typelist 收益显著。\n- 产品族在编译时完全确定，无需运行时扩展 → typelist 限制不构成问题。\n- 团队能接受模板复杂度，且有测试覆盖类型对应关系。\n\n不值得的场景：产品类型少（N=2-3）、族少（M=2-3）→ 手写更直观；需要运行时动态加产品/族 → typelist 做不到。现代 C++ 可用变参模板 + 折叠表达式替代 Loki typelist，语法更友好，但思想一致。`,
    tags: ["样板代码", "typelist", "代价", "适用场景"],
  },
  {
    id: "mcd-abstract-factory-4",
    chapter: "mcd-abstract-factory",
    level: 4,
    question: `抽象工厂与对象工厂如何协作？现代 C++（变参模板、概念、DI）下如何重新实现？还该不该用 Loki 版本？`,
    answer:
      `抽象工厂与对象工厂的协作：\n\n1. 抽象工厂定义「创建一族产品」的接口，每个 Make 方法本质是一个「针对单一产品类型的对象工厂」的特化。ConcreteFactory 内部可委托给多个对象工厂实现：MakeButton() 委托给 buttonFactory.CreateObject(\"Motif\")。\n\n2. Loki 的 ConcreteFactory 本质是「用 typelist 把 N 个对象工厂的 CreateObject 调用打包成 N 个 Make 方法」。每个 Make 方法对应一个产品类型，内部 new 对应具体类——相当于 N 个单产品对象工厂的集合。\n\n3. 协作模式：抽象工厂管「族一致性」（保证所有 Make 返回同一风格），对象工厂管「单产品多态」（同一产品类型的多派生）。二者组合既保证族统一又支持单产品扩展。\n\n现代 C++ 重新实现：\n\n1. 变参模板替代 typelist：C++11 变参模板 \`template<typename... Products>\` 比 Loki 的 TYPELIST_3 宏更自然，折叠表达式可遍历参数包生成接口。\n\n2. 概念约束：C++20 概念可约束「Products 都派生自某基类」「ConcreteProducts 与 Products 一一对应」，把 Loki 的运行时或编译时弱检查升级为概念强约束，错误信息更清晰。\n\n3. constexpr if + 折叠表达式：可在编译时为每个产品生成 Make 方法实现，比 Loki 的 GenScatterHierarchy 继承链更简洁。\n\n4. 智能指针返回：Make 方法返回 unique_ptr<Base> 而非裸指针，配合 make_unique，避免内存泄漏。\n\n5. DI 容器集成：现代 C++ 倾向用 DI 容器（如 boost.di）管理对象创建，抽象工厂可作为 DI 容器内的「工厂提供者」，把族一致性交给容器配置。\n\n6. Lambda + std::function：简单场景用 \`std::map<TypeId, std::function<unique_ptr<Base>()>>\` 代替模板工厂，运行时灵活，编译简单。\n\n还该不该用 Loki 版本：\n- 不该直接用 Loki：C++03 风格，裸指针、宏 typelist、继承链复杂，与现代风格不符。\n- 该学 Loki 的设计思想：typelist 自动生成接口、ConcreteFactory 一一对应、Policy 化创建操作——这些思想用变参模板 + 概念重新实现更好。\n- 生产代码：产品族固定且少 → 手写抽象工厂 + 智能指针最清晰；产品族多且编译时确定 → 变参模板生成，参考 Loki 思路但用现代语法；需运行时动态 → DI 容器或 map + function。\n- Loki 是「用 C++03 模板元编程实现设计模式自动化」的教科书，读它能彻底搞懂模板元编程与设计模式的结合，但生产用现代 C++ 重写。`,
    tags: ["抽象工厂", "对象工厂", "变参模板", "概念", "DI", "现代对比"],
  },
];
