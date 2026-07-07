import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · 控制语句复习题 */
export const eppControlStatementsQuestions: ReviewQuestion[] = [
  {
    id: "epp-control-statements-1",
    chapter: "epp-control-statements",
    level: 1,
    question: "C++ 的控制语句分哪两类？各有哪些成员？switch 为什么要用 break？",
    answer:
      "分两类：\n\n1. 分支结构：`if/else`（布尔条件二选一，可链式 else if）、`switch`（整型/枚举多路匹配）。\n\n2. 循环结构：`for`（计数循环，已知次数）、`while`（先判断后执行）、`do-while`（先执行后判断，至少跑一次）、`range-for`（C++11 范围循环，遍历容器）。\n\nswitch 要用 break 的原因：switch 的 case 是「标签」而非「块」，匹配到某个 case 后会一直往下执行，直到遇到 break 或 switch 结束——这叫「fall-through 穿透」。如果不写 break，匹配 case A 后会继续执行 case B、case C 的代码，导致意外行为。\n\n例外：若你确实想让多个 case 共享同一段代码，可故意省略 break（空 case 标签堆叠）。但绝大多数情况每个 case 末尾都要 break，漏写是经典 bug。C++17 的 `[[fallthrough]]` 属性可显式标注「故意穿透」以消除警告。",
    tags: ["控制语句", "switch", "break", "穿透"],
  },
  {
    id: "epp-control-statements-2",
    chapter: "epp-control-statements",
    level: 2,
    question: "range-for 与传统下标 for 循环相比有什么优势？它有什么限制？",
    answer:
      "优势：\n1. 简洁安全：`for (auto& x : vec)` 比 `for (size_t i=0; i<vec.size(); ++i) auto& x = vec[i];` 简洁得多，且不会写错下标边界（越界是经典 bug）。\n2. 不依赖下标：range-for 用迭代器遍历，适用于所有提供 begin()/end() 的容器（list、map、set 等无下标访问的容器也能用）。\n3. 意图明确：range-for 直接表达「遍历每个元素」，读者一眼明白意图，无需脑补下标逻辑。\n4. 配合 auto 自动推导元素类型，避免手写冗长类型名。\n\n限制：\n1. 拿不到下标：需要元素位置（索引）时还得用传统 for。\n2. 不能在遍历时增删元素：range-for 内部持迭代器，遍历中修改容器结构（push_back/erase）会使迭代器失效，行为未定义。需要边遍历边删要用迭代器 for + erase 返回值。\n3. 默认按值拷贝元素：写 `for (auto x : vec)` 会拷贝每个元素，大对象开销大；应写 `for (const auto& x : vec)` 只读引用，或 `for (auto& x : vec)` 可修改引用。\n\n关键习惯：遍历只读用 `const auto&`，要修改元素用 `auto&`，避免无谓拷贝。",
    tags: ["range-for", "迭代器", "遍历"],
  },
  {
    id: "epp-control-statements-3",
    chapter: "epp-control-statements",
    level: 3,
    question: "你写了一个 switch 语句，明明 case 值匹配了却「穿透」执行了下一个 case 的代码，怎么排查？",
    answer:
      "这是经典的「漏写 break」穿透 bug。排查步骤：\n\n1. 检查每个 case 末尾是否有 break：最常见原因是手滑漏写。逐个 case 核对，确认匹配分支后紧跟 break（或 return/throw/continue 等跳转语句）。\n\n2. 检查是否故意穿透但忘了标注：如果确实想让多个 case 共享代码，应把空 case 标签堆叠在有代码的 case 前，且用 C++17 `[[fallthrough]];` 显式标注消除警告。若没标注又被编译器警告忽略了，可能误以为是 bug。\n\n3. 检查 case 值是否真的匹配：switch 匹配的是「相等」，若 case 值与变量类型/值有细微差异（如 signed/unsigned、枚举底层值）可能匹配到 default 或意外分支。打印变量值确认。\n\n4. 检查有没有 default 误吞：若所有 case 都没匹配，会走 default。确认 default 的逻辑是否正确。\n\n5. 检查 case 里有没有隐藏的 goto：极少见但 case 内若有 goto 跳到别的标签，行为类似穿透。\n\n修法：补上漏掉的 break；若故意穿透加 `[[fallthrough]]` 注释意图。建议开启编译器 `-Wimplicit-fallthrough` 警告，让漏写 break 在编译期就报警。",
    tags: ["switch", "穿透", "排查"],
  },
  {
    id: "epp-control-statements-4",
    chapter: "epp-control-statements",
    level: 4,
    question: "综合分析：C++ 保留了 C 的 if/switch/for/while，又新增 range-for，为什么不直接淘汰传统循环？这对代码风格有什么指导？",
    answer:
      "不淘汰传统循环的原因：\n1. 语义不可替代：传统 for 能拿到下标、能控制步长（i+=2）、能反向遍历、能多变量联动（for(int i=0,j=n-1; i<j; ++i,--j)），这些 range-for 都做不到。\n2. 兼容性：海量 C/C++ 代码用传统循环，淘汰会破坏兼容，违背 C++ 「不破坏旧代码」原则。\n3. 底层控制：性能敏感场合需要手动控制迭代器递增方式（如跳过元素、提前终止），传统 for 更直接。\n\n代码风格指导：\n1. 默认用 range-for：纯遍历容器元素、不需要下标时，range-for 更安全简洁，应作首选。\n2. 需要下标用传统 for：要用索引访问（如同时遍历两个数组）、要步长控制、要反向遍历时，用传统 for。\n3. 边遍历边改结构用迭代器 for：要在遍历中 erase/push_back 时，用显式迭代器循环，配合 erase 返回值更新迭代器，避免 range-for 的迭代器失效陷阱。\n4. 避免在 range-for 里写复杂逻辑：range-for 的价值是简洁，若内部逻辑复杂到需要下标或跳出，说明该换传统循环。\n\n本质：range-for 是「常见场景的语法糖」，传统循环是「通用底座」。两者互补而非互斥，按场景选用——简单遍历用糖，复杂控制回到底座。这种「提供便利但不强制」正是 C++ 的设计哲学。",
    tags: ["综合", "range-for", "代码风格"],
  },
];
