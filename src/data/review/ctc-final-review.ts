import type { ReviewQuestion } from "./types";

export const ctcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ctc-final-review-1",
    chapter: "ctc-final-review",
    level: 1,
    question: "C# 10 十大特性构成哪四层因果链？为什么这个学习顺序不可打乱？",
    answer: "四层：地基层（类型系统总览）→架构层（泛型深入+委托与事件）→能力层（异步深入+并行与TPL）→表现层（模式匹配+Record与结构体+源生成器）。顺序不可打乱因为每个特性建立在前一个基础上：泛型是类型参数化（依赖类型系统），委托的类型安全来自签名检查（依赖类型系统），async/await的Task<T>是泛型且continuation是委托，Parallel.For依赖泛型委托Action<T>，模式匹配的类型模式依赖类型系统，Record是类型系统的值语义封装，源生成器分析类型元数据。跳级会丢失因果关系。",
    tags: ["因果链", "四层结构", "学习顺序", "知识图谱"],
  },
  {
    id: "ctc-final-review-2",
    chapter: "ctc-final-review",
    level: 2,
    question: "Task 这个抽象在异步和并行中分别扮演什么角色？为什么说两者正交但共享 Task？",
    answer: "异步中Task<T>代表一个异步操作的完成状态和结果——await Task时线程释放，操作完成后continuation恢复。并行中Task.Run将CPU计算排队到线程池，Task.WhenAll协调多个并行任务。两者正交：异步解决I/O不阻塞线程（一个线程管多个I/O），并行解决CPU计算利用多核（多个核心同时算）。共享Task是因为两者都涉及工作的异步完成——异步的完成是I/O响应，并行的完成是CPU计算结束。Task是统一的异步操作抽象。",
    tags: ["Task", "异步", "并行", "正交关系"],
  },
  {
    id: "ctc-final-review-3",
    chapter: "ctc-final-review",
    level: 3,
    question: "设计一个「用户注册API」的完整链路，说明在每一步用到哪些 C# 10 特性及其原因。",
    answer: "1）请求DTO用record（不可变、值相等、with表达式、自动ToString用于日志）。2）请求验证用模式匹配（is { Age: < 0 or > 150 }，声明式条件比if-else清晰）。3）密码哈希用async/await（CPU密集用Task.Run卸载或异步API避免阻塞）。4）数据库写入用async/await（I/O不阻塞线程，Task<T>泛型异步结果）。5）事件发布用委托与事件（发布订阅，event封装保护订阅者，多播GetInvocationList隔离异常）。6）JSON序列化用源生成器（编译时生成代码零反射，比反射快5-10倍）。7）响应DTO用record。8）结果类型用泛型record（Result<T>类型安全封装）。9）批量处理用PLINQ+async（并行异步处理利用多核）。",
    tags: ["综合应用", "API设计", "record", "async/await", "源生成器", "模式匹配"],
  },
  {
    id: "ctc-final-review-4",
    chapter: "ctc-final-review",
    level: 4,
    question: "C# 10 的三大设计理念是什么？结合具体特性分析「性能不妥协」理念如何在安全与速度之间取得平衡。",
    answer: "三大理念：类型安全优先（编译时捕获错误）、多范式融合（OOP+函数式+命令式）、性能不妥协（安全与速度兼得）。性能不妥协的体现：1）ValueTask——保持async/await的类型安全和简洁，同时通过值类型避免同步完成时的堆分配。2）record struct——保持record的值相等和with表达式安全，同时通过值类型避免堆分配。3）源生成器——保持类型安全（编译时生成强类型代码），同时消除运行时反射开销。4）Span<T>——保持类型安全（不安全的指针操作被封装），同时零拷贝访问内存。核心理念是不因安全牺牲速度——通过编译时机制（泛型、源生成器、可空引用类型）在保证安全的同时达到手写代码的性能。",
    tags: ["设计理念", "性能", "类型安全", "ValueTask", "源生成器", "Span"],
  },
];
