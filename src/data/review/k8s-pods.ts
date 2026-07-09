import type { ReviewQuestion } from "./types";

export const k8sPodsQuestions: ReviewQuestion[] = [
  {
    id: "k8s-pod-1",
    chapter: "k8s-pods",
    level: 1,
    question: "Pod内多容器是如何共享网络和存储的？pause容器的作用是什么？",
    answer: "网络共享：每个Pod底层有一个pause基础设施容器，它由K8s自动创建，持有网络命名空间（Network Namespace）和IPC命名空间。Pod内其他业务容器启动时加入pause的网络命名空间，因此所有容器共享同一个IP地址和端口空间，可通过localhost互相通信。例如nginx容器监听80端口，log容器通过localhost:80即可访问nginx。pause容器的作用是「持有」命名空间——即使业务容器崩溃重启，pause仍在运行，命名空间不丢失，新容器直接加入即可恢复网络。如果没有pause，业务容器崩溃后命名空间销毁，其他容器也会断网。存储共享：Pod级别定义volumes（如emptyDir），各容器通过volumeMounts挂载到各自路径，底层指向同一存储。同一Pod内容器可通过共享Volume交换文件，如nginx写日志到emptyDir的/var/log/nginx，sidecar从同一路径读取并转发到外部日志系统。emptyDir随Pod销毁，适合临时共享；PVC独立于Pod，适合持久化。",
    tags: ["Pod", "网络共享", "pause容器", "存储共享", "emptyDir"],
  },
  {
    id: "k8s-pod-2",
    chapter: "k8s-pods",
    level: 2,
    question: "livenessProbe和readinessProbe的区别是什么？生产环境为什么要同时配置？startupProbe解决什么问题？",
    answer: "livenessProbe（存活探针）：检测容器是否处于健康状态。失败时kubelet杀死容器并按restartPolicy重启（Always/OnFailure）。用于发现死锁、无限循环、线程耗尽等进程存活但无法正常工作的故障。readinessProbe（就绪探针）：检测容器是否准备好接收流量。失败时Pod从Service的Endpoints中移除（不重启容器），流量不再打到该Pod。用于保护启动慢（如需要加载缓存/预热连接池）或临时过载的实例。区别：liveness失败→重启容器（修复故障进程）；readiness失败→摘除流量（保护未就绪实例）。生产环境同时配置的原因：①只有liveness无readiness——Pod启动时还未就绪，但Service流量已经打到该Pod，导致请求失败；②只有readiness无liveness——进程死锁但端口还在，readiness可能通过（如TCP连接成功但HTTP超时），死锁进程永不重启；③两者配合——readiness保护启动和临时过载，liveness修复死锁和无限循环。startupProbe解决慢启动应用的问题：某些应用（如Java Spring Boot）启动需要几分钟，如果livenessProbe的initialDelaySeconds不够长，应用还没启动完成就被liveness判定为不健康而重启，形成无限重启循环。startupProbe在启动成功前禁用liveness/readiness，failureThreshold设为足够大的值（如30次×10秒=5分钟），启动成功后才启用liveness/readiness。",
    tags: ["livenessProbe", "readinessProbe", "startupProbe", "探针", "健康检查"],
  },
  {
    id: "k8s-pod-3",
    chapter: "k8s-pods",
    level: 2,
    question: "Pod的resources.requests和resources.limits有什么区别？它们对调度和运行时各有什么影响？",
    answer: "requests和limits的区别：requests是资源申请量（保证最小可用资源），limits是资源上限（限制最大使用量）。对调度的影响：requests是调度依据——Scheduler检查「节点Allocatable - 所有已调度Pod的requests总和 >= 新Pod的requests」，满足才通过Filter。limits不影响调度——Scheduler不检查limits，因此一个节点可能overcommit（所有Pod的limits之和超过节点容量）。对运行时的影响：CPU——requests通过cgroups cpu.shares保证最低CPU份额（权重），limits通过cgroups cpu.cfs_quota严格限制。CPU使用超过limits时容器被throttle（限流，不杀进程，性能下降），不超过则正常运行。内存——requests影响调度但不影响运行时（不保证一定能用到），limits通过cgroups memory.limit_in_bytes限制。内存使用超过limits时容器被OOMKilled（内核杀掉进程，Pod重启）。生产环境建议：requests基于P95流量和性能测试设置（保证调度和基础性能），limits设为requests的2倍左右（允许突发），内存limits等于requests（避免OOM导致不可预测的重启）。不设limits的Pod可能占用节点所有资源影响其他Pod，不设requests的Pod无法被HPA使用（HPA依赖requests计算CPU使用率）。",
    tags: ["requests", "limits", "资源调度", "CPU throttle", "OOMKilled"],
  },
  {
    id: "k8s-pod-4",
    chapter: "k8s-pods",
    level: 3,
    question: "多容器Pod有哪些设计模式？如何选择Sidecar、Adapter、Ambassador模式？请举例说明。",
    answer: "三种经典多容器Pod设计模式：①Sidecar（边车模式）——辅助容器增强主容器功能。主容器处理核心业务，Sidecar处理横切关注点（日志/监控/代理/配置同步）。例：nginx主容器 + Fluent Bit Sidecar（读取nginx日志文件转发到ELK）。主容器不需要修改代码即可获得日志采集能力。选择标准：辅助功能与主容器紧密耦合（共享存储/网络），生命周期一致。②Adapter（适配器模式）——Sidecar容器适配主容器的输出格式。例：Prometheus只能抓取特定格式的metrics，旧版应用输出JSON格式metrics → Adapter容器转换为Prometheus格式暴露在/metrics端口。主容器无需修改即可接入Prometheus监控。选择标准：主容器输出格式与外部系统不兼容，需要格式转换。③Ambassador（大使模式）——Sidecar容器代理外部服务访问。例：应用需要连接Redis集群（多个节点+故障转移），直接在应用代码中实现集群客户端逻辑复杂 → Ambassador容器（如Envoy/HAProxy）在localhost暴露单端口，应用连接localhost:6379，Ambassador负责路由到正确的Redis节点和处理故障转移。主容器无需感知集群拓扑。选择标准：外部服务访问逻辑复杂（集群/负载均衡/故障转移/TLS），希望对主容器透明。三种模式共同点：都是通过Pod内共享网络（localhost通信）和存储（Volume交换）实现容器协作，主容器不感知Sidecar存在（解耦）。",
    tags: ["多容器Pod", "Sidecar", "Adapter", "Ambassador", "设计模式"],
  },
];
