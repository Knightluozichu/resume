import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第1版权威学习地图",
  focus:
    "沿概览、核心概念、超越基础和生产实践四部分建立18章4附录的依赖图与Kubernetes 1.8边界",
  invariant:
    "22个正式单元与404个唯一目录节点全部可达，API对象、控制循环、故障实验和证据均能回指权威目录",
  artifact:
    "完整目录映射、四部分依赖图、Kubernetes 1.8版本边界、实验索引和全书验收清单",
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
export function K8sOfficialLearningMapObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sOfficialLearningMapReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sOfficialLearningMapEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
