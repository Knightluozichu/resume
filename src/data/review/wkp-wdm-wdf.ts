import type { ReviewQuestion } from "./types";

export const wkpWdmWdfQuestions: ReviewQuestion[] = [
  {
    id: "wkp-wdm-wdf-1",
    chapter: "wkp-wdm-wdf",
    level: 2,
    question: `WDM和WDF的核心设计差异是什么？`,
    answer:
      `WDM（Windows Driver Model）是面向过程的驱动模型，驱动直接操作IRP和设备对象，手动处理PnP/电源状态机、手动注册所有派遣函数、手动管理资源生命周期。WDF（Windows Driver Framework）是面向对象的驱动框架，提供对象模型（WDFDRIVER/WDFDEVICE/WDFQUEUE等），框架自动处理PnP/电源状态机，驱动通过事件回调（EvtDevicePrepareHardware等）响应而非手动派遣IRP，框架自动管理引用计数和资源清理。核心差异：WDM是「自己造轮子」——驱动负责一切，灵活但易错；WDF是「用框架」——框架代管通用逻辑，驱动只写设备特定代码。WDF又分KMDF（内核态，替代WDM）和UMDF（用户态，崩溃不蓝屏）。WDF降低了驱动开发门槛和错误率，但牺牲了部分灵活性。`,
    tags: ["WDM", "WDF", "框架对比"],
  },
  {
    id: "wkp-wdm-wdf-2",
    chapter: "wkp-wdm-wdf",
    level: 3,
    question: `WDF的对象模型如何工作？父对象生命周期管理是什么？`,
    answer:
      `WDF对象模型：所有实体都是对象（WDFDRIVER驱动对象、WDFDEVICE设备对象、WDFQUEUE I/O队列、WDFINTERRUPT中断对象、WDFREQUEST请求对象等），每个对象有属性、方法和事件回调。对象通过WdfObjectCreate系列函数创建，用WdfObjectDelete删除。父对象生命周期管理是WDF的核心特性：创建子对象时指定父对象（如WDFQUEUE的父对象是WDFDEVICE），当父对象删除时自动删除所有子对象。例如删除WDFDEVICE时自动删除其关联的所有WDFQUEUE、WDFINTERRUPT、WDFDMATRANSACTION等子对象，无需手动逐个释放。这消除了WDM中最常见的资源泄漏和双重释放问题。驱动只需在EvtDriverDeviceAdd中创建设备及其子对象，在EvtDeviceReleaseHardware中释放硬件资源（非框架对象），框架在设备移除时自动清理整个对象树。对象上下文（Context Space）：通过WdfObjectAllocateContext给任意WDF对象挂载驱动私有数据，替代WDM的DeviceExtension。`,
    tags: ["WDF", "对象模型", "生命周期", "父对象"],
  },
  {
    id: "wkp-wdm-wdf-3",
    chapter: "wkp-wdm-wdf",
    level: 3,
    question: `WDF的I/O队列（WDFQUEUE）相比WDM的IRP手动管理有什么优势？`,
    answer:
      `WDM中驱动手动管理IRP：派遣函数收到IRP后若不能立即处理，需自己维护IRP队列（自旋锁保护的链表），手动处理取消（CancelRoutine）、手动实现串行化/并行化策略、手动从队列取出完成。代码量大且极易出错（取消竞态、队列锁死锁等）。WDF的WDFQUEUE封装了这些：①自动队列管理——框架自动将I/O请求放入队列，驱动通过EvtIoRead/EvtIoWrite/EvtIoDeviceControl回调接收；②自动取消处理——框架自动处理请求取消，驱动无需写CancelRoutine；③灵活的调度模式——WdfIoQueueDispatchSequential（串行，一次只给驱动一个请求）、WdfIoQueueDispatchParallel（并行，同时派发多个）、WdfIoQueueDispatchManual（手动，驱动按需取）；④自动电源管理——设备进入低功耗状态时框架自动暂停队列，恢复时自动重启；⑤请求转发——WdfRequestForwardToIoQueue可在队列间转移请求。WDFQUEUE将WDM中最复杂的IRP队列管理简化为配置+回调，显著减少代码量和bug率。`,
    tags: ["WDF", "I/O队列", "WDFQUEUE", "IRP管理"],
  },
  {
    id: "wkp-wdm-wdf-4",
    chapter: "wkp-wdm-wdf",
    level: 4,
    question: `什么场景下仍应选择WDM而非WDF？WDM的不可替代性体现在哪里？`,
    answer:
      `WDM仍被选择的场景：①底层总线驱动/控制器驱动——WDF本身构建在WDM之上，WDF框架驱动和总线驱动仍用WDM编写，自定义总线驱动若不符合WDF模型需用WDM；②文件系统过滤驱动——文件系统栈有特殊的IRP处理需求（如IRP_MJ_CREATE的预操作/后操作），WDF的I/O模型不完全适配，旧版Filter Manager用WDM，新版部分支持WDF但复杂场景仍需WDM；③极低延迟/特殊硬件——某些硬件需要精细控制IRP传递时机和栈位置操作，WDF的抽象层引入额外开销；④NDIS网络驱动——NDIS有独立的微型端口模型，不完全映射到WDF对象；⑤遗留驱动维护——已有WDM驱动代码量大，迁移WDF成本高且引入新bug风险。WDM的不可替代性体现在「最大控制力」：驱动可以直接操作IRP的每一个字节、精确控制设备栈传递时机、自定义资源分配逻辑。但这也意味着全部责任由驱动承担——PnP/电源/取消/同步全手动。新项目除非上述特殊场景，否则首选WDF，其开发效率提升50%以上且bug率显著降低。`,
    tags: ["WDM", "WDF", "选型", "场景"],
  },
];
