import type { ReviewQuestion } from "./types";

export const k8sSchedulingQuestions: ReviewQuestion[] = [
  {
    id: "k8s-sch-1",
    chapter: "k8s-scheduling",
    level: 1,
    question: `Kubernetes调度器的两阶段工作流程是什么？资源requests和limits对调度有什么不同的影响？`,
    answer: `两阶段：①Filter（过滤阶段）——遍历所有节点，排除不满足条件的节点。过滤条件包括：资源不足（节点Allocatable - 所有已调度Pod的requests总和 < 新Pod的requests）、端口冲突（hostPort已被占用）、nodeSelector/nodeAffinity不匹配、Taint不容忍（NoSchedule效果）、Volume不可用（如节点无对应CSI驱动或AccessMode不兼容）、节点不可调度（cordon/Unschedulable）。通过Filter的节点进入候选列表。②Score（打分阶段）——对候选节点打分排序。打分策略包括：LeastRequestedPriority（资源使用均衡——剩余资源越多分数越高）、NodeAffinityPriority（节点亲和性权重匹配）、InterPodAffinityPriority（Pod亲和性/反亲和性权重）、TaintTolerationPriority（污点容忍度）、TopologySpreadPriority（拓扑分布均衡度）、ImageLocalityPriority（节点已有镜像则加分，减少拉取时间）。选最高分节点绑定Pod。如果Filter阶段无节点通过则Pod处于Pending状态。requests vs limits对调度的影响：requests是调度依据——Scheduler检查「节点Allocatable - 所有已调度Pod的requests总和 >= 新Pod的requests」，只有满足才通过Filter。例如节点有4核CPU，已调度3个Pod各requests 1核（共3核），新Pod requests 1核 → 4-3=1 >= 1 通过。limits不影响调度——Scheduler不检查limits，因此一个节点可能overcommit（所有Pod的limits之和超过节点容量）。例如4核节点上3个Pod各limits 2核（共6核 > 4核），但requests各1核（共3核 < 4核），调度通过。limits仅影响运行时——CPU超限被throttle（限流不杀进程），内存超限被OOMKilled。生产建议：requests基于P95流量设置（保证调度和基础性能），limits设为requests的2倍（允许突发），内存limits等于requests（避免OOM）。`,
    tags: ["调度器", "Filter", "Score", "requests", "limits", "资源调度"],
  },
  {
    id: "k8s-sch-2",
    chapter: "k8s-scheduling",
    level: 2,
    question: `nodeAffinity、podAntiAffinity、Taint/Toleration各自解决什么调度问题？生产环境如何组合使用？`,
    answer: `三者解决不同维度的调度问题：①nodeAffinity——解决「Pod要去什么样的节点」的问题。按节点标签（labels）选择节点，如zone=east、disktype=ssd、gpu=true。支持硬约束（requiredDuringScheduling，不满足则Pod Pending）和软约束（preferredDuringScheduling，尽量满足但不强制）。操作符：In/NotIn/Exists/DoesNotExist/Gt/Lt。用于将Pod调度到具有特定硬件或属性的节点。②podAntiAffinity——解决「Pod要远离什么样的Pod」的问题。按已运行Pod的标签和topologyKey选择，控制Pod之间的分布。例如同一Deployment的Pod尽量不在同一节点（topologyKey=kubernetes.io/hostname）或同一可用区（topologyKey=topology.kubernetes.io/zone）。也支持硬约束和软约束。用于高可用分布部署，避免单点故障。③Taint/Toleration——解决「节点排斥Pod」的问题。Taint标记节点排斥所有Pod（NoSchedule不调度新Pod/NoExecute驱逐已有Pod），只有配置了对应Toleration的Pod才能调度到该节点。用于专用节点（GPU节点只跑GPU任务）、节点维护（维护时打Taint驱逐Pod）。生产环境组合：①GPU训练任务——Taint gpu=true:NoSchedule（GPU节点排斥普通Pod）+ Toleration gpu=true（GPU任务容忍）+ nodeAffinity required gpu=true（硬约束确保只调度到GPU节点）+ podAntiAffinity preferred hostname（多GPU任务分散到不同节点）。②Web服务高可用——podAntiAffinity preferred zone（尽量跨可用区分散）+ topologySpreadConstraints maxSkew=1 zone（严格均匀分布，maxSkew控制各域Pod数差不超过1）+ nodeAffinity preferred ssd（尽量用SSD节点提升IO性能）。③数据库有状态服务——nodeAffinity required zone=east（固定可用区避免跨区延迟）+ Taint Toleration（专用节点排斥其他Pod）+ podAntiAffinity required hostname（同一StatefulSet的Pod不在同节点避免单点故障）。三者配合：Taint限定节点范围 → nodeAffinity选择目标节点 → podAntiAffinity分散Pod → topologySpread保证均匀。`,
    tags: ["nodeAffinity", "podAntiAffinity", "Taint", "Toleration", "调度组合"],
  },
  {
    id: "k8s-sch-3",
    chapter: "k8s-scheduling",
    level: 2,
    question: `topologySpreadConstraints如何工作？与podAntiAffinity有什么区别？生产环境如何选择？`,
    answer: `topologySpreadConstraints工作原理：控制Pod在不同拓扑域（topologyKey如zone/hostname/rack）的均匀分布。核心参数：①maxSkew——各拓扑域之间Pod数量的最大差值。例如maxSkew=1，3个可用区已有Pod数[2,1,1]，新Pod必须调度到第二或第三个区（使其变为[2,2,1]，差值为1），不能调度到第一个区（会变成[3,1,1]，差值为2>1）。②topologyKey——拓扑域的标签键，如kubernetes.io/hostname（按节点分）、topology.kubernetes.io/zone（按可用区分）。③whenUnsatisfiable——不满足时行为：DoNotSchedule（硬约束，不满足则Pending）/ ScheduleAnyway（软约束，尽量满足但一定能调度）。④labelSelector——选择要分散的Pod。与podAntiAffinity的区别：①精确度——podAntiAffinity是「布尔判断」（同一拓扑域有匹配Pod则不去/尽量不去），无法控制分布的均匀程度。topologySpreadConstraints是「数值控制」（maxSkew精确控制各域差值），能保证均匀分布。②多拓扑域——podAntiAffinity只能针对一个topologyKey。topologySpreadConstraints可定义多个约束（如同时按zone和hostname分散）。③行为——podAntiAffinity的preferred只是「优先」但不保证均匀。topologySpreadConstraints的DoNotSchedule是「强制」保证maxSkew。生产环境选择：①严格均匀分布（如数据库多副本必须跨可用区）→ topologySpreadConstraints maxSkew=1 whenUnsatisfiable=DoNotSchedule。②尽量分散但允许不均衡（如Web服务尽量跨区但节点不足时也接受）→ topologySpreadConstraints maxSkew=1 whenUnsatisfiable=ScheduleAnyway 或 podAntiAffinity preferred。③防止同节点（如同一Deployment的Pod不在同节点）→ podAntiAffinity required hostname 或 topologySpreadConstraints maxSkew=1 hostname DoNotSchedule。推荐组合：topologySpreadConstraints按zone分散（高可用）+ podAntiAffinity按hostname远离（防同节点单点）。`,
    tags: ["topologySpreadConstraints", "podAntiAffinity", "maxSkew", "拓扑分布"],
  },
  {
    id: "k8s-sch-4",
    chapter: "k8s-scheduling",
    level: 3,
    question: `PriorityClass和抢占机制如何工作？什么情况下会触发抢占？抢占有什么风险？`,
    answer: `PriorityClass工作原理：PriorityClass定义优先级（value越大优先级越高，1-1000000000），Pod通过spec.priorityClassName引用。调度时优先调度高优先级Pod。system-cluster-critical（2000000000）和system-node-critical（2000001000）是系统保留优先级。抢占机制：当高优先级Pod无法调度（无节点满足资源），Scheduler触发抢占——从所有节点中找到可以驱逐低优先级Pod后能满足高优先级Pod资源的节点，驱逐（发送DELETE信号）选中的低优先级Pod，释放资源后调度高优先级Pod。抢占过程：①高优先级Pod Pending → ②Scheduler寻找可抢占节点（节点上低优先级Pod的资源总和 + 剩余资源 >= 高优先级Pod requests）→ ③选择牺牲最小的节点（驱逐最少低优先级Pod）→ ④发送DELETE给被抢占的Pod（优雅终止preStop+gracePeriod）→ ⑤资源释放后高优先级Pod调度到该节点。触发条件：高优先级Pod Pending且集群资源不足（已调度Pod占满资源）。被驱逐的Pod如果有Deployment管理会被自动重建到其他节点。抢占风险：①服务中断——被驱逐的低优先级Pod在重建期间不可用，可能影响业务。②级联驱逐——高优先级Pod抢占导致低优先级Pod重建，如果重建后也触发抢占，可能形成驱逐风暴。③PodDisruptionBudget（PDB）保护——PDB可限制同一时间被驱逐的Pod数量（如minAvailable: 2保证至少2个副本可用），但PDB只保护自愿驱逐（kubectl drain/evict），不保护抢占驱逐（Scheduler的抢占不受PDB限制，但会尽量遵守PDB）。生产建议：①合理设置优先级——核心业务高优先级、批处理低优先级、系统组件最高优先级。②设置PDB保护关键服务。③低优先级Pod配置graceful termination（preStop+gracePeriod）减少中断。④监控Pending Pod和抢占事件（kube_pod_preemption metric）。`,
    tags: ["PriorityClass", "抢占", "Preemption", "PDB", "优先级调度"],
  },
];
