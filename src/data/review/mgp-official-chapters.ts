import type { ReviewQuestion } from "./types";

export const mgpOfficialQuestions: ReviewQuestion[] = [
  {
    "id": "mgp-official-learning-map-1",
    "chapter": "mgp-official-learning-map",
    "level": 1,
    "question": "《Multiplayer Game Programming》权威学习地图的核心主张是什么？",
    "answer": "沿互联网与套接字、序列化与复制、实时质量、伸缩安全和平台托管，贯通13章与附录A。",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "核心机制"
    ]
  },
  {
    "id": "mgp-official-learning-map-2",
    "chapter": "mgp-official-learning-map",
    "level": 2,
    "question": "《Multiplayer Game Programming》权威学习地图覆盖哪些正式目录主题？",
    "answer": "第1章 网络游戏概览（Overview of Networked Games）、第2章 互联网（The Internet）、第3章 Berkeley套接字（Berkeley Sockets）、第4章 对象序列化（Object Serialization）、第5章 对象复制（Object Replication）、第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）、第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）、第8章 改进延迟处理（Improved Latency Handling）、第9章 可伸缩性（Scalability）、第10章 安全（Security）、第11章 真实世界引擎（Real-World Engines）、第12章 玩家服务（Gamer Services）、第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）、附录A 现代C++入门（A Modern C++ Primer）",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-official-learning-map-3",
    "chapter": "mgp-official-learning-map",
    "level": 2,
    "question": "《Multiplayer Game Programming》权威学习地图的六阶段证据链是什么？",
    "answer": "锁定官方目录 → 建立互联网端点 → 序列化并复制对象 → 处理延迟可靠性 → 伸缩与安全 → 接入服务并托管",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "机制链"
    ]
  },
  {
    "id": "mgp-official-learning-map-4",
    "chapter": "mgp-official-learning-map",
    "level": 3,
    "question": "《Multiplayer Game Programming》权威学习地图应主动注入哪两类失败？",
    "answer": "沿用旧版10页专题结构，把NAT穿透、可靠UDP和流控误当作本书正式章名。；只记录13个章名，丢失附录A与112个公开目录条目的逐项追踪。",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "故障注入"
    ]
  },
  {
    "id": "mgp-official-learning-map-5",
    "chapter": "mgp-official-learning-map",
    "level": 3,
    "question": "《Multiplayer Game Programming》权威学习地图签发时保持什么不变量？",
    "answer": "13章和附录A各有独立页面；112个公开目录条目全部可追踪；现代补充不冒充原书目录。",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "工程验收"
    ]
  },
  {
    "id": "mgp-official-learning-map-6",
    "chapter": "mgp-official-learning-map",
    "level": 3,
    "question": "《Multiplayer Game Programming》权威学习地图怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "《Multiplayer Game Programming》权威学习地图",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-1",
    "chapter": "mgp-01-overview-networked-games",
    "level": 1,
    "question": "第1章 网络游戏概览（Overview of Networked Games）的核心主张是什么？",
    "answer": "网络游戏架构不是从套接字开始，而是从共享体验、权威归属和可接受延迟的历史约束开始。",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-2",
    "chapter": "mgp-01-overview-networked-games",
    "level": 2,
    "question": "第1章 网络游戏概览（Overview of Networked Games）覆盖哪些正式目录主题？",
    "answer": "A Brief History of Multiplayer Games、Starsiege: Tribes、Age of Empires、Summary、Review Questions、Additional Readings",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-3",
    "chapter": "mgp-01-overview-networked-games",
    "level": 2,
    "question": "第1章 网络游戏概览（Overview of Networked Games）的六阶段证据链是什么？",
    "answer": "确定共享体验 → 识别状态权威 → 比较Tribes模块 → 分析帝国时代锁步 → 选定网络模型 → 用样本签发",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "机制链"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-4",
    "chapter": "mgp-01-overview-networked-games",
    "level": 3,
    "question": "第1章 网络游戏概览（Overview of Networked Games）应主动注入哪两类失败？",
    "answer": "把网络游戏史当作背景材料，跳过每个案例背后的状态权威与带宽取舍。；只看到锁步节省带宽，却没有验证确定性、迟到命令和掉线玩家的处理。",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-5",
    "chapter": "mgp-01-overview-networked-games",
    "level": 3,
    "question": "第1章 网络游戏概览（Overview of Networked Games）签发时保持什么不变量？",
    "answer": "网络模型由玩法约束推导；每条消息只有一个进入模拟的受控边界；相同输入能复现相同世界摘要。",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-01-overview-networked-games-6",
    "chapter": "mgp-01-overview-networked-games",
    "level": 3,
    "question": "第1章 网络游戏概览（Overview of Networked Games）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第1章 网络游戏概览（Overview of Networked Games）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-02-internet-1",
    "chapter": "mgp-02-internet",
    "level": 1,
    "question": "第2章 互联网（The Internet）的核心主张是什么？",
    "answer": "端到端游戏消息会逐层封装、路由和复用，NAT 又改变可达性；排障必须定位到具体层和具体地址映射。",
    "tags": [
      "第2章 互联网（The Internet）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-02-internet-2",
    "chapter": "mgp-02-internet",
    "level": 2,
    "question": "第2章 互联网（The Internet）覆盖哪些正式目录主题？",
    "answer": "Origins: Packet Switching、The TCP/IP Layer Cake、The Physical Layer、The Link Layer、The Network Layer、The Transport Layer、The Application Layer、NAT、Summary、Review Questions、Additional Readings",
    "tags": [
      "第2章 互联网（The Internet）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-02-internet-3",
    "chapter": "mgp-02-internet",
    "level": 2,
    "question": "第2章 互联网（The Internet）的六阶段证据链是什么？",
    "answer": "应用形成消息 → 传输层分段 → 网络层寻址 → 链路逐跳交付 → NAT改写映射 → 端点解封装验证",
    "tags": [
      "第2章 互联网（The Internet）",
      "机制链"
    ]
  },
  {
    "id": "mgp-02-internet-4",
    "chapter": "mgp-02-internet",
    "level": 3,
    "question": "第2章 互联网（The Internet）应主动注入哪两类失败？",
    "answer": "把TCP/IP各层画成名词堆叠，却无法指出一次游戏包在每层新增和消费了什么信息。；只在同一局域网验证连接，忽略NAT映射寿命、过滤策略和中继回退。",
    "tags": [
      "第2章 互联网（The Internet）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-02-internet-5",
    "chapter": "mgp-02-internet",
    "level": 3,
    "question": "第2章 互联网（The Internet）签发时保持什么不变量？",
    "answer": "每个故障都能定位到一层责任；地址与端口映射有证据；消息过期与重复策略不依赖理想网络。",
    "tags": [
      "第2章 互联网（The Internet）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-02-internet-6",
    "chapter": "mgp-02-internet",
    "level": 3,
    "question": "第2章 互联网（The Internet）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第2章 互联网（The Internet）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-1",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 1,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）的核心主张是什么？",
    "answer": "套接字API是有生命周期和错误语义的状态机；正确性取决于地址、部分收发、阻塞策略和资源释放。",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-2",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 2,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）覆盖哪些正式目录主题？",
    "answer": "Creating Sockets、API Operating System Differences、Socket Address、UDP Sockets、TCP Sockets、Blocking and Non-Blocking I/O、Additional Socket Options、Summary、Review Questions、Additional Readings",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-3",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 2,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）的六阶段证据链是什么？",
    "answer": "初始化平台API → 创建套接字 → 绑定或连接地址 → 循环处理部分I/O → 解释错误与就绪 → 关闭并回收资源",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "机制链"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-4",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 3,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）应主动注入哪两类失败？",
    "answer": "假设一次send或recv会处理完整消息，导致分片、粘连或短写时状态错位。；把暂时不可读和永久错误合并处理，形成忙轮询、误断线或重复关闭。",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-5",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 3,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）签发时保持什么不变量？",
    "answer": "消息边界由协议而非调用次数定义；每个句柄只有一个生命周期所有者；平台差异不泄漏到游戏逻辑。",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-03-berkeley-sockets-6",
    "chapter": "mgp-03-berkeley-sockets",
    "level": 3,
    "question": "第3章 Berkeley套接字（Berkeley Sockets）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第3章 Berkeley套接字（Berkeley Sockets）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-04-object-serialization-1",
    "chapter": "mgp-04-object-serialization",
    "level": 1,
    "question": "第4章 对象序列化（Object Serialization）的核心主张是什么？",
    "answer": "序列化是跨进程数据契约，不是内存复制；字段表示、引用身份、压缩和版本演进必须一起设计。",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-04-object-serialization-2",
    "chapter": "mgp-04-object-serialization",
    "level": 2,
    "question": "第4章 对象序列化（Object Serialization）覆盖哪些正式目录主题？",
    "answer": "The Need for Serialization、Streams、Referenced Data、Compression、Maintainability、Summary、Review Questions、Additional Readings",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-04-object-serialization-3",
    "chapter": "mgp-04-object-serialization",
    "level": 2,
    "question": "第4章 对象序列化（Object Serialization）的六阶段证据链是什么？",
    "answer": "定义逻辑模式 → 选择字节与位序 → 编码标量字段 → 解析引用身份 → 量化压缩 → 跨版本往返验证",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "机制链"
    ]
  },
  {
    "id": "mgp-04-object-serialization-4",
    "chapter": "mgp-04-object-serialization",
    "level": 3,
    "question": "第4章 对象序列化（Object Serialization）应主动注入哪两类失败？",
    "answer": "直接发送结构体内存，忽略填充、字节序、指针和编译器布局。；只测当前版本往返成功，没有测试旧读新、新读旧和畸形长度拒绝。",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-04-object-serialization-5",
    "chapter": "mgp-04-object-serialization",
    "level": 3,
    "question": "第4章 对象序列化（Object Serialization）签发时保持什么不变量？",
    "answer": "线上格式独立于内存布局；引用由稳定ID解析；压缩误差与版本兼容都在契约内。",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-04-object-serialization-6",
    "chapter": "mgp-04-object-serialization",
    "level": 3,
    "question": "第4章 对象序列化（Object Serialization）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第4章 对象序列化（Object Serialization）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-05-object-replication-1",
    "chapter": "mgp-05-object-replication",
    "level": 1,
    "question": "第5章 对象复制（Object Replication）的核心主张是什么？",
    "answer": "复制系统要把对象创建、状态更新、RPC和销毁绑定到统一网络身份与权威顺序。",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-05-object-replication-2",
    "chapter": "mgp-05-object-replication",
    "level": 2,
    "question": "第5章 对象复制（Object Replication）覆盖哪些正式目录主题？",
    "answer": "The State of the World、Replicating an Object、Naïve World State Replication、Changes in World State、RPCs as Serialized Objects、Custom Solutions、Summary、Review Questions、Additional Readings",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-05-object-replication-3",
    "chapter": "mgp-05-object-replication",
    "level": 2,
    "question": "第5章 对象复制（Object Replication）的六阶段证据链是什么？",
    "answer": "分配网络ID → 发送创建描述 → 建立远端代理 → 传播脏字段 → 排序RPC → 确认销毁与回收",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "机制链"
    ]
  },
  {
    "id": "mgp-05-object-replication-4",
    "chapter": "mgp-05-object-replication",
    "level": 3,
    "question": "第5章 对象复制（Object Replication）应主动注入哪两类失败？",
    "answer": "优化掉全量基线后，只能看到局部更新，无法证明丢包后重新收敛。；让状态更新和一次性RPC共享相同队列与重试语义，造成队头阻塞或重复副作用。",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-05-object-replication-5",
    "chapter": "mgp-05-object-replication",
    "level": 3,
    "question": "第5章 对象复制（Object Replication）签发时保持什么不变量？",
    "answer": "网络ID在生命周期内唯一；创建先于更新、销毁终止后续消息；状态与事件使用符合语义的交付策略。",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-05-object-replication-6",
    "chapter": "mgp-05-object-replication",
    "level": 3,
    "question": "第5章 对象复制（Object Replication）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第5章 对象复制（Object Replication）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-06-network-topologies-1",
    "chapter": "mgp-06-network-topologies",
    "level": 1,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）的核心主张是什么？",
    "answer": "客户端—服务器与点对点的差异，本质是权威、信任、可用性和带宽责任如何分配。",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-06-network-topologies-2",
    "chapter": "mgp-06-network-topologies",
    "level": 2,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）覆盖哪些正式目录主题？",
    "answer": "Network Topologies、Implementing Client-Server、Implementing Peer-to-Peer、Summary、Review Questions、Additional Reading",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-06-network-topologies-3",
    "chapter": "mgp-06-network-topologies",
    "level": 2,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）的六阶段证据链是什么？",
    "answer": "量化玩法约束 → 选择权威位置 → 实现客户端—服务器 → 实现点对点 → 注入主机离开 → 比较证据签发",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "机制链"
    ]
  },
  {
    "id": "mgp-06-network-topologies-4",
    "chapter": "mgp-06-network-topologies",
    "level": 3,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）应主动注入哪两类失败？",
    "answer": "只比较连接数量，不比较权威、作弊、NAT、托管成本和故障接管。；主机迁移只切换新地址，没有同步最后确认帧、会话密钥与对象所有权。",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-06-network-topologies-5",
    "chapter": "mgp-06-network-topologies",
    "level": 3,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）签发时保持什么不变量？",
    "answer": "拓扑中的每份状态有唯一裁决责任；客户端意图经过验证；节点离开后所有参与者收敛到同一成员与世界版本。",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-06-network-topologies-6",
    "chapter": "mgp-06-network-topologies",
    "level": 3,
    "question": "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-1",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 1,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）的核心主张是什么？",
    "answer": "实时网络质量由延迟分布、到达间隔变化、丢包和消息语义共同决定，不能用平均ping或全量可靠传输替代设计。",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-2",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 2,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）覆盖哪些正式目录主题？",
    "answer": "Latency、Jitter、Packet Loss、Reliability: TCP or UDP?、Packet Delivery Notification、Object Replication Reliability、Simulating Real-World Conditions、Summary、Review Questions、Additional Readings",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-3",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 2,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）的六阶段证据链是什么？",
    "answer": "记录单向时序 → 计算延迟分布 → 测量到达抖动 → 跟踪序号缺口 → 选择消息可靠性 → 仿真并重放签发",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "机制链"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-4",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 3,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）应主动注入哪两类失败？",
    "answer": "只看平均ping，漏掉P99、抖动、连续丢包和方向不对称。；把所有UDP消息可靠化，导致过期快照排队并形成应用层队头阻塞。",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-5",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 3,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）签发时保持什么不变量？",
    "answer": "质量以分布和序号证据衡量；每类消息有明确过期与重传语义；仿真故障可由固定种子重放。",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-07-latency-jitter-reliability-6",
    "chapter": "mgp-07-latency-jitter-reliability",
    "level": 3,
    "question": "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-1",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 1,
    "question": "第8章 改进延迟处理（Improved Latency Handling）的核心主张是什么？",
    "answer": "插值、客户端预测、服务器校正和回滚分别解决不同观察者的时间问题，组合时必须保留权威历史和输入序号。",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-2",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 2,
    "question": "第8章 改进延迟处理（Improved Latency Handling）覆盖哪些正式目录主题？",
    "answer": "The Dumb Terminal Client、Client Side Interpolation、Client Side Prediction、Server Side Rewind、Summary、Review Questions、Additional Readings",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-3",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 2,
    "question": "第8章 改进延迟处理（Improved Latency Handling）的六阶段证据链是什么？",
    "answer": "保存输入序号 → 本地预测自身 → 缓存远端快照 → 插值显示远端 → 权威基线校正 → 历史回滚裁决",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "机制链"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-4",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 3,
    "question": "第8章 改进延迟处理（Improved Latency Handling）应主动注入哪两类失败？",
    "answer": "对本地和远端对象统一使用插值缓冲，让自己的操作也平白增加延迟。；服务器无限信任客户端时间并无限回滚，使高延迟或伪造时间戳获得不公平命中。",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-5",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 3,
    "question": "第8章 改进延迟处理（Improved Latency Handling）签发时保持什么不变量？",
    "answer": "服务器始终裁决事实；输入序号使校正可重放；插值与回滚历史有明确时间窗口和内存上限。",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-08-improved-latency-handling-6",
    "chapter": "mgp-08-improved-latency-handling",
    "level": 3,
    "question": "第8章 改进延迟处理（Improved Latency Handling）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第8章 改进延迟处理（Improved Latency Handling）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-09-scalability-1",
    "chapter": "mgp-09-scalability",
    "level": 1,
    "question": "第9章 可伸缩性（Scalability）的核心主张是什么？",
    "answer": "伸缩首先靠减少每个玩家必须看到和必须更新的工作，再考虑分区与实例扩展机器数量。",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-09-scalability-2",
    "chapter": "mgp-09-scalability",
    "level": 2,
    "question": "第9章 可伸缩性（Scalability）覆盖哪些正式目录主题？",
    "answer": "Object Scope and Relevancy、Server Partitioning、Instancing、Prioritization and Frequency、Summary、Review Questions、Additional Readings",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-09-scalability-3",
    "chapter": "mgp-09-scalability",
    "level": 2,
    "question": "第9章 可伸缩性（Scalability）的六阶段证据链是什么？",
    "answer": "测量每连接成本 → 裁剪对象作用域 → 计算动态相关性 → 分配优先级频率 → 划分世界或实例 → 压测迁移签发",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "机制链"
    ]
  },
  {
    "id": "mgp-09-scalability-4",
    "chapter": "mgp-09-scalability",
    "level": 3,
    "question": "第9章 可伸缩性（Scalability）应主动注入哪两类失败？",
    "answer": "在全量广播模型上直接增加服务器，保留了玩家数乘对象数的根本成本。；跨分区迁移没有所有权令牌，短暂双写或无人负责造成状态复制与丢失。",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-09-scalability-5",
    "chapter": "mgp-09-scalability",
    "level": 3,
    "question": "第9章 可伸缩性（Scalability）签发时保持什么不变量？",
    "answer": "相关性裁剪不漏关键玩法事件；预算调度不永久饥饿；跨区任一时刻只有一个权威所有者。",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-09-scalability-6",
    "chapter": "mgp-09-scalability",
    "level": 3,
    "question": "第9章 可伸缩性（Scalability）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第9章 可伸缩性（Scalability）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-10-security-1",
    "chapter": "mgp-10-security",
    "level": 1,
    "question": "第10章 安全（Security）的核心主张是什么？",
    "answer": "客户端和网络都处于不可信边界；安全依赖最小信息暴露、严格输入验证、服务端裁决和纵深防护。",
    "tags": [
      "第10章 安全（Security）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-10-security-2",
    "chapter": "mgp-10-security",
    "level": 2,
    "question": "第10章 安全（Security）覆盖哪些正式目录主题？",
    "answer": "Packet Sniffing、Input Validation、Software Cheat Detection、Securing the Server、Summary、Review Questions、Additional Readings",
    "tags": [
      "第10章 安全（Security）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-10-security-3",
    "chapter": "mgp-10-security",
    "level": 2,
    "question": "第10章 安全（Security）的六阶段证据链是什么？",
    "answer": "枚举可见资产 → 最小化封包信息 → 验证每个输入 → 权威计算结果 → 关联作弊证据 → 加固监控与响应",
    "tags": [
      "第10章 安全（Security）",
      "机制链"
    ]
  },
  {
    "id": "mgp-10-security-4",
    "chapter": "mgp-10-security",
    "level": 3,
    "question": "第10章 安全（Security）应主动注入哪两类失败？",
    "answer": "认为协议未公开或流量已加密就能信任客户端提交的位置、伤害和时间。；检测到异常后只封禁，不保存可解释证据、误报回滚和攻击面修复记录。",
    "tags": [
      "第10章 安全（Security）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-10-security-5",
    "chapter": "mgp-10-security",
    "level": 3,
    "question": "第10章 安全（Security）签发时保持什么不变量？",
    "answer": "不可信输入在改变状态前被验证；关键结果由服务端计算；检测证据可解释、限量并能驱动处置。",
    "tags": [
      "第10章 安全（Security）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-10-security-6",
    "chapter": "mgp-10-security",
    "level": 3,
    "question": "第10章 安全（Security）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第10章 安全（Security）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-1",
    "chapter": "mgp-11-real-world-engines",
    "level": 1,
    "question": "第11章 真实世界引擎（Real-World Engines）的核心主张是什么？",
    "answer": "引擎网络API封装了复制与RPC，但不会替开发者决定权威、所有权、相关性和失败语义。",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-2",
    "chapter": "mgp-11-real-world-engines",
    "level": 2,
    "question": "第11章 真实世界引擎（Real-World Engines）覆盖哪些正式目录主题？",
    "answer": "Unreal Engine 4、Unity、Summary、Review Questions、Additional Readings",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-3",
    "chapter": "mgp-11-real-world-engines",
    "level": 2,
    "question": "第11章 真实世界引擎（Real-World Engines）的六阶段证据链是什么？",
    "answer": "定义引擎无关不变量 → 映射对象生命周期 → 配置属性复制 → 约束RPC方向 → 接入相关性 → 跨引擎样本对照",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "机制链"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-4",
    "chapter": "mgp-11-real-world-engines",
    "level": 3,
    "question": "第11章 真实世界引擎（Real-World Engines）应主动注入哪两类失败？",
    "answer": "把属性勾选为复制后就假设权威、所有权和迟到加入都自动正确。；只在编辑器单机多窗口测试，漏掉独立进程、网络故障和引擎版本差异。",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-5",
    "chapter": "mgp-11-real-world-engines",
    "level": 3,
    "question": "第11章 真实世界引擎（Real-World Engines）签发时保持什么不变量？",
    "answer": "产品网络语义先于引擎API；RPC方向与对象所有权可证明；迟到、离开和版本差异都有跨进程证据。",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-11-real-world-engines-6",
    "chapter": "mgp-11-real-world-engines",
    "level": 3,
    "question": "第11章 真实世界引擎（Real-World Engines）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第11章 真实世界引擎（Real-World Engines）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-12-gamer-services-1",
    "chapter": "mgp-12-gamer-services",
    "level": 1,
    "question": "第12章 玩家服务（Gamer Services）的核心主张是什么？",
    "answer": "大厅、匹配、统计、成就和排行榜是跨会话服务，必须以身份、幂等和可验证结果连接到游戏服务器。",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-12-gamer-services-2",
    "chapter": "mgp-12-gamer-services",
    "level": 2,
    "question": "第12章 玩家服务（Gamer Services）覆盖哪些正式目录主题？",
    "answer": "Choosing a Gamer Service、Basic Setup、Lobbies and Matchmaking、Networking、Player Statistics、Player Achievements、Leaderboards、Other Services、Summary、Review Questions、Additional Readings",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-12-gamer-services-3",
    "chapter": "mgp-12-gamer-services",
    "level": 2,
    "question": "第12章 玩家服务（Gamer Services）的六阶段证据链是什么？",
    "answer": "认证玩家身份 → 创建大厅队伍 → 执行约束匹配 → 签发会话凭证 → 提交权威结果 → 更新统计成就排行",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "机制链"
    ]
  },
  {
    "id": "mgp-12-gamer-services-4",
    "chapter": "mgp-12-gamer-services",
    "level": 3,
    "question": "第12章 玩家服务（Gamer Services）应主动注入哪两类失败？",
    "answer": "把平台SDK成功回调当作业务完成，忽略超时后成功、重复回调和取消竞态。；允许客户端直接提交统计或排行榜分数，事后再靠异常检测修正。",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-12-gamer-services-5",
    "chapter": "mgp-12-gamer-services",
    "level": 3,
    "question": "第12章 玩家服务（Gamer Services）签发时保持什么不变量？",
    "answer": "身份映射稳定；大厅和匹配转换有版本；同一权威比赛结果无论重试多少次只生效一次。",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-12-gamer-services-6",
    "chapter": "mgp-12-gamer-services",
    "level": 3,
    "question": "第12章 玩家服务（Gamer Services）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第12章 玩家服务（Gamer Services）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-1",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 1,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）的核心主张是什么？",
    "answer": "专用服务器托管是容量与生命周期控制问题：进程管理器、虚拟机管理器和会话分配必须闭环。",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-2",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 2,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）覆盖哪些正式目录主题？",
    "answer": "To Host or Not To Host、Tools of the Trade、Overview and Terminology、Local Server Process Manager、Virtual Machine Manager、Summary、Review Questions、Additional Readings",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-3",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 2,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）的六阶段证据链是什么？",
    "answer": "预测地区需求 → 准备版本镜像 → 扩展虚拟机池 → 启动健康进程 → 放置比赛会话 → 排空回收并核账",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "机制链"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-4",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 3,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）应主动注入哪两类失败？",
    "answer": "只按当前CPU扩容，忽略虚拟机与游戏进程启动时延，峰值到来时容量仍未就绪。；缩容直接终止实例，没有排空比赛、提交结果和核对进程租约。",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-5",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 3,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）签发时保持什么不变量？",
    "answer": "只有健康且版本匹配的进程可被放置；控制操作幂等；缩容前所有会话、结果和租约均已清账。",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-13-cloud-dedicated-servers-6",
    "chapter": "mgp-13-cloud-dedicated-servers",
    "level": 3,
    "question": "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-1",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 1,
    "question": "附录A 现代C++入门（A Modern C++ Primer）的核心主张是什么？",
    "answer": "网络代码的资源安全依赖现代C++值语义、引用、模板、智能指针、容器与迭代器契约。",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "核心机制"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-2",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 2,
    "question": "附录A 现代C++入门（A Modern C++ Primer）覆盖哪些正式目录主题？",
    "answer": "C++11、References、Templates、Smart Pointers、STL Containers、Iterators、Additional Readings",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-3",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 2,
    "question": "附录A 现代C++入门（A Modern C++ Primer）的六阶段证据链是什么？",
    "answer": "区分值与引用 → 声明所有权 → 用RAII封装句柄 → 选择STL容器 → 以迭代器遍历 → 验证移动与失效",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "机制链"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-4",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 3,
    "question": "附录A 现代C++入门（A Modern C++ Primer）应主动注入哪两类失败？",
    "answer": "在异步回调中捕获局部变量引用，回调执行时对象已经销毁。；把shared_ptr当默认指针，循环引用让连接和复制对象永久无法回收。",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "故障注入"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-5",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 3,
    "question": "附录A 现代C++入门（A Modern C++ Primer）签发时保持什么不变量？",
    "answer": "每个资源的所有权可说明；异常和取消路径无泄漏；容器修改不使用失效迭代器且确定性顺序显式定义。",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "工程验收"
    ]
  },
  {
    "id": "mgp-appendix-modern-cpp-6",
    "chapter": "mgp-appendix-modern-cpp",
    "level": 3,
    "question": "附录A 现代C++入门（A Modern C++ Primer）怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "附录A 现代C++入门（A Modern C++ Primer）",
      "可复现实验"
    ]
  },
  {
    "id": "mgp-official-final-review-1",
    "chapter": "mgp-official-final-review",
    "level": 1,
    "question": "《Multiplayer Game Programming》全书总复习的核心主张是什么？",
    "answer": "以一次玩家输入到云端权威裁决再回到画面的完整旅程，复查全书13章与附录A。",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "核心机制"
    ]
  },
  {
    "id": "mgp-official-final-review-2",
    "chapter": "mgp-official-final-review",
    "level": 2,
    "question": "《Multiplayer Game Programming》全书总复习覆盖哪些正式目录主题？",
    "answer": "网络游戏概览：A Brief History of Multiplayer Games、网络游戏概览：Starsiege: Tribes、网络游戏概览：Age of Empires、网络游戏概览：Summary、网络游戏概览：Review Questions、网络游戏概览：Additional Readings、互联网分层与NAT：Origins: Packet Switching、互联网分层与NAT：The TCP/IP Layer Cake、互联网分层与NAT：The Physical Layer、互联网分层与NAT：The Link Layer、互联网分层与NAT：The Network Layer、互联网分层与NAT：The Transport Layer、互联网分层与NAT：The Application Layer、互联网分层与NAT：NAT、互联网分层与NAT：Summary、互联网分层与NAT：Review Questions、互联网分层与NAT：Additional Readings、Berkeley套接字：Creating Sockets、Berkeley套接字：API Operating System Differences、Berkeley套接字：Socket Address、Berkeley套接字：UDP Sockets、Berkeley套接字：TCP Sockets、Berkeley套接字：Blocking and Non-Blocking I/O、Berkeley套接字：Additional Socket Options、Berkeley套接字：Summary、Berkeley套接字：Review Questions、Berkeley套接字：Additional Readings、对象序列化：The Need for Serialization、对象序列化：Streams、对象序列化：Referenced Data、对象序列化：Compression、对象序列化：Maintainability、对象序列化：Summary、对象序列化：Review Questions、对象序列化：Additional Readings、对象复制：The State of the World、对象复制：Replicating an Object、对象复制：Naïve World State Replication、对象复制：Changes in World State、对象复制：RPCs as Serialized Objects、对象复制：Custom Solutions、对象复制：Summary、对象复制：Review Questions、对象复制：Additional Readings、网络拓扑与样例：Network Topologies、网络拓扑与样例：Implementing Client-Server、网络拓扑与样例：Implementing Peer-to-Peer、网络拓扑与样例：Summary、网络拓扑与样例：Review Questions、网络拓扑与样例：Additional Reading、延迟、抖动与可靠性：Latency、延迟、抖动与可靠性：Jitter、延迟、抖动与可靠性：Packet Loss、延迟、抖动与可靠性：Reliability: TCP or UDP?、延迟、抖动与可靠性：Packet Delivery Notification、延迟、抖动与可靠性：Object Replication Reliability、延迟、抖动与可靠性：Simulating Real-World Conditions、延迟、抖动与可靠性：Summary、延迟、抖动与可靠性：Review Questions、延迟、抖动与可靠性：Additional Readings、延迟隐藏与校正：The Dumb Terminal Client、延迟隐藏与校正：Client Side Interpolation、延迟隐藏与校正：Client Side Prediction、延迟隐藏与校正：Server Side Rewind、延迟隐藏与校正：Summary、延迟隐藏与校正：Review Questions、延迟隐藏与校正：Additional Readings、可伸缩性：Object Scope and Relevancy、可伸缩性：Server Partitioning、可伸缩性：Instancing、可伸缩性：Prioritization and Frequency、可伸缩性：Summary、可伸缩性：Review Questions、可伸缩性：Additional Readings、网络游戏安全：Packet Sniffing、网络游戏安全：Input Validation、网络游戏安全：Software Cheat Detection、网络游戏安全：Securing the Server、网络游戏安全：Summary、网络游戏安全：Review Questions、网络游戏安全：Additional Readings、Unreal与Unity网络抽象：Unreal Engine 4、Unreal与Unity网络抽象：Unity、Unreal与Unity网络抽象：Summary、Unreal与Unity网络抽象：Review Questions、Unreal与Unity网络抽象：Additional Readings、玩家服务：Choosing a Gamer Service、玩家服务：Basic Setup、玩家服务：Lobbies and Matchmaking、玩家服务：Networking、玩家服务：Player Statistics、玩家服务：Player Achievements、玩家服务：Leaderboards、玩家服务：Other Services、玩家服务：Summary、玩家服务：Review Questions、玩家服务：Additional Readings、云端专用服务器：To Host or Not To Host、云端专用服务器：Tools of the Trade、云端专用服务器：Overview and Terminology、云端专用服务器：Local Server Process Manager、云端专用服务器：Virtual Machine Manager、云端专用服务器：Summary、云端专用服务器：Review Questions、云端专用服务器：Additional Readings、现代C++入门：C++11、现代C++入门：References、现代C++入门：Templates、现代C++入门：Smart Pointers、现代C++入门：STL Containers、现代C++入门：Iterators、现代C++入门：Additional Readings",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "目录覆盖"
    ]
  },
  {
    "id": "mgp-official-final-review-3",
    "chapter": "mgp-official-final-review",
    "level": 2,
    "question": "《Multiplayer Game Programming》全书总复习的六阶段证据链是什么？",
    "answer": "采样并编号输入 → 序列化发送意图 → 服务器验证推进 → 复制相关状态 → 客户端预测校正 → 结果入库并回收会话",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "机制链"
    ]
  },
  {
    "id": "mgp-official-final-review-4",
    "chapter": "mgp-official-final-review",
    "level": 3,
    "question": "《Multiplayer Game Programming》全书总复习应主动注入哪两类失败？",
    "answer": "逐章知识都能复述，却无法画出一次输入跨越各层的版本、所有权和时间线。；只做正常局演示，没有迟到、重复、丢包、作弊、扩缩和排空后的恢复证据。",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "故障注入"
    ]
  },
  {
    "id": "mgp-official-final-review-5",
    "chapter": "mgp-official-final-review",
    "level": 3,
    "question": "《Multiplayer Game Programming》全书总复习签发时保持什么不变量？",
    "answer": "输入、对象、会话和结果身份贯通；服务器裁决始终唯一；故障恢复后状态与资源都收敛。",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "工程验收"
    ]
  },
  {
    "id": "mgp-official-final-review-6",
    "chapter": "mgp-official-final-review",
    "level": 3,
    "question": "《Multiplayer Game Programming》全书总复习怎样完成可复现实验？",
    "answer": "固定协议版本、网络种子、负载和输入，依次运行正常、边界、失败与恢复样本，保存消息序号、状态所有者、首偏离点和恢复动作。",
    "tags": [
      "《Multiplayer Game Programming》全书总复习",
      "可复现实验"
    ]
  }
];
