import type { ReviewQuestion } from "./types";

export const dnjOfficialQuestions: ReviewQuestion[] = [
  {
    id: "dnj-official-learning-map-1",
    chapter: "dnj-official-learning-map",
    level: 1,
    question: "《深入浅出 Node.js》权威学习地图的核心主张是什么？",
    answer:
      "全书从 Node 特性出发，依次穿过模块、异步 I/O、异步编程、内存、Buffer、网络、Web、进程、测试、产品化与四个工程附录，形成由原理到交付的闭环。",
    tags: ["《深入浅出 Node.js》权威学习地图", "核心机制"],
  },
  {
    id: "dnj-official-learning-map-2",
    chapter: "dnj-official-learning-map",
    level: 2,
    question: "《深入浅出 Node.js》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "第1章 Node简介、第2章 模块机制、第3章 异步I/O、第4章 异步编程、第5章 内存控制、第6章 理解Buffer、第7章 网络编程、第8章 构建Web应用、第9章 玩转进程、第10章 测试、第11章 产品化、附录A 安装Node、附录B 调试Node、附录C Node编码规范、附录D 搭建局域npm仓库",
    tags: ["《深入浅出 Node.js》权威学习地图", "目录覆盖"],
  },
  {
    id: "dnj-official-learning-map-3",
    chapter: "dnj-official-learning-map",
    level: 2,
    question: "《深入浅出 Node.js》权威学习地图的六阶段执行链是什么？",
    answer:
      "核验2013版身份 → 掌握模块与异步 → 控制内存与字节 → 构建网络Web服务 → 扩展进程并测试 → 产品化与附录验收",
    tags: ["《深入浅出 Node.js》权威学习地图", "执行链"],
  },
  {
    id: "dnj-official-learning-map-4",
    chapter: "dnj-official-learning-map",
    level: 3,
    question: "《深入浅出 Node.js》权威学习地图为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["《深入浅出 Node.js》权威学习地图", "故障注入"],
  },
  {
    id: "dnj-official-learning-map-5",
    chapter: "dnj-official-learning-map",
    level: 3,
    question: "《深入浅出 Node.js》权威学习地图签发时保持什么不变量？",
    answer:
      "11 章、4 个附录和 284 个公开目录条目都有归属；历史 API 与现代替代分层说明，每页都能从输入走到资源关闭。",
    tags: ["《深入浅出 Node.js》权威学习地图", "工程验收"],
  },
  {
    id: "dnj-official-learning-map-6",
    chapter: "dnj-official-learning-map",
    level: 3,
    question: "《深入浅出 Node.js》权威学习地图怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["《深入浅出 Node.js》权威学习地图", "可复现实验"],
  },
  {
    id: "dnj-01-node-introduction-1",
    chapter: "dnj-01-node-introduction",
    level: 1,
    question: "第 1 章 Node 简介的核心主张是什么？",
    answer:
      "Node 把浏览器外的系统能力交给 JavaScript，并以单线程执行 JavaScript、事件驱动和异步 I/O 组织高并发服务；优势与约束必须一起理解。",
    tags: ["第 1 章 Node 简介", "核心机制"],
  },
  {
    id: "dnj-01-node-introduction-2",
    chapter: "dnj-01-node-introduction",
    level: 2,
    question: "第 1 章 Node 简介覆盖哪些权威目录条目？",
    answer:
      "第1章 Node简介、1.1 Node的诞生历程、1.2 Node的命名与起源、1.2.1 为什么是JavaScript、1.2.2 为什么叫Node、1.3 Node给JavaScript带来的意义、1.4 Node的特点、1.4.1 异步I/O、1.4.2 事件与回调函数、1.4.3 单线程、1.4.4 跨平台、1.5 Node的应用场景、1.5.1 I/O密集型、1.5.2 是否不擅长CPU密集型业务、1.5.3 与遗留系统和平共处、1.5.4 分布式应用、1.6 Node的使用者、1.7 参考资源",
    tags: ["第 1 章 Node 简介", "目录覆盖"],
  },
  {
    id: "dnj-01-node-introduction-3",
    chapter: "dnj-01-node-introduction",
    level: 2,
    question: "第 1 章 Node 简介的六阶段执行链是什么？",
    answer:
      "定位运行边界 → 辨认事件模型 → 拆分I/O与计算 → 评估单线程风险 → 选择应用场景 → 建立版本账本",
    tags: ["第 1 章 Node 简介", "执行链"],
  },
  {
    id: "dnj-01-node-introduction-4",
    chapter: "dnj-01-node-introduction",
    level: 3,
    question: "第 1 章 Node 简介为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 1 章 Node 简介", "故障注入"],
  },
  {
    id: "dnj-01-node-introduction-5",
    chapter: "dnj-01-node-introduction",
    level: 3,
    question: "第 1 章 Node 简介签发时保持什么不变量？",
    answer:
      "应用场景的选择同时解释 I/O 并发、CPU 计算、故障隔离与跨平台依赖，不把单线程误写成整个运行时只有一个线程。",
    tags: ["第 1 章 Node 简介", "工程验收"],
  },
  {
    id: "dnj-01-node-introduction-6",
    chapter: "dnj-01-node-introduction",
    level: 3,
    question: "第 1 章 Node 简介怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 1 章 Node 简介", "可复现实验"],
  },
  {
    id: "dnj-02-module-mechanism-1",
    chapter: "dnj-02-module-mechanism",
    level: 1,
    question: "第 2 章 模块机制的核心主张是什么？",
    answer:
      "模块机制把标识符解析、路径定位、包装编译、导出对象和缓存连接起来；核心模块、文件模块、原生扩展与包的加载优先级不同。",
    tags: ["第 2 章 模块机制", "核心机制"],
  },
  {
    id: "dnj-02-module-mechanism-2",
    chapter: "dnj-02-module-mechanism",
    level: 2,
    question: "第 2 章 模块机制覆盖哪些权威目录条目？",
    answer:
      "第2章 模块机制、2.1 CommonJS规范、2.1.1 CommonJS的出发点、2.1.2 CommonJS的模块规范、2.2 Node的模块实现、2.2.1 优先从缓存加载、2.2.2 路径分析和文件定位、2.2.3 模块编译、2.3 核心模块、2.3.1 JavaScript核心模块的编译过程、2.3.2 C/C++核心模块的编译过程、2.3.3 核心模块的引入流程、2.3.4 编写核心模块、2.4 C/C++扩展模块、2.4.1 前提条件、2.4.2 C/C++扩展模块的编写、2.4.3 C/C++扩展模块的编译、2.4.4 C/C++扩展模块的加载、2.5 模块调用栈、2.6 包与npm、2.6.1 包结构、2.6.2 包描述文件与npm、2.6.3 npm常用功能、2.6.4 局域npm、2.6.5 npm潜在问题、2.7 前后端共用模块、2.7.1 模块的侧重点、2.7.2 AMD规范、2.7.3 CMD规范、2.7.4 兼容多种模块规范、2.8 总结、2.9 参考资源",
    tags: ["第 2 章 模块机制", "目录覆盖"],
  },
  {
    id: "dnj-02-module-mechanism-3",
    chapter: "dnj-02-module-mechanism",
    level: 2,
    question: "第 2 章 模块机制的六阶段执行链是什么？",
    answer:
      "解析模块标识 → 检查缓存 → 定位文件或核心模块 → 包装并编译 → 建立导出契约 → 验证包分发",
    tags: ["第 2 章 模块机制", "执行链"],
  },
  {
    id: "dnj-02-module-mechanism-4",
    chapter: "dnj-02-module-mechanism",
    level: 3,
    question: "第 2 章 模块机制为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 2 章 模块机制", "故障注入"],
  },
  {
    id: "dnj-02-module-mechanism-5",
    chapter: "dnj-02-module-mechanism",
    level: 3,
    question: "第 2 章 模块机制签发时保持什么不变量？",
    answer:
      "同一入口和锁定依赖得到确定模块图，循环依赖能解释部分导出，原生扩展 ABI 与包发布边界明确。",
    tags: ["第 2 章 模块机制", "工程验收"],
  },
  {
    id: "dnj-02-module-mechanism-6",
    chapter: "dnj-02-module-mechanism",
    level: 3,
    question: "第 2 章 模块机制怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 2 章 模块机制", "可复现实验"],
  },
  {
    id: "dnj-03-async-io-1",
    chapter: "dnj-03-async-io",
    level: 1,
    question: "第 3 章 异步 I/O的核心主张是什么？",
    answer:
      "异步 I/O 的收益来自等待期间让出 JavaScript 执行权；事件循环轮询观察者，请求对象跨越 JavaScript 与系统层，完成后再把回调送回执行栈。",
    tags: ["第 3 章 异步 I/O", "核心机制"],
  },
  {
    id: "dnj-03-async-io-2",
    chapter: "dnj-03-async-io",
    level: 2,
    question: "第 3 章 异步 I/O覆盖哪些权威目录条目？",
    answer:
      "第3章 异步I/O、3.1 为什么要异步I/O、3.1.1 用户体验、3.1.2 资源分配、3.2 异步I/O实现现状、3.2.1 异步I/O与非阻塞I/O、3.2.2 理想的非阻塞异步I/O、3.2.3 现实的异步I/O、3.3 Node的异步I/O、3.3.1 事件循环、3.3.2 观察者、3.3.3 请求对象、3.3.4 执行回调、3.3.5 小结、3.4 非I/O的异步API、3.4.1 定时器、3.4.2 process.nextTick()、3.4.3 setImmediate()、3.5 事件驱动与高性能服务器、3.6 总结、3.7 参考资源",
    tags: ["第 3 章 异步 I/O", "目录覆盖"],
  },
  {
    id: "dnj-03-async-io-3",
    chapter: "dnj-03-async-io",
    level: 2,
    question: "第 3 章 异步 I/O的六阶段执行链是什么？",
    answer:
      "发起异步调用 → 封装请求对象 → 交给系统或线程池 → 观察完成事件 → 执行回调 → 排空循环资源",
    tags: ["第 3 章 异步 I/O", "执行链"],
  },
  {
    id: "dnj-03-async-io-4",
    chapter: "dnj-03-async-io",
    level: 3,
    question: "第 3 章 异步 I/O为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 3 章 异步 I/O", "故障注入"],
  },
  {
    id: "dnj-03-async-io-5",
    chapter: "dnj-03-async-io",
    level: 3,
    question: "第 3 章 异步 I/O签发时保持什么不变量？",
    answer:
      "每个请求对象只有一个完成出口，回调时序可由事件循环阶段解释，计时器与 immediate 不被误当成精确实时调度。",
    tags: ["第 3 章 异步 I/O", "工程验收"],
  },
  {
    id: "dnj-03-async-io-6",
    chapter: "dnj-03-async-io",
    level: 3,
    question: "第 3 章 异步 I/O怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 3 章 异步 I/O", "可复现实验"],
  },
  {
    id: "dnj-04-async-programming-1",
    chapter: "dnj-04-async-programming",
    level: 1,
    question: "第 4 章 异步编程的核心主张是什么？",
    answer:
      "异步编程要处理控制流、错误、依赖关系和并发上限。事件、Promise 与流程库只是表达方式，真正契约是任务何时开始、完成、失败和取消。",
    tags: ["第 4 章 异步编程", "核心机制"],
  },
  {
    id: "dnj-04-async-programming-2",
    chapter: "dnj-04-async-programming",
    level: 2,
    question: "第 4 章 异步编程覆盖哪些权威目录条目？",
    answer:
      "第4章 异步编程、4.1 函数式编程、4.1.1 高阶函数、4.1.2 偏函数用法、4.2 异步编程的优势与难点、4.2.1 优势、4.2.2 难点、4.3 异步编程解决方案、4.3.1 事件发布/订阅模式、4.3.2 Promise/Deferred模式、4.3.3 流程控制库、4.4 异步并发控制、4.4.1 Bagpipe的解决方案、4.4.2 async的解决方案、4.5 总结、4.6 参考资源",
    tags: ["第 4 章 异步编程", "目录覆盖"],
  },
  {
    id: "dnj-04-async-programming-3",
    chapter: "dnj-04-async-programming",
    level: 2,
    question: "第 4 章 异步编程的六阶段执行链是什么？",
    answer:
      "拆分任务依赖 → 选择组合模型 → 统一错误出口 → 设置并发上限 → 传播取消 → 验证单次完成",
    tags: ["第 4 章 异步编程", "执行链"],
  },
  {
    id: "dnj-04-async-programming-4",
    chapter: "dnj-04-async-programming",
    level: 3,
    question: "第 4 章 异步编程为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 4 章 异步编程", "故障注入"],
  },
  {
    id: "dnj-04-async-programming-5",
    chapter: "dnj-04-async-programming",
    level: 3,
    question: "第 4 章 异步编程签发时保持什么不变量？",
    answer:
      "任务依赖图、并发上限和错误出口清楚，同一操作不重复完成，慢任务与失败任务不会无限占用队列。",
    tags: ["第 4 章 异步编程", "工程验收"],
  },
  {
    id: "dnj-04-async-programming-6",
    chapter: "dnj-04-async-programming",
    level: 3,
    question: "第 4 章 异步编程怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 4 章 异步编程", "可复现实验"],
  },
  {
    id: "dnj-05-memory-control-1",
    chapter: "dnj-05-memory-control",
    level: 1,
    question: "第 5 章 内存控制的核心主张是什么？",
    answer:
      "内存控制要区分 V8 堆、Buffer 等外部内存和进程 RSS；垃圾回收只释放不可达对象，错误缓存、闭包和队列会让对象持续可达。",
    tags: ["第 5 章 内存控制", "核心机制"],
  },
  {
    id: "dnj-05-memory-control-2",
    chapter: "dnj-05-memory-control",
    level: 2,
    question: "第 5 章 内存控制覆盖哪些权威目录条目？",
    answer:
      "第5章 内存控制、5.1 V8的垃圾回收机制与内存限制、5.1.1 Node与V8、5.1.2 V8的内存限制、5.1.3 V8的对象分配、5.1.4 V8的垃圾回收机制、5.1.5 查看垃圾回收日志、5.2 高效使用内存、5.2.1 作用域、5.2.2 闭包、5.2.3 小结、5.3 内存指标、5.3.1 查看内存使用情况、5.3.2 堆外内存、5.3.3 小结、5.4 内存泄漏、5.4.1 慎将内存当做缓存、5.4.2 关注队列状态、5.5 内存泄漏排查、5.5.1 node-heapdump、5.5.2 node-memwatch、5.5.3 小结、5.6 大内存应用、5.7 总结、5.8 参考资源",
    tags: ["第 5 章 内存控制", "目录覆盖"],
  },
  {
    id: "dnj-05-memory-control-3",
    chapter: "dnj-05-memory-control",
    level: 2,
    question: "第 5 章 内存控制的六阶段执行链是什么？",
    answer:
      "记录内存基线 → 区分堆内堆外 → 触发固定负载 → 定位保留路径 → 修复所有权 → 回放并观察回落",
    tags: ["第 5 章 内存控制", "执行链"],
  },
  {
    id: "dnj-05-memory-control-4",
    chapter: "dnj-05-memory-control",
    level: 3,
    question: "第 5 章 内存控制为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 5 章 内存控制", "故障注入"],
  },
  {
    id: "dnj-05-memory-control-5",
    chapter: "dnj-05-memory-control",
    level: 3,
    question: "第 5 章 内存控制签发时保持什么不变量？",
    answer:
      "同一负载后堆与活动资源回到预算，增长对象能追到持有者，大对象通过流或分片处理而非一次性读入堆。",
    tags: ["第 5 章 内存控制", "工程验收"],
  },
  {
    id: "dnj-05-memory-control-6",
    chapter: "dnj-05-memory-control",
    level: 3,
    question: "第 5 章 内存控制怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 5 章 内存控制", "可复现实验"],
  },
  {
    id: "dnj-06-buffer-1",
    chapter: "dnj-06-buffer",
    level: 1,
    question: "第 6 章 理解 Buffer的核心主张是什么？",
    answer:
      "Buffer 表示字节而不是字符；编码决定字节与文本的转换，流分块可能切断多字节字符，所以拼接必须在字节边界与解码器状态上保持正确。",
    tags: ["第 6 章 理解 Buffer", "核心机制"],
  },
  {
    id: "dnj-06-buffer-2",
    chapter: "dnj-06-buffer",
    level: 2,
    question: "第 6 章 理解 Buffer覆盖哪些权威目录条目？",
    answer:
      "第6章 理解Buffer、6.1 Buffer结构、6.1.1 模块结构、6.1.2 Buffer对象、6.1.3 Buffer内存分配、6.2 Buffer的转换、6.2.1 字符串转Buffer、6.2.2 Buffer转字符串、6.2.3 Buffer不支持的编码类型、6.3 Buffer的拼接、6.3.1 乱码是如何产生的、6.3.2 setEncoding()与string_decoder()、6.3.3 正确拼接Buffer、6.4 Buffer与性能、6.5 总结、6.6 参考资源",
    tags: ["第 6 章 理解 Buffer", "目录覆盖"],
  },
  {
    id: "dnj-06-buffer-3",
    chapter: "dnj-06-buffer",
    level: 2,
    question: "第 6 章 理解 Buffer的六阶段执行链是什么？",
    answer:
      "识别字节来源 → 选择编码 → 分配受限缓冲区 → 处理跨块边界 → 验证转换损失 → 测量复制成本",
    tags: ["第 6 章 理解 Buffer", "执行链"],
  },
  {
    id: "dnj-06-buffer-4",
    chapter: "dnj-06-buffer",
    level: 3,
    question: "第 6 章 理解 Buffer为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 6 章 理解 Buffer", "故障注入"],
  },
  {
    id: "dnj-06-buffer-5",
    chapter: "dnj-06-buffer",
    level: 3,
    question: "第 6 章 理解 Buffer签发时保持什么不变量？",
    answer:
      "任意分块方式都得到相同解码结果，分配大小受限且初始化明确，不使用已弃用的不安全 Buffer 构造器。",
    tags: ["第 6 章 理解 Buffer", "工程验收"],
  },
  {
    id: "dnj-06-buffer-6",
    chapter: "dnj-06-buffer",
    level: 3,
    question: "第 6 章 理解 Buffer怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 6 章 理解 Buffer", "可复现实验"],
  },
  {
    id: "dnj-07-network-programming-1",
    chapter: "dnj-07-network-programming",
    level: 1,
    question: "第 7 章 网络编程的核心主张是什么？",
    answer:
      "网络编程从无消息边界的 TCP 字节流、无连接 UDP 数据报到 HTTP 请求响应与 WebSocket 帧逐层增加协议；TLS 提供身份与传输保护。",
    tags: ["第 7 章 网络编程", "核心机制"],
  },
  {
    id: "dnj-07-network-programming-2",
    chapter: "dnj-07-network-programming",
    level: 2,
    question: "第 7 章 网络编程覆盖哪些权威目录条目？",
    answer:
      "第7章 网络编程、7.1 构建TCP服务、7.1.1 TCP、7.1.2 创建TCP服务器端、7.1.3 TCP服务的事件、7.2 构建UDP服务、7.2.1 创建UDP套接字、7.2.2 创建UDP服务器端、7.2.3 创建UDP客户端、7.2.4 UDP套接字事件、7.3 构建HTTP服务、7.3.1 HTTP、7.3.2 HTTP模块、7.3.3 HTTP客户端、7.4 构建WebSocket服务、7.4.1 WebSocket握手、7.4.2 WebSocket数据传输、7.4.3 小结、7.5 网络服务与安全、7.5.1 TLS/SSL、7.5.2 TLS服务、7.5.3 HTTPS服务、7.6 总结、7.7 参考资源",
    tags: ["第 7 章 网络编程", "目录覆盖"],
  },
  {
    id: "dnj-07-network-programming-3",
    chapter: "dnj-07-network-programming",
    level: 2,
    question: "第 7 章 网络编程的六阶段执行链是什么？",
    answer:
      "创建套接字 → 定义协议边界 → 处理读写背压 → 传播错误超时 → 建立TLS身份 → 关闭连接资源",
    tags: ["第 7 章 网络编程", "执行链"],
  },
  {
    id: "dnj-07-network-programming-4",
    chapter: "dnj-07-network-programming",
    level: 3,
    question: "第 7 章 网络编程为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 7 章 网络编程", "故障注入"],
  },
  {
    id: "dnj-07-network-programming-5",
    chapter: "dnj-07-network-programming",
    level: 3,
    question: "第 7 章 网络编程签发时保持什么不变量？",
    answer:
      "消息边界、输入上限、超时、背压和关闭语义明确，TLS 证书经过验证，断线不会造成重复响应或悬挂套接字。",
    tags: ["第 7 章 网络编程", "工程验收"],
  },
  {
    id: "dnj-07-network-programming-6",
    chapter: "dnj-07-network-programming",
    level: 3,
    question: "第 7 章 网络编程怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 7 章 网络编程", "可复现实验"],
  },
  {
    id: "dnj-08-web-application-1",
    chapter: "dnj-08-web-application",
    level: 1,
    question: "第 8 章 构建 Web 应用的核心主张是什么？",
    answer:
      "Web 应用把不可信请求变成受控业务调用：解析与验证先于路由业务，身份与 Session 有明确边界，中间件只完成一次，响应和模板输出需要编码。",
    tags: ["第 8 章 构建 Web 应用", "核心机制"],
  },
  {
    id: "dnj-08-web-application-2",
    chapter: "dnj-08-web-application",
    level: 2,
    question: "第 8 章 构建 Web 应用覆盖哪些权威目录条目？",
    answer:
      "第8章 构建Web应用、8.1 基础功能、8.1.1 请求方法、8.1.2 路径解析、8.1.3 查询字符串、8.1.4 Cookie、8.1.5 Session、8.1.6 缓存、8.1.7 Basic认证、8.2 数据上传、8.2.1 表单数据、8.2.2 其他格式、8.2.3 附件上传、8.2.4 数据上传与安全、8.3 路由解析、8.3.1 文件路径型、8.3.2 MVC、8.3.3 RESTful、8.4 中间件、8.4.1 异常处理、8.4.2 中间件与性能、8.4.3 小结、8.5 页面渲染、8.5.1 内容响应、8.5.2 视图渲染、8.5.3 模板、8.5.4 BigPipe、8.6 总结、8.7 参考资源",
    tags: ["第 8 章 构建 Web 应用", "目录覆盖"],
  },
  {
    id: "dnj-08-web-application-3",
    chapter: "dnj-08-web-application",
    level: 2,
    question: "第 8 章 构建 Web 应用的六阶段执行链是什么？",
    answer:
      "限制并解析请求 → 恢复身份会话 → 匹配路由 → 执行中间件链 → 渲染或流式响应 → 统一异常出口",
    tags: ["第 8 章 构建 Web 应用", "执行链"],
  },
  {
    id: "dnj-08-web-application-4",
    chapter: "dnj-08-web-application",
    level: 3,
    question: "第 8 章 构建 Web 应用为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 8 章 构建 Web 应用", "故障注入"],
  },
  {
    id: "dnj-08-web-application-5",
    chapter: "dnj-08-web-application",
    level: 3,
    question: "第 8 章 构建 Web 应用签发时保持什么不变量？",
    answer:
      "请求体和上传有上限，身份、路由、中间件和模板职责分离，任一错误只产生一次响应且敏感状态不进入客户端。",
    tags: ["第 8 章 构建 Web 应用", "工程验收"],
  },
  {
    id: "dnj-08-web-application-6",
    chapter: "dnj-08-web-application",
    level: 3,
    question: "第 8 章 构建 Web 应用怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 8 章 构建 Web 应用", "可复现实验"],
  },
  {
    id: "dnj-09-processes-1",
    chapter: "dnj-09-processes",
    level: 1,
    question: "第 9 章 玩转进程的核心主张是什么？",
    answer:
      "多进程通过消息和句柄传递利用多核并隔离故障；Master 管理生命周期，Worker 承担请求，状态必须外置或按一致规则分片。",
    tags: ["第 9 章 玩转进程", "核心机制"],
  },
  {
    id: "dnj-09-processes-2",
    chapter: "dnj-09-processes",
    level: 2,
    question: "第 9 章 玩转进程覆盖哪些权威目录条目？",
    answer:
      "第9章 玩转进程、9.1 服务模型的变迁、9.1.1 石器时代：同步、9.1.2 青铜时代：复制进程、9.1.3 白银时代：多线程、9.1.4 黄金时代：事件驱动、9.2 多进程架构、9.2.1 创建子进程、9.2.2 进程间通信、9.2.3 句柄传递、9.2.4 小结、9.3 集群稳定之路、9.3.1 进程事件、9.3.2 自动重启、9.3.3 负载均衡、9.3.4 状态共享、9.4 cluster模块、9.4.1 cluster工作原理、9.4.2 cluster事件、9.5 总结、9.6 参考资源",
    tags: ["第 9 章 玩转进程", "目录覆盖"],
  },
  {
    id: "dnj-09-processes-3",
    chapter: "dnj-09-processes",
    level: 2,
    question: "第 9 章 玩转进程的六阶段执行链是什么？",
    answer:
      "选择服务模型 → 派生Worker → 建立IPC → 传递监听句柄 → 处理退出重启 → 验证负载与状态",
    tags: ["第 9 章 玩转进程", "执行链"],
  },
  {
    id: "dnj-09-processes-4",
    chapter: "dnj-09-processes",
    level: 3,
    question: "第 9 章 玩转进程为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 9 章 玩转进程", "故障注入"],
  },
  {
    id: "dnj-09-processes-5",
    chapter: "dnj-09-processes",
    level: 3,
    question: "第 9 章 玩转进程签发时保持什么不变量？",
    answer:
      "Worker 异常可被发现并有节制重启，连接与状态不会丢失或重复，滚动退出等待在途请求且可回滚。",
    tags: ["第 9 章 玩转进程", "工程验收"],
  },
  {
    id: "dnj-09-processes-6",
    chapter: "dnj-09-processes",
    level: 3,
    question: "第 9 章 玩转进程怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 9 章 玩转进程", "可复现实验"],
  },
  {
    id: "dnj-10-testing-1",
    chapter: "dnj-10-testing",
    level: 1,
    question: "第 10 章 测试的核心主张是什么？",
    answer:
      "测试分离功能契约与性能预算：单元测试控制依赖和异步完成，基准测试隔离微小成本，压力测试在真实并发下观察吞吐、尾延迟和错误。",
    tags: ["第 10 章 测试", "核心机制"],
  },
  {
    id: "dnj-10-testing-2",
    chapter: "dnj-10-testing",
    level: 2,
    question: "第 10 章 测试覆盖哪些权威目录条目？",
    answer:
      "第10章 测试、10.1 单元测试、10.1.1 单元测试的意义、10.1.2 单元测试介绍、10.1.3 工程化与自动化、10.1.4 小结、10.2 性能测试、10.2.1 基准测试、10.2.2 压力测试、10.2.3 基准测试驱动开发、10.2.4 测试数据与业务数据的转换、10.3 总结、10.4 参考资源",
    tags: ["第 10 章 测试", "目录覆盖"],
  },
  {
    id: "dnj-10-testing-3",
    chapter: "dnj-10-testing",
    level: 2,
    question: "第 10 章 测试的六阶段执行链是什么？",
    answer:
      "定义可观察契约 → 隔离外部依赖 → 控制异步完成 → 建立性能基线 → 施加真实压力 → 保存回归证据",
    tags: ["第 10 章 测试", "执行链"],
  },
  {
    id: "dnj-10-testing-4",
    chapter: "dnj-10-testing",
    level: 3,
    question: "第 10 章 测试为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 10 章 测试", "故障注入"],
  },
  {
    id: "dnj-10-testing-5",
    chapter: "dnj-10-testing",
    level: 3,
    question: "第 10 章 测试签发时保持什么不变量？",
    answer:
      "测试失败可重复，异步测试只完成一次，基准包含预热和统计，压力结果同时报告吞吐、分位延迟、错误率和资源上限。",
    tags: ["第 10 章 测试", "工程验收"],
  },
  {
    id: "dnj-10-testing-6",
    chapter: "dnj-10-testing",
    level: 3,
    question: "第 10 章 测试怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 10 章 测试", "可复现实验"],
  },
  {
    id: "dnj-11-productization-1",
    chapter: "dnj-11-productization",
    level: 1,
    question: "第 11 章 产品化的核心主张是什么？",
    answer:
      "产品化不是启动进程，而是让构建可追溯、部署可回滚、性能有预算、日志可关联、监控可行动、故障可隔离，并与异构系统维持契约。",
    tags: ["第 11 章 产品化", "核心机制"],
  },
  {
    id: "dnj-11-productization-2",
    chapter: "dnj-11-productization",
    level: 2,
    question: "第 11 章 产品化覆盖哪些权威目录条目？",
    answer:
      "第11章 产品化、11.1 项目工程化、11.1.1 目录结构、11.1.2 构建工具、11.1.3 编码规范、11.1.4 代码审查、11.2 部署流程、11.2.1 部署环境、11.2.2 部署操作、11.3 性能、11.3.1 动静分离、11.3.2 启用缓存、11.3.3 多进程架构、11.3.4 读写分离、11.4 日志、11.4.1 访问日志、11.4.2 异常日志、11.4.3 日志与数据库、11.4.4 分割日志、11.4.5 小结、11.5 监控报警、11.5.1 监控、11.5.2 报警的实现、11.5.3 监控系统的稳定性、11.6 稳定性、11.7 异构共存、11.8 总结、11.9 参考资源",
    tags: ["第 11 章 产品化", "目录覆盖"],
  },
  {
    id: "dnj-11-productization-3",
    chapter: "dnj-11-productization",
    level: 2,
    question: "第 11 章 产品化的六阶段执行链是什么？",
    answer:
      "固化工程结构 → 构建与审查 → 生成可追溯制品 → 滚动部署 → 监控日志与性能 → 演练故障回滚",
    tags: ["第 11 章 产品化", "执行链"],
  },
  {
    id: "dnj-11-productization-4",
    chapter: "dnj-11-productization",
    level: 3,
    question: "第 11 章 产品化为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["第 11 章 产品化", "故障注入"],
  },
  {
    id: "dnj-11-productization-5",
    chapter: "dnj-11-productization",
    level: 3,
    question: "第 11 章 产品化签发时保持什么不变量？",
    answer:
      "每个版本可追溯且可回滚，日志与指标关联，报警有责任人和恢复条件，性能优化不牺牲正确性与稳定性。",
    tags: ["第 11 章 产品化", "工程验收"],
  },
  {
    id: "dnj-11-productization-6",
    chapter: "dnj-11-productization",
    level: 3,
    question: "第 11 章 产品化怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 11 章 产品化", "可复现实验"],
  },
  {
    id: "dnj-appendix-a-installation-1",
    chapter: "dnj-appendix-a-installation",
    level: 1,
    question: "附录 A 安装 Node的核心主张是什么？",
    answer:
      "安装的目标是得到可复现运行时，而非仅让 node 命令可执行；平台、CPU 架构、系统库、包管理器和权限都会影响后续模块行为。",
    tags: ["附录 A 安装 Node", "核心机制"],
  },
  {
    id: "dnj-appendix-a-installation-2",
    chapter: "dnj-appendix-a-installation",
    level: 2,
    question: "附录 A 安装 Node覆盖哪些权威目录条目？",
    answer:
      "附录A 安装Node、A.1 Windows系统下的Node安装、A.2 macOS系统下Node的安装、A.3 Linux系统下Node的安装、A.4 总结、A.5 参考资源",
    tags: ["附录 A 安装 Node", "目录覆盖"],
  },
  {
    id: "dnj-appendix-a-installation-3",
    chapter: "dnj-appendix-a-installation",
    level: 2,
    question: "附录 A 安装 Node的六阶段执行链是什么？",
    answer:
      "确认平台架构 → 选择发行渠道 → 校验版本来源 → 配置项目版本 → 验证原生工具链 → 记录卸载回滚",
    tags: ["附录 A 安装 Node", "执行链"],
  },
  {
    id: "dnj-appendix-a-installation-4",
    chapter: "dnj-appendix-a-installation",
    level: 3,
    question: "附录 A 安装 Node为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["附录 A 安装 Node", "故障注入"],
  },
  {
    id: "dnj-appendix-a-installation-5",
    chapter: "dnj-appendix-a-installation",
    level: 3,
    question: "附录 A 安装 Node签发时保持什么不变量？",
    answer:
      "开发、测试与生产明确 Node 版本和平台差异，安装来源可校验，项目不依赖未记录的全局包。",
    tags: ["附录 A 安装 Node", "工程验收"],
  },
  {
    id: "dnj-appendix-a-installation-6",
    chapter: "dnj-appendix-a-installation",
    level: 3,
    question: "附录 A 安装 Node怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["附录 A 安装 Node", "可复现实验"],
  },
  {
    id: "dnj-appendix-b-debugging-1",
    chapter: "dnj-appendix-b-debugging",
    level: 1,
    question: "附录 B 调试 Node的核心主张是什么？",
    answer:
      "调试器通过暂停、求值、栈和对象检查缩小状态空间，但暂停会改变时序；2013 年 debugger 与 node-inspector 属于历史接口，现代 Node 使用 Inspector 协议。",
    tags: ["附录 B 调试 Node", "核心机制"],
  },
  {
    id: "dnj-appendix-b-debugging-2",
    chapter: "dnj-appendix-b-debugging",
    level: 2,
    question: "附录 B 调试 Node覆盖哪些权威目录条目？",
    answer:
      "附录B 调试Node、B.1 debugger、B.2 node-inspector、B.2.1 安装node-inspector、B.2.2 错误堆栈、B.3 总结",
    tags: ["附录 B 调试 Node", "目录覆盖"],
  },
  {
    id: "dnj-appendix-b-debugging-3",
    chapter: "dnj-appendix-b-debugging",
    level: 2,
    question: "附录 B 调试 Node的六阶段执行链是什么？",
    answer:
      "固定复现入口 → 启动受保护调试端口 → 设置最小断点 → 检查调用栈 → 记录变量与异步因果 → 关闭会话",
    tags: ["附录 B 调试 Node", "执行链"],
  },
  {
    id: "dnj-appendix-b-debugging-4",
    chapter: "dnj-appendix-b-debugging",
    level: 3,
    question: "附录 B 调试 Node为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["附录 B 调试 Node", "故障注入"],
  },
  {
    id: "dnj-appendix-b-debugging-5",
    chapter: "dnj-appendix-b-debugging",
    level: 3,
    question: "附录 B 调试 Node签发时保持什么不变量？",
    answer:
      "调试端口不暴露给不可信网络，断点和求值副作用可控，错误栈能映射到同版本源码，结束后会话与端口关闭。",
    tags: ["附录 B 调试 Node", "工程验收"],
  },
  {
    id: "dnj-appendix-b-debugging-6",
    chapter: "dnj-appendix-b-debugging",
    level: 3,
    question: "附录 B 调试 Node怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["附录 B 调试 Node", "可复现实验"],
  },
  {
    id: "dnj-appendix-c-coding-style-1",
    chapter: "dnj-appendix-c-coding-style",
    level: 1,
    question: "附录 C Node 编码规范的核心主张是什么？",
    answer:
      "编码规范减少无意义差异并暴露真实风险；格式交给自动工具，命名表达所有权，比较与作用域避免隐式行为，异步与模块规则保护错误出口。",
    tags: ["附录 C Node 编码规范", "核心机制"],
  },
  {
    id: "dnj-appendix-c-coding-style-2",
    chapter: "dnj-appendix-c-coding-style",
    level: 2,
    question: "附录 C Node 编码规范覆盖哪些权威目录条目？",
    answer:
      "附录C Node编码规范、C.1 根源、C.2 编码规范、C.2.1 空格与格式、C.2.2 命名规范、C.2.3 比较操作、C.2.4 字面量、C.2.5 作用域、C.2.6 数组与对象、C.2.7 异步、C.2.8 类与模块、C.2.9 注解规范、C.3 最佳实践、C.3.1 冲突的解决原则、C.3.2 给编辑器设置检测工具、C.3.3 版本控制中的Hook、C.3.4 持续集成、C.4 总结、C.5 参考资源",
    tags: ["附录 C Node 编码规范", "目录覆盖"],
  },
  {
    id: "dnj-appendix-c-coding-style-3",
    chapter: "dnj-appendix-c-coding-style",
    level: 2,
    question: "附录 C Node 编码规范的六阶段执行链是什么？",
    answer:
      "定义团队基线 → 自动格式检查 → 约束命名作用域 → 审查异步模块边界 → 接入版本Hook → 持续集成签发",
    tags: ["附录 C Node 编码规范", "执行链"],
  },
  {
    id: "dnj-appendix-c-coding-style-4",
    chapter: "dnj-appendix-c-coding-style",
    level: 3,
    question: "附录 C Node 编码规范为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["附录 C Node 编码规范", "故障注入"],
  },
  {
    id: "dnj-appendix-c-coding-style-5",
    chapter: "dnj-appendix-c-coding-style",
    level: 3,
    question: "附录 C Node 编码规范签发时保持什么不变量？",
    answer:
      "规范由自动化检查执行，例外有理由与期限，格式问题不遮蔽正确性、安全和资源生命周期问题。",
    tags: ["附录 C Node 编码规范", "工程验收"],
  },
  {
    id: "dnj-appendix-c-coding-style-6",
    chapter: "dnj-appendix-c-coding-style",
    level: 3,
    question: "附录 C Node 编码规范怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["附录 C Node 编码规范", "可复现实验"],
  },
  {
    id: "dnj-appendix-d-local-npm-1",
    chapter: "dnj-appendix-d-local-npm",
    level: 1,
    question: "附录 D 搭建局域 npm 仓库的核心主张是什么？",
    answer:
      "局域仓库解决缓存、可用性和私有包分发，但也成为高权限供应链节点；上游同步、命名空间、鉴权、完整性和备份必须共同设计。",
    tags: ["附录 D 搭建局域 npm 仓库", "核心机制"],
  },
  {
    id: "dnj-appendix-d-local-npm-2",
    chapter: "dnj-appendix-d-local-npm",
    level: 2,
    question: "附录 D 搭建局域 npm 仓库覆盖哪些权威目录条目？",
    answer:
      "附录D 搭建局域npm仓库、D.1 npm仓库的安装、D.1.1 安装Erlang和CouchDB、D.1.2 搭建npm仓库、D.2 高阶应用、D.2.1 镜像仓库、D.2.2 私有模块应用、D.2.3 纯私有仓库、D.3 总结、D.4 参考资源",
    tags: ["附录 D 搭建局域 npm 仓库", "目录覆盖"],
  },
  {
    id: "dnj-appendix-d-local-npm-3",
    chapter: "dnj-appendix-d-local-npm",
    level: 2,
    question: "附录 D 搭建局域 npm 仓库的六阶段执行链是什么？",
    answer:
      "定义仓库边界 → 部署存储服务 → 同步公共镜像 → 发布私有模块 → 校验权限完整性 → 备份恢复演练",
    tags: ["附录 D 搭建局域 npm 仓库", "执行链"],
  },
  {
    id: "dnj-appendix-d-local-npm-4",
    chapter: "dnj-appendix-d-local-npm",
    level: 3,
    question: "附录 D 搭建局域 npm 仓库为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["附录 D 搭建局域 npm 仓库", "故障注入"],
  },
  {
    id: "dnj-appendix-d-local-npm-5",
    chapter: "dnj-appendix-d-local-npm",
    level: 3,
    question: "附录 D 搭建局域 npm 仓库签发时保持什么不变量？",
    answer:
      "私有包不会泄露到公共源，上游包有完整性与来源证据，凭据最小化，仓库故障和数据恢复经过演练。",
    tags: ["附录 D 搭建局域 npm 仓库", "工程验收"],
  },
  {
    id: "dnj-appendix-d-local-npm-6",
    chapter: "dnj-appendix-d-local-npm",
    level: 3,
    question: "附录 D 搭建局域 npm 仓库怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["附录 D 搭建局域 npm 仓库", "可复现实验"],
  },
  {
    id: "dnj-official-final-review-1",
    chapter: "dnj-official-final-review",
    level: 1,
    question: "《深入浅出 Node.js》全书总复习的核心主张是什么？",
    answer:
      "总复习把一个请求从模块加载、字节解析、异步 I/O、中间件与响应，连接到 Worker 生命周期、测试证据、部署监控和供应链回滚。",
    tags: ["《深入浅出 Node.js》全书总复习", "核心机制"],
  },
  {
    id: "dnj-official-final-review-2",
    chapter: "dnj-official-final-review",
    level: 2,
    question: "《深入浅出 Node.js》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 Node简介、第2章 模块机制、第3章 异步I/O、第4章 异步编程、第5章 内存控制、第6章 理解Buffer、第7章 网络编程、第8章 构建Web应用、第9章 玩转进程、第10章 测试、第11章 产品化、附录A 安装Node、附录B 调试Node、附录C Node编码规范、附录D 搭建局域npm仓库",
    tags: ["《深入浅出 Node.js》全书总复习", "目录覆盖"],
  },
  {
    id: "dnj-official-final-review-3",
    chapter: "dnj-official-final-review",
    level: 2,
    question: "《深入浅出 Node.js》全书总复习的六阶段执行链是什么？",
    answer:
      "固定版本与模块图 → 接收字节与请求 → 调度异步业务 → 跨进程完成响应 → 验证测试与监控 → 排空资源并回滚演练",
    tags: ["《深入浅出 Node.js》全书总复习", "执行链"],
  },
  {
    id: "dnj-official-final-review-4",
    chapter: "dnj-official-final-review",
    level: 3,
    question: "《深入浅出 Node.js》全书总复习为什么不能只看成功输出？",
    answer:
      "成功输出不显示模块解析、异步调度、字节边界、背压、错误出口、资源所有权与关闭状态，必须重放故障和恢复样本。",
    tags: ["《深入浅出 Node.js》全书总复习", "故障注入"],
  },
  {
    id: "dnj-official-final-review-5",
    chapter: "dnj-official-final-review",
    level: 3,
    question: "《深入浅出 Node.js》全书总复习签发时保持什么不变量？",
    answer:
      "任一请求都能追到模块版本、异步资源、字节边界、进程所有者与终止状态，失败后无重复响应、悬挂句柄或不可回滚制品。",
    tags: ["《深入浅出 Node.js》全书总复习", "工程验收"],
  },
  {
    id: "dnj-official-final-review-6",
    chapter: "dnj-official-final-review",
    level: 3,
    question: "《深入浅出 Node.js》全书总复习怎样完成可复现实验？",
    answer:
      "固定 Node 版本、依赖锁、入口和输入，每次只改变一个分块、超时、断线、Worker、版本或部署条件，记录首个偏离点并等待资源关闭。",
    tags: ["《深入浅出 Node.js》全书总复习", "可复现实验"],
  },
];
