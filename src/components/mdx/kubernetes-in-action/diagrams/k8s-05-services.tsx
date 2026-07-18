import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第5章 服务 ：让客户端发现 pod 并与之通信",
  focus:
    "沿Service、Endpoint、DNS、NodePort、LoadBalancer、Ingress和readiness连接客户端与Pod",
  invariant:
    "Pod地址变化时Service虚拟地址保持稳定，只有就绪Endpoint接收流量，外部暴露路径可逐跳验证",
  artifact:
    "Service到Endpoint拓扑、DNS解析、会话亲和、外部流量、Ingress和就绪探针实验",
  nodes: [
    "5.1 介绍服务",
    "5.1.1 创建服务",
    "5.1.2 服务发现",
    "5.2 连接集群外部的服务",
    "5.2.1 介绍服务 endpoint",
    "5.2.2 手动配置服务的 endpoint",
    "5.2.3 为外部服务创建别名",
    "5.3 将服务暴露给外部客户端",
    "5.3.1 使用 NodePort 类型的服务",
    "5.3.2 通过负载均衡器将服务暴露出来",
    "5.3.3 了解外部连接的特性",
    "5.4 通过 Ingress 暴露服务",
    "5.4.1 创建 Ingress 资源",
    "5.4.2 通过 Ingress 访问服务",
    "5.4.3 通过相同的 Ingress 暴露多个服务",
    "5.4.4 配置 Ingress 处理 TLS 传输",
    "5.5 pod 就绪后发出信号",
    "5.5.1 介绍就绪探针",
    "5.5.2 向 pod 添加就绪探针",
    "5.5.3 了解就绪探针的实际作用",
    "5.6 使用 headless 服务来发现独立的 pod",
    "5.6.1 创建 headless 服务",
    "5.6.2 通过 DNS 发现 pod",
    "5.7 排除服务故障",
    "5.8 本章小结",
  ],
} as const;
export function K8s05ServicesObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s05ServicesReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s05ServicesEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
