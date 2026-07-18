import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第1版全书总复习",
  focus:
    "把18章4附录重组为声明与控制循环、应用配置存储、网络安全资源和生产扩展四条主线",
  invariant:
    "从清单提交到etcd、控制器、调度、kubelet、网络存储和应用结果的全链路可预测、故障可恢复",
  artifact:
    "404节点覆盖表、综合对象图、容量与故障实验、业务对账、恢复回退和独立交接",
  nodes: [
    "1 第1章 Kubernetes 介绍",
    "2 第2章 开始使用 Kubernetes 和 Docker",
    "3 第3章 pod ：运行于 Kubernetes 中的容器",
    "4 第4章 副本机制和其他控制器 ：部署托管的 pod",
    "5 第5章 服务 ：让客户端发现 pod 并与之通信",
    "6 第6章 卷 ：将磁盘挂载到容器",
    "7 第7章 ConfigMap 和 Secret ：配置应用程序",
    "8 第8章 从应用访问 pod 元数据以及其他资源",
    "9 第9章 Deployment: 声明式地升级应用",
    "10 第10章 StatefulSet ：部署有状态的多副本应用",
    "11 第11章 了解 Kubernetes 机理",
    "12 第12章 Kubernetes API 服务器的安全防护",
    "13 第13章 保障集群内节点和网络安全",
    "14 第14章 计算资源管理",
    "15 第15章 自动横向伸缩 pod 与集群节点",
    "16 第16章 高级调度",
    "17 第17章 开发应用的最佳实践",
    "18 第18章 Kubernetes 应用扩展",
    "附录A 在多个集群中使用 kubectl",
    "附录B 使用 kubeadm 配置多节点集群",
    "附录C 使用其他容器运行时",
    "附录D Cluster Federation",
  ],
} as const;
export function K8sOfficialFinalReviewObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sOfficialFinalReviewReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sOfficialFinalReviewEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
