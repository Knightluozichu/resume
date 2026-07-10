import type { ReviewQuestion } from "./types";

export const hfjFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "hfj-fr-1",
    chapter: "hfj-final-review",
    level: 3,
    question: `用「聊天室应用」串联全书知识点，说明每个知识点在应用中的作用。`,
    answer:
      `聊天室应用串联全书：①基础语法——定义变量存储用户名/消息内容，控制流处理命令解析，方法封装消息格式化逻辑；②面向对象——设计 Message 类（发送者+内容+时间戳）、User 类（昵称+状态）、ChatRoom 类管理交互，封装隐藏内部状态；③核心API——ArrayList<Message> 存储消息历史，HashMap<String,User> 管理在线用户，快速查找和遍历；④继承多态——抽象 Message 父类，TextMessage（文本）、ImageMessage（图片）子类多态处理不同消息类型，新增类型不改旧代码；⑤Swing GUI——JFrame 聊天窗口，JTextArea 显示消息历史，JTextField 输入消息，JButton 发送，JScrollPane 滚动；⑥事件处理——发送按钮的 ActionListener 触发发送，键盘回车事件，窗口关闭时通知服务器下线；⑦并发——每个客户端连接一个线程，synchronized 保护共享消息列表，wait/notify 实现消息通知；⑧网络——ServerSocket 接受客户端连接，Socket 收发消息，多线程处理多客户端。`,
    tags: ["综合", "聊天室", "知识整合"],
  },
  {
    id: "hfj-fr-2",
    chapter: "hfj-final-review",
    level: 3,
    question: `Java 的「栈」和「堆」分别存放什么？基本类型和引用类型的变量在内存中如何分布？`,
    answer:
      `栈（Stack）：①存储方法调用时的局部变量（基本类型的值、引用类型的引用地址）；②每个方法调用创建一个栈帧，方法结束栈帧弹出；③线程私有，不需同步；④访问快，空间小。\n堆（Heap）：①存储所有 new 创建的对象（包括数组）；②所有线程共享；③由 GC 自动回收无引用的对象；④空间大，分配稍慢。\n基本类型变量（如 int x = 42）：值 42 直接存在栈上，没有堆对象。\n引用类型变量（如 String s = new String(\"hi\")）：①在堆上创建 String 对象存储 \"hi\"；②在栈上创建引用 s，存储堆对象的地址。s 指向堆对象，不直接存内容。\n数组同理：\`int[] arr = new int[3]\` 在堆上创建数组对象（3个int槽位），栈上 arr 存数组地址。数组的元素值（基本类型）直接在堆的数组对象内。方法参数传递：基本类型传值拷贝，引用类型传引用拷贝（都指向同一堆对象）。`,
    tags: ["栈", "堆", "内存模型", "综合"],
  },
  {
    id: "hfj-fr-3",
    chapter: "hfj-final-review",
    level: 4,
    question: `从代码组织到网络通信，Java 面向对象编程的核心思想是什么？全书教会你什么？`,
    answer:
      `核心思想：面向对象编程的本质是「用类和对象组织代码，用接口和继承实现复用，用多态实现扩展」。全书教会你：①建模能力——把现实世界的事物抽象为类（属性=实例变量，行为=方法），用对象之间的交互描述系统。封装隐藏细节，降低复杂度；②复用能力——继承复用父类代码，接口定义契约，多态让代码可扩展（新增子类不改旧代码）。IS-A 判断继承，HAS-A 判断组合；③工具使用——标准库集合（ArrayList/HashMap）是日常武器，不必自己造轮子。理解 API 背后的数据结构和复杂度才能正确选择；④交互能力——GUI 让程序可交互，事件处理让程序响应式。理解 EDT 单线程模型和监听器模式是 GUI 编程基础；⑤并发能力——多线程让程序同时做多件事，但共享数据需要同步。synchronized/wait/notify 是基础同步原语；⑥通信能力——网络编程让程序跨机器交互，Socket/ServerSocket 是 TCP 通信基础。从单机到分布式，这是进阶起点。最终目标：能独立设计并实现一个包含界面、数据、并发和网络的完整 Java 应用。`,
    tags: ["综合", "面向对象", "编程思想"],
  },
  {
    id: "hfj-fr-4",
    chapter: "hfj-final-review",
    level: 4,
    question: `学完《Head First Java》后，进阶应该学什么？各方向解决什么问题？`,
    answer:
      `进阶方向：①集合源码与数据结构深入——理解 HashMap 红黑树转换、ConcurrentHashMap 分段锁，提升 API 使用水平和面试能力；②JVM 内存模型与 GC——堆分代、GC 算法、调优参数，解决生产环境内存泄漏和性能问题；③并发编程进阶——java.util.concurrent 包（Lock/Condition/线程池/并发集合/CompletableFuture），解决 synchronized 的局限性和线程管理开销；④NIO/Netty——非阻塞I/O、Selector 多路复用、零拷贝，解决传统 Socket 一连接一线程的性能瓶颈；⑤设计模式——23 种 GoF 模式在 Java 中的应用，提升架构设计能力；⑥Spring 框架——IoC/DI、AOP、Spring Boot，企业级 Java 开发主流框架；⑦函数式编程——Lambda、Stream API、Optional，Java 8+ 的现代编程风格；⑧分布式系统——微服务、消息队列、分布式锁/事务，从单机到集群的架构演进。建议路径：集合源码 → 并发进阶 → JVM → Spring → 分布式。`,
    tags: ["进阶", "学习路径", "综合"],
  },
];
