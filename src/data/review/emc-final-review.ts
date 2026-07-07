import type { ReviewQuestion } from "./types";

/** Effective Modern C++ 全书串联总复习题 */
export const emcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "emc-final-review-1",
    chapter: "emc-final-review",
    level: 1,
    question: "用一句话概括 Effective Modern C++ 四大板块各自的核心目标。",
    answer:
      "1. 类型推导与 auto（条款 1-6）：让推导为所用，但看得清类型、避开代理类型陷阱。\n2. 智能指针与资源管理（条款 7-22）：用对象和智能指针把资源生命周期交给类型系统，确定性释放。\n3. 移动语义与转发（条款 23-30）：用右值引用与完美转发让资源高效转移而非拷贝。\n4. 并发与其他（条款 31-42）：用 Lambda 与并发 API（task/atomic/future）安全地写多线程与收尾优化。\n\n一条主线：从「读懂类型」到「管好资源」到「搬好资源」到「并发协作」，每一层在前一层上做更高级的组合。",
    tags: ["总复习", "四大板块", "主线"],
  },
  {
    id: "emc-final-review-2",
    chapter: "emc-final-review",
    level: 2,
    question:
      "「auto 优先」与「decltype(auto) 透传」「显式类型初始化惯用法」三者如何配合使用？",
    answer:
      "三者配合的决策树：\n\n1. 默认用 auto（条款 5）：绝大多数变量声明用 auto，避免冗长拼写和类型截断。`auto it = m.begin();` `auto p = make_unique<Widget>();`。\n\n2. 需要透传引用性时用 decltype(auto)（条款 3）：当变量要精确保留实参的引用与 cv（如转发返回类型、模板内的中间变量），用 `decltype(auto) x = expr;` 走 decltype 规则。`template<typename C, typename I> decltype(auto) at(C& c, I i) { return c[i]; }` 保留 T&。\n\n3. auto 推出代理类型时用显式类型初始化惯用法（条款 6）：当 expr 返回的是代理类型（vector<bool>::reference 等），用 `auto x = static_cast<TargetType>(expr);` 强制 auto 推导出目标类型，避免悬空。\n\n配合逻辑：先 auto；若发现引用性被丢（返回拷贝而非引用）升级 decltype(auto)；若发现代理类型陷阱加显式 cast。三者不是对立，而是按场景分层选用的工具。",
    tags: ["总复习", "auto", "decltype(auto)", "显式类型初始化", "配合"],
  },
  {
    id: "emc-final-review-3",
    chapter: "emc-final-review",
    level: 3,
    question:
      "把 std::move 与 std::forward 放在一起对比：各是什么 cast、用在哪、为什么不能混用？",
    answer:
      "对比表：\n\n| 维度 | std::move | std::forward |\n|---|---|---|\n| 本质 | 无条件右值 cast | 有条件右值 cast |\n| 实现 | static_cast<T&&>(x) | static_cast<T&&>(x) 仅当 T 推为右值时才转右值 |\n| 用在 | 右值引用（确定右值） | 通用引用（需保持值类别） |\n| 触发 | 总是转右值 | 仅当实参原本是右值才转右值 |\n\n不能混用的原因：\n- 在通用引用上用 std::move：会把左值实参也强行转右值，移动掉本不该移动的对象，导致悬空或意外修改。这是真实 bug。\n- 在右值引用上用 std::forward：通常不出错（右值引用确实该转右值），但需写模板参数 `forward<Widget>(w)`，啰嗦易错，不如 move 直接。\n\n口诀（条款 25）：右值引用用 move，通用引用用 forward。move 是「确定是右值，无条件转」，forward 是「不确定左右值，按推导有条件转」。\n\n唯一例外：函数返回局部变量时，`return std::move(local);` 往往有害（阻止 RVO），应直接 `return local;` 让编译器做返回值优化。",
    tags: ["总复习", "std::move", "std::forward", "右值引用", "通用引用", "对比"],
  },
  {
    id: "emc-final-review-4",
    chapter: "emc-final-review",
    level: 4,
    question:
      "若要给一个刚从 C++98 迁移到 C++14 的团队列出 5 条最高优先级的现代 C++ 准则，你会选哪 5 条？说明理由。",
    answer:
      "5 条最高优先级准则（覆盖安全、正确、性能、并发）：\n\n1. 用智能指针取代裸 new/delete（条款 18-21）：unique_ptr 默认、shared_ptr 共享、make 函数优先。理由：这是从 C++98 手动管理到确定性释放的最大跃迁，直接消灭一大类内存泄漏与异常安全问题，迁移成本最低、收益最高。\n\n2. 默认用 auto 声明变量，警惕代理类型（条款 5-6）：理由：现代 C++ 推导类型无处不在，auto 既减冗余又防类型截断，但必须配合显式类型初始化惯用法防 vector<bool> 等代理类型陷阱。这是一条「立竿见影提升代码质量」的准则。\n\n3. 移动语义 + noexcept + 不假设移动（条款 23、14、29）：理由：移动语义是 C++11 的性能红利，但要标 noexcept 让容器扩容敢于用移动，且不轻信移动一定廉价/发生。这条决定性能关键路径是否真的提速。\n\n4. 并发优先 task 而非 thread，thread 析构必 unjoinable（条款 35、37）：理由：多线程是新代码的高发事故区。task-based（async/future）比裸 thread 安全得多；thread 析构必须 unjoinable 避免 std::terminate。这条直接关系到程序不崩溃。\n\n5. atomic 管并发、volatile 管特殊内存，绝不混用（条款 40）：理由：C++98 背景的工程师常误以为 volatile 能做并发（受其他语言影响），这是 C++ 最危险的误区之一。明确二者职责，是多线程正确性的基础。\n\n这 5 条覆盖资源、类型、性能、并发四个维度，迁移后立即落地能消除最常见的现代 C++ 误用，是性价比最高的起点。其余条款（Lambda 捕获、完美转发、emplace 等）可在团队适应后再逐步引入。",
    tags: ["总复习", "迁移", "优先级", "智能指针", "auto", "移动", "并发"],
  },
];
