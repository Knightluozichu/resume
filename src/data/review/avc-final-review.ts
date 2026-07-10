import type { ReviewQuestion } from "./types";

export const avcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "avc-final-review-01",
    chapter: "avc-final-review",
    level: 2,
    question: `用四层系统视角描述《AUTOSAR规范与车用控制器软件开发》的知识体系结构。`,
    answer: `四层系统视角：① 架构认知层（ch0-2）——AUTOSAR三层架构、V模型方法论、RTE运行时环境、SWC组件模型，建立架构认知基座；② 基础软件层（ch3-4）——BSW三层子架构（服务层/ECU抽象层/MCAL）、OS/NvM/Com等服务模块、MCAL驱动模块（DIO/ADC/PWM/CAN等），定义软件基座；③ 应用通信层（ch5-6）——SWC端口与接口、Runnable调度、通信栈五层架构、信号路由与I-PDU打包，定义交互逻辑；④ 安全实践层（ch7-9）——UDS诊断协议、ISO 26262 ASIL安全等级、工具链与配置驱动开发、MIL/SIL/HIL验证，定义安全保障。四层从认知到基座到交互到安全，层层递进形成知识闭环。`,
    tags: ["四层视角", "架构认知层", "基础软件层", "应用通信层", "安全实践层", "知识闭环"],
  },
  {
    id: "avc-final-review-02",
    chapter: "avc-final-review",
    level: 2,
    question: `描述一个车速信号从 SWC 发送到 CAN 总线再被接收方 SWC 读取的完整通信链路。`,
    answer: `完整通信链路七环节：① SWC发送——发送方SWC调用Rte_Write()将车速信号写入RTE；② RTE传递——RTE将信号传递给Com模块；③ Com打包——Com将信号与其他信号打包成I-PDU，调用PduR_Transmit()；④ PduR路由——PduR根据路由表查找目标，调用CanIf_Transmit()；⑤ CanIf/Can发送——CanIf添加CAN ID和DLC，Can驱动将CAN帧写入发送邮箱，通过CAN总线物理发送；⑥ 接收方Can/CanIf——接收方Can驱动从接收邮箱读取CAN帧，CanIf解析后交给PduR；⑦ PduR/Com/RTE/SWC接收——PduR路由到Com，Com从I-PDU拆包出车速信号，通过RTE分发给接收方SWC的Rte_Read()。信号经过SWC→RTE→Com→PduR→CanIf→Can→CAN总线→Can→CanIf→PduR→Com→RTE→SWC的完整路径。`,
    tags: ["通信链路", "信号发送", "信号接收", "Com", "PduR", "CanIf", "完整路径"],
  },
  {
    id: "avc-final-review-03",
    chapter: "avc-final-review",
    level: 3,
    question: `综合全书，AUTOSAR 如何通过分层架构和标准化实现软硬件解耦？这对车用控制器开发有什么实际价值？`,
    answer: `软硬件解耦实现：① 三层架构——应用层(SWC)独立于硬件，通过RTE连接BSW，BSW通过MCAL适配硬件，每层接口标准化；② VFB虚拟总线——SWC在虚拟功能总线上通信，不绑定物理总线，RTE生成器将虚拟通信映射到物理总线；③ 标准化API——MCAL标准化驱动API（Dio_Read/Adc_Read等），BSW标准化服务API，不同芯片厂商实现相同接口；④ ARXML配置——系统配置以ARXML描述，工具自动生成代码，配置变更不修改源码。实际价值：① 复用——同一SWC可部署到不同ECU，软件资产复用降低成本；② 可扩展——更换MCU只需替换MCAL，上层软件不变；③ 并行开发——SWC开发与BSW集成可并行进行，缩短开发周期；④ 供应商解耦——不同供应商的组件可互操作，降低供应链风险；⑤ 质量保障——标准化接口和V模型验证确保软件质量。这是AUTOSAR成为车用软件行业标准的根本原因。`,
    tags: ["软硬件解耦", "分层架构", "标准化", "VFB", "复用", "并行开发", "实际价值"],
  },
  {
    id: "avc-final-review-04",
    chapter: "avc-final-review",
    level: 3,
    question: `AUTOSAR 面临哪些演进方向？Classic AUTOSAR 和 Adaptive AUTOSAR 如何互补共存？`,
    answer: `演进方向：① Adaptive AUTOSAR（AP）——面向高算力ECU（如域控制器、自动驾驶计算平台），基于POSIX（Linux/QNX），支持动态内存分配和多进程，适用于ADAS和自动驾驶；② SOA（面向服务架构）——从信号通信转向服务通信（SOME/IP），更灵活的服务发现与调用；③ 以太网——从CAN/FlexRay向车载以太网迁移，支持高带宽需求（如摄像头数据）；④ 域控制器——从分布式ECU向域控制器集中，减少ECU数量；⑤ AP+CP融合——Classic AUTOSAR（CP）和Adaptive AUTOSAR（AP）共存互补。CP与AP互补：CP（Classic Platform）面向传统控制类ECU（如车身控制、动力控制），实时性强、资源占用小、静态配置；AP（Adaptive Platform）面向高性能计算ECU（如自动驾驶、座舱），支持多应用、动态配置、高性能。域控制器内AP负责AI算法和服务通信，CP负责实时控制和安全监控，两者通过以太网SOME/IP通信。这种融合架构兼顾了实时安全与高性能灵活的需求。`,
    tags: ["Adaptive AUTOSAR", "Classic AUTOSAR", "SOA", "以太网", "域控制器", "AP+CP融合", "演进方向"],
  },
];
