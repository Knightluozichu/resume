import type { ReviewQuestion } from "./types";

export const lkeIoSubsystemQuestions: ReviewQuestion[] = [
  {
    id: "lke-io-1",
    chapter: "lke-io-subsystem",
    level: 2,
    question: "字符设备、块设备、网络设备的根本区别是什么？",
    answer:
      "三者从用户接口、访问模式、缓冲策略三个维度区分：①字符设备——通过/dev下设备节点访问，file_operations接口（open/read/write/ioctl），按字节或帧流式访问，无缓冲（实时），例：串口、GPIO、传感器；②块设备——通过文件系统间接访问（也可直接open /dev/sda），按扇区/块随机访问，经Page Cache缓冲和I/O调度器合并排序，可寻址，例：磁盘、SSD、eMMC；③网络设备——没有/dev节点，不实现file_operations，通过socket API收发数据包，无缓冲（流式），按包处理，例：eth0、wlan0。注册方式也不同：字符设备用cdev_init/cdev_add，块设备用blk_mq_alloc_disk/add_disk，网络设备用register_netdev。",
    tags: ["I/O子系统", "设备模型"],
  },
  {
    id: "lke-io-2",
    chapter: "lke-io-subsystem",
    level: 2,
    question: "硬中断处理函数为什么不能睡眠？需要执行阻塞操作时怎么办？",
    answer:
      "硬中断运行在中断上下文而非进程上下文——不属于任何进程，没有task_struct可用于调度。睡眠机制是当前进程主动让出CPU进入等待队列，调度器选另一个进程运行——但中断上下文中没有「当前进程」可让出，调度器无法切换回来，导致死锁或panic。此外中断通常关闭了同优先级中断，睡眠期间这些中断被长时间屏蔽。需要执行阻塞操作时：硬中断中只做ACK和读取紧急数据，然后调度下半部。使用workqueue（运行在进程上下文，可以睡眠、可以持有互斥锁、可以分配GFP_KERNEL内存）执行阻塞操作。如果操作不需要睡眠但较耗时，可用softirq或tasklet（运行在中断上下文但开中断，不能睡眠）。",
    tags: ["I/O子系统", "中断"],
  },
  {
    id: "lke-io-3",
    chapter: "lke-io-subsystem",
    level: 3,
    question: "描述Linux设备模型中bus-device-driver的绑定流程。",
    answer:
      "①总线枚举设备（或设备树/ACPI声明）→ device_register(dev)将设备挂到总线；②驱动注册→ driver_register(drv)将驱动挂到总线；③总线负责匹配bus_type.match(dev, drv)——比较设备名/ID/compatible字段，匹配成功？④driver.probe(dev)被调用——分配私有数据，ioremap映射寄存器，request_irq注册中断，注册cdev/blk/netdev，设备就绪；⑤移除时driver.remove(dev)被调用——注销cdev/blk/netdev，释放中断和内存。模块加载时module_init注册driver，触发已有设备probe；模块卸载时module_exit注销driver，触发remove。sysfs将设备树导出到/sys，udev监听uevent自动创建/dev节点。",
    tags: ["I/O子系统", "设备模型"],
  },
  {
    id: "lke-io-4",
    chapter: "lke-io-subsystem",
    level: 4,
    question: "一致性DMA和流式DMA有什么区别？为什么需要dma_sync操作？",
    answer:
      "一致性DMA（dma_alloc_coherent）：分配的内存对CPU和设备同时可见且一致，硬件保证CPU缓存与内存的一致性（通常标记为uncached或write-through），无需手动同步。适合小型控制结构、描述符环等频繁双向访问的场景。流式DMA（dma_map_single）：临时映射已有内存给设备访问，需要手动同步。适合大块数据传输（网络包、磁盘块）。需要dma_sync的原因：CPU有L1/L2/L3缓存，设备直接访问物理内存。CPU写入的数据可能还在缓存中未刷到内存，设备读到的就是旧数据；设备写入内存的数据，CPU缓存中还是旧值。dma_sync_single_for_cpu确保设备写入的数据对CPU可见（invalidate CPU缓存行），dma_sync_single_for_device确保CPU写入的数据对设备可见（flush CPU缓存行到内存）。IOMMU提供设备地址隔离，类似CPU页表，用于虚拟化场景。",
    tags: ["I/O子系统", "DMA"],
  },
];
