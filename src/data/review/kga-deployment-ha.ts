import type { ReviewQuestion } from "./types";

export const kgaDeploymentHaQuestions: ReviewQuestion[] = [
  {
    id: "kga-dh-1",
    chapter: "kga-deployment-ha",
    level: 2,
    question: "Kong的DB模式和DB-less模式有什么区别？各自适用于什么场景？",
    answer: "DB模式：Kong使用PostgreSQL（或Cassandra旧版）作为配置数据库，所有实体（Service/Route/Consumer/Plugin等）存储在数据库中。①配置方式——通过Admin API动态增删改实体，实时生效，多节点共享同一数据库自动同步配置。②优点——动态配置灵活、多节点自动同步、支持Consumer管理（认证凭证存储在DB中）、支持OAuth2等需要持久化状态的插件。③缺点——依赖数据库（数据库宕机Kong无法启动/配置变更）、数据库是单点风险（需数据库自身高可用）、Admin API写入有DB延迟。适用场景：需要动态配置、Consumer管理、OAuth2认证的生产环境。DB-less模式：Kong不使用数据库，配置通过声明式YAML/JSON文件（decK管理或KONG_DECLARATIVE_CONFIG环境变量）加载到内存。①配置方式——编写kong.yml声明式配置文件，Kong启动时加载到内存，配置变更需重新加载（通过POST /config端点或重启）。②优点——无数据库依赖（部署简单）、配置即代码（GitOps友好、可版本控制）、启动快（无需等DB连接）、安全（Admin API只读或禁用，无法动态篡改配置）。③缺点——非动态（配置变更需reload）、不支持需要持久化DB的插件（如OAuth2的token存储、Rate Limiting的cluster策略）、多节点需外部同步配置文件。适用场景：Kubernetes/容器化部署（配置通过ConfigMap注入）、安全要求高（禁止运行时配置变更）、CI/CD GitOps流程、边缘部署（轻量化）。选型建议：开发/测试用DB模式（灵活）；K8s生产用DB-less（声明式+GitOps）；需要OAuth2/动态Consumer管理用DB模式；Hybrid模式兼顾两者（控制面DB+数据面DB-less）。",
    tags: ["DB模式", "DB-less", "声明式配置", "PostgreSQL", "部署模式"],
  },
  {
    id: "kga-dh-2",
    chapter: "kga-deployment-ha",
    level: 1,
    question: "如何用Docker快速部署Kong？请给出完整的部署步骤和关键配置。",
    answer: "Docker部署Kong（DB-less模式，最简部署）：①创建Docker网络：docker network create kong-net。②启动Kong容器：docker run -d --name kong --network kong-net -e KONG_DATABASE=off -e KONG_PROXY_LISTEN=0.0.0.0:8000,0.0.0.0:8443 ssl -e KONG_ADMIN_LISTEN=0.0.0.0:8001 -e KONG_DECLARATIVE_CONFIG=/kong/kong.yml -v ./kong.yml:/kong/kong.yml -p 8000:8000 -p 8443:8443 -p 8001:8001 kong:latest。关键环境变量：KONG_DATABASE=off（DB-less模式）、KONG_PROXY_LISTEN（Proxy监听地址端口）、KONG_ADMIN_LISTEN（Admin API监听）、KONG_DECLARATIVE_CONFIG（声明式配置文件路径）。③声明式配置kong.yml示例：_format_version: \"3.0\" services: - name: example-service url: http://example.com routes: - name: example-route paths: [/]。④验证：curl http://localhost:8001/status返回Kong状态、curl http://localhost:8000/通过代理访问。Docker部署Kong（DB模式+PostgreSQL）：①启动PostgreSQL：docker run -d --name kong-db --network kong-net -e POSTGRES_USER=kong -e POSTGRES_DB=kong -e POSTGRES_PASSWORD=kong postgres:13。②初始化数据库：docker run --rm --network kong-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-db -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong kong kong migrations bootstrap。③启动Kong：docker run -d --name kong --network kong-net -e KONG_DATABASE=postgres -e KONG_PG_HOST=kong-db -e KONG_PG_USER=kong -e KONG_PG_PASSWORD=kong -e KONG_PROXY_LISTEN=0.0.0.0:8000 -e KONG_ADMIN_LISTEN=0.0.0.0:8001 -p 8000:8000 -p 8001:8001 kong:latest。docker-compose.yml可一键编排Kong+PostgreSQL+Redis等依赖。",
    tags: ["Docker部署", "DB-less", "PostgreSQL", "环境变量", "声明式配置"],
  },
  {
    id: "kga-dh-3",
    chapter: "kga-deployment-ha",
    level: 3,
    question: "Kong在Kubernetes中如何部署？Kong Ingress Controller的工作原理是什么？",
    answer: "Kubernetes部署Kong有两种方式：①Kong Ingress Controller(KIC)——Kong作为K8s Ingress Controller运行，将K8s Ingress/HTTPRoute/Gateway API资源自动转换为Kong的Route/Service/Plugin配置。②Helm Chart直接部署——用Helm安装Kong Gateway，手动通过Admin API管理配置（非K8s原生方式）。KIC工作原理：①KIC是一个K8s控制器（非Kong Gateway本身），运行在K8s集群中，监听K8s API Server的Ingress/Service/CRD（CustomResourceDefinition，如KongPlugin/KongConsumer）资源变更。②当用户创建K8s Ingress或Kong CRD资源时，KIC检测到变更，将K8s资源语义翻译为Kong的声明式配置（Service/Route/Plugin/Consumer等）。③KIC通过Admin API（DB模式）或declarative config（DB-less模式）将翻译后的配置推送到Kong Gateway Pod。④Kong Gateway Pod执行Proxy功能处理实际流量。部署KIC：helm install kong kong/kong -n kong --set ingressController.enabled=true --set ingressController.env.feature_gates=GatewayAlpha=true。配置示例：创建K8s Service + Ingress + KongPlugin CRD，KIC自动同步到Kong。K8s原生CRD：①KongPlugin——定义插件配置，apiVersion: configuration.konghq.com/v1, kind: KongPlugin, spec: plugin: jwt, config: {secret: xxx}；②KongConsumer——定义Consumer；③KongIngress——覆盖默认路由行为（如strip_path/methods）。优势：K8s声明式管理（kubectl apply）、GitOps友好（配置即代码）、自动同步（无需手动调Admin API）、与K8s Service/Ingress原生集成。生产建议：KIC + DB-less模式 + 多副本Kong Gateway Pod + Pod水平扩展。",
    tags: ["Kubernetes", "Ingress Controller", "KIC", "CRD", "Helm"],
  },
  {
    id: "kga-dh-4",
    chapter: "kga-deployment-ha",
    level: 3,
    question: "Kong的Hybrid模式是什么？它如何解决大规模部署中的控制面与数据面分离问题？",
    answer: "Hybrid模式（也叫Cluster模式）：Kong 2.x+引入的部署模式，将Kong节点分为两类——Control Plane（CP，控制面）和Data Plane（DP，数据面）。①CP节点——运行Admin API接收配置变更，持有数据库（PostgreSQL），不处理Proxy流量。CP是配置管理的唯一入口，将配置通过TLS加密的WebSocket长连接推送到所有DP节点。②DP节点——运行Proxy处理实际流量，不运行Admin API（不可通过Admin API篡改配置），不持有数据库，从CP节点接收配置缓存在内存中。工作流程：运维通过CP的Admin API创建/修改Service/Route/Plugin → CP写入数据库 → CP通过WebSocket推送配置变更到所有DP → DP更新本地内存配置 → 新配置立即在DP的Proxy生效。解决的问题：①Admin API安全——DP节点不暴露Admin API，攻击者无法通过DP篡改配置，生产环境只需暴露DP的Proxy端口。②配置一致性——所有DP从同一CP接收配置，避免多节点各自通过Admin API配置导致不一致。③数据库隔离——DP不连接数据库，数据库故障只影响CP（无法变更配置），不影响DP继续处理流量（已有配置缓存在内存）。④横向扩展——DP无状态（配置在内存），可随意水平扩展，不受数据库连接数限制。⑤多地域部署——CP在中心机房，DP部署在边缘机房，DP通过WAN从CP拉取配置，实现全球API网关。配置：CP节点——KONG_ROLE=control_plane + KONG_DATABASE=postgres + KONG_CLUSTER_LISTEN=0.0.0.0:8005（DP连接端口）。DP节点——KONG_ROLE=data_plane + KONG_DATABASE=off + KONG_CLUSTER_CP_HOST=cp.example.com（CP地址）+ KONG_CLUSTER_TLS_CERT/KEY（TLS证书）。适用场景：大规模生产环境（>5个Kong节点）、多地域部署、安全要求高（Admin API隔离）、K8s多集群。与DB-less对比：DB-less适合单节点/小规模，Hybrid适合大规模多节点。",
    tags: ["Hybrid模式", "控制面", "数据面", "CP", "DP", "大规模部署"],
  },
];
