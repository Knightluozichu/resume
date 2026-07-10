import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 内存管理测试复习题 */
export const ctrMemoryTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-memory-test-1",
    chapter: "ctr-memory-test",
    level: 1,
    question: `C++ 的四种智能指针 \`unique_ptr\` / \`shared_ptr\` / \`weak_ptr\` / \`auto_ptr\` 各自的特点是什么？\`auto_ptr\` 为什么被废弃？`,
    answer:
      `四种智能指针：\n- \`unique_ptr<T>\`：独占所有权，不可拷贝、只能移动。零开销抽象（大小等于裸指针，无引用计数）。删除器可自定义（模板参数）。默认首选。\n- \`shared_ptr<T>\`：共享所有权，引用计数。可拷贝，最后一个引用析构时释放对象。控制块有原子开销，对象大小是两个指针（对象指针 + 控制块指针）。\n- \`weak_ptr<T>\`：弱引用，指向 shared_ptr 管理的对象但不增加引用计数。用于打破循环引用、观察者模式。用 \`lock()\` 提升为 shared_ptr 来安全访问。\n- \`auto_ptr<T>\`：C++98 的独占指针，已被 C++11 废弃、C++17 移除。问题在于它的「拷贝」其实是转移所有权（源置空），这违反拷贝语义的直觉，导致在容器里按值传参会意外转移所有权、拷贝后源对象不可用，引发难查的 bug。\n\n\`auto_ptr\` 被废弃的根本原因：拷贝即转移违反值语义约定，与 STL 容器算法不兼容（算法可能拷贝元素导致所有权悄悄转移）。\`unique_ptr\` 用移动语义正确表达「独占但可转移」，取代了它。`,
    tags: ["智能指针", "unique_ptr", "shared_ptr", "weak_ptr", "auto_ptr"],
  },
  {
    id: "ctr-memory-test-2",
    chapter: "ctr-memory-test",
    level: 2,
    question: `如何检测 C++ 程序的内存泄漏？\`new\`/\`delete\` 与 \`new[]\`/\`delete[]\` 不匹配会怎样？`,
    answer:
      `检测内存泄漏的方法：\n1. Valgrind（Memcheck）：Linux 下运行程序，报告「definitely lost / indirectly lost / still reachable」等，给出泄漏点的调用栈。适合开发期，开销大（约 10-20 倍减速）。\n2. AddressSanitizer（ASan）：编译期加 \`-fsanitize=address\`，运行时拦截 malloc/new，能报泄漏（配合 LSan）、越界、use-after-free。开销小（约 2 倍），适合 CI 与日常调试。\n3. 自定义 operator new 重载：记录每次分配的地址/大小/调用栈，程序退出时检查未释放项。适合嵌入式等无工具环境。\n4. mtrace / _CrtDumpMemoryLeaks（MSVC）：平台特定 API。\n\n\`new\`/\`delete\` 与 \`new[]\`/\`delete[]\` 不匹配是 UB：\`new T\` 分配单个对象并调用构造函数，\`delete\` 调用析构并释放；\`new T[n]\` 分配数组并逐个构造，\`delete[]\` 逐个析构再释放。混用（如 \`delete\` 配 \`new[]\`）只析构首元素甚至解析错数组长度，是 UB——可能崩溃、可能泄漏、可能看似正常。规则：单个用 new/delete，数组用 new[]/delete[]，配对必须一致。现代 C++ 应直接用 \`vector\` / \`unique_ptr<T[]>\` 避免手写数组管理。`,
    tags: ["内存泄漏检测", "Valgrind", "ASan", "new delete 不匹配"],
  },
  {
    id: "ctr-memory-test-3",
    chapter: "ctr-memory-test",
    level: 3,
    question: `\`shared_ptr\` 循环引用如何导致内存泄漏？给出一个典型场景并说明如何用 \`weak_ptr\` 修复。`,
    answer:
      `循环引用导致泄漏：当 A 持有指向 B 的 shared_ptr，B 又持有指向 A 的 shared_ptr 时，两者的引用计数互相依赖——A 析构需要 B 先析构（B 的 shared_ptr 释放才让 A 计数归零），B 析构又需要 A 先析构，形成死锁。结果两个对象都永远不会析构，内存永久泄漏，Valgrind 报「definitely lost」。\n\n典型场景：观察者模式中，被观察对象（Subject）持有观察者列表（vector<shared_ptr<Observer>>），观察者又持有被观察对象的 shared_ptr 以便取消注册。两者互相引用即成环。\n\n用 weak_ptr 修复：把环上「其中一条边」改为 weak_ptr。观察者持有 \`weak_ptr<Subject>\` 而非 shared_ptr，这样不增加 Subject 的引用计数，环被打破。需要访问 Subject 时用 \`lock()\` 提升为 shared_ptr：若 Subject 还活着返回有效 shared_ptr，若已销毁返回空，天然安全。\n\n判断哪条边改 weak_ptr 的原则：把「生命周期较短」或「逻辑上从属」的一端改成 weak_ptr。Subject 通常活得久，Observer 短暂，所以 Observer 持有 weak_ptr<Subject> 更合理。`,
    tags: ["循环引用", "weak_ptr", "shared_ptr", "观察者模式"],
  },
  {
    id: "ctr-memory-test-4",
    chapter: "ctr-memory-test",
    level: 4,
    question: `设计一个管理动态资源的类时，如何正确实现「Rule of Five」？若该类需要把对象存入 \`vector\` 并频繁 push_back，移动语义能带来什么收益？请说明何时该用 \`make_shared\` 而非直接 \`shared_ptr\` 构造。`,
    answer:
      `Rule of Five：一个管理资源（堆内存、文件句柄、锁等）的类，通常需要显式定义五个特殊成员函数，以保证资源在拷贝、移动、赋值、析构时正确释放：\n1. 析构函数：释放资源。\n2. 拷贝构造：深拷贝资源（分配新资源并复制内容），避免两个对象共享同一资源导致双重释放。\n3. 拷贝赋值：处理自赋值、释放旧资源、深拷贝新资源。常用 copy-and-swap 惯用法保证异常安全。\n4. 移动构造：窃取源对象资源（指针转移），把源置为空状态，零拷贝。\n5. 移动赋值：释放自身资源，窃取源资源，源置空。\n\n移动语义对 vector push_back 的收益：vector 扩容时要搬移元素。若元素类型有移动构造，搬移走移动（窃取指针，O(1)）而非拷贝（深拷贝，O(n)）。对存动态数组的大对象，扩容从 O(n) 拷贝降到 O(n) 移动，常数因子大幅下降。前提是 noexcept 移动构造——vector 在扩容时若移动构造非 noexcept，为保证强异常安全会退回用拷贝。所以移动构造应标 noexcept 才能真正被采用。\n\nmake_shared vs 直接 shared_ptr 构造：\n- 优先 \`make_shared<T>(args...)\`：它把对象和控制块分配在同一块内存，少一次内存分配，缓存局部性好，且避免裸 new 出现在代码里。\n- 例外用直接构造 \`shared_ptr<T>(new T(args))\` 的情况：①T 的构造函数可能抛异常且不想让 weak_ptr 长期持有内存（make_shared 的对象与控制块同块，若有 weak_ptr 指向，对象内存要等 weak_ptr 全销毁才释放，大对象可能延迟释放）；②需要对齐或自定义分配器需要分开分配。`,
    tags: ["Rule of Five", "移动语义", "vector 扩容", "make_shared", "异常安全"],
  },
];
