import type { ReviewQuestion } from "./types";

export const wkpIrpIoManagerQuestions: ReviewQuestion[] = [
  {
    id: "wkp-irp-io-manager-1",
    chapter: "wkp-irp-io-manager",
    level: 2,
    question: `IRP的结构是什么？I/O栈位置的作用是什么？`,
    answer:
      `IRP（I/O Request Packet）由两部分组成：①IRP头部——包含IoStatus（Status状态码+Information传输字节数）、Cancel标志、关联的线程、MDL指针等，由I/O管理器维护；②I/O栈位置数组（IO_STACK_LOCATION）——每个设备栈层对应一个栈位置，包含MajorFunction（主功能码如IRP_MJ_READ）、MinorFunction（次功能码如IRP_MN_START_DEVICE）、Parameters（联合体，不同MJ有不同含义如读偏移/长度）、DeviceObject和FileObject指针。驱动通过IoGetCurrentIrpStackLocation获取当前栈位置，读取功能码和参数。IoCallDriver会自动将栈指针下移一层，IoSkipCurrentIrpStackLocation跳过当前层直接传递。I/O栈位置使同一个IRP能沿设备栈逐层传递，每层有独立的参数空间，无需拷贝IRP。`,
    tags: ["IRP", "I/O栈位置", "数据结构"],
  },
  {
    id: "wkp-irp-io-manager-2",
    chapter: "wkp-irp-io-manager",
    level: 3,
    question: `描述IRP从创建到完成的完整生命周期，包括同步和异步处理路径。`,
    answer:
      `IRP生命周期四阶段：①创建——I/O管理器根据用户请求（如NtReadFile）调用IoCreateIrp分配IRP，填充头部和栈位置，关联用户缓冲区（Buffered IO分配SystemBuffer，Direct IO创建MDL）；②派发——IoCallDriver(TargetDevice, Irp)将IRP交给驱动，I/O管理器查找DriverObject->MajorFunction[MJ]对应的派遣函数并调用，同时栈指针下移一层；③处理——驱动可同步完成（直接IoCompleteRequest返回状态）、异步处理（IoMarkIrpPending标记挂起，返回STATUS_PENDING，后续在DPC/工作线程中完成）、或向下传递（IoCallDriver到下层设备，IoSetCompletionRoutine注册完成回调）；④完成——IoCompleteRequest设置IoStatus.Status/Information，沿设备栈向上调用各层CompletionRoutine，最终I/O管理器释放IRP并唤醒等待的用户线程（若异步则通知I/O完成端口或APC）。同步路径用户线程阻塞等待；异步路径用户线程继续执行，完成后通过回调/事件/IOCP通知。`,
    tags: ["IRP生命周期", "同步异步", "I/O管理器"],
  },
  {
    id: "wkp-irp-io-manager-3",
    chapter: "wkp-irp-io-manager",
    level: 3,
    question: `什么是完成例程（Completion Routine）？它的调用顺序和典型用途是什么？`,
    answer:
      `完成例程是驱动通过IoSetCompletionRoutine注册在IRP上的回调函数，当下层设备完成IRP（IoCompleteRequest）时被调用。调用顺序自底向上：IRP沿设备栈向下传递经过层A→B→C，C完成后先调用C的完成例程，再调用B的，最后调用A的。每个完成例程可检查IoStatus.Status判断成功失败。典型用途：①过滤驱动监控下层I/O结果；②上层驱动在下层完成后继续处理（如拆分大请求为小请求，下层完成后检查是否还有未完成部分）；③修改完成状态（如将错误转换为自定义码）；④释放与IRP关联的资源（如之前分配的辅助IRP）。完成例程返回STATUS_SUCCESS表示接受完成（继续向上传递），返回STATUS_MORE_PROCESSING_REQUIRED表示拦截完成（不继续向上，通常配合自己重新创建的IRP使用）。`,
    tags: ["完成例程", "CompletionRoutine", "设备栈"],
  },
  {
    id: "wkp-irp-io-manager-4",
    chapter: "wkp-irp-io-manager",
    level: 4,
    question: `IRP取消机制如何工作？驱动实现可取消I/O需要注意什么？`,
    answer:
      `IRP取消机制：用户调用CancelIo或I/O超时，I/O管理器调用IoCancelIrp将IRP的Cancel标志设为TRUE，若驱动注册了CancelRoutine则调用它。驱动在CancelRoutine中需：从自己的IRP队列中移除该IRP，设置IoStatus.Status为STATUS_CANCELLED，调用IoCompleteRequest完成它，并释放队列锁（注意避免与正常完成路径的竞态）。实现可取消I/O的注意事项：①IRP必须先加入可搜索队列再注册CancelRoutine，顺序不能反（否则CancelRoutine找不到IRP）；②持有队列自旋锁时检查Cancel标志——若已取消则直接完成，否则注册CancelRoutine并释放锁；③CancelRoutine和正常完成路径都要从队列移除IRP，必须用自旋锁保护且移除后立即判断是否已由另一方处理；④IoSetCancelRoutine(NULL)返回值判断CancelRoutine是否已被调用——若返回NULL表示CancelRoutine正在执行，需等待其完成。取消是内核编程中最易出竞态的场景之一，Driver Verifier的Cancel/IRP检查专门验证。`,
    tags: ["IRP取消", "竞态", "CancelRoutine"],
  },
];
