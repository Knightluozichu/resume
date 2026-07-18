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
    slug: "wkp-official-learning-map",
    title: "《Windows内核编程》权威学习地图",
    thesis:
      "按Pavel Yosifovich作者官方目录和中文版完整目录，建立从Windows内部、驱动开发、调试、IRP到通知、小过滤器的11章路线。",
    invariant:
      "11章185个核心目录层级都有唯一教学归属；软件内核驱动主线不会被硬件驱动、PnP或WDF通论替换。",
    terms: [
      "软件内核驱动",
      "11章",
      "WDK环境",
      "通知回调",
      "小过滤器",
      "Windows内部与开发起步",
    ],
    chain: [
      "核对版本目录",
      "建立隔离环境",
      "完成基础驱动",
      "追踪IRP机制",
      "实现系统通知",
      "交付过滤项目",
    ],
  },
  {
    slug: "wkp-01-windows-internals-overview",
    title: "第1章 Windows内部概览",
    thesis:
      "从进程、虚拟内存与页状态进入线程、系统调用、总体架构、句柄、对象名称和对象访问，为驱动代码建立系统坐标。",
    invariant:
      "虚拟地址必须绑定进程语境，句柄必须绑定句柄表与访问检查，对象生存期由引用而非名称决定。",
    terms: ["进程", "虚拟内存", "线程", "系统服务", "句柄与对象", "1.1 进程"],
    chain: [
      "定位进程地址空间",
      "解释页状态",
      "关联线程栈",
      "穿越系统调用",
      "解析句柄对象",
      "访问命名对象",
    ],
  },
  {
    slug: "wkp-02-getting-started-kernel-development",
    title: "第2章 开始内核开发",
    thesis:
      "安装Visual Studio、WDK与调试工具，创建最小驱动项目，实现DriverEntry/Unload、部署、加载和安全跟踪。",
    invariant:
      "工具版本、目标架构、签名模式、服务项、DriverObject回调和卸载清理一致，重复加载不依赖残留状态。",
    terms: [
      "WDK",
      "驱动项目",
      "DriverEntry",
      "Unload",
      "内核跟踪",
      "2.1 安装工具",
    ],
    chain: [
      "冻结工具版本",
      "创建驱动项目",
      "实现入口卸载",
      "构建签名",
      "部署加载",
      "跟踪并卸载",
    ],
  },
  {
    slug: "wkp-03-kernel-programming-basics",
    title: "第3章 内核程序设计基础",
    thesis:
      "围绕异常、终止、返回值、IRQL、C++边界、构建配置、内核API、字符串、池、链表、驱动对象和设备对象建立契约。",
    invariant:
      "每次API调用检查NTSTATUS，内存池与IRQL兼容，字符串有界，链表和对象在卸载前恢复到基线。",
    terms: [
      "NTSTATUS",
      "IRQL",
      "UNICODE_STRING",
      "内存池",
      "设备对象",
      "3.1 内核程序设计的一般准则",
    ],
    chain: [
      "检查调用约束",
      "选择返回状态",
      "约束C++用法",
      "分配标记内存",
      "组织链表对象",
      "释放驱动资源",
    ],
  },
  {
    slug: "wkp-04-driver-start-to-finish",
    title: "第4章 驱动程序：从头到尾",
    thesis:
      "从初始化、注册表参数和设备对象进入客户端/驱动通信协议、Create/Close、DeviceIoControl、安装和端到端测试。",
    invariant:
      "IOCTL编码、输入输出长度、访问位、共享结构版本和BytesReturned在用户/内核两侧完全一致。",
    terms: [
      "控制设备",
      "IOCTL",
      "DeviceIoControl",
      "分发例程",
      "通信协议",
      "4.1 简介",
    ],
    chain: [
      "定义协议结构",
      "初始化驱动",
      "创建设备符号链接",
      "打开关闭句柄",
      "分发IOCTL",
      "安装端到端测试",
    ],
  },
  {
    slug: "wkp-05-debugging",
    title: "第5章 调试",
    thesis:
      "从Debugging Tools和WinDbg基础进入本地内核调试、主机/目标机完整内核调试和驱动级断点、栈、对象检查。",
    invariant:
      "符号、源码、二进制、目标构建和转储属于同一版本；每个结论能由命令输出、调用栈或内存结构复核。",
    terms: [
      "WinDbg",
      "符号",
      "本地内核调试",
      "主机/目标机",
      "崩溃转储",
      "5.1 Debugging Tools for Windows",
    ],
    chain: [
      "安装调试工具",
      "配置符号源码",
      "建立目标连接",
      "命中驱动断点",
      "检查栈与对象",
      "保存并复盘会话",
    ],
  },
  {
    slug: "wkp-06-kernel-mechanisms",
    title: "第6章 内核机制",
    thesis:
      "系统讲解IRQL、DPC、APC、SEH、崩溃转储、线程同步、分发器对象、高IRQL自旋锁和工作项。",
    invariant:
      "代码、数据和锁满足当前IRQL；DPC保持短小，等待只发生在允许级别，获取释放顺序闭合且崩溃可诊断。",
    terms: [
      "IRQL",
      "DPC/APC",
      "SEH",
      "分发器对象",
      "自旋锁与工作项",
      "6.1 中断请求级别",
    ],
    chain: [
      "读取当前IRQL",
      "选择延迟机制",
      "隔离异常路径",
      "分析崩溃转储",
      "选择同步原语",
      "下放工作项",
    ],
  },
  {
    slug: "wkp-07-io-request-packet",
    title: "第7章 I/O请求包",
    thesis:
      "从设备节点、IRP与I/O栈位置、分发和完成进入用户缓冲访问、缓冲/直接I/O，并以Zero驱动贯通读写。",
    invariant:
      "每个IRP只完成一次，IoStatus与Information准确，缓冲访问方式匹配设备标志和IOCTL Method，挂起路径保有资源。",
    terms: [
      "IRP",
      "I/O栈位置",
      "IoCompleteRequest",
      "缓冲/直接I/O",
      "Zero驱动",
      "7.1 IRP简介",
    ],
    chain: [
      "接收IRP",
      "读取栈位置",
      "验证长度方法",
      "访问系统缓冲",
      "设置完成状态",
      "由客户端核对结果",
    ],
  },
  {
    slug: "wkp-08-process-thread-notifications",
    title: "第8章 进程和线程通知",
    thesis:
      "实现进程创建/退出、线程和映像加载通知，把内核事件安全排队并提供给用户模式客户端消费。",
    invariant:
      "回调路径非阻塞且有界，记录拥有所需字符串和标识副本，卸载先注销回调再排空队列。",
    terms: [
      "进程通知",
      "线程通知",
      "映像加载通知",
      "事件队列",
      "用户模式客户端",
      "8.1 进程通知",
    ],
    chain: [
      "注册通知回调",
      "捕获创建退出",
      "复制稳定字段",
      "写入有界队列",
      "客户端读取",
      "注销并排空",
    ],
  },
  {
    slug: "wkp-09-object-registry-notifications",
    title: "第9章 对象和注册表通知",
    thesis:
      "用对象操作前后回调构建进程保护驱动，再实现注册表前后通知、策略管理、客户端控制和性能约束。",
    invariant:
      "保护策略快照并发安全，前回调只削减允许权限，后回调不伪造结果；注册表回调尊重通知类别和递归边界。",
    terms: [
      "Ob回调",
      "进程保护",
      "访问掩码",
      "注册表回调",
      "策略客户端",
      "9.1 对象通知",
    ],
    chain: [
      "注册对象回调",
      "管理保护集合",
      "过滤句柄权限",
      "注册表前后观察",
      "客户端更新策略",
      "注销并等待回调",
    ],
  },
  {
    slug: "wkp-10-file-system-minifilters",
    title: "第10章 文件系统小过滤驱动",
    thesis:
      "从小过滤器加载、Altitude、INF和操作回调进入删除保护、文件名、上下文、文件备份以及通信端口客户端。",
    invariant:
      "前后回调配对，上下文与文件对象生存期一致，名称查询引用成对释放，备份顺序不会递归过滤自身。",
    terms: [
      "Minifilter",
      "Altitude",
      "前后回调",
      "文件上下文",
      "通信端口",
      "10.1 简介",
    ],
    chain: [
      "注册过滤器",
      "安装选择Altitude",
      "拦截创建设置信息",
      "管理名称上下文",
      "备份写入数据",
      "与用户模式通信",
    ],
  },
  {
    slug: "wkp-11-miscellaneous-topics",
    title: "第11章 其他主题",
    thesis:
      "综合驱动签名、Driver Verifier、原生API、传统过滤驱动、设备监视器、驱动挂钩和内核库，明确支持边界。",
    invariant:
      "签名链与启动策略匹配，Verifier配置可复现，过滤设备附加/移除有序；不使用不受支持的挂钩作为生产方案。",
    terms: [
      "驱动签名",
      "Driver Verifier",
      "Native API",
      "过滤设备",
      "驱动挂钩",
      "11.1 驱动程序签名",
    ],
    chain: [
      "建立签名信任",
      "启用定向Verifier",
      "调用原生API",
      "附加过滤设备",
      "监视转发请求",
      "评估挂钩与内核库",
    ],
  },
  {
    slug: "wkp-official-final-review",
    title: "《Windows内核编程》全书总复习",
    thesis:
      "用控制设备、系统通知、进程保护、文件备份小过滤器和设备监视器串联全书11章与185个核心目录层级。",
    invariant:
      "构建签名、对象与IRP生存期、IRQL、回调注销、过滤上下文、通信协议和恢复步骤均有可重放证据。",
    terms: [
      "隔离虚拟机",
      "IRP证据",
      "通知回调",
      "Minifilter",
      "Verifier闭环",
      "开发与调试",
    ],
    chain: [
      "恢复干净快照",
      "构建签名驱动",
      "运行控制设备",
      "验证系统通知",
      "运行过滤项目",
      "注入故障并恢复",
    ],
  },
];

export const wkpOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
  unit.terms.map(
    (term, index): ReviewQuestion => ({
      id: unit.slug + "-" + (index + 1),
      chapter: unit.slug,
      level: index < 2 ? 2 : index < 4 ? 3 : 4,
      question:
        unit.title +
        "：如何用“" +
        term +
        "”定位“" +
        unit.chain[index % unit.chain.length] +
        "”阶段的首个内核状态分叉？",
      answer:
        unit.thesis +
        " 在隔离虚拟机固定WDK、sys/PDB、Verifier和输入，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”的IRQL、对象、缓冲与NTSTATUS；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 清理或恢复快照后以同一事件序列重放。",
      tags: [term, unit.chain[index % unit.chain.length], "Windows内核编程"],
    }),
  ),
);
