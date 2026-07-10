import type { ReviewQuestion } from "./types";

export const soaServiceDiscoveryQuestions: ReviewQuestion[] = [
  {
    id: "soa-service-discovery-01",
    chapter: "soa-service-discovery",
    level: 1,
    question: `SOME/IP 服务发现的三步流程是什么？`,
    answer: `三步流程：① 注册Offer——服务提供方启动时向网络发送OfferService消息，声明可用的服务实例（Service ID + Instance ID + 版本 + 地址端口）；② 查找Find——服务消费方启动时发送FindService消息，请求所需的服务实例；③ 订阅/调用——匹配成功后建立通信通道，消费方订阅事件组或调用方法。提供方周期性发送OfferService保持服务可见，TTL到期未续约则服务被视为不可用。`,
    tags: ["服务发现", "OfferService", "FindService", "三步流程", "TTL"],
  },
  {
    id: "soa-service-discovery-02",
    chapter: "soa-service-discovery",
    level: 2,
    question: `SOME/IP-SD 协议有哪些关键消息类型？各自的用途是什么？`,
    answer: `关键消息类型：① OfferService——提供方宣告服务可用，携带Service ID、Instance ID、版本、TTL、Endpoint信息；② StopOffer——提供方停止服务时发送，通知消费方服务下线；③ FindService——消费方查找服务，可按Service ID或Instance ID精确查找；④ SubscribeEventgroup——消费方订阅提供方的事件组，接收异步事件通知；⑤ StopSubscribeEventgroup——取消事件组订阅；⑥ SubscribeEventgroupAck——提供方确认订阅成功。这些消息通过组播UDP（224.224.224.245:30490）传输。`,
    tags: ["SOME/IP-SD", "OfferService", "StopOffer", "FindService", "SubscribeEventgroup", "消息类型"],
  },
  {
    id: "soa-service-discovery-03",
    chapter: "soa-service-discovery",
    level: 2,
    question: `SOME/IP-SD 中的 TTL 机制有什么作用？它如何保证服务发现的可靠性？`,
    answer: `TTL（Time To Live）机制作用：TTL是OfferService消息中的存活时间参数（秒），表示该服务在多久内有效。可靠性保障：① 保活——提供方必须在TTL到期前周期性重发OfferService续约，否则消费方判定服务下线；② 故障检测——提供方崩溃后停止发送Offer，TTL到期后消费方自动感知服务不可用，无需额外心跳机制；③ 平滑过渡——TTL到期前消费方有时间切换到备用服务实例；④ 资源回收——过期的服务实例自动从服务列表移除，避免无效连接。典型TTL值为3-5秒，Offer发送周期为TTL的1/3。`,
    tags: ["TTL", "保活", "故障检测", "可靠性", "OfferService"],
  },
  {
    id: "soa-service-discovery-04",
    chapter: "soa-service-discovery",
    level: 3,
    question: `SOA 中间件在车载软件分层架构中的位置和职责是什么？为什么需要中间件层？`,
    answer: `位置：中间件位于应用层和通信栈之间——上层是服务提供方/消费方应用，下层是TCP/UDP+以太网驱动，再下是操作系统。职责：① 服务抽象——将底层网络通信封装为服务接口调用（Proxy/Skeleton），应用无需关心网络细节；② 序列化/反序列化——将结构化数据编码为二进制消息（SOME/IP）或反之；③ 服务发现——管理服务注册、查找、保活、订阅的完整生命周期；④ 路由——根据Service ID/Method ID将消息路由到正确的服务实例。需要中间件的原因：① 解耦——应用只面向接口编程，不关心传输细节；② 复用——同一中间件支持多种服务的通信需求；③ 标准化——AUTOSAR标准化中间件接口，保证跨供应商互操作；④ 可维护——通信逻辑集中管理，变更不影响应用代码。`,
    tags: ["中间件", "分层架构", "服务抽象", "序列化", "服务发现", "解耦", "标准化"],
  },
];
