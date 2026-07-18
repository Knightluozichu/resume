import type { ReviewQuestion } from "./types";

export const ummOfficialQuestions: ReviewQuestion[] = [
  {
    id: "umm-official-learning-map-1",
    chapter: "umm-official-learning-map",
    level: 1,
    question: "《Unity3D网络游戏实战（第2版）》权威学习地图的核心主张是什么？",
    answer:
      "第二版不是泛化的 MMO 百科，而是一条明确的项目路径：第1至5章把 TCP 与多人原型做正确，第6至7章把双端网络代码抽成框架，第8至12章把坦克、UI、房间、胜负和同步接成完整游戏。原书没有 AOI、流式世界或生产部署章节，因此这些旧自拟主题不能继续冒充正式目录。",
    tags: ["全书导览", "核心机制"],
  },
  {
    id: "umm-official-learning-map-2",
    chapter: "umm-official-learning-map",
    level: 2,
    question:
      "《Unity3D网络游戏实战（第2版）》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第一部分 扎基础（第1至5章）、第1章 网络游戏的开端：Echo、第2章 分身有术：异步和多路复用、第3章 实践出真知：大乱斗游戏、第4章 正确收发数据流、第5章 深入了解TCP，解决暗藏问题、第二部分 搭框架（第6至7章）、第6章 通用客户端网络模块、第7章 通用服务端框架、第三部分 做游戏（第8至12章）、第8章 完整大项目《坦克大战》、第9章 UI界面模块、第10章 游戏大厅和房间、第11章 战斗和胜负判定、第12章 同步战斗信息",
    tags: ["全书导览", "目录覆盖"],
  },
  {
    id: "umm-official-learning-map-3",
    chapter: "umm-official-learning-map",
    level: 2,
    question:
      "《Unity3D网络游戏实战（第2版）》权威学习地图的六阶段证据链是什么？",
    answer:
      "核对版本与 ISBN → 映射十二章目录 → 完成网络基础闭环 → 完成双端框架 → 完成坦克项目 → 全链故障签发",
    tags: ["全书导览", "核心机制"],
  },
  {
    id: "umm-official-learning-map-4",
    chapter: "umm-official-learning-map",
    level: 3,
    question:
      "《Unity3D网络游戏实战（第2版）》权威学习地图应主动注入什么失败？",
    answer:
      "沿用旧的“网络客户端、AOI、场景流式加载、优化、部署”十主题，虽然都与网游有关，却丢失原书大部分项目步骤。；把第一版 12 章的单机坦克目录与第二版网络目录混在一起，造成章号和内容互相冲突。",
    tags: ["全书导览", "工程验收"],
  },
  {
    id: "umm-official-learning-map-5",
    chapter: "umm-official-learning-map",
    level: 3,
    question:
      "《Unity3D网络游戏实战（第2版）》权威学习地图签发时保持什么不变量？",
    answer:
      "第二版 12 个正式章节各有独立页面，公开目录条目全部映射，第一版与现代扩展不会被冒充为第二版目录。",
    tags: ["全书导览", "工程验收"],
  },
  {
    id: "umm-official-learning-map-6",
    chapter: "umm-official-learning-map",
    level: 3,
    question:
      "《Unity3D网络游戏实战（第2版）》权威学习地图怎样完成可复现实验？",
    answer:
      "建立一张 12 章追踪表，将每个公开分节映射到本站页面、互动实验、题库和验收不变量。先预测旧十主题遗漏哪些正式章，再逐项检查 Echo、数据流、UI、房间和胜负判定是否回到原书顺序。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["全书导览", "工程验收"],
  },
  {
    id: "umm-01-echo-1",
    chapter: "umm-01-echo",
    level: 1,
    question: "第1章 网络游戏的开端：Echo的核心主张是什么？",
    answer:
      "网络游戏不是从角色和场景开始，而是从一个能够被观察、被失败、被重放的双端连接开始。Echo 的价值不在于功能简单，而在于它把地址、端口、连接、收发和关闭压缩成最小闭环；这条闭环一旦含糊，后续所有协议都会继承同一种不确定性。",
    tags: ["第1章", "核心机制"],
  },
  {
    id: "umm-01-echo-2",
    chapter: "umm-01-echo",
    level: 2,
    question: "第1章 网络游戏的开端：Echo覆盖哪些正式目录主题？",
    answer:
      "1.1 藏在幕后的服务端、1.2 网络连接的端点：Socket、1.2.1 Socket、1.2.2 IP地址、1.2.3 端口、1.2.4 Socket通信的流程、1.2.5 TCP和UDP协议、1.3 开始网络编程：Echo、1.3.1 什么是Echo程序、1.3.2 编写客户端程序、1.3.3 客户端代码知识点、1.3.4 完成客户端、1.3.5 创建服务端程序、1.3.6 编写服务端程序、1.3.7 服务端知识点、1.3.8 测试Echo程序、1.4 更多API、1.5 公网和局域网",
    tags: ["第1章", "目录覆盖"],
  },
  {
    id: "umm-01-echo-3",
    chapter: "umm-01-echo",
    level: 2,
    question: "第1章 网络游戏的开端：Echo的六阶段证据链是什么？",
    answer:
      "声明双端职责 → 选择地址端口 → 创建并连接 Socket → 循环收发字节 → 分类关闭与异常 → 跨网络复测签发",
    tags: ["第1章", "核心机制"],
  },
  {
    id: "umm-01-echo-4",
    chapter: "umm-01-echo",
    level: 3,
    question: "第1章 网络游戏的开端：Echo应主动注入什么失败？",
    answer:
      "把一次 Send 等同于对端一次 Receive，于是测试字符串能返回，稍大负载就把两次数据读成一块或只读到半块。；只在 localhost 上验收，再把公网不可达归咎于 Socket 代码；实际上监听地址、防火墙或端口映射从未被验证。",
    tags: ["第1章", "工程验收"],
  },
  {
    id: "umm-01-echo-5",
    chapter: "umm-01-echo",
    level: 3,
    question: "第1章 网络游戏的开端：Echo签发时保持什么不变量？",
    answer:
      "每个连接只有一个明确所有者；任意分片下 Echo 字节完全一致；连接失败和远端关闭不会污染下一次会话。",
    tags: ["第1章", "工程验收"],
  },
  {
    id: "umm-01-echo-6",
    chapter: "umm-01-echo",
    level: 3,
    question: "第1章 网络游戏的开端：Echo怎样完成可复现实验？",
    answer:
      "建立一个最小 Echo 客户端和服务端。先预测 localhost 成功是否意味着另一台机器一定可达，再分别使用回环地址、局域网地址、错误端口和中途断线四组输入；记录连接状态、系统错误码、已收字节数和关闭方向。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第1章", "工程验收"],
  },
  {
    id: "umm-02-async-multiplexing-1",
    chapter: "umm-02-async-multiplexing",
    level: 1,
    question: "第2章 分身有术：异步和多路复用的核心主张是什么？",
    answer:
      "并发网络程序的核心不是同时写更多代码，而是把等待显式化。异步回调把完成通知交给运行时，Poll 和 Select 把就绪集合交给循环；三者都不能替应用管理连接状态、部分收发、异常和取消。",
    tags: ["第2章", "核心机制"],
  },
  {
    id: "umm-02-async-multiplexing-2",
    chapter: "umm-02-async-multiplexing",
    level: 2,
    question: "第2章 分身有术：异步和多路复用覆盖哪些正式目录主题？",
    answer:
      "2.1 什么样的代码是异步代码、2.2 异步客户端、2.2.1 异步Connect、2.2.2 Show Me The Code、2.2.3 异步Receive、2.2.4 异步Send、2.3 异步服务端、2.3.1 管理客户端、2.3.2 异步Accept、2.3.3 程序结构、2.3.4 代码展示、2.4 实践：做个聊天室、2.4.1 服务端、2.4.2 客户端、2.4.3 测试、2.5 状态检测Poll、2.5.1 什么是Poll、2.5.2 Poll客户端、2.5.3 Poll服务端、2.6 多路复用Select、2.6.1 什么是多路复用、2.6.2 Select服务端、2.6.3 Select客户端",
    tags: ["第2章", "目录覆盖"],
  },
  {
    id: "umm-02-async-multiplexing-3",
    chapter: "umm-02-async-multiplexing",
    level: 2,
    question: "第2章 分身有术：异步和多路复用的六阶段证据链是什么？",
    answer:
      "定义连接状态 → 发起异步操作 → 收集就绪集合 → 消费部分读写 → 施加队列背压 → 取消排空并签发",
    tags: ["第2章", "核心机制"],
  },
  {
    id: "umm-02-async-multiplexing-4",
    chapter: "umm-02-async-multiplexing",
    level: 3,
    question: "第2章 分身有术：异步和多路复用应主动注入什么失败？",
    answer:
      "回调直接修改 Unity 场景对象，偶尔成功后就认为线程安全；负载上升时主线程和回调线程同时改状态，产生不可重现的崩溃。；Select 显示可读便假设得到完整消息，没有累积缓冲区；结果在边界分片下解析器读取越界或拼错协议。",
    tags: ["第2章", "工程验收"],
  },
  {
    id: "umm-02-async-multiplexing-5",
    chapter: "umm-02-async-multiplexing",
    level: 3,
    question: "第2章 分身有术：异步和多路复用签发时保持什么不变量？",
    answer:
      "同一异步操作只完成一次；业务状态只在指定消费线程修改；慢客户端不会让全局队列越过预算。",
    tags: ["第2章", "工程验收"],
  },
  {
    id: "umm-02-async-multiplexing-6",
    chapter: "umm-02-async-multiplexing",
    level: 3,
    question: "第2章 分身有术：异步和多路复用怎样完成可复现实验？",
    answer:
      "用同一聊天室脚本分别驱动异步回调和 Select 服务端：20 个正常客户端持续发言，1 个客户端停止读取。先预测哪种模型吞吐更高，再记录每连接发送队列、广播延迟、回调线程和关闭后未完成操作。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第2章", "工程验收"],
  },
  {
    id: "umm-03-battle-royale-1",
    chapter: "umm-03-battle-royale",
    level: 1,
    question: "第3章 实践出真知：大乱斗游戏的核心主张是什么？",
    answer:
      "第一款联网游戏要证明的不是画面，而是协议如何驱动权威状态。角色的出现、移动、攻击、受伤、死亡和离开必须形成同一条因果链；客户端表现可预测，但身份、伤害和存活结果不能由客户端自行宣布。",
    tags: ["第3章", "核心机制"],
  },
  {
    id: "umm-03-battle-royale-2",
    chapter: "umm-03-battle-royale",
    level: 2,
    question: "第3章 实践出真知：大乱斗游戏覆盖哪些正式目录主题？",
    answer:
      "3.1 什么是大乱斗游戏、3.2 搭建场景、3.3 角色类Human、3.3.1 类结构设计、3.3.2 BaseHuman、3.3.3 角色预设、3.3.4 CtrlHuman、3.3.5 SyncHuman、3.4 如何使用网络模块、3.4.1 委托、3.4.2 通信协议、3.4.3 消息队列、3.4.4 NetManager类、3.4.5 测试网络模块、3.5 进入游戏：Enter协议、3.5.1 创建角色、3.5.2 接收Enter协议、3.5.3 测试Enter协议、3.6 服务端如何处理消息、3.6.1 反射机制、3.6.2 消息处理函数、3.6.3 事件处理、3.6.4 玩家数据、3.6.5 处理Enter协议、3.7 玩家列表：List协议、3.7.1 客户端处理、3.7.2 服务端处理、3.7.3 测试、3.8 移动同步：Move协议、3.8.1 客户端处理、3.8.2 服务端处理、3.8.3 测试、3.9 玩家离开：Leave协议、3.9.1 客户端处理、3.9.2 服务端处理、3.9.3 测试、3.10 攻击动作：Attack协议、3.10.1 播放攻击动作、3.10.2 客户端处理、3.10.3 服务端处理、3.10.4 测试、3.11 攻击伤害：Hit协议、3.11.1 客户端处理、3.11.2 服务端处理、3.12 角色死亡：Die协议、3.12.1 客户端处理、3.12.2 测试",
    tags: ["第3章", "目录覆盖"],
  },
  {
    id: "umm-03-battle-royale-3",
    chapter: "umm-03-battle-royale",
    level: 2,
    question: "第3章 实践出真知：大乱斗游戏的六阶段证据链是什么？",
    answer:
      "建立角色与场景 → 接入 NetManager → 进入并同步列表 → 校验移动与离开 → 判定攻击伤害死亡 → 乱序重放后签发",
    tags: ["第3章", "核心机制"],
  },
  {
    id: "umm-03-battle-royale-4",
    chapter: "umm-03-battle-royale",
    level: 3,
    question: "第3章 实践出真知：大乱斗游戏应主动注入什么失败？",
    answer:
      "客户端直接发送 Hit 和伤害值，服务端只负责转发；修改客户端即可远距离秒杀任何目标。；离开只靠 Leave 协议，不处理 TCP 断线事件；异常退出的玩家永久残留在服务端和其他客户端。",
    tags: ["第3章", "工程验收"],
  },
  {
    id: "umm-03-battle-royale-5",
    chapter: "umm-03-battle-royale",
    level: 3,
    question: "第3章 实践出真知：大乱斗游戏签发时保持什么不变量？",
    answer:
      "玩家表与连接身份一一对应；任何客户端不能替服务端宣布伤害或死亡；断线最终收敛为一次离开。",
    tags: ["第3章", "工程验收"],
  },
  {
    id: "umm-03-battle-royale-6",
    chapter: "umm-03-battle-royale",
    level: 3,
    question: "第3章 实践出真知：大乱斗游戏怎样完成可复现实验？",
    answer:
      "运行三个客户端并记录每条协议的序号。先预测玩家 B 在 Enter 与 List 乱序时会看到什么，再注入重复 Enter、越速 Move、远距离 Hit 和断线不发 Leave；对比服务端玩家表与三个客户端实体表的首个差异。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第3章", "工程验收"],
  },
  {
    id: "umm-04-tcp-data-stream-1",
    chapter: "umm-04-tcp-data-stream",
    level: 1,
    question: "第4章 正确收发数据流的核心主张是什么？",
    answer:
      "TCP 可靠并不等于一条消息对应一次收发。正确的数据流实现要同时解决组帧、大小端、部分发送、缓冲区移动和并发队列；只修复其中一个现象，下一次分片方式变化仍会破坏协议。",
    tags: ["第4章", "核心机制"],
  },
  {
    id: "umm-04-tcp-data-stream-2",
    chapter: "umm-04-tcp-data-stream",
    level: 2,
    question: "第4章 正确收发数据流覆盖哪些正式目录主题？",
    answer:
      "4.1 TCP数据流、4.1.1 系统缓冲区、4.1.2 粘包半包现象、4.1.3 人工重现粘包现象、4.2 解决粘包问题的方法、4.2.1 长度信息法、4.2.2 固定长度法、4.2.3 结束符号法、4.3 解决粘包的代码实现、4.3.1 发送数据、4.3.2 接收数据、4.3.3 处理数据、4.3.4 完整的示例、4.3.5 测试程序、4.4 大端小端问题、4.4.1 为什么会有大端小端之分、4.4.2 使用Reverse()兼容大小端编码、4.4.3 手动还原数值、4.5 完整发送数据、4.5.1 不完整发送示例、4.5.2 如何解决发送不完整问题、4.5.3 ByteArray和Queue、4.5.4 解决线程冲突、4.5.5 为什么要使用队列、4.6 高效的接收数据、4.6.1 不足之处、4.6.2 完整的ByteArray、4.6.3 将ByteArray应用到异步程序",
    tags: ["第4章", "目录覆盖"],
  },
  {
    id: "umm-04-tcp-data-stream-3",
    chapter: "umm-04-tcp-data-stream",
    level: 2,
    question: "第4章 正确收发数据流的六阶段证据链是什么？",
    answer:
      "定义帧头与上限 → 累积任意分片 → 按字节序读长度 → 循环提取完整帧 → 排队完成部分发送 → 模糊分片后签发",
    tags: ["第4章", "核心机制"],
  },
  {
    id: "umm-04-tcp-data-stream-4",
    chapter: "umm-04-tcp-data-stream",
    level: 3,
    question: "第4章 正确收发数据流应主动注入什么失败？",
    answer:
      "只在接收端加长度前缀，却假设 Send 一次发完；压力下帧头发出、正文只发一半，后续消息永久错位。；收到长度后立即按该值分配数组，没有最大帧限制；攻击者发送一个巨大长度即可耗尽内存。",
    tags: ["第4章", "工程验收"],
  },
  {
    id: "umm-04-tcp-data-stream-5",
    chapter: "umm-04-tcp-data-stream",
    level: 3,
    question: "第4章 正确收发数据流签发时保持什么不变量？",
    answer:
      "任意合法分片组合产生完全相同的帧序列；非法长度在分配前被拒绝；部分发送不会越过当前帧尾部。",
    tags: ["第4章", "工程验收"],
  },
  {
    id: "umm-04-tcp-data-stream-6",
    chapter: "umm-04-tcp-data-stream",
    level: 3,
    question: "第4章 正确收发数据流怎样完成可复现实验？",
    answer:
      "把同一批 100 条消息随机切成 1 到 23 字节分片，并随机把相邻分片合并。先预测解析次数，再验证输出帧序列与原序列完全相同；额外注入负长度、超大长度、关闭于半帧和每次只发送 3 字节。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第4章", "工程验收"],
  },
  {
    id: "umm-05-deep-tcp-1",
    chapter: "umm-05-deep-tcp",
    level: 1,
    question: "第5章 深入了解TCP，解决暗藏问题的核心主张是什么？",
    answer:
      "网络程序中的“偶尔登录不上、偶尔卡、偶尔掉线”通常不是一个开关能解决。必须沿分层、连接状态和 Socket 参数追踪因果：参数只改变某个局部机制，关闭与心跳仍要由应用协议定义。",
    tags: ["第5章", "核心机制"],
  },
  {
    id: "umm-05-deep-tcp-2",
    chapter: "umm-05-deep-tcp",
    level: 2,
    question: "第5章 深入了解TCP，解决暗藏问题覆盖哪些正式目录主题？",
    answer:
      "5.1 从TCP到铜线、5.1.1 应用层、5.1.2 传输层、5.1.3 网络层、5.1.4 网络接口、5.2 数据传输流程、5.2.1 TCP连接的建立、5.2.2 TCP的数据传输、5.2.3 TCP连接的终止、5.3 常用TCP参数、5.3.1 ReceiveBufferSize、5.3.2 SendBufferSize、5.3.3 NoDelay、5.3.4 TTL、5.3.5 ReuseAddress、5.3.6 LingerState、5.4 Close的恰当时机、5.5 异常处理、5.6 心跳机制",
    tags: ["第5章", "目录覆盖"],
  },
  {
    id: "umm-05-deep-tcp-3",
    chapter: "umm-05-deep-tcp",
    level: 2,
    question: "第5章 深入了解TCP，解决暗藏问题的六阶段证据链是什么？",
    answer:
      "按层定位失败 → 观察握手与状态 → 量化缓冲和小包 → 设计优雅关闭 → 分类异常与心跳 → 网络中断后签发",
    tags: ["第5章", "核心机制"],
  },
  {
    id: "umm-05-deep-tcp-4",
    chapter: "umm-05-deep-tcp",
    level: 3,
    question: "第5章 深入了解TCP，解决暗藏问题应主动注入什么失败？",
    answer:
      "遇到卡顿就把 NoDelay 打开并把缓冲区调大，却不记录队列和线程暂停；平均延迟变好，长尾和内存反而恶化。；心跳超时立即删除玩家数据，不区分短暂网络抖动与永久离线；重连时产生两个会话或丢失正在保存的状态。",
    tags: ["第5章", "工程验收"],
  },
  {
    id: "umm-05-deep-tcp-5",
    chapter: "umm-05-deep-tcp",
    level: 3,
    question: "第5章 深入了解TCP，解决暗藏问题签发时保持什么不变量？",
    answer:
      "参数调整有可对比证据；关闭只完成一次且未确认消息有明确处置；心跳超时与会话回收保持幂等。",
    tags: ["第5章", "工程验收"],
  },
  {
    id: "umm-05-deep-tcp-6",
    chapter: "umm-05-deep-tcp",
    level: 3,
    question: "第5章 深入了解TCP，解决暗藏问题怎样完成可复现实验？",
    answer:
      "固定一条每 100 毫秒发送的小消息，分别切换 NoDelay、缓冲区大小和接收端停顿。先预测 P99 延迟，再用抓包与应用日志对齐发送时间、ACK、队列水位和心跳；最后在发送中拔网线并观察关闭判定。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第5章", "工程验收"],
  },
  {
    id: "umm-06-client-network-module-1",
    chapter: "umm-06-client-network-module",
    level: 1,
    question: "第6章 通用客户端网络模块的核心主张是什么？",
    answer:
      "通用客户端网络模块的价值不是隐藏所有细节，而是让连接状态、协议边界和线程交接只有一个实现。它必须把 Socket 回调与 Unity 主线程隔离，同时让调用者看到连接、关闭和错误事件。",
    tags: ["第6章", "核心机制"],
  },
  {
    id: "umm-06-client-network-module-2",
    chapter: "umm-06-client-network-module",
    level: 2,
    question: "第6章 通用客户端网络模块覆盖哪些正式目录主题？",
    answer:
      "6.1 网络模块设计、6.1.1 对外接口、6.1.2 内部设计、6.2 网络事件、6.2.1 事件类型、6.2.2 监听列表、6.2.3 分发事件、6.3 连接服务端、6.3.1 Connect、6.3.2 ConnectCallback、6.3.3 测试程序、6.4 关闭连接、6.4.1 isClosing、6.4.2 Close、6.4.3 测试、6.5 Json协议、6.5.1 为什么会有协议类、6.5.2 使用JsonUtility、6.5.3 协议格式、6.5.4 协议文件、6.5.5 协议体的编码解码、6.5.6 协议名的编码解码、6.6 发送数据、6.6.1 Send、6.6.2 SendCallback、6.6.3 测试、6.7 消息事件、6.8 接收数据、6.8.1 新的成员、6.8.2 ConnectCallback、6.8.3 ReceiveCallback、6.8.4 OnReceiveData、6.8.5 Update、6.8.6 测试、6.9 心跳机制、6.9.1 PING和PONG协议、6.9.2 成员变量、6.9.3 发送PING协议、6.9.4 监听PONG协议、6.9.5 测试、6.10 Protobuf协议、6.10.1 什么是Protobuf、6.10.2 编写proto文件、6.10.3 生成协议类、6.10.4 导入protobuf-net.dll、6.10.5 编码解码",
    tags: ["第6章", "目录覆盖"],
  },
  {
    id: "umm-06-client-network-module-3",
    chapter: "umm-06-client-network-module",
    level: 2,
    question: "第6章 通用客户端网络模块的六阶段证据链是什么？",
    answer:
      "冻结外部接口 → 实现连接事件 → 封装协议与帧 → 串行发送完整数据 → 主线程消费接收 → 心跳与关闭后签发",
    tags: ["第6章", "核心机制"],
  },
  {
    id: "umm-06-client-network-module-4",
    chapter: "umm-06-client-network-module",
    level: 3,
    question: "第6章 通用客户端网络模块应主动注入什么失败？",
    answer:
      "为了方便，把 Socket 暴露给所有业务脚本；每个面板各自连接、关闭和解析，最终同一账号同时存在多个竞争连接。；在 ReceiveCallback 中直接更新 UI，编辑器中偶尔可用便上线；设备上回调线程触碰 Unity 对象导致随机崩溃。",
    tags: ["第6章", "工程验收"],
  },
  {
    id: "umm-06-client-network-module-5",
    chapter: "umm-06-client-network-module",
    level: 3,
    question: "第6章 通用客户端网络模块签发时保持什么不变量？",
    answer:
      "任一时刻最多一个活动连接；所有 Unity 对象只在主线程事件中修改；关闭后不再分发同代际消息。",
    tags: ["第6章", "工程验收"],
  },
  {
    id: "umm-06-client-network-module-6",
    chapter: "umm-06-client-network-module",
    level: 3,
    question: "第6章 通用客户端网络模块怎样完成可复现实验？",
    answer:
      "建立一个会重复点击连接、发送和关闭按钮的 Unity 测试场景。先预测快速双击 Connect 会发生什么，再注入连接中再次连接、发送中关闭、后台回调晚到、PONG 丢失和未知协议；记录状态机与主线程事件顺序。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第6章", "工程验收"],
  },
  {
    id: "umm-07-server-framework-1",
    chapter: "umm-07-server-framework",
    level: 1,
    question: "第7章 通用服务端框架的核心主张是什么？",
    answer:
      "通用服务端框架要把底层连接、协议解码、玩家会话和持久化分成可验证边界。Select 解决的是多个连接的等待，不解决身份、SQL 注入、重复登录或断线保存；这些必须由上层状态机和数据库契约完成。",
    tags: ["第7章", "核心机制"],
  },
  {
    id: "umm-07-server-framework-2",
    chapter: "umm-07-server-framework",
    level: 2,
    question: "第7章 通用服务端框架覆盖哪些正式目录主题？",
    answer:
      "7.1 服务端架构、7.1.1 总体架构、7.1.2 模块划分、7.1.3 游戏流程、7.2 Json编码解码、7.2.1 添加协议文件、7.2.2 引用System.web.Extensions、7.2.3 修改MsgBase类、7.2.4 测试、7.3 网络模块、7.3.1 整体结构、7.3.2 ClientState、7.3.3 开启监听和多路复用、7.3.4 处理监听消息、7.3.5 处理客户端消息、7.3.6 关闭连接、7.3.7 处理协议、7.3.8 Timer、7.3.9 发送协议、7.3.10 测试、7.4 心跳机制、7.4.1 lastPingTime、7.4.2 时间戳、7.4.3 回应MsgPing协议、7.4.4 超时处理、7.4.5 测试程序、7.5 玩家的数据结构、7.5.1 完整的ClientState、7.5.2 PlayerData、7.5.3 Player、7.5.4 PlayerManager、7.6 配置MySQL数据库、7.6.1 安装并启动MySQL数据库、7.6.2 安装Navicat for MySQL、7.6.3 配置数据表、7.6.4 安装connector、7.6.5 MySQL基础知识、7.7 数据库模块、7.7.1 连接数据库、7.7.2 防止SQL注入、7.7.3 IsAccountExist、7.7.4 Register、7.7.5 CreatePlayer、7.7.6 CheckPassword、7.7.7 GetPlayerData、7.7.8 UpdatePlayerData、7.8 登录注册功能、7.8.1 注册登录协议、7.8.2 记事本协议、7.8.3 注册功能、7.8.4 登录功能、7.8.5 退出功能、7.8.6 获取文本功能、7.8.7 保存文本功能、7.8.8 客户端界面、7.8.9 客户端监听、7.8.10 客户端注册功能、7.8.11 客户端登录功能、7.8.12 客户端记事本功能、7.8.13 测试",
    tags: ["第7章", "目录覆盖"],
  },
  {
    id: "umm-07-server-framework-3",
    chapter: "umm-07-server-framework",
    level: 2,
    question: "第7章 通用服务端框架的六阶段证据链是什么？",
    answer:
      "划分服务端模块 → 驱动 Select 与计时器 → 解码并分发协议 → 建立玩家会话 → 事务化读写 MySQL → 断线重登后签发",
    tags: ["第7章", "核心机制"],
  },
  {
    id: "umm-07-server-framework-4",
    chapter: "umm-07-server-framework",
    level: 3,
    question: "第7章 通用服务端框架应主动注入什么失败？",
    answer:
      "只在应用层先查账号不存在再插入，没有数据库唯一约束；两个并发注册都通过检查并写入重复账号。；断线先删除 Player 再异步保存 PlayerData，保存失败后已无运行时副本，玩家数据静默回退。",
    tags: ["第7章", "工程验收"],
  },
  {
    id: "umm-07-server-framework-5",
    chapter: "umm-07-server-framework",
    level: 3,
    question: "第7章 通用服务端框架签发时保持什么不变量？",
    answer:
      "账号记录唯一；一个账号最多一个活动 Player；协议失败不越过层边界；断线保存和内存移除有可恢复顺序。",
    tags: ["第7章", "工程验收"],
  },
  {
    id: "umm-07-server-framework-6",
    chapter: "umm-07-server-framework",
    level: 3,
    question: "第7章 通用服务端框架怎样完成可复现实验？",
    answer:
      "用并发脚本对同一账号发起注册和登录。先预测唯一约束与内存检查谁先拒绝，再注入 SQL 特殊字符、重复登录、数据库更新中断、心跳超时和断线重连；对齐连接表、PlayerManager 与数据库记录。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第7章", "工程验收"],
  },
  {
    id: "umm-08-tank-battle-project-1",
    chapter: "umm-08-tank-battle-project",
    level: 1,
    question: "第8章 完整大项目《坦克大战》的核心主张是什么？",
    answer:
      "大项目的第一步不是联网，而是把单机战斗对象设计成可被网络驱动的确定边界。坦克模型、资源加载、移动、炮塔、炮弹和生命值都要有清晰所有者，后续同步才能发送意图和结果，而不是复制任意 GameObject 状态。",
    tags: ["第8章", "核心机制"],
  },
  {
    id: "umm-08-tank-battle-project-2",
    chapter: "umm-08-tank-battle-project",
    level: 2,
    question: "第8章 完整大项目《坦克大战》覆盖哪些正式目录主题？",
    answer:
      "8.1 《坦克大战》游戏功能、8.1.1 登录注册、8.1.2 房间系统、8.1.3 战斗系统、8.2 坦克模型、8.2.1 导入模型、8.2.2 模型结构、8.3 资源管理器、8.3.1 设计构想、8.3.2 代码实现、8.3.3 测试、8.4 坦克类、8.4.1 设计构想、8.4.2 代码实现、8.4.3 测试、8.5 行走控制、8.5.1 速度参数、8.5.2 移动控制、8.5.3 测试、8.5.4 走在地形上、8.6 坦克爬坡、8.6.1 Unity的物理系统、8.6.2 添加物理组件、8.6.3 测试、8.7 相机跟随、8.7.1 功能需求、8.7.2 数学原理、8.7.3 编写代码、8.7.4 测试、8.8 旋转炮塔、8.8.1 炮塔元素、8.8.2 旋转控制、8.8.3 测试、8.9 发射炮弹、8.9.1 制作炮弹预设、8.9.2 制作爆炸效果、8.9.3 炮弹组件、8.9.4 坦克开炮、8.9.5 测试、8.10 摧毁敌人、8.10.1 坦克的生命值、8.10.2 焚烧特效、8.10.3 坦克被击中处理、8.10.4 炮弹的攻击处理、8.10.5 测试",
    tags: ["第8章", "目录覆盖"],
  },
  {
    id: "umm-08-tank-battle-project-3",
    chapter: "umm-08-tank-battle-project",
    level: 2,
    question: "第8章 完整大项目《坦克大战》的六阶段证据链是什么？",
    answer:
      "冻结三大功能 → 整理模型层级 → 集中资源实例化 → 实现移动爬坡相机 → 拆分开火受击死亡 → 物理边界后签发",
    tags: ["第8章", "核心机制"],
  },
  {
    id: "umm-08-tank-battle-project-4",
    chapter: "umm-08-tank-battle-project",
    level: 3,
    question: "第8章 完整大项目《坦克大战》应主动注入什么失败？",
    answer:
      "把炮塔和炮管旋转都写到车身 Transform，单机看似能瞄准，网络同步一个角度后整个坦克抖动。；碰撞回调直接根据客户端炮弹携带的 damage 扣血，没有校验攻击者和炮弹生命周期；重复碰撞可多次结算。",
    tags: ["第8章", "工程验收"],
  },
  {
    id: "umm-08-tank-battle-project-5",
    chapter: "umm-08-tank-battle-project",
    level: 3,
    question: "第8章 完整大项目《坦克大战》签发时保持什么不变量？",
    answer:
      "模型轴和缩放统一；一次炮弹只结算一次命中；视觉特效不能修改生命值；缺失资源产生可诊断失败。",
    tags: ["第8章", "工程验收"],
  },
  {
    id: "umm-08-tank-battle-project-6",
    chapter: "umm-08-tank-battle-project",
    level: 3,
    question: "第8章 完整大项目《坦克大战》怎样完成可复现实验？",
    answer:
      "在固定斜坡和碰撞层场景中驱动坦克。先预测缩放不一致会影响哪些环节，再测试平地、最大坡度、炮塔极限角、连续开火、炮弹命中自身和资源缺失；记录车身姿态、发射点、生命值与销毁事件。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第8章", "工程验收"],
  },
  {
    id: "umm-09-ui-module-1",
    chapter: "umm-09-ui-module",
    level: 1,
    question: "第9章 UI界面模块的核心主张是什么？",
    answer:
      "网络游戏 UI 不是一组按钮，而是连接与账号状态的可视化投影。面板必须由统一管理器控制层级和生命周期，协议监听要随打开与关闭成对注册，避免隐藏面板继续消费消息。",
    tags: ["第9章", "核心机制"],
  },
  {
    id: "umm-09-ui-module-2",
    chapter: "umm-09-ui-module",
    level: 2,
    question: "第9章 UI界面模块覆盖哪些正式目录主题？",
    answer:
      "9.1 界面模块的设计、9.1.1 简单的界面调用、9.1.2 通用界面模块、9.2 场景结构、9.3 面板基类BasePanel、9.3.1 设计要点、9.3.2 代码实现、9.3.3 知识点、9.4 界面管理器PanelManager、9.4.1 层级管理、9.4.2 打开面板、9.4.3 关闭面板、9.5 登录面板LoginPanel、9.5.1 导入资源、9.5.2 UI组件、9.5.3 制作面板预设、9.5.4 登录面板类、9.5.5 打开面板、9.5.6 引用UI组件、9.5.7 网络监听、9.5.8 登录和注册按钮、9.5.9 收到登录协议、9.6 注册面板RegisterPanel、9.6.1 制作面板预设、9.6.2 注册面板类、9.6.3 按钮事件、9.6.4 收到注册协议、9.7 提示面板TipPanel、9.7.1 制作面板预设、9.7.2 提示面板类、9.7.3 测试面板、9.8 游戏入口GameMain、9.8.1 设计要点、9.8.2 代码实现、9.8.3 缓存用户名、9.9 功能测试、9.9.1 登录、9.9.2 注册、9.9.3 下线",
    tags: ["第9章", "目录覆盖"],
  },
  {
    id: "umm-09-ui-module-3",
    chapter: "umm-09-ui-module",
    level: 2,
    question: "第9章 UI界面模块的六阶段证据链是什么？",
    answer:
      "设计面板生命周期 → 建立层级与实例表 → 绑定登录注册组件 → 配对协议监听 → 编排 GameMain 入口 → 重复操作后签发",
    tags: ["第9章", "核心机制"],
  },
  {
    id: "umm-09-ui-module-4",
    chapter: "umm-09-ui-module",
    level: 3,
    question: "第9章 UI界面模块应主动注入什么失败？",
    answer:
      "面板关闭只 SetActive(false)，不移除网络监听；再次打开后同一响应触发多次回调和多次场景切换。；登录按钮点击后立即打开大厅，把请求成功当作事实；认证失败时 UI 与服务端会话状态分叉。",
    tags: ["第9章", "工程验收"],
  },
  {
    id: "umm-09-ui-module-5",
    chapter: "umm-09-ui-module",
    level: 3,
    question: "第9章 UI界面模块签发时保持什么不变量？",
    answer:
      "同名面板实例数量符合策略；关闭面板无残留监听；一次按钮操作最多产生一个在途请求；UI 只投影已确认状态。",
    tags: ["第9章", "工程验收"],
  },
  {
    id: "umm-09-ui-module-6",
    chapter: "umm-09-ui-module",
    level: 3,
    question: "第9章 UI界面模块怎样完成可复现实验？",
    answer:
      "自动执行打开登录、切换注册、返回、断线、重连和快速双击。先预测监听器数量是否恒定，再记录每个面板实例数、协议回调次数、按钮可用状态和顶层交互对象；重复 100 次检查泄漏。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第9章", "工程验收"],
  },
  {
    id: "umm-10-lobby-rooms-1",
    chapter: "umm-10-lobby-rooms",
    level: 1,
    question: "第10章 游戏大厅和房间的核心主张是什么？",
    answer:
      "大厅与房间是多人游戏最容易出现双重事实的地方：客户端看到列表，服务端维护成员和房主。任何创建、进入、离开和开始战斗都必须由服务端原子修改房间，再广播同一版本的快照。",
    tags: ["第10章", "核心机制"],
  },
  {
    id: "umm-10-lobby-rooms-2",
    chapter: "umm-10-lobby-rooms",
    level: 2,
    question: "第10章 游戏大厅和房间覆盖哪些正式目录主题？",
    answer:
      "10.1 列表面板预设、10.1.1 整体结构、10.1.2 个人信息栏、10.1.3 操作栏、10.1.4 房间列表栏、10.1.5 Scroll View、10.1.6 列表项Room、10.2 房间面板预设、10.2.1 整体结构、10.2.2 列表栏、10.2.3 列表项Player、10.2.4 控制栏、10.3 协议设计、10.3.1 查询战绩MsgGetAchieve协议、10.3.2 查询房间列表MsgGetRoomList协议、10.3.3 创建房间MsgCreateRoom协议、10.3.4 进入房间MsgEnterRoom协议、10.3.5 查询房间信息MsgGetRoomInfo协议、10.3.6 退出房间MsgLeaveRoom协议、10.3.7 开始战斗MsgStartBattle协议、10.4 列表面板逻辑、10.4.1 面板类、10.4.2 获取部件、10.4.3 网络监听、10.4.4 刷新战绩、10.4.5 刷新房间列表、10.4.6 加入房间、10.4.7 创建房间、10.4.8 刷新按钮、10.5 房间面板逻辑、10.5.1 面板类、10.5.2 获取部件、10.5.3 网络监听、10.5.4 刷新玩家列表、10.5.5 退出房间、10.5.6 开始战斗、10.6 打开列表面板、10.7 服务端玩家数据、10.7.1 存储数据、10.7.2 临时数据、10.8 服务端房间类、10.8.1 管理器和房间类的关系、10.8.2 房间类的设计要点、10.8.3 添加玩家、10.8.4 选择阵营、10.8.5 删除玩家、10.8.6 选择新房主、10.8.7 广播消息、10.8.8 生成房间信息、10.9 服务端房间管理器、10.9.1 数据结构、10.9.2 获取房间、10.9.3 添加房间、10.9.4 删除房间、10.9.5 生成列表信息、10.10 服务端消息处理、10.10.1 查询战绩MsgGetAchieve、10.10.2 查询房间列表MsgGetRoomList、10.10.3 创建房间MsgCreateRoom、10.10.4 进入房间MsgEnterRoom、10.10.5 查询房间信息MsgGetRoomInfo、10.10.6 离开房间MsgLeaveRoom、10.11 玩家事件处理、10.12 测试",
    tags: ["第10章", "目录覆盖"],
  },
  {
    id: "umm-10-lobby-rooms-3",
    chapter: "umm-10-lobby-rooms",
    level: 2,
    question: "第10章 游戏大厅和房间的六阶段证据链是什么？",
    answer:
      "定义大厅房间协议 → 构建两类面板 → 分离持久临时数据 → 实现 Room 不变量 → 管理房主阵营广播 → 并发进离后签发",
    tags: ["第10章", "核心机制"],
  },
  {
    id: "umm-10-lobby-rooms-4",
    chapter: "umm-10-lobby-rooms",
    level: 3,
    question: "第10章 游戏大厅和房间应主动注入什么失败？",
    answer:
      "客户端在点击加入时先把自己放进成员列表，服务端拒绝满房后未回滚，形成只存在本地的成员。；房主断线只从成员表删除，没有迁移房主；房间永久无人能开始战斗。",
    tags: ["第10章", "工程验收"],
  },
  {
    id: "umm-10-lobby-rooms-5",
    chapter: "umm-10-lobby-rooms",
    level: 3,
    question: "第10章 游戏大厅和房间签发时保持什么不变量？",
    answer:
      "一个玩家最多属于一个房间；非空房间恰有一个有效房主；空房间不可出现在列表；同版本快照内容一致。",
    tags: ["第10章", "工程验收"],
  },
  {
    id: "umm-10-lobby-rooms-6",
    chapter: "umm-10-lobby-rooms",
    level: 3,
    question: "第10章 游戏大厅和房间怎样完成可复现实验？",
    answer:
      "让四个客户端并发创建、加入和离开同一房间。先预测房主断线后的新房主，再注入重复 Enter、满房加入、房主离开、最后成员离开和两个 StartBattle；核对 Room、RoomManager 与四个 UI 快照的版本。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第10章", "工程验收"],
  },
  {
    id: "umm-11-battle-result-1",
    chapter: "umm-11-battle-result",
    level: 1,
    question: "第11章 战斗和胜负判定的核心主张是什么？",
    answer:
      "战斗开始与胜负结算必须是服务端房间状态机的一次性转换。客户端 BattleManager 负责重建场景和坦克表现，服务端检查人数、阵营与存活状态；任何一方都不能仅凭看到爆炸就宣布结果。",
    tags: ["第11章", "核心机制"],
  },
  {
    id: "umm-11-battle-result-2",
    chapter: "umm-11-battle-result",
    level: 2,
    question: "第11章 战斗和胜负判定覆盖哪些正式目录主题？",
    answer:
      "11.1 协议设计、11.1.1 进入战斗MsgEnterBattle、11.1.2 战斗结果MsgBattleResult、11.1.3 退出战斗MsgLeaveBattle、11.2 坦克、11.2.1 不同阵营的坦克预设、11.2.2 战斗模块、11.2.3 同步坦克SyncTank、11.2.4 坦克的属性、11.3 战斗管理器、11.3.1 设计要点、11.3.2 管理器类、11.3.3 坦克管理、11.3.4 重置战场、11.3.5 开始战斗、11.3.6 产生坦克、11.3.7 战斗结束、11.3.8 玩家离开、11.4 战斗结果面板、11.4.1 面板预设、11.4.2 面板逻辑、11.5 服务端开启战斗、11.5.1 能否开始战斗、11.5.2 定义出生点、11.5.3 坦克信息、11.5.4 开启战斗、11.5.5 消息处理、11.6 服务端胜负判断、11.6.1 是否死亡、11.6.2 胜负决断函数、11.6.3 定时器、11.6.4 Room::Update、11.7 服务端断线处理、11.8 测试、11.8.1 进入战场、11.8.2 离开战场",
    tags: ["第11章", "目录覆盖"],
  },
  {
    id: "umm-11-battle-result-3",
    chapter: "umm-11-battle-result",
    level: 2,
    question: "第11章 战斗和胜负判定的六阶段证据链是什么？",
    answer:
      "设计战斗协议 → 检查开战门槛 → 生成初始快照 → 管理客户端坦克 → 服务端判定结算 → 断线重放后签发",
    tags: ["第11章", "核心机制"],
  },
  {
    id: "umm-11-battle-result-4",
    chapter: "umm-11-battle-result",
    level: 3,
    question: "第11章 战斗和胜负判定应主动注入什么失败？",
    answer:
      "客户端在所有敌人模型消失后自行增加胜场并发送 BattleResult，攻击者可直接伪造比赛结果。；Room::Update 每帧都满足胜利条件并重复发奖，没有先从 Playing 原子切到 Finished。",
    tags: ["第11章", "工程验收"],
  },
  {
    id: "umm-11-battle-result-5",
    chapter: "umm-11-battle-result",
    level: 3,
    question: "第11章 战斗和胜负判定签发时保持什么不变量？",
    answer:
      "战斗只能从合法房间状态开始；出生快照属于当前战斗代际；同一战斗只结算一次；断线后房间最终收敛。",
    tags: ["第11章", "工程验收"],
  },
  {
    id: "umm-11-battle-result-6",
    chapter: "umm-11-battle-result",
    level: 3,
    question: "第11章 战斗和胜负判定怎样完成可复现实验？",
    answer:
      "建立两个阵营并发送两次 StartBattle。先预测第二次请求的结果，再注入错误出生点、旧战斗标识的死亡消息、最后一人断线和重复 BattleResult；核对 Room 状态、战绩写入次数与客户端结果面板。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第11章", "工程验收"],
  },
  {
    id: "umm-12-battle-sync-1",
    chapter: "umm-12-battle-sync",
    level: 1,
    question: "第12章 同步战斗信息的核心主张是什么？",
    answer:
      "同步的目标不是让所有画面每一时刻完全相同，而是在网络延迟下维持可接受误差和权威结果。状态同步发送结果并用跟随、预测平滑；帧同步发送指令并依赖确定性。坦克案例选择的协议必须与权威边界一致。",
    tags: ["第12章", "核心机制"],
  },
  {
    id: "umm-12-battle-sync-2",
    chapter: "umm-12-battle-sync",
    level: 2,
    question: "第12章 同步战斗信息覆盖哪些正式目录主题？",
    answer:
      "12.1 同步理论、12.1.1 同步的过程、12.1.2 同步的难题、12.2 状态同步、12.2.1 直接状态同步、12.2.2 跟随算法、12.2.3 预测算法、12.3 帧同步、12.3.1 指令同步、12.3.2 从Update说起、12.3.3 什么是同步帧、12.3.4 指令、12.3.5 指令的执行、12.4 协议设计、12.4.1 位置同步MsgSyncTank、12.4.2 开火MsgFire、12.4.3 击中MsgHit、12.5 发送同步信息、12.5.1 发送位置信息、12.5.2 发送开火信息、12.5.3 发送击中信息、12.6 处理同步信息、12.6.1 协议监听、12.6.2 OnMsgSyncTank、12.6.3 OnMsgFire、12.6.4 OnMsgHit、12.7 同步坦克SyncTank、12.7.1 预测算法的成员变量、12.7.2 移动到预测位置、12.7.3 初始化、12.7.4 更新预测位置、12.7.5 炮弹同步、12.8 服务端消息处理、12.8.1 位置同步MsgSyncTank、12.8.2 开火MsgFire、12.8.3 击中MsgHit、12.8.4 调试、12.9 完善细节、12.9.1 滚动的轮子和履带、12.9.2 灵活操作、12.9.3 准心、12.9.4 自动瞄准、12.9.5 界面和场景优化、12.9.6 战斗面板、12.9.7 击杀提示、12.10 结语",
    tags: ["第12章", "目录覆盖"],
  },
  {
    id: "umm-12-battle-sync-3",
    chapter: "umm-12-battle-sync",
    level: 2,
    question: "第12章 同步战斗信息的六阶段证据链是什么？",
    answer:
      "选择同步模型 → 定义消息时间代际 → 发送位置开火命中 → 拒绝旧序号 → 跟随预测与校正 → 抖动丢包后签发",
    tags: ["第12章", "核心机制"],
  },
  {
    id: "umm-12-battle-sync-4",
    chapter: "umm-12-battle-sync",
    level: 3,
    question: "第12章 同步战斗信息应主动注入什么失败？",
    answer:
      "提高位置发送频率来掩盖所有卡顿，没有序号、插值缓冲和背压；带宽上升后排队反而让延迟更大。；服务端无条件转发 MsgHit，认为客户端物理已计算命中；修改目标 ID 或重放消息即可重复伤害。",
    tags: ["第12章", "工程验收"],
  },
  {
    id: "umm-12-battle-sync-5",
    chapter: "umm-12-battle-sync",
    level: 3,
    question: "第12章 同步战斗信息签发时保持什么不变量？",
    answer:
      "旧序号不能回滚实体；预测误差超过预算会受控校正；同一炮弹只命中一次；网络抖动不改变权威胜负。",
    tags: ["第12章", "工程验收"],
  },
  {
    id: "umm-12-battle-sync-6",
    chapter: "umm-12-battle-sync",
    level: 3,
    question: "第12章 同步战斗信息怎样完成可复现实验？",
    answer:
      "用固定轨迹模拟 50、150、300 毫秒延迟并加入 10% 丢包和乱序。先预测直接赋值、跟随和预测三种算法的误差，再记录平均误差、最大误差、校正次数和命中结算；重复播放同一网络轨迹。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["第12章", "工程验收"],
  },
  {
    id: "umm-official-final-review-1",
    chapter: "umm-official-final-review",
    level: 1,
    question: "《Unity3D网络游戏实战（第2版）》全书总复习的核心主张是什么？",
    answer:
      "全书完成的标准不是能在两台机器上看到坦克移动，而是任何一步失败后都能指出首偏离节点并恢复一致状态。最终验收沿一条玩家旅程重放：连接、注册登录、进入大厅、创建房间、开战、移动开火、结算和断线。",
    tags: ["全书验收", "核心机制"],
  },
  {
    id: "umm-official-final-review-2",
    chapter: "umm-official-final-review",
    level: 2,
    question:
      "《Unity3D网络游戏实战（第2版）》全书总复习覆盖哪些正式目录主题？",
    answer:
      "网络基础回放、第1章 网络游戏的开端：Echo、第2章 分身有术：异步和多路复用、第3章 实践出真知：大乱斗游戏、第4章 正确收发数据流、第5章 深入了解TCP，解决暗藏问题、框架边界回放、第6章 通用客户端网络模块、第7章 通用服务端框架、完整游戏回放、第8章 完整大项目《坦克大战》、第9章 UI界面模块、第10章 游戏大厅和房间、第11章 战斗和胜负判定、第12章 同步战斗信息",
    tags: ["全书验收", "目录覆盖"],
  },
  {
    id: "umm-official-final-review-3",
    chapter: "umm-official-final-review",
    level: 2,
    question:
      "《Unity3D网络游戏实战（第2版）》全书总复习的六阶段证据链是什么？",
    answer:
      "建立 Echo 与组帧 → 注册登录并绑定玩家 → 打开大厅创建房间 → 生成战斗与坦克 → 同步开火判定胜负 → 断线恢复全链签发",
    tags: ["全书验收", "核心机制"],
  },
  {
    id: "umm-official-final-review-4",
    chapter: "umm-official-final-review",
    level: 3,
    question: "《Unity3D网络游戏实战（第2版）》全书总复习应主动注入什么失败？",
    answer:
      "只做一次顺畅演示就签发，没有重复消息、半包、慢客户端、断线、数据库失败和旧战斗消息样本。；客户端画面最终看起来一致便认为正确，忽略服务端已重复结算或数据库战绩写了两次。",
    tags: ["全书验收", "工程验收"],
  },
  {
    id: "umm-official-final-review-5",
    chapter: "umm-official-final-review",
    level: 3,
    question:
      "《Unity3D网络游戏实战（第2版）》全书总复习签发时保持什么不变量？",
    answer:
      "连接、玩家、房间和战斗代际一致；一次请求至多产生一次结果；任何失败都不会留下幽灵成员、重复伤害或重复战绩。",
    tags: ["全书验收", "工程验收"],
  },
  {
    id: "umm-official-final-review-6",
    chapter: "umm-official-final-review",
    level: 3,
    question: "《Unity3D网络游戏实战（第2版）》全书总复习怎样完成可复现实验？",
    answer:
      "录制一场两人坦克战的确定输入，分别在连接、登录、进房、开战、同步和结算处注入一次失败。先预测首偏离节点，再比较 traceId、房间版本、战斗标识、玩家数据和客户端实体表；修复后用完全相同输入重放。 保存版本、随机种子、首偏离节点、恢复动作和最终决策。",
    tags: ["全书验收", "工程验收"],
  },
];
