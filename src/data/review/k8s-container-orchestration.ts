import type { ReviewQuestion } from "./types";

export const k8sContainerOrchestrationQuestions: ReviewQuestion[] = [
  {
    id: "k8s-co-1",
    chapter: "k8s-container-orchestration",
    level: 1,
    question: "Kubernetes的控制面包含哪些组件？各自承担什么职责？",
    answer: "控制面四大组件：①API Server——集群唯一入口，所有组件和用户通过它交互。负责认证（Token/证书/OIDC）、授权（RBAC）、准入控制（Mutating/Validating Admission Webhook），将资源写入etcd。所有其他组件（Scheduler/Controller Manager/kubelet）都通过Watch API Server获取状态变化。②etcd——分布式键值数据库，存储集群所有状态和配置数据。使用Raft协议保证一致性（多数节点写入成功才算提交），是集群的「单一事实来源」。etcd的可靠性直接决定集群可靠性，生产环境3-5节点集群。③Scheduler——调度器，Watch到新创建的Pod（spec.nodeName为空）后，执行两阶段调度：Filter（过滤不满足条件的节点——资源不足/端口冲突/污点不容忍/nodeSelector不匹配）和Score（对候选节点打分——资源均衡度/亲和性权重），选最高分节点绑定Pod。④Controller Manager——运行所有内置控制器的进程。Deployment Controller（管理副本数和滚动更新）、ReplicaSet Controller（维持Pod副本数）、Node Controller（监控节点健康状态）、Endpoint Controller（维护Service的Endpoints）等。通过Watch+Reconcile循环将实际状态拉向期望状态。",
    tags: ["控制面", "API Server", "etcd", "Scheduler", "Controller Manager"],
  },
  {
    id: "k8s-co-2",
    chapter: "k8s-container-orchestration",
    level: 2,
    question: "声明式API和命令式API有什么区别？为什么K8s选择声明式？Reconcile循环如何工作？",
    answer: "命令式API告诉系统「做什么」，如docker run nginx——直接执行一个动作，不可重复执行（重复执行会创建多个容器）。声明式API告诉系统「期望什么状态」，如replicas:3——系统持续保证实际状态等于期望状态，可重复执行（幂等），apply多次效果相同。K8s选择声明式的原因：①自愈——Pod故障后控制器自动重建，无需人工干预；②可重入——kubectl apply可重复执行，适合CI/CD流水线；③可审计——YAML即期望状态的完整描述，可版本控制（GitOps）；④最终一致——控制器持续Reconcile，即使中间失败也会重试直到达成期望状态。Reconcile循环工作原理：①控制器Watch API Server上的资源变化（如Deployment的replicas字段从1改为3）；②对比期望状态（replicas:3）与实际状态（当前1个Pod）；③执行操作消除差异——创建2个新Pod；④持续监控——如果某个Pod故障被删，实际变为2，控制器再次Reconcile创建1个Pod恢复到3。整个循环是「Watch → Compare → Act → Repeat」，保证系统最终收敛到期望状态，即使发生临时故障也能自动恢复。",
    tags: ["声明式API", "命令式API", "Reconcile循环", "控制器模式"],
  },
  {
    id: "k8s-co-3",
    chapter: "k8s-container-orchestration",
    level: 2,
    question: "数据面（Worker Node）包含哪些组件？kubelet和kube-proxy各自的作用是什么？",
    answer: "数据面三大组件：①kubelet——运行在每个节点上的代理，负责管理Pod生命周期。它Watch API Server上分配到本节点的Pod（spec.nodeName等于本节点名），调用CRI（Container Runtime Interface）启动/停止容器，调用CNI配置Pod网络，调用CSI挂载存储卷。定期向API Server汇报节点状态（NodeStatus：资源容量/已用/条件）和Pod状态（PodStatus：Running/Pending/Failed）。执行探针检查（liveness/readiness）并根据结果重启容器或更新就绪状态。②kube-proxy——运行在每个节点上的网络代理，维护Service到Pod的网络转发规则。Watch Service和Endpoints变化，在节点上更新iptables/IPVS规则。当请求到达ClusterIP时，iptables DNAT（目标地址转换）随机选择一个Endpoint（Pod IP:targetPort）转发。iptables模式性能好但规则多时更新慢，IPVS模式基于Linux内核IPVS模块，支持更多负载均衡算法（轮询/最少连接/源地址哈希），大规模集群性能更优。③容器运行时——通过CRI接口与kubelet通信，负责拉取镜像、启动/停止容器。主流实现：containerd（K8s默认推荐）、CRI-O（Red Hat主导）、Docker（已弃用，K8s 1.24+移除dockershim）。三者协作：kubelet管理Pod生命周期 → 容器运行时执行容器操作 → kube-proxy维护网络规则，共同实现数据面的容器运行和网络通信。",
    tags: ["数据面", "kubelet", "kube-proxy", "CRI", "容器运行时"],
  },
  {
    id: "k8s-co-4",
    chapter: "k8s-container-orchestration",
    level: 3,
    question: "请描述从kubectl apply到Pod Running的完整组件协作流程。",
    answer: "①用户执行kubectl apply -f deployment.yaml → kubectl将YAML发送给API Server。②API Server认证（验证客户端证书/Token）→ 授权（RBAC检查用户是否有create deployments权限）→ 准入控制（MutatingAdmissionWebhook可修改资源 → ValidatingAdmissionWebhook校验资源合法性，如必须设置resources.limits）→ 将Deployment对象序列化写入etcd。③Deployment Controller（在Controller Manager中运行）Watch到新Deployment → 对比期望（replicas:3）与实际（0个ReplicaSet）→ 创建ReplicaSet对象写入etcd。④ReplicaSet Controller Watch到新ReplicaSet → 对比期望（3个Pod）与实际（0）→ 创建3个Pod对象（spec.nodeName为空）写入etcd。⑤Scheduler Watch到nodeName为空的Pod → Filter阶段过滤不满足条件的节点（资源不足/端口冲突/Taint不容忍/nodeSelector不匹配）→ Score阶段对候选节点打分（资源均衡度/亲和性权重）→ 选择最高分节点 → 更新Pod的spec.nodeName → 写入etcd。⑥kubelet Watch到spec.nodeName等于本节点的Pod → 调用CRI拉取镜像并创建容器 → 调用CNI分配Pod IP、设置网络路由 → 调用CSI挂载存储卷 → 启动容器。⑦kubelet执行探针 → startupProbe通过后启用liveness/readiness → readinessProbe通过后更新Pod状态为Ready。⑧Pod Running且Ready → 其他组件（Endpoints Controller、kube-proxy）Watch到Pod就绪 → Endpoints加入Service → iptables规则更新 → Service可接收流量。",
    tags: ["全链路", "组件协作", "kubectl apply", "Pod创建流程"],
  },
];
