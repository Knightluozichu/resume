import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第3章 pod ：运行于 Kubernetes 中的容器",
  focus:
    "掌握Pod共享边界、YAML描述、日志端口转发、标签选择器、命名空间和删除语义",
  invariant:
    "同一Pod容器共享网络与卷但保持进程隔离，标签和命名空间选择只影响预期对象",
  artifact:
    "Pod边界图、YAML清单、日志与请求轨迹、标签选择实验、命名空间和删除演练",
  nodes: [
    "3.1 介绍 pod",
    "3.1.1 为何需要 pod",
    "3.1.2 了解 pod",
    "3.1.3 通过 pod 合理管理容器",
    "3.2 以 YAML 或 JSON 描述文件创建 pod",
    "3.2.1 检查现有 pod 的 YAML 描述文件",
    "3.2.2 为 pod 创建一个简单的 YAML 描述文件",
    "3.2.3 使用 kubectl create 来创建 pod",
    "3.2.4 查看应用程序日志",
    "3.2.5 向 pod 发送请求",
    "3.3 使用标签组织 pod",
    "3.3.1 介绍标签",
    "3.3.2 创建 pod 时指定标签",
    "3.3.3 修改现有 pod 的标签",
    "3.4 通过标签选择器列出 pod 子集",
    "3.4.1 使用标签选择器列出 pod",
    "3.4.2 在标签选择器中使用多个条件",
    "3.5 使用标签和选择器来约束 pod 调度",
    "3.5.1 使用标签分类工作节点",
    "3.5.2 将 pod 调度到特定节点",
    "3.5.3 调度到一个特定节点",
    "3.6 注解 pod",
    "3.6.1 查找对象的注解",
    "3.6.2 添加和修改注解",
    "3.7 使用命名空间对资源进行分组",
    "3.7.1 了解对命名空间的需求",
    "3.7.2 发现其他命名空间及其 pod",
    "3.7.3 创建一个命名空间",
    "3.7.4 管理其他命名空间中的对象",
    "3.7.5 命名空间提供的隔离",
    "3.8 停止和移除 pod",
    "3.8.1 按名称删除 pod",
    "3.8.2 使用标签选择器删除 pod",
    "3.8.3 通过删除整个命名空间来删除 pod",
    "3.8.4 删除命名空间中的所有 pod，但保留命名空间",
    "3.8.5 删除命名空间中的（几乎）所有资源",
    "3.9 本章小结",
  ],
} as const;
export function K8s03PodsObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s03PodsReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s03PodsEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
