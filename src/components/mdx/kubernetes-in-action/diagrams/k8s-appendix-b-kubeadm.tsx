import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "附录B 使用 kubeadm 配置多节点集群",
  focus: "用kubeadm配置书中时代的多节点Kubernetes集群并验证控制面与节点加入",
  invariant:
    "版本、容器运行时、网络插件、令牌和证书固定，节点重建后控制面与Pod网络恢复",
  artifact: "主机基线、kubeadm初始化、join令牌、CNI、节点验证和销毁重建",
  nodes: ["附录B 使用 kubeadm 配置多节点集群"],
} as const;
export function K8sAppendixBKubeadmObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sAppendixBKubeadmReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sAppendixBKubeadmEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
