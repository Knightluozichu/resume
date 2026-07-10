import type { ReviewQuestion } from "./types";

export const soaMethodologyToolsQuestions: ReviewQuestion[] = [
  {
    id: "soa-methodology-tools-01",
    chapter: "soa-methodology-tools",
    level: 1,
    question: `SOA 开发的 V 模型包含哪些阶段？设计和测试如何对应？`,
    answer: `V模型阶段：左侧设计下降——需求分析 → 系统架构设计 → 服务设计 → 服务实现 → 单元测试；右侧验证上升——集成测试 → 系统测试 → 验收测试 → 验证确认。对应关系：需求分析 ↔ 验收测试（验证需求是否满足）、系统架构设计 ↔ 系统测试（验证架构集成）、服务设计 ↔ 集成测试（验证服务间协作）、服务实现 ↔ 单元测试（验证单个服务逻辑）。每个设计阶段都有对应的测试阶段，确保从代码到需求的逐级验证。`,
    tags: ["V模型", "设计阶段", "测试阶段", "对应关系", "单元测试", "集成测试", "系统测试"],
  },
  {
    id: "soa-methodology-tools-02",
    chapter: "soa-methodology-tools",
    level: 2,
    question: `SOA 开发工具链的五个核心环节是什么？各环节的输入输出是什么？`,
    answer: `五个环节：① 系统配置——输入为需求文档，输出为System Description（ARXML/IDL），定义服务接口和系统拓扑；② 代码生成——输入为IDL/ARXML，输出为Proxy/Skeleton桩代码和序列化代码，自动生成避免手写错误；③ 编译构建——输入为应用代码+桩代码，输出为可执行文件，使用C++/Rust交叉编译并链接FC库；④ 集成部署——输入为可执行文件+Manifest，输出为部署包，打包Manifest配置、容器/进程编排、OTA分发；⑤ 测试验证——输入为部署包，输出为测试报告，通过SIL/HIL/实车测试验证功能和性能。`,
    tags: ["工具链", "系统配置", "代码生成", "编译构建", "集成部署", "测试验证", "ARXML", "IDL"],
  },
  {
    id: "soa-methodology-tools-03",
    chapter: "soa-methodology-tools",
    level: 2,
    question: `Proxy 和 Skeleton 是什么？它们在 SOA 通信中扮演什么角色？`,
    answer: `Proxy（代理）和Skeleton（骨架）是IDL代码生成器自动产生的桩代码。Proxy：消费方侧的代理，封装服务调用逻辑——应用通过Proxy调用远程服务方法（如proxy->getSpeed()），Proxy负责参数序列化、消息封装、通过网络发送给提供方，并接收反序列化返回结果。Skeleton：提供方侧的骨架，封装服务分发逻辑——接收网络消息、反序列化参数、调用应用实现的服务方法、将返回值序列化后发回消费方。两者使应用代码无需关心网络通信细节，像本地调用一样使用远程服务，是SOA「通信透明」的关键。`,
    tags: ["Proxy", "Skeleton", "桩代码", "代码生成", "序列化", "通信透明"],
  },
  {
    id: "soa-methodology-tools-04",
    chapter: "soa-methodology-tools",
    level: 3,
    question: `车载 SOA 开发中 SIL、HIL、实车测试分别验证什么？为什么需要逐级验证？`,
    answer: `三级验证：① SIL（Software-in-the-Loop）软件在环——在PC上运行编译后的目标代码，用仿真模型模拟车辆环境，验证服务逻辑和接口正确性，成本低速度快，适合早期开发；② HIL（Hardware-in-the-Loop）硬件在环——在真实ECU硬件上运行代码，用实时仿真器模拟车辆信号和总线环境，验证硬件适配、实时性能和总线通信，成本中等，适合集成验证；③ 实车测试——在真实车辆上运行全部软硬件，验证真实环境下的功能、性能和安全性，成本最高但最真实。逐级验证原因：① 尽早发现问题——SIL阶段发现逻辑错误成本最低，到实车阶段发现则成本极高；② 缩小排查范围——每级验证聚焦不同层面，SIL查逻辑、HIL查硬件接口、实车查系统集成；③ 风险控制——安全相关功能必须在HIL和实车阶段充分验证后才能交付。`,
    tags: ["SIL", "HIL", "实车测试", "逐级验证", "成本控制", "风险控制", "验证策略"],
  },
];
