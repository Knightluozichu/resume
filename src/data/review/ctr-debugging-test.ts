import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 调试与优化测试复习题 */
export const ctrDebuggingTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-debugging-test-1",
    chapter: "ctr-debugging-test",
    level: 1,
    question: "GDB 中 `break`、`run`、`next`、`step`、`continue`、`print`、`backtrace` 各自的作用是什么？`next` 与 `step` 的区别？",
    answer:
      "GDB 常用命令：\n- `break`（缩写 b）：设断点。如 `break main`、`break file.cpp:42`、`break func if x>0`（条件断点）。\n- `run`（r）：启动被调试程序，遇到断点停下。\n- `next`（n）：单步执行，不进入函数内部（step over）。遇到函数调用把整个调用当一步执行完。\n- `step`（s）：单步执行，进入函数内部（step into）。遇到函数调用会跳到函数体第一行。\n- `continue`（c）：从当前断点继续执行直到下一个断点或程序结束。\n- `print`（p）：打印变量/表达式的值。如 `print x`、`print arr[3]`、`print *ptr@5`（打印 5 个元素）。\n- `backtrace`（bt）：打印当前调用栈，显示从 main 到当前停点的函数调用链，定位「怎么走到这里」。\n\nnext 与 step 的区别：next 遇函数调用不进入（跨过整个调用），step 遇函数调用会进入函数体逐行执行。调试自己代码的逻辑时多用 next 顺流程走；想钻进某函数看其内部行为时用 step。配合 finish（执行到当前函数返回）可灵活控制钻入深度。\n\n补充常用：`watch`（变量变化时停下）、`info locals`（看局部变量）、`up/down`（在调用栈层间移动）、`set var x=5`（改变量值测试分支）。",
    tags: ["GDB", "断点", "单步", "调用栈", "next", "step"],
  },
  {
    id: "ctr-debugging-test-2",
    chapter: "ctr-debugging-test",
    level: 2,
    question: "Valgrind 的 Memcheck 能检测哪些内存错误？AddressSanitizer（ASan）相比 Memcheck 有何优劣？两者各自适合什么场景？",
    answer:
      "Valgrind Memcheck 能检测的内存错误：\n1. 内存泄漏（definitely lost / indirectly lost / still reachable / possibly lost）。\n2. 越界读写（heap block overflow/underflow、栈越界部分支持）。\n3. 释放后使用（use after free）。\n4. 未初始化值使用（条件跳转或输出依赖未初始化内存）。\n5. 重复释放（double free）。\n6. 不匹配的 malloc/new/delete/free（如 new 配 free）。\n7. 非法读写（访问已释放或未分配区域）。\n\nASan 相比 Memcheck 的优劣：\n优势：\n- 开销小：约 2 倍减速 + 内存膨胀，而 Memcheck 约 10-20 倍减速。ASan 可在 CI/日常开发常开。\n- 检测越界更精准：ASan 在每块内存加红区（redzones），栈/堆/全局越界都能抓，且报错带调用栈和「这里分配/这里释放」的关联信息。\n- 集成简单：编译期 `-fsanitize=address` 即可，无需外部运行时，跨平台。\n劣势：\n- 需重新编译：ASan 是编译期插桩，必须用 ASan 重编全部代码；Memcheck 是运行时二进制翻译，不用重编。\n- 泄漏检测稍弱：ASan 的泄漏检测（LSan）不如 Memcheck 细致分类（lost 种类）。\n- 不检测未初始化使用（那是 MSan 的职责），不检测线程问题（那是 TSan）。\n\n各自适合场景：\n- ASan：日常开发、CI 流水线、单元测试常开，快速抓越界/use-after-free。需要重编但开销可接受。\n- Memcheck：不方便重编（第三方二进制）、需要详细泄漏分析、需要检测未初始化值的场景。开发期深入排查用。\n- 实践：CI 常开 ASan 跑测试；上线前用 Memcheck 做一次全量泄漏扫描。两者互补，配合 MSan（未初始化）、TSan（数据竞争）、UBSan（未定义行为）组成完整卫生检查。",
    tags: ["Valgrind", "Memcheck", "AddressSanitizer", "ASan", "内存错误", "性能开销"],
  },
  {
    id: "ctr-debugging-test-3",
    chapter: "ctr-debugging-test",
    level: 3,
    question: "性能剖析（profiling）的「采样」与「插桩」两种方式有何区别？`perf` 属于哪种？为什么「先测后优」是性能优化的铁律？",
    answer:
      "采样与插桩两种剖析方式：\n- 采样（sampling）：周期性打断程序、记录当前调用栈（如每 10ms 采一次），统计各函数出现在栈顶的次数作为「热点」。优点：开销小且稳定（与运行时长无关，不改变程序行为）、无需重编、可分析生产环境。缺点：精度受采样频率限制，短函数可能采不到、时间偏统计性。代表：perf、gprof（部分）、Instruments 采样模式。\n- 插桩（instrumentation）：在函数入口/出口插入计时代码，精确记录每个函数调用次数和耗时。优点：精确到每次调用、能拿到调用次数。缺点：开销大（尤其高频小函数）、改变程序行为（使小函数变慢、影响缓存）、需重编或链接运行时。代表：gprof 插桩模式、Google gperftools CPU profiler（采样+插桩混合）、编译期 -pg。\n\nperf 属于采样：基于硬件性能计数器或软件定时器采样，无需重编，开销小，是 Linux 上首选的低侵入剖析工具。`perf record` 采样、`perf report` 看热点、`perf stat` 看硬件计数器（缓存命中率、分支预测失败等）。\n\n「先测后优」是铁律的原因：\n1. 直觉常错：程序员对热点的猜测大多不准，优化非热点等于白费力气甚至让代码变复杂。Amdahl 定律——只有优化占比最大的部分才有显著收益。\n2. 防止过度优化：过早优化让代码可读性变差，且优化的可能根本不是瓶颈。先写出正确清晰的代码，再测出瓶颈针对性优化。\n3. 量化收益：剖析给出「这个函数占 40%」的数据，优化后重新剖析验证是否真的下降，避免「感觉快了」的自欺。\n\n流程：用 profiling 定位 top 热点 → 针对性优化（算法/数据结构/缓存友好性）→ 重新 profiling 验证收益 → 满意为止。优化的顺序应是「算法复杂度 > 数据布局/缓存 > 微优化（如位运算）」。",
    tags: ["性能剖析", "采样", "插桩", "perf", "先测后优", "Amdahl"],
  },
  {
    id: "ctr-debugging-test-4",
    chapter: "ctr-debugging-test",
    level: 4,
    question: "程序在 Release 下偶发崩溃、Debug 下正常，你会按什么思路排查？请结合编译器优化、未定义行为、内存问题说明，并给出用 ASan + GDB 定位的步骤。",
    answer:
      "Release 偶发崩溃而 Debug 正常的排查思路——这类问题根因常是「被优化放大/暴露的 UB 或内存错误」，因为 Debug 不优化、变量有初值、断言开着，掩盖了问题；Release 优化后假设「无 UB」做激进变换，把隐患变成崩溃。\n\n可能根因：\n1. 未定义行为被优化放大：如未初始化变量（Debug 下可能被填 0，Release 下是栈垃圾）、有符号溢出（Debug 不优化看似正常，Release 假设不溢出删分支）、违反严格别名（Strict Aliasing，优化后读写顺序错乱）。\n2. 内存问题：use-after-free、越界（Debug 下内存布局宽松、有红区 padding，Release 紧凑布局让越界立刻踩到关键数据）、悬空引用。\n3. 时序/并发：Release 跑得快暴露竞争（Debug 慢掩盖）。\n4. 断言被 NDEBUG 关闭：Release 下 assert 变空，本应被断言拦的非法状态继续执行崩溃。\n5. 内联/优化改变栈帧：优化后函数被内联或重排，对栈/对象生命周期的错误假设暴露。\n\n用 ASan + GDB 定位的步骤：\n1. 用 Release 配置 + ASan 重编：`-O2 -fsanitize=address -g`。保留优化以复现，加 ASan 抓内存错误，加 -g 保留调试信息。运行复现，ASan 多数情况会立即报出越界/use-after-free 及调用栈、分配/释放点。\n2. 若 ASan 未抓到（非内存错误，是纯 UB）：换 UBSan `-fsanitize=undefined` 抓有符号溢出、空指针解引用、违反别名等 UB。UBSan 能在 UB 发生时即报错定位。\n3. 若仍复现困难（偶发、需特定时序）：用 GDB 跑 Release+(-g) 版本，`run` 复现，崩溃时 `backtrace` 看调用栈，`frame N` 切到崩溃帧，`print` 检查可疑变量。配合条件断点、watchpoint 缩小范围。\n4. 多线程竞争：加 TSan `-fsanitize=thread` 跑，报数据竞争的读写位置与两个线程的调用栈。\n5. 二分定位：若以上都不直接命中，用 git bisect 找引入崩溃的提交，或用日志/断点二分缩小触发区间。\n\n核心原则：Release 偶发崩溃优先怀疑 UB 与内存错误，工具顺序是 ASan（内存）→ UBSan（UB）→ TSan（并发）→ GDB 手动，且要在「保留优化的配置」下复现，纯 Debug 复现不出来。修完务必用对应 sanitizer 回归验证。",
    tags: ["Release 崩溃", "编译器优化", "未定义行为", "ASan", "UBSan", "TSan", "GDB", "综合排查", "二分定位"],
  },
];
