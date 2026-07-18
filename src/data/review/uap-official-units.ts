import type { ReviewQuestion } from "./types";

const units: Array<{
  slug: ReviewQuestion["chapter"];
  title: string;
  thesis: string;
  invariant: string;
  terms: string[];
  chain: readonly string[];
}> = [
  {
    slug: "uap-official-learning-map",
    title: "《UNIX环境高级编程（第3版）》权威学习地图",
    thesis:
      "按2014中文版完整目录与Pearson原版目录，把21章、3附录、325个正式层级组织为标准、文件I/O、进程、信号线程、IPC终端和综合应用六条证据线。",
    invariant:
      "21章、3附录和325个正式层级都有唯一教学归属；SUSv4标准保证、四个平台实现差异与现代Linux对照明确分开。",
    terms: [
      "21章3附录",
      "SUSv4",
      "接口合同",
      "对象所有权",
      "可重放证据",
      "清理恢复重放",
    ],
    chain: [
      "核对版本目录",
      "建立平台基线",
      "画对象生存期",
      "追踪系统调用",
      "注入单变量故障",
      "清理恢复重放",
    ],
  },
  {
    slug: "uap-unix-basics",
    title: "第1章 UNIX基础知识",
    thesis:
      "从登录、文件、进程、信号和系统调用建立UNIX接口全景，并明确用户态、内核与库函数边界。",
    invariant:
      "每个观察都能落到文件描述符、进程、用户标识、时间或错误码；演示结束不遗留进程与文件。",
    terms: [
      "UNIX体系结构",
      "文件描述符",
      "进程",
      "errno",
      "系统调用",
      "清理重放",
    ],
    chain: [
      "登录取样",
      "遍历文件",
      "追踪进程",
      "触发错误",
      "观察信号",
      "清理重放",
    ],
  },
  {
    slug: "uap-standards-implementations",
    title: "第2章 UNIX标准及实现",
    thesis:
      "把ISO C、POSIX、SUS、实现差异、限制、选项与功能测试宏转成可探测的可移植性合同。",
    invariant:
      "编译期宏、sysconf/pathconf结果和运行平台一起记录；未知值与无限值不被误判为固定常量。",
    terms: [
      "POSIX",
      "Single UNIX Specification",
      "sysconf",
      "pathconf",
      "功能测试宏",
      "跨平台复核",
    ],
    chain: [
      "声明目标标准",
      "识别实现",
      "查询限制",
      "检查选项",
      "编译探针",
      "跨平台复核",
    ],
  },
  {
    slug: "uap-file-io",
    title: "第3章 文件I/O",
    thesis:
      "沿open/read/write/lseek/close追踪描述符表、打开文件表项、文件偏移、共享与原子操作。",
    invariant:
      "成功字节数、部分读写、EINTR、偏移共享和持久化语义都显式处理；每个描述符恰好关闭一次。",
    terms: [
      "文件描述符",
      "打开文件描述",
      "文件偏移",
      "原子操作",
      "fcntl",
      "关闭核对",
    ],
    chain: [
      "打开对象",
      "读取短计数",
      "移动偏移",
      "复制描述符",
      "同步数据",
      "关闭核对",
    ],
  },
  {
    slug: "uap-files-directories",
    title: "第4章 文件和目录",
    thesis:
      "用stat元数据、权限、所有权、链接、目录项与文件系统结构解释路径名如何解析到对象。",
    invariant:
      "检查权限与执行操作之间不制造TOCTOU；链接计数、目录句柄、当前目录和时间戳变更可解释。",
    terms: ["stat", "文件类型", "访问权限", "硬链接", "目录流", "清理路径"],
    chain: [
      "读取元数据",
      "判定类型权限",
      "追踪链接",
      "修改时间",
      "遍历目录",
      "清理路径",
    ],
  },
  {
    slug: "uap-standard-io",
    title: "第5章 标准I/O库",
    thesis:
      "把FILE流、缓冲策略、格式化I/O、二进制I/O、定位、临时文件与内存流连接到底层描述符。",
    invariant:
      "流方向、缓冲区、错误与EOF状态分开；刷新、定位和关闭顺序不会重复写入或丢失数据。",
    terms: ["FILE对象", "缓冲", "格式化I/O", "流定位", "内存流", "关闭验证"],
    chain: [
      "打开流",
      "选择缓冲",
      "读写记录",
      "检查状态",
      "刷新定位",
      "关闭验证",
    ],
  },
  {
    slug: "uap-system-data-information",
    title: "第6章 系统数据文件和信息",
    thesis:
      "通过口令、组、登录记录、系统标识与时间例程学习系统数据库的可重入查询和时区边界。",
    invariant:
      "不手工解析可能变化的数据库格式；缓冲区生存期、用户组集合、时区和历法转换都明确。",
    terms: ["口令文件", "阴影口令", "附属组", "uname", "时间转换", "核对边界"],
    chain: [
      "查询身份",
      "扩展组集",
      "读取系统标识",
      "获取时钟",
      "转换时区",
      "核对边界",
    ],
  },
  {
    slug: "uap-process-environment",
    title: "第7章 进程环境",
    thesis:
      "从main入口、终止处理、环境表、存储布局、堆、非局部跳转和资源限制解释进程环境。",
    invariant:
      "参数与环境只在有效期内引用；退出处理次序、堆所有权、longjmp边界和资源上限可追踪。",
    terms: ["进程终止", "环境表", "存储布局", "setjmp", "资源限制", "恢复限制"],
    chain: [
      "捕获启动状态",
      "检查内存布局",
      "修改环境",
      "设置退出处理",
      "触发非局部跳转",
      "恢复限制",
    ],
  },
  {
    slug: "uap-process-control",
    title: "第8章 进程控制",
    thesis:
      "沿fork、vfork、wait、exec、身份切换、system、会计和调度建立完整进程生存期。",
    invariant:
      "父子分支、继承资源、exec失败、等待状态与凭证变更全部检查；不留下僵尸或越权身份。",
    terms: ["fork", "waitpid", "exec", "竞争条件", "用户标识", "回收子进程"],
    chain: [
      "创建子进程",
      "区分父子分支",
      "替换映像",
      "等待状态",
      "检查凭证",
      "回收子进程",
    ],
  },
  {
    slug: "uap-process-relationships",
    title: "第9章 进程关系",
    thesis:
      "用会话、进程组、控制终端、作业控制和孤儿进程组解释shell与登录会话的进程关系。",
    invariant:
      "PID/PPID/PGID/SID/前台组一致，终端信号送达正确对象；后台或退出场景不会悬挂终端状态。",
    terms: ["进程组", "会话", "控制终端", "作业控制", "孤儿进程组", "恢复终端"],
    chain: [
      "建立会话",
      "设置进程组",
      "绑定终端",
      "切换前后台",
      "制造孤儿组",
      "恢复终端",
    ],
  },
  {
    slug: "uap-signals",
    title: "第10章 信号",
    thesis:
      "从信号产生、未决、阻塞、处置进入sigaction、信号集、跳转、定时器和作业控制信号。",
    invariant:
      "处理函数只调用异步信号安全接口；共享状态使用正确类型，掩码恢复且系统调用中断路径可重放。",
    terms: [
      "sigaction",
      "信号集",
      "可重入函数",
      "sigsuspend",
      "sigqueue",
      "恢复掩码",
    ],
    chain: [
      "安装处置",
      "阻塞信号",
      "制造未决",
      "原子等待",
      "处理有效载荷",
      "恢复掩码",
    ],
  },
  {
    slug: "uap-threads",
    title: "第11章 线程",
    thesis:
      "围绕pthread创建终止、互斥量、读写锁、条件变量、自旋锁和屏障建立共享状态同步模型。",
    invariant:
      "共享不变量由明确同步原语保护；锁序无环，条件等待用谓词循环，线程最终join或detach。",
    terms: ["pthread", "互斥量", "条件变量", "读写锁", "屏障", "终止回收"],
    chain: [
      "创建线程",
      "声明共享状态",
      "选择同步原语",
      "等待条件",
      "跨越屏障",
      "终止回收",
    ],
  },
  {
    slug: "uap-thread-control",
    title: "第12章 线程控制",
    thesis:
      "把线程属性、同步属性、重入、线程特定数据、取消、信号、fork与I/O组合成可控线程运行时。",
    invariant:
      "属性初始化销毁配对，取消点有清理处理；fork后子进程只执行异步安全路径直至exec。",
    terms: [
      "线程属性",
      "同步属性",
      "线程特定数据",
      "取消",
      "线程与fork",
      "运行清理器",
    ],
    chain: [
      "配置属性",
      "分配线程数据",
      "设置取消协议",
      "路由信号",
      "穿越fork",
      "运行清理器",
    ],
  },
  {
    slug: "uap-daemon-processes",
    title: "第13章 守护进程",
    thesis:
      "从会话脱离、工作目录、文件模式、描述符、日志、单实例和客户端服务器惯例构造守护进程。",
    invariant:
      "守护进程无意外控制终端，描述符与权限最小化；PID锁、日志和终止清理在崩溃后仍可诊断。",
    terms: [
      "setsid",
      "守护进程",
      "syslog",
      "单实例",
      "客户端服务器",
      "终止清理",
    ],
    chain: [
      "派生并脱离",
      "重设环境",
      "关闭描述符",
      "获取实例锁",
      "记录服务状态",
      "终止清理",
    ],
  },
  {
    slug: "uap-advanced-io",
    title: "第14章 高级I/O",
    thesis:
      "比较非阻塞I/O、记录锁、多路转接、异步I/O、分散聚集I/O与内存映射的状态机。",
    invariant:
      "就绪不等于完成；短读写、锁区间、异步通知、映射长度与取消清理都有明确责任层。",
    terms: ["非阻塞I/O", "记录锁", "select", "异步I/O", "mmap", "撤销映射"],
    chain: [
      "切换非阻塞",
      "注册兴趣",
      "等待就绪",
      "推进状态机",
      "处理短计数",
      "撤销映射",
    ],
  },
  {
    slug: "uap-interprocess-communication",
    title: "第15章 进程间通信",
    thesis:
      "比较管道、popen、协同进程、FIFO、XSI IPC、消息队列、信号量、共享存储与POSIX信号量。",
    invariant:
      "消息边界、容量、权限、同步与所有权显式；异常退出后命名对象、共享段和信号量可以发现并删除。",
    terms: ["管道", "FIFO", "消息队列", "信号量", "共享存储", "删除对象"],
    chain: [
      "选择IPC语义",
      "创建端点",
      "交换消息",
      "施加背压",
      "模拟崩溃",
      "删除对象",
    ],
  },
  {
    slug: "uap-network-ipc-sockets",
    title: "第16章 网络IPC：套接字",
    thesis:
      "从套接字描述符、寻址、连接建立、数据传输、选项、带外数据与非阻塞模式构造网络IPC。",
    invariant:
      "地址长度、字节序、流式分帧、部分发送、半关闭和超时全部处理；失败连接不泄漏描述符。",
    terms: [
      "套接字描述符",
      "字节序",
      "地址查询",
      "连接建立",
      "套接字选项",
      "关闭核对",
    ],
    chain: [
      "解析地址",
      "创建套接字",
      "绑定或连接",
      "传输分帧",
      "处理半关闭",
      "关闭核对",
    ],
  },
  {
    slug: "uap-advanced-ipc",
    title: "第17章 高级进程间通信",
    thesis:
      "用UNIX域套接字、唯一连接和SCM_RIGHTS文件描述符传递实现两版open服务器。",
    invariant:
      "路径命名、对等凭证和描述符所有权可证明；接收方获得独立引用，错误路径关闭所有已传递与待传递句柄。",
    terms: [
      "UNIX域套接字",
      "唯一连接",
      "文件描述符传递",
      "open服务器",
      "对等身份",
      "关闭双方引用",
    ],
    chain: [
      "命名本地域",
      "验证对端",
      "建立唯一连接",
      "传递描述符",
      "切换服务版本",
      "关闭双方引用",
    ],
  },
  {
    slug: "uap-terminal-io",
    title: "第18章 终端I/O",
    thesis:
      "从termios特殊字符、选项标志、规范/非规范模式、波特率、窗口大小与终端能力解释行规程。",
    invariant:
      "修改前保存完整termios，退出与信号路径均恢复；VMIN/VTIME组合、回显和作业控制信号可预测。",
    terms: [
      "termios",
      "特殊输入字符",
      "规范模式",
      "非规范模式",
      "窗口大小",
      "恢复属性",
    ],
    chain: [
      "确认终端",
      "保存属性",
      "修改行规程",
      "读取边界",
      "响应窗口变化",
      "恢复属性",
    ],
  },
  {
    slug: "uap-pseudo-terminals",
    title: "第19章 伪终端",
    thesis:
      "以PTY主从设备、pty_fork和pty程序解释终端模拟、会话控制与高级远程交互。",
    invariant:
      "子进程获得正确控制终端与前台组；主端转发处理EOF、窗口变化、信号和退出，不留下失真的终端。",
    terms: [
      "伪终端",
      "主从设备",
      "pty_fork",
      "控制终端",
      "窗口同步",
      "回收恢复",
    ],
    chain: [
      "打开PTY",
      "派生会话",
      "绑定从端",
      "双向转发",
      "同步窗口",
      "回收恢复",
    ],
  },
  {
    slug: "uap-database-library",
    title: "第20章 数据库函数库",
    thesis:
      "以键值数据库函数库贯通记录格式、索引、锁、并发、接口封装、源码构建与性能测量。",
    invariant:
      "索引与数据原子一致，锁协议支持并发读写；崩溃、重复键、空洞与重建后查询结果可验证。",
    terms: ["数据库函数库", "索引", "记录锁", "并发", "性能", "重建测量"],
    chain: [
      "定义记录合同",
      "构建索引",
      "执行读写",
      "注入并发",
      "模拟崩溃",
      "重建测量",
    ],
  },
  {
    slug: "uap-network-printer",
    title: "第21章 与网络打印机通信",
    thesis:
      "把IPP、HTTP、打印假脱机、配置、队列、网络客户端与后台服务组合为网络打印系统。",
    invariant:
      "作业ID、队列状态、协议响应、重试幂等与持久化一致；失败作业可诊断且不会静默重复打印。",
    terms: [
      "IPP",
      "HTTP",
      "打印假脱机",
      "作业队列",
      "网络打印机",
      "确认并清理",
    ],
    chain: [
      "接收打印作业",
      "持久化队列",
      "编码HTTP请求",
      "发送到打印机",
      "处理重试",
      "确认并清理",
    ],
  },
  {
    slug: "uap-appendix-a-function-prototypes",
    title: "附录A 函数原型",
    thesis:
      "把全书函数原型按头文件、参数类型、返回约定和功能族组织成接口查验表。",
    invariant:
      "调用点所见声明来自正确头文件与功能测试宏；整数宽度、指针限定和返回类型不靠隐式声明猜测。",
    terms: [
      "函数原型",
      "头文件",
      "参数类型",
      "返回约定",
      "功能测试宏",
      "记录平台差异",
    ],
    chain: [
      "定位功能族",
      "确认头文件",
      "展开宏条件",
      "核对原型",
      "编译告警",
      "记录平台差异",
    ],
  },
  {
    slug: "uap-appendix-b-source-code",
    title: "附录B 其他源代码",
    thesis:
      "还原apue.h公共头文件与标准错误处理例程，形成全书示例可编译、可诊断的共同底座。",
    invariant:
      "公共声明只有一个来源，错误例程保留errno并区分退出与返回；构建无隐式声明和重复符号。",
    terms: [
      "apue.h",
      "标准错误例程",
      "errno",
      "可变参数",
      "构建底座",
      "运行失败样本",
    ],
    chain: [
      "定义公共头",
      "声明错误API",
      "格式化上下文",
      "保留errno",
      "链接示例",
      "运行失败样本",
    ],
  },
  {
    slug: "uap-appendix-c-exercise-solutions",
    title: "附录C 部分习题答案",
    thesis:
      "用部分习题答案展示从接口合同、失败模型、最小程序、原始证据到反例修正的解题方法。",
    invariant:
      "答案解释前提与边界而非只给结果；代码可重放，错误路径、资源清理和平台差异均有证据。",
    terms: [
      "习题答案",
      "接口合同",
      "最小反例",
      "原始证据",
      "平台差异",
      "清理复盘",
    ],
    chain: [
      "重述前提",
      "写出不变量",
      "构造最小程序",
      "注入反例",
      "比较实现",
      "清理复盘",
    ],
  },
  {
    slug: "uap-official-final-review",
    title: "《UNIX环境高级编程（第3版）》全书总复习",
    thesis:
      "用接口合同、对象生存期、并发时序、IPC边界、终端会话和错误恢复六条证据线贯通21章与3附录。",
    invariant:
      "每个跨章结论包含标准版本、平台、功能测试宏、输入、返回值、errno、对象所有权、原始轨迹和恢复结果。",
    terms: [
      "接口合同",
      "文件与进程",
      "信号与线程",
      "IPC与套接字",
      "终端与应用",
      "同输入重放",
    ],
    chain: [
      "冻结平台输入",
      "定位接口对象",
      "标记并发边界",
      "捕获首个分叉",
      "修复并清理",
      "同输入重放",
    ],
  },
];

export const uapOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
  unit.terms.map(
    (term, index): ReviewQuestion => ({
      id: unit.slug + "-" + (index + 1),
      chapter: unit.slug,
      level: index < 2 ? 2 : index < 4 ? 3 : 4,
      question:
        unit.title +
        "：如何用“" +
        term +
        "”验证“" +
        unit.chain[index % unit.chain.length] +
        "”阶段的首个接口状态分叉？",
      answer:
        unit.thesis +
        " 固定平台、功能测试宏、工具与输入，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”的返回值、errno、对象所有权与状态；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 关闭对象并恢复属性后以同一输入重放。",
      tags: [term, unit.chain[index % unit.chain.length], "UNIX环境高级编程"],
    }),
  ),
);
