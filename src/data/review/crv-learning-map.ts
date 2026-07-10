import type { ReviewQuestion } from "./types";

export const crvLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "crv-learning-map-01",
    chapter: "crv-learning-map",
    level: 1,
    question: `《码农翻身》全书分为哪四个学习阶段？`,
    answer: `四个学习阶段为：基础认知（知识全景图、编程世界、面向对象与数据）、Web与数据（Web与网络、数据库与缓存）、架构进阶（分布式与架构、JVM与编程语言）、实践与成长（DevOps与云计算、职业成长与思考），最后以全书复习与知识整合闭环。`,
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "crv-learning-map-02",
    chapter: "crv-learning-map",
    level: 1,
    question: `《码农翻身》的核心脉络是什么？`,
    answer: `核心脉络：基础 → Web数据 → 架构 → 实践成长 → 知识闭环。从编程基础和 OOP 出发，经过网络通信和数据存取，到分布式架构和 JVM 机制，再到 DevOps 和职业成长，最终形成从基础到知识闭环的完整体系。`,
    tags: ["核心脉络", "知识闭环", "系统视角"],
  },
  {
    id: "crv-learning-map-03",
    chapter: "crv-learning-map",
    level: 2,
    question: `全书学习路径中各阶段之间如何递进？`,
    answer: `递进逻辑：① 基础认知（ch0-2）建立编程认知——理解计算机分层、代码到执行流程和 OOP 四大特性；② Web与数据（ch3-4）连接与存取——掌握 HTTP/TCP/IP 网络协议和数据库 ACID/缓存策略；③ 架构进阶（ch5-6）系统化设计——理解 CAP 定理、微服务和 JVM 内存/垃圾回收；④ 实践与成长（ch7-8）工程化交付——掌握 CI/CD 流水线、云计算和职业成长路径；⑤ 知识闭环（ch9）系统整合——将所有知识串联为完整实践体系。`,
    tags: ["递进关系", "学习路径", "知识演进"],
  },
  {
    id: "crv-learning-map-04",
    chapter: "crv-learning-map",
    level: 2,
    question: `用五层知识视角概括《码农翻身》的知识体系。`,
    answer: `五层知识视角：① 基础层——计算机分层、代码到执行、进程内存、OOP，建立编程认知；② Web层——HTTP请求、TCP/IP、ACID、缓存策略，连接与存取；③ 架构层——CAP定理、微服务、JVM内存、垃圾回收，系统化设计；④ 实践层——CI/CD、云计算、容器编排、DevOps，工程化交付；⑤ 成长层——职业阶梯、能力矩阵、学习方法、双轨路径，持续进化。五层从基础到Web到架构到实践到成长，层层递进形成知识闭环。`,
    tags: ["五层视角", "知识体系", "知识闭环"],
  },
];
