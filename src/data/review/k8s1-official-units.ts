import type { ReviewQuestion } from "../review-questions";

export const k8s1OfficialQuestions: ReviewQuestion[] = [
  {
    id: "k8s-official-learning-map-q1",
    chapter: "k8s-official-learning-map",
    level: 1,
    question: "为什么“第1版权威学习地图”必须覆盖22个目录节点？",
    answer:
      "这些节点共同组成“沿概览、核心概念、超越基础和生产实践四部分建立18章4附录的依赖图与Kubernetes 1.8边界”的对象、控制循环、运行与证据链；漏项会使完整目录映射、四部分依赖图、Kubernetes 1.8版本边界、实验索引和全书验收清单无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "四部分结构",
    ],
  },
  {
    id: "k8s-official-learning-map-q2",
    chapter: "k8s-official-learning-map",
    level: 1,
    question: "“第1版权威学习地图”的最小不变量是什么？",
    answer:
      "22个正式单元与404个唯一目录节点全部可达，API对象、控制循环、故障实验和证据均能回指权威目录；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "Kubernetes 1.8",
    ],
  },
  {
    id: "k8s-official-learning-map-q3",
    chapter: "k8s-official-learning-map",
    level: 2,
    question: "怎样为“第1版权威学习地图”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "目录分母",
    ],
  },
  {
    id: "k8s-official-learning-map-q4",
    chapter: "k8s-official-learning-map",
    level: 2,
    question: "“第1版权威学习地图”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“沿概览、核心概念、超越基础和生产实践四部分建立18章4附录的依赖图与Kubernetes 1.8边界”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "控制循环",
    ],
  },
  {
    id: "k8s-official-learning-map-q5",
    chapter: "k8s-official-learning-map",
    level: 3,
    question: "如何验证“第1版权威学习地图”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "版本边界",
    ],
  },
  {
    id: "k8s-official-learning-map-q6",
    chapter: "k8s-official-learning-map",
    level: 3,
    question: "“第1版权威学习地图”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、完整目录映射、四部分依赖图、Kubernetes 1.8版本边界、实验索引和全书验收清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版权威学习地图",
      "四部分结构",
    ],
  },
  {
    id: "k8s-01-introduction-q1",
    chapter: "k8s-01-introduction",
    level: 1,
    question: "为什么“第1章 Kubernetes 介绍”必须覆盖15个目录节点？",
    answer:
      "这些节点共同组成“从单体到微服务、容器隔离和集群架构解释为什么需要Kubernetes”的对象、控制循环、运行与证据链；漏项会使需求比较、容器边界、集群组件图、首个应用轨迹和收益验收无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "容器",
    ],
  },
  {
    id: "k8s-01-introduction-q2",
    chapter: "k8s-01-introduction",
    level: 1,
    question: "“第1章 Kubernetes 介绍”的最小不变量是什么？",
    answer:
      "应用声明进入API服务器后由控制面收敛，在节点或容器失败时恢复到期望状态；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "控制面",
    ],
  },
  {
    id: "k8s-01-introduction-q3",
    chapter: "k8s-01-introduction",
    level: 2,
    question: "怎样为“第1章 Kubernetes 介绍”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "工作节点",
    ],
  },
  {
    id: "k8s-01-introduction-q4",
    chapter: "k8s-01-introduction",
    level: 2,
    question: "“第1章 Kubernetes 介绍”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“从单体到微服务、容器隔离和集群架构解释为什么需要Kubernetes”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "期望状态",
    ],
  },
  {
    id: "k8s-01-introduction-q5",
    chapter: "k8s-01-introduction",
    level: 3,
    question: "如何验证“第1章 Kubernetes 介绍”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "自愈",
    ],
  },
  {
    id: "k8s-01-introduction-q6",
    chapter: "k8s-01-introduction",
    level: 3,
    question: "“第1章 Kubernetes 介绍”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、需求比较、容器边界、集群组件图、首个应用轨迹和收益验收、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1章 Kubernetes 介绍",
      "容器",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q1",
    chapter: "k8s-02-docker-first-app",
    level: 1,
    question:
      "为什么“第2章 开始使用 Kubernetes 和 Docker”必须覆盖21个目录节点？",
    answer:
      "这些节点共同组成“构建并共享容器镜像，配置Minikube或GKE并部署、访问和伸缩首个应用”的对象、控制循环、运行与证据链；漏项会使镜像构建记录、集群上下文、首个部署、Service访问、伸缩和Dashboard观察无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "Dockerfile",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q2",
    chapter: "k8s-02-docker-first-app",
    level: 1,
    question: "“第2章 开始使用 Kubernetes 和 Docker”的最小不变量是什么？",
    answer:
      "镜像摘要、集群上下文、Deployment或RC、Service与实际Pod一一可追踪，伸缩后请求仍可达；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "镜像仓库",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q3",
    chapter: "k8s-02-docker-first-app",
    level: 2,
    question: "怎样为“第2章 开始使用 Kubernetes 和 Docker”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "Minikube",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q4",
    chapter: "k8s-02-docker-first-app",
    level: 2,
    question:
      "“第2章 开始使用 Kubernetes 和 Docker”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“构建并共享容器镜像，配置Minikube或GKE并部署、访问和伸缩首个应用”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "kubectl上下文",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q5",
    chapter: "k8s-02-docker-first-app",
    level: 3,
    question: "如何验证“第2章 开始使用 Kubernetes 和 Docker”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "水平伸缩",
    ],
  },
  {
    id: "k8s-02-docker-first-app-q6",
    chapter: "k8s-02-docker-first-app",
    level: 3,
    question: "“第2章 开始使用 Kubernetes 和 Docker”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、镜像构建记录、集群上下文、首个部署、Service访问、伸缩和Dashboard观察、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第2章 开始使用 Kubernetes 和 Docker",
      "Dockerfile",
    ],
  },
  {
    id: "k8s-03-pods-q1",
    chapter: "k8s-03-pods",
    level: 1,
    question:
      "为什么“第3章 pod ：运行于 Kubernetes 中的容器”必须覆盖37个目录节点？",
    answer:
      "这些节点共同组成“掌握Pod共享边界、YAML描述、日志端口转发、标签选择器、命名空间和删除语义”的对象、控制循环、运行与证据链；漏项会使Pod边界图、YAML清单、日志与请求轨迹、标签选择实验、命名空间和删除演练无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "Pod",
    ],
  },
  {
    id: "k8s-03-pods-q2",
    chapter: "k8s-03-pods",
    level: 1,
    question: "“第3章 pod ：运行于 Kubernetes 中的容器”的最小不变量是什么？",
    answer:
      "同一Pod容器共享网络与卷但保持进程隔离，标签和命名空间选择只影响预期对象；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "标签",
    ],
  },
  {
    id: "k8s-03-pods-q3",
    chapter: "k8s-03-pods",
    level: 2,
    question: "怎样为“第3章 pod ：运行于 Kubernetes 中的容器”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "标签选择器",
    ],
  },
  {
    id: "k8s-03-pods-q4",
    chapter: "k8s-03-pods",
    level: 2,
    question:
      "“第3章 pod ：运行于 Kubernetes 中的容器”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“掌握Pod共享边界、YAML描述、日志端口转发、标签选择器、命名空间和删除语义”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "注解",
    ],
  },
  {
    id: "k8s-03-pods-q5",
    chapter: "k8s-03-pods",
    level: 3,
    question:
      "如何验证“第3章 pod ：运行于 Kubernetes 中的容器”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "命名空间",
    ],
  },
  {
    id: "k8s-03-pods-q6",
    chapter: "k8s-03-pods",
    level: 3,
    question:
      "“第3章 pod ：运行于 Kubernetes 中的容器”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、Pod边界图、YAML清单、日志与请求轨迹、标签选择实验、命名空间和删除演练、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第3章 pod ：运行于 Kubernetes 中的容器",
      "Pod",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q1",
    chapter: "k8s-04-replication-controllers",
    level: 1,
    question:
      "为什么“第4章 副本机制和其他控制器 ：部署托管的 pod”必须覆盖33个目录节点？",
    answer:
      "这些节点共同组成“用存活探针、ReplicationController、ReplicaSet、DaemonSet、Job和CronJob管理Pod”的对象、控制循环、运行与证据链；漏项会使探针实验、RC与RS对照、DaemonSet节点覆盖、Job完成证据和CronJob调度记录无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "存活探针",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q2",
    chapter: "k8s-04-replication-controllers",
    level: 1,
    question:
      "“第4章 副本机制和其他控制器 ：部署托管的 pod”的最小不变量是什么？",
    answer:
      "控制器选择器、模板和期望副本明确，删除、漂移、探针失败和任务完成后状态按控制循环收敛；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "ReplicationController",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q3",
    chapter: "k8s-04-replication-controllers",
    level: 2,
    question:
      "怎样为“第4章 副本机制和其他控制器 ：部署托管的 pod”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "ReplicaSet",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q4",
    chapter: "k8s-04-replication-controllers",
    level: 2,
    question:
      "“第4章 副本机制和其他控制器 ：部署托管的 pod”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用存活探针、ReplicationController、ReplicaSet、DaemonSet、Job和CronJob管理Pod”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "DaemonSet",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q5",
    chapter: "k8s-04-replication-controllers",
    level: 3,
    question:
      "如何验证“第4章 副本机制和其他控制器 ：部署托管的 pod”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "Job",
    ],
  },
  {
    id: "k8s-04-replication-controllers-q6",
    chapter: "k8s-04-replication-controllers",
    level: 3,
    question:
      "“第4章 副本机制和其他控制器 ：部署托管的 pod”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、探针实验、RC与RS对照、DaemonSet节点覆盖、Job完成证据和CronJob调度记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第4章 副本机制和其他控制器 ：部署托管的 pod",
      "存活探针",
    ],
  },
  {
    id: "k8s-05-services-q1",
    chapter: "k8s-05-services",
    level: 1,
    question:
      "为什么“第5章 服务 ：让客户端发现 pod 并与之通信”必须覆盖25个目录节点？",
    answer:
      "这些节点共同组成“沿Service、Endpoint、DNS、NodePort、LoadBalancer、Ingress和readiness连接客户端与Pod”的对象、控制循环、运行与证据链；漏项会使Service到Endpoint拓扑、DNS解析、会话亲和、外部流量、Ingress和就绪探针实验无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "Service",
    ],
  },
  {
    id: "k8s-05-services-q2",
    chapter: "k8s-05-services",
    level: 1,
    question: "“第5章 服务 ：让客户端发现 pod 并与之通信”的最小不变量是什么？",
    answer:
      "Pod地址变化时Service虚拟地址保持稳定，只有就绪Endpoint接收流量，外部暴露路径可逐跳验证；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "Endpoint",
    ],
  },
  {
    id: "k8s-05-services-q3",
    chapter: "k8s-05-services",
    level: 2,
    question:
      "怎样为“第5章 服务 ：让客户端发现 pod 并与之通信”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "ClusterIP",
    ],
  },
  {
    id: "k8s-05-services-q4",
    chapter: "k8s-05-services",
    level: 2,
    question:
      "“第5章 服务 ：让客户端发现 pod 并与之通信”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“沿Service、Endpoint、DNS、NodePort、LoadBalancer、Ingress和readiness连接客户端与Pod”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "Ingress",
    ],
  },
  {
    id: "k8s-05-services-q5",
    chapter: "k8s-05-services",
    level: 3,
    question:
      "如何验证“第5章 服务 ：让客户端发现 pod 并与之通信”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "就绪探针",
    ],
  },
  {
    id: "k8s-05-services-q6",
    chapter: "k8s-05-services",
    level: 3,
    question:
      "“第5章 服务 ：让客户端发现 pod 并与之通信”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、Service到Endpoint拓扑、DNS解析、会话亲和、外部流量、Ingress和就绪探针实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第5章 服务 ：让客户端发现 pod 并与之通信",
      "Service",
    ],
  },
  {
    id: "k8s-06-volumes-q1",
    chapter: "k8s-06-volumes",
    level: 1,
    question: "为什么“第6章 卷 ：将磁盘挂载到容器”必须覆盖24个目录节点？",
    answer:
      "这些节点共同组成“比较emptyDir、gitRepo、hostPath、网络卷、PV、PVC和StorageClass的生命周期与供应边界”的对象、控制循环、运行与证据链；漏项会使卷生命周期矩阵、共享卷实验、PV/PVC绑定轨迹、动态供应和回收验证无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "Volume",
    ],
  },
  {
    id: "k8s-06-volumes-q2",
    chapter: "k8s-06-volumes",
    level: 1,
    question: "“第6章 卷 ：将磁盘挂载到容器”的最小不变量是什么？",
    answer:
      "Pod、容器、节点和存储后端生命周期分别标注，PVC重建与Pod重调度后数据存续符合声明；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "PersistentVolume",
    ],
  },
  {
    id: "k8s-06-volumes-q3",
    chapter: "k8s-06-volumes",
    level: 2,
    question: "怎样为“第6章 卷 ：将磁盘挂载到容器”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "PersistentVolumeClaim",
    ],
  },
  {
    id: "k8s-06-volumes-q4",
    chapter: "k8s-06-volumes",
    level: 2,
    question: "“第6章 卷 ：将磁盘挂载到容器”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“比较emptyDir、gitRepo、hostPath、网络卷、PV、PVC和StorageClass的生命周期与供应边界”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "StorageClass",
    ],
  },
  {
    id: "k8s-06-volumes-q5",
    chapter: "k8s-06-volumes",
    level: 3,
    question: "如何验证“第6章 卷 ：将磁盘挂载到容器”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "访问模式",
    ],
  },
  {
    id: "k8s-06-volumes-q6",
    chapter: "k8s-06-volumes",
    level: 3,
    question: "“第6章 卷 ：将磁盘挂载到容器”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、卷生命周期矩阵、共享卷实验、PV/PVC绑定轨迹、动态供应和回收验证、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第6章 卷 ：将磁盘挂载到容器",
      "Volume",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q1",
    chapter: "k8s-07-configmaps-secrets",
    level: 1,
    question:
      "为什么“第7章 ConfigMap 和 Secret ：配置应用程序”必须覆盖23个目录节点？",
    answer:
      "这些节点共同组成“用参数、环境变量、ConfigMap和Secret解耦镜像与配置并验证更新和敏感数据边界”的对象、控制循环、运行与证据链；漏项会使配置来源矩阵、ConfigMap注入、卷更新轨迹、Secret创建挂载和泄漏负向测试无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "ConfigMap",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q2",
    chapter: "k8s-07-configmaps-secrets",
    level: 1,
    question: "“第7章 ConfigMap 和 Secret ：配置应用程序”的最小不变量是什么？",
    answer:
      "同一镜像按声明获得正确配置，Secret不出现在不必要的日志与清单中，更新传播行为可测；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "Secret",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q3",
    chapter: "k8s-07-configmaps-secrets",
    level: 2,
    question:
      "怎样为“第7章 ConfigMap 和 Secret ：配置应用程序”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "环境变量",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q4",
    chapter: "k8s-07-configmaps-secrets",
    level: 2,
    question:
      "“第7章 ConfigMap 和 Secret ：配置应用程序”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用参数、环境变量、ConfigMap和Secret解耦镜像与配置并验证更新和敏感数据边界”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "投射卷",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q5",
    chapter: "k8s-07-configmaps-secrets",
    level: 3,
    question:
      "如何验证“第7章 ConfigMap 和 Secret ：配置应用程序”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "配置更新",
    ],
  },
  {
    id: "k8s-07-configmaps-secrets-q6",
    chapter: "k8s-07-configmaps-secrets",
    level: 3,
    question:
      "“第7章 ConfigMap 和 Secret ：配置应用程序”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、配置来源矩阵、ConfigMap注入、卷更新轨迹、Secret创建挂载和泄漏负向测试、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第7章 ConfigMap 和 Secret ：配置应用程序",
      "ConfigMap",
    ],
  },
  {
    id: "k8s-08-downward-api-q1",
    chapter: "k8s-08-downward-api",
    level: 1,
    question:
      "为什么“第8章 从应用访问 pod 元数据以及其他资源”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“通过Downward API读取Pod元数据，并从Pod内安全访问Kubernetes API”的对象、控制循环、运行与证据链；漏项会使Downward API变量与卷、REST发现、Pod内TLS访问、ambassador和客户端库对照无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "Downward API",
    ],
  },
  {
    id: "k8s-08-downward-api-q2",
    chapter: "k8s-08-downward-api",
    level: 1,
    question: "“第8章 从应用访问 pod 元数据以及其他资源”的最小不变量是什么？",
    answer:
      "应用只获得所需元数据和API权限，ServiceAccount令牌、CA与命名空间路径正确且请求可审计；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "ServiceAccount",
    ],
  },
  {
    id: "k8s-08-downward-api-q3",
    chapter: "k8s-08-downward-api",
    level: 2,
    question: "怎样为“第8章 从应用访问 pod 元数据以及其他资源”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "API服务器",
    ],
  },
  {
    id: "k8s-08-downward-api-q4",
    chapter: "k8s-08-downward-api",
    level: 2,
    question:
      "“第8章 从应用访问 pod 元数据以及其他资源”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“通过Downward API读取Pod元数据，并从Pod内安全访问Kubernetes API”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "ambassador",
    ],
  },
  {
    id: "k8s-08-downward-api-q5",
    chapter: "k8s-08-downward-api",
    level: 3,
    question:
      "如何验证“第8章 从应用访问 pod 元数据以及其他资源”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "客户端库",
    ],
  },
  {
    id: "k8s-08-downward-api-q6",
    chapter: "k8s-08-downward-api",
    level: 3,
    question:
      "“第8章 从应用访问 pod 元数据以及其他资源”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、Downward API变量与卷、REST发现、Pod内TLS访问、ambassador和客户端库对照、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第8章 从应用访问 pod 元数据以及其他资源",
      "Downward API",
    ],
  },
  {
    id: "k8s-09-deployments-q1",
    chapter: "k8s-09-deployments",
    level: 1,
    question:
      "为什么“第9章 Deployment: 声明式地升级应用”必须覆盖14个目录节点？",
    answer:
      "这些节点共同组成“从手工替换和RC滚动更新过渡到Deployment声明式发布、回滚、速率与暂停”的对象、控制循环、运行与证据链；漏项会使发布状态机、RC旧流程、Deployment滚动轨迹、回滚、暂停和失败阻断实验无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "Deployment",
    ],
  },
  {
    id: "k8s-09-deployments-q2",
    chapter: "k8s-09-deployments",
    level: 1,
    question: "“第9章 Deployment: 声明式地升级应用”的最小不变量是什么？",
    answer:
      "新旧ReplicaSet比例受maxSurge和maxUnavailable约束，失败版本停止并能回滚到可验证修订；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "ReplicaSet",
    ],
  },
  {
    id: "k8s-09-deployments-q3",
    chapter: "k8s-09-deployments",
    level: 2,
    question: "怎样为“第9章 Deployment: 声明式地升级应用”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "滚动升级",
    ],
  },
  {
    id: "k8s-09-deployments-q4",
    chapter: "k8s-09-deployments",
    level: 2,
    question:
      "“第9章 Deployment: 声明式地升级应用”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“从手工替换和RC滚动更新过渡到Deployment声明式发布、回滚、速率与暂停”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "回滚",
    ],
  },
  {
    id: "k8s-09-deployments-q5",
    chapter: "k8s-09-deployments",
    level: 3,
    question: "如何验证“第9章 Deployment: 声明式地升级应用”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "发布速率",
    ],
  },
  {
    id: "k8s-09-deployments-q6",
    chapter: "k8s-09-deployments",
    level: 3,
    question: "“第9章 Deployment: 声明式地升级应用”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、发布状态机、RC旧流程、Deployment滚动轨迹、回滚、暂停和失败阻断实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第9章 Deployment: 声明式地升级应用",
      "Deployment",
    ],
  },
  {
    id: "k8s-10-statefulsets-q1",
    chapter: "k8s-10-statefulsets",
    level: 1,
    question:
      "为什么“第10章 StatefulSet ：部署有状态的多副本应用”必须覆盖20个目录节点？",
    answer:
      "这些节点共同组成“用StatefulSet提供稳定序号、DNS、专属存储、顺序保证和节点故障处理”的对象、控制循环、运行与证据链；漏项会使StatefulSet与RS对照、Headless Service、PVC映射、伙伴发现和网络分区演练无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "StatefulSet",
    ],
  },
  {
    id: "k8s-10-statefulsets-q2",
    chapter: "k8s-10-statefulsets",
    level: 1,
    question:
      "“第10章 StatefulSet ：部署有状态的多副本应用”的最小不变量是什么？",
    answer:
      "每个实例的身份、网络名与PVC跨重建保持稳定，同一成员不会在分区两侧并发运行；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "Headless Service",
    ],
  },
  {
    id: "k8s-10-statefulsets-q3",
    chapter: "k8s-10-statefulsets",
    level: 2,
    question:
      "怎样为“第10章 StatefulSet ：部署有状态的多副本应用”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "稳定身份",
    ],
  },
  {
    id: "k8s-10-statefulsets-q4",
    chapter: "k8s-10-statefulsets",
    level: 2,
    question:
      "“第10章 StatefulSet ：部署有状态的多副本应用”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用StatefulSet提供稳定序号、DNS、专属存储、顺序保证和节点故障处理”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "volumeClaimTemplate",
    ],
  },
  {
    id: "k8s-10-statefulsets-q5",
    chapter: "k8s-10-statefulsets",
    level: 3,
    question:
      "如何验证“第10章 StatefulSet ：部署有状态的多副本应用”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "网络分区",
    ],
  },
  {
    id: "k8s-10-statefulsets-q6",
    chapter: "k8s-10-statefulsets",
    level: 3,
    question:
      "“第10章 StatefulSet ：部署有状态的多副本应用”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、StatefulSet与RS对照、Headless Service、PVC映射、伙伴发现和网络分区演练、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第10章 StatefulSet ：部署有状态的多副本应用",
      "StatefulSet",
    ],
  },
  {
    id: "k8s-11-internals-q1",
    chapter: "k8s-11-internals",
    level: 1,
    question: "为什么“第11章 了解 Kubernetes 机理”必须覆盖27个目录节点？",
    answer:
      "这些节点共同组成“追踪API服务器、etcd、调度器、控制器、kubelet、kube-proxy、插件和高可用协作”的对象、控制循环、运行与证据链；漏项会使控制面拓扑、etcd对象、watch事件链、调度与kubelet轨迹、iptables和高可用实验无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "etcd",
    ],
  },
  {
    id: "k8s-11-internals-q2",
    chapter: "k8s-11-internals",
    level: 1,
    question: "“第11章 了解 Kubernetes 机理”的最小不变量是什么？",
    answer:
      "一次声明从持久化、watch、控制循环、调度到节点执行的事件链完整，组件失败边界可定位；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "watch",
    ],
  },
  {
    id: "k8s-11-internals-q3",
    chapter: "k8s-11-internals",
    level: 2,
    question: "怎样为“第11章 了解 Kubernetes 机理”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "调度器",
    ],
  },
  {
    id: "k8s-11-internals-q4",
    chapter: "k8s-11-internals",
    level: 2,
    question: "“第11章 了解 Kubernetes 机理”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“追踪API服务器、etcd、调度器、控制器、kubelet、kube-proxy、插件和高可用协作”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "控制器管理器",
    ],
  },
  {
    id: "k8s-11-internals-q5",
    chapter: "k8s-11-internals",
    level: 3,
    question: "如何验证“第11章 了解 Kubernetes 机理”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "kubelet",
    ],
  },
  {
    id: "k8s-11-internals-q6",
    chapter: "k8s-11-internals",
    level: 3,
    question: "“第11章 了解 Kubernetes 机理”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、控制面拓扑、etcd对象、watch事件链、调度与kubelet轨迹、iptables和高可用实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第11章 了解 Kubernetes 机理",
      "etcd",
    ],
  },
  {
    id: "k8s-12-api-security-q1",
    chapter: "k8s-12-api-security",
    level: 1,
    question:
      "为什么“第12章 Kubernetes API 服务器的安全防护”必须覆盖13个目录节点？",
    answer:
      "这些节点共同组成“沿认证、ServiceAccount、RBAC和SecurityContext建立API服务器最小权限”的对象、控制循环、运行与证据链；漏项会使认证链、ServiceAccount令牌、RBAC允许拒绝矩阵、SecurityContext与默认账户收敛无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "认证",
    ],
  },
  {
    id: "k8s-12-api-security-q2",
    chapter: "k8s-12-api-security",
    level: 1,
    question: "“第12章 Kubernetes API 服务器的安全防护”的最小不变量是什么？",
    answer:
      "主体身份、角色规则、绑定范围和拒绝结果可审计，Pod内进程权限符合安全上下文；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "ServiceAccount",
    ],
  },
  {
    id: "k8s-12-api-security-q3",
    chapter: "k8s-12-api-security",
    level: 2,
    question: "怎样为“第12章 Kubernetes API 服务器的安全防护”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "RBAC",
    ],
  },
  {
    id: "k8s-12-api-security-q4",
    chapter: "k8s-12-api-security",
    level: 2,
    question:
      "“第12章 Kubernetes API 服务器的安全防护”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“沿认证、ServiceAccount、RBAC和SecurityContext建立API服务器最小权限”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "RoleBinding",
    ],
  },
  {
    id: "k8s-12-api-security-q5",
    chapter: "k8s-12-api-security",
    level: 3,
    question:
      "如何验证“第12章 Kubernetes API 服务器的安全防护”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "SecurityContext",
    ],
  },
  {
    id: "k8s-12-api-security-q6",
    chapter: "k8s-12-api-security",
    level: 3,
    question:
      "“第12章 Kubernetes API 服务器的安全防护”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、认证链、ServiceAccount令牌、RBAC允许拒绝矩阵、SecurityContext与默认账户收敛、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第12章 Kubernetes API 服务器的安全防护",
      "认证",
    ],
  },
  {
    id: "k8s-13-node-network-security-q1",
    chapter: "k8s-13-node-network-security",
    level: 1,
    question: "为什么“第13章 保障集群内节点和网络安全”必须覆盖25个目录节点？",
    answer:
      "这些节点共同组成“控制宿主命名空间、节点身份、网络隔离和Pod间出入流量”的对象、控制循环、运行与证据链；漏项会使宿主命名空间风险、节点权限、NetworkPolicy矩阵、CIDR与出站隔离实验无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "hostNetwork",
    ],
  },
  {
    id: "k8s-13-node-network-security-q2",
    chapter: "k8s-13-node-network-security",
    level: 1,
    question: "“第13章 保障集群内节点和网络安全”的最小不变量是什么？",
    answer:
      "特权与宿主资源只向必要工作负载开放，NetworkPolicy允许和拒绝路径与命名空间边界一致；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "节点授权",
    ],
  },
  {
    id: "k8s-13-node-network-security-q3",
    chapter: "k8s-13-node-network-security",
    level: 2,
    question: "怎样为“第13章 保障集群内节点和网络安全”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "NetworkPolicy",
    ],
  },
  {
    id: "k8s-13-node-network-security-q4",
    chapter: "k8s-13-node-network-security",
    level: 2,
    question: "“第13章 保障集群内节点和网络安全”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“控制宿主命名空间、节点身份、网络隔离和Pod间出入流量”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "CIDR",
    ],
  },
  {
    id: "k8s-13-node-network-security-q5",
    chapter: "k8s-13-node-network-security",
    level: 3,
    question: "如何验证“第13章 保障集群内节点和网络安全”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "出站策略",
    ],
  },
  {
    id: "k8s-13-node-network-security-q6",
    chapter: "k8s-13-node-network-security",
    level: 3,
    question: "“第13章 保障集群内节点和网络安全”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、宿主命名空间风险、节点权限、NetworkPolicy矩阵、CIDR与出站隔离实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第13章 保障集群内节点和网络安全",
      "hostNetwork",
    ],
  },
  {
    id: "k8s-14-resources-q1",
    chapter: "k8s-14-resources",
    level: 1,
    question: "为什么“第14章 计算资源管理”必须覆盖26个目录节点？",
    answer:
      "这些节点共同组成“用requests、limits、QoS、LimitRange、ResourceQuota和监控管理计算资源”的对象、控制循环、运行与证据链；漏项会使资源模型、调度实验、limits反例、QoS驱逐、LimitRange、Quota与历史监控无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "requests",
    ],
  },
  {
    id: "k8s-14-resources-q2",
    chapter: "k8s-14-resources",
    level: 1,
    question: "“第14章 计算资源管理”的最小不变量是什么？",
    answer:
      "调度按requests决策，运行时按limits约束，OOM和CPU节流可解释，命名空间配额不能被绕过；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "limits",
    ],
  },
  {
    id: "k8s-14-resources-q3",
    chapter: "k8s-14-resources",
    level: 2,
    question: "怎样为“第14章 计算资源管理”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "QoS",
    ],
  },
  {
    id: "k8s-14-resources-q4",
    chapter: "k8s-14-resources",
    level: 2,
    question: "“第14章 计算资源管理”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用requests、limits、QoS、LimitRange、ResourceQuota和监控管理计算资源”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "LimitRange",
    ],
  },
  {
    id: "k8s-14-resources-q5",
    chapter: "k8s-14-resources",
    level: 3,
    question: "如何验证“第14章 计算资源管理”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "ResourceQuota",
    ],
  },
  {
    id: "k8s-14-resources-q6",
    chapter: "k8s-14-resources",
    level: 3,
    question: "“第14章 计算资源管理”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、资源模型、调度实验、limits反例、QoS驱逐、LimitRange、Quota与历史监控、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第14章 计算资源管理",
      "requests",
    ],
  },
  {
    id: "k8s-15-autoscaling-q1",
    chapter: "k8s-15-autoscaling",
    level: 1,
    question:
      "为什么“第15章 自动横向伸缩 pod 与集群节点”必须覆盖15个目录节点？",
    answer:
      "这些节点共同组成“理解HPA、VPA早期机制、Cluster Autoscaler、指标选择和缩容干扰”的对象、控制循环、运行与证据链；漏项会使HPA计算轨迹、CPU与自定义指标、VPA边界、节点伸缩和PodDisruptionBudget实验无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "HPA",
    ],
  },
  {
    id: "k8s-15-autoscaling-q2",
    chapter: "k8s-15-autoscaling",
    level: 1,
    question: "“第15章 自动横向伸缩 pod 与集群节点”的最小不变量是什么？",
    answer:
      "扩缩容基于可解释指标与稳定窗口，Pod和节点缩容不破坏最小可用容量与有状态约束；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "VPA",
    ],
  },
  {
    id: "k8s-15-autoscaling-q3",
    chapter: "k8s-15-autoscaling",
    level: 2,
    question: "怎样为“第15章 自动横向伸缩 pod 与集群节点”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "Cluster Autoscaler",
    ],
  },
  {
    id: "k8s-15-autoscaling-q4",
    chapter: "k8s-15-autoscaling",
    level: 2,
    question:
      "“第15章 自动横向伸缩 pod 与集群节点”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“理解HPA、VPA早期机制、Cluster Autoscaler、指标选择和缩容干扰”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "自定义指标",
    ],
  },
  {
    id: "k8s-15-autoscaling-q5",
    chapter: "k8s-15-autoscaling",
    level: 3,
    question: "如何验证“第15章 自动横向伸缩 pod 与集群节点”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "PodDisruptionBudget",
    ],
  },
  {
    id: "k8s-15-autoscaling-q6",
    chapter: "k8s-15-autoscaling",
    level: 3,
    question: "“第15章 自动横向伸缩 pod 与集群节点”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、HPA计算轨迹、CPU与自定义指标、VPA边界、节点伸缩和PodDisruptionBudget实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第15章 自动横向伸缩 pod 与集群节点",
      "HPA",
    ],
  },
  {
    id: "k8s-16-scheduling-q1",
    chapter: "k8s-16-scheduling",
    level: 1,
    question: "为什么“第16章 高级调度”必须覆盖14个目录节点？",
    answer:
      "这些节点共同组成“用污点容忍、节点亲和、Pod亲和与反亲和表达位置约束和偏好”的对象、控制循环、运行与证据链；漏项会使污点驱逐、节点亲和、Pod同置、跨域分布和反亲和调度实验无法独立复现。",
    tags: ["Kubernetes in Action", "Kubernetes 1.8", "第16章 高级调度", "污点"],
  },
  {
    id: "k8s-16-scheduling-q2",
    chapter: "k8s-16-scheduling",
    level: 1,
    question: "“第16章 高级调度”的最小不变量是什么？",
    answer:
      "硬约束保证不可违反条件，软偏好在可调度前提下优化分布，故障域与拓扑标签正确；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第16章 高级调度",
      "容忍度",
    ],
  },
  {
    id: "k8s-16-scheduling-q3",
    chapter: "k8s-16-scheduling",
    level: 2,
    question: "怎样为“第16章 高级调度”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第16章 高级调度",
      "节点亲和",
    ],
  },
  {
    id: "k8s-16-scheduling-q4",
    chapter: "k8s-16-scheduling",
    level: 2,
    question: "“第16章 高级调度”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用污点容忍、节点亲和、Pod亲和与反亲和表达位置约束和偏好”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第16章 高级调度",
      "Pod亲和",
    ],
  },
  {
    id: "k8s-16-scheduling-q5",
    chapter: "k8s-16-scheduling",
    level: 3,
    question: "如何验证“第16章 高级调度”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第16章 高级调度",
      "反亲和",
    ],
  },
  {
    id: "k8s-16-scheduling-q6",
    chapter: "k8s-16-scheduling",
    level: 3,
    question: "“第16章 高级调度”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、污点驱逐、节点亲和、Pod同置、跨域分布和反亲和调度实验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kubernetes in Action", "Kubernetes 1.8", "第16章 高级调度", "污点"],
  },
  {
    id: "k8s-17-best-practices-q1",
    chapter: "k8s-17-best-practices",
    level: 1,
    question: "为什么“第17章 开发应用的最佳实践”必须覆盖24个目录节点？",
    answer:
      "这些节点共同组成“整合资源清单、Pod生命周期、优雅启停、镜像标签、日志、开发测试与CI/CD”的对象、控制循环、运行与证据链；漏项会使资源包、生命周期钩子、优雅终止、镜像策略、日志契约、开发与持续交付演练无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "生命周期钩子",
    ],
  },
  {
    id: "k8s-17-best-practices-q2",
    chapter: "k8s-17-best-practices",
    level: 1,
    question: "“第17章 开发应用的最佳实践”的最小不变量是什么？",
    answer:
      "Pod随时可重建，启动和终止窗口不丢客户端请求，制品与清单按版本联合发布和回退；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "优雅终止",
    ],
  },
  {
    id: "k8s-17-best-practices-q3",
    chapter: "k8s-17-best-practices",
    level: 2,
    question: "怎样为“第17章 开发应用的最佳实践”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "ImagePullPolicy",
    ],
  },
  {
    id: "k8s-17-best-practices-q4",
    chapter: "k8s-17-best-practices",
    level: 2,
    question: "“第17章 开发应用的最佳实践”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“整合资源清单、Pod生命周期、优雅启停、镜像标签、日志、开发测试与CI/CD”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "日志契约",
    ],
  },
  {
    id: "k8s-17-best-practices-q5",
    chapter: "k8s-17-best-practices",
    level: 3,
    question: "如何验证“第17章 开发应用的最佳实践”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "持续交付",
    ],
  },
  {
    id: "k8s-17-best-practices-q6",
    chapter: "k8s-17-best-practices",
    level: 3,
    question: "“第17章 开发应用的最佳实践”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、资源包、生命周期钩子、优雅终止、镜像策略、日志契约、开发与持续交付演练、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第17章 开发应用的最佳实践",
      "生命周期钩子",
    ],
  },
  {
    id: "k8s-18-extension-q1",
    chapter: "k8s-18-extension",
    level: 1,
    question: "为什么“第18章 Kubernetes 应用扩展”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“通过CRD、自定义控制器、API服务器、Service Catalog、OpenShift与Helm扩展平台”的对象、控制循环、运行与证据链；漏项会使CRD与控制器、校验、聚合API、Service Catalog绑定、平台比较和Helm交付无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "CustomResourceDefinition",
    ],
  },
  {
    id: "k8s-18-extension-q2",
    chapter: "k8s-18-extension",
    level: 1,
    question: "“第18章 Kubernetes 应用扩展”的最小不变量是什么？",
    answer:
      "自定义资源模式、控制循环和状态可观察，服务绑定凭证与撤销闭环，扩展失败不破坏核心API；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "自定义控制器",
    ],
  },
  {
    id: "k8s-18-extension-q3",
    chapter: "k8s-18-extension",
    level: 2,
    question: "怎样为“第18章 Kubernetes 应用扩展”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "聚合API",
    ],
  },
  {
    id: "k8s-18-extension-q4",
    chapter: "k8s-18-extension",
    level: 2,
    question: "“第18章 Kubernetes 应用扩展”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“通过CRD、自定义控制器、API服务器、Service Catalog、OpenShift与Helm扩展平台”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "Service Catalog",
    ],
  },
  {
    id: "k8s-18-extension-q5",
    chapter: "k8s-18-extension",
    level: 3,
    question: "如何验证“第18章 Kubernetes 应用扩展”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "Helm",
    ],
  },
  {
    id: "k8s-18-extension-q6",
    chapter: "k8s-18-extension",
    level: 3,
    question: "“第18章 Kubernetes 应用扩展”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、CRD与控制器、校验、聚合API、Service Catalog绑定、平台比较和Helm交付、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第18章 Kubernetes 应用扩展",
      "CustomResourceDefinition",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q1",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 1,
    question: "为什么“附录A 在多个集群中使用 kubectl”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“管理多个kubectl集群、用户、上下文和命名空间默认值”的对象、控制循环、运行与证据链；漏项会使kubeconfig结构、上下文切换、合并配置、权限确认和误操作恢复无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "kubeconfig",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q2",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 1,
    question: "“附录A 在多个集群中使用 kubectl”的最小不变量是什么？",
    answer:
      "每条命令明确目标集群与身份，高风险操作前后都保存current-context和资源范围；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "cluster",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q3",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 2,
    question: "怎样为“附录A 在多个集群中使用 kubectl”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "user",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q4",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 2,
    question: "“附录A 在多个集群中使用 kubectl”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“管理多个kubectl集群、用户、上下文和命名空间默认值”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "context",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q5",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 3,
    question: "如何验证“附录A 在多个集群中使用 kubectl”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "current-context",
    ],
  },
  {
    id: "k8s-appendix-a-kubectl-multicluster-q6",
    chapter: "k8s-appendix-a-kubectl-multicluster",
    level: 3,
    question: "“附录A 在多个集群中使用 kubectl”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、kubeconfig结构、上下文切换、合并配置、权限确认和误操作恢复、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录A 在多个集群中使用 kubectl",
      "kubeconfig",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q1",
    chapter: "k8s-appendix-b-kubeadm",
    level: 1,
    question: "为什么“附录B 使用 kubeadm 配置多节点集群”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“用kubeadm配置书中时代的多节点Kubernetes集群并验证控制面与节点加入”的对象、控制循环、运行与证据链；漏项会使主机基线、kubeadm初始化、join令牌、CNI、节点验证和销毁重建无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "kubeadm",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q2",
    chapter: "k8s-appendix-b-kubeadm",
    level: 1,
    question: "“附录B 使用 kubeadm 配置多节点集群”的最小不变量是什么？",
    answer:
      "版本、容器运行时、网络插件、令牌和证书固定，节点重建后控制面与Pod网络恢复；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "bootstrap token",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q3",
    chapter: "k8s-appendix-b-kubeadm",
    level: 2,
    question: "怎样为“附录B 使用 kubeadm 配置多节点集群”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "证书",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q4",
    chapter: "k8s-appendix-b-kubeadm",
    level: 2,
    question:
      "“附录B 使用 kubeadm 配置多节点集群”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“用kubeadm配置书中时代的多节点Kubernetes集群并验证控制面与节点加入”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "CNI",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q5",
    chapter: "k8s-appendix-b-kubeadm",
    level: 3,
    question: "如何验证“附录B 使用 kubeadm 配置多节点集群”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "节点加入",
    ],
  },
  {
    id: "k8s-appendix-b-kubeadm-q6",
    chapter: "k8s-appendix-b-kubeadm",
    level: 3,
    question: "“附录B 使用 kubeadm 配置多节点集群”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、主机基线、kubeadm初始化、join令牌、CNI、节点验证和销毁重建、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录B 使用 kubeadm 配置多节点集群",
      "kubeadm",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q1",
    chapter: "k8s-appendix-c-runtimes",
    level: 1,
    question: "为什么“附录C 使用其他容器运行时”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“比较Docker之外的rkt等容器运行时及其与kubelet的集成边界”的对象、控制循环、运行与证据链；漏项会使运行时接口、镜像与容器生命周期、日志、网络卷和故障对照无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "容器运行时",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q2",
    chapter: "k8s-appendix-c-runtimes",
    level: 1,
    question: "“附录C 使用其他容器运行时”的最小不变量是什么？",
    answer:
      "同一Pod规范在目标运行时保持网络、卷、日志、停止和资源语义，差异被明确记录；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "rkt",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q3",
    chapter: "k8s-appendix-c-runtimes",
    level: 2,
    question: "怎样为“附录C 使用其他容器运行时”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "kubelet",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q4",
    chapter: "k8s-appendix-c-runtimes",
    level: 2,
    question: "“附录C 使用其他容器运行时”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“比较Docker之外的rkt等容器运行时及其与kubelet的集成边界”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "镜像格式",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q5",
    chapter: "k8s-appendix-c-runtimes",
    level: 3,
    question: "如何验证“附录C 使用其他容器运行时”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "运行时生命周期",
    ],
  },
  {
    id: "k8s-appendix-c-runtimes-q6",
    chapter: "k8s-appendix-c-runtimes",
    level: 3,
    question: "“附录C 使用其他容器运行时”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、运行时接口、镜像与容器生命周期、日志、网络卷和故障对照、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录C 使用其他容器运行时",
      "容器运行时",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q1",
    chapter: "k8s-appendix-d-federation",
    level: 1,
    question: "为什么“附录D Cluster Federation”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“重建第1版Cluster Federation的多集群资源传播、DNS与故障边界”的对象、控制循环、运行与证据链；漏项会使联邦拓扑、成员注册、资源传播、跨集群DNS、故障与撤销记录无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "Cluster Federation",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q2",
    chapter: "k8s-appendix-d-federation",
    level: 1,
    question: "“附录D Cluster Federation”的最小不变量是什么？",
    answer:
      "联邦控制面、成员集群和资源传播状态可区分，单集群故障不会被误判为全局完成；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "成员集群",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q3",
    chapter: "k8s-appendix-d-federation",
    level: 2,
    question: "怎样为“附录D Cluster Federation”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "资源传播",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q4",
    chapter: "k8s-appendix-d-federation",
    level: 2,
    question: "“附录D Cluster Federation”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“重建第1版Cluster Federation的多集群资源传播、DNS与故障边界”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "跨集群DNS",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q5",
    chapter: "k8s-appendix-d-federation",
    level: 3,
    question: "如何验证“附录D Cluster Federation”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "联邦控制面",
    ],
  },
  {
    id: "k8s-appendix-d-federation-q6",
    chapter: "k8s-appendix-d-federation",
    level: 3,
    question: "“附录D Cluster Federation”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、联邦拓扑、成员注册、资源传播、跨集群DNS、故障与撤销记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "附录D Cluster Federation",
      "Cluster Federation",
    ],
  },
  {
    id: "k8s-official-final-review-q1",
    chapter: "k8s-official-final-review",
    level: 1,
    question: "为什么“第1版全书总复习”必须覆盖22个目录节点？",
    answer:
      "这些节点共同组成“把18章4附录重组为声明与控制循环、应用配置存储、网络安全资源和生产扩展四条主线”的对象、控制循环、运行与证据链；漏项会使404节点覆盖表、综合对象图、容量与故障实验、业务对账、恢复回退和独立交接无法独立复现。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "声明式API",
    ],
  },
  {
    id: "k8s-official-final-review-q2",
    chapter: "k8s-official-final-review",
    level: 1,
    question: "“第1版全书总复习”的最小不变量是什么？",
    answer:
      "从清单提交到etcd、控制器、调度、kubelet、网络存储和应用结果的全链路可预测、故障可恢复；需要版本、对象、控制器轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "控制循环",
    ],
  },
  {
    id: "k8s-official-final-review-q3",
    chapter: "k8s-official-final-review",
    level: 2,
    question: "怎样为“第1版全书总复习”构造单变量反例？",
    answer:
      "固定Kubernetes 1.8、集群、命名空间、镜像和清单，只改变副本、探针、资源、标签选择、节点、网络或存储条件之一，再比较状态轨迹与最终业务结果。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "对象所有权",
    ],
  },
  {
    id: "k8s-official-final-review-q4",
    chapter: "k8s-official-final-review",
    level: 2,
    question: "“第1版全书总复习”为什么必须固定Kubernetes 1.8？",
    answer:
      "原书第1版源码以1.8.0为基线；后来的API、运行时、安全、网络与多集群机制只能作为差异材料，不能替代“把18章4附录重组为声明与控制循环、应用配置存储、网络安全资源和生产扩展四条主线”的正式分母。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "故障恢复",
    ],
  },
  {
    id: "k8s-official-final-review-q5",
    chapter: "k8s-official-final-review",
    level: 3,
    question: "如何验证“第1版全书总复习”的性能和恢复结论？",
    answer:
      "固定镜像、请求分布、副本、资源、探针、网络和存储语义，重复测期望/当前/就绪、重启、Pending、吞吐、P95/P99和错误，并独立对账。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "独立交接",
    ],
  },
  {
    id: "k8s-official-final-review-q6",
    chapter: "k8s-official-final-review",
    level: 3,
    question: "“第1版全书总复习”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、对象快照、控制循环轨迹、404节点覆盖表、综合对象图、容量与故障实验、业务对账、恢复回退和独立交接、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kubernetes in Action",
      "Kubernetes 1.8",
      "第1版全书总复习",
      "声明式API",
    ],
  },
];
