import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第11章 了解 Kubernetes 机理",
  focus:
    "追踪API服务器、etcd、调度器、控制器、kubelet、kube-proxy、插件和高可用协作",
  invariant:
    "一次声明从持久化、watch、控制循环、调度到节点执行的事件链完整，组件失败边界可定位",
  artifact:
    "控制面拓扑、etcd对象、watch事件链、调度与kubelet轨迹、iptables和高可用实验",
  nodes: [
    "11.1 了解架构",
    "11.1.1 Kubernetes 组件的分布式特性",
    "11.1.2 Kubernetes 如何使用 etcd",
    "11.1.3 API 服务器做了什么",
    "11.1.4 API 服务器如何通知客户端资源变更",
    "11.1.5 了解调度器",
    "11.1.6 介绍控制器管理器中运行的控制器",
    "11.1.7 Kubelet 做了什么",
    "11.1.8 Kubernetes Service Proxy 的作用",
    "11.1.9 介绍 Kubernetes 插件",
    "11.1.10 总结概览",
    "11.2 控制器如何协作",
    "11.2.1 了解涉及哪些组件",
    "11.2.2 事件链",
    "11.2.3 观察集群事件",
    "11.3 了解运行中的 pod 是什么",
    "11.4 跨 pod 网络",
    "11.4.1 网络应该是什么样的",
    "11.4.2 深入了解网络工作原理",
    "11.4.3 引入容器网络接口",
    "11.5 服务是如何实现的",
    "11.5.1 引入 kube-proxy",
    "11.5.2 kube-proxy 如何使用 iptables",
    "11.6 运行高可用集群",
    "11.6.1 让你的应用变得高可用",
    "11.6.2 让 Kubernetes 控制平面变得高可用",
    "11.7 本章小结",
  ],
} as const;
export function K8s11InternalsObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s11InternalsReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s11InternalsEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
