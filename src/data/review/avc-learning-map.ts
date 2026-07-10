import type { ReviewQuestion } from "./types";

export const avcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "avc-learning-map-01",
    chapter: "avc-learning-map",
    level: 1,
    question: "《AUTOSAR规范与车用控制器软件开发》全书分为哪五个学习阶段？",
    answer: "五个学习阶段为：基础认知（知识全景图、架构概览、方法论RTE）、基础软件层（BSW栈、MCAL驱动）、应用与通信（SWC应用层、通信栈）、安全与诊断（功能安全、诊断协议）、实践与复习（工具链、知识整合）。",
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "avc-learning-map-02",
    chapter: "avc-learning-map",
    level: 1,
    question: "AUTOSAR 的三层架构是什么？各层的核心职责是什么？",
    answer: "三层架构为：应用层（Application Layer，软件组件SWC，实现业务逻辑，独立于硬件）、RTE运行时环境（Runtime Environment，通信抽象与调度管理，连接SWC与BSW的桥梁）、基础软件层（Basic Software Layer，提供操作系统、通信、诊断等服务及硬件抽象）。三层自上而下，应用层通过RTE间接访问BSW和硬件。",
    tags: ["三层架构", "应用层", "RTE", "BSW"],
  },
  {
    id: "avc-learning-map-03",
    chapter: "avc-learning-map",
    level: 2,
    question: "全书学习路径的核心脉络是什么？各阶段之间如何递进？",
    answer: "核心脉络为：知识全景图 → 架构概览 → 方法论RTE → BSW栈 → MCAL驱动 → 应用SWC → 通信栈 → 诊断安全 → 工具链 → 知识整合。递进逻辑：先建立架构认知（ch0-2），再深入基础软件层（ch3-4），然后理解应用层与通信（ch5-6），最后掌握安全诊断与实践（ch7-9），形成从架构到实现到验证的完整闭环。",
    tags: ["核心脉络", "系统闭环", "递进关系"],
  },
  {
    id: "avc-learning-map-04",
    chapter: "avc-learning-map",
    level: 2,
    question: "为什么在学习应用层（SWC）之前必须先掌握BSW和MCAL？",
    answer: "BSW（基础软件层）和MCAL（微控制器抽象层）是应用层SWC运行的基座。SWC通过RTE间接调用BSW提供的服务（如OS调度、通信服务、存储服务），RTE再调用ECU抽象层和MCAL访问硬件。不理解BSW的服务机制和MCAL的硬件抽象，就无法理解SWC如何通过端口和接口与外部交互，也无法理解RTE如何实现SWC与BSW的解耦。先掌握基座才能理解上层。",
    tags: ["学习顺序", "前置依赖", "BSW", "MCAL", "SWC"],
  },
];
