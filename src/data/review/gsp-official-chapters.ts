import type { ReviewQuestion } from "./types";

export const gspOfficialQuestions: ReviewQuestion[] = [
  {
    id: "gsp-official-learning-map-1",
    chapter: "gsp-official-learning-map",
    level: 1,
    question: "全书导览的核心主张是什么？",
    answer:
      "本书不是现代分布式游戏后端百科，而是一条以 Win32/C++ 为时代背景的入门工程链：先建立网络与线程基本功，再进入高效通信和数据保护，最后落到数据库、大厅、GM 工具与自动更新系统。复刻时必须保留这条原书次序，同时把过时 API 与今天的安全和交付要求分栏说明。",
    tags: ["全书导览", "核心主张"],
  },
  {
    id: "gsp-official-learning-map-2",
    chapter: "gsp-official-learning-map",
    level: 2,
    question: "全书导览覆盖哪些正式目录主题？",
    answer:
      "第1章 网络编程基础、第2章 多线程、第3章 高效通信模型、第4章 网络游戏数据加密技术、第5章 网络游戏数据库技术、第6章 游戏大厅的设计与实现、第7章 GM工具的设计与实现、第8章 自动更新系统的设计与实现",
    tags: ["全书导览", "目录覆盖"],
  },
  {
    id: "gsp-official-learning-map-3",
    chapter: "gsp-official-learning-map",
    level: 2,
    question: "全书导览的六阶段证据链是什么？",
    answer:
      "锁定版本与 ISBN → 保存公开目录快照 → 映射八个正式章节 → 标注目录披露粒度 → 建立正常边界失败样本 → 完成全链签发",
    tags: ["全书导览", "证据链"],
  },
  {
    id: "gsp-official-learning-map-4",
    chapter: "gsp-official-learning-map",
    level: 3,
    question: "全书导览应主动注入什么失败？",
    answer:
      "继续沿用 TCP、协议、架构、缓存、负载均衡和反作弊的自拟十主题，导致原书的多线程、加密、大厅、GM 与自动更新章节消失。；只写章名和摘要，不提供可运行实验、边界样本、失败注入与版本映射，读者无法验证任何工程结论。",
    tags: ["全书导览", "失败注入"],
  },
  {
    id: "gsp-official-learning-map-5",
    chapter: "gsp-official-learning-map",
    level: 3,
    question: "全书导览签发时保持什么不变量？",
    answer:
      "8 个正式章节各有独立页面；公开可见的 57 个目录条目全部命中；未公开的后四章细目不会被伪装成权威目录。",
    tags: ["全书导览", "签发不变量"],
  },
  {
    id: "gsp-official-learning-map-6",
    chapter: "gsp-official-learning-map",
    level: 3,
    question: "全书导览怎样完成可复现实验？",
    answer:
      "建立一张章节追踪表：每行包含官方章名、公开分节、本站页面、交互实验、复习题和版本说明。先预测旧的十页自拟目录会遗漏哪些正式章节，再逐项检查数据库、大厅、GM 与自动更新是否回到原书结构中。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["全书导览", "复现实验"],
  },
  {
    id: "gsp-01-network-programming-foundations-1",
    chapter: "gsp-01-network-programming-foundations",
    level: 1,
    question: "第1章的核心主张是什么？",
    answer:
      "网络程序的第一条纪律是区分传输事实与业务消息。TCP 只提供有序字节流，不提供消息边界；UDP 保留数据报边界，却不保证到达和顺序。服务器必须先定义权威职责、编码规则和连接生命周期，再选择传输并实现组帧。",
    tags: ["第1章", "核心主张"],
  },
  {
    id: "gsp-01-network-programming-foundations-2",
    chapter: "gsp-01-network-programming-foundations",
    level: 2,
    question: "第1章覆盖哪些正式目录主题？",
    answer:
      "网络游戏服务器端开发概述、网络游戏类型、MMORPG服务器与客户端功能划分、网络通信协议、网络协议、OSI通信协议模型、TCP/IP协议、TCP/IP协议族、Socket编程原理、套接字、Socket通信流程、Socket函数、IP地址转换、字节转换、基本Socket通信、TCP/IP通信实现、UDP/IP通信实现",
    tags: ["第1章", "目录覆盖"],
  },
  {
    id: "gsp-01-network-programming-foundations-3",
    chapter: "gsp-01-network-programming-foundations",
    level: 2,
    question: "第1章的六阶段证据链是什么？",
    answer:
      "划分客户端与服务器权威 → 选择 TCP 或 UDP 语义 → 建立 Socket 生命周期 → 规范地址与字节序 → 实现长度帧或数据报 → 注入半包丢包并签发",
    tags: ["第1章", "证据链"],
  },
  {
    id: "gsp-01-network-programming-foundations-4",
    chapter: "gsp-01-network-programming-foundations",
    level: 3,
    question: "第1章应主动注入什么失败？",
    answer:
      "把 TCP 当作消息队列，假设一次发送等于一次接收；压力下出现半包和粘包后，解析器把下一条消息的字节当成本条正文。；直接发送含指针、填充和主机字节序的 C++ 结构体；同一程序跨编译器或跨平台后字段错位。",
    tags: ["第1章", "失败注入"],
  },
  {
    id: "gsp-01-network-programming-foundations-5",
    chapter: "gsp-01-network-programming-foundations",
    level: 3,
    question: "第1章签发时保持什么不变量？",
    answer:
      "任何分片组合都只能产生完整且有界的消息；无效长度、失效地址、重复数据报和断开连接不会污染下一条会话。",
    tags: ["第1章", "签发不变量"],
  },
  {
    id: "gsp-01-network-programming-foundations-6",
    chapter: "gsp-01-network-programming-foundations",
    level: 3,
    question: "第1章怎样完成可复现实验？",
    answer:
      "写一个最小回显服务器和测试客户端。先预测一次 send 是否必然对应一次 recv，再分别注入 1 字节分片、两个帧合并、客户端中途断开和 UDP 序号跳变；记录解析器缓冲区、期望长度和第一处拒绝原因。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第1章", "复现实验"],
  },
  {
    id: "gsp-02-multithreading-1",
    chapter: "gsp-02-multithreading",
    level: 1,
    question: "第2章的核心主张是什么？",
    answer:
      "线程提高的是并发调度能力，不会自动提高正确性。游戏服务器应先决定状态由哪个线程拥有，再选择消息传递或最小同步原语。全局变量让共享变得容易，却把竞态、可见性和死锁扩散到所有路径。",
    tags: ["第2章", "核心主张"],
  },
  {
    id: "gsp-02-multithreading-2",
    chapter: "gsp-02-multithreading",
    level: 2,
    question: "第2章覆盖哪些正式目录主题？",
    answer:
      "线程基础、进程、线程、线程的应用、Windows下的多线程处理、随机矩形、多工模拟程序、线程间的通信与同步、全局变量、事件、临界区、互斥、信号量、互锁访问、可等待定时器、线程死锁",
    tags: ["第2章", "目录覆盖"],
  },
  {
    id: "gsp-02-multithreading-3",
    chapter: "gsp-02-multithreading",
    level: 2,
    question: "第2章的六阶段证据链是什么？",
    answer:
      "列出进程线程边界 → 标记共享可变状态 → 分配唯一所有者 → 选择最小同步原语 → 注入竞态与反向锁序 → 采集队列锁等待并签发",
    tags: ["第2章", "证据链"],
  },
  {
    id: "gsp-02-multithreading-4",
    chapter: "gsp-02-multithreading",
    level: 3,
    question: "第2章应主动注入什么失败？",
    answer:
      "多个工作线程直接修改全局玩家表，只在偶发崩溃处补锁；结果同一不变量由多把锁保护，竞态无法穷举。；线程 A 持账号锁等角色锁，线程 B 持角色锁等账号锁；低负载正常，压力下永久互等。",
    tags: ["第2章", "失败注入"],
  },
  {
    id: "gsp-02-multithreading-5",
    chapter: "gsp-02-multithreading",
    level: 3,
    question: "第2章签发时保持什么不变量？",
    answer:
      "每个可变游戏状态只有一个写入所有者；关闭阶段不丢已确认命令；锁依赖图无环且队列达到上限时会施加背压。",
    tags: ["第2章", "签发不变量"],
  },
  {
    id: "gsp-02-multithreading-6",
    chapter: "gsp-02-multithreading",
    level: 3,
    question: "第2章怎样完成可复现实验？",
    answer:
      "让四个生产线程向一个逻辑线程提交玩家移动命令。先预测直接修改全局玩家表与有界队列两种方案的差异，再记录命令总数、最终状态、锁等待、队列高水位和关闭耗时。随后故意反向获取两把锁，验证看门狗能定位等待环。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第2章", "复现实验"],
  },
  {
    id: "gsp-03-efficient-communication-models-1",
    chapter: "gsp-03-efficient-communication-models",
    level: 1,
    question: "第3章的核心主张是什么？",
    answer:
      "高效 I/O 的关键不是某个 API 名称，而是把等待从每连接一线程改为事件或完成通知，并明确每个操作的生命周期。IOCP 告诉程序某次异步操作已经完成；epoll 告诉程序某个文件描述符当前就绪。两者都要求应用正确处理部分读写、取消、关闭和陈旧事件。",
    tags: ["第3章", "核心主张"],
  },
  {
    id: "gsp-03-efficient-communication-models-2",
    chapter: "gsp-03-efficient-communication-models",
    level: 2,
    question: "第3章覆盖哪些正式目录主题？",
    answer:
      "网络通信I/O模式、Socket事件、阻塞模式、非阻塞模式、选择I/O模式、异步模型、异步与同步、Windows下的异步模型、IOCP模型、IOCP工作原理、使用IOCP设计服务器、IOCP设计中的Socket错误和资源释放、IOCP与epoll机制的异同",
    tags: ["第3章", "目录覆盖"],
  },
  {
    id: "gsp-03-efficient-communication-models-3",
    chapter: "gsp-03-efficient-communication-models",
    level: 2,
    question: "第3章的六阶段证据链是什么？",
    answer:
      "定义连接状态机 → 选择阻塞就绪或完成语义 → 提交读写并绑定代际 → 处理部分完成和背压 → 取消关闭并排空完成 → 注入陈旧事件后签发",
    tags: ["第3章", "证据链"],
  },
  {
    id: "gsp-03-efficient-communication-models-4",
    chapter: "gsp-03-efficient-communication-models",
    level: 3,
    question: "第3章应主动注入什么失败？",
    answer:
      "关闭 Socket 后立即释放连接对象，但完成队列里仍有指向旧对象的事件；内存复用后陈旧完成修改了新连接。；只追求每秒消息数，发送队列无上限；慢客户端把内存推高，最终拖垮所有正常会话。",
    tags: ["第3章", "失败注入"],
  },
  {
    id: "gsp-03-efficient-communication-models-5",
    chapter: "gsp-03-efficient-communication-models",
    level: 3,
    question: "第3章签发时保持什么不变量？",
    answer:
      "一个异步操作只完成一次；连接关闭后同代际事件全部排空；陈旧完成不能访问复用后的连接对象；发送队列超过预算时会暂停读取或拒绝请求。",
    tags: ["第3章", "签发不变量"],
  },
  {
    id: "gsp-03-efficient-communication-models-6",
    chapter: "gsp-03-efficient-communication-models",
    level: 3,
    question: "第3章怎样完成可复现实验？",
    answer:
      "在固定客户端脚本下分别运行每连接线程、select 和完成队列模型。先预测吞吐最高的模型，再同时记录 p50/p99 延迟、线程数、上下文切换、发送队列和关闭后的陈旧完成数；只有状态机一致时才比较性能。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第3章", "复现实验"],
  },
  {
    id: "gsp-04-game-data-encryption-1",
    chapter: "gsp-04-game-data-encryption",
    level: 1,
    question: "第4章的核心主张是什么？",
    answer:
      "加密不是把字节变得不可读，而是针对明确攻击者保护机密性、完整性与身份。算法可以公开，安全性必须依赖受控密钥；网络游戏还要处理重放、降级、密钥泄露和客户端不可信。2007 年常见算法的历史背景应保留，但新实现必须采用经过审查的认证协议。",
    tags: ["第4章", "核心主张"],
  },
  {
    id: "gsp-04-game-data-encryption-2",
    chapter: "gsp-04-game-data-encryption",
    level: 2,
    question: "第4章覆盖哪些正式目录主题？",
    answer:
      "密码学基本概念、密码学、发送者与接收者、消息和加密、算法和密钥、算法的安全性、常用密码算法",
    tags: ["第4章", "目录覆盖"],
  },
  {
    id: "gsp-04-game-data-encryption-3",
    chapter: "gsp-04-game-data-encryption",
    level: 2,
    question: "第4章的六阶段证据链是什么？",
    answer:
      "列出资产攻击者与后果 → 选择标准认证协议 → 建立会话密钥 → 绑定序号方向和上下文 → 验证后解析并轮换 → 注入篡改重放后签发",
    tags: ["第4章", "证据链"],
  },
  {
    id: "gsp-04-game-data-encryption-4",
    chapter: "gsp-04-game-data-encryption",
    level: 3,
    question: "第4章应主动注入什么失败？",
    answer:
      "自制异或或固定替换表，只让抓包内容看起来混乱，却没有完整性、密钥管理和抗分析能力。；先解析密文中的长度和类型再校验认证标签，攻击者可利用解析器差异消耗资源或触发漏洞。",
    tags: ["第4章", "失败注入"],
  },
  {
    id: "gsp-04-game-data-encryption-5",
    chapter: "gsp-04-game-data-encryption",
    level: 3,
    question: "第4章签发时保持什么不变量？",
    answer:
      "未经认证的数据永不进入反序列化和业务层；同一会话的序号不能被重复接受；密钥不会出现在日志、客户端常量或崩溃报告中。",
    tags: ["第4章", "签发不变量"],
  },
  {
    id: "gsp-04-game-data-encryption-6",
    chapter: "gsp-04-game-data-encryption",
    level: 3,
    question: "第4章怎样完成可复现实验？",
    answer:
      "固定一条登录消息，先预测加密后任意改动是否一定能被发现。分别翻转密文字节、标签字节、序号、会话标识和协议版本，再重放原包；保存验证顺序和拒绝原因，确认任何失败都不会进入业务解析。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第4章", "复现实验"],
  },
  {
    id: "gsp-05-game-database-1",
    chapter: "gsp-05-game-database",
    level: 1,
    question: "第5章的核心主张是什么？",
    answer:
      "数据库的职责不是替内存世界状态完成每一帧计算，而是让关键结果在崩溃、重试和并发修改后仍可恢复。设计要从业务不变量和事务边界开始，再决定表、索引、批量写回和缓存；先选数据库产品再拼业务通常会留下重复发奖和部分提交。",
    tags: ["第5章", "核心主张"],
  },
  {
    id: "gsp-05-game-database-2",
    chapter: "gsp-05-game-database",
    level: 2,
    question: "第5章覆盖哪些正式目录主题？",
    answer: "网络游戏数据库技术",
    tags: ["第5章", "目录覆盖"],
  },
  {
    id: "gsp-05-game-database-3",
    chapter: "gsp-05-game-database",
    level: 2,
    question: "第5章的六阶段证据链是什么？",
    answer:
      "声明账号角色经济不变量 → 设计键约束和索引 → 划分事务与幂等边界 → 处理并发版本冲突 → 批量持久化并观测 → 断电恢复后签发",
    tags: ["第5章", "证据链"],
  },
  {
    id: "gsp-05-game-database-4",
    chapter: "gsp-05-game-database",
    level: 3,
    question: "第5章应主动注入什么失败？",
    answer:
      "先扣货币再异步发物品，中间崩溃后玩家扣款却没有收到物品；重试又可能重复扣款。；服务器每隔一段时间无条件覆盖整行角色数据，两个节点并发保存时后者悄悄抹掉前者修改。",
    tags: ["第5章", "失败注入"],
  },
  {
    id: "gsp-05-game-database-5",
    chapter: "gsp-05-game-database",
    level: 3,
    question: "第5章签发时保持什么不变量？",
    answer:
      "同一业务请求至多产生一次可见结果；事务失败不留下半成品；并发写入不会静默覆盖；从最近有效备份和日志可以恢复到校验一致状态。",
    tags: ["第5章", "签发不变量"],
  },
  {
    id: "gsp-05-game-database-6",
    chapter: "gsp-05-game-database",
    level: 3,
    question: "第5章怎样完成可复现实验？",
    answer:
      "并发提交两次相同购买请求和两次不同角色保存。先预测数据库最终行数与余额，再在提交前、扣款后和事件发布前注入崩溃；重启后检查幂等键、版本号、审计记录和恢复点是否共同保持不变量。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第5章", "复现实验"],
  },
  {
    id: "gsp-06-game-lobby-1",
    chapter: "gsp-06-game-lobby",
    level: 1,
    question: "第6章的核心主张是什么？",
    answer:
      "大厅位于账号服务、游戏房间与客户端之间，它不是一个页面列表，而是玩家从认证到进入对局的状态协调器。可靠实现必须让会话身份、房间版本、席位预留和进入游戏形成可回放状态机，并在超时、重复点击和房间崩溃时收敛。",
    tags: ["第6章", "核心主张"],
  },
  {
    id: "gsp-06-game-lobby-2",
    chapter: "gsp-06-game-lobby",
    level: 2,
    question: "第6章覆盖哪些正式目录主题？",
    answer: "游戏大厅的设计与实现",
    tags: ["第6章", "目录覆盖"],
  },
  {
    id: "gsp-06-game-lobby-3",
    chapter: "gsp-06-game-lobby",
    level: 2,
    question: "第6章的六阶段证据链是什么？",
    answer:
      "认证并创建会话代际 → 加载版本化大厅快照 → 创建或匹配席位 → 签发一次性入房令牌 → 确认游戏服接管 → 超时重连与崩溃复验",
    tags: ["第6章", "证据链"],
  },
  {
    id: "gsp-06-game-lobby-4",
    chapter: "gsp-06-game-lobby",
    level: 3,
    question: "第6章应主动注入什么失败？",
    answer:
      "匹配成功后直接把房间地址返回客户端，没有预留和确认；两个并发请求占用两个席位并进入不同房间。；断线事件只按 playerId 清理在线状态；旧连接晚到的断开通知把刚重连的新会话踢下线。",
    tags: ["第6章", "失败注入"],
  },
  {
    id: "gsp-06-game-lobby-5",
    chapter: "gsp-06-game-lobby",
    level: 3,
    question: "第6章签发时保持什么不变量？",
    answer:
      "同一玩家同一时刻最多拥有一个有效大厅会话和一个对局归属；一次性令牌只被消费一次；超时席位必然释放；旧代际断开不会清除新会话。",
    tags: ["第6章", "签发不变量"],
  },
  {
    id: "gsp-06-game-lobby-6",
    chapter: "gsp-06-game-lobby",
    level: 3,
    question: "第6章怎样完成可复现实验？",
    answer:
      "让同一玩家快速双击匹配，并在席位预留后断开网络。先预测大厅会产生几个席位，再延迟游戏服确认、重放旧令牌并模拟房间进程退出；检查玩家最终只能处于空闲、已预留或对局中一个状态。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第6章", "复现实验"],
  },
  {
    id: "gsp-07-gm-tool-1",
    chapter: "gsp-07-gm-tool",
    level: 1,
    question: "第7章的核心主张是什么？",
    answer:
      "GM 工具是生产系统的高权限控制面，不是绕过业务规则的数据库编辑器。每项命令都要明确操作者、目标、原因、权限、预览、幂等键和补偿方案；越高风险的操作越需要审批、速率限制和不可篡改审计。",
    tags: ["第7章", "核心主张"],
  },
  {
    id: "gsp-07-gm-tool-2",
    chapter: "gsp-07-gm-tool",
    level: 2,
    question: "第7章覆盖哪些正式目录主题？",
    answer: "GM工具的设计与实现",
    tags: ["第7章", "目录覆盖"],
  },
  {
    id: "gsp-07-gm-tool-3",
    chapter: "gsp-07-gm-tool",
    level: 2,
    question: "第7章的六阶段证据链是什么？",
    answer:
      "认证操作者和设备 → 授权命令与目标作用域 → 校验参数并生成预览 → 高风险命令获得审批 → 幂等执行并记录结果 → 补偿演练与审计签发",
    tags: ["第7章", "证据链"],
  },
  {
    id: "gsp-07-gm-tool-4",
    chapter: "gsp-07-gm-tool",
    level: 3,
    question: "第7章应主动注入什么失败？",
    answer:
      "GM 前端直接连接生产数据库并允许任意 SQL；任何输入错误、凭据泄露或误点击都能绕过游戏不变量。；执行成功但响应超时，操作员再次点击导致重复发奖；审计只记页面按钮，没有稳定命令 ID 和业务结果。",
    tags: ["第7章", "失败注入"],
  },
  {
    id: "gsp-07-gm-tool-5",
    chapter: "gsp-07-gm-tool",
    level: 3,
    question: "第7章签发时保持什么不变量？",
    answer:
      "没有通过认证、授权、校验和必要审批的命令绝不执行；重复命令返回同一结果；每次状态变化都能追溯到操作者、原因和补偿引用。",
    tags: ["第7章", "签发不变量"],
  },
  {
    id: "gsp-07-gm-tool-6",
    chapter: "gsp-07-gm-tool",
    level: 3,
    question: "第7章怎样完成可复现实验？",
    answer:
      "对补发道具命令发送正常、越权、超量、重复和审批过期五组请求。先预测哪些请求能进入执行器，再故意让执行响应丢失并重试；核对玩家物品、命令状态和审计链是否只产生一次可见结果。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第7章", "复现实验"],
  },
  {
    id: "gsp-08-auto-update-1",
    chapter: "gsp-08-auto-update",
    level: 1,
    question: "第8章的核心主张是什么？",
    answer:
      "自动更新系统交付的是可信版本状态，而不是一组下载链接。客户端必须先验证签名清单，再按哈希下载和校验文件，最后在兼容检查通过后原子切换；断电、磁盘不足、CDN 陈旧和中间人篡改都不能让半成品成为当前版本。",
    tags: ["第8章", "核心主张"],
  },
  {
    id: "gsp-08-auto-update-2",
    chapter: "gsp-08-auto-update",
    level: 2,
    question: "第8章覆盖哪些正式目录主题？",
    answer: "自动更新系统的设计与实现",
    tags: ["第8章", "目录覆盖"],
  },
  {
    id: "gsp-08-auto-update-3",
    chapter: "gsp-08-auto-update",
    level: 2,
    question: "第8章的六阶段证据链是什么？",
    answer:
      "发布并签名版本清单 → 验证版本和兼容范围 → 分块下载到临时目录 → 逐文件校验哈希 → 原子激活并健康检查 → 断电篡改回滚后签发",
    tags: ["第8章", "证据链"],
  },
  {
    id: "gsp-08-auto-update-4",
    chapter: "gsp-08-auto-update",
    level: 3,
    question: "第8章应主动注入什么失败？",
    answer:
      "启动器边下载边覆盖当前目录；更新中断后新旧文件混杂，客户端既不能启动也没有可回滚版本。；只使用未签名的文件哈希；攻击者同时替换文件和清单即可让恶意内容通过校验。",
    tags: ["第8章", "失败注入"],
  },
  {
    id: "gsp-08-auto-update-5",
    chapter: "gsp-08-auto-update",
    level: 3,
    question: "第8章签发时保持什么不变量？",
    answer:
      "只有签名可信且所有文件哈希匹配的完整版本才能激活；任意中断都不改变当前良好版本；回滚不依赖重新下载。",
    tags: ["第8章", "签发不变量"],
  },
  {
    id: "gsp-08-auto-update-6",
    chapter: "gsp-08-auto-update",
    level: 3,
    question: "第8章怎样完成可复现实验？",
    answer:
      "准备两个小版本，先预测下载到 60% 时断电后的当前版本。随后注入分块损坏、清单签名错误、磁盘空间不足、CDN 返回旧文件和新版本启动失败；检查重启后只会继续临时下载或回到上一版本。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["第8章", "复现实验"],
  },
  {
    id: "gsp-official-final-review-1",
    chapter: "gsp-official-final-review",
    level: 1,
    question: "总复习的核心主张是什么？",
    answer:
      "全书的最终产物不是八个孤立示例，而是一条可追踪的玩家旅程：客户端连接并组帧，线程和 I/O 模型调度消息，加密边界拒绝不可信输入，数据库保存权威结果，大厅协调入局，GM 控制运营变更，更新系统交付兼容客户端。任何局部成功都不能替代端到端不变量。",
    tags: ["总复习", "核心主张"],
  },
  {
    id: "gsp-official-final-review-2",
    chapter: "gsp-official-final-review",
    level: 2,
    question: "总复习覆盖哪些正式目录主题？",
    answer:
      "网络编程基础、多线程、高效通信模型、网络游戏数据加密技术、网络游戏数据库技术、游戏大厅的设计与实现、GM工具的设计与实现、自动更新系统的设计与实现",
    tags: ["总复习", "目录覆盖"],
  },
  {
    id: "gsp-official-final-review-3",
    chapter: "gsp-official-final-review",
    level: 2,
    question: "总复习的六阶段证据链是什么？",
    answer:
      "锁定同一测试版本 → 回放连接与调度轨迹 → 注入篡改重放竞态 → 验证事务大厅幂等 → 演练 GM 补偿与更新回滚 → 归档指标日志并签发",
    tags: ["总复习", "证据链"],
  },
  {
    id: "gsp-official-final-review-4",
    chapter: "gsp-official-final-review",
    level: 3,
    question: "总复习应主动注入什么失败？",
    answer:
      "八章分别演示成功，但没有统一会话 ID、请求 ID 和运行编号；跨层故障发生时无法证明哪个状态先偏离。；只验证最终页面和平均吞吐，没有重放、冲突、关闭、恢复和回滚演练；系统在理想路径上通过却不能交付。",
    tags: ["总复习", "失败注入"],
  },
  {
    id: "gsp-official-final-review-5",
    chapter: "gsp-official-final-review",
    level: 3,
    question: "总复习签发时保持什么不变量？",
    answer:
      "所有官方章节都有可回放正常、边界和失败样本；每个故障在越过所属边界前被拒绝或补偿；日志、指标、数据库和版本清单使用同一运行编号。",
    tags: ["总复习", "签发不变量"],
  },
  {
    id: "gsp-official-final-review-6",
    chapter: "gsp-official-final-review",
    level: 3,
    question: "总复习怎样完成可复现实验？",
    answer:
      "运行一条从登录到入房再到补发和更新的脚本。先预测故障最早会在哪一层暴露，然后依次注入 TCP 半包、旧连接完成、认证标签错误、重复购买、重复匹配、GM 响应丢失和更新断电；每次只允许一个首偏离节点。 保存版本、样本、首偏离节点、恢复动作和最终决策。",
    tags: ["总复习", "复现实验"],
  },
];
