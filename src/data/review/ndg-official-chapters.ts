import type { ReviewQuestion } from "./types";

export const ndgOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ndg-official-learning-map-1",
    chapter: "ndg-official-learning-map",
    level: 1,
    question: "《Node.js 权威指南》权威学习地图的核心主张是什么？",
    answer:
      "按原书三部分 16 章重建从运行时、核心模块到数据库、Express、Socket.IO 与综合案例的完整路径。",
    tags: ["《Node.js 权威指南》权威学习地图", "核心机制"],
  },
  {
    id: "ndg-official-learning-map-2",
    chapter: "ndg-official-learning-map",
    level: 2,
    question: "《Node.js 权威指南》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "第1章 Node.js介绍、第2章 Node.js中的交互式运行环境——REPL、第3章 Node.js基础知识、第4章 模块与npm包管理工具、第5章 使用Buffer类处理二进制数据、第6章 在Node.js中操作文件系统、第7章 实现基于TCP与UDP的数据通信、第8章 创建HTTP与HTTPS服务器及客户端、第9章 进程与子进程、第10章 Node.js中的错误处理与断言处理、第11章 加密与压缩、第12章 Node.js中的其他模块、第13章 数据库访问、第14章 使用Express构建Web应用程序、第15章 使用Socket.IO类库实现WebSocket通信、第16章 综合案例介绍",
    tags: ["《Node.js 权威指南》权威学习地图", "目录覆盖"],
  },
  {
    id: "ndg-official-learning-map-3",
    chapter: "ndg-official-learning-map",
    level: 2,
    question: "《Node.js 权威指南》权威学习地图的六阶段执行链是什么？",
    answer:
      "核验2014版身份 → 掌握运行时模块 → 处理二进制文件 → 建立网络进程 → 接入Web数据 → 完成综合案例",
    tags: ["《Node.js 权威指南》权威学习地图", "执行链"],
  },
  {
    id: "ndg-official-learning-map-4",
    chapter: "ndg-official-learning-map",
    level: 3,
    question: "《Node.js 权威指南》权威学习地图为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["《Node.js 权威指南》权威学习地图", "故障注入"],
  },
  {
    id: "ndg-official-learning-map-5",
    chapter: "ndg-official-learning-map",
    level: 3,
    question: "《Node.js 权威指南》权威学习地图签发时保持什么不变量？",
    answer:
      "历史章节身份保持清楚，现代代码替代只作显式对照；每章都有输入、资源、失败和关闭证据。",
    tags: ["《Node.js 权威指南》权威学习地图", "工程验收"],
  },
  {
    id: "ndg-official-learning-map-6",
    chapter: "ndg-official-learning-map",
    level: 3,
    question: "《Node.js 权威指南》权威学习地图怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["《Node.js 权威指南》权威学习地图", "可复现实验"],
  },
  {
    id: "ndg-01-introduction-1",
    chapter: "ndg-01-introduction",
    level: 1,
    question: "第 1 章 Node.js 介绍的核心主张是什么？",
    answer:
      "从事件驱动、非阻塞 I/O 与模块边界理解 Node.js 的适用场景，完成可重复安装和最小服务器闭环。",
    tags: ["第 1 章 Node.js 介绍", "核心机制"],
  },
  {
    id: "ndg-01-introduction-2",
    chapter: "ndg-01-introduction",
    level: 2,
    question: "第 1 章 Node.js 介绍覆盖哪些权威目录条目？",
    answer:
      "第1章 Node.js介绍、1.1 Node.js概述、1.2 安装Node.js、1.3 Node.js中的模块、1.4 一个简单的示例应用程序、1.5 小结",
    tags: ["第 1 章 Node.js 介绍", "目录覆盖"],
  },
  {
    id: "ndg-01-introduction-3",
    chapter: "ndg-01-introduction",
    level: 2,
    question: "第 1 章 Node.js 介绍的六阶段执行链是什么？",
    answer:
      "确认运行时 → 固定版本 → 加载模块 → 注册处理器 → 启动服务 → 关闭并复盘",
    tags: ["第 1 章 Node.js 介绍", "执行链"],
  },
  {
    id: "ndg-01-introduction-4",
    chapter: "ndg-01-introduction",
    level: 3,
    question: "第 1 章 Node.js 介绍为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 1 章 Node.js 介绍", "故障注入"],
  },
  {
    id: "ndg-01-introduction-5",
    chapter: "ndg-01-introduction",
    level: 3,
    question: "第 1 章 Node.js 介绍签发时保持什么不变量？",
    answer:
      "同一 Node 版本、入口文件和端口配置应产生可复现服务，启动失败与关闭路径都能观察。",
    tags: ["第 1 章 Node.js 介绍", "工程验收"],
  },
  {
    id: "ndg-01-introduction-6",
    chapter: "ndg-01-introduction",
    level: 3,
    question: "第 1 章 Node.js 介绍怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 1 章 Node.js 介绍", "可复现实验"],
  },
  {
    id: "ndg-02-repl-1",
    chapter: "ndg-02-repl",
    level: 1,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL的核心主张是什么？",
    answer:
      "把 REPL 当作带持久上下文的快速实验台，区分表达式结果、上下文状态、异步资源和退出清理。",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "核心机制"],
  },
  {
    id: "ndg-02-repl-2",
    chapter: "ndg-02-repl",
    level: 2,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL覆盖哪些权威目录条目？",
    answer:
      "第2章 Node.js中的交互式运行环境——REPL、2.1 REPL运行环境概述、2.2 在REPL运行环境中操作变量、2.3 在REPL运行环境中使用下划线字符、2.4 在REPL运行环境中直接运行函数、2.5 在REPL运行环境中定义并启动服务器、2.6 REPL运行环境中的上下文对象、2.7 REPL运行环境中的基础命令、2.8 小结",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "目录覆盖"],
  },
  {
    id: "ndg-02-repl-3",
    chapter: "ndg-02-repl",
    level: 2,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL的六阶段执行链是什么？",
    answer:
      "启动会话 → 声明状态 → 执行表达式 → 检查上下文 → 管理资源 → 退出清理",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "执行链"],
  },
  {
    id: "ndg-02-repl-4",
    chapter: "ndg-02-repl",
    level: 3,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "故障注入"],
  },
  {
    id: "ndg-02-repl-5",
    chapter: "ndg-02-repl",
    level: 3,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL签发时保持什么不变量？",
    answer:
      "每次实验都能说明变量存放位置、上次结果含义、打开的资源以及退出后是否真正释放。",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "工程验收"],
  },
  {
    id: "ndg-02-repl-6",
    chapter: "ndg-02-repl",
    level: 3,
    question: "第 2 章 Node.js 中的交互式运行环境 REPL怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 2 章 Node.js 中的交互式运行环境 REPL", "可复现实验"],
  },
  {
    id: "ndg-03-foundations-1",
    chapter: "ndg-03-foundations",
    level: 1,
    question: "第 3 章 Node.js 基础知识的核心主张是什么？",
    answer:
      "连接控制台、全局对象、模块路径、事件发射和事件循环，建立从调用栈到异步回调的运行时观察链。",
    tags: ["第 3 章 Node.js 基础知识", "核心机制"],
  },
  {
    id: "ndg-03-foundations-2",
    chapter: "ndg-03-foundations",
    level: 2,
    question: "第 3 章 Node.js 基础知识覆盖哪些权威目录条目？",
    answer:
      "第3章 Node.js基础知识、3.1 Node.js中的控制台、3.2 Node.js中的全局作用域及全局函数、3.3 __filename变量与__dirname变量、3.4 事件处理机制及事件环机制、3.5 在Node.js中使用调试器、3.6 小结",
    tags: ["第 3 章 Node.js 基础知识", "目录覆盖"],
  },
  {
    id: "ndg-03-foundations-3",
    chapter: "ndg-03-foundations",
    level: 2,
    question: "第 3 章 Node.js 基础知识的六阶段执行链是什么？",
    answer:
      "定位入口 → 记录上下文 → 注册事件 → 排队异步任务 → 观察循环 → 调试退出",
    tags: ["第 3 章 Node.js 基础知识", "执行链"],
  },
  {
    id: "ndg-03-foundations-4",
    chapter: "ndg-03-foundations",
    level: 3,
    question: "第 3 章 Node.js 基础知识为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 3 章 Node.js 基础知识", "故障注入"],
  },
  {
    id: "ndg-03-foundations-5",
    chapter: "ndg-03-foundations",
    level: 3,
    question: "第 3 章 Node.js 基础知识签发时保持什么不变量？",
    answer:
      "日志时间、事件注册、队列顺序和模块路径必须能从运行时阶段解释，不能靠输出偶然顺序猜测。",
    tags: ["第 3 章 Node.js 基础知识", "工程验收"],
  },
  {
    id: "ndg-03-foundations-6",
    chapter: "ndg-03-foundations",
    level: 3,
    question: "第 3 章 Node.js 基础知识怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 3 章 Node.js 基础知识", "可复现实验"],
  },
  {
    id: "ndg-04-modules-npm-1",
    chapter: "ndg-04-modules-npm",
    level: 1,
    question: "第 4 章 模块与 npm 包管理工具的核心主张是什么？",
    answer:
      "明确核心模块、文件模块、导出表、解析缓存和包元数据的职责，避免把安装成功等同于依赖可复现。",
    tags: ["第 4 章 模块与 npm 包管理工具", "核心机制"],
  },
  {
    id: "ndg-04-modules-npm-2",
    chapter: "ndg-04-modules-npm",
    level: 2,
    question: "第 4 章 模块与 npm 包管理工具覆盖哪些权威目录条目？",
    answer:
      "第4章 模块与npm包管理工具、4.1 核心模块与文件模块、4.2 从模块外部访问模块内的成员、4.3 组织与管理模块、4.4 模块对象的属性、4.5 包与npm包管理工具、4.6 小结",
    tags: ["第 4 章 模块与 npm 包管理工具", "目录覆盖"],
  },
  {
    id: "ndg-04-modules-npm-3",
    chapter: "ndg-04-modules-npm",
    level: 2,
    question: "第 4 章 模块与 npm 包管理工具的六阶段执行链是什么？",
    answer:
      "辨认模块类型 → 解析标识符 → 执行模块 → 冻结导出契约 → 锁定依赖 → 验证干净安装",
    tags: ["第 4 章 模块与 npm 包管理工具", "执行链"],
  },
  {
    id: "ndg-04-modules-npm-4",
    chapter: "ndg-04-modules-npm",
    level: 3,
    question: "第 4 章 模块与 npm 包管理工具为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 4 章 模块与 npm 包管理工具", "故障注入"],
  },
  {
    id: "ndg-04-modules-npm-5",
    chapter: "ndg-04-modules-npm",
    level: 3,
    question: "第 4 章 模块与 npm 包管理工具签发时保持什么不变量？",
    answer:
      "公开导出、解析入口和依赖版本应明确，清空安装目录后仍能由锁文件重建同一依赖图。",
    tags: ["第 4 章 模块与 npm 包管理工具", "工程验收"],
  },
  {
    id: "ndg-04-modules-npm-6",
    chapter: "ndg-04-modules-npm",
    level: 3,
    question: "第 4 章 模块与 npm 包管理工具怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 4 章 模块与 npm 包管理工具", "可复现实验"],
  },
  {
    id: "ndg-05-buffer-binary-1",
    chapter: "ndg-05-buffer-binary",
    level: 1,
    question: "第 5 章 使用 Buffer 类处理二进制数据的核心主张是什么？",
    answer:
      "区分字符、编码后字节和缓冲区容量，用显式编码与端序完成字符串、数值、JSON 和复制边界。",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "核心机制"],
  },
  {
    id: "ndg-05-buffer-binary-2",
    chapter: "ndg-05-buffer-binary",
    level: 2,
    question: "第 5 章 使用 Buffer 类处理二进制数据覆盖哪些权威目录条目？",
    answer:
      "第5章 使用Buffer类处理二进制数据、5.1 创建Buffer对象、5.2 字符串的长度与缓存区的长度、5.3 Buffer对象与字符串对象之间的相互转换、5.4 Buffer对象与数值对象之间的相互转换、5.5 Buffer对象与JSON对象之间的相互转换、5.6 复制缓存数据、5.7 Buffer类的类方法、5.8 小结",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "目录覆盖"],
  },
  {
    id: "ndg-05-buffer-binary-3",
    chapter: "ndg-05-buffer-binary",
    level: 2,
    question: "第 5 章 使用 Buffer 类处理二进制数据的六阶段执行链是什么？",
    answer:
      "声明编码 → 计算字节数 → 分配缓冲区 → 读写字段 → 验证边界 → 释放引用",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "执行链"],
  },
  {
    id: "ndg-05-buffer-binary-4",
    chapter: "ndg-05-buffer-binary",
    level: 3,
    question: "第 5 章 使用 Buffer 类处理二进制数据为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "故障注入"],
  },
  {
    id: "ndg-05-buffer-binary-5",
    chapter: "ndg-05-buffer-binary",
    level: 3,
    question: "第 5 章 使用 Buffer 类处理二进制数据签发时保持什么不变量？",
    answer:
      "字符长度与字节长度不混用，分配、读写偏移和端序都有边界证据，不使用不安全的旧 Buffer 构造方式。",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "工程验收"],
  },
  {
    id: "ndg-05-buffer-binary-6",
    chapter: "ndg-05-buffer-binary",
    level: 3,
    question: "第 5 章 使用 Buffer 类处理二进制数据怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 5 章 使用 Buffer 类处理二进制数据", "可复现实验"],
  },
  {
    id: "ndg-06-filesystem-1",
    chapter: "ndg-06-filesystem",
    level: 1,
    question: "第 6 章 在 Node.js 中操作文件系统的核心主张是什么？",
    answer:
      "围绕路径解析、文件描述符、原子替换、元数据和流式背压组织文件 I/O，并把不存在、权限和部分写入当成正常分支。",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "核心机制"],
  },
  {
    id: "ndg-06-filesystem-2",
    chapter: "ndg-06-filesystem",
    level: 2,
    question: "第 6 章 在 Node.js 中操作文件系统覆盖哪些权威目录条目？",
    answer:
      "第6章 在Node.js中操作文件系统、6.1 同步方法与异步方法、6.2 对文件执行读写操作、6.3 创建与读取目录、6.4 查看与修改文件或目录的信息、6.5 可以对文件或目录执行的其他操作、6.6 使用文件流、6.7 对路径进行操作、6.8 小结",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "目录覆盖"],
  },
  {
    id: "ndg-06-filesystem-3",
    chapter: "ndg-06-filesystem",
    level: 2,
    question: "第 6 章 在 Node.js 中操作文件系统的六阶段执行链是什么？",
    answer:
      "规范化路径 → 选择同步边界 → 打开资源 → 读写或管道 → 提交原子结果 → 关闭并核验",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "执行链"],
  },
  {
    id: "ndg-06-filesystem-4",
    chapter: "ndg-06-filesystem",
    level: 3,
    question: "第 6 章 在 Node.js 中操作文件系统为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "故障注入"],
  },
  {
    id: "ndg-06-filesystem-5",
    chapter: "ndg-06-filesystem",
    level: 3,
    question: "第 6 章 在 Node.js 中操作文件系统签发时保持什么不变量？",
    answer:
      "路径根、资源关闭、部分失败与提交边界都明确；大文件不因一次性读入导致内存随输入线性失控。",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "工程验收"],
  },
  {
    id: "ndg-06-filesystem-6",
    chapter: "ndg-06-filesystem",
    level: 3,
    question: "第 6 章 在 Node.js 中操作文件系统怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 6 章 在 Node.js 中操作文件系统", "可复现实验"],
  },
  {
    id: "ndg-07-tcp-udp-1",
    chapter: "ndg-07-tcp-udp",
    level: 1,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信的核心主张是什么？",
    answer:
      "区分 TCP 字节流与 UDP 数据报语义，为 TCP 自定义分帧，为 UDP 处理丢包、乱序和消息大小边界。",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "核心机制"],
  },
  {
    id: "ndg-07-tcp-udp-2",
    chapter: "ndg-07-tcp-udp",
    level: 2,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信覆盖哪些权威目录条目？",
    answer:
      "第7章 实现基于TCP与UDP的数据通信、7.1 使用net模块实现基于TCP的数据通信、7.2 使用dgram模块实现基于UDP的数据通信、7.3 小结",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "目录覆盖"],
  },
  {
    id: "ndg-07-tcp-udp-3",
    chapter: "ndg-07-tcp-udp",
    level: 2,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信的六阶段执行链是什么？",
    answer:
      "绑定地址 → 建立会话 → 接收字节或报文 → 解析协议帧 → 施加流量控制 → 关闭套接字",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "执行链"],
  },
  {
    id: "ndg-07-tcp-udp-4",
    chapter: "ndg-07-tcp-udp",
    level: 3,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "故障注入"],
  },
  {
    id: "ndg-07-tcp-udp-5",
    chapter: "ndg-07-tcp-udp",
    level: 3,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信签发时保持什么不变量？",
    answer:
      "消息边界、超时、背压、错误与关闭顺序可复现；不能把一次 data 回调误当成一个完整 TCP 消息。",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "工程验收"],
  },
  {
    id: "ndg-07-tcp-udp-6",
    chapter: "ndg-07-tcp-udp",
    level: 3,
    question: "第 7 章 实现基于 TCP 与 UDP 的数据通信怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 7 章 实现基于 TCP 与 UDP 的数据通信", "可复现实验"],
  },
  {
    id: "ndg-08-http-https-1",
    chapter: "ndg-08-http-https",
    level: 1,
    question: "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端的核心主张是什么？",
    answer:
      "把请求方法、目标、头、消息体、响应提交和 TLS 信任链作为完整协议事务，处理超时、取消和流式背压。",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "核心机制"],
  },
  {
    id: "ndg-08-http-https-2",
    chapter: "ndg-08-http-https",
    level: 2,
    question: "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端覆盖哪些权威目录条目？",
    answer:
      "第8章 创建HTTP与HTTPS服务器及客户端、8.1 HTTP服务器、8.2 HTTP客户端、8.3 创建HTTPS服务器与客户端、8.4 小结",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "目录覆盖"],
  },
  {
    id: "ndg-08-http-https-3",
    chapter: "ndg-08-http-https",
    level: 2,
    question: "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端的六阶段执行链是什么？",
    answer: "接受连接 → 解析请求 → 限制消息体 → 执行业务 → 提交响应 → 超时关闭",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "执行链"],
  },
  {
    id: "ndg-08-http-https-4",
    chapter: "ndg-08-http-https",
    level: 3,
    question:
      "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "故障注入"],
  },
  {
    id: "ndg-08-http-https-5",
    chapter: "ndg-08-http-https",
    level: 3,
    question: "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端签发时保持什么不变量？",
    answer:
      "每条请求只提交一次响应，消息体、超时和证书校验有上限与失败分支，连接关闭不丢未处理错误。",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "工程验收"],
  },
  {
    id: "ndg-08-http-https-6",
    chapter: "ndg-08-http-https",
    level: 3,
    question: "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 8 章 创建 HTTP 与 HTTPS 服务器及客户端", "可复现实验"],
  },
  {
    id: "ndg-09-process-child-process-1",
    chapter: "ndg-09-process-child-process",
    level: 1,
    question: "第 9 章 进程与子进程的核心主张是什么？",
    answer:
      "区分进程身份、环境、标准流、IPC 与退出码，用受控子进程隔离 CPU 或外部命令，并完成信号驱动的优雅关闭。",
    tags: ["第 9 章 进程与子进程", "核心机制"],
  },
  {
    id: "ndg-09-process-child-process-2",
    chapter: "ndg-09-process-child-process",
    level: 2,
    question: "第 9 章 进程与子进程覆盖哪些权威目录条目？",
    answer:
      "第9章 进程与子进程、9.1 Node.js中的进程、9.2 创建多进程应用程序、9.3 在多个子进程中运行Node.js应用程序、9.4 小结",
    tags: ["第 9 章 进程与子进程", "目录覆盖"],
  },
  {
    id: "ndg-09-process-child-process-3",
    chapter: "ndg-09-process-child-process",
    level: 2,
    question: "第 9 章 进程与子进程的六阶段执行链是什么？",
    answer:
      "定义进程角色 → 冻结参数环境 → 创建子进程 → 交换消息 → 传播失败 → 等待退出",
    tags: ["第 9 章 进程与子进程", "执行链"],
  },
  {
    id: "ndg-09-process-child-process-4",
    chapter: "ndg-09-process-child-process",
    level: 3,
    question: "第 9 章 进程与子进程为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 9 章 进程与子进程", "故障注入"],
  },
  {
    id: "ndg-09-process-child-process-5",
    chapter: "ndg-09-process-child-process",
    level: 3,
    question: "第 9 章 进程与子进程签发时保持什么不变量？",
    answer:
      "命令参数不经 shell 拼接，标准流有消费方，父子失败与信号能传播，退出码决定任务是否成功。",
    tags: ["第 9 章 进程与子进程", "工程验收"],
  },
  {
    id: "ndg-09-process-child-process-6",
    chapter: "ndg-09-process-child-process",
    level: 3,
    question: "第 9 章 进程与子进程怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 9 章 进程与子进程", "可复现实验"],
  },
  {
    id: "ndg-10-errors-assertions-1",
    chapter: "ndg-10-errors-assertions",
    level: 1,
    question: "第 10 章 Node.js 中的错误处理与断言处理的核心主张是什么？",
    answer:
      "把同步抛出、Promise 拒绝、回调错误和进程级失败分层处理；保留 domain 的历史语义，同时采用显式异步边界。",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "核心机制"],
  },
  {
    id: "ndg-10-errors-assertions-2",
    chapter: "ndg-10-errors-assertions",
    level: 2,
    question: "第 10 章 Node.js 中的错误处理与断言处理覆盖哪些权威目录条目？",
    answer:
      "第10章 Node.js中的错误处理与断言处理、10.1 使用domain模块处理错误、10.2 Node.js中的断言处理、10.3 小结",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "目录覆盖"],
  },
  {
    id: "ndg-10-errors-assertions-3",
    chapter: "ndg-10-errors-assertions",
    level: 2,
    question: "第 10 章 Node.js 中的错误处理与断言处理的六阶段执行链是什么？",
    answer:
      "划定错误边界 → 分类错误 → 附加上下文 → 传播或恢复 → 断言不变量 → 决定进程命运",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "执行链"],
  },
  {
    id: "ndg-10-errors-assertions-4",
    chapter: "ndg-10-errors-assertions",
    level: 3,
    question: "第 10 章 Node.js 中的错误处理与断言处理为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "故障注入"],
  },
  {
    id: "ndg-10-errors-assertions-5",
    chapter: "ndg-10-errors-assertions",
    level: 3,
    question: "第 10 章 Node.js 中的错误处理与断言处理签发时保持什么不变量？",
    answer:
      "可恢复错误在拥有上下文的边界处理，程序员不变量用断言暴露；废弃 domain 不作为现代新代码的隐式兜底。",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "工程验收"],
  },
  {
    id: "ndg-10-errors-assertions-6",
    chapter: "ndg-10-errors-assertions",
    level: 3,
    question: "第 10 章 Node.js 中的错误处理与断言处理怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 10 章 Node.js 中的错误处理与断言处理", "可复现实验"],
  },
  {
    id: "ndg-11-crypto-compression-1",
    chapter: "ndg-11-crypto-compression",
    level: 1,
    question: "第 11 章 加密与压缩的核心主张是什么？",
    answer:
      "区分哈希、认证加密、密钥派生和传输压缩，以算法参数、随机数、认证标签和解压上限建立安全边界。",
    tags: ["第 11 章 加密与压缩", "核心机制"],
  },
  {
    id: "ndg-11-crypto-compression-2",
    chapter: "ndg-11-crypto-compression",
    level: 2,
    question: "第 11 章 加密与压缩覆盖哪些权威目录条目？",
    answer:
      "第11章 加密与压缩、11.1 加密与解密处理、11.2 压缩与解压缩处理、11.3 小结",
    tags: ["第 11 章 加密与压缩", "目录覆盖"],
  },
  {
    id: "ndg-11-crypto-compression-3",
    chapter: "ndg-11-crypto-compression",
    level: 2,
    question: "第 11 章 加密与压缩的六阶段执行链是什么？",
    answer:
      "定义安全目标 → 选择原语 → 生成随机材料 → 流式处理 → 验证完整性 → 清理敏感数据",
    tags: ["第 11 章 加密与压缩", "执行链"],
  },
  {
    id: "ndg-11-crypto-compression-4",
    chapter: "ndg-11-crypto-compression",
    level: 3,
    question: "第 11 章 加密与压缩为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 11 章 加密与压缩", "故障注入"],
  },
  {
    id: "ndg-11-crypto-compression-5",
    chapter: "ndg-11-crypto-compression",
    level: 3,
    question: "第 11 章 加密与压缩签发时保持什么不变量？",
    answer:
      "算法用途、密钥与随机数来源、完整性验证和资源上限清楚；压缩不能在未设上限时处理不可信巨量输入。",
    tags: ["第 11 章 加密与压缩", "工程验收"],
  },
  {
    id: "ndg-11-crypto-compression-6",
    chapter: "ndg-11-crypto-compression",
    level: 3,
    question: "第 11 章 加密与压缩怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 11 章 加密与压缩", "可复现实验"],
  },
  {
    id: "ndg-12-other-modules-1",
    chapter: "ndg-12-other-modules",
    level: 1,
    question: "第 12 章 Node.js 中的其他模块的核心主张是什么？",
    answer:
      "按 DNS、国际化域名、操作系统、逐行输入、工具函数、脚本上下文和自定义 REPL 的真实边界选择标准模块。",
    tags: ["第 12 章 Node.js 中的其他模块", "核心机制"],
  },
  {
    id: "ndg-12-other-modules-2",
    chapter: "ndg-12-other-modules",
    level: 2,
    question: "第 12 章 Node.js 中的其他模块覆盖哪些权威目录条目？",
    answer:
      "第12章 Node.js中的其他模块、12.1 使用dns模块解析域名、12.2 使用punycode模块转换punycode编码、12.3 使用os模块获取操作系统信息、12.4 使用readline模块逐行读取流数据、12.5 使用util模块中提供的一些实用方法、12.6 使用vm模块改变脚本运行环境、12.7 自定义REPL运行环境、12.8 小结",
    tags: ["第 12 章 Node.js 中的其他模块", "目录覆盖"],
  },
  {
    id: "ndg-12-other-modules-3",
    chapter: "ndg-12-other-modules",
    level: 2,
    question: "第 12 章 Node.js 中的其他模块的六阶段执行链是什么？",
    answer:
      "定义系统问题 → 选择核心模块 → 约束输入 → 执行异步操作 → 核对平台差异 → 关闭资源",
    tags: ["第 12 章 Node.js 中的其他模块", "执行链"],
  },
  {
    id: "ndg-12-other-modules-4",
    chapter: "ndg-12-other-modules",
    level: 3,
    question: "第 12 章 Node.js 中的其他模块为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 12 章 Node.js 中的其他模块", "故障注入"],
  },
  {
    id: "ndg-12-other-modules-5",
    chapter: "ndg-12-other-modules",
    level: 3,
    question: "第 12 章 Node.js 中的其他模块签发时保持什么不变量？",
    answer:
      "模块选择匹配系统语义，平台差异和输入上限明确；punycode 历史 API 与 vm 非安全沙箱属性必须披露。",
    tags: ["第 12 章 Node.js 中的其他模块", "工程验收"],
  },
  {
    id: "ndg-12-other-modules-6",
    chapter: "ndg-12-other-modules",
    level: 3,
    question: "第 12 章 Node.js 中的其他模块怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 12 章 Node.js 中的其他模块", "可复现实验"],
  },
  {
    id: "ndg-13-database-access-1",
    chapter: "ndg-13-database-access",
    level: 1,
    question: "第 13 章 数据库访问的核心主张是什么？",
    answer:
      "比较 MongoDB 文档操作与 MySQL 关系事务，统一处理连接池、参数化、索引、超时、提交和回滚。",
    tags: ["第 13 章 数据库访问", "核心机制"],
  },
  {
    id: "ndg-13-database-access-2",
    chapter: "ndg-13-database-access",
    level: 2,
    question: "第 13 章 数据库访问覆盖哪些权威目录条目？",
    answer:
      "第13章 数据库访问、13.1 在MongoDB数据库中存取数据、13.2 在MySQL数据库中存取数据、13.3 小结",
    tags: ["第 13 章 数据库访问", "目录覆盖"],
  },
  {
    id: "ndg-13-database-access-3",
    chapter: "ndg-13-database-access",
    level: 2,
    question: "第 13 章 数据库访问的六阶段执行链是什么？",
    answer:
      "定义数据契约 → 获取连接 → 参数化查询 → 检查结果 → 提交或回滚 → 归还连接",
    tags: ["第 13 章 数据库访问", "执行链"],
  },
  {
    id: "ndg-13-database-access-4",
    chapter: "ndg-13-database-access",
    level: 3,
    question: "第 13 章 数据库访问为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 13 章 数据库访问", "故障注入"],
  },
  {
    id: "ndg-13-database-access-5",
    chapter: "ndg-13-database-access",
    level: 3,
    question: "第 13 章 数据库访问签发时保持什么不变量？",
    answer:
      "查询参数不拼接、连接必归还、写入边界有事务或幂等策略，超时与重复请求不会悄悄破坏数据。",
    tags: ["第 13 章 数据库访问", "工程验收"],
  },
  {
    id: "ndg-13-database-access-6",
    chapter: "ndg-13-database-access",
    level: 3,
    question: "第 13 章 数据库访问怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 13 章 数据库访问", "可复现实验"],
  },
  {
    id: "ndg-14-express-web-apps-1",
    chapter: "ndg-14-express-web-apps",
    level: 1,
    question: "第 14 章 使用 Express 构建 Web 应用程序的核心主张是什么？",
    answer:
      "把 Express 请求依次通过解析、验证、认证、路由、业务、渲染和错误中间件，确保一次请求只产生一次响应。",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "核心机制"],
  },
  {
    id: "ndg-14-express-web-apps-2",
    chapter: "ndg-14-express-web-apps",
    level: 2,
    question: "第 14 章 使用 Express 构建 Web 应用程序覆盖哪些权威目录条目？",
    answer:
      "第14章 使用Express构建Web应用程序、14.1 Express概述、14.2 设置路由、14.3 使用各种提交数据或请求数据的方法、14.4 中间件、14.5 模板引擎、14.6 小结",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "目录覆盖"],
  },
  {
    id: "ndg-14-express-web-apps-3",
    chapter: "ndg-14-express-web-apps",
    level: 2,
    question: "第 14 章 使用 Express 构建 Web 应用程序的六阶段执行链是什么？",
    answer: "创建应用 → 注册中间件 → 匹配路由 → 验证输入 → 执行业务 → 错误收口",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "执行链"],
  },
  {
    id: "ndg-14-express-web-apps-4",
    chapter: "ndg-14-express-web-apps",
    level: 3,
    question: "第 14 章 使用 Express 构建 Web 应用程序为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "故障注入"],
  },
  {
    id: "ndg-14-express-web-apps-5",
    chapter: "ndg-14-express-web-apps",
    level: 3,
    question: "第 14 章 使用 Express 构建 Web 应用程序签发时保持什么不变量？",
    answer:
      "中间件顺序、输入上限、路由责任和错误出口明确，旧版 Express 示例需与当前主版本 API 分开说明。",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "工程验收"],
  },
  {
    id: "ndg-14-express-web-apps-6",
    chapter: "ndg-14-express-web-apps",
    level: 3,
    question: "第 14 章 使用 Express 构建 Web 应用程序怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 14 章 使用 Express 构建 Web 应用程序", "可复现实验"],
  },
  {
    id: "ndg-15-socketio-websocket-1",
    chapter: "ndg-15-socketio-websocket",
    level: 1,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信的核心主张是什么？",
    answer:
      "围绕连接、事件协议、确认、房间或命名空间、广播和断线清理组织实时通信，并区分 Socket.IO 与原生 WebSocket。",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "核心机制"],
  },
  {
    id: "ndg-15-socketio-websocket-2",
    chapter: "ndg-15-socketio-websocket",
    level: 2,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信覆盖哪些权威目录条目？",
    answer:
      "第15章 使用Socket.IO类库实现WebSocket通信、15.1 Socket.IO概述、15.2 Socket.IO的使用方法、15.3 在Express框架中使用Socket.IO、15.4 在服务器端保存用户数据、15.5 广播消息、15.6 使用命名空间、15.7 小结",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "目录覆盖"],
  },
  {
    id: "ndg-15-socketio-websocket-3",
    chapter: "ndg-15-socketio-websocket",
    level: 2,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信的六阶段执行链是什么？",
    answer: "升级连接 → 认证会话 → 注册事件 → 校验消息 → 广播或确认 → 断线清理",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "执行链"],
  },
  {
    id: "ndg-15-socketio-websocket-4",
    chapter: "ndg-15-socketio-websocket",
    level: 3,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "故障注入"],
  },
  {
    id: "ndg-15-socketio-websocket-5",
    chapter: "ndg-15-socketio-websocket",
    level: 3,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信签发时保持什么不变量？",
    answer:
      "事件名和载荷有版本契约，认证、确认、广播范围与断线清理明确，不把 Socket.IO 协议误称为裸 WebSocket。",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "工程验收"],
  },
  {
    id: "ndg-15-socketio-websocket-6",
    chapter: "ndg-15-socketio-websocket",
    level: 3,
    question:
      "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 15 章 使用 Socket.IO 类库实现 WebSocket 通信", "可复现实验"],
  },
  {
    id: "ndg-16-integrated-cases-1",
    chapter: "ndg-16-integrated-cases",
    level: 1,
    question: "第 16 章 综合案例介绍的核心主张是什么？",
    answer:
      "把聊天室和 Web 应用拆成协议、路由、状态、持久化、模板、错误和关闭边界，形成从需求到证据的端到端案例。",
    tags: ["第 16 章 综合案例介绍", "核心机制"],
  },
  {
    id: "ndg-16-integrated-cases-2",
    chapter: "ndg-16-integrated-cases",
    level: 2,
    question: "第 16 章 综合案例介绍覆盖哪些权威目录条目？",
    answer:
      "第16章 综合案例介绍、16.1 创建简单聊天室应用程序、16.2 创建Web应用程序、16.3 小结",
    tags: ["第 16 章 综合案例介绍", "目录覆盖"],
  },
  {
    id: "ndg-16-integrated-cases-3",
    chapter: "ndg-16-integrated-cases",
    level: 2,
    question: "第 16 章 综合案例介绍的六阶段执行链是什么？",
    answer:
      "拆分需求 → 定义协议路由 → 实现状态存取 → 连接实时通道 → 注入故障 → 端到端验收",
    tags: ["第 16 章 综合案例介绍", "执行链"],
  },
  {
    id: "ndg-16-integrated-cases-4",
    chapter: "ndg-16-integrated-cases",
    level: 3,
    question: "第 16 章 综合案例介绍为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["第 16 章 综合案例介绍", "故障注入"],
  },
  {
    id: "ndg-16-integrated-cases-5",
    chapter: "ndg-16-integrated-cases",
    level: 3,
    question: "第 16 章 综合案例介绍签发时保持什么不变量？",
    answer:
      "聊天室与 Web 请求共享清楚的数据契约，异常、重连、重复提交和部署关闭都能在端到端测试中复现。",
    tags: ["第 16 章 综合案例介绍", "工程验收"],
  },
  {
    id: "ndg-16-integrated-cases-6",
    chapter: "ndg-16-integrated-cases",
    level: 3,
    question: "第 16 章 综合案例介绍怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["第 16 章 综合案例介绍", "可复现实验"],
  },
  {
    id: "ndg-official-final-review-1",
    chapter: "ndg-official-final-review",
    level: 1,
    question: "《Node.js 权威指南》全书总复习的核心主张是什么？",
    answer:
      "以一次实时 Web 请求串联模块加载、Buffer、文件、网络、进程、错误、加密压缩、数据库、Express 与 Socket.IO。",
    tags: ["《Node.js 权威指南》全书总复习", "核心机制"],
  },
  {
    id: "ndg-official-final-review-2",
    chapter: "ndg-official-final-review",
    level: 2,
    question: "《Node.js 权威指南》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 Node.js介绍、第2章 Node.js中的交互式运行环境——REPL、第3章 Node.js基础知识、第4章 模块与npm包管理工具、第5章 使用Buffer类处理二进制数据、第6章 在Node.js中操作文件系统、第7章 实现基于TCP与UDP的数据通信、第8章 创建HTTP与HTTPS服务器及客户端、第9章 进程与子进程、第10章 Node.js中的错误处理与断言处理、第11章 加密与压缩、第12章 Node.js中的其他模块、第13章 数据库访问、第14章 使用Express构建Web应用程序、第15章 使用Socket.IO类库实现WebSocket通信、第16章 综合案例介绍",
    tags: ["《Node.js 权威指南》全书总复习", "目录覆盖"],
  },
  {
    id: "ndg-official-final-review-3",
    chapter: "ndg-official-final-review",
    level: 2,
    question: "《Node.js 权威指南》全书总复习的六阶段执行链是什么？",
    answer:
      "接收输入 → 验证与解码 → 执行业务I/O → 提交响应事件 → 传播错误信号 → 排空资源退出",
    tags: ["《Node.js 权威指南》全书总复习", "执行链"],
  },
  {
    id: "ndg-official-final-review-4",
    chapter: "ndg-official-final-review",
    level: 3,
    question: "《Node.js 权威指南》全书总复习为什么不能只看成功输出？",
    answer:
      "成功输出不显示调度顺序、背压、错误出口、资源所有权、关闭状态与版本差异，必须重放故障和恢复样本。",
    tags: ["《Node.js 权威指南》全书总复习", "故障注入"],
  },
  {
    id: "ndg-official-final-review-5",
    chapter: "ndg-official-final-review",
    level: 3,
    question: "《Node.js 权威指南》全书总复习签发时保持什么不变量？",
    answer:
      "任一请求都能追踪到资源所有者与终止状态；故障后没有悬挂套接字、未归还连接或重复响应。",
    tags: ["《Node.js 权威指南》全书总复习", "工程验收"],
  },
  {
    id: "ndg-official-final-review-6",
    chapter: "ndg-official-final-review",
    level: 3,
    question: "《Node.js 权威指南》全书总复习怎样完成可复现实验？",
    answer:
      "固定 Node 版本、入口、环境和输入，每次只改变一个超时、断线、权限、背压或版本条件，记录首个偏离点并等待资源关闭。",
    tags: ["《Node.js 权威指南》全书总复习", "可复现实验"],
  },
];
