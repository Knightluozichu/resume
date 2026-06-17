/** 复习题库 · 管理线程（cc-managing-threads）。《C++ 并发编程实战》第2版 §2 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccManagingThreadsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-mt-1",
    chapter: "cc-managing-threads",
    level: 1,
    question: "`std::thread` 可以用哪三种「可调用对象」来启动一个新线程？",
    answer:
      "三种：① 普通函数（`std::thread t(f);`）；② 函数对象 / 仿函数（重载了 `operator()` 的类型的实例）；③ lambda 表达式（`std::thread t([]{ ... });`）。本质都是「给线程一件能调用执行的事去做」。",
    tags: ["std::thread", "可调用对象", "lambda"],
  },
  {
    id: "cc-mt-2",
    chapter: "cc-managing-threads",
    level: 1,
    question: "`join()` 和 `detach()` 分别是什么意思？用厨房比喻说。",
    answer:
      "`join()` = 会合：主线程停下来等子线程跑完，再继续（主厨等帮厨做完那道菜，两人会合）。`detach()` = 分离：让子线程脱离 `std::thread` 对象、在后台独立运行，主线程不再等它（主厨放养帮厨、自己先走）。一个 `std::thread` 二者必居其一，且只能做一次。",
    tags: ["join", "detach", "定义"],
  },
  {
    id: "cc-mt-3",
    chapter: "cc-managing-threads",
    level: 1,
    question: "`joinable()` 返回 true 表示什么？什么时候它会变成 false？",
    answer:
      "`joinable()` 返回 true 表示这个 `std::thread` 还「关联着一个尚未安顿的线程」——还没 join 也没 detach（默认构造的空 thread、或已经 join/detach/move 走的 thread 则为 false）。一旦对它成功调用了 `join()` 或 `detach()`，或它被移动走，`joinable()` 就变 false。",
    tags: ["joinable", "join", "detach"],
  },
  {
    id: "cc-mt-4",
    chapter: "cc-managing-threads",
    level: 1,
    question: "`std::thread` 能拷贝吗？能移动吗？这叫什么语义？",
    answer:
      "不能拷贝（拷贝构造和拷贝赋值被删除），但能移动——这叫 **move-only（只移动）**。因为一个 `std::thread` 独占地代表一个底层线程的「所有权」，拷贝会产生两个对象都指向同一个线程的歧义。要把线程交出去用 `std::move`。",
    tags: ["移动语义", "std::thread", "所有权"],
  },
  {
    id: "cc-mt-5",
    chapter: "cc-managing-threads",
    level: 1,
    question:
      "`std::thread::hardware_concurrency()` 和 `std::this_thread::get_id()` 各返回什么？",
    answer:
      "`hardware_concurrency()` 返回硬件能「真正并行」运行的线程数的提示（通常是 CPU 逻辑核数），用来决定开几个线程合适；它只是个提示，可能返回 0（信息不可用）。`get_id()` 返回当前线程的唯一标识 `std::thread::id`，可比较、可打印，用来区分/记录是哪个线程。",
    tags: ["hardware_concurrency", "thread::id", "get_id"],
  },
  {
    id: "cc-mt-6",
    chapter: "cc-managing-threads",
    level: 1,
    question: "什么是「最令人头疼的解析（most vexing parse）」？",
    answer:
      "C++ 的一条语法规则：凡是「能被解析成函数声明」的写法，编译器就优先把它当函数声明。`std::thread t(Task());` 看似用临时 `Task` 对象启动线程，实际被解析成「声明一个名叫 t、返回 `std::thread`、参数是个返回 `Task` 的函数指针」的函数——线程根本没启动。",
    tags: ["most vexing parse", "函数对象", "陷阱"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cc-mt-7",
    chapter: "cc-managing-threads",
    level: 2,
    question:
      "为什么创建了 `std::thread` 却既不 join 也不 detach，程序会崩溃？",
    answer:
      "因为 `std::thread` 析构时若仍 `joinable()`（还关联着一个没安顿的线程），它的析构函数会调用 `std::terminate()` 直接掐掉整个程序。这是标准刻意的设计：不允许「线程对象悄悄消失、底层线程却没人管」的模糊状态，逼你显式表态 join 还是 detach。",
    tags: ["析构", "std::terminate", "join", "detach"],
  },
  {
    id: "cc-mt-8",
    chapter: "cc-managing-threads",
    level: 2,
    question: "`thread_guard`（RAII 守卫）解决什么问题？它的核心是哪两段代码？",
    answer:
      "它解决「函数中间抛异常导致漏掉 `join()`、进而 `std::terminate`」的问题。核心两段：① 构造时持有 `std::thread&` 的引用；② **析构函数里判断 `if (t.joinable()) t.join();`**。这样无论函数正常返回还是异常退出，栈展开都会析构这个守卫，自动把线程 join 掉——把「必须 join」交给 RAII 兜底。",
    tags: ["thread_guard", "RAII", "异常安全", "join"],
  },
  {
    id: "cc-mt-9",
    chapter: "cc-managing-threads",
    level: 2,
    question:
      "向线程函数传参时，参数默认是怎么传进去的？想真正传引用该怎么做？",
    answer:
      "`std::thread` 默认把所有参数**拷贝**一份存进新线程的内部存储，再以这些副本去调用线程函数——即使线程函数的形参声明成引用，拿到的也是对副本的引用。要真正传一个引用进去，必须用 `std::ref(x)` 包一层：`std::thread t(f, std::ref(x));`。",
    tags: ["传参", "按值拷贝", "std::ref"],
  },
  {
    id: "cc-mt-10",
    chapter: "cc-managing-threads",
    level: 2,
    question:
      "像 `std::unique_ptr` 这种不可拷贝、只能移动的对象，怎么传给线程？",
    answer:
      "用 `std::move`：`std::thread t(f, std::move(up));`。因为 `std::thread` 默认要拷贝参数，而 `unique_ptr` 不可拷贝，直接传会编译失败；`std::move` 把它的所有权移动进线程的内部存储，再移动给线程函数的形参，全程没有拷贝。",
    tags: ["std::move", "unique_ptr", "传参"],
  },
  {
    id: "cc-mt-11",
    chapter: "cc-managing-threads",
    level: 2,
    question:
      "为什么 `std::thread` 设计成「不可拷贝、只能移动」，而不是允许拷贝？",
    answer:
      "因为一个 `std::thread` 对象独占地代表一个底层执行线程的**所有权**。如果允许拷贝，就会出现两个 `std::thread` 对象都声称管理同一个线程——那 join 谁、detach 谁？谁的析构去 terminate？语义无法自洽。只移动保证「同一时刻只有一个对象拥有这个线程」，所有权清晰可转移。",
    tags: ["移动语义", "所有权", "std::thread"],
  },
  {
    id: "cc-mt-12",
    chapter: "cc-managing-threads",
    level: 2,
    question:
      "用 lambda 启动线程为什么常常比函数对象更省事，还顺带避开了 most vexing parse？",
    answer:
      "lambda 可以就地写出要执行的逻辑、用捕获列表直接带上需要的变量，不必单独定义一个仿函数类。而且 `std::thread t([]{ ... });` 的语法不会被误解析成函数声明（lambda 不是「类型名加括号」那种歧义形式），自然避开了 most vexing parse 这个坑。",
    tags: ["lambda", "most vexing parse", "函数对象"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cc-mt-13",
    chapter: "cc-managing-threads",
    level: 3,
    question:
      "`void f(){ std::thread t(work); some_call_that_may_throw(); t.join(); }`——这段在 `some_call_that_may_throw()` 抛异常时会出什么事？怎么修最稳？",
    answer:
      "抛异常时控制流跳过了 `t.join()`，函数栈展开析构 `t` 时它仍 `joinable()`，于是 `std::terminate()` 崩溃。最稳的修法是用 RAII 守卫（`thread_guard`）：在创建 `t` 后立刻 `thread_guard g(t);`，让 `g` 的析构函数 `if (t.joinable()) t.join();` 兜底——无论正常返回还是异常退出都自动 join。",
    tags: ["异常安全", "thread_guard", "join", "排错"],
  },
  {
    id: "cc-mt-14",
    chapter: "cc-managing-threads",
    level: 3,
    question:
      "`void update(int& n); int x=0; std::thread t(update, x); t.join();`——跑完发现 `x` 没被改。为什么？怎么改？",
    answer:
      "因为 `std::thread` 默认**拷贝**参数：它拷了 `x` 的一份副本，`update` 的引用形参绑定的是这个副本，改的是副本，原 `x` 纹丝不动（其实严格说这种写法常常直接编译报错，因为副本是右值无法绑非 const 引用——但概念上的坑就是「拿不到原变量」）。改法：用 `std::ref(x)` —— `std::thread t(update, std::ref(x));`，把真正的引用传进去。",
    tags: ["std::ref", "传参", "排错"],
  },
  {
    id: "cc-mt-15",
    chapter: "cc-managing-threads",
    level: 3,
    question:
      "`std::thread make(){ std::thread t(work); return t; }`——这样从函数里返回一个 `std::thread`，合法吗？为什么？",
    answer:
      "合法。`std::thread` 是 move-only 的，`return t;` 会触发移动（局部对象返回时按右值处理），把线程的所有权移动给调用方的接收对象，原 `t` 变为 not joinable 的空壳。这正是「所有权转移」的典型用法——常见于工厂函数批量造线程、或把线程存进 `std::vector<std::thread>`（`push_back(std::move(t))`）。",
    tags: ["移动语义", "所有权转移", "读代码"],
  },
  {
    id: "cc-mt-16",
    chapter: "cc-managing-threads",
    level: 3,
    question:
      "`std::thread t(func, std::ref(local)); t.detach();`，其中 `local` 是当前函数的局部变量。这段有什么隐患？",
    answer:
      "悬空引用隐患。`detach()` 后子线程在后台独立运行，可能比当前函数活得更久；可它还持有指向 `local` 的引用。一旦当前函数返回，`local` 所在的栈帧被销毁，子线程再去读写这个引用就是访问**已释放内存**的未定义行为。修法：要么改成 join 保证函数等到子线程结束，要么别给 detach 的线程传局部变量的引用（改传值拷贝、或确保被引对象生命周期足够长）。",
    tags: ["detach", "悬空引用", "std::ref", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cc-mt-17",
    chapter: "cc-managing-threads",
    level: 4,
    question:
      "你要并行处理一个大任务：按 `hardware_concurrency()` 开 N 个线程各算一段，最后等它们全部完成。请说出从「决定开几个线程」到「全部 join」的完整思路，并指出两个必须小心的点。",
    answer:
      "思路：① 调 `unsigned n = std::thread::hardware_concurrency();`，若返回 0 则退化成一个合理默认（如 2），据此把数据切成 n 段；② 用 `std::vector<std::thread> threads;`，循环 `threads.push_back(std::thread(work, 段i));`（thread 不可拷贝，入 vector 靠移动）；③ 主线程算自己那段；④ 最后 `for (auto& t : threads) t.join();` 等所有子线程会合。必须小心：(a) 传给线程的数据若是引用（`std::ref`），要保证被引对象在所有线程 join 完之前一直存活，否则悬空；(b) 各段累加的结果要写到互不重叠的位置（或最后再汇总），避免多个线程写同一变量引发竞态。",
    tags: ["hardware_concurrency", "vector<thread>", "join", "综合"],
  },
  {
    id: "cc-mt-18",
    chapter: "cc-managing-threads",
    level: 4,
    question:
      "比较 join 和 detach 的「生命周期含义」：分别在什么场景下用？detach 后线程引用的数据要满足什么条件才安全？",
    answer:
      "join 适合「主线程需要等子线程结果、或子线程依赖的数据只在本作用域存活」的场景——主线程在 join() 处会合、确保子线程在数据销毁前结束。detach 适合「fire-and-forget 的后台长活儿」（如后台日志、监控），主线程不关心它何时结束、也不要它的返回值。安全条件：detach 后子线程可能比创建它的作用域活得久，所以它访问的所有数据都必须保证在子线程整个生命周期内有效——绝不能是会随某个函数返回而销毁的局部变量的引用/指针；要么传值拷贝、要么用生命周期足够长的对象（如堆上分配且由线程自己管理、或全局/静态数据并做好同步）。",
    tags: ["join", "detach", "生命周期", "综合"],
  },
];

export default ccManagingThreadsQuestions;
