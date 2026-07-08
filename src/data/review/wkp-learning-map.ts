import type { ReviewQuestion } from "./types";

export const wkpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "wkp-learning-map-1",
    chapter: "wkp-learning-map",
    level: 2,
    question: "全书五阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "驱动基础 → I/O与IRP → 内存管理 → 同步与中断 → 高级机制与总复习。顺序由依赖关系决定：先掌握驱动框架（WDM/WDF）和设备栈才有「能加载、能派发」的基础；I/O管理器与IRP是内核I/O的统一货币，有了它才能理解请求如何在设备栈中流转；驱动要分配和管理内存，于是进入分页/非分页池与MDL；内核是多处理器并发环境，需要IRQL与自旋锁保护共享数据，于是进入同步与中断；最后PnP/电源和WDM vs WDF是高级机制，总复习用一个驱动从加载到卸载的全链路串联全部知识点。先「能加载」，再「能请求」，然后「能管理内存」，接着「能同步并发」，最后「能贯通」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "wkp-learning-map-2",
    chapter: "wkp-learning-map",
    level: 2,
    question: "内核驱动与用户态程序的根本区别是什么？",
    answer:
      "用户态程序运行在Ring 3，有独立地址空间，错误只崩溃自己；内核驱动运行在Ring 0，共享内核地址空间，可直接访问硬件，错误导致蓝屏（BSOD）崩溃整个系统。用户态通过Win32 API（CreateFile/ReadFile）请求I/O，内核驱动通过I/O管理器接收IRP来响应请求。用户态程序由操作系统调度，内核驱动由I/O管理器和PnP管理器驱动（DriverEntry/AddDevice/DispatchXxx）。用户态内存可换出，内核驱动必须按IRQL选择分页池或非分页池。根本区别在于特权级、错误影响范围和执行模型。",
    tags: ["架构", "内核基础"],
  },
  {
    id: "wkp-learning-map-3",
    chapter: "wkp-learning-map",
    level: 3,
    question: "用一个驱动从加载到卸载的全生命周期描述全书主线，列出各机制的入场时机。",
    answer:
      "一个驱动从加载到卸载：①驱动加载（第2章）——SCM加载.sys，调用DriverEntry，创建驱动对象并注册派遣函数；②设备枚举（第2/8章）——PnP管理器发现设备，调用AddDevice，创建设备对象加入设备栈，发送IRP_MN_START_DEVICE；③I/O请求处理（第3章）——用户ReadFile触发I/O管理器创建IRP，IoCallDriver沿设备栈派发，驱动处理后IoCompleteRequest完成；④内存分配（第4章）——ExAllocatePool2分配非分页池存储设备扩展和数据结构；⑤MDL直接I/O（第5章）——大缓冲区通过MmGetSystemAddressForMdlSafe零拷贝访问；⑥中断处理（第6章）——硬件中断触发ISR(DIRQL)快速响应，DPC(DISPATCH_LEVEL)完成善后；⑦同步保护（第7章）——KeAcquireSpinLock保护共享数据；⑧电源管理（第8章）——IRP_MN_SET_POWER切换D0/D3状态；⑨卸载（第9-10章）——IRP_MN_REMOVE_DEVICE移除设备，DriverUnload释放全部资源。一次生命周期，九大机制全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "wkp-learning-map-4",
    chapter: "wkp-learning-map",
    level: 4,
    question: "会写内核驱动和懂内核机制有什么本质区别？举例说明。",
    answer:
      "会写内核驱动是「能编译运行」——照着WDK样例抄DriverEntry、AddDevice就能加载驱动。懂内核机制是「能解释系统为什么这样设计」：为什么IRP要有I/O栈位置而非扁平结构（设备栈分层传递）、为什么非分页池要在DISPATCH_LEVEL可用（高IRQL不能缺页）、为什么自旋锁要提升IRQL而非仅原子操作（防止同核抢占导致死锁）、为什么ISR要极短而DPC做善后（减少高优先级中断屏蔽时间）、为什么MDL要锁定物理页（防止用户页被换出导致DMA写入错误地址）。把内核当黑盒的人遇到蓝屏只能重启；懂机制的人能读懂!analyze -v、用Driver Verifier定位泄漏、理解IRQL约束排查竞态。区分标志：能否解释「Windows内核为什么这样设计」而非只是「能编译它」。",
    tags: ["架构", "工程思维"],
  },
];
