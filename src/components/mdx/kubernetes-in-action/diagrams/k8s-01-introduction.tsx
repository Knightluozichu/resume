import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第1章 Kubernetes 介绍",
  focus: "从单体到微服务、容器隔离和集群架构解释为什么需要Kubernetes",
  invariant:
    "应用声明进入API服务器后由控制面收敛，在节点或容器失败时恢复到期望状态",
  artifact: "需求比较、容器边界、集群组件图、首个应用轨迹和收益验收",
  nodes: [
    "1.1 Kubernetes 系统的需求",
    "1.1.1 从单体应用到微服务",
    "1.1.2 为应用程序提供一个一致的环境",
    "1.1.3 迈向持续交付 ：DevOps 和无运维",
    "1.2 介绍容器技术",
    "1.2.1 什么是容器",
    "1.2.2 Docker 容器平台介绍",
    "1.2.3 rkt——一个 Docker 的替代方案",
    "1.3 Kubernetes 介绍",
    "1.3.1 初衷",
    "1.3.2 深入浅出地了解 Kubernetes",
    "1.3.3 Kubernetes 集群架构",
    "1.3.4 在 Kubernetes 中运行应用",
    "1.3.5 使用 Kubernetes 的好处",
    "1.4 本章小结",
  ],
} as const;
export function K8s01IntroductionObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s01IntroductionReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s01IntroductionEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
