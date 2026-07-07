import type { ReviewQuestion } from "./types";

/** Modern C++ Design 广义仿函数复习题 */
export const mcdGeneralizedFunctorQuestions: ReviewQuestion[] = [
  {
    id: "mcd-generalized-functor-1",
    chapter: "mcd-generalized-functor",
    level: 1,
    question: "Functor 要统一哪三类可调用对象？为什么需要统一的封装？",
    answer:
      "Functor 要统一三类可调用对象：\n\n1. 普通函数：`void f(int);` 这种 C 风格函数指针。\n2. 仿函数（ functor class）：重载 `operator()` 的类对象，如 `struct Add { int operator()(int a, int b); };`。\n3. 成员函数指针绑定：`void (Widget::*mf)(int);` 配合一个对象实例调用。\n\n需要统一封装的原因：\n- 三类对象语法不同——函数指针直接调用 `f(x)`，仿函数 `obj(x)`，成员函数指针 `(obj.*mf)(x)`——把它们存进同一容器或作为同一回调参数很别扭。\n- 模板算法（如 std::for_each）虽然能接受任意可调用对象，但一旦要存储、延迟调用、跨线程传递，类型不统一就成了障碍（每种可调用对象类型都不同，无法放进同一个 `vector`）。\n- Functor 的目标：把任意可调用对象封装成「同一类型」的对象，对外暴露统一的 `operator()`，让回调、事件、命令模式能用统一接口处理三类来源。\n\n这正是 C++11 `std::function` 的前身思路——用类型擦除把异构可调用对象统一成一个值类型。",
    tags: ["广义仿函数", "Functor", "可调用对象", "类型擦除"],
  },
  {
    id: "mcd-generalized-functor-2",
    chapter: "mcd-generalized-functor",
    level: 2,
    question: "Functor 如何用 handle + impl 实现类型擦除？为什么不直接用模板？",
    answer:
      "类型擦除结构：\n\n1. Functor 是一个值类型 handle（外壳），内部持有一个抽象基类指针 `FunctorImpl*`。\n2. FunctorImpl 是抽象基类，声明纯虚 `operator()`，定义统一调用接口。\n3. 真正存储可调用对象的是 FunctorImpl 的派生模板类 `FunctorImplImpl<Fun, Args...>`，构造时把函数指针/仿函数/绑定后的成员函数指针存进去，重写 `operator()` 转发到被封装对象。\n4. Functor 的构造函数是模板，根据传入的可调用对象类型实例化对应的 FunctorImplImpl，存到 impl 指针。之后 Functor 对外只暴露固定类型，内部多态分发。\n\n为什么不直接用模板：\n- 模板会让 Functor 类型随被封装对象类型变化——`Functor<FuncTypeA>` 与 `Functor<FuncTypeB>` 是不同类型，无法放进同一容器、无法作为同一回调签名。\n- 类型擦除后，所有 `Functor<R(Args...)>` 是同一类型（签名相同即可），能存进 `vector<Functor<void(int)>>`，跨函数、跨线程传递。\n- 代价：一次虚函数调用 + 一次堆分配（FunctorImpl 存在堆上），换取类型统一。这是「用运行时多态换类型统一」的经典权衡。\n\n这正是 std::function 的实现原理：一个值类型外壳 + 一个 type-erased 的可调用对象包装。",
    tags: ["类型擦除", "FunctorImpl", "handle", "多态"],
  },
  {
    id: "mcd-generalized-functor-3",
    chapter: "mcd-generalized-functor",
    level: 3,
    question: "Functor 如何封装成员函数指针？如何实现参数绑定与链式调用？",
    answer:
      "成员函数指针封装：\n成员函数指针 `R (C::*mf)(Args...)` 不能直接调用，需要一个对象实例。Functor 提供辅助函数：\n```cpp\n// 把 obj 和 mf 绑成一个可调用对象\nFunctor<R(Args...)> f = Bind(obj, &C::method);\n```\n内部用一个绑定器 functor 持有 `obj`（指针或拷贝）和 `mf`，`operator()` 转发为 `(obj.*mf)(args...)`。这样成员函数就被包装成统一的 `Functor<R(Args...)>`。\n\n参数绑定：\nFunctor 支持 Bind 部分绑定参数——把 N 元函数的前 K 个参数固定成具体值，剩下 N-K 个留给后续调用。实现是一个「记下已绑参数 + 剩余参数占位」的 functor，`operator()` 把已绑参数和调用时传入的剩余参数合并转发给原可调用对象。这是 std::bind 的前身。\n\n链式调用（Functor 组合）：\n可以把多个 Functor 串成管线——前一个的输出作为后一个的输入：\n```cpp\nFunctor<int(int)> pipeline = f1 | f2 | f3;\n// 等价于 f3(f2(f1(x)))\n```\n实现是一个组合 functor 持有两个子 functor，`operator()` 把参数先喂给第一个、把结果喂给第二个。这让命令模式、数据处理管线能用统一接口拼装。\n\n关键：绑定与组合都是「用一个新 functor 包装旧 functor」，类型不变（都是 Functor<R(Args...)>），所以能任意嵌套——这正是函数式编程在 C++ 里的雏形。",
    tags: ["成员函数指针", "Bind", "参数绑定", "链式调用", "组合"],
  },
  {
    id: "mcd-generalized-functor-4",
    chapter: "mcd-generalized-functor",
    level: 4,
    question: "Loki Functor 与 C++11 std::function / std::bind 相比有何异同？现代 C++ 还该不该用 Loki Functor？",
    answer:
      "异同对比：\n\n相同点：\n- 都是类型擦除的统一可调用对象封装（handle + impl + 虚分发）。\n- 都能存函数指针、仿函数、成员函数绑定。\n- 都支持参数绑定（Loki Bind ↔ std::bind）和组合。\n- 都有一次堆分配 + 一次虚调用的代价。\n\n不同点：\n1. 语法：std::function 用 `std::function<R(Args...)>` 直接表签名，Loki Functor 用模板参数列表，更繁琐。\n2. 移动语义：std::function 支持 move（C++11），避免拷贝被封装对象；Loki 写于 C++98，只有拷贝，大对象封装代价高。\n3. SBO（小对象优化）：std::function 通常内置 SBO，小可调用对象直接存在 function 对象内，免堆分配；Loki 无 SBO，每次都堆分配 FunctorImpl。\n4. 占位符：std::bind 用 `_1, _2` 标准占位符，Loki 有自己的占位方案。\n5. 异常：std::function 空调用抛 std::bad_function_call，Loki 行为由实现定义。\n6. 标准化：std::function/bind 是 C++11 标准，全平台一致；Loki 是第三方库。\n\n现代 C++ 还该不该用 Loki Functor：\n- 不该。std::function 是 Loki Functor 思路的标准化版本，语法更好、支持移动、有 SBO、标准库原生。\n- Loki Functor 的价值在于「学习类型擦除原理」——读 Loki 源码能彻底搞懂 std::function 内部是怎么做的。\n- 现代 C++ 优先用 Lambda + std::function：Lambda 当场写可调用对象，std::function 存储/传递，比 Bind + Functor 更直观。Bind 在现代 C++ 里也基本被 Lambda 取代（Lambda 更易读、有时更高效）。\n- 唯一例外：在受限环境（无 C++11 编译器）下 Loki 仍有用，但这种场景已极少。",
    tags: ["std::function", "std::bind", "Lambda", "SBO", "现代对比"],
  },
];
