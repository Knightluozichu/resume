import type { ReviewQuestion } from "./types";

export const mspDeploymentPatternsQuestions: ReviewQuestion[] = [
  {
    id: "msp-dep-1",
    chapter: "msp-deployment-patterns",
    level: 1,
    question: "容器化部署和单主机单服务部署各自的优势是什么？为什么容器化成为主流？",
    answer:
      "单主机单服务部署：每个服务运行在独立虚拟机上。优势是隔离好（故障不扩散）、独立扩缩容；劣势是资源利用率低（每服务一台VM浪费）、虚拟机启动慢、运维成本高。容器化部署：服务打包为容器镜像在编排平台运行。优势是轻量（共享内核启动秒级vs虚拟机分钟级）、资源利用率高（一台宿主机跑多个容器）、自动调度和自愈（K8s自动调度/重启/扩缩容）、环境一致性（镜像含应用+依赖+运行时）。容器化成为主流因为兼具虚拟机的隔离性和单主机多服务的资源效率，加上Kubernetes提供自动调度/滚动更新/自愈/扩缩容等编排能力，解决了微服务部署的运维复杂性问题。代价是需要学习K8s和容器化改造。",
    tags: ["容器化", "单主机单服务", "Docker", "Kubernetes", "部署模式"],
  },
  {
    id: "msp-dep-2",
    chapter: "msp-deployment-patterns",
    level: 2,
    question: "Serverless部署的冷启动问题是什么？如何应对？适合什么场景？",
    answer:
      "冷启动问题：Serverless函数空闲时实例被平台回收，下次请求需重新分配实例并初始化（加载运行时/代码/依赖），导致几百ms到几s的延迟，VPC内冷启动更慢。对策：①预热——定时触发保持实例存活②最小实例数——部分平台支持保活③减少依赖——加快启动速度。适合场景：事件驱动（Webhook/定时任务）、突发流量（间歇性高并发）、无状态处理（图片处理/ETL）、快速原型。不适合：长连接（WebSocket）、持续高负载（成本反超容器）、复杂有状态业务、低延迟要求（冷启动不可控）。核心：不是所有服务都需Serverless，混合部署（核心服务容器化+边缘服务Serverless）也是合理选择。",
    tags: ["Serverless", "冷启动", "FaaS", "事件驱动", "部署选型"],
  },
  {
    id: "msp-dep-3",
    chapter: "msp-deployment-patterns",
    level: 1,
    question: "Kubernetes的滚动更新是如何实现的？为什么能做到零停机？",
    answer:
      "滚动更新逐步创建新版本Pod并销毁旧版本Pod，新旧版本短暂共存直到全部替换为新版本。零停机实现：①配合健康检查（readiness probe）——新Pod启动后先不接流量，直到readiness probe通过（表示应用已就绪）才加入Service的Endpoints接收流量②优雅终止——销毁旧Pod前先发送SIGTERM信号，应用完成正在处理的请求后才退出（配合preStop hook和termination grace period）③滚动策略控制速度——maxSurge（最多超出期望副本数多少个新Pod）和maxUnavailable（最多不可用多少个Pod）控制更新速率。相比蓝绿部署（同时维护两套环境切换）更节省资源，相比重建部署（先全部销毁旧Pod再创建新Pod）实现了零停机。",
    tags: ["滚动更新", "Kubernetes", "零停机", "readiness probe", "优雅终止"],
  },
  {
    id: "msp-dep-4",
    chapter: "msp-deployment-patterns",
    level: 2,
    question: "四种部署模式（单主机多服务/单主机单服务/容器/Serverless）如何选型？",
    answer:
      "选型矩阵：①单主机多服务——资源利用率高但隔离差，适合小规模起步或资源紧张时，不推荐生产环境。②单主机单服务——隔离好但资源浪费，适合简单场景服务少时。③容器化——隔离好+资源高效+自动编排，当前主流，大多数微服务最优选择。④Serverless——零运维按量付费自动扩缩到零，适合事件驱动/无状态/突发流量场景，但冷启动/有状态/长连接不适合。选型原则：根据业务场景选型不盲目追新。核心服务用容器化保证可控性，边缘服务（Webhook/定时任务/图片处理）用Serverless降低运维成本。混合部署也是合理选择。Chris Richardson建议：容器化是大多数微服务的最优选择。",
    tags: ["部署选型", "容器化", "Serverless", "混合部署", "单主机多服务"],
  },
];
