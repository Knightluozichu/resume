import type { ReviewQuestion } from "./types";

export const wkpInterruptDpcQuestions: ReviewQuestion[] = [
  {
    id: "wkp-interrupt-dpc-1",
    chapter: "wkp-interrupt-dpc",
    level: 2,
    question: "什么是IRQL？它与线程优先级有什么区别？",
    answer:
      "IRQL（Interrupt Request Level，中断请求级）是Windows内核为每个CPU核维护的软件优先级机制，决定当前CPU可被哪些中断抢占。IRQL从低到高：PASSIVE_LEVEL(0)→APC_LEVEL(1)→DISPATCH_LEVEL(2)→设备DIRQL→...→HIGH_LEVEL(31)。IRQL是per-CPU的，不同核可运行在不同IRQL。它与线程优先级的区别：线程优先级是调度器层面的概念，决定哪个线程获得CPU时间片（同一IRQL内抢占调度）；IRQL是中断屏蔽机制，决定CPU响应哪些中断——IRQL高于当前值的硬件中断会被响应，低于的被屏蔽。当IRQL>=DISPATCH_LEVEL时线程调度器停止工作（不可被抢占调度），这意味着DPC和ISR中不可调用会触发调度的API（如KeWaitForSingleObject等待非信号对象）。IRQL是内核编程的「红绿灯」——几乎所有同步约束都源于IRQL。",
    tags: ["IRQL", "中断优先级", "调度"],
  },
  {
    id: "wkp-interrupt-dpc-2",
    chapter: "wkp-interrupt-dpc",
    level: 3,
    question: "ISR和DPC的分工是什么？为什么ISR必须极短？",
    answer:
      "ISR（Interrupt Service Routine）运行在设备DIRQL（高于DISPATCH_LEVEL），负责最紧迫的工作：读取/清除中断状态寄存器（ACK中断防止重复触发）、禁止设备再次产生中断、将少量数据复制到设备扩展、调用IoRequestDpc排队DPC。DPC（Deferred Procedure Call）运行在DISPATCH_LEVEL，负责大部分中断处理工作：处理数据、完成IRP、重新启用设备中断。ISR必须极短的原因：①ISR运行在高DIRQL，屏蔽了所有同级和更低优先级的中断——ISR越长，其他设备中断延迟越大，可能导致丢中断或系统响应卡顿；②ISR在DIRQL不可分页、不可获取 DISPATCH_LEVEL以下的锁、不可调用大多数内核API，能力极其受限；③ISR持锁会阻塞其他核的同级中断（自旋锁在DIRQL），影响多核扩展性。设计原则：ISR只做「灭火」（确认中断、停设备、排队DPC），DPC做「善后」（全部后续处理），保证中断延迟最小化。",
    tags: ["ISR", "DPC", "中断延迟", "分层处理"],
  },
  {
    id: "wkp-interrupt-dpc-3",
    chapter: "wkp-interrupt-dpc",
    level: 3,
    question: "DPC的调度机制是什么？DPC优先级如何影响系统响应？",
    answer:
      "DPC调度机制：IoRequestDpc将DPC对象加入当前CPU的DPC队列。当CPU的IRQL从DIRQL降至DISPATCH_LEVEL时（ISR返回后），内核检查DPC队列，依次取出并执行各DPC。DPC在DISPATCH_LEVEL运行，不可被线程调度器抢占（但可被更高IRQL中断抢占）。DPC优先级（Importance）：Low/Medium/High影响DPC在队列中的排队位置和是否延迟。High Importance的DPC排在队列前端并尽快执行，Low/Medium可能延迟到下一个DPC调度点。系统响应影响：DPC在DISPATCH_LEVEL运行时会阻塞当前CPU的线程调度，若DPC执行时间过长，会导致线程调度延迟，表现为音频卡顿、鼠标响应慢等实时性问题。Windows对DPC执行时间有监视（DPC_WATCHDOG_VIOLATION），超时会蓝屏。最佳实践：DPC中只做必要工作，耗时操作放到工作线程（PASSIVE_LEVEL）中。DPC是「软实时」与「吞吐」的折中点。",
    tags: ["DPC调度", "DPC优先级", "实时性"],
  },
  {
    id: "wkp-interrupt-dpc-4",
    chapter: "wkp-interrupt-dpc",
    level: 4,
    question: "消息信号中断（MSI）与传统线中断相比有什么优势？对驱动设计有何影响？",
    answer:
      "MSI（Message Signaled Interrupt）通过向特定内存地址写入一个值来触发中断，不需要独立的物理中断线。优势：①多个中断向量——MSI-X支持设备分配最多2048个中断向量，每个可绑定不同ISR，无需在单个ISR中轮询判断中断源，减少中断延迟；②无需中断共享——传统PCI中断线共享需ISR轮询确认自己设备是否中断，MSI每个向量专属于特定功能，直接定位；③更低延迟——无需中断控制器仲裁，写内存即触发；④更好的多核扩展——可配置中断亲和性（Interrupt Affinity），将不同中断向量分发到不同CPU核，并行处理。对驱动设计的影响：①ISR注册方式改变——IoConnectInterruptEx支持MSI，每个向量注册独立ISR和DPC；②无需共享中断处理逻辑——每个MSI向量对应特定功能（如发送完成/接收到达/错误），ISR无需检查是否是自己设备的中断；③资源分配——PnP管理器在IRP_MN_START_DEVICE中分配MSI资源，驱动在翻译CmResourceList时获取消息数据；④DPC可按向量分拆——不同功能用不同DPC，减少单DPC处理量。新设备驱动应优先支持MSI-X。",
    tags: ["MSI", "中断", "多核扩展", "ISR"],
  },
];
