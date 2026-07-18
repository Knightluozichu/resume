import type { ReviewQuestion } from "./types";
/** Mastering Rust, Second Edition 官方17个内容章复习题。 */
export const mrsOfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "mrs-getting-started-1",
    "chapter": "mrs-getting-started",
    "level": 1,
    "question": "第1章中，Rust 的定位与价值的核心责任是什么？",
    "answer": "Rust把内存安全、并发安全和接近底层的性能放在同一套静态规则中；价值不在语法新颖，而在让资源生命周期与可变性成为可检查契约。",
    "tags": [
      "第1章",
      "Rust 的定位与价值"
    ]
  },
  {
    "id": "mrs-getting-started-2",
    "chapter": "mrs-getting-started",
    "level": 2,
    "question": "编译器与工具链安装与语言全景怎样协作？",
    "answer": "rustup负责安装和切换工具链，rustc负责编译，cargo负责编排项目；验收安装不能只看版本号，还要编译、运行并删除一个最小程序。 变量默认不可变，match要求穷尽，Result显式承载失败，所有权决定值何时移动或借用；这些规则共同把运行期隐患提前到编译期。",
    "tags": [
      "第1章",
      "机制"
    ]
  },
  {
    "id": "mrs-getting-started-3",
    "chapter": "mrs-getting-started",
    "level": 3,
    "question": "如何为单词计数器设计边界实验？",
    "answer": "原书用修复单词计数器串起输入、字符串处理、映射聚合与错误反馈；正确性边界包括Unicode分词、大小写规则、空输入和稳定输出。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第1章",
      "实验"
    ]
  },
  {
    "id": "mrs-getting-started-4",
    "chapter": "mrs-getting-started",
    "level": 4,
    "question": "怎样用编译器反馈闭环完成本章验收？",
    "answer": "Rust学习的关键闭环是先预测所有权和类型，再编译读取诊断，最后做最小修改并用测试证明语义，而不是逐条压制错误信息。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第1章",
      "验收"
    ]
  },
  {
    "id": "mrs-managing-projects-cargo-1",
    "chapter": "mrs-managing-projects-cargo",
    "level": 1,
    "question": "第2章中，包管理器的核心责任是什么？",
    "answer": "包管理器把依赖解析、版本约束、制品缓存和发布元数据变成可复现流程；锁文件与清单承担不同责任，库和应用对锁定策略也不同。",
    "tags": [
      "第2章",
      "包管理器"
    ]
  },
  {
    "id": "mrs-managing-projects-cargo-2",
    "chapter": "mrs-managing-projects-cargo",
    "level": 2,
    "question": "模块与可见性与Cargo 与 crate怎样协作？",
    "answer": "模块树组织名称和隐私边界，pub只开放必要接口；文件布局是模块结构的载体，不应让目录偶然决定公共API。 package是Cargo管理单元，crate是编译单元，target是库、二进制、示例或测试目标；先分清三者才能解释一次构建究竟产出什么。",
    "tags": [
      "第2章",
      "机制"
    ]
  },
  {
    "id": "mrs-managing-projects-cargo-3",
    "chapter": "mrs-managing-projects-cargo",
    "level": 3,
    "question": "如何为Cargo 扩展与工具设计边界实验？",
    "answer": "cargo fmt、clippy、metadata和自定义子命令共享项目模型；工具必须读取结构化元数据，不能靠猜测target目录或解析人类输出工作。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第2章",
      "实验"
    ]
  },
  {
    "id": "mrs-managing-projects-cargo-4",
    "chapter": "mrs-managing-projects-cargo",
    "level": 4,
    "question": "怎样用imgtool 项目完成本章验收？",
    "answer": "原书的imgtool把清单、模块、依赖、命令行和图像处理连成项目；验收要覆盖输入格式、输出路径、失败原子性与重复执行。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第2章",
      "验收"
    ]
  },
  {
    "id": "mrs-tests-docs-benchmarks-1",
    "chapter": "mrs-tests-docs-benchmarks",
    "level": 1,
    "question": "第3章中，测试动机的核心责任是什么？",
    "answer": "测试不是证明程序绝对正确，而是把需求、边界与回归风险编码成可重复证据；优先验证公共行为和不变量，不锁死无关实现细节。",
    "tags": [
      "第3章",
      "测试动机"
    ]
  },
  {
    "id": "mrs-tests-docs-benchmarks-2",
    "chapter": "mrs-tests-docs-benchmarks",
    "level": 2,
    "question": "单元测试与集成测试与文档测试怎样协作？",
    "answer": "单元测试贴近私有实现并快速定位，集成测试从crate外部验证公共契约；二者覆盖不同边界，不能用大量单元测试代替真实调用路径。 Rust文档中的可运行代码同时承担说明和回归测试；示例应最小、完整、可复制，并明确错误路径而不只展示成功输出。",
    "tags": [
      "第3章",
      "机制"
    ]
  },
  {
    "id": "mrs-tests-docs-benchmarks-3",
    "chapter": "mrs-tests-docs-benchmarks",
    "level": 3,
    "question": "如何为基准测量设计边界实验？",
    "answer": "基准必须区分预热、采样、方差和环境噪声，比较前固定输入与编译配置；单次计时和debug构建不能支持性能结论。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第3章",
      "实验"
    ]
  },
  {
    "id": "mrs-tests-docs-benchmarks-4",
    "chapter": "mrs-tests-docs-benchmarks",
    "level": 4,
    "question": "怎样用逻辑门模拟器与持续集成完成本章验收？",
    "answer": "原书用逻辑门crate串联测试、文档、基准和Travis CI；现代流水线实现可以变化，但干净环境、固定工具链、失败阻断与制品证据必须保留。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第3章",
      "验收"
    ]
  },
  {
    "id": "mrs-types-generics-traits-1",
    "chapter": "mrs-types-generics-traits",
    "level": 1,
    "question": "第4章中，类型系统的核心责任是什么？",
    "answer": "类型系统把可执行操作限制在满足契约的值上；Rust同时利用静态类型、推导和代数数据类型，让非法状态更难被构造。",
    "tags": [
      "第4章",
      "类型系统"
    ]
  },
  {
    "id": "mrs-types-generics-traits-2",
    "chapter": "mrs-types-generics-traits",
    "level": 2,
    "question": "泛型与Trait 抽象行为怎样协作？",
    "answer": "泛型在不复制算法的前提下抽象类型参数，单态化通常生成专用机器码；抽象成本需要从代码体积、编译时间与运行性能三方面判断。 trait描述共享行为，impl把行为绑定到具体类型；接口设计应保持最小，并通过关联类型或泛型参数表达调用者真正需要选择的自由度。",
    "tags": [
      "第4章",
      "机制"
    ]
  },
  {
    "id": "mrs-types-generics-traits-3",
    "chapter": "mrs-types-generics-traits",
    "level": 3,
    "question": "如何为Trait bound设计边界实验？",
    "answer": "trait bound是泛型算法的能力证明，where子句让多个约束更清晰；过宽约束会拒绝本可接受的类型，过窄约束会把错误推迟到实现内部。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第4章",
      "实验"
    ]
  },
  {
    "id": "mrs-types-generics-traits-4",
    "chapter": "mrs-types-generics-traits",
    "level": 4,
    "question": "怎样用标准 Trait 与 Trait 对象完成本章验收？",
    "answer": "标准trait支撑转换、比较、迭代和格式化；trait对象以动态分发换取异构集合，只有对象安全的接口才能形成dyn边界。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第4章",
      "验收"
    ]
  },
  {
    "id": "mrs-memory-management-safety-1",
    "chapter": "mrs-memory-management-safety",
    "level": 1,
    "question": "第5章中，程序与内存的核心责任是什么？",
    "answer": "程序通过栈帧、静态区和堆组织不同生命周期的数据；讨论性能前要先回答值在哪里、由谁拥有以及何时释放。",
    "tags": [
      "第5章",
      "程序与内存"
    ]
  },
  {
    "id": "mrs-memory-management-safety-2",
    "chapter": "mrs-memory-management-safety",
    "level": 2,
    "question": "分配策略与内存管理陷阱怎样协作？",
    "answer": "栈分配快速且遵循作用域，堆分配支持动态大小和跨作用域所有权；Box、Rc与Arc表达不同所有权关系，不只是分配便利函数。 悬垂指针、重复释放、释放后使用、泄漏与数据竞争来自生命周期或别名规则失守；Rust安全子集通过所有权和借用静态排除其中大部分。",
    "tags": [
      "第5章",
      "机制"
    ]
  },
  {
    "id": "mrs-memory-management-safety-3",
    "chapter": "mrs-memory-management-safety",
    "level": 3,
    "question": "如何为内存安全三要素设计边界实验？",
    "answer": "访问有效内存、遵守初始化与布局、满足别名和同步规则共同构成安全边界；只证明指针非空远远不够。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第5章",
      "实验"
    ]
  },
  {
    "id": "mrs-memory-management-safety-4",
    "chapter": "mrs-memory-management-safety",
    "level": 4,
    "question": "怎样用Rust 指针类型完成本章验收？",
    "answer": "引用、Box、Rc、Arc、Cell、RefCell和裸指针各自编码所有权、共享与可变性；选择依据是语义证据，不是为了让借用检查器安静。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第5章",
      "验收"
    ]
  },
  {
    "id": "mrs-error-handling-1",
    "chapter": "mrs-error-handling",
    "level": 1,
    "question": "第6章中，可恢复错误的核心责任是什么？",
    "answer": "Result把成功值和失败值放进类型，调用者必须选择传播、转换或恢复；错误类型应携带可判断上下文，而不是只返回模糊字符串。",
    "tags": [
      "第6章",
      "可恢复错误"
    ]
  },
  {
    "id": "mrs-error-handling-2",
    "chapter": "mrs-error-handling",
    "level": 2,
    "question": "Option 与 Result 组合子与问号运算符与提前返回怎样协作？",
    "answer": "map、and_then、ok_or_else等组合子把直线路径与失败路径分开；链条过长时使用显式match可以提高诊断和可读性。 问号运算符在失败时通过From转换并提前返回，成功时解包；它简化传播但不会自动增加操作上下文。",
    "tags": [
      "第6章",
      "机制"
    ]
  },
  {
    "id": "mrs-error-handling-3",
    "chapter": "mrs-error-handling",
    "level": 3,
    "question": "如何为不可恢复错误设计边界实验？",
    "answer": "panic表示当前契约已被破坏或程序无法继续，不应用于普通输入、网络超时或文件缺失；库边界尤其应让调用者决定恢复策略。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第6章",
      "实验"
    ]
  },
  {
    "id": "mrs-error-handling-4",
    "chapter": "mrs-error-handling",
    "level": 4,
    "question": "怎样用自定义错误与 Error Trait完成本章验收？",
    "answer": "枚举错误保留失败类别与源错误，Display面向人，Error source形成因果链；边界层再决定日志、退出码和用户消息。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第6章",
      "验收"
    ]
  },
  {
    "id": "mrs-advanced-concepts-1",
    "chapter": "mrs-advanced-concepts",
    "level": 1,
    "question": "第7章中，字符串与全局值的核心责任是什么？",
    "answer": "String拥有UTF-8字节而str是借用视图，索引必须尊重字符边界；全局状态需要明确初始化、同步和测试隔离，不能用static mut逃避设计。",
    "tags": [
      "第7章",
      "字符串与全局值"
    ]
  },
  {
    "id": "mrs-advanced-concepts-2",
    "chapter": "mrs-advanced-concepts",
    "level": 2,
    "question": "迭代器与闭包与高级类型与 Trait怎样协作？",
    "answer": "迭代器把遍历与变换组合成惰性管线，闭包捕获方式由使用决定；move改变捕获所有权，不等于自动满足线程安全。 关联类型、完全限定语法、新类型和高阶生命周期约束解决复杂抽象问题；只有在公共契约需要时才引入，避免类型体操掩盖数据流。",
    "tags": [
      "第7章",
      "机制"
    ]
  },
  {
    "id": "mrs-advanced-concepts-3",
    "chapter": "mrs-advanced-concepts",
    "level": 3,
    "question": "如何为模式、转换与强制转换设计边界实验？",
    "answer": "match guard、解构和范围模式表达控制流，as转换可能截断或改变符号；优先使用TryFrom等可失败转换保存错误信息。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第7章",
      "实验"
    ]
  },
  {
    "id": "mrs-advanced-concepts-4",
    "chapter": "mrs-advanced-concepts",
    "level": 4,
    "question": "怎样用Serde 序列化完成本章验收？",
    "answer": "Serde把数据模型与格式实现分离，derive减少样板；反序列化仍是不可信输入边界，需要大小限制、字段策略、版本迁移和语义校验。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第7章",
      "验收"
    ]
  },
  {
    "id": "mrs-concurrency-1",
    "chapter": "mrs-concurrency",
    "level": 1,
    "question": "第8章中，程序执行模型的核心责任是什么？",
    "answer": "进程、线程、事件循环和actor对隔离、调度与通信做出不同取舍；先识别任务是CPU密集还是等待密集，再选择模型。",
    "tags": [
      "第8章",
      "程序执行模型"
    ]
  },
  {
    "id": "mrs-concurrency-2",
    "chapter": "mrs-concurrency",
    "level": 2,
    "question": "线程与消息传递与共享状态怎样协作？",
    "answer": "线程共享地址空间，channel把所有权随消息转移；消息协议仍要定义关闭、超时、背压和失败确认。 Arc表达跨线程共享所有权，Mutex或RwLock保护可变状态；锁的范围、顺序和中毒处理是运行时协议，类型系统不会替你设计业务不变量。",
    "tags": [
      "第8章",
      "机制"
    ]
  },
  {
    "id": "mrs-concurrency-3",
    "chapter": "mrs-concurrency",
    "level": 3,
    "question": "如何为Send 与 Sync设计边界实验？",
    "answer": "Send表示值可跨线程转移，Sync表示共享引用可跨线程访问；它们把大量线程安全约束编码进类型，但unsafe实现必须由作者证明。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第8章",
      "实验"
    ]
  },
  {
    "id": "mrs-concurrency-4",
    "chapter": "mrs-concurrency",
    "level": 4,
    "question": "怎样用Actor 与并发生态完成本章验收？",
    "answer": "actor用邮箱隔离状态并按消息驱动，减少共享内存但引入队列、监督和消息时序问题；选择库前先验证取消、背压与关闭语义。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第8章",
      "验收"
    ]
  },
  {
    "id": "mrs-metaprogramming-macros-1",
    "chapter": "mrs-metaprogramming-macros",
    "level": 1,
    "question": "第9章中，元编程边界的核心责任是什么？",
    "answer": "元编程在编译期生成或变换代码，适合重复语法和领域接口；如果函数或泛型能清楚表达，就不应让宏隐藏控制流和类型错误。",
    "tags": [
      "第9章",
      "元编程边界"
    ]
  },
  {
    "id": "mrs-metaprogramming-macros-2",
    "chapter": "mrs-metaprogramming-macros",
    "level": 2,
    "question": "声明宏与重复与 DSL怎样协作？",
    "answer": "macro_rules使用模式匹配输入token并展开模板，片段说明符限定语法类别；展开结果仍接受名称解析、类型检查和借用检查。 重复模式可以构建集合初始化等小型DSL，但分隔符、零项和尾逗号必须显式设计；DSL错误消息也是公共接口的一部分。",
    "tags": [
      "第9章",
      "机制"
    ]
  },
  {
    "id": "mrs-metaprogramming-macros-3",
    "chapter": "mrs-metaprogramming-macros",
    "level": 3,
    "question": "如何为过程宏与派生宏设计边界实验？",
    "answer": "过程宏接收TokenStream并返回TokenStream，属性宏、函数式宏和derive用途不同；实现应保留span，让诊断指向调用者源码。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第9章",
      "实验"
    ]
  },
  {
    "id": "mrs-metaprogramming-macros-4",
    "chapter": "mrs-metaprogramming-macros",
    "level": 4,
    "question": "怎样用宏测试与调试完成本章验收？",
    "answer": "宏既要测试展开后的运行语义，也要测试应当编译失败的输入；调试先缩小token边界，再检查展开和卫生，而不是在宏中打印临时文本。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第9章",
      "验收"
    ]
  },
  {
    "id": "mrs-unsafe-ffi-1",
    "chapter": "mrs-unsafe-ffi",
    "level": 1,
    "question": "第10章中，安全与 Unsafe 契约的核心责任是什么？",
    "answer": "unsafe只开放解引用裸指针、调用unsafe函数、访问可变静态等额外能力，不关闭借用检查；每个unsafe块都必须附带调用者可验证的不变量。",
    "tags": [
      "第10章",
      "安全与 Unsafe 契约"
    ]
  },
  {
    "id": "mrs-unsafe-ffi-2",
    "chapter": "mrs-unsafe-ffi",
    "level": 2,
    "question": "从 Rust 调用 C与从 C 调用 Rust怎样协作？",
    "answer": "extern声明ABI，调用前要核对整数宽度、布局、空指针、字符串终止和错误码；链接成功不代表跨语言语义正确。 导出函数需要稳定ABI和符号，不能让panic穿越FFI边界；所有权转交、释放函数与线程规则必须写入头文件契约。",
    "tags": [
      "第10章",
      "机制"
    ]
  },
  {
    "id": "mrs-unsafe-ffi-3",
    "chapter": "mrs-unsafe-ffi",
    "level": 3,
    "question": "如何为外部 C/C++ 库设计边界实验？",
    "answer": "绑定层只负责原始表示，安全包装层验证长度、生命周期和状态机；C++异常、模板与名称改编通常需要C适配层。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第10章",
      "实验"
    ]
  },
  {
    "id": "mrs-unsafe-ffi-4",
    "chapter": "mrs-unsafe-ffi",
    "level": 4,
    "question": "怎样用Python 与 Node 原生扩展完成本章验收？",
    "answer": "PyO3和Node扩展框架降低绑定样板，但解释器锁、运行时线程、对象生命周期和错误转换仍是跨边界责任。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第10章",
      "验收"
    ]
  },
  {
    "id": "mrs-logging-1",
    "chapter": "mrs-logging",
    "level": 1,
    "question": "第11章中，日志目的的核心责任是什么？",
    "answer": "日志记录系统在何时、以什么上下文做了什么决定，用于诊断与审计；它不是任意字符串堆积，也不能替代指标和分布式追踪。",
    "tags": [
      "第11章",
      "日志目的"
    ]
  },
  {
    "id": "mrs-logging-2",
    "chapter": "mrs-logging",
    "level": 2,
    "question": "日志框架需求与结构化事件怎样协作？",
    "answer": "框架需要级别过滤、目标分类、格式化、输出后端和并发安全；库只发事件，最终应用负责初始化全局订阅者与策略。 稳定字段比拼接文本更容易查询，至少包含事件名、请求或任务标识、结果与耗时；秘密、令牌和个人数据必须在产生前移除。",
    "tags": [
      "第11章",
      "机制"
    ]
  },
  {
    "id": "mrs-logging-3",
    "chapter": "mrs-logging",
    "level": 3,
    "question": "如何为级别与采样设计边界实验？",
    "answer": "error、warn、info和debug表达不同操作意义，不能按个人情绪选择；高频路径用采样或聚合控制成本，同时保留异常全量证据。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第11章",
      "实验"
    ]
  },
  {
    "id": "mrs-logging-4",
    "chapter": "mrs-logging",
    "level": 4,
    "question": "怎样用Rust 日志门面完成本章验收？",
    "answer": "原书讲解Rust日志生态与门面思想，具体crate和初始化API会演进；迁移时保留库与应用解耦、字段契约和可测试输出。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第11章",
      "验收"
    ]
  },
  {
    "id": "mrs-network-programming-1",
    "chapter": "mrs-network-programming",
    "level": 1,
    "question": "第12章中，网络编程前置模型的核心责任是什么？",
    "answer": "网络程序面对分段、乱序、半关闭、超时和不可信字节；TCP提供有序字节流，不提供消息边界或一次read对应一次send的保证。",
    "tags": [
      "第12章",
      "网络编程前置模型"
    ]
  },
  {
    "id": "mrs-network-programming-2",
    "chapter": "mrs-network-programming",
    "level": 2,
    "question": "同步网络 I/O与异步网络 I/O怎样协作？",
    "answer": "阻塞套接字让一个执行流等待一个操作，模型简单但连接数扩大后需要线程、超时和资源预算；每个调用都要处理短读短写。 异步I/O在等待就绪时让出执行权，Future由运行时轮询；不能在异步任务中长时间阻塞，也不能无限生成无背压任务。",
    "tags": [
      "第12章",
      "机制"
    ]
  },
  {
    "id": "mrs-network-programming-3",
    "chapter": "mrs-network-programming",
    "level": 3,
    "question": "如何为协议分帧设计边界实验？",
    "answer": "长度前缀、分隔符或固定宽度把字节流恢复成消息；解析器先验证长度上限再分配，畸形帧应关闭连接并留下可定位错误。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第12章",
      "实验"
    ]
  },
  {
    "id": "mrs-network-programming-4",
    "chapter": "mrs-network-programming",
    "level": 4,
    "question": "怎样用连接生命周期完成本章验收？",
    "answer": "连接接受、认证、读写、空闲、关闭和重试构成状态机；优雅关闭要停止接收、耗尽在途请求并在截止时间后强制退出。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第12章",
      "验收"
    ]
  },
  {
    "id": "mrs-web-applications-1",
    "chapter": "mrs-web-applications",
    "level": 1,
    "question": "第13章中，Rust Web 应用边界的核心责任是什么？",
    "answer": "Web应用把不可信HTTP请求转换为受约束的领域命令，再把结果映射为状态码与响应；路由层不应直接承载全部业务和持久化逻辑。",
    "tags": [
      "第13章",
      "Rust Web 应用边界"
    ]
  },
  {
    "id": "mrs-web-applications-2",
    "chapter": "mrs-web-applications",
    "level": 2,
    "question": "Hyper 类型化 HTTP与Actix-web 基础怎样协作？",
    "answer": "原书以Hyper展示请求、响应、header和body的类型化边界；底层控制力更强也意味着调用者负责流式body、超时与连接生命周期。 Actix-web把路由、提取器、中间件和应用状态组织成服务；框架API会演进，但验证、状态隔离和统一错误映射是不变架构。",
    "tags": [
      "第13章",
      "机制"
    ]
  },
  {
    "id": "mrs-web-applications-3",
    "chapter": "mrs-web-applications",
    "level": 3,
    "question": "如何为书签 API设计边界实验？",
    "answer": "原书书签API需要创建、读取和校验资源；资源ID、幂等语义、分页、冲突与不存在必须对应明确HTTP行为。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第13章",
      "实验"
    ]
  },
  {
    "id": "mrs-web-applications-4",
    "chapter": "mrs-web-applications",
    "level": 4,
    "question": "怎样用安全与可观察性完成本章验收？",
    "answer": "限制请求体、验证URL、设置超时并传播请求ID；认证与授权分开，错误响应不泄漏内部栈或数据库细节。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第13章",
      "验收"
    ]
  },
  {
    "id": "mrs-databases-1",
    "chapter": "mrs-databases",
    "level": 1,
    "question": "第14章中，数据持久化的核心责任是什么？",
    "answer": "持久化把进程内状态转成可恢复事实，需要schema、约束、事务和迁移；数据库成功写入不等于业务流程的所有外部副作用都成功。",
    "tags": [
      "第14章",
      "数据持久化"
    ]
  },
  {
    "id": "mrs-databases-2",
    "chapter": "mrs-databases",
    "level": 2,
    "question": "SQLite与PostgreSQL怎样协作？",
    "answer": "SQLite适合嵌入式和单文件场景，事务与锁仍需明确；连接、临时文件和备份必须按进程模型验证，不能把开发便利直接外推到多实例服务。 PostgreSQL提供并发事务、约束和丰富类型，查询参数必须绑定而非拼接；应用还要处理隔离级别、死锁重试和迁移兼容窗口。",
    "tags": [
      "第14章",
      "机制"
    ]
  },
  {
    "id": "mrs-databases-3",
    "chapter": "mrs-databases",
    "level": 3,
    "question": "如何为r2d2 连接池设计边界实验？",
    "answer": "连接池复用昂贵连接并限制并发，容量应由数据库预算反推；获取超时、失效连接检测和优雅关闭比简单clone池句柄更重要。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第14章",
      "实验"
    ]
  },
  {
    "id": "mrs-databases-4",
    "chapter": "mrs-databases",
    "level": 4,
    "question": "怎样用Diesel ORM完成本章验收？",
    "answer": "原书以Diesel展示编译期查询约束和schema映射；ORM减少样板但不消除索引、执行计划、N加1查询和事务边界设计。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第14章",
      "验收"
    ]
  },
  {
    "id": "mrs-webassembly-1",
    "chapter": "mrs-webassembly",
    "level": 1,
    "question": "第15章中，WebAssembly 模型的核心责任是什么？",
    "answer": "WebAssembly是可移植的低层字节码与验证执行模型，不是浏览器里的完整操作系统；宿主通过导入导出提供DOM、网络和时钟等能力。",
    "tags": [
      "第15章",
      "WebAssembly 模型"
    ]
  },
  {
    "id": "mrs-webassembly-2",
    "chapter": "mrs-webassembly",
    "level": 2,
    "question": "设计目标与模块与线性内存怎样协作？",
    "answer": "紧凑、快速解码、接近原生性能和语言无关是核心目标；沙箱减少权限面，但应用仍要验证输入、限制资源并更新依赖。 模块导出函数并使用线性内存交换数据，跨边界字符串通常需要指针、长度与编码协议；复制和分配成本要真实测量。",
    "tags": [
      "第15章",
      "机制"
    ]
  },
  {
    "id": "mrs-webassembly-3",
    "chapter": "mrs-webassembly",
    "level": 3,
    "question": "如何为Rust 到 WebAssembly设计边界实验？",
    "answer": "Rust目标、绑定生成和JavaScript胶水共同组成构建链；Rust类型不能自动无损映射到宿主对象，边界应保持小而稳定。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第15章",
      "实验"
    ]
  },
  {
    "id": "mrs-webassembly-4",
    "chapter": "mrs-webassembly",
    "level": 4,
    "question": "怎样用浏览器集成完成本章验收？",
    "answer": "事件回调、生命周期和错误需要在宿主与模块间明确归属；释放闭包、处理panic并保留source map，才能让线上问题可诊断。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第15章",
      "验收"
    ]
  },
  {
    "id": "mrs-desktop-applications-1",
    "chapter": "mrs-desktop-applications",
    "level": 1,
    "question": "第16章中，GUI 事件循环的核心责任是什么？",
    "answer": "桌面界面由事件循环驱动，UI状态只能在规定线程更新；耗时网络与解析任务移到worker，再用消息把不可变结果送回界面。",
    "tags": [
      "第16章",
      "GUI 事件循环"
    ]
  },
  {
    "id": "mrs-desktop-applications-2",
    "chapter": "mrs-desktop-applications",
    "level": 2,
    "question": "GTK 与 gtk-rs与Hacker News 应用怎样协作？",
    "answer": "原书以GTK和gtk-rs展示原生组件绑定、信号与对象生命周期；具体API版本会变化，但主线程规则、回调所有权和资源释放必须保留。 示例应用把HTTP获取、JSON解析、列表模型和点击事件串联；请求取消、加载态、空态、错误态与缓存是完整体验的一部分。",
    "tags": [
      "第16章",
      "机制"
    ]
  },
  {
    "id": "mrs-desktop-applications-3",
    "chapter": "mrs-desktop-applications",
    "level": 3,
    "question": "如何为状态与消息设计边界实验？",
    "answer": "把界面状态建模为Loading、Ready、Empty和Failed，消息驱动状态迁移；回调不应直接修改多个隐式全局变量。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第16章",
      "实验"
    ]
  },
  {
    "id": "mrs-desktop-applications-4",
    "chapter": "mrs-desktop-applications",
    "level": 4,
    "question": "怎样用桌面框架选择完成本章验收？",
    "answer": "选择框架要比较平台覆盖、可访问性、打包体积、渲染模型和维护状态；一次演示成功不能证明更新、签名和崩溃恢复可用。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第16章",
      "验收"
    ]
  },
  {
    "id": "mrs-debugging-1",
    "chapter": "mrs-debugging",
    "level": 1,
    "question": "第17章中，调试方法的核心责任是什么？",
    "answer": "调试从可复现事实开始：固定输入、版本和环境，缩小最小失败，再提出可证伪假设；随机加日志或同时改多处会破坏因果链。",
    "tags": [
      "第17章",
      "调试方法"
    ]
  },
  {
    "id": "mrs-debugging-2",
    "chapter": "mrs-debugging",
    "level": 2,
    "question": "编译期与运行期与符号与回溯怎样协作？",
    "answer": "类型、所有权和生命周期错误先由编译器定位，panic、死锁和外部故障需要运行期证据；不要用unsafe绕开一个尚未理解的编译错误。 调试构建、符号、源码映射和回溯把地址还原成调用链；优化可能内联或重排代码，复现性能问题时要保留与生产相近的制品。",
    "tags": [
      "第17章",
      "机制"
    ]
  },
  {
    "id": "mrs-debugging-3",
    "chapter": "mrs-debugging",
    "level": 3,
    "question": "如何为RR 记录重放设计边界实验？",
    "answer": "原书介绍RR通过记录一次执行后确定性重放，适合追踪难复现的并发和内存问题；平台支持与系统权限需在使用前验证。 增加正常、空值、上限、显式错误和资源中断输入，保存命令、状态与结果。",
    "tags": [
      "第17章",
      "实验"
    ]
  },
  {
    "id": "mrs-debugging-4",
    "chapter": "mrs-debugging",
    "level": 4,
    "question": "怎样用证据闭环完成本章验收？",
    "answer": "最小复现、失败测试、时间线、根因修改和回归测试共同构成闭环；修复完成后移除临时探针并确认没有掩盖其他失败。 同时核对静态契约、运行期协议和可复现证据。",
    "tags": [
      "第17章",
      "验收"
    ]
  }
];
