import type { ReviewQuestion } from "./types";

export const avcMethodologyRteQuestions: ReviewQuestion[] = [
  {
    id: "avc-methodology-rte-01",
    chapter: "avc-methodology-rte",
    level: 1,
    question: `AUTOSAR 方法论采用什么开发模型？简述其流程。`,
    answer: `AUTOSAR方法论采用V模型开发流程。左半边自上而下：需求分析 → 系统架构设计 → 软件架构设计 → 组件设计(SWC Design) → 编码实现(Coding)。右半边自下而上：单元测试 → 集成测试 → 系统测试 → 验证(Verification) → 确认(Validation)。左侧每层设计对应右侧同层测试，形成V形结构，确保每个开发阶段都有对应的验证活动。`,
    tags: ["V模型", "方法论", "开发流程", "验证确认"],
  },
  {
    id: "avc-methodology-rte-02",
    chapter: "avc-methodology-rte",
    level: 1,
    question: `RTE 支持哪两种主要的通信模式？各自的特点是什么？`,
    answer: `RTE支持两种通信模式：① S/R（Sender-Receiver，发送-接收）——用于数据通信，发送方通过PPort发送数据，接收方通过RPort接收数据，支持周期性和事件性触发，是最常用的通信模式；② C/S（Client-Server，客户端-服务端）——用于服务调用，客户端发起请求，服务端执行操作并返回结果，类似函数调用语义，适用于需要确认的操作。此外还有模式切换(Mode Switch)和非易失数据(NV Data)接口。`,
    tags: ["RTE", "S/R通信", "C/S通信", "通信模式"],
  },
  {
    id: "avc-methodology-rte-03",
    chapter: "avc-methodology-rte",
    level: 2,
    question: `RTE 是如何自动生成的？从 ARXML 到可执行代码经历哪些步骤？`,
    answer: `RTE自动生成步骤：① 系统设计工具（如System Desk）输出系统配置描述（ARXML文件），定义SWC、端口、接口、ECU映射等；② ECU配置工具（如DaVinci Configurator）读取ARXML，配置BSW模块参数和RTE参数；③ RTE生成器（RTE Generator）根据配置自动生成C代码，包括通信API、调度代码、端口访问函数等；④ SWC业务逻辑代码（手写）与RTE生成代码一起交叉编译；⑤ 链接生成ECU可执行文件，刷写到目标硬件。全程配置驱动，手写仅限SWC业务逻辑。`,
    tags: ["RTE生成", "ARXML", "代码生成", "配置驱动"],
  },
  {
    id: "avc-methodology-rte-04",
    chapter: "avc-methodology-rte",
    level: 3,
    question: `为什么 AUTOSAR 强调「配置驱动开发」？与传统手写嵌入式开发相比有什么优势和挑战？`,
    answer: `配置驱动开发的原因：AUTOSAR通过ARXML描述系统配置，工具自动生成框架代码（RTE、BSW配置），手写仅限SWC业务逻辑。优势：① 标准化——不同供应商的组件可互操作；② 复用性——SWC可跨ECU部署；③ 可维护性——配置变更只需重新生成，非手改代码；④ 可追溯性——ARXML记录所有设计决策。挑战：① 学习曲线陡峭——需掌握工具链和配置方法；② 资源开销大——生成代码体积大于精简手写代码，对资源受限MCU不友好；③ 调试复杂——多层抽象增加问题定位难度；④ 工具成本高——商业AUTOSAR工具链价格昂贵。因此AUTOSAR更适合中大规模车用控制器项目。`,
    tags: ["配置驱动", "优势挑战", "复用性", "工具链", "资源开销"],
  },
];
