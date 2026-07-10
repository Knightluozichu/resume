import type { ReviewQuestion } from "./types";

export const avcAutosarOverviewQuestions: ReviewQuestion[] = [
  {
    id: "avc-autosar-overview-01",
    chapter: "avc-autosar-overview",
    level: 1,
    question: `AUTOSAR 的全称是什么？其核心目标是什么？`,
    answer: `AUTOSAR 全称为 AUTomotive Open System ARchitecture（汽车开放系统架构）。核心目标是建立开放的、标准化的汽车电子软件架构，实现应用软件与硬件的解耦，使软件组件可在不同ECU和硬件平台间复用，降低开发成本，提高软件质量和可维护性。`,
    tags: ["AUTOSAR", "标准化", "软硬解耦"],
  },
  {
    id: "avc-autosar-overview-02",
    chapter: "avc-autosar-overview",
    level: 1,
    question: `AUTOSAR BSW（基础软件层）内部如何分层？每层的职责是什么？`,
    answer: `BSW内部分三层：① 服务层（Services Layer）——提供OS、内存管理、诊断、通信服务和ECU状态管理等系统级服务，是最上层；② ECU抽象层（ECU Abstraction Layer）——屏蔽ECU硬件外设差异，为服务层提供统一接口；③ 微控制器抽象层（MCAL）——直接访问微控制器寄存器，封装片上外设驱动，是最底层。自上而下抽象程度递减。`,
    tags: ["BSW", "服务层", "ECU抽象层", "MCAL", "分层架构"],
  },
  {
    id: "avc-autosar-overview-03",
    chapter: "avc-autosar-overview",
    level: 2,
    question: `RTE 在 AUTOSAR 架构中扮演什么角色？为什么说它是「解耦桥梁」？`,
    answer: `RTE（Runtime Environment，运行时环境）位于应用层和BSW之间，扮演「解耦桥梁」角色：① 通信抽象——屏蔽底层总线差异，SWC通过RTE收发信号，不直接接触CAN/Ethernet等总线；② 调度管理——管理Runnable的触发时机和执行时序；③ 独立演化——SWC与BSW可以独立开发和演化，通过RTE自动生成的代码连接。RTE从ARXML配置描述自动生成C代码，编译链接进ECU可执行文件。`,
    tags: ["RTE", "解耦", "通信抽象", "调度管理"],
  },
  {
    id: "avc-autosar-overview-04",
    chapter: "avc-autosar-overview",
    level: 3,
    question: `AUTOSAR 软硬件分离的设计如何实现「软件一次开发，多处部署」？请说明其实现机制。`,
    answer: `实现机制：① 虚拟功能总线（VFB）——AUTOSAR定义了虚拟通信总线抽象，SWC通过端口在VFB上通信，不绑定具体总线协议；② RTE生成——根据ECU配置（ARXML），RTE生成器将VFB上的逻辑通信映射到具体的物理总线（CAN/Ethernet/FlexRay）；③ 标准化接口——BSW提供标准化API（如DIO_Read、Can_Write），MCAL适配不同微控制器；④ SWC独立——SWC只依赖RTE API和端口接口定义，不依赖具体硬件。因此同一SWC可以部署在不同ECU上，只需重新配置RTE和BSW参数。`,
    tags: ["VFB", "软硬分离", "RTE生成", "标准化接口", "复用"],
  },
];
