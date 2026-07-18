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
    slug: "lkd-official-learning-map",
    title: "《Linux内核设计与实现（原书第3版）》权威学习地图",
    thesis:
      "按机械工业出版社完整目录与InformIT原版目录，把20章404个层级组织为内核基础、进程接口、中断并发、内存I/O和工程社区五条源码路线。",
    invariant:
      "20章404个正式层级都有唯一教学归属；Linux 2.6.34历史实现与现代内核迁移说明明确分开。",
    terms: [
      "20章404层级",
      "Linux 2.6.34",
      "对象图",
      "控制流",
      "源码证据",
      "现代对照并恢复",
    ],
    chain: [
      "核对版本目录",
      "建立源码基线",
      "追踪对象生存期",
      "追踪控制流",
      "注入单变量故障",
      "现代对照并恢复",
    ],
  },
  {
    slug: "lkd-01-linux-kernel-intro",
    title: "第1章 Linux内核简介",
    thesis:
      "从UNIX历史、操作系统边界、Linux单体内核特征、版本模型和开发者社区建立全书坐标。",
    invariant:
      "讨论始终区分用户空间、内核空间与硬件边界，并把设计判断绑定到明确内核版本和社区流程。",
    terms: [
      "UNIX传统",
      "操作系统内核",
      "单体内核",
      "内核版本",
      "开发者社区",
      "连接开发社区",
    ],
    chain: [
      "回看UNIX传统",
      "划定内核职责",
      "比较内核设计",
      "定位Linux特征",
      "识别版本基线",
      "连接开发社区",
    ],
  },
  {
    slug: "lkd-02-getting-started",
    title: "第2章 从内核出发",
    thesis:
      "把源码获取、源码树、配置编译、安装和内核开发约束连接成可重复的开发环境。",
    invariant:
      "源码提交、配置、工具链、构建产物和启动内核一致；失败路径不会破坏可启动基线。",
    terms: [
      "Git源码",
      "Kconfig",
      "内核源码树",
      "GNU C",
      "内核栈",
      "检查开发约束",
    ],
    chain: [
      "取得源码",
      "核对源码树",
      "配置内核",
      "并行编译",
      "安装与回退",
      "检查开发约束",
    ],
  },
  {
    slug: "lkd-03-process-management",
    title: "第3章 进程管理",
    thesis:
      "围绕task_struct、进程状态、上下文、家族树、fork写时拷贝、线程和退出回收解释Linux进程生命周期。",
    invariant:
      "每个任务的状态、父子关系、地址空间共享和引用生存期可追踪；创建失败与退出路径最终释放描述符。",
    terms: [
      "task_struct",
      "进程状态",
      "写时拷贝",
      "内核线程",
      "进程终结",
      "退出并回收",
    ],
    chain: [
      "定位任务描述符",
      "读取进程状态",
      "建立家族关系",
      "复制或共享资源",
      "运行线程",
      "退出并回收",
    ],
  },
  {
    slug: "lkd-04-process-scheduling",
    title: "第4章 进程调度",
    thesis:
      "从多任务和策略进入CFS调度类、时间记账、进程选择、睡眠唤醒、抢占、实时策略和调度系统调用。",
    invariant:
      "可运行集合、优先级/权重、CPU亲和与抢占条件明确；唤醒不会丢失，调度延迟与公平性有可比较证据。",
    terms: [
      "CFS",
      "调度器类",
      "运行队列",
      "抢占",
      "实时调度",
      "验证抢占与实时",
    ],
    chain: [
      "分类工作负载",
      "映射优先级权重",
      "进入运行队列",
      "选择下个任务",
      "处理睡眠唤醒",
      "验证抢占与实时",
    ],
  },
  {
    slug: "lkd-05-system-calls",
    title: "第5章 系统调用",
    thesis:
      "区分API、POSIX、C库和系统调用，追踪调用号、陷入处理、参数验证、实现绑定与系统调用上下文。",
    invariant:
      "用户指针、长度、权限和返回值在入口处验证；ABI编号稳定，错误路径不泄漏内核数据或资源。",
    terms: [
      "系统调用ABI",
      "调用号",
      "入口处理",
      "参数验证",
      "用户指针",
      "返回用户空间",
    ],
    chain: [
      "区分API与ABI",
      "选择调用号",
      "进入内核入口",
      "复制并验证参数",
      "执行内核实现",
      "返回用户空间",
    ],
  },
  {
    slug: "lkd-06-kernel-data-structures",
    title: "第6章 内核数据结构",
    thesis:
      "比较内核链表、kfifo、idr映射、红黑树和复杂度，用侵入式结构、所有权和访问模式选择数据结构。",
    invariant:
      "节点所有者、插入删除协议、遍历并发和销毁顺序明确；复杂度与真实访问模式匹配。",
    terms: ["list_head", "kfifo", "idr", "红黑树", "复杂度", "删除并销毁"],
    chain: [
      "描述访问模式",
      "选择结构",
      "初始化所有权",
      "插入与查找",
      "并发遍历",
      "删除并销毁",
    ],
  },
  {
    slug: "lkd-07-interrupts",
    title: "第7章 中断和中断处理",
    thesis:
      "从中断来源、注册释放、共享处理、上下文限制、控制状态和/proc/interrupts解释上半部。",
    invariant:
      "处理程序短小、不可阻塞、只访问安全数据；注册与释放配对，共享中断先验证设备来源。",
    terms: [
      "IRQ",
      "中断处理程序",
      "共享中断",
      "中断上下文",
      "中断控制",
      "释放并核对计数",
    ],
    chain: [
      "识别中断源",
      "注册处理程序",
      "确认共享来源",
      "保存最小状态",
      "唤起下半部",
      "释放并核对计数",
    ],
  },
  {
    slug: "lkd-08-bottom-halves",
    title: "第8章 下半部和推后执行的工作",
    thesis:
      "比较软中断、tasklet、工作队列和历史BH/任务队列，按上下文、并发、延迟与睡眠需求选择延后机制。",
    invariant:
      "上半部只留下稳定状态并安排一次工作；下半部上下文与锁协议匹配，卸载前排空所有延后任务。",
    terms: [
      "软中断",
      "tasklet",
      "工作队列",
      "下半部锁",
      "延后执行",
      "禁用排空并卸载",
    ],
    chain: [
      "切分紧急工作",
      "选择执行上下文",
      "安排软中断",
      "串行化tasklet",
      "下放工作队列",
      "禁用排空并卸载",
    ],
  },
  {
    slug: "lkd-09-sync-intro",
    title: "第9章 内核同步介绍",
    thesis:
      "从临界区、竞争来源、保护对象、死锁、争用和可扩展性建立内核同步问题模型。",
    invariant:
      "先定义共享状态与不变量，再选择锁；获取顺序无环，临界区范围与争用证据可解释。",
    terms: ["临界区", "竞争条件", "加锁", "死锁", "可扩展性", "测量争用扩展"],
    chain: [
      "列出共享状态",
      "识别并发来源",
      "写出不变量",
      "划定临界区",
      "证明锁序无环",
      "测量争用扩展",
    ],
  },
  {
    slug: "lkd-10-sync-methods",
    title: "第10章 内核同步方法",
    thesis:
      "系统比较原子操作、自旋锁、读写锁、信号量、互斥体、完成量、顺序锁、抢占控制与内存屏障。",
    invariant:
      "同步原语与上下文、等待能力、读写比例和内存顺序匹配；所有获取释放路径闭合。",
    terms: [
      "原子操作",
      "自旋锁",
      "互斥体",
      "顺序锁",
      "内存屏障",
      "验证释放与唤醒",
    ],
    chain: [
      "确认执行上下文",
      "判断能否睡眠",
      "评估读写比例",
      "选择同步原语",
      "规定内存顺序",
      "验证释放与唤醒",
    ],
  },
  {
    slug: "lkd-11-timers-time",
    title: "第11章 定时器和时间管理",
    thesis:
      "从HZ、jiffies回绕、硬时钟、时钟中断、实际时间、内核定时器和延迟执行理解时间管理。",
    invariant:
      "时间比较能处理回绕，定时器生存期与对象一致；上下文允许的延迟方法与精度需求匹配。",
    terms: [
      "HZ",
      "jiffies",
      "时钟中断",
      "内核定时器",
      "schedule_timeout",
      "取消同步并释放",
    ],
    chain: [
      "选择时间基准",
      "换算节拍",
      "处理回绕",
      "注册定时器",
      "执行回调",
      "取消同步并释放",
    ],
  },
  {
    slug: "lkd-12-memory-management",
    title: "第12章 内存管理",
    thesis:
      "从页和区进入页分配、kmalloc/vmalloc、slab、内核栈、高端内存与每CPU分配，建立分配选择树。",
    invariant:
      "分配标志与上下文匹配，虚拟连续和物理连续需求明确；失败可处理，释放API与来源一致。",
    terms: [
      "struct page",
      "GFP标志",
      "kmalloc",
      "slab",
      "每CPU数据",
      "按来源释放",
    ],
    chain: [
      "确定容量连续性",
      "选择内存区",
      "设置GFP上下文",
      "分配并初始化",
      "观察缓存与映射",
      "按来源释放",
    ],
  },
  {
    slug: "lkd-13-vfs",
    title: "第13章 虚拟文件系统",
    thesis:
      "用VFS抽象连接超级块、inode、dentry、file对象及其操作表，解释文件系统和进程相关结构。",
    invariant:
      "路径解析得到的对象引用、缓存状态和操作表一致；挂载、打开、关闭和回收路径成对。",
    terms: ["VFS", "super_block", "inode", "dentry", "file", "调用操作并释放"],
    chain: [
      "进入通用接口",
      "定位超级块",
      "解析inode",
      "命中目录项缓存",
      "创建file对象",
      "调用操作并释放",
    ],
  },
  {
    slug: "lkd-14-block-io",
    title: "第14章 块I/O层",
    thesis:
      "从块设备、buffer_head、bio、I/O向量、请求队列和调度器解释块I/O合并、排队与派发。",
    invariant:
      "bio片段、方向、设备和完成回调准确；请求只完成一次，排队策略的延迟与吞吐权衡可测。",
    terms: [
      "块设备",
      "buffer_head",
      "bio",
      "请求队列",
      "I/O调度器",
      "完成并唤醒",
    ],
    chain: [
      "拆分块设备请求",
      "构造bio向量",
      "进入请求队列",
      "合并与排序",
      "派发到驱动",
      "完成并唤醒",
    ],
  },
  {
    slug: "lkd-15-process-address-space",
    title: "第15章 进程地址空间",
    thesis:
      "围绕mm_struct、VMA、区域树/链表、find_vma、mmap/munmap和页表解释进程地址空间。",
    invariant:
      "VMA区间不重叠且权限一致，mm生存期与任务共享关系明确；映射变更与页表更新同步。",
    terms: ["mm_struct", "VMA", "mmap", "munmap", "页表", "解除映射并回收"],
    chain: [
      "定位内存描述符",
      "枚举VMA区间",
      "查找相交区域",
      "创建映射",
      "更新页表",
      "解除映射并回收",
    ],
  },
  {
    slug: "lkd-16-page-cache-writeback",
    title: "第16章 页高速缓存和页回写",
    thesis:
      "从缓存策略、address_space、基树、缓冲区缓存和flusher线程解释脏页、回收与页回写。",
    invariant:
      "缓存页归属和脏状态可追踪；回写、错误和回收不会丢失用户已确认的数据语义。",
    terms: [
      "页高速缓存",
      "address_space",
      "脏页",
      "flusher线程",
      "回写拥塞",
      "回收并核对持久性",
    ],
    chain: [
      "定位缓存映射",
      "查找缓存页",
      "标记脏页",
      "触发回写",
      "处理拥塞",
      "回收并核对持久性",
    ],
  },
  {
    slug: "lkd-17-devices-modules",
    title: "第17章 设备与模块",
    thesis:
      "从设备类型和模块生命周期进入依赖、参数、符号导出、kobject/ktype/kset、引用计数、sysfs和uevent。",
    invariant:
      "模块引用、设备对象层级和sysfs文件生存期一致；卸载先停止事件并释放所有引用。",
    terms: [
      "内核模块",
      "导出符号",
      "kobject",
      "kset",
      "sysfs",
      "注销排空并卸载",
    ],
    chain: [
      "分类设备",
      "构建加载模块",
      "解析依赖参数",
      "建立设备模型",
      "发布sysfs属性",
      "注销排空并卸载",
    ],
  },
  {
    slug: "lkd-18-debugging",
    title: "第18章 调试",
    thesis:
      "从printk和日志缓冲进入oops、符号、调试配置、SysRq、gdb/kgdb、探测、二分搜索与社区求助。",
    invariant:
      "运行内核、配置、vmlinux、模块和日志版本匹配；故障可由首个栈、提交或状态分叉复现。",
    terms: ["printk", "oops", "kallsyms", "kgdb", "git bisect", "整理证据求助"],
    chain: [
      "冻结故障输入",
      "提高可观察性",
      "捕获oops与符号",
      "缩小探测范围",
      "二分定位提交",
      "整理证据求助",
    ],
  },
  {
    slug: "lkd-19-portability",
    title: "第19章 可移植性",
    thesis:
      "从字长、类型、对齐、结构填补、字节序、时间、页长、处理器排序和配置差异建立可移植内核代码规则。",
    invariant:
      "数据布局、宽度、字节序和内存顺序显式；代码不依赖单一架构的隐含大小、对齐或配置。",
    terms: [
      "字长",
      "数据对齐",
      "字节序",
      "页长度",
      "处理器排序",
      "验证SMP与配置",
    ],
    chain: [
      "识别架构假设",
      "固定宽度类型",
      "检查对齐填补",
      "转换字节序",
      "适配页长时间",
      "验证SMP与配置",
    ],
  },
  {
    slug: "lkd-20-patches-community",
    title: "第20章 补丁、开发和社区",
    thesis:
      "把社区协作、编码风格、维护系统、错误报告、补丁创建、Git提交和发送评审连接成交付闭环。",
    invariant:
      "每个补丁只解决清晰问题，构建与测试可复现，提交说明解释原因，收件人和版本迭代可追踪。",
    terms: [
      "编码风格",
      "MAINTAINERS",
      "错误报告",
      "Git补丁",
      "邮件评审",
      "回应评审并迭代",
    ],
    chain: [
      "定位维护者",
      "重现并描述问题",
      "形成最小改动",
      "运行风格与测试",
      "生成发送补丁",
      "回应评审并迭代",
    ],
  },
  {
    slug: "lkd-official-final-review",
    title: "《Linux内核设计与实现（原书第3版）》全书总复习",
    thesis:
      "用对象生存期、执行上下文、同步、内存、I/O和错误恢复六条证据线贯通20章，能从用户现象回到具体内核结构与控制路径。",
    invariant:
      "每个跨章结论包含版本、配置、入口、对象、上下文、锁、状态变化、原始信号和恢复结果。",
    terms: [
      "进程与调度",
      "中断与同步",
      "内存与地址空间",
      "VFS与块I/O",
      "设备与社区",
      "修复恢复并重放",
    ],
    chain: [
      "冻结版本输入",
      "定位入口对象",
      "标记执行上下文",
      "核对锁与生存期",
      "捕获首个分叉",
      "修复恢复并重放",
    ],
  },
];

export const lkdOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
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
        "”阶段的首个源码状态分叉？",
      answer:
        unit.thesis +
        " 固定源码提交、.config、工具和输入，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”的对象、上下文、锁和状态；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 撤销设置或恢复快照后以同一输入重放。",
      tags: [
        term,
        unit.chain[index % unit.chain.length],
        "Linux内核设计与实现",
      ],
    }),
  ),
);
