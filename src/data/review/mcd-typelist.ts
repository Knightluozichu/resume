import type { ReviewQuestion } from "./types";

/** Modern C++ Design Typelist 复习题 */
export const mcdTypelistQuestions: ReviewQuestion[] = [
  {
    id: "mcd-typelist-1",
    chapter: "mcd-typelist",
    level: 1,
    question: `Typelist 是什么？它的递归结构如何定义？NullType 起什么作用？`,
    answer:
      `Typelist 是一个「类型级链表」——把若干类型在编译期串成一条链，用模板递归定义：\n\`\`\`cpp\nstruct NullType {};  // 链尾哨兵\n\ntemplate <class H, class T>\nstruct Typelist {\n  typedef H Head;\n  typedef T Tail;\n};\n\`\`\`\n一个三类型链 \`TYPELIST(int, double, string)\` 展开为：\n\`\`\`\nTypelist<int, Typelist<double, Typelist<string, NullType>>>\n\`\`\`\n\nNullType 的作用是链尾哨兵：递归算法遇到 NullType 就终止，相当于运行时链表的 nullptr。没有它递归无法收敛。\n\n关键点：Typelist 不存在于运行时——它没有数据成员、不产生对象，纯粹是编译期的类型记号，供模板元编程在类型层面遍历、查询、增删。\`TYPELIST(a, b, c)\` 是用宏展开成嵌套 Typelist 的便捷写法。`,
    tags: ["Typelist", "递归模板", "NullType"],
  },
  {
    id: "mcd-typelist-2",
    chapter: "mcd-typelist",
    level: 2,
    question: `Length、TypeAt、Append、Erase 这些编译时操作如何用模板特化递归实现？请以 Length 和 TypeAt 为例说明。`,
    answer:
      `思路：每个操作定义为模板，用「递归实例化 + 特化终止」实现，结构与运行时链表算法一一对应。\n\nLength——数链表长度：\n\`\`\`cpp\ntemplate <class TList> struct Length;\n// 递归情形：长度 = 1 + 尾部长度\ntemplate <class H, class T>\nstruct Length<Typelist<H, T>> {\n  enum { value = 1 + Length<T>::value };\n};\n// 终止情形：空链长度 0\ntemplate <>\nstruct Length<NullType> {\n  enum { value = 0 };\n};\n\`\`\`\n\`Length<TYPELIST(int,double,string)>::value\` 编译期算出 3。\n\nTypeAt——取第 i 个类型：\n\`\`\`cpp\ntemplate <class TList, unsigned int i> struct TypeAt;\ntemplate <class H, class T>\nstruct TypeAt<Typelist<H, T>, 0> {\n  typedef H Result;  // 第 0 个就是 Head\n};\ntemplate <class H, class T, unsigned int i>\nstruct TypeAt<Typelist<H, T>, i> {\n  typedef typename TypeAt<T, i-1>::Result Result;  // 往尾走 i-1 步\n};\n\`\`\`\n\`TypeAt<TYPELIST(int,double,string), 1>::Result\` 即 double。\n\nAppend/Erase 同理：Append 递归走到 NullType 处接上新节点；Erase 递归匹配要删的类型并跳过。所有计算都在编译期完成，运行时零开销。`,
    tags: ["Typelist", "Length", "TypeAt", "模板特化"],
  },
  {
    id: "mcd-typelist-3",
    chapter: "mcd-typelist",
    level: 3,
    question: `Typelist 如何实现「编译时线性化遍历」？模板递归实例化的代价是什么？有没有办法控制其深度？`,
    answer:
      `编译时线性化遍历：用模板递归对 Typelist 每个类型实例化一段代码，相当于把「运行时 for 循环」翻译成「编译时递归实例化」。常见手法是带一个「操作模板」沿链推进：\n\`\`\`cpp\ntemplate <class TList, template <class> class Unit>\nstruct ForEach;\ntemplate <class H, class T, template <class> class Unit>\nstruct ForEach<Typelist<H, T>, Unit> {\n  static void Do() {\n    Unit<H>::DoSomething();      // 处理当前 Head\n    ForEach<T, Unit>::Do();      // 递归处理 Tail\n  }\n};\ntemplate <template <class> class Unit>\nstruct ForEach<NullType, Unit> {\n  static void Do() {}  // 终止\n};\n\`\`\`\n调用 \`ForEach<TYPELIST(int,double,string), MyUnit>::Do()\` 会依次展开 \`MyUnit<int>\`、\`MyUnit<double>\`、\`MyUnit<string>\` 的处理。\n\n模板递归实例化的代价：\n1. 编译时间随链长线性甚至指数增长——每个递归层生成一份模板实例，编译器要实例化、类型检查、代码生成。\n2. 编译器对递归深度有上限（如 1024），超深会报错。\n3. 错误信息晦涩——一层层模板展开后报错难以定位。\n\n控制深度的手段：\n- 用宏分块、用线性化手法（如 Loki 的 \`TL::Seq\`）减少嵌套层数。\n- 现代 C++ 用可变参数模板 \`template <class... Ts>\` + 折叠表达式取代手写递归，编译器原生支持、深度更友好。\n- 链很长时可分段处理，或把部分计算挪到运行时。`,
    tags: ["Typelist", "线性化遍历", "递归实例化", "编译时间"],
  },
  {
    id: "mcd-typelist-4",
    chapter: "mcd-typelist",
    level: 4,
    question: `Typelist 在 Loki 中如何支撑 SmartPtr、对象工厂、抽象工厂等组件？编译时类型操作的边界在哪里？`,
    answer:
      `Typelist 是 Loki 多个组件的「类型级数据骨架」：\n\n1. 广义仿函数 Functor：用 Typelist 表示参数类型列表 \`Functor<R, TYPELIST(int,double)>\`，内部据此生成 \`operator()(int,double)\`，实现类型擦除时按签名匹配。没有 Typelist 就无法在类型层面表达「一组参数」。\n\n2. 对象工厂：基于 typelist 可批量注册——\`GenFactory<TYPELIST(Button,Dialog,Menu>>\` 用线性化遍历为每个类型生成注册代码，免去手写 N 个 Register。\n\n3. 抽象工厂：\`AbstractFactory<TYPELIST(Wall,Door,Roof)>\` 用 Typelist 递归展开，自动生成 \`MakeWall()\`/\`MakeDoor()\`/\`MakeRoof()\` 三个接口；ConcreteFactory 同样据 typelist 生成对应实现。一份类型列表驱动整套接口与实现。\n\n4. SmartPtr：虽主用 Policy，但转换策略、多态链等也借助 Typelist 表达「一组可转换目标类型」。\n\n编译时类型操作的边界：\n- Typelist 只能在编译期处理「类型」，不能处理运行时值；类型集合在编译后固定，无法运行时增删。\n- 链长受编译器递归深度与编译时间限制，超长链不现实。\n- 类型操作的结果仍是类型（或编译期常量），要落地成运行时行为仍需实例化具体代码。\n- 现代 C++ 的可变参数模板、折叠表达式、concepts 在更高层面提供了等价能力，Typelist 是这些特性的「手写前身」。边界在于：Typelist 把「类型当数据」做编译期算法，凡能用类型表达的需求都能做，但运行时动态性必须另寻手段（如类型擦除、运行时注册表）。`,
    tags: ["Typelist", "Loki", "抽象工厂", "编译时边界"],
  },
];
