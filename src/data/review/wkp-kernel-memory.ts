import type { ReviewQuestion } from "./types";

export const wkpKernelMemoryQuestions: ReviewQuestion[] = [
  {
    id: "wkp-kernel-memory-1",
    chapter: "wkp-kernel-memory",
    level: 2,
    question: "非分页池和分页池的区别是什么？如何选择？",
    answer:
      "非分页池（NonPaged Pool）：物理页被永久锁定，永不换出到磁盘，任何IRQL（包括DISPATCH_LEVEL和DIRQL）均可安全访问。用于ISR/DPC中访问的数据、自旋锁保护的共享数据、DMA缓冲区、设备扩展等高IRQL场景。代价是占用物理内存无法回收。分页池（Paged Pool）：数据可被换出到磁盘，仅在PASSIVE_LEVEL和APC_LEVEL可安全访问，更高IRQL访问会缺页导致蓝屏。用于仅低IRQL访问的数据、注册表缓存、大块低频内存等。选择原则：代码路径的最高IRQL决定选型——若在DPC或ISR中访问必须用非分页池，若仅在PASSIVE_LEVEL的派遣函数中访问可用分页池节省物理内存。分配函数为ExAllocatePool2（新API，传POOL_FLAG_NON_PAGED或POOL_FLAG_PAGED）。",
    tags: ["内存管理", "分页池", "非分页池", "IRQL"],
  },
  {
    id: "wkp-kernel-memory-2",
    chapter: "wkp-kernel-memory",
    level: 2,
    question: "ExAllocatePool2相比旧API有什么改进？为什么ExAllocatePoolWithTag被废弃？",
    answer:
      "ExAllocatePool2(Flags, Size, Tag)是Windows 10 2004引入的新API，相比ExAllocatePoolWithTag的改进：①默认零初始化——旧API的NonPagedPool不保证清零，残留内核数据是安全漏洞（信息泄漏），ExAllocatePool2默认清零消除此风险；②返回NULL而非蓝屏——旧API在分配失败时（如过大Size）可能直接蓝屏，ExAllocatePool2返回NULL让驱动优雅处理；③统一标志位——POOL_FLAG_NON_PAGED/POOL_FLAG_PAGED/POOL_FLAG_UNINITIALIZED等组合更清晰，旧API的PoolType枚举含义混乱；④支持零大小分配——旧API传Size=0会蓝屏，新API安全处理。ExAllocatePoolWithTag被废弃的核心原因是安全隐患：不初始化导致内核数据泄漏，这在CVE中多次出现。所有新驱动应使用ExAllocatePool2，旧代码迁移时需注意返回NULL的检查逻辑。",
    tags: ["内存分配", "ExAllocatePool2", "安全"],
  },
  {
    id: "wkp-kernel-memory-3",
    chapter: "wkp-kernel-memory",
    level: 3,
    question: "池标签（Pool Tag）的作用是什么？在调试中如何使用？",
    answer:
      "池标签是一个4字节标识符，在ExAllocatePool2/ExAllocatePoolWithTag分配时指定，标记该块内存的归属驱动。作用：①泄漏追踪——Driver Verifier的Pool Tracking按标签统计分配/释放计数，!poolused命令列出各标签的未释放字节数，快速定位哪个驱动的哪个标签泄漏；②调试定位——!pool <地址>命令可查看某地址所属的标签，帮助判断是哪个驱动分配的；③代码可读性——标签通常用驱动名的4个字符（如'dsmp'），在崩溃dump中可读。使用规范：①同一驱动的不同用途用不同标签（如'rbuf'接收缓冲、'sbuf'发送缓冲）；②标签在驱动内定义为常量，分配和释放必须匹配；③ExFreePoolWithTag释放时传相同标签（旧API），新API的ExFreePool不强制但建议一致；④禁止使用'None'或'Ddk '等通用标签，会与其他驱动混淆。池标签是内核内存调试的核心工具。",
    tags: ["池标签", "调试", "内存泄漏"],
  },
  {
    id: "wkp-kernel-memory-4",
    chapter: "wkp-kernel-memory",
    level: 4,
    question: "在高IRQL下访问分页内存会怎样？如何排查和避免此类蓝屏？",
    answer:
      "在高IRQL（>= DISPATCH_LEVEL）下访问分页内存时，若该页已被换出，内存管理器需要缺页处理，但缺页处理需要APC_LEVEL（等待I/O完成），而当前IRQL高于APC_LEVEL无法降级，导致内核蓝屏（BUGCODE为IRQL_NOT_LESS_OR_EQUAL或PAGE_FAULT_IN_NONPAGED_AREA）。排查方法：①!analyze -v查看蓝屏堆栈，确认当前IRQL和访问地址；②!pte <地址>查看页表项，若Valid位为0说明页已换出；③检查调用栈定位哪个函数在高IRQL访问了分页数据；④用Driver Verifier的Force IRQL Checking强制在每次提升IRQL时检查是否锁定了分页代码/数据。避免方法：①所有DPC/ISR/定时器回调中访问的数据必须来自非分页池；②分页代码段不能在DISPATCH_LEVEL调用——用MmLockPagableCodeSection锁定关键代码段；③自旋锁持有时绝不能访问分页内存（自旋锁在DISPATCH_LEVEL）；④设备扩展本身在非分页池，但其中的指针不能指向分页数据；⑤WDF框架对象的上下文空间默认在非分页池。规则：IRQL决定内存选型，不是反过来。",
    tags: ["蓝屏", "IRQL", "分页内存", "调试"],
  },
];
