import type { ReviewQuestion } from "./types";

export const wkpPnpPowerQuestions: ReviewQuestion[] = [
  {
    id: "wkp-pnp-power-1",
    chapter: "wkp-pnp-power",
    level: 2,
    question: "PnP设备状态机的核心状态有哪些？状态转换由什么IRP驱动？",
    answer:
      "PnP设备状态机核心状态：Added（已添加，AddDevice已调用但设备未启动）→ Started（已启动，IRP_MN_START_DEVICE完成，设备可正常I/O）→ Stopped（已停止，资源已释放但设备仍存在，可重新启动）→ Removed（已移除，IRP_MN_REMOVE_DEVICE完成，设备对象已从设备栈分离）。状态转换由PnP IRP驱动：IRP_MN_START_DEVICE（Added→Started，分配硬件资源并初始化设备）、IRP_MN_QUERY_STOP/CANCEL_STOP（Started→StopPending→Started，查询能否停止资源重分配）、IRP_MN_STOP_DEVICE（StopPending→Stopped，释放硬件资源但保留设备对象）、IRP_MN_QUERY_REMOVE/CANCEL_REMOVE（→RemovePending→原状态，查询能否安全移除）、IRP_MN_REMOVE_DEVICE（RemovePending→Removed，释放全部资源并从设备栈分离）、IRP_MN_SURPRISE_REMOVAL（意外拔出，直接跳到Removed）。驱动通过派遣PnP IRP（IRP_MJ_PNP）响应这些状态转换。",
    tags: ["PnP", "设备状态机", "IRP"],
  },
  {
    id: "wkp-pnp-power-2",
    chapter: "wkp-pnp-power",
    level: 3,
    question: "设备电源状态D0-D3与系统电源状态S0-S5的关系是什么？驱动如何响应？",
    answer:
      "系统电源状态（S0-S5）描述整个系统的功耗级别：S0全工作→S1/S2/S3睡眠（CPU上下文不同级别保留）→S4休眠（上下文写入磁盘）→S5关机。设备电源状态（D0-D3）描述单个设备的功耗级别：D0全工作→D1/D2部分功耗（设备特定低功耗）→D3完全关闭（仅最小功耗或零功耗）。关系：系统进入Sn状态时，每个设备需映射到对应的Dm状态（映射表由驱动在IRP_MN_QUERY_CAPABILITIES中报告）。驱动响应：①系统电源IRP（IRP_MN_SET_POWER, SystemPowerState）——驱动收到后转换为设备电源IRP，将DeviceState设为映射表对应的Dm状态，向下传递；②设备电源IRP（IRP_MN_SET_POWER, DevicePowerState）——驱动执行实际电源转换：D0时上电初始化设备恢复上下文，D3时保存上下文断电；③IRP_MN_QUERY_POWER——系统询问能否进入某电源状态，驱动可拒绝（如设备正在关键操作）。电源IRP用PoCallDriver（旧API）或普通IoCallDriver（新系统）派发，PoStartNextPowerIrp（旧系统）通知电源管理器处理下一个电源IRP。",
    tags: ["电源管理", "D0-D3", "S0-S5", "电源IRP"],
  },
  {
    id: "wkp-pnp-power-3",
    chapter: "wkp-pnp-power",
    level: 3,
    question: "IRP_MN_START_DEVICE处理流程是什么？为什么硬件资源要等下层先完成？",
    answer:
      "IRP_MN_START_DEVICE处理流程：①驱动收到IRP_MN_START_DEVICE，I/O栈位置含AllocatedResources（翻译前的原始资源）和AllocatedResourcesTranslated（翻译后的资源，如映射后的MMIO地址、中断向量）；②驱动必须先向下传递IRP（IoCopyCurrentIrpStackLocationToNext + IoCallDriver），等待下层设备完成（通过CompletionRoutine）；③下层完成后，驱动解析AllocatedResourcesTranslated获取硬件资源——中断资源调用IoConnectInterruptEx连接ISR，内存资源调用MmMapIoSpace映射寄存器，I/O端口资源直接使用；④初始化设备硬件（写寄存器使能设备）；⑤设置设备状态为Started；⑥完成IRP返回STATUS_SUCCESS。为什么等下层先完成：设备栈中下层（总线驱动）负责分配/翻译资源，只有下层完成后翻译后的资源才有效。若先读资源再向下传递，读到的是未翻译的无效地址。PnP管理器保证START_DEVICE从设备栈底向上完成，驱动的CompletionRoutine在下层完成后被调用，此时资源已就绪。",
    tags: ["START_DEVICE", "硬件资源", "PnP", "设备栈"],
  },
  {
    id: "wkp-pnp-power-4",
    chapter: "wkp-pnp-power",
    level: 4,
    question: "意外移除（Surprise Removal）与正常移除的区别是什么？驱动如何处理？",
    answer:
      "正常移除流程：用户通过「安全移除硬件」发起→PnP管理器发送IRP_MN_QUERY_REMOVE（驱动可拒绝）→IRP_MN_REMOVE_DEVICE（驱动释放资源、从设备栈分离、删除设备对象）。驱动可在QUERY_REMOVE时拒绝（如设备正在关键写入），保证数据完整性。意外移除（Surprise Removal）：设备被直接拔出（如USB热拔），PnP管理器发送IRP_MN_SURPRISE_REMOVAL，无查询阶段。驱动处理：①收到SURPRISE_REMOVAL后，设备已物理消失，所有正在进行的I/O必须立即以STATUS_DEVICE_REMOVED完成；②不能访问硬件寄存器（已不存在），只做软件清理；③通知用户态（通过事件或IOCTL）设备已移除；④后续收到IRP_MN_REMOVE_DEVICE时做最终清理（断开中断、释放资源、删除设备对象）。区别核心：正常移除驱动可拒绝、硬件还在；意外移除驱动不可拒绝、硬件已消失。设计要求：驱动必须随时容忍设备消失——每次访问硬件前检查设备存在标志（在设备扩展中维护），所有I/O路径设置超时和错误处理，避免在已移除设备上无限等待。Driver Verifier的Surprise Removal测试验证此行为。",
    tags: ["意外移除", "Surprise Removal", "PnP", "健壮性"],
  },
];
