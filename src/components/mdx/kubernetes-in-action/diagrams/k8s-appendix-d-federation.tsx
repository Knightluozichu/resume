import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "附录D Cluster Federation",
  focus: "重建第1版Cluster Federation的多集群资源传播、DNS与故障边界",
  invariant:
    "联邦控制面、成员集群和资源传播状态可区分，单集群故障不会被误判为全局完成",
  artifact: "联邦拓扑、成员注册、资源传播、跨集群DNS、故障与撤销记录",
  nodes: ["附录D Cluster Federation"],
} as const;
export function K8sAppendixDFederationObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sAppendixDFederationReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sAppendixDFederationEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
