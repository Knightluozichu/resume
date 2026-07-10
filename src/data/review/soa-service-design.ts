import type { ReviewQuestion } from "./types";

export const soaServiceDesignQuestions: ReviewQuestion[] = [
  {
    id: "soa-service-design-01",
    chapter: "soa-service-design",
    level: 1,
    question: "SOA 服务接口的四要素是什么？各适用于什么交互模式？",
    answer: "四要素：① 方法（Method）——请求/响应（RR）模式，类似函数调用，消费方调用并等待返回；② 事件（Event）——发布/订阅（PubSub）模式，异步通知，提供方发布、消费方订阅；③ 字段（Field）——Getter/Setter模式，属性读写，可读可写；④ 广播（Broadcast）——Fire and Forget模式，无响应通知，一对多发送不等待确认。",
    tags: ["服务接口", "方法", "事件", "字段", "广播", "交互模式"],
  },
  {
    id: "soa-service-design-02",
    chapter: "soa-service-design",
    level: 2,
    question: "什么是IDL？它在SOA服务设计中的作用是什么？",
    answer: "IDL（Interface Definition Language，接口定义语言）是一种声明式描述语言，用于定义服务接口的契约。作用：① 接口定义——声明服务的方法签名、事件类型、字段属性，不涉及实现细节；② 代码生成——工具根据IDL自动生成多语言桩代码（Proxy/Skeleton），避免手写序列化/反序列化错误；③ 契约共享——提供方和消费方共享同一份IDL，保证接口一致性；④ 版本管理——IDL可声明版本号，支持向后兼容。车载常用的IDL包括Franca IDL、AUTOSAR ARXML、Protobuf。",
    tags: ["IDL", "接口定义语言", "代码生成", "契约", "Franca IDL", "ARXML"],
  },
  {
    id: "soa-service-design-03",
    chapter: "soa-service-design",
    level: 2,
    question: "服务提供方（Provider）和服务消费方（Consumer）的职责分别是什么？它们如何解耦？",
    answer: "提供方职责：实现接口定义的业务逻辑、注册到服务发现机制、等待消费方调用并返回响应。消费方职责：通过服务发现查找所需服务、订阅事件或调用方法、处理返回结果。解耦方式：① 接口解耦——双方只依赖IDL接口契约，不依赖具体实现；② 位置解耦——消费方通过服务发现动态获取提供方地址，不硬编码IP/端口；③ 版本解耦——接口版本化，提供方升级不影响消费方（向后兼容时）；④ 传输解耦——通信层（SOME/IP）屏蔽底层网络细节。这种解耦使提供方和消费方可独立开发、独立部署、独立升级。",
    tags: ["提供方", "消费方", "解耦", "服务发现", "版本管理"],
  },
  {
    id: "soa-service-design-04",
    chapter: "soa-service-design",
    level: 3,
    question: "设计一个车载车速服务接口，包含方法、事件和字段，并说明设计理由。",
    answer: "设计：service VehicleSpeedService { method getSpeed() returns uint16; event speedExceeded(uint16 threshold); field currentSpeed uint16; }。设计理由：① getSpeed方法——消费方（如仪表盘）需要主动查询当前车速时使用RR模式，确保获取最新值；② speedExceeded事件——超速预警场景，提供方（车速传感器服务）在车速超阈值时异步发布，消费方（告警系统）订阅后即时收到，避免轮询开销；③ currentSpeed字段——需要持续监控车速的场景（如ADAS），通过Getter读取当前值或Setter设值（如模拟测试时），比方法调用更轻量。三种要素覆盖了主动查询、被动通知、持续监控三种典型交互需求。",
    tags: ["服务设计", "车速服务", "方法", "事件", "字段", "设计理由"],
  },
];
