import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第13章 保障集群内节点和网络安全",
  focus: "控制宿主命名空间、节点身份、网络隔离和Pod间出入流量",
  invariant:
    "特权与宿主资源只向必要工作负载开放，NetworkPolicy允许和拒绝路径与命名空间边界一致",
  artifact: "宿主命名空间风险、节点权限、NetworkPolicy矩阵、CIDR与出站隔离实验",
  nodes: [
    "13.1 在 pod 中使用宿主节点的 Linux 命名空间",
    "13.1.1 在 pod 中使用宿主节点的网络命名空间",
    "13.1.2 绑定宿主节点上的端口而不使用宿主节点的网络命名空间",
    "13.1.3 使用宿主节点的 PID 与 IPC 命名空间",
    "13.2 配置节点的安全上下文",
    "13.2.1 使用指定用户运行容器",
    "13.2.2 阻止容器以 root 用户运行",
    "13.2.3 使用特权模式运行 pod",
    "13.2.4 为容器单独添加内核功能",
    "13.2.5 在容器中禁用内核功能",
    "13.2.6 阻止对容器根文件系统的写入",
    "13.2.7 容器使用不同用户运行时共享存储卷",
    "13.3 限制 pod 使用安全相关的特性",
    "13.3.1 PodSecurityPolicy 资源介绍",
    "13.3.2 了解 runAsUser、 fsGroup 和 supplementalGroup 策略",
    "13.3.3 配置允许、默认添加、禁止使用的内核功能",
    "13.3.4 限制 pod 可以使用的存储卷类型",
    "13.3.5 对不同的用户与组分配不同的 PodSecurityPolicy",
    "13.4 隔离 pod 的网络",
    "13.4.1 在一个命名空间中启用网络隔离",
    "13.4.2 允许同一命名空间中的部分 pod 访问一个服务端 pod",
    "13.4.3 在不同 Kubernetes 命名空间之间进行网络隔离",
    "13.4.4 使用 CIDR 隔离网络",
    "13.4.5 限制 pod 的对外访问流量",
    "13.5 本章小结",
  ],
} as const;
export function K8s13NodeNetworkSecurityObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s13NodeNetworkSecurityReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s13NodeNetworkSecurityEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
