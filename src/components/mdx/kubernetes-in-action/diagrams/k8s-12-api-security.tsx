import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第12章 Kubernetes API 服务器的安全防护",
  focus: "沿认证、ServiceAccount、RBAC和SecurityContext建立API服务器最小权限",
  invariant:
    "主体身份、角色规则、绑定范围和拒绝结果可审计，Pod内进程权限符合安全上下文",
  artifact:
    "认证链、ServiceAccount令牌、RBAC允许拒绝矩阵、SecurityContext与默认账户收敛",
  nodes: [
    "12.1 了解认证机制",
    "12.1.1 用户和组",
    "12.1.2 ServiceAccount 介绍",
    "12.1.3 创建 ServiceAccount",
    "12.1.4 将 ServiceAccount 分配给 pod",
    "12.2 通过基于角色的权限控制加强集群安全",
    "12.2.1 介绍 RBAC 授权插件",
    "12.2.2 介绍 RBAC 资源",
    "12.2.3 使用 Role 和 RoleBinding",
    "12.2.4 使用 ClusterRole 和 ClusterRoleBinding",
    "12.2.5 了解默认的 ClusterRole 和 ClusterRoleBinding",
    "12.2.6 理性地授予授权权限",
    "12.3 本章小结",
  ],
} as const;
export function K8s12ApiSecurityObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s12ApiSecurityReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s12ApiSecurityEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
