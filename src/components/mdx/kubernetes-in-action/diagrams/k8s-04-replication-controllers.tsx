import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第4章 副本机制和其他控制器 ：部署托管的 pod",
  focus:
    "用存活探针、ReplicationController、ReplicaSet、DaemonSet、Job和CronJob管理Pod",
  invariant:
    "控制器选择器、模板和期望副本明确，删除、漂移、探针失败和任务完成后状态按控制循环收敛",
  artifact:
    "探针实验、RC与RS对照、DaemonSet节点覆盖、Job完成证据和CronJob调度记录",
  nodes: [
    "4.1 保持 pod 健康",
    "4.1.1 介绍存活探针",
    "4.1.2 创建基于 HTTP 的存活探针",
    "4.1.3 使用存活探针",
    "4.1.4 配置存活探针的附加属性",
    "4.1.5 创建有效的存活探针",
    "4.2 了解 ReplicationController",
    "4.2.1 ReplicationController 的操作",
    "4.2.2 创建一个 ReplicationController",
    "4.2.3 使用 ReplicationController",
    "4.2.4 将 pod 移入或移出 ReplicationController 的作用域",
    "4.2.5 修改 pod 模板",
    "4.2.6 水平缩放 pod",
    "4.2.7 删除一个 ReplicationController",
    "4.3 使用 ReplicaSet 而不是 ReplicationController",
    "4.3.1 比较 ReplicaSet 和 ReplicationController",
    "4.3.2 定义 ReplicaSet",
    "4.3.3 创建和检查 ReplicaSet",
    "4.3.4 使用 ReplicaSet 的更富表达力的标签选择器",
    "4.3.5 ReplicaSet 小结",
    "4.4 使用 DaemonSet 在每个节点上运行一个 pod",
    "4.4.1 使用 DaemonSet 在每个节点上运行一个 pod",
    "4.4.2 使用 DaemonSet 只在特定的节点上运行 pod",
    "4.5 运行执行单个任务的 pod",
    "4.5.1 介绍 Job 资源",
    "4.5.2 定义 Job 资源",
    "4.5.3 看 Job 运行一个 pod",
    "4.5.4 在 Job 中运行多个 pod 实例",
    "4.5.5 限制 Job pod 完成任务的时间",
    "4.6 安排 Job 定期运行或在将来运行一次",
    "4.6.1 创建一个 CronJob",
    "4.6.2 了解计划任务的运行方式",
    "4.7 本章小结",
  ],
} as const;
export function K8s04ReplicationControllersObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s04ReplicationControllersReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s04ReplicationControllersEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
