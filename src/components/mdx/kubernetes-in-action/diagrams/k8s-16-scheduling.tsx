import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第16章 高级调度",
  focus: "用污点容忍、节点亲和、Pod亲和与反亲和表达位置约束和偏好",
  invariant:
    "硬约束保证不可违反条件，软偏好在可调度前提下优化分布，故障域与拓扑标签正确",
  artifact: "污点驱逐、节点亲和、Pod同置、跨域分布和反亲和调度实验",
  nodes: [
    "16.1 使用污点和容忍度阻止节点调度到特定节点",
    "16.1.1 介绍污点和容忍度",
    "16.1.2 在节点上添加自定义污点",
    "16.1.3 在 pod 上添加污点容忍度",
    "16.1.4 了解污点和污点容忍度的使用场景",
    "16.2 使用节点亲缘性将 pod 调度到特定节点上",
    "16.2.1 指定强制性节点亲缘性规则",
    "16.2.2 调度 pod 时优先考虑某些节点",
    "16.3 使用 pod 亲缘性与非亲缘性对 pod 进行协同部署",
    "16.3.1 使用 pod 间亲缘性将多个 pod 部署在同一个节点上",
    "16.3.2 将 pod 部署在同一机柜、可用性区域或者地理地域",
    "16.3.3 表达 pod 亲缘性优先级取代强制性要求",
    "16.3.4 利用 pod 的非亲缘性分开调度 pod",
    "16.4 本章小结",
  ],
} as const;
export function K8s16SchedulingObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s16SchedulingReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s16SchedulingEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
