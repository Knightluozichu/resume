import type { ReviewQuestion } from "./types";

export const k8sConfigSecretsQuestions: ReviewQuestion[] = [
  {
    id: "k8s-cfg-1",
    chapter: "k8s-config-secrets",
    level: 1,
    question: `ConfigMap有哪两种注入方式？各自的优缺点和使用场景是什么？`,
    answer: `两种注入方式：①环境变量注入（env/envFrom）——将ConfigMap的键值对作为环境变量注入容器。env逐个引用（configMapKeyRef指定name和key），envFrom一次性注入所有键值对（configMapRef指定name）。优点是使用简单（应用通过getenv直接读取，无需文件IO）、无需修改应用代码。缺点是不支持热更新（ConfigMap变更后环境变量不更新，需重启Pod才生效——因为环境变量在容器启动时注入，运行时不可变）、不支持配置文件（只能扁平键值对，不能放nginx.conf等多行配置）、有大小限制（单个环境变量值不超过1MB，所有env总和也有限制）。适用于简单的键值配置（如LOG_LEVEL=debug、MAX_CONNECTIONS=100）且不需要运行时更新的场景。②Volume挂载——将ConfigMap的每个键作为文件挂载到容器指定目录。configMap类型的Volume将每个data键变成一个文件（文件名=键名，文件内容=值）。优点是支持热更新（ConfigMap更新后约1分钟内Pod内文件自动更新，无需重启Pod——由kubelet定期同步ConfigMap到Volume）、支持配置文件（nginx.conf、application.yml等多行内容）、支持多文件（一个ConfigMap挂载多个配置文件）。缺点是应用需支持文件变化时重新加载（如nginx -s reload、Spring Cloud Config自动刷新），否则文件更新了但应用还在用旧配置。适用于配置文件、需要热更新的场景。生产环境推荐：简单配置用环境变量（简单可靠），配置文件和热更新用Volume挂载。注意：使用subPath挂载单个文件时不支持热更新（因为subPath创建的是符号链接而非目录挂载）。`,
    tags: ["ConfigMap", "环境变量", "Volume挂载", "热更新", "配置注入"],
  },
  {
    id: "k8s-cfg-2",
    chapter: "k8s-config-secrets",
    level: 2,
    question: `Secret真的安全吗？生产环境如何保护敏感数据？Base64编码和加密的区别是什么？`,
    answer: `Secret默认不安全：Secret的data字段只是Base64编码（非加密！），echo -n 'YWRtaW4=' | base64 -d即可解码出admin。任何有kubectl get secret权限的人都能解码所有Secret内容。Base64编码和加密的区别：Base64是编码（encoding）——可逆转换，任何人都能解码，目的是让二进制数据适配文本协议，无安全性可言。加密（encryption）——使用密钥进行可逆变换，没有密钥无法解密，目的是保护数据机密性。Secret用Base64只是为了让YAML支持存储二进制数据，完全不是安全措施。生产环境保护方案：①启用etcd静态加密——配置API Server的EncryptionConfiguration资源，指定加密算法（AES-256-CBC/AES-256-GCM/secretbox）和密钥。Secret写入etcd前自动加密，读取时自动解密。防止etcd被直接读取（如etcd备份泄露、etcd节点被入侵）导致Secret泄露。这是K8s内置功能但默认未启用。②RBAC最小权限——限制Secret的get/list权限，只允许特定ServiceAccount访问特定命名空间的Secret。③外部密钥管理——使用Vault / AWS KMS / Azure Key Vault管理密钥，通过CSI Secret Store Driver或External Secrets Operator将密钥注入Pod。密钥不存储在etcd中，降低泄露面。④Sealed Secrets（Bitnami）——用公钥加密Secret生成SealedSecret资源（可安全存入Git），集群内私钥解密。GitOps友好，Secret配置可版本控制。⑤镜像仓库Secret——imagePullSecrets用dockerconfigjson类型，避免在Pod中硬编码仓库密码。最佳实践：etcd加密（防etcd泄露）+ RBAC（防未授权访问）+ Vault/KMS（密钥集中管理）三层防护。`,
    tags: ["Secret", "Base64", "加密", "etcd静态加密", "Vault", "安全"],
  },
  {
    id: "k8s-cfg-3",
    chapter: "k8s-config-secrets",
    level: 2,
    question: `如何实现配置的热更新？ConfigMap更新后Pod如何感知？有哪些触发应用重新加载的方法？`,
    answer: `配置热更新机制：只有Volume挂载方式支持热更新（环境变量不支持）。ConfigMap更新后，kubelet定期（默认1分钟）同步ConfigMap内容到Volume挂载路径。kubelet通过API Server Watch ConfigMap变化，检测到变化后将新内容写入节点的/var/lib/kubelet/pods/<pod-uid>/volumes/...目录。由于Volume挂载的是这个目录，Pod内文件内容自动更新。但文件更新后应用需要感知并重新加载配置。触发应用重新加载的方法：①应用原生支持文件watch——如nginx通过inotify监控配置文件变化，但nginx默认不会自动reload（需nginx -s reload）。Spring Boot可通过spring-cloud-config的@RefreshScope注解监听配置变化自动刷新。②Sidecar监听文件变化触发reload——如Reloader/mitigate Sidecar容器监控ConfigMap变化，通过调用应用的reload API或发送SIGHUP信号触发重载。例如nginx-ingress的Sidecar检测到Ingress规则变化后执行nginx -s reload。③kubectl rollout restart——手动触发Deployment滚动重启，新Pod读取最新ConfigMap。命令：kubectl rollout restart deployment/web。简单粗暴但会中断连接。④ConfigMap版本号触发——在Pod模板的annotations中引用ConfigMap版本号（如configHash: <configmap的hash>），ConfigMap变更时更新annotations值，触发Deployment自动滚动更新。GitOps工具（ArgoCD/Flux）可自动检测ConfigMap变化并更新annotations。⑤应用轮询配置——应用定期读取配置文件（每30秒），发现变化时重载。简单但浪费资源。生产推荐：Volume挂载 + 应用原生reload或Sidecar触发reload（零停机），或kubectl rollout restart（简单但有短暂中断）。`,
    tags: ["热更新", "ConfigMap", "Volume挂载", "应用重载", "rollout restart"],
  },
  {
    id: "k8s-cfg-4",
    chapter: "k8s-config-secrets",
    level: 3,
    question: `如何设计多环境配置管理方案？如何实现配置与镜像分离的GitOps工作流？`,
    answer: `多环境配置管理方案：①配置与镜像分离原则——同一镜像（如myapp:v1.2.3）通过注入不同环境的ConfigMap/Secret跑在dev/staging/prod环境。镜像不含环境相关配置（如DB_HOST、LOG_LEVEL），配置在部署时通过ConfigMap/Secret注入。②目录结构——k8s-configs/base/（基础Kustomize配置）、k8s-configs/overlays/dev/（dev环境差异配置）、k8s-configs/overlays/staging/、k8s-configs/overlays/prod/。每个overlay包含该环境的ConfigMap（LOG_LEVEL/DB_HOST等）和Secret（数据库密码等）。③ConfigMap命名空间隔离——每个环境用独立命名空间（dev/staging/prod），同名ConfigMap在不同命名空间有不同值。④Secret管理——dev环境可用简单Secret（Base64），prod环境用Sealed Secrets（加密存入Git）或External Secrets Operator（从Vault/KMS拉取）。GitOps工作流：①开发者在Git仓库提交代码 → CI构建镜像并推送 → 镜像tag为commit SHA或语义版本（v1.2.3）。②CI或开发者更新另一个Git仓库（k8s-configs）中的Deployment image字段和ConfigMap内容。③ArgoCD/Flux持续Watch Git仓库变化 → 检测到YAML变更 → 自动kubectl apply到对应集群。④ArgoCD同步base + overlay → 生成最终YAML（如prod环境的Deployment image=v1.2.3 + ConfigMap LOG_LEVEL=warn + Secret DB_HOST=prod-db）。⑤配置变更流程——修改ConfigMap YAML → 提交PR → Review合并 → ArgoCD自动同步 → ConfigMap更新 → Volume挂载的应用文件自动更新或rollout restart触发重载。好处：配置可版本控制（Git history审计）、配置变更走PR流程（Review）、多环境一致（同一base不同overlay）、回滚简单（Git revert + ArgoCD自动同步）。`,
    tags: ["多环境配置", "GitOps", "配置镜像分离", "Kustomize", "ArgoCD"],
  },
];
