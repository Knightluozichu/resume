#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const chapters = [
  {
    book: "effective-csharp",
    mdx: "00-habits/ecs-learning-map.mdx",
    slug: "ecs-learning-map",
    component: "EffectiveCSharpLearningMapLab",
    practiceMode: "design",
    title: "五章五十条建议如何汇成四条契约链",
    prompt:
      "不要逐条背 Item；选择一条契约链，检查建议如何跨章节约束同一个系统。",
    conclusion:
      "有效的学习地图不是目录复述，而是能把一个代码决策沿类型、生命周期、执行与失败边界追到底。",
    stages: [
      [
        "类型契约",
        "语言习惯和泛型共同限定调用方能表达什么。",
        "字符串协议或过宽约束让错误推迟到运行时。",
        "编译错误、API 签名与替换测试。",
      ],
      [
        "生命周期契约",
        "资源章节确定对象从创建到释放的唯一责任人。",
        "GC 被误当成外部资源释放协议。",
        "Dispose 路径、owner graph 与泄漏剖析。",
      ],
      [
        "执行与失败契约",
        "LINQ 决定何时执行，异常章节决定失败后保留什么状态。",
        "延迟执行跨出资源边界，异常留下部分更新。",
        "枚举次数、查询日志与失败后的状态断言。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "01-official/language-idioms.mdx",
    slug: "language-idioms",
    component: "LanguageIdiomsDecisionLab",
    practiceMode: "diagnosis",
    title: "语言写法是否把真实契约交给编译器",
    prompt:
      "在可读性、类型安全、文化格式和运行成本之间做选择，并指出可验证证据。",
    conclusion:
      "语法糖只有在保留静态类型、边界责任和替换语义时才是改进；否则只是把风险藏得更深。",
    stages: [
      [
        "表示方式",
        "先判断值应保持强类型，还是只在最终边界转成文本。",
        "过早字符串化丢失单位、文化和取值约束。",
        "类型签名、往返测试与文化矩阵。",
      ],
      [
        "调用方式",
        "delegate、event 与 pattern 让允许的调用和分支可由编译器检查。",
        "字符串命令和不安全 cast 把协议错误推迟到线上。",
        "编译期失败案例与事件生命周期测试。",
      ],
      [
        "运行代价",
        "只在剖析证明确有热区时消除 boxing，并审计 new/override 绑定。",
        "凭直觉优化导致 API 退化，成员隐藏破坏替换预期。",
        "分配剖析、基类引用调用测试与基准。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "02-official/resource-management.mdx",
    slug: "resource-management",
    component: "ResourceManagementDecisionLab",
    practiceMode: "diagnosis",
    title: "对象生命周期与外部资源责任实验",
    prompt: "选择生命周期阶段，区分 GC 管理的内存与必须确定释放的资源。",
    conclusion:
      "资源管理的核心不是多写清理代码，而是让每个资源只有一个可证明的 owner 和一条覆盖所有退出路径的释放协议。",
    stages: [
      [
        "初始化",
        "成员初始值与构造链应共享一个事实来源，静态状态按类型语义初始化。",
        "重复赋值让不同构造入口形成不同不变量。",
        "构造路径测试、nullable 分析与静态初始化顺序。",
      ],
      [
        "使用",
        "短命对象控制分配，长寿资源的 owner 不被回调或缓存意外延长。",
        "捕获、缓存和装箱制造隐性保留与 GC 压力。",
        "allocation profile、heap path 与 owner graph。",
      ],
      [
        "释放",
        "IDisposable 负责确定释放外部资源，using/finally 覆盖异常路径。",
        "依赖 finalizer 时文件、句柄或连接长期占用。",
        "故障注入后的 Dispose 次数与句柄计数。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "03-official/working-with-generics.mdx",
    slug: "working-with-generics",
    component: "GenericsContractLab",
    practiceMode: "design",
    title: "泛型约束与可替换性设计实验",
    prompt: "从调用方真正需要的能力出发，逐层检查约束、variance 与扩展点。",
    conclusion:
      "好的泛型 API 承诺的是最小能力集合；每增加一个约束、特化或接口，都必须换来可验证的语义。",
    stages: [
      [
        "最小约束",
        "只声明算法实际调用的成员和构造能力。",
        "过强约束排除合法类型，过弱约束迫使运行时分支。",
        "可接受/应拒绝类型的编译矩阵。",
      ],
      [
        "替换方向",
        "协变只安全地产出 T，逆变只安全地消费 T。",
        "把读写能力混在同一接口会阻断 variance 或产生不安全假设。",
        "赋值兼容测试与输入输出位置审计。",
      ],
      [
        "扩展策略",
        "优先泛型方法和最小接口，再用扩展方法补充便利操作。",
        "为每个构造类型建特化层，造成重复和二义性。",
        "API surface diff、重载解析测试与版本兼容测试。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "04-official/working-with-linq.mdx",
    slug: "working-with-linq",
    component: "LinqExecutionBoundaryLab",
    practiceMode: "simulation",
    title: "LINQ 查询从表达式到执行边界",
    prompt:
      "切换查询阶段，判断代码是在组合计划、枚举本地序列，还是翻译远端表达式。",
    conclusion:
      "LINQ 的可靠性取决于清楚标出 provider、枚举次数、资源寿命和 cardinality；语法外观不能代替执行模型。",
    stages: [
      [
        "组合查询",
        "Where、Select 等操作先组成可复用计划，不应偷偷执行或产生副作用。",
        "组合函数抛异常或修改外部状态，使同一查询不可重放。",
        "零枚举断言、表达式树与副作用计数。",
      ],
      [
        "选择 Provider",
        "IEnumerable 执行 CLR 委托，IQueryable 把表达式交给远端 provider 翻译。",
        "把本地方法放入远端表达式，翻译失败或退化为大规模客户端计算。",
        "生成 SQL、provider 日志与数据传输量。",
      ],
      [
        "触发枚举",
        "ToList、First、Single 或 foreach 明确执行时刻和结果基数。",
        "重复枚举、资源已释放或 Single/First 语义选错。",
        "查询次数、连接寿命与 0/1/多条数据测试。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "05-official/exception-practices.mdx",
    slug: "exception-practices",
    component: "ExceptionContractLab",
    practiceMode: "diagnosis",
    title: "异常传播与状态保证实验",
    prompt: "沿失败路径检查报告方式、资源清理、状态恢复和诊断上下文。",
    conclusion:
      "异常是方法契约的一部分：调用方需要知道什么算失败、失败后对象仍满足什么不变量，以及哪里能取得证据。",
    stages: [
      [
        "报告失败",
        "只有无法满足方法承诺的情况才抛异常，并选择能表达恢复策略的类型。",
        "用返回值吞掉严重失败，或把普通分支全部异常化。",
        "异常类型矩阵、调用方处理策略与边界测试。",
      ],
      [
        "清理资源",
        "using 或 finally 必须在传播异常前完成确定清理。",
        "清理代码只在成功路径执行，原始异常又被二次异常覆盖。",
        "故障注入、Dispose 次数与异常链。",
      ],
      [
        "保持状态",
        "优先强异常保证：失败后对象保持调用前可用状态。",
        "先修改共享状态再执行可能失败的步骤，留下半提交。",
        "前后快照、不变量断言与补偿日志。",
      ],
    ],
  },
  {
    book: "effective-csharp",
    mdx: "03-concurrent/ecs-final-review.mdx",
    slug: "ecs-final-review",
    component: "EffectiveCSharpFinalReviewLab",
    practiceMode: "diagnosis",
    title: "用一个真实系统验收五十条建议",
    prompt: "选择审计面，检查建议是否在代码、运行时和失败路径留下可重复证据。",
    conclusion:
      "总复习的终点不是记住五十个标题，而是能对一个变更说明它改变了哪条契约、风险在哪里、证据是否足够。",
    stages: [
      [
        "类型与替换",
        "审计强类型边界、泛型约束和基类替换行为。",
        "API 表面可编译，但字符串协议和成员隐藏绕过真实契约。",
        "编译矩阵、contract tests 与 API diff。",
      ],
      [
        "生命周期与执行",
        "追踪 owner、Dispose、延迟枚举和 provider 边界。",
        "查询在资源释放后执行，或回调意外保留昂贵对象。",
        "heap path、枚举次数与连接日志。",
      ],
      [
        "失败与发布",
        "注入异常后验证状态、清理、可观测性和回滚策略。",
        "只测成功路径，发布后才发现部分更新和证据缺口。",
        "故障测试、状态快照与发布门禁记录。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "00-intro/cse-learning-map.mdx",
    slug: "cse-learning-map",
    component: "CppServerLearningMapLab",
    practiceMode: "design",
    title: "一条请求怎样穿过九章服务器能力",
    prompt:
      "选择请求生命周期阶段，把语言、并发、网络、协议、服务结构和生产证据连起来。",
    conclusion:
      "服务器知识只有放进请求生命周期才可用于建设和排障；任何阶段都必须同时说明 owner、状态迁移和证据。",
    stages: [
      [
        "建立进程",
        "构建产物、资源 owner 与线程模型决定服务能否被可靠调试。",
        "二进制、符号和源码不匹配，线程责任不清。",
        "build-id、启动配置、线程清单与 owner graph。",
      ],
      [
        "处理请求",
        "socket 状态、并发同步和协议 framing 共同决定一条消息如何完成。",
        "把字节流当消息，或在持锁区执行阻塞 I/O。",
        "抓包、状态机日志、锁等待与请求 trace。",
      ],
      [
        "恢复与演进",
        "模块边界、重连、心跳和观测让服务在故障后恢复。",
        "重试放大流量，模块共享隐式状态，告警没有定位证据。",
        "故障演练、依赖图、指标和回滚记录。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "01-official/cpp-must-know.mdx",
    slug: "cpp-must-know",
    component: "CppOwnershipContractLab",
    practiceMode: "diagnosis",
    title: "服务器对象的 owner、接口与销毁顺序",
    prompt:
      "沿对象生命周期检查 RAII、pimpl、智能指针和现代 C++ 语法是否表达同一份责任。",
    conclusion:
      "服务器 C++ 的首要问题不是语法新旧，而是资源责任能否从构造、共享、回调一直证明到析构。",
    stages: [
      [
        "建立 owner",
        "RAII 把资源取得和对象生命周期绑定，unique_ptr 表达唯一所有权。",
        "裸 new/delete 分散在多个退出路径，异常时泄漏。",
        "构造/析构计数、sanitizer 与 owner graph。",
      ],
      [
        "暴露接口",
        "pimpl 隔离 layout 和重依赖，override/delete 让意图可被编译器检查。",
        "头文件泄漏实现细节，错误重载静默创建新成员。",
        "ABI diff、依赖构建时间与编译诊断。",
      ],
      [
        "共享与回调",
        "shared_ptr 只用于真实共享，weak_ptr 打断非所有权回边。",
        "循环引用或从 this 临时创建第二个 control block。",
        "use_count 只作诊断、heap path 与析构断言。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "02-official/backend-tools-debugging.mdx",
    slug: "backend-tools-debugging",
    component: "BackendDebugEvidenceLab",
    practiceMode: "diagnosis",
    title: "从构建产物到线程现场的调试证据链",
    prompt: "选择证据层，判断当前结论依赖哪些匹配的产物和运行上下文。",
    conclusion:
      "调试不是随机单步，而是从可复现 artifact 开始，逐层缩小到进程、线程、栈帧和具体写入事件。",
    stages: [
      [
        "匹配产物",
        "源码、编译参数、二进制、符号和 build-id 必须对应同一次构建。",
        "相同 tag 被误当成相同机器码，core 解析出错误栈。",
        "build-id、symbol package 与 compile_commands。",
      ],
      [
        "选择上下文",
        "先锁定 inferior、thread 和 frame，再解释局部变量与寄存器。",
        "在 master 或错误线程里解释 worker 状态。",
        "info inferiors、thread apply all bt 与 frame args。",
      ],
      [
        "捕捉事件",
        "条件断点和 watchpoint 用最少停顿捕捉首次错误写入。",
        "广泛单步改变时序，优化变量又被误判为不存在。",
        "watchpoint 命中栈、反汇编与内存快照。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "03-official/multithreading-resource-sync.mdx",
    slug: "multithreading-resource-sync",
    component: "ServerSynchronizationLab",
    practiceMode: "simulation",
    title: "线程同步原语与任务队列选择",
    prompt: "沿任务进入、共享状态更新和线程退出三个阶段判断同步关系。",
    conclusion:
      "同步原语的选择必须来自状态不变量和等待条件；线程越多并不自动提高吞吐。",
    stages: [
      [
        "提交任务",
        "队列在同一同步协议下发布任务和唤醒 worker。",
        "通知先于状态发布，worker 醒来却看不到任务。",
        "队列长度、条件谓词与 happens-before 推导。",
      ],
      [
        "更新共享状态",
        "mutex 保护复合不变量，atomic 只承担明确的单变量协议。",
        "把多字段事务拆成几个原子变量，读者观察到混合状态。",
        "锁域审计、竞争检测与状态断言。",
      ],
      [
        "停止线程池",
        "关闭标志、剩余任务和 join 顺序形成可重复的 shutdown protocol。",
        "主线程销毁队列时 worker 仍在访问，或 join 永久等待。",
        "停止时序日志、超时测试与 sanitizer。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "04-official/network-programming-hard-points.mdx",
    slug: "network-programming-hard-points",
    component: "NetworkStateMachineLab",
    practiceMode: "simulation",
    title: "TCP 字节流与非阻塞连接状态机",
    prompt: "切换 I/O 阶段，检查 read/write、半关闭和事件通知的真实语义。",
    conclusion:
      "可靠网络代码不把一次系统调用等同于一条消息；所有分支都必须回到连接状态机和缓冲区不变量。",
    stages: [
      [
        "建立连接",
        "非阻塞 connect 通过可写事件和 SO_ERROR 确认结果。",
        "看到 writable 就当成连接成功，忽略异步错误。",
        "socket error、超时器与连接状态日志。",
      ],
      [
        "收发字节",
        "循环 read/write 到 EAGAIN，并由协议 decoder 消费完整 frame。",
        "短读短写、粘包或边缘触发未排空造成停滞。",
        "缓冲区游标、抓包和系统调用 trace。",
      ],
      [
        "关闭连接",
        "EOF、half-close、RST 与主动 close 对应不同状态迁移。",
        "把 EOF 当临时无数据，或双边同时持有悬空请求。",
        "FIN/RST 抓包、pending request 清单与关闭时序。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "05-official/network-troubleshooting-commands.mdx",
    slug: "network-troubleshooting-commands",
    component: "NetworkEvidenceCommandLab",
    practiceMode: "diagnosis",
    title: "网络故障现象到命令证据的映射",
    prompt: "选择故障层级，组合能证伪假设的命令，而不是堆砌工具输出。",
    conclusion:
      "命令只是观测窗口；诊断质量取决于时间、命名空间、五元组和进程上下文是否对齐。",
    stages: [
      [
        "主机与路由",
        "先确认接口、地址、路由、邻居和网络命名空间。",
        "在宿主机观察容器故障，或忽略策略路由。",
        "ip addr/route/neigh、nsenter 与时间戳。",
      ],
      [
        "连接与进程",
        "用 ss/lsof 把 socket 状态映射到 PID、fd 和监听队列。",
        "只看端口存在，不看 SYN backlog、TIME_WAIT 或进程重启。",
        "ss -tanp、进程启动时间与 fd 清单。",
      ],
      [
        "线上字节",
        "tcpdump 按五元组抓取握手、重传、窗口和 FIN/RST。",
        "抓错接口、过滤条件过宽，或用单包解释长期趋势。",
        "pcap、序列号、RTT/retrans 指标与应用 trace。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "06-official/network-protocol-design.mdx",
    slug: "network-protocol-design",
    component: "ProtocolFramingLab",
    practiceMode: "design",
    title: "协议 framing、版本与校验边界",
    prompt: "沿一条消息从编码到解码，验证长度、版本、错误处理和兼容策略。",
    conclusion:
      "协议设计的目标不是字段最少，而是在任意分片、异常输入和版本组合下仍能确定边界并安全失败。",
    stages: [
      [
        "编码 frame",
        "固定头明确 magic、version、type、length 和必要校验。",
        "依赖分隔符却没有转义，或 length 未定义字节序。",
        "golden bytes、跨语言编码测试与 schema。",
      ],
      [
        "增量解码",
        "decoder 先等完整头，再按受限长度等待 body，可保留半包。",
        "一次 recv 被当成完整消息，恶意长度导致无限分配。",
        "随机分片测试、长度上限与模糊测试。",
      ],
      [
        "版本演进",
        "未知可选字段可跳过，破坏性变更通过显式版本协商。",
        "复用旧字段改变语义，新旧节点静默误解。",
        "兼容矩阵、回放旧流量与灰度指标。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "07-official/single-service-structure.mdx",
    slug: "single-service-structure",
    component: "SingleServiceArchitectureLab",
    practiceMode: "design",
    title: "单服务请求路径与模块责任",
    prompt:
      "选择请求阶段，检查 acceptor、session、业务执行和回包是否拥有清楚边界。",
    conclusion:
      "单服务结构的好坏由请求路径是否可追踪、状态是否单一归属、慢依赖是否受控来判断。",
    stages: [
      [
        "接入连接",
        "acceptor 只建立 session 与初始限制，不承载业务工作。",
        "接入线程做 DNS、鉴权或数据库调用，监听队列被拖死。",
        "accept latency、backlog 与 session 数。",
      ],
      [
        "执行请求",
        "decoder 产生 typed request，worker 在明确超时和并发预算内调用业务。",
        "session 锁覆盖慢调用，单个请求阻塞同连接全部工作。",
        "queue time、锁等待、deadline 与 trace span。",
      ],
      [
        "回包清理",
        "响应按连接写队列串行化，关闭时取消 pending work。",
        "多个线程并发写 socket，断连后任务继续持有 session。",
        "写队列深度、取消日志与析构断言。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "08-official/redis-network-module-source-analysis.mdx",
    slug: "redis-network-module-source-analysis",
    component: "RedisEventLoopLab",
    practiceMode: "diagnosis",
    title: "Redis 网络事件从 fd 到命令执行",
    prompt: "沿事件循环检查监听、读缓冲、命令解析、回复队列和可写事件。",
    conclusion:
      "源码阅读必须把函数名放回事件循环与数据结构；否则看到的是局部实现，解释不了吞吐和延迟。",
    stages: [
      [
        "接收事件",
        "event loop 把可读 fd 分派给连接读处理器。",
        "只看 accept/read 函数，不确认事件注册和触发模式。",
        "事件表、fd 状态与调用路径。",
      ],
      [
        "解析执行",
        "输入缓冲允许半包与多命令，完整命令才进入执行。",
        "把一次 read 当一条命令，忽略协议增量解析。",
        "query buffer 游标、RESP frame 与命令 trace。",
      ],
      [
        "发送回复",
        "回复先进入输出缓冲，需要时注册可写事件并处理短写。",
        "大回复或慢客户端让缓冲无限增长。",
        "output buffer、client limit 与 writable 注册变化。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "09-official/common-server-module-design.mdx",
    slug: "common-server-module-design",
    component: "ServerModuleResilienceLab",
    practiceMode: "design",
    title: "重连、心跳、日志与配置模块的恢复契约",
    prompt:
      "选择通用模块，验证它在依赖失败、配置变化和流量压力下怎样保持系统可控。",
    conclusion:
      "通用模块不是工具函数集合；每个模块都要声明状态、并发模型、失败策略和可观测证据。",
    stages: [
      [
        "连接与重试",
        "指数退避、抖动、上限和熔断共同控制恢复流量。",
        "所有实例同步立即重连，故障依赖被重试风暴压垮。",
        "重试分布、熔断状态与依赖负载。",
      ],
      [
        "心跳与超时",
        "心跳区分连接存活、请求进展和业务健康，超时使用单调时钟。",
        "只收到 TCP ACK 就宣布业务健康，或时钟跳变触发误杀。",
        "last-progress、deadline 与探针分层指标。",
      ],
      [
        "日志与配置",
        "结构化日志保留 request id，配置变更先校验再原子切换。",
        "热更新留下半新半旧状态，日志缺少版本和关联键。",
        "config revision、拒绝原因、trace id 与回滚记录。",
      ],
    ],
  },
  {
    book: "cpp-server-essence",
    mdx: "03-engineering/cse-final-review.mdx",
    slug: "cse-final-review",
    component: "CppServerFinalReviewLab",
    practiceMode: "diagnosis",
    title: "从一条请求完成服务器整书验收",
    prompt: "选择事故面，检查 owner、状态迁移和证据能否串起九章内容。",
    conclusion:
      "整书验收要求同一条请求从构建产物到恢复过程都可追踪；任何无法定位责任和状态的环节都不能算完成。",
    stages: [
      [
        "资源与线程",
        "对象 owner、线程池和同步不变量在启动时就确定。",
        "session 生命周期越过线程池关闭，或锁保护范围不明。",
        "owner graph、线程 dump 与 shutdown 测试。",
      ],
      [
        "字节与协议",
        "socket 状态、缓冲游标和 frame decoder 共同解释请求进度。",
        "把超时归因于网络，却没有确认连接状态和未完成 frame。",
        "pcap、buffer metrics 与协议 trace。",
      ],
      [
        "服务与恢复",
        "模块边界、依赖超时、重试和可观测性形成故障闭环。",
        "告警只能说明失败，不能关联版本、请求和恢复动作。",
        "distributed trace、配置版本与演练记录。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "fundamentals/hello-concurrency.mdx",
    slug: "hello-concurrency",
    component: "HelloConcurrencyLab",
    practiceMode: "simulation",
    title: "并发收益、成本与任务边界",
    prompt:
      "切换评估阶段，判断一个任务是否值得并发，以及速度提升会被什么限制。",
    conclusion:
      "并发不是默认加速开关；只有任务可分、共享边界清楚且调度成本可控时，多线程才产生净收益。",
    stages: [
      [
        "识别独立工作",
        "先找能并行推进且不依赖同一可变状态的工作单元。",
        "把强顺序流程硬拆成线程，只增加等待和同步。",
        "依赖图、串行基线与关键路径。",
      ],
      [
        "估算并发成本",
        "线程创建、切换、同步和缓存迁移都要计入总时间。",
        "只比较核心计算，忽略小任务的调度开销。",
        "端到端基准、上下文切换与 CPU 利用率。",
      ],
      [
        "定义正确性",
        "输出必须在所有合法调度下满足同一不变量。",
        "一次运行正确就宣布线程安全。",
        "重复压力测试、竞争检测与结果不变量。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "fundamentals/managing-threads.mdx",
    slug: "managing-threads",
    component: "ManagingThreadsLab",
    practiceMode: "diagnosis",
    title: "线程所有权、参数传递与结束协议",
    prompt: "沿线程生命周期检查谁负责 join、对象能活多久、异常路径怎样收尾。",
    conclusion:
      "std::thread 是一种必须消费的所有权；代码需要在创建时就证明参数寿命和 join/detach 决策。",
    stages: [
      [
        "创建线程",
        "按值复制或用显式引用包装传参，确保被引用对象活过线程执行。",
        "临时对象和栈引用在线程启动后已失效。",
        "类型检查、对象寿命图与 sanitizer。",
      ],
      [
        "转移所有权",
        "thread 可移动不可复制，owner 变化必须在控制流中可见。",
        "线程对象被覆盖或离开作用域时仍 joinable，触发 terminate。",
        "joinable 断言、move 路径与异常测试。",
      ],
      [
        "结束线程",
        "join 建立等待关系；detach 只有在独立寿命和退出策略明确时使用。",
        "异常跳过 join，或 detached 线程访问已销毁状态。",
        "RAII joiner、停止日志与 shutdown 测试。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "shared-data/protecting-shared-data.mdx",
    slug: "protecting-shared-data",
    component: "ProtectingSharedDataLab",
    practiceMode: "simulation",
    title: "共享不变量、锁域与死锁关系",
    prompt: "选择共享数据访问阶段，验证锁保护的是完整不变量而不是单个语句。",
    conclusion:
      "互斥量的价值是保护不变量；如果接口把检查和修改拆开，内部每个函数加锁仍可能产生竞态。",
    stages: [
      [
        "圈定不变量",
        "把必须一起观察和更新的字段放入同一保护域。",
        "每个字段各自安全，但组合状态出现不可能取值。",
        "状态断言、锁域图与竞争检测。",
      ],
      [
        "设计原子接口",
        "把检查与操作合成一次调用，并避免返回受保护对象的裸引用。",
        "empty/top/pop 分离导致检查后状态已变化。",
        "并发接口测试与引用逃逸审计。",
      ],
      [
        "避免死锁",
        "多锁操作使用统一顺序或 scoped_lock 一次取得。",
        "不同路径反向持锁形成环形等待。",
        "锁顺序表、wait-for graph 与超时 dump。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "shared-data/synchronizing-operations.mdx",
    slug: "synchronizing-operations",
    component: "SynchronizingOperationsLab",
    practiceMode: "simulation",
    title: "条件等待与一次性结果传递",
    prompt: "沿等待、发布和取结果阶段检查条件变量与 future 的同步语义。",
    conclusion:
      "等待必须围绕可重复检查的状态谓词；通知和 future 只是传递进展，不能替代状态本身。",
    stages: [
      [
        "进入等待",
        "condition_variable::wait 在同一 mutex 下反复检查谓词。",
        "无谓词等待遭遇虚假唤醒，或检查与入睡之间丢通知。",
        "谓词状态、锁持有与等待时序。",
      ],
      [
        "发布结果",
        "先修改受保护状态，再通知等待者；promise 可传值或异常。",
        "只发通知不改状态，或 promise 被销毁未给结果。",
        "状态日志、broken_promise 与通知计数。",
      ],
      [
        "消费结果",
        "future 只 get 一次，shared_future 用于多方只读等待。",
        "重复 get，或 deferred async 从未被等待而不执行。",
        "future 状态、launch policy 与超时测试。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "memory-model/atomic-types.mdx",
    slug: "atomic-types",
    component: "AtomicTypesLab",
    practiceMode: "simulation",
    title: "原子对象的修改顺序与 CAS 重试",
    prompt: "切换原子操作阶段，区分单对象原子性、修改顺序和无锁实现。",
    conclusion:
      "std::atomic 保证操作语义，不自动保证整个算法正确或实现无锁；CAS 失败路径同样属于协议。",
    stages: [
      [
        "选择原子对象",
        "并发读写同一内存位置时，用合适的 atomic 类型消除数据竞争。",
        "普通变量并发读写触发未定义行为，而不只是偶尔撕裂。",
        "TSan、类型声明与访问点清单。",
      ],
      [
        "执行读改写",
        "fetch_add 等原子读改写在单一修改顺序中占一个位置。",
        "load 后计算再 store 被误当成原子复合更新。",
        "丢失更新测试与 modification order 推导。",
      ],
      [
        "处理 CAS",
        "compare_exchange 失败会更新 expected，weak 允许伪失败并通常循环。",
        "失败后仍用旧 expected，或假设 atomic 一定 lock-free。",
        "重试次数、is_lock_free 与状态不变量。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "memory-model/memory-ordering.mdx",
    slug: "memory-ordering",
    component: "MemoryOrderingLab",
    practiceMode: "simulation",
    title: "release/acquire 如何建立 happens-before",
    prompt:
      "沿发布线程和消费线程推导 sequenced-before、synchronizes-with 与可见性。",
    conclusion:
      "内存序必须从跨线程不变量反推；只有读到对应 release 值的 acquire 才建立同步边。",
    stages: [
      [
        "发布数据",
        "普通写在 release store 之前 sequenced-before。",
        "用 relaxed 标志发布非原子数据，消费者无可见性保证。",
        "线程内顺序、store memory order 与写集合。",
      ],
      [
        "读取标志",
        "acquire load 必须读到 release 或其 release sequence 中的值。",
        "只看到标志为真就假设同步，却没有来源关系。",
        "read-from 关系与观测值。",
      ],
      [
        "推导可见性",
        "synchronizes-with 连接两线程，再由传递性形成 happens-before。",
        "把 seq_cst 当性能标签，或在没有同步边时谈跨变量顺序。",
        "happens-before 图、litmus test 与汇编检查。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "data-structures/lock-based.mdx",
    slug: "lock-based",
    component: "LockBasedStructuresLab",
    practiceMode: "design",
    title: "锁粒度、接口安全与并发数据结构",
    prompt: "选择数据结构层级，比较粗粒度锁、分桶锁和逐节点锁的正确性边界。",
    conclusion:
      "细粒度锁只有在不变量可以局部分解时才提高并发；接口、异常和节点寿命仍必须整体证明。",
    stages: [
      [
        "定义接口",
        "pop 返回值与状态变化一次完成，不暴露锁外失效的内部引用。",
        "线程安全成员函数组合成非线程安全调用序列。",
        "接口竞态测试与异常路径。",
      ],
      [
        "拆分锁域",
        "分桶或逐节点锁让独立键和节点并行，但每个不变量有明确边界。",
        "锁拆得比不变量更细，跨桶操作观察到半更新。",
        "锁域表、并发度与状态一致性。",
      ],
      [
        "移动锁",
        "hand-over-hand 先取得下一节点再释放当前节点。",
        "释放当前锁后再找下一节点，节点可能被并发删除。",
        "节点寿命策略、锁序列与 sanitizer。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "data-structures/lock-free.mdx",
    slug: "lock-free",
    component: "LockFreeStructuresLab",
    practiceMode: "diagnosis",
    title: "无锁进展、CAS 循环与安全回收",
    prompt: "沿无锁操作检查线性化点、失败重试、ABA 和节点回收。",
    conclusion:
      "去掉 mutex 只是开始；无锁结构必须同时证明线性化、进展保证和对象寿命。",
    stages: [
      [
        "确定线性化点",
        "一次成功 CAS 决定操作在全局历史中的生效位置。",
        "多个字段分步更新，却没有唯一可观察的提交点。",
        "CAS 成功事件与顺序历史检查。",
      ],
      [
        "处理竞争失败",
        "CAS 失败后重读真实状态并重新计算候选更新。",
        "无限重试没有退避或帮助机制，线程持续占用 CPU。",
        "失败率、重试分布与 progress 测试。",
      ],
      [
        "安全回收节点",
        "hazard pointer、引用计数或 epoch 保证读者结束前节点不释放。",
        "pop 后立即 delete，另一个线程仍持有旧地址；ABA 又让 CAS 误判。",
        "回收队列、地址版本与 ASan 压测。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "advanced/designing-concurrent-code.mdx",
    slug: "designing-concurrent-code",
    component: "DesigningConcurrentCodeLab",
    practiceMode: "design",
    title: "任务划分、缓存局部性与可伸缩性",
    prompt: "选择设计层级，判断瓶颈来自串行比例、同步、缓存还是过度并行。",
    conclusion:
      "并发设计先优化关键路径和数据布局，再决定线程数；核数不能突破串行部分和共享瓶颈。",
    stages: [
      [
        "划分任务",
        "按数据块、递归子问题或流水线阶段切分，并标出依赖。",
        "强依赖任务被硬拆，线程大部分时间互相等待。",
        "任务 DAG、关键路径与负载分布。",
      ],
      [
        "布局数据",
        "让每个线程主要访问自己的缓存行并保持数据接近。",
        "不同变量落在同一缓存行，产生 false sharing。",
        "cache miss、行失效与对齐实验。",
      ],
      [
        "评估扩展",
        "用串行比例和实测开销解释速度上限，避免超额订阅。",
        "只报告单次加速比，不测核数曲线和尾延迟。",
        "scaling curve、Amdahl 估算与上下文切换。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "advanced/thread-pools.mdx",
    slug: "thread-pools",
    component: "ThreadPoolDesignLab",
    practiceMode: "simulation",
    title: "线程池提交、调度与停止协议",
    prompt: "沿任务生命周期检查队列争用、future 结果、工作窃取和协作停止。",
    conclusion:
      "线程池是任务所有权系统；提交失败、任务异常和关闭时未完成工作都必须有明确结果。",
    stages: [
      [
        "提交任务",
        "packaged_task 把 callable 与 future 结果绑定，关闭后拒绝新任务。",
        "任务入队失败却返回永不就绪的 future。",
        "提交状态、队列结果与 broken promise 测试。",
      ],
      [
        "调度执行",
        "worker 优先本地队列，空闲时窃取其他队列尾部以平衡负载。",
        "所有线程争用一个全局队列，或池内互等 future 造成饥饿。",
        "队列长度、窃取次数与阻塞栈。",
      ],
      [
        "停止线程池",
        "停止信号、排空策略、任务取消和 join 顺序构成单一协议。",
        "析构时仍接收任务，或强杀正在持锁的 worker。",
        "shutdown trace、未完成任务数与重复停止测试。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "advanced/parallel-algorithms.mdx",
    slug: "parallel-algorithms",
    component: "ParallelAlgorithmsLab",
    practiceMode: "design",
    title: "执行策略、归约律与并行收益",
    prompt:
      "选择算法阶段，判断 callable 是否线程安全、归约是否可重排、数据规模是否值得并行。",
    conclusion:
      "执行策略授权实现改变调度和顺序；只有无共享副作用且满足代数约束的操作才可安全并行。",
    stages: [
      [
        "选择策略",
        "seq、par 与 par_unseq 分别允许不同并发和向量化自由。",
        "par_unseq 中加锁或执行不安全的阻塞操作。",
        "策略约束、工具链支持与线程观测。",
      ],
      [
        "验证运算律",
        "reduce 的合并操作要满足结合性，并接受不同分组顺序。",
        "用浮点或非结合操作期待与串行逐项完全相同。",
        "随机分块、误差界与结果不变量。",
      ],
      [
        "衡量收益",
        "数据规模、单项成本和内存带宽共同决定是否加速。",
        "小输入无脑并行，调度成本超过计算。",
        "规模曲线、带宽指标与串行基线。",
      ],
    ],
  },
  {
    book: "cpp-concurrency",
    mdx: "advanced/testing-debugging.mdx",
    slug: "testing-debugging",
    component: "ConcurrencyTestingLab",
    practiceMode: "diagnosis",
    title: "并发缺陷分类与证据组合",
    prompt: "从症状出发区分数据竞争、条件竞争、死锁、活锁和性能退化。",
    conclusion:
      "并发测试的目标不是固定一种时序，而是在许多合法时序中持续验证不变量，并保留可复现证据。",
    stages: [
      [
        "分类症状",
        "无进展先区分阻塞等待、循环重试和单纯缓慢；错误结果再查竞争。",
        "把活锁当死锁，或把条件竞争等同于 data race。",
        "线程 dump、CPU 使用率与进度计数。",
      ],
      [
        "运行检测",
        "TSan 发现未同步冲突，压力与故障注入扩大稀有交错。",
        "加日志改变时序后 bug 消失，就认为已经修复。",
        "sanitizer 报告、随机种子与事件 trace。",
      ],
      [
        "验证修复",
        "修复后同时检查正确性、不变量、吞吐和尾延迟。",
        "用一把大锁消除报错，却让系统失去进展或性能。",
        "回归矩阵、锁等待与基准对比。",
      ],
    ],
  },
];

const officialUnitIds = {
  "hello-concurrency": "ccia2-01",
  "managing-threads": "ccia2-02",
  "protecting-shared-data": "ccia2-03",
  "synchronizing-operations": "ccia2-04",
  "atomic-types": "ccia2-05",
  "memory-ordering": "ccia2-05",
  "lock-based": "ccia2-06",
  "lock-free": "ccia2-07",
  "designing-concurrent-code": "ccia2-08",
  "thread-pools": "ccia2-09",
  "parallel-algorithms": "ccia2-10",
  "testing-debugging": "ccia2-11",
};

function wrapperSource(chapter) {
  const mechanismComponent = chapter.component.replace(/Lab$/, "MechanismMap");
  const failureComponent = chapter.component.replace(/Lab$/, "FailureDiagram");
  const stages = chapter.stages.map(
    ([label, mechanism, failure, evidence]) => ({
      label,
      mechanism,
      failure,
      evidence,
    }),
  );
  return `"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = ${JSON.stringify(stages, null, 2)};

export function ${chapter.component}() {
  return (
    <ChapterDecisionLab
      title=${JSON.stringify(chapter.title)}
      prompt=${JSON.stringify(chapter.prompt)}
      stages={STAGES}
      conclusion=${JSON.stringify(chapter.conclusion)}
    />
  );
}

export function ${mechanismComponent}() {
  return (
    <ChapterMechanismMap
      title=${JSON.stringify(chapter.title)}
      stages={STAGES}
    />
  );
}

export function ${failureComponent}() {
  return (
    <ChapterFailureMatrix
      title=${JSON.stringify(chapter.title)}
      stages={STAGES}
    />
  );
}
`;
}

function updateMdx(chapter) {
  const mdxPath = path.join(ROOT, "content", chapter.book, chapter.mdx);
  let source = fs.readFileSync(mdxPath, "utf8");
  if (chapter.book === "cpp-concurrency") {
    source = source.replace(/\n?\{\/\*[\s\S]*?\*\/\}\n?/g, "\n\n");
    source = source.replace(
      /<Attribution\s+title="([^"]+)"\s+url="([^"]+)"\s*\/>/g,
      '<Attribution\n  adaptedFrom="$1"\n  adaptedUrl="$2"\n  mode="independent-rewrite"\n  sourceBasis="outline-only"\n/>',
    );
  }
  if (!source.includes("qualityVersion: 2")) {
    source = source.replace(
      "draft: false\n---",
      `draft: false\nqualityVersion: 2\npracticeMode: ${chapter.practiceMode}\nsourceMode: independent-rewrite\n---`,
    );
  }
  const officialUnitId = officialUnitIds[chapter.slug];
  if (officialUnitId && !source.includes("officialUnitId:")) {
    source = source.replace(
      "sourceMode: independent-rewrite",
      `sourceMode: independent-rewrite\nofficialUnitId: ${officialUnitId}`,
    );
  }
  const mechanismComponent = chapter.component.replace(/Lab$/, "MechanismMap");
  const oldFailureComponent = chapter.component.replace(
    /Lab$/,
    "FailureMatrix",
  );
  const failureComponent = chapter.component.replace(/Lab$/, "FailureDiagram");
  source = source.replaceAll(oldFailureComponent, failureComponent);
  const oldImportLine = `import { ${chapter.component} } from "@/components/mdx/${chapter.book}/${chapter.slug}";`;
  const importLine = `import { ${chapter.component}, ${mechanismComponent}, ${failureComponent} } from "@/components/mdx/${chapter.book}/${chapter.slug}";`;
  if (source.includes(oldImportLine)) {
    source = source.replace(oldImportLine, importLine);
  }
  if (!source.includes(importLine)) {
    source = source.replace(
      'import { Attribution } from "@/components/mdx/attribution";',
      `import { Attribution } from "@/components/mdx/attribution";\n${importLine}`,
    );
  }
  const oldLab = `<${chapter.component} />`;
  const lab = `<${mechanismComponent} />\n\n<${chapter.component} />\n\n<${failureComponent} />`;
  if (!source.includes(`<${mechanismComponent} />`)) {
    if (source.includes(oldLab)) {
      source = source.replace(oldLab, lab);
    } else {
      source = source.replace("</Objectives>", `</Objectives>\n\n${lab}`);
    }
  }
  fs.writeFileSync(mdxPath, source);
}

for (const chapter of chapters) {
  const componentDirectory = path.join(
    ROOT,
    "src/components/mdx",
    chapter.book,
  );
  fs.mkdirSync(componentDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(componentDirectory, `${chapter.slug}.tsx`),
    wrapperSource(chapter),
  );
  updateMdx(chapter);
}

console.log(
  `Remediated ${chapters.length} chapters across ${new Set(chapters.map((chapter) => chapter.book)).size} books.`,
);
