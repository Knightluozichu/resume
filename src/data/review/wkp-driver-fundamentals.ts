import type { ReviewQuestion } from "./types";

export const wkpDriverFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "wkp-driver-fundamentals-1",
    chapter: "wkp-driver-fundamentals",
    level: 2,
    question: "WDM设备栈的三层结构是什么？各层职责是什么？",
    answer:
      "WDM设备栈由三层组成：①过滤驱动（Filter Driver）——可选层，分上层（Upper Filter）和下层（Lower Filter），拦截/监控/修改流经的I/O请求，不影响设备核心功能；②功能驱动（Functional Device Object, FDO）——设备的核心逻辑所在，实现DriverEntry、AddDevice和所有派遣函数（DispatchRead/Write/DeviceControl），处理设备的实际I/O操作；③总线驱动（Physical Device Object, PDO）——由微软提供（如PCI/USB总线驱动），负责枚举设备、管理硬件资源、与硬件直接通信。IRP沿设备栈自顶向下传递，每层处理自己关心的部分后通过IoCallDriver向下传递，完成时通过完成例程自底向上返回。",
    tags: ["架构", "设备栈", "WDM"],
  },
  {
    id: "wkp-driver-fundamentals-2",
    chapter: "wkp-driver-fundamentals",
    level: 2,
    question: "DriverEntry和AddDevice分别何时调用？各做什么事？",
    answer:
      "DriverEntry在驱动首次加载时由SCM（服务控制管理器）调用一次，负责初始化驱动级资源：创建驱动对象（WDM中由I/O管理器传入）/ WdfDriverCreate（WDF），注册所有MajorFunction派遣函数（IRP_MJ_READ/WRITE/DEVICE_CONTROL等），设置AddDevice回调和DriverUnload回调，初始化全局资源（如注册表读取配置）。AddDevice在PnP管理器发现设备时调用，每次发现一个设备调用一次：创建设备对象（IoCreateDevice / WdfDeviceCreate），设置设备扩展（DeviceExtension）存储设备私有数据，将设备对象附加到设备栈（IoAttachDeviceToDeviceStack），设置设备标志（DO_BUFFERED_IO/DO_DIRECT_IO），创建符号链接暴露给用户态。DriverEntry是驱动级初始化，AddDevice是设备级初始化。",
    tags: ["生命周期", "DriverEntry", "AddDevice"],
  },
  {
    id: "wkp-driver-fundamentals-3",
    chapter: "wkp-driver-fundamentals",
    level: 3,
    question: "DO_BUFFERED_IO和DO_DIRECT_IO的区别是什么？如何选择？",
    answer:
      "DO_BUFFERED_IO（缓冲I/O）：I/O管理器在非分页池分配一份与用户缓冲区等大的内核副本，IRP的AssociatedIrp.SystemBuffer指向它。写入时I/O管理器在派发前将用户数据拷入副本，读取时在完成后将副本拷回用户态。优点是简单安全（驱动只操作内核地址），缺点是多一次拷贝，适合小缓冲区（如DeviceIoControl的控制码）。DO_DIRECT_IO（直接I/O）：I/O管理器创建MDL描述用户缓冲区，ProbeAndLockPages锁定物理页，驱动通过MmGetSystemAddressForMdlSafe获取内核虚拟地址直接访问。优点是零拷贝高效，缺点是MDL管理复杂，适合大缓冲区（如大批量读写/DMA）。选择依据：缓冲区小且频率低选Buffered，缓冲区大或性能敏感选Direct。两者都不设则用Neither I/O（驱动自行处理用户地址，需ProbeForRead/Write）。",
    tags: ["I/O模式", "缓冲区管理"],
  },
  {
    id: "wkp-driver-fundamentals-4",
    chapter: "wkp-driver-fundamentals",
    level: 4,
    question: "设备扩展（DeviceExtension）的作用是什么？设计时需要注意什么？",
    answer:
      "设备扩展是IoCreateDevice时分配的设备对象私有数据区（非分页池），是驱动存储设备级状态的核心位置。典型内容包括：设备状态标志、硬件资源（中断、寄存器基址、DMA通道）、下层设备对象指针（IoAttachDeviceToDeviceStack返回值）、自旋锁/事件等同步对象、IRP队列、DPC对象、WDF上下文指针等。设计注意：①必须从非分页池分配（设备对象本身在非分页池），所以扩展内不能含分页数据；②同步对象（自旋锁等）放在扩展中便于多核访问；③中断/DPC中访问的数据必须在扩展中（高IRQL不能访问分页池）；④结构布局对齐性能敏感字段；⑤WDF中用WdfObjectAllocateContext给框架对象挂上下文，框架自动管理生命周期。设备扩展是驱动的「设备级全局变量」，设计好坏直接影响驱动正确性和可维护性。",
    tags: ["设备扩展", "设计模式", "非分页池"],
  },
];
