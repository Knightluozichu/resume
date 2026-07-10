import type { ReviewQuestion } from "./types";

export const avcCommunicationStackQuestions: ReviewQuestion[] = [
  {
    id: "avc-communication-stack-01",
    chapter: "avc-communication-stack",
    level: 1,
    question: "AUTOSAR 通信栈从上到下分为哪五层？每层的核心模块是什么？",
    answer: "通信栈五层从上到下：① SWC层——应用组件通过RTE收发信号；② RTE层——信号路由与Runnable调度；③ 通信服务层——Com（信号与I-PDU打包解包）、PduR（PDU路由网关）、CanTp（传输层分片重组）、Dcm（诊断通信管理）；④ ECU抽象层——CanIf（CAN接口）、FrIf（FlexRay接口）、EthIf（Ethernet接口），统一不同总线接口；⑤ MCAL通信驱动——Can（CAN驱动）、Fr（FlexRay驱动）、Eth（Ethernet驱动），直接操作硬件控制器。数据从上到下经过五层封装，实现信号到物理帧的转换。",
    tags: ["通信栈", "五层架构", "Com", "PduR", "CanIf", "Can"],
  },
  {
    id: "avc-communication-stack-02",
    chapter: "avc-communication-stack",
    level: 1,
    question: "信号（Signal）和 I-PDU 的关系是什么？Com 模块如何处理它们？",
    answer: "关系：信号（Signal）是应用层的最小数据单元（如车速值、温度值），I-PDU（Interaction Layer Protocol Data Unit）是通信层的数据包，一个I-PDU可包含多个信号。Com模块处理：发送方向——Com将多个SWC发出的信号打包成一个I-PDU（按配置的位偏移和长度排列），交给PduR路由；接收方向——Com从PduR接收I-PDU，按配置拆解出各个信号，通过RTE分发给对应的SWC。这种打包机制提高了总线带宽利用率，多个小信号共用一个CAN帧传输。",
    tags: ["Signal", "I-PDU", "Com", "信号打包", "信号解包"],
  },
  {
    id: "avc-communication-stack-03",
    chapter: "avc-communication-stack",
    level: 2,
    question: "PduR 模块的作用是什么？它在网关场景中如何实现 PDU 路由？",
    answer: "PduR（PDU Router）是通信栈中的PDU路由网关，负责将I-PDU从源模块路由到目标模块。作用：① ECU内部路由——将Com模块打包的I-PDU路由到对应的总线接口模块（CanIf/FrIf/EthIf），或将接收到的I-PDU从总线接口路由回Com；② 网关路由——当ECU作为网关时，PduR可将从一个总线接收的I-PDU直接转发到另一个总线（如CAN1→CAN2或CAN→Ethernet），无需经过Com层拆包再打包，实现高效跨网段路由；③ 诊断路由——将Dcm的诊断I-PDU路由到CanTp（诊断传输层）或DoIP。PduR通过静态路由表（ARXML配置）确定每个I-PDU的源和目标，运行时按表查找转发。",
    tags: ["PduR", "PDU路由", "网关", "跨网段", "诊断路由"],
  },
  {
    id: "avc-communication-stack-04",
    chapter: "avc-communication-stack",
    level: 3,
    question: "描述一个车速信号从 SWC 发送到 CAN 总线的完整数据流，涉及哪些模块和接口？",
    answer: "完整数据流：① SWC调用Rte_Write_SpeedSignal(uint16 speed)将车速信号写入RTE；② RTE将信号传递给Com模块；③ Com模块根据配置将该信号打包进对应的I-PDU（可能与其他信号共用一个I-PDU），调用PduR_Transmit()将I-PDU交给PduR；④ PduR根据路由表查找目标，调用CanIf_Transmit()将I-PDU交给CanIf；⑤ CanIf为I-PDU添加CAN ID和DLC（数据长度），调用Can_Write()将CAN帧交给Can驱动（MCAL）；⑥ Can驱动将CAN帧写入CAN控制器的发送邮箱，通过CAN总线物理发送；⑦ 接收方ECU的Can驱动从接收邮箱读取CAN帧，向上经CanIf→PduR→Com拆包出车速信号→RTE→SWC。全程经过SWC→RTE→Com→PduR→CanIf→Can→CAN总线七个环节。",
    tags: ["数据流", "信号发送", "CAN总线", "Com", "PduR", "CanIf", "完整链路"],
  },
];
