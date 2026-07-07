import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · 数据类型与变量复习题 */
export const eppDataTypesQuestions: ReviewQuestion[] = [
  {
    id: "epp-data-types-1",
    chapter: "epp-data-types",
    level: 1,
    question: "C++ 的内置类型分哪几大族？整型家族有哪些成员，它们的大小关系如何？",
    answer:
      "内置类型分四大族：整型、浮点、字符、布尔。\n\n整型家族成员：`short`、`int`、`long`、`long long`（每种还分 signed/unsigned）。\n\n大小关系（C++ 标准保证）：\n- `short` 至少 16 位\n- `int` 至少与 short 一样大\n- `long` 至少 32 位且不小于 int\n- `long long` 至少 64 位且不小于 long\n\n注意：标准只规定下限和大小关系，具体位数由实现决定。常见实现里 short=16、int=32、long=32（Windows）/64（Linux）、long long=64。要精确宽度用 `<cstdint>` 的 `int32_t`、`int64_t` 等。\n\n浮点族：`float`（通常 32 位）、`double`（通常 64 位）、`long double`（80 或 128 位）。字符族：`char`、`wchar_t`、`char16_t`、`char32_t`。布尔：`bool` 取 true/false。",
    tags: ["内置类型", "整型", "大小关系"],
  },
  {
    id: "epp-data-types-2",
    chapter: "epp-data-types",
    level: 2,
    question: "const 与 constexpr 有什么区别？什么时候该用 constexpr？",
    answer:
      "区别在「何时求值」：\n\n- `const`：表示运行期只读。值可以在运行时确定（如从文件读入的值存进 const 变量），一旦初始化不可再赋值。它是「不可变」的承诺，不保证编译期已知。\n\n- `constexpr`：表示编译期常量。值必须在编译时就能算出来，因此可用于需要编译期常量的场合（如数组长度、模板参数、case 标签）。\n\n什么时候用 constexpr：当你需要一个「编译期就知道的常量」时用 constexpr。它能用于数组大小 `int arr[constexpr_n];`、枚举、位域长度等。constexpr 比 const 更强——constexpr 一定是 const，但 const 不一定是 constexpr。\n\n推荐：能用 constexpr 就用，它把求值提前到编译期，既可能优化性能，又能在编译期做类型检查。只有值确实运行期才能确定时才退回 const。",
    tags: ["const", "constexpr", "编译期"],
  },
  {
    id: "epp-data-types-3",
    chapter: "epp-data-types",
    level: 3,
    question: "你声明 `int x = 3.14;` 编译通过但值变成 3，而 `int x{3.14};` 却编译报错，为什么？",
    answer:
      "这是初始化方式对「窄化转换」处理不同：\n\n1. `int x = 3.14;`（用 = 初始化）：发生隐式窄化转换，double 3.14 被截断成 int 3，编译器只给警告（甚至不警告），值悄悄丢失精度。\n\n2. `int x{3.14};`（用花括号列表初始化，C++11）：列表初始化禁止窄化转换，编译器检测到 double→int 会损失精度，直接报错，阻止你写出有隐患的代码。\n\n这是列表初始化的安全优势：它在不允许窄化的场合强制编译期检查，避免隐式截断带来的 bug。\n\n工程建议：优先用 `{}` 初始化基本类型，尤其在涉及浮点转整型、长整型转短整型时，让编译器帮你挡住精度丢失。等价且明确的场合（如 `int x = 0;`）用 = 也可，但混用要心中有数。\n\n类似地，`int x = {3.14};` 也会报错，因为等号加花括号仍是列表初始化语义。",
    tags: ["初始化", "窄化转换", "列表初始化"],
  },
  {
    id: "epp-data-types-4",
    chapter: "epp-data-types",
    level: 4,
    question: "综合分析：C++ 的类型系统为什么允许隐式转换（如 int→double、short→int），又同时提供列表初始化防窄化？这种「宽松 + 严格」并存的设计意图是什么？",
    answer:
      "设计意图是兼顾「C 兼容的便利」与「现代安全」：\n\n1. 隐式转换的历史与便利：C 允许整型提升（short→int）和算术转换（int→double），让 `3 + 0.14` 这类混合运算自然成立，免得每个表达式都写显式 cast。这是 C 语言简洁性的来源，C++ 继承以保兼容。\n\n2. 隐式转换的代价：它会在你不注意时丢精度（double→int 截断）、改变符号（unsigned 与 signed 混算）、甚至重构时悄悄改变行为。这些是真实 bug 来源。\n\n3. 列表初始化的补救：C++11 引入 `{}` 初始化，专门堵住「窄化」这一最危险的隐式转换，但不破坏已有的 = 初始化语义。这是「新代码用严格、旧代码继续工作」的渐进式安全策略。\n\n4. 整体哲学：C++ 不敢像 Rust 那样禁止所有隐式转换（会破坏海量 C 兼容代码），而是分层——基本类型转换保持宽松兼容 C，但在新写法（列表初始化、explicit 构造、强类型枚举）上提供严格选项。工程师的职责是：在新代码里主动选用严格机制，把宽松语义留给经过验证的旧代码。\n\n本质：C++ 在「不破坏兼容」与「提供安全」间走钢丝，给你选择权而非强制——这是它灵活也是它复杂的根源。",
    tags: ["综合", "类型系统", "隐式转换"],
  },
];
