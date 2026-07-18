import type { ReviewQuestion } from "./types";

export const gsaOfficialQuestions: ReviewQuestion[] = [
  {
    id: "gsa-official-learning-map-1",
    chapter: "gsa-official-learning-map",
    level: 1,
    question: "《游戏服务器架构与优化》权威学习地图的核心主张是什么？",
    answer:
      "全书不是十个现代服务器专题，而是从Python网络入口一路推进到存储、游戏服务拓扑、实时交互、容量与分布式选型的完整工程链。",
    tags: ["《游戏服务器架构与优化》权威学习地图", "工程验收"],
  },
  {
    id: "gsa-official-learning-map-2",
    chapter: "gsa-official-learning-map",
    level: 1,
    question: "《游戏服务器架构与优化》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第1章 Python网络编程模块、第2章 通信加密、第3章 服务器实作、第4章 基础内容存储、第5章 存储方案、第6章 游戏服务器初探、第7章 游戏服务器的交互、第8章 游戏大厅、第9章 实时交互服务器、第10章 天梯和经济系统、第11章 服务器承载量和客户端优化方案、第12章 分布式服务器、附录A 不同语言之间的区别",
    tags: ["《游戏服务器架构与优化》权威学习地图", "目录覆盖"],
  },
  {
    id: "gsa-official-learning-map-3",
    chapter: "gsa-official-learning-map",
    level: 2,
    question: "《游戏服务器架构与优化》权威学习地图的六阶段证据链是什么？",
    answer:
      "核准书目 → 建立网络入口 → 固定存储事实 → 演进游戏拓扑 → 签发实时容量 → 完成语言选型",
    tags: ["《游戏服务器架构与优化》权威学习地图", "工程验收"],
  },
  {
    id: "gsa-official-learning-map-4",
    chapter: "gsa-official-learning-map",
    level: 2,
    question: "《游戏服务器架构与优化》权威学习地图应主动注入哪两类失败？",
    answer:
      "沿用原来的Actor、协程、分库分表、CI/CD十个专题，继续把它们误当成原书章序。；把出版社简介中的‘13章’直接改写成目录第13章，掩盖公开目录实际标作附录A的差异。",
    tags: ["《游戏服务器架构与优化》权威学习地图", "工程验收"],
  },
  {
    id: "gsa-official-learning-map-5",
    chapter: "gsa-official-learning-map",
    level: 3,
    question: "《游戏服务器架构与优化》权威学习地图签发时保持什么不变量？",
    answer:
      "12个编号章和附录A各有独立页面；53个公开节标题全部可追踪；出版社标号差异被明确披露。",
    tags: ["《游戏服务器架构与优化》权威学习地图", "工程验收"],
  },
  {
    id: "gsa-official-learning-map-6",
    chapter: "gsa-official-learning-map",
    level: 3,
    question: "《游戏服务器架构与优化》权威学习地图怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["《游戏服务器架构与优化》权威学习地图", "工程验收"],
  },
  {
    id: "gsa-01-python-networking-1",
    chapter: "gsa-01-python-networking",
    level: 1,
    question: "第1章 Python网络编程模块的核心主张是什么？",
    answer:
      "网络层首先是一组字节、端点和就绪事件的所有权契约；只有处理好部分收发和背压，业务协议才有可靠地基。",
    tags: ["第1章 Python网络编程模块", "工程验收"],
  },
  {
    id: "gsa-01-python-networking-2",
    chapter: "gsa-01-python-networking",
    level: 1,
    question: "第1章 Python网络编程模块覆盖哪些正式目录主题？",
    answer:
      "1.1 Python Socket、1.2 服务器端其他Socket方法、1.3 客户端Socket、1.4 通用的Socket方法、1.5 SimpleHTTPServer和BaseHTTPServer、1.6 urllib和urllib2、1.7 事件驱动框架Twisted",
    tags: ["第1章 Python网络编程模块", "目录覆盖"],
  },
  {
    id: "gsa-01-python-networking-3",
    chapter: "gsa-01-python-networking",
    level: 2,
    question: "第1章 Python网络编程模块的六阶段证据链是什么？",
    answer:
      "确定端点 → 建立连接 → 累积部分读 → 排队部分写 → 接入Reactor → 背压签发",
    tags: ["第1章 Python网络编程模块", "工程验收"],
  },
  {
    id: "gsa-01-python-networking-4",
    chapter: "gsa-01-python-networking",
    level: 2,
    question: "第1章 Python网络编程模块应主动注入哪两类失败？",
    answer:
      "把一次recv当成一条完整消息，粘包和分片出现后解析器立刻错位。；在Reactor回调中执行阻塞数据库调用，让一个慢请求拖住所有连接。",
    tags: ["第1章 Python网络编程模块", "工程验收"],
  },
  {
    id: "gsa-01-python-networking-5",
    chapter: "gsa-01-python-networking",
    level: 3,
    question: "第1章 Python网络编程模块签发时保持什么不变量？",
    answer:
      "连接只有一个状态所有者；任何分片方式都得到相同消息；写队列有界；事件循环不执行阻塞任务。",
    tags: ["第1章 Python网络编程模块", "工程验收"],
  },
  {
    id: "gsa-01-python-networking-6",
    chapter: "gsa-01-python-networking",
    level: 3,
    question: "第1章 Python网络编程模块怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第1章 Python网络编程模块", "工程验收"],
  },
  {
    id: "gsa-02-communication-encryption-1",
    chapter: "gsa-02-communication-encryption",
    level: 1,
    question: "第2章 通信加密的核心主张是什么？",
    answer:
      "加密不是把明文变乱，而是同时证明对端身份、保护机密性与完整性，并对重放和密钥轮换给出明确语义。",
    tags: ["第2章 通信加密", "工程验收"],
  },
  {
    id: "gsa-02-communication-encryption-2",
    chapter: "gsa-02-communication-encryption",
    level: 1,
    question: "第2章 通信加密覆盖哪些正式目录主题？",
    answer:
      "2.1 软件、通信加密的几种常用方案、2.2 OpenSSL、2.3 SSL/TLS通信、2.4 其他加密方式",
    tags: ["第2章 通信加密", "目录覆盖"],
  },
  {
    id: "gsa-02-communication-encryption-3",
    chapter: "gsa-02-communication-encryption",
    level: 2,
    question: "第2章 通信加密的六阶段证据链是什么？",
    answer: "列出威胁 → 验证证书 → 协商密钥 → 认证加密 → 拒绝重放 → 轮换恢复",
    tags: ["第2章 通信加密", "工程验收"],
  },
  {
    id: "gsa-02-communication-encryption-4",
    chapter: "gsa-02-communication-encryption",
    level: 2,
    question: "第2章 通信加密应主动注入哪两类失败？",
    answer:
      "把异或或Base64称为加密，攻击者无需密钥就能恢复或篡改内容。；为了联调关闭证书和主机名验证，最终把中间人攻击路径带到生产。",
    tags: ["第2章 通信加密", "工程验收"],
  },
  {
    id: "gsa-02-communication-encryption-5",
    chapter: "gsa-02-communication-encryption",
    level: 3,
    question: "第2章 通信加密签发时保持什么不变量？",
    answer:
      "只接受受信身份和允许版本；每个密文都校验完整性与新鲜度；密钥轮换不需要降级协议。",
    tags: ["第2章 通信加密", "工程验收"],
  },
  {
    id: "gsa-02-communication-encryption-6",
    chapter: "gsa-02-communication-encryption",
    level: 3,
    question: "第2章 通信加密怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第2章 通信加密", "工程验收"],
  },
  {
    id: "gsa-03-server-practice-1",
    chapter: "gsa-03-server-practice",
    level: 1,
    question: "第3章 服务器实作的核心主张是什么？",
    answer:
      "服务器实作必须把协议状态机与执行资源分开：连接归属不能随线程池调度漂移，慢任务也不能阻塞帧解析。",
    tags: ["第3章 服务器实作", "工程验收"],
  },
  {
    id: "gsa-03-server-practice-2",
    chapter: "gsa-03-server-practice",
    level: 1,
    question: "第3章 服务器实作覆盖哪些正式目录主题？",
    answer: "3.1 构建Python Websocket服务器、3.2 多线程服务器、3.3 线程池",
    tags: ["第3章 服务器实作", "目录覆盖"],
  },
  {
    id: "gsa-03-server-practice-3",
    chapter: "gsa-03-server-practice",
    level: 2,
    question: "第3章 服务器实作的六阶段证据链是什么？",
    answer:
      "校验升级 → 签发连接代际 → 增量解帧 → 分类任务 → 有界调度 → 关闭回收",
    tags: ["第3章 服务器实作", "工程验收"],
  },
  {
    id: "gsa-03-server-practice-4",
    chapter: "gsa-03-server-practice",
    level: 2,
    question: "第3章 服务器实作应主动注入哪两类失败？",
    answer:
      "每条连接创建永久线程，空闲连接也持续消耗栈和调度资源。；相信客户端声明的帧长度，攻击者用一个巨大长度拖垮内存。",
    tags: ["第3章 服务器实作", "工程验收"],
  },
  {
    id: "gsa-03-server-practice-5",
    chapter: "gsa-03-server-practice",
    level: 3,
    question: "第3章 服务器实作签发时保持什么不变量？",
    answer:
      "升级和帧解析严格校验；连接关闭后旧任务不能回写；工作队列有界；CPU任务不占用I/O循环。",
    tags: ["第3章 服务器实作", "工程验收"],
  },
  {
    id: "gsa-03-server-practice-6",
    chapter: "gsa-03-server-practice",
    level: 3,
    question: "第3章 服务器实作怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第3章 服务器实作", "工程验收"],
  },
  {
    id: "gsa-04-basic-storage-1",
    chapter: "gsa-04-basic-storage",
    level: 1,
    question: "第4章 基础内容存储的核心主张是什么？",
    answer:
      "存储设计的中心不是数据库品牌，而是谁拥有事实、何时落盘、复制落后时读到什么，以及备份能否真的恢复。",
    tags: ["第4章 基础内容存储", "工程验收"],
  },
  {
    id: "gsa-04-basic-storage-2",
    chapter: "gsa-04-basic-storage",
    level: 1,
    question: "第4章 基础内容存储覆盖哪些正式目录主题？",
    answer:
      "4.1 数据库存储的种类、4.2 SQL与NoSQL、4.3 内存与IO读写速度、4.4 同步内存数据、4.5 数据备份和恢复、4.6 不可或缺的SQLite",
    tags: ["第4章 基础内容存储", "目录覆盖"],
  },
  {
    id: "gsa-04-basic-storage-3",
    chapter: "gsa-04-basic-storage",
    level: 2,
    question: "第4章 基础内容存储的六阶段证据链是什么？",
    answer:
      "定义事实源 → 匹配访问模式 → 写入内存 → 持久化复制 → 备份校验 → 恢复签发",
    tags: ["第4章 基础内容存储", "工程验收"],
  },
  {
    id: "gsa-04-basic-storage-4",
    chapter: "gsa-04-basic-storage",
    level: 2,
    question: "第4章 基础内容存储应主动注入哪两类失败？",
    answer:
      "把Redis副本当成同步事实源，故障切换后旧值覆盖新交易。；每天生成备份文件却从不恢复演练，真正故障时才发现文件缺表或密钥不可用。",
    tags: ["第4章 基础内容存储", "工程验收"],
  },
  {
    id: "gsa-04-basic-storage-5",
    chapter: "gsa-04-basic-storage",
    level: 3,
    question: "第4章 基础内容存储签发时保持什么不变量？",
    answer:
      "每类数据有唯一事实源和版本；复制落后可观测；备份经过恢复验证；恢复后业务不变量仍成立。",
    tags: ["第4章 基础内容存储", "工程验收"],
  },
  {
    id: "gsa-04-basic-storage-6",
    chapter: "gsa-04-basic-storage",
    level: 3,
    question: "第4章 基础内容存储怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第4章 基础内容存储", "工程验收"],
  },
  {
    id: "gsa-05-storage-solutions-1",
    chapter: "gsa-05-storage-solutions",
    level: 1,
    question: "第5章 存储方案的核心主张是什么？",
    answer:
      "高并发存储的优化顺序是缩短临界区、减少往返和复制、限定缓存一致性，再决定是否需要分布式或不可变账本。",
    tags: ["第5章 存储方案", "工程验收"],
  },
  {
    id: "gsa-05-storage-solutions-2",
    chapter: "gsa-05-storage-solutions",
    level: 1,
    question: "第5章 存储方案覆盖哪些正式目录主题？",
    answer:
      "5.1 高并发服务器的存储方案、5.2 高速缓存、5.3 二进制存储方案、5.4 大规模计算、5.5 区块链技术",
    tags: ["第5章 存储方案", "目录覆盖"],
  },
  {
    id: "gsa-05-storage-solutions-3",
    chapter: "gsa-05-storage-solutions",
    level: 2,
    question: "第5章 存储方案的六阶段证据链是什么？",
    answer:
      "测量访问 → 缩短锁域 → 部署缓存 → 分片二进制 → 批量计算 → 一致性签发",
    tags: ["第5章 存储方案", "工程验收"],
  },
  {
    id: "gsa-05-storage-solutions-4",
    chapter: "gsa-05-storage-solutions",
    level: 2,
    question: "第5章 存储方案应主动注入哪两类失败？",
    answer:
      "把缓存当成唯一数据源，淘汰或重启后玩家资产永久消失。；用无期限分布式锁包住慢I/O，租约过期后两个持有者同时写入。",
    tags: ["第5章 存储方案", "工程验收"],
  },
  {
    id: "gsa-05-storage-solutions-5",
    chapter: "gsa-05-storage-solutions",
    level: 3,
    question: "第5章 存储方案签发时保持什么不变量？",
    answer:
      "缓存可丢可重建；锁域和租约有界；分片键稳定；经济事实始终可审计并从持久源恢复。",
    tags: ["第5章 存储方案", "工程验收"],
  },
  {
    id: "gsa-05-storage-solutions-6",
    chapter: "gsa-05-storage-solutions",
    level: 3,
    question: "第5章 存储方案怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第5章 存储方案", "工程验收"],
  },
  {
    id: "gsa-06-game-server-foundations-1",
    chapter: "gsa-06-game-server-foundations",
    level: 1,
    question: "第6章 游戏服务器初探的核心主张是什么？",
    answer:
      "游戏服务器形态由玩法的交互频率和状态共享范围决定；无缝地图的核心不是视觉拼接，而是跨区状态所有权迁移。",
    tags: ["第6章 游戏服务器初探", "工程验收"],
  },
  {
    id: "gsa-06-game-server-foundations-2",
    chapter: "gsa-06-game-server-foundations",
    level: 1,
    question: "第6章 游戏服务器初探覆盖哪些正式目录主题？",
    answer: "6.1 服务器消息和轮询、6.2 游戏服务器架构演变、6.3 地图的无缝连接",
    tags: ["第6章 游戏服务器初探", "目录覆盖"],
  },
  {
    id: "gsa-06-game-server-foundations-3",
    chapter: "gsa-06-game-server-foundations",
    level: 2,
    question: "第6章 游戏服务器初探的六阶段证据链是什么？",
    answer:
      "识别玩法频率 → 选择连接模型 → 确定权威状态 → 划分地图区域 → 迁移实体 → 边界重放",
    tags: ["第6章 游戏服务器初探", "工程验收"],
  },
  {
    id: "gsa-06-game-server-foundations-4",
    chapter: "gsa-06-game-server-foundations",
    level: 2,
    question: "第6章 游戏服务器初探应主动注入哪两类失败？",
    answer:
      "地图边界两侧同时模拟同一实体，短暂重叠最终变成复制资产或重复伤害。；轮询没有游标和版本，重试时消息重复或漏掉窗口中的更新。",
    tags: ["第6章 游戏服务器初探", "工程验收"],
  },
  {
    id: "gsa-06-game-server-foundations-5",
    chapter: "gsa-06-game-server-foundations",
    level: 3,
    question: "第6章 游戏服务器初探签发时保持什么不变量？",
    answer:
      "连接模型匹配玩法预算；权威状态唯一；跨区迁移带代际并可重放；边界失败不会产生双份实体。",
    tags: ["第6章 游戏服务器初探", "工程验收"],
  },
  {
    id: "gsa-06-game-server-foundations-6",
    chapter: "gsa-06-game-server-foundations",
    level: 3,
    question: "第6章 游戏服务器初探怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第6章 游戏服务器初探", "工程验收"],
  },
  {
    id: "gsa-07-server-interactions-1",
    chapter: "gsa-07-server-interactions",
    level: 1,
    question: "第7章 游戏服务器的交互的核心主张是什么？",
    answer:
      "集群可扩展的前提是状态归属可路由、请求可去重、定时任务有唯一租约；增加节点本身不会自动带来高可用。",
    tags: ["第7章 游戏服务器的交互", "工程验收"],
  },
  {
    id: "gsa-07-server-interactions-2",
    chapter: "gsa-07-server-interactions",
    level: 1,
    question: "第7章 游戏服务器的交互覆盖哪些正式目录主题？",
    answer:
      "7.1 无状态和有状态的服务器设计方案、7.2 轮询、7.3 集群方案、7.4 定时任务",
    tags: ["第7章 游戏服务器的交互", "目录覆盖"],
  },
  {
    id: "gsa-07-server-interactions-3",
    chapter: "gsa-07-server-interactions",
    level: 2,
    question: "第7章 游戏服务器的交互的六阶段证据链是什么？",
    answer:
      "分类状态 → 选择路由键 → 建立集群 → 连接数据库 → 租约调度 → 故障接管",
    tags: ["第7章 游戏服务器的交互", "工程验收"],
  },
  {
    id: "gsa-07-server-interactions-4",
    chapter: "gsa-07-server-interactions",
    level: 2,
    question: "第7章 游戏服务器的交互应主动注入哪两类失败？",
    answer:
      "把有状态房间随机分发到任意节点，同一玩家在两个进程形成两份会话。；所有节点都执行同一个定时发奖任务，数据库最终出现多份奖励。",
    tags: ["第7章 游戏服务器的交互", "工程验收"],
  },
  {
    id: "gsa-07-server-interactions-5",
    chapter: "gsa-07-server-interactions",
    level: 3,
    question: "第7章 游戏服务器的交互签发时保持什么不变量？",
    answer:
      "状态键有稳定所有者；重试不重复副作用；成员变化可接管；每个定时批次只签发一次业务结果。",
    tags: ["第7章 游戏服务器的交互", "工程验收"],
  },
  {
    id: "gsa-07-server-interactions-6",
    chapter: "gsa-07-server-interactions",
    level: 3,
    question: "第7章 游戏服务器的交互怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第7章 游戏服务器的交互", "工程验收"],
  },
  {
    id: "gsa-08-game-lobby-1",
    chapter: "gsa-08-game-lobby",
    level: 1,
    question: "第8章 游戏大厅的核心主张是什么？",
    answer:
      "大厅不是菜单页面，而是身份、社交、匹配和房间分配的控制面；它必须把一次登录签发成作用域明确的游戏会话。",
    tags: ["第8章 游戏大厅", "工程验收"],
  },
  {
    id: "gsa-08-game-lobby-2",
    chapter: "gsa-08-game-lobby",
    level: 1,
    question: "第8章 游戏大厅覆盖哪些正式目录主题？",
    answer: "8.1 大厅登录流程、8.2 中间件、8.3 聊天服务、8.4 大厅与游戏的对接",
    tags: ["第8章 游戏大厅", "目录覆盖"],
  },
  {
    id: "gsa-08-game-lobby-3",
    chapter: "gsa-08-game-lobby",
    level: 2,
    question: "第8章 游戏大厅的六阶段证据链是什么？",
    answer:
      "认证账户 → 选择游戏区 → 加载社交 → 创建房间 → 签发票据 → 游戏服接管",
    tags: ["第8章 游戏大厅", "工程验收"],
  },
  {
    id: "gsa-08-game-lobby-4",
    chapter: "gsa-08-game-lobby",
    level: 2,
    question: "第8章 游戏大厅应主动注入哪两类失败？",
    answer:
      "房间创建没有幂等键，客户端重试后同时占用多个游戏服名额。；聊天按全量好友列表同步扇出，热门频道让单条消息形成无界队列。",
    tags: ["第8章 游戏大厅", "工程验收"],
  },
  {
    id: "gsa-08-game-lobby-5",
    chapter: "gsa-08-game-lobby",
    level: 3,
    question: "第8章 游戏大厅签发时保持什么不变量？",
    answer:
      "认证、选区和房间作用域分离；票据短期且绑定代际；预留可补偿；聊天扇出有界并可降级。",
    tags: ["第8章 游戏大厅", "工程验收"],
  },
  {
    id: "gsa-08-game-lobby-6",
    chapter: "gsa-08-game-lobby",
    level: 3,
    question: "第8章 游戏大厅怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第8章 游戏大厅", "工程验收"],
  },
  {
    id: "gsa-09-realtime-interaction-1",
    chapter: "gsa-09-realtime-interaction",
    level: 1,
    question: "第9章 实时交互服务器的核心主张是什么？",
    answer:
      "实时服务追求的是在延迟预算内保持可验证状态，而不是盲目选择UDP；协议必须为顺序、长度、完整性和会话代际编码。",
    tags: ["第9章 实时交互服务器", "工程验收"],
  },
  {
    id: "gsa-09-realtime-interaction-2",
    chapter: "gsa-09-realtime-interaction",
    level: 1,
    question: "第9章 实时交互服务器覆盖哪些正式目录主题？",
    answer:
      "9.1 长连接和强交互、9.2 使用UDP的方案、9.3 协议包的设计和实现、9.4 断线重连",
    tags: ["第9章 实时交互服务器", "目录覆盖"],
  },
  {
    id: "gsa-09-realtime-interaction-3",
    chapter: "gsa-09-realtime-interaction",
    level: 2,
    question: "第9章 实时交互服务器的六阶段证据链是什么？",
    answer: "建立长连接 → 协商协议 → 验证包头 → 排队处理 → 检测断线 → 重连追帧",
    tags: ["第9章 实时交互服务器", "工程验收"],
  },
  {
    id: "gsa-09-realtime-interaction-4",
    chapter: "gsa-09-realtime-interaction",
    level: 2,
    question: "第9章 实时交互服务器应主动注入哪两类失败？",
    answer:
      "重连后旧连接仍能提交结果，新旧代际交错覆盖玩家位置和操作。；按客户端包长直接分配或解压，畸形包用极小流量耗尽内存。",
    tags: ["第9章 实时交互服务器", "工程验收"],
  },
  {
    id: "gsa-09-realtime-interaction-5",
    chapter: "gsa-09-realtime-interaction",
    level: 3,
    question: "第9章 实时交互服务器签发时保持什么不变量？",
    answer:
      "包边界先验证后分配；旧序号和旧代际被拒绝；队列有界；重连只补缺失状态且不重复副作用。",
    tags: ["第9章 实时交互服务器", "工程验收"],
  },
  {
    id: "gsa-09-realtime-interaction-6",
    chapter: "gsa-09-realtime-interaction",
    level: 3,
    question: "第9章 实时交互服务器怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第9章 实时交互服务器", "工程验收"],
  },
  {
    id: "gsa-10-ladder-economy-1",
    chapter: "gsa-10-ladder-economy",
    level: 1,
    question: "第10章 天梯和经济系统的核心主张是什么？",
    answer:
      "排名与经济都属于可审计状态：一场比赛只能结算一次，每笔资产变化必须有原因、前后余额和版本。",
    tags: ["第10章 天梯和经济系统", "工程验收"],
  },
  {
    id: "gsa-10-ladder-economy-2",
    chapter: "gsa-10-ladder-economy",
    level: 1,
    question: "第10章 天梯和经济系统覆盖哪些正式目录主题？",
    answer:
      "10.1 什么是天梯、10.2 天梯层级、10.3 经济系统、10.4 预留接口和热更新",
    tags: ["第10章 天梯和经济系统", "目录覆盖"],
  },
  {
    id: "gsa-10-ladder-economy-3",
    chapter: "gsa-10-ladder-economy",
    level: 2,
    question: "第10章 天梯和经济系统的六阶段证据链是什么？",
    answer: "加载赛季 → 匹配对局 → 签发结果 → 更新评分 → 记经济账 → 热更验收",
    tags: ["第10章 天梯和经济系统", "工程验收"],
  },
  {
    id: "gsa-10-ladder-economy-4",
    chapter: "gsa-10-ladder-economy",
    level: 2,
    question: "第10章 天梯和经济系统应主动注入哪两类失败？",
    answer:
      "直接覆盖余额而不记交易原因，重复结算和异常资产无法追查。；热更新过程中同一场对局前后使用不同规则，排名与奖励无法复算。",
    tags: ["第10章 天梯和经济系统", "工程验收"],
  },
  {
    id: "gsa-10-ladder-economy-5",
    chapter: "gsa-10-ladder-economy",
    level: 3,
    question: "第10章 天梯和经济系统签发时保持什么不变量？",
    answer:
      "比赛结果只结算一次；资产变化可由账本复算；赛季和规则版本固定；热更新可灰度、可回滚。",
    tags: ["第10章 天梯和经济系统", "工程验收"],
  },
  {
    id: "gsa-10-ladder-economy-6",
    chapter: "gsa-10-ladder-economy",
    level: 3,
    question: "第10章 天梯和经济系统怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第10章 天梯和经济系统", "工程验收"],
  },
  {
    id: "gsa-11-capacity-client-optimization-1",
    chapter: "gsa-11-capacity-client-optimization",
    level: 1,
    question: "第11章 服务器承载量和客户端优化方案的核心主张是什么？",
    answer:
      "承载量是满足延迟、错误率和恢复目标时的最大安全负载；心跳、监督和客户端节流都服务于这个边界。",
    tags: ["第11章 服务器承载量和客户端优化方案", "工程验收"],
  },
  {
    id: "gsa-11-capacity-client-optimization-2",
    chapter: "gsa-11-capacity-client-optimization",
    level: 1,
    question: "第11章 服务器承载量和客户端优化方案覆盖哪些正式目录主题？",
    answer:
      "11.1 心跳服务、11.2 同步校验、11.3 服务器承载、11.4 守护者进程、11.5 客户端优化方案",
    tags: ["第11章 服务器承载量和客户端优化方案", "目录覆盖"],
  },
  {
    id: "gsa-11-capacity-client-optimization-3",
    chapter: "gsa-11-capacity-client-optimization",
    level: 2,
    question: "第11章 服务器承载量和客户端优化方案的六阶段证据链是什么？",
    answer: "定义SLO → 测单机曲线 → 加入心跳 → 校验漂移 → 故障拉起 → 容量留余",
    tags: ["第11章 服务器承载量和客户端优化方案", "工程验收"],
  },
  {
    id: "gsa-11-capacity-client-optimization-4",
    chapter: "gsa-11-capacity-client-optimization",
    level: 2,
    question: "第11章 服务器承载量和客户端优化方案应主动注入哪两类失败？",
    answer:
      "所有客户端同一秒发送心跳，周期性流量峰值把健康服务打成超时。；用平均响应和平均在线数宣称容量，峰值尾延迟已让关键操作连续失败。",
    tags: ["第11章 服务器承载量和客户端优化方案", "工程验收"],
  },
  {
    id: "gsa-11-capacity-client-optimization-5",
    chapter: "gsa-11-capacity-client-optimization",
    level: 3,
    question: "第11章 服务器承载量和客户端优化方案签发时保持什么不变量？",
    answer:
      "心跳带抖动和代际；状态漂移可定位；容量由尾延迟与错误预算签发；故障恢复不形成重启风暴。",
    tags: ["第11章 服务器承载量和客户端优化方案", "工程验收"],
  },
  {
    id: "gsa-11-capacity-client-optimization-6",
    chapter: "gsa-11-capacity-client-optimization",
    level: 3,
    question: "第11章 服务器承载量和客户端优化方案怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第11章 服务器承载量和客户端优化方案", "工程验收"],
  },
  {
    id: "gsa-12-distributed-servers-1",
    chapter: "gsa-12-distributed-servers",
    level: 1,
    question: "第12章 分布式服务器的核心主张是什么？",
    answer:
      "分布式不是节点数量，而是部分失败下仍能解释状态；消息重复、乱序、延迟和成员变化必须成为正常控制流。",
    tags: ["第12章 分布式服务器", "工程验收"],
  },
  {
    id: "gsa-12-distributed-servers-2",
    chapter: "gsa-12-distributed-servers",
    level: 1,
    question: "第12章 分布式服务器覆盖哪些正式目录主题？",
    answer: "12.1 什么是分布式系统、12.2 流式处理、12.3 Python分布式框架",
    tags: ["第12章 分布式服务器", "目录覆盖"],
  },
  {
    id: "gsa-12-distributed-servers-3",
    chapter: "gsa-12-distributed-servers",
    level: 2,
    question: "第12章 分布式服务器的六阶段证据链是什么？",
    answer:
      "划分状态键 → 签发分区代际 → 消费事件 → 幂等应用 → 保存检查点 → 故障再平衡",
    tags: ["第12章 分布式服务器", "工程验收"],
  },
  {
    id: "gsa-12-distributed-servers-4",
    chapter: "gsa-12-distributed-servers",
    level: 2,
    question: "第12章 分布式服务器应主动注入哪两类失败？",
    answer:
      "假设消息只投递一次，消费者重启后重复扣款或重复发奖。；为了显得先进先拆分布式服务，却没有稳定分区键和故障恢复测试。",
    tags: ["第12章 分布式服务器", "工程验收"],
  },
  {
    id: "gsa-12-distributed-servers-5",
    chapter: "gsa-12-distributed-servers",
    level: 3,
    question: "第12章 分布式服务器签发时保持什么不变量？",
    answer:
      "每个分区只有当前代际所有者；重复事件不重复副作用；检查点与状态一致；再平衡后可从同一输入收敛。",
    tags: ["第12章 分布式服务器", "工程验收"],
  },
  {
    id: "gsa-12-distributed-servers-6",
    chapter: "gsa-12-distributed-servers",
    level: 3,
    question: "第12章 分布式服务器怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["第12章 分布式服务器", "工程验收"],
  },
  {
    id: "gsa-appendix-language-comparison-1",
    chapter: "gsa-appendix-language-comparison",
    level: 1,
    question: "附录A 不同语言之间的区别的核心主张是什么？",
    answer:
      "语言选型不是速度排行榜，而是工作负载、运行时风险、库生态、可观测性和团队交付能力的联合约束。",
    tags: ["附录A 不同语言之间的区别", "工程验收"],
  },
  {
    id: "gsa-appendix-language-comparison-2",
    chapter: "gsa-appendix-language-comparison",
    level: 1,
    question: "附录A 不同语言之间的区别覆盖哪些正式目录主题？",
    answer: "附录A 不同语言之间的区别",
    tags: ["附录A 不同语言之间的区别", "目录覆盖"],
  },
  {
    id: "gsa-appendix-language-comparison-3",
    chapter: "gsa-appendix-language-comparison",
    level: 2,
    question: "附录A 不同语言之间的区别的六阶段证据链是什么？",
    answer: "定义负载 → 选代表场景 → 测尾延迟 → 注入故障 → 核对生态 → 记录决策",
    tags: ["附录A 不同语言之间的区别", "工程验收"],
  },
  {
    id: "gsa-appendix-language-comparison-4",
    chapter: "gsa-appendix-language-comparison",
    level: 2,
    question: "附录A 不同语言之间的区别应主动注入哪两类失败？",
    answer:
      "用Hello World吞吐排名选语言，忽略真实协议、运行时暂停和恢复成本。；把热点函数下沉到另一语言却不定义所有权，FFI两侧同时修改同一状态。",
    tags: ["附录A 不同语言之间的区别", "工程验收"],
  },
  {
    id: "gsa-appendix-language-comparison-5",
    chapter: "gsa-appendix-language-comparison",
    level: 3,
    question: "附录A 不同语言之间的区别签发时保持什么不变量？",
    answer:
      "选型可回指工作负载和尾延迟证据；故障恢复已演练；互操作边界版本化；团队能长期维护。",
    tags: ["附录A 不同语言之间的区别", "工程验收"],
  },
  {
    id: "gsa-appendix-language-comparison-6",
    chapter: "gsa-appendix-language-comparison",
    level: 3,
    question: "附录A 不同语言之间的区别怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["附录A 不同语言之间的区别", "工程验收"],
  },
  {
    id: "gsa-official-final-review-1",
    chapter: "gsa-official-final-review",
    level: 1,
    question: "《游戏服务器架构与优化》全书总复习的核心主张是什么？",
    answer:
      "最终验收要求同一玩家旅程在正常、边界、失败和恢复样本中都能解释状态所有者、容量预算和恢复动作。",
    tags: ["《游戏服务器架构与优化》全书总复习", "工程验收"],
  },
  {
    id: "gsa-official-final-review-2",
    chapter: "gsa-official-final-review",
    level: 1,
    question: "《游戏服务器架构与优化》全书总复习覆盖哪些正式目录主题？",
    answer:
      "第1章 Python网络编程模块、第2章 通信加密、第3章 服务器实作、第4章 基础内容存储、第5章 存储方案、第6章 游戏服务器初探、第7章 游戏服务器的交互、第8章 游戏大厅、第9章 实时交互服务器、第10章 天梯和经济系统、第11章 服务器承载量和客户端优化方案、第12章 分布式服务器、附录A 不同语言之间的区别",
    tags: ["《游戏服务器架构与优化》全书总复习", "目录覆盖"],
  },
  {
    id: "gsa-official-final-review-3",
    chapter: "gsa-official-final-review",
    level: 2,
    question: "《游戏服务器架构与优化》全书总复习的六阶段证据链是什么？",
    answer:
      "认证连接 → 选择大厅房间 → 进入实时会话 → 结算存储 → 故障接管 → 容量选型签发",
    tags: ["《游戏服务器架构与优化》全书总复习", "工程验收"],
  },
  {
    id: "gsa-official-final-review-4",
    chapter: "gsa-official-final-review",
    level: 2,
    question: "《游戏服务器架构与优化》全书总复习应主动注入哪两类失败？",
    answer:
      "每章单独演示成功，却没有跨服务追踪同一请求，重复副作用藏在边界之间。；只证明故障能自动重启，没有验证旧连接、旧定时器和旧消费者不能继续写入。",
    tags: ["《游戏服务器架构与优化》全书总复习", "工程验收"],
  },
  {
    id: "gsa-official-final-review-5",
    chapter: "gsa-official-final-review",
    level: 3,
    question: "《游戏服务器架构与优化》全书总复习签发时保持什么不变量？",
    answer:
      "端到端请求只有一份业务事实；旧代际不能回写；队列和延迟有界；恢复重放不重复资产副作用。",
    tags: ["《游戏服务器架构与优化》全书总复习", "工程验收"],
  },
  {
    id: "gsa-official-final-review-6",
    chapter: "gsa-official-final-review",
    level: 3,
    question: "《游戏服务器架构与优化》全书总复习怎样完成可复现实验？",
    answer:
      "固定版本、负载和输入，运行正常、边界、失败与恢复样本，保存所有者、首偏离点和恢复动作。",
    tags: ["《游戏服务器架构与优化》全书总复习", "工程验收"],
  },
];
