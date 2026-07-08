import type { ReviewQuestion } from "./types";

export const hfjLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "hfj-lm-1",
    chapter: "hfj-learning-map",
    level: 2,
    question: "《Head First Java》全书的知识递进结构是什么？为什么是这个顺序？",
    answer:
      "全书分为五个递进阶段：①Java入门与OOP基础（变量/类/对象/方法）→ ②核心API与继承多态（集合框架/继承/多态/接口）→ ③Swing GUI与事件处理（窗口/组件/监听器/事件队列）→ ④并发与网络编程（线程/synchronized/Socket）→ ⑤全书复习。顺序由依赖关系决定：先掌握基本语法和面向对象思维，再学习标准库集合和继承多态机制；GUI需要类设计和API基础；事件处理依赖GUI组件；并发需要理解对象和线程生命周期；网络编程需要并发基础来处理多客户端。先「会写代码」，再「会用类库」，然后「能做界面」，接着「能处理交互」，再「能并发」，最后「能网络通信」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "hfj-lm-2",
    chapter: "hfj-learning-map",
    level: 2,
    question: "Java 的「一次编写，到处运行」是什么含义？它是如何实现的？",
    answer:
      "「一次编写，到处运行」是 Java 的核心承诺。实现机制：Java 源码（.java）经过 javac 编译后不是生成特定平台的机器码，而是生成与平台无关的字节码（.class 文件）。字节码是一种中间格式，不能直接被 CPU 执行，需要 JVM（Java虚拟机）来解释或即时编译（JIT）执行。不同操作系统有各自的 JVM 实现（Windows JVM、Linux JVM、macOS JVM），它们负责把同一份字节码翻译成各自平台的机器指令。因此同一份 .class 文件可以在任何安装了 JVM 的平台上运行，实现了跨平台。",
    tags: ["JVM", "字节码", "跨平台"],
  },
  {
    id: "hfj-lm-3",
    chapter: "hfj-learning-map",
    level: 3,
    question: "用「一个聊天室应用」串联全书主要知识点。",
    answer:
      "一个聊天室应用串联全书：①基础语法（第1章）——定义变量、控制流、方法处理消息逻辑；②面向对象（第2章）——设计 Message 类、User 类封装消息和用户信息；③核心API（第3章）——用 ArrayList 管理消息历史，HashMap 管理在线用户；④继承多态（第4章）——抽象 Message 父类，TextMessage/ImageMessage 子类多态处理不同消息类型；⑤Swing GUI（第5章）——JFrame 聊天窗口、JTextArea 消息显示、JTextField 输入框；⑥事件处理（第6章）——按钮点击发送消息的 ActionListener；⑦并发（第7章）——每个客户端连接一个线程，synchronized 保护共享消息列表；⑧网络（第8章）——ServerSocket 接受连接，Socket 收发消息。一个应用，全书知识点全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "hfj-lm-4",
    chapter: "hfj-learning-map",
    level: 4,
    question: "从「单线程控制台程序」到「多线程网络 GUI 应用」的演进路径是什么？每步解决了什么问题？",
    answer:
      "演进路径：①单线程控制台——System.out.println 输出，掌握基本语法但无法交互；②引入类和对象——把逻辑封装到类中，代码有组织但仍只能顺序执行；③引入集合——ArrayList/HashMap 管理多个数据，处理更复杂的数据结构；④引入继承多态——用接口和抽象类设计可扩展架构，新增类型不需改旧代码；⑤引入 GUI——JFrame/JButton 提供可视化交互，但界面操作需响应事件；⑥引入事件处理——ActionListener 响应用户操作，但耗时操作会冻结界面；⑦引入多线程——耗时操作放到后台线程，但多线程共享数据需要同步；⑧引入网络——ServerSocket/Socket 实现远程通信，多客户端需要多线程并发处理。每步解决前一步的局限：语法→组织→数据→扩展→交互→响应→并发→通信。",
    tags: ["架构", "演进路径"],
  },
];
