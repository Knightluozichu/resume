import type { ReviewQuestion } from "./types";

export const k8sServicesNetworkingQuestions: ReviewQuestion[] = [
  {
    id: "k8s-svc-1",
    chapter: "k8s-services-networking",
    level: 1,
    question: `Service的四种类型分别是什么？各自的使用场景和暴露范围是什么？`,
    answer: `四种类型：①ClusterIP（默认）——分配集群内部虚拟IP（如10.96.0.10），仅集群内Pod可通过ClusterIP或DNS名称访问。用于微服务间内部通信，如前端Service调用后端Service。不对外暴露。②NodePort——在ClusterIP基础上，在每个节点开放端口（30000-32767），外部可通过任意节点IP:nodePort访问。用于测试环境或需要TCP直接访问的场景。生产环境一般不直接用（端口有限、节点IP变化、无TLS终止），通常作为LoadBalancer的前端。③LoadBalancer——在NodePort基础上，自动调用云厂商API创建外部负载均衡器（AWS ELB/ALB、GCP Load Balancer、Azure LB），分配外部IP。用于生产环境对外暴露HTTP/TCP服务。每个LB有成本，通常配合Ingress减少LB数量。④ExternalName——创建DNS CNAME记录指向外部域名（如db.example.com），不创建ClusterIP和Endpoints。用于将外部服务（如RDS）以K8s DNS名称引用，应用代码用db-service.default.svc.cluster.local连接，实际解析到外部RDS，方便后续迁移到集群内。从ClusterIP到ExternalName，暴露范围从内到外：ClusterIP（仅集群内）→ NodePort（节点IP）→ LoadBalancer（外部LB IP）→ ExternalName（外部域名别名）。`,
    tags: ["Service", "ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
  },
  {
    id: "k8s-svc-2",
    chapter: "k8s-services-networking",
    level: 2,
    question: `Service是如何通过label selector关联Pod的？Endpoints如何动态更新？kube-proxy如何实现负载均衡？`,
    answer: `关联机制：Service的spec.selector定义label匹配规则（如app: web）。Endpoints Controller持续Watch集群中所有Pod的变化。当Pod的labels匹配Service的selector且Pod的readinessProbe通过时，将Pod IP + targetPort加入Endpoints列表；当Pod不再匹配（标签变更）、readinessProbe失败或Pod被删除时，从Endpoints移除。动态更新场景：①滚动更新——新Pod就绪加入Endpoints，旧Pod终止移出Endpoints，配合maxUnavailable=0实现零停机；②Pod故障——readinessProbe失败，Pod被移出Endpoints，流量不再打到故障Pod；③扩缩容——HPA扩容的新Pod就绪后自动加入Endpoints，缩容的Pod被移出。kube-proxy负载均衡：kube-proxy在每个节点运行，Watch Service和Endpoints变化。当Endpoints变化时，kube-proxy更新节点上的iptables/IPVS规则。iptables模式：为每个Service创建一组iptables规则，请求到ClusterIP时通过DNAT（目标地址转换）随机选择一个Endpoint（Pod IP:targetPort）转发。随机选择本质是加权随机（通过statistic模块的random概率实现）。IPVS模式：基于Linux内核IPVS模块，支持更多负载均衡算法（轮询/最少连接/源地址哈希/目标地址哈希），在大规模集群（Service和Endpoints数量多）时性能优于iptables（iptables规则是线性匹配O(n)，IPVS是哈希查找O(1)）。核心：Service是稳定的（ClusterIP不变），Endpoints是动态的（随Pod变化），Pod是易变的（IP随时变）。`,
    tags: ["Service", "label selector", "Endpoints", "kube-proxy", "iptables", "IPVS"],
  },
  {
    id: "k8s-svc-3",
    chapter: "k8s-services-networking",
    level: 2,
    question: `CoreDNS在K8s中如何工作？Service和Pod的DNS记录格式是什么？跨命名空间如何访问？`,
    answer: `CoreDNS工作原理：CoreDNS以Deployment形式运行在kube-system命名空间，通常2个副本保证高可用。它Watch API Server上的Service和Endpoint变化，自动为每个Service创建DNS A记录（ClusterIP）和SRV记录（端口）。Pod的DNS策略由spec.dnsPolicy决定：ClusterFirst（默认，先查集群DNS）→ Default（使用节点DNS）→ None（自定义）。Service DNS记录格式：<service-name>.<namespace>.svc.cluster.local → 解析为ClusterIP。例如web-svc.default.svc.cluster.local解析为10.96.0.10。短名省略：同命名空间可用web-svc（CoreDNS通过搜索域补全为web-svc.default.svc.cluster.local）；跨命名空间用web-svc.production（补全为web-svc.production.svc.cluster.local）。Headless Service（clusterIP: None）不返回ClusterIP，而是直接返回所有Pod IP（A记录轮询），适合客户端自行负载均衡或StatefulSet直接寻址Pod。Pod DNS记录格式：<pod-ip-dashed>.<namespace>.pod.cluster.local，如10.0.1.5的Pod记录为10-0-1-5.default.pod.cluster.local。SRV记录格式：_<port-name>._<protocol>.<service>.<namespace>.svc.cluster.local，返回端口号和对应Pod的CNAME。跨命名空间访问：Service DNS名称包含namespace段，跨命名空间用<service>.<namespace>即可。如default命名空间的Pod访问production命名空间的Service：curl http://api-svc.production:80。CoreDNS搜索域：/etc/resolv.conf配置search default.svc.cluster.local svc.cluster.local cluster.local，短名会依次尝试这些后缀。`,
    tags: ["CoreDNS", "DNS", "服务发现", "命名空间", "Headless Service"],
  },
  {
    id: "k8s-svc-4",
    chapter: "k8s-services-networking",
    level: 3,
    question: `Ingress和Service（LoadBalancer）有什么区别？生产环境如何选择？Ingress Controller如何工作？`,
    answer: `Ingress和Service LoadBalancer的区别：①层级——Service LoadBalancer工作在四层（TCP/UDP），只做端口转发，不理解HTTP协议；Ingress工作在七层（HTTP/HTTPS），理解host、path、header，可基于URL路由。②路由能力——LoadBalancer只能按端口分发（一个LB一个Service）；Ingress可按host+path分发（一个Ingress Controller服务多个Service，如api.example.com/users→user-svc，api.example.com/orders→order-svc）。③TLS终止——LoadBalancer需在每个Pod中处理TLS（证书分散管理）；Ingress Controller集中终止TLS（证书统一管理，Pod收到明文HTTP）。④成本——每个LoadBalancer是云厂商收费资源（AWS ELB约$18/月）；Ingress Controller只需一个LoadBalancer暴露，内部通过虚拟主机路由到多个Service，大幅降低成本。生产环境选择：对外暴露HTTP/HTTPS服务 → Ingress（七层路由+TLS集中终止+成本优化）；对外暴露TCP/UDP服务 → LoadBalancer（如数据库、游戏服务器）；内部服务 → ClusterIP。Ingress Controller工作原理：Ingress资源本身只是路由规则声明（YAML），需要Ingress Controller实际执行。主流Controller：nginx-ingress（最常用）、traefik、HAProxy。Controller通常以Deployment或DaemonSet运行，通过NodePort或LoadBalancer Service暴露。Controller Watch Ingress资源变化，将规则转换为Nginx配置（nginx-ingress）或路由表（traefik）， reload配置生效。当请求到达Ingress Controller时，按host匹配虚拟主机，再按path匹配后端Service，通过Service的Endpoints转发到具体Pod。高级功能：金丝雀发布（按header/权重分流）、限流、重写、认证等通过annotations配置。`,
    tags: ["Ingress", "LoadBalancer", "七层路由", "Ingress Controller", "TLS终止"],
  },
];
