import type { ReviewQuestion } from "./types";

export const mgaOfficialQuestions: ReviewQuestion[] = [
  {
    id: "mga-official-learning-map-1",
    chapter: "mga-official-learning-map",
    level: 1,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图的核心主张是什么？",
    answer:
      "以2020年机械工业出版社版的12章为唯一章序，从Socket与I/O推进到Actor、ECS、数据库、多进程管理、Redis、World跳转和动态系统。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "核心机制",
    ],
  },
  {
    id: "mga-official-learning-map-2",
    chapter: "mga-official-learning-map",
    level: 2,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第1章 网络编程基础、第2章 网络IO多路复用、第3章 线程、进程以及Actor模型、第4章 账号登录与验证、第5章 性能优化与对象池、第6章 搭建ECS框架、第7章 MySQL数据库、第8章 深入学习组件式编程、第9章 服务器管理进程与HTTP、第10章 分布式登录与Redis内存数据库、第11章 分布式跳转方案、第12章 断线与动态加载系统",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "目录覆盖",
    ],
  },
  {
    id: "mga-official-learning-map-3",
    chapter: "mga-official-learning-map",
    level: 2,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图的六阶段证据链是什么？",
    answer:
      "锁定书名作者ISBN → 映射12章82节 → 完成网络与Actor基础 → 搭建ECS和数据层 → 贯通多进程分布式流程 → 断线动态加载后签发",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "机制链",
    ],
  },
  {
    id: "mga-official-learning-map-4",
    chapter: "mga-official-learning-map",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图应主动注入哪两类失败？",
    answer:
      "沿用旧十主题，把微服务、AOI、状态复制和监控误当原书章节，丢失ECS、对象池、appmgr、Redis和World跳转。；只按章名生成页面，不记录82个公开分节与随书源码工程，无法证明目录覆盖。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "故障注入",
    ],
  },
  {
    id: "mga-official-learning-map-5",
    chapter: "mga-official-learning-map",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图签发时保持什么不变量？",
    answer:
      "12个正式章节各有独立页面；82个公开分节全部可追踪；规范书名与ISBN一致；现代补充不冒充原书目录。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "工程验收",
    ],
  },
  {
    id: "mga-official-learning-map-6",
    chapter: "mga-official-learning-map",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图怎样完成可复现实验？",
    answer:
      "建立12章追踪表，将82个公开分节映射到页面、互动实验、题库和验收不变量，并用随书源码目录核对工程名。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
      "可复现实验",
    ],
  },
  {
    id: "mga-01-network-basics-1",
    chapter: "mga-01-network-basics",
    level: 1,
    question: "第1章 网络编程基础的核心主张是什么？",
    answer:
      "从单机与网络游戏的状态边界出发，贯通IP、TCP/IP以及阻塞和非阻塞Socket，为后续框架建立可分片、可重组的字节流契约。",
    tags: ["第1章 网络编程基础", "核心机制"],
  },
  {
    id: "mga-01-network-basics-2",
    chapter: "mga-01-network-basics",
    level: 2,
    question: "第1章 网络编程基础覆盖哪些正式目录主题？",
    answer:
      "1.1 单机游戏与网络游戏的区别、1.2 理解IP地址、1.3 理解TCP/IP、1.4 阻塞式网络编程、1.5 非阻塞网络编程、1.6 总结",
    tags: ["第1章 网络编程基础", "目录覆盖"],
  },
  {
    id: "mga-01-network-basics-3",
    chapter: "mga-01-network-basics",
    level: 2,
    question: "第1章 网络编程基础的六阶段证据链是什么？",
    answer:
      "划分单机与网络职责 → 解析IP和端点 → 建立TCP连接 → 循环处理部分收发 → 切换非阻塞模式 → 断线重连后签发",
    tags: ["第1章 网络编程基础", "机制链"],
  },
  {
    id: "mga-01-network-basics-4",
    chapter: "mga-01-network-basics",
    level: 3,
    question: "第1章 网络编程基础应主动注入哪两类失败？",
    answer:
      "把一次send对应一次recv，短消息看似正确，分片或合并后协议边界立刻错位。；非阻塞recv返回暂不可读时直接关闭连接，把正常的EAGAIN误判成远端断线。",
    tags: ["第1章 网络编程基础", "故障注入"],
  },
  {
    id: "mga-01-network-basics-5",
    chapter: "mga-01-network-basics",
    level: 3,
    question: "第1章 网络编程基础签发时保持什么不变量？",
    answer:
      "连接有唯一所有者；TCP按字节流累积；暂不可读与断线可区分；任何分片下消息结果一致。",
    tags: ["第1章 网络编程基础", "工程验收"],
  },
  {
    id: "mga-01-network-basics-6",
    chapter: "mga-01-network-basics",
    level: 3,
    question: "第1章 网络编程基础怎样完成可复现实验？",
    answer:
      "让代理按1、3、7和随机字节边界切分同一消息，先预测阻塞与非阻塞实现的首个差异，再保存返回值、系统错误码和累计缓冲区。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第1章 网络编程基础", "可复现实验"],
  },
  {
    id: "mga-02-io-multiplexing-1",
    chapter: "mga-02-io-multiplexing",
    level: 1,
    question: "第2章 网络IO多路复用的核心主张是什么？",
    answer:
      "比较Select与Epoll的就绪集合和复杂度，并把Protobuf帧解析置于网络事件之后，使大量连接共享少量I/O线程而不丢失边界。",
    tags: ["第2章 网络IO多路复用", "核心机制"],
  },
  {
    id: "mga-02-io-multiplexing-2",
    chapter: "mga-02-io-multiplexing",
    level: 2,
    question: "第2章 网络IO多路复用覆盖哪些正式目录主题？",
    answer:
      "2.1 Select网络模型、2.2 Epoll网络模型、2.3 网络协议：protobuf、2.4 总结",
    tags: ["第2章 网络IO多路复用", "目录覆盖"],
  },
  {
    id: "mga-02-io-multiplexing-3",
    chapter: "mga-02-io-multiplexing",
    level: 2,
    question: "第2章 网络IO多路复用的六阶段证据链是什么？",
    answer:
      "建立连接注册表 → 驱动Select基线 → 切换Epoll关注集合 → 读到EAGAIN → 解帧并反序列化 → 慢连接压力后签发",
    tags: ["第2章 网络IO多路复用", "机制链"],
  },
  {
    id: "mga-02-io-multiplexing-4",
    chapter: "mga-02-io-multiplexing",
    level: 3,
    question: "第2章 网络IO多路复用应主动注入哪两类失败？",
    answer:
      "Epoll边沿触发只读一次，没有持续读取到EAGAIN，残留数据永远得不到下一次通知。；在I/O线程直接执行Protobuf业务处理和数据库查询，一个慢请求阻塞全部连接。",
    tags: ["第2章 网络IO多路复用", "故障注入"],
  },
  {
    id: "mga-02-io-multiplexing-5",
    chapter: "mga-02-io-multiplexing",
    level: 3,
    question: "第2章 网络IO多路复用签发时保持什么不变量？",
    answer:
      "关注集合与连接生命周期一致；边沿触发读到EAGAIN；解帧有长度上限；慢业务不阻塞I/O循环。",
    tags: ["第2章 网络IO多路复用", "工程验收"],
  },
  {
    id: "mga-02-io-multiplexing-6",
    chapter: "mga-02-io-multiplexing",
    level: 3,
    question: "第2章 网络IO多路复用怎样完成可复现实验？",
    answer:
      "用一千个空闲连接、二十个活跃连接和一个停止读取的慢连接比较Select与Epoll，先预测CPU扫描和发送队列的差异，再注入畸形Protobuf帧。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第2章 网络IO多路复用", "可复现实验"],
  },
  {
    id: "mga-03-threads-actor-1",
    chapter: "mga-03-threads-actor",
    level: 1,
    question: "第3章 线程、进程以及Actor模型的核心主张是什么？",
    answer:
      "从架构瓶颈和游戏主循环推导进程、线程与Actor的职责，让每个Actor串行拥有状态并通过消息处理跨线程协作。",
    tags: ["第3章 线程、进程以及Actor模型", "核心机制"],
  },
  {
    id: "mga-03-threads-actor-2",
    chapter: "mga-03-threads-actor",
    level: 2,
    question: "第3章 线程、进程以及Actor模型覆盖哪些正式目录主题？",
    answer:
      "3.1 游戏架构概述、3.2 框架瓶颈、3.3 设计游戏框架、3.4 游戏主循环、3.5 理解进程和线程、3.6 Actor模型、3.7 游戏框架中的线程、3.8 Actor对象之间的消息处理机制、3.9 总结",
    tags: ["第3章 线程、进程以及Actor模型", "目录覆盖"],
  },
  {
    id: "mga-03-threads-actor-3",
    chapter: "mga-03-threads-actor",
    level: 2,
    question: "第3章 线程、进程以及Actor模型的六阶段证据链是什么？",
    answer:
      "测量现有瓶颈 → 划分进程线程职责 → 建立固定主循环 → 创建Actor与邮箱 → 串行处理跨Actor消息 → 过载迁移后签发",
    tags: ["第3章 线程、进程以及Actor模型", "机制链"],
  },
  {
    id: "mga-03-threads-actor-4",
    chapter: "mga-03-threads-actor",
    level: 3,
    question: "第3章 线程、进程以及Actor模型应主动注入哪两类失败？",
    answer:
      "Actor暴露内部对象引用给其他线程，表面使用消息模型，实际仍然发生无锁并发写。；邮箱无限增长且没有公平调度，一个热门Actor拖垮进程内所有其他Actor。",
    tags: ["第3章 线程、进程以及Actor模型", "故障注入"],
  },
  {
    id: "mga-03-threads-actor-5",
    chapter: "mga-03-threads-actor",
    level: 3,
    question: "第3章 线程、进程以及Actor模型签发时保持什么不变量？",
    answer:
      "Actor状态只由其消费线程修改；每条消息至多处理一次；邮箱有界；迁移前排空旧代际。",
    tags: ["第3章 线程、进程以及Actor模型", "工程验收"],
  },
  {
    id: "mga-03-threads-actor-6",
    chapter: "mga-03-threads-actor",
    level: 3,
    question: "第3章 线程、进程以及Actor模型怎样完成可复现实验？",
    answer:
      "让一百个Actor互发带序号消息并制造一个热点邮箱，先预测延迟尾部和公平性变化，再在线程迁移时注入迟到消息。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第3章 线程、进程以及Actor模型", "可复现实验"],
  },
  {
    id: "mga-04-account-login-1",
    chapter: "mga-04-account-login",
    level: 1,
    question: "第4章 账号登录与验证的核心主张是什么？",
    answer:
      "把PHP验证接口、第三方库、账号校验、消息过滤和机器人批量登录串成可防重放、可限流、可审计的登录链路。",
    tags: ["第4章 账号登录与验证", "核心机制"],
  },
  {
    id: "mga-04-account-login-2",
    chapter: "mga-04-account-login",
    level: 2,
    question: "第4章 账号登录与验证覆盖哪些正式目录主题？",
    answer:
      "4.1 登录流程图、4.2 制作一个简单的验证接口、4.3 导入PHP登录接口、4.4 编码中用到的第三方库、4.5 账号验证代码分析、4.6 结果测试、4.7 消息过滤机制、4.8 测试机器人、4.9 批量登录测试、4.10 总结",
    tags: ["第4章 账号登录与验证", "目录覆盖"],
  },
  {
    id: "mga-04-account-login-3",
    chapter: "mga-04-account-login",
    level: 2,
    question: "第4章 账号登录与验证的六阶段证据链是什么？",
    answer:
      "绘制登录时序 → 调用PHP验证接口 → 验证凭据与Nonce → 签发并绑定会话 → 过滤未授权消息 → 机器人批量压测签发",
    tags: ["第4章 账号登录与验证", "机制链"],
  },
  {
    id: "mga-04-account-login-4",
    chapter: "mga-04-account-login",
    level: 3,
    question: "第4章 账号登录与验证应主动注入哪两类失败？",
    answer:
      "客户端提交账号ID后服务端直接信任，没有让验证接口签名或绑定Nonce，任意账号都可被冒用。；批量登录只统计成功数，不保存失败阶段和请求ID，无法区分限流、依赖超时与协议错误。",
    tags: ["第4章 账号登录与验证", "故障注入"],
  },
  {
    id: "mga-04-account-login-5",
    chapter: "mga-04-account-login",
    level: 3,
    question: "第4章 账号登录与验证签发时保持什么不变量？",
    answer:
      "凭据不明文落盘；Nonce只成功一次；票据绑定受众与过期时间；未认证连接只能发送白名单消息。",
    tags: ["第4章 账号登录与验证", "工程验收"],
  },
  {
    id: "mga-04-account-login-6",
    chapter: "mga-04-account-login",
    level: 3,
    question: "第4章 账号登录与验证怎样完成可复现实验？",
    answer:
      "用机器人并发提交正常、错误密码、重复Nonce、过期票据和超速消息，先预测过滤器的拒绝顺序，再核对每个请求ID的唯一结果。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第4章 账号登录与验证", "可复现实验"],
  },
  {
    id: "mga-05-performance-object-pool-1",
    chapter: "mga-05-performance-object-pool",
    level: 1,
    question: "第5章 性能优化与对象池的核心主张是什么？",
    answer:
      "用Visual Studio工具、gprof和valgrind建立证据，再从内存布局与生命周期判断对象池是否真正降低分配成本而未引入复用污染。",
    tags: ["第5章 性能优化与对象池", "核心机制"],
  },
  {
    id: "mga-05-performance-object-pool-2",
    chapter: "mga-05-performance-object-pool",
    level: 2,
    question: "第5章 性能优化与对象池覆盖哪些正式目录主题？",
    answer:
      "5.1 Visual Studio性能工具、5.2 内存中的数据结构、5.3 gprof、5.4 valgrind、5.5 对象池、5.6 总结",
    tags: ["第5章 性能优化与对象池", "目录覆盖"],
  },
  {
    id: "mga-05-performance-object-pool-3",
    chapter: "mga-05-performance-object-pool",
    level: 2,
    question: "第5章 性能优化与对象池的六阶段证据链是什么？",
    answer:
      "固定性能基线 → 采样CPU热点 → 检查内存与泄漏 → 判断池化对象 → 实现重置和代际 → 高水位回收后签发",
    tags: ["第5章 性能优化与对象池", "机制链"],
  },
  {
    id: "mga-05-performance-object-pool-4",
    chapter: "mga-05-performance-object-pool",
    level: 3,
    question: "第5章 性能优化与对象池应主动注入哪两类失败？",
    answer:
      "看到分配函数在热点中就把所有对象池化，却增加锁竞争、缓存抖动和常驻内存。；归还对象时没有清空订阅、身份和缓冲区，新会话继承上一位玩家的状态。",
    tags: ["第5章 性能优化与对象池", "故障注入"],
  },
  {
    id: "mga-05-performance-object-pool-5",
    chapter: "mga-05-performance-object-pool",
    level: 3,
    question: "第5章 性能优化与对象池签发时保持什么不变量？",
    answer:
      "优化前后负载一致；对象归还后状态归零；旧句柄因代际失效；池有高水位和回收策略。",
    tags: ["第5章 性能优化与对象池", "工程验收"],
  },
  {
    id: "mga-05-performance-object-pool-6",
    chapter: "mga-05-performance-object-pool",
    level: 3,
    question: "第5章 性能优化与对象池怎样完成可复现实验？",
    answer:
      "在同一登录压测下比较普通分配和对象池，先预测平均延迟与P99是否同向变化，再用valgrind检查泄漏并重放复用污染样本。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第5章 性能优化与对象池", "可复现实验"],
  },
  {
    id: "mga-06-ecs-framework-1",
    chapter: "mga-06-ecs-framework",
    level: 1,
    question: "第6章 搭建ECS框架的核心主张是什么？",
    answer:
      "从最小ECS工程推进到libserver、login、robots、YAML与log4cplus，使实体身份、组件数据、系统行为、配置和日志各有明确边界。",
    tags: ["第6章 搭建ECS框架", "核心机制"],
  },
  {
    id: "mga-06-ecs-framework-2",
    chapter: "mga-06-ecs-framework",
    level: 2,
    question: "第6章 搭建ECS框架覆盖哪些正式目录主题？",
    answer:
      "6.1 一个简单的ECS工程、6.2 基于ECS框架的libserver、6.3 基于ECS框架的login和robots工程、6.4 YAML文件、6.5 log4cplus日志、6.6 总结",
    tags: ["第6章 搭建ECS框架", "目录覆盖"],
  },
  {
    id: "mga-06-ecs-framework-3",
    chapter: "mga-06-ecs-framework",
    level: 2,
    question: "第6章 搭建ECS框架的六阶段证据链是什么？",
    answer:
      "建立实体代际 → 注册组件存储 → 按查询驱动System → 抽取libserver → 装配login与robots → 配置日志回归签发",
    tags: ["第6章 搭建ECS框架", "机制链"],
  },
  {
    id: "mga-06-ecs-framework-4",
    chapter: "mga-06-ecs-framework",
    level: 3,
    question: "第6章 搭建ECS框架应主动注入哪两类失败？",
    answer:
      "Entity只用整数索引，销毁后索引被复用，旧消息错误地修改新实体。；System依赖通过注册顺序隐式决定，增加一个系统后更新次序改变且没有启动期检查。",
    tags: ["第6章 搭建ECS框架", "故障注入"],
  },
  {
    id: "mga-06-ecs-framework-5",
    chapter: "mga-06-ecs-framework",
    level: 3,
    question: "第6章 搭建ECS框架签发时保持什么不变量？",
    answer:
      "实体句柄含代际；组件数据与系统行为分离；系统依赖可拓扑排序；配置校验失败阻止启动。",
    tags: ["第6章 搭建ECS框架", "工程验收"],
  },
  {
    id: "mga-06-ecs-framework-6",
    chapter: "mga-06-ecs-framework",
    level: 3,
    question: "第6章 搭建ECS框架怎样完成可复现实验？",
    answer:
      "反复创建销毁实体并延迟投递旧消息，先预测无代际句柄的污染位置，再打乱System注册顺序验证依赖检查。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第6章 搭建ECS框架", "可复现实验"],
  },
  {
    id: "mga-07-mysql-1",
    chapter: "mga-07-mysql",
    level: 1,
    question: "第7章 MySQL数据库的核心主张是什么？",
    answer:
      "从Connector/C和连接组件推进到参数化写入、查询、表结构升级、Protobuf映射以及角色查询与创建事务。",
    tags: ["第7章 MySQL数据库", "核心机制"],
  },
  {
    id: "mga-07-mysql-2",
    chapter: "mga-07-mysql",
    level: 2,
    question: "第7章 MySQL数据库覆盖哪些正式目录主题？",
    answer:
      "7.1 MySQL Connector/C、7.2 连接时使用的函数说明、7.3 数据库连接组件、7.4 写入数据时使用的函数说明、7.5 写入数据示例、7.6 查询数据时使用的函数说明、7.7 查询数据示例、7.8 数据表的创建与更新、7.9 数据表中的数据结构与protobuf结构、7.10 角色查询与创建流程、7.11 总结",
    tags: ["第7章 MySQL数据库", "目录覆盖"],
  },
  {
    id: "mga-07-mysql-3",
    chapter: "mga-07-mysql",
    level: 2,
    question: "第7章 MySQL数据库的六阶段证据链是什么？",
    answer:
      "连接并设置超时 → 封装连接组件 → 参数化写入查询 → 迁移表结构 → 映射Protobuf数据 → 角色创建事务签发",
    tags: ["第7章 MySQL数据库", "机制链"],
  },
  {
    id: "mga-07-mysql-4",
    chapter: "mga-07-mysql",
    level: 3,
    question: "第7章 MySQL数据库应主动注入哪两类失败？",
    answer:
      "先查询角色不存在再单独插入，没有唯一约束和事务，两个并发请求创建重复角色。；直接按字段顺序把SELECT结果写入Protobuf，表结构调整后字段错位却不报错。",
    tags: ["第7章 MySQL数据库", "故障注入"],
  },
  {
    id: "mga-07-mysql-5",
    chapter: "mga-07-mysql",
    level: 3,
    question: "第7章 MySQL数据库签发时保持什么不变量？",
    answer:
      "角色身份由唯一约束保证；用户值不进入SQL结构；事务失败全回滚；数据映射按字段名和版本。",
    tags: ["第7章 MySQL数据库", "工程验收"],
  },
  {
    id: "mga-07-mysql-6",
    chapter: "mga-07-mysql",
    level: 3,
    question: "第7章 MySQL数据库怎样完成可复现实验？",
    answer:
      "并发提交同名角色并在第二条写入前断开连接，先预测唯一约束与事务结果，再升级Schema并读取旧记录。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第7章 MySQL数据库", "可复现实验"],
  },
  {
    id: "mga-08-component-programming-1",
    chapter: "mga-08-component-programming",
    level: 1,
    question: "第8章 深入学习组件式编程的核心主张是什么？",
    answer:
      "用SystemManager、allinone工程、线程分类、IAwakeSystem、对象池、主动销毁和时间堆完善ECS生命周期与定时调度。",
    tags: ["第8章 深入学习组件式编程", "核心机制"],
  },
  {
    id: "mga-08-component-programming-2",
    chapter: "mga-08-component-programming",
    level: 2,
    question: "第8章 深入学习组件式编程覆盖哪些正式目录主题？",
    answer:
      "8.1 新的系统管理类SystemManager、8.2 allinone工程、8.3 线程分类、8.4 IAwakeSystem接口与对象池、8.5 主动销毁对象、8.6 时间堆、8.7 总结",
    tags: ["第8章 深入学习组件式编程", "目录覆盖"],
  },
  {
    id: "mga-08-component-programming-3",
    chapter: "mga-08-component-programming",
    level: 2,
    question: "第8章 深入学习组件式编程的六阶段证据链是什么？",
    answer:
      "注册System依赖 → 划分线程类别 → Awake池化对象 → 提交主动销毁 → 调度时间堆 → 取消重入后签发",
    tags: ["第8章 深入学习组件式编程", "机制链"],
  },
  {
    id: "mga-08-component-programming-4",
    chapter: "mga-08-component-programming",
    level: 3,
    question: "第8章 深入学习组件式编程应主动注入哪两类失败？",
    answer:
      "对象归还池后旧定时器仍持有裸指针，到期时修改已复用给新实体的内存。；SystemManager关闭顺序与启动顺序相同，上游先释放后下游仍在发送消息。",
    tags: ["第8章 深入学习组件式编程", "故障注入"],
  },
  {
    id: "mga-08-component-programming-5",
    chapter: "mga-08-component-programming",
    level: 3,
    question: "第8章 深入学习组件式编程签发时保持什么不变量？",
    answer:
      "System按依赖逆序关闭；Awake每代只执行一次；销毁在安全点完成；定时任务校验取消令牌。",
    tags: ["第8章 深入学习组件式编程", "工程验收"],
  },
  {
    id: "mga-08-component-programming-6",
    chapter: "mga-08-component-programming",
    level: 3,
    question: "第8章 深入学习组件式编程怎样完成可复现实验？",
    answer:
      "为池化对象安排一万个定时器并在一半到期前销毁，先预测裸指针方案的污染，再验证代际令牌和时间堆复杂度。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第8章 深入学习组件式编程", "可复现实验"],
  },
  {
    id: "mga-09-app-manager-http-1",
    chapter: "mga-09-app-manager-http",
    level: 1,
    question: "第9章 服务器管理进程与HTTP的核心主张是什么？",
    answer:
      "通过多login进程、appmgr、HTTP/Mongoose解析、Packet网络标识和分块传输建立可发现、可管理、可压测的多进程服务。",
    tags: ["第9章 服务器管理进程与HTTP", "核心机制"],
  },
  {
    id: "mga-09-app-manager-http-2",
    chapter: "mga-09-app-manager-http",
    level: 2,
    question: "第9章 服务器管理进程与HTTP覆盖哪些正式目录主题？",
    answer:
      "9.1 启动多个login进程、9.2 appmgr进程、9.3 HTTP、9.4 使用Mongoose分析HTTP格式、9.5 为Packet定义新的网络标识、9.6 HTTP分块、9.7 机器人测试批量登录、9.8 总结",
    tags: ["第9章 服务器管理进程与HTTP", "目录覆盖"],
  },
  {
    id: "mga-09-app-manager-http-3",
    chapter: "mga-09-app-manager-http",
    level: 2,
    question: "第9章 服务器管理进程与HTTP的六阶段证据链是什么？",
    answer:
      "启动多login实例 → 向appmgr注册 → 增量解析HTTP → 补充Packet路由标识 → 处理分块正文 → 机器人批量压测签发",
    tags: ["第9章 服务器管理进程与HTTP", "机制链"],
  },
  {
    id: "mga-09-app-manager-http-4",
    chapter: "mga-09-app-manager-http",
    level: 3,
    question: "第9章 服务器管理进程与HTTP应主动注入哪两类失败？",
    answer:
      "服务只按端口识别，旧实例重启后迟到心跳把新实例错误标记为健康。；HTTP解析假设一次recv得到完整首部和正文，分块或半包时读取越界并阻塞管理接口。",
    tags: ["第9章 服务器管理进程与HTTP", "故障注入"],
  },
  {
    id: "mga-09-app-manager-http-5",
    chapter: "mga-09-app-manager-http",
    level: 3,
    question: "第9章 服务器管理进程与HTTP签发时保持什么不变量？",
    answer:
      "实例身份含代际；注册和心跳幂等；HTTP按字节流增量解析；路由标识不信任外部伪造值。",
    tags: ["第9章 服务器管理进程与HTTP", "工程验收"],
  },
  {
    id: "mga-09-app-manager-http-6",
    chapter: "mga-09-app-manager-http",
    level: 3,
    question: "第9章 服务器管理进程与HTTP怎样完成可复现实验？",
    answer:
      "滚动重启三个login实例并随机拆分HTTP请求，先预测旧心跳和半包解析的首偏离点，再用机器人持续登录观察可用性。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第9章 服务器管理进程与HTTP", "可复现实验"],
  },
  {
    id: "mga-10-distributed-login-redis-1",
    chapter: "mga-10-distributed-login-redis",
    level: 1,
    question: "第10章 分布式登录与Redis内存数据库的核心主张是什么？",
    answer:
      "在game与space职责之间引入Redis共享短期状态，以性能剖析验证多进程登录协议而不把Redis误当永久事实源。",
    tags: ["第10章 分布式登录与Redis内存数据库", "核心机制"],
  },
  {
    id: "mga-10-distributed-login-redis-2",
    chapter: "mga-10-distributed-login-redis",
    level: 2,
    question: "第10章 分布式登录与Redis内存数据库覆盖哪些正式目录主题？",
    answer:
      "10.1 game与space的定位、10.2 Redis及其第三方库、10.3 性能瓶颈分析、10.4 多进程登录协议回顾、10.5 总结",
    tags: ["第10章 分布式登录与Redis内存数据库", "目录覆盖"],
  },
  {
    id: "mga-10-distributed-login-redis-3",
    chapter: "mga-10-distributed-login-redis",
    level: 2,
    question: "第10章 分布式登录与Redis内存数据库的六阶段证据链是什么？",
    answer:
      "划分game与space → 连接Redis并设预算 → 写入短期登录状态 → 分析共享瓶颈 → 重放多进程协议 → Redis失效后签发",
    tags: ["第10章 分布式登录与Redis内存数据库", "机制链"],
  },
  {
    id: "mga-10-distributed-login-redis-4",
    chapter: "mga-10-distributed-login-redis",
    level: 3,
    question: "第10章 分布式登录与Redis内存数据库应主动注入哪两类失败？",
    answer:
      "多个进程先GET再SET登录状态，没有原子条件写，两个并发登录都认为自己成功。；Redis超时后直接放行登录，短暂依赖故障演变为重复会话和状态分叉。",
    tags: ["第10章 分布式登录与Redis内存数据库", "故障注入"],
  },
  {
    id: "mga-10-distributed-login-redis-5",
    chapter: "mga-10-distributed-login-redis",
    level: 3,
    question: "第10章 分布式登录与Redis内存数据库签发时保持什么不变量？",
    answer:
      "同一账号只有一个活动登录代际；条件写原子；短期键有TTL；Redis不可用时拒绝或降级而不伪造成功。",
    tags: ["第10章 分布式登录与Redis内存数据库", "工程验收"],
  },
  {
    id: "mga-10-distributed-login-redis-6",
    chapter: "mga-10-distributed-login-redis",
    level: 3,
    question: "第10章 分布式登录与Redis内存数据库怎样完成可复现实验？",
    answer:
      "让两个login进程并发处理同一账号并注入Redis延迟、主从切换和键过期，先预测幂等键结果，再核对game与space会话。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第10章 分布式登录与Redis内存数据库", "可复现实验"],
  },
  {
    id: "mga-11-distributed-world-transfer-1",
    chapter: "mga-11-distributed-world-transfer",
    level: 1,
    question: "第11章 分布式跳转方案的核心主张是什么？",
    answer:
      "把资源配置、World、WorldProxy和跨进程地图跳转组织成准备、冻结、转移、接管、提交的事务，支持客户端进入和连续跨WorldProxy移动。",
    tags: ["第11章 分布式跳转方案", "核心机制"],
  },
  {
    id: "mga-11-distributed-world-transfer-2",
    chapter: "mga-11-distributed-world-transfer",
    level: 2,
    question: "第11章 分布式跳转方案覆盖哪些正式目录主题？",
    answer:
      "11.1 资源数据配置与读取、11.2 地图类World与代理类WorldProxy、11.3 分布式地图跳转流程、11.4 通过客户端进入游戏、11.5 玩家在WorldProxy之间的跳转、11.6 总结",
    tags: ["第11章 分布式跳转方案", "目录覆盖"],
  },
  {
    id: "mga-11-distributed-world-transfer-3",
    chapter: "mga-11-distributed-world-transfer",
    level: 2,
    question: "第11章 分布式跳转方案的六阶段证据链是什么？",
    answer:
      "读取并校验地图配置 → 定位World与代理 → 目标预留位置 → 源World冻结快照 → 目标接管并提交 → 客户端重连恢复签发",
    tags: ["第11章 分布式跳转方案", "机制链"],
  },
  {
    id: "mga-11-distributed-world-transfer-4",
    chapter: "mga-11-distributed-world-transfer",
    level: 3,
    question: "第11章 分布式跳转方案应主动注入哪两类失败？",
    answer:
      "源World先删除玩家再通知目标创建，目标失败后玩家在两个世界都不存在。；目标先开放输入而源端尚未冻结，两个World同时处理背包或位置更新，状态无法合并。",
    tags: ["第11章 分布式跳转方案", "故障注入"],
  },
  {
    id: "mga-11-distributed-world-transfer-5",
    chapter: "mga-11-distributed-world-transfer",
    level: 3,
    question: "第11章 分布式跳转方案签发时保持什么不变量？",
    answer:
      "迁移任一时刻只有一个权威World；票据一次性且过期；失败可回到源或重试目标；客户端重复确认幂等。",
    tags: ["第11章 分布式跳转方案", "工程验收"],
  },
  {
    id: "mga-11-distributed-world-transfer-6",
    chapter: "mga-11-distributed-world-transfer",
    level: 3,
    question: "第11章 分布式跳转方案怎样完成可复现实验？",
    answer:
      "在准备、冻结、接管和提交四个阶段分别杀死源或目标进程，先预测玩家应落在哪一侧，再重放相同跳转票据。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第11章 分布式跳转方案", "可复现实验"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-1",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 1,
    question: "第12章 断线与动态加载系统的核心主张是什么？",
    answer:
      "区分玩家连接断开和进程间链路断开，并以有版本、有依赖、有排空屏障的方式动态新增系统。",
    tags: ["第12章 断线与动态加载系统", "核心机制"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-2",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 2,
    question: "第12章 断线与动态加载系统覆盖哪些正式目录主题？",
    answer: "12.1 玩家断线、12.2 进程之间的断线、12.3 动态新增系统、12.4 总结",
    tags: ["第12章 断线与动态加载系统", "目录覆盖"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-3",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 2,
    question: "第12章 断线与动态加载系统的六阶段证据链是什么？",
    answer:
      "分类断线来源 → 保留或回收玩家会话 → 摘除失联进程路由 → 校验新系统依赖 → 排空旧版本并切换 → 重连回滚后签发",
    tags: ["第12章 断线与动态加载系统", "机制链"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-4",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 3,
    question: "第12章 断线与动态加载系统应主动注入哪两类失败？",
    answer:
      "TCP断开立刻销毁玩家，移动网络瞬断导致任务、World跳转和未提交事务全部丢失。；动态加载新System后直接替换函数表，旧线程仍在执行旧代码，卸载库后跳入无效地址。",
    tags: ["第12章 断线与动态加载系统", "故障注入"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-5",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 3,
    question: "第12章 断线与动态加载系统签发时保持什么不变量？",
    answer:
      "传输连接与业务会话分离；进程失联使租约过期；系统切换先排空；新版本失败可回滚且消息版本可识别。",
    tags: ["第12章 断线与动态加载系统", "工程验收"],
  },
  {
    id: "mga-12-disconnect-dynamic-system-6",
    chapter: "mga-12-disconnect-dynamic-system",
    level: 3,
    question: "第12章 断线与动态加载系统怎样完成可复现实验？",
    answer:
      "在登录、World跳转和定时器执行中分别断开玩家与服务进程，再动态替换System，先预测每类状态的保留期限和回滚点。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: ["第12章 断线与动态加载系统", "可复现实验"],
  },
  {
    id: "mga-official-final-review-1",
    chapter: "mga-official-final-review",
    level: 1,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习的核心主张是什么？",
    answer:
      "以一次机器人登录、进入World、跨进程跳转、断线恢复和动态系统升级贯通12章，核对网络、Actor、ECS、数据库与分布式状态的唯一所有权。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "核心机制",
    ],
  },
  {
    id: "mga-official-final-review-2",
    chapter: "mga-official-final-review",
    level: 2,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习覆盖哪些正式目录主题？",
    answer:
      "第1章 网络编程基础：从单机与网络游戏的状态边界出发，贯通IP、TCP/IP以及阻塞和非阻塞Socket，为后续框架建立可分片、可重组的字节流契约。、第2章 网络IO多路复用：比较Select与Epoll的就绪集合和复杂度，并把Protobuf帧解析置于网络事件之后，使大量连接共享少量I/O线程而不丢失边界。、第3章 线程、进程以及Actor模型：从架构瓶颈和游戏主循环推导进程、线程与Actor的职责，让每个Actor串行拥有状态并通过消息处理跨线程协作。、第4章 账号登录与验证：把PHP验证接口、第三方库、账号校验、消息过滤和机器人批量登录串成可防重放、可限流、可审计的登录链路。、第5章 性能优化与对象池：用Visual Studio工具、gprof和valgrind建立证据，再从内存布局与生命周期判断对象池是否真正降低分配成本而未引入复用污染。、第6章 搭建ECS框架：从最小ECS工程推进到libserver、login、robots、YAML与log4cplus，使实体身份、组件数据、系统行为、配置和日志各有明确边界。、第7章 MySQL数据库：从Connector/C和连接组件推进到参数化写入、查询、表结构升级、Protobuf映射以及角色查询与创建事务。、第8章 深入学习组件式编程：用SystemManager、allinone工程、线程分类、IAwakeSystem、对象池、主动销毁和时间堆完善ECS生命周期与定时调度。、第9章 服务器管理进程与HTTP：通过多login进程、appmgr、HTTP/Mongoose解析、Packet网络标识和分块传输建立可发现、可管理、可压测的多进程服务。、第10章 分布式登录与Redis内存数据库：在game与space职责之间引入Redis共享短期状态，以性能剖析验证多进程登录协议而不把Redis误当永久事实源。、第11章 分布式跳转方案：把资源配置、World、WorldProxy和跨进程地图跳转组织成准备、冻结、转移、接管、提交的事务，支持客户端进入和连续跨WorldProxy移动。、第12章 断线与动态加载系统：区分玩家连接断开和进程间链路断开，并以有版本、有依赖、有排空屏障的方式动态新增系统。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "目录覆盖",
    ],
  },
  {
    id: "mga-official-final-review-3",
    chapter: "mga-official-final-review",
    level: 2,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习的六阶段证据链是什么？",
    answer:
      "建立Socket与Epoll链 → 进入Actor和ECS → 通过登录与MySQL → 注册多进程和Redis会话 → 完成World跳转 → 断线升级恢复签发",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "机制链",
    ],
  },
  {
    id: "mga-official-final-review-4",
    chapter: "mga-official-final-review",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习应主动注入哪两类失败？",
    answer:
      "只验证机器人最终进入地图，不比较每层请求ID、实体代际、会话票据和World所有权，重复会话被隐藏。；只杀客户端不杀服务进程，也不在World跳转和动态升级中断电，恢复代码从未真正执行。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "故障注入",
    ],
  },
  {
    id: "mga-official-final-review-5",
    chapter: "mga-official-final-review",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习签发时保持什么不变量？",
    answer:
      "每类状态有唯一权威；所有异步结果校验代际；跨进程命令幂等；故障在首偏离点停止；同输入恢复后可重放。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "工程验收",
    ],
  },
  {
    id: "mga-official-final-review-6",
    chapter: "mga-official-final-review",
    level: 3,
    question:
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习怎样完成可复现实验？",
    answer:
      "固定版本、种子和机器人脚本，完成登录、角色创建、进入World、跨WorldProxy跳转、玩家断线、进程断线和动态System升级。 保存版本、种子、代际、首偏离节点、恢复动作和决策。",
    tags: [
      "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
      "可复现实验",
    ],
  },
];
