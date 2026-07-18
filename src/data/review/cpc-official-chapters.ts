import type { ReviewQuestion } from "./types";

export const cpcPrerequisitesQuestions: ReviewQuestion[] = [
  {
    id: "cpc-prerequisites-1",
    chapter: "cpc-prerequisites",
    level: 1,
    question: `Compiler Explorer 实验至少要记录哪些配置，才能复现？`,
    answer: `记录 source、compiler 与 version、target architecture/ABI、language standard、optimization flags，以及要对齐的 assembly/binary/runtime output。只保存一张汇编截图，无法判断 target 和优化条件，也无法跨版本复现。`,
    tags: ["Compiler Explorer", "复现", "汇编"],
  },
  {
    id: "cpc-prerequisites-2",
    chapter: "cpc-prerequisites",
    level: 2,
    question: `可执行文件为什么不需要在磁盘中保存一大段 BSS 零字节？`,
    answer: `BSS-like 区域记录零初始化 static storage 的大小和映射信息，loader 建立进程映像时提供零填充 pages，无需在文件中存储全部零。具体 executable format 不同，但“记录大小、装载时得到零初始化 storage”是关键。`,
    tags: ["BSS", "loader", "可执行文件"],
  },
  {
    id: "cpc-prerequisites-3",
    chapter: "cpc-prerequisites",
    level: 3,
    question:
      `如何解释 ` +
      "`add QWORD PTR [rbp-8], 2`" +
      `，又为何它在 O2 下可能消失？`,
    answer: `先计算 effective address rbp-8，读取 8-byte value，加 2，再写回。O0 常把 local spill 到 frame 便于调试；O2 可将值保留在 register、做 constant folding，或 inline 后删除 storage。因此该 instruction 是一次实现证据，不是源码操作的固定翻译。`,
    tags: ["间接寻址", "栈帧", "优化"],
  },
];

export const cpcBasicSyntaxQuestions: ReviewQuestion[] = [
  {
    id: "cpc-basic-syntax-1",
    chapter: "cpc-basic-syntax",
    level: 1,
    question: `main 为什么通常不是 executable 的第一条机器指令？`,
    answer: `loader 把控制交给 runtime startup entry，启动代码初始化运行库、组织 argc/argv，再按 ABI 调用 main；main 返回后 startup 再处理 exit status 和清理。因此 main 是 hosted C/C++ 的用户入口，不是普遍的物理 instruction entry。`,
    tags: ["main", "runtime startup", "ABI"],
  },
  {
    id: "cpc-basic-syntax-2",
    chapter: "cpc-basic-syntax",
    level: 2,
    question: `四元素数组中的 one-past pointer 可以做什么，不能做什么？`,
    answer: `base + 4 可作为迭代终点、用于允许的比较，但它不指向数组 element，不能解引用；values[4] 已经是越界访问。访问不一定 crash，因为地址可能仍位于 mapped page，但语言行为已未定义。`,
    tags: ["数组", "one-past", "越界"],
  },
  {
    id: "cpc-basic-syntax-3",
    chapter: "cpc-basic-syntax",
    level: 3,
    question: `为什么不能简单说 ++i 永远比 i++ 快？`,
    answer: `prefix 产生修改后值，postfix 产生修改前值。对 built-in integer，若结果未使用，两者通常都只剩一次 increment；旧值被消费时 postfix 才必须保留该 dependency。对 user-defined iterator，postfix overload 可能复制旧对象。应结合结果是否使用、类型和 optimized evidence 判断。`,
    tags: ["i++", "++i", "抽象语义"],
  },
];

export const cpcFunctionPrinciplesQuestions: ReviewQuestion[] = [
  {
    id: "cpc-function-principles-1",
    chapter: "cpc-function-principles",
    level: 1,
    question: `参数传递为什么不能概括为“值在栈、引用是指针”？`,
    answer: `语言层的 value parameter 初始化独立 parameter object，reference 绑定原对象；ABI 再按 type 分类到 registers、memory 或 stack。inline 后边界可消失，reference 的 address-like representation 也可被优化掉。语义和传递方式必须分层陈述。`,
    tags: ["参数传递", "引用", "调用约定"],
  },
  {
    id: "cpc-function-principles-2",
    chapter: "cpc-function-principles",
    level: 2,
    question: `按值返回大对象为何不必发生一次复制？`,
    answer: `ABI 可让 caller 提供 hidden destination address，callee 直接在最终位置构造；RVO/NRVO 或 C++17 的 guaranteed copy elision 可省掉中间 object。具体大小阈值和 register classification 由 ABI 决定，不能泛化固定 16-byte 规则。`,
    tags: ["返回值", "sret", "copy elision"],
  },
  {
    id: "cpc-function-principles-3",
    chapter: "cpc-function-principles",
    level: 3,
    question: `backtrace 如何从当前线程恢复调用关系，优化为何会让它少帧？`,
    answer: `unwinder 从 current PC/registers 出发，用 frame-pointer chain 或 unwind metadata 恢复 caller state 和 return address；symbolizer 再解析 function/file/line。inline 没有独立物理 frame，tail call 可复用 frame，缺 symbols、错误 metadata 或 stack corruption 也会截断。`,
    tags: ["backtrace", "unwind", "符号化"],
  },
];

export const cpcCppFeaturesQuestions: ReviewQuestion[] = [
  {
    id: "cpc-cpp-features-1",
    chapter: "cpc-cpp-features",
    level: 1,
    question: `构造函数进入 body 前，对象已经发生了什么？`,
    answer: `storage 已取得，virtual/direct bases 和 members 已按语言规定顺序开始 lifetime；member 顺序由 declaration order 决定。body 用于完成剩余 invariant。若中途抛异常，已构造 subobjects 逆序销毁，尚未完成的 most-derived destructor 不运行。`,
    tags: ["构造函数", "生命周期", "初始化顺序"],
  },
  {
    id: "cpc-cpp-features-2",
    chapter: "cpc-cpp-features",
    level: 2,
    question: `vptr/vtable 是 C++ 标准保证吗？虚调用为何仍可能变成直接调用？`,
    answer: `标准保证按 dynamic type 选择 override，不规定 vptr/vtable 和固定 layout；它们是主流 ABI 实现。compiler 若由 final、局部 concrete object 或 whole-program analysis 证明唯一 target，可以 devirtualize 成 direct call 并 inline。`,
    tags: ["虚函数", "vtable", "去虚化"],
  },
  {
    id: "cpc-cpp-features-3",
    chapter: "cpc-cpp-features",
    level: 3,
    question: `malloc 与 new expression 的完整语义差异是什么？`,
    answer: `malloc 只取得 raw storage，返回 null 表示失败，不自动构造 C++ object；new expression 调用 allocation function 后初始化 object，constructor 抛出时按规则调用 deallocation，普通失败抛 bad_alloc。释放必须匹配，non-trivial object 还要执行 destructor。`,
    tags: ["malloc", "new", "对象生命周期"],
  },
];

export const cpcAdvancedProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "cpc-advanced-programming-1",
    chapter: "cpc-advanced-programming",
    level: 1,
    question: `TLB miss、page fault 和非法内存访问有何区别？`,
    answer: `TLB miss 表示 translation cache 未命中，可通过 page-table walk 成功；page fault 表示当前 entry 需 kernel 处理，可能是正常 demand paging/copy-on-write，也可能失败；只有无合法 mapping 或权限冲突等 fault 才通常转成进程错误。`,
    tags: ["虚拟内存", "TLB", "page fault"],
  },
  {
    id: "cpc-advanced-programming-2",
    chapter: "cpc-advanced-programming",
    level: 2,
    question: `为什么 volatile 不能替代 atomic 或 mutex？`,
    answer: `volatile 要求保留规定的 observable accesses，但不保证宽访问 atomic、不建立跨线程 ordering/happens-before，也不把 read-modify-write 变成不可分割操作。线程共享状态必须由 atomic protocol 或 mutex 保护；MMIO 还可能需要平台专用 barrier。`,
    tags: ["volatile", "atomic", "mutex"],
  },
  {
    id: "cpc-advanced-programming-3",
    chapter: "cpc-advanced-programming",
    level: 3,
    question: `争用 mutex 时，为什么“锁就是一条原子指令”不完整？`,
    answer: `uncontended fast path 可用 atomic compare/exchange 获取状态，但完整 mutex 还需要 acquire/release ordering、owner protocol、spinning、parking、wait queue、scheduler 与 wakeup。性能诊断应量 hold time、wait time、spin CPU 和 wake latency。`,
    tags: ["锁", "上下文", "竞争"],
  },
];

export const cpcInterviewChallengesQuestions: ReviewQuestion[] = [
  {
    id: "cpc-interview-challenges-1",
    chapter: "cpc-interview-challenges",
    level: 1,
    question: `static、global、local 为什么必须拆成多个维度回答？`,
    answer: `global/local 多描述 declaration scope，static 在不同 context 影响 storage duration、linkage 或 class membership。完整回答要列 scope、linkage、storage duration、initialization timing 和 object identity/count；section、stack/register 只是具体 build evidence。`,
    tags: ["static", "scope", "linkage"],
  },
  {
    id: "cpc-interview-challenges-2",
    chapter: "cpc-interview-challenges",
    level: 2,
    question: `为什么 int[2][3] 不能作为 int** 使用？`,
    answer: `二维数组是连续 2x3 object，decay 后类型是 pointer-to-array-of-3-int，第一次解引用得到一整行；int** 要求先读到真实 int* object，再沿第二层 pointer 定位 int。matrix 起始 bytes 是 elements，不是 pointer objects，强制转换会破坏 shape/type contract。`,
    tags: ["二维数组", "双重指针", "数据形状"],
  },
  {
    id: "cpc-interview-challenges-3",
    chapter: "cpc-interview-challenges",
    level: 3,
    question: `auto 与 thread_local 各在什么时候决定 type 或 object identity？`,
    answer: `auto 根据 initializer 与声明形式在 compile time 推导 concrete type，plain auto、auto&、auto&& 和 decltype(auto) 规则不同；thread_local declaration 的 type 同样静态确定，但 runtime 为每个 thread 建立独立 object identity，常通过 TLS base 加 offset 访问。TLS 不自动同步它指向的共享数据。`,
    tags: ["auto", "thread_local", "类型推导"],
  },
];
