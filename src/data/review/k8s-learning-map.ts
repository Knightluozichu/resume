import type { ReviewQuestion } from "./types";

export const k8sLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "k8s-lm-1",
    chapter: "k8s-learning-map",
    level: 1,
    question: `全书分为哪四个部分？各自的核心内容和递进逻辑是什么？`,
    answer: `全书分四个部分：第一部分「基础入门」——全书学习地图（知识体系全景、四条核心主线、推荐学习路径）、容器编排入门（容器编排定义、K8s架构、控制面API Server/etcd/Scheduler/Controller Manager与数据面kubelet/kube-proxy/容器运行时、声明式API与Reconcile循环）；第二部分「工作负载」——Pod基础（Pod定义、多容器共享网络和存储、pause容器、生命周期、liveness/readiness/startup探针、资源requests/limits）、Deployment与副本管理（Deployment管理ReplicaSet、滚动更新maxSurge/maxUnavailable、回滚、HPA水平自动扩缩）；第三部分「网络与存储」——Service与网络（四种类型ClusterIP/NodePort/LoadBalancer/ExternalName、Endpoints与label selector、kube-proxy iptables/IPVS、CoreDNS服务发现、Ingress七层路由、CNI网络模型）、存储与Volume（Volume类型emptyDir/hostPath/configMap/PVC、PV/PVC静态供给、StorageClass动态供给、StatefulSet独立PVC、CSI接口）、ConfigMap与Secret（配置注入环境变量vs Volume挂载、Secret Base64编码、热更新机制、etcd静态加密）；第四部分「调度与运维」——调度与亲和性（调度器两阶段Filter/Score、nodeSelector/nodeAffinity/podAffinity/podAntiAffinity、Taint/Toleration、topologySpreadConstraints、PriorityClass抢占）、安全与运维（RBAC Role/ClusterRole/RoleBinding/ClusterRoleBinding、ServiceAccount、NetworkPolicy网络隔离、SecurityContext容器安全、Prometheus/Grafana/ELK/Jaeger可观测性、优雅终止）、全书复习整合。递进逻辑：从什么是容器编排 → 应用怎么跑 → 怎么通信持久化 → 怎么调度运维。`,
    tags: ["学习地图", "知识体系", "四部分递进"],
  },
  {
    id: "k8s-lm-2",
    chapter: "k8s-learning-map",
    level: 2,
    question: `贯穿全书的四条核心主线是什么？它们在哪些交汇点形成闭环？`,
    answer: `主线一「工作负载」：Pod → Deployment → ReplicaSet → Job/CronJob，回答「应用怎么跑」。Pod是K8s最小调度单元，Deployment管理ReplicaSet实现副本维持和滚动更新，ReplicaSet通过label selector关联Pod，Job/CronJob处理批处理任务。主线二「网络通信」：Service → Endpoints → DNS → Ingress，回答「服务怎么发现」。Service提供稳定ClusterIP，Endpoints动态维护Pod地址列表（readinessProbe控制），CoreDNS自动解析服务名称，Ingress实现七层host+path路由。主线三「存储配置」：Volume → PV → PVC → StorageClass，回答「数据怎么持久化」。Volume是Pod级存储，PV是集群级存储资源，PVC是用户申请，StorageClass实现动态供给，ConfigMap/Secret注入配置。主线四「调度运维」：Scheduler → Affinity → RBAC → NetworkPolicy，回答「怎么调度和运维」。Scheduler两阶段Filter+Score调度Pod，Affinity控制Pod分布，RBAC控制访问权限，NetworkPolicy隔离网络流量。四个交汇点：①Pod-Service-Endpoints是工作负载与网络通信的交汇——Pod由标签被Service选中，readinessProbe控制Endpoints，是服务发现枢纽；②Pod-Volume-PVC是工作负载与存储配置的交汇——Pod通过PVC挂载PV，StatefulSet保证存储连续性；③Deployment-Scheduler-Node是工作负载与调度运维的交汇——Deployment创建Pod，Scheduler按资源和亲和性分配节点；④Secret-RBAC-NetworkPolicy是存储配置与调度运维的交汇——Secret管理敏感数据，RBAC控制访问，NetworkPolicy隔离流量，构成安全治理体系。`,
    tags: ["四条主线", "交汇点", "核心认知"],
  },
  {
    id: "k8s-lm-3",
    chapter: "k8s-learning-map",
    level: 2,
    question: `为什么学习Kubernetes要遵循'基础入门→工作负载→网络与存储→调度与运维'的顺序？`,
    answer: `顺序依据：每一步是下一步的前提。基础入门（容器编排定义/K8s架构/控制面数据面/声明式API）是理解K8s为何存在以及如何工作的基础——不懂控制面与数据面的协作就无法理解后续资源的创建流程。工作负载（Pod/Deployment/探针/HPA）建立在基础概念之上——需先理解声明式API和Reconcile循环才能理解Deployment如何管理副本和滚动更新，需先理解Pod模型才能理解探针和资源限制。网络与存储（Service/Endpoints/Ingress/PV-PVC/ConfigMap-Secret）建立在工作负载之上——需先理解Pod和Deployment才能理解Service如何通过label selector关联Pod、Endpoints如何随Pod就绪状态动态更新。调度与运维（亲和性/污点/RBAC/NetworkPolicy/监控）建立在完整理解之上——需先理解Deployment创建Pod的流程才能理解Scheduler如何调度、需先理解Service网络才能理解NetworkPolicy如何隔离、需先理解Secret才能理解RBAC如何保护敏感数据。跳过基础的风险：①不懂容器编排概念无法理解K8s各组件的设计目标；②不懂Pod模型无法理解Deployment副本管理；③不懂Service网络无法理解服务发现与流量路由；④不懂调度机制无法进行生产级资源规划与故障排查。`,
    tags: ["学习路径", "递进逻辑", "依赖关系"],
  },
  {
    id: "k8s-lm-4",
    chapter: "k8s-learning-map",
    level: 3,
    question: `Kubernetes的核心设计哲学是什么？它与Docker Swarm、Nomad等编排方案有什么本质区别？`,
    answer: `核心设计哲学：以声明式API为核心，通过控制器模式将实际状态拉向期望状态，通过Pod抽象解耦容器与调度，通过分层架构（控制面/数据面）实现可扩展的容器编排平台。四大技术特点：①声明式API——用户通过YAML声明期望状态（如replicas:3），控制器持续Reconcile把实际状态拉向期望状态，天然支持自愈和可重入；②控制器模式——每类资源对应控制器（Deployment Controller/ReplicaSet Controller/Node Controller等），通过Watch+Reconcile循环保证最终一致性；③Pod最小调度单元——容器不直接调度，Pod内多容器共享网络命名空间和存储卷，是K8s的原子单位；④分层架构——控制面（API Server/etcd/Scheduler/Controller Manager）负责集群级决策，数据面（kubelet/kube-proxy/容器运行时）负责执行，通过CRI/CNI/CSI标准接口解耦。与Docker Swarm的区别：Swarm是Docker原生编排，配置简单但功能有限（无完整控制器模式、无PV/PVC存储抽象、无高级调度），适合小规模。K8s功能完整（完整工作负载/网络/存储/安全体系）但复杂度高。与Nomad的区别：Nomad是HashiCorp的单二进制编排器，支持非容器工作负载（Java/静态二进制），架构简单但不具备K8s的声明式API和丰富生态。K8s是云原生事实标准，生态最丰富（Helm/ArgoCD/Prometheus/ Istio），适合中大规模生产环境。`,
    tags: ["设计哲学", "K8s vs Swarm", "K8s vs Nomad", "声明式API"],
  },
];
