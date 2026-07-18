import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "附录C 使用其他容器运行时",
  focus: "比较Docker之外的rkt等容器运行时及其与kubelet的集成边界",
  invariant:
    "同一Pod规范在目标运行时保持网络、卷、日志、停止和资源语义，差异被明确记录",
  artifact: "运行时接口、镜像与容器生命周期、日志、网络卷和故障对照",
  nodes: ["附录C 使用其他容器运行时"],
} as const;
export function K8sAppendixCRuntimesObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8sAppendixCRuntimesReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8sAppendixCRuntimesEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
