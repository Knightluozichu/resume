import type { ReviewQuestion } from "./types";

export const k8sVolumesStorageQuestions: ReviewQuestion[] = [
  {
    id: "k8s-vol-1",
    chapter: "k8s-volumes-storage",
    level: 1,
    question: "PV、PVC、StorageClass三者的关系是什么？静态供给和动态供给有什么区别？",
    answer: "三者关系：PV（PersistentVolume）是集群级存储资源——由管理员创建或由StorageClass动态创建，有容量、访问模式、回收策略等属性，独立于Pod生命周期。PVC（PersistentVolumeClaim）是用户对存储的申请——声明需要的容量和访问模式，通过匹配自动绑定到PV。StorageClass是动态供给策略——定义provisioner（存储驱动如kubernetes.io/aws-ebs）、parameters（存储参数如卷类型gp3）和reclaimPolicy（回收策略）。PVC通过accessModes和storage容量匹配PV，匹配后绑定。静态供给：管理员预先创建PV（如手动创建NFS PV指定server和path）→ 用户创建PVC → 控制器匹配容量和访问模式 → 自动绑定。缺点是PV必须提前创建（资源浪费——PV容量10Gi但PVC只要5Gi也整块绑定）、管理繁琐（需要手动维护PV池）。动态供给：管理员创建StorageClass（定义provisioner和参数）→ 用户创建PVC引用storageClassName → provisioner控制器Watch到未绑定的PVC → 调用云API自动创建匹配容量的PV并绑定。优点是按需创建（PVC要5Gi就创建5Gi的PV）、无需预分配、自动化。生产环境推荐动态供给 + WaitForFirstConsumer（等Pod调度后才创建PV，保证PV和Pod在同一可用区，避免跨区延迟和费用）。回收策略：Retain（PVC删除后PV保留数据需手动清理，安全但需运维）、Delete（PVC删除后自动删除PV和后端存储，自动化但数据丢失）。",
    tags: ["PV", "PVC", "StorageClass", "静态供给", "动态供给"],
  },
  {
    id: "k8s-vol-2",
    chapter: "k8s-volumes-storage",
    level: 2,
    question: "StatefulSet如何实现存储的持久化？与Deployment在存储方面有什么本质区别？",
    answer: "StatefulSet存储持久化机制：通过volumeClaimTemplates为每个Pod自动创建独立PVC。Pod按序号命名（db-0, db-1, db-2），PVC也按序号命名（data-db-0, data-db-1, data-db-2）。当Pod被删除重建（如滚动更新、节点故障、手动删除），新Pod使用相同名称，自动绑定原来的PVC（因为PVC名称不变且PVC独立于Pod生命周期不被删除），因此数据连续。例如db-1节点故障 → kubelet在节点2重建db-1 → 新db-1绑定data-db-1 PVC → 原有数据可用。本质区别：①Pod身份——Deployment的Pod随机命名（web-deploy-abc123-def456），重建后名称完全不同，无法通过名称找到原PVC；StatefulSet的Pod有序命名（db-0），重建后名称不变，可精确绑定原PVC（data-db-0）。②存储绑定——Deployment所有Pod共享同一PVC（多Pod读写同一卷，适合无状态只读配置），或各自PVC但重建后无法重绑（新Pod创建新PVC，数据不连续）；StatefulSet每个Pod有独立PVC且永久绑定（Pod名→PVC名映射固定），保证数据连续性。③DNS——StatefulSet Pod有稳定DNS（db-0.db-svc.default.svc.cluster.local），可直接通过Pod名寻址，适合主从复制（从节点知道主节点地址）；Deployment Pod无稳定DNS，只能通过Service间接访问。StatefulSet适用于数据库、消息队列等有状态应用，Deployment适用于Web/API等无状态应用。",
    tags: ["StatefulSet", "持久化", "volumeClaimTemplates", "Deployment对比"],
  },
  {
    id: "k8s-vol-3",
    chapter: "k8s-volumes-storage",
    level: 2,
    question: "Volume有哪些常见类型？emptyDir、hostPath、configMap、PVC各自的生命周期和适用场景是什么？",
    answer: "常见Volume类型：①emptyDir——Pod级临时存储，随Pod创建而创建，随Pod删除而销毁。同一Pod内容器可通过volumeMounts共享读写。初始为空目录。适用场景：Sidecar容器间文件交换（nginx写日志→Fluent Bit读取）、临时缓存空间、计算中间结果。不适用于持久化数据（Pod重建数据丢失）。②hostPath——挂载节点文件系统的路径到Pod。生命周期独立于Pod（Pod删除后数据仍在节点上）。适用场景：节点级agent（如Fluentd读取/var/log容器日志、node-exporter读取/proc指标）。风险：Pod被调度到不同节点则访问不同数据，存在安全风险（可访问宿主机敏感文件），生产环境不推荐使用（除非DaemonSet且明确知道路径）。③configMap——将ConfigMap的键值对作为文件挂载到Pod。随Pod生命周期（ConfigMap更新后挂载的文件约1分钟内自动更新）。适用场景：注入配置文件（nginx.conf、application.yml）。注意：使用subPath挂载单个文件时不支持热更新。④PVC（persistentVolumeClaim）——引用持久化存储卷，独立于Pod生命周期。Pod删除后PVC保留，重建Pod可重新绑定。适用场景：数据库数据、用户上传文件、消息队列存储等需要持久化的数据。选择原则：临时数据用emptyDir，节点系统用hostPath（仅DaemonSet），配置文件用configMap，持久化数据用PVC。访问模式：RWO（ReadWriteOnce单节点读写，适合数据库）、ROX（ReadOnlyMany多节点只读，适合只读配置）、RWX（ReadWriteMany多节点读写，适合共享文件如NFS）。",
    tags: ["Volume", "emptyDir", "hostPath", "configMap", "PVC", "访问模式"],
  },
  {
    id: "k8s-vol-4",
    chapter: "k8s-volumes-storage",
    level: 3,
    question: "CSI接口在K8s存储体系中扮演什么角色？它如何解耦K8s与存储系统？StorageClass的WaitForFirstConsumer有什么意义？",
    answer: "CSI（Container Storage Interface）角色：CSI是K8s与第三方存储系统之间的标准接口，让K8s无需内置各存储驱动的代码，通过统一接口与任何支持CSI的存储系统交互。CSI解耦K8s与存储系统：K8s核心代码不包含任何特定存储驱动的实现（早期版本内置AWS EBS、Azure Disk、GCE PD等in-tree驱动，现已迁移到CSI）。存储厂商实现CSI接口（Provisioner/Attacher/NodePlugin三个gRPC组件），以Sidecar容器形式部署在集群中。K8s通过CSI通用接口调用，不关心底层是AWS EBS还是Ceph还是NFS。好处：①存储厂商独立发布更新（不需要等K8s版本发布）；②K8s核心代码更精简（移除in-tree驱动）；③新存储系统只需实现CSI接口即可接入K8s。CSI三大组件：①Provisioner（外部控制器）——Watch PVC变化，调用存储API创建/删除后端卷（如AWS EBS卷），创建对应的PV对象。②Attacher（外部控制器）——Watch Pod的VolumeAttachment变化，将卷挂载到目标节点（attach）或卸载（detach）。③NodePlugin（节点插件，DaemonSet）——在节点上执行mount/umount操作，将已attach的卷挂载到Pod的目录。StorageClass的WaitForFirstConsumer意义：默认Immediate模式——PVC创建后立即匹配/创建PV并绑定，不考虑Pod调度到哪个节点。问题：云厂商的存储卷通常与可用区绑定（如AWS EBS卷在us-east-1a创建后只能在1a的节点上挂载），如果PVC在1a创建但Pod被调度到1b，则无法挂载。WaitForFirstConsumer模式——PVC创建后不立即绑定，等到有Pod使用该PVC且Pod被调度到具体节点后，才在该节点所在可用区创建PV。保证PV和Pod在同一可用区，避免跨区挂载失败。生产环境必须设为WaitForFirstConsumer（多可用区集群尤其重要）。",
    tags: ["CSI", "存储解耦", "WaitForFirstConsumer", "StorageClass", "可用区"],
  },
];
