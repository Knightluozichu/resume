import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第14章 计算资源管理",
  focus: "用requests、limits、QoS、LimitRange、ResourceQuota和监控管理计算资源",
  invariant:
    "调度按requests决策，运行时按limits约束，OOM和CPU节流可解释，命名空间配额不能被绕过",
  artifact:
    "资源模型、调度实验、limits反例、QoS驱逐、LimitRange、Quota与历史监控",
  nodes: [
    "14.1 为 pod 中的容器申请资源",
    "14.1.1 创建包含资源 requests 的 pod",
    "14.1.2 资源 requests 如何影响调度",
    "14.1.3 CPU requests 如何影响 CPU 时间分配",
    "14.1.4 定义和申请自定义资源",
    "14.2 限制容器的可用资源",
    "14.2.1 设置容器可使用资源量的硬限制",
    "14.2.2 超过 limits",
    "14.2.3 容器中的应用如何看待 limits",
    "14.3 了解 pod QoS 等级",
    "14.3.1 定义 pod 的 QoS 等级",
    "14.3.2 内存不足时哪个进程会被杀死",
    "14.4 为命名空间中的 pod 设置默认的 requests 和 limits",
    "14.4.1 LimitRange 资源简介",
    "14.4.2 LimitRange 对象的创建",
    "14.4.3 强制进行限制",
    "14.4.4 应用资源 requests 和 limits 的默认值",
    "14.5 限制命名空间中的可用资源总量",
    "14.5.1 ResourceQuota 资源介绍",
    "14.5.2 为持久化存储指定配额",
    "14.5.3 限制可创建对象的个数",
    "14.5.4 为特定的 pod 状态或者 QoS 等级指定配额",
    "14.6 监控 pod 的资源使用量",
    "14.6.1 收集、获取实际资源使用情况",
    "14.6.2 保存并分析历史资源的使用统计信息",
    "14.7 本章小结",
  ],
} as const;
export function K8s14ResourcesObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s14ResourcesReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s14ResourcesEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
