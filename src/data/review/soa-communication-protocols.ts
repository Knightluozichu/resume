import type { ReviewQuestion } from "./types";

export const soaCommunicationProtocolsQuestions: ReviewQuestion[] = [
  {
    id: "soa-communication-protocols-01",
    chapter: "soa-communication-protocols",
    level: 1,
    question: `SOME/IP 的全称是什么？它的核心特点是什么？`,
    answer: `SOME/IP全称：Scalable service-Oriented MiddlewarE over IP（可扩展的面向服务中间件）。核心特点：① AUTOSAR标准，车载专用中间件；② 基于UDP/TCP，运行在以太网之上；③ 支持RR请求/响应和通知PubSub两种通信模式；④ 内置服务发现（SD）协议，支持运行时动态服务注册和查找；⑤ 结构化数据二进制序列化，Message ID由Service ID和Method ID组成，高效紧凑。`,
    tags: ["SOME/IP", "AUTOSAR", "中间件", "服务发现", "序列化"],
  },
  {
    id: "soa-communication-protocols-02",
    chapter: "soa-communication-protocols",
    level: 2,
    question: `SOME/IP 和 DDS 在通信模式、服务发现和QoS支持上有什么核心区别？`,
    answer: `核心区别：① 通信模式——SOME/IP支持RR请求/响应+PubSub，以请求响应为主；DDS是纯PubSub数据中心模型，无RR。② 服务发现——SOME/IP使用集中式SD协议（OfferService/FindService，组播UDP）；DDS使用去中心化自动发现（基于多播的SPDP/SEDP协议）。③ QoS支持——SOME/IP提供基础QoS；DDS提供30+种QoS策略（Reliability/Durability/History/Deadline/Latency/Liveliness等），可精细配置数据传输质量。`,
    tags: ["SOME/IP", "DDS", "通信模式", "服务发现", "QoS", "对比"],
  },
  {
    id: "soa-communication-protocols-03",
    chapter: "soa-communication-protocols",
    level: 2,
    question: `DDS 的 DCPS 模型包含哪些核心角色？它们之间的关系是什么？`,
    answer: `DCPS（Data-Centric Publish-Subscribe）模型核心角色：① Domain——数据域，隔离不同应用的通信空间；② Topic——主题，数据的逻辑标识，发布方和订阅方通过Topic匹配；③ Publisher——发布方，包含DataWriter，负责写入数据；④ Subscriber——订阅方，包含DataReader，负责读取数据；⑤ DataWriter/DataReader——数据写入器/读取器，绑定具体Topic和数据类型。关系：Publisher通过DataWriter向Topic写入数据，Subscriber通过DataReader从Topic读取数据，DDS中间件负责数据路由和QoS保障。Domain隔离不同通信域，Topic是发布订阅的匹配键。`,
    tags: ["DDS", "DCPS", "Domain", "Topic", "Publisher", "Subscriber", "发布订阅"],
  },
  {
    id: "soa-communication-protocols-04",
    chapter: "soa-communication-protocols",
    level: 3,
    question: `在车载SOA开发中，如何选择SOME/IP和DDS？请从生态、场景和资源三个维度分析。`,
    answer: `选型分析：① 生态——SOME/IP是AUTOSAR AP原生支持，与AUTOSAR工具链（DaVinci/ISOLAR）无缝集成；DDS在ROS 2和工控领域生态成熟，有FastDDS/CycloneDDS等开源实现。② 场景——车载SOA服务通信（如域控间服务调用、智能座舱服务编排）选SOME/IP，因为AUTOSAR标准化、与AP原生集成；高可靠实时数据分发（如传感器数据共享、多传感器融合）选DDS，因为丰富QoS可保证数据可靠性和实时性。③ 资源——SOME/IP较轻量，适合资源受限的车载环境；DDS因QoS协商和去中心化发现，资源开销较大。结论：车载以SOME/IP为主流，DDS在特定高可靠数据分发场景补充使用。`,
    tags: ["SOME/IP", "DDS", "选型", "生态", "场景", "资源", "AUTOSAR"],
  },
];
