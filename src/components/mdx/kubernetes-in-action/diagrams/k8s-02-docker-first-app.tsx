import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第2章 开始使用 Kubernetes 和 Docker",
  focus: "构建并共享容器镜像，配置Minikube或GKE并部署、访问和伸缩首个应用",
  invariant:
    "镜像摘要、集群上下文、Deployment或RC、Service与实际Pod一一可追踪，伸缩后请求仍可达",
  artifact:
    "镜像构建记录、集群上下文、首个部署、Service访问、伸缩和Dashboard观察",
  nodes: [
    "2.1 创建、运行及共享容器镜像",
    "2.1.1 安装 Docker 并运行 Hello World 容器",
    "2.1.2 创建一个简单的 Node.js 应用",
    "2.1.3 为镜像创建 Dockerfile",
    "2.1.4 构建容器镜像",
    "2.1.5 运行容器镜像",
    "2.1.6 探索运行容器的内部",
    "2.1.7 停止和删除容器",
    "2.1.8 向镜像仓库推送镜像",
    "2.2 配置 Kubernetes 集群",
    "2.2.1 用 Minikube 运行一个本地单节点 Kubernetes 集群",
    "2.2.2 使用 Google Kubernetes Engine 托管 Kubernetes 集群",
    "2.2.3 为 kubectl 配置别名和命令行补齐",
    "2.3 在 Kubernetes 上运行第一个应用",
    "2.3.1 部署 Node.js 应用",
    "2.3.2 访问 Web 应用",
    "2.3.3 系统的逻辑部分",
    "2.3.4 水平伸缩应用",
    "2.3.5 查看应用运行在哪个节点上",
    "2.3.6 介绍 Kubernetes dashboard",
    "2.4 本章小结",
  ],
} as const;
export function K8s02DockerFirstAppObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s02DockerFirstAppReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s02DockerFirstAppEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
