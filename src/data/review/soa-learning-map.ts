import type { ReviewQuestion } from "./types";

export const soaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "soa-learning-map-01",
    chapter: "soa-learning-map",
    level: 1,
    question: `《SOA车载软件架构与开发》全书分为哪五个学习阶段？`,
    answer: `五个学习阶段为：基础认知（知识全景图、SOA基础、架构演进）、服务设计（服务设计、通信协议）、中间件层（服务发现、自适应平台AP）、工程实践（方法论与工具链）、案例与复习（案例分析、全书复习）。`,
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "soa-learning-map-02",
    chapter: "soa-learning-map",
    level: 1,
    question: `SOA 的三要素是什么？它们之间是什么关系？`,
    answer: `SOA 三要素：服务（Service，独立功能单元，封装业务逻辑）、接口（Interface，标准化的契约，描述输入输出）、通信（Communication，服务间消息交换，支持请求/响应与发布订阅）。关系：服务通过接口对外暴露能力，消费方通过接口契约调用服务，通信层负责服务间的消息传输与路由，三者共同构成松耦合的服务交互体系。`,
    tags: ["SOA三要素", "服务", "接口", "通信"],
  },
  {
    id: "soa-learning-map-03",
    chapter: "soa-learning-map",
    level: 2,
    question: `全书学习路径的核心脉络是什么？各阶段之间如何递进？`,
    answer: `核心脉络为：知识全景图 → SOA基础 → 架构演进 → 服务设计 → 通信协议 → 服务发现 → AP集成 → 工具链 → 案例 → 复习。递进逻辑：先建立SOA认知基座（ch0-2），再深入服务设计与通信（ch3-4），然后掌握中间件与AP平台（ch5-6），最后通过方法论和案例实践（ch7-8）形成知识闭环（ch9）。`,
    tags: ["核心脉络", "系统闭环", "递进关系"],
  },
  {
    id: "soa-learning-map-04",
    chapter: "soa-learning-map",
    level: 2,
    question: `为什么在学习服务设计和通信协议之前必须先理解SOA基础概念？`,
    answer: `SOA基础概念（服务、接口、松耦合、契约优先等）是服务设计和通信协议的理论基座。不理解松耦合原则就无法理解为什么需要接口契约，不理解服务三要素就无法设计合理的IDL接口，不理解SOA与传统信号通信的区别就无法理解SOME/IP等协议的设计动机。先建立认知框架才能理解后续的技术实现细节。`,
    tags: ["学习顺序", "前置依赖", "SOA基础", "服务设计"],
  },
];
