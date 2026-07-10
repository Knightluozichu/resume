import type { ReviewQuestion } from "./types";

export const wkpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "wkp-final-review-1",
    chapter: "wkp-final-review",
    level: 3,
    question: `用一个驱动从加载到卸载的全生命周期串联全书九大知识点。`,
    answer:
      `①驱动加载（第2章）——SCM加载.sys，DriverEntry中WdfDriverCreate创建驱动对象，注册EvtDeviceAdd回调；②设备枚举（第2/8章）——PnP管理器发现设备调用EvtDeviceAdd，WdfDeviceCreate创建设备对象，加入设备栈，EvtDevicePrepareHardware初始化硬件，IRP_MN_START_DEVICE分配资源；③I/O请求处理（第3章）——用户ReadFile触发I/O管理器创建IRP，WDF将其封装为WDFREQUEST放入WDFQUEUE，EvtIoRead回调处理；④内存分配（第4章）——驱动用ExAllocatePool2分配非分页池存储接收缓冲区（因DPC中需访问）；⑤MDL直接I/O（第5章）——大缓冲区通过Irp->MdlAddress获取MDL，MmGetSystemAddressForMdlSafe零拷贝映射内核地址；⑥中断处理（第6章）——硬件中断触发ISR(DIRQL)快速读寄存器ACK，IoRequestDpc排队DPC，DPC(DISPATCH_LEVEL)处理数据并完成IRP；⑦同步保护（第7章）——DPC中KeAcquireSpinLock保护共享链表（接收队列与用户读取并发访问）；⑧电源管理（第8章）——系统休眠时IRP_MN_SET_POWER(D3)保存上下文断电，恢复时D0重新初始化；⑨卸载（第9-10章）——IRP_MN_REMOVE_DEVICE触发EvtDeviceReleaseHardware释放资源，WDF自动删除对象树，DriverUnload清理全局资源。九大机制在一次生命周期中全部参与。`,
    tags: ["总复习", "生命周期", "全链路"],
  },
  {
    id: "wkp-final-review-2",
    chapter: "wkp-final-review",
    level: 3,
    question: `IRQL是贯穿全书的核心概念。梳理IRQL如何约束内存分配、同步原语和中断处理。`,
    answer:
      `IRQL是内核编程的「红绿灯」，贯穿三大主题：①内存分配约束——IRQL>=DISPATCH_LEVEL只能访问非分页池（分页池访问会缺页蓝屏），所以DPC/ISR/定时器中的数据必须在非分页池（ExAllocatePool2传POOL_FLAG_NON_PAGED）；设备扩展本身在非分页池。PASSIVE_LEVEL可安全使用分页池。②同步原语约束——自旋锁（KeAcquireSpinLock）提升至DISPATCH_LEVEL并自旋，适合高IRQL极短临界区；FastMutex提升至APC_LEVEL并阻塞等待，适合PASSIVE_LEVEL较长临界区；KeWaitForSingleObject非零超时需PASSIVE_LEVEL（DISPATCH_LEVEL不可阻塞调度）。选型由当前/目标IRQL决定。③中断处理约束——ISR运行在DIRQL（高于DISPATCH_LEVEL），不能获取自旋锁（不同IRQL死锁风险）、不能分配任何池内存、不能调用大多数内核API；DPC运行在DISPATCH_LEVEL，可获取自旋锁但仍不能分配分页池、不能阻塞等待。ISR只能做极短操作，DPC做善后。IRQL是三大主题的统一约束源——内存看IRQL能不能缺页，同步看IRQL能不能阻塞，中断看IRQL能调用什么API。`,
    tags: ["IRQL", "总复习", "约束关系"],
  },
  {
    id: "wkp-final-review-3",
    chapter: "wkp-final-review",
    level: 4,
    question: `一个驱动收到IRP_MJ_READ请求后，从用户态到硬件的完整数据路径是什么？涉及哪些内核机制？`,
    answer:
      `完整数据路径：①用户态——应用程序调用ReadFile(hDevice, buf, size, &bytesRead, NULL)；②系统调用——NtReadFile将请求转为I/O管理器调用，检查句柄和参数；③IRP创建——I/O管理器根据设备标志选择I/O方式：Buffered IO分配SystemBuffer(非分页池)并拷贝用户数据；Direct IO创建MDL，MmProbeAndLockPages锁定用户物理页，MmGetSystemAddressForMdlSafe映射内核地址；Neither IO直接传用户地址（驱动需ProbeForRead）；④派发——IoCallDriver沿设备栈派发，各层IoGetCurrentIrpStackLocation读参数；⑤过滤层——Upper Filter可拦截监控，IoSkipCurrentIrpStackLocation + IoCallDriver向下传递；⑥功能驱动——DispatchRead处理：若需硬件数据则配置DMA（GetScatterGatherList用MDL的PFN数组）或写寄存器发起读，返回STATUS_PENDING挂起IRP；⑦硬件——设备DMA引擎从硬件读取数据到锁定的物理页（Direct IO零拷贝直接写入用户缓冲区物理页）；⑧中断——设备完成时产生中断，ISR(DIRQL)ACK中断+IoRequestDpc，DPC(DISPATCH_LEVEL)中IoCompleteRequest完成IRP，设置IoStatus.Information=读取字节数；⑨完成回调——沿设备栈向上调用CompletionRoutine；⑩用户态——I/O管理器将SystemBuffer拷回用户态(Buffered IO)或直接通知(Direct IO已写入)，唤醒等待线程，ReadFile返回。涉及机制：I/O管理器、IRP生命周期、MDL、设备栈、DMA、ISR/DPC、IRQL、完成例程——全书知识在一条数据路径上贯通。`,
    tags: ["总复习", "数据路径", "IRP", "DMA", "中断"],
  },
  {
    id: "wkp-final-review-4",
    chapter: "wkp-final-review",
    level: 4,
    question: `驱动开发中最容易导致蓝屏的五类错误是什么？如何系统性预防？`,
    answer:
      `五类常见蓝屏错误：①IRQL违规——在高IRQL访问分页内存、在高IRQL调用阻塞API、持自旋锁时分页。预防：明确每条代码路径的最高IRQL，DPC/ISR中只访问非分页池，Driver Verifier开Force IRQL Checking。②内存泄漏/双重释放——ExAllocatePool2分配后未ExFreePool、释放后继续使用（Use-After-Free）、Tag不匹配。预防：每个分配配对释放，用Driver Verifier的Pool Tracking追踪，WDF用对象生命周期自动管理。③IRP完成错误——完成未拥有的IRP、IoCompleteRequest调用两次、STATUS_PENDING返回后未标记IoMarkIrpPending、IRP取消竞态。预防：严格遵循IRP所有权规则（只有当前持有者能完成），取消路径用自旋锁保护队列，Driver Verifier开IRP Tracking。④竞态条件——多核同时访问共享数据未加锁、锁序不一致死锁、DPC与线程竞态。预防：所有共享数据用同步原语保护，统一锁序，Driver Verifier开Deadlock Detection。⑤PnP/电源状态错误——在Stopped状态处理I/O、START_DEVICE前访问硬件、REMOVE_DEVICE后未从设备栈分离。预防：严格按状态机处理IRP，WDF自动管理状态机。系统性预防：Driver Verifier全开+SDV(Static Driver Verifier)静态分析+代码Review+压力测试。`,
    tags: ["总复习", "蓝屏", "错误预防", "Driver Verifier"],
  },
];
