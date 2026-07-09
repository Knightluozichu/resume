import type { ReviewQuestion } from "./types";

export const mspServiceDiscoveryQuestions: ReviewQuestion[] = [
  {
    id: "msp-sd-1",
    chapter: "msp-service-discovery",
    level: 1,
    question: "为什么微服务需要服务发现？客户端发现和服务端发现有什么区别？",
    answer:
      "需要服务发现因为服务实例地址随扩缩容、宕机重启、容器调度而动态变化，调用方不能写死地址。客户端发现：调用方从注册中心查询目标服务的实例列表，自行选择实例（客户端负载均衡），直接调用选中实例。优点是直连性能好（少一跳路由），缺点是调用方需实现负载均衡逻辑每种语言需各自SDK。典型实现如Netflix Eureka + Ribbon。服务端发现：调用方请求路由器/负载均衡器，路由器从注册中心查询实例列表并选择实例转发请求。优点是调用方逻辑简单（只需请求路由器）语言无关，缺点是多一跳路由。典型实现如Kubernetes Service + kube-proxy。",
    tags: ["服务发现", "客户端发现", "服务端发现", "动态寻址"],
  },
  {
    id: "msp-sd-2",
    chapter: "msp-service-discovery",
    level: 2,
    question: "服务注册中心为什么通常选AP而不是CP？",
    answer:
      "服务发现通常选AP（如Eureka）而非CP（如Zookeeper）的原因：注册中心网络分区时，AP系统仍可查询（可能返回过期实例列表），CP系统为保证一致性会拒绝查询。影响分析：AP返回过期实例——可能包含已宕机实例，调用方调用失败但通过重试和熔断可处理，影响可控。CP拒绝查询——调用方无法发现服务实例导致调用全部失败，影响更严重。服务发现核心需求是可用性（随时能查到实例列表）而非强一致性（实例列表短暂过期可接受）。但Kubernetes用etcd（CP）是因为etcd存的是整个集群状态（不仅服务发现），且通过kube-proxy本地缓存缓解了CP的可用性问题。Nacos支持AP/CP切换。",
    tags: ["AP", "CP", "CAP", "Eureka", "服务注册中心"],
  },
  {
    id: "msp-sd-3",
    chapter: "msp-service-discovery",
    level: 1,
    question: "服务注册有哪两种方式？各自有什么优缺点？",
    answer:
      "①自注册（Self-Registration）：服务实例启动时自己向注册中心注册地址，关闭时自己注销。优点是实现简单、自动注册；缺点是实例需知道注册中心地址，且崩溃时可能来不及注销（需健康检查兜底——注册中心定期检测实例存活，超时未续约则自动摘除）。②第三方注册（Third-Party Registration）：独立注册器（独立进程）监控服务实例，代理注册/注销。优点是服务实例不需感知注册中心、统一管理所有服务注册；缺点是注册器是额外组件且本身需高可用。自注册更常用（如Spring Cloud Eureka客户端自动注册），第三方注册适合平台层统一管理（如Kubernetes中kubelet代理注册）。",
    tags: ["自注册", "第三方注册", "健康检查", "服务注册"],
  },
  {
    id: "msp-sd-4",
    chapter: "msp-service-discovery",
    level: 2,
    question: "Kubernetes的服务发现是如何工作的？它属于哪种模式？",
    answer:
      "Kubernetes服务发现属于服务端发现模式。工作原理：①创建Service对象时分配一个虚拟IP（ClusterIP）和DNS名②kube-proxy监听etcd（注册中心）中的Pod变化，自动配置iptables/IPVS规则将访问ClusterIP的请求路由到后端Pod③调用方只需访问Service的ClusterIP或DNS名，无需关心Pod实例地址④Pod创建/删除时kube-proxy自动更新路由规则。调用方不直接查询注册中心，而是访问稳定的Service地址，kube-proxy在节点本地维护路由规则实现转发。Kubernetes用etcd（CP）作为注册中心存集群状态，但通过kube-proxy本地缓存规则缓解了CP的可用性问题——即使etcd暂时不可用，已有的本地路由规则仍然有效。",
    tags: ["Kubernetes", "Service", "kube-proxy", "服务端发现", "etcd"],
  },
];
