import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "附录A 在多个集群中使用 kubectl",
  focus: "管理多个kubectl集群、用户、上下文和命名空间默认值",
  invariant:
    "每条命令明确目标集群与身份，高风险操作前后都保存current-context和资源范围",
  artifact: "kubeconfig结构、上下文切换、合并配置、权限确认和误操作恢复",
  nodes: ["附录A 在多个集群中使用 kubectl"],
} as const;
export function K8sAppendixAKubectlMulticlusterObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sAppendixAKubectlMulticlusterReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sAppendixAKubectlMulticlusterEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
