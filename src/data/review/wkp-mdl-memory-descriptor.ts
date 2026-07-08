import type { ReviewQuestion } from "./types";

export const wkpMdlMemoryDescriptorQuestions: ReviewQuestion[] = [
  {
    id: "wkp-mdl-memory-descriptor-1",
    chapter: "wkp-mdl-memory-descriptor",
    level: 2,
    question: "MDL是什么？它在直接I/O中扮演什么角色？",
    answer:
      "MDL（Memory Descriptor List，内存描述符表）是Windows内核用于描述一段虚拟地址对应的物理页映射关系的结构体。它包含MDL头部（大小、标志、起始虚拟地址、字节计数）和紧随其后的PFN（Page Frame Number，物理页帧号）数组。在直接I/O（DO_DIRECT_IO）中，MDL的角色是：I/O管理器为用户缓冲区创建MDL，通过ProbeAndLockPages锁定用户物理页（防止换出），驱动通过MmGetSystemAddressForMdlSafe获取这些物理页在内核地址空间的连续虚拟地址映射，从而零拷贝地访问用户数据。MDL将散列的用户物理页（用户虚拟地址连续但物理页可能不连续）映射为内核虚拟地址空间中的连续区域，让驱动像访问普通连续缓冲区一样操作，无需关心底层物理页分布。",
    tags: ["MDL", "直接I/O", "内存映射"],
  },
  {
    id: "wkp-mdl-memory-descriptor-2",
    chapter: "wkp-mdl-memory-descriptor",
    level: 3,
    question: "描述使用MDL进行直接I/O的完整流程，包括分配、映射和清理。",
    answer:
      "直接I/O的MDL完整流程：①I/O管理器阶段——用户发起ReadFile/WriteFile，I/O管理器发现设备标志含DO_DIRECT_IO，调用IoAllocateMdl为用户缓冲区创建MDL（MDL头部+PFN数组空间），调用MmProbeAndLockPages验证用户地址有效性并锁定物理页（填充PFN数组），将MDL指针存入IRP->MdlAddress；②驱动阶段——派遣函数中通过Irp->MdlAddress获取MDL，调用MmGetSystemAddressForMdlSafe(Mdl, NormalPagePriority)获取内核虚拟地址（首次调用时建立系统VA映射，后续直接返回缓存），驱动通过该内核地址读写数据；③完成阶段——I/O管理器在IoCompleteRequest后调用MmUnlockPages解锁物理页，调用IoFreeMdl释放MDL结构体。若驱动自己创建MDL（非I/O管理器），则需手动调用IoAllocateMdl→MmProbeAndLockPages→MmMapLockedPagesSpecifyCache→使用→MmUnmapLockedPages→MmUnlockPages→IoFreeMdl，顺序严格不可错。",
    tags: ["MDL流程", "直接I/O", "ProbeAndLockPages"],
  },
  {
    id: "wkp-mdl-memory-descriptor-3",
    chapter: "wkp-mdl-memory-descriptor",
    level: 3,
    question: "MmGetSystemAddressForMdlSafe与MmMapLockedPagesSpecifyCache有什么区别？",
    answer:
      "MmGetSystemAddressForMdlSafe(Mdl, Priority)是简化API，返回MDL描述的物理页在系统空间（内核全局地址空间）的虚拟地址映射。首次调用时自动建立映射并缓存在MDL中，后续调用直接返回缓存地址。映射存在于系统地址空间，所有CPU核共享，任何线程上下文下均可访问。适合驱动在任意上下文（如DPC/工作线程）访问缓冲区。MmMapLockedPagesSpecifyCache(Mdl, AccessMode, CacheType, BaseAddress, Priority)是底层API，可将锁定的物理页映射到指定地址空间——AccessMode为KernelMode时映射到系统空间（类似MmGetSystemAddressForMdlSafe但可指定缓存类型和基址），为UserMode时映射到当前进程的用户地址空间（需在进程上下文调用）。区别：前者只能映射到系统空间且不可控缓存属性，后者可映射到用户/内核空间且可控缓存属性。DMA场景常用后者指定WriteCombining等非缓存类型。日常驱动优先用前者（简单安全），特殊需求用后者。",
    tags: ["MDL映射", "MmGetSystemAddressForMdlSafe", "内核地址空间"],
  },
  {
    id: "wkp-mdl-memory-descriptor-4",
    chapter: "wkp-mdl-memory-descriptor",
    level: 4,
    question: "为什么DMA传输必须锁定物理页？MDL如何支持散列-聚集DMA？",
    answer:
      "DMA传输必须锁定物理页的原因：DMA引擎直接操作物理地址，不经过CPU和虚拟地址翻译（不走页表）。若用户缓冲区的物理页在DMA传输过程中被换出，DMA引擎会写入错误的物理页（数据损坏）或读取已释放的物理页（信息泄漏）。ProbeAndLockPages锁定物理页使其在UnlockPages之前不会被换出，保证DMA期间物理地址稳定。散列-聚集DMA（Scatter-Gather DMA）：用户缓冲区的虚拟地址连续但物理页可能散列分布在不同的物理页帧，DMA引擎需要每个物理页的地址和长度列表。MDL的PFN数组正好提供了这个列表——驱动遍历MDL的PFN数组，为每个物理页构建DMA传输描述符（物理地址+该页内的传输长度），提交给DMA引擎的散列-聚集列表。Windows的DMA抽象层（GetScatterGatherList/PutScatterGatherList）封装了这一过程，驱动在回调中直接操作散列-聚集列表即可。MDL的PFN数组天然适配DMA散列-聚集需求，这是Windows设计MDL的核心动机之一。",
    tags: ["DMA", "散列聚集", "物理页锁定", "PFN"],
  },
];
