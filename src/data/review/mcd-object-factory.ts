import type { ReviewQuestion } from "./types";

/** Modern C++ Design 对象工厂复习题 */
export const mcdObjectFactoryQuestions: ReviewQuestion[] = [
  {
    id: "mcd-object-factory-1",
    chapter: "mcd-object-factory",
    level: 1,
    question: "对象工厂要解决什么问题？Register 与 CreateObject 各做什么？",
    answer:
      "问题：面向对象程序常需要「根据字符串/标识符动态创建对应类型的对象」——如读配置文件根据 \"Button\" 创建按钮、根据消息类型创建消息处理器。但 C++ 没有反射，`new \"Button\"()` 不合法，必须有一套「标识符 → 构造函数」的映射机制。这就是对象工厂要解决的：把「用类型名动态构造对象」从语言缺失能力变成库提供能力。\n\nRegister（注册）：\n把一个「标识符 → 创建函数」对存进工厂的内部映射表。例如 `factory.Register(\"Button\", []{ return new Button; });`。创建函数通常是个返回基类指针的 lambda 或函数对象。Register 在程序初始化时调用，建立完整映射表。\n\nCreateObject（创建）：\n根据标识符查映射表，调用对应的创建函数，返回新对象的基类指针。例如 `Widget* w = factory.CreateObject(\"Button\");`。调用者拿到基类指针，按多态使用。\n\n协作流程：\n1. 启动时 Register 所有支持的类型 → 建立映射表。\n2. 运行时 CreateObject(标识符) → 查表构造。\n3. 工厂内部用 `std::map<string, CreatorFunc>` 存映射，CreatorFunc 是 `Base* (*)()` 类型的函数指针或 functor。\n\n价值：解耦「调用方」与「具体类型」——调用方只认基类接口和字符串标识符，新增类型只需 Register 一条，不改正文代码。这是开闭原则的经典实现。",
    tags: ["对象工厂", "Register", "CreateObject", "动态创建"],
  },
  {
    id: "mcd-object-factory-2",
    chapter: "mcd-object-factory",
    level: 2,
    question: "GenFactory 如何用 typelist 自动生成工厂？相比手写工厂省了什么？",
    answer:
      "GenFactory（通用工厂）思路：\nLoki 用 typelist 把「一族派生类型」作为模板参数，自动生成能创建这族里任意类型的工厂。\n\n```cpp\n// ProductList 是 typelist：Button, Slider, Checkbox, ...\nGenFactory<Widget, TYPELIST_3(Button, Slider, Checkbox)> factory;\n```\n\n自动生成过程：\n1. GenFactory 递归遍历 typelist，为每个类型生成一个「创建函数」（`new Derived` 包装成返回 Base* 的函数）。\n2. 把每个类型映射到一个整数标识符（在 typelist 中的索引）。\n3. CreateObject(id) 按索引查到对应创建函数并调用。\n\n相比手写工厂省了什么：\n1. 省去手写一堆 Register 调用——typelist 把派生类型列出来，GenFactory 自动注册，新增类型只需在 typelist 加一项。\n2. 省去手写 switch-case 或 if-else 链——编译器递归实例化生成对应分支。\n3. 省去标识符管理——用 typelist 索引作标识符，编译时确定，无字符串拼写错误。\n4. 类型安全——typelist 里的类型在编译期检查，传错类型立刻报错。\n\n代价：\n1. 所有支持的类型必须在编译时确定（typelist 是编译时结构），运行时新增类型不支持（不像字符串工厂能动态 Register）。\n2. 标识符是整数索引，不如字符串可读，调试时不直观。\n3. 模板膨胀——每个类型组合生成一份工厂代码。\n\n适用：派生类型族固定且编译时已知的场景（如 GUI 控件、消息类型）。运行时动态注册场景仍需手写字符串工厂。",
    tags: ["GenFactory", "typelist", "自动生成", "编译时"],
  },
  {
    id: "mcd-object-factory-3",
    chapter: "mcd-object-factory",
    level: 3,
    question: "对象工厂如何支持克隆（原型模式）？对象工厂与抽象工厂有何区别？",
    answer:
      "对象工厂支持克隆（原型模式）：\n基本工厂只能「无参构造」——CreateObject 用默认构造函数造新对象。但很多场景需要「复制现有对象」——如复制一个配置好的模板对象。Loki 工厂扩展支持克隆：\n\n1. 注册原型：`factory.Register(\"Button\", prototypePtr, &Button::Clone);`——存一个原型对象指针和它的 Clone 方法。\n2. 克隆创建：CreateObject 内部调用 `prototypePtr->Clone()`，返回原型的深拷贝。\n3. Clone 是虚函数：`virtual Widget* Clone() const = 0;` 每个派生类重写返回 `new Derived(*this)`。\n\n这样工厂既能「默认构造」也能「克隆原型」，原型本身可以预先配置好状态（如默认主题、默认尺寸的按钮），克隆出来的对象继承这些状态。\n\n对象工厂与抽象工厂的区别：\n\n| 维度 | 对象工厂 | 抽象工厂 |\n|---|---|---|\n| 粒度 | 单个产品（一个 Base，多个 Derived） | 产品族（多个相关产品系列） |\n| 接口 | CreateObject(id) → Base* | MakeA(), MakeB(), MakeC() 各返回不同基类 |\n| 标识 | 字符串/索引选类型 | 接口方法选产品 |\n| 用途 | 根据输入动态选一个类型 | 创建一族风格统一的产品 |\n| 新增 | Register 新类型即可 | 改接口（加新 Make 方法）影响所有具体工厂 |\n\n例子：\n- 对象工厂：根据 \"Button\"/\"Slider\" 创建一个 Widget。\n- 抽象工厂：创建一整套 UI 风格（Button + Scrollbar + Menu 全是 Motif 风格，或全是 Windows 风格）。\n\n关系：抽象工厂内部常用对象工厂实现——每个 Make 方法委托给一个对象工厂。Loki 的 AbstractFactory 用 typelist 自动生成一组 Make 接口，ConcreteFactory 用对象工厂实现这些接口，两者协作。",
    tags: ["克隆", "原型模式", "抽象工厂", "对象工厂", "对比"],
  },
  {
    id: "mcd-object-factory-4",
    chapter: "mcd-object-factory",
    level: 4,
    question: "对象工厂与现代 C++ 的依赖注入、反射、std::any 有何关系？现代 C++ 还该不该用 Loki 风格工厂？",
    answer:
      "与现代 C++ 的关系：\n\n1. 依赖注入（DI）：对象工厂本质是个「服务定位器」——调用方主动 CreateObject 拿对象，依赖隐藏在工厂里。DI 反过来——调用方声明依赖，容器注入。DI 更可测试、依赖更显式。现代 C++ 倾向 DI 而非工厂+服务定位。但工厂仍有用：DI 容器内部常用工厂模式创建对象，工厂是 DI 的实现细节。\n\n2. 反射：对象工厂是「手动模拟反射」——C++03 无反射，用 Register 表模拟「按名构造」。C++26 可能引入静态反射，届时可用反射自动生成工厂，无需手写 Register。在反射到来前，工厂仍是必要的运行时动态创建手段。\n\n3. std::any：std::any 是类型擦除的值容器，能存任意类型对象。工厂返回 Base* 用多态，std::any 用类型擦除——后者不要求共同基类，但取值要 any_cast，不如多态自然。工厂更适合「一族同基类对象」，any 更适合「异质值传递」，场景不同。\n\n4. std::make_unique / make_shared：现代 C++ 创建对象优先用 make 函数 + 智能指针，工厂的 CreateObject 应返回 unique_ptr<Base> 而非裸 Base*，避免内存泄漏。Loki 工厂是 C++03 风格返回裸指针，现代改写要包智能指针。\n\n现代 C++ 还该不该用 Loki 风格工厂：\n- 不该直接用 Loki：它是 C++03 产物，裸指针、无移动、无智能指针，与现代风格不符。\n- 该用工厂模式：动态创建场景仍需要工厂，但用现代写法——返回 unique_ptr、用 lambda 作 CreatorFunc、用 std::string_view 做标识符、配合 DI 容器。\n- 该学 Loki 的设计：typelist 自动注册、Policy 化创建策略、克隆支持，这些思想在现代 C++ 里用 constexpr/变参模板/概念重新实现更好，但思路一脉相承。\n- 反射到来前：手写工厂 + 注册表仍是运行时动态创建的主流方案，Loki 是这一思路的经典参考实现。\n\n一句话：工厂思想不朽，Loki 实现过时——学思想，用现代 C++ 重新实现。",
    tags: ["依赖注入", "反射", "std::any", "智能指针", "现代对比"],
  },
];
