import type { ReviewQuestion } from "./types";

/** Effective Modern C++ 全书学习地图复习题 */
export const emcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "emc-learning-map-1",
    chapter: "emc-learning-map",
    level: 1,
    question: "Effective Modern C++ 全书共多少条条款？分为哪几大板块？",
    answer:
      "全书共 42 条条款，分为四大板块：\n\n1. 类型推导与 auto（条款 1-6）：模板类型推导、auto 类型推导、decltype、查看推导类型、优先用 auto、显式类型初始化惯用法。\n2. 智能指针与资源管理（条款 7-22）：迈向现代 C++（花括号初始化、nullptr、别名、作用域枚举、deleted、override、noexcept、constexpr 等）与智能指针（unique_ptr、shared_ptr、weak_ptr、make 函数、Pimpl）。\n3. 移动语义与转发（条款 23-30）：move/forward、通用引用、引用折叠、完美转发失败案例。\n4. 并发与其他（条款 31-42）：Lambda 表达式、并发 API（thread/atomic/future）、emplace。\n\n记忆线索：推导奠基 → 资源管控 → 移动转发 → 并发收口。",
    tags: ["学习地图", "全书结构", "42 条条款"],
  },
  {
    id: "emc-learning-map-2",
    chapter: "emc-learning-map",
    level: 2,
    question:
      "Effective Modern C++ 与 Effective C++ 的关注点有何不同？为什么 Scott Meyers 要单独写一本「Modern」版本？",
    answer:
      "Effective C++（55 条）面向 C++98，核心是正确使用语言、资源管理（RAII）、类设计与模板基础。Effective Modern C++（42 条）面向 C++11/14，聚焦新标准带来的范式转变：\n\n1. 类型推导（auto、decltype、模板推导）——新标准让类型推导无处不在，但也更难一眼看出类型。\n2. 智能指针取代裸 new/delete——unique_ptr/shared_ptr/weak_ptr 让资源管理确定性更强。\n3. 移动语义与完美转发——右值引用、move、forward 让「零拷贝传递」成为可能。\n4. Lambda 与并发 API——闭包、thread、atomic、future 是全新的并发与函数式工具。\n\n写「Modern」版本是因为 C++11/14 引入的新特性（尤其类型推导、移动语义、并发）有大量新陷阱，旧准则不够用，需要一套专门针对现代特性的指导。",
    tags: ["Modern C++", "C++11/14", "范式转变"],
  },
  {
    id: "emc-learning-map-3",
    chapter: "emc-learning-map",
    level: 3,
    question:
      "推荐的阅读路径是什么？如果跳过「移动语义与转发」直接学「并发与其他」会有什么问题？",
    answer:
      "推荐路径：类型推导与 auto → 智能指针与资源管理 → 移动语义与转发 → 并发与其他 → 总复习。\n\n三阶段说明：\n\n1. 打基础（类型推导 + 智能指针）：先掌握 auto/decltype 的推导规则，再用智能指针建立确定性资源管理，这两块是现代 C++ 的「地基」。\n2. 学移动与转发：在资源管理基础上，理解右值引用、move、forward，掌握高效传递资源的手段。\n3. 进并发与其他：综合运用前面所有知识（Lambda 捕获涉及移动、并发涉及资源所有权），学习多线程与 emplace 等收尾优化。\n\n跳过「移动语义与转发」直接学并发的问题：\n- Lambda 的 init 捕获依赖 std::move，不懂移动语义就无法安全地把对象移入闭包。\n- 并发中跨线程传递资源常需 move 或 forward，不懂完美转发会写出多余拷贝或编译失败。\n- 条款 23-30 是后续并发章节的性能与正确性前提，跳过会让并发代码低效甚至错误。",
    tags: ["学习路径", "推荐顺序", "移动语义", "并发"],
  },
  {
    id: "emc-learning-map-4",
    chapter: "emc-learning-map",
    level: 4,
    question:
      "Effective Modern C++ 的 42 条条款之间存在怎样的递进逻辑？为什么说它是一条「从读类型到写并发」的能力链？",
    answer:
      "42 条条款构成一条「从读类型到写并发」的能力递进链，每一层都以前一层为基础：\n\n第一层：类型推导（条款 1-6）。auto/decltype/模板推导让你能读懂现代 C++ 代码里到处出现的推导类型——这是「读代码」的能力。\n\n第二层：资源管理（条款 7-22）。智能指针让资源生命周期确定性化——这是「管资源」的能力，建立在能读懂类型的基础上（如 shared_ptr<T> 的 T 由推导得出）。\n\n第三层：移动与转发（条款 23-30）。右值引用与 forward 让资源能高效转移而不拷贝——这是「搬资源」的能力，需要先会管资源（move 的前提是对象可析构、可置空）。\n\n第四层：并发与 Lambda（条款 31-42）。Lambda 捕获用 move、跨线程用 future 传递结果——这是「并发协作」的能力，把前几层的能力组合到多线程环境。\n\n递进逻辑：读类型 → 管资源 → 搬资源 → 并发协作。每一层都在前一层的能力上做更高级的组合。跳级会断层：不懂移动就无法写出高效的 Lambda 闭包捕获，不懂资源管理就无法保证线程安全。42 条准则就是这条能力链的每个关键节点。",
    tags: ["综合", "内在联系", "递进", "能力链"],
  },
];
