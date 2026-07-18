import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第15章 自动横向伸缩 pod 与集群节点",
  focus: "理解HPA、VPA早期机制、Cluster Autoscaler、指标选择和缩容干扰",
  invariant:
    "扩缩容基于可解释指标与稳定窗口，Pod和节点缩容不破坏最小可用容量与有状态约束",
  artifact:
    "HPA计算轨迹、CPU与自定义指标、VPA边界、节点伸缩和PodDisruptionBudget实验",
  nodes: [
    "15.1 pod 的横向自动伸缩",
    "15.1.1 了解自动伸缩过程",
    "15.1.2 基于 CPU 使用率进行自动伸缩",
    "15.1.3 基于内存使用进行自动伸缩",
    "15.1.4 基于其他自定义度量进行自动伸缩",
    "15.1.5 确定哪些度量适合用于自动伸缩",
    "15.1.6 缩容到 0 个副本",
    "15.2 pod 的纵向自动伸缩",
    "15.2.1 自动配置资源请求",
    "15.2.2 修改运行中 pod 的资源请求",
    "15.3 集群节点的横向伸缩",
    "15.3.1 Cluster Autoscaler 介绍",
    "15.3.2 启用 Cluster Autoscaler",
    "15.3.3 限制集群缩容时的服务干扰",
    "15.4 本章小结",
  ],
} as const;
export function K8s15AutoscalingObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s15AutoscalingReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s15AutoscalingEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
