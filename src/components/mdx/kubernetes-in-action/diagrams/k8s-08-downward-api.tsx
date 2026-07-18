import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第8章 从应用访问 pod 元数据以及其他资源",
  focus: "通过Downward API读取Pod元数据，并从Pod内安全访问Kubernetes API",
  invariant:
    "应用只获得所需元数据和API权限，ServiceAccount令牌、CA与命名空间路径正确且请求可审计",
  artifact:
    "Downward API变量与卷、REST发现、Pod内TLS访问、ambassador和客户端库对照",
  nodes: [
    "8.1 通过 Downward API 传递元数据",
    "8.1.1 了解可用的元数据",
    "8.1.2 通过环境变量暴露元数据",
    "8.1.3 通过 downwardAPI 卷来传递元数据",
    "8.2 与 Kubernetes API 服务器交互",
    "8.2.1 探究 Kubernetes REST API",
    "8.2.2 从 pod 内部与 API 服务器进行交互",
    "8.2.3 通过 ambassador 容器简化与 API 服务器的交互",
    "8.2.4 使用客户端库与 API 服务器交互",
    "8.3 本章小结",
  ],
} as const;
export function K8s08DownwardApiObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s08DownwardApiReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s08DownwardApiEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
