import type { ReviewQuestion } from "./types";

export const k8sDeploymentsQuestions: ReviewQuestion[] = [
  {
    id: "k8s-dep-1",
    chapter: "k8s-deployments",
    level: 1,
    question: "Deployment、ReplicaSet、Pod三者的关系是什么？为什么生产环境用Deployment而不直接用ReplicaSet？",
    answer: "三者关系：Deployment管理ReplicaSet，ReplicaSet管理Pod。层级结构：Deployment（声明replicas:3和Pod模板）→ 创建ReplicaSet（具体版本的Pod集合，通过label selector关联Pod）→ 创建/维持Pod（实际运行的容器实例）。每次Deployment更新spec.template（如image从v1改为v2）会创建一个新的ReplicaSet（v2），旧ReplicaSet（v1）的replicas缩为0但保留（用于回滚）。新ReplicaSet逐步创建新Pod，旧ReplicaSet逐步删除旧Pod，实现滚动更新。生产环境用Deployment而非ReplicaSet的原因：①Deployment提供声明式滚动更新——只需修改image字段，Deployment自动按maxSurge/maxUnavailable策略逐步替换Pod，无需手动管理新旧ReplicaSet；②Deployment支持回滚——保留历史ReplicaSet（revisionHistoryLimit默认10个），可kubectl rollout undo回滚到任意历史版本，ReplicaSet无回滚能力；③ReplicaSet不支持滚动更新——直接修改ReplicaSet的image只会创建新Pod但不自动删除旧Pod，新旧Pod同时运行无法保证一致性。Deployment = ReplicaSet管理 + 滚动更新 + 回滚，是生产环境管理无状态应用的标准方式。",
    tags: ["Deployment", "ReplicaSet", "Pod", "层级关系", "滚动更新"],
  },
  {
    id: "k8s-dep-2",
    chapter: "k8s-deployments",
    level: 2,
    question: "如何实现零停机滚动更新？maxSurge和maxUnavailable如何配合？readinessProbe在其中起什么作用？",
    answer: "零停机滚动更新配置：strategy.type=RollingUpdate，rollingUpdate.maxSurge=1（最多多出1个Pod），rollingUpdate.maxUnavailable=0（不允许任何Pod不可用）。更新过程：①Deployment创建1个新Pod（maxSurge=1，此时共4个Pod：3旧+1新）；②新Pod启动，readinessProbe开始检测；③readinessProbe通过 → Pod状态变为Ready → Endpoints Controller将新Pod加入Service Endpoints → 新Pod开始接收流量；④Deployment删除1个旧Pod（maxUnavailable=0保证此时仍有3个Ready Pod：2旧+1新）；⑤旧Pod收到SIGTERM → preStop钩子执行 → 从Endpoints移除 → 优雅退出；⑥重复②-⑤直到所有旧Pod被新Pod替换。maxSurge和maxUnavailable配合：maxSurge控制「先建多少新的」——设为1表示每次多出1个Pod（需要额外资源），maxUnavailable控制「后删多少旧的」——设为0表示不允许减少Ready Pod数。两者配合实现「先建后删」。readinessProbe的关键作用：确保新Pod真正就绪（应用能处理请求）后才加入Endpoints接收流量，而不是容器一启动就接流量。如果没有readinessProbe，K8s认为容器Running即Ready，但应用可能还在初始化（如加载缓存、建立连接池），此时接流量会导致请求失败。只有readinessProbe通过才证明应用真正就绪。如果没有maxUnavailable=0，可能在旧Pod删除后新Pod还没就绪，导致可用Pod数少于replicas，服务降级。",
    tags: ["滚动更新", "零停机", "maxSurge", "maxUnavailable", "readinessProbe"],
  },
  {
    id: "k8s-dep-3",
    chapter: "k8s-deployments",
    level: 2,
    question: "HPA水平自动扩缩的工作原理是什么？使用HPA有哪些前提条件？缩容行为有什么特殊机制？",
    answer: "HPA工作原理：HPA Controller每隔30秒（默认）从metrics-server获取所有Pod的CPU/内存使用率，计算平均值与目标值（如70%）比较。如果实际使用率 > 目标值 → 扩容（增加副本数），如果实际使用率 < 目标值 → 缩容（减少副本数）。扩缩公式：desiredReplicas = currentReplicas × (currentUtilization / targetUtilization)。例如3副本CPU使用率140%，目标70% → desiredReplicas = 3 × (140/70) = 6。前提条件：①部署metrics-server（提供CPU/内存指标采集），②Pod必须设置resources.requests.cpu（HPA计算使用率 = 实际CPU / requests.cpu，没有requests无法计算），③自定义指标需部署Prometheus Adapter（提供QPS/消息队列长度等自定义指标）。缩容特殊机制：①冷却期——缩容默认冷却5分钟（horizontal-pod-autoscaler-downscale-stabilization），即连续5分钟低于目标值才缩容，避免流量波动导致频繁扩缩。扩容无冷却期（立即扩容，快速响应流量增长）。②缩容步进——不会一次缩到最小，逐步缩减。③最小副本数——minReplicas防止缩到0（默认最小1，生产建议至少2保证高可用）。④最大副本数——maxReplicas防止无限扩容消耗资源。生产建议：CPU目标70%（留30%余量应对突发），minReplicas=2（高可用），maxReplicas根据集群容量设置，结合自定义指标（QPS/延迟）比纯CPU更精准。",
    tags: ["HPA", "自动扩缩", "metrics-server", "冷却期", "requests"],
  },
  {
    id: "k8s-dep-4",
    chapter: "k8s-deployments",
    level: 3,
    question: "Deployment、StatefulSet、DaemonSet三种工作负载各自适合什么场景？StatefulSet在存储和身份方面与Deployment有什么本质区别？",
    answer: "三种工作负载适合场景：①Deployment——无状态应用（Web/API/微服务）。Pod是无身份的（随机名web-deploy-abc123），可随意创建删除，所有Pod等价。适合水平扩展、滚动更新。②StatefulSet——有状态应用（数据库MySQL/PostgreSQL、消息队列Kafka/RabbitMQ、分布式存储Cassandra/Elasticsearch）。Pod有身份（有序名db-0/db-1/db-2），有稳定DNS（db-0.db-svc.default.svc.cluster.local），有独立存储。适合需要稳定身份和持久化数据的应用。③DaemonSet——每节点运行一个Pod（日志采集Fluent Bit、监控agent node-exporter、网络插件Calico/Cilium、存储插件CSI node plugin）。新节点加入自动创建Pod，节点移除自动删除Pod。适合节点级基础设施。StatefulSet与Deployment的本质区别：①Pod身份——Deployment的Pod随机命名，重建后名称变化，无法被稳定寻址；StatefulSet的Pod有序命名（db-0），重建后名称不变，DNS不变（db-0.db-svc可稳定解析到当前Pod）。②存储——Deployment所有Pod共享同一PVC（或各自PVC但重建后无法重绑原存储）；StatefulSet通过volumeClaimTemplates为每个Pod创建独立PVC（data-db-0/data-db-1），Pod重建后自动绑定原PVC，数据连续。③部署/删除顺序——StatefulSet按序号顺序创建（db-0→db-1→db-2）和逆序删除（db-2→db-1→db-0），保证主从关系的正确性；Deployment并行创建删除所有Pod。④网络——StatefulSet Pod有稳定DNS，可直接通过Pod名寻址（适合主从复制的数据库）；Deployment Pod无稳定DNS，只能通过Service间接访问。",
    tags: ["Deployment", "StatefulSet", "DaemonSet", "有状态", "工作负载对比"],
  },
];
