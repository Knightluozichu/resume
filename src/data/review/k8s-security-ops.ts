import type { ReviewQuestion } from "./types";

export const k8sSecurityOpsQuestions: ReviewQuestion[] = [
  {
    id: "k8s-ops-1",
    chapter: "k8s-security-ops",
    level: 1,
    question: "RBAC的四个核心对象是什么？如何为应用配置最小权限？",
    answer: "四个核心对象：①Role——命名空间级权限定义，在rules中指定apiGroups/resources/verbs，如允许在production命名空间get/list/watch pods。只在该命名空间生效。②ClusterRole——集群级权限定义，可跨命名空间使用（如get/list所有命名空间的pods），也可授予集群级资源（nodes/namespaces/persistentvolumes）权限。ClusterRole也可被RoleBinding引用（在特定命名空间生效）。③RoleBinding——命名空间级绑定，将Role（或ClusterRole）绑定给subjects（ServiceAccount/User/Group），在特定命名空间生效。④ClusterRoleBinding——集群级绑定，将ClusterRole绑定给subjects，所有命名空间生效。最小权限配置步骤：①为应用创建独立ServiceAccount（不用default，因为default可能被其他Pod共享）——kubectl create serviceaccount app-sa -n production。②创建Role定义最小必要权限——只授予应用实际需要的resources和verbs。如微服务只需读取ConfigMap：resources: [configmaps], verbs: [get, list, watch]。不授予create/update/delete（除非确实需要）、不授予secrets的list（list可列出所有Secret名称）。③创建RoleBinding将Role绑定给ServiceAccount——subjects指定kind: ServiceAccount, name: app-sa。④Pod spec.serviceAccountName指定该SA——spec.serviceAccountName: app-sa。⑤定期审计——kubectl auth can-i --list --as=system:serviceaccount:production:app-sa 检查该SA的实际权限列表。⑥禁止事项——不使用cluster-admin（集群管理员权限过大）、不授予secrets的list权限（可枚举Secret名）、不给default SA绑定权限（所有Pod默认用default）。最佳实践：每个微服务独立SA + 独立Role + 最小verbs + 定期审计。",
    tags: ["RBAC", "Role", "ClusterRole", "RoleBinding", "ServiceAccount", "最小权限"],
  },
  {
    id: "k8s-ops-2",
    chapter: "k8s-security-ops",
    level: 2,
    question: "如何实现Pod之间的网络隔离？NetworkPolicy的默认行为是什么？需要什么前提条件？",
    answer: "NetworkPolicy实现网络隔离：通过podSelector选择保护目标Pod，定义Ingress（入站）和Egress（出站）规则控制流量。NetworkPolicy是白名单模式——一旦为某Pod创建了NetworkPolicy且policyTypes包含Ingress，则该Pod的入站流量变为「默认拒绝」，只有规则明确允许的流量可入。Egress同理。隔离示例：保护postgres Pod只允许app=backend的Pod访问5432端口。①podSelector matchLabels app=postgres 选中保护目标。②policyTypes: [Ingress] 声明应用入站策略。③ingress规则：from: [{podSelector: {matchLabels: {app: backend}}}], ports: [{protocol: TCP, port: 5432}]。效果：postgres Pod只接收来自backend Pod的5432端口请求，其他所有流量被拒绝（包括其他命名空间的Pod、外部IP）。默认行为：K8s集群默认所有Pod之间可互访（无任何隔离）。如果没有为Pod创建任何NetworkPolicy，则该Pod的入站和出站全部放行。一旦创建了NetworkPolicy选中该Pod，则未匹配的流量被拒绝。前提条件：CNI插件必须支持NetworkPolicy——Calico（支持，BGP模式+iptables/eBPF实现）、Cilium（支持，eBPF实现，高性能）、Weave Net（支持）。Flannel默认不支持NetworkPolicy（需配合Calico for policy或切换CNI）。生产环境网络隔离建议：①数据库Pod——只允许应用Pod访问特定端口，拒绝其他所有流量。②前端Pod——只允许Ingress Controller Pod访问（from: {namespaceSelector: {matchLabels: {kubernetes.io/metadata.name: ingress-nginx}}}）。③Egress控制——限制Pod出站目标，只允许访问DNS（kube-dns:53）、数据库、必要外部API，防止被入侵后横向移动。④命名空间隔离——用namespaceSelector隔离不同环境的流量（dev不能访问prod）。",
    tags: ["NetworkPolicy", "网络隔离", "CNI", "零信任", "Calico", "Cilium"],
  },
  {
    id: "k8s-ops-3",
    chapter: "k8s-security-ops",
    level: 2,
    question: "K8s可观测性三大支柱是什么？各自使用什么工具？如何构建完整的监控告警体系？",
    answer: "可观测性三大支柱：①Metrics（指标）——量化数据，回答「发生了什么」。工具：Prometheus（指标采集与存储，时序数据库）+ Grafana（可视化看板）。采集方式：Prometheus通过ServiceMonitor/PodMonitor pull模式拉取Pod暴露的/metrics端点。核心指标：容器级——container_cpu_usage（CPU使用率）、container_memory_usage（内存）、kube_pod_status_phase（Pod状态）。节点级——node_cpu_seconds（CPU）、node_memory_MemAvailable（可用内存）、node_filesystem_avail（磁盘）。工作负载级——kube_deployment_status_replicas_available（可用副本数）。②Logs（日志）——文本记录，回答「为什么发生」。工具：Fluent Bit/Fluentd（采集）+ Elasticsearch/Loki（存储检索）+ Kibana/Grafana（可视化）。采集方式：容器stdout/stderr输出到节点日志文件（/var/log/containers/），Fluent Bit以DaemonSet运行读取日志文件，发送到Elasticsearch/Loki。K8s日志：Pod日志通过kubectl logs查看（实际从kubelet读取节点日志文件）。③Traces（追踪）——请求链路，回答「哪里慢/哪里出错」。工具：Jaeger / OpenTelemetry / Zipkin。通过SDK或自动注入（Instrumentation）在请求中传递traceID，记录每个微服务的处理时间，构建调用链路图。构建完整监控告警体系：①部署metrics-server（提供HPA所需的CPU/内存指标）+ Prometheus（采集全量指标）+ kube-state-metrics（暴露K8s对象状态指标如Pod/Deployment状态）+ node-exporter（节点硬件指标）。②配置Prometheus告警规则——Pod Failed（kube_pod_status_phase!=Running && !=Succeeded）、CPU > 80%（container_cpu_usage > 0.8）、内存 > 90%、节点NotReady（kube_node_status_condition!=Ready）、副本不足（kube_deployment_status_replicas_available < kube_deployment_spec_replicas）。③AlertManager告警路由——按严重级别（critical/warning/info）发送到不同渠道（PagerDuty/Slack/邮件）。④Grafana看板——集群总览（节点/Pod/资源使用）、应用性能（QPS/延迟/错误率）、K8s资源（Deployment/Pod状态）。⑤日志聚合——Fluent Bit采集 → Loki/Elasticsearch存储 → Kibana/Grafana查询。⑥分布式追踪——OpenTelemetry SDK注入 + Jaeger存储查询。",
    tags: ["可观测性", "Prometheus", "Grafana", "ELK", "Jaeger", "监控告警"],
  },
  {
    id: "k8s-ops-4",
    chapter: "k8s-security-ops",
    level: 3,
    question: "如何实现Pod的优雅终止？preStop钩子、gracePeriod和readinessProbe如何配合实现零停机终止？",
    answer: "优雅终止流程：①Pod被删除（kubectl delete / Deployment缩容 / 滚动更新替换旧Pod）→ API Server将Pod标记为Terminating → Pod从Endpoints移除（Endpoints Controller Watch到Pod Terminating状态，立即从Service Endpoints列表移除，新流量不再路由到该Pod）。②kubelet收到删除通知 → 执行preStop钩子（如果配置了）。preStop是同步的——kubelet等待preStop执行完成才发送SIGTERM。preStop用途：给应用时间处理完已有请求（如nginx -s quit优雅退出）、反注册（从服务注册中心注销）。③preStop完成后 → kubelet发送SIGTERM信号给容器主进程 → 应用应捕获SIGTERM开始优雅退出（关闭数据库连接、保存状态、拒绝新请求但处理完已有请求）。④等待terminationGracePeriodSeconds（默认30秒）——如果应用在30秒内退出则正常；如果超时未退出，kubelet发送SIGKILL强制终止。⑤容器退出 → Pod完全删除。零停机终止的关键配合：①readinessProbe——Pod Terminating后立即从Endpoints移除，但可能有已有请求在处理中。readinessProbe确保Pod就绪才接流量，Terminating时摘流。②preStop + sleep——关键技巧：preStop执行sleep 10-15秒。原因：Endpoints移除和kube-proxy更新iptables规则有延迟（Watch机制传播延迟），如果在SIGTERM时立即停止处理请求，可能还有流量因iptables规则未更新而打到该Pod。preStop sleep给kube-proxy足够时间更新规则，确保没有新流量到达。③gracePeriod——设置足够长（如30-60秒），让应用有足够时间处理完已有请求。如果应用正常退出需要20秒，gracePeriod应大于20秒。配置示例：terminationGracePeriodSeconds: 30, preStop: exec: command: ["sh", "-c", "nginx -s quit; sleep 10"]。常见问题：①应用不捕获SIGTERM——默认行为是立即退出，已有请求被中断。解决：应用代码注册SIGTERM handler优雅退出。②gracePeriod太短——应用还没处理完请求就被SIGKILL。解决：根据应用实际退出时间设置gracePeriod。③preStop未sleep——Endpoints移除有延迟，部分请求仍打到Terminating Pod。解决：preStop加sleep 10-15秒。",
    tags: ["优雅终止", "preStop", "gracePeriod", "readinessProbe", "零停机"],
  },
];
