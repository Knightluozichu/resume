import type { ReviewQuestion } from "./types";

export const hpwOfficialQuestions: ReviewQuestion[] = [
  {
    id: "hpw-official-learning-map-1",
    chapter: "hpw-official-learning-map",
    level: 1,
    question: "《程序是怎样跑起来的》权威学习地图的核心主张是什么？",
    answer:
      "全书沿 CPU、二进制、浮点数、内存、磁盘、压缩、运行环境、编译链接、操作系统、汇编、硬件控制和规则程序逐层下钻，最后用 C 语言把机制变成实验。",
    tags: ["《程序是怎样跑起来的》权威学习地图", "核心机制"],
  },
  {
    id: "hpw-official-learning-map-2",
    chapter: "hpw-official-learning-map",
    level: 2,
    question: "《程序是怎样跑起来的》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "前言、程序是怎样跑起来的——本书中涉及的主要关键词、本书的结构、第1章 对程序员来说CPU是什么、第2章 数据是用二进制数表示的、第3章 计算机进行小数运算时出错的原因、第4章 熟练使用有棱有角的内存、第5章 内存和磁盘的亲密关系、第6章 亲自尝试压缩数据、第7章 程序是在何种环境中运行的、第8章 从源文件到可执行文件、第9章 操作系统和应用的关系、第10章 通过汇编语言了解程序的实际构成、第11章 硬件控制方法、第12章 让计算机“思考”、附录 让我们开始C语言之旅",
    tags: ["《程序是怎样跑起来的》权威学习地图", "目录覆盖"],
  },
  {
    id: "hpw-official-learning-map-3",
    chapter: "hpw-official-learning-map",
    level: 2,
    question: "《程序是怎样跑起来的》权威学习地图的六阶段运行链是什么？",
    answer:
      "核验2015版身份 → 追踪CPU与位 → 组织内存存储 → 构建加载程序 → 调用系统硬件 → 用C语言重放",
    tags: ["《程序是怎样跑起来的》权威学习地图", "运行链"],
  },
  {
    id: "hpw-official-learning-map-4",
    chapter: "hpw-official-learning-map",
    level: 3,
    question:
      "《程序是怎样跑起来的》权威学习地图为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["《程序是怎样跑起来的》权威学习地图", "故障注入"],
  },
  {
    id: "hpw-official-learning-map-5",
    chapter: "hpw-official-learning-map",
    level: 3,
    question: "《程序是怎样跑起来的》权威学习地图签发时保持什么不变量？",
    answer:
      "12章、1个附录和118个公开目录条目都有归属；源码、机器状态、存储、操作系统与硬件之间的每个转换都可观察和重放。",
    tags: ["《程序是怎样跑起来的》权威学习地图", "工程验收"],
  },
  {
    id: "hpw-official-learning-map-6",
    chapter: "hpw-official-learning-map",
    level: 3,
    question: "《程序是怎样跑起来的》权威学习地图怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["《程序是怎样跑起来的》权威学习地图", "恢复实验"],
  },
  {
    id: "hpw-01-cpu-1",
    chapter: "hpw-01-cpu",
    level: 1,
    question: "第 1 章 对程序员来说CPU是什么的核心主张是什么？",
    answer:
      "CPU 是寄存器和运算控制电路组成的状态机：程序计数器选择下一条指令，通用寄存器保存操作数，栈相关寄存器支撑函数调用，条件码决定分支和循环。",
    tags: ["第 1 章 对程序员来说CPU是什么", "核心机制"],
  },
  {
    id: "hpw-01-cpu-2",
    chapter: "hpw-01-cpu",
    level: 2,
    question: "第 1 章 对程序员来说CPU是什么覆盖哪些权威目录条目？",
    answer:
      "第1章 对程序员来说CPU是什么、1.1 CPU的内部结构解析、1.2 CPU是寄存器的集合体、1.3 决定程序流程的程序计数器、1.4 条件分支和循环机制、1.5 函数的调用机制、1.6 通过地址和索引实现数组、1.7 CPU的处理其实很简单",
    tags: ["第 1 章 对程序员来说CPU是什么", "目录覆盖"],
  },
  {
    id: "hpw-01-cpu-3",
    chapter: "hpw-01-cpu",
    level: 2,
    question: "第 1 章 对程序员来说CPU是什么的六阶段运行链是什么？",
    answer:
      "装入指令地址 → 读取操作码 → 更新寄存器 → 判断条件码 → 保存调用现场 → 选择下一指令",
    tags: ["第 1 章 对程序员来说CPU是什么", "运行链"],
  },
  {
    id: "hpw-01-cpu-4",
    chapter: "hpw-01-cpu",
    level: 3,
    question: "第 1 章 对程序员来说CPU是什么为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 1 章 对程序员来说CPU是什么", "故障注入"],
  },
  {
    id: "hpw-01-cpu-5",
    chapter: "hpw-01-cpu",
    level: 3,
    question: "第 1 章 对程序员来说CPU是什么签发时保持什么不变量？",
    answer:
      "每一步都能由程序计数器、寄存器和内存状态解释；函数返回后恢复调用者现场，数组地址计算不越过已分配范围。",
    tags: ["第 1 章 对程序员来说CPU是什么", "工程验收"],
  },
  {
    id: "hpw-01-cpu-6",
    chapter: "hpw-01-cpu",
    level: 3,
    question: "第 1 章 对程序员来说CPU是什么怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 1 章 对程序员来说CPU是什么", "恢复实验"],
  },
  {
    id: "hpw-02-binary-1",
    chapter: "hpw-02-binary",
    level: 1,
    question: "第 2 章 数据是用二进制数表示的的核心主张是什么？",
    answer:
      "二进制用位权表达信息，固定字长决定可表示范围；移位对应乘除二的幂，二进制补码统一加减法，逻辑运算则用于提取、设置和翻转特定位。",
    tags: ["第 2 章 数据是用二进制数表示的", "核心机制"],
  },
  {
    id: "hpw-02-binary-2",
    chapter: "hpw-02-binary",
    level: 2,
    question: "第 2 章 数据是用二进制数表示的覆盖哪些权威目录条目？",
    answer:
      "第2章 数据是用二进制数表示的、2.1 用二进制数表示计算机信息的原因、2.2 什么是二进制数、2.3 移位运算和乘除运算的关系、2.4 便于计算机处理的“补数”、2.5 逻辑右移和算术右移的区别、2.6 掌握逻辑运算的窍门、COLUMN 如果是你，你会怎样介绍？——向小学生讲解CPU和二进制",
    tags: ["第 2 章 数据是用二进制数表示的", "目录覆盖"],
  },
  {
    id: "hpw-02-binary-3",
    chapter: "hpw-02-binary",
    level: 2,
    question: "第 2 章 数据是用二进制数表示的的六阶段运行链是什么？",
    answer:
      "声明字长 → 编码位模式 → 执行移位逻辑 → 解释补码符号 → 检测溢出 → 还原数值语义",
    tags: ["第 2 章 数据是用二进制数表示的", "运行链"],
  },
  {
    id: "hpw-02-binary-4",
    chapter: "hpw-02-binary",
    level: 3,
    question: "第 2 章 数据是用二进制数表示的为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 2 章 数据是用二进制数表示的", "故障注入"],
  },
  {
    id: "hpw-02-binary-5",
    chapter: "hpw-02-binary",
    level: 3,
    question: "第 2 章 数据是用二进制数表示的签发时保持什么不变量？",
    answer:
      "所有运算都在声明的字长内解释，逻辑移位与算术移位不混用；补码结果、进位和溢出分别判断。",
    tags: ["第 2 章 数据是用二进制数表示的", "工程验收"],
  },
  {
    id: "hpw-02-binary-6",
    chapter: "hpw-02-binary",
    level: 3,
    question: "第 2 章 数据是用二进制数表示的怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 2 章 数据是用二进制数表示的", "恢复实验"],
  },
  {
    id: "hpw-03-floating-point-1",
    chapter: "hpw-03-floating-point",
    level: 1,
    question: "第 3 章 计算机进行小数运算时出错的原因的核心主张是什么？",
    answer:
      "有限二进制位无法精确表示多数十进制小数；浮点数用符号、尾数和偏置指数近似，舍入误差会在累加和比较中传播，因此业务必须选择误差模型。",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "核心机制"],
  },
  {
    id: "hpw-03-floating-point-2",
    chapter: "hpw-03-floating-point",
    level: 2,
    question: "第 3 章 计算机进行小数运算时出错的原因覆盖哪些权威目录条目？",
    answer:
      "第3章 计算机进行小数运算时出错的原因、3.1 将0.1累加100次也得不到10、3.2 用二进制数表示小数、3.3 计算机运算出错的原因、3.4 什么是浮点数、3.5 正则表达式和EXCESS系统、3.6 在实际的程序中进行确认、3.7 如何避免计算机计算出错、3.8 二进制数和十六进制数",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "目录覆盖"],
  },
  {
    id: "hpw-03-floating-point-3",
    chapter: "hpw-03-floating-point",
    level: 2,
    question: "第 3 章 计算机进行小数运算时出错的原因的六阶段运行链是什么？",
    answer:
      "转换二进制小数 → 规格化尾数 → 编码偏置指数 → 按规则舍入 → 累计误差界 → 选择定点或容差",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "运行链"],
  },
  {
    id: "hpw-03-floating-point-4",
    chapter: "hpw-03-floating-point",
    level: 3,
    question:
      "第 3 章 计算机进行小数运算时出错的原因为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "故障注入"],
  },
  {
    id: "hpw-03-floating-point-5",
    chapter: "hpw-03-floating-point",
    level: 3,
    question: "第 3 章 计算机进行小数运算时出错的原因签发时保持什么不变量？",
    answer:
      "计算结果附带表示范围与误差界；比较使用容差或整数尺度，金融等精确十进制场景不直接累加二进制浮点。",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "工程验收"],
  },
  {
    id: "hpw-03-floating-point-6",
    chapter: "hpw-03-floating-point",
    level: 3,
    question: "第 3 章 计算机进行小数运算时出错的原因怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 3 章 计算机进行小数运算时出错的原因", "恢复实验"],
  },
  {
    id: "hpw-04-memory-1",
    chapter: "hpw-04-memory",
    level: 1,
    question: "第 4 章 熟练使用有棱有角的内存的核心主张是什么？",
    answer:
      "内存向程序暴露线性地址空间，类型决定连续字节的解释；指针保存地址，数组使用连续区域，栈队列约束访问顺序，链表和树通过引用表达非连续关系。",
    tags: ["第 4 章 熟练使用有棱有角的内存", "核心机制"],
  },
  {
    id: "hpw-04-memory-2",
    chapter: "hpw-04-memory",
    level: 2,
    question: "第 4 章 熟练使用有棱有角的内存覆盖哪些权威目录条目？",
    answer:
      "第4章 熟练使用有棱有角的内存、4.1 内存的物理机制很简单、4.2 内存的逻辑模型是楼房、4.3 简单的指针、4.4 数组是高效使用内存的基础、4.5 栈、队列以及环形缓冲区、4.6 链表使元素的追加和删除更容易、4.7 二叉查找树使数据搜索更有效",
    tags: ["第 4 章 熟练使用有棱有角的内存", "目录覆盖"],
  },
  {
    id: "hpw-04-memory-3",
    chapter: "hpw-04-memory",
    level: 2,
    question: "第 4 章 熟练使用有棱有角的内存的六阶段运行链是什么？",
    answer:
      "分配字节区域 → 绑定类型解释 → 计算地址偏移 → 执行结构操作 → 检查引用可达 → 释放或复用内存",
    tags: ["第 4 章 熟练使用有棱有角的内存", "运行链"],
  },
  {
    id: "hpw-04-memory-4",
    chapter: "hpw-04-memory",
    level: 3,
    question: "第 4 章 熟练使用有棱有角的内存为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 4 章 熟练使用有棱有角的内存", "故障注入"],
  },
  {
    id: "hpw-04-memory-5",
    chapter: "hpw-04-memory",
    level: 3,
    question: "第 4 章 熟练使用有棱有角的内存签发时保持什么不变量？",
    answer:
      "每次读写都落在有效对象边界，指针仍指向存活对象；插入删除后结构可达，空、满和根节点状态都有定义。",
    tags: ["第 4 章 熟练使用有棱有角的内存", "工程验收"],
  },
  {
    id: "hpw-04-memory-6",
    chapter: "hpw-04-memory",
    level: 3,
    question: "第 4 章 熟练使用有棱有角的内存怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 4 章 熟练使用有棱有角的内存", "恢复实验"],
  },
  {
    id: "hpw-05-memory-disk-1",
    chapter: "hpw-05-memory-disk",
    level: 1,
    question: "第 5 章 内存和磁盘的亲密关系的核心主张是什么？",
    answer:
      "CPU 只能直接执行已进入内存的指令，操作系统把磁盘文件加载为页面；缓存利用局部性，虚拟内存用磁盘后备扩展地址空间，但缺页会放大延迟。",
    tags: ["第 5 章 内存和磁盘的亲密关系", "核心机制"],
  },
  {
    id: "hpw-05-memory-disk-2",
    chapter: "hpw-05-memory-disk",
    level: 2,
    question: "第 5 章 内存和磁盘的亲密关系覆盖哪些权威目录条目？",
    answer:
      "第5章 内存和磁盘的亲密关系、5.1 不读入内存就无法运行、5.2 磁盘缓存加快了磁盘访问速度、5.3 虚拟内存把磁盘作为部分内存来使用、5.4 节约内存的编程方法、5.5 磁盘的物理结构",
    tags: ["第 5 章 内存和磁盘的亲密关系", "目录覆盖"],
  },
  {
    id: "hpw-05-memory-disk-3",
    chapter: "hpw-05-memory-disk",
    level: 2,
    question: "第 5 章 内存和磁盘的亲密关系的六阶段运行链是什么？",
    answer:
      "读取磁盘块 → 填充页缓存 → 映射虚拟页 → 触发缺页 → 选择置换页面 → 写回并释放",
    tags: ["第 5 章 内存和磁盘的亲密关系", "运行链"],
  },
  {
    id: "hpw-05-memory-disk-4",
    chapter: "hpw-05-memory-disk",
    level: 3,
    question: "第 5 章 内存和磁盘的亲密关系为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 5 章 内存和磁盘的亲密关系", "故障注入"],
  },
  {
    id: "hpw-05-memory-disk-5",
    chapter: "hpw-05-memory-disk",
    level: 3,
    question: "第 5 章 内存和磁盘的亲密关系签发时保持什么不变量？",
    answer:
      "虚拟地址始终映射到有效物理页或受控缺页处理；脏数据写回前不丢失，节约内存不能破坏对象生命周期。",
    tags: ["第 5 章 内存和磁盘的亲密关系", "工程验收"],
  },
  {
    id: "hpw-05-memory-disk-6",
    chapter: "hpw-05-memory-disk",
    level: 3,
    question: "第 5 章 内存和磁盘的亲密关系怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 5 章 内存和磁盘的亲密关系", "恢复实验"],
  },
  {
    id: "hpw-06-compression-1",
    chapter: "hpw-06-compression",
    level: 1,
    question: "第 6 章 亲自尝试压缩数据的核心主张是什么？",
    answer:
      "压缩利用数据冗余：RLE 把连续重复值替换为值与长度，哈夫曼按频率构造前缀码树；算法收益取决于数据分布，元数据和最坏膨胀也必须计入。",
    tags: ["第 6 章 亲自尝试压缩数据", "核心机制"],
  },
  {
    id: "hpw-06-compression-2",
    chapter: "hpw-06-compression",
    level: 2,
    question: "第 6 章 亲自尝试压缩数据覆盖哪些权威目录条目？",
    answer:
      "第6章 亲自尝试压缩数据、6.1 文件以字节为单位保存、6.2 RLE算法的机制、6.3 RLE算法的缺点、6.4 通过莫尔斯编码来看哈夫曼算法的基础、6.5 用二叉树实现哈夫曼编码、6.6 哈夫曼算法能够大幅提升压缩比率、6.7 可逆压缩和非可逆压缩、COLUMN 如果是你，你会怎样介绍？——向沉迷游戏的中学生讲解内存和磁盘",
    tags: ["第 6 章 亲自尝试压缩数据", "目录覆盖"],
  },
  {
    id: "hpw-06-compression-3",
    chapter: "hpw-06-compression",
    level: 2,
    question: "第 6 章 亲自尝试压缩数据的六阶段运行链是什么？",
    answer:
      "统计数据分布 → 选择编码模型 → 生成码表 → 写入压缩流 → 解码重建 → 逐字节校验",
    tags: ["第 6 章 亲自尝试压缩数据", "运行链"],
  },
  {
    id: "hpw-06-compression-4",
    chapter: "hpw-06-compression",
    level: 3,
    question: "第 6 章 亲自尝试压缩数据为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 6 章 亲自尝试压缩数据", "故障注入"],
  },
  {
    id: "hpw-06-compression-5",
    chapter: "hpw-06-compression",
    level: 3,
    question: "第 6 章 亲自尝试压缩数据签发时保持什么不变量？",
    answer:
      "可逆压缩解码后与原始字节完全一致，码表无前缀冲突；无收益数据不会因元数据导致不可控膨胀。",
    tags: ["第 6 章 亲自尝试压缩数据", "工程验收"],
  },
  {
    id: "hpw-06-compression-6",
    chapter: "hpw-06-compression",
    level: 3,
    question: "第 6 章 亲自尝试压缩数据怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 6 章 亲自尝试压缩数据", "恢复实验"],
  },
  {
    id: "hpw-07-runtime-environment-1",
    chapter: "hpw-07-runtime-environment",
    level: 1,
    question: "第 7 章 程序是在何种环境中运行的的核心主张是什么？",
    answer:
      "程序依赖操作系统 API、CPU 指令集和设备抽象；源码可通过移植层、虚拟机或语言运行时跨环境，BIOS/固件与引导程序则在应用之前建立操作系统运行条件。",
    tags: ["第 7 章 程序是在何种环境中运行的", "核心机制"],
  },
  {
    id: "hpw-07-runtime-environment-2",
    chapter: "hpw-07-runtime-environment",
    level: 2,
    question: "第 7 章 程序是在何种环境中运行的覆盖哪些权威目录条目？",
    answer:
      "第7章 程序是在何种环境中运行的、7.1 运行环境=操作系统+硬件、7.2 Windows克服了CPU以外的硬件差异、7.3 不同操作系统的API不同、7.4 FreeBSD Port帮你轻松使用源代码、7.5 利用虚拟机获得其他操作系统环境、7.6 提供相同运行环境的Java虚拟机、7.7 BIOS和引导",
    tags: ["第 7 章 程序是在何种环境中运行的", "目录覆盖"],
  },
  {
    id: "hpw-07-runtime-environment-3",
    chapter: "hpw-07-runtime-environment",
    level: 2,
    question: "第 7 章 程序是在何种环境中运行的的六阶段运行链是什么？",
    answer:
      "固件初始化 → 装载引导程序 → 启动操作系统 → 建立设备抽象 → 提供API或虚拟机 → 加载目标程序",
    tags: ["第 7 章 程序是在何种环境中运行的", "运行链"],
  },
  {
    id: "hpw-07-runtime-environment-4",
    chapter: "hpw-07-runtime-environment",
    level: 3,
    question: "第 7 章 程序是在何种环境中运行的为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 7 章 程序是在何种环境中运行的", "故障注入"],
  },
  {
    id: "hpw-07-runtime-environment-5",
    chapter: "hpw-07-runtime-environment",
    level: 3,
    question: "第 7 章 程序是在何种环境中运行的签发时保持什么不变量？",
    answer:
      "程序声明所需 API、指令集与运行时版本；跨环境方案明确被抽象的差异，启动链每一级都验证下一阶段身份。",
    tags: ["第 7 章 程序是在何种环境中运行的", "工程验收"],
  },
  {
    id: "hpw-07-runtime-environment-6",
    chapter: "hpw-07-runtime-environment",
    level: 3,
    question: "第 7 章 程序是在何种环境中运行的怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 7 章 程序是在何种环境中运行的", "恢复实验"],
  },
  {
    id: "hpw-08-source-executable-1",
    chapter: "hpw-08-source-executable",
    level: 1,
    question: "第 8 章 从源文件到可执行文件的核心主张是什么？",
    answer:
      "编译器把源代码转换成目标代码，链接器解析跨文件符号并重定位，启动代码准备运行时，加载器映射可执行文件和动态库，随后建立栈与堆并转入入口函数。",
    tags: ["第 8 章 从源文件到可执行文件", "核心机制"],
  },
  {
    id: "hpw-08-source-executable-2",
    chapter: "hpw-08-source-executable",
    level: 2,
    question: "第 8 章 从源文件到可执行文件覆盖哪些权威目录条目？",
    answer:
      "第8章 从源文件到可执行文件、8.1 计算机只能运行本地代码、8.2 本地代码的内容、8.3 编译器负责转换源代码、8.4 仅靠编译是无法得到可执行文件的、8.5 启动及库文件、8.6 DLL文件及导入库、8.7 可执行文件运行时的必要条件、8.8 程序加载时会生成栈和堆、8.9 有点难度的Q&A",
    tags: ["第 8 章 从源文件到可执行文件", "目录覆盖"],
  },
  {
    id: "hpw-08-source-executable-3",
    chapter: "hpw-08-source-executable",
    level: 2,
    question: "第 8 章 从源文件到可执行文件的六阶段运行链是什么？",
    answer:
      "解析源代码 → 生成目标代码 → 解析符号重定位 → 链接启动与库 → 加载映射段 → 建立栈堆执行",
    tags: ["第 8 章 从源文件到可执行文件", "运行链"],
  },
  {
    id: "hpw-08-source-executable-4",
    chapter: "hpw-08-source-executable",
    level: 3,
    question: "第 8 章 从源文件到可执行文件为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 8 章 从源文件到可执行文件", "故障注入"],
  },
  {
    id: "hpw-08-source-executable-5",
    chapter: "hpw-08-source-executable",
    level: 3,
    question: "第 8 章 从源文件到可执行文件签发时保持什么不变量？",
    answer:
      "所有外部符号都解析到兼容定义，代码和数据段权限正确；加载的库版本满足 ABI，入口执行前栈、堆和启动状态完整。",
    tags: ["第 8 章 从源文件到可执行文件", "工程验收"],
  },
  {
    id: "hpw-08-source-executable-6",
    chapter: "hpw-08-source-executable",
    level: 3,
    question: "第 8 章 从源文件到可执行文件怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 8 章 从源文件到可执行文件", "恢复实验"],
  },
  {
    id: "hpw-09-os-applications-1",
    chapter: "hpw-09-os-applications",
    level: 1,
    question: "第 9 章 操作系统和应用的关系的核心主张是什么？",
    answer:
      "应用通过语言库和系统调用请求内核管理文件、内存、进程与设备；操作系统集中仲裁硬件并隔离程序，高级语言再把平台差异包成可移植接口。",
    tags: ["第 9 章 操作系统和应用的关系", "核心机制"],
  },
  {
    id: "hpw-09-os-applications-2",
    chapter: "hpw-09-os-applications",
    level: 2,
    question: "第 9 章 操作系统和应用的关系覆盖哪些权威目录条目？",
    answer:
      "第9章 操作系统和应用的关系、9.1 操作系统功能的历史、9.2 要意识到操作系统的存在、9.3 系统调用和高级编程语言的移植性、9.4 操作系统和高级编程语言使硬件抽象化、9.5 Windows操作系统的特征、COLUMN 如果是你，你会怎样介绍？——向超喜欢手机的女高中生讲解操作系统的作用",
    tags: ["第 9 章 操作系统和应用的关系", "目录覆盖"],
  },
  {
    id: "hpw-09-os-applications-3",
    chapter: "hpw-09-os-applications",
    level: 2,
    question: "第 9 章 操作系统和应用的关系的六阶段运行链是什么？",
    answer:
      "应用发起请求 → 语言库封装 → 陷入系统调用 → 内核校验权限 → 驱动操作硬件 → 返回结果错误",
    tags: ["第 9 章 操作系统和应用的关系", "运行链"],
  },
  {
    id: "hpw-09-os-applications-4",
    chapter: "hpw-09-os-applications",
    level: 3,
    question: "第 9 章 操作系统和应用的关系为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 9 章 操作系统和应用的关系", "故障注入"],
  },
  {
    id: "hpw-09-os-applications-5",
    chapter: "hpw-09-os-applications",
    level: 3,
    question: "第 9 章 操作系统和应用的关系签发时保持什么不变量？",
    answer:
      "用户程序不能绕过内核权限直接破坏共享硬件；系统调用参数被校验，失败通过稳定错误契约返回而不是泄漏内核状态。",
    tags: ["第 9 章 操作系统和应用的关系", "工程验收"],
  },
  {
    id: "hpw-09-os-applications-6",
    chapter: "hpw-09-os-applications",
    level: 3,
    question: "第 9 章 操作系统和应用的关系怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 9 章 操作系统和应用的关系", "恢复实验"],
  },
  {
    id: "hpw-10-assembly-1",
    chapter: "hpw-10-assembly",
    level: 1,
    question: "第 10 章 通过汇编语言了解程序的实际构成的核心主张是什么？",
    answer:
      "汇编语言把本地指令写成助记符；指令操作寄存器、内存和标志，伪指令指导汇编器布局。调用约定规定参数、返回值和寄存器责任，栈帧承载局部状态。",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "核心机制"],
  },
  {
    id: "hpw-10-assembly-2",
    chapter: "hpw-10-assembly",
    level: 2,
    question: "第 10 章 通过汇编语言了解程序的实际构成覆盖哪些权威目录条目？",
    answer:
      "第10章 通过汇编语言了解程序的实际构成、10.1 汇编语言和本地代码是一一对应的、10.2 通过编译器输出汇编语言的源代码、10.3 不会转换成本地代码的伪指令、10.4 汇编语言的语法是“操作码+操作数”、10.5 最常用的mov指令、10.6 对栈进行push和pop、10.7 函数调用机制、10.8 函数内部的处理、10.9 始终确保全局变量用的内存空间、10.10 临时确保局部变量用的内存空间、10.11 循环处理的实现方法、10.12 条件分支的实现方法、10.13 了解程序运行方式的必要性",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "目录覆盖"],
  },
  {
    id: "hpw-10-assembly-3",
    chapter: "hpw-10-assembly",
    level: 2,
    question: "第 10 章 通过汇编语言了解程序的实际构成的六阶段运行链是什么？",
    answer:
      "输出汇编源码 → 区分指令伪指令 → 跟踪mov数据流 → 建立调用栈帧 → 映射变量存储 → 追踪跳转分支",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "运行链"],
  },
  {
    id: "hpw-10-assembly-4",
    chapter: "hpw-10-assembly",
    level: 3,
    question:
      "第 10 章 通过汇编语言了解程序的实际构成为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "故障注入"],
  },
  {
    id: "hpw-10-assembly-5",
    chapter: "hpw-10-assembly",
    level: 3,
    question: "第 10 章 通过汇编语言了解程序的实际构成签发时保持什么不变量？",
    answer:
      "每条执行指令映射到合法本地代码；函数遵守调用约定并平衡栈，循环与分支跳转目标明确，变量存储期与地址范围一致。",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "工程验收"],
  },
  {
    id: "hpw-10-assembly-6",
    chapter: "hpw-10-assembly",
    level: 3,
    question: "第 10 章 通过汇编语言了解程序的实际构成怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 10 章 通过汇编语言了解程序的实际构成", "恢复实验"],
  },
  {
    id: "hpw-11-hardware-control-1",
    chapter: "hpw-11-hardware-control",
    level: 1,
    question: "第 11 章 硬件控制方法的核心主张是什么？",
    answer:
      "硬件控制通过端口或内存映射寄存器读写设备状态；中断通知 CPU 处理异步事件，DMA 在设备与内存间批量传输，显示控制器把帧缓冲解释为字符或像素。",
    tags: ["第 11 章 硬件控制方法", "核心机制"],
  },
  {
    id: "hpw-11-hardware-control-2",
    chapter: "hpw-11-hardware-control",
    level: 2,
    question: "第 11 章 硬件控制方法覆盖哪些权威目录条目？",
    answer:
      "第11章 硬件控制方法、11.1 应用和硬件无关？、11.2 支撑硬件输入输出的IN指令和OUT指令、11.3 编写测试用的输入输出程序、11.4 外围设备的中断请求、11.5 用中断来实现实时处理、11.6 DMA可以实现短时间内传送大量数据、11.7 文字及图片的显示机制、COLUMN 如果是你，你会怎样介绍？——向邻居老奶奶说明显示器和电视机的不同",
    tags: ["第 11 章 硬件控制方法", "目录覆盖"],
  },
  {
    id: "hpw-11-hardware-control-3",
    chapter: "hpw-11-hardware-control",
    level: 2,
    question: "第 11 章 硬件控制方法的六阶段运行链是什么？",
    answer:
      "配置设备寄存器 → 发起输入输出 → 等待或接收中断 → 保存处理现场 → 执行DMA或复制 → 确认设备完成",
    tags: ["第 11 章 硬件控制方法", "运行链"],
  },
  {
    id: "hpw-11-hardware-control-4",
    chapter: "hpw-11-hardware-control",
    level: 3,
    question: "第 11 章 硬件控制方法为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 11 章 硬件控制方法", "故障注入"],
  },
  {
    id: "hpw-11-hardware-control-5",
    chapter: "hpw-11-hardware-control",
    level: 3,
    question: "第 11 章 硬件控制方法签发时保持什么不变量？",
    answer:
      "设备访问遵守寄存器与时序协议；中断处理快速且恢复现场，DMA 缓冲区生命周期覆盖传输，完成状态先于上层消费。",
    tags: ["第 11 章 硬件控制方法", "工程验收"],
  },
  {
    id: "hpw-11-hardware-control-6",
    chapter: "hpw-11-hardware-control",
    level: 3,
    question: "第 11 章 硬件控制方法怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 11 章 硬件控制方法", "恢复实验"],
  },
  {
    id: "hpw-12-thinking-1",
    chapter: "hpw-12-thinking",
    level: 1,
    question: "第 12 章 让计算机“思考”的核心主张是什么？",
    answer:
      "计算机不会自行理解目标，只会执行被编码的规则；所谓思考程序把观察、规则、随机选择和历史记忆组合成状态转换，其能力边界由输入与模型决定。",
    tags: ["第 12 章 让计算机“思考”", "核心机制"],
  },
  {
    id: "hpw-12-thinking-2",
    chapter: "hpw-12-thinking",
    level: 2,
    question: "第 12 章 让计算机“思考”覆盖哪些权威目录条目？",
    answer:
      "第12章 让计算机“思考”、12.1 作为“工具”的程序和为了“思考”的程序、12.2 用程序来表示人类的思考方式、12.3 用程序来表示人类的思考习惯、12.4 程序生成随机数的方法、12.5 活用记忆功能以达到更接近人类的判断、12.6 用程序来表示人类的思考方式、COLUMN 如果是你，你会怎样介绍？——向常光临的酒馆老板讲解计算机的思考机制",
    tags: ["第 12 章 让计算机“思考”", "目录覆盖"],
  },
  {
    id: "hpw-12-thinking-3",
    chapter: "hpw-12-thinking",
    level: 2,
    question: "第 12 章 让计算机“思考”的六阶段运行链是什么？",
    answer:
      "定义判断目标 → 编码思考步骤 → 读取当前观察 → 加入随机或记忆 → 执行规则选择 → 解释结果边界",
    tags: ["第 12 章 让计算机“思考”", "运行链"],
  },
  {
    id: "hpw-12-thinking-4",
    chapter: "hpw-12-thinking",
    level: 3,
    question: "第 12 章 让计算机“思考”为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["第 12 章 让计算机“思考”", "故障注入"],
  },
  {
    id: "hpw-12-thinking-5",
    chapter: "hpw-12-thinking",
    level: 3,
    question: "第 12 章 让计算机“思考”签发时保持什么不变量？",
    answer:
      "相同初始状态和随机种子可以重放；输出能追溯到规则与记忆，程序不把缺失输入伪装成自主理解。",
    tags: ["第 12 章 让计算机“思考”", "工程验收"],
  },
  {
    id: "hpw-12-thinking-6",
    chapter: "hpw-12-thinking",
    level: 3,
    question: "第 12 章 让计算机“思考”怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["第 12 章 让计算机“思考”", "恢复实验"],
  },
  {
    id: "hpw-appendix-c-1",
    chapter: "hpw-appendix-c",
    level: 1,
    question: "附录 让我们开始C语言之旅的核心主张是什么？",
    answer:
      "C 语言把类型化变量、表达式、控制流和函数编译成本地代码；数组对应连续内存，局部与全局变量具有不同存储期，标准库通过约定接口复用系统能力。",
    tags: ["附录 让我们开始C语言之旅", "核心机制"],
  },
  {
    id: "hpw-appendix-c-2",
    chapter: "hpw-appendix-c",
    level: 2,
    question: "附录 让我们开始C语言之旅覆盖哪些权威目录条目？",
    answer:
      "附录 让我们开始C语言之旅、C语言的特点、变量和函数、数据类型、标准函数库、函数调用、局部变量和全局变量、数组和循环、其他语法结构",
    tags: ["附录 让我们开始C语言之旅", "目录覆盖"],
  },
  {
    id: "hpw-appendix-c-3",
    chapter: "hpw-appendix-c",
    level: 2,
    question: "附录 让我们开始C语言之旅的六阶段运行链是什么？",
    answer:
      "声明数据类型 → 定义变量函数 → 调用标准库 → 传递参数返回值 → 区分局部全局 → 编译运行验证",
    tags: ["附录 让我们开始C语言之旅", "运行链"],
  },
  {
    id: "hpw-appendix-c-4",
    chapter: "hpw-appendix-c",
    level: 3,
    question: "附录 让我们开始C语言之旅为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["附录 让我们开始C语言之旅", "故障注入"],
  },
  {
    id: "hpw-appendix-c-5",
    chapter: "hpw-appendix-c",
    level: 3,
    question: "附录 让我们开始C语言之旅签发时保持什么不变量？",
    answer:
      "变量在声明类型与生命周期内使用，函数参数和返回值匹配原型；数组访问不越界，编译告警和运行结果都纳入验收。",
    tags: ["附录 让我们开始C语言之旅", "工程验收"],
  },
  {
    id: "hpw-appendix-c-6",
    chapter: "hpw-appendix-c",
    level: 3,
    question: "附录 让我们开始C语言之旅怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["附录 让我们开始C语言之旅", "恢复实验"],
  },
  {
    id: "hpw-official-final-review-1",
    chapter: "hpw-official-final-review",
    level: 1,
    question: "《程序是怎样跑起来的》全书总复习的核心主张是什么？",
    answer:
      "总复习把源代码经编译与链接变成本地代码，加载器建立地址空间，CPU按寄存器和栈执行，系统调用进入内核，设备通过中断或DMA返回数据，最终结果再被程序解释。",
    tags: ["《程序是怎样跑起来的》全书总复习", "核心机制"],
  },
  {
    id: "hpw-official-final-review-2",
    chapter: "hpw-official-final-review",
    level: 2,
    question: "《程序是怎样跑起来的》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 对程序员来说CPU是什么、第2章 数据是用二进制数表示的、第3章 计算机进行小数运算时出错的原因、第4章 熟练使用有棱有角的内存、第5章 内存和磁盘的亲密关系、第6章 亲自尝试压缩数据、第7章 程序是在何种环境中运行的、第8章 从源文件到可执行文件、第9章 操作系统和应用的关系、第10章 通过汇编语言了解程序的实际构成、第11章 硬件控制方法、第12章 让计算机“思考”、附录 让我们开始C语言之旅、结语、致谢",
    tags: ["《程序是怎样跑起来的》全书总复习", "目录覆盖"],
  },
  {
    id: "hpw-official-final-review-3",
    chapter: "hpw-official-final-review",
    level: 2,
    question: "《程序是怎样跑起来的》全书总复习的六阶段运行链是什么？",
    answer:
      "冻结源码输入 → 生成链接制品 → 装载地址空间 → 执行指令栈帧 → 进入内核设备 → 核对输出恢复",
    tags: ["《程序是怎样跑起来的》全书总复习", "运行链"],
  },
  {
    id: "hpw-official-final-review-4",
    chapter: "hpw-official-final-review",
    level: 3,
    question: "《程序是怎样跑起来的》全书总复习为什么不能只看源码和最终输出？",
    answer:
      "源码与输出之间还有编译、链接、装载、指令、内存、系统调用和设备状态，必须保存首个偏离点。",
    tags: ["《程序是怎样跑起来的》全书总复习", "故障注入"],
  },
  {
    id: "hpw-official-final-review-5",
    chapter: "hpw-official-final-review",
    level: 3,
    question: "《程序是怎样跑起来的》全书总复习签发时保持什么不变量？",
    answer:
      "同一源码、工具链与环境得到可追溯制品；正常、边界、失败和恢复样本都能关联到首个偏离的指令、内存、接口或设备状态。",
    tags: ["《程序是怎样跑起来的》全书总复习", "工程验收"],
  },
  {
    id: "hpw-official-final-review-6",
    chapter: "hpw-official-final-review",
    level: 3,
    question: "《程序是怎样跑起来的》全书总复习怎样完成可复现实验？",
    answer:
      "固定源码、工具链、输入和环境，每次只改变一个字长、地址、容量、依赖或时序条件，删除故障后重放相同输入。",
    tags: ["《程序是怎样跑起来的》全书总复习", "恢复实验"],
  },
];
