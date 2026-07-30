#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "linux-kernel-design";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/linux-kernel-design-v2-profiles.json",
);
const PUBLISHER = "https://www.cmpedu.com/books/book/5610272.htm";
const ORIGINAL =
  "https://www.informit.com/store/linux-kernel-development-9780132629560";
const SAMPLE =
  "https://www.informit.com/content/images/9780672329463/samplepages/9780672329463.pdf";

const SOURCES = {
  publisher: PUBLISHER,
  original: ORIGINAL,
  sample: SAMPLE,
  releases: "https://www.kernel.org/releases.html",
  kernelDocs: "https://docs.kernel.org/",
  core: "https://docs.kernel.org/core-api/index.html",
  scheduler: "https://docs.kernel.org/scheduler/index.html",
  locking: "https://docs.kernel.org/locking/index.html",
  workqueue: "https://docs.kernel.org/core-api/workqueue.html",
  time: "https://docs.kernel.org/timers/index.html",
  mm: "https://docs.kernel.org/mm/index.html",
  processAddrs: "https://docs.kernel.org/mm/process_addrs.html",
  filesystems: "https://docs.kernel.org/filesystems/index.html",
  block: "https://docs.kernel.org/block/index.html",
  driver: "https://docs.kernel.org/driver-api/index.html",
  trace: "https://docs.kernel.org/trace/index.html",
  process: "https://docs.kernel.org/process/index.html",
};

const SOURCE_META = {
  publisher: [
    "机械工业出版社典藏版完整目录",
    "official-chinese-publisher-complete-numbered-outline",
    "核对Robert Love、中文版版次、ISBN与20章404个正式层级",
  ],
  original: [
    "InformIT英文第3版官方页面",
    "official-original-publisher-edition-page",
    "核对2010年英文第3版、ISBN 9780132629560、20章结构与Linux 2.6主题范围",
  ],
  sample: [
    "InformIT官方70页授权样章",
    "official-publisher-authorized-sample",
    "局部核对完整英文目录、前言、Linux 2.6时代声明和开放正文样例；不扩大整书授权",
  ],
  releases: [
    "kernel.org活动内核发布说明",
    "upstream-release-policy",
    "核对mainline、stable、longterm分类；实验仍必须记录精确构建而不能只写latest",
  ],
  kernelDocs: [
    "Linux内核上游文档入口",
    "upstream-documentation",
    "路由当前核心API、子系统、开发流程和工具资料",
  ],
  core: [
    "Linux内核Core API",
    "upstream-core-api-documentation",
    "核对当前核心对象、容器、并发辅助与生命周期接口",
  ],
  scheduler: [
    "Linux调度器上游文档",
    "upstream-scheduler-documentation",
    "核对当前调度类、统计、拓扑与追踪边界",
  ],
  locking: [
    "Linux锁与内存序上游文档",
    "upstream-locking-documentation",
    "核对自旋锁、互斥体、lockdep、内存屏障与上下文限制",
  ],
  workqueue: [
    "Linux工作队列上游文档",
    "upstream-workqueue-documentation",
    "核对worker pool、并发管理、回收上下文与刷新/销毁边界",
  ],
  time: [
    "Linux定时器与时间上游文档",
    "upstream-timekeeping-documentation",
    "核对时钟源、clockevent、高精度定时器和NO_HZ边界",
  ],
  mm: [
    "Linux内存管理上游文档",
    "upstream-memory-management-documentation",
    "核对页/folio、分配、回收、页缓存、写回与调试接口",
  ],
  processAddrs: [
    "Linux进程地址空间上游文档",
    "upstream-vma-locking-documentation",
    "核对mm、VMA、maple tree以及mmap/VMA/rmap锁层次",
  ],
  filesystems: [
    "Linux文件系统上游文档",
    "upstream-filesystem-documentation",
    "核对VFS对象、路径解析、锁与具体文件系统边界",
  ],
  block: [
    "Linux块层上游文档",
    "upstream-block-documentation",
    "核对bio、request、blk-mq、队列与追踪接口",
  ],
  driver: [
    "Linux驱动API上游文档",
    "upstream-driver-documentation",
    "核对设备模型、模块、sysfs、引用与驱动生命周期",
  ],
  trace: [
    "Linux追踪上游文档",
    "upstream-tracing-documentation",
    "核对ftrace、tracepoint与调试捕获边界",
  ],
  process: [
    "Linux开发流程上游文档",
    "upstream-development-process-documentation",
    "核对编码、补丁、审阅、维护者与提交当前规则",
  ],
};

const PATHS = {
  "lkd-unit-01": "01-foundations/lkd-01-linux-kernel-intro",
  "lkd-unit-02": "01-foundations/lkd-02-getting-started",
  "lkd-unit-03": "02-process-interface/lkd-03-process-management",
  "lkd-unit-04": "02-process-interface/lkd-04-process-scheduling",
  "lkd-unit-05": "02-process-interface/lkd-05-system-calls",
  "lkd-unit-06": "03-structures-events/lkd-06-kernel-data-structures",
  "lkd-unit-07": "03-structures-events/lkd-07-interrupts",
  "lkd-unit-08": "03-structures-events/lkd-08-bottom-halves",
  "lkd-unit-09": "04-concurrency-time/lkd-09-sync-intro",
  "lkd-unit-10": "04-concurrency-time/lkd-10-sync-methods",
  "lkd-unit-11": "04-concurrency-time/lkd-11-timers-time",
  "lkd-unit-12": "05-memory-address-space/lkd-12-memory-management",
  "lkd-unit-13": "06-filesystems-io/lkd-13-vfs",
  "lkd-unit-14": "06-filesystems-io/lkd-14-block-io",
  "lkd-unit-15": "05-memory-address-space/lkd-15-process-address-space",
  "lkd-unit-16": "05-memory-address-space/lkd-16-page-cache-writeback",
  "lkd-unit-17": "07-devices-debug/lkd-17-devices-modules",
  "lkd-unit-18": "07-devices-debug/lkd-18-debugging",
  "lkd-unit-19": "08-portability-community/lkd-19-portability",
  "lkd-unit-20": "08-portability-community/lkd-20-patches-community",
};

const SPECS = {
  "lkd-unit-01": [
    "2.6.34的内核身份怎样与当前目标构建分轨，避免把版本号当机制？",
    "把书中版本命名或传统UNIX比较直接推广到当前发行版",
    "每条陈述绑定源码提交、配置、架构与时间轨",
    "版本身份表、历史/当前差分与社区来源图",
    "UNIX历史、Linux版本、内核职责与开发者社区",
    "identity",
    ["releases", "kernelDocs", "process"],
  ],
  "lkd-unit-02": [
    "源码获取、配置、构建与安装怎样成为可恢复且可复现的工件链？",
    "复用未知.config、在生产机直接安装或只保留启动成功截图",
    "同提交配置工具链产生可核对工件且旧内核可回退",
    "源码提交、配置差分、构建摘要、启动日志与回退项",
    "Git、补丁、源码树、配置、并行构建、安装与内核开发约束",
    "build",
    ["releases", "kernelDocs", "process"],
  ],
  "lkd-unit-03": [
    "task、线程、mm、fork/COW与退出回收怎样组成可追踪生命周期？",
    "把线程当独立进程实现、忽略COW首次写入或提前释放任务对象",
    "创建、共享、分离、退出与回收保持引用和父子关系",
    "task/mm/VMA/页表轨迹、COW缺页与退出回收记录",
    "进程状态、task结构、fork/vfork、线程、内核线程与终结",
    "process",
    ["core", "scheduler", "mm", "processAddrs"],
  ],
  "lkd-unit-04": [
    "调度策略、可运行状态、优先级、抢占与切换怎样由trace而不是份额口号解释？",
    "把理想权重份额冒充实测、忽略睡眠唤醒或混淆调度类",
    "enqueue、pick、switch与wakeup能解释每次运行选择",
    "调度类与策略身份、sched轨迹、CPU拓扑和延迟分布",
    "多任务、策略、公平调度、实现、抢占、实时与调度系统调用",
    "scheduler",
    ["scheduler", "trace", "locking"],
  ],
  "lkd-unit-05": [
    "系统调用怎样从ABI入口经过参数验证到上下文与返回值形成闭环？",
    "把用户指针当内核指针、假定一次复制完整或用性能替代语义",
    "每条路径验证号、参数、权限、复制结果、副作用与错误码",
    "ABI表、入口/退出trace、用户复制与错误注入记录",
    "API/POSIX/C库、调用号、处理程序、参数传递、实现与上下文",
    "syscall",
    ["core", "trace", "process"],
  ],
  "lkd-unit-06": [
    "链表、kfifo、ID映射与树怎样按操作、并发和生命周期选择？",
    "照搬旧idr或红黑树字段、遍历时并发删除或破坏容器不变量",
    "成员集合、次序、引用和锁在每次操作前后成立",
    "容器状态图、操作计数、并发保护与当前接口迁移表",
    "链表、队列、映射、二叉树、选择与复杂度",
    "structure",
    ["core", "locking"],
  ],
  "lkd-unit-07": [
    "中断注册、共享、上下文、上半部与控制怎样由事件轨迹验收？",
    "在硬中断上下文睡眠、错误共享dev_id或释放仍在使用的处理器",
    "确认来源后快速完成必要工作并把可推后部分安全移交",
    "IRQ身份、处理时长、上下文、推后事件与释放同步记录",
    "中断、处理程序、上下半部、注册、共享、上下文与中断控制",
    "interrupt",
    ["core", "trace", "locking"],
  ],
  "lkd-unit-08": [
    "softirq、tasklet历史与当前workqueue怎样按上下文和并发需求迁移？",
    "把tasklet当当前通用建议、在回收路径使用无救援worker队列",
    "推后工作不丢不重，刷新/取消/销毁后无残留执行",
    "排队、开始、结束、取消、积压与worker pool轨迹",
    "下半部、softirq、tasklet、工作队列、机制选择与锁",
    "deferred",
    ["workqueue", "trace", "locking"],
  ],
  "lkd-unit-09": [
    "临界区、竞争、死锁与扩展性怎样从共享对象和冲突边推导？",
    "按代码块加锁而不声明数据、形成锁序环或用单CPU结果证明安全",
    "所有共享对象有所有者和同步协议且锁图无环",
    "共享对象表、并发上下文、锁图、KCSAN/lockdep与反例",
    "临界区、竞争条件、并发来源、保护对象、死锁与争用",
    "race",
    ["locking", "trace"],
  ],
  "lkd-unit-10": [
    "原子、自旋锁、信号量、互斥体、完成量、顺序锁与屏障怎样按上下文选择？",
    "原子上下文使用可睡眠锁、错误IRQ状态或把锁当完整内存序证明",
    "原语的睡眠性、所有权、IRQ、抢占和内存序与上下文匹配",
    "原语选择表、锁序、lockdep、竞争轨迹与内存序litmus",
    "原子、各类锁、信号量、互斥体、完成量、顺序锁、抢占与屏障",
    "locking",
    ["locking", "trace"],
  ],
  "lkd-unit-11": [
    "HZ、jiffies、时钟源、定时器与延迟怎样跨回绕和NO_HZ正确计时？",
    "直接比较回绕计数、用忙等执行长延迟或忽略时钟源变化",
    "截止时间与回调在声明时钟域和容差内成立",
    "时钟/clockevent身份、定时器事件、延迟分布与取消记录",
    "时间概念、HZ、jiffies、硬时钟、定时器和延迟执行",
    "time",
    ["time", "trace"],
  ],
  "lkd-unit-12": [
    "页、区、kmalloc/vmalloc、slab、栈、高端内存与per-CPU分配怎样按约束选择？",
    "原子上下文睡眠分配、请求不必要高order块或释放身份不匹配",
    "连续性、上下文、NUMA、生命周期和释放协议均满足",
    "分配标志、页/folio、slab、失败注入、内存与释放轨迹",
    "页、区、分配器、slab、栈、高端映射、per-CPU数据与选择",
    "allocator",
    ["mm", "locking", "trace"],
  ],
  "lkd-unit-13": [
    "VFS的superblock、inode、dentry、file与进程文件表怎样连接路径语义？",
    "把dentry当磁盘目录项、忽略负dentry/挂载边界或并发重命名",
    "路径解析返回正确对象且引用、锁和权限检查闭合",
    "对象关系图、路径/挂载trace、dentry缓存与引用记录",
    "通用接口、抽象层、VFS四类对象、操作、缓存和进程关系",
    "vfs",
    ["filesystems", "locking", "trace"],
  ],
  "lkd-unit-14": [
    "bio、request、队列与I/O调度怎样从提交到完成连接当前blk-mq？",
    "把书中旧调度器当当前列表、混淆bio与request或忽略部分完成",
    "每个I/O可从发起对象追到队列、设备、完成状态与错误",
    "bio/request关系、block trace、队列配置、延迟与错误记录",
    "块设备、buffer head、bio、请求队列和历史I/O调度器",
    "block",
    ["block", "trace", "locking"],
  ],
  "lkd-unit-15": [
    "mm、VMA、mmap/munmap、页表与当前maple tree锁层怎样迁移？",
    "继续假定VMA只在链表/红黑树、违反mmap/VMA/rmap锁序",
    "地址区间不重叠且权限、索引、页表与锁保护一致",
    "mm/VMA图、maple tree查询、锁状态、页表与缺页轨迹",
    "地址空间、mm、VMA、区域操作、mmap/munmap与页表",
    "vma",
    ["processAddrs", "mm", "locking", "trace"],
  ],
  "lkd-unit-16": [
    "页缓存、address_space、历史基树/页哈希与写回怎样迁移到当前folio/xarray路径？",
    "用旧flusher名字解释当前实现、持续脏化超过写回或忽略节流",
    "脏化、节流、提交、完成与回收可按mapping和设备闭环",
    "folio/mapping状态、writeback/block事件、节流和排空记录",
    "缓存、回收、页缓存、address_space、历史索引与flusher线程",
    "writeback",
    ["mm", "block", "trace"],
  ],
  "lkd-unit-17": [
    "模块、kobject/ktype/kset、sysfs与uevent怎样形成设备生命周期？",
    "对象仍可达时卸载模块、错误引用计数或把sysfs当任意配置接口",
    "注册、绑定、引用、用户可见属性与反向释放顺序闭合",
    "设备对象图、模块/引用状态、sysfs/uevent与release轨迹",
    "设备类型、模块构建加载、参数符号、设备模型、sysfs与事件",
    "device",
    ["driver", "core", "process", "trace"],
  ],
  "lkd-unit-18": [
    "printk、oops、符号、调试配置、kgdb、探针与git bisect怎样按症状选择？",
    "没有稳定好坏判定就二分、日志淹没故障或符号/配置不匹配",
    "症状可重复且每个捕获绑定提交、配置、机器和时间",
    "复现脚本、日志/oops/trace/转储、符号与二分记录",
    "打印、oops、调试选项、SysRq、调试器、探针、统计与二分",
    "debug",
    ["trace", "process", "kernelDocs"],
  ],
  "lkd-unit-19": [
    "字长、类型、对齐、字节序、时间、页长与内存序怎样用架构矩阵验收？",
    "假定long和指针宽度、直接序列化结构体或依赖char符号性",
    "显式宽度、布局、转换和内存序在目标架构矩阵成立",
    "多架构构建、布局断言、字节夹具、页大小与litmus结果",
    "移植史、字长类型、对齐填充、字节序、时间、页长和处理器排序",
    "portability",
    ["core", "locking", "process"],
  ],
  "lkd-unit-20": [
    "当前编码、MAINTAINERS、补丁、审阅与错误报告怎样形成可复核贡献链？",
    "混入无关格式化、发送错误维护者、缺测试或提交无证据性能主张",
    "每个补丁一个逻辑变化且历史、测试、接收者与审阅闭合",
    "补丁系列、base commit、检查/测试、维护者与审阅回复",
    "社区、编码风格、管理系统、错误报告、补丁生成与提交",
    "patch",
    ["process", "kernelDocs", "releases"],
  ],
};

const COMMON_GATES = [
  [
    "源码与构建身份",
    "记录uname -r、源码提交、.config、架构、编译器、启动参数和工件摘要。",
  ],
  [
    "安全实验环境",
    "只在可丢弃虚拟机或专用测试机执行，具备快照、串口/带外控制台、超时和旧内核回退。",
  ],
  [
    "基线与单故障",
    "同一负载先建立稳定基线，每次只改变一个对象并保存首个分岔与竞争性解释。",
  ],
  [
    "撤销与同输入恢复",
    "撤销控制、清理模块/任务/缓存/队列后以同输入恢复；否则标记失败或未知。",
  ],
];

const MAP_SPEC = [
  "怎样以404个正式层级重建2.6.34历史轨与当前上游对象证据图？",
  "遗漏正式小节、把授权样章当整书或用latest替代精确构建",
  "404个坐标各覆盖一次且历史/当前陈述与目标构建身份分开",
  "404坐标矩阵、20章对象路由、迁移差分与安全实验门",
  "20章404个正式层级、授权样章、Linux 2.6.34历史轨与当前上游轨",
  "cross",
  ["releases", "kernelDocs", "process", "locking", "mm", "trace"],
];

const REVIEW_SPEC = [
  "进程、调度、系统调用、中断、锁、时间、内存、VFS、块层与设备怎样全链恢复？",
  "跨子系统同时注错、混用配置或只保留最终现象",
  "单故障首错可归因且撤销后任务、引用、队列、内存和I/O恢复",
  "全链构建清单、跨章对象ID、逐故障trace与回归报告",
  "进程接口、事件并发、时间内存、文件I/O、设备调试与贡献流程",
  "cross",
  [
    "releases",
    "kernelDocs",
    "scheduler",
    "locking",
    "mm",
    "filesystems",
    "block",
    "driver",
    "trace",
    "process",
  ],
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/u)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

function alphaIndex(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "chapter"
      ? profile.officialUnitId?.replace("lkd-unit-", "C")
      : profile.role === "learning-map"
        ? "MAP"
        : "REVIEW";
  return `LKD3-${scope}-${alphaIndex(index)}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function makeStages(title, focus, fault, invariant) {
  return [
    {
      label: "冻结对象身份",
      object: `${title}涉及的${focus}`,
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: `${title}的参考对象链`,
      control: "只运行预注册基线操作",
      signal: `状态转移、tracepoint、计数与“${invariant}”`,
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: `${title}的故障边界`,
      control: `只注入“${fault}”`,
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: `${title}的恢复对象链`,
      control: "以相同构建、机器和输入重放",
      signal: `重新满足“${invariant}”且资源计数回基线`,
      rollback: "保存报告并恢复实验快照",
    },
  ];
}

function enrich(id, title, target, concepts, tuple, role, officialUnitId) {
  const [
    question,
    fault,
    invariant,
    artifact,
    focus,
    probe,
    specificSourceIds,
  ] = tuple;
  const chapterSlug = path.basename(target);
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    question,
    fault,
    invariant,
    artifact,
    focus,
    probe,
    sourceIds: ["publisher", "original", "sample", ...specificSourceIds],
    stages: makeStages(title, focus, fault, invariant),
    gates: COMMON_GATES.map(([label, detail]) => ({ label, detail })),
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为内核对象、版本身份、执行上下文、trace信号与恢复条件
- 只注入“${profile.fault}”，定位${profile.title}相对参考构建的首个分岔
- 交付${profile.artifact}，明确区分Linux 2.6.34成书轨、当前上游轨与发行版轨

</Objectives>`;
}

function sourceSection(profile) {
  const links = [...new Set(profile.sourceIds)]
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 来源合同、授权边界与三条版本轨

${profile.title}以[机械工业出版社典藏版完整目录](${PUBLISHER})核对Robert Love著、陈莉君与康华译《Linux内核设计与实现（原书第3版）》的20章404个正式层级；[InformIT英文第3版页面](${ORIGINAL})核对2010年英文版、ISBN 9780132629560与20章结构。中文版2011年版ISBN为9787111338291。

[InformIT官方70页样章](${SAMPLE})开放完整英文目录、前言和局部正文，允许核对作者目标、Linux 2.6时代声明与开放章节讲法，因此本站来源访问级别是authorized-sample。样章不授权其余正文、代码、图表或练习；${profile.title}是中文独立教学重构，不复制未开放内容。

${profile.title}把三条轨道分开：成书轨以Linux 2.6.34附近对象和API解释原书；当前上游轨以docs.kernel.org和目标源码核对变化；发行版轨还记录补丁集、配置、工具链和支持策略。当前对象不能倒写成作者观点，同名接口也不能证明语义未变。

${profile.title}涉及构建启动、模块、中断、锁、分配、映射、回写、块I/O、SysRq和故障注入。页面只给实验协议；破坏性步骤仅允许在可丢弃虚拟机或专用测试机执行，并必须具备快照、备份、串口/带外控制台、旧内核启动项、超时与停止条件。

### 本页独立事实来源

${links}`;
}

function mechanismFor(concept, profile, index) {
  const label = concept.replaceAll(".", "·");
  const variants = [
    `${profile.title}把${label}映射到“${profile.focus}”中的对象身份、所有者、引用与执行上下文。`,
    `${profile.title}为${label}分别记录2.6.34对象、目标源码对象和发行版配置，形成显式迁移差分。`,
    `${profile.title}对${label}预注册输入、唯一控制和首个trace信号，不以最终日志或平均值替代状态链。`,
    `${profile.title}用${label}触发一个可撤销反例，撤销后以同构建和输入重新验收“${profile.invariant}”。`,
  ];
  return variants[index % variants.length];
}

function conceptsSection(profile) {
  return `## 正式目录层级逐项解释

${profile.concepts
  .map((concept, index) => {
    const label = concept.replaceAll(".", "·");
    const key = evidenceKey(index, profile);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile, index)} ${profile.title}必须交付${profile.artifact}中的对应记录；目录标题证明范围，授权样章只支持局部核对，上游文档支持当前接口，三者都不能替代目标构建的运行证据。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作证据视图

${profile.title}先选择正式坐标、版本轨和执行上下文，再调整小输入复算对象数量或状态边界，最后逐阶段切换参考、单故障与恢复。每个视图都保留重置，不生成内核成熟度或风险综合分。

<Stepper>
  <Step title="对象版本：选择坐标、源码轨与上下文">
    <${profile.componentBase}ObjectVersionLab />
  </Step>
  <Step title="可执行探针：调整输入并复算状态">
    <${profile.componentBase}ExecutableProbeLab />
  </Step>
  <Step title="轨迹门：重放基线、单故障与恢复">
    <${profile.componentBase}TraceGateLab />
  </Step>
</Stepper>

${profile.title}的探针真正计算COW页、权重份额、用户边界字节、容器操作、事件预算、冲突关系、jiffies换算、分配order、路径分量、块载荷、VMA页数、写回排空、引用操作、二分轮次、ABI填充或补丁路由。公式公开且只用于小模型；真实时延、内存和并发结论必须来自目标源码、配置、机器与trace。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结源码提交、uname -r、.config、架构、编译器、启动参数、虚拟机/硬件、CPU拓扑、工具版本、负载、输入和预期结果。
2. ${profile.title}在干净快照上运行参考路径，保存${profile.artifact}；基线不稳定、对象身份不明或trace丢事件时先停止。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个状态分岔、CPU、上下文、时间、调用链、竞争性解释和停止条件。
4. ${profile.title}撤销唯一控制并清理任务、模块、引用、缓存、队列与映射，以同一输入重放；无法恢复“${profile.invariant}”则标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：授权样章等于整书开放">
${profile.title}可用出版社目录核对404坐标，用InformIT样章局部核对前言和开放正文；未开放章节仍只能独立重构，不能复制或虚构作者代码与判断。
</Callout>

<Callout type="trap" title="${profile.title}误区二：2.6.34对象可直接操作当前内核">
${profile.title}保留历史对象用于解释设计，但调度器、tasklet、idr、I/O调度器、VMA索引、页缓存、写回和调试接口均须回到目标源码与上游文档确认。
</Callout>

<Callout type="trap" title="${profile.title}误区三：有日志或能启动就证明机制">
${profile.title}不以启动成功、最终oops、单次平均值或综合分裁决；必须保存对象身份、稳定基线、单故障首错、竞争性解释、撤销和同输入恢复。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter") {
    return profile.concepts
      .map((concept, index) => ({ concept, index }))
      .filter(({ concept }) => /^\d+\.\d+/u.test(concept));
  }
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第\d+章/u.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的 ${key} 设计一个2.6.34/当前对象差分、目标构建基线、单变量故障、首个trace信号和恢复断言，并说明${label}的上下文边界。

<Answer>
${profile.title}先冻结提交、配置、架构、编译器、启动参数、机器和负载，把 ${key} 映射到对象身份、所有者、控制前值与预期信号；只注入“${profile.fault}”。${profile.title}保存首个分岔与竞争性解释，撤销后以同输入重新满足“${profile.invariant}”。样章之外的原文、未测配置和未捕获竞争保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么404个目录层级不是404段原文**

${profile.title}应怎样组合中文版目录、英文版页面、授权样章和上游文档？

<Answer>
出版社完整目录回答“第三版覆盖什么”，InformIT样章只支持开放页的局部正文核对，上游文档和目标源码回答“当前构建是什么”。${profile.title}的中文解释、探针、反例和练习均独立重构，不能冒充作者段落或把当前变化倒写进2.6.34。
</Answer>

**问题 ${start + 1}：什么时候必须停止内核实验**

${profile.title}缺少哪些条件时不能继续？

<Answer>
缺少可丢弃环境、快照、数据备份、串口/带外控制台、旧内核启动项、超时、停止条件、源码/配置身份或稳定基线中的任一项就停止。无法承受崩溃、数据损坏、设备失联或网络中断的生产对象不在实验范围内。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "构建身份",
      `${profile.title}的源码提交、配置、架构、工具链、启动参数与工件摘要`,
    ],
    [
      "执行上下文",
      `${profile.title}对象所处的进程、原子、中断、用户边界及睡眠/抢占约束`,
    ],
    [
      "内核对象",
      `${profile.title}中被观察或改变的task、锁、页、VMA、inode、bio、device或work`,
    ],
    [
      "首个分岔",
      `${profile.title}单故障轨迹相对参考构建最早出现状态或信号差异的位置`,
    ],
    [
      "迁移差分",
      `${profile.title}把2.6.34对象映射到目标源码当前对象、接口和配置的显式记录`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销控制并用原构建与负载恢复对象、引用、队列和信号的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；这些术语指向真实构建、对象、上下文与trace，不生成成熟度、风险或性能综合分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核链：出版社目录给404正式坐标，InformIT样章限定局部授权，2.6.34成书轨保留历史对象，当前上游与发行版轨核对目标实现，对象/上下文合同限定操作，透明探针暴露计数，单故障首错和同输入恢复决定能否上架。最终交付${profile.artifact}并同时报告未知配置与安全边界。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Robert Love《Linux Kernel Development, Third Edition》与机械工业出版社中文版完整目录"
  adaptedUrl="${ORIGINAL}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    probe: profile.probe,
    stages: profile.stages,
    gates: profile.gates,
  };
  return `"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies KernelDesignEvidenceModel;

export function ${profile.componentBase}ObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function ${profile.componentBase}ExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function ${profile.componentBase}TraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}ObjectVersionLab,
  ${profile.componentBase}ExecutableProbeLab,
  ${profile.componentBase}TraceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务。先冻结构建和对象身份，再以小输入观察状态与trace，最后用单故障和同输入恢复验收；只有守住“${profile.invariant}”并交付${profile.artifact}，目录术语、源码字段或一次成功启动才可能升级为机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录层级，用对象版本合同、可执行探针与轨迹门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: PUBLISHER,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);
if (manifest.units.length !== 20) {
  throw new Error(`正式章数应为20，实际${manifest.units.length}`);
}
for (const unit of manifest.units) {
  if (!SPECS[unit.id] || !PATHS[unit.id]) {
    throw new Error(`缺少单元配置：${unit.id}`);
  }
  if (unit.concepts[0]?.[0] !== unit.title) {
    throw new Error(`${unit.id}首坐标必须是章根`);
  }
}

const allCoordinates = manifest.units.flatMap((unit) =>
  unit.concepts.map((group) => group[0]),
);
if (allCoordinates.length !== 404) {
  throw new Error(`正式层级应为404，实际${allCoordinates.length}`);
}

const profiles = [
  enrich(
    "learningMap",
    "《Linux内核设计与实现（原书第3版）》404坐标证据学习地图",
    "00-guide/lkd-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      unit.concepts.map((group) => group[0]),
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《Linux内核设计与实现（原书第3版）》404坐标全书证据总复习",
    "09-review/lkd-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 22) {
  throw new Error(`页面数量应为22，实际${profiles.length}`);
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  const tuple = SPECS[unit.id];
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = ["publisher", "original", "sample", ...tuple[6]];
}
manifest.edition =
  "Robert Love著、陈莉君/康华译《Linux内核设计与实现（原书第3版）》，机械工业出版社，2011-04-30，335页，ISBN 9787111338291；英文第3版2010年，ISBN 9780132629560";
manifest.sourceKind =
  "official-chinese-publisher-complete-404-coordinate-outline-plus-original-publisher-edition-page-and-70-page-authorized-sample-plus-current-upstream-kernel-docs";
manifest.sourceUrl = PUBLISHER;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== PUBLISHER,
);
manifest.status =
  "verified-404-coordinate-authorized-sample-independent-rewrite-linux-2-6-34-current-upstream-migration";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母来自机械工业出版社完整目录：20章共404个正式层级，章根已包含在各章concepts中，不能重复再加20。InformIT英文第3版页面核对2010年、ISBN 9780132629560与20章结构，官方70页样章开放完整英文目录、前言和局部正文，因此全书标记authorized-sample，但授权不扩展到其余章节。原书基于Linux 2.6.34附近；当前轨不写latest，而要求每次冻结实际uname -r、源码提交、.config、架构和工具链，并用docs.kernel.org与目标源码核对调度、tasklet/workqueue、idr/xarray、blk-mq、VMA maple tree、folio、写回和调试等迁移。";
manifest.unitMappingEvidence = "quality/linux-kernel-design-v2-profiles.json";
manifest.factSourcePolicy =
  "出版社完整目录限定404坐标，InformIT授权样章只支持开放页局部核对；本站中文机制解释、探针、反例与练习为独立重构。Linux 2.6.34成书轨、当前上游轨和发行版轨必须分开；当前事实由docs.kernel.org和目标源码/配置核对，任何性能或并发结论必须绑定构建、机器、负载、trace、单故障和恢复。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 404,
  coveredFormalNodes: 404,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 20,
  officialFormalLevelsIncludingRoots: 404,
  formalNodes: 404,
  officialUnits: 20,
  authorizedSamplePages: 70,
  learningMapPages: 1,
  chapterPages: 20,
  finalReviewPages: 1,
  totalPages: 22,
  interactiveViews: 66,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "authorized-sample",
      historicalKernelTrack: "Linux 2.6.34",
      formalNodes: 404,
      officialChapterRoots: 20,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构22页、20章、404个正式层级与66个交互视图。");
