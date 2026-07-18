import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第18章 Kubernetes 应用扩展",
  focus:
    "通过CRD、自定义控制器、API服务器、Service Catalog、OpenShift与Helm扩展平台",
  invariant:
    "自定义资源模式、控制循环和状态可观察，服务绑定凭证与撤销闭环，扩展失败不破坏核心API",
  artifact:
    "CRD与控制器、校验、聚合API、Service Catalog绑定、平台比较和Helm交付",
  nodes: [
    "18.1 定义自定义 API 对象",
    "18.1.1 CustomResourceDefinitions 介绍",
    "18.1.2 使用自定义控制器自动定制资源",
    "18.1.3 验证自定义对象",
    "18.1.4 为自定义对象提供自定义 API 服务器",
    "18.2 使用 Kubernetes 服务目录扩展 Kubernetes",
    "18.2.1 服务目录介绍",
    "18.2.2 服务目录 API 服务器与控制器管理器介绍",
    "18.2.3 Service 代理和 OpenServiceBroker API",
    "18.2.4 提供服务与使用服务",
    "18.2.5 解除绑定与取消配置",
    "18.2.6 服务目录给我们带来了什么",
    "18.3 基于 Kubernetes 搭建的平台",
    "18.3.1 红帽 OpenShift 容器平台",
    "18.3.2 Deis Workflow 与 Helm",
    "18.4 本章小结",
  ],
} as const;
export function K8s18ExtensionObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s18ExtensionReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s18ExtensionEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
